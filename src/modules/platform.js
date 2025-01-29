export const Platform = (function implementer() {
    function parser(k, data, x, y) {
        const platform = JSON.parse(data);
        return _make(k, platform, x, y);
    }

    function _make(k, platform, x, y) {
        const gameObject = k.make([
            k.sprite(platform.mark),
            k.area({ shape: new Rect(k.vec2(0), platform.width, platform.height) }),
            k.body({ isStatic: true, gravityScale: 0 }),
            k.pos(x, y),
            k.timer(),
            { speed: platform.speed },
            platform.type,
            _wrapFly(k, platform.x, platform.y, platform.type, platform.dir),
            _wrapSpeed(),
        ]);
        return gameObject;
    }

    function _wrapFly(k, endX, endY, type, dir) {
        let start = null;

        function _movableNumber(endPosition, startPosition, currentPosition) {
            const fullDistance = Math.abs(endPosition - startPosition);
            const traveledDistance = Math.abs(currentPosition - startPosition);
            return traveledDistance / fullDistance;
        }

        return {
            navigate() {
                start ??= this.pos;
                if (type === 'vertical') {
                    let number = _movableNumber(endY, start.y, this.pos.y);
                    if (dir < 0) number = 1 - number;
                    const easeNumber = k.easings.easeInOutSine(number / 2);
                    this.move(0, dir * (this.speed * (1 - easeNumber)));
                    if (Math.round(this.pos.y) <= Math.round(endY)) dir = 1;
                    if (Math.round(this.pos.y) >= Math.round(start.y)) dir = -1;
                } else if (type === 'horizontal') {
                    let number = _movableNumber(endX, start.x, this.pos.x);
                    if (dir < 0) number = 1 - number;
                    const easeNumber = k.easings.easeOutSine(number / 2);
                    this.move(dir * (this.speed * (1 - easeNumber)), 0);
                    if (Math.round(this.pos.x) >= Math.round(endX)) dir = -1;
                    if (Math.round(this.pos.x) <= Math.round(start.x)) dir = 1;
                }
            },
        };
    }

    function _wrapSpeed() {
        return {
            getSpeed() {
                return this.speed;
            },
            setSpeed(value) {
                this.speed = value;
            },
        };
    }

    return Object.freeze({
        parser: parser,
    });
})();
