//Selectors

var tableRow = document.getElementsByTagName('tr');
var tabelCell = document.getElementsByTagName('td');
var tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.playerTurn');
const reset = document.querySelector('.connectfour-reset');
const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');

for(let i = 0; i < tabelCell.length; i ++) {
    tabelCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    });
}

let p1Score = 0;
let p2Score = 0;
let roundOver = false;

while(!player1) {
    var player1 = prompt('Player 1 Name:');
}
alert(`${player1} will be red.`);
player1Color = 'red';

while(!player2) {
    var player2 = prompt('Player 2 Name:');
}
alert(player2 + ' will be yellow.');
player2Color = 'yellow';

var currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn`;

score1.textContent = `${player1}: 0`;
score1.style.color = player1Color;
score2.textContent = `${player2}: 0`;
score2.style.color = player2Color;

Array.prototype.forEach.call(tabelCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'grey';
});

function changeColor(e) {
    let column = e.target.cellIndex;
    let row = [];

    for(let i = 5; i > -1; i --) {
        if(tableRow[i].children[column].style.backgroundColor == 'grey') {
            row.push(tableRow[i].children[column]);
            if(currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
                if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2() && !roundOver) {
                    playerTurn.textContent = `${player1} wins`;
                    playerTurn.style.color = player1Color;
                    p1Score++;
                    score1.textContent = `${player1}: ${p1Score}`;
                    roundOver = true;
                    return(alert(`${player1} wins`));
                } else if(drawCheck()) {
                    alert('Draw');
                    playerTurn.textContent = 'Draw';
                } else {
                playerTurn.textContent = `${player2}'s turn`;
                return currentPlayer = 2;
                }
            } else {
                row[0].style.backgroundColor = player2Color;
                if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2() && !roundOver) {
                    playerTurn.textContent = `${player2} wins`;
                    playerTurn.style.color = player2Color;
                    p2Score ++;
                    score2.textContent = `${player2}: ${p2Score}`;
                    roundOver = true;
                    return(alert(`${player2} wins`));
                } else if(drawCheck()) {
                    alert('Draw');
                    playerTurn.textContent = 'Draw';
                } else {
                playerTurn.textContent = `${player1}'s turn`;
                return currentPlayer = 1;
                }
            }
        }
    }
}

function colorMatchCheck(one, two, three, four) {
    return(one == two && one == three && one == four && one !== 'grey');
}

function horizontalCheck() {
    for(let row = 0; row < tableRow.length; row ++) {
        for(let col = 0; col < 4; col ++) {
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row].children[col+1].style.backgroundColor, tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function verticalCheck() {
    for(let col = 0; col < 7; col ++) {
        for(let row = 0; row < 3; row ++) {
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor, tableRow[row+2].children[col].style.backgroundColor, tableRow[row+3].children[col].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function diagonalCheck1() {
    for(let col = 0; col < 4; col ++) {
        for(let row = 0; row < 3; row ++) {
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor, tableRow[row+2].children[col+2].style.backgroundColor, tableRow[row+3].children[col+3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function diagonalCheck2() {
    for(let col = 0; col < 4; col ++) {
        for(let row = 5; row > 2; row --) {
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, 
                tableRow[row-1].children[col+1].style.backgroundColor, 
                tableRow[row-2].children[col+2].style.backgroundColor, 
                tableRow[row-3].children[col+3].style.backgroundColor)) {
                return true;
            }
        }
    }
}

function drawCheck() {
    let fullSlot = [];
    for(let i = 0; i < tabelCell.length; i ++) {
        if(tabelCell[i].style.backgroundColor !== 'grey') {
            fullSlot.push(tabelCell[i]);
        }
    }
    if(fullSlot.length === tabelCell.length) {
        return true;
    }
}

reset.addEventListener('click', ()=>{
        tableSlot.forEach(slot => {
            slot.style.backgroundColor = 'grey';
        });
    playerTurn.style.color = 'white';
    roundOver = false;
    return (currentPlayer === 1? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
});