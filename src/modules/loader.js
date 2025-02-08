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
        'hitFx',
        'hitStar',
        'circle',
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
            } else if (spriteNames[i] === 'gangster1' || spriteNames[i] === 'gangster2') {
                k.loadSprite(`${spriteNames[i]}`, `sprites/${spriteNames[i]}.png`, {
                    sliceX: 6,
                    sliceY: 2,
                    anims: {
                        walk: {
                            from: 0,
                            to: 5,
                            loop: true,
                        },
                        died: {
                            from: 6,
                            to: 11,
                            speed: 34,
                        },
                    },
                });
            } else if (spriteNames[i] === 'hitFx') {
                k.loadSprite(`${spriteNames[i]}`, `sprites/${spriteNames[i]}.png`, {
                    sliceX: 3,
                    sliceY: 1,
                    anims: {
                        effect: {
                            from: 0,
                            to: 2,
                            speed: 34,
                        },
                    },
                });
            } else if (spriteNames[i] === 'barbs') {
                k.loadSprite(`${spriteNames[i]}`, `sprites/${spriteNames[i]}.png`, {
                    sliceX: 6,
                    sliceY: 1,
                    anims: {
                        idle: {
                            from: 0,
                            to: 5,
                            loop: true,
                        },
                    },
                });
            } else if (spriteNames[i] === 'scabFloor' || spriteNames[i] === 'scabWall') {
                k.loadSprite(`${spriteNames[i]}`, `sprites/${spriteNames[i]}.png`, {
                    sliceX: 6,
                    sliceY: 1,
                    anims: {
                        idle: {
                            from: 0,
                            to: 5,
                            loop: true,
                        },
                    },
                });
            } else if (spriteNames[i] === 'mucus') {
                k.loadSprite(`${spriteNames[i]}`, `sprites/${spriteNames[i]}.png`, {
                    sliceX: 6,
                    sliceY: 1,
                    anims: {
                        fly: {
                            from: 0,
                            to: 5,
                            speed: 12,
                            loop: true,
                        },
                    },
                });
            } else if (spriteNames[i] === 'cat' || spriteNames[i] === 'bird') {
                k.loadSprite(`${spriteNames[i]}`, `sprites/${spriteNames[i]}.png`, {
                    sliceX: 6,
                    sliceY: 1,
                    anims: {
                        idle: {
                            from: 0,
                            to: 5,
                            speed: 12,
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
