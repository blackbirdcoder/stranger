export const Player = (function implementer() {
    let player = null;
    const parameters = Object.freeze({
        speed: 170,
        jump: 435,
    });

    function make(k) {
        player = k.make([
            k.sprite('player'),
            k.area({ shape: new k.Rect(k.vec2(10, 0), 10, 32) }),
            k.body({ mass: 100, jumpForce: 200, maxVelocity: 500 }),
            k.anchor('topleft'),
            k.pos(0, 0),
            k.z(9),
            'player',
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

    return Object.freeze({
        make: make,
        setPosition: setPosition,
        get: get,
        launchMovement: launchMovement,
    });
})();
