
class Boggle {

    constructor(){
        this.kamus =[]
    }
    //BOX RANDOM
    randomHuruf(){
        let huruf ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let random = Math.floor(Math.random() * huruf.length)
        return huruf[random]
    }

    board(){

        let box =[]
        for(let i=0;i<4;i++){
            box.push([])
            for(let j=0;j<4;j++){
                box[i].push(this.randomHuruf())
            }
        }
        return box
    }

    checkAround(row,col){
        let match = false


      //cek atas
      if(row -1 !== undefined && col -1 !== undefined){
          match = true
      }

      //cek kanan || kiri
      if(col + 1 !==undefined  || col -1!==undefined){
          match = true
      }

      if(col + 1 !==undefined && row +1 !== undefined){
          match = true
      }
      return match
        
    }


    solve(){
        // let box = this.board()
        let huruf;
        for(let i =0;i<box.length;i++){
            for(let j =0;j<box[i].length;j++){
                let pecah;
                var tempt =[]
                var gabung =''
                let status = false
                for(let k =0;k<words.length;k++){
                    for(let l=0;l<words[k].length;l++){
                        if(box[i][j] === words[k][l]){
                            gabung+=box[i][j]
                            if(this.checkAround(i.j) === true){
                               if(box[i-1][j-1] === words[k][l+1]){
                                   gabung+=box[i-1][j-1]
                                    
                               }
                               else if(box[i][j-1] === words[k][l+1]){
                                   gabung+=box[i][j-1]
                                   
                               }
                               else if(box[i+1][j+1] === words[k][l+1]){
                                   gabung +=box[i+1][j+1]
                                   
                               }
                               else if(box[i][j+1] === words[k][l+1]){
                                   gabung += box[i][j+1]
                                   
                               }
                            }
                          
                        }
                    }
                }
            }  
           
        }  

        
    }
   
  
    // while(words[k].length > 0){
    //     if(box[i][j] === words[k][0]){
    //         pecah = words[k].slice(1)
    //         gabung +=box[i][j]
    //     }
    //     tempt.push(pecah)
    // }
 

}
var game = new Boggle()
// console.log(game.board()) 
// console.log(data)
var words =['APPLE' ,'SIT' ,'TRIP' ,'TURN' ,'SUPER']
var box = [
    ['D','G','H','I'],
    ['K','L','P','S'],
    ['Y','E','U','T'],
    ['E','O','R','N']
]
console.log(game.solve())
