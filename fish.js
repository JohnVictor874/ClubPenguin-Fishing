class Fish{
    constructor(gameEngine, y, direction, player, score) {
        this.removeFromWorld = false;
        this.score = score;
        this.player = player;
        this.gameEngine = gameEngine;
        this.y = y;
        this.startY = y;
        this.speed = 300;
        this.direction = direction;
        this.width = 75;
        this.height = 55;
        this.isCought = false;
        this.headUp = ASSET_MANAGER.getAsset("./sprites/fishHeadUp.png");
        this.fishTailUp = ASSET_MANAGER.getAsset("./sprites/fishTailUp.png");
        this.animatorCought = new Animator(ASSET_MANAGER.getAsset("./sprites/fishTailUp.png"), 2, 2, 73, 165, 3, 0.075, "N");
        
        if(direction === "W"){
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/fishTail.png");
            this.head = ASSET_MANAGER.getAsset("./sprites/fishHead.png");
            this.x = -200
            this.startX = this.x
            
            this.animator = new Animator(this.spritesheet, 2, 2, 165, 73, 3, 0.075, "W");
        }else{
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/fishTailR.png");
            this.head = ASSET_MANAGER.getAsset("./sprites/fishHeadR.png");
            this.x = 1280;
            this.startX = this.x;
            
            this.animator = new Animator(this.spritesheet, 2, 2, 170, 73, 3, 0.075,"E");
        }
    }

    // Assuming this is inside your fish object or class
    update() {
        if(this.direction === "W") {
            this.x += this.gameEngine.clockTick * this.speed;

            // Adjust the amplitude and frequency for the desired curve shape
            const amplitude = 100;  // Adjust this value to control the height of the curve
            const frequency = 0.0040;  // Adjust this value to control the width of the curve

            // Use sine function to create a smooth up-and-down motion
            this.y = this.startY - amplitude * Math.sin(frequency * this.x);

            if (this.x > 1300) this.x = -200;
            if(this.player.caught === false) {
                if (this.x + 130 + this.width >= this.player.x && this.x + 130 <= this.player.x + this.player.width) {
                    if (this.y + 5 + this.height >= this.player.y && this.y + 5 <= this.player.y + this.player.height) {
                        if (this.isCought === false) {
                            this.isCought = true;
                            this.player.caught = true;
                            this.player.fish = this;
                            
                            
                        }

                    }
                }
            }
        }else {
            this.x -= this.gameEngine.clockTick * this.speed;

            // Adjust the amplitude and frequency for the desired curve shape
            const amplitude = 100;  // Adjust this value to control the height of the curve
            const frequency = 0.0040;  // Adjust this value to control the width of the curve

            // Use sine function to create a smooth up-and-down motion
            this.y = this.startY - amplitude * Math.sin(frequency * this.x);

            if (this.x < -400) this.x = 1300;
            if (this.player.caught === false){
                if (this.x - 35 + this.width >= this.player.x && this.x - 35 <= this.player.x + this.player.width) {
                    if (this.y + 5 + this.height >= this.player.y && this.y + 5 <= this.player.y + this.player.height) {
                        if (this.isCought === false) {
                            this.isCought = true;
                            this.player.caught = true;
                            this.player.fish = this;
                            
                        }
                    }
                }
            }
        
        }
        if(this.gameEngine.click && this.isCought === true && this.player.y <150){
            this.gameEngine.click = false;
            this.player.caught = false;
            this.score.score += 1;
            this.removeFromWorld = true;

        }

        
    }

    draw(ctx) {
        if(this.isCought === true){
            this.animatorCought.drawFrame(this.gameEngine.clockTick, ctx, this.player.x-5, this.player.y+37);
                ctx.drawImage(this.headUp, this.player.x, this.player.y+5,60,75);
        } else {
            if(this.direction === "W"){
                this.animator.drawFrameDown(this.gameEngine.clockTick, ctx, this.x, this.y);
                ctx.drawImage(this.head, this.x+130, this.y+5, 75, 60);
            }
            else{
                this.animator.drawFrameDown(this.gameEngine.clockTick, ctx, this.x, this.y);
                ctx.drawImage(this.head, this.x-35, this.y+5, 75, 60);
            }
        }
        
        
        
        
    }
    
    
}