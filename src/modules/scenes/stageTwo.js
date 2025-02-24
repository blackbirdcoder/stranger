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

        k.scene(sceneName, () => {
            //const bgMusic = k.play('bg', { loop: true });
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
        });
    }

    return Object.freeze({
        init: init,
    });
})();
