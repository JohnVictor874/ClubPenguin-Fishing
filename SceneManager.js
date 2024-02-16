class SceneManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.gameEngine.entities = [];
        this.backgroundEntities = [];
        this.foregroundEntities = [];
        this.fishEntities = []; // Track fish entities separately for easy management
        this.beralEntities = [];
        this.crabEntities = [];

        this.loadLevelOne();
    }

    loadLevelOne() {
        // Primary background entity (always at the bottom)
        this.backgroundL1 = new BackgroundL1(this.gameEngine);

        // Other background entities
        let backgroundL2 = new BackgroundL2(this.gameEngine);
        this.backgroundEntities.push(backgroundL2);

        // Foreground entities
        let score = new Score();
        let fishing = new Fishing(this.gameEngine, score);
        this.endScene = new EndScene(gameEngine, fishing, score);
        //let crab = new Crab(this.gameEngine, fishing);
        // Initialize Beral through the addBeral method to ensure it's tracked and managed correctly
        this.foregroundEntities.push(score, fishing);

        // Add initial fish
        this.addFish(290, "W");
        this.addFish(550, "E");

        // Add the initial Beral
        
        this.addBeral();
        this.berals = 1

        this.addCrab();
        // Combine and add all entities to the game engine
        this.refreshEntities();
    }

    addFish(x) {
        let direction = Math.random() > 0.5 ? "E" : "W"; // Randomly choose direction
        let fishing = this.foregroundEntities.find(entity => entity instanceof Fishing);
        let score = this.foregroundEntities.find(entity => entity instanceof Score);

        if(fishing && score) {
            let fish = new Fish(this.gameEngine, x, direction, fishing, score);
            this.fishEntities.push(fish);
            this.refreshEntities(); // Refresh entities to include the new fish
        }
    }

    addBeral() {
        let direction = Math.random() > 0.5 ? "E" : "W"; // Randomly choose direction
        let y = Math.random() * (500 - 200) + 290;

        let fishing = this.foregroundEntities.find(entity => entity instanceof Fishing);
        if (fishing) {
            let beral = new Beral(this.gameEngine, y, fishing, direction);
            this.beralEntities.push(beral); // Use beralEntities array to track Beral instances
            this.refreshEntities(); // Refresh entities to include the new Beral
        }
    }

    addCrab() {
        let direction = Math.random() > 0.5 ? "E" : "W";
        let y = Math.random() * (this.gameEngine.ctx.canvas.height - 100) + 50;
        let fishing = this.foregroundEntities.find(entity => entity instanceof Fishing);
        // Assuming Crab constructor takes similar parameters as Beral
        let crab = new Crab( this.gameEngine, fishing);
        this.crabEntities.push(crab); // Use crabEntities array to track Crab instances
        this.refreshEntities(); // Refresh entities to include the new Crab
    }


    refreshEntities() {
        // Include crabEntities in the combined entities array
        this.gameEngine.entities = [this.backgroundL1, ...this.backgroundEntities, ...this.fishEntities, ...this.beralEntities, ...this.crabEntities, ...this.foregroundEntities];
    }

    update() {

        this.endScene.checkConditions();
        // Spawn new fish if there are less than a certain number
        if (this.fishEntities.filter(fish => !fish.removeFromWorld).length < 2) {
            let x = Math.random() * (550 - 290) + 290; // Generate a random x position between 290 and 550
            let direction = Math.random() > 0.5 ? "W" : "E"; // Random direction
            this.addFish(x, direction);
        }

        // Check and replace Beral if it has been removed
        
        
        // If no Berals exist after filtering, add a new one
        const anyBeralInGame = this.beralEntities.some(beral => beral.isIngame);
        if (!anyBeralInGame) {
            this.addBeral();
        }

        const anycrab = this.crabEntities.some(crab => crab.isIngame)
        if (!anycrab) {
            this.addCrab();
        }
        // Since isIngame flag is only set to false and never back to true,
        // you might want to remove Berals not in game from the array to avoid unnecessary checks.
        // This is optional but can improve performance if you have many Berals going out of game.
        this.beralEntities = this.beralEntities.filter(beral => beral.isIngame);

        // Remove fishes that are marked for removal and spawn new ones as needed
        this.fishEntities = this.fishEntities.filter(fish => !fish.removeFromWorld);
        this.refreshEntities();
    }
}
