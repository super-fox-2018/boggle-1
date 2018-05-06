function getLetterAround(board, x, y) {
  const arr = [[],[]];
  let i = x - 1;
  let j = y - 1;
  let end = [i+3, j+3];
  while (i < end[0] || j < end[1]) {
    console.log(i,j);
    if (board[i] && board[i][j]) {
      if (i !== x || j !== y) {
        arr[0].push(board[i][j]);
        arr[1].push([i,j]);
      }
    }

    j += 1;
    if (i < end[0]-1 && j === end[1]) {
      j = y-1;
      i += 1;
    } else if (j === end[1]){
      i += 1;
    }
  }
  return arr;
}

this.board = [
  ['D', 'E', 'G', 'I'],
  ['L', 'P', 'O', 'E'],
  ['S', 'U', 'P', 'P'],
  ['E', 'O', 'Z', 'E']
];

console.log(getLetterAround(this.board, 1, 1));