export interface ICommand {
    execute(): IScene;
    getDescription(): string;
    getName(): string;
}

export interface IScene {
    id: string;
    description: string;
}

export interface IGameState {
    currentScene: IScene;
    isGameOver?: boolean;
}

export interface IGameView {
    showWelcome(): void;
    promptUser(): Promise<string>;
    close(): void;
}