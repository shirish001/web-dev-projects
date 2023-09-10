// this contains the selected elements
// Ele -> Element

const modalOverlayEle = document.getElementById("config-overlay"); // selected aside "overlay" element
const backdropEle = document.getElementById("backdrop"); // selected backdrop element

const editPlayer1BtnEle = document.getElementById("edit-1-player-btn"); // edit button in overlay
const editPlayer2BtnEle = document.getElementById("edit-2-player-btn"); //edit button   ....
const cancelOverlayEle = document.getElementById("cancel-overlay-btn"); // cancel button ...

const formEle = document.querySelector("form"); // form element
const invalidAlertParaEle = document.getElementById("invalid-alert");

editPlayer1BtnEle.addEventListener("click", openPlayerConfig); // open the overlay
editPlayer2BtnEle.addEventListener("click", openPlayerConfig);

cancelOverlayEle.addEventListener("click", closePlayerConfig); // close it
backdropEle.addEventListener("click", closePlayerConfig); // close it

formEle.addEventListener("submit", savePlayerConfig); // "submit" event is triggered when form is submitted
