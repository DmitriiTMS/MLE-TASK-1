import type { IGameView } from "../models/interfaces.js";


export class GameController {
    private readonly gameView: IGameView;

    constructor(gameView: IGameView) {
        this.gameView = gameView;
    }

    start(): void {
        this.gameView.showWelcome();

        this.gameView.close();
    }
}