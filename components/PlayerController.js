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
        this.afterimageTimer = 0;

        this.speed = 400;
        this.dashSpeed = 1000;
        this.jumpHeight = 1500;
        this.highJumpBonus = 2000;
        this.gravity = 4200;
    };
    
    jump() {
        this.yVelocity = -this.jumpHeight;
        this.airborne = true;
        if (this.game.up) this.game.upHold = true;
        if (this.game.A) this.game.AHold = true;
        this.player.animations[0][2].resetFrames();
        this.player.animations[1][2].resetFrames();
        this.jumpDuration = this.player.animations[this.player.facing][2].totalTime - this.game.clockTick;
    };

    knockback(side) {
        this.hurtDuration = 1;
        this.fastFall = false;
        this.yVelocity = -1200;
        this.doublejump = true;
        if (side < 0) this.xVelocity = -800;
        else this.xVelocity = 800;
        ASSET_MANAGER.playSound("Hurt");
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
            if (this.yVelocity >= 0 && this.player.y == 700 - this.player.yBoxOffset) {
                this.player.state = 9;
                this.player.animations[this.player.facing][9].resetFrames();
                this.jumpDuration = this.player.animations[this.player.facing][9].totalTime - this.game.clockTick;
                ASSET_MANAGER.playSound("Thud");
                
            }
        } else if (this.player.state == 6) {
            if (this.player.health <= 0) {
                ASSET_MANAGER.playSound("KO");
                this.player.state = 7;
                this.dashing = false;
                this.player.animations[this.player.facing][7].resetFrames();
                this.jumpDuration = this.player.animations[this.player.facing][7].totalTime - this.game.clockTick;
            } else {
                this.airborne = true;
                this.dashing = false;
                if (this.yVelocity == 0) this.player.state = 0;
                if (((this.game.A && !this.game.AHold) || (this.game.up && !this.game.upHold)) && this.hurtDuration < 0) this.player.state = 2;
            }
        } else if (this.attacking && this.attackDuration > 0) {
            this.player.state = 5;
            this.dashing = false;
        } else if (this.dashing && this.dashDuration > 0) {
            this.player.state = 4;
            if (this.airborne && this.game.down && !this.fastFall && !this.fastFallHold) { //FASTFALL cancel
                this.dashDuration = 0;
                this.dashing = false;
            }
            if (((this.game.A && !this.game.AHold) || (this.game.up && !this.game.upHold)) && this.doublejump) { //Cancel into jump
                this.dashDuration = 0;
                this.dashing = false;
            }
            if (this.game.B) { //ATTACK cancel
                this.dashDuration = 0;
                this.dashing = false;
            }
        } else if (this.player.state < 7) {
            this.dashing = false;

            if (this.game.C && !this.game.CHold) { //DASH
                if (this.airdash || !this.airborne) {
                    this.game.CHold = true;
                    this.airdash = false;
                    this.dashing = true;
                    this.player.state = 4;
                    this.player.animations[this.player.facing][4].resetFrames();
                    this.dashDuration = this.player.animations[this.player.facing][4].totalTime;
                    ASSET_MANAGER.playSound("Whoosh");
                }
            }
            if (this.game.B) {
                this.attacking = true;
                this.player.state = 5;
                this.player.animations[this.player.facing][5].resetFrames();
                this.attackDuration = this.player.animations[this.player.facing][5].totalTime;
                ASSET_MANAGER.playSound("Swing");
            }
            if (this.yVelocity != 0) this.airborne = true;
            if (this.airborne) {  //Airborne
                if (this.jumpDuration > 0) this.player.state = 2; // Jumping
                if (this.jumpDuration <= 0) this.player.state = 3; // Falling
                if (!this.game.right || !this.game.left) { //SOCD
                    if (this.game.right) {
                        this.player.facing = 0;
                    } else if (this.game.left) {
                        this.player.facing = 1;
                    }
                }
                if (this.game.down && !this.fastFall && !this.game.downHold) { //FASTFALL
                    this.fastFall = true;
                    this.game.downHold = true;
                    this.jumpDuration = 0;
                    ASSET_MANAGER.playSound("Swish");
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

                if (this.game.canInteract && this.player.state == 0 && this.game.down && !this.game.downHold) {
                    this.game.downHold = true;
                    this.player.interacting = true;
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
            } else {
                this.player.x -= this.dashSpeed * this.game.clockTick;
            } 
            if (this.afterimageTimer <= 0) {//AFTER IMAGE
                let image;
                if (this.player.facing == 0) {
                    image = new Effect(this.player.x, this.player.y, "Youmu", 2, this.game);
                } else {
                    image = new Effect(this.player.x, this.player.y, "Youmu", 3, this.game);
                }
                image.fadeSpeed = 3;
                this.game.addEntity(image);
                this.afterimageTimer = 0.05;
            }
            this.afterimageTimer -= this.game.clockTick;
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
                    if (this.afterimageTimer <= 0) {//AFTER IMAGE
                        let image;
                        if (this.player.facing == 0) {
                            image = new Effect(this.player.x, this.player.y, "Youmu", 4, this.game);
                        } else {
                            image = new Effect(this.player.x, this.player.y, "Youmu", 5, this.game);
                        }
                        image.fadeSpeed = 3;
                        this.game.addEntity(image);
                        this.afterimageTimer = 0.05;
                    }
                    this.afterimageTimer -= this.game.clockTick;
                }
                if (this.yVelocity < 0 && (this.game.AHold || this.game.upHold)) { //High jump gravity
                    this.yVelocity -= this.highJumpBonus * this.game.clockTick;
                }
                if (((this.game.A && !this.game.AHold) || (this.game.up && !this.game.upHold)) && 
                    this.doublejump) { //Double Jumping
                    this.doublejump = false;
                    this.jump();
                }
            } else { //Grounded
                this.doublejump = true;
                if ((this.game.A && !this.game.AHold) || (this.game.up && !this.game.upHold)) { 
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