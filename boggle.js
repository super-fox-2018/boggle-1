class Boogle{
    constructor(word){
        this.board = [ ['a', 'k', 'j', 'd' ],
        [ 'z', 'a', 'o', 'h' ],
        [ 'g', 'e', 'b', 'r' ],
        [ 't', 'f', 'j', 'v'] ]
        this.word = word;
        this.coorWord = []
        this.valid = false;
    }
    // Ngerand papan dan fix
    // papan(){
    //     var tempoBoard = []
    //     for(var i=0; i<4; i++){
    //         var boardInner1 = [];
    //         for(var j=0; j<4; j++){
    //             var boardInner2 = []
    //             var alphabet = "abcdefghijklmnopqrstuvwxyz";
    //             var rand = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    //             boardInner2.push(rand);
    //             boardInner1.push(boardInner2);
    //         }
    //     tempoBoard.push(boardInner1);
    //     this.board = tempoBoard;
    //     }
    // }

    // Cek kata ada disitu apa ngga
    // cekKata(){
    //     var validCekKata = [];
    //     for(var iword=0; iword<this.word.length; iword++){
    //         this.cekBaris(this.word[iword]);
    //         validCekKata.push(this.valid);
    //         this.valid = false;
    //     }
    //     console.log(this.coorWord);
    //     console.log(validCekKata);
    //     return validCekKata.every(x => x === true);
    // }

    // cekBaris(iword){ //cek katanya ada apa ngga di dalam board
    //     for(var irow=0; irow<this.board.length; irow++){
    //         for(var jrow=0; jrow<this.board[irow].length; jrow++){
    //             if(iword === this.board[irow][jrow]){
    //                 var coor = [];
    //                 coor.push(irow, jrow);
    //                 this.valid = true;
    //                 this.coorWord.push(coor);
    //             }
    //         }
    //     }
    //     return this.coorWord;
    // }

    //cek kiri kanan / Atas Bawah (Masih Belum Ketemu)
    cekKata(){
        var validCekKata = [];
        for(var iword=0; iword<this.word.length; iword++){
            for(var irow=0; irow<this.board.length; irow++){
                for(var jrow=0; jrow<this.board[irow].length; jrow++){
                    if(this.word[iword] === this.board[irow][jrow]){
                        if(irow == 0 && jrow == 0){
                            var coor = [];
                            coor.push(irow, jrow);
                            this.valid = true;
                            this.coorWord.push(coor);
                        }if(this.board[this.coorWord[iword][0]][this.coorWord[iword][1]] !== this.board[rowi][rowj]){
                            var coor = [];
                            coor.push(irow, jrow);
                            this.valid = true;
                            this.coorWord.push(coor);
                        }
                    }
                }
            }
            validCekKata.push(this.valid);
            this.valid = false;
        }
        return this.coorWord;
    }

    cekBaris(iword){ //cek katanya ada apa ngga di dalam board
        for(var irow=0; irow<this.board.length; irow++){
            for(var jrow=0; jrow<this.board[irow].length; jrow++){
                if(iword === this.board[irow][jrow]){
                    var coor = [];
                    coor.push(irow, jrow);
                    this.valid = true;
                    this.coorWord.push(coor);
                }
            }
        }

    }


    cekKiriKanan(cekBaris){

    }

    cekAtasBawah(cekBaris){

    }

    cekSerong(cekBaris){

    }

}

var game = new Boogle;
game.word = "kasir";
console.log(game.cekKata());
