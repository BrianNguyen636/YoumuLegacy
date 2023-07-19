// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        this.roomManager;
        this.uiManager;

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

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
        this.boxView = true;
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
        this.roomManager = new RoomManager();
        this.uiManager = new UIManager(this.entities);
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

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
                case "ArrowLeft": that.left = true;break;
                case "ArrowRight": that.right = true;break;
                case "ArrowUp": that.up = true;break;
                case "ArrowDown": that.down = true;break;
                case "KeyZ":
                    that.A = true;
                    break;
                case "KeyX":
                    that.B = true;
                    break;
                case "KeyC":
                    that.C = true;
                    break;
            }
        });
        this.ctx.canvas.addEventListener("keyup", function(e) {
            switch(e.code) {
                case "ArrowLeft": that.left = false;break;
                case "ArrowRight": that.right = false;break;
                case "ArrowUp": that.up = false;break;
                case "ArrowDown": that.down = false;break;
                case "KeyZ":
                    that.A = false;
                    break;
                case "KeyX":
                    that.B = false;
                    break;
                case "KeyC":
                    that.C = false;
                    break;
            }
        });
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.roomManager.draw(this.ctx);
        this.uiManager.draw(this.ctx);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
        
    };

    update() {
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
        for (let i = this.entitiesCount - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    checkPlayerCollisions(player) {
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                if (entity.id != "player" && entity.BB.collide(player.BB)) {
                    if (entity.id == "boss" || entity.id == "attack") {
                        player.hurt(entity);
                    }
                }
                if (player.attackBox != null && entity.id == "boss") {
                    if (player.attackBox.collide(entity.BB)) entity.hurt(player);
                }
            }
        }
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)