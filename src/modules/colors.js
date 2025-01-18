/**
 * The module provides color manipulation and palette management.
 * It creates a color palette and facilitates easy retrieval and display of colors.
 */
export const Colors = (function implementer() {
    const palette = buildColorPalette([
        '#6b9a71',
        '#457a5f',
        '#244f55',
        '#211729',
        '#2b2441',
        '#33315d',
        '#414776',
        '#4d80ab',
        '#79b4d5',
        '#a5d5df',
        '#e3ecd7',
        '#fffef9',
        '#e3c5cf',
        '#b79fbb',
        '#8e8bb6',
        '#5f6791',
        '#8d5180',
        '#b67388',
        '#e1ae98',
        '#efdbb3',
        '#000000',
    ]);

    /**
     * Assigns names to hex codes and converts them to a palette object.
     *
     * @param {string[]} colorSequence - Array with color values ​​in hex format.
     * @returns {Object} - An palette object where each color is assigned a name for easy reference.
     */
    function buildColorPalette(colorSequence) {
        const colors = {};
        for (let i = 0; i < colorSequence.length; i++) {
            colors[`swatch${i}`] = colorSequence[i];
        }
        return colors;
    }

    /**
     * Outputs colors and their names to the console.
     * Each swatch is displayed with its corresponding background color.
     */
    function palettePreview() {
        for (const swatch in palette) {
            console.log('%c%s', `background:${palette[swatch]}; padding: 5px;`, `${swatch}`);
        }
    }

    /**
     * Returns color values ​​by name, if name is not found it will return default color.
     *
     * @param {string} swatch - Name of the color we want to get from the palette.
     * @returns {string} - Hex color value.
     */
    function getColor(swatch) {
        const color = palette[swatch];
        if (color === undefined) {
            console.warn(`There is no such color ${swatch} in the palette`);
            return '#ffffff';
        }
        return color;
    }

    return Object.freeze({
        helpPalettePreview: palettePreview,
        getColor: getColor,
    });
})();
