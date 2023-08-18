class Ghost {
    constructor(game) {
        Object.assign(this, {game});
        this.x = 450;
        this.y = 600; 
        this.speed = 250;
        this.sprite = ASSET_MANAGER.getAsset("./assets/Ghost.png");
        this.xTrajectory = 0;
        this.yTrajectory = 0;
    }
    getXTarget() {
        if (this.game.player.facing == 0) {
            return this.game.player.x + 20 * 1.5;
        } else {
            return this.game.player.x + 125 * 1.5;
        }
    }
    getYTarget() {
        return this.game.player.y + 100;
    }

    calculateTrajectory() {
        let xTarget = this.getXTarget();
        let yTarget = this.getYTarget();
        let xDiff = xTarget - this.x;
        let yDiff = yTarget - this.y;
        let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        this.xTrajectory = xDiff / distance;
        this.yTrajectory = yDiff / distance;
    };
    update() {
        this.calculateTrajectory();
        if (Math.abs(this.getXTarget() - this.x) <= 1) this.xTrajectory = 0;
        if (Math.abs(this.getXTarget() - this.y) <= 1) this.yTrajectory = 0;
        this.x += this.xTrajectory * this.speed * this.game.clockTick;
        this.y += this.yTrajectory * this.speed * this.game.clockTick;
    };
    draw(ctx) {
        ctx.globalAlpha = 0.7;
        ctx.drawImage(this.sprite, this.x, this.y);
        ctx.globalAlpha = 1;
    };
}