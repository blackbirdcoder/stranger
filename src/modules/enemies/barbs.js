export const Barbs = (function implementer() {
    function create(k) {
        return {
            make: (posX, posY) => {
                return k.make([
                    k.sprite('barbs', { anim: 'idle' }),
                    k.area({ shape: new k.Rect(k.vec2(0, 10), 32, 22) }),
                    k.body({ isStatic: true }),
                    k.pos(posX, posY),
                    'barbs',
                ]);
            },
        };
    }

    return {
        create: create,
    };
})();
