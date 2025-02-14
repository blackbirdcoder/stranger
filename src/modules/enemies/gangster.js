export const Gangster = (function implementer() {
    const parameters = {
        health: 3,
        damage: 1,
        speed: 50,
    };
    let soundPlayer = null;

    const soundEffects = {
        takeDamage: [0.6, , 67, 0.02, 0.13, , 2, 2, -5, -19, , , , , , , , 0.93, 0.13, , -780],
        money: [4.5, 0, 116, , 0.06, 0.35, , 1.4, , , 370, 0.08, , , , , 0.02, 0.85, 0.3, 0.16, 802],
    };

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
                    k.offscreen({ hide: true }),
                    'gangster',
                    _wrapWander(),
                    _wrapDirSwitchingTracking(),
                    _wrapAssumeAttack(k),
                ]);
            },
        };
    }

    function setSoundPlayer(sfxPlayer) {
        soundPlayer ??= sfxPlayer;
    }

    function _wrapWander() {
        const dir = [1 * parameters.speed, -1 * parameters.speed];
        let currentDir = dir[Math.floor(Math.random() * 2)];
        return {
            wander() {
                this.move(currentDir, 0);
                currentDir = !this.flipX ? 1 * parameters.speed : -1 * parameters.speed;
            },
        };
    }

    function _wrapDirSwitchingTracking() {
        return {
            dirSwitchingTracking() {
                this.onCollide((other) => {
                    if (!other.is('player') && !other.is('hitFx')) this.flipX = !this.flipX;
                });
            },
        };
    }

    function _wrapAssumeAttack(k) {
        return {
            assumeAttack(hero, accentColor) {
                this.onCollide((other) => {
                    if (other.is('hitFx')) {
                        soundPlayer(...soundEffects.takeDamage);
                        this.hurt(parameters.damage);
                        if (this.hp() === 0) {
                            this.play('died');
                            k.wait(0.2, () => this.destroy());
                            const randomMoney = k.randi(75, 176);
                            k.add([
                                k.text(`[accent]${randomMoney}$[/accent]`, {
                                    font: 'SilkscreenRegular',
                                    size: 16,
                                    styles: {
                                        accent: {
                                            color: k.rgb(accentColor),
                                        },
                                    },
                                }),
                                k.pos(this.pos.x + k.randi(5, 10), this.pos.y),
                                k.opacity(0.5),
                                k.lifespan(0.3, { fade: 0.2 }),
                                k.move(k.UP, k.randi(50, 75)),
                            ]);
                            k.wait(0.6, () => {
                                hero.setMoney(randomMoney);
                                soundPlayer(...soundEffects.money);
                            });
                        } else {
                            this.pos.x += 8;
                            const direction = [k.vec2(-1, -1), k.UP, k.vec2(1, -1)];
                            for (let i = 0; i < 3; i++) {
                                k.add([
                                    k.pos(this.pos.x + k.randi(5, 10), this.pos.y),
                                    k.sprite('hitStar'),
                                    k.scale(0.2),
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
        setSoundPlayer: setSoundPlayer,
    };
})();
