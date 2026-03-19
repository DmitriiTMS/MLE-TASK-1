import type { IGameState } from '../models/interfaces.js';
import { Scene } from '../models/Scene.js';


export const createGameScenes = (gameState: IGameState) => {
    // Создаем сцены
    const startScene = new Scene(
        'start',
        'Вы находитесь на опушке таинственного леса. Солнечные лучи пробиваются сквозь густую листву. Перед вами две тропинки.'
    );
   
    return {
        startScene,
    };
};