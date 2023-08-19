const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/YoumuSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/YoumuSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./assets/YoumuEffects.png");
ASSET_MANAGER.queueDownload("./assets/MeilingSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/MeilingSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./assets/MeilingProjectiles.png");
ASSET_MANAGER.queueDownload("./assets/MeilingEffects.png");
ASSET_MANAGER.queueDownload("./assets/TenshiSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/TenshiSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./assets/TenshiProjectiles.png");
ASSET_MANAGER.queueDownload("./assets/TenshiEffects.png");
ASSET_MANAGER.queueDownload("./assets/YuyukoSpritesheet.png");
ASSET_MANAGER.queueDownload("./assets/Stages.png");
ASSET_MANAGER.queueDownload("./assets/Health.png");
ASSET_MANAGER.queueDownload("./assets/Ghost.png");
ASSET_MANAGER.queueDownload("./assets/StartMenu.jpg");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	const player = new Player(gameEngine);
	gameEngine.init(ctx, player);
	gameEngine.start();
});