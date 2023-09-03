class CirnoController extends BossController {
    constructor(boss, game) {
        super(boss, game, 40);
        this.timer = 0.5;
        this.antiGrav = true;
        this.idleTimer = 0;
        this.originY = 700 - 50 - 153 * 1.5;
    }
    setBossTime() {
        this.game.cirnoTime = Math.round((this.game.timer.gameTime - this.game.startTime ) * 100) / 100;
    };
    floating() {
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
                this.boss.y = this.originY;
            }
            this.idleTimer += this.game.clockTick;
        }
    }
    behavior() {
        // console.log(this.idleTimer);
        this.floating();
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //ATTACKS FROM IDLE
            this.facePlayer();

            // let roll = this.rollForAttack(5);
            // switch(roll) {
            // }
            this.yVelocity = 0;
            // this.attack(1);
            this.attack(5);

 
        }
        if (this.attackDuration > 0 || this.timer > 0) { //DURING STATE
            switch(this.boss.state) {
                case(1):
                case(2): {
                    if (this.boss.y < this.originY + 20) {
                        this.boss.y += 100 * this.game.clockTick;
                    }
                    break;
                }
                case(4): {
                    if (this.boss.y > this.originY) {
                        this.boss.y -= 100 * this.game.clockTick;
                    }
                    if (Math.abs(this.xVelocity) > 0) {
                        this.xVelocity += (-1 + this.boss.facing * 2) * 2000 * this.game.clockTick;
                    } else {
                        this.xVelocity = 0;
                    }
                    break;
                }
                case(5):
                case(6) : {
                    if (this.boss.y > this.originY - 200) {
                        this.boss.y -= 200 * this.game.clockTick;
                    }
                    break;
                }
                case(7): {
                    let projSpeed = 600;
                    if (this.shotTimer <= 0) {
                        ASSET_MANAGER.playSound("Spray");
                        let angle = (-1 + this.boss.facing * 2) * 30 * this.shotCount;
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200, 
                            90, 90, 20, 20, projSpeed, 90 + angle, null, "Cirno", 0, this.game));
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200, 
                            90, 90, 20, 20, projSpeed, -90 + angle, null, "Cirno", 0, this.game));
                        this.shotCount++;
                        this.shotTimer = 0.05;
                    }
                    this.shotTimer -= this.game.clockTick;
                    break;
                }
                case(8):
                case(9): {
                    if (this.boss.y <= this.originY) {
                        this.yVelocity += 1000 * this.game.clockTick;
                    } else {
                        this.boss.y = this.originY;
                    }
                    break;
                }
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 0) { //AFTER STATE
            switch(this.boss.state) {
                case(1): {
                    this.attack(2, 0.6); break;
                }
                case(2): {
                    ASSET_MANAGER.playSound("Fly");
                    this.xVelocity = -(-1 + this.boss.facing * 2) * 700
                    this.boss.y = this.originY + 20;
                    this.attack(3, 1); break;
                }
                case(3): {
                    this.attack(4, 0.3); break;
                }
                case(5): {
                    this.attack(6, 0.7); break;
                }
                case(6): {
                    this.boss.y = this.originY - 200;
                    this.attack(7, 1.5);
                    break;
                }
                case(7): {
                    this.yVelocity -= 400;
                    this.attack(8, 1.5); 
                    break;
                }
                case(8): {
                    this.boss.y = this.originY;
                    this.attack(9); 
                    break;
                }
                default: {
                    this.timer =  0.75;
                    this.boss.state = 0;
                    this.xVelocity = 0;
                    this.yVelocity = 0;
                    this.effectSpawn = false;
                    this.shotCount = 0;
                    this.shotTimer = 0;
                    
                    this.boss.y = this.originY;
                    this.idleTimer = 0;
                }
            }
        }
    };

}