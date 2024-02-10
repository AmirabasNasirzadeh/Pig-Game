"use strict";

// Selecting elements
const playerElement0 = document.querySelector(`.player--0`);
const playerElement1 = document.querySelector(`.player--1`);

const scoreElement0 = document.querySelector(`#score--0`);
const scoreElement1 = document.querySelector(`#score--1`);

const currentElement0 = document.querySelector(`#current--0`);
const currentElement1 = document.querySelector(`#current--1`);

const diceElement = document.querySelector(`.dice`);

const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let currentScore = 0;
let scores = [0, 0];

const resetGame = function () {
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;
  currentElement0.textContent = 0;
  currentElement1.textContent = 0;
  diceElement.classList.add(`hidden`);

  playerElement1.classList.remove(`player--active`);
  playerElement0.classList.add(`player--active`);

  playerElement0.classList.remove(`player--winner`);
  playerElement1.classList.remove(`player--winner`);

  btnRoll.classList.remove(`hidden`);
  btnHold.classList.remove(`hidden`);
};

const switchPlayer = function () {
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  playerElement0.classList.toggle(`player--active`);
  playerElement1.classList.toggle(`player--active`);
};

// Starting condition
scoreElement0.textContent = 0;
scoreElement1.textContent = 0;
diceElement.classList.add(`hidden`);
let currentPlayer = 0;

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  const random = Math.trunc(Math.random() * 6) + 1;
  diceElement.src = `dice-${random}.png`;
  diceElement.classList.remove(`hidden`);

  if (random !== 1) {
    currentScore += random;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener(`click`, function () {
  scores[currentPlayer] += currentScore;
  document.querySelector(`#score--${currentPlayer}`).textContent =
    scores[currentPlayer];

  if (scores[currentPlayer] >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add(`player--winner`);
    diceElement.classList.add(`hidden`);
    btnRoll.classList.add(`hidden`);
    btnHold.classList.add(`hidden`);
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener(`click`, resetGame);
