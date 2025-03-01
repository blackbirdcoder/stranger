export const GameOver = (function implementer() {
    function init(k, screen, settings, player, sfx, sceneName, cbEnabledLoot, parameters) {
        k.scene('gameOver', () => {
            k.wait(0.4, () => sfx(...settings.sound.loser));
            const baseColor = settings.colors.get('swatch11');
            const accentColor = settings.colors.get('swatch19');
            screen.printText(k, baseColor, accentColor, k.width() / 2, 100, 'game over');
            k.onDraw(() => screen.drawImage(k, 'gameOver', k.width() / 2 - 70, 180, 192, 128));
            screen.printText(k, baseColor, accentColor, k.width() / 2, 400, 'to press key ', '<r>');
            k.onKeyPress('r', () => {
                const stageNames = ['stageOne', 'stageTwo'];
                stageNames.forEach((stageName) => cbEnabledLoot(stageName));
                player.get().restart();
                for (const item of parameters) {
                    Object.keys(item).find((key) => {
                        if (key === 'playerPos') {
                            item[key].x = 223.75;
                            item[key].y = 895.5;
                        }
                    });
                }
                k.go(sceneName, ...parameters);
            });
        });
    }

    return Object.freeze({
        init: init,
    });
})();
