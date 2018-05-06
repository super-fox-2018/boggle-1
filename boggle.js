class Boggle {
	constructor(dummy,list){
		this.board=dummy;
		this.dictionary=list;

	}


	generateBoard() {
		var multiDim=[];
		for(var i=0;i<4;i++) {
				var arr=[];
			for(var j=0;j<4;j++) {
				arr.push(String.fromCharCode(Math.floor((Math.random()*25)+65)));
			}
		multiDim.push(arr);	
		}
		this.board=multiDim;
		return multiDim;
	}



	checkHorizontal(currentRowPos,currentColPos,indexDict,indexDictLength) {
		if(this.board[currentRowPos][currentColPos+1]===this.dictionary[indexDict][indexDictLength] || this.board[currentRowPos][currentColPos-1]===this.dictionary[indexDict][indexDictLength]) {
			return true
		}
		return false;
	}

	checkVertical(currentRowPos,currentColPos,indexDict,indexDictLength){
		if(this.board[currentRowPos+1]!==undefined){
			if(this.board[currentRowPos+1][currentColPos]===this.dictionary[indexDict][indexDictLength]) {
				return true
			}
		}
		if(this.board[currentRowPos-1]!==undefined) {
			if(this.board[currentRowPos-1][currentColPos]===this.dictionary[indexDict][indexDictLength]) {
			return true
			}
		}
		return false;
	}

	checkDiagonal(currentRowPos,currentColPos,indexDict,indexDictLength){
		if(this.board[currentRowPos-1]!==undefined && this.board[currentColPos-1] !== undefined) {
			if(this.board[currentRowPos-1][currentColPos-1]===this.dictionary[indexDict][indexDictLength]) {
				return true;
			}
		}

		if(this.board[currentRowPos-1] !==undefined && this.board[currentColPos+1] !== undefined) {
			if(this.board[currentRowPos-1][currentColPos+1]===this.dictionary[indexDict][indexDictLength]) {
				return true;
			}
		}

		if(this.board[currentRowPos+1] !== undefined && this.board[currentColPos-1] !== undefined) {
			if(this.board[currentRowPos+1][currentColPos-1]===this.dictionary[indexDict][indexDictLength]) {
				return true;
			}
		}

		if(this.board[currentRowPos+1] !== undefined && this.board[currentColPos+1] !== undefined) {
			if(this.board[currentRowPos+1][currentColPos+1]===this.dictionary[indexDict][indexDictLength]) {
				return true;
			}
		}
	}

	
	solve() {
		var result=0;
		var currentRowPos=0;
		var currentColPos=0;
		var resultWord=[];
		for(let i=0;i<this.dictionary.length;i++) {
			for(let k=0;k<this.board.length;k++) {
				for(let m=0;m<this.board[k].length;m++) {
					var count=0;
					if(this.dictionary[i][0]===this.board[k][m]){
						currentRowPos=k;
						currentColPos=m;
						for (var p=1;p<this.dictionary[i].length;p++) {
							if(this.checkHorizontal(currentRowPos,currentColPos,i,p)===true) {
								if(this.board[currentRowPos][currentColPos-1]===this.dictionary[i][p]){
									currentColPos--;
									count++;
								}else {
									currentColPos++;
									count++;
								}
							 }else if(this.checkVertical(currentRowPos,currentColPos,i,p)===true){
								if(this.board[currentRowPos-1]!==undefined){
									if(this.board[currentRowPos-1][currentColPos]===this.dictionary[i][p]) {
										currentRowPos--;
										count++
									}
								}
								if(this.board[currentRowPos+1]!==undefined){	
									if(this.board[currentRowPos+1][currentColPos]===this.dictionary[i][p]) {
										currentRowPos++;
										count++
									}
								}	
							}else if(this.checkDiagonal(currentRowPos,currentColPos,i,p)===true) {
								if(this.board[currentRowPos-1]!==undefined && this.board[currentRowPos+1]!==undefined) {
									if(this.board[currentRowPos-1][currentColPos-1]===this.dictionary[i][p]) {
										currentRowPos--;
										currentColPos--;
										count++;
									}
								}
								if(this.board[currentRowPos-1]!==undefined && this.board[currentColPos+1]!==undefined) {
									if(this.board[currentRowPos-1][currentColPos+1]===this.dictionary[i][p]) {
										currentRowPos--;
										currentColPos++;
										count++;
									}
								}
								if(this.board[currentRowPos+1]!==undefined && this.board[currentColPos-1]!==undefined) {
									if(this.board[currentRowPos+1][currentColPos-1]===this.dictionary[i][p]) {
										currentRowPos++;
										currentColPos--;
										count++;
									}
								}
								if(this.board[currentRowPos+1]!==undefined && this.board[currentColPos+1]!==undefined) {
									if(this.board[currentRowPos+1][currentColPos+1]===this.dictionary[i][p]) {
										currentRowPos++;
										currentColPos++;
										count++;
									}
								}

							}	
									
						}
					if(count===this.dictionary[i].length-1) {
						result+=1;
						resultWord.push(this.dictionary[i]);
					}	
					}
				}
			}
		}
		if(result<=1) {
			console.log(result+" word found :"+"\n"+resultWord.join("\n"));	
		}else{
			console.log(result+" words found :"+"\n"+resultWord.join("\n"))
		}
		
	}


}


var dummy=
[["A","P","H","I"],
["K","E","E","S"],
["A","S","U","T"],
["C","O","R","N"]]
var list=["APPLE","SIT","TRIP","TURN","SUPER","ISTN","SUER","YEPS","ISU","CORN","APES","ASUE","PESO","API"]; //TURN,ISTN,ISU,CORN,APES,ASUE,PESO

// var dummy=
// [["D","G","H","I"],
// ["K","L","P","S"],
// ["Y","E","U","T"],
// ["C","O","R","N"]]
// var list=["APPLE","SIT","TRIP","TURN","SUPER","ISTN","SUER","YEPS","ISU","CORN"]; //TURN,SUPER,ISTN,SUER,YEPS,ISU,CORN



var game= new Boggle(dummy,list);


console.log(dummy);
(game.solve());


