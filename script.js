const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const finalMessageRevealWord = document.getElementById(
  'final-message-reveal-word'
)

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

// Keydown letter press
function handleKeyPress(key) {
  if (playable) {
    const letter = key.toLowerCase()

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
}

// Touch keyboard button press
function handleButtonPress(button) {
  if (playable) {
    const letter = button.innerText.toLowerCase()

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
}

// Add event listeners for touch keyboard buttons
const touchButtons = document.querySelectorAll('.touch-button')
touchButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleButtonPress(button)
  })
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
