export const Level = (function implementer() {
    function buildLocation(k, levelSpriteName, layersLevel, player, platform) {
        // TODO: Implement levels
        const stage = k.add([k.sprite(levelSpriteName), k.pos(0, 0)]);
        console.log(layersLevel);
        for (const layer of layersLevel) {
            if (layer.name === 'Colliders') {
                for (const object of layer.objects) {
                    stage.add([
                        k.area({ shape: new Rect(k.vec2(0), object.width, object.height) }),
                        k.body({ isStatic: true }),
                        k.pos(object.x, object.y),
                    ]);
                }
            }
            if (layer.name === 'Positions') {
                for (const object of layer.objects) {
                    if (object.name === 'player') {
                        player.setPosition(object.x, object.y);
                        stage.add(player.get());
                    } else if (object.name === 'light') {
                        stage.add([k.sprite('light'), k.pos(object.x, object.y), k.opacity(0.8), k.z(10)]);
                    } else if (object.name === 'flying') {
                        if (object.properties[0].name === 'data') {
                            const flyPlatform = platform.parser(k, object.properties[0].value, object.x, object.y);
                            stage.add(flyPlatform);
                        }
                    }
                }
            }
        }
        return stage;
    }

    return {
        buildLocation: buildLocation,
    };
})();
