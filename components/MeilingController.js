class MeilingController extends BossController {
    constructor(boss, game) {
        super(boss, game, 40);
        this.timer = 0.5;
    }

    setBossTime() {
        this.game.meilingTime = Math.round((this.game.timer.gameTime - this.game.startTime - this.game.cirnoTime) * 100) / 100;
    };

    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Walk from Idle timer
            this.facePlayer();

            let roll = this.rollForAttack(5);

            switch(roll) {
                case(0): this.attack(2, 0.6); break;
                case(1): this.attack(6); break;
                case(2): this.attack(11); break;
                case(3): this.attack(17); break;
                case(4): this.attack(23); break;
            }
            // this.attack(2, 0.6);
            // this.attack(6);
            // this.attack(11);
            // this.attack(17);
            // this.attack(23);
        }

        if (this.attackDuration > 0 || this.timer > 0) { //What happens during an attack
            switch(this.boss.state) {
                case(1): { //Walking
                    this.facePlayer();
                    this.boss.x -= (-1 + this.boss.facing * 2) * 150 * this.game.clockTick; 
                    break;
                }
                case(4): { //Flurry
                    let projSpeed = 600;
                    let angle;
                    let shotColor = this.shotCount;
                    if (this.shotCount >= 5) shotColor = this.shotCount - 5;
                    if (this.shotCount >= 10) shotColor = this.shotCount - 10;
                    if (this.shotCount < 5) {
                        angle = 60 - 30 * this.shotCount; 
                    } else if (this.shotCount < 10) {
                        angle = -75 + 30 * (this.shotCount - 5);
                    } else {
                        angle = 60 - 30 * (this.shotCount - 10); 
                    }
                    if (this.shotTimer <= 0 && this.shotCount < 15) {
                        ASSET_MANAGER.playSound("Spray");
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY - 16, 64, 32, 16, 0, 32, 32, projSpeed, 
                            this.boss.facing * 180 + angle * this.forwards(), null, "Meiling", shotColor, this.game));
                        this.shotCount++;
                        this.shotTimer = 0.075;
                    }
                    this.shotTimer -= this.game.clockTick;
                    break;
                }
                case(8):
                case(9): {
                    if (Math.abs(this.xVelocity) >= 0) {
                        this.xVelocity += 5000 * -this.forwards() * this.game.clockTick;
                    }
                    if (this.xVelocity * this.forwards() <= 0) {
                        this.xVelocity = 0;
                    }
                    if (this.shotTimer <= 0) {
                        if (this.boss.facing == 0) this.game.addEntity(new Effect(this.boss.x, this.boss.y, "Meiling", 800, 1, this.game));
                        else this.game.addEntity(new Effect(this.boss.x, this.boss.y, "Meiling", 800, 2, this.game));
                        this.shotTimer = 0.033;
                    }
                    this.shotTimer -= this.game.clockTick;
                    break;
                }

                case(12): {
                    //diff * forwards is negative if in front, positive if past
                    let xDiff = this.boss.BB.midX - this.game.player.BB.midX;
                    if (xDiff * this.forwards() > 0) {
                        this.xVelocity = 0;
                    }
                    break;
                }
                case(14): {
                    if (this.boss.y + this.boss.yBoxOffset >= 700) {
                        this.yVelocity = 0;
                        this.attackDuration = 0;
                    }
                    break;
                }
                case(20):
                    if (this.shotTimer <= 0) {
                        if (this.boss.facing == 0) this.game.addEntity(new Effect(this.boss.x, this.boss.y, "Meiling", 800, 3, this.game));
                        else this.game.addEntity(new Effect(this.boss.x, this.boss.y, "Meiling", 800, 4, this.game));
                        this.shotTimer = 0.05;
                    }
                    this.shotTimer -= this.game.clockTick;
                case(21):
                case(22): {
                    if (Math.abs(this.xVelocity) >= 0) {
                        this.xVelocity += 2000 * -this.forwards() * this.game.clockTick;
                    }
                    if (this.xVelocity * this.forwards() <= 0) {
                        this.xVelocity = 0;
                    }
                    if (this.boss.y + this.boss.yBoxOffset >= 700) this.attackDuration = 0;
                    break;
                }
                case(25): {
                    if (this.attackDuration < (2/3) * this.boss.animations[0][25].totalTime && this.shotCount == 0) {
                        let projSpeed = 900;
                        ASSET_MANAGER.playSound("Meiling1");
                        for (let i = 0; i < 10; i++) {
                            let angle = 20 - 4 * i;
                            let shotColor = i;
                            if (i >= 5) shotColor -= 5;
                            this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY - 16, 64, 32, 16, 0, 32, 32, projSpeed, 
                                180 + angle, null, "Meiling", shotColor, this.game));
                            this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY - 16, 64, 32, 16, 0, 32, 32, projSpeed, 
                                0 - angle, null, "Meiling", shotColor, this.game));
                        }
                        this.shotCount++;
                    }
                }
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 1) { //What happens after attack
            switch(this.boss.state) {
                case(2): this.attack(3); break;
                case(3): {

                    this.attack(4, 1.2);
                    break;
                }
                case(4): {
                    this.attack(5); break;
                }
                case(6): {
                    this.attack(7, 0.4);
                    break;
                }
                case(7): {
                    ASSET_MANAGER.playSound("Whoosh");
                    this.xVelocity = this.forwards() * 3000;
                    this.attack(8, 0.3); break;
                }
                case(8): {
                    ASSET_MANAGER.playSound("HeavySwing");
                    this.attack(9, 0.5); break;
                }
                case(9): this.attack(10); break;

                case(11): {
                    ASSET_MANAGER.playSound("HeavySwing");
                    this.xVelocity = -(this.boss.BB.midX - this.game.player.BB.midX) / 0.5;
                    this.yVelocity -= 1300;
                    this.attack(12, 0.5); break;
                }
                case(12): {
                    this.attack(13); break;
                }
                case(13): {
                    this.yVelocity += 2000;
                    this.attack(14, 1); break;
                }
                case(14): {
                    this.xVelocity = 0;
                    ASSET_MANAGER.playSound("Stomp");
                            if (this.boss.facing == 0) {
                                this.game.addEntity(new Hitbox(this.boss.x + 86 , this.boss.y - 478, 142, 478, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x + 13, this.boss.y - 307, 289, 307, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x - 48, this.boss.y - 109, 400, 300, 0, this.game));
                                this.game.addEntity(new Effect(this.boss.x - 80, this.boss.y - 500, "Meiling", 800, 0, this.game));
                                
                            } else {
                                this.game.addEntity(new Hitbox(this.boss.x + 66 , this.boss.y - 478, 142, 478, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x - 7, this.boss.y - 307, 289, 307, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x - 68, this.boss.y - 109, 400, 300, 0, this.game));
                                this.game.addEntity(new Effect(this.boss.x - 100, this.boss.y - 500, "Meiling", 800, 0, this.game));
                            }
                    this.attack(15, 0.3); break;
                }
                case(15): this.attack(16); break;

                case(17): { 
                    this.attack(18, 0.5); break;
                }
                case(18): {
                    this.attack(19); break;
                }
                case(19): {
                    this.xVelocity = -(-1 + this.boss.facing * 2) * 2200; 
                    this.yVelocity = -1200; 
                    ASSET_MANAGER.playSound("Fly");
                    this.attack(20, 0.6); break;
                }
                case(20): {this.attack(21); break;}
                case(21): {this.attack(22, 2); break;}
               
                case(23): this.attack(24, 0.5); break;
                case(24): {this.attack(25); break;}
                case(25): {
                    this.attack(26, 0.5); break;
                }
                case(26): this.attack(27); break;
                default: {
                    this.effectSpawn = false;
                    this.shotTimer = 0;
                    this.shotCount = 0;
                    this.timer = 0.8;
                    this.boss.state = 0;
                    this.xVelocity = 0;
                    break;
                }
            }
        }
    }
}
