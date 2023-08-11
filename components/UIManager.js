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
        ctx.font = "bold 100px serif";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fillText("PAUSED", 450, 300);
        ctx.strokeText("PAUSED", 450, 300);
        ctx.font = "60px serif";
        ctx.fillText("[R] to restart", 470, 400);
        ctx.strokeText("[R] to restart", 470, 400);
    }

    drawGameOver(ctx) {
        ctx.font = "100px serif";
        ctx.fillStyle = "Red"
        ctx.fillText("GAME OVER", 450, 300);
        ctx.font = "60px serif";
        ctx.fillText("[R] to restart", 470, 400);
    }

    drawPlayerHealth(ctx) {
        for (let i = 0; i < this.playerHealth; i++) {
            ctx.drawImage(this.healthIcon, 100 + i * 50, 40);
        }
    }

    drawVictory(ctx) {
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
        ctx.fillText("[R] to restart", 470, 600);

        this.drawBGM(ctx);


    }

    drawTimer(ctx) {

            let time = Math.round((this.game.timer.gameTime - this.game.startTime) * 100) / 100;
            ctx.font = "40px arial";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.fillText(time, 600, 100);
            ctx.strokeText(time, 600, 100);
        
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
        ctx.font = "30px arial";
        ctx.fillText("BGM: " + this.bgmTitle, 700, 30);
        ctx.strokeText("BGM: " + this.bgmTitle, 700, 30);
    }

    drawStartMenu(ctx) {
        let screen = ASSET_MANAGER.getAsset("./assets/StartMenu.jpg");
        ctx.drawImage(screen, 0, 0);
        ctx.font = "bold 100px serif"
        ctx.fillStyle = "white";
        ctx.fillText("Press Z to start!", 0, 700);

        ctx.font = "50px serif"
        ctx.fillStyle = "white";
        ctx.fillText("Z - Jump (or Up)", 800, 400);
        ctx.fillText("X - Attack", 800, 450);
        ctx.fillText("C - Dash", 800, 500);
        ctx.fillText("Arrows to Move", 800, 550);
    }

    draw(ctx) {
        this.drawTimer(ctx);
        if (this.bossHealth != null || this.bossHealth >= 0) this.drawBossHealthBar(ctx);
        this.drawPlayerHealth(ctx);
        this.drawBGM(ctx);
    }
}