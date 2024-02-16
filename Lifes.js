class Lifes{
    constructor(game, player){
        this.game = game;
        this.player = player;
        this.lifes = 3;
        this.width = 25;
        this.height = 25;
        this.xInitial = 20;
        this.y = 20;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/huck.png");
    }
    update(){
        this.player.lifes = this.lifes;
    }

    draw(ctx){
        for(let i = 0; i < this.lifes; i++){
            const margin = i * 10;
            const position = this.xInitial * (i + 1);
            ctx.draw(this.spritesheet, position + margin, this.y, this.width, this.height);
        }
    }

    gainLife(){
        if(this.lifes <= 3){
            this.lifes++;
        }
    }

    loseLife(){
        this.lifes--;
    }
}