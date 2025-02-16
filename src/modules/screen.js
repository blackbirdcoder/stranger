export const Screen = (function implementer() {
    const textOptions = {
        font: 'SilkscreenRegular',
        size: { m: 27, s: 20 },
    };

    function drawImage(k, spriteName, posX, posY, width, height) {
        k.drawSprite({ sprite: spriteName, pos: k.vec2(posX, posY), width: width, height: height });
    }

    function printText(k, textBaseColor, textAccentColor, posX, posY, baseText = null, accentText = null) {
        k.add([
            k.pos(posX, posY),
            k.text(`[base]${baseText ?? ' '}[/base][accent]${accentText ?? ' '}[/accent]`, {
                font: textOptions.font,
                size: textOptions.size.m,
                styles: {
                    base: {
                        color: k.rgb(textBaseColor),
                    },
                    accent: {
                        color: k.rgb(textAccentColor),
                    },
                },
            }),
            k.anchor('top'),
            k.z(10),
        ]);
    }

    function printTextAnimation(k, textBaseColor, textAccentColor, posX, posY, baseText = null, accentText = null) {
        const text = k.add([
            k.pos(posX, posY),
            k.text(`[base]${baseText ?? ' '}[/base][accent]${accentText ?? ' '}[/accent]`, {
                font: textOptions.font,
                size: textOptions.size.m,
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
            k.z(10),
        ]);
        text.animate('pos', [k.vec2(posX, posY), k.vec2(posX + 35, posY)], { duration: 2, direction: 'ping-pong' });
    }

    function printTextInstruction(k, textBaseColor, textAccentColor, posX, posY) {
        k.add([
            k.pos(posX, posY),
            k.text(
                '[accent]<Left Arrow> <Right Arrow>[/accent][base] - Move[/base]\n[accent]<Up Arrow>[/accent][base] - Jump[/base]\n[accent]<Space>[/accent][base] - Attack[/base]\n[accent]<P>[/accent][base] - Pause[/base]\n[accent]<R>[/accent][base] - Restart[/base]',
                {
                    font: textOptions.font,
                    size: textOptions.size.s,
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
    }

    return {
        drawImage: drawImage,
        printTextAnimation: printTextAnimation,
        printTextInstruction: printTextInstruction,
        printText: printText,
    };
})();
