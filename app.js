// import functions and grab DOM elements
import { renderGoblin } from './render-utils.js';

const slainNumberEl = document.querySelector('#slain-number');
const knightHPEl = document.querySelector('#knight-hp');
const knightImgEl = document.querySelector('#knight-img');
const form = document.querySelector('form');
const goblinListEl = document.querySelector('.goblins');

// let state
let slainGoblinsCount = 0;
let playerHP = 10;
let goblins = [
    { name: 'Bob', hp: 3 },
    { name: 'Flemgrum the Terrible', hp: 4 },
];

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const goblinName = data.get('goblin-name');
    
    const newGoblin = {
        name: goblinName,
        hp: Math.ceil(Math.random() * 5),
    };

    goblins.push(newGoblin);

    displayGoblins();
});

function displayGoblins() {

    goblinListEl.textContent = '';

    for (let goblin of goblins) {
        const goblinEl = renderGoblin(goblin);

        if (goblin.hp > 0) {
            goblinEl.addEventListener('click', () => {

                if (Math.random() < .33) {
                    goblin.hp--;
                    alert('You hit ' + goblin.name);
                }
                else {
                    alert('You missed ' + goblin.name);
                }

                if (Math.random() < .5) {
                    playerHP--;
                    alert(goblin.name + ' hit you!');
                }
                else {
                    alert(goblin.name + ' missed!');
                }

                if (goblin.hp === 0) {
                    slainGoblinsCount++;
                }

                if (playerHP === 0) {
                    knightImgEl.classList.add('game-over');
                    alert('YOU DIED! Game Over');
                }

                knightHPEl.textContent = playerHP;
                slainNumberEl.textContent = slainGoblinsCount;

                displayGoblins();
            });
        }
        goblinListEl.append(goblinEl);
    }
}

displayGoblins();
