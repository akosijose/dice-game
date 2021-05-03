const btnRoll = document.querySelector(".btn--roll");

let scores, roundScore, activePlayer;

init();

btnRoll.addEventListener("click", () => {
  // 1. we need a random number
  let dice = Math.floor(Math.random() * 6) + 1;

  // 2.  display the result
  let diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = `./assets/images/dice-${dice}.png`;

  //3.  update the round score if the rolled number was NOT = 1
  if (dice !== 1) {
    // add score
    roundScore += dice;
    document.querySelector(
      `#current--${activePlayer}`
    ).textContent = roundScore;
  } else {
    // next player
    nextPlayer();
  }
});

document.querySelector(".btn--hold").addEventListener("click", () => {
  // add current score to GLOBAL score
  scores[activePlayer] += roundScore;
  // console.log(scores["activePlayer"]);

  // update the UI
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  // check if player won the game
  if (scores[activePlayer] >= 20) {
    document.querySelector(`#name--${activePlayer}`).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    // next player
    nextPlayer();
  }
});

function nextPlayer() {
  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current--0").textContent = "0";
  document.getElementById("current--1").textContent = "0";

  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn--new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector(".dice").style.display = "none";

  // player 1 and 2 current score set to 0
  document.getElementById("score--0").textContent = "0";
  document.getElementById("score--1").textContent = "0";
  document.getElementById("current--0").textContent = "0";
  document.getElementById("current--1").textContent = "0";

  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";

  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.remove("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".player--0").classList.add("player--active");
}
