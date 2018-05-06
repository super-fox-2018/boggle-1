class Boggle{
  constuctor(data_string){
    // this.data = shake_temp;
  }
  shake(num){
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var board = [];
    for (var i = 0; i < num; i++) {
      var small_board = [];
      for (var j = 0; j < num; j++) {
        small_board.push(alphabet[Math.floor(Math.random()*alphabet.length)]);
      }
      board.push(small_board);
    }
    return board;
  }

  solve(){
    var temp = [];
    var backtrack = [];
    var status = false;
    var coba = this.shake_txt();
    for (var i = 0; i < data_string.length; i++) {
      for (var j = 0; j < data_string[i].length; j++) {
        var break_status = false;
        for (var k = 0; k < coba.length; k++) {
          if (break_status) {
            break;
          }
          for (var l = 0; l < coba[k].length; l++) {
          var small_bk = [];
            if(temp.length==0){
              if(data_string[i][j]===coba[k][l]){
                temp.push(coba[k][l]);
                small_bk.push(k);
                small_bk.push(l);
                backtrack.push(small_bk);
                console.log(backtrack);
                console.log(small_bk);
                break_status = true;
                break;
              }
            }
            else {
              for (var m = 0; m < 4; m++) {
                var bt = backtrack[backtrack.length-1];
                // console.log(coba[bt[0]-1][bt[1]-1]);
                if (m = 0) {
                  if(coba[bt[0]-1][bt[1]-1]==data_string[i][j]){
                    var a = bt[0]-1;
                    var b = bt[1]-1;
                    status = true;
                    temp.push(coba[a][b]);
                    small_bk.push(a);
                    small_bk.push(b);
                    backtrack.push(small_bk);
                    break_status = true;
                    break;
                  }
                  else if (coba[bt[0]-1][bt[1]-1]==data_string[i][j]) {

                  }
                }
                // else {
                //   temp.push('test');
                //   // backtrack.push(0);
                //   break_status = true;
                // }
                // this.getIndexOf(backtrack,[])
              }
            }
          }
        }
      }
    }
    console.log(backtrack);
    console.log(temp);
    return coba;

  }

  // getIndexOf(backtrack,array){
  //   f
  // }

  shake_txt(){
    var board_shake = [];
    var a = 0;
    var board = [];
    var num = Math.sqrt(shake_temp.length);
    for (var i = 0; i < num; i++) {
      board = [];
      for (var j = 0; j < num; j++) {
        board.push(shake_temp[a]);
        a++;
        debugger;
      }
      board_shake.push(board);
    }
    console.log(board_shake);
    return board_shake;
  }


}


const data_string = ['OKI','NAME','CODE','DEGAN','ERAT'];
// 'use strict'




const fs = require('fs');
// var a = ['A','B','D'];
var shake_temp = fs.readFileSync('shake.txt')
.toString()
.split(',')
var boggle = new Boggle(shake_temp);
// console.log(shake_temp);
if (shake_temp=='') {
 var a = fs.appendFileSync('shake.txt', boggle.shake(5));
}
console.log(data_string);
// console.log(boggle.shake(5));
console.log(boggle.shake_txt());
// console.log(boggle.solve());
