import { GameController } from "./controllers/GameController.js";
import { GameView } from "./views/GameView.js";

async function main() {

    const gameView = new GameView();
    const gameController = new GameController(gameView);

    gameController.start();
}

main()