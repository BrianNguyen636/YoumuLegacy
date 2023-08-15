class BossController {
    constructor(boss, game, deathState) {
        if (this.constructor === Character) throw new Error("Abstract Boss Controller Class");
        Object.assign(this, {boss, game, deathState});
        this.player = this.game.player;
        this.timer = 0;
        this.attackDuration = 0;
        this.effectSpawn = false;
        this.lastRoll = null;
        this.yVelocity = 0;
        this.xVelocity = 0;
        this.facePlayer();
    };

    setBossTime() {
        console.log("SET BOSS TIME");
    }; 

    rollForAttack(attacks) {
        let roll = this.lastRoll;
        while (roll == this.lastRoll) {
            roll = Math.floor(Math.random() * attacks);
        }
        this.lastRoll = roll;
        return roll;
    }
    
    facePlayer() {
        if (this.boss.BB.midX < this.player.BB.midX) {
            this.boss.facing = 0;
        } else this.boss.facing = 1; 
    };

    attack(state) {
        this.boss.state = state;
        this.boss.animations[this.boss.facing][state].resetFrames();
        this.attackDuration = this.boss.animations[this.boss.facing][state].totalTime - 2 * this.game.clockTick;
    };

    death(deathState){
        if (this.boss.state < deathState) { //initial death
            this.setBossTime();
            this.game.timer.timerRun = false;
            this.game.audioManager.playSound("KO.wav");
            this.facePlayer();
            this.attack(deathState);
            this.xVelocity = (-1 + this.boss.facing * 2) * 400; 
            this.yVelocity = -700;
        } else if (this.boss.state == deathState || this.boss.state == deathState + 1) {
            if (this.attackDuration <= 0) this.boss.state = deathState + 1;
            if (this.yVelocity == 0) {
                this.game.audioManager.playSound("Thud.wav");
                this.attack(deathState + 2);
                this.xVelocity = 0;
            }
        } else if (this.boss.state == deathState + 2 && this.attackDuration <= 0) {
            this.boss.state = deathState + 3;
        } else this.game.combat = false;
    };

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
        if (this.boss.BB.x <= 0) { //LEFT COLLISION
            let offset = this.boss.BB.x - this.boss.x
            this.boss.x = 0 - offset;
        }
        if (this.boss.BB.right >= 1280) { //RIGHT COLLISION
            let offset = this.boss.BB.x - this.boss.x
            this.boss.x = 1280 - offset - this.boss.BB.width;
        }

        if (!this.boss.dead()) {
            this.behavior();
        } else {
            this.death(this.deathState);
        }
    };
}