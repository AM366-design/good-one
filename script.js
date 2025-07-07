const cardValues = {
  'A': -1, '2': -1, '3': -1, '4': -1, '5': -1, '6': -1, '7': -1,
  '8': 0, '9': 0,
  '10': 1, 'J': 1, 'Q': 1, 'K': 1
};

const TOTAL_CARDS = 416; // 8 decks
let runningCount = 0;
let selectedCard = null;
let cardsRemaining = TOTAL_CARDS;

function createCardButtons() {
  const deck = document.getElementById('card-deck');
  Object.keys(cardValues).forEach(value => {
    const btn = document.createElement('div');
    btn.className = 'card';
    btn.textContent = value;
    btn.addEventListener('click', () => selectCard(btn, value));
    deck.appendChild(btn);
  });
}

function selectCard(button, value) {
  clearSelected();
  selectedCard = value;
  button.classList.add('selected');
  document.getElementById('selected-card').textContent = value;
}

function clearSelected() {
  document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
}

function assignCardTo(handId) {
  if (!selectedCard) return;

  const handDiv = document.getElementById(handId);
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  cardEl.textContent = selectedCard;
  handDiv.appendChild(cardEl);

  runningCount += cardValues[selectedCard];
  cardsRemaining = Math.max(0, cardsRemaining - 1);

  updateDisplay();

  selectedCard = null;
  document.getElementById('selected-card').textContent = 'None';
  clearSelected();
}

function updateDisplay() {
  document.getElementById('count').textContent = runningCount;
  document.getElementById('remaining').textContent = cardsRemaining;

  const trueCount = cardsRemaining > 0 ? (runningCount / (cardsRemaining / 52)) : 0;
  document.getElementById('true-count').textContent = trueCount.toFixed(2);
}

function resetHand() {
  document.getElementById('dealer-hand').innerHTML = '';
  document.getElementById('player-hand').innerHTML = '';
}

function resetShoe() {
  resetHand();
  runningCount = 0;
  cardsRemaining = TOTAL_CARDS;
  selectedCard = null;
  document.getElementById('selected-card').textContent = 'None';
  clearSelected();
  updateDisplay();
}

document.getElementById('dealer-section').addEventListener('click', () => assignCardTo('dealer-hand'));
document.getElementById('player-section').addEventListener('click', () => assignCardTo('player-hand'));

createCardButtons();
updateDisplay();
