export const Player = (function implementer() {
    let player = null;
    const parameters = {
        speed: undefined,
        jump: undefined,
    };

    function make(k) {
        player = k.make([k.sprite('player'), k.area(), k.body(), k.anchor('topleft'), k.pos(0, 0), 'player']);
    }

    function setParameters(speed, jump) {
        parameters.speed = speed;
        parameters.jump = jump;
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

    function launchMovement() {
        if (_checkExistence()) {
            player.onKeyDown('right', () => {
                player.move(parameters.speed, 0);
            });

            player.onKeyDown('left', () => {
                player.move(-parameters.speed, 0);
            });

            player.onKeyDown('up', () => {
                if (player.isGrounded()) {
                    player.jump(parameters.jump);
                }
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
        setParameters: setParameters,
        launchMovement: launchMovement,
    });
})();
