const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./YoumuSpritesheet.png");
ASSET_MANAGER.queueDownload("./YoumuSpritesheetFlip.png");
ASSET_MANAGER.queueDownload("./room.png");



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	gameEngine.addEntity(new Youmu(gameEngine));

	gameEngine.init(ctx);
	gameEngine.currentRoom = new RoomManager();
	gameEngine.start();
});
