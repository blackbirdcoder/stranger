export const Player = (function implementer() {
    let player = null;
    const parameters = Object.freeze({
        speed: 170,
        jump: 435,
        jumpForce: 200,
        mass: 100,
        maxVelocity: 500,
    });

    const achievements = {
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

    function make(k) {
        player = k.make([
            k.sprite('player'),
            k.area({ shape: new k.Rect(k.vec2(10, 0), 10, 32) }),
            k.body({ mass: parameters.mass, jumpForce: parameters.jumpForce, maxVelocity: parameters.maxVelocity }),
            k.anchor('topleft'),
            k.pos(0, 0),
            k.z(9),
            'player',
            _wrapLife(),
            _wrapBattery(),
            _wrapCat(),
            _wrapMoney(),
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
                if (achievements.life.current > achievements.life.min) achievements.life.max -= 1;
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

    return Object.freeze({
        make: make,
        setPosition: setPosition,
        get: get,
        launchMovement: launchMovement,
    });
})();
