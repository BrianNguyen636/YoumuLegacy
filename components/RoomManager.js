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
                this.game.audioManager.playBGM("StartTheme");
                this.game.uiManager.bgmTitle = "Kuroneko Lounge - Ancient Temple";
                break;
            }
            case(1): {
                this.game.startTime = this.game.timer.gameTime;
                this.game.addEntity(new Meiling(this.game));
                this.game.audioManager.playBGM("MeilingTheme");
                this.game.uiManager.bgmTitle = "Snug Space - Get Up!!"
                this.newStage(stage);
                break;
            }
            default: {
                this.game.pause = true;
                this.game.victory = true;
                this.game.audioManager.playBGM("EndTheme");
                this.game.uiManager.bgmTitle = "TH15.5 The Eternal Steam Engine"
                break;
            }
        }
    }

    newStage(stage) {
        this.game.combat = true;
        this.stage = stage;
        this.game.player.x = 0;
        this.game.timer.timerRun = true;
    };
    
    draw(ctx) {
        ctx.drawImage(this.stageSheet,
            0, 800 * this.stage,
            1280, 800, 
            0, 0, 
            1280, 800);
    };
}