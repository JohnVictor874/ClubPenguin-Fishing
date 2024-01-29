class Score
{
    constructor(game)
    {
        this.score = 0;
    }

    update(){

    }
    draw(ctx){
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + this.score, 10, 50);
    }

    addScore()
    {
        this.score += 1;
    }

    getScore()
    {
        return this.score;
    }
}