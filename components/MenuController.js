class MenuController {
    constructor(game) {
        Object.assign(this, {game});
        this.selected = 0;
        this.options = false;
        this.controls = false;
        this.binding = -1;
    }
    goToMainMenu() {
        this.restart();
        this.game.startMenu = true;
        ASSET_MANAGER.pauseBGM();
    }
    restart() {
        ASSET_MANAGER.pauseBGM();
        ASSET_MANAGER.playSound("Select");
        this.game.reset();
    }
    optionSelection(optionCount) {
        if (this.game.up) {
            this.game.up = false;
            this.selected -= 1;
            if (this.selected < 0) this.selected = optionCount - 1;
            ASSET_MANAGER.playSound("Select");
        }
        if (this.game.down) {
            this.game.down = false;
            this.selected += 1;
            if (this.selected > optionCount - 1) this.selected = 0;
            ASSET_MANAGER.playSound("Select");
        }
    }

    stageSelect() {
        this.optionSelection(4);
        if (this.game.A && this.selected == 0) { //BOSS RUSH
            this.game.A = false;
            ASSET_MANAGER.playSound("Select");
            this.game.selectedStage = this.selected;
            this.game.player.interacting = false;
            this.game.bossRush = true;
            this.selected = 0;
        }
        if (this.game.A && this.selected == 1) { //STAGE 1
            this.game.A = false;
            ASSET_MANAGER.playSound("Select");
            this.game.selectedStage = this.selected;
            this.game.player.interacting = false;
            this.game.bossRush = false;
            this.selected = 0;
        }
        if (this.game.A && this.selected == 2) { //STAGE 2
            this.game.A = false;
            ASSET_MANAGER.playSound("Select");
            this.game.selectedStage = this.selected;
            this.game.player.interacting = false;
            this.game.bossRush = false;
            this.selected = 0;
        }
        if ((this.game.A && this.selected == 3)) { //END
            this.game.A = false;
            ASSET_MANAGER.playSound("Cancel");
            this.game.player.interacting = false;
            this.selected = 0;
        }
    }

    startMenu() {
        this.game.uiManager.drawStartMenu(this.game.ctx);
        this.optionSelection(2);
        if (this.game.A && this.selected == 0) { //END START MENU
            this.game.A = false;
            ASSET_MANAGER.playSound("Select");
            ASSET_MANAGER.playBGM("StartTheme");
            this.game.startMenu = false;
        }
        if (this.game.A && this.selected == 1) {
            this.game.A = false;
            ASSET_MANAGER.playSound("Select");
            this.optionsMenu();
            this.selected = 0;
        }
    }
    pauseMenu() {
        this.game.uiManager.drawPause(this.game.ctx);
        this.optionSelection(3);
        if ((this.game.A && this.selected == 0) || this.game.pauseButton) { //END PAUSE MENU
            if (this.game.pauseButton) this.game.pauseButton = false;
            if (this.game.A) this.game.A = false;
            ASSET_MANAGER.playSound("Cancel");
            this.game.paused = false;
            ASSET_MANAGER.resumeBGM();
            // this.game.audioManager.music.play();
            this.selected = 0;
        }
        if (this.game.A && this.selected == 1) { //RESTART
            this.game.A = false;
            this.restart();
        }
        if (this.game.A && this.selected == 2) { //MAIN MENU
            this.game.A = false;
            this.goToMainMenu();
        }
    }
    controlBinding() {
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
        if (this.game.keyPress) {
            this.game.keyPress = false;
            ASSET_MANAGER.playSound("Select");
            if (!this.game.keybinds.has(this.game.key)) {
                this.game.keybinds.set(this.game.key, controls[this.binding]);
                this.binding += 1;
            } else {

            }
        }
        if (this.binding >= controls.length) {
            this.game.keyBinding = false;
        }
    }
    controlsMenu() {
        this.optionSelection(3);
        this.game.uiManager.drawControls(this.game.ctx);
        if (this.game.keyBinding) this.controlBinding();
        if (this.game.A && this.selected == 0) { //KEYBINDING
            this.game.A = false;
            ASSET_MANAGER.playSound("Select");
            this.binding = 0;
            this.game.keyBinding = true;
            this.game.keybinds.clear();
        }
        if (this.game.A && this.selected == 1) { //DEFAULT
            this.game.A = false;
            ASSET_MANAGER.playSound("Select");
            this.game.keybinds.clear();
            this.game.defaultKeybinds();
        }
        if ((this.game.A && this.selected == 2) || this.game.pauseButton) { //RETURN
            if (this.game.A) this.game.A = false;
            if (this.game.pauseButton) this.game.pauseButton = false;
            ASSET_MANAGER.playSound("Cancel");
            this.controls = false;
            this.selected = 0;
        }
    }
    optionsMenu() {
        this.optionSelection(3);
        this.game.uiManager.drawOptions(this.game.ctx);
        this.options = true;
        if (this.selected == 0 && this.game.A) {
            this.A = false;
            this.controls = true;
            this.selected = -1;
            ASSET_MANAGER.playSound("Select");
        }
        if (this.selected == 1) { //VOLUME
            if(this.game.left) {
                this.game.left = false;
                if (ASSET_MANAGER.volume >= 0.1) ASSET_MANAGER.adjustVolume(ASSET_MANAGER.volume - 0.1);
                ASSET_MANAGER.playSound("Select");
            }
            if (this.game.right) {
                this.game.right = false;
                if (ASSET_MANAGER.volume <= 0.9) ASSET_MANAGER.adjustVolume(ASSET_MANAGER.volume + 0.1);
                ASSET_MANAGER.playSound("Select");
            }
        }
        if ((this.game.A && this.selected == 2) || this.game.pauseButton) { //RETURN
            if (this.game.A) this.game.A = false;
            if (this.game.pauseButton) this.game.pauseButton = false;
            ASSET_MANAGER.playSound("Cancel");
            this.options = false;
            this.selected = 1;
        }
    }
    gameOver() {
        this.optionSelection(2);
        this.game.uiManager.drawGameOver(this.game.ctx);
        if (this.game.A && this.selected == 0) { //RESTART
            this.game.A = false;
            this.restart();
        }
        if (this.game.A && this.selected == 1) { //MAIN MENU
            this.game.A = false;
            this.goToMainMenu();
        }
    }
    victory() {
        this.optionSelection(2);
        this.game.uiManager.drawVictory(this.game.ctx);
        if (this.game.A && this.selected == 0) { //RESTART
            this.game.A = false;
            this.restart();
        }
        if (this.game.A && this.selected == 1) { //MAIN MENU
            this.game.A = false;
            this.goToMainMenu();
        }
    }

}