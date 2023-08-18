class UIManager {
    constructor(game) {
        this.game = game;
        this.entities = game.entities;
        this.playerHealth;
        this.bossHealth;
        this.healthIcon = ASSET_MANAGER.getAsset("./assets/Health.png");
        this.bgmTitle;
    }

    update() {
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

        ctx.fillText("Meiling: " + this.game.meilingTime + "s", 470, 300 + 40 * 1);

        ctx.fillText("Tenshi: " + this.game.tenshiTime + "s", 470, 300 + 40 * 2);

        ctx.fillText("Reisen: " + this.game.reisenTime + "s", 470, 300 + 40 * 3);

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
            let time = Math.round((this.game.timer.gameTime - this.game.startTime) * 100) / 100;
            ctx.font = "40px arial";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.fillText(time + "s", 600, 100);
            ctx.strokeText(time + "s", 600, 100);
        
    }
    
    drawBossHealthBar(ctx) {
        const healthPercent = this.bossHealth / 50;
        ctx.fillStyle = "Green";
        ctx.fillRect(240, 740, 800, 20);
        ctx.fillStyle = "Red";
        ctx.fillRect(1040 - 800*(1 - healthPercent), 740, 800*(1 - healthPercent), 20);
    }

    drawBGM(ctx) {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.font = "25px arial";
        ctx.fillText("BGM: " + this.bgmTitle, 700, 30);
        ctx.strokeText("BGM: " + this.bgmTitle, 700, 30);
    }

    drawStartMenu(ctx) {
        let selected = this.game.menuController.selected;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let screen = ASSET_MANAGER.getAsset("./assets/StartMenu.jpg");
        ctx.drawImage(screen, 0, 0);
        ctx.font = "bold 100px serif"
        if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Start", 20, 600);
        if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Options", 20, 700);

        ctx.font = "50px serif"
        ctx.fillStyle = "white";
        ctx.fillText("-Default Controls-", 800, 350);
        ctx.fillText("Z - Jump (or Up)", 800, 400);
        ctx.fillText("X - Attack", 800, 450);
        ctx.fillText("C - Dash", 800, 500);
        ctx.fillText("Arrows to Move", 800, 550);
    }

    drawOptions(ctx) {
        let selected = this.game.menuController.selected;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "bold 100px serif"
        if (selected == 0) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Set Controls", 20, 500);
        if (selected == 1) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
        ctx.fillText("Set Volume", 20, 600);
        let volume = this.game.audioManager.volume;
        volume = Math.round(this.game.audioManager.volume * 100);
        ctx.fillText(volume + "%", 620, 600);
        if (selected == 2) {ctx.fillStyle = "green";} else ctx.fillStyle = "white"
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
            ctx.fillText(x[1] + "---" + x[0], 800, 100 + 40 * i);
            i++;
        }
    }

    draw(ctx) {
        this.drawTimer(ctx);
        if (this.bossHealth != null || this.bossHealth >= 0) this.drawBossHealthBar(ctx);
        this.drawPlayerHealth(ctx);
        this.drawBGM(ctx);
    }
}