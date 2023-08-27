class OkuuController extends BossController {
    constructor(boss, game) {
        super(boss, game, 40);
        this.timer = 0.5;
        this.gravity = 1500;
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
    sideCollisions(){
        if (this.boss.state > 2 && this.boss.state < 16 || this.boss.state > 17) {
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

            
            // let roll = this.rollForAttack(2);
            // switch(roll) {
            //     case(0): {this.attack(4); break; }
            //     case(1): {this.attack(9); break; }
            //     case(2): {this.attack(14); break; }
            // }


        }
        if (this.attackDuration > 0 || this.timer > 0) { //DURING STATE
            switch(this.boss.state) {
                case(1):
                case(2): {
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
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 0) { //AFTER STATE
            switch(this.boss.state) {
                case(1): {
                    this.attackDuration = 3;
                    this.boss.state = 2;
                    break;
                }
                case(4): {
                    this.attackDuration = 0.1;
                    this.boss.state = 5;
                    break;
                }
                case(5): {
                    this.attack(6);
                    break;
                }
                case(6): {
                    this.attackDuration = 1;
                    this.boss.state = 7;
                    break;
                }
                case(7): {
                    this.attack(8);
                    break;
                }
                case(9): {
                    this.attackDuration = 0.7;
                    this.boss.state = 10;
                    break;
                }
                case(10): {
                    this.attack(11);
                    break;
                }
                case(11): {
                    this.attackDuration = 1.5;
                    this.boss.state = 12;
                    break;
                }
                case(12): {
                    this.attack(13);
                    break;
                }
                case(14): {
                    this.attackDuration = 0.5;
                    this.boss.state = 15;
                    break;
                }
                case(15): {
                    this.attack(16);
                    ASSET_MANAGER.playSound("Fly");
                    this.shotTimer = 1;
                    break;
                }
                case(16): {
                    this.attackDuration = 3;
                    this.boss.state = 17;
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
                    this.attack(1);
                    break;
                }
                default: {
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