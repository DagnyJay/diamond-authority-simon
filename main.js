/*----- constants -----*/
const game {
    playerChoice: [],
    options: [#white, #yellow, #blue, #pink],
    gameSoFar: [],
    count: 0,
};

/*----- app's state (variables) -----*/


/*----- cached element references -----*/
const proceedBtn = document.getElementById('proceed')
const msgEl = document.getElementById('player-message')
const selectWhite = document.getElementById('white-diamond');
const selectYellow = document.getElementById('yellow-diamond');
const selectBlue = document.getElementById('blue-diamond');
const selectPink = document.getElementById('pink-diamond');

/*----- event listeners -----*/
proceedBtn.addEventListener('click', init)


/*----- functions -----*/
function init() {
    console.log("you clicked me!")
}

function generateMove() {
    let diamondMove = Math.floor(Math.random() * options.length);
    
}

function isGameOver() {
    playerChoice[] !== gameSoFar[];
};