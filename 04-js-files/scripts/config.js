// holds all the logic for configuring our players

// opens the overlay
function openPlayerConfig() {
  // The code inside this function doesn't run until it is called , which happens in the click event,hence we can
  // use these below elements that are actually defined in the last script file but before the click event...
  modalOverlayEle.style.display = "block";
  backdropEle.style.display = "block";
}

// closes the overlay
function closePlayerConfig() {
  modalOverlayEle.style.display = "none";
  backdropEle.style.display = "none";
  formEle.firstElementChild.classList.remove("error"); //removes the .error css styles applied
  invalidAlertParaEle.textContent = ""; // not valid name alert removed
}

// extracting and saving the player name
function savePlayerConfig(event) {
  // built in func in event object that prevents the default behaviour of reloading the page when a form is submitted
  event.preventDefault();

  const formData = new FormData(event.target); //creates a new FormData object from event.target element where this
  // object stores the "name" attribute value and the entered value in input field

  const enteredPlayername = formData.get("playername").trim(); //The get func retrieves the value of the form field with the name
  // "playername" from the FormData object and trim() removes the starting and ending white spaces but returns empty string

  // for empty string(which is treated as false in js)
  if (!enteredPlayername) {
    // entered player name is not appropriate i.e. if !enteredPlayerName is true ,(!false = true)
    event.target.firstElementChild.classList.add("error"); // form element -> 1st div element , css style applied
    invalidAlertParaEle.textContent = "Please enter a valid name !";
    return;
  }
}
