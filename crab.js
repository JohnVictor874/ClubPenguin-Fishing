class Crab {
	constructor(game, player) {
		this.player = player;
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/crab1.png");
		this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/crabChopV2.png");
		
		this.game = game;
		this.animator =  new Animator(this.spritesheet, 0, 0, 215, 80, 9, 0.1);
		

		this.width = 275;
		this.height = 88;
		this.chop = false;
		this.x = -200;
		this.y = 200;
		this.speed = 50;
		this.chopFrameCount = 0; // To keep track of the frame count in chop animation
		this.returning = false; // Indicates if the crab is returning

		this.choppingFrames = 5; // Number of frames in the chop animation
		this.hasChopped = false; // To ensure the chop logic runs only once
		this.isIngame = true;
	}

	update() {
		if (!this.chop && !this.returning) {
			this.x += this.game.clockTick * this.speed;
			if (this.x >= 425) {
				this.animator = new Animator(this.spritesheet2, 0, 0, 275, 85, 5, 0.5);
				this.chop = true;
			}
		} else if (this.chop && !this.returning) {
			// Increment chopFrameCount when the frame is 1.
			if (this.animator.frame === 1) {
				this.chopFrameCount++;
			}

			// Check if chopFrameCount has been incremented and the current frame is 0.
			if (this.animator.frame === 0 && this.chopFrameCount > 0 && !this.hasChopped) {
				if (this.player.y > 200) {
					this.player.lossLife();
				}
				this.animator = new Animator(this.spritesheet, 0, 0, 215, 80, 9, 0.1);
				this.returning = true;
				this.hasChopped = true; // Ensures the logic runs only once
				this.chopFrameCount = 0; // Reset chopFrameCount for future use
			}
		} else if (this.returning) {
			this.x -= this.game.clockTick * this.speed;
			if (this.x < -500) {
				this.isIngame = false;
			}
		}
	}

	draw(ctx) {
		// if(!this.chop) {
		// 	this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
		//
		// } else {
		// 	this.animator.drawFrameUp(this.game.clockTick, ctx, this.x, this.y);
		// }
		if (this.isIngame) {
			this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
		}
		
		

	}
}
