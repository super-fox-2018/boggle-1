class BoggleBoard {
  constructor(dimension) {
    this.dictionary = null;
    this.dimension = dimension || 4;
    this.board = this.generateBoard(this.dimension);
    // this.board = [
    //   ['D', 'E', 'D', 'A'],
    //   ['T', 'P', 'O', 'E'],
    //   ['S', 'U', 'P', 'P'],
    //   ['E', 'O', 'Z', 'E']
    // ];

    // this.board = [
    //   ['D', 'G', 'H', 'I'],
    //   ['K', 'L', 'P', 'S'],
    //   ['Y', 'E', 'U', 'T'],
    //   ['E', 'O', 'R', 'N']
    // ];
    // this.board = [
    //   ['D', 'Z', 'N', 'Z'],
    //   ['A', 'Z', 'U', 'Z'],
    //   ['Z', 'Z', 'O', 'Z'],
    //   ['Z', 'Z', 'Z', 'M']
    // ];
  }

  getDictionary() {
    const words = require('./data.js');
    // const words = ['APPLE', 'SIT', 'TURN', 'SUPER'].sort();
    // const words = ['MOM', 'DAD', 'NUN'].sort();
    this.dictionary = words;
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

  searchWord(arr, word) {
    for (let i = 0; i < this.dictionary.length; i += 1) {
      if (this.dictionary[i].indexOf(word) === 0) return true;
    }
    return false;
  }

  getLetterAround(x, y) {
    const letters1 = this.checkNormaDirections(x, y);
    const letters2 = this.checkDiagonalDirections(x, y);
    return [letters1[0].concat(letters2[0]), letters1[1].concat(letters2[1])];
  }

  getLetterAround(x, y) {
    const arr = [[],[]];
    let i = x - 1;
    let j = y - 1;
    let end = [i+3, j+3];
    while (i < end[0] || j < end[1]) {
      if (this.board[i] && this.board[i][j]) {
        if (i !== x || j !== y) {
          arr[0].push(this.board[i][j]);
          arr[1].push([i,j]);
        }
      }

      j += 1;
      if (i < end[0]-1 && j === end[1]) {
        j = y-1;
        i += 1;
      } else if (j === end[1]){
        i += 1;
      }
    }
    return arr;
  }

  checkCoordinate(arr, coord) {
    const arrStr = JSON.stringify(arr);
    const coordStr = JSON.stringify(coord);
    return arrStr.indexOf(coordStr) > -1;
  }

  getPossibleIndexes(arr, targetLetter) {
    const temp = [];
    for (let i = 0; i < arr.length; i += 1) {
      const letter = arr[i];
      if (letter === targetLetter) temp.push(i);
    }
    return temp;
  }

  checkEvenElement(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].length === 2) return true;
    }
    return false;
  }

  solve() {
    let counter = 0;
    let temp = undefined;
    const result = [];
    let x = 0;
    let y = 0;
    while (this.board[x] !== undefined) {
      for (let i = 0; i < this.dictionary.length; i += 1) {
        let word = this.board[x][y];
        let newX = x;
        let newY = y;
        let z = 0;
        let idx = 1;
        const previous = [];
        const possibilities = [];
        let backtrack = false;
        let notFound = false;
        const targetWord = this.dictionary[i];
        while(targetWord.indexOf(word) === 0 && !notFound) {
          const letterAround = this.getLetterAround(newX, newY);
          if (backtrack) {
            if (possibilities[z].length > 1) {
              possibilities[z].splice(0, 1);
              word += letterAround[0][possibilities[z][0]];
              newX = letterAround[1][possibilities[z]][0];
              newY = letterAround[1][possibilities[z]][1];
              z += 1;
              idx += 1;
              backtrack = false;
            } else {
              possibilities.splice(possibilities.length-1, 1);
              previous.splice(previous.length-1, 1);
              z -= 1;
              word = word.slice(0, word.length-1);
              newX = previous[z][0];
              newY = previous[z][1];
              idx -= 1;
            }
          } else {
            const possibleLetterIndexes = this.getPossibleIndexes(letterAround[0], targetWord[idx]);
            if (possibleLetterIndexes.length > 0) {
              const tempCoord = [
                letterAround[1][possibleLetterIndexes[0]][0],
                letterAround[1][possibleLetterIndexes[0]][1]
              ];
              if (!this.checkCoordinate(previous, tempCoord)) {
                possibilities.push(possibleLetterIndexes);
                previous.push([newX,newY]);
                word += letterAround[0][possibleLetterIndexes[0]];
                newX = letterAround[1][possibleLetterIndexes[0]][0];
                newY = letterAround[1][possibleLetterIndexes[0]][1];
                z += 1;
                idx += 1;
                if (targetWord === word) {
                  result.push(word);
                }
              } else {
                notFound = true;
              }
            } else if (this.checkEvenElement(possibilities)) {
              backtrack = true;
              z -= 1;
              word = word.slice(0, word.length-1);
              newX = previous[z][0];
              newY = previous[z][1];
              idx -= 1;
            } else {
              notFound = true;
            }
          }
        }
      }

      y += 1;
      if (y === this.board[0].length) {
        x += 1;
        y = 0;
      }
    }
    return result;
  }
}

const boggle = new BoggleBoard(4);
boggle.getDictionary();
console.log(boggle.shake());
console.log(boggle.solve());
// OUTPUT : TURN, SUPER