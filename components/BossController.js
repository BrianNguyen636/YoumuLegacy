class BossController {
    constructor(boss, game, deathState) {
        if (this.constructor === Character) throw new Error("Abstract Boss Controller Class");
        Object.assign(this, {boss, game, deathState});
        this.player = this.game.player;
        this.timer = 0;
        this.attackDuration = 0;
        this.effectSpawn = false;
        this.lastRoll = null;
        this.lastLastRoll = null;
        this.yVelocity = 0;
        this.xVelocity = 0;
        this.gravity = 2000;
        this.shotTimer = 0;
        this.shotCount = 0;
        this.facePlayer();
    };

    setBossTime() {
        console.log("SET BOSS TIME");
    }; 

    forwards() {
        return -(-1 + this.boss.facing * 2);
    }
    rollForAttack(attacks) {
        if (attacks < 3) throw new Error("Not enough attacks!");
        let roll = this.lastRoll;
        while (roll == this.lastRoll || roll == this.lastLastRoll) {
            roll = Math.floor(Math.random() * attacks);
        }
        this.lastLastRoll = this.lastRoll;
        this.lastRoll = roll;
        return roll;
    }
    
    facePlayer() {
        if (this.boss.BB.midX < this.player.BB.midX) {
            this.boss.facing = 0;
        } else this.boss.facing = 1; 
    };

    attack(state, duration) {
        this.boss.state = state;
        if (duration == null) {
            this.boss.animations[this.boss.facing][state].resetFrames();
            this.attackDuration = this.boss.animations[this.boss.facing][state].totalTime - 2 * this.game.clockTick;
        } else {
            this.attackDuration = duration;
        }
    };

    death(deathState) {
        if (this.boss.state < deathState) { //initial death
            this.setBossTime();
            this.antiGrav = false;
            this.game.timer.timerRun = false;
            this.game.combat = false
            ASSET_MANAGER.playSound("KO");
            this.facePlayer();
            this.attack(deathState);
            this.xVelocity = (-1 + this.boss.facing * 2) * 400; 
            this.yVelocity = -700;
        } else if (this.boss.state == deathState || this.boss.state == deathState + 1) {
            if (this.attackDuration <= 0) this.boss.state = deathState + 1;
            if (this.yVelocity >= 0 && this.boss.y == 700 - this.boss.yBoxOffset) {
                ASSET_MANAGER.playSound("Thud");
                this.attack(deathState + 2);
                this.xVelocity = 0;
            }
        } else if (this.boss.state == deathState + 2 && this.attackDuration <= 0) {
            this.boss.state = deathState + 3;
        }
    };
    sideCollisions(){
        let offset = this.boss.BB.x - this.boss.x
        if (this.boss.BB.x <= 0) { //LEFT COLLISION
            this.boss.x = 0 - offset;
        }
        if (this.boss.BB.right >= 1280) { //RIGHT COLLISION
            this.boss.x = 1280 - offset - this.boss.BB.width;
        }
    }

    update() {
        if (this.timer > 0) this.timer -= this.game.clockTick;
        if (this.attackDuration > 0) this.attackDuration -= this.game.clockTick;

        if (!this.antiGrav) this.yVelocity += this.gravity * this.game.clockTick; //Gravity

        this.boss.y += this.yVelocity * this.game.clockTick; 
        this.boss.x += this.xVelocity * this.game.clockTick;

        if (this.boss.y + this.boss.yBoxOffset >= 700) { //GROUND COLLISION
            this.boss.y = 700 - this.boss.yBoxOffset;
            this.yVelocity = 0;
        }
        this.sideCollisions();

        if (!this.boss.dead()) {
            this.behavior();
        } else {
            this.death(this.deathState);
        }
    };
}