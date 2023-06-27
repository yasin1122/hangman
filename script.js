const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const finalMessageRevealWord = document.getElementById(
  'final-message-reveal-word'
)
const buttonsContainer = document.getElementById('buttons-container')

const figureParts = document.querySelectorAll('.figure-part')

const words = [
  'hangman',
  'programming',
  'developer',
  'princess',
  'tiger',
  'basketball',
  'luxury',
  'developer',
  'scientist',
  'computer',
]

let selectedWord = words[Math.floor(Math.random() * words.length)]

let playable = true

const correctLetters = []
const wrongLetters = []

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `

  const innerWord = wordEl.innerText.replace(/[ \n]/g, '')

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃'
    finalMessageRevealWord.innerText = ''
    popup.style.display = 'flex'

    playable = false
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length

    if (index < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕'
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`
    popup.style.display = 'flex'

    playable = false
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

// Process letter
function processLetter(letter) {
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter)
      displayWord()
    } else {
      showNotification()
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter)
      updateWrongLettersEl()
    } else {
      showNotification()
    }
  }
}

// Generate buttons for each letter
Array.from({ length: 26 }, (_, i) => i + 97)
  .map(code => String.fromCharCode(code))
  .forEach(letter => {
    const button = document.createElement('button')
    button.classList.add('letter-button')
    button.value = letter
    button.textContent = letter
    buttonsContainer.appendChild(button)
  })

// Select all the letter buttons
const letterButtons = document.querySelectorAll('.letter-button')

// Add event listener to each letter button
letterButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (playable) {
      processLetter(button.value)
    }
  })
})

// Keydown letter press
window.addEventListener('keydown', e => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      processLetter(e.key.toLowerCase())
    }
  }
})

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  playable = true

  // Empty arrays
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = words[Math.floor(Math.random() * words.length)]

  displayWord()

  updateWrongLettersEl()

  popup.style.display = 'none'
})

displayWord()
