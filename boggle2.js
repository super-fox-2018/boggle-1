'use strict'

// class Car {
//     constructor(param_color) {
//         this.name = 'yaris';
//         this.brand = 'Toyota';
//         this.color = param_color || 'white'
//     }
// }

// var myCar = new Car();
// console.log(myCar.name)

function generateBoard(num) {
    let board = [];
    let alphabet = 'DGHIKLPSYEUTEORN';

    let tempAlphabet = [];
    for(let i = 0; i < alphabet.length; i++) {
        if(i == 0 || i % 4 != 0) {
            tempAlphabet.push(alphabet[i]);
        } else if(i % 4 == 0 || i != 0) {
            board.push(tempAlphabet);
            tempAlphabet = [];
            tempAlphabet.push(alphabet[i]);
        }
    }
    board.push(tempAlphabet);
    

    return board;
}


function findString() {
    let dictionary = ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER'];
    let availableWords = [];
    let coordinate = [];
    let boardToFind = generateBoard();

    for(let i = 0; i < dictionary.length; i++) {
        let counterDictionary = 0;
        let flagFirstLetter = false;
        let nextLetter = '';

        for(let j = 0; j < dictionary[i].length; j++) {
            
            for(let k = 0; k < boardToFind.length; k++) {    
                if(flagFirstLetter == false) {

                    for(let l = 0; l < boardToFind[k].length; l++) {
                        if(dictionary[i][0] == boardToFind[k][l]) {
                            coordinate[0] = k;
                            coordinate[1] = l;
                            flagFirstLetter = true;
                            nextLetter = dictionary[i][j+1];
                            console.log(nextLetter)
                        }
                    }

                } else if(flagFirstLetter == true) {
                    if(nextLetter == boardToFind[coordinate[0]-1][coordinate[1]-1]
                        || nextLetter == boardToFind[coordinate[0]-1][coordinate[1]]
                        || nextLetter == boardToFind[coordinate[0]-1][coordinate[1]+1]
                        || nextLetter == boardToFind[coordinate[0]][coordinate[1]-1]
                        || nextLetter == boardToFind[coordinate[0]][coordinate[1]+1]
                        || nextLetter == boardToFind[coordinate[0]+1][coordinate[1]-1]
                        || nextLetter == boardToFind[coordinate[0]+1][coordinate[1]]
                        || nextLetter == boardToFind[coordinate[0]+1][coordinate[1]+1]
                    ) {
                        nextLetter = dictionary[i][j+2];
                        console.log(nextLetter);
                    }
                }

            }
        }
    }

    console.log(boardToFind);
}

findString();