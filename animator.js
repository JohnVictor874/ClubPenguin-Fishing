class Animator{
    constructor(spriteSheet, xStart, yStart, width, height, frames, duration, direction) {
        Object.assign(this, { spriteSheet, xStart, yStart, width, height, frames, duration, direction });

        this.elapsedTime = 0;
        this.frame = 0;
        
        this.totalTime = duration * frames;
    }
    drawFrame(tick, ctx, x, y) {
        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        
        

        
        if(this.direction === "W") {
            const frame = this.currentFrame() +1;
            this.frame = frame;
            ctx.drawImage(this.spriteSheet, this.xStart - this.height * frame, this.yStart, this.width, this.height, x, y, this.width, this.height);
        }else{
            const frame = this.currentFrame();
            this.frame = frame;
            ctx.drawImage(this.spriteSheet, this.xStart + this.width*frame,this.yStart, this.width, this.height, x, y, this.width, this.height) ;
        }

    }

    drawFrameDown(tick, ctx, x, y) {
        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();
        this.frame = frame;
        if(this.direction === "W") {
            ctx.drawImage(this.spriteSheet, this.xStart, this.yStart + this.height * frame, this.width, this.height, x, y, this.width, this.height);
        }else{

            ctx.drawImage(this.spriteSheet, this.xStart, this.yStart + this.height * frame, this.width, this.height, x, y, this.width, this.height);
        }

    }
    drawFrameUp(tick, ctx, x, y) {
        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame()+1;
        this.frame = frame;
        if(this.direction === "W") {
            ctx.drawImage(this.spriteSheet, this.xStart, this.yStart - this.height * frame, this.width, this.height, x, y, this.width, this.height);
        }else{

            ctx.drawImage(this.spriteSheet, this.xStart, this.yStart - this.height * frame, this.width, this.height, x, y, this.width, this.height);
        }

    }
    currentFrame() {
        return Math.floor(this.elapsedTime / this.duration);
    }
    getFrame() {
        return this.frame
    }
    isDone() {  }

}