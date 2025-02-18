export const Pause = (function implementer() {
    let isPaused = false;
    let rect = null;
    let text = null;

    function getState() {
        return isPaused;
    }

    function toggle(k, paintWindow, bgColor, printText, textBaseColor, textAccentColor, posX, posY, baseText) {
        isPaused = !isPaused;
        if (isPaused) {
            rect = paintWindow(k, bgColor, posX - 400, posY - 400);
            text = printText(k, textBaseColor, textAccentColor, posX, posY - 20, baseText);
        } else {
            [rect, text].forEach((item) => {
                item.destroy();
                item = null;
            });
        }
    }

    return {
        getState: getState,
        toggle: toggle,
    };
})();
