export const Scab = (function implementer() {
    function create(k) {
        return {
            make: (posX, posY, type, flip) => {
                let figure = new k.Rect(k.vec2(10, 0), 16, 32);

                if (type === 'scabWall') figure = new k.Rect(k.vec2(0, 10), 32, 16);

                return k.make([
                    k.sprite(type, { anim: 'idle', flipX: flip }),
                    k.area({ shape: figure }),
                    k.body({ isStatic: true }),
                    k.pos(posX, posY),
                    'scab',
                    _wrapErupt(k, type, flip),
                ]);
            },
        };
    }

    function _wrapErupt(k, type, flip) {
        return {
            erupt() {
                let dir = k.UP;
                let numY = 16;
                let numX = 0;

                if (flip && type !== 'scabFloor') {
                    dir = k.LEFT;
                    numY = 0;
                    numX = 0;
                } else if (!flip && type === 'scabWall') {
                    dir = k.RIGHT;
                    numY = 0;
                    numX = 16;
                }

                k.loop(k.randi(2, 6), () => {
                    const mucus = k.add([
                        k.sprite('mucus', { anim: 'fly' }),
                        k.area(),
                        k.pos(this.pos.x + numX, this.pos.y - numY),
                        k.opacity(0.5),
                        k.lifespan(0.3, { fade: 0.2 }),
                        k.move(dir, 100),
                        k.z(7),
                        'mucus',
                    ]);

                    if (flip && type !== 'scabFloor') mucus.pos.x -= 16;
                });
            },
        };
    }

    return {
        create: create,
    };
})();
