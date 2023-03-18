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
        cardsImg[firstCardId].setAttribute('src', './img/white.png');
        cardsImg[secondCardId].setAttribute('src', './img/white.png');
        cardsWon.push(cardsChosen);
      } else {
        cardsImg[firstCardId].setAttribute('src', './img/blank.png');
        cardsImg[secondCardId].setAttribute('src', './img/blank.png');
      }
  
      cardsChosen = [];
      cardsChosenId = [];
  
      resultDisplay.textContent = cardsWon.length;
  
      if (cardsWon.length === cards.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found all the matches!';
      }
      if (cardsWon.length === cards.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found all the matches!';
        stopTimer(); // Stop the timer when all pairs are found
      }
    }
  
    let timerStarted = false;
    const clickCounterDisplay = document.querySelector('#click-counter');
    let clickCounter = 0;
    function incrementClickCounter() {
      clickCounter++;
      clickCounterDisplay.textContent = `Clicks: ${clickCounter}`;
    }

    function flipCard() {
      let cardId = this.getAttribute('data-id');
      
      // Check if the clicked card is already white (matched)
      if (this.getAttribute('src') === './img/white.png') {
        return; // Do nothing and exit the function
      }
    
      if (!timerStarted) {
        startTimer();
        timerStarted = true;
      }
    
      incrementClickCounter(); // Increment the click counter
    
      cardsChosen.push(cards[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cards[cardId].img);
    
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
    
  
    (function shuffle() {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
    })();
  
    createBoard();
  });
  