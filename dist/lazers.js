//Selectors

var tableRow = document.getElementsByTagName('tr');
var tabelCell = document.getElementsByTagName('td');
var tableSlot = document.querySelectorAll('.gridSquare');
const reset = document.querySelector('.lazer-reset');

for(let i = 0; i < tabelCell.length; i ++) {
    tabelCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    });
}

let roundOver = false;
let level = 0;


//alert("Welcome to this new game. Instructions will guide you below");

let index = 0;
let mirrorsData;

fetch("ok.json")
.then(response => response.json())
.then(data => {
    mirrorsData = data.mirrors;
    console.log(data.mirrors)
});
Array.prototype.forEach.call(tabelCell, (cell) => {
    cell.addEventListener('click', changeColor);
    console.log(mirrorsData)
    index ++;
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

reset.addEventListener('click', ()=>{
        tableSlot.forEach(slot => {
            slot.style.backgroundColor = 'grey';
        });
    playerTurn.style.color = 'white';
    roundOver = false;
    return (currentPlayer === 1? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
});