class Boggle {
  constructor(num) {
    //let kamus = require('./data.js');

    //using my own dictionary
    let kamus = [
      'MAKAN',
      'HACKTIV',
      'ES',
      'SEGAR',
      'BLACK',
      'BLUE',
      'NASI',
      'lAPAR',
      'MINUM',
      'HAUS',
      'WAKTU',
      'BERLALU',
      'CEPAT',
      'JAVA',
      'LARI',
      'DUDUK',
      'PUASA',
      'LAGU',
      'MENYANYI',
      'HORE',
      'WOW',
      'BUAH',
      'RIP',
      'GREEN',
      'TOS',
      'SOLVE',
      'REST',
      'TART',
    ];
    this.kamus = kamus;
    this.num = num || 4;
    this.board = this.makeBoard(this.num);
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
  cekkanan() {
    let board = this.board;
    var ss = [];
    var count = 0;
    var kamus1 = 0;
    var temp = [];
    var rightResult = [];

    var kamus = this.kamus;

    for (let i = 0; i < kamus.length; i++) {
      kamus1 = 0;
      temp = [];
      ss = [];
      for (let j = 0; j < board.length; j++) {
        for (let k = 0; k < board[j].length; k++) {
          if (kamus[i][kamus1] === board[j][k]) {
            kamus1++;
            temp.push(board[j][k]);
            ss.push(j + '' + k);

            if (temp.join('') === kamus[i]) {
              rightResult.push(kamus[i]);

              count++;
            }
          }
        }
      }
    }
    return rightResult;
  }

  //cek kekiri && keatas diagonal
  cekkiri() {
    let board = this.board;

    var cek = [];
    var count = 0;
    var kamus1 = 0;
    var temp = [];
    var leftResult = [];
    ss = [];
    var kamus = this.kamus;

    for (let i = kamus.length - 1; i >= 0; i--) {
      kamus1 = 0;
      temp = [];
      var ss = [];
      for (let j = board.length - 1; j >= 0; j--) {
        for (let k = board[j].length - 1; k >= 0; k--) {
          if (kamus[i][kamus1] === board[j][k]) {
            kamus1++;
            temp.push(board[j][k]);
            ss.push(j + ' ' + k);

            if (temp.join('') === kamus[i]) {
              leftResult.push(kamus[i]);

              count++;
            }
          }
        }
      }
    }
    return leftResult;
  }

  cekdiagonalAcak() {
    //WOW
  }

  Show() {
    let board = this.board;
    console.log(board);
    let left = Bogglegame.cekkiri();
    let right = Bogglegame.cekkanan();
    var combine = left.concat(right);
    let final = [];

    for (let i = 0; i < combine.length; i++) {
      if (final.includes(combine[i]) === false) {
        final.push(combine[i]);
      }
    }

    return final.length + ' Words found: ' + '\n' + final.join(' \n');
  }
}
//end of class

//input how many board will be shown below:
var Bogglegame = new Boggle(7);
console.log(Bogglegame.Show());
