/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const game = new Game();
const startButton = document.querySelector("#btn__reset"); //creates a new Game object and starts the game by calling the startGame() method.
startButton.addEventListener("click", () => {
  game.startGame();
});

//Add click event listeners to each of the onscreen keyboard buttons, so that clicking a button calls the handleInteraction() method on the Game object
const keys = document.querySelectorAll(".key");
keys.forEach((keystroke) => {
  keystroke.addEventListener("click", (event) => {
    game.handleInteraction(event.target);
  });
});
