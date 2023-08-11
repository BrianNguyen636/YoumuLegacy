// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.A = false;
        this.B = false;
        this.C = false;
        this.R = false;
        this.Esc = false;

        this.startMenu = true;
        this.pause = false;
        this.combat = false;
        this.victory = false;
        this.startTime = 0;
        this.meilingTime = 0;
        this.tenshiTime = 0;
        this.reisenTime = 0;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
        this.boxView = false;
    };

    init(ctx, player) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
        this.entities = [];
        this.addEntity(player);
        this.player = player;
        this.uiManager = new UIManager(this);
        this.audioManager = new AudioManager(this);
        this.roomManager = new RoomManager(this);
    };

    start() {
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    reset() {
        this.pause = false;
        this.combat = false;
        this.victory = false;
        this.entities = [];
        this.startTime = 0;
        this.audioManager.music.stop();
        this.init(this.ctx, new Player(this));
        this.roomManager.stageTransition(0);
    }

    startInput() {
        var that = this;
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", function(e) {
            switch(e.code) {
                case "ArrowLeft": that.left = true; break;
                case "ArrowRight": that.right = true; break;
                case "ArrowUp": that.up = true; break;
                case "ArrowDown": that.down = true; break;
                case "KeyZ": that.A = true; break;
                case "KeyX": that.B = true; break;
                case "KeyC": that.C = true; break;
                case "Escape": that.Esc = true; break;
                case "KeyR": that.R = true; break;
            }
        });
        this.ctx.canvas.addEventListener("keyup", function(e) {
            switch(e.code) {
                case "ArrowLeft": that.left = false; break;
                case "ArrowRight": that.right = false; break;
                case "ArrowUp": that.up = false; break;
                case "ArrowDown": that.down = false; break;
                case "KeyZ": that.A = false; break;
                case "KeyX": that.B = false; break;
                case "KeyC": that.C = false; break;
                case "Escape": that.Esc = false; break;
                case "KeyR": that.R = false; break;
            }
        });
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.roomManager.draw(this.ctx);
        this.uiManager.draw(this.ctx);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            let entity = this.entities[i];
            entity.draw(this.ctx, this);
        }
        
    };

    update() {
        if (this.Esc) {
            this.pause = true;
            this.audioManager.playSound("Pause.wav");
            this.audioManager.music.stop();
            this.Esc = false;
        }
        this.uiManager.update();
        let entitiesCount = this.entities.length;
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                entity.update();
                if (entity.id == "player") {
                    this.checkPlayerCollisions(entity);
                }
            }
        }
        for (let i = entitiesCount - 1; i >= 0; --i) {
            let entity = this.entities[i];
            if (entity.removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    checkPlayerCollisions(player) {
        if (this.player.x + this.player.xBoxOffset + this.player.BB.width >= 1280 && !this.combat) { //RIGHT COLLISION
            this.roomManager.stageTransition(this.roomManager.stage + 1);
        }

        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                if ((entity.id == "boss" && !entity.dead()) || entity.id == "attack") {
                    if (entity.BB.collide(player.BB)) player.hurt(entity);
                }
                if (player.attackBox != null && entity.id == "boss") {
                    if (player.attackBox.collide(entity.BB)) entity.hurt(player);
                }
            }
        }
    }

    loop() {
        if (this.startMenu) { //START MENU
            this.uiManager.drawStartMenu(this.ctx);
            if (this.A) { //END START MENU
                this.A = false;
                this.audioManager.playSound("Select.wav");
                this.startMenu = false;
                this.roomManager.stageTransition(0);
            }
        } else if (this.pause) {
            if (this.victory) { 
                this.uiManager.drawVictory(this.ctx);
            } else if (this.player.health > 0) { //IF PAUSED
                this.uiManager.drawPause(this.ctx);
                if (this.Esc) {
                    this.audioManager.playSound("Select.wav");
                    this.pause = false;
                    this.Esc = false;
                    this.audioManager.music.play();
                }
            } else this.uiManager.drawGameOver(this.ctx); //IF GAME OVER
            if (this.R) { //RESTART
                this.R = false;
                this.reset();
                this.audioManager.playSound("Select.wav");
            }
        } else { //NORMAL GAMELOOP
            this.clockTick = this.timer.tick();
            this.update();
            this.draw();
        }
    };

};

// KV Le was here :)