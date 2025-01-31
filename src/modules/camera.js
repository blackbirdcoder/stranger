export const Camera = (function implementer() {
    function start(k, playerWordPos) {
        const { x, y } = playerWordPos;
        k.setCamPos(x, y);
        k.setCamScale(2, 2);
    }

    return {
        start: start,
    };
})();
