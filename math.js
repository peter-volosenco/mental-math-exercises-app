


textArea.value = "";

// create random multiplication problem
function createProblem(digit = 1) {
    let num1 = Math.floor(Math.random() * power(10, digit)) + 1;
    let num2 = Math.floor(Math.random() * power(10, digit)) + 1;
    let problem = `${num1} times ${num2}`;

    let answer = num1 * num2;

    return {
        problem: problem,
        answer: answer,
        full: `${problem} equals ${answer}`
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
    if (countdown == 0) {
        if (state === 0) {
            state = 1;
            showNewProblem();
        } else {
            state = 0;
            showFullAnswer();
        }
    }
}

function showNewProblem() {
    problem = createProblem(problemDigitAmount);
    textArea.value = problem.problem;
    setSpeakValue(problem.problem);
    resetCountdown();
}

//show full asnwer
function showFullAnswer() {
    textArea.value = problem.full;
    setSpeakValue(problem.full);
    resetCountdown();
}

var _countdown = (refreshTime / 1000);
var countdown = 0;
setupNewProblem();

//create countdown timer
countdown = _countdown;
document.getElementById("countdown").innerHTML = countdown;

//set countdown int to original countdown
function resetCountdown() {
    countdown = _countdown;
    document.getElementById("countdown").innerHTML = countdown;
}


//set countdown interval
function countdownSubstract() {
    if (countdown > 0) {
        countdown--;
        document.getElementById("countdown").innerHTML = countdown;
    }
}

let countdownInterval = setInterval(function () {

    if (isPaused === false) {
        countdownSubstract();

        if (countdown == 0) {
            setupNewProblem();
        }
    }
}, 1000);
