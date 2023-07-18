class RoomManager {
    constructor() {
        this.stage = 0;
        this.backgrounds = [];
        this.loadBackgrounds();
    };

    loadBackgrounds() {
        this.backgrounds[0] = ASSET_MANAGER.getAsset("./assets/lake.png");
    };

    draw(ctx) {
        ctx.drawImage(this.backgrounds[this.stage],0,0);
    };
}