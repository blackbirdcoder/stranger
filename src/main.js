'use strict';
import kaplay from 'kaplay';
import { Settings } from '/src/modules/settings.js';
import { Loader } from '/src/modules/loader.js';
import { layers as layerDataStageZero } from '/src/data/stageZero.json' assert { type: 'JSON' };
import { Level } from '/src/modules/level.js';

(function main(settings, loader, level) {
    const k = kaplay({
        width: settings.scene.width,
        height: settings.scene.height,
        background: settings.colors.get('swatch20'),
        scale: 1,
        debugKey: 'd', // DELETE
    });
    k.loadRoot('./');
    k.debug.inspect = true; // DELETE
    loader.load(k);
    k.setGravity(1000);

    // TODO: Make a distinction by scenes
    const stage = level.buildLocation(k, 'stageZero', layerDataStageZero);

    // TODO: Implement the player module
    const player = stage.get('player')[0];
    player.onKeyDown('right', () => {
        player.move(100, 0);
    });

    player.onKeyDown('left', () => {
        player.move(-100, 0);
    });

    player.onKeyDown('up', () => {
        if (player.isGrounded()) {
            player.jump(700);
        }
    });

    // -------------  Cam
    k.onUpdate(() => {
        const { x, y } = player.worldPos();
        //console.log(x, y);

        k.setCamPos(x + 10, y - 90);
        k.setCamScale(2, 2);

        // k.debug.log(k.debug.fps());
    });
})(Settings, Loader, Level);
