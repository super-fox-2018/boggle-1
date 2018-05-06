class Boggle{
  constructor(dictionary, boggleLength){
    this.dictionary = dictionary;
    this.boardLength = boggleLength;
    this.usedPosition = [];
    this.counter = 0;
    this.board = this.createBoard();
  }
  createBoard(){
    var arrBoard = [];

    for(let i = 0; i < this.boardLength; i++){
      arrBoard.push(this.shake());
    }
    return arrBoard;
  }

  shake(){
    var alph = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    var arr = [];
    for(let i = 0; i < this.boardLength;i++){
      arr.push(alph[Math.floor(Math.random() * alph.length)]);
    }
    return arr;
  }

  checkSurroundings(dictionary, arr, row, col){
    this.usedPosition.push(row + "&" + col);
    var currentRow = row;
    var currentCol = col;
    var isFound = false;
    var x = 1; //first index(idx 0) is already found in solve


    while(x < dictionary.length - 1){
      //Check right
      if(arr[currentRow][currentCol + 1] === dictionary[x] &&  (this.usedPosition.indexOf(currentRow + "&" + (currentCol+1)) === -1)){
        currentCol++;
        this.usedPosition.push(currentRow + "&" + (currentCol+1));
      }
      //Check left
      else if(arr[currentRow][currentCol - 1] === dictionary[x] &&  (this.usedPosition.indexOf(currentRow + "&" + (currentCol-1)) === -1)){
        currentCol--;
        this.usedPosition.push(currentRow + "&" + (currentCol-1));
      }
      //Check up
      else if(arr[currentRow + 1][currentCol] === dictionary[x] &&  (this.usedPosition.indexOf((currentRow+1) + "&" + currentCol) === -1)){
        currentRow++;
        this.usedPosition.push((currentRow+1) + "&" + currentCol);
      }
      //Check right
      else if(arr[currentRow-1][currentCol] === dictionary[x] &&  (this.usedPosition.indexOf((currentRow-1) + "&" + currentCol) === -1)){
        currentRow--;
        this.usedPosition.push((currentRow-1) + "&" + currentCol);
      }
      //Check up-right
      else if(arr[currentRow-1][currentCol+1] === dictionary[x] &&  (this.usedPosition.indexOf((currentRow-1) + "&" + (currentCol+1)) === -1)){
        currentRow--;
        currentCol++;
        this.usedPosition.push((currentRow-1) + "&" + (currentCol+1));
      }
      //Check up-left
      else if(arr[currentRow-1][currentCol-1] === dictionary[x] &&  (this.usedPosition.indexOf((currentRow-1) + "&" + (currentCol-1)) === -1)){
        currentRow--;
        currentCol--;
        this.usedPosition.push((currentRow-1) + "&" + (currentCol-1));
      }
      //Check down-right
      else if(arr[currentRow+1][currentCol+1] === dictionary[x] &&  (this.usedPosition.indexOf((currentRow+1) + "&" + (currentCol+1)) === -1)){
        currentRow++;
        currentCol++;
        this.usedPosition.push((currentRow+1) + "&" + (currentCol+1));
      }
      //Check down-left
      else if(arr[currentRow+1][currentCol-1] === dictionary[x] &&  (this.usedPosition.indexOf((currentRow+1) + "&" + (currentCol-1)) === -1)){
        currentRow++;
        currentCol--;
        this.usedPosition.push((currentRow+1) + "&" + (currentCol-1));
      }
      if(x === dictionary.length - 1){
        // isFound = true;
        return true;
      }
      else{
        return false;
      }
      x++;
    }
  }

  solve(){
    var idx = 0;
    var foundArr = [];
    var counter = 0;

    while(idx < this.dictionary.length - 1){
      for(let row = 0; row < this.boardLength; row++){
        for(let col = 0; col < this.boardLength; col++){
          if(this.board[row][col] === this.dictionary[idx][0]){
            console.log(this.board[row][col]);
            console.log("---" + this.dictionary[idx][0]);
            if(this.checkSurroundings(this.dictionary[idx],this.createBoard(), row, col) === true){
              foundArr.push(this.dictionary[idx]);
              this.counter++;
            }
          }
        }
      }
      idx++;
    }

    return foundArr;
  }

}

//Driver code
var dictionary = ["APPLE", "SIT", "TRIP", "TURN", "SUPER"]; //test dictionary
var boggleLength = 4;
var boggle = new Boggle(dictionary,5);

console.log(boggle.board);

var foundArr = boggle.solve();
if(foundArr.length !== 0){
  console.log(`${boggle.counter} words found: `);
  for(let i = 0; i < foundArr.length; i++){
    console.log("-" + foundArr[i]);
  }
}
else{
  console.log("Nothing was found");
}
