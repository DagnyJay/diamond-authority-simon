/*----- constants -----*/
const FLASH_INTERVAL_MS = 1000
// amount of time for flashing btns

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
// this is an array-like thing and you can use [0..3] to index any of these

/*----- event listeners -----*/
proceedBtn.addEventListener('click', startGame)
// diamondImages.addEventListener('click', )
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
    let i = 0
    flashInterval = setInterval(function() {
        if (i === gameSoFar.length -1) {
            clearInterval(flashInterval)
        } 
        console.log(gameSoFar[i]);
        gameSoFar[i] = document.querySelector(diamondImages[i])
        //**document.queryselector to grab the correct diamond using the index of gameSoFar
        i++
    },FLASH_INTERVAL_MS)
    // loop through gameSoFar and flash each diamond
    // you'll need setTimeout for this guy (or setInterval?)

    isFlashing = false;
}

function getMove() {
    return Math.floor(Math.random() * diamondImages.length);
}

function isGameOver() {
    // playerChoice[] !== gameSoFar[];
}

function diamondsWin() {

}