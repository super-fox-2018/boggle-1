let data = require('./data.js')
class Boggle {
	constructor(dummyBoard, alphabet, dictionary) {
		this.boardBoggle = [];
		this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		this.dummyBoard = [
			['D', 'R', 'H', 'I'],
			['K', 'U', 'P', 'S'],
			['Y', 'E', 'U', 'T'],
			['H', 'O', 'R', 'N'],
		];
		this.dictionary = data
		this.result = []
		this.koordinat = []
	}
	printBoard() {
		let counterIndex = 0;
		for (let i=0;i<4;i++) {
			this.boardBoggle[i]=[];
			for (let j=0;j<4;j++) {
				this.boardBoggle[i][j]=this.alphabet[Math.floor(Math.random() * 26)];
			}
		}
		return this.boardBoggle;
	}
	firstWord(words) {
		for (let i=0;i<words.length;i++) {
			if (this.checker(this.koordinat[this.koordinat.length-1][0], 
           	   this.koordinat[this.koordinat.length-1][1], words[i])) {
               this.searchIndexFirst.push(words[i])
           }
		}
	}
	checker(row, col, num) {
		for (let i = 0; i < 9; i++) {
			if (i === 0 && row !== 0 && this.indexChecking(row - 1, col)) {
				if (this.dummyBoard[row - 1][col] === num) {
					this.koordinat.push([row - 1, col]);
					return true;
				}
			}
			if (i === 1 && row !== 0 && col !== this.dummyBoard.length - 1 && this.indexChecking(row - 1, col + 1)){
				if (this.dummyBoard[row - 1][col + 1] === num) {
					this.koordinat.push([row - 1, col + 1]);
					return true;
				}
			}
			if (i === 2 && col !== this.dummyBoard.length - 1 && this.indexChecking(row, col + 1)) {
				if (this.dummyBoard[row][col + 1] === num) {
					this.koordinat.push([row, col + 1]);
					return true;
				}
			}
			if (i === 3 && row !== this.dummyBoard.length - 1 && col !== this.dummyBoard.length - 1 && this.indexChecking(row + 1, col + 1)) {
				if (this.dummyBoard[row + 1][col + 1] === num) {
					this.koordinat.push([row + 1, col + 1]);
					return true;
				}
			}
			if (i === 4 && row !== this.dummyBoard.length - 1 && this.indexChecking(row + 1, col)) {
				if (this.dummyBoard[row + 1][col] === num) {
					this.koordinat.push([row + 1, col]);
					return true;
				}
			}
			if (i === 5 && row !== this.dummyBoard.length - 1 && col !== 0 && this.indexChecking(row + 1, col - 1)) {
				if (this.dummyBoard[row + 1][col - 1] === num) {
					this.koordinat.push([row + 1, col - 1]);
					return true;
				}
			}
			if (i === 6 && col !== 0 && this.indexChecking(row, col - 1)) {
				if (this.dummyBoard[row][col - 1] === num) {
					this.koordinat.push([row, col - 1]);
					return true;
				}
			}
			if (i === 7 && row !== 0 && col !== 0 && this.indexChecking(row - 1, col - 1)) {
				if (this.dummyBoard[row - 1][col - 1] === num) {
					this.koordinat.push([row - 1, col - 1]);
					return true;
				}
			}
			if (i === 8) {
				return false;
			}
		}
	}
	indexChecking(row, col) {
		for (let i=0;i<=this.koordinat.length;i++) {
			if (i===this.koordinat.length) {
				return true;
			}
			if (this.koordinat[i][0]===row && this.koordinat[i][1]===col) {
				return false;
			}
		}
	}
	solve() {
        let board =  this.boardBoggle
        //console.log(board)
        for (let i = 0; i < board.length; i++) {
           for (let j = 0; j < board.length; j++) {
               for (let k = 0; k < this.dictionary.length; k++) {
                   //if menemukan first koordinat
                   if (board[i][j] === this.dictionary[k][0]) {
                        this.searchIndexFirst = []
                        this.koordinat.push([i,j])
                        this.searchIndexFirst.push(this.dictionary[k][0])
                        this.firstWord(this.dictionary[k])

                        if (this.searchIndexFirst.length === this.dictionary[k].length) {
                            this.result.push(this.searchIndexFirst)
                        }
                   }
                   this.koordinat = []
               }           
           }
        }
        let arr = []
        for (let g = 0; g < this.result.length; g++) {
            arr.push(this.result[g].join(''))
        }
        console.log(arr.join(' '))
        return `Found ${this.result.length} matches words!`
       	
	}
}
var boggle = new Boggle();
boggle.printBoard()
boggle.solve()
console.log(boggle.solve())
