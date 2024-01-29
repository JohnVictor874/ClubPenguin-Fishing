class Crab {
	constructor(game, player, ) {
		this.player = player;
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/crab1.png");
		this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/crabChop.png");
		this.game = game
		this.animator = new Animator(this.spritesheet, 0, 0, 215, 80, 9, 0.1);
		this.width = 275;
		this.height = 88;
		

		this.chop = false
		this.x = 0;
		this.y = 200;
		
		this.speed = 50;
	}

	update() {
		
			if (!this.chop) {
				this.x += this.game.clockTick * this.speed;
				if (this.x > 1024) this.x = 0;
				if (this.x >= 425) {
					this.animator = new Animator(this.spritesheet2, 0, 439, this.width, this.height, 5, 0.5);
					this.chop = true

				}
			} else {

				if (this.animator.frame === 5) {
					if (this.player.y > 200) {
						this.player.loss();
					}
					this.animator = new Animator(this.spritesheet, 0, 0, 215, 80, 9, 0.1, "E");
				}
			}
		
	}

	draw(ctx) {
		if(!this.chop) {
			this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
			
		} else {
			this.animator.drawFrameUp(this.game.clockTick, ctx, this.x, this.y);
		}

	}
}
