class Ghost {
    constructor(game) {
        Object.assign(this, {game});
        this.x = 400;
        this.y = 400; 
        this.speed = 200;
        this.sprite = ASSET_MANAGER.getAsset("./assets/Ghost.png");
    }
    calculateVelocity() {
        var xDiff;
        var yDiff;
        if (this.game.player.facing == 0) {
            xDiff = this.game.player.x - this.x;
            yDiff = this.y - this.game.player.y + 200;
        } else {
            xDiff = this.game.player.x + 200 - this.x;
            yDiff = this.y - this.game.player.y + 200;
        }
        if (xDiff > 0) {
            this.xVelocity = this.speed;
        } else this.xVelocity = -this.speed;
        if (yDiff > 0) {
            this.yVelocity = -this.speed;
        } else this.yVelocity = this.speed;
        // let angle = Math.atan(yDiff/xDiff);
        // let radians = angle * Math.PI / 180;
        // this.xVelocity = this.speed * Math.cos(radians);
        // this.yVelocity = -this.speed * Math.sin(radians);
    };
    update() {
        console.log(this.x + ", " + this.y);
        this.calculateVelocity();
        if (this.game.player.facing == 0) {
            if (Math.abs(this.x - this.game.player.x) <= 10) this.xVelocity = 0;
            if (Math.abs(this.y - this.game.player.y + 100) <= 10) this.yVelocity = 0;
        } else {
            if (Math.abs(this.x - this.game.player.x + 200) <= 10) this.xVelocity = 0;
            if (Math.abs(this.y - this.game.player.y + 100) <= 10) this.yVelocity = 0;
        }
        // if (Math.abs(this.xVelocity) <= 10) this.xVelocity = 0;
        // if (Math.abs(this.yVelocity) <= 10) this.yVelocity = 0;
        this.x += this.xVelocity * this.game.clockTick;
        this.y += this.yVelocity * this.game.clockTick;
    };
    draw(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    };
}