import type { IGameState, IGameView } from "../models/interfaces.js";


export class GameController {
    private readonly gameView: IGameView;
    private readonly gameState: IGameState;

    constructor(gameState: IGameState, gameView: IGameView, ) {
        this.gameView = gameView;
        this.gameState = gameState;
    }

    async start(): Promise<void> {
        this.gameView.showWelcome();

        while (!this.gameState.isGameOver) {
            await this.playTurn();
        }

        const userInput = await this.gameView.promptUser();

        console.log(userInput);


        // this.gameView.close();
    }

    private async playTurn(): Promise<void> {
        const currentScene = this.gameState.currentScene;

        // this.gameView.showSceneDescription(currentScene.description);

        // const availableCommands = currentScene.getAvailableCommands();
        // this.gameView.showAvailableCommands(availableCommands);

        const userInput = await this.gameView.promptUser();

        // await this.processUserInput(userInput, availableCommands);
    }

}