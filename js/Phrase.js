/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  addPhraseToDisplay() {
    const ul = document.querySelector("#phrase ul");
    this.phrase.split("").forEach((ltr) => {
      //split phrase for each symbol for evaluation
      const letterBox = document.createElement("li"); //create a li to be passed into the ul, one li element per letter
      letterBox.innerText = ltr;
      if (ltr === " ") {
        letterBox.classList.add("space"); //change space class if inntertext returns empty
      } else {
        letterBox.classList.add("letter"); //change letter class if innertext returns otherwise
        letterBox.classList.add("hide"); //initial state of letter, used to calculate forwin()
      }
      ul.appendChild(letterBox); //appends the reevaluated array to the phrase ul
    });
  }

  checkLetter(letter) {
    return this.phrase.includes(letter); //checks for input match in phrase
  }

  showMatchedLetter(letter) {
    const appLetters = document.querySelectorAll(".letter"); //grab all letter elements
    appLetters.forEach((compare) => {
      if (compare.innerHTML.toLowerCase() === letter.toLowerCase()) {
        //if the converted string matches
        compare.classList.remove("hide");
        compare.classList.add("show");
      }
    });
  }
}
