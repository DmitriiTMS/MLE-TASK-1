import type { ICommand, IScene } from "./interfaces.js";


export class Scene implements IScene {
    #commands: Map<string, ICommand> = new Map();

    constructor(
        public readonly id: string,
        public readonly description: string
    ) { }

    get commands(): Map<string, ICommand> {
        return this.#commands;
    }

    addCommand(key: string, command: ICommand): void {
        this.#commands.set(key, command);
    }

    getAvailableCommands(): Map<string, ICommand> {
        return this.#commands;
    }
}