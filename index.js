// Import stylesheets
import './style.css';

const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textArea = document.querySelector('[name="text"]');
msg.text = textArea.value;

let isPaused = false;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter((voice) => voice.lang.includes('en'))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join('');
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

function setSpeakValue(value) {
  if (isPaused === false) {
    msg['text'] = value;
    toggle();
  }
}

function setSpeakValueFromTextbox() {
  if (isPaused === false) {
    msg['text'] = textArea.value;
    toggle();
  }
}

function setSpeakValuePaused(value) {
  msg['text'] = value;
  toggle();
}

function continueSpeaking() {
  if (isPaused === false) {
    toggle();
  }
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach((option) => option.addEventListener('change', setOption));

toggleVisibility(speakButton);

speakButton.addEventListener('click', () => {
  isPaused = false;
  toggleVisibility(stopButton);
  toggleVisibility(speakButton);
  setSpeakValueFromTextbox();
});

stopButton.addEventListener('click', () => {
  isPaused = true;
  toggleVisibility(stopButton);
  toggleVisibility(speakButton);
  // continueSpeaking();
  setSpeakValuePaused('Paused');
});

// toggle html element visibility
function toggleVisibility(element) {
  if (element.style.display === 'none') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

//MATH

textArea.value = '';

// create random multiplication problem
function createProblem(digit = 1) {
  let num1 = Math.floor(Math.random() * power(10, digit)) + 1;
  let num2 = Math.floor(Math.random() * power(10, digit)) + 1;
  let problem = `${num1} times ${num2}`;

  let answer = num1 * num2;

  return {
    problem: problem,
    answer: answer,
    full: `${problem} equals ${answer}`,
  };
}

// take number to a custom power
function power(num, pow) {
  let result = 1;
  for (let i = 0; i < pow; i++) {
    result *= num;
  }
  return result;
}

let state = 0;

let problem = createProblem();
let problemDigitAmount = 2;
let refreshTime = 20000;

function setupNewProblem() {
  if (state === 0) {
    problem = createProblem(problemDigitAmount);
    state = 1;
    textArea.value = problem.problem;
    setSpeakValue(problem.problem);
  } else {
    state = 0;
    textArea.value = problem.full;
    setSpeakValue(problem.full);
  }
}

setupNewProblem();

//create countdown timer
let countdown = refreshTime / 1000 + 1;
document.getElementById('countdown').innerHTML = countdown;

let countdownInterval = setInterval(function () {
  if (isPaused === false) {
    if (countdown > 0) {
      countdown--;
    } else {
      countdown = refreshTime / 1000 + 1;
    }

    document.getElementById('countdown').innerHTML = countdown;
  }
}, 1000);

setInterval(function () {
  if (isPaused === false) {
    setupNewProblem();
  }
}, refreshTime);
