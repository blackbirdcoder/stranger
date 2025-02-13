'use strict';
import kaplay from 'kaplay';
import { zzfx } from '/src/libs/zzfx.micro.js';
import { Settings } from '/src/modules/settings.js';
import { Loader } from '/src/modules/loader.js';
import { layers as layerDataStageOne } from '/src/data/stageOne.json' assert { type: 'JSON' };
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
    snow
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

    k.scene('start', (screen, settings) => {
        const startScreen = screen.start(k);
        const baseColor = settings.colors.get('swatch11');
        const accentColor = settings.colors.get('swatch19');
        startScreen.invite(baseColor, accentColor);
        startScreen.instruction(baseColor, accentColor);

        k.onDraw(() => {
            startScreen.bg();
        });

        k.onKeyPress('enter', () => {
            k.go(
                'gameStageOne',
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
                snow
            );
        });
    });

    k.scene('gameOver', (screen, settings) => {
        k.add([k.text('Game Over'), k.pos(10, 10)]);
    });

    k.scene(
        'gameStageOne',
        (settings, player, platform, level, dashboard, camera, gangster, barbs, scab, loot, snow) => {
            const stage = level.buildLocation(
                k,
                'stageOne',
                layerDataStageOne,
                player,
                platform,
                gangster,
                barbs,
                scab,
                loot,
                snow
            );
            const hero = player.get();
            hero.assumeAttack(k, screen, settings);
            hero.collectLoot();
            const flyPlatforms = [...stage.get('vertical'), ...stage.get('horizontal')];
            flyPlatforms[0].setSpeed(36);
            flyPlatforms[1].setSpeed(30);
            const enemyGangsters = stage.get('gangster');
            enemyGangsters.forEach((gangster) => {
                gangster.dirSwitchingTracking();
                gangster.assumeAttack(hero, settings.colors.get('swatch16'));
            });
            const enemyScab = stage.get('scab');
            enemyScab.forEach((scab) => scab.erupt());

            k.onUpdate(() => {
                flyPlatforms.forEach((flyPlatform) => flyPlatform.navigate());
                enemyGangsters.forEach((gangster) => gangster.wander());
                camera.start(k, hero.worldPos());
            });

            k.onCollide('result', 'player', () => {
                console.log('Battery: ', hero.getBattery());
                // Battery == 10 next scene you win
            });

            k.onDraw(() => {
                dashboard.created(
                    k,
                    settings.scene.width,
                    settings.colors.get('swatch20'),
                    settings.colors.get('swatch16'),
                    k.getCamPos(),
                    hero.getLife(),
                    hero.getBattery(),
                    hero.getMaxBattery(),
                    hero.getCat(),
                    hero.getMoney()
                );
            });

            k.onKeyPress('r', () => {
                hero.restart();
                k.go(
                    'gameStageOne',
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
                    snow
                );
            });
        }
    );

    k.go('start', screen, settings);
    //k.go('gameStageOne', settings, player, platform, level, dashboard, camera);
})(Settings, Loader, Player, Platform, Level, Dashboard, Camera, Screen, Gangster, Barbs, Scab, Loot, Snow);
