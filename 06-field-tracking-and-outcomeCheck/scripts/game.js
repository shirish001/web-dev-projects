// holds all the logic for configuring our game section

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    //if either of the palyers name are not entered this executes and returns
    alert("Please enter both player names first");
    return;
  }
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
  if (event.target.tagName !== "LI") {
    return; //bc clciking the empty spaces b/w the fields will turn the whole board to the active player symbol
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
  clickedGameField.classList.add("disabled"); // to remove the hover once a li item(gae field) is clicked

  // updating the values in gameData 2-d array after the current player's turn
  //for player1 ->1 , for player2 ->2 hence the addition of 1
  gameData[rowVal][colVal] = activePlayer + 1;

  //after each turn checking if we got a winner or not
  const winnerID = checkForGameOver();
  console.log(winnerID);

  currentRound++; // inc round count after every move

  switchPlayer();
}

// to check when we got the same symbols in three consecutive fields
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
