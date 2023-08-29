class OkuuController extends BossController {
    constructor(boss, game) {
        super(boss, game, 40);
        this.timer = 0.5;
        this.antiCollision = false;
        // this.gravity = 2000;
    };
    setBossTime() {
        this.game.okuuTime = Math.round((this.game.timer.gameTime - this.game.tenshiTime) * 100) / 100;
    };
    firePillars() {
        if (this.shotTimer <= 0) {
            ASSET_MANAGER.playSound("Boom");
            if (this.boss.facing == 0) {
                this.game.addEntity(new Effect(this.boss.BB.midX - 97 + 100 + 80 * this.shotCount, this.boss.y - 45, "Okuu", 0, this.game));
                this.game.addEntity(new Hitbox(this.boss.BB.midX - 97 + 100 + 68 + 80 * this.shotCount, this.boss.y - 45, 57, 312, 0, this.game));
            } else {
                this.game.addEntity(new Effect(this.boss.BB.midX - 97 - 100 - 80 * this.shotCount, this.boss.y - 45, "Okuu", 0, this.game));
                this.game.addEntity(new Hitbox(this.boss.BB.midX - 97 - 100 + 68 - 80 * this.shotCount, this.boss.y - 45, 57, 312, 0, this.game));
            }
            this.shotCount++;
            this.shotTimer = 0.10;
        }
        this.shotTimer -= this.game.clockTick;
    }
    flightShots() {
        let projSpeed = 700;
        if (this.shotTimer <= 0 && (this.boss.BB.x > 0 - 100 && this.boss.BB.right < 1280 + 100)) {
            ASSET_MANAGER.playSound("Okuu1");
            let proj = new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200,
                75,75,50,50, projSpeed, -90, null, "Okuu", 2, this.game);
            this.game.addEntity(proj);
            this.shotTimer = 0.1;
        }
        this.shotTimer -= this.game.clockTick;
    }
    sideCollisions(){
        if (!this.antiCollision) {
            let offset = this.boss.BB.x - this.boss.x
            if (this.boss.BB.x <= 0) { //LEFT COLLISION
                this.boss.x = 0 - offset;
            }
            if (this.boss.BB.right >= 1280) { //RIGHT COLLISION
                this.boss.x = 1280 - offset - this.boss.BB.width;
            }
        }
    }
    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //ATTACKS FROM IDLE
            this.facePlayer();



            let roll = this.rollForAttack(5);
            switch(roll) {
                case(0): {this.attack(4); break; }
                case(1): {this.attack(9); break; }
                case(2): {this.attack(14); break; }
                case(3): {this.attack(18); break; }
                case(4): {
                    this.attackDuration = 0.5;
                    this.boss.state = 23;
                    this.antiGrav = true;
                    break;
                }
            }
        }
        if (this.attackDuration > 0 || this.timer > 0) { //DURING STATE
            switch(this.boss.state) {
                case(1):
                case(2): {
                    this.gravity = 1500;
                    if (this.yVelocity >= 0 && this.boss.y == 700 - this.boss.yBoxOffset) {
                        this.attackDuration = 0;
                        this.xVelocity = 0;
                        ASSET_MANAGER.playSound("Thud");
                    }
                    break;
                }
                case(6): {
                    let animationTime = this.boss.animations[0][6].totalTime;
                    if (this.attackDuration < (2/7) * animationTime) this.firePillars();
                    break;
                }
                case(7): {
                    this.firePillars();
                    break;
                }
                case(12): {
                    let projSpeed = 650;
                    if (this.shotTimer <= 0) {
                        ASSET_MANAGER.playSound("Spray");
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200,
                            60, 60, 80, 80, projSpeed, 40 * this.shotCount, null, "Okuu", 0, this.game));
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200,
                            60, 60, 80, 80, projSpeed, 180 - 40 * this.shotCount, null, "Okuu", 0, this.game));
                        this.shotTimer = 0.075;
                        this.shotCount++;
                    } 
                    this.shotTimer -= this.game.clockTick;
                    break;
                }
                case(16):
                case(17): {
                    this.boss.x -= (-1 + this.boss.facing * 2) * 2000 * this.game.clockTick; 
                    if (this.shotTimer <= 0 && this.shotCount < 2) {
                        ASSET_MANAGER.playSound("Fly");
                        this.facePlayer();
                        let midPtOffset = this.boss.BB.midY - this.boss.y;
                        this.boss.y = this.game.player.BB.midY - midPtOffset;

                        let offset = this.boss.BB.x - this.boss.x;
                        if (this.boss.facing == 0) this.boss.x = 0 - offset;
                        else this.boss.x = 1280 - offset - this.boss.BB.width;

                        this.shotCount++;
                        this.shotTimer = 1;
                    }
                    this.shotTimer -= this.game.clockTick;

                    if (this.shotCount > 2 && this.shotTimer <= -0.75) this.attackDuration = 0;
                    break;
                }
                case(19): {
                    if (this.attackDuration < 1) this.yVelocity -= 800 * this.game.clockTick;
                    break;
                }
                case(21): {
                    let projSpeed = 700;
                    if (this.shotTimer <= 0) {
                        ASSET_MANAGER.playSound("Spray");
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200,
                            80, 80, 40, 40, projSpeed, 0 - this.shotCount * 20, null, "Okuu", 1, this.game));
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200,
                            80, 80, 40, 40, projSpeed, 180 + this.shotCount * 20, null, "Okuu", 1, this.game));
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200,
                                80, 80, 40, 40, projSpeed, 180 - 10 - this.shotCount * 20, null, "Okuu", 1, this.game));
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200,
                                80, 80, 40, 40, projSpeed, 0 + 10 + this.shotCount * 20, null, "Okuu", 1, this.game));
                        this.shotTimer = 0.05;
                        this.shotCount++;
                    } 
                    this.shotTimer -= this.game.clockTick;
                    break;
                }
                // case(23): {
                //     if (this.attackDuration < 0.8) this.yVelocity -= 800 * this.game.clockTick;
                //     break;
                // }
                case(24): {
                    if (this.attackDuration > 1) this.yVelocity -= 400 * this.game.clockTick;
                    this.xVelocity += (1 - this.boss.facing * 2) * 1200 * this.game.clockTick; 

                    this.flightShots();
                    break;
                }
                case(25): {
                    this.xVelocity -= (1 - this.boss.facing * 2) * 1000 * this.game.clockTick; 
                    this.yVelocity -= 400 * this.game.clockTick;

                    this.flightShots();
                    break;
                }
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 0) { //AFTER STATE
            switch(this.boss.state) {
                case(1): { this.attack(2, 3); break;}

                case(4): { this.attack(5, 0.1); break;}
                case(5): { this.attack(6, null); break;}
                case(6): { this.attack(7, 1); break;}
                case(7): { this.attack(8, null); break;}

                case(9): { this.attack(10, 0.7); break;}
                case(10): { this.attack(11); break;}
                case(11): { this.attack(12, 1.5); break;}
                case(12): { this.attack(13, null); break;}

                case(14): { this.attack(15, 0.5); break; }
                case(15): {
                    this.antiCollision = true;
                    this.attack(16, null);
                    ASSET_MANAGER.playSound("Fly");
                    this.shotTimer = 1;
                    break;
                }
                case(16): {
                    this.attack(17, 3);
                    this.antiGrav = true;
                    break;
                }
                case(17): {
                    this.antiGrav = false;
                    this.boss.y = 0;
                    this.facePlayer();
                    let offset = this.boss.BB.x - this.boss.x
                    if (this.boss.BB.x <= 0) { //LEFT COLLISION
                        this.boss.x = 0 - offset;
                        this.xVelocity = 300;
                    }
                    if (this.boss.BB.right >= 1280) { //RIGHT COLLISION
                        this.boss.x = 1280 - offset - this.boss.BB.width;
                        this.xVelocity = -300;
                    }
                    this.attack(1, null);
                    break;
                }

                case(18): { //NOVA
                    this.antiGrav = true;
                    this.attack(19, 1.3);
                    break;
                }
                case(19): {
                    this.yVelocity = 0;
                    this.attack(20, null);
                    break;
                }
                case(20): { this.attack(21, 2); break;}
                case(21): {
                    this.antiGrav = false;
                    this.attack(22, null);
                    break;
                }
                case(22):
                case(26): { this.attack(2, 2); break;}

                case(23): {
                    this.attack(24, 2);
                    this.antiCollision = true;
                    this.xVelocity = -(1 - this.boss.facing * 2) * 500;
                    this.shotTimer = 0.5;
                    break;
                }
                case(24): {
                    let offset = this.boss.BB.x - this.boss.x
                    if (this.boss.BB.x <= 0) { //LEFT COLLISION
                        this.boss.x = 0 - offset - 300;
                    }
                    if (this.boss.BB.right >= 1280) { //RIGHT COLLISION
                        this.boss.x = 1280 - offset - this.boss.BB.width + 300;
                    }
                    this.boss.y = 600;
                    this.xVelocity = 0;
                    this.yVelocity = 0;
                    this.attack(25, 2.2);
                    break;
                }
                case(25): {
                    this.xVelocity = 0;
                    this.yVelocity = 0;
                    this.boss.x = 640 - (this.boss.BB.midX - this.boss.x);
                    this.boss.y = 0 - this.boss.yBoxOffset - 100;
                    this.antiGrav = false;
                    this.attack(26, null);
                    break;
                }
                default: {
                    this.antiCollision = false;
                    this.gravity = 2000;
                    this.timer =  0.7;
                    this.boss.state = 0;
                    this.xVelocity = 0;
                    this.effectSpawn = false;
                    this.shotCount = 0;
                    this.shotTimer = 0;
                }
            }
        }
    }
}