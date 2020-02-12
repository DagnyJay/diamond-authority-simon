// somehow I need contingencies to prevent game saying I lose when I don't select all gameSoFar options simultaneously

/*----- constants -----*/
const FLASH_INTERVAL_MS = 1000

/*----- app's state (variables) -----*/
let playerChoice;
let gameSoFar;
let score;
let isFlashing;
let flashInterval;

/*----- cached element references -----*/
const proceedBtn = document.getElementById('proceed')
const msgEl = document.getElementById('player-message')
const diamondImages = document.querySelectorAll('#diamond-buttons img')
const diamondBtns = document.getElementById('diamond-buttons')

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
    //proceed button linked
    let newMove = getMove();
    gameSoFar.push(newMove);
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
            diamondImages[gameSoFar[i+1]].classList.add('flash')
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
    playerChoice.push(parseInt(evt.target.id))
    compare();
}

function compare() {
    if(JSON.stringify(playerChoice) === JSON.stringify(gameSoFar)) {
        let newMove = getMove();
        gameSoFar.push(newMove);
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

function incrementScore() {

}
function diamondsWin() {
    msgEl.innerText = `They found you. It's over.`
}
    
