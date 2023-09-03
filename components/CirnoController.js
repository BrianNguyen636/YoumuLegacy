class CirnoController extends BossController {
    constructor(boss, game) {
        super(boss, game, 40);
        this.timer = 0.5;
        this.antiGrav = true;
        this.idleTimer = 0;
    }
    setBossTime() {
        this.game.cirnoTime = Math.round((this.game.timer.gameTime - this.game.startTime ) * 100) / 100;
    };
    behavior() {
        // console.log(this.idleTimer);
        if (this.boss.state == 0) {
            let animationTime = this.boss.animations[0][0].totalTime;
            if (this.idleTimer <= 0.5 * animationTime) {
                if (this.yVelocity < 0) this.yVelocity = 0;
                this.yVelocity += 0.5;
            } else if (this.idleTimer > 0.5 * animationTime && this.idleTimer < animationTime) {
                if (this.yVelocity > 0) this.yVelocity = 0;
                this.yVelocity -= 0.5;
            } else {
                this.idleTimer = 0;
                this.boss.y = 700 - 50 - 153 * 1.5;
            }
            this.idleTimer += this.game.clockTick;
        }
        this.facePlayer();
    };

}