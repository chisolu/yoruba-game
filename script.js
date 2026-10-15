function launchFireworks() {
    const colors = ["red", "yellow", "blue", "lime", "orange", "magenta"];

    const container = document.querySelector(".container");
    if (!container) return;

    const rect = container.getBoundingClientRect();

    for (let burst = 0; burst < 3; burst ++) {
        setTimeout(() => {
           const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 36; i++) {
                const particle = document.createElement("div");

                particle.className = "firework-particle";

                particle.style.left = centerX + "px";
                particle.style.top = centerY + "px";

                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = color;
                particle.style.color = color;
                const angle = (Math.PI * 2 * i) / 36;
                const distance = 30 + Math.random() * 50;

                particle.style.setProperty(
                    "--x", Math.cos(angle) * distance + "px"
                    );

                particle.style.setProperty(
                    "--y", Math.sin(angle) * distance + "px"
                );
                    document.body.appendChild(particle);
                    setTimeout(() => particle.remove(), 1100);                
            }
        }, burst * 300);
    }
}
// END AMIMATION

let currentNumber;
let score = 0;
let questionCount = 0;
let maxQuestions = 10;
let timeleft = 60;
let timer;
let gameStarted = false;
let currentType;

// NUMBER TO ENGLISH WORD 

    const  yorubaNumbers = {
        1: "okan",
        2: "eji",
        3: "eta",
        4: "erin",
        5: "arun",
        6: "efa",
        7: "eje",
        8: "ejo",
        9: "esan",
        10: "ewa",
        11: "okanla",
        12: "ejila",
        13: "etala",
        14: "erinla",
        15: "eedogun",
        16: "erindinlogun",
        17: "etadinlogun",
        18: "ejidinlogun",
        19: "okandinlogun",
        20: "ogun",
        21: "okan le logun",
        22: "eji le logun",
        23: "eta le logun",
        24: "erin le logun",
        25: "arun din ni ogbon",
        26: "efa le logun",
        27: "eje le logun",
        28: "ejo le logun",
        29: "esan le logun",
        30: "ogbon",
        31: "okan le ogbon",
        32: "eji le ogbon",
        33: "eta le ogbon",
        34: "erin le ogbon",
        35: "arun le ogbon",
        36: "efa le ogbon",
        37: "eje le ogbon",
        38: "ejo le ogbon",
        39: "esan le ogbon",
        40: "ogoji",
        41: "okan le ogoji",
        42: "eji le ogoji",
        43: "eta le ogoji",
        44: "erin le ogoji",
        45: "arun le ogoji",
        46: "efa le ogoji",
        47: "eje le ogoji",
        48: "ejo le ogoji",
        49: "esan le ogoji",
        50: "aadota",
        51: "ọkan le aadota",
        52: "eji le aadota",
        53: "eta le aadota",
        54: "erin le aadota",
        55: "arun un din ni ogota",
        56: "efa le aadota",
        57: "eje le aadota",
        58: "ejo le aadota",
        59: "okan din ni le ogota",
        60: " ogota",
        61: "okan le ogota",
        62: "eji le ogota",
        63: "eta le ogota",
        64: "erin le ogota",
        65: "arun le ogota",
        66: "efa le ogota",
        67: "eje le ogota",
        68: "ejo le ogota",
        69: "esan le ogota",
        70: " aadorin",
        71: "okan le aadorin",
        72: "eji le aadorin",
        73: "eta le aadorin",
        74: "erin le aadorin",
        75: "arun le aadorin",
        76: "efa le aadorin",
        77: "eje le aadorin",
        78: "ejo le aadorin",
        79: "esan le aadorin",
        80: "ogorin",
        81: "okan le ogorin",
        82: "eji le ogorin",
        83: "eta le ogorin",
        84: "erin le ogorin",
        85: "arun le ogorin",
        86: "efa le ogorin",
        87: "eje le ogorin",
        88: "ejo le ogorin",
        89: "esan le ogorin",
        90: "aadorun un",
        91: "okan le aadorun un",
        92: "eji le aadorun un",
        93: "eta le aadorun un",
        94: "erin le aadorun un",
        95: "arun le aadorun un",
        96: "efa le aadorun un",
        97: "eje le aadorun un",
        98: "ejo le aadorun un",
        99: "okan le aadorun un",
        100: "ogorun un",
    };

    // start game

function startGame () {
    score = 0;
    questionCount = 0;
    timeleft = 60;
    gameStarted  = true;
    clearInterval(timer);

    document.getElementById("score").innerText = score;
    document.getElementById("count").innerText = questionCount;
    document.getElementById("timer").innerText = timeleft;
    document.getElementById("message").innerText = "";
    document.getElementById("answer").value = "";

    // start timer
    timer = setInterval( function () {
        timeleft--;
        document.getElementById("timer").innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(timer);
            gameStarted =false
            document.getElementById("question").innerText = "Time's up!";

            document.getElementById("message").innerText = 
            "Final Score:" + score + "/" + maxQuestions;
        } 
    }, 1000);
    nextQuestion();
}
// Generate next question
function nextQuestion () {
    if (questionCount >= maxQuestions) {
        clearInterval(timer);
        gameStarted = false;

         document.getElementById("question").innerText = "Game Over!";

         document.getElementById("message").innerText = 
         "Final Score:" + score + "/" + maxQuestions;
         return;
    }

    let level = Number(document.getElementById("level").value);
    // generate random number
    currentNumber = Math.floor(Math.random() * level) + 1;

    // RANDOMLY CHOOSE QUESTION TYPE
    currentType = Math.random() < 0.5
    ? "word"
    : "number";

    if (currentType === "word") {
        // example:
        // deus -> 2
        // cinq -> 5
    document.getElementById("question").innerText =
    yorubaNumbers[currentNumber];
    document.getElementById("answer").type = "number";
    document.getElementById("answer").placeholder = "enter number";
    }
    else {
         // example:
        // 10 -> dix
        // 7 -> sept
    document.getElementById("question").innerText = currentNumber
    document.getElementById("answer").type = "text";
    document.getElementById("answer").placeholder = "enter yoruba number";
    }

    // display english word
    // document.getElementById("question").innerText = numberTowords(currentNumber);
    // clear anser 
    document.getElementById("answer").value = "";
    //  increase question count
    questionCount++;
    document.getElementById("count").innerText = questionCount;
    // focus count
    document.getElementById("answer").focus();
}

// check answer
function checkAnswer () {
    if (!gameStarted) {
        return;
    }

  let answer = document.getElementById("answer")
  .value
  .trim()
  .toLowerCase();

//   dont accept emty answr
if (answer ==="") {
    return;
}
let correct = false;

// word number
if (currentType === "word"){
    if (Number(answer) === currentNumber){
        correct = true;
    }
}

else{
    let correcword = yorubaNumbers[currentNumber].toLowerCase();
    if (answer === correcword) {
        correct = true;
    }
}

//   correct answer
  if (correct){
    score++;
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = "correct!  ✔ 👍 🎉";
    message.style.color = "green"
    launchFireworks();
    
  } else{
    document.getElementById("message").innerText = 
    "wrong!  ❌ 😜 Correct Answer: " + (currentType === "word " ? currentNumber
    : yorubaNumbers[currentNumber]);
    message.style.color = "red"
  }
        nextQuestion();

} 
// press enter to submit answer
    document.getElementById("answer").addEventListener(
        "keydown",
        function(event) {
            if (event.key ==="Enter") {
                checkAnswer();
            }
        }
    );


