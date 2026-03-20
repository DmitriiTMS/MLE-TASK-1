import * as readline from 'node:readline';
import type { ICommand, IGameView } from '../models/interfaces.js';


export class GameView implements IGameView {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    showWelcome(): void {
        console.log('\n=== Добро пожаловать в текстовый квест "Таинственный лес" ===\n');
    }

    showSceneDescription(description: string): void {
        console.log(`\n${description}\n`);
    }

    showAvailableCommands(commands: Map<string, ICommand>): void {
        console.log('Доступные действия:');
        commands.forEach((command, key) => {
            console.log(`  ${key}. ${command.getName()}`);
        });
        console.log('');
    }

    showError(message: string): void {
        console.log(`\n❌ Ошибка: ${message}\n`);
    }

    showGameResult(result: string): void {
        console.log(`\n🎮 Игра окончена: ${result}\n`);
    }

    async promptUser(): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question('Ваш выбор: ', (answer: string) => {
                resolve(answer.trim());
            });
        });
    }

    close(): void {
        this.rl.close();
    }
}