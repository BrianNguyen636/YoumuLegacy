class MeilingController {
    constructor(boss, game) {
        this.boss = boss;
        this.game = game;
        this.player = this.game.player;
        this.boss.state = 1;
        this.timer = 0;
        this.attackDuration = 1;
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

        this.yVelocity += 2000 * this.game.clockTick; //Gravity
        this.boss.y += this.yVelocity * this.game.clockTick; 
        this.boss.x += this.xVelocity * this.game.clockTick;
        if (this.boss.y + this.boss.yBoxOffset >= 700) { //GROUND COLLISION
            this.boss.y = 700 - this.boss.yBoxOffset;
            this.yVelocity = 0;
        }
        if (this.boss.x + this.boss.xBoxOffset <= 0) { //LEFT COLLISION
            this.boss.x = 0 - this.boss.xBoxOffset;
        }
        if (this.boss.x + this.boss.xBoxOffset + this.boss.BB.width >= 1280) { //RIGHT COLLISION
            this.boss.x = 1280 - this.boss.xBoxOffset - this.boss.BB.width;
        }
        if (!this.boss.dead()) {
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
    
                // this.boss.state = 7;
    
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
                        this.boss.x -= (-1 + this.boss.facing * 2) * 120 * this.game.clockTick; 
                        break;
                    }
                    case(3): { //Flurry
                        this.boss.x -= (-1 + this.boss.facing * 2) * 300 * this.game.clockTick; 
                        if (this.boss.facing == 0) {
                            this.game.addEntity(new Hitbox(this.boss.x + 120* 1.5, this.boss.y + 30* 1.5, 50* 1.5, 80* 1.5, 0, this.game));
                        } else this.game.addEntity(new Hitbox(this.boss.x + 30* 1.5, this.boss.y + 30* 1.5, 50* 1.5, 80* 1.5, 0, this.game));
                        break;
                    }
                    case(5): { //Tetsuzanko
                        if (this.attackDuration < 40 * this.game.clockTick) {
                            this.xVelocity -= (-1 + this.boss.facing * 2) * 12000 * this.game.clockTick;
                        }
                        if (!this.effectSpawn) {
                            this.game.audioManager.playSound("Swish.wav");
                            this.effectSpawn = true;
                        }
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
                                if (this.boss.facing == 0) {
                                    this.game.addEntity(new Hitbox(this.boss.x + 86 , this.boss.y - 478, 142, 478, 0, this.game));
                                    this.game.addEntity(new Hitbox(this.boss.x + 13, this.boss.y - 307, 289, 307, 0, this.game));
                                    this.game.addEntity(new Hitbox(this.boss.x - 48, this.boss.y - 109, 400, 300, 0, this.game));
                                    this.game.addEntity(new Hitbox(this.boss.x - 258, this.boss.y + this.boss.yBoxOffset - 10, 800, 10, 0, this.game));
                                    this.game.addEntity(new Effect(this.boss.x - 80, this.boss.y - 500, "Meiling", 0));
                                    this.game.addEntity(new Effect(this.boss.x - 238, this.boss.y, "Meiling", 1));
                                    
                                } else {
                                    this.game.addEntity(new Hitbox(this.boss.x + 66 , this.boss.y - 478, 142, 478, 0, this.game));
                                    this.game.addEntity(new Hitbox(this.boss.x - 7, this.boss.y - 307, 289, 307, 0, this.game));
                                    this.game.addEntity(new Hitbox(this.boss.x - 68, this.boss.y - 109, 400, 300, 0, this.game));
                                    this.game.addEntity(new Hitbox(this.boss.x - 258, this.boss.y + this.boss.yBoxOffset - 10, 800, 10, 0, this.game));
                                    this.game.addEntity(new Effect(this.boss.x - 100, this.boss.y - 500, "Meiling", 0));
                                    this.game.addEntity(new Effect(this.boss.x - 258, this.boss.y, "Meiling", 1));
                                }
                                this.game.audioManager.playSound("Stomp.wav");
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
                            let projSpeed = 750;
                            if (!this.effectSpawn) {
                                if (this.boss.facing == 0) {
                                    this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY + 32, 64, 32, projSpeed, 60, null, "Meiling", 3, this.game));
                                    this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY + 32, 64, 32, projSpeed, 30, null, "Meiling", 2, this.game));
                                    this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY + 32, 64, 32, projSpeed, 0, null, "Meiling", 1, this.game));
                                    this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY + 32, 64, 32, projSpeed, -30, null, "Meiling", 0, this.game));
                                } else {
                                    this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY + 32, 64, 32, projSpeed, 120, null, "Meiling", 3, this.game));
                                    this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY + 32, 64, 32, projSpeed, 150, null, "Meiling", 2, this.game));
                                    this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY + 32, 64, 32, projSpeed, 180, null, "Meiling", 1, this.game));
                                    this.game.addEntity(new Projectile(this.boss.BB.midX - 32, this.boss.y + this.boss.BB.midY + 32, 64, 32, projSpeed, 210, null, "Meiling", 0, this.game));
                                }
                                this.game.audioManager.playSound("Spray.wav");
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
                        this.game.audioManager.playSound("Flurry.wav");
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
                        this.game.audioManager.playSound("Whoosh.wav");
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
                    case(12): { //DRAGONKICK
                        this.attackDuration = 100 * this.game.clockTick;
                        this.boss.state = 13;
                        this.xVelocity = -(-1 + this.boss.facing * 2) * 1500; 
                        this.yVelocity = -1000; 
                        this.game.audioManager.playSound("Fly.wav");
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
        } else {
            if (this.boss.state < 17) { //initial death
                this.game.meilingTime = Math.round((this.game.timer.gameTime - this.game.startTime) * 100) / 100;
                this.game.timer.timerRun = false;
                this.game.audioManager.playSound("KO.wav");
                this.facePlayer();
                this.attack(17);
                this.xVelocity = (-1 + this.boss.facing * 2) * 400; 
                this.yVelocity = -800;
            } else if (this.boss.state == 17 || this.boss.state == 18) {
                if (this.attackDuration <= 0) this.boss.state = 18;
                if (this.yVelocity == 0) {
                    this.game.audioManager.playSound("Thud.wav");
                    this.attack(19);
                    this.xVelocity = 0;
                }
            } else if (this.boss.state == 19 && this.attackDuration <= 0) {
                this.boss.state = 20;
            } else this.game.combat = false;
        }
    }
}