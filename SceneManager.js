class SceneManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.gameEngine.entities = [];
        this.backgroundEntities = [];
        this.foregroundEntities = [];
        this.fishEntities = []; 
        this.beralEntities = [];
        this.crabEntities = [];

        this.loadLevelOne();
    }

    loadLevelOne() {
        this.backgroundL1 = new BackgroundL1(this.gameEngine);

       
        let backgroundL2 = new BackgroundL2(this.gameEngine);
        this.backgroundEntities.push(backgroundL2);

        
        let score = new Score();
        let fishing = new Fishing(this.gameEngine, score);
        this.endScene = new EndScene(gameEngine, fishing, score);
        
        this.foregroundEntities.push(score, fishing);

        
        this.addFish(290, "W");
        this.addFish(550, "E");
        this.addBeral();
        this.berals = 1

        this.addCrab();
        
        this.refreshEntities();
    }

    addFish(x) {
        let direction = Math.random() > 0.5 ? "E" : "W"; 
        let fishing = this.foregroundEntities.find(entity => entity instanceof Fishing);
        let score = this.foregroundEntities.find(entity => entity instanceof Score);

        if(fishing && score) {
            let fish = new Fish(this.gameEngine, x, direction, fishing, score);
            this.fishEntities.push(fish);
            this.refreshEntities(); 
        }
    }

    addBeral() {
        let direction = Math.random() > 0.5 ? "E" : "W"; // Randomly choose direction
        let y = Math.random() * (500 - 200) + 290;

        let fishing = this.foregroundEntities.find(entity => entity instanceof Fishing);
        if (fishing) {
            let beral = new Beral(this.gameEngine, y, fishing, direction);
            this.beralEntities.push(beral); 
            this.refreshEntities(); 
        }
    }

    addCrab() {
        let direction = Math.random() > 0.5 ? "E" : "W";
        let y = Math.random() * (this.gameEngine.ctx.canvas.height - 100) + 50;
        let fishing = this.foregroundEntities.find(entity => entity instanceof Fishing);
      
        let crab = new Crab( this.gameEngine, fishing);
        this.crabEntities.push(crab); 
        this.refreshEntities(); 
    }


    refreshEntities() {
       
        this.gameEngine.entities = [this.backgroundL1, ...this.backgroundEntities, ...this.fishEntities, ...this.beralEntities, ...this.crabEntities, ...this.foregroundEntities];
    }

    update() {

        this.endScene.checkConditions();
       
        if (this.fishEntities.filter(fish => !fish.removeFromWorld).length < 2) {
            let x = Math.random() * (550 - 290) + 290; 
            let direction = Math.random() > 0.5 ? "W" : "E"; 
            this.addFish(x, direction);
        }

       
        
        
       
        const anyBeralInGame = this.beralEntities.some(beral => beral.isIngame);
        if (!anyBeralInGame) {
            this.addBeral();
        }

        const anycrab = this.crabEntities.some(crab => crab.isIngame)
        if (!anycrab) {
            this.addCrab();
        }
        
        this.beralEntities = this.beralEntities.filter(beral => beral.isIngame);

       
        this.fishEntities = this.fishEntities.filter(fish => !fish.removeFromWorld);
        this.refreshEntities();
    }
}
