class PlayerController {
    constructor(player, game) {
        this.player = player;
        this.game = game;

        this.yVelocity = 0;
        this.xVelocity = 0;

        this.airborne = true;
        this.doublejump = true;
        this.airdash = true;
        this.dashing = false;
        this.attacking = false;
        this.jumpDuration = 0;
        this.dashDuration = 0;
        this.attackDuration = 0;
        this.hurtDuration = 0;

        this.speed = 400;
        this.dashSpeed = 800;
        this.jumpHeight = 1800;
        this.highJumpBonus = 1300;
        this.gravity = 4500;
    };
    
    jump() {
        this.yVelocity = -this.jumpHeight;
        this.airborne = true;
        this.jumpHold = true;
        this.player.animations[0][2].resetFrames();
        this.player.animations[1][2].resetFrames();
        this.jumpDuration = this.player.animations[this.player.facing][2].totalTime - this.game.clockTick;
    };

    knockback(side) {
        this.hurtDuration = 0.5;
        this.fastFall = false;
        this.yVelocity = -1200;
        this.doublejump = true;
        if (side < 0) this.xVelocity = -800;
        else this.xVelocity = 800;
        this.game.audioManager.playSound("Hurt.wav");
    }

    updateState() {
        if (this.player.state == 10) this.game.paused = true;
        if (this.player.state == 9) {
            if (this.jumpDuration <= 0) {
                this.player.state = 10;
            }
        } else if (this.player.state == 7 || this.player.state == 8) {
            if (this.jumpDuration <= 0) {
                this.player.state = 8;
            }
            if (this.yVelocity == 0) {
                this.player.state = 9;
                this.player.animations[this.player.facing][9].resetFrames();
                this.jumpDuration = this.player.animations[this.player.facing][9].totalTime - this.game.clockTick;
                this.game.audioManager.playSound("Thud.wav");
            }
        } else if (this.player.state == 6) {
            if (this.player.health <= 0) {
                this.game.audioManager.playSound("KO.wav");
                this.player.state = 7;
                this.dashing = false;
                this.player.animations[this.player.facing][7].resetFrames();
                this.jumpDuration = this.player.animations[this.player.facing][7].totalTime - this.game.clockTick;
            } else {
                this.airborne = true;
                this.dashing = false;
                if (this.yVelocity == 0) this.player.state = 0;
                if ((this.game.A || this.game.up) && !this.jumpHold && this.hurtDuration < 0) this.player.state = 2;
            }
        } else if (this.attacking && this.attackDuration > 0) {
            this.player.state = 5;
            this.dashing = false;
        } else if (this.dashing && this.dashDuration > 0) {
            this.player.state = 4;
            // if (this.game.down && !this.fastFall && !this.fastFallHold) { //FASTFALL cancel
            //     this.dashDuration = 0;
            //     this.dashing = false;
            // }
            if ((this.game.A || this.game.up) && this.doublejump && !this.jumpHold) { //Cancel into jump
                this.dashDuration = 0;
                this.dashing = false;
            }
        } else if (this.player.state < 7) {
            this.dashing = false;
            if (!this.game.C) this.dashHold = false;
            if (this.game.C && !this.dashHold) {
                if (this.airdash || !this.airborne) {
                    this.airdash = false;
                    this.dashing = true;
                    this.dashHold = true;
                    this.player.state = 4;
                    this.player.animations[this.player.facing][4].resetFrames();
                    this.dashDuration = this.player.animations[this.player.facing][4].totalTime;
                    this.game.audioManager.playSound("Whoosh.wav");
                }
            }
            if (this.game.B) {
                this.attacking = true;
                this.player.state = 5;
                this.player.animations[this.player.facing][5].resetFrames();
                this.attackDuration = this.player.animations[this.player.facing][5].totalTime;
                this.game.audioManager.playSound("Swing.wav");
            }
            if (this.yVelocity != 0) this.airborne = true;
            if (this.airborne) {  //Airborne
                if (this.jumpDuration > 0) this.player.state = 2; // Jumping
                if (this.jumpDuration < 0) this.player.state = 3; // Falling
                if (!this.game.down) this.fastFallHold = false;
                if (!this.game.right || !this.game.left) { //SOCD
                    if (this.game.right) {
                        this.player.facing = 0;
                    } else if (this.game.left) {
                        this.player.facing = 1;
                    }
                }
                if (this.game.down && !this.fastFall && !this.fastFallHold) { //FASTFALL
                    this.fastFall = true;
                    this.fastFallHold = true;
                    this.game.audioManager.playSound("Swish.wav");
                    // this.game.addEntity(new Effect(this.player.BB.midX - 75, this.player.BB.y, "Youmu", 2, this.game));
                }
            } else { //Grounded
                this.jumpDuration = 0;
                this.airdash = true;
                this.fastFall = false;
                if (this.game.right && this.game.left) {
                    this.player.state = 0;
                } else if (this.game.right) {
                    this.player.state = 1;
                    this.player.facing = 0;
                } else if (this.game.left) {
                    this.player.state = 1;
                    this.player.facing = 1;
                } else {
                    this.player.state = 0;
                }
            }
        }
    };

