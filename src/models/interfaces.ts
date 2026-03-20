export interface ICommand {
    execute(): IScene;
    getDescription(): string;
    getName(): string;
}

export interface IScene {
    id: string;
    description: string;
    commands: Map<string, ICommand>;
    addCommand(key: string, command: ICommand): void;
    getAvailableCommands(): Map<string, ICommand>;
}

export interface IGameState {
    currentScene: IScene;
    isGameOver: boolean;
    gameResult: string;
    updateScene(scene: IScene): void;
    setGameOver(result: string): void;
}

export interface IGameView {
    showWelcome(): void;
    showSceneDescription(description: string): void;
    showAvailableCommands(commands: Map<string, ICommand>): void;
    showError(message: string): void;
    showGameResult(result: string): void;
    promptUser(): Promise<string>;
    close(): void;
}