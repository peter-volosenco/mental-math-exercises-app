const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textArea = document.querySelector('[name="text"]');
msg.text = textArea.value;

let isPaused = true;

function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
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
    if(isPaused === false) {
        msg["text"] = value;
        toggle();
    }
}

function setSpeakValueFromTextbox() {
    if(isPaused === false) {
        msg["text"] = textArea.value;
        toggle();
    }
}

function setSpeakValuePaused(value) {
    msg["text"] = value;
    toggle();
}

function continueSpeaking() {
    if(isPaused === false) {
        toggle();
    }
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));

toggleVisibility(stopButton);

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
    setSpeakValuePaused("Paused")
});


// toggle html element visibility
function toggleVisibility(element) {
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}