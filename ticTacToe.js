const module = (function(){
    let player1Scores=[];
    let player2Scores=[];
    let winner;
    let player1 = true;         //check player1 turn or not

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
    const restartButton = document.getElementById("restart");
    

    const initiateGame =() =>{
        tileEventListener();
    }

    const tileEventListener = () =>{
        tiles.forEach((tile) => {
            tile.addEventListener('click', markTile);
        });
        restartButton.addEventListener("click", restartGame);
    };
    const removeEvent = () =>{
        tiles.forEach((tile) => {
            tile.removeEventListener('click', markTile);
            tile.classList.remove("redM")
        });
    };
    const removeMarkAndClass = () =>{
        tiles.forEach((tile) => {
            tile.textContent = "";
            tile.classList.remove("redMark", "blueMark");
        });
    }
    
    const markTile = function(e){
        let tileNum = e.target.id;
        
        const tile = document.getElementById(`${tileNum}`);
        
        if(player1 === true){
            tile.textContent="X";
            tile.classList.add("redMark");
            player1Scores.push(Number(tileNum));        //push index position to player1Scores to store as an array
            winner = checkWin(player1Scores);

        }else{
            tile.textContent="O";
            tile.classList.add("blueMark");
            player2Scores.push(Number(tileNum));        ////push index position to player2Scores to store as an array
            winner = checkWin(player2Scores);
        }
        tile.removeEventListener('click', markTile);
        console.log(winner);
        console.log(player1Scores);
        console.log(player2Scores);
        if(winner === true && player1 === true){
            removeEvent();
            alert("player1 has won");
        }
        else if(winner === true && player1 === false){
            removeEvent();
            alert("player2 has won");
        }
        else if(winner === false && player1Scores.length === 5 && player2Scores.length ===4){ 
            alert("It's a Draw")
        }
        player1 = !player1;

        
        // console.log(typeof(tileNum));
    };

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

        removeMarkAndClass();
        tileEventListener();

        player1Scores=[];
        player2Scores=[];
        player1 = true;
        winner ="";
    }
    // const checkDraw = () => {
    //     tiles.forEach((tile) => {
    //         if(tile.textContent !== ""){
    //             continue;
    //         }
    //         else
    //     });
    // }
    return{initiateGame, winningCases, checkWin,player1Scores, player2Scores};
})();

module.initiateGame();

const playerScores = (playerNum, position) =>{

   

};


//use array.includes to check