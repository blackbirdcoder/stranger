export const Level = (function implementer() {
    const dataLoot = {
        stuff: {},
    };

    function buildLocation(
        k,
        levelSpriteName,
        layersLevel,
        player,
        platform,
        gangster,
        barbs,
        scab,
        loot,
        snow,
        sfxPlayer,
        playerPosX = undefined,
        playerPosY = undefined
    ) {
        const stage = k.add([k.sprite(levelSpriteName), k.pos(0, 0)]);
        for (const layer of layersLevel) {
            if (layer.name === 'Colliders') {
                for (const object of layer.objects) {
                    if (object.name === 'barrierForEnemy') {
                        stage.add([
                            k.area({
                                shape: new Rect(k.vec2(0), object.width, object.height),
                                collisionIgnore: ['player'],
                            }),
                            k.body({ isStatic: true }),
                            k.pos(object.x, object.y),
                        ]);
                    } else if (object.name === 'result') {
                        stage.add([
                            k.area({ shape: new Rect(k.vec2(0), object.width, object.height) }),
                            k.pos(object.x, object.y),
                            'result',
                        ]);
                    } else if (object.name === 'stageShift') {
                        stage.add([
                            k.sprite('arrow'),
                            k.area({ shape: new Rect(k.vec2(0), object.width, object.height) }),
                            k.pos(object.x + 32, object.y + 16),
                            k.anchor('center'),
                            'stageShift',
                        ]);
                    } else {
                        stage.add([
                            k.area({ shape: new Rect(k.vec2(0), object.width, object.height) }),
                            k.body({ isStatic: true }),
                            k.pos(object.x, object.y),
                        ]);
                    }
                }
            }
            if (layer.name === 'Positions') {
                for (const object of layer.objects) {
                    if (object.name === 'player') {
                        if (!playerPosX && !playerPosY) {
                            playerPosX = object.x;
                            playerPosY = object.y;
                        }
                        player.make(k);
                        player.setPosition(playerPosX, playerPosY);
                        player.launchMovement(k);
                        player.setSoundPlayer(sfxPlayer);
                        stage.add(player.get());
                    } else if (object.name === 'light') {
                        stage.add([k.sprite('light'), k.pos(object.x, object.y), k.opacity(0.8), k.z(10)]);
                    } else if (object.name === 'flying') {
                        if (object.properties[0].name === 'data') {
                            const flyPlatform = platform.parser(k, object.properties[0].value, object.x, object.y);
                            stage.add(flyPlatform);
                        }
                    } else if (object.name === 'enemy') {
                        if (object.properties[0].value === 'gangster') {
                            const enemyGangster = gangster.create(k);
                            stage.add(enemyGangster.make(object.x, object.y));
                            gangster.setSoundPlayer(sfxPlayer);
                        } else if (object.properties[0].value === 'barbs') {
                            const enemyBarbs = barbs.create(k);
                            stage.add(enemyBarbs.make(object.x, object.y));
                        } else if (
                            object.properties[1].value === 'scabFloor' ||
                            object.properties[1].value === 'scabWall'
                        ) {
                            const flip = object.properties[0].value;
                            const type = object.properties[1].value;
                            const enemyScab = scab.create(k);
                            stage.add(enemyScab.make(object.x, object.y, type, flip));
                        }
                    } else if (object.name === 'snow') {
                        snow.create(k, object.x, 532, 0.5, [30, 80]);
                    }
                }
            }
        }

        for (const item of dataLoot.stuff[levelSpriteName]) {
            if (item.enabled) {
                const bonus = loot.create(k);
                const anim = item.type === 'battery' ? {} : { anim: 'idle' };
                stage.add(bonus.make(item.x, item.y, item.type, anim));
            }
        }

        return stage;
    }

    function parseLoot(layersLevel, levelSpriteName) {
        const isName = 'is' + levelSpriteName[0].toUpperCase() + levelSpriteName.split(1).join('');
        if (!dataLoot.stuff[isName]) {
            dataLoot.stuff[levelSpriteName] = [];
            for (const layer of layersLevel) {
                if (layer.name === 'Positions') {
                    for (const object of layer.objects) {
                        if (object.name === 'loot') {
                            dataLoot.stuff[levelSpriteName].push({
                                type: object.properties[0].value,
                                x: object.x,
                                y: object.y,
                                enabled: true,
                            });
                        }
                        continue;
                    }
                }
            }
            dataLoot.stuff[isName] = true;
        }
    }

    function disabledLoot(levelSpriteName, type, posX, posY) {
        dataLoot.stuff[levelSpriteName].filter((item) => {
            if (item.type === type && item.x === posX && item.y === posY && item.enabled) {
                item.enabled = false;
            }
        });
    }

    function enabledLoot(levelSpriteName) {
        dataLoot.stuff[levelSpriteName]?.filter((item) => (item.enabled = true));
    }

    return {
        buildLocation: buildLocation,
        parseLoot: parseLoot,
        disabledLoot: disabledLoot,
        enabledLoot: enabledLoot,
    };
})();
