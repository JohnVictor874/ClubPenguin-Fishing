class EndScene {
    constructor(gameEngine, fishing, score) {
        this.gameEngine = gameEngine;
        this.fishing = fishing;
        this.score = score; 
        this.gameOver = false;
    }

    checkConditions() {
        if (this.fishing.lifes < 1) {
            this.endGame(false); 
        } else if (this.score.getScore() > 30) {
            this.endGame(true); 
        }
    }

    endGame(playerWon) {
        this.gameEngine.running = false; 
        this.gameOver = true;
        const message = playerWon ? "You win! Congratulations!" : "Game over! Try again.";
        alert(message); 
    }
}