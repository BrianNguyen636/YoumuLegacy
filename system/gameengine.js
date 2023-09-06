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

        this.controllerIndex = null;
        this.usingController = false;
        this.keyBinding = false;
        this.controllerBinding = false;
        this.keybinds = new Map();
        this.controllerBinds = new Map();

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.A = false;
        this.B = false;
        this.C = false;
        this.pauseButton = false;

        this.leftHold = false;
        this.rightHold = false;
        this.upHold = false;
        this.downHold = false;
        this.AHold = false;
        this.BHold = false;
        this.CHold = false;
        this.pauseButtonHold = false;
        this.keyHold = false;

        this.defaultKeybinds();
        this.defaultController();
        this.R = false;
        this.key;
        this.keyPress = false;

        //FLAGS
        this.startMenu = null;
        this.paused = false;
        this.combat = false;
        this.victory = false;
        this.canInteract = false;
        this.bossRush = true;
        this.lunatic = false;
        this.selectedStage = 0;

        //TIMERS
        this.startTime = 0;
        this.cirnoTime = 0;
        this.meilingTime = 0;
        this.tenshiTime = 0;
        this.okuuTime = 0;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
        this.boxView = false;
        this.version = "1.16";
    };

    startScreen(ctx, player) {
        ctx.canvas.addEventListener("click", e => {
            if (this.startMenu == null) {
                ASSET_MANAGER.playSound("Pause");
                this.startMenu = true;
                this.init(ctx, player);
                this.start();
            }
        });
    }

    init(ctx, player) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
        this.entities = [];
        this.addEntity(player);
        this.player = player;
        this.ghost = new Ghost(this);
        this.addEntity(this.ghost);
        this.uiManager = new UIManager(this);
        this.menuController = new MenuController(this);
        this.roomManager = new RoomManager(this);
        if (this.startMenu)  {
            ASSET_MANAGER.playBGM("MenuTheme");
        }
    };

    start() {
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    reset() {
        this.paused = false;
        this.combat = false;
        this.victory = false;
        this.entities = [];
        this.startTime = 0;
        ASSET_MANAGER.pauseBGM();
        this.init(this.ctx, new Player(this));
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    defaultKeybinds() {
        this.keybinds.set("ArrowLeft", "Left");
        this.keybinds.set("ArrowRight", "Right");
        this.keybinds.set("ArrowUp", "Up");
        this.keybinds.set("ArrowDown", "Down");
        this.keybinds.set("KeyZ", "Jump");
        this.keybinds.set("KeyX", "Attack");
        this.keybinds.set("KeyC", "Dash");
        this.keybinds.set("Escape", "Pause");
    };

    defaultController() {
        this.controllerBinds.set(14, "Left");
        this.controllerBinds.set(15, "Right");
        this.controllerBinds.set(12, "Up");
        this.controllerBinds.set(13, "Down");

        this.controllerBinds.set(0, "Jump");
        this.controllerBinds.set(1, "Dash");
        this.controllerBinds.set(2, "Attack");
        this.controllerBinds.set(9, "Pause");
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
            that.usingController = false;
            if (!that.keyBinding && that.keybinds.has(e.code)) {
                switch(that.keybinds.get(e.code)) {
                    case "Left": that.left = true; break;
                    case "Right": that.right = true; break;
                    case "Up": that.up = true; break;
                    case "Down": that.down = true; break;
                    case "Jump": that.A = true; break;
                    case "Attack": that.B = true; break;
                    case "Dash": that.C = true; break;
                    case "Pause": that.pauseButton = true; break;
                }
            } else if (that.keyBinding) {
                that.key = e.code;
                that.keyPress = true;
            } 
        });
        this.ctx.canvas.addEventListener("keyup", function(e) {
            if (!that.keyBinding && that.keybinds.has(e.code)) {
                switch(that.keybinds.get(e.code)) {
                    case "Left": that.left = false; break;
                    case "Right": that.right = false; break;
                    case "Up": that.up = false; break;
                    case "Down": that.down = false; break;
                    case "Jump": that.A = false; break;
                    case "Attack": that.B = false; break;
                    case "Dash": that.C = false; break;
                    case "Pause": that.pauseButton = false; break;
                }
            } else if (that.keyBinding) {
                that.keyPress = false;
            } 
        });
        window.addEventListener("gamepadconnected", function(e) {
            console.log(
              "Gamepad connected at index %d: %s. %d buttons, %d axes.",
              e.gamepad.index,
              e.gamepad.id,
              e.gamepad.buttons.length,
              e.gamepad.axes.length,
            );
            that.controllerIndex = e.gamepad.index;
        });
        window.addEventListener("gamepaddisconnected", function(e) {
            that.controllerIndex = null;
        });
    };

    buttonHolds() {
        if (!this.left) this.leftHold = false;
        if (!this.right) this.rightHold = false;
        if (!this.up) this.upHold = false;
        if (!this.down) this.downHold = false;
        if (!this.A) this.AHold = false;
        if (!this.B) this.BHold = false;
        if (!this.C) this.CHold = false;
        if (!this.pauseButton) this.pauseButtonHold = false;
        if (!this.keyPress) this.keyHold = false;
    };

    controllerButtons() {
        let controller = navigator.getGamepads()[this.controllerIndex];
        if (this.usingController) this.keyPress = false;
        for (let i = 0; i < controller.buttons.length; i++) {
            if (controller.buttons[i].pressed || 
                Math.abs(controller.axes[0]) > 0.25 || Math.abs(controller.axes[1]) > 0.25) {
                this.usingController = true;
            }
            if (this.controllerBinding && controller.buttons[i].pressed) {
                this.keyPress = true;
                console.log(this.keyPress);
                this.key = i;
            }
        }
        if (this.usingController && !this.controllerBinding) {
            for (let i = 0; i < controller.buttons.length; i++) {
                if (this.controllerBinds.has(i)) {
                    switch(this.controllerBinds.get(i)) {
                        case "Left": this.left = controller.buttons[i].pressed || controller.axes[0] < -0.25; break;
                        case "Right": this.right = controller.buttons[i].pressed || controller.axes[0] > 0.25; break;
                        case "Up": this.up = (controller.buttons[i].pressed || controller.axes[1] < -0.5); break;
                        case "Down": this.down = (controller.buttons[i].pressed || controller.axes[1] > 0.5); break;
                        case "Jump": this.A = controller.buttons[i].pressed; break;
                        case "Attack": this.B = controller.buttons[i].pressed; break;
                        case "Dash": this.C = controller.buttons[i].pressed; break;
                        case "Pause": this.pauseButton = controller.buttons[i].pressed; break;
                    }
                }
            }
        }
    };

    addEntity(entity) {
        this.entities.push(entity);
    };



    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.roomManager.draw(this.ctx);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            let entity = this.entities[i];
            entity.draw(this.ctx, this);
        }
        this.uiManager.draw(this.ctx);
    };



    update() {
        if (this.pauseButton && !this.player.dead() && !this.pauseButtonHold) { //START PAUSE
            this.pause();
            this.pauseButtonHold = true;
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

            for (let i = 0; i < this.entities.length; i++) {
                let entity = this.entities[i];
                if (entity.id != "player" && entity.id != "ghost") {
                    entity.removeFromWorld = true;
                }
            }

            if (this.bossRush) this.roomManager.stageTransition(this.roomManager.stage + 1);
            else {
                if (this.roomManager.stage == 0) {
                    this.roomManager.stageTransition(this.selectedStage);
                } else {
                    this.roomManager.stageTransition(0);
                    this.player.x = 0;
                    this.startTime = 0;
                    this.timer.gameTime = 0;
                    this.ghost.x = 0;
                    this.player.health = 5;
                }
            }

        }

        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                if ((entity.id == "boss" && !entity.dead()) || entity.id == "attack") {
                    if (entity.BB.collide(player.BB)) player.hurt(entity);
                }
                if (entity.id == "npc") {
                    if (entity.BB.collide(player.BB)) {
                        this.canInteract = true;
                    }
                    else this.canInteract = false;
                }
                if (player.attackBox != null && entity.id == "boss") {
                    if (player.attackBox.collide(entity.BB)) {
                        entity.hurt(player);
                        player.attackBox = null;
                    }
                }
            }
        }
    }

    pause() {
        if (!this.paused && !this.startMenu) {
            this.paused = true;
            this.menuController.selected = 0;
            ASSET_MANAGER.playSound("Pause");
            ASSET_MANAGER.pauseBGM();
        }
    };

    loop() {
        if (this.controllerIndex != null) this.controllerButtons();
        this.buttonHolds();
        if (this.startMenu) { //START MENU
            if (this.menuController.controls) {
                this.menuController.controlsMenu();
            } else if (this.menuController.controllerControls) {
                this.menuController.controllerControlsMenu();
            } else if (this.menuController.options) {
                this.menuController.optionsMenu();
            } else if (this.menuController.credits) {
                this.menuController.creditsPage();  
            } else this.menuController.startMenu();
        } else if (this.paused) {//IF PAUSED
            if (this.victory) { //VICTORY
                this.menuController.victory();
            } else if (this.player.health > 0) {  //PAUSE MENU
                this.menuController.pauseMenu();
            } else this.menuController.gameOver(); //IF GAME OVER
        } else { //NORMAL GAMELOOP
            this.clockTick = this.timer.tick();
            this.update();
            this.draw();
        }
    };



};

// KV Le was here :)