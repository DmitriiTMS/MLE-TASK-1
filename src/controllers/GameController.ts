import type { ICommand, IGameState, IGameView } from "../models/interfaces.js";


export class GameController {
    constructor(
        private gameState: IGameState,
        private gameView: IGameView
    ) {}

    async start(): Promise<void> {
        this.gameView.showWelcome();

        while (!this.gameState.isGameOver) {
            await this.playTurn();
        }

        if (this.gameState.gameResult) {
            this.gameView.showGameResult(this.gameState.gameResult);
        }

        this.gameView.close();
    }

    private async playTurn(): Promise<void> {
        const currentScene = this.gameState.currentScene;
        
        this.gameView.showSceneDescription(currentScene.description);
        
        const availableCommands = currentScene.getAvailableCommands();
        this.gameView.showAvailableCommands(availableCommands);

        const userInput = await this.gameView.promptUser();
        
        await this.processUserInput(userInput, availableCommands);
    }

    private async processUserInput(
        input: string, 
        availableCommands: Map<string, ICommand>
    ): Promise<void> {
        const command = availableCommands.get(input);

        if (!command) {
            this.gameView.showError('Неверный выбор. Пожалуйста, выберите доступное действие.');
            return;
        }

        const nextScene = command.execute();
        
        if (!this.gameState.isGameOver) {
            this.gameState.updateScene(nextScene);
        }
    }
}