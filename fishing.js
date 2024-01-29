class Fishing{
    constructor(game, score) {
        this.score = score;
        this.y = 0;
        this.x = 1280/2;
        this.width = 55;
        this.height = 46;
        this.game = game;
        this.up = ASSET_MANAGER.getAsset("./sprites/huck1.png");
        this.down = ASSET_MANAGER.getAsset("./sprites/huck2.png");
        this.huckC = ASSET_MANAGER.getAsset("./sprites/huckCaught.png");
        this.caught = false;
        this.fish = null;

    }
    update() {
        const newMouseY = this.game.getMousePosition().y;

        // Check the direction of movement
        this.isGoingUp = newMouseY < this.y;

        this.y = newMouseY;

        // Adjust the position to stay within the canvas bounds
        if (this.y < 50) {
            this.y = 50;
            
        } else if (this.y > this.game.ctx.canvas.height - this.up.height) {
            this.y = this.game.ctx.canvas.height - this.up.height;
        }
    }

    draw(ctx) {
        // Use the appropriate sprite based on the direction
        if (this.caught){
            ctx.drawImage(this.huckC, this.x+22, this.y);
            ctx.fillStyle = "black";
            ctx.fillRect(this.x + 25, 8, 2, this.y - 5);
        } else {
            const spriteToUse = this.isGoingUp ? this.up : this.down;
            ctx.drawImage(spriteToUse, this.x, this.y);
            ctx.fillStyle = "black";
            ctx.fillRect(this.x + 25, 8, 2, this.y - 5);
        }
        
    }
    loss(){
        this.caught = false;
        this.fish.removeFromWorld = true;
    }
}