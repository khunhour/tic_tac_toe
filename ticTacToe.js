const module = (function(){
    let player1Scores=[];
    let player2Scores=[];
    let winner="";
    let player1 = true;         //check player1 turn or not
    let tileArray = [1, 2, 3, 4, 5, 6, 7,8 ,9];

    const winningCases = {
        case1: [1,2,3],
        case2: [4,5,6],
        case3: [7,8,9],
        case4: [1,4,7],
        case5: [2,5,8],
        case6: [3,6,9],
        case7: [1,5,9],
        case8: [3,5,7],
    }

    const tiles = document.querySelectorAll('.tile');
    const restartButtons = document.querySelectorAll('.restart');
    const announceText = document.querySelector(".announceText");
    const result = document.querySelector('.result');

    const initiateGame =() =>{
        tileEventListener();
    }

    const tileEventListener = () =>{
        tiles.forEach((tile) => {
            tile.addEventListener('click', markPlayerTile);
        });
        restartButtons.forEach((button) => {
            button.addEventListener("click", restartGame);
        });
    };
    const removeEvent = () =>{
        tiles.forEach((tile) => {
            tile.removeEventListener('click', markPlayerTile);
            tile.classList.remove("redM")
        });
    };
    const removeMarkAndClass = () =>{
        tiles.forEach((tile) => {
            tile.textContent = "";
            tile.classList.remove("redMark", "blueMark");
        });
    }
    
    const markPlayerTile = function(e){
        let tileNum = Number(e.target.id);
        console.log("x's tile Num:" + tileNum);
        const tile = document.getElementById(`${tileNum}`);

        if(player1 === true){                   //marking player1 move
            removeArrayElement(tileNum);
            console.log("current Array : " + tileArray);

            tile.textContent="X";
            tile.classList.add("redMark");
            player1Scores.push(tileNum);        //push index position to player1Scores to store as an array
            winner = checkWin(player1Scores);

            tile.removeEventListener('click', markPlayerTile);
            displayResult(winner);

            player1 = !player1;
            
            markComputerTile();  //passing turn to computer
            
        }
    };
    const markComputerTile = () =>{
        tileNum = pickRandomTile(tileArray);
        if(tileNum === undefined){              //incase at the end arraylength =0 cannot find random number means game end so no need
            return;
        }
        console.log("o's tile Num:" + tileNum);
        const tile = document.getElementById(`${tileNum}`);

        removeArrayElement(tileNum);
        console.log("current Array : " + tileArray);
        tile.textContent="O";
        tile.classList.add("blueMark");
        player2Scores.push(tileNum);        ////push index position to player2Scores to store as an array
        winner = checkWin(player2Scores);
        
        tile.removeEventListener('click', markPlayerTile);
        displayResult(winner);
        player1 = !player1;
    };


    const displayResult = (winner) => {
        if(winner === true && player1 === true){
            result.style.cssText = "display:flex;";
            removeEvent();
            announceText.textContent = "The Winner is X";
        }
        else if(winner === true && player1 === false){
            result.style.cssText = "display:flex;";
            removeEvent();
            announceText.textContent = "The Winner is O";
        }
        else if(winner === false && player1Scores.length === 5 && player2Scores.length ===4){ 
            result.style.cssText = "display:flex;";
            announceText.textContent = "It's a Draw";
        }
    }

    const checkWin = (player) => {
        for(let i=1 ; i < 9; i++){             //loop over the 8 cases for winning

            let intersectArray = player.filter(function(e) {        // intersect each cases with playerScores array
                return winningCases[`case${i}`].indexOf(e) > -1;
            });
            if(intersectArray.sort().toString() === winningCases[`case${i}`].toString()){       //if after intersection, the case = intersection then i is the winning case

                console.log("someone won!");
                return true;                // true means someone has one
            }
        }
        return false;          //false means someone has not wont or it is a draw
    }

    const restartGame = (e) =>{
        result.style.cssText = "display:none;";
        removeMarkAndClass();
        tileEventListener();

        player1Scores=[];
        player2Scores=[];
        tileArray=[1,2,3,4,5,6,7,8,9];
        player1 = true;
        winner ="";
    }
    const removeArrayElement = (value) =>{
        let index = tileArray.indexOf(value);   //find index of value
        tileArray.splice(index, 1);             //remove that value from array
    }
    const pickRandomTile = (tileArray) =>{
        let randomIndex = Math.floor(Math.random()*(tileArray.length-1));
        console.log("length: " +tileArray.length);
        console.log("choose index: "+randomIndex);
        
        console.log(tileArray[randomIndex]);
        return tileArray[randomIndex];
    }
    return{initiateGame, winningCases, tileArray, checkWin,player1Scores, player2Scores,winner
    };
})();

module.initiateGame();

const playerScores = (playerNum, position) =>{


};