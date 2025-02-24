export const GameStageOne = (function implementer() {
    function init(k, sceneName, layerData, parameters) {
        const [
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
        ] = parameters;

        k.scene(sceneName, () => {
            let playerPosX = undefined;
            let playerPosY = undefined;

            for (const item of parameters) {
                Object.keys(item).find((key) => {
                    if (key === 'playerPos') {
                        playerPosX = item[key].x;
                        playerPosY = item[key].y;
                    }
                });
            }

            const bgMusic = k.play('bg', { loop: true });
            bgMusic.stop(); // DELETE
            const stage = level.buildLocation(
                k,
                'stageOne',
                layerData,
                player,
                platform,
                gangster,
                barbs,
                scab,
                loot,
                snow,
                sfxPlayer,
                playerPosX,
                playerPosY
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

            k.onCollide('stageShift', 'player', () => {
                k.go('gameStageTwo', ...parameters);
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
                const baseColor = settings.colors.get('swatch9');
                const accentColor = settings.colors.get('swatch12');
                const bgColor = settings.colors.get('swatch20');
                const { x, y } = k.getCamPos();
                pause.toggle(k, screen.paintOver, bgColor, screen.printText, baseColor, accentColor, x, y, 'pause');
                for (const child of stage.children) child.paused = pause.getState();
                pause.getState() ? bgMusic.stop() : bgMusic.play();
            });

            k.onKeyPress('r', () => {
                for (const item of parameters) {
                    Object.keys(item).find((key) => {
                        if (key === 'playerPos') {
                            item[key].x = 223.75;
                            item[key].y = 895.5;
                        }
                    });
                }
                hero.restart();
                bgMusic.stop();
                k.go(sceneName, ...parameters);
            });
        });
    }

    return Object.freeze({
        init: init,
    });
})();
