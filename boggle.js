class BoggleBoard {
  constructor(data) {
    this.data = data;
  }

  shake(num) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let board = [];

    for (let i = 0; i < num; i++) {
      let row = [];
      for (let j = 0; j < num; j++) {
        let randomize = Math.floor(Math.random() * alphabet.length);
        row.push(alphabet[randomize]);
      }
      board.push(row);
    }
    return board;
  }
}

// let data = [''];
let data = require('./data.js');
let game = new BoggleBoard(data);

console.log(game.shake(4))