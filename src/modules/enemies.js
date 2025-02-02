export const Enemies = (function implementer() {
    // TODO: Continue. Gangster enemy create
    function gangster(k) {
        const spriteNames = ['gangster1', 'gangster2'];
        const parameters = {
            health: 3,
            damage: 1,
            speed: 50,
        };
        const dir = [1 * parameters.speed, -1 * parameters.speed];
        let currentDir = dir[k.randi()];

        function _wrapWander() {
            return {
                wander() {
                    this.move(currentDir, 0);
                    this.flipX = currentDir < 0 ? true : false;
                },
            };
        }

        function _wrapDirSwitchingTracking() {
            return {
                dirSwitchingTracking() {
                    this.onCollide((other) => {
                        if (!other.is('player')) {
                            currentDir = currentDir < 0 ? 1 * parameters.speed : -1 * parameters.speed;
                        }
                    });
                },
            };
        }

        return {
            make: (posX, posY) => {
                return k.make([
                    k.sprite(spriteNames[k.randi()], { anim: 'walk' }),
                    k.area(),
                    k.body({ isStatic: true }),
                    k.pos(posX, posY),
                    k.health(parameters.health),
                    'gangster',
                    _wrapWander(),
                    _wrapDirSwitchingTracking(),
                ]);
            },
        };
    }

    return {
        gangster: gangster,
    };
})();