    updateMovement() {
        this.yVelocity += this.gravity * this.game.clockTick; //Gravity

        if (this.dashing) {
            this.yVelocity = 0;
            if (this.player.facing == 0) {
                this.player.x += this.dashSpeed * this.game.clockTick;
            } else this.player.x -= this.dashSpeed * this.game.clockTick;
        } else if (this.player.state < 6) {
            if (!this.game.right || !this.game.left) {
                if (this.game.right) {
                    this.player.x += this.speed * this.game.clockTick;
                } else if (this.game.left) {
                    this.player.x -= this.speed * this.game.clockTick;
                }
            }
        }

        if (this.player.state >= 6 ) {
            this.player.x += this.xVelocity / 2 * this.game.clockTick;
            this.yVelocity -= this.highJumpBonus * this.game.clockTick;
        }
        this.player.y += this.yVelocity / 2 * this.game.clockTick; 

        if (this.player.y + this.player.yBoxOffset >= 700) { //GROUND COLLISION
            this.player.y = 700 - this.player.yBoxOffset;
            this.yVelocity = 0;
            this.xVelocity = 0;
            this.airborne = false;
        }

        if (this.player.x + this.player.xBoxOffset <= 0) { //LEFT COLLISION
            this.player.x = 0 - this.player.xBoxOffset;
        }
        if (this.player.x + this.player.xBoxOffset + this.player.BB.width >= 1280) { //RIGHT COLLISION
            this.player.x = 1280 - this.player.xBoxOffset - this.player.BB.width;
        }
        //JUMPING
        if (this.player.state < 6) {
            if (this.airborne) { //Airborne
                if (this.fastFall) { //FASTFALLING
                    this.player.y += 1300 * this.game.clockTick;
                    this.yVelocity = 0;
                }
                if (this.yVelocity < 0 && this.jumpHold) { //High jump gravity
                    this.yVelocity -= this.highJumpBonus * this.game.clockTick;
                }
                if (!(this.game.A || this.game.up)) {
                    this.jumpHold = false;
                }
                if ((this.game.A || this.game.up) && !this.game.down && 
                    this.doublejump && !this.jumpHold) { //Double Jumping
                    this.doublejump = false;
                    this.jump();
                }
            } else { //Grounded
                this.doublejump = true;
                if (!(this.game.A || this.game.up)) {
                    this.jumpHold = false;
                }
                if ((this.game.A || this.game.up) && !this.jumpHold) { 
                    this.jump();
                }   
            }
        }
    };

    update() {
        if (this.attackDuration > 0) this.attackDuration -= this.game.clockTick;
        if (this.dashDuration > 0) this.dashDuration -= this.game.clockTick;
        if (this.jumpDuration > 0) this.jumpDuration -= this.game.clockTick;
        if (this.hurtDuration > 0) this.hurtDuration -= this.game.clockTick;
        this.updateState();
        this.updateMovement();
    };
}