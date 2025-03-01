'use strict';
import kaplay from 'kaplay';
import { zzfx } from '/src/libs/zzfx.micro.js';
import { Settings } from '/src/modules/settings.js';
import { Loader } from '/src/modules/loader.js';
import { layers as layerDataStageOne } from '/src/data/stageOne.json' assert { type: 'JSON' };
import { layers as layerDataStageTwo } from '/src/data/stageTwo.json' assert { type: 'JSON' };
import { Player } from '/src/modules/player.js';
import { Platform } from '/src/modules/platform.js';
import { Level } from '/src/modules/level.js';
import { Dashboard } from '/src/modules/dashboard.js';
import { Camera } from '/src/modules/camera.js';
import { Screen } from '/src/modules/screen.js';
import { Gangster } from '/src/modules/enemies/gangster.js';
import { Barbs } from '/src/modules/enemies/barbs.js';
import { Scab } from '/src/modules/enemies/scab.js';
import { Loot } from '/src/modules/loot.js';
import { Snow } from '/src/modules/snow.js';
import { Pause } from '/src/modules/pause.js';
import { GameStart } from '/src/modules/scenes/start.js';
import { GameOver } from '/src/modules/scenes/gameOver.js';
import { GameWinner } from '/src/modules/scenes/winner.js';
import { GameStageOne } from '/src/modules/scenes/stageOne.js';
import { GameStageTwo } from '/src/modules/scenes/stageTwo.js';

(function main(
    settings,
    loader,
    player,
    platform,
    level,
    dashboard,
    camera,
    screen,
    gangster,
    barbs,
    scab,
    loot,
    snow,
    sfxPlayer,
    pause,
    gameStart,
    gameOver,
    gameWinner,
    gameStageOne,
    gameStageTwo
) {
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
    const generalSceneParameters = [
        settings,
        player,
        platform,
        level,
        dashboard,
        camera,
        gangster,
        barbs,
        scab,
        loot,
        snow,
        sfxPlayer,
        screen,
        pause,
    ];

    gameStart.init(k, screen, settings, 'gameStageOne');
    gameOver.init(k, screen, settings, player, sfxPlayer, 'gameStageOne', level.enabledLoot, generalSceneParameters);
    gameWinner.init(k, screen, settings, player);
    gameStageOne.init(k, 'gameStageOne', layerDataStageOne, generalSceneParameters);
    gameStageTwo.init(k, 'gameStageTwo', layerDataStageTwo, generalSceneParameters);
    k.go('start');
})(
    Settings,
    Loader,
    Player,
    Platform,
    Level,
    Dashboard,
    Camera,
    Screen,
    Gangster,
    Barbs,
    Scab,
    Loot,
    Snow,
    zzfx,
    Pause,
    GameStart,
    GameOver,
    GameWinner,
    GameStageOne,
    GameStageTwo
);
