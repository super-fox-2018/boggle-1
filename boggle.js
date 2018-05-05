'use strict'

class Boggle {
  constructor(dictionary) {
    this.string = 'ZOHEDAAZGEKRTFJU'; // this is test board in string
    this.dictionary = dictionary;
    this.board = this.shake(); // change to this.createBoard() to use string-based board
    this.boardCoordinates = this.createBoardCoordinates();
    this.usedLetter = [];
    this.answer = [];
    this.wrongLetter = [];
  }

  shake() {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push([]);
      for (let j = 0; j < 4; j++) {
        array[i].push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      }
    }
    return array;
  }

  createBoard() { // use this to create board from string
    let array = [];
    for (let i = 0; i < 4; i++) {
      array.push([]);
      for (let j = 0; j < 4; j++) {
        array[i].push(this.string[(4 * i) + j]);
      }
    }
    return array;
  }

  createBoardCoordinates() {
    let board = this.board;
    let array = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        array.push([i,j]);
      }
    }
    return array;
  }

  checkSurroundings(board, value, row, col) {
    for (let i = row - 1; i <= row + 1; i++) { // i = row
      for (let j = col - 1; j <= col + 1; j++) { // j = column
        let isWrong = false;
        let isCurrentSpot = false;
        if (row === i && col === j) {
          isCurrentSpot = true;
        }
        for (let k = 0; k < this.wrongLetter.length; k++) {
          if (i === this.wrongLetter[k][0] && j === this.wrongLetter[k][1]) {
            isWrong = true;
          }
        }
        // if not ouside the board
        if (i != -1 && j != -1 && i != 4 && j != 4) {
          let usedBefore = false;
          for (let k = 0; k < this.usedLetter.length; k++) {
            if (i === this.usedLetter[k][0] && j === this.usedLetter[k][1]) {
              usedBefore = true;
            }
          }
          if (board[i][j] === value && !usedBefore && !isWrong && !isCurrentSpot) {
            this.usedLetter.push([i,j]);
            return true;
          }
        }
      }
    }
    return false;
  }

  checkWordInSurroundings(word, row, column) { // row = current row, col = current column
    let foundWord = false;
    let k = 1;
    let currentRow = row;
    let currentColumn = column;
    // loop for every word's letter
    while (!foundWord && k < word.length) {
      let value = word[k];
      // if next letter is in the surroundings
      if (this.checkSurroundings(this.board, value, currentRow, currentColumn)) {
        currentRow = this.usedLetter[this.usedLetter.length - 1][0];
        currentColumn = this.usedLetter[this.usedLetter.length - 1][1];
        if (k === word.length - 1) {
          foundWord = true;
        }
        k++;
        // if found the first letter of the word but no next letter
      } else if (k === 1) {
        k = word.length; // to exit the loop
        this.usedLetter.pop();
        this.wrongLetter.push([currentRow, currentColumn]);
      } else {
        k--;
        this.usedLetter.pop();
        this.wrongLetter.push([currentRow, currentColumn]);
        currentRow = this.usedLetter[this.usedLetter.length - 1][0];
        currentColumn = this.usedLetter[this.usedLetter.length - 1][1];
      }
    }
    if (!foundWord) {
      return false;
    } else {
      return true;
    }
  }

  solve() {
    let coordinates = this.boardCoordinates;
    let dictionary = this.dictionary;
    let board = this.board;
    let wordFound = false;
    // loop for every word
    for (let i = 0; i < this.dictionary.length; i++) {
      wordFound = false;
      this.usedLetter = [];
      this.wrongLetter = [];
      let j = 0;
      let word = dictionary[i];
      let firstLetter = word[0];
      // loop for every box coordinate
      while (j < coordinates.length && !wordFound) {
        let row = coordinates[j][0];
        let column = coordinates[j][1];
        // if found first letter in the box
        if (board[row][column] === firstLetter) {
          this.usedLetter.push([row,column]);
          if (this.checkWordInSurroundings(word, row, column)) {
            this.answer.push(word);
            wordFound = true;

          }
        }
        j++;
      }
    }
    if (this.answer.length === 0) {
      return 'no words found';
    } else {
      return `${this.answer.length} words found: ${this.answer.join(', ')}`;
    }
  }
}

const assert = require('assert');
const words =  require('./data.js');
// const words = ['KAZE','JETE','KAZDG']; // this is test dictionary
var game = new Boggle(words);

console.log(game.board);
console.log(game.solve());

