class Boggle {
  constructor() {
    //let kamus = require('./data.js');

    //using my own dictionary
    let kamus = ['MAKAN', 'HACKTIV', 'ES', 'SEGAR', 'BLACK', 'BLUE', 'NASI', 'lAPAR', 'MINUM', 'HAUS', 'WAKTU', 'BERLALU', 'CEPAT', 'JAVA', 'LARI', 'DUDUK', 'PUASA', 'LAGU', 'MENYANYI', 'HORE', 'WOW', 'BUAH', 'RIP', 'GREEN', 'TOS', 'SOLVE', 'REST', 'TART']
    this.kamus = kamus;

  }

  isiAcak() {
    let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let ran = Math.floor(Math.random() * abc.length);
    return abc[ran];
  }

  makeBoard(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push([]);
      for (let j = 0; j < num; j++) {
        arr[i].push(this.isiAcak());
      }
    }

    return arr;
  }


  //Cek arah kanan kebawah && diagonal
  cekkanan(manyboards) {
    let board = this.makeBoard(manyboards)

    var count = 0;
    var kamus1 = 0;
    var temp = [];
    var rightResult = [];

    var kamus = this.kamus;

    for (let i = 0; i < kamus.length; i++) {
      kamus1 = 0;
      temp = [];
      for (let j = 0; j < board.length; j++) {
        for (let k = 0; k < board[j].length; k++) {
          if (kamus[i][kamus1] === board[j][k]) {
            kamus1++;
            temp.push(board[j][k]);

            if (temp.join('') === kamus[i]) {
              rightResult.push(kamus[i]);

              count++;
            }
          }
        }
      }
    }
    return rightResult
  }



  //cek kekiri && keatas diagonal
  cekkiri(manyboards) {
    let board = this.makeBoard(manyboards)

    var count = 0;
    var kamus1 = 0;
    var temp = [];
    var leftResult = [];

    var kamus = this.kamus;

    for (let i = kamus.length - 1; i >= 0; i--) {
      kamus1 = 0;
      temp = [];
      for (let j = board.length - 1; j >= 0; j--) {
        for (let k = board[j].length - 1; k >= 0; k--) {
          if (kamus[i][kamus1] === board[j][k]) {
            kamus1++;
            temp.push(board[j][k]);

            if (temp.join('') === kamus[i]) {
              leftResult.push(kamus[i]);

              count++;
            }
          }
        }
      }
    }
    return leftResult
  }

  cekdiagonalAcak() {
    //WOW

  }




  Show(no) {
    let board = this.makeBoard(no)
    console.log(board)
    let left = Bogglegame.cekkiri(no)
    let right = Bogglegame.cekkanan(no)
    var combine = (left.concat(right))
    let final = []

    for (let i = 0; i < combine.length; i++) {
      if (final.includes(combine[i]) === false) {
        final.push(combine[i])
      }

    }




    console.log('_________________________________')
    return final.length + ' Words found: ' + '\n' + final.join(' \n')


  }
}
//end of class
var Bogglegame = new Boggle();
//input how many board will be shown below:
console.log(Bogglegame.Show(8));
