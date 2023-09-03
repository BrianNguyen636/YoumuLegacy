class UIManager {
    constructor(game) {
        this.game = game;
        this.entities = game.entities;
        this.playerHealth;
        this.bossHealth;
        this.healthIcon = ASSET_MANAGER.getAsset("./assets/Health.png");
        this.bgmTitle;
        this.alpha = 0;
        this.frameTimer = 0;
        this.fps = 0;
        this.frameCount = 0;
        this.tip = "error";
    }
    update() {
        this.bossHealth = undefined;
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                if (entity.id == "player") {
                    this.playerHealth = entity.health;
                }
                if (entity.id == "boss") {
                    this.bossHealth = entity.health;
                }
            }
        }
    }

    drawNextStage(ctx) {
        let stages = [
            "Boss Rush",
            "Stage 1",
            "Stage 2",
            "Stage 3",
            "Stage 4"
        ];
        if (this.game.roomManager.stage == 0) {
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = "black";
            ctx.font = "30px arial";
            ctx.fillText("To " + stages[this.game.selectedStage], 1100, 500, 150);
            ctx.strokeText("To " + stages[this.game.selectedStage], 1100, 500, 150);
            ctx.fillText("->", 1150, 530);
            ctx.strokeText("->", 1150, 530);
        } else if (!this.game.combat){
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = "black";
            ctx.font = "30px arial";
            ctx.fillText("Next", 1100, 500, 150);
            ctx.strokeText("Next", 1100, 500, 150);
            ctx.fillText("->", 1150, 530);
            ctx.strokeText("->", 1150, 530);
        }
    }

    drawPause(ctx) {
        let selected = this.game.menuController.selected;
        ctx.font = "bold 100px serif";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fillText("PAUSED", 450, 300);
        ctx.strokeText("PAUSED", 450, 300);
        ctx.font = "60px serif";
        if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white";
        ctx.fillText("Resume", 470, 400);
        ctx.strokeText("Resume", 470, 400);
        if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white";
        ctx.fillText("Restart", 470, 460);
        ctx.strokeText("Restart", 470, 460);
        if (selected == 2) {ctx.fillStyle = "green";} else ctx.fillStyle = "white";
        ctx.fillText("Main Menu", 470, 520);
        ctx.strokeText("Main Menu", 470, 520);
    }

    drawGameOver(ctx) {
        let selected = this.game.menuController.selected;
        ctx.font = "100px serif";
        ctx.fillStyle = "red"
        ctx.strokeStyle = "black";
        ctx.fillText("GAME OVER", 400, 300);
        ctx.font = "60px serif";
        if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white";
        ctx.fillText("Restart", 470, 400);
        ctx.strokeText("Restart", 470, 400);
        if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white";
        ctx.fillText("Main Menu", 470, 460);
        ctx.strokeText("Main Menu", 470, 460);

        ctx.font = "20px arial";

        if (!this.tipRolled) {
            this.tip = this.rollTips();
            this.tipRolled = true;
        }
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "black";
        ctx.fillRect(190, 770, 900, 30);
        ctx.fillStyle = "white";
        ctx.globalAlpha = 1;
        ctx.fillText("Tip: " + this.tip, 200, 790, 900);
    }

    rollTips() {
        let text = "error";
        switch(this.game.roomManager.stage) {
            case(1): {
                let tips = [
                    "Baaaka",
                    "",
                    ""
                ]
                let roll = Math.floor(Math.random() * 3);
                text = tips[roll];
                break; 
            }
            case(2): {
                let tips = [
                    "Try to watch what attack she's doing before you act.",
                    "The stomp has a long grounded hitbox. Jump away to avoid both parts of the attack.",
                    "You can move backwards while attacking to maintain a safe distance with the boss."
                ]
                let roll = Math.floor(Math.random() * 3);
                text = tips[roll];
                break;
            }
            case(3): {
                let tips = [
                    "Don't move too fast when dodging the pillars or else you will trap yourself.",
                    "Listen for the audio ques to dodge the full-screen slash.",
                    "When you see her preparing to summon the pillars, make sure you have enough space to walk."
                ]
                let roll = Math.floor(Math.random() * 3);
                text = tips[roll];
                break;
            }
            case(4): {
                let tips = [
                    "Fast-falling can make the flying tackle easier to dodge.",
                    "The carpet bomb attack is easier to dodge the longer she flies.",
                    "Avoid putting yourself between the boss and the corner."
                ]
                let roll = Math.floor(Math.random() * 3);
                text = tips[roll];
                break;
            }
        }
        return text;
    }

    drawPlayerHealth(ctx) {
        for (let i = 0; i < this.playerHealth; i++) {
            ctx.drawImage(this.healthIcon, 100 + i * 50, 40);
        }
    }

    drawVictory(ctx) {
        let selected = this.game.menuController.selected;
        ctx.fillStyle = "White"
        ctx.clearRect(0,0, 1280, 800);
        ctx.font = "bold 100px serif";
        ctx.fillStyle = "Green"
        ctx.fillText("Victory!", 450, 200);

        ctx.font = "50px serif";
        ctx.fillStyle = "white"
        ctx.fillText("Times", 470, 280);
        let sum = this.game.cirnoTime + this.game.meilingTime + this.game.tenshiTime + this.game.okuuTime;

        ctx.fillText("Cirno: " + this.game.cirnoTime + "s", 470, 300 + 45 * 1);

        ctx.fillText("Meiling: " + this.game.meilingTime + "s", 470, 300 + 45 * 2);

        ctx.fillText("Tenshi: " + this.game.tenshiTime + "s", 470, 300 + 45 * 3);

        ctx.fillText("Utsuho: " + this.game.okuuTime + "s", 470, 300 + 45 * 4);

        ctx.fillText("Total: " + sum + "s", 470, 300 + 45 * 5);

        ctx.font = "60px serif";
        if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white";
        ctx.fillText("Restart", 470, 600);
        ctx.strokeText("Restart", 470, 600);
        if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white";
        ctx.fillText("Main Menu", 470, 660);
        ctx.strokeText("Main Menu", 470, 660);

        this.drawBGM(ctx);


    }

    drawTimer(ctx) {
        let time = this.game.timer.gameTime - this.game.startTime;
        if (this.game.roomManager.stage == 2 && this.game.bossRush) {
            time = time - this.game.cirnoTime;
        }
        if (this.game.roomManager.stage == 3 && this.game.bossRush) {
            time = time - this.game.meilingTime;
        }
        if (this.game.roomManager.stage == 4 && this.game.bossRush) {
            time = time - this.game.tenshiTime - this.game.meilingTime;
        }
        time = Math.round((time) * 100) / 100;
        ctx.font = "40px arial";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        if ((time * 100) % 100 == 0) {
            ctx.fillText(time + ".00s", 600, 100);
            ctx.strokeText(time + ".00s", 600, 100);
        } else if ((time * 100) % 10 == 0) {
            ctx.fillText(time + "0s", 600, 100);
            ctx.strokeText(time + "0s", 600, 100);
        } else {
            ctx.fillText(time + "s", 600, 100);
            ctx.strokeText(time + "s", 600, 100);
        }
    }
    
    drawBossHealthBar(ctx) {
        const healthPercent = this.bossHealth / 50;
        ctx.fillStyle = "Green";
        ctx.fillRect(240, 740, 800, 20);
        ctx.fillStyle = "Red";
        ctx.fillRect(1040 - 800*(1 - healthPercent), 740, 800*(1 - healthPercent), 20);
    }

    drawBGM(ctx) {
        ctx.fillStyle = "black";
        ctx.globalAlpha =  0.5;
        ctx.fillRect(780, 5, 500, 30);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.font = "25px arial";
        ctx.fillText("BGM: " + this.bgmTitle, 800, 30, 470);
        ctx.strokeText("BGM: " + this.bgmTitle, 800, 30, 470);
    }
    drawCredits(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "40px serif";
        ctx.fillStyle = "white";
        let text = [
            "All credit to Team Shanghai Alice for the Touhou Project.",
            "Credit to Twilight Frontier for the sprites and sfx.",
            "Credits to the various artists for the soundtrack.",
            "Thanks to Chris Marriot for \"How To Make A Web Game\"",
            "Programming by me.",
            "Main menu art by me."
        ];
        for (let i = 0; i < text.length; i++) {
            ctx.fillText(text[i], 100, 100 + 80 * i);
        }
        ctx.font = "100px serif";
        ctx.fillStyle = "green";
        ctx.fillText("Return", 540, 700);
    };
    
    drawStartMenu(ctx) {
        let selected = this.game.menuController.selected;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let screen = ASSET_MANAGER.getAsset("./assets/StartMenu.png");
        ctx.drawImage(screen, 0, 0);
        ctx.font = "bold 100px serif";
        if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Start", 20, 400);
        if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Options", 20, 500);
        if (selected == 2) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Credits", 20, 600);

        ctx.strokeStyle = "white";
        ctx.strokeRect(30, 10, 400, 200);

        ctx.font = "bold 100px serif";
        ctx.fillStyle = "green";
        ctx.fillText("Youmu", 50, 100, 400);
        ctx.fillText("Legacy", 50, 180, 400);
    }

    drawOptions(ctx) {
        let selected = this.game.menuController.selected;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "bold 100px serif"
        if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Set Keyboard", 20, 400);
        if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Set Controller", 20, 500);
        if (selected == 2) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Set Volume", 20, 600);
        let volume = ASSET_MANAGER.volume;
        volume = Math.round(ASSET_MANAGER.volume * 100);
        ctx.fillText(volume + "%", 620, 600);
        if (selected == 3) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Return", 20, 700);
    }

    drawControls(ctx) {
        let selected = this.game.menuController.selected;
        ctx.font = "bold 100px serif"
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let controls = [
            "Left",
            "Right",
            "Up",
            "Down",
            "Jump",
            "Attack",
            "Dash",
            "Pause"
        ];
        let options = ["Bind all", "Restore Defaults", "Return"]
        for (let i = 0; i < 3; i++) {
            if (selected == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText(options[i], 20, 500 + 100 * i);
        }
        ctx.fillStyle = "white"
        ctx.font = "30px serif"
        let i = 0;
        for (let i = 0; i < controls.length; i++) {
            if (this.game.menuController.binding == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText(controls[i], 800, 100 + 40 * i);
        }
        for (const x of this.game.keybinds.entries()) {
            if (this.game.menuController.binding == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText("--- " + x[0], 900, 100 + 40 * i);
            i++;
        }
    }

    drawControllerControls(ctx) {
        let selected = this.game.menuController.selected;
        ctx.font = "bold 100px serif"
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let controls = [
            "Left",
            "Right",
            "Up",
            "Down",
            "Jump",
            "Attack",
            "Dash",
            "Pause"
        ];
        let options = ["Bind all", "Restore Defaults", "Return"]
        for (let i = 0; i < 3; i++) {
            if (selected == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText(options[i], 20, 500 + 100 * i);
        }
        ctx.fillStyle = "white"
        ctx.font = "30px serif"
        let i = 0;
        for (let i = 0; i < controls.length; i++) {
            if (this.game.menuController.binding == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText(controls[i], 800, 100 + 40 * i);
        }
        for (const x of this.game.controllerBinds.entries()) {
            if (this.game.menuController.binding == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText("--- " + x[0], 900, 100 + 40 * i);
            i++;
        }
        ctx.fillText("*Analog stick is always bound to movement", 650, 100 + 40 * 9);
    }

    drawDialog(ctx) {
        let selected = this.game.menuController.selected;
        ctx.globalAlpha = this.alpha;
        ctx.font = "40px serif";
        let options = [
            "On a journey.",
            "To Misty Lake.",
            "To the Scarlet Devil Mansion.",
            "To Bhava-agra.",
            "To the Hell Geyser.",
            "I'll stay here for now."
        ];
        ctx.strokeStyle = "black";
        for (let i = 0; i < options.length; i++) {
            if (selected == i) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
            ctx.fillText(options[i], 540, 300 + 50 * i);
            ctx.strokeText(options[i], 540, 300 + 50 * i);
        }

        let portrait = ASSET_MANAGER.getAsset("./assets/YuyukoPortrait.png");
        ctx.drawImage(portrait, 0, 800 - 512);
        
        ctx.fillStyle = "black";
        ctx.globalAlpha = this.alpha * 0.75;
        ctx.fillRect(140, 600, 1000, 200);
        ctx.globalAlpha = this.alpha;

        ctx.font = "bold 80px serif";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        let dialog = "Hello Youmu, where would you like to go?";
        ctx.fillText(dialog, 140 + 50, 600 + 100, 900);
        ctx.strokeText(dialog, 140 + 50, 600 + 100, 900);

        ctx.globalAlpha = 1;
    }

    drawFPS(ctx) {
        ctx.fillStyle = "black";
        ctx.globalAlpha =  0.5;
        ctx.fillRect(0, 0, 80, 30);
        ctx.globalAlpha = 1;
        if (this.frameTimer <= 0) {
            this.fps = this.frameCount;
            this.frameTimer = 1;
            this.frameCount = 0;
        }
        this.frameTimer -= this.game.clockTick;
        this.frameCount++;
        ctx.font = "20px Arial";
        ctx.fillStyle = "green";
        ctx.fillText(this.fps + "fps", 0, 20, 100);
    }
    draw(ctx) {
        this.drawFPS(ctx);
        if (this.game.roomManager.stage != 0) this.drawTimer(ctx);
        if (this.bossHealth != null || this.bossHealth >= 0) this.drawBossHealthBar(ctx);
        this.drawPlayerHealth(ctx);
        this.drawBGM(ctx);
        this.drawNextStage(ctx);
        if (!this.game.paused) this.drawDialog(ctx);
        if (this.game.player.interacting) {
            if (this.alpha < 1) this.alpha += 1.5 * this.game.clockTick;
            if (this.alpha >= 1) this.alpha = 1;
        } else {
            if (this.alpha > 0) this.alpha -= 1.5 * this.game.clockTick;
            if (this.alpha <= 0) this.alpha = 0;
        }
    }
}