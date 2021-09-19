const module = (function(){
    let player1Scores=[];
    let player2Scores=[];
    let allPlayer=[player1Scores, player2Scores];
    let player1 = true;

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
    
    const initiateGame =() =>{
        tileEventListener();
        checkWin();
    }

    const tileEventListener = () =>{
        tiles.forEach((tile) => {
            tile.addEventListener('click', markTile);
        });
    };

    const markTile = function(e){
        let tileNum = e.target.id;
        const tile = document.getElementById(`${tileNum}`);
        
        if(player1 === true){
            tile.textContent="X";
            tile.classList.add("redMark");
            player1Scores.push(Number(tileNum));
        }else{
            tile.textContent="O";
            tile.classList.add("blueMark");
            player2Scores.push(Number(tileNum));
        }
        tile.removeEventListener('click', markTile);
        player1 = !player1;

        console.log(player1Scores);
        console.log(player2Scores);
        console.log(typeof(tileNum));
    };

    const checkWin = () => {
        allPlayer.forEach((player) =>{
            // if(player.includes())
        });
        console.log("Hi");
    }
    
    return{initiateGame};
})();

module.initiateGame();

const playerScores = (playerNum, position) =>{

};


//use array.includes to check