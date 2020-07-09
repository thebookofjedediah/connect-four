/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const form1 = document.querySelector("#form1");
const colorInput = document.querySelector('#color1');
const form2 = document.querySelector("#form2");
const inputColor = document.querySelector('#color2');
let player1Color = "blue";
let player2Color = "red";

form1.addEventListener("submit", function(e){
  e.preventDefault();
  console.log(player1Color)
  player1Color = colorInput.value;
  console.log(player1Color)
  let playerPieces = document.getElementsByClassName('p1');
  for (let i = 0, max = playerPieces.length; i < max; i++) {
  playerPieces[i].style.backgroundColor = colorInput.value;
  }
});

form2.addEventListener("submit", function(e){
  e.preventDefault();
  console.log(player2Color)
  player2Color = inputColor.value;
  console.log(player2Color)
  let playerPieces = document.getElementsByClassName('p2');
  for (let i = 0, max = playerPieces.length; i < max; i++) {
  playerPieces[i].style.backgroundColor = inputColor.value;
  }
});


const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

const playerTurn = document.getElementById('player-turn'); //used to update the players turn in the DOM

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++){
    board[i] = [];
    for(let j = 0; j < WIDTH; j++)
    board[i][j] = null;
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board')
  // create a table row for the top of the board, give it an id, and add a click event handler
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  for (var x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // set the board height and width dynamically, adding ids based off their position
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}





/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1; y >= 0; y--){
    if(board[y][x] == null){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let placement = document.getElementById(`${y}-${x}`);
  let piece = document.createElement('div');
  // customize player color

  // add proper className
  piece.classList.add('piece')
  if(currPlayer === 1){
    piece.classList.add('p1');
    piece.style.backgroundColor = player1Color;
  } else {
    piece.classList.add('p2');
    piece.style.backgroundColor = player2Color;
  }
  placement.append(piece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return setTimeout(function(){
      endGame(`Player ${currPlayer} won!`);
    }, 50)
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every((row) => {
    return row.every(Boolean);
  })) { 
    setTimeout(function(){
    endGame(`It's a tie!`);
  }, 50) 
}
			

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);

  // Toggle which players turn it is
  currPlayer === 1 ? (playerTurn.classList = 'player1') : (playerTurn.classList = 'player2');
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
