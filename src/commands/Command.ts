import type { ICommand, IGameState, IScene } from "../models/interfaces.js";


export class NavigationCommand implements ICommand {
    constructor(
        private readonly name: string,
        private readonly description: string,
        private readonly targetScene: IScene
    ) { }

    execute(): IScene {
        return this.targetScene;
    }

    getDescription(): string {
        return this.description;
    }

    getName(): string {
        return this.name;
    }
}

export class GameOverCommand implements ICommand {
    constructor(
        private readonly name: string,
        private readonly description: string,
        private readonly result: string,
        private readonly gameState: IGameState
    ) { }

    execute(): IScene {
        this.gameState.setGameOver(this.result);
        return this.gameState.currentScene;
    }

    getDescription(): string {
        return this.description;
    }

    getName(): string {
        return this.name;
    }
}