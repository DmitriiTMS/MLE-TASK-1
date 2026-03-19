import * as readline from 'node:readline';
import type { IGameView } from '../models/interfaces.ts';
import { VIEWS_TEXT } from './constants.js';


export class GameView implements IGameView {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    showWelcome(): void {
        console.log(`${VIEWS_TEXT.WELCOME}`);
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