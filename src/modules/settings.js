import { Colors } from '/src/modules/colors.js';

export const Settings = (function implementer(colors) {
    const scene = {
        width: 800,
        height: 600,
        gravity: 1400,
    };

    const sound = {
        loser: [, 0, 65.40639, 0.11, 0.85, 0.35, 2, 1.2, , , , , , 0.1, , 0.1, , 0.41, 0.07],
    };

    return Object.freeze({
        scene: scene,
        colors: colors,
        sound: sound,
    });
})(Colors);
