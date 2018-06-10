// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// create an array to hold the cards in the deck:
const myArray = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];

// create a container for the cards:
const cardsDeck = document.querySelector(".deck");

// create variables for flipped cards and matching cards:
let flippedCards = [];
let matchedCards = [];


/*
 * INITIALIZE GAME
 */

// after removing li elements from index.html, reinsert the code with dynamic javascript:
// 1. loop over the array
// 2. create the li element and assign it the variable "card"
// 3. create the list that was previously in the deck and assign each li element the class "card"
// 4. nest each of the 16 array properties inside each li element as classes
// 5. pass the card as an argument to the deck
function init() {
  for (let c = 0; c < myArray.length; c++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<c class="${myArray[c]}"></c>`;
    cardsDeck.appendChild(card);

    // add click event to each card
    click(card);
  }
}


/*
 * CLICK EVENT
 */

function click(card) {
  // Create event for card clicks
  // 1. using the app.css file as a guide, create the function that will flip over the card
  // 2. create if else function to compare flipped card to blank card
  card.addEventListener("click", function() {
    const presentCard = this; // add variables for matching cards
    const pastCard = flippedCards[0];

    if (flippedCards.length === 1) { // remember that 1 = true and 0 = false
      card.classList.add("open", "show", "stop"); // these are the conditions
      flippedCards.push(this); // this adds the conditions to flipped cards

      // Compare the two flipped cards
      compare(presentCard, pastCard);
    } else {
      presentCard.classList.add("open", "show", "stop");
      flippedCards.push(this);
    }
  });
}


/*
 * COMPARE THE CARDS
 */

function compare(presentCard, pastCard) {
  if (presentCard.innerHTML === pastCard.innerHTML) {
    // if the cards are matching
    presentCard.classList.add("match"); // apply matching conditions to present card
    pastCard.classList.add("match"); // and previously selected card

    matchedCards.push(presentCard, pastCard);

    flippedCards = []; // resets

    isOver(); // checks if the game is over
  } else {
    setTimeout(function() {
      // wait 800 miliseconds, then perform function
      presentCard.classList.remove("open", "show", "stop");
      pastCard.classList.remove("open", "show", "stop");
      flippedCards = []; // resets flippedCards, keep this inside setTimeout function
    }, 800);
  }

  // add new move
  addMove();
}

/*
 * GAME OVER?
 */

function isOver() {
  if (matchedCards.length === myArray.length) alert("Game Over");
}


/*
 * ADD MOVE
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
function addMove () {
  moves++;
  movesContainer.innerHTML = moves;
}


/*
 * REFRESH GAME BUTTON
 */

const refresh = document.querySelector(".restart");
refresh.addEventListener("click", function() {
  cardsDeck.innerHTML = ""; // deletes deck
  init (); // call `init` to create new deck
  matchedCards = [];
});

/* * *
* * * Start the game for the first time
* * */
init();



/*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
