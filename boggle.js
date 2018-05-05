class Boggle{
    constructor(){
        this.name = 'boggle';
        this.foundWord = [];

    }

    randomNumber(lim){
        var chooseAlp = Math.floor(Math.random()*lim);
        return chooseAlp;
    }
    
    board(){
        var blankBoard = [];
        var sizeBoard = 4;
        var alp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        var dummyAlp = 'DGHOKLPSYEUTEORN'
        var indxDum = 0;
        
        for(let a = 0; a < sizeBoard; a++){
            blankBoard.push([])
            for(let b = 0; b < sizeBoard; b++ ){
                //blankBoard[a].push(alp[this.randomNumber(25)])
                blankBoard[a].push(dummyAlp[indxDum]); indxDum++;
            }
        }//end for a
        return blankBoard;
    }

    solve(){
        var solveBoard = this.board();
        
        var indxLoockWord = 0
        var counter = 0; 
        
        
        for(let a = 0; a < solveBoard.length; a++){
            for(let b = 0; b < solveBoard[a].length; b++){
                var lockWord = '';
                var tempLetter = solveBoard[a][b]
                
                var position = [a, b]
                
                //loop kamus
                //console.log(this.kamus().length)
                for(let c=0; c<this.kamus().length; c++){
                    
                    if(this.kamus()[c][0]===tempLetter){
                        lockWord = this.kamus()[c]; console.log(lockWord)
                        var counterLockWord = 0;
                        var limCOunterLockWord = lockWord.length-1;
                        var record = [];
                        console.log(position)
                        for(let d = 1; d < lockWord.length; d++){
                            var theNextLetter = this.radius(...position, solveBoard);
                            console.log(lockWord[d])
                            console.log(theNextLetter)
                            for(let e = 0;  e <  theNextLetter.length ; e++){
                                //jika ya update position dan check di radiusnya
                                //jika tidak sama maka keluar d-1 atau pake while, jadi selama counterLockWord < lim;
                                if(lockWord[d]===theNextLetter[e][0]){
                                    record.push(theNextLetter[e][1]+theNextLetter[e][2])
                                    position = [Number(theNextLetter[e][1]), Number(theNextLetter[e][2])]
                                    counterLockWord += 1;
                                    break;
                                    
                                }
                            }
                            console.log(counterLockWord)
                         console.log(limCOunterLockWord)
                            if(counterLockWord === limCOunterLockWord){
                                this.foundWord.push(lockWord);
                            }
                        }
                        //selamahuruf di radius memenuhi kebutuhan huruf nya maka katakan true
                        //jika huruf disekitar benar maka update radius berikutnya, cek lagi
                        //jika tidak maka akan di hapus dari lockword
                        //kembali ke posisi sebelumnya
                    }
                    console.log(theNextLetter)
                    
                }
                
                

            }//end let b - for
           
        }//end let a - for

        
        return this.foundWord;
    };

    

    radius(row, col, board){
        var stepLetter = []
        var stepBoard = board;
        
        //up corner left
        if(row === 0 && col === 0){
            stepLetter.push(stepBoard[row][col+1]+[row]+[col+1] );
            stepLetter.push(stepBoard[row+1][col+1]+ [row+1]+[col+1]);
            stepLetter.push(stepBoard[row+1][col]+[row+1]+[col]);
        }
        if(col === 0 && row > 0 && row < stepBoard.length-1){
                    stepLetter.push(stepBoard[row-1][col]+[row-1]+[col])
                    stepLetter.push(stepBoard[row-1][col+1]+[row-1]+[col+1])
                    stepLetter.push(stepBoard[row][col+1]+[row]+[col+1])
                    stepLetter.push(stepBoard[row+1][col]+[row+1]+[col])
                    stepLetter.push(stepBoard[row+1][col+1]+[row+1]+[col+1]) 
        }
        if(row === 0 && col > 0 && col < stepBoard[0].length-1){
            stepLetter.push(stepBoard[row][col-1]+[row]+[col-1])
            stepLetter.push(stepBoard[row][col+1]+[row]+[col+1])
            stepLetter.push(stepBoard[row+1][col-1]+[row+1]+[col-1])
            stepLetter.push(stepBoard[row+1][col]+[row+1]+[col])
            stepLetter.push(stepBoard[row+1][col+1]+[row+1]+[col+1])
        }
            
        
        //mid area
        if(row > 0 && row < stepBoard.length-1 && col > 0 && col < stepBoard[0].length-1){
            stepLetter.push(stepBoard[row-1][col]+[row-1]+[col])
            stepLetter.push(stepBoard[row-1][col-1]+[row-1]+[col-1])
            stepLetter.push(stepBoard[row-1][col+1]+[row-1]+[col+1])
            stepLetter.push(stepBoard[row][col-1]+[row]+[col-1])
            stepLetter.push(stepBoard[row][col+1]+[row]+[col+1])
            stepLetter.push(stepBoard[row+1][col-1]+[row+1]+[col-1])
            stepLetter.push(stepBoard[row+1][col]+[row+1]+[col])
            stepLetter.push(stepBoard[row+1][col+1]+[row+1]+[col+1]) 
        }
        //bottom corner left
        if(row === stepBoard.length-1 && col === 0 ){
                stepLetter.push(stepBoard[row-1][col]+[row-1]+[col]);
                stepLetter.push(stepBoard[row-1][col+1]+[row-1]+[col+1]);
                stepLetter.push(stepBoard[row][col+1]+[row]+[col+1]);
        }

            //left side
            
        //up corner right
        if(row === 0 && col === stepBoard.length-1){
            stepLetter.push(stepBoard[row][col-1]+[row]+[col+1]);
            stepLetter.push(stepBoard[row+1][col-1]+[row+1]+[col-1]);
            stepLetter.push(stepBoard[row+1][col]+[row+1]+[col]);
    
          }
        //bottom corner right
        if(row === stepBoard.length-1 && col === stepBoard[0].length-1){
                stepLetter.push(stepBoard[row][col-1]+[row]+[col-1]);
                stepLetter.push(stepBoard[row-1][col-1]+[row-1]+[col-1]);
                stepLetter.push(stepBoard[row-1][col]+[row-1]+[col]);
            }
        //right side
                if(col === stepBoard[0].length-1 && row > 0 && row < stepBoard.length-1 ){
                    stepLetter.push(stepBoard[row-1][col]+[row-1]+[col])
                    stepLetter.push(stepBoard[row-1][col-1]+[row-1]+[col-1])
                    stepLetter.push(stepBoard[row][col-1]+[row]+[col-1])
                    stepLetter.push(stepBoard[row+1][col-1]+[row+1]+[col-1])
                    stepLetter.push(stepBoard[row+1][col]+[row+1]+[col])
                }   

        
        if(row === stepBoard.length-1 && col > 0 && col < stepBoard[0].length-1 ){
            stepLetter.push(stepBoard[row-1][col]+[row-1]+[col])
            stepLetter.push(stepBoard[row-1][col-1]+[row-1]+[col-1])
            stepLetter.push(stepBoard[row-1][col+1]+[row-1]+[col+1])
            stepLetter.push(stepBoard[row][col-1]+[row]+[col-1])
            stepLetter.push(stepBoard[row][col+1]+[row]+[col+1])
            
        }



        return stepLetter; 
    };

    recordStep(){}

    backTrack(){}
    
    kamus(){
        var keyWord = ['SIT','TURN','SUPER']
        return  keyWord;
    }

    
}


//driver code
var game = new Boggle();

console.log(game.radius( 0, 0, game.board()))
console.log(game.board())
console.log(game.solve())
console.log(game)