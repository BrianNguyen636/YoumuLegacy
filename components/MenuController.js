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
        if (this.game.up && !this.game.upHold) {
            this.game.upHold = true;
            this.selected -= 1;
            if (this.selected < 0) this.selected = optionCount - 1;
            ASSET_MANAGER.playSound("Select");
        }
        if (this.game.down && !this.game.downHold) {
            this.game.downHold = true;
            this.selected += 1;
            if (this.selected > optionCount - 1) this.selected = 0;
            ASSET_MANAGER.playSound("Select");
        }
    }

    stageSelect() {
        this.optionSelection(5);
        if (this.game.A && !this.game.AHold && this.selected == 0) { //BOSS RUSH
            this.game.AHold = true;
            ASSET_MANAGER.playSound("Select");
            this.game.selectedStage = this.selected;
            this.game.player.interacting = false;
            this.game.bossRush = true;
            this.selected = 0;
        }
        if (this.game.A && !this.game.AHold && this.selected > 0 && this.selected <= 3) {
            this.game.AHold = true;
            ASSET_MANAGER.playSound("Select");
            this.game.selectedStage = this.selected;
            this.game.player.interacting = false;
            this.game.bossRush = false;
            this.selected = 0;
        }
        if (this.game.A && !this.game.AHold && this.selected == 4) { //END
            this.game.AHold = true;
            ASSET_MANAGER.playSound("Cancel");
            this.game.player.interacting = false;
            this.selected = 0;
        }
    }

    startMenu() {
        this.game.uiManager.drawStartMenu(this.game.ctx);
        this.optionSelection(2);
        if (this.game.A && !this.game.AHold && this.selected == 0) { //END START MENU
            this.game.AHold = true;
            ASSET_MANAGER.playSound("Select");
            ASSET_MANAGER.playBGM("StartTheme");
            this.game.startMenu = false;
        }
        if (this.game.A && !this.game.AHold && this.selected == 1) {
            this.game.AHold = true;
            ASSET_MANAGER.playSound("Select");
            this.optionsMenu();
            this.selected = 0;
        }
    }
    pauseMenu() {
        this.game.uiManager.drawPause(this.game.ctx);
        this.optionSelection(3);
        if ((this.game.A && !this.game.AHold && this.selected == 0) || (this.game.pauseButton && !this.game.pauseButtonHold)) { //END PAUSE MENU
            if (this.game.pauseButton) this.game.pauseButtonHold = true;
            if (this.game.A) this.game.AHold = true;
            ASSET_MANAGER.playSound("Cancel");
            this.game.paused = false;
            ASSET_MANAGER.resumeBGM();
            // this.game.audioManager.music.play();
            this.selected = 0;
        }
        if (this.game.A && !this.game.AHold && this.selected == 1) { //RESTART
            this.game.AHold = true;
            this.restart();
        }
        if (this.game.A && !this.game.AHold && this.selected == 2) { //MAIN MENU
            this.game.AHold = true;
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
        if (this.game.A && !this.game.AHold && this.selected == 0) { //KEYBINDING
            this.game.AHold = true;
            ASSET_MANAGER.playSound("Select");
            this.binding = 0;
            this.game.keyBinding = true;
            this.game.keybinds.clear();
        }
        if (this.game.A && !this.game.AHold && this.selected == 1) { //DEFAULT
            this.game.AHold = true;
            ASSET_MANAGER.playSound("Select");
            this.game.keybinds.clear();
            this.game.defaultKeybinds();
        }
        if ((this.game.A && !this.game.AHold && this.selected == 2) || (this.game.pauseButton && !this.game.pauseButtonHold)) { //RETURN
            if (this.game.pauseButton) this.game.pauseButtonHold = true;
            if (this.game.A) this.game.AHold = true;
            ASSET_MANAGER.playSound("Cancel");
            this.controls = false;
            this.selected = 0;
        }
    }
    optionsMenu() {
        this.optionSelection(3);
        this.game.uiManager.drawOptions(this.game.ctx);
        this.options = true;
        if (this.selected == 0 && this.game.A && !this.game.AHold) {
            this.game.AHold = true;
            this.controls = true;
            this.selected = -1;
            ASSET_MANAGER.playSound("Select");
        }
        if (this.selected == 1) { //VOLUME
            if(this.game.left && !this.game.leftHold) {
                this.game.leftHold = true;
                if (ASSET_MANAGER.volume >= 0.1) ASSET_MANAGER.adjustVolume(ASSET_MANAGER.volume - 0.1);
                ASSET_MANAGER.playSound("Select");
            }
            if (this.game.right && !this.game.rightHold) {
                this.game.rightHold = true;
                if (ASSET_MANAGER.volume <= 0.9) ASSET_MANAGER.adjustVolume(ASSET_MANAGER.volume + 0.1);
                ASSET_MANAGER.playSound("Select");
            }
        }
        if ((this.game.A && !this.game.AHold && this.selected == 2) || (this.game.pauseButton && !this.game.pauseButtonHold)) { //RETURN
            if (this.game.A) this.game.AHold = true;
            if (this.game.pauseButton) this.game.pauseButtonHold = true;
            ASSET_MANAGER.playSound("Cancel");
            this.options = false;
            this.selected = 1;
        }
    }
    gameOver() {
        this.optionSelection(2);
        this.game.uiManager.drawGameOver(this.game.ctx);
        if (this.game.A && !this.game.AHold && this.selected == 0) { //RESTART
            this.game.AHold = true;
            this.restart();
        }
        if (this.game.A && !this.game.AHold && this.selected == 1) { //MAIN MENU
            this.game.AHold = true;
            this.goToMainMenu();
        }
    }
    victory() {
        this.optionSelection(2);
        this.game.uiManager.drawVictory(this.game.ctx);
        if (this.game.A && !this.game.AHold && this.selected == 0) { //RESTART
            this.game.AHold = true;
            this.restart();
        }
        if (this.game.A && !this.game.AHold && this.selected == 1) { //MAIN MENU
            this.game.AHold = true;
            this.goToMainMenu();
        }
    }

}