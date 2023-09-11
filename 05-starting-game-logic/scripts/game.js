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

  //selecting the game field using event object
  event.target.textContent = players[activePlayer].symbol; // since first player will be player[0] with symbol "X"
  event.target.classList.add("disabled"); // to remove the hover once a li item(gae field) is clicked
  switchPlayer();
}
