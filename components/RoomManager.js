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
                this.game.addEntity(new Yuyuko(this.game));
                this.game.audioManager.playBGM("StartTheme");
                this.game.uiManager.bgmTitle = "Snug Space - Petal of the Cherry Blossom";
                break;
            }
            case(1): {
                this.newStage(stage);
                this.game.startTime = this.game.timer.gameTime;
                this.game.addEntity(new Meiling(this.game));
                this.game.audioManager.playBGM("MeilingTheme");
                this.game.uiManager.bgmTitle = "Snug Space - Get Up!!"
                break;
            }
            case(2): {
                this.newStage(stage);
                this.game.addEntity(new Tenshi(this.game));
                this.game.audioManager.playBGM("TenshiTheme");
                this.game.uiManager.bgmTitle = "Tenjou no Tempest - Main Menu"
                break;
            }
            default: {
                this.game.paused = true;
                this.game.victory = true;
                this.game.audioManager.playBGM("EndTheme");
                this.game.uiManager.bgmTitle = "Spreading Full Colors - Sakura, Sakura"
                break;
            }
        }
    }

    newStage(stage) {
        this.game.combat = true;
        console.log(this.game.combat);
        this.stage = stage;
        this.game.player.health = 5;
        this.game.player.x = 0;
        this.game.ghost.x = -100;
        this.game.ghost.y = 600;
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