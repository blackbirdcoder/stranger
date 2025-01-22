'use strict';
import kaplay from 'kaplay';
import { Settings } from '/src/modules/settings.js';
import { Loader } from '/src/modules/loader.js';
import { layers as layerDataStageZero } from '/src/data/stageZero.json' assert { type: 'JSON' };
import { Player } from '/src/modules/player.js';
import { Level } from '/src/modules/level.js';

(function main(settings, loader, player, level) {
    const k = kaplay({
        width: settings.scene.width,
        height: settings.scene.height,
        background: settings.colors.get('swatch20'),
        scale: 1,
        debugKey: 'd', // DELETE
    });
    k.setGravity(settings.scene.gravity);
    k.loadRoot('./');
    k.debug.inspect = true; // DELETE
    loader.load(k);
    // TODO: Make a distinction by scenes
    player.make(k);
    const stage = level.buildLocation(k, 'stageZero', layerDataStageZero, player);
    player.launchMovement(k);

    // -------------  Cam
    k.onUpdate(() => {
        const { x, y } = stage.get('player')[0].worldPos();
        //console.log(x, y);

        k.setCamPos(x + 10, y - 90);
        k.setCamScale(2, 2);

        // k.debug.log(k.debug.fps());
    });
})(Settings, Loader, Player, Level);
