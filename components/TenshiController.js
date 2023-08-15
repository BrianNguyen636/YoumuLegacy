class TenshiController extends BossController {
    constructor(boss, game) {
        super(boss, game, 30);
    }
    setBossTime() {
        this.game.tenshiTime = Math.round((this.game.timer.gameTime - this.game.meilingTime) * 100) / 100;
    };
    facePlayer() {
        if (this.boss.facing == 0 && this.boss.BB.midX > this.player.BB.midX) {
            this.boss.facing = 1;
            this.boss.x -= 60;
        } else if (this.boss.facing == 1 && this.boss.BB.midX <= this.player.BB.midX) {
            this.boss.facing = 0;
            this.boss.x += 60;
        }
    }
    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //JUMP FROM IDLE
            let roll = Math.floor(Math.random() * 2);
            this.facePlayer();
            this.attack(1);
            if (roll == this.boss.facing) {
                this.yVelocity = -1000;
                this.xVelocity = (1 - roll * 2) * 600;
            } else {
                this.yVelocity = -600;
                this.xVelocity = (1 - roll * 2) * 600;
            }
        }
        if (this.attackDuration > 0 || this.timer > 0) { //DURING STATE
            switch(this.boss.state) {
                case(1, 2): {
                    if (this.yVelocity == 0) {
                        this.attackDuration = 0;
                        this.xVelocity = 0;
                    }
                    break;
                }
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 0) { //AFTER STATE
            switch(this.boss.state) {
                case(1): {
                    this.attackDuration = 10;
                    this.boss.state = 2;
                    break;
                }
                case(2): {
                    this.attack(3);
                    break;
                }
                default: {
                    this.timer =  0.5;
                    this.boss.state = 0;
                    this.xVelocity = 0;
                }
            }
        }
    }
}