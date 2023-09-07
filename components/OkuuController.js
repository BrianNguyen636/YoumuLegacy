class OkuuController extends BossController {
    constructor(boss, game) {
        super(boss, game, 40);
        this.timer = 1;
        this.antiCollision = false;
        // this.gravity = 2000;
        this.afterimageTimer = 0;
    };
    setBossTime() {
        this.game.okuuTime = Math.round((this.game.timer.gameTime - this.game.startTime - 
            this.game.tenshiTime - this.game.meilingTime - this.game.cirnoTime) * 100) / 100;
    };
    firePillars() {
        if (this.shotTimer <= 0) {
            ASSET_MANAGER.playSound("Boom");
            if (this.boss.facing == 0) {
                this.game.addEntity(new Effect(this.boss.BB.midX - 97 + 100 + 80 * this.shotCount, this.boss.y - 45, "Okuu", 400, 0, this.game));
                this.game.addEntity(new Hitbox(this.boss.BB.midX - 97 + 100 + 68 + 80 * this.shotCount, this.boss.y - 45, 57, 312, 0, this.game));
            } else {
                this.game.addEntity(new Effect(this.boss.BB.midX - 97 - 100 - 80 * this.shotCount, this.boss.y - 45, "Okuu", 400, 0, this.game));
                this.game.addEntity(new Hitbox(this.boss.BB.midX - 97 - 100 + 68 - 80 * this.shotCount, this.boss.y - 45, 57, 312, 0, this.game));
            }
            this.shotCount++;
            this.shotTimer = 0.10;
        }
        this.shotTimer -= this.game.clockTick;
    }
    magnetize(speed) {
        let xTarget = this.boss.BB.midX;
        let yTarget = this.boss.BB.bottom;
        let xDiff = xTarget - this.game.player.x;
        let yDiff = yTarget - this.game.player.y;
        // let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        // this.xTrajectory = xDiff / distance;
        // this.yTrajectory = yDiff / distance;
        if (xDiff > 0) {
            this.game.player.x += speed * this.game.clockTick;
        } else {
            this.game.player.x -= speed * this.game.clockTick;
        }
        // this.game.player.x += this.xTrajectory * speed * this.game.clockTick;
        if (!this.game.player.dead() && !this.game.player.controller.dashing) {
            this.game.player.y += speed / 2 * this.game.clockTick;
        }
        // this.game.player.y += this.yTrajectory * speed * this.game.clockTick / 2;
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

            let roll = this.rollForAttack(6);
            switch(roll) {
                case(0): {this.attack(4); break; }
                case(1): {this.attack(9); break; }
                case(2): {this.attack(14); break; }
                case(3): {this.attack(18); break; }
                case(4): {
                    this.attack(23, 0.5);
                    this.antiGrav = true;
                    break;
                }
                case(5): this.attack(27); break;
            }
            // this.attack(9);
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
                case(10): {
                    let projSpeed = 800;
                    if (this.shotTimer <= 0 && this.shotCount < 3) {
                        ASSET_MANAGER.playSound("Okuu2");
                        let hypotenuse = 1280 / Math.sqrt(2);
                        this.game.addEntity(new Particle(this.boss.BB.midX - 100 - 1280, this.boss.BB.midY - 100, projSpeed, this.boss));
                        this.game.addEntity(new Particle(this.boss.BB.midX - 100 + 1280, this.boss.BB.midY - 100, projSpeed, this.boss));
                        this.game.addEntity(new Particle(this.boss.BB.midX - 100, this.boss.BB.midY - 100 - 1280, projSpeed, this.boss));
                        this.game.addEntity(new Particle(this.boss.BB.midX - 100 - hypotenuse, this.boss.BB.midY - 100 - hypotenuse, projSpeed, this.boss));
                        this.game.addEntity(new Particle(this.boss.BB.midX - 100 + hypotenuse, this.boss.BB.midY - 100 - hypotenuse, projSpeed, this.boss));
                        this.game.addEntity(new Particle(this.boss.BB.midX - 100 - hypotenuse, this.boss.BB.midY - 100 + hypotenuse, projSpeed, this.boss));
                        this.game.addEntity(new Particle(this.boss.BB.midX - 100 + hypotenuse, this.boss.BB.midY - 100 + hypotenuse, projSpeed, this.boss));
                        this.shotTimer = 0.75;
                        this.shotCount++;
                    }
                    this.shotTimer -= this.game.clockTick;
                    this.magnetize(320);

                    if (this.attackDuration < 3.3 && !this.effectSpawn) {
                        this.game.addEntity(new Klaxon(120, 2.3, this.game));
                        this.effectSpawn = true;
                    }
                    break;
                }
                case(12): {
                    let projSpeed = 800;
                    if (this.shotTimer <= 0 && this.shotCount < 5) {
                        ASSET_MANAGER.playSound("Okuu3");
                        for (let i = 0; i < 8; i++) {
                            if (this.shotCount % 2 == 0)
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200,
                                    75, 75, 50, 50, projSpeed, 45 * i, null, "Okuu", 0, this.game));
                            else
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 100, this.boss.BB.midY - 100, 200, 200,
                                    75, 75, 50, 50, projSpeed, -22.5 + 45 * i, null, "Okuu", 0, this.game));
                        }
                        this.shotTimer = 0.2;
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

                    if (this.afterimageTimer <= 0) {
                        let frame = this.boss.animations[0][17].currentFrame();
                        let image = new Effect(this.boss.x, this.boss.y, "Okuu", 400, frame + this.boss.facing * 4 + 1, this.game)
                        image.fadeSpeed = 4.5;
                        this.game.addEntity(image);
                        this.afterimageTimer = 0.05;
                    }
                    this.afterimageTimer -= this.game.clockTick;
                    break;
                }
                case(18): {
                    if (this.attackDuration < 1 && !this.effectSpawn) {
                        this.game.addEntity(new Klaxon(120, 1.5, this.game));
                        this.effectSpawn = true;
                    }
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
                case(29): {
                    let time = this.boss.animations[0][29].totalTime;
                    if (this.attackDuration > (3/7) * time) {
                        this.boss.x += (1 - this.boss.facing * 2) * 800 * this.game.clockTick;
                    } else if (this.shotCount < 1) {
                        // if (this.boss.facing == 0) this.game.addEntity(new Effect(this.boss.x + 73 * 1.5 - 65, this.boss.y + 80 * 1.5 - 67, "Okuu", 1, this.game));
                        // else this.game.addEntity(new Effect(this.boss.x + 58 * 1.5 - 136, this.boss.y + 66 * 1.5 - 45, "Okuu", 2, this.game));
                        // this.shotCount++;
                    }
                    if (this.attackDuration < (5/7) * time && !this.effectSpawn) {
                        this.effectSpawn = true;
                        ASSET_MANAGER.playSound("HeavySwing");
                    }
                    if (this.attackDuration < (5/7) * time && this.attackDuration > (3/7) * time) {
                        if (this.boss.facing == 0) {
                            this.game.addEntity(new Hitbox(this.boss.x + 71 * 1.5, this.boss.y + 75 * 1.5, 
                                138 * 1.5, 78 * 1.5, 0, this.game));
                            this.game.addEntity(new Hitbox(this.boss.x + 209 * 1.5, this.boss.y + 92 * 1.5, 
                                41 * 1.5, 54 * 1.5, 0, this.game));
                        }
                        else {
                            this.game.addEntity(new Hitbox(this.boss.x + 41 * 1.5, this.boss.y + 75 * 1.5, 
                                138 * 1.5, 78 * 1.5, 0, this.game));
                            this.game.addEntity(new Hitbox(this.boss.x + 0 * 1.5, this.boss.y + 92 * 1.5, 
                                41 * 1.5, 54 * 1.5, 0, this.game));
                            }
                    }
                    break;
                }
                case(33): {
                    if (this.attackDuration < (8/9) * this.boss.animations[0][33].totalTime && !this.effectSpawn) {
                        ASSET_MANAGER.playSound("Okuu2");
                        ASSET_MANAGER.playSound("HeavySwing");
                        this.yVelocity -= 1300;
                        this.effectSpawn = true;
                    }
                    if (this.attackDuration < (6/9) * this.boss.animations[0][33].totalTime &&
                        this.attackDuration > (4/9) * this.boss.animations[0][33].totalTime) {
                        if (this.boss.facing == 0) {
                            this.game.addEntity(new Hitbox(this.boss.x + 125 * 1.5, this.boss.y + 43 * 1.5, 
                                62 * 1.5, 124 * 1.5, 0, this.game));
                        } else {
                            this.game.addEntity(new Hitbox(this.boss.x + 63 * 1.5, this.boss.y + 43 * 1.5, 
                                62 * 1.5, 124 * 1.5, 0, this.game));
                        }
                    }
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

                case(9): { this.attack(10, 3.5); break;}
                case(10): { this.attack(11); break;}
                case(11): { 
                    this.attack(12, 1); 
                    this.shotCount = 0;
                    this.shotTimer = 0;
                    break;
                }
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
                case(25):
                case(17): {
                    this.antiGrav = false;
                    this.boss.y = 0;
                    this.facePlayer();
                    let offset = this.boss.BB.x - this.boss.x
                    if (this.boss.BB.x <= 0) { //LEFT COLLISION
                        this.boss.x = 0 - offset;
                        this.xVelocity = 450;
                    }
                    if (this.boss.BB.right >= 1280) { //RIGHT COLLISION
                        this.boss.x = 1280 - offset - this.boss.BB.width;
                        this.xVelocity = -450;
                    }
                    this.yVelocity = 0;
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
                //FALLING
                case(33):
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
                    this.attack(25, 2.5);
                    break;
                }
                // case(25): {
                //     this.xVelocity = 0;
                //     this.yVelocity = 0;
                //     this.boss.x = 640 - (this.boss.BB.midX - this.boss.x);
                //     this.boss.y = 0 - this.boss.yBoxOffset - 100;
                //     this.antiGrav = false;
                //     this.attack(26, null);
                //     break;
                // }
                case(27): this.attack(28, 0.3); break;
                case(28): { this.attack(29); break;}
                case(29): { this.attack(30, 0.2); break;}
                case(30): { this.attack(31); break;}

                case(31): {
                    this.effectSpawn = false;
                    this.facePlayer();
                    this.attack(32, 0.1); 
                    break;
                }
                case(32): {
                    this.attack(33);
                    this.xVelocity += (1 - this.boss.facing * 2) * 450;
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