export const Screen = (function implementer() {
    function start(k) {
        return {
            bg: () => {
                k.drawSprite({ sprite: 'start', pos: k.vec2(0, 0), width: 802, height: 608 });
            },
            invite: (textBaseColor, textAccentColor) => {
                const text = k.add([
                    k.pos(190, 350),
                    k.text('[base]To start press[/base] [accent]<enter>[/accent]', {
                        font: 'SilkscreenRegular',
                        size: 27,
                        styles: {
                            base: {
                                color: k.rgb(textBaseColor),
                            },
                            accent: {
                                color: k.rgb(textAccentColor),
                            },
                        },
                    }),
                    k.animate(),
                ]);
                text.animate('pos', [k.vec2(190, 350), k.vec2(225, 350)], { duration: 2, direction: 'ping-pong' });
            },
            instruction: (textBaseColor, textAccentColor) => {
                k.add([
                    k.pos(190, 493),
                    k.text(
                        '[accent]<Left Arrow> <Right Arrow>[/accent][base] - Move[/base]\n[accent]<Up Arrow>[/accent][base] - Jump[/base]\n[accent]<Space>[/accent][base] - Attack[/base]\n[accent]<P>[/accent][base] - Pause[/base]\n[accent]<R>[/accent][base] - Restart[/base]',
                        {
                            font: 'SilkscreenRegular',
                            size: 20,
                            styles: {
                                base: {
                                    color: k.rgb(textBaseColor),
                                },
                                accent: {
                                    color: k.rgb(textAccentColor),
                                },
                            },
                        }
                    ),
                    k.z(10),
                ]);
            },
        };
    }

    return {
        start: start,
    };
})();
