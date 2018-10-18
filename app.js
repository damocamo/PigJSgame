/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,
  previousScore,
  roundScore,
  winningScore,
  activePlayer,
  diceDOM,
  diceDOMTwo,
  gamePlaying = true;

init();

//document.querySelector('#current-' + activePlayer).textContent = dice;

//document.querySelector('#current-' + activePlayer).innerHTML = "<em>" + dice + "/<em>";

//var x = document.querySelector("#score-0").textContent;

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;
    // display number
    diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    diceDOMTwo = document.querySelector(".dice-two");
    diceDOMTwo.style.display = "block";
    diceDOMTwo.src = "dice-" + diceTwo + ".png";

    if (
      (previousScore[activePlayer] === 6 && dice === 6) ||
      (previousScore[activePlayer] === 6 && diceTwo === 6)
    ) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (dice === 6 || diceTwo === 6) {
      previousScore[activePlayer] = dice;
    } else {
      //display reesult and round score once not 1
      if (dice !== 1 && diceTwo !== 1) {
        // add score
        roundScore += dice + diceTwo;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      } else {
        //change player
        nextPlayer();
      }
    }
  }
});

function nextPlayer() {
  //change player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  // previousScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  diceDOM.style.display = "none";
  diceDOMTwo.style.display = "none";
}

document.querySelector(".btn-hold").addEventListener("click", function() {
  //change player
  // add score to current player
  //activePlayer === 0 ? scores[0] += roundScore : scores[1] += roundScore;
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    //update U1
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //check if player wins
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  previousScore = [0, 0];
  winningScore = 100;
  document.querySelector(".score-change").value = "Winning Score = 100";
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice-two").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  gamePlaying = true;
}

document.querySelector(".score-change").addEventListener("click", function() {
  document.querySelector(".score-change").value = "";
});

document
  .querySelector(".score-change")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      // code for enter
      winningScore = document.querySelector(".score-change").value;
      if (winningScore) {
        document.querySelector(".score-change").value =
          "Winning Socre =" + winningScore;
      } else winningScore = 100; 
    }
  });
