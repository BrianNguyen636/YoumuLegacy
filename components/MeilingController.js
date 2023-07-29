class MeilingController {
    constructor(boss, game) {
        this.boss = boss;
        this.game = game;
        this.player = this.boss.player;
        this.timer = 0;
        this.attackDuration = 0;
        this.effectSpawn = false;
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
        if (this.timer <= 0 && this.attackDuration <= 0 && this.boss.state == 0) { //Choose attack from Idle
            this.facePlayer();

            this.boss.state = 10;

            switch(this.boss.state) {
                case(1): this.attackDuration = 60 * this.game.clockTick; break;
                case(4): this.attack(4); break;
                case(10): this.attack(10); break;
            }
        }
        if (this.attackDuration > 0) { //What happens during an attack
            switch(this.boss.state) {
                case(2): {
                    this.boss.x -= (-1 + this.boss.facing * 2) * 1; 
                    if (this.boss.facing == 0) {
                        this.game.addEntity(new Hitbox(this.boss.x + 120, this.boss.y + 30, 50, 80, 0, 0, 0, this.game));
                    } else this.game.addEntity(new Hitbox(this.boss.x + 30, this.boss.y + 30, 50, 80, 0, 0, 0, this.game));
                    break;
                }
                case(3): {
                    if (this.attackDuration < (7/11) * this.boss.animations[this.boss.facing][3].totalTime &&
                    this.attackDuration > (6/11) * this.boss.animations[this.boss.facing][3].totalTime)
                        this.boss.x -= (-1 + this.boss.facing * 2) * 15; break;
                }
                case(6): {//STOMP
                    if (this.attackDuration < (5/7) * this.boss.animations[this.boss.facing][6].totalTime &&
                    this.attackDuration > (3/7) * this.boss.animations[this.boss.facing][6].totalTime) { //Hitbox spawns
                        this.game.addEntity(new Hitbox(this.boss.x - 48, this.boss.y, 285, 120, 0, 0, 0, this.game));
                        this.game.addEntity(new Hitbox(this.boss.x + 42, this.boss.y - 346, 100, 475, 0, 0, 0, this.game));
                        this.game.addEntity(new Hitbox(this.boss.x, this.boss.y - 150, 200, 275, 0, 0, 0, this.game));
                        if (!this.effectSpawn) {
                            this.game.addEntity(new Effect(this.boss.x - 163, this.boss.y - 366));
                        }
                        this.effectSpawn = true;
                    } else this.effectSpawn = false;

                    break;
                }
                case(10): {
                    if (this.attackDuration < (5/8) * this.boss.animations[this.boss.facing][6].totalTime &&
                    !this.effectSpawn) {
                        this.game.addEntity(new Hitbox)
                    }
                    break;
                }
            }
        }
        if (this.attackDuration <= 0 && this.boss.state != 0) { //What happens after attack
            switch(this.boss.state) {
                case(1): {
                    this.attack(2);
                    break;
                }
                case(2): {
                    this.facePlayer();
                    this.attack(3);
                    break;
                }
                case(4): {
                    this.attackDuration = 60 * this.game.clockTick;
                    this.boss.state = 5;
                    break;
                }
                case(5): {
                    this.attack(6);
                    break;
                }
                default: {
                    this.effectSpawn = false;
                    this.timer = 180 * this.game.clockTick;
                    this.boss.state = 0;
                    break;
                }
            }
        }
    }
}