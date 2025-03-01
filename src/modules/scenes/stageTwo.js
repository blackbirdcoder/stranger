export const GameStageTwo = (function implementer() {
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

        // TODO: Continue. Development of the stage
        k.scene(sceneName, () => {
            const bgMusic = k.play('bg', { loop: true });
            bgMusic.stop(); // DELETE

            level.parseLoot(layerData, 'stageTwo');

            const stage = level.buildLocation(
                k,
                'stageTwo',
                layerData,
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
            hero.collectLoot('stageTwo', level.disabledLoot);
            const enemyGangsters = stage.get('gangster');
            enemyGangsters.forEach((gangster) => {
                gangster.dirSwitchingTracking();
                gangster.assumeAttack(hero, settings.colors.get('swatch16'));
            });

            k.onUpdate(() => {
                if (!pause.getState()) {
                    enemyGangsters.forEach((gangster) => gangster.wander());
                }
                camera.start(k, hero.worldPos());
            });

            k.onCollide('stageShift', 'player', () => {
                // TODO: Continue. Switch isBack
                parameters.push({ playerPos: { x: 1952, y: 896 } });
                k.go('gameStageOne', ...parameters);
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
                const stageNames = ['stageOne', 'stageTwo'];
                stageNames.forEach((stageName) => level.enabledLoot(stageName));
                hero.restart();
                bgMusic.stop();
                k.go('gameStageOne', ...parameters);
            });
        });
    }

    return Object.freeze({
        init: init,
    });
})();
