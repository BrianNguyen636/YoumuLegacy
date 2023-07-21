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
        this.jumpHold = false;
        this.dashHold = false;

        this.speed = 3;
        this.dashSpeed = 4.5;
        this.jumpHeight = 10;
        this.gravity = 0.2;
        this.highJumpGrav = 0.08;
    };
    
    jump() {
        this.yVelocity = -this.jumpHeight;
        this.airborne = true;
        this.jumpHold = true;
        this.player.animations[this.player.facing][2].resetFrames();
        this.jumpDuration = this.player.animations[this.player.facing][2].totalTime - this.game.clockTick;
    };

    knockback(side) {
        console.log(side);
        this.yVelocity = -6;
        this.doublejump = true;
        if (side < 0) this.xVelocity = -3;
        else this.xVelocity = 3
    }

    updateState() {
        if (this.player.state == 6) {
            this.airborne = true;
            this.dashing = false;
            if (this.yVelocity == 0) this.player.state = 0;
            if ((this.game.A || this.game.up) && !this.jumpHold) this.player.state = 2;
        } else if (this.attacking && this.attackDuration > 0) {
            this.player.state = 5;
        } else if (this.dashing && this.dashDuration > 0) {
            this.player.state = 4;
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
                    this.player.state = 4;
                    this.player.animations[this.player.facing][4].resetFrames();
                    this.dashDuration = this.player.animations[this.player.facing][4].totalTime;
                }
            }
            if (this.game.B) {
                this.attacking = true;
                this.player.state = 5;
                this.player.animations[this.player.facing][5].resetFrames();
                this.attackDuration = this.player.animations[this.player.facing][5].totalTime;
            }
            if (this.yVelocity != 0) this.airborne = true;
            if (this.airborne) {  //Airborne
                if (this.jumpDuration > 0) this.player.state = 2; // Jumping
                if (this.jumpDuration < 0) this.player.state = 3; // Falling
                if (this.game.right) {
                    this.player.facing = 0;
                } else if (this.game.left) {
                    this.player.facing = 1;
                }
            } else { //Grounded
                this.jumpDuration = 0;
                this.airdash = true;
                if (this.game.right) {
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
        this.yVelocity += this.gravity; //Gravity

        if (this.dashing) {
            this.yVelocity = 0;
            if (this.player.facing == 0) {
                this.player.x += this.dashSpeed;
            } else this.player.x -= this.dashSpeed;
        } else if (this.player.state != 6) {
            if (this.game.right) {
                this.player.x += this.speed;
            } else if (this.game.left) {
                this.player.x -= this.speed;
            }
        }

        if (this.player.state == 6 )this.player.x += this.xVelocity / 2;
        this.player.y += this.yVelocity / 2; 

        if (this.player.y + this.player.yBoxOffset >= 600) { //GROUND COLLISION
            this.player.y = 600 - this.player.yBoxOffset;
            this.yVelocity = 0;
            this.airborne = false;
        }

        if (this.player.x + this.player.xBoxOffset <= 0) { //LEFT COLLISION
            this.player.x = 0 - this.player.xBoxOffset;
        }
        if (this.player.x + this.player.xBoxOffset + this.player.BB.width >= 1280) { //RIGHT COLLISION
            this.player.x = 1280 - this.player.xBoxOffset - this.player.BB.width;
        }

        if (this.airborne) { //Airborne
            if (this.yVelocity < 0 && this.jumpHold) { //High jump gravity
                this.yVelocity -= this.highJumpGrav;
            }
            if (!(this.game.A || this.game.up)) {
                this.jumpHold = false;
            }
            
            if (this.yVelocity > 0 && (this.game.A || this.game.up) && this.doublejump && !this.jumpHold) { //Double Jumping
                this.doublejump = false;
                this.jump();
            }
        } else { //Grounded
            this.doublejump = true;
            this.xVelocity = 0;
            if (!(this.game.A || this.game.up)) {
                this.jumpHold = false;
            }
            if ((this.game.A || this.game.up) && !this.jumpHold) { 
                this.jump();
            }   
        }
    };

    update() {
        //States and animations
        if (this.attackDuration > 0) this.attackDuration -= this.game.clockTick;
        if (this.dashDuration > 0) this.dashDuration -= this.game.clockTick;
        if (this.jumpDuration > 0) this.jumpDuration -= this.game.clockTick;
        
        this.updateState();
        this.updateMovement();
    };
}