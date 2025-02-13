export const Snow = (function implementer() {
    function create(k, posX, posY, period, speed) {
        const snowflake = k.add([
            k.pos(posX, posY),
            k.particles(
                {
                    max: 20,
                    speed: [...speed],
                    lifeTime: [100, 150],
                    opacities: [1.0, 0.5, 0.0],
                    angle: [0, 360],
                    scales: [0.1],
                    texture: k.getSprite('snow').data.tex,
                    quads: [k.getSprite('snow').data.frames[0]],
                },
                {
                    lifetime: 300,
                    direction: 90,
                    spread: 45,
                }
            ),
            k.z(1),
        ]);

        snowflake.emit(10);
        k.wait(period, () => create(k, posX, -64, 15, [10, 50]));
    }

    return {
        create: create,
    };
})();
