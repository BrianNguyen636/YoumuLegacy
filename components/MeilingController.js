class MeilingController {
    constructor(boss, game) {
        this.boss = boss;
        this.game = game;
        this.player = this.boss.player;
        boss.state = 1;
        this.timer = 0;
        this.attackDuration = 0;
        this.effectSpawn = false;
        this.lastRoll = null;
        this.yVelocity = 0;
        this.xVelocity = 0;
    }

    facePlayer() {
        if (this.boss.x < this.player.x) {
            this.boss.facing = 0;
        } else this.boss.facing = 1; 
    }

    attack(state) {
        this.boss.state = state;
        this.boss.animations[this.boss.facing][state].resetFrames();
        this.attackDuration = this.boss.animations[this.boss.facing][state].totalTime - 2 * this.game.clockTick;
    }
    update() {
        if (this.timer > 0) this.timer -= this.game.clockTick;
        if (this.attackDuration > 0) this.attackDuration -= this.game.clockTick;

        this.yVelocity += 0.1; //Gravity
        this.boss.y += this.yVelocity / 2; 
        this.boss.x += this.xVelocity / 2;
        if (this.boss.y + this.boss.yBoxOffset >= 700) { //GROUND COLLISION
            this.boss.y = 700 - this.boss.yBoxOffset;
            this.yVelocity = 0;
        }
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Walk from Idle timer
            this.boss.state = 1;
            this.timer = 150 * this.game.clockTick;
        }
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 1) { //Choose attack from Walk
            this.facePlayer();

            let roll = this.lastRoll;
            while (roll == this.lastRoll) {
                roll = Math.floor(Math.random() * 5);
            }
            this.lastRoll = roll;
            switch(roll) {
                case(0): this.boss.state = 2; break;
                case(1): this.boss.state = 4; break;
                case(2): this.boss.state = 7; break;
                case(3): this.boss.state = 10; break;
                case(4): this.boss.state = 16; break;
            }

            // this.boss.state = 4;

            switch(this.boss.state) {
                case(2): this.attackDuration = 40 * this.game.clockTick; break;
                case(4): this.attack(4); break;
                case(7): this.attack(7); break;
                case(10): this.attack(10); break;
                case(16): this.attack(16); break;
            }
        }

        if (this.attackDuration > 0 || this.timer > 0) { //What happens during an attack
            switch(this.boss.state) {
                case(1): { //Walking
                    this.facePlayer();
                    this.boss.x -= (-1 + this.boss.facing * 2) * .75; 
                    break;
                }
                case(3): { //Flurry
                    this.boss.x -= (-1 + this.boss.facing * 2) * 1; 
                    if (this.boss.facing == 0) {
                        this.game.addEntity(new Hitbox(this.boss.x + 120, this.boss.y + 30, 50, 80, 0, this.game));
                    } else this.game.addEntity(new Hitbox(this.boss.x + 30, this.boss.y + 30, 50, 80, 0, this.game));
                    break;
                }
                case(5): { //Tetsuzanko
                    if (this.attackDuration < 40 * this.game.clockTick)
                        this.xVelocity -= (-1 + this.boss.facing * 2) * 1;
                    break;
                }
                case(6): { //Tetsuzanko
                    if (this.attackDuration < (6/7) * this.boss.animations[this.boss.facing][6].totalTime)
                        this.xVelocity = 0;
                    break;
                }
                case(9): {//STOMP
                    if (this.attackDuration < (5/7) * this.boss.animations[this.boss.facing][9].totalTime &&
                    this.attackDuration > (3/7) * this.boss.animations[this.boss.facing][9].totalTime) { //Hitbox spawns
                        if (!this.effectSpawn) {
                            this.game.addEntity(new Hitbox(this.boss.x - 48, this.boss.y, 285, 120, 0, this.game));
                            this.game.addEntity(new Hitbox(this.boss.x + 42, this.boss.y - 346, 100, 475, 0, this.game));
                            this.game.addEntity(new Hitbox(this.boss.x, this.boss.y - 150, 200, 275, 0, this.game));
                            this.game.addEntity(new Effect(this.boss.x - 163, this.boss.y - 366));
                            this.effectSpawn = true;
                        }
                    } else this.effectSpawn = false;

                    break;
                }
                case(14,15): {
                    if (this.yVelocity == 0) this.attackDuration = 0;
                    break;
                }
                case(16): {//Projectiles
                    if (this.attackDuration < (3/8) * this.boss.animations[this.boss.facing][16].totalTime) {
                        
                        if (!this.effectSpawn) {
                            if (this.boss.facing == 0) {
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY, 64, 32, 2, 80, null, "Meiling", 3, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY, 64, 32, 2, 40, null, "Meiling", 2, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY, 64, 32, 2, 0, null, "Meiling", 1, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY, 64, 32, 2, -40, null, "Meiling", 0, this.game));
                            } else {
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY, 64, 32, 2, 100, null, "Meiling", 3, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY, 64, 32, 2, 140, null, "Meiling", 2, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY, 64, 32, 2, 180, null, "Meiling", 1, this.game));
                                this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY, 64, 32, 2, 220, null, "Meiling", 0, this.game));
                            }
                            this.effectSpawn = true;
                        }
                    } else this.effectSpawn = false;
                    break;
                }
            }
        }
        if (this.attackDuration <= 0 && this.boss.state > 1) { //What happens after attack
            switch(this.boss.state) {
                case(2): {
                    this.attack(3);
                    break;
                }
                case(3): {
                    this.facePlayer();
                    this.boss.state = 1;
                    this.timer = 0;
                    break;
                }
                case(4): {
                    this.attackDuration = 70 * this.game.clockTick;
                    this.boss.state = 5;
                    break;
                }
                case(5): {
                    this.attack(6);
                    break;
                }
                case(7): {
                    this.attackDuration = 40 * this.game.clockTick;
                    this.boss.state = 8;
                    break;
                }
                case(8): {
                    this.attack(9);
                    break;
                }
                case(10): {
                    this.attackDuration = 40 * this.game.clockTick;
                    this.boss.state = 11;
                    break;
                }
                case(11): {
                    this.attack(12);
                    break;
                }
                case(12): {
                    this.attackDuration = 100 * this.game.clockTick;
                    this.boss.state = 13;
                    this.xVelocity -= (-1 + this.boss.facing * 2) * 15; 
                    this.yVelocity -= 10; 
                    break;
                }
                case(13): {
                    this.xVelocity = this.xVelocity / 2;
                    this.attack(14);
                    break;
                }
                case(14): {
                    this.attackDuration = 1000 * this.game.clockTick;
                    this.boss.state = 15;
                    break;
                }
                default: {
                    this.effectSpawn = false;
                    this.timer = 30 * this.game.clockTick;
                    this.boss.state = 0;
                    this.xVelocity = 0;
                    break;
                }
            }
        }
    }
}