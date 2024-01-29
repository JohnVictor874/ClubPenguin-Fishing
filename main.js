const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/crab1.png");
ASSET_MANAGER.queueDownload("./sprites/crabChop.png");
ASSET_MANAGER.queueDownload("./sprites/fishTail.png");
ASSET_MANAGER.queueDownload("./sprites/fishHead.png");
ASSET_MANAGER.queueDownload("./sprites/fishTailR.png");
ASSET_MANAGER.queueDownload("./sprites/fishHeadR.png");
ASSET_MANAGER.queueDownload("./sprites/fishTailUp.png");
ASSET_MANAGER.queueDownload("./sprites/fishHeadUp.png");
ASSET_MANAGER.queueDownload("./sprites/huck1.png");
ASSET_MANAGER.queueDownload("./sprites/huck2.png");
ASSET_MANAGER.queueDownload("./sprites/huckCaught.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");
ASSET_MANAGER.queueDownload("./sprites/penguin.png");
ASSET_MANAGER.queueDownload("./sprites/whole.png");
ASSET_MANAGER.queueDownload("./sprites/beral.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
