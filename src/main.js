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
import { Pause } from '/src/modules/pause.js';

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
    pause
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
        const baseColor = settings.colors.get('swatch11');
        const accentColor = settings.colors.get('swatch19');
        screen.printTextAnimation(k, baseColor, accentColor, 190, 350, 'to start press ', '<enter>');
        k.onDraw(() => screen.drawImage(k, 'start', 0, 0, 802, 608));
        screen.printTextInstruction(k, baseColor, accentColor, 190, 493);

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
                snow,
                sfxPlayer,
                screen,
                pause
            );
        });
    });

    k.scene('gameOver', (screen, settings, hero) => {
        k.wait(0.4, () => sfxPlayer(...settings.sound.loser));
        const baseColor = settings.colors.get('swatch11');
        const accentColor = settings.colors.get('swatch19');
        screen.printText(k, baseColor, accentColor, k.width() / 2, 100, 'game over');
        k.onDraw(() => screen.drawImage(k, 'gameOver', k.width() / 2 - 70, 180, 192, 128));
        screen.printText(k, baseColor, accentColor, k.width() / 2, 400, 'to press key ', '<r>');

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
                snow,
                sfxPlayer,
                screen,
                pause
            );
        });
    });

    k.scene('gameWinner', (screen, settings, hero) => {
        k.play('winner');
        const baseColor = settings.colors.get('swatch9');
        const accentColor = settings.colors.get('swatch12');
        const score = hero.getScore();
        screen.printTextAnimation(k, baseColor, accentColor, 250, 100, 'You are a ', 'winner');
        k.onDraw(() => screen.drawImage(k, 'gameWinner', 274, 120, 128 * 2, 192 * 2));
        screen.printText(k, baseColor, accentColor, 400, 475, 'Score: ', score.toString());
    });

    k.scene(
        'gameStageOne',
        (
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
            pause
        ) => {
            const baseColor = settings.colors.get('swatch9');
            const accentColor = settings.colors.get('swatch12');
            const bgColor = settings.colors.get('swatch20');
            const bgMusic = k.play('bg', { loop: true });
            //bgMusic.stop(); // DELETE
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
                snow,
                sfxPlayer
            );
            const hero = player.get();
            hero.assumeAttack(k, screen, settings, hero, bgMusic);
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
                if (!pause.getState()) {
                    flyPlatforms.forEach((flyPlatform) => flyPlatform.navigate());
                    enemyGangsters.forEach((gangster) => gangster.wander());
                }
                camera.start(k, hero.worldPos());
            });

            k.onCollide('result', 'player', () => {
                if (hero.checkBattery()) {
                    bgMusic.stop();
                    k.go('gameWinner', screen, settings, hero);
                } else {
                    hero.notBatteries();
                }
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

            k.onKeyPress('p', () => {
                const { x, y } = k.getCamPos();
                pause.toggle(k, screen.paintOver, bgColor, screen.printText, baseColor, accentColor, x, y, 'pause');
                for (const child of stage.children) child.paused = pause.getState();
                pause.getState() ? bgMusic.stop() : bgMusic.play();
            });

            k.onKeyPress('r', () => {
                hero.restart();
                bgMusic.stop();
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
                    snow,
                    sfxPlayer,
                    screen,
                    pause
                );
            });
        }
    );

    k.go('start', screen, settings);
    //k.go('gameStageOne', settings, player, platform, level, dashboard, camera);
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
    Pause
);
