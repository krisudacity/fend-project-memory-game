# Memory Game Project

## Table of Contents

* [Installation](#installation)
* [Gameplay](#gameplay)
* [Instructions](#instructions)
* [Built With](#built-with)
* [Acknowledgments](#acknowledgments)
* [Remaining Bugs](#remaining-bugs)

## Installation

Download and open index.html with a browser.

## Gameplay

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

## Instructions

* Flips one card over to reveal its underlying symbol.
* Turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.
* The game is won once all cards have been correctly matched.

## Built With

* HTML
* CSS
* Javascript

## Acknowledgments

* [Yahya Elharony's Study Jam](https://www.youtube.com/watch?v=G8J13lmApkQ)
* [Matthew Cranford's Tutorial](https://matthewcranford.com/category/blog-posts/walkthrough/memory-game/)
* [Sandra Israel-Ovirih's Tutorial](https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript)

## Remaining Bugs

* ~~Replay button on modal~~ Resolved: recreated logic used for restart button
* ~~Match > Pop Up Modal > Hit Cancel > Hit Restart Button (a bug that previously duplicated the deck)~~ Resolved: delete the deck before calling it again
* Timer starts on 2nd move. This is an issue that remains - attempting to move startTimer outside of addMove function and into the click event breaks the timer.
* ~~Stars don't reset with game reset~~ Resolved: used location.reload() in reset/replay functions to solve
* ~~Time modal not logging the correct number of moves or stars~~ lowered moves++ logic in addMove function and writeModalStats is now using $(".fa-star").length to count number of stars
* Added media queries for deck, cards and font sizes
