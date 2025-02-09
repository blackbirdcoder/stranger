export const Camera = (function implementer() {
    function start(k, playerWordPos) {
        const { x, y } = playerWordPos;
        const moveLimit = {
            right: 1840,
            left: 220,
        };
        const indent = 32;

        k.setCamScale(2, 2);

        if (x > moveLimit.left && x < moveLimit.right) {
            k.setCamPos(x, y - indent);
        } else {
            if (x < moveLimit.left) {
                k.setCamPos(moveLimit.left, y - indent);
            } else {
                k.setCamPos(moveLimit.right, y - indent);
            }
        }
    }

    return {
        start: start,
    };
})();
