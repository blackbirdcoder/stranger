export const GameWinner = (function implementer() {
    function init(k, screen, settings, player) {
        k.scene('gameWinner', () => {
            k.play('winner');
            const baseColor = settings.colors.get('swatch9');
            const accentColor = settings.colors.get('swatch12');
            const score = player.get().getScore();
            screen.printTextAnimation(k, baseColor, accentColor, 250, 100, 'You are a ', 'winner');
            k.onDraw(() => screen.drawImage(k, 'gameWinner', 274, 120, 128 * 2, 192 * 2));
            screen.printText(k, baseColor, accentColor, 400, 475, 'Score: ', score.toString());
        });
    }

    return Object.freeze({
        init: init,
    });
})();
