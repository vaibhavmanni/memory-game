/////
// Adding cards dynamically 
/////

const symbols = ["fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"
];


const packOfCards = document.querySelector('.deck');

let clickedCards = []; /*array of cards that are clicked and opened*/
let suitedCards = []; /*array of cards that were matched upon clicking*/

/////
//Function randomizing the positions of symbols on the cards
/////
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/////
// Initializing function 
/////
function initialize() {
    for (i = 0; i < symbols.length; i++) {
        const card = document.createElement('li');
        card.classList.add("card");
        card.innerHTML = `<span class="${symbols[i]}"></span>`;
        packOfCards.appendChild(card);

        click(card);
    };
}


let initialClick = true; //creating a variable for accounting the initial click

/////
//Function adding Event listeners
/////
function click(card) {

    card.addEventListener("click", function() {

        /*conditional statement to start the timer when any card
         is clicked initially by calling timeStart function*/
        if (initialClick) {

            timeStart();
            initialClick = false;
        }

        /*Conditional statement defining on how the cards will behave.

         *If any card is clicked, it shows its symbol and stays.
         *Upon clicking the second card if they match, the both cards stay shown
         *If they do not match they go back to being hidden.
        */
        if (clickedCards.length === 1) {
            card.classList.add('show', 'open', 'preventDouble');
            clickedCards.push(this);
            const clickedFirst = this;
            const clickedSecond = clickedCards[0];

            comparison(clickedFirst, clickedSecond);

        } else {
            card.classList.add('show', 'open', 'preventDouble');
            clickedCards.push(this);
        };
    });
};


/////
//Function defining comparison of cards
/////

function comparison(clickedFirst, clickedSecond) {

    //If they match the symbol stays shown
    if (clickedFirst.innerHTML === clickedSecond.innerHTML) {
        clickedFirst.classList.add('match');
        clickedSecond.classList.add('match');
        suitedCards.push(clickedFirst, clickedSecond);

        clickedCards = [];
        gameOver();



        //Else if the cards are unmatched symbol hides
    } else {
        //Using timeout function to wait before unmatched cards disappear
        setTimeout(function() {
            clickedFirst.classList.remove('show', 'open', 'preventDouble');
            clickedSecond.classList.remove('open', 'show', 'preventDouble');
            clickedCards = [];

        }, 400);
    };

    moveCount();
};




/////
//Function to alert when game is over
/////
function gameOver() {
    if (suitedCards.length === 16) {
        timeStop();
        alert("Congratulations!\n You won in " + `${moves = moves + 1}` + " moves.\n Your Rating = " + ratingBox.innerHTML.length / 35 + " stars.\n Your time = " + seconds + " seconds.");

    };
};


/////
//Restarting the game by reset button
/////
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
    packOfCards.innerHTML = ""; //Clearing all the elements under deck class

    ratingBox.innerHTML = rateStar + rateStar + rateStar; //Reseting rating back to three stars

    moves = 0; //Reseting moves back to zero
    moveBox.innerHTML = moves;

    suitedCards = []; //Clearing all the matched cards

    initialize(); //reinitializing the game 
    timeStop(); //Stopping time when reset is clicked
    shuffle(symbols); //Randomizing position of symbols when game is reset

    initialClick = true;
    seconds = 0;
    clock.innerHTML = seconds + " seconds";
});





/////
// Move counter
/////
let moveBox = document.querySelector(".moves");
let moves = 0;

function moveCount() {
    moves++;
    moveBox.innerHTML = moves;
    rating();
};





/////
//Rating
/////
const ratingBox = document.querySelector(".stars");
const rateStar = `<li><i class="fa fa-star"></i></li>`
ratingBox.innerHTML = rateStar + rateStar + rateStar;

function rating() {
    if (moves < 20 && seconds < 45) {
        ratingBox.innerHTML = rateStar + rateStar + rateStar;
    } else if (moves < 30 && seconds < 90) {
        ratingBox.innerHTML = rateStar + rateStar;
    } else {
        ratingBox.innerHTML = rateStar;
    };
};

/////
//Clock
/////

const clock = document.querySelector(".timer");
let counter = 0;
let seconds = 0;
counter.innerHTML = seconds + ' seconds';

//Function to start time upon clicking
function timeStart() {
    counter = setInterval(function() {
        seconds++;
        clock.innerHTML = seconds + ' seconds';
        rating();
    }, 1000);
}

//Function to stop time when last card is matched
function timeStop() {
    clearInterval(counter);
}



//Calling shuffle function to shuffle all the symbols
shuffle(symbols);

//Game initializer
initialize()