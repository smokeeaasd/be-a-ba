import './effects';
import { game } from './game'

const newGameButtonElem = document.getElementById('new-game')
const inputElem = document.getElementById('word')

const errorElem = document.getElementById('error')
const repeatedElem = document.getElementById('repeated')

const streakLabelElem = document.querySelector('.streak-msg')
const streakElem = document.getElementById('streak')

newGameButtonElem.addEventListener('click', function () {
    game.newGame()
    const lettersElem = document.querySelectorAll('.square')

    for (let i = 0; i < lettersElem.length; i++) {
        lettersElem[i].innerHTML = game.letters[i].toUpperCase()
    }

    inputElem.disabled = false
    inputElem.value = ''
    inputElem.focus()
    errorElem.style.visibility = 'hidden'
});

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const word = formData.get('word')

    await game.validateWord(word.toLowerCase());

    streakLabelElem.style.visibility = game.error ? 'hidden' : 'visible'
    errorElem.style.visibility = game.error ? 'visible' : 'hidden'
    repeatedElem.style.visibility = game.repeated ? 'visible' : 'hidden'

    streakElem.innerText = game.streak.toString();
})