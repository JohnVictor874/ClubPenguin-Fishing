class BackgroundL1{
    constructor(game){
        this.game = game;
        this.penguin = ASSET_MANAGER.getAsset("./sprites/penguin.png");
        this.whole = ASSET_MANAGER.getAsset("./sprites/whole.png");
    }
    update(){

    }

    draw(ctx){
        //ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/background.png"), 0, 150);
        ctx.fillStyle = "#009dc4";
        ctx.fillRect(0, 170, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(this.penguin, 665, 5);
        ctx.drawImage(this.whole, 605, 150
        );
        
    }
}

class BackgroundL2{
    constructor(game){
        this.game = game;
        
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background.png");
    }
    update(){

    }

    draw(ctx){
        
        ctx.drawImage(this.spritesheet, 0, 160);

    }
}