class BoggleBoard {
  constructor(dictionary, dimension) {
    this.dictionary = dictionary;
    this.dimension = dimension || 4;
    this.board = this.generateBoard(this.dimension);
  }

  generateBoard(dimension) {
    const arr = [];
    for (let i = 0; i < dimension; i += 1) {
      arr.push([]);
      for (let j = 0; j < dimension; j += 1) {
        arr[i].push(' ');
      }
    }

    return arr;
  }

  shake() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const dimension = this.dimension;
    for (let i = 0; i < dimension; i += 1) {
      for (let j = 0; j < dimension; j += 1) {
        const randomLetter = letters[Math.floor(Math.random()*letters.length)];
        this.board[i][j] = randomLetter;
      }
    }

    return this.board;
  }
}

const words = require('./data.js');
const boggle = new BoggleBoard(words);

console.log(boggle.shake());