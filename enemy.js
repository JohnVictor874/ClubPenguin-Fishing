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
class Boot {
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
        this.width = 114;
        this.height = 118;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boot.png");

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

class Shark {
    constructor(game, y, fishing, direction) {
        this.game = game;
        this.y = y;
        this.player = fishing;
        this.direction = "E";
        this.sharkTail = ASSET_MANAGER.getAsset("./sprites/sharkTail.png");
        this.sharkClose = ASSET_MANAGER.getAsset("./sprites/sharkMouthClose.png");
        this.sharkOpen = ASSET_MANAGER.getAsset("./sprites/sharkMouthOpen.png");

        this.sharkTailWidth = 352;
        this.sharkTailHeight = 219;

        this.sharkCloseWidth = 387;
        this.sharkCloseHeight = 214;

        this.sharkOpenWidth = 402;
        this.sharkOpenHeight = 218;

        // Position the shark initially off-screen
        if (this.direction === "E") {
            // Spawn further off-screen for "E" direction
            this.x = -800; // Or any value that suits your needs
        } else {
            // Ensure proper off-screen spawning for "W" direction
            this.x = this.game.ctx.canvas.width + 200; // Adjust this value as needed
        }

        this.speed = 250; // Adjust as needed
        this.isIngame = true;
    }

    update() {
        
        // Update the shark's position
        if (this.direction === "E") {
            this.x += this.game.clockTick * this.speed;
        } else {
            this.x -= this.game.clockTick * this.speed;
        }
        if (this.x >= 150 && this.x <= 350) {
            // Assuming the shark's mouth is open when x is between 100 and 350
            let sharkMouthTop = this.y;
            let sharkMouthBottom = this.y + this.sharkOpenHeight;
            if (this.player.y >= sharkMouthTop && this.player.y <= sharkMouthBottom) {
                this.player.lossLife();
            }
        }
        // Remove the shark from the game if it moves off-screen
        if (this.x < -800 || this.x > this.game.ctx.canvas.width + 800) {
            this.isIngame = false;
        }
    }

    draw(ctx) {
        if (this.isIngame) {
            // Always draw the tail
            ctx.drawImage(this.sharkTail, this.x, this.y, this.sharkTailWidth, this.sharkTailHeight);

            // Determine which head to draw based on position
            let headImage;
            if (this.x < 100 || this.x> 350) {
                headImage = this.sharkClose; // Open mouth before crossing the center
                // Adjust x position for open mouth if moving left
                let offsetX = this.direction === "E" ? this.sharkTailWidth - 50 : -this.sharkOpenWidth + 100;
                ctx.drawImage(headImage, this.x + offsetX, this.y-30, this.sharkOpenWidth, this.sharkOpenHeight);
            } else {
                headImage = this.sharkOpen; // Closed mouth after crossing the center
                // Adjust x position for closed mouth if moving left
                let offsetX = this.direction === "E" ? this.sharkTailWidth - 80 : -this.sharkCloseWidth + 20;
                ctx.drawImage(headImage, this.x + offsetX, this.y-10, this.sharkCloseWidth, this.sharkCloseHeight);
            }
        }
    }
}

class ElectricSquid {
    constructor(game, y, fishing, direction) {
        this.game = game;
        this.fishing = fishing;
        this.direction = "E"; // Example direction, adjust as needed
        
        this.y = y; // Initial y position
        this.width = 120;
        this.height = 130;
        this.speed = 100; // Example speed, adjust as needed
        this.isIngame = true;

        // Setting up the spritesheet and animator for the squid
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/squid.png");
        // Assuming the squid animation frames are next to each other horizontally
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 4, 0.25, direction);

        // Find the fishing instance
        if (this.direction === "E") {
            // Spawn further off-screen for "E" direction
            this.x = -100; // Or any value that suits your needs
        } else {
            // Ensure proper off-screen spawning for "W" direction
            this.x = this.game.ctx.canvas.width + 200; // Adjust this value as needed
        }
    }

    update() {
        console.log(this.x);
        // Update the squid's position
        this.x += this.game.clockTick * this.speed;

        // Remove the squid if it moves off-screen
        if (this.x < -250 || this.x > this.game.ctx.canvas.width + 200) {
            this.isIngame = false;
        }

        // Check collision with the fishing line
        if (this.checkCollisionWithLine()) {
            this.fishing.startLineShock(); // Trigger line shock
           
        }
    }

    draw(ctx) {
        if (this.isIngame) {
            // Draw the squid using the animator
            this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    }

    checkCollisionWithLine() {
        // Basic rectangle collision detection (adjust as necessary)
        let lineX = this.fishing.x + 25; // Assuming the line's x position is centered at the fishing object + offset
        let lineTop = 8; // Assuming the top position of the line
        let lineBottom = this.fishing.y; // Assuming the bottom position of the line based on the fishing object's y

        // Check if the squid overlaps with the line
        return this.x < lineX + 2 && this.x + this.width > lineX && this.y < lineBottom && this.y + this.height > lineTop;
    }
}







