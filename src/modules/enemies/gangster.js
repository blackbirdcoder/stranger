export const Gangster = (function implementer() {
    const parameters = {
        health: 3,
        damage: 1,
        speed: 50,
    };
    const dir = [1 * parameters.speed, -1 * parameters.speed];
    let currentDir = dir[Math.floor(Math.random() * 2)];

    function create(k) {
        const spriteNames = ['gangster1', 'gangster2'];

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
                    _wrapAssumeAttack(k),
                ]);
            },
        };
    }

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
                    if (!other.is('player') && !other.is('hitFx')) {
                        currentDir = currentDir < 0 ? 1 * parameters.speed : -1 * parameters.speed;
                    }
                });
            },
        };
    }

    function _wrapAssumeAttack(k) {
        return {
            assumeAttack(colorDamage) {
                this.onCollide((other) => {
                    if (other.is('hitFx')) {
                        this.hurt(parameters.damage);
                        if (this.hp() === 0) {
                            this.play('died');
                            k.wait(0.2, () => this.destroy());
                        } else {
                            this.pos.x += 8;
                            const direction = [k.vec2(-1, -1), k.UP, k.vec2(1, -1)];
                            for (let i = 0; i < 3; i++) {
                                k.add([
                                    k.pos(this.pos.x + k.randi(5, 10), this.pos.y),
                                    k.sprite('hitStar'),
                                    k.scale(0.2),
                                    k.color(colorDamage),
                                    k.opacity(0.5),
                                    k.lifespan(0.1, { fade: 0.1 }),
                                    k.move(direction[i], k.randi(50, 75)),
                                ]);
                            }
                        }
                    }
                });
            },
        };
    }

    return {
        create: create,
    };
})();
