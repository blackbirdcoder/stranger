export const Dashboard = (function implementer() {
    function created(
        k,
        sceneWidth,
        bgColor,
        borderColor,
        camPos,
        currentLife,
        currentBattery,
        maxBattery,
        currentCat,
        currentMoney
    ) {
        _substrate(k, sceneWidth, bgColor, borderColor, camPos);
        _cardLife(k, currentLife, camPos);
        _cardBattery(k, currentBattery, maxBattery, camPos, borderColor);
        _cardCat(k, currentCat, camPos, borderColor);
        _cardMoney(k, currentMoney, camPos, borderColor);
    }

    function _substrate(k, sceneWidth, bgColor, borderColor, camPos) {
        k.drawRect({
            width: sceneWidth / 2,
            height: 25,
            pos: k.vec2(camPos.x - 200, camPos.y - 150),
            fill: true,
            color: k.rgb(bgColor),
            outline: { color: k.rgb(borderColor), width: 1 },
        });
    }

    function _cardLife(k, currentLife, camPos) {
        const step = 21;
        for (let i = 0; i < currentLife; i++) {
            k.drawSprite({
                sprite: 'iconHeart',
                pos: k.vec2(camPos.x - 195 + step * i, camPos.y - 145),
                width: 16,
                height: 16,
            });
        }
    }

    function _cardBattery(k, currentBattery, maxBattery, camPos, borderColor) {
        k.drawSprite({
            sprite: 'iconBattery',
            pos: k.vec2(camPos.x - 99, camPos.y - 145),
            width: 16,
            height: 16,
        });

        k.drawText({
            text: `${currentBattery}/${maxBattery}`,
            size: 17,
            font: 'SilkscreenRegular',
            pos: k.vec2(camPos.x - 80, camPos.y - 145),
            color: k.rgb(borderColor),
        });
    }

    function _cardCat(k, currentCat, camPos, borderColor) {
        k.drawSprite({
            sprite: 'iconCat',
            pos: k.vec2(camPos.x - 7, camPos.y - 145),
            width: 16,
            height: 16,
        });

        k.drawText({
            text: `${currentCat}`,
            size: 17,
            font: 'SilkscreenRegular',
            pos: k.vec2(camPos.x + 13, camPos.y - 145),
            color: k.rgb(borderColor),
        });
    }

    function _cardMoney(k, currentMoney, camPos, borderColor) {
        k.drawSprite({
            sprite: 'iconDollar',
            pos: k.vec2(camPos.x + 85, camPos.y - 145),
            width: 16,
            height: 16,
        });

        k.drawText({
            text: `${currentMoney}`,
            size: 17,
            font: 'SilkscreenRegular',
            pos: k.vec2(camPos.x + 105, camPos.y - 145),
            color: k.rgb(borderColor),
        });
    }

    return Object.freeze({
        created: created,
    });
})();
