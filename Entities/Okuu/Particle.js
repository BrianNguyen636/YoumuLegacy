class Particle extends Projectile {
    constructor(x, y, speed, boss) {
        super(x, y, 200, 200, 
            75, 75, 50, 50, speed, 0, null, "Okuu", 0, boss.game);
        this.boss = boss;
        this.calculateTrajectory();
    };

    getXTarget() {
        return this.boss.BB.midX - 100;
    };
    getYTarget() {
        return this.boss.BB.midY - 100;
    };
    calculateTrajectory() {
        let xTarget = this.getXTarget();
        let yTarget = this.getYTarget();
        let xDiff = xTarget - this.x;
        let yDiff = yTarget - this.y;
        let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        this.xTrajectory = xDiff / distance;
        this.yTrajectory = yDiff / distance;
        this.xVelocity = this.xTrajectory * this.speed;
        this.yVelocity = this.yTrajectory * this.speed;
    };
    behavior() {
        if (Math.abs(this.getXTarget() - this.x) <= 5 && Math.abs(this.getYTarget() - this.y) <= 5) this.removeFromWorld = true;
        if (!this.game.combat) this.removeFromWorld = true;
    }

}