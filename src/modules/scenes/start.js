export const GameStart = (function implementer() {
    function init(k, screen, settings, sceneName) {
        k.scene('start', () => {
            const baseColor = settings.colors.get('swatch11');
            const accentColor = settings.colors.get('swatch19');
            screen.printTextAnimation(k, baseColor, accentColor, 190, 350, 'to start press ', '<enter>');
            k.onDraw(() => screen.drawImage(k, 'start', 0, 0, 802, 608));
            screen.printTextInstruction(k, baseColor, accentColor, 190, 493);
            k.onKeyPress('enter', () => k.go(sceneName));
        });
    }

    return Object.freeze({
        init: init,
    });
})();
