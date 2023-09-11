// holds all the logic for configuring our players

// opens the overlay
function openPlayerConfig(event) {
  // this edited player will uniquely help in identifying the player edit button which was clicked
  editedPlayer = +event.target.dataset.playerid; // +"1"= 1, bc the data- stores value in string
  modalOverlayEle.style.display = "block";
  backdropEle.style.display = "block";
}

// closes the overlay
function closePlayerConfig() {
  modalOverlayEle.style.display = "none";
  backdropEle.style.display = "none";
  formEle.firstElementChild.classList.remove("error");
  invalidAlertParaEle.textContent = "";
  formEle.children[0].children[1].value = ""; //accessing the form input element and doing this so when we submit the name and overlay closes
  // the entered name is not already present there when we click the edit btn again
}

// extracting and saving the player name
function savePlayerConfig(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const enteredPlayername = formData.get("playername").trim();

  // for empty string(which is treated as false in js)
  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add("error"); // form element -> 1st div element , css style applied
    invalidAlertParaEle.textContent = "Please enter a valid name !";
    return;
  }

  // dynamically accessing the article element of which edit btn was clicked
  const editedPlayerArticleEle = document.getElementById(
    "player-" + editedPlayer + "-data"
  ); // js converts num to string
  editedPlayerArticleEle.children[1].textContent = enteredPlayername; // h3 element(PLAYER NAME -> entered value)

  players[editedPlayer - 1].name = enteredPlayername; // since players[1-1=0] -> player 1; players[2-1=1]= player2

  closePlayerConfig();
}
