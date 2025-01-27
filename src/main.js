'use strict';
import kaplay from 'kaplay';
import { zzfx } from '/src/libs/zzfx.micro.js';
import { Settings } from '/src/modules/settings.js';
import { Loader } from '/src/modules/loader.js';
import { layers as layerDataStageZero } from '/src/data/stageZero.json' assert { type: 'JSON' };
import { layers as layerDataStageOne } from '/src/data/stageOne.json' assert { type: 'JSON' };
import { Player } from '/src/modules/player.js';
import { Platform } from '/src/modules/platform.js';
import { Level } from '/src/modules/level.js';

(function main(settings, loader, player, platform, level) {
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
    // =============== Scene 1 (Stage)
    player.make(k);
    const stage = level.buildLocation(k, 'stageOne', layerDataStageOne, player, platform);
    player.launchMovement(k);
    const flyPlatforms = [...stage.get('vertical'), ...stage.get('horizontal')];
    flyPlatforms[1].setSpeed(40);
    k.onUpdate(() => {
        flyPlatforms.forEach((flyPlatform) => flyPlatform.navigate());
    });

    // =========================

    // -------------  Cam
    k.onUpdate(() => {
        const { x, y } = stage.get('player')[0].worldPos();
        //console.log(x, y);
        // k.setCamPos(x + 10, y - 90);
        k.setCamPos(x, y);
        k.setCamScale(2, 2);

        // k.debug.log(k.debug.fps());
    });
})(Settings, Loader, Player, Platform, Level);
