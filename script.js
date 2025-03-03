document.addEventListener("DOMContentLoaded", () => {
    let categories = {
        fruits: ["🍎", "🍌", "🍓", "🍊", "🍉", "🍇", "🍍", "🥭"],
        emojis: ["😀", "😂", "😎", "😍", "😜", "🤩", "🥳", "😇"],
        animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
        planets: ["🌍", "🌕", "🌞", "🪐", "⭐", "🌠", "🌊", "☄️"],
        flags: ["🇺🇸", "🇬🇧", "🇮🇳", "🇫🇷", "🇩🇪", "🇨🇦", "🇯🇵", "🇦🇺"]
    };

    let gameContainer = document.getElementById("game-container");
    let landingPage = document.getElementById("landing-page");
    let grid = document.getElementById("grid");
    let scoreDisplay = document.getElementById("score");
    let timerDisplay = document.getElementById("timer");
    let resultDisplay = document.createElement("div");
    resultDisplay.id = "result";
    gameContainer.appendChild(resultDisplay);
    let selectedCards = [];
    let matchedPairs = 0;
    let score = 0;
    let countdown;
    let timeLeft = 30;
    let cardElements = [];

    function startGame(category) {
        landingPage.style.display = "none";
        gameContainer.style.display = "block";
        resetGame();
        let items = [...categories[category], ...categories[category]];
        items.sort(() => Math.random() - 0.5);

        grid.innerHTML = "";
        resultDisplay.innerHTML = "";
        cardElements = [];

        items.forEach(() => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.dataset.item = items.pop(); // Assign random item to each card
            card.innerHTML = "<span class='hidden'>?</span>";
            card.addEventListener("click", handleCardClick);
            grid.appendChild(card);
            cardElements.push(card);
        });

        startTimer();
    }

    function handleCardClick() {
        if (selectedCards.length < 2 && !this.classList.contains("flipped")) {
            this.classList.add("flipped");
            this.innerHTML = `<span>${this.dataset.item}</span>`;
            selectedCards.push(this);
        }

        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        let [card1, card2] = selectedCards;

        if (card1.dataset.item === card2.dataset.item) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedPairs++;
            score += 10;
        } else {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerHTML = "<span class='hidden'>?</span>";
            card2.innerHTML = "<span class='hidden'>?</span>";
        }

        selectedCards = [];
        scoreDisplay.textContent = "Score: " + score;

        if (matchedPairs === 8) {
            clearInterval(countdown);
            endGame("You won! Final Score: " + score);
        }
    }

    function startTimer() {
        timeLeft = 30;
        timerDisplay.textContent = "Time: " + timeLeft + "s";
        countdown = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = "Time: " + timeLeft + "s";

            if (timeLeft <= 0) {
                clearInterval(countdown);
                endGame("Time's up! Final Score: " + score);
            }
        }, 1000);
    }

    function endGame(message) {
        grid.innerHTML = "";
        resultDisplay.innerHTML = `<h2>${message}</h2>`;
    }

    function resetGame() {
        clearInterval(countdown);
        score = 0;
        matchedPairs = 0;
        selectedCards = [];
        scoreDisplay.textContent = "Score: 0";
        timerDisplay.textContent = "Time: 30s";
        resultDisplay.innerHTML = "";
    }

    window.startGame = startGame;
    window.restartGame = () => {
        landingPage.style.display = "block";
        gameContainer.style.display = "none";
    };
});
