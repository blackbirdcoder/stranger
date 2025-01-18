'use strict';
import kaplay from 'kaplay';
import { Settings } from '/src/settings.js';
import { layers as layerDataStageZero } from '/src/data/stageZero.json' assert { type: 'JSON' };

(function main(settings) {
    const k = kaplay({
        width: settings.scene.width,
        height: settings.scene.height,
        background: settings.colors.getColor('swatch20'),
        scale: 1,
        debugKey: 'd',
    });
    k.loadRoot('./');

    // TODO: Continue. Refactoring
    k.debug.inspect = true;

    k.loadSprite('player', 'sprites/player.png');
    k.loadSprite('stageZero', 'sprites/stageZero.png');

    const stage = k.add([k.sprite('stageZero'), k.pos(0, 0)]);
    console.log(layerDataStageZero);

    for (const layer of layerDataStageZero) {
        if (layer.name === 'Colliders') {
            for (const object of layer.objects) {
                //console.log(object.x, object.y);
                stage.add([
                    k.area({ shape: new Rect(k.vec2(0), object.width, object.height) }),
                    k.body({ isStatic: true }),
                    k.pos(object.x, object.y),
                ]);
            }
            continue;
        }
        if (layer.name === 'Positions') {
            for (const object of layer.objects) {
                if (object.name === 'player') {
                    console.log('work created player');
                    stage.add([k.sprite('player'), k.area(), k.pos(object.x, object.y), k.anchor('topleft'), 'player']);
                }
                continue;
            }
        }
    }

    const player = stage.get('player')[0];
    const { x, y } = player.worldPos();
    console.log(x, y);
    k.setCamPos(x + 10, y - 90);
    k.setCamScale(2, 2);
    /*
    k.onUpdate(() => {
        k.debug.log(k.debug.fps());
    });
    */

    //k.add([k.pos(10, 80), k.sprite('bean')]);

    k.onClick(() => k.addKaboom(k.mousePos()));
})(Settings);
