class BoggleBoard {
  constructor() {
    //this.data = data;
    this.board = [];
    this.dictionary = [];
    this.counter = 0;
  }

  solve() {
    // let board = this.generateBoard();
    let board = [['D', 'G', 'H', 'I'],
                 ['K', 'L', 'P', 'S'],
                 ['Y', 'E', 'U', 'T'],
                 ['E', 'O', 'R', 'N']];
    // let dict = this.generateDictionary();
    let dict = ["APPLE", "SIT", "TRIP", "TURN", "SUPER"];
    // console.log('var board from solve()', board)
    let result = [];
    let isFound = false;
    let index = 0;
    //console.log(this.checkWord(board))
    while (dict[index] < dict[dict.length - 1]) {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (dict[index][0].indexOf(board[i][j]) !== -1 && 
              this.checkWord(board, dict, j, i)) {
            result.push(dict[index]);
            isFound = true;
            this.counter++;
            break;
          }
        }
        if (isFound) break;
      }
      index++;
    }

    return result
  }

  generateBoard() {
    let generateBoard = this.shake(4);
    
    this.board = generateBoard;
    //console.log('this.board from generateBoard()', this.board)
    return this.board
  }

  generateDictionary() {

  }

  shake(num) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let board = [];

    for (let i = 0; i < num; i++) {
      let row = [];
      for (let j = 0; j < num; j++) {
        let randomChar = Math.floor(Math.random() * alphabet.length);
        row.push(alphabet[randomChar]);
      }
      board.push(row);
    }
    return board;
  }

  checkWord(board, dict, posX, posY) { 
    // up, down, right, left, diagonal(rightup, leftup. rightdown, leftdown)
    let copyBoard = board.slice();
    // console.log('copyBoard from checkWord():', copyBoard)
    let isFound = false;
    let counter = 1;
    let marked = '*';
    copyBoard[posX][posY] = marked;

    while (!isFound) {
      //right
      if (copyBoard[posX][posY+1] && copyBoard[posX][posY+1] === dict[counter]) {
        posY = posY + 1;
        copyBoard[posX][posY] = marked;
      }
      //left
      else if (copyBoard[posX][posY-1] && copyBoard[posX][posY-1] === dict[counter]) {
        posY = posY - 1;
        copyBoard[posX][posY] = marked;
      }
      //up
      else if (copyBoard[posX-1] && copyBoard[posX-1][posY] === dict[counter]) {
        posX = posX - 1;
        copyBoard[posX][posY] = marked;
      }
      //down
      else if (copyBoard[posX+1] && copyBoard[posX+1][posY] === dict[counter]) {
        posX = posX + 1;
        copyBoard[posX][posY] = marked;
      }
      //diagonal rightup
      else if (copyBoard[posX-1] && copyBoard[posX-1][posY+1] === dict[counter]) {
        posX = posX - 1;
        posY = posY + 1;
        copyBoard[posX][posY] = marked;
      }
      //diagonal leftup
      else if (copyBoard[posX-1] && copyBoard[posX-1][posY-1] === dict[counter]) {
        posX = posX - 1;
        posY = posY - 1;
        copyBoard[posX][posY] = marked;
      }
      //diagonal rightdown
      else if (copyBoard[posX+1] && copyBoard[posX+1][posY+1] === dict[counter]) {
        posX = posX + 1;
        posY = posY + 1;
        copyBoard[posX][posY] = marked;
      }
      //diagonal leftdown
      else if (copyBoard[posX+1] && copyBoard[posX+1][posY-1] === dict[counter]) {
        posX = posX + 1;
        posY = posY - 1;
        copyBoard[posX][posY] = marked;
      }
      else {
        return false;
      }

      if (counter === dict.length - 1) {
        isFound = true
      }
      counter++
    }
    return isFound;
  }
}

// let data = require('./data.js');
let game = new BoggleBoard();
let boggle = game.solve();

if (boggle.length !== 0) {
  console.log(game.counter + ' words found:');
  for (let i = 0; i < boggle.length; i++) {
    console.log(boggle[i]);
  }
} else {
  console.log('No words found');
}