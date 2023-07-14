const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./YoumuSpritesheet.png");
ASSET_MANAGER.queueDownload("./YoumuSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./MeilingSpritesheet.png");
ASSET_MANAGER.queueDownload("./MeilingSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./room.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.roomManager = new RoomManager();
	gameEngine.addEntity(new Player(gameEngine));
	gameEngine.addEntity(new Meiling(gameEngine));
	gameEngine.init(ctx);
	gameEngine.start();
});
