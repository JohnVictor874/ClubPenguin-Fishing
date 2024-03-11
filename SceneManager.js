class SceneManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.gameEngine.entities = [];
        this.backgroundEntities = [];
        this.foregroundEntities = [];
        this.fishEntities = []; 
        this.beralEntities = [];
        this.crabEntities = [];
        this.bootEntities = [];
        this.sharkEntities = [];
        this.electricSquidEntities = [];


        this.loadLevelOne();
    }

    loadLevelOne() {
        this.backgroundL1 = new BackgroundL1(this.gameEngine);

       
        let backgroundL2 = new BackgroundL2(this.gameEngine);
        this.backgroundEntities.push(backgroundL2);

        
        this.score = new Score();
        
        let fishing = new Fishing(this.gameEngine, this.score);
        this.endScene = new EndScene(gameEngine, fishing, this.score);
        
        this.foregroundEntities.push(this.score, fishing);
        this.gameEngine.addEntity(new Shark(this.gameEngine, 300, fishing, "E"));

        if (this.score.getScore() >= 5) {
            this.addBoot();
        }
        if (this.score.getScore() >= 10) {
            this.addBeral();
        }
        if (this.score.getScore()>= 15) {
            this.addCrab();
        }
        if (this.score.getScore() >= 20) {
            this.addElectricSquid();
        }
        if (this.score.getScore() >= 25) {
            this.addShark();
        }
        // Always add fish since they appear from level 1
        this.addFish(290, "W");
        this.addFish(550, "E");
        
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

    addBoot() {
        // Check if there's already a boot in the game
        const existingBoot = this.bootEntities.some(boot => boot.isIngame);
        if (!existingBoot) { // Only add a new boot if there isn't one already
            let direction = Math.random() > 0.5 ? "E" : "W"; // Randomly choose direction
            let minY = 200;
            let maxY = this.gameEngine.ctx.canvas.height - 150;
            let y = Math.random() * (maxY - minY) + minY;

            let fishing = this.foregroundEntities.find(entity => entity instanceof Fishing);
            if (fishing) {
                let boot = new Boot(this.gameEngine, y, fishing, direction);
                this.bootEntities.push(boot);
                this.refreshEntities();
            }
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

    addShark() {
        let direction = Math.random() > 0.5 ? "E" : "W";
        let minY = 200;
        let maxY = this.gameEngine.ctx.canvas.height - 250;
        let y = Math.random() * (maxY - minY) + minY;
        let fishing = this.foregroundEntities.find(entity => entity instanceof Fishing);
        let shark = new Shark(this.gameEngine, y, fishing, direction);
        this.sharkEntities.push(shark);
        this.refreshEntities();
    }

    addElectricSquid() {
        let direction = Math.random() > 0.5 ? "E" : "W";
        let minY = 200; // Minimum y to ensure it's not too high
        let maxY = this.gameEngine.ctx.canvas.height - 130; // Adjust based on the squid's height
        let y = Math.random() * (maxY - minY) + minY;
        let fishing = this.foregroundEntities.find(entity => entity instanceof Fishing);
        let electricSquid = new ElectricSquid(this.gameEngine, y, fishing,direction); // Assuming it always starts off-screen to the right
        this.electricSquidEntities.push(electricSquid);
        this.refreshEntities();
    }



    refreshEntities() {
        // Ensure the correct order: background -> foreground -> dynamic entities
        this.gameEngine.entities = [
            this.backgroundL1,
            ...this.foregroundEntities,
            ...this.fishEntities,
            ...this.beralEntities,
            ...this.crabEntities,
            ...this.bootEntities,
            ...this.sharkEntities,
            ...this.electricSquidEntities,
            ...this.backgroundEntities,
        ];
    }



    update() {

        this.endScene.checkConditions();

        if (this.fishEntities.filter(fish => !fish.removeFromWorld).length < 2) {
            let x = Math.random() * (550 - 290) + 290;
            let direction = Math.random() > 0.5 ? "W" : "E";
            this.addFish(x, direction);
        }
        const conditionToAddShark = this.sharkEntities.some(shark => shark.isIngame);
        if (!conditionToAddShark && this.score.getScore() >= 25) {
            this.addShark();
        }

        const conditionToAddBoot = this.beralEntities.some(boot => boot.isIngame);
        if (!conditionToAddBoot && this.score.getScore() >= 5) {
                 this.addBoot();
        }

        const anyBeralInGame = this.beralEntities.some(beral => beral.isIngame);
        if (!anyBeralInGame && this.score.getScore() >= 10) {
            this.addBeral();
        }

        const anycrab = this.crabEntities.some(crab => crab.isIngame)
        if (!anycrab && this.score.getScore() >= 15 ){
            this.addCrab();
        }
        const anysquid = this.electricSquidEntities.some(squid => squid.isIngame)
        if (!anysquid && this.score.getScore() >= 20) { // Simple condition as an example
            this.addElectricSquid();
        }

        this.beralEntities = this.beralEntities.filter(beral => beral.isIngame);
        this.fishEntities = this.fishEntities.filter(fish => !fish.removeFromWorld);
        this.bootEntities = this.bootEntities.filter(boot => boot.isIngame); // Ensure boot entities are also managed
        this.sharkEntities = this.sharkEntities.filter(shark => shark.isIngame);
        this.electricSquidEntities = this.electricSquidEntities.filter(squid => squid.isIngame);
        this.refreshEntities();
    }
}
