class OkuuController extends BossController {
    constructor(boss, game) {
        super(boss, game, 40);
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
    behavior() {
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //ATTACKS FROM IDLE
            this.facePlayer();

            // let roll = this.rollForAttack(2);
            // switch(roll) {
            //     case(0): { this.attack(4); break; }
            //     case(1): { this.attack(9); break; }
            // }


        }
        if (this.attackDuration > 0 || this.timer > 0) { //DURING STATE
            switch(this.boss.state) {
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
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 0) { //AFTER STATE
            switch(this.boss.state) {
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