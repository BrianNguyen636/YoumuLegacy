class UIManager {
    constructor(entities) {
        this.entities = entities;
        this.playerHealth;
        this.bossHealth;
        this.healthIcon = ASSET_MANAGER.getAsset("./assets/Health.png");
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
        ctx.font = "100px serif";
        ctx.fillStyle = "Black"
        ctx.fillText("PAUSED",450, 300);
    }

    drawPlayerHealth(ctx) {
        for (let i = 0; i < this.playerHealth; i++) {
            ctx.drawImage(this.healthIcon, 100 + i * 50, 40);
        }
    }
    
    drawBossHealthBar(ctx) {
        const healthPercent = this.bossHealth / 50;
        ctx.fillStyle = "Green";
        ctx.fillRect(240, 740, 800, 20);
        ctx.fillStyle = "Red";
        ctx.fillRect(1040 - 800*(1 - healthPercent), 740, 800*(1 - healthPercent), 20);
    }

    draw(ctx) {
        if (this.bossHealth != null || this.bossHealth >= 0) this.drawBossHealthBar(ctx);
        this.drawPlayerHealth(ctx);
    }
}