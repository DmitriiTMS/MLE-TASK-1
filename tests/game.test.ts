import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import { GameState } from '../src/models/GameState.js';
import { GameController } from '../src/controllers/GameController.js';
import { createGameScenes } from '../src/scenes/gameScenes.js';
import type { IGameView } from '../src/models/interfaces.js';


class MockGameView implements IGameView {
    showWelcome(): void { }
    showSceneDescription(description: string): void { }
    showAvailableCommands(commands: Map<string, any>): void { }
    showError(message: string): void { }
    showGameResult(result: string): void { }
    async promptUser(): Promise<string> { return ''; }
    close(): void { }
}

describe('Text Quest Game', () => {
    let gameState: GameState;
    let gameController: GameController;
    let mockView: MockGameView;
    let scenes: any;

    beforeEach(() => {
        gameState = new GameState(null as any);
        scenes = createGameScenes(gameState);
        gameState.updateScene(scenes.startScene);
        mockView = new MockGameView();
        gameController = new GameController(gameState, mockView);
    });

    afterEach(() => {
        mockView.close();
    });

    test('Game should start at initial scene', () => {
        expect(gameState.currentScene.id).toBe('start');
        expect(gameState.isGameOver).toBe(false);
    });

    test('Choosing "right" should change scene to rightPath', async () => {
        const result = await gameController.processCommand('1');
        expect(result).toBe('rightPath');
        expect(gameState.currentScene.id).toBe('rightPath');
    });

    test('Choosing "left" should change scene to leftPath', async () => {
        const result = await gameController.processCommand('2');
        expect(result).toBe('leftPath');
        expect(gameState.currentScene.id).toBe('leftPath');
    });

    test('Invalid command should return error', async () => {
        const result = await gameController.processCommand('invalid');
        expect(result).toBe('error');
        expect(gameState.currentScene.id).toBe('start');
    });

    test('Game over scenario - bridge fall', async () => {
        await gameController.processCommand('1');
        expect(gameState.currentScene.id).toBe('rightPath');

        await gameController.processCommand('1');
        expect(gameState.currentScene.id).toBe('bridge');

        await gameController.processCommand('1');
        expect(gameState.isGameOver).toBe(true);
        expect(gameState.gameResult).toBe('Мост обрушился под вами. Вы проиграли.');
    });

    test('Win scenario - find treasure', async () => {
        await gameController.processCommand('1');
        expect(gameState.currentScene.id).toBe('rightPath');

        await gameController.processCommand('1');
        expect(gameState.currentScene.id).toBe('bridge');

        await gameController.processCommand('2');
        expect(gameState.currentScene.id).toBe('treasure');

        await gameController.processCommand('1');
        expect(gameState.isGameOver).toBe(true);
        expect(gameState.gameResult).toBe('Вы успешно завершили квест с сокровищами!');
    });

    test('Alternative win scenario - hut encounter', async () => {
        await gameController.processCommand('2');
        expect(gameState.currentScene.id).toBe('leftPath');

        await gameController.processCommand('1');
        expect(gameState.currentScene.id).toBe('hut');

        await gameController.processCommand('1');
        expect(gameState.isGameOver).toBe(true);
        expect(gameState.gameResult).toBe('В избушке вас встретил дружелюбный лесник и угостил чаем. Приключение завершено!');
    });

    test('Scene should have correct available commands', () => {
        const startScene = gameState.currentScene;
        const commands = startScene.getAvailableCommands();

        expect(commands.size).toBe(2);
        expect(commands.get('1')?.getName()).toBe('Пойти направо');
        expect(commands.get('2')?.getName()).toBe('Пойти налево');
    });
});