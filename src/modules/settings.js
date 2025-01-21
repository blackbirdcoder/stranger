import { Colors } from '/src/modules/colors.js';

export const Settings = (function implementer(colors) {
    const scene = {
        width: 800,
        height: 600,
    };

    const hero = {
        speed: 300,
        jump: 400,
    };

    return Object.freeze({
        scene: scene,
        colors: colors,
        hero: hero,
    });
})(Colors);
