class Boggle {
  constructor() {
    var kamus = ['TES', 'WOW', 'YAP'];
    this.kamus = kamus;
  }

  isiAcak() {
    let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let ran = Math.floor(Math.random() * abc.length);
    return abc[ran];
  }

  //board isi acak abc tpi blom dipakai,,
  //pkai cek manual dulu di bawah (cekIndekLine)
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

  result(sum, arr) {
    return sum + ' Words found: ' + '\n' + arr.join('\n');
  }


  //cek right side
  cekIndekLine() {

    //manual board
    let board = [
      ['D', 'G', 'H', 'I'],
      ['K', 'T', 'E', 'S'],
      ['Y', 'A', 'P', 'F'],
      ['W', 'O', 'W', 'P'],
    ];

    console.log(board); //

    var count = 0;
    var fill = 0;
    var result = [];
    var dictionarytemp = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        for (let k = 0; k < this.kamus.length; k++) {
          if (board[i][j] === this.kamus[k][fill]) {
            fill++;

            dictionarytemp.push(board[i][j]);

            if (dictionarytemp.join('') === this.kamus[k]) {
              result.push(this.kamus[k]);
              dictionarytemp = [];
              fill = 0;
              count++;
            }
          }
        }
      }
    }

    return this.result(count, result);
  }



  cekBawah() {





  }



  cekDiagonal() {





  }





}
//end of class

var Bogglegame = new Boggle();
console.log(Bogglegame.cekIndekLine());
