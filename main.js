/*----- constants -----*/
const FLASH_INTERVAL_MS = 1200

/*----- app's state (variables) -----*/
let playerChoice;
let gameSoFar;
let score;
let isFlashing;
let flashInterval;

/*----- cached element references -----*/
const proceedBtn = document.getElementById('proceed')
const msgEl = document.getElementById('player-message')
const scoreEl  = document.getElementById('score-tracker')
const diamondImages = document.querySelectorAll('#diamond-buttons img')
const diamondBtns = document.getElementById('diamond-buttons')
const whiteDiamondSound = document.querySelector('#white-sound')
const yellowDiamondSound = document.querySelector('#yellow-sound')
const blueDiamondSound = document.querySelector('#blue-sound')
const pinkDiamondSound = document.querySelector('#pink-sound')

/*----- event listeners -----*/
proceedBtn.addEventListener('click', startGame)
diamondBtns.addEventListener('click', playerTurn)

/*----- functions -----*/
init();

function init() {
    playerChoice = [];
    gameSoFar = [];
    score = 0;
    isFlashing = false;
}

function startGame() {
    let newMove = getMove();
    gameSoFar.push(newMove);
    proceedBtn.style.display = 'none'
    flashDiamonds();
}

function renderMessage() {
    if (isFlashing === true) {
    msgEl.innerText = `Observe`;
    } else if (isFlashing === false) {
        msgEl.innerText = `Replicate`;
    } 
}

function flashDiamonds() {
    isFlashing = true;
    renderMessage();
    let i = -1;
    playerChoice = [];
    flashInterval = setInterval(function() {
        if (i === gameSoFar.length -1) {
            clearInterval(flashInterval)
            isFlashing = false
            renderMessage();
        } else {
            const rdmIdx = gameSoFar[i+1]
            diamondImages[rdmIdx].classList.add('flash')
            if (rdmIdx === 0) {
                whiteDiamondSound.play();
            } else if (rdmIdx === 1) {
                yellowDiamondSound.play();
            } else if (rdmIdx === 2) {
                blueDiamondSound.play();
            } else if (rdmIdx === 3) {
                pinkDiamondSound.play();
            }
            setTimeout(function(){
                removeFlash();
            }, 800) 
        }
        i++
    },FLASH_INTERVAL_MS)
}

function removeFlash() {
    diamondImages.forEach(function(diamond) {
        diamond.classList.remove('flash')
    })
}

function getMove() {
    return Math.floor(Math.random() * diamondImages.length);
}

function playerTurn(evt) {
    console.log(evt);
    playerChoice.push(parseInt(evt.target.id))
    playSound(evt);
    compare();
}

function playSound(evt) {
    if (evt.target.id === '0') {
        whiteDiamondSound.play();
    } else if (evt.target.id === '1') {
        yellowDiamondSound.play();
    } else if (evt.target.id === '2') {
        blueDiamondSound.play();
    } else if (evt.target.id === '3') {
        pinkDiamondSound.play();
    }
}

function compare() {
    if(JSON.stringify(playerChoice) === JSON.stringify(gameSoFar)) {
        let newMove = getMove();
        gameSoFar.push(newMove);
        score += 1
        scoreEl.innerText = `Score :${score}`;
        flashDiamonds();
    } else {
       for (i = 0; i < playerChoice.length; i++) {
           if (playerChoice[i] !== gameSoFar[i]) {
               diamondsWin();
               return
           }
       }
    }
}

function diamondsWin() {
    msgEl.innerText = `They found you. It's over.`;
    diamondBtns.removeEventListener("click", playerTurn, true); 
}