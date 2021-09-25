const module = (function(){
    let winner="";
    let currentPlayer = "human";         //human moves first
    let currentMode = "hard";
    let currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let aiMark = "O";
    let humanMark ="X";

    const winningCases = {              //all winning combos
        case1: [0,1,2],
        case2: [3,4,5],
        case3: [6,7,8],
        case4: [1,4,7],
        case5: [2,5,8],
        case6: [0,3,6],
        case7: [0,4,8],
        case8: [2,4,6],
    }

    const tiles = document.querySelectorAll('.tile');
    const restartButtons = document.querySelectorAll('.restart');
    const modes = document.querySelector(".mode");
    const marks = document.querySelector(".marker");
    const result = document.querySelector('.result');
    const announceText = document.querySelector(".announceText");

    const initiateGame =() =>{
        tileEventListener();
        buttonEventListener();
    }

    const tileEventListener = () =>{
        tiles.forEach((tile) => {
            tile.addEventListener('click', markPlayerTile);
        });
    };

    const buttonEventListener = () =>{
        marks.addEventListener('click', chooseMark);
        modes.addEventListener('click', chooseMode);
        restartButtons.forEach((button) => {
            button.addEventListener("click", restartGame);
        });
    }
    const chooseMark = (e) =>{
        const oMark = document.querySelector(`#${e.target.id}`);
        
        if(e.target.id === "X"){
            marks.firstElementChild.classList.add("purple");
            marks.lastElementChild.classList.remove("purple");
            humanMark = "X";
            aiMark = "O";
        }
        else if(e.target.id = "O"){
            marks.firstElementChild.classList.remove("purple");
            marks.lastElementChild.classList.add("purple");
            humanMark = "O";
            aiMark = "X";
        }
        restartGame();
    }
    const chooseMode = (e) => {
        if(e.target.id === "easy"){
            modes.firstElementChild.classList.add("purple");
            modes.lastElementChild.classList.remove("purple");
            currentMode = "easy";
        }
        else if(e.target.id === "hard"){
            console.log("hard");
            modes.firstElementChild.classList.remove("purple");
            modes.lastElementChild.classList.add("purple");
            currentMode = "hard";
        }
        restartGame();
    }
    const removeEvent = () =>{
        tiles.forEach((tile) => {
            tile.removeEventListener('click', markPlayerTile);
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
        const tile = document.getElementById(`${tileNum}`);
        if(currentPlayer === "human"){                                   //marking player1 move
            tile.textContent = humanMark;
            tile.classList.add("redMark");
            tile.removeEventListener('click', markPlayerTile);
            
            currentBoard[tileNum] = humanMark;                  //update current board      
            winner = checkWin(currentBoard, humanMark);         //check to see if there is a winner
            declareWinner(winner);                              
            currentPlayer = "computer";                         //player2's turn now
            markComputerTile();                                 //passing turn to computer
        }
    };

    const markComputerTile = () =>{
        let tileNum;
        if(currentMode === "hard"){
            let bestPlayInfo = minimax(currentBoard, 0 ,aiMark);       //get the best move for the Ai mark(bestPlayerInfo={index:?, score:?})
            tileNum = bestPlayInfo.index;
        }
        else if(currentMode === "easy"){                               //easy mode just let the computer pick a random remaining tile
            tileNum = pickRandomTile(findRemainingTile(currentBoard));
            console.log(tileNum);
        }
        const tile = document.getElementById(`${tileNum}`);
        
        if(tileNum === undefined){                              //incase at the end, arraylength =0 cannot find valid move(to avoid errors)
            return;
        }
        if(currentPlayer === "computer"){
            tile.textContent= aiMark;
            tile.classList.add("blueMark");
            tile.removeEventListener('click', markPlayerTile);

            currentBoard[tileNum] = aiMark;
            winner = checkWin(currentBoard, aiMark);
            declareWinner(winner);
            currentPlayer = "human";
        }
    };

    const declareWinner = (winner) => {
        if(winner === true && currentPlayer === "human"){
            result.style.cssText = "display:flex;";
            removeEvent();
            announceText.textContent = "You Win!";
        }
        else if(winner === true && currentPlayer === "computer"){
            result.style.cssText = "display:flex;";
            removeEvent();
            announceText.textContent = "You Lose!";
        }
        else if(winner === false && findRemainingTile(currentBoard).length === 0){ 
            result.style.cssText = "display:flex;";
            announceText.textContent = "It's a Draw";
        }
    }

    const checkWin = (board, playerMark) => {
        let playerPosition=[];                                              //find the positions/index that player 1 and player 2 has marked and put them into array for comparing
        for(let i=0; i<board.length; i++){
            if(board[i] === playerMark){
                playerPosition.push(i);
            }
        }
        for(let i=1 ; i < 9; i++){                                          //loop over the 8 cases for winning

            let intersectArray = playerPosition.filter(function(e) {        // intersect each cases with playerPosition array
                return winningCases[`case${i}`].indexOf(e) > -1;            //return the matched element within each case
            });
            if(intersectArray.sort().toString() === winningCases[`case${i}`].toString()){       //if after intersection, the case = intersected Array then i is the winning case
                
                return true;                                                // true means someone has one
            }
        }
        return false;                                                       //false means someone has not won or it is a draw
    }

    const restartGame = (e) =>{
        result.style.cssText = "display:none;";
        removeMarkAndClass();
        tileEventListener();
        currentBoard = [0,1,2,3,4,5,6,7,8];
        currentPlayer = "human";
        winner ="";
    }

    const findRemainingTile = (board) => {             
        let remainingTiles = board.filter(tile => tile != "X" && tile != "O");      //return an array that does not contain X and O
        return remainingTiles;
    }

    const pickRandomTile = (array) =>{
        let randomIndex = Math.floor(Math.random()*(array.length));
        return array[randomIndex];
    }

    function minimax(board, depth, currentMark) {           //adding depth because trying the fastest way to win.
        let availableTile = findRemainingTile(board);

        if(checkWin(board, humanMark)){                     
            return {score: depth-10 };
        }
        else if(checkWin(board, aiMark)){
            return {score: 10-depth };                             
        }
        else if(availableTile.length === 0){
            return {score: 0};
        }

        let moves = [];                                     //for recording all the possible moves id and scores
        for (let i=0; i<availableTile.length; i++){
            let move ={};                                   //individual move
            move.index = board[availableTile[i]];
            board[availableTile[i]] = currentMark;          //test the that move by placing the current Mark on the board
            if(currentMark === aiMark){
                var result = minimax(board, depth+1, humanMark);     //run through the minimax function again to see how it scores for human(human is minimizing)
                move.score = result.score;
            }
            else{
                var result = minimax(board, depth+1, aiMark);
                move.score = result.score;
            }
            board[availableTile[i]] = move.index;            //revert board back to normal for testing other moves
            moves.push(move);                                //moves should look like this : moves=[{index:3, score: 10},{index:4, score -10}] 
        }
        let bestMove=null;                                   //finding the best move out of those recorded moves based on scores

        if(currentMark === aiMark){                          //for the AI we want the highest out of all the moves
            let bestScore = -Infinity;                       //set as a lowest number can be -10000 also
            for(let i=0; i < moves.length; i++){             
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }else{                                               //for human player (minimizing), we want the lowest scores out of all the moves
            let bestScore = Infinity;   
            for(let i=0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];                               // return the best move {index:? score:?}
    }
    return{initiateGame};
})();

module.initiateGame();