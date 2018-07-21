// References for tutorials:
// Yahya Elharony's Study Jam - https://www.youtube.com/watch?v=G8J13lmApkQ
// Matthew Cranford's Tutorial - https://matthewcranford.com/category/blog-posts/walkthrough/memory-game/
// Sandra Israel-Ovirih - https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript

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

// create a container for the cards
const cardsDeck = document.querySelector(".deck");

// create variables for flipped cards and matching cards
let flippedCards = [];
let matchedCards = [];

// shuffle function
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // while there remain elements to shuffle...
  while (0 !== currentIndex) {
    // pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // and swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * Initialize Game
 */

// after removing li elements from index.html, reinsert the code with dynamic javascript to: loop over the array, create the li element and assign it the variable "card", create the list that was previously in the deck and assign each li element the class "card", nest each of the 16 array properties inside each li element as classes and pass the card as an argument to the deck
function init() {
  shuffle(myArray);
  for (let i = 0; i < myArray.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<c class="${myArray[i]}"></c>`;
    cardsDeck.appendChild(card);

    // add click event to each card
    click(card);

    // reset the timer
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
  }
}

/*
 * Click Event
 */

function click(card) {
  // event listener for card clicks
  // 1. using the app.css file as a guide, create the function that will show correct conditions when clicked
  // 2. create if else function to compare flipped card to blank card
  card.addEventListener("click", function() {
    const presentCard = this; // add variables for matching cards
    const pastCard = flippedCards[0];

    if (flippedCards.length === 1) {
      card.classList.add("open", "show", "stop"); // these are the conditions
      flippedCards.push(this); // this adds the conditions to flipped cards

      compare(presentCard, pastCard);
    } else {
      presentCard.classList.add("open", "show", "stop");
      flippedCards.push(this);
    }
  });
}

/*
 * Match the cards
 */

function compare(presentCard, pastCard) {
  if (presentCard.innerHTML === pastCard.innerHTML) {
    // if the cards are matching
    presentCard.classList.add("match"); // apply matching conditions to present card
    pastCard.classList.add("match"); // and previously selected card

    matchedCards.push(presentCard, pastCard);

    flippedCards = []; // resets
    if (matchedCards.length == 16) { // checks if game is over
      gameOver();
      resetTimer();
    }
  } else {
    setTimeout(function() {
      presentCard.classList.remove("open", "show", "stop");
      pastCard.classList.remove("open", "show", "stop");
      flippedCards = []; // resets
    }, 400); // wait 400 miliseconds before performing function to prevent user from 3 clicks
  }

  // add new move
  addMove();
}

/*
 * Timer
 */

let second = 0;
let minute = 0;
let hour = 0;
const timer = document.querySelector(".timer");
var interval;
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + " mins " + second + " secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

/*
 * Add Move
 */
let moves = 0;
const movesContainer = document.querySelector(".moves");
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  // Set the rating
  starsRating();
}

/*
 * Stars rating
 */

const starsContainer = document.querySelector(".stars");
function starsRating() {
  switch (moves) {
    case 10:
      starsContainer.innerHTML = `<i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
      break;

    case 20:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
      break;
  }
}

//counts number stars
function getStars() {
  const stars = document.querySelectorAll('.stars li');
  let starCount = 0;
  for (var star of stars) {
      if (star.style.display !== 'none') {
        starCount++;
      }
  }
  return starCount;
}

/*
 * Refresh Game Button
 */

const refresh = document.querySelector(".restart");
refresh.addEventListener("click", function() {
  cardsDeck.innerHTML = ""; // deletes deck
  init(); // call `init` to create new deck

  // resets related variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
});

/*
 *  If all cards have matched, display a message with the final score.
 */

function toggleModal() {
  const modal = document.querySelector(".modal-bg");
  modal.classList.toggle("hide");
}

function resetTimer() {
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

function writeModalStats() {
  // let timeStat = document.querySelector('.totalTime');
  let finalTime = document.querySelector('.timer').innerHTML;
  // let starsStat = document.querySelector('.starRating');
  const stars = getStars();
  let movesStat = document.querySelector('.finalMove');
  // let moves = 0;

  totalTime.innerHTML = "Time: "+`${finalTime}`;
  starRating.innerHTML = "Rating: "+`${stars}`+" stars!";
  finalMove.innerHTML = "Moves: "+`${moves}`;
}

function gameOver() {
  toggleModal();
  writeModalStats();
}

/*
 * Initialize modal buttons and restart button
 *
 */
document.querySelector('.modal-cancel').addEventListener("click", () => {
  toggleModal();

document.querySelector('.modal-replay').addEventListener("click", replayGame);

document.querySelector('.restart').addEventListener("click", resetGame);
});

function resetGame() {
  resetTimer();
  init();
}

function replayGame () {
  toggleModal();
  init();
}

function resetTimer() {
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

/* * *
 * * * Start the game for the first time
 * * */

init();
