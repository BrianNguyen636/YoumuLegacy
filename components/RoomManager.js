class RoomManager {
    constructor(game) {
        this.game = game;
        this.stage = 0;
        this.stageSheet = ASSET_MANAGER.getAsset("./assets/Stages.png");
    };

    stageTransition(stage) {
        switch(stage) {
            case(0): {
                this.stage = stage;
                break;
            }
            case(1): {
                this.game.addEntity(new Meiling(this.game));
                this.game.combat = true;
                this.stage = stage;
                this.game.player.x = 0;
                break;
            }
        }
    }
    
    draw(ctx) {
        ctx.drawImage(this.stageSheet,
            0, 800 * this.stage,
            1280, 800, 
            0, 0, 
            1280, 800);
    };
}