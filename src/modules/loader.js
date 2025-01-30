export const Loader = (function implementer() {
    const spriteNames = [
        'stageOne',
        'barbs',
        'battery',
        'bird',
        'cat',
        'cloud',
        'dialogueBattery',
        'dialogueDanger',
        'dialogueNot',
        'dialogueShip',
        'gameOver',
        'gameWinner',
        'gangster1',
        'gangster2',
        'iconBattery',
        'iconCat',
        'iconHeart',
        'iconDollar',
        'mucus',
        'scabFloor',
        'scabWall',
        'start',
        'player',
        'arrow',
        'light',
        'flyPlatformS',
        'flyPlatformM',
        'flyPlatformL',
    ];

    const fontName = 'SilkscreenRegular';

    function load(k) {
        for (let i = 0; i < spriteNames.length; i++) {
            if (spriteNames[i] === 'player') {
                k.loadSprite(`${spriteNames[i]}`, `sprites/${spriteNames[i]}.png`, {
                    sliceX: 6,
                    sliceY: 4,
                    anims: {
                        walk: {
                            from: 0,
                            to: 5,
                            loop: true,
                        },
                        jump: {
                            from: 6,
                            to: 11,
                            speed: 6,
                        },
                        attack: {
                            from: 12,
                            to: 17,
                            speed: 30,
                        },
                        idle: {
                            from: 18,
                            to: 23,
                            loop: true,
                        },
                    },
                });
            } else {
                k.loadSprite(`${spriteNames[i]}`, `sprites/${spriteNames[i]}.png`);
            }
        }

        k.loadFont(`${fontName}`, `font/${fontName}.woff2`);
    }

    return {
        load: load,
    };
})();
