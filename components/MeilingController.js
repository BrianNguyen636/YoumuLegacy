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
            // this.boss.state = 1;
            // this.timer =  0.3 + 0.3 * Math.floor(Math.random() * 3);
            this.facePlayer();
            this.attack(6);
        }
        // if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 1) { //Choose attack from Walk
        //     this.facePlayer();
        //     let roll = this.rollForAttack(5);

        //     switch(roll) {
        //         case(0): this.attack(2, 0.3); break;
        //         case(1): this.attack(4); break;
        //         case(2): this.attack(7); break;
        //         case(3): this.attack(10); break;
        //         case(4): this.attack(16); break;
        //     }

        // }
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
                        angle = -45 + 30 * (this.shotCount - 5);
                    } else {
                        angle = 60 - 30 * (this.shotCount - 9); 
                    }
                    if (this.shotTimer <= 0 && this.shotCount < 14) {
                        ASSET_MANAGER.playSound("Spray");
                        this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY - 16, 64, 32, 16, 0, 32, 32, projSpeed, 
                            this.boss.facing * 180 + angle * this.forwards(), null, "Meiling", shotColor, this.game));
                        this.shotCount++;
                        this.shotTimer = 0.08;
                    }
                    this.shotTimer -= this.game.clockTick;
                    break;
                }

                // case(5): { //Tetsuzanko
                //     if (this.attackDuration < 0.3) {
                //         this.xVelocity -= (-1 + this.boss.facing * 2) * 10000 * this.game.clockTick;
                //     }
                //     if (!this.effectSpawn && this.attackDuration < 0.28) {
                //         ASSET_MANAGER.playSound("Swish");
                //         this.effectSpawn = true;
                //     }
                //     break;
                // }
                // case(6): { //Tetsuzanko
                //     if (this.attackDuration < (5/7) * this.boss.animations[this.boss.facing][6].totalTime)
                //         this.xVelocity = 0;
                //     break;
                // }
                case(8):
                case(9): {
                    if (Math.abs(this.xVelocity) >= 0) {
                        this.xVelocity += 5000 * -this.forwards() * this.game.clockTick;
                    }
                    if (this.xVelocity * this.forwards() <= 0) {
                        this.xVelocity = 0;
                    }
                    if (this.shotTimer <= 0) {
                        if (this.boss.facing == 0) this.game.addEntity(new Effect(this.boss.x, this.boss.y, "Meiling", 1, this.game));
                        else this.game.addEntity(new Effect(this.boss.x, this.boss.y, "Meiling", 2, this.game));
                        this.shotTimer = 0.033;
                    }
                    this.shotTimer -= this.game.clockTick;
                    break;
                }
                // case(9): {//STOMP
                //     if (this.attackDuration < (5/7) * this.boss.animations[this.boss.facing][9].totalTime &&
                //     this.attackDuration > (3/7) * this.boss.animations[this.boss.facing][9].totalTime) { //Hitbox spawns
                //         if (!this.effectSpawn) {
                //             if (this.boss.facing == 0) {
                //                 this.game.addEntity(new Hitbox(this.boss.x + 86 , this.boss.y - 478, 142, 478, 0, this.game));
                //                 this.game.addEntity(new Hitbox(this.boss.x + 13, this.boss.y - 307, 289, 307, 0, this.game));
                //                 this.game.addEntity(new Hitbox(this.boss.x - 48, this.boss.y - 109, 400, 300, 0, this.game));
                //                 this.game.addEntity(new Hitbox(this.boss.x - 258, this.boss.y + this.boss.yBoxOffset - 10, 800, 10, 0, this.game));
                //                 this.game.addEntity(new Effect(this.boss.x - 80, this.boss.y - 500, "Meiling", 0, this.game));
                //                 this.game.addEntity(new Effect(this.boss.x - 238, this.boss.y, "Meiling", 1, this.game));
                                
                //             } else {
                //                 this.game.addEntity(new Hitbox(this.boss.x + 66 , this.boss.y - 478, 142, 478, 0, this.game));
                //                 this.game.addEntity(new Hitbox(this.boss.x - 7, this.boss.y - 307, 289, 307, 0, this.game));
                //                 this.game.addEntity(new Hitbox(this.boss.x - 68, this.boss.y - 109, 400, 300, 0, this.game));
                //                 this.game.addEntity(new Hitbox(this.boss.x - 258, this.boss.y + this.boss.yBoxOffset - 10, 800, 10, 0, this.game));
                //                 this.game.addEntity(new Effect(this.boss.x - 100, this.boss.y - 500, "Meiling", 0, this.game));
                //                 this.game.addEntity(new Effect(this.boss.x - 258, this.boss.y, "Meiling", 1, this.game));
                //             }
                //             ASSET_MANAGER.playSound("Stomp");
                //             this.effectSpawn = true;
                //         }
                //     } else this.effectSpawn = false;

                //     break;
                // }
                case(14,15): {
                    if (this.yVelocity == 0) this.attackDuration = 0;
                    break;
                }
                case(16): {//Projectiles
                    if (this.attackDuration < (3/8) * this.boss.animations[this.boss.facing][16].totalTime) {
                        let projSpeed = 750;
                        if (!this.effectSpawn) {
                            if (this.boss.facing == 0) {
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY + 16, 64, 32, 16, 0, 32, 32, projSpeed, 60, null, "Meiling", 3, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY + 16, 64, 32, 16, 0, 32, 32, projSpeed, 30, null, "Meiling", 2, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY + 16, 64, 32, 16, 0, 32, 32, projSpeed, 0, null, "Meiling", 1, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY + 16, 64, 32, 16, 0, 32, 32, projSpeed, -30, null, "Meiling", 0, this.game));
                            } else {
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY + 16, 64, 32, 16, 0, 32, 32, projSpeed, 120, null, "Meiling", 3, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY + 16, 64, 32, 16, 0, 32, 32, projSpeed, 150, null, "Meiling", 2, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY + 16, 64, 32, 16, 0, 32, 32, projSpeed, 180, null, "Meiling", 1, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.BB.midY + 16, 64, 32, 16, 0, 32, 32, projSpeed, 210, null, "Meiling", 0, this.game));
                            }
                            ASSET_MANAGER.playSound("Spray");
                            this.effectSpawn = true;
                        }
                    } else this.effectSpawn = false;
                    break;
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
                    this.attack(7, 0.3);
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

                // case(4): { this.attack(5, 0.6); break; }
                // case(5): {
                //     ASSET_MANAGER.playSound("Whoosh");
                //     this.attack(6);
                //     break;
                // }
                // case(7): { this.attack(8, 0.3); break; }
                // case(8): { this.attack(9); break; }
                // case(10): { this.attack(11, 0.4); break; }
                case(11): { this.attack(12); break; }
                case(12): { //DRAGONKICK
                    this.attack(13, 0.5);
                    this.xVelocity = -(-1 + this.boss.facing * 2) * 1700; 
                    this.yVelocity = -1100; 
                    ASSET_MANAGER.playSound("Fly");
                    break;
                }
                case(13): {
                    this.xVelocity = this.xVelocity / 2;
                    this.attack(14);
                    break;
                }
                case(14): { this.attack(15, 10); break; }
                default: {
                    this.effectSpawn = false;
                    this.shotTimer = 0;
                    this.shotCount = 0;
                    this.timer = 0.6;
                    this.boss.state = 0;
                    this.xVelocity = 0;
                    break;
                }
            }
        }
    }
}
