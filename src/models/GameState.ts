import type { IGameState, IScene } from "./interfaces.js";



export class GameState implements IGameState {
    #currentScene: IScene;
    #isGameOver: boolean = false;

    constructor(initialScene: IScene) {
        this.#currentScene = initialScene;
    }

    get currentScene(): IScene {
        return this.#currentScene;
    }

    updateScene(scene: IScene): void {
        this.#currentScene = scene;
    }
}