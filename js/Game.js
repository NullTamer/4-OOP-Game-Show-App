/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0; //track the number of missed guesses by the player.
    this.phrases = [
      // an array of five Phrase objects to use with the game.
      new Phrase("Anomalocaris"),
      new Phrase("You are not Prepared"),
      new Phrase("Fus Ro Dah"),
      new Phrase("Godzilla"),
      new Phrase("Alaskan Bullworm"),
    ];
    this.activePhrase = null; // Phrase object that’s currently in play.
  }

  startGame() {
    //hides the start screen overlay, calls the getRandomPhrase() method, and sets the activePhrase property with the chosen phrase. It also adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object.
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  getRandomPhrase() {
    // randomly retrieves one of the phrases stored in the phrases array and returns it.
    const randomNum = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomNum];
  }

  handleInteraction(target) {
    target.disabled = true; //Disable the selected letter’s onscreen keyboard button.

    if (this.activePhrase.checkLetter(target.innerHTML) !== true) {
      //If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
      target.classList.add("wrong");
      this.removeLife();
    } else {
      //If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the showMatchedLetter() method on the phrase, and then call the checkForWin() method. If the player has won the game, also call the gameOver() method.
      target.classList.add("chosen");
      this.activePhrase.showMatchedLetter(target.innerHTML);
      this.checkForWin();
      if (this.checkForWin() === true) {
        this.gameOver();
      }
    }
  }

  removeLife() {
    //removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image
    let heart = document.querySelector(".tries img");
    let tries = document.querySelector(".tries");
    if (this.activePhrase.checkLetter(this.letter) === false) {
      heart.src = "images/lostHeart.png";
      tries.className = "loss";
      this.missed++; //increments the missed property.
    }
    //If the player has five missed guesses, then end the game by calling the gameOver() method.
    if (this.missed === 5) {
      this.gameOver();
    }
  }

  checkForWin() {
    const unrevealed = document.querySelectorAll(".hide"); //checks to see if the player has revealed all of the letters in the active phrase
    if (unrevealed.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  gameOver() {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "";
    //Win message is displayed if checkForWin is true
    if (this.checkForWin(true)) {
      overlay.classList.add("win");
      overlay.classList.remove("lose");
      overlay.querySelector("#game-over-message").textContent = "You Win";
    } else {
      //Loss message is displayed if checkForWin is not true
      overlay.classList.add("lose");
      overlay.classList.remove("win");
      overlay.querySelector("#game-over-message").textContent = "You Lose";
    }
    this.resetGame();
  }
  resetGame() {
    this.missed = 0;
    document.querySelector("#phrase ul").innerHTML = ""; //Remove all li elements from the Phrase ul element.

    const keysSelected = document.querySelectorAll(".keyrow button"); //Enable all of the onscreen keyboard buttons and update each to use the key CSS class, and not use the chosen or wrong CSS classes.
    keysSelected.forEach((key) => {
      key.className = "key";
      key.disabled = false;
    });

    //Reset all of the heart images in the scoreboard at the bottom of the gameboard to display the liveHeart.png image.
    const restart = document.querySelectorAll(".loss");
    restart.forEach((redo) => {
      redo.className = "tries";
    }); //reenable tries

    const hearts = document.querySelectorAll(".tries img");
    hearts.forEach((heart) => {
      heart.src = "images/liveHeart.png";
    }); //reset hearts

    const reHide = document.querySelectorAll(".show");
    reHide.forEach((fix) => {
      fix.className = "hide";
    }); //reset all hidden
  }
}
