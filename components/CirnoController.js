class CirnoController extends BossController {
    constructor(boss, game) {
        super(boss, game, 40);
        this.timer = 0.7;
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

            let roll = this.rollForAttack(5);
            switch(roll) {
                case(0):this.attack(1); break;
                case(1):this.attack(5); break;
                case(2):this.attack(10); break;
                case(3):this.attack(15); break;
                case(4):this.attack(19); break;
            }
            this.yVelocity = 0;

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
                        ASSET_MANAGER.playSound("Cirno1");
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
                case(12): {
                    if (this.shotCount == 0 && this.attackDuration < 0.5 * this.boss.animations[0][12].totalTime) {
                        ASSET_MANAGER.playSound("Cirno1");
                        let projSpeed = 700;
                        let angle = this.boss.facing * 180;
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200, 
                            90, 90, 20, 20, projSpeed, angle - 30, null, "Cirno", 0, this.game));
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200, 
                            90, 90, 20, 20, projSpeed, angle + 10, null, "Cirno", 0, this.game));
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200, 
                            90, 90, 20, 20, projSpeed, angle - 70, null, "Cirno", 0, this.game));
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200, 
                            90, 90, 20, 20, projSpeed, angle + 50, null, "Cirno", 0, this.game));
                        this.shotCount++;
                        this.xVelocity = (-1 + this.boss.facing * 2) * 200;
                        this.yVelocity -= 200;
                    }
                    break;
                }
                case(13): 
                case(14): {
                    if (this.boss.y <= this.originY) {
                        this.yVelocity += 1000 * this.game.clockTick;
                    } else {
                        this.boss.y = this.originY;
                        this.xVelocity = 0;
                        this.yVelocity = 0;
                    }
                    break;
                }
                case(15):
                case(16): {
                    this.yVelocity += 500 * this.game.clockTick; break;
                }
                case(17): {
                    this.yVelocity += 1000 * this.game.clockTick;
                    if (this.boss.y >= this.originY && this.yVelocity > 0) {
                        this.yVelocity = 0;
                        this.xVelocity = 0;
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
                case(10): {
                    this.attack(11, 0.8); break;
                }
                case(11): {
                    this.attack(12); break;
                }
                case(12): {
                    this.attack(13, 0.5); break;
                }
                case(13): {
                    this.attack(14); break;
                }
                case(15): {
                    let delay = 1.25;
                    ASSET_MANAGER.playSound("Cirno2");
                    this.game.addEntity(new Lob(this.boss.BB.midX - 100, this.boss.BB.y - 100, 
                        delay, 0, this));
                    this.game.addEntity(new Lob(this.boss.BB.midX - 100, this.boss.BB.y - 100, 
                        delay, 300, this));
                    this.game.addEntity(new Lob(this.boss.BB.midX - 100, this.boss.BB.y - 100, 
                        delay, -300, this));
                    this.attack(16, delay); break;
                }
                case(16): {
                    ASSET_MANAGER.playSound("Spray");
                    this.facePlayer();
                    this.xVelocity = -(-1 + this.boss.facing * 2) * 50;
                    this.yVelocity = -400;
                    this.attack(17, 0.7);
                    break;
                }
                case(17): this.attack(18); break;
                
                case(19): this.attack(20, 0.7); break;
                case(20): this.attack(21); break;
                case(21): {
                    let time = 1;
                    ASSET_MANAGER.playSound("Cirno3");
                    this.game.addEntity(new Snowflake(this.boss.BB.midX - 100, this.boss.BB.midY - 100, this.boss.facing, time, this));
                    this.attack(22, time); 
                    break;
                }
                case(22): this.attack(23); break;
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