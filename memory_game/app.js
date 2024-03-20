const cardArray = [{
    name: "fries",
    img: 'images/fries.png'
},
{
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
},
{
    name: 'hotdog',
    img: 'images/hotdog.png'
},
{
    name: 'ice-cream',
    img: 'images/ice-cream.png'
},
{
    name: 'milkshake',
    img: 'images/milkshake.png'
},
{
    name: 'pizza',
    img: 'images/pizza.png'
}, {
    name: "fries",
    img: 'images/fries.png'
},
{
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
},
{
    name: 'hotdog',
    img: 'images/hotdog.png'
},
{
    name: 'ice-cream',
    img: 'images/ice-cream.png'
},
{
    name: 'milkshake',
    img: 'images/milkshake.png'
},
{
    name: 'pizza',
    img: 'images/pizza.png'
}
];

// Sorts the elements into a random order.
cardArray.sort(() => 0.5 - Math.random()); // Must be equal or greater than 0.5.

const grid = document.querySelector('#grid'); // Look for the grid id.
const result = document.querySelector("#result");

let chosenCards = Array(); // Will store returned, revealed cards.

let chosenCardsIDs = Array(); // Will store the IDs of those cards.
const cardsMatch = Array();

function createBoard() {
    // In the same way you create a board, it will create the cards instances.
    for (let i = 0; i < cardArray.length; i++) {
        // Will create HTML tags.
        const card = document.createElement('img');
        // Will write into the tags(could be clearer).
        card.setAttribute('src', 'images/blank.png');
        // I forgot what this does.
        card.setAttribute('data-id', i);
        // Will listen for an event, an event listener basically.
        card.addEventListener('click', flipCard);
        // Will add the card element so the img tags into the div tag.
        grid.appendChild(card);
    }
}

createBoard();

function checkMatch() {

    const cards = document.querySelectorAll('#grid img'); // Will fetch all element(so all the cards) inside the div

    const optionOneID = chosenCardsIDs[0];
    const optionTwoID = chosenCardsIDs[1];

    if (optionOneID == optionTwoID) {
        cards[optionOneID].setAttribute('src', 'images/blank.png');
        cards[optionTwoID].setAttribute('src', 'images/blank.png');
        alert('You clicked on the same card.')
    }

    // chosenCards[0]==chosenCards[1]?alert('You found a match'): console.log('Tough luck buddy.'); // In development, I think.
    if (chosenCards[0] == chosenCards[1]) {
        alert('You found a match');

        cards[optionOneID].setAttribute('src', 'images/white.png');
        cards[optionTwoID].setAttribute('src', 'images/white.png');

        cards[optionOneID].removeEventListener('click', flipCard);
        cards[optionTwoID].removeEventListener('click', flipCard);

        cardsMatch.push(chosenCards);
    } else {
        cards[optionOneID].setAttribute('src', 'images/blank.png');
        cards[optionTwoID].setAttribute('src', 'images/blank.png');
    }
    result.textContent = cardsMatch.length;
    chosenCards = [];
    chosenCardsIDs = [];

    if (cardsMatch.length == cardArray.length / 2) {
        result.innerHTML = 'Congrats you won.';
    }

}


function flipCard() {
    const cardID = this.getAttribute('data-id'); // What actually is 'this'??
    chosenCards.push(cardArray[cardID].name); // Pushes an element into an array.
    chosenCardsIDs.push(cardID); // Pushes an element into an array.
    // Get the element with the ID and get its image
    this.setAttribute('src', cardArray[cardID].img); // No but seriously, what's this??

    if (chosenCards.length == 2) {
        setTimeout(checkMatch, 500); // Will wait before executing the function.
    }
}