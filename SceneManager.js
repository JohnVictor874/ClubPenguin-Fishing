class SceneManager{
    
    
    constructor(gameEngine){
        this.gameEngine = gameEngine;
        this.gameEngine.entities = [];
        
        this.loadLevelOne();
    }
    loadLevelOne(){
        let backgroundL1 = new BackgroundL1(this.gameEngine);
        let backgroundL2 = new BackgroundL2(this.gameEngine);
        let score = new Score();
        let fishing = new Fishing(this.gameEngine, score);
        //let crab = new Crab(this.gameEngine, fishing);
        let fish1 = new Fish(this.gameEngine, 290,  "W",fishing, score);
        let fish2 = new Fish(this.gameEngine, 550, "E",fishing, score);
        let beral = new Beral(this.gameEngine, -200, 500,fishing, "E");
        
        this.gameEngine.addEntity(score);
        this.gameEngine.addEntity(backgroundL2);
        this.gameEngine.addEntity(beral);
        this.gameEngine.addEntity(fish1);
        this.gameEngine.addEntity(fish2);
        this.gameEngine.addEntity(fishing);
        //this.gameEngine.addEntity(crab);
        this.gameEngine.addEntity(backgroundL1);
        console.log(this.gameEngine.click);
        
    }
}
