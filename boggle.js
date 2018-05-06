function solveBoggle (str, vertical, horizontal) {

    let board=createBoard(vertical, horizontal)
    let result=false

    let coordinateA=[]
    let tempCoor=[]

    for(let x=0; x<board.length; x++) {
        for(let y=0; y<board[x].length; y++) {
            if(board[x][y]===str[0]) {
                coordinateA.push([x,y])
            }
        }
    }
            
    for(let a=0; a<coordinateA.length; a++) {
        for(let z=0; z<str.length-1; z++) {
                let moveVer=coordinateA[a][0]
                let moveHor=coordinateA[a][1]
    
                    if(board[moveVer-1]!==undefined &&
                        board[moveVer-1][moveHor]!==undefined &&
                        board[moveVer-1][moveHor]===str[z+1]){
                            tempCoor.push([[moveVer-1][moveHor]])
                        
                    } else if(board[moveVer-1]!== undefined &&
                        board[moveVer-1][moveHor+1]!== undefined &&
                        board[moveVer-1][moveHor+1]===str[z+1]) {
                            tempCoor.push([moveVer-1][moveHor+1])
                       
                    } else if(board[moveVer]!== undefined &&
                        board[moveVer][moveHor+1]!== undefined &&
                        board[moveVer][moveHor+1]===str[z+1]) {
                            tempCoor.push([moveVer][moveHor+1])
                        
                    } else if(board[moveVer+1]!== undefined &&
                        board[moveVer+1][moveHor+1]!== undefined &&
                        board[moveVer+1][moveHor+1]===str[z+1]) {
                            tempCoor.push([moveVer+1][moveHor+1])
                        
                    } else if(board[moveVer+1]!== undefined &&
                        board[moveVer+1][moveHor]!== undefined &&
                        board[moveVer+1][moveHor]===str[z+1]) {
                            tempCoor.push([moveVer+1][moveHor])
                        
                    } else if(board[moveVer+1]!== undefined &&
                        board[moveVer+1][moveHor-1]!== undefined &&
                        board[moveVer+1][moveHor-1]===str[z+1]) {
                            tempCoor.push([moveVer+1][moveHor-1])
                       
                    } else if(board[moveVer]!== undefined &&
                        board[moveVer][moveHor-1]!== undefined &&
                        board[moveVer][moveHor-1]===str[z+1]) {
                            tempCoor.push([moveVer][moveHor-1])
                       
                    } else if(board[moveVer-1]!== undefined &&
                        board[moveVer-1][moveHor-1]!== undefined &&
                        board[moveVer-1][moveHor-1]===str[z+1]) {
                            tempCoor.push([moveVer-1][moveHor-1])
                      
                    }
                }
    }
                
           

   // console.log(coordinateA)
   // console.log(tempCoor)
    if(tempCoor.length===str.length) {
        result=true
    }

    return str+' : '+result
}

function createBoard (vertical, horizontal) {

    let board=[]
    for(let i=0; i<vertical; i++) {
        board.push([])
    }

    let alphabet ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for(let j=0; j<vertical; j++) {
        for(let a=0; a<horizontal; a++) {
            board[j].push(alphabet[(Math.floor(Math.random()*26))])
        }
    }/*
    board[0][1]='A'
    board[1][1]='P'
    board[0][2]='P'
    board[0][3]='L'
    board[1][2]='E'
    */
    return board
}

console.log(solveBoggle('APPLE', 6, 8))
console.log(solveBoggle('FLICK', 6, 8))

