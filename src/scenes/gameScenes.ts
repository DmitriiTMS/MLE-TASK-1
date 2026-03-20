import { Scene } from '../models/Scene.js';
import { NavigationCommand, GameOverCommand } from '../commands/Command.js';
import type { IGameState } from '../models/interfaces.js';


export const createGameScenes = (gameState: IGameState) => {
    // Создаем сцены
    const startScene = new Scene(
        'start',
        'Вы находитесь на опушке таинственного леса. Солнечные лучи пробиваются сквозь густую листву. Перед вами две тропинки.'
    );

    const rightPathScene = new Scene(
        'rightPath',
        'Вы пошли направо и вышли к старому мосту через реку. Мост выглядит ненадежным, но это единственный путь вперед.'
    );

    const leftPathScene = new Scene(
        'leftPath',
        'Вы пошли налево и оказались на поляне с заброшенной избушкой. Из трубы идет дым.'
    );

    const bridgeScene = new Scene(
        'bridge',
        'Вы осторожно ступаете на мост. Древесина скрипит под ногами. Внезапно вы слышите треск...'
    );

    const hutScene = new Scene(
        'hut',
        'Вы подходите к избушке. Дверь приоткрыта, и внутри слышен чей-то голос.'
    );

    const treasureScene = new Scene(
        'treasure',
        'Вы нашли сундук с сокровищами! Поздравляем с победой!'
    );

    // Создаем команды
    const goRightCommand = new NavigationCommand(
        'Пойти направо',
        'Выбрать правую тропинку',
        rightPathScene
    );

    const goLeftCommand = new NavigationCommand(
        'Пойти налево',
        'Выбрать левую тропинку',
        leftPathScene
    );

    const crossBridgeCommand = new NavigationCommand(
        'Перейти мост',
        'Попытаться перейти старый мост',
        bridgeScene
    );

    const exploreHutCommand = new NavigationCommand(
        'Исследовать избушку',
        'Зайти в избушку',
        hutScene
    );

    const bridgeFallCommand = new GameOverCommand(
        'Провалиться',
        'Мост обрушивается...',
        'Мост обрушился под вами. Вы проиграли.',
        gameState
    );

    const bridgeSuccessCommand = new NavigationCommand(
        'Перейти осторожно',
        'Осторожно перейти мост',
        treasureScene
    );

    const hutEnterCommand = new GameOverCommand(
        'Войти',
        'Войти в избушку',
        'В избушке вас встретил дружелюбный лесник и угостил чаем. Приключение завершено!',
        gameState
    );

    const treasureEndCommand = new GameOverCommand(
        'Забрать сокровища',
        'Забрать найденные сокровища',
        'Вы успешно завершили квест с сокровищами!',
        gameState
    );

    // Настраиваем связи между сценами
    startScene.addCommand('1', goRightCommand);
    startScene.addCommand('2', goLeftCommand);

    rightPathScene.addCommand('1', crossBridgeCommand);
    rightPathScene.addCommand('2', goLeftCommand); // Вернуться назад

    leftPathScene.addCommand('1', exploreHutCommand);
    leftPathScene.addCommand('2', goRightCommand); // Вернуться назад

    bridgeScene.addCommand('1', bridgeFallCommand);
    bridgeScene.addCommand('2', bridgeSuccessCommand);

    hutScene.addCommand('1', hutEnterCommand);
    hutScene.addCommand('2', goLeftCommand); // Вернуться на поляну

    treasureScene.addCommand('1', treasureEndCommand);

    return {
        startScene,
        rightPathScene,
        leftPathScene,
        bridgeScene,
        hutScene,
        treasureScene
    };
};