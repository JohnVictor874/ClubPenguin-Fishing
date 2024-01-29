class colisions {
    constructor() {
        this.colision = false;
    }

    checkColision(player, enemy) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.height + player.y > enemy.y) {
            this.colision = true;
        } else {
            this.colision = false;
        }
    }
}