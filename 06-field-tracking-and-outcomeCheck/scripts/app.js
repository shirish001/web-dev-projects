// this contains the selected elements
// Ele -> Element

const players = [
  // for internally storing the entered player name
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];

let editedPlayer = 0; // use in config.js to select the player name being edited or created
let activePlayer = 0; //  use in game.js to select the player's turn in game

const gameData = [
  // to store the which player clicked which field
  // 0 will denote empty, 1 for player1 and 2 for player2
  // now to link this with the actual li fields we will assign row and col data- items to li fields
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let currentRound = 0; // to check which round it was , will be helpful in we have a draw

const modalOverlayEle = document.getElementById("config-overlay"); // selected aside "overlay" element
const backdropEle = document.getElementById("backdrop"); // selected backdrop element
const formEle = document.querySelector("form"); // form element
const invalidAlertParaEle = document.getElementById("invalid-alert");
const gameSectionEle = document.getElementById("active-game"); //section element that contains the game structure
// const gameFieldElements = document.querySelectorAll("#game-board li"); // selects all the list items & returns them in array format
const activePlayerName = document.getElementById("active-player-name"); // span element

const gameBoardEle = document.getElementById("game-board"); // selecting the ol item

const editPlayer1BtnEle = document.getElementById("edit-1-player-btn"); // edit button in overlay
const editPlayer2BtnEle = document.getElementById("edit-2-player-btn"); //edit button   ....
const cancelOverlayEle = document.getElementById("cancel-overlay-btn"); // cancel button ...
const startNewGameBtnEle = document.getElementById("start-new-game"); // start new game button

editPlayer1BtnEle.addEventListener("click", openPlayerConfig); // open the overlay
editPlayer2BtnEle.addEventListener("click", openPlayerConfig); // ...

cancelOverlayEle.addEventListener("click", closePlayerConfig); // close it
backdropEle.addEventListener("click", closePlayerConfig); // close it

formEle.addEventListener("submit", savePlayerConfig); // "submit" event is triggered when form is submitted

startNewGameBtnEle.addEventListener("click", startNewGame); // opens the game section

// for (const gameFieldElement of gameFieldElements) {
//   // iterates over each li item in game board
//   gameFieldElement.addEventListener("click", selectGameField);
//   // when this script is first run the for of loop it attaches an event listener to each of these li items
// }

// this will work as well bc the li items are a part of ol element and event object is not restricted to the element
// on which the listener is added but actually the specific sub element inside that assigned element...
gameBoardEle.addEventListener("click", selectGameField);
