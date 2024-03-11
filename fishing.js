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
        this.lifes = 3;
        this.xInitial = 1000;
        this.huck = true

        // Initialize line shock animation
        this.lineShock = ASSET_MANAGER.getAsset("./sprites/lineShock.png");
        this.lineShockWidth = 35;
        this.lineShockHeight = 140;
        // Assuming a duration of 0.1 seconds per frame for the line shock animation
        this.lineShockAnimator = new Animator(this.lineShock, 0, 0, this.lineShockWidth, this.lineShockHeight, 3, 0.1, "E");

        // Animation control
        this.isLineShocked = false;
        this.lineShockDuration = 0.3; // Total duration of the line shock animation
        this.lineShockElapsed = 0;
        
        this.shockHuck = ASSET_MANAGER.getAsset("./sprites/shockHuck.png");
        this.shockHuckheight = 95;
        this.shockHuckwidth = 105;

        this.shockHuckAnimator = new Animator(this.shockHuck, 0, 0, this.shockHuckwidth, this.shockHuckheight, 3, 0.1, "E");

    }
    update() {
        const mousePos = this.game.getMousePosition();
        const newMouseY = mousePos ? mousePos.y : 0;


        this.isGoingUp = newMouseY < this.y;

        this.y = newMouseY;


        if (this.y < 50) {
            this.y = 50;
            
        } else if (this.y > this.game.ctx.canvas.height - this.up.height) {
            this.y = this.game.ctx.canvas.height - this.up.height;
        }
        if (this.huck === false && newMouseY < 200 && this.game.click) {
            this.huck = true;
            this.caught = false;
            
            if (this.lifes > 0) {
                this.lifes--;
            }
        }
        if (this.isLineShocked) {
            this.lineShockElapsed += this.game.clockTick;
            if (this.lineShockElapsed >= this.lineShockDuration) {
                this.endLineShock(); // Call method to end line shock and process life loss
            }
        }
    }

    draw(ctx) {
       
        if(this.huck) {
            if (this.caught) {
                ctx.drawImage(this.huckC, this.x + 22, this.y);
                ctx.fillStyle = "black";
                ctx.fillRect(this.x + 25, 8, 2, this.y - 5);
            } else {
                const spriteToUse = this.isGoingUp ? this.up : this.down;
                ctx.drawImage(spriteToUse, this.x, this.y);
                ctx.fillStyle = "black";
                ctx.fillRect(this.x + 25, 8, 2, this.y - 5);
            }
        } else{
            
        }
        for(let i = 0; i < this.lifes; i++){
            const margin = 0;
            const position = this.xInitial + (i * 30);
            ctx.drawImage(this.down, position + margin, 20);
        }
        if (this.isLineShocked && this.huck) {
            // Calculate the total length of the line
            let lineHeight = this.y - 8; // Assuming the line starts at y=8
            // Draw the line shock
            // Note: You may need to loop through the line's height and draw the animation frame multiple times to cover the entire line if necessary
            this.shockHuckAnimator.drawFrame(this.game.clockTick, ctx, this.x-20, this.y-25, this.shockHuckwidth);
            for (let drawY = 8; drawY < this.y; drawY += this.lineShockHeight) {
                let remainingLine = this.y - drawY;
                let drawHeight = remainingLine < this.lineShockHeight ? remainingLine : this.lineShockHeight;
                this.lineShockAnimator.height = drawHeight;
                this.lineShockAnimator.drawFrame(this.game.clockTick, ctx, this.x + 25 - (this.lineShockWidth / 2), drawY, this.lineShockWidth);
            }
        }
        
        
    }
    loss(){
        this.caught = false;
        if (this.fish !== null) {
            this.fish.removeFromWorld = true;
        }
    }
    lossLife(){
        this.caught = true;
        
        this.huck =false;
        if(this.fish !== null){
            this.fish.removeFromWorld = true;
        }
    }

    startLineShock() {
        if (this.huck) { // Check if huck is true before starting line shock
            this.isLineShocked = true;
            this.caught = true;
            this.lineShockElapsed = 0;
        }
    }


    // New method to end line shock animation and trigger life loss
    endLineShock() {
        this.isLineShocked = false;
        this.lineShockElapsed = 0;
        this.lossLife(); // Trigger life loss logic after animation
    }
}