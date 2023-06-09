document.addEventListener('DOMContentLoaded', () => {
  const cards = [
    { name: 'card1', img: './img/card1.png' },
    { name: 'card1', img: './img/card1.png' },
    { name: 'card2', img: './img/card2.png' },
    { name: 'card2', img: './img/card2.png' },
    { name: 'card3', img: './img/card3.png' },
    { name: 'card3', img: './img/card3.png' },
    { name: 'card4', img: './img/card4.png' },
    { name: 'card4', img: './img/card4.png' },
    { name: 'card5', img: './img/card5.png' },
    { name: 'card5', img: './img/card5.png' },
    { name: 'card6', img: './img/card6.png' },
    { name: 'card6', img: './img/card6.png' },
    // Add more cards as needed
  ];
  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let gameStarted = false;

  // sound
  let soundEnabled = true;



  function createBoard() {
    for (let i = 0; i < cards.length; i++) {
      let card = document.createElement('img');
      card.setAttribute('src', './img/blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  const timerDisplay = document.querySelector('#timer');
  let timer;
  function formatTime(time) {
    let minutes = Math.floor(time / 6000);
    let seconds = Math.floor((time % 6000) / 100);
    let centiseconds = time % 100;
  
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  }

  function startTimer() {
    let centiseconds = 0;
    timer = setInterval(() => {
      centiseconds++;
      timerDisplay.textContent = formatTime(centiseconds);
    }, 10);
  }
  

  function stopTimer() {
      clearInterval(timer);
    }

    function checkForMatch() {
      const cardsImg = document.querySelectorAll('img');
      const firstCardId = cardsChosenId[0];
      const secondCardId = cardsChosenId[1];
    
      if (cardsChosen[0] === cardsChosen[1]) {
        playSound('./sounds/win-arcade-score.wav'); // Play success sound
    
        cardsImg[firstCardId].style.opacity = '0.4';
        cardsImg[secondCardId].style.opacity = '0.4';
        cardsImg[firstCardId].removeEventListener('click', flipCard);
        cardsImg[secondCardId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
      } else {
        playSound('./sounds/fail-ring.mp3'); // Play failure sound
    
        cardsImg[firstCardId].setAttribute('src', './img/blank.png');
        cardsImg[secondCardId].setAttribute('src', './img/blank.png');
      }
    
      cardsChosen = [];
      cardsChosenId = [];
    
      resultDisplay.textContent = cardsWon.length;
    
      if (cardsWon.length === cards.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found all the matches!';
        stopTimer(); // Stop the timer when all pairs are found
        showReplayButton(); // Show the replay button when the game ends
        animateEndGameTiles(); // Animates tiles with opacity
        playSound('./sounds/applause_fireworks.mp3'); // Play the win sound
      }
    }
    
    function animateEndGameTiles() {
      const cardsImg = grid.querySelectorAll('img');
      const delay = 200; // Delay between each animation step in milliseconds
      let currentCardIndex = 0;
    
      const animateTile = () => {
        if (currentCardIndex < cardsImg.length) {
          cardsImg[currentCardIndex].style.opacity = '1';
          currentCardIndex++;
          setTimeout(animateTile, delay);
        }
      };
    
      animateTile();
    }
    
    

    function flipAllTilesBack() {
      const cardsImg = grid.querySelectorAll('img');
      setTimeout(() => {
        cardsImg.forEach((card, index) => {
          if (card.getAttribute('src') !== './img/white.png') {
            card.setAttribute('src', cards[index].img);
          }
          card.removeEventListener('click', flipCard); // Make the card non-clickable
        });
      }, 1000); // Wait for 1 second before revealing all the cards
    }

  let timerStarted = false;
  const clickCounterDisplay = document.querySelector('#click-counter');
  let clickCounter = 0;
  function incrementClickCounter() {
    clickCounter++;
    clickCounterDisplay.textContent = `Clicks: ${clickCounter}`;
  }

  function flipCard() {
    if (!gameStarted) return;

    let cardId = this.getAttribute('data-id');
    
    // Check if the clicked card is already white (matched)
    if (this.getAttribute('src') === './img/white.png') {
      return; // Do nothing and exit the function
    }
  
    playSound('./sounds/Cloud Click.wav'); // Play the sound effect
  
    if (!timerStarted) {
    }
  
    incrementClickCounter(); // Increment the click counter
  
    cardsChosen.push(cards[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cards[cardId].img);
  
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  function startGame() {
    const playButton = document.querySelector('#play-button');
    playButton.style.display = 'none'; // Hide the play button
    countdownElement.style.display = 'block';
    countdown();

  
    // Show all images for 3 seconds
    const cardsImg = grid.querySelectorAll('img');
    cardsImg.forEach((card, index) => {
      card.setAttribute('src', cards[index].img);
    });
  
    // Flip the cards back and start the timer
    setTimeout(() => {
      cardsImg.forEach((card, index) => {
        card.setAttribute('src', './img/blank.png');
      });
      startTimer();
      gameStarted = true;
    }, 4500);
  }

  function countdown() {
    countdownElement.textContent = '3';
    setTimeout(() => {
      countdownElement.textContent = '2';
    }, 1000);
    setTimeout(() => {
      countdownElement.textContent = '1';
    }, 2000);
    setTimeout(() => {
      countdownElement.textContent = 'Go';
    }, 3000);
    setTimeout(() => {
      countdownElement.style.display = 'none';
      gameStarted = true;
    }, 4000);
  }
  

  const countdownElement = document.querySelector('#countdown');

  document.querySelector('#play-button').addEventListener('click', startGame);

  

  (function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  })();
  
  function showReplayButton() {
    const replayButton = document.querySelector('#replay-button');
    replayButton.style.display = 'block';
  }
  function resetGame() {
    location.reload();
  }
  document.querySelector('#replay-button').addEventListener('click', resetGame);


  function playSound(soundFile) {
    if (soundEnabled) {
      const audio = new Audio(soundFile);
      audio.play();
    }
  }
  

function toggleSound() {
  soundEnabled = !soundEnabled;

  // Update the icon based on the sound state
  const soundIcon = document.querySelector("#sound-toggle img");
  if (soundEnabled) {
    soundIcon.src = "./assets/sound-on.svg";
  } else {
    soundIcon.src = "./assets/sound-off.svg"; // Assuming you have a sound-off.svg icon
  }
}
document.querySelector("#sound-toggle").addEventListener("click", toggleSound);



  createBoard();
});
