import type { IGameState, IScene } from "./interfaces.js";


export class GameState implements IGameState {
    #currentScene: IScene;
    #isGameOver: boolean = false;
    #gameResult: string = "";

    constructor(initialScene: IScene) {
        this.#currentScene = initialScene;
    }

    get currentScene(): IScene {
        return this.#currentScene;
    }

    get isGameOver(): boolean {
        return this.#isGameOver;
    }

    get gameResult(): string {
        return this.#gameResult;
    }

    updateScene(scene: IScene): void {
        this.#currentScene = scene;
    }

    setGameOver(result: string): void {
        this.#isGameOver = true;
        this.#gameResult = result;
    }
}