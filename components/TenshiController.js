class TenshiController extends BossController {
    constructor(boss, game) {
        super(boss, game, 30);
    }
    setBossTime() {
        this.game.tenshiTime = Math.round((this.game.timer.gameTime - this.game.startTime - this.game.meilingTime) * 100) / 100;
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
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //ATTACKS FROM IDLE
            this.facePlayer();

            let roll = this.rollForAttack(6);

            switch(roll) {
                case(0): {
                    this.attack(1);
                    ASSET_MANAGER.playSound("Whoosh");
                    this.yVelocity = -1200;
                    this.xVelocity = (1 - this.boss.facing * 2) * 500;
                    break;
                }
                case(1): {
                    this.attack(4);
                    ASSET_MANAGER.playSound("Shing");
                    break;
                }
                case(2): { this.attack(8, 0.4); break; } 
                case(3): { this.attack(15); break; }
                case(4): {
                    this.attack(18);
                    ASSET_MANAGER.playSound("Whoosh");
                    this.yVelocity = -1200;
                    this.xVelocity = (1 - this.boss.facing * 2) * 500;
                    break;
                }
                case(5): {
                    this.attack(22);
                    ASSET_MANAGER.playSound("HisouSwing");
                    break;
                }
            }
        }
        if (this.attackDuration > 0 || this.timer > 0) { //DURING STATE
            switch(this.boss.state) {
                case(1, 2): {
                    if (this.yVelocity >= 0 && this.boss.y == 700 - this.boss.yBoxOffset) {
                        this.attackDuration = 0;
                        this.xVelocity = 0;
                    }
                    break;
                }
                case(5): {
                    if (this.attackDuration < (4/7) * this.boss.animations[0][5].totalTime) {
                        if (!this.effectSpawn) {
                            this.effectSpawn = true;
                            let y = this.boss.y + 160;
                            this.game.addEntity(new Effect(0, y, "Tenshi", 0, this.game));
                            this.game.addEntity(new Effect(800, y, "Tenshi", 0, this.game));
                            this.game.addEntity(new Hitbox(this.boss.BB.midX - 1280, y, 2560, 66, 0, this.game));
                        }
                    } else this.effectSpawn = false;
                    break;
                }
                case(9): { //SLASH 1
                    if (this.attackDuration > (2/8) * this.boss.animations[0][9].totalTime) {
                        this.boss.x += (1 - this.boss.facing * 2) * 800 * this.game.clockTick;
                    } 
                    if (this.attackDuration < (5/8) * this.boss.animations[0][9].totalTime) {
                        if (!this.effectSpawn) {
                            this.effectSpawn = true;
                            ASSET_MANAGER.playSound("HisouSwing");
                        }
                        if (this.attackDuration >= (3/8) * this.boss.animations[0][9].totalTime) {
                            if(this.boss.facing == 0) {
                                this.game.addEntity(new Hitbox(this.boss.x + 12 * 1.5, this.boss.y + 54*1.5, 97*1.5, 60*1.5, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x + 109 * 1.5, this.boss.y + 86 * 1.5, 32*1.5, 67*1.5, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x + 141 * 1.5, this.boss.y + 111 * 1.5, 36*1.5, 57*1.5, 0, this.game));
                            }
                            if(this.boss.facing == 1) {
                                this.game.addEntity(new Hitbox(this.boss.x + 91*1.5, this.boss.y + 54*1.5, 97*1.5, 60*1.5, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x + 59*1.5, this.boss.y + 86 * 1.5, 32*1.5, 67*1.5, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x + 23*1.5, this.boss.y + 111 * 1.5, 36*1.5, 57*1.5, 0, this.game));
                            }
                        }
                    } else this.effectSpawn = false;
                    break;
                }
                case(11): {
                    if (this.attackDuration > (2/7) * this.boss.animations[0][11].totalTime) {
                        this.boss.x += (1 - this.boss.facing * 2) * 800 * this.game.clockTick;
                    }
                    if (this.attackDuration < (5/7) * this.boss.animations[0][11].totalTime) {
                        if (!this.effectSpawn) {
                            this.effectSpawn = true;
                            ASSET_MANAGER.playSound("HisouSwing");
                        }
                        if (this.attackDuration >= (3/7) * this.boss.animations[0][11].totalTime) {
                            if(this.boss.facing == 0) {
                                this.game.addEntity(new Hitbox(this.boss.x + 106 * 1.5, this.boss.y + 34*1.5, 59*1.5, 68*1.5, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x + 114 * 1.5, this.boss.y + 103*1.5, 67*1.5, 72*1.5, 0, this.game));
                            }
                            if(this.boss.facing == 1) {
                                this.game.addEntity(new Hitbox(this.boss.x + 35 * 1.5, this.boss.y + 34*1.5, 59*1.5, 68*1.5, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x + 19 * 1.5, this.boss.y + 103*1.5, 67*1.5, 72*1.5, 0, this.game));
                            }
                        }
                    } else this.effectSpawn = false;
                    break;
                }
                case(13): {
                    if (this.attackDuration > (2/8) * this.boss.animations[0][12].totalTime) {
                        this.boss.x += (1 - this.boss.facing * 2) * 800 * this.game.clockTick;
                    }
                    if (this.attackDuration < (4/8) * this.boss.animations[0][12].totalTime) {
                        if (!this.effectSpawn) {
                            this.effectSpawn = true;
                            ASSET_MANAGER.playSound("HisouSlash");
                        }
                        if (this.attackDuration >= (2/8) * this.boss.animations[0][12].totalTime) {
                            if(this.boss.facing == 0) {
                                this.game.addEntity(new Hitbox(this.boss.x + 6 * 1.5, this.boss.y + 77*1.5, 162*1.5, 65*1.5, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x + 17 * 1.5, this.boss.y + 34*1.5, 143*1.5, 43*1.5, 0, this.game));
                            }
                            if(this.boss.facing == 1) {
                                this.game.addEntity(new Hitbox(this.boss.x + 32 * 1.5, this.boss.y + 77*1.5, 162*1.5, 65*1.5, 0, this.game));
                                this.game.addEntity(new Hitbox(this.boss.x + 40 * 1.5, this.boss.y + 34*1.5, 143*1.5, 43*1.5, 0, this.game));
                            }
                        }
                    } else this.effectSpawn = false;
                    break;
                }
                case(16): {
                    if (this.shotTimer <= 0 && this.shotCount < 3) {
                        if (this.shotCount % 2 == 0) {
                            for (let i = 0; i < 6; i++) {
                                this.game.addEntity(new Keystone(this.boss.BB.midX - 22 - 48 - 125 + 250 * i, -90, this.game));
                                this.game.addEntity(new Keystone(this.boss.BB.midX - 22 - 48 - 125 - 250 * i, -90, this.game));
                            }
                        } else {
                            for (let i = 0; i < 6; i++) {
                                this.game.addEntity(new Keystone(this.boss.BB.midX - 22 - 48 + 250 * i, -90, this.game));
                                this.game.addEntity(new Keystone(this.boss.BB.midX - 22 - 48 - 250 * i, -90, this.game));
                            }
                        }
                        this.shotCount++;
                        this.shotTimer = 0.5
                    }
                    this.shotTimer -= this.game.clockTick;
                    Keystone.setSfxPlayed(false);
                    break;
                }
                case(20): {
                    this.yVelocity += 5000 * this.game.clockTick;
                    if (this.boss.BB.bottom == 700) {
                        this.attackDuration = 0;
                        this.antiGrav = false;
                        ASSET_MANAGER.playSound("Rock");
                    }
                    if (!this.effectSpawn && (this.attackDuration < 1 && this.attackDuration > 0)) {
                        for (let i = 0; i < 2; i++) {
                            let stoneR = new Keystone(this.boss.BB.midX - 22 - 48 + 125 + 125 * i, -90 - 120 * i, this.game);
                            stoneR.gravity = 5000;
                            let stoneL = new Keystone(this.boss.BB.midX - 22 - 48 - 125 - 125 * i, -90 - 120 * i, this.game);
                            stoneL.gravity = 5000;
                            this.game.addEntity(stoneR);
                            this.game.addEntity(stoneL);
                        }
                        Keystone.setSfxPlayed(false);
                        this.effectSpawn = true;
                    }
                    break;
                }
                case(25): {
                    if (this.shotTimer <= 0 && this.shotCount < 5) {
                        this.game.addEntity(new Pillar(this.game.player.BB.midX - 3 - 72, this.attackDuration, this.game));
                        this.shotTimer = 0.75;
                        this.shotCount++;
                    } 
                    this.shotTimer -= this.game.clockTick;
                    break;
                }
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 0) { //AFTER STATE
            switch(this.boss.state) {
                case(1): { this.attack(2, 10); break; }
                case(2): {
                    ASSET_MANAGER.playSound("Thud");
                    this.attack(3);
                    break;
                }
                case(4): {
                    this.attack(5);
                    ASSET_MANAGER.playSound("HisouSlash");
                    break;
                }
                case(5): { this.attack(6, 0.1); break; }
                case(6): { this.attack(7); break; }
                //TRIPLE SLASHES
                case(8): {
                    this.facePlayer();
                    this.attack(9);
                    break;
                }
                case(9): { this.attack(10, 0.1); break; }
                case(10): {
                    this.facePlayer();
                    this.attack(11);
                    break;
                }
                case(11): { this.attack(12, 0.1); break; }
                case(12): {
                    this.effectSpawn = false;
                    this.facePlayer();
                    this.attack(13);
                    break;
                }
                case(13): { this.attack(14, 0.1); break;}
                case(15): {
                    ASSET_MANAGER.playSound("Shing");
                    this.attack(16, 2);
                    this.shotTimer = 0.5;
                    break;
                }
                case(16): { this.attack(17); break; }
                case(18): {
                    this.yVelocity = 0;
                    this.xVelocity = 0;
                    this.antiGrav = true;
                    this.attack(19);
                    break;
                }
                case(19): this.attack(20, 1); break;
                case(20): this.attack(21); break;
                
                case(22): { this.attack(23, 0.05); break; }
                case(23): { this.attack(24); break; }
                case(24): {
                    ASSET_MANAGER.playSound("HisouStab");
                    this.shotTimer = 0.5;
                    this.attack(25, 4.5);
                    break;
                }
                case(25): { this.attack(26); break; }
                default: {
                    this.timer =  0.5;
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