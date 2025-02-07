export const Player = (function implementer() {
    let player = null;
    const parameters = Object.freeze({
        speed: 170,
        jump: 435,
        jumpForce: 200,
        mass: 100,
        maxVelocity: 500,
        damage: 1,
    });

    let achievements = _achievementsInit();

    function make(k) {
        player = k.make([
            k.sprite('player'),
            k.area({ shape: new k.Rect(k.vec2(10, 0), 10, 32) }),
            k.body({ mass: parameters.mass, jumpForce: parameters.jumpForce, maxVelocity: parameters.maxVelocity }),
            k.anchor('topleft'),
            k.pos(0, 0),
            k.z(9),
            k.health(achievements.life.current),
            'player',
            _wrapLife(),
            _wrapBattery(),
            _wrapCat(),
            _wrapMoney(),
            _wrapAssumeAttack(),
            _wrapRestart(),
        ]);
    }

    function setPosition(x, y) {
        if (_checkExistence()) {
            player.pos.x = x;
            player.pos.y = y;
        }
    }

    function get() {
        return _checkExistence() ? player : null;
    }

    function launchMovement(k) {
        if (_checkExistence()) {
            player.play('idle');

            player.onKeyDown(['right', 'left', 'up'], (key) => {
                if (key === 'right') {
                    if (player.curAnim() !== 'attack') player.move(parameters.speed, 0);
                } else if (key === 'left') {
                    if (player.curAnim() !== 'attack') player.move(-parameters.speed, 0);
                } else if (key === 'up') {
                    if (player.isGrounded()) player.jump(parameters.jump);
                }
            });

            player.onKeyPress(['up', 'right', 'left'], (key) => {
                if (key === 'up') player.play('jump');
                if (key === 'right') player.play('walk');
                if (key === 'left') player.play('walk');
            });

            player.onKeyRelease(['space', 'up', 'right', 'left'], (key) => {
                if (key === 'space') {
                    player.play('attack');
                    _attack(k);
                } else {
                    if (player.curAnim() !== 'idle') player.play('idle');
                }
            });

            player.onUpdate(() => {
                if (player.curAnim() === undefined) player.play('idle');

                if (
                    (!k.isKeyDown('space') && k.isKeyDown('right') && player.curAnim() === 'idle') ||
                    (!k.isKeyDown('space') && k.isKeyDown('left') && player.curAnim() === 'idle')
                ) {
                    player.play('walk');
                }

                if (k.isKeyDown('right') && player.flipX && !k.isKeyDown('left')) {
                    player.flipX = false;
                } else if (k.isKeyDown('left') && !player.flipX && !k.isKeyDown('right')) {
                    player.flipX = true;
                }

                if (k.isKeyDown('right') && k.isKeyDown('left')) player.play('idle');
            });
        }
    }

    function _checkExistence() {
        if (!player) throw new Error('No game object, player not created!');
        return true;
    }

    function _wrapLife() {
        return {
            addLife() {
                if (achievements.life.current < achievements.life.max) achievements.life.current += 1;
            },
            decreaseLife() {
                if (achievements.life.current > achievements.life.min) achievements.life.current -= parameters.damage;
            },
            checkLife() {
                return achievements.life.current === achievements.life.min ? false : true;
            },
            getLife() {
                return achievements.life.current;
            },
        };
    }

    function _wrapBattery() {
        return {
            addBattery() {
                if (achievements.battery.current < achievements.battery.max) achievements.battery.current += 1;
            },
            getMaxBattery() {
                return achievements.battery.max;
            },
            getBattery() {
                return achievements.battery.current;
            },
            checkBattery() {
                return achievements.battery.current === achievements.battery.max ? true : false;
            },
        };
    }

    function _wrapCat() {
        return {
            addCat() {
                achievements.cat.current += 1;
            },
            getCat() {
                return achievements.cat.current;
            },
        };
    }

    function _wrapMoney() {
        return {
            setMoney(number) {
                achievements.money.current += number;
            },
            getMoney() {
                return achievements.money.current;
            },
        };
    }

    function _attack(k) {
        let posX = player.flipX ? player.pos.x - 32 : player.pos.x + 32;

        const hit = k.add([
            k.sprite('hitFx', { anim: 'effect', flipX: player.flipX }),
            k.area({ collisionIgnore: ['player'] }),
            k.body({ isStatic: true }),
            k.pos(posX, player.pos.y),
            'hitFx',
        ]);

        hit.onCollide((other) => {
            if (other.is('barbs') || other.is('scab')) {
                const info = k.add([k.sprite('dialogueNot'), k.pos(player.pos.x, player.pos.y - 30)]);
                k.wait(0.2, () => info.destroy());
            }
        });

        hit.onUpdate(() => {
            if (hit.curAnim() !== 'effect') hit.destroy();
        });
    }

    function _wrapAssumeAttack() {
        return {
            assumeAttack(k, screen, settings) {
                this.onCollide((other) => {
                    if (other.is('gangster') || other.is('barbs') || other.is('scab') || other.is('mucus')) {
                        this.hurt(parameters.damage);
                        this.decreaseLife();
                        this.jump(200);

                        if (other.flipX) {
                            this.pos.x -= 8;
                        } else {
                            this.pos.x += 8;
                        }

                        const direction = [k.vec2(-1, -1), k.UP, k.vec2(1, -1)];
                        for (let i = 0; i < 3; i++) {
                            k.add([
                                k.pos(this.pos.x + k.randi(5, 10), this.pos.y),
                                k.sprite('circle'),
                                k.scale(0.2),
                                k.opacity(0.5),
                                k.lifespan(0.1, { fade: 0.1 }),
                                k.move(direction[i], k.randi(50, 75)),
                            ]);
                        }

                        if (!this.checkLife()) {
                            k.wait(0.4, () => {
                                this.destroy();
                                k.go('gameOver', screen, settings);
                            });
                        }
                    }
                });
            },
        };
    }

    function _wrapRestart() {
        return {
            restart() {
                achievements = _achievementsInit();
            },
        };
    }

    function _achievementsInit() {
        return {
            life: {
                max: 4,
                min: 0,
                current: 3,
            },
            battery: {
                max: 10,
                min: 0,
                current: 0,
            },
            cat: {
                current: 0,
            },
            money: {
                current: 0,
            },
        };
    }

    return Object.freeze({
        make: make,
        setPosition: setPosition,
        get: get,
        launchMovement: launchMovement,
    });
})();
