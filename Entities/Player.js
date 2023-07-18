class Player {
    constructor(game) {
        this.id = "player";
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/YoumuSpritesheet.png");
        this.spritesheetFlip = ASSET_MANAGER.getAsset("./assets/YoumuSpritesheetFlip.png");
        this.sWidth = 200;
        this.sHeight = 150;
        this.animations = [[],[]];
        this.loadAnimations();

        this.updateBB();
        this.attackBox;
        
        this.xBoxOffset = 84; //Distance between side and left collision box side
        this.yBoxOffset = 127; //Distance between top and collision box bottom 

        this.state = 0; //0 = idle, 1 = run, 2 = jump, 3 = fall, 4 = dash, 5 = attack, 6 = hurt
        this.facing = 0; //right or left

        this.x = 15;
        this.y = 600 - this.yBoxOffset;
        this.yVelocity = 0;
        this.xVelocity = 0;

        this.health = 5;
        this.invuln = 0;

        this.airborne = true;
        this.doublejump = true;
        this.airdash = true;
        this.dashing = false;
        this.attacking = false;
        this.jumpDuration = 0;
        this.dashDuration = 0;
        this.attackDuration = 0;
        this.jumpHold = false;
        this.dashHold = false;

        this.speed = 3;
        this.dashSpeed = 4.5;
        this.jumpHeight = 10;

    };

    hurt(other) {
        if (this.invuln <= 0 ) {
            this.health -= 1;
            this.invuln = 60;
            this.state = 6;
            this.yVelocity = -6;
            this.doublejump = true;
            if (this.x < other.x) {
                this.xVelocity = -3;
            } else {
                this.xVelocity = 3;
            }
        }
    };

    getAttackSpeed() {
        return this.animations[this.facing][5].totalTime;
    }

    updateAttackBox() {
        if (this.attackDuration > 0 && this.attackDuration < 6) {
            if (this.facing == 0) {
                this.attackBox = new BoundingBox(this.x + 110, this.y, 90, 120);
            } else {
                this.attackBox = new BoundingBox(this.x, this.y, 90, 120);
            }
        } else this.attackBox = null;
    };

    updateBB() {

        this.lastBB = this.BB;

        switch(this.state) {
            default:
                if (this.facing == 0) {
                    this.BB = new BoundingBox(this.x + 84, this.y + 84, 27, 43); break;
                } else {
                    this.BB = new BoundingBox(this.x + 89, this.y + 84, 27, 43); break;
                }
        } 
    };

    loadAnimations() {
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, this.sWidth, this.sHeight, 8, 10); 
        this.animations[0][1] = new Animator(this.spritesheet, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][2] = new Animator(this.spritesheet, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[0][3] = new Animator(this.spritesheet, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[0][4] = new Animator(this.spritesheet, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[0][5] = new Animator(this.spritesheet, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[0][6] = new Animator(this.spritesheet, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 1, 20);

        this.animations[1][0] = new Animator(this.spritesheetFlip, 0, 0, this.sWidth, this.sHeight, 8, 10); 
        this.animations[1][1] = new Animator(this.spritesheetFlip, 0, 1 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[1][2] = new Animator(this.spritesheetFlip, 0, 2 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[1][3] = new Animator(this.spritesheetFlip, 0, 3 * this.sHeight, this.sWidth, this.sHeight, 2, 10);
        this.animations[1][4] = new Animator(this.spritesheetFlip, 0, 4 * this.sHeight, this.sWidth, this.sHeight, 10, 20);
        this.animations[1][5] = new Animator(this.spritesheetFlip, 0, 5 * this.sHeight, this.sWidth, this.sHeight, 8, 20);
        this.animations[1][6] = new Animator(this.spritesheetFlip, 0, 6 * this.sHeight, this.sWidth, this.sHeight, 1, 20);
    };

    handleYCollision() {
        this.yVelocity = 0;
        if (this.BB.y > this.lastBB.y) {
            this.y -= this.BB.y - this.lastBB.y;
            this.airborne = false;
        } else {
            this.y += this.lastBB.y - this.BB.y;
        }
    };
    handleXCollision() {
        if (this.BB.x > this.lastBB.x) {
            this.x -= (this.BB.x - this.lastBB.x);
        } else {
            this.x += (this.lastBB.x - this.BB.x);
        }
    };

    update() {
        //States and animations
        if (this.attackDuration > 0) this.attackDuration -= this.game.clockTick;
        if (this.dashDuration > 0) this.dashDuration -= this.game.clockTick;
        if (this.jumpDuration > 0) this.jumpDuration -= this.game.clockTick;
        if (this.invuln > 0 && this.state != 6) this.invuln -= 1;
        
        if (this.state == 6) {
            this.x += this.xVelocity;
            this.airborne = true;
            this.dashing = false;
            if (this.yVelocity == 0) this.state = 0;
            if ((this.game.A || this.game.up) && !this.jumpHold) this.state = 2;
        } else if (this.attacking && this.attackDuration > 0) {
            this.state = 5;
        } else if (this.dashing && this.dashDuration > 0) {
            this.state = 4;
            if ((this.game.A || this.game.up) && this.doublejump && !this.jumpHold) { //Cancel into jump
                this.dashDuration = 0;
                this.dashing = false;
            }
        } else {
            this.dashing = false;
            if (!this.game.C) this.dashHold = false;
            if (this.game.C && !this.dashHold) {
                if (this.airdash || !this.airborne) {
                    this.airdash = false;
                    this.dashing = true;
                    this.dashHold = true;
                    this.state = 4;
                    this.animations[this.facing][4].resetFrames();
                    this.dashDuration = this.animations[this.facing][4].totalTime;
                }
            }
            if (this.game.B) {
                this.attacking = true;
                this.state = 5;
                this.animations[this.facing][5].resetFrames();
                this.attackDuration = this.animations[this.facing][5].totalTime;
            }
            if (this.yVelocity != 0) this.airborne = true;
            if (this.airborne) {  //Airborne
                if (this.jumpDuration > 0) this.state = 2; // Jumping
                if (this.jumpDuration < 0) this.state = 3; // Falling
                if (this.game.right) {
                    this.facing = 0;
                } else if (this.game.left) {
                    this.facing = 1;
                }
            } else { //Grounded
                this.jumpDuration = 0;
                this.airdash = true;
                if (this.game.right) {
                    this.state = 1;
                    this.facing = 0;
                } else if (this.game.left) {
                    this.state = 1;
                    this.facing = 1;
                } else {
                    this.state = 0;
                }
            }
        }

        //Logic
        this.yVelocity += 0.2; //Gravity

        this.updateAttackBox();
        if (this.dashing) {
            this.yVelocity = 0;

            if (this.facing == 0) {
                this.x += this.dashSpeed;
            } else this.x -= this.dashSpeed;
        } else if (this.state != 6) {
            if (this.game.right) {
                this.x += this.speed;
            } else if (this.game.left) {
                this.x -= this.speed;
            }
        }
        // this.updateBB();     
        // for (let i = 0; i < this.currentRoom.boxes.length; i++) {
        //     if (this.BB.collide(this.currentRoom.boxes[i])) this.handleXCollision();
        // }


        this.y += this.yVelocity / 2; 
        this.updateBB();
        if (this.y + this.yBoxOffset >= 600) { //GROUND COLLISION
            this.y = 600 - this.yBoxOffset;
            this.yVelocity = 0;
            this.airborne = false;
        }

        // for (let i = 0; i < this.currentRoom.boxes.length; i++) {
        //     if (this.BB.collide(this.currentRoom.boxes[i])) this.handleYCollision();
        // }

        if (this.x + this.xBoxOffset <= 0) { //LEFT COLLISION
            this.x = 0 - this.xBoxOffset;
        }
        if (this.x + this.xBoxOffset + this.BB.width >= 1280) { //RIGHT COLLISION
            this.x = 1280 - this.xBoxOffset - this.BB.width;
        }

        if (this.airborne) { //Airborne
            if (this.yVelocity < 0 && this.jumpHold) { //High jump gravity
                this.yVelocity -= 0.08;
            }
            if (!(this.game.A || this.game.up)) {
                this.jumpHold = false;
            }
            
        if (this.yVelocity > 0 && (this.game.A || this.game.up) && this.doublejump && !this.jumpHold) { //Double Jumping

                this.yVelocity = -this.jumpHeight;
                this.doublejump = false;
                this.jumpHold = true;
                this.animations[this.facing][2].resetFrames();
                this.jumpDuration = this.animations[this.facing][2].totalTime - this.game.clockTick;
            }
        } else { //Grounded
            this.doublejump = true;
            if (!(this.game.A || this.game.up)) {
                this.jumpHold = false;
            }
            if ((this.game.A || this.game.up) && !this.jumpHold) { 

                this.yVelocity = -this.jumpHeight;
                this.airborne = true;
                this.jumpHold = true;
                this.animations[this.facing][2].resetFrames();
                this.jumpDuration = this.animations[this.facing][2].totalTime - this.game.clockTick;
            }   
        }
        
    };

    draw(ctx) {
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if (this.game.boxView) {
            ctx.beginPath();
            ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height)
            ctx.strokeStyle = "yellow";
            ctx.stroke();
            if (this.attackBox != null) {
                ctx.rect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height)
                ctx.strokeStyle = "red";
                ctx.stroke();
            }
        }
    };
}