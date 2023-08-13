class Ghost {
    constructor(game) {
        Object.assign(this, {game});
        this.x = 450;
        this.y = 600; 
        this.speed = 200;
        this.sprite = ASSET_MANAGER.getAsset("./assets/Ghost.png");
        this.xTrajectory = 0;
        this.yTrajectory = 0;
    }
    calculateTrajectory() {
        let xTarget;
        let yTarget;
        let xDiff;
        let yDiff;
        if (this.game.player.facing == 0) {
            xTarget = this.game.player.x + 20 * 1.5;
        } else {
            xTarget = this.game.player.x + 125 * 1.5;
        }
        yTarget = this.game.player.y + 100;

        xDiff = xTarget - this.x;
        yDiff = yTarget - this.y;
        let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        this.xTrajectory = xDiff / distance;
        this.yTrajectory = yDiff / distance;
    };
    update() {
        // console.log(this.x + ", " + this.y);
        this.calculateTrajectory();
        // if (this.game.player.facing == 0) {
        //     if (Math.abs(this.x - this.game.player.x) <= 10) this.xVelocity = 0;
        //     if (Math.abs(this.y - this.game.player.y + 100) <= 10) this.yVelocity = 0;
        // } else {
        //     if (Math.abs(this.x - this.game.player.x + 200) <= 10) this.xVelocity = 0;
        //     if (Math.abs(this.y - this.game.player.y + 100) <= 10) this.yVelocity = 0;
        // }
        if (Math.abs(this.xTrajectory) <= 0.01) this.xTrajectory = 0;
        if (Math.abs(this.yTrajectory) <= 0.01) this.yTrajectory = 0;
        this.x += this.xTrajectory * this.speed * this.game.clockTick;
        this.y += this.yTrajectory * this.speed * this.game.clockTick;
    };
    draw(ctx) {
        ctx.globalAlpha = 0.7;
        ctx.drawImage(this.sprite, this.x, this.y);
        ctx.globalAlpha = 1;
    };
}