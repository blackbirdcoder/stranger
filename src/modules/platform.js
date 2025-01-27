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
            _fly(platform.x, platform.y, platform.type, platform.dir),
            _speed(),
        ]);
        return gameObject;
    }

    function _fly(endX, endY, type, dir) {
        let start = null;
        return {
            navigate() {
                start ??= this.pos;
                if (type === 'vertical') {
                    this.move(0, dir * this.speed);
                    if (Math.round(this.pos.y) <= Math.round(endY)) dir = 1;
                    if (Math.round(this.pos.y) >= Math.round(start.y)) dir = -1;
                } else if (type === 'horizontal') {
                    this.move(dir * this.speed, 0);
                    if (Math.round(this.pos.x) >= Math.round(endX)) dir = -1;
                    if (Math.round(this.pos.x) <= Math.round(start.x)) dir = 1;
                }
            },
        };
    }

    function _speed() {
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
