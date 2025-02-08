export const Loot = (function implementer() {
    function create(k) {
        return {
            make: (posX, posY, type, anim) => {
                return k.make([
                    k.sprite(type, anim),
                    k.area(),
                    k.body({ isStatic: true }),
                    k.pos(posX, posY),
                    type,
                ]);
            },
        };
    }

    return Object.freeze({
        create: create,
    });
})();
