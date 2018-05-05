class Boggle {
    constructor (letter, scale, library){
        // this.letter="ABCDEFGHIJKLMNOPQRSTU"
        this.letter="DGHIKLPSYEUTEORN"
        this.scale=4
        this.library = ["SUPER","TURN", "FOO", "PUT", "GONE", "STOP", "MAGIC", "EYE"]     
    } 

    randomProcess(letter, scale, board){
        var board=[]
        var arr=[]
        for (let i=0; i<this.scale; i++){
            for(let j=0; j<this.scale; j++){
                var random = this.letter[Math.floor(Math.random()*this.letter.length)]
                // var random=this.letter[j] // buat sek pas gak random
                    if(arr.length < this.scale){
                        arr.push(random)
                    }
                    if(arr.length === this.scale){
                        board.push(arr)
                        arr=[]
                    }      
            }
        }
        // return board
        console.log(board)

        var testBoard=board.join()
            for(let x=0; x<this.library.length; x++){ // looping library
                var splitEachLibrary=this.library[x].split("") // split setiap index library
                // console.log(splitEachLibrary)
                var checkLibrary=""
                var result=[]
                for (let z=0; z<splitEachLibrary.length; z++){ // yg udh di split looping
                    // console.log(splitEachLibrary[z])
                    // console.log(board[a].indexOf(splitEachLibrary[z]))
                    if (testBoard.indexOf(splitEachLibrary[z]) !== -1){ // trus ceh dr index library yg d split td satu" ada nggak huruf itu di board
                    checkLibrary+=splitEachLibrary[z] // klu ada tampung disini
                    // console.log(checkLibrary)
                    }
                }
                // console.log(checkLibrary)
                // console.log(this.library.indexOf(checkLibrary))
                if(this.library.indexOf(checkLibrary) !== -1){ // trus coba check di library dia ada or nggak
                    result.push(checkLibrary) // kalau ada push hasilnya
                    checkLibrary=""
                }
            }
        if(result.length === 0){
            return  "Tidak ada kata yang ditemukan"
        }
        else {
            return ("Jumlah kata yang ditemukan: " + result.length + " " + result.join())
        }
    }
}

var shakeGame = new Boggle()
shakeGame.randomProcess()
console.log(shakeGame.randomProcess())
