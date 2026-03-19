import { GameController } from "./controllers/GameController.js";
import { GameState } from "./models/GameState.js";
import { createGameScenes } from "./scenes/gameScenes.js";
import { GameView } from "./views/GameView.js";

async function main() {

    const gameState = new GameState(null as any);

    const scenes = createGameScenes(gameState);

    gameState.updateScene(scenes.startScene);

    const gameView = new GameView();
    const gameController = new GameController(gameState, gameView);

    await gameController.start();
}

main()