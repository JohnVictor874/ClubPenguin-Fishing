class EndScene {
    constructor(gameEngine, fishing, score) {
        this.gameEngine = gameEngine;
        this.fishing = fishing; // Player class with lives
        this.score = score; // Score class
        this.gameOver = false;
    }

    checkConditions() {
        if (this.fishing.lifes < 1) {
            this.endGame(false); // Player lost
        } else if (this.score.getScore() > 30) {
            this.endGame(true); // Player won
        }
    }

    endGame(playerWon) {
        // Assuming gameEngine has a method to stop the game loop
        // If not, you'll need to implement this functionality
        this.gameEngine.running = false; // This should effectively freeze the game
        this.gameOver = true;

        const message = playerWon ? "You win! Congratulations!" : "Game over! Try again.";
        // Display the message within the game's UI
        // This is a simple placeholder; replace it with your actual game over UI handling
        alert(message); // Or update the canvas/UI directly
    }
}