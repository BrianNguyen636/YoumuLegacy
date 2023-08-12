class Ghost {
    constructor(player, game) {
        Object.assign(this, {player, game});
        this.x = this.player.x;
        this.y = this.player.y; 
        this.speed = 200;
        this.sprite = ASSET_MANAGER.getAsset("./assets/Ghost.png");
    }
    calculateVelocity() {
        var xDiff;
        var yDiff;
        if (this.player.facing == 0) {
            xDiff = this.player.x - this.x;
            yDiff = this.player.y - this.y;
        } else {
            xDiff = this.player.x + 120 - this.x;
            yDiff = this.player.y + 120 - this.y;
        }
        let angle = Math.atan(yDiff/xDiff);
        this.radians = angle * Math.PI / 180;
        this.xVelocity = this.speed * Math.cos(this.radians);
        this.yVelocity = -this.speed * Math.sin(this.radians);
    };
    update() {
        this.calculateVelocity();
        this.x += this.xVelocity * this.game.clockTick;
        this.y += this.yVelocity * this.game.clockTick;
    };
    draw(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    };
}