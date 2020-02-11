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
// diamond-buttons

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

function flashDiamonds() {
    isFlashing = true;
    let i = -1
    flashInterval = setInterval(function() {
        removeFlash();
        if (i === gameSoFar.length -1) {
            clearInterval(flashInterval)
        } else {
            diamondImages[gameSoFar[i+1]].classList.add('flash')
        }
        i++
        console.log(diamondImages[gameSoFar[i]]);
    },FLASH_INTERVAL_MS)
    // loop through gameSoFar and flash each diamond
    // you'll need setTimeout for this guy (or setInterval?)

    isFlashing = false;
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
    console.log(evt.target.id)
}

function isGameOver() {
    // playerChoice[] !== gameSoFar[];
}

function diamondsWin() {

}