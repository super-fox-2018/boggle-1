class Boggle{

    constructor(){
        var wordsBoard
    }

    get Kamus(){
        return this.makeKamus()
    }

    makeKamus(){
        this.data = require('./data.js')
        // return ['APPLE','SIT','TRIP','TURN','SUPER','RUN','CAT','PET','EGG','DOG','SUIT','KING','KIND','MUG','LOG','LOCK','ON','SON','SUN','PAR','PAIR','TASK','NUN','MOM','DAD','ROB','MAN','PAY','NOON','WAY','WAS','LOOK','MORE','JAR','BARK','BEEF','BEAM','SOON','DEER','DEAR','RUSH','ANT','ANY','STEEL','STEAL','SIP','GAP','TIE','MOON','OFF','FALL','COW','STUN','BEER','TAN','TAIL','PIT','TALE','STYLE','RAW','BOT','FLY','BOB','SOB','FRY','SKY','STUT'].sort()
        return this.data
    }

    makeWords(){        
        var chosenLetters=[[]]
        var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        var index=0
        for(var i=0;i<16;i++){
            if(chosenLetters[index].length==4){
                index++
                chosenLetters[index]=[]
            }
            chosenLetters[index].push(letters[parseInt(Math.random()*25)])
        }
        this.wordsBoard=chosenLetters
        return this.wordsBoard
    }

    getAllPossiblePairs(){
        var result = []
        for(var i=0;i<this.wordsBoard.length;i++){
            for(var j=0;j<this.wordsBoard[i].length;j++){
                for(var n=0;n<this.Kamus.length;n++){
                    if(this.wordsBoard[i][j]==this.Kamus[n].charAt(0)){
                        // console.log(`row: ${i} column: ${j}|| ${this.Kamus[n]}`)
                        if(this.startchecking(i,j,this.Kamus[n])!==false){
                            // console.log(`row: ${i} column: ${j} || value: ${this.wordsBoard[i][j]} || words matched with Kamus: ${this.Kamus[n]}`)
                            if(result.indexOf(this.startchecking(i,j,this.Kamus[n]))<0){
                                result.push(this.startchecking(i,j,this.Kamus[n]))
                            }
                        }   
                    }
                }
            }
        }
        return result.length==0?'nothing found':result
    }

    startchecking(row,column,words){
        var index = 1
        var checker = this.checkAround(row,column)
        var array = [[row,column].toString()]
        var backtrackLetterIndex = []
        var backtrackSpot = []
        var possibleOutcome = []
        var i = 0
        while(i<checker.length){
            if(words.charAt(index)!==''){
                if(this.wordsBoard[checker[i][0]][checker[i][1]]==words.charAt(index)&&backtrackSpot.indexOf([checker[i][0],checker[i][1]].toString())<0){
                    possibleOutcome.push([checker[i][0],checker[i][1]])
                }
                if(i == checker.length-1){
                    if(possibleOutcome.length==1){
                        row = possibleOutcome[0][0]
                        column = possibleOutcome[0][1]
                        possibleOutcome=[]
                        if(array.indexOf([row,column].toString())<0){
                            index++
                            array.push([row,column].toString())
                            checker = this.checkAround(row,column)
                            i=-1
                        }
                    }else if(possibleOutcome.length>1){
                        backtrackSpot.push(possibleOutcome[0].toString())
                        backtrackLetterIndex.push(index)
                        row = possibleOutcome[0][0]
                        column = possibleOutcome[0][1]
                        possibleOutcome=[]
                        if(array.indexOf([row,column].toString())<0){
                            index++
                            array.push([row,column].toString())
                            checker = this.checkAround(row,column)
                            i=-1
                        }
                    }else{
                        if(backtrackLetterIndex.length>0){
                            array.splice(backtrackLetterIndex[backtrackLetterIndex.length-1],(array.length-(backtrackLetterIndex[backtrackLetterIndex.length-1]-1)))
                            index = backtrackLetterIndex[backtrackLetterIndex.length-1]
                            backtrackLetterIndex.splice(backtrackLetterIndex.length-1,1)
                            row = array[array.length-1].split(',')[0]
                            column = array[array.length-1].split(',')[1]
                            checker = this.checkAround(row,column)
                            i=-1
                        }
                    }
                }
            }
            i++
        }
        this.result = array.length==words.length? words:false
        return this.result
    }

    checkAround(row,column){
        var array = []
        for(var i=row-1;i<=row+1;i++){
            for(var j=column-1;j<=column+1;j++){
                if(i!==row||j!==column){ 
                    if(i>=0&&j>=0&&i<this.wordsBoard.length&&j<this.wordsBoard.length){
                        array.push([i,j])
                    }
                }
            }
        }
        return array
    }
}


var game = new Boggle()

console.log(game.makeWords())
console.log(game.getAllPossiblePairs())