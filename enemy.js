class Beral {
    constructor(game, y, fishing, direction) {
        this.game = game;
        
        
        this.y = y;
        this.player = fishing;
        this.direction = direction; 
        if(this.direction === "E") {
            this.x = -200;
        } else {
            this.x = this.game.ctx.canvas.width + 200;
        }
        this.speed = 100;
        this.width = 137;
        this.height = 173;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/beral.png");

        this.isIngame = true;
       
    }

    update() {
        
        // Check for interaction with the player
        if (this.player.caught === true) {
            if (this.x + this.width >= this.player.x && this.x <= this.player.x + this.player.width) {
                if (this.y + this.height >= this.player.y && this.y <= this.player.y + this.player.height) {
                    this.player.loss();
                }
            }
        }


        if (this.direction === "E") {
            this.x += this.game.clockTick * this.speed;
        } else if (this.direction === "W") {
            this.x -= this.game.clockTick * this.speed;
        }


        if ((this.direction === "E" && this.x > this.game.ctx.canvas.width) ||
            (this.direction === "W" && this.x < -this.width)) {
            this.isIngame = false;
        }
    }

    draw(ctx) {
        
        if(this.removeFromWorld) return;
        if(this.isIngame) {
            ctx.drawImage(this.spritesheet, this.x, this.y);
        }
        
    }
}
