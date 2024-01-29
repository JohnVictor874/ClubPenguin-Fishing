class Beral{
    constructor(game,x,y,fishing, direction) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.player = fishing;
        this.direction = direction;
        this.speed = 100;
        this.width = 137;
        this.height = 173;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/beral.png");
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 0.2, "E");
    }
    update() {
        if (this.player.caught === true){
            if (this.x + this.width >= this.player.x && this.x  <= this.player.x + this.player.width) {
                if (this.y + this.height >= this.player.y && this.y <= this.player.y + this.player.height) {
                    this.player.loss();
                }
            }
        }
        this.x += this.game.clockTick * this.speed;
        if (this.x > 1024) this.x = -200;
    }
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}