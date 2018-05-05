class BoggleBoard {
  constructor(dimension) {
    this.dictionary = null;
    this.dimension = dimension || 4;
    // this.board = this.generateBoard(this.dimension);
    // this.board = [
    //   ['D', 'G', 'E', 'I'],
    //   ['K', 'S', 'P', 'T'],
    //   ['Y', 'E', 'U', 'P'],
    //   ['E', 'O', 'R', 'N']
    // ];

    this.board = [
      ['D', 'G', 'H', 'I'],
      ['K', 'L', 'P', 'S'],
      ['Y', 'E', 'U', 'T'],
      ['E', 'O', 'R', 'N']
    ];
    // this.board = [
    //   ['D', 'Z', 'N', 'Z'],
    //   ['A', 'Z', 'U', 'Z'],
    //   ['Z', 'Z', 'O', 'Z'],
    //   ['Z', 'Z', 'Z', 'M']
    // ];
  }

  getDictionary() {
    // const words = require('./data.js');
    const words = ['APPLE', 'SIT', 'TURN', 'SUPER'].sort();
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

  checkDiagonalDirections(x, y) {
    const letters = [[],[]];
    if (this.board[x-1] && this.board[x-1][y+1] !== undefined) {
      letters[0].push(this.board[x-1][y+1]);
      letters[1].push([x-1, y+1]);
    }

    if (this.board[x+1] && this.board[x+1][y+1] !== undefined) {
      letters[0].push(this.board[x+1][y+1]);
      letters[1].push([x+1, y+1]);
    }

    if (this.board[x+1] && this.board[x+1][y-1] !== undefined) {
      letters[0].push(this.board[x+1][y-1]);
      letters[1].push([x+1, y-1]);
    }

    if (this.board[x-1] && this.board[x-1][y-1] !== undefined) {
      letters[0].push(this.board[x-1][y-1]);
      letters[1].push([x-1, y-1]);
    }

    return letters;
  }

  checkNormaDirections(x, y) {
    const letters = [[],[]];
    if (this.board[x][y+1] !== undefined) {
      letters[0].push(this.board[x][y+1]);
      letters[1].push([x, y+1]);
    }

    if (this.board[x][y-1] !== undefined) {
      letters[0].push(this.board[x][y-1]);
      letters[1].push([x, y-1]);
    }

    if (this.board[x-1] && this.board[x-1][y] !== undefined) {
      letters[0].push(this.board[x-1][y]);
      letters[1].push([x-1, y]);
    }

    if (this.board[x+1] && this.board[x+1][y] !== undefined) {
      letters[0].push(this.board[x+1][y]);
      letters[1].push([x+1, y]);
    }

    return letters;
  }

  checkPossibilities(x, y) {
    const letters1 = this.checkDiagonalDirections(x, y);
    const letters2 = this.checkNormaDirections(x, y);
    return [letters1[0].concat(letters2[0]), letters1[1].concat(letters2[1])];
  }

  checkCoordinate(arr, coord) {
    // for (let i = 0; i < arr.length; i += 1) {
    //   if (arr[i][0] === x && arr[i][1] === y) {
    //     return true;
    //   }
    // }
    // return false;
    const arrStr = JSON.stringify(arr);
    const coordStr = JSON.stringify(coord);
    return arrStr.indexOf(coordStr) > -1;
  }

  getAllPossibleLetters(arr, targetLetter) {
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
    console.log(this.board);
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
        const targetWord = this.dictionary[i];
        while(targetWord.indexOf(word) === 0) {
          const possibleLetters = this.checkPossibilities(newX, newY);
          // if (backtrack) {
            // if (possibilities.length > 1) {
            //   possibilities[z].splice(0, 1);
            //   word += possibleLetters[0][possibilities[z][0]];
            //   newX = possibleLetters[1][newLetterIdx][0];
            //   newY = possibleLetters[1][newLetterIdx][1];
            //   z += 1;
            //   idx += 1;
            //   backtrack = false;
            // } else {

            // }
          const newLetterIndexes = this.getAllPossibleLetters(possibleLetters[0], targetWord[idx]);
          if (newLetterIndexes.length > 0) {
            const tempCoord = [possibleLetters[1][newLetterIndexes[0]][0],possibleLetters[1][newLetterIndexes][1]];
            if (!this.checkCoordinate(previous, tempCoord)) {
              possibilities.push(newLetterIndexes);
              previous.push([newX,newY]);
              word += possibleLetters[0][newLetterIndexes[0]];
              newX = possibleLetters[1][newLetterIndexes[0]][0];
              newY = possibleLetters[1][newLetterIndexes[0]][1];
              z += 1;
              idx += 1;
              if (targetWord === word) {
                result.push(word);
              }
            } else {
              break;
            }
            // else if (this.checkEvenElement(possibilities)) {
            //   backtrack = true;
            //   possibilities.splice(possibilities.length - 1, 1);
            //   z -= 1;
            //   word.splice(word.length - 1, 1);
            //   newX = possibilities[z][0];
            //   newY = possibilities[z][1];
            //   idx -= 1;
            // } 
          } else {
            break;
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
// console.log(boggle.shake());
console.log(boggle.solve());
// OUTPUT : TURN, SUPER