'use strict'

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

console.log(generateBoard(4));