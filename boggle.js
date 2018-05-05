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
        var SearchedWordIndex = 1
        var checker = this.checkAround(row,column)
        var RowColumnList = [[row,column].toString()]
        var backtrackLetterIndex = []
        var backtrackSpot = []
        var possibleOutcome = []
        var i = 0
        while(i<checker.length){
            if(this.wordsBoard[checker[i][0]][checker[i][1]]==words.charAt(SearchedWordIndex)&&backtrackSpot.indexOf([checker[i][0],checker[i][1]].toString())<0){
                possibleOutcome.push([checker[i][0],checker[i][1]])
            }
            if(i == checker.length-1){
                if(possibleOutcome.length==1){
                    row = possibleOutcome[0][0]
                    column = possibleOutcome[0][1]
                    possibleOutcome=[]
                    if(RowColumnList.indexOf([row,column].toString())<0){
                        SearchedWordIndex++
                        RowColumnList.push([row,column].toString())
                        checker = this.checkAround(row,column)
                        i=-1
                    }
                }else if(possibleOutcome.length>1){
                    backtrackSpot.push(possibleOutcome[0].toString())
                    backtrackLetterIndex.push(SearchedWordIndex)
                    row = possibleOutcome[0][0]
                    column = possibleOutcome[0][1]
                    possibleOutcome=[]
                    if(RowColumnList.indexOf([row,column].toString())<0){
                        SearchedWordIndex++
                        RowColumnList.push([row,column].toString())
                        checker = this.checkAround(row,column)
                        i=-1
                    }
                }else{
                    if(backtrackLetterIndex.length>0){
                        RowColumnList.splice(backtrackLetterIndex[backtrackLetterIndex.length-1],(RowColumnList.length-(backtrackLetterIndex[backtrackLetterIndex.length-1]-1)))
                        SearchedWordIndex = backtrackLetterIndex[backtrackLetterIndex.length-1]
                        backtrackLetterIndex.splice(backtrackLetterIndex.length-1,1)
                        row = RowColumnList[RowColumnList.length-1].split(',')[0]
                        column = RowColumnList[RowColumnList.length-1].split(',')[1]
                        checker = this.checkAround(row,column)
                        i=SearchedWordIndex-1
                    }
                }
            }
            i++
        }
        this.result = RowColumnList.length==words.length? words:false
        return this.result
    }

    checkAround(row,column){
        var LettersAroundtheSpot = []
        for(var i=row-1;i<=row+1;i++){
            for(var j=column-1;j<=column+1;j++){
                if(i!==row||j!==column){ 
                    if(i>=0&&j>=0&&i<this.wordsBoard.length&&j<this.wordsBoard.length){
                        LettersAroundtheSpot.push([i,j])
                    }
                }
            }
        }
        return LettersAroundtheSpot
    }
}


var game = new Boggle()

console.log(game.makeWords())
console.log(game.getAllPossiblePairs())