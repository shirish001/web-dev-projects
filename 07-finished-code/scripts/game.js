// holds all the logic for configuring our game section

// for restarting a new game after the current one finished...
function resetGameStatus() {
  activePlayer = 0; // for starting a new games these values have to be taken back to their initial value of 0
  currentRound = 1;
  gameIsOver = false;

  gameOverArticleEle.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>'; //resetting this to default

  gameOverArticleEle.style.display = "none"; // hiding it again when the game restarts

  // reseting the gameData 2-d array elements which is linked to our field using data- to zeroes as well
  let index = 0; // for game board element as the children(li items) are stored as an array from index 0 to 8 acc to DOM struc
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardLiItem = gameBoardEle.children[index]; // accessing each li field item
      gameBoardLiItem.textContent = ""; // removing the present symbol
      gameBoardLiItem.classList.remove("disabled"); // removing the disabled css prop on selected li items
      index++; // since this entire loop will run for 9(3*3) times index will inc from 0 to 8
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    //if either of the palyers name are not entered this executes and returns
    alert("Please enter both player names first");
    return;
  }

  resetGameStatus(); // resetting the game

  gameSectionEle.style.display = "block"; // in game.css it is set to display -> none

  //this code was added after selectGameField func
  activePlayerName.textContent = players[activePlayer].name; // since first player will always be player1 i.e. players[0]
}

function switchPlayer() {
  // to keep switching the player turns in game
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    return; //bc clciking the empty spaces b/w the fields will turn the whole board to the active player symbol
    // or when game is over we do not want the click to happen
  }
  const clickedGameField = event.target;
  const rowVal = clickedGameField.dataset.row; // stored in string format by default the dataset values
  const colVal = clickedGameField.dataset.col;

  if (gameData[rowVal][colVal] > 0) {
    // so that when an already field is clicked it not only changes its color but also cannot be alloted new value
    // if it is already > 0 hence it must have already been clicked
    alert("please select an empty field");
    return;
  }

  clickedGameField.textContent = players[activePlayer].symbol; // since first player will be player[0] with symbol "X"
  clickedGameField.classList.add("disabled"); // to remove the hover once a li item(game field) is clicked

  // updating the values in gameData 2-d array after the current player's turn
  //for player1 ->1 , for player2 ->2 hence the addition of 1
  gameData[rowVal][colVal] = activePlayer + 1;

  //after each turn checking if we got a winner or not
  const winnerID = checkForGameOver();
  console.log(winnerID);

  if (winnerID !== 0) {
    // i.e. when the game is finished or all rounds have happened
    endGame(winnerID);
  }

  currentRound++; // inc round count after every move

  switchPlayer();
}

// to check when we got the same symbols in three consecutive fields, this func only returns numeric values assigned
function checkForGameOver() {
  // checking for rows having either all 1 or 2 values and not 0...
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // checking for colms having either all 1 or 2 values and not 0...
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // checking for diagonal left top to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // checking for diagonal left bottom to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

// function that concludes the game
function endGame(winnerID1) {
  //passing winnerID in this func to access the index of players array to output the winner name
  // winnerID was defined in another func hence not accessible unless we pass as parameter

  gameIsOver = true; // if we have already entered into this func that means game is already over bc
  // this func is inside a if(winnerID1 !==0) statement

  gameOverArticleEle.style.display = "block";
  if (winnerID1 > 0) {
    gameOverArticleEle.firstElementChild.firstElementChild.textContent =
      players[winnerID1 - 1].name; // article-> h2 -> span ; for ID1 =1 -> player1, ID1 -> player2
  } else {
    // when its -1
    gameOverArticleEle.firstElementChild.textContent = "It's a draw"; // text content can overwrite existing
    // html elements but cannot be used to write them, for that use innerHTML
  }
}
