/*----- constants -----*/
const playerLookup = {
    '1' : 'red',
    '-1': 'black',
    'null': 'white'
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*----- app's state (variables) -----*/
let board; // array of column arrays with 1, -1, null
let turn; // 1 or -1 (player)
let winner; // 1 = player 1; -1 = player 2; null = no winner/ tie; "T" = tie

/*----- cached element references -----*/
const squareEl = document.querySelectorAll('td div');
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
document.querySelector("table").addEventListener('click', handleClick);
document.querySelector('button').addEventListener('click', init);
/*----- functions -----*/
init();


function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
}

function render() {
    board.forEach(function(square, idx) {
        squareEl[idx].style.background = playerLookup[square];
    if(winner === 'T') {
        msgEl.innerHTML = "It's a Tie!";
    }else if(winner) {
        msgEl.innerHTML = `Congrats ${playerLookup[winner].toUpperCase()}!`;
        confetti.start(1500);
        setTimeout(function() {kazoo.play();}, 1000);
    }else
    msgEl.innerHTML = `${playerLookup[turn].toUpperCase()}'s Turn`;
})
}

function handleClick(event) {
    console.log(event);
  const  click = parseInt(event.target.id.replace('sq', ''));
    console.log(click);
  if(board[click] || winner) return;

  board[click] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
    for(let i = 0; i < winningCombos.length; i++) {
        //if(Math.abs(winningCombos[i][0] === winningCombos[i][1] + winningCombos[i][2]) === 3) return board[winningCombos][i][0];
         if(Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
         if(Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
         if(Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
         if(Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
         if(Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
         if(Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
         if(Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
         if(Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];   
    }
    if(board.includes(null)) return null;
    return 'T';
    }

