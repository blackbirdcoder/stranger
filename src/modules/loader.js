export const Loader = (function implementer() {
    const spriteNames = [
        'stageZero',
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
        'mucus',
        'scabFloor',
        'scabWall',
        'start',
        'player',
    ];

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
                        },
                        jump: {
                            from: 6,
                            to: 11,
                        },
                        attack: {
                            from: 12,
                            to: 17,
                        },
                        idle: {
                            from: 13,
                            to: 18,
                        },
                    },
                });
            } else {
                k.loadSprite(`${spriteNames[i]}`, `sprites/${spriteNames[i]}.png`);
            }
        }
    }

    return {
        load: load,
    };
})();
