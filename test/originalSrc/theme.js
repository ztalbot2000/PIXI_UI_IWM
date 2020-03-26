/**
 * Class that represents a PixiJS Theme.
 *
 * @example
 * // Create the theme
 * const yellow = new Theme({
 *     fill: 0xfecd2d,
 *     fillActive: 0xfe9727,
 *     strokeActive: 0xfecd2d,
 *     strokeActiveWidth: 4,
 *     textStyle: {
 *         fill: 0x5ec7f8
 *     },
 *     textStyleActive: {
 *         fill: 0x5954d3
 *     },
 *     textStyleLarge: {
 *         fontSize: 36
 *     }
 * })
 *
 * // Create the app and apply the new theme to it
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 450,
 *     height: 150,
 *     theme: yellow
 * }).setup().run()
 *
 * @class
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest}
 */
export default class Theme {

    /**
     * Creates an instance of a Theme.
     *
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the theme.
     * @param {number} [opts.margin=10] - The outer spacing (distance to other objects) from the border.
     * @param {number} [opts.padding=10] - The inner spacing (distance from icon and/or label) to the border.
     * @param {number} [opts.radius=4] - The radius used when drawing a rounded rectangle.
     * @param {number} [opts.fast=0.25] - The duration of time when it has to be fast.
     * @param {number} [opts.normal=0.5] - The duration of time when it has to be normal.
     * @param {number} [opts.slow=1] - The duration of time when it has to be slow.
     * @param {number} [opts.primaryColor=0x5ec7f8] - The primary color of the theme.
     * @param {number} [opts.color1=0x282828] - The first color of the theme. For example used for the background.
     * @param {number} [opts.color2=0xf6f6f6] - The second color of the theme. For example used for the border.
     * @param {number} [opts.fill=color1] - The color of the background as a hex value.
     * @param {number} [opts.fillAlpha=1] - The alpha value of the background.
     * @param {number} [opts.fillActive=color1] - The color of the background when activated.
     * @param {number} [opts.fillActiveAlpha=1] - The alpha value of the background when activated.
     * @param {number} [opts.stroke=color2] - The color of the border as a hex value.
     * @param {number} [opts.strokeWidth=0.6] - The width of the border in pixel.
     * @param {number} [opts.strokeAlpha=1] - The alpha value of the border.
     * @param {number} [opts.strokeActive=color2] - The color of the border when activated.
     * @param {number} [opts.strokeActiveWidth=0.6] - The width of the border in pixel when activated.
     * @param {number} [opts.strokeActiveAlpha=1] - The alpha value of the border when activated.
     * @param {number} [opts.iconColor=color2] - The color of the icon (set by the tint property) as a hex value.
     * @param {number} [opts.iconColorActive=colorPrimary] - The color of the icon when activated.
     * @param {number} [opts.background=color1] - The color of a background for a component (e.g. at the Modal class).
     * @param {object} [opts.textStyle={}] - A textstyle object for the styling of text. See PIXI.TextStyle
     *     for possible options. Default object:
     * @param {string} [opts.textStyle.fontFamily="Avenir Next", "Open Sans", "Segoe UI", ...] - The font family.
     * @param {string} [opts.textStyle.fontWeight=400] - The font weight.
     * @param {number} [opts.textStyle.fontSize=16] - The font size.
     * @param {number} [opts.textStyle.fill=color2] - The fill color.
     * @param {number} [opts.textStyle.stroke=color1] - The stroke color.
     * @param {number} [opts.textStyle.strokeThickness=0] - The thickness of the stroke.
     * @param {number} [opts.textStyle.miterLimit=1] - The meter limit.
     * @param {string} [opts.textStyle.lineJoin=round] - The line join.
     * @param {object} [opts.textStyleActive=textStyle + {fill: primaryColor}] - A textstyle object which is used
     *     for actived text.
     * @param {object} [opts.textStyleSmall=textStyle + {fontSize: -= 3}] - A textstyle object which is used for
     *     small text.
     * @param {object} [opts.textStyleSmallActive=textStyleSmall + {fill: primaryColor}] - A textstyle object which
     *     is used for small actived text.
     * @param {object} [opts.textStyleLarge=textStyle + {fontSize: += 3}] - A textstyle object which is used for
     *     large text.
     * @param {object} [opts.textStyleLargeActive=textStyleLarge + {fill: primaryColor}] - A textstyle object which
     *     is used for large actived text.
     */
    constructor(opts = {}) {

        const colorPrimary = opts.primaryColor != null ? opts.primaryColor : 0x5ec7f8               // blue
        const color1 = opts.color1 != null ? opts.color1 : 0x282828                                 // black
        const color2 = opts.color2 != null ? opts.color2 : 0xf6f6f6                                 // white

        this.opts = Object.assign({}, {
            margin: 12,
            padding: 12,
            radius: 4,
            fast: .25,
            normal: .5,
            slow: 1,
            primaryColor: colorPrimary,
            color1: color1,
            color2: color2,
            fill: color1,
            fillAlpha: 1,
            fillActive: color1,
            fillActiveAlpha: 1,
            stroke: color2,
            strokeWidth: .6,
            strokeAlpha: 1,
            strokeActive: color2,
            strokeActiveWidth: .6,
            strokeActiveAlpha: 1,
            iconColor: color2,
            iconColorActive: colorPrimary,
            background: color1
        }, opts)

        // Set textStyle and variants
        this.opts.textStyle = Object.assign({}, {
            fontFamily: '"Avenir Next", "Open Sans", "Segoe UI", "Roboto", "Helvetica Neue", -apple-system, system-ui, BlinkMacSystemFont, Arial, sans-serif !default',
            fontWeight: '500',
            fontSize: 18,
            fill: color2,
            stroke: color1,
            strokeThickness: 0,
            miterLimit: 1,
            lineJoin: 'round'
        }, this.opts.textStyle)
        this.opts.textStyleSmall = Object.assign({}, this.opts.textStyle, {fontSize: this.opts.textStyle.fontSize - 3}, this.opts.textStyleSmall)
        this.opts.textStyleLarge = Object.assign({}, this.opts.textStyle, {fontSize: this.opts.textStyle.fontSize + 3}, this.opts.textStyleLarge)
        this.opts.textStyleActive = Object.assign({}, this.opts.textStyle, {fill: this.opts.primaryColor}, this.opts.textStyleActive)
        this.opts.textStyleSmallActive = Object.assign({}, this.opts.textStyleSmall, {fill: this.opts.primaryColor}, this.opts.textStyleSmallActive)
        this.opts.textStyleLargeActive = Object.assign({}, this.opts.textStyleLarge, {fill: this.opts.primaryColor}, this.opts.textStyleLargeActive)

        Object.assign(this, this.opts)
    }

    /**
     * Factory function
     *
     * @static
     * @param {string} theme=dark - The name of the theme to load.
     * @return {Theme} Returns a newly created Theme object.
     */
    static fromString(theme) {

        if (theme && typeof theme === 'object') {
            return theme
        }

        switch (theme) {
            case 'light':
                return new ThemeLight()
            case 'red':
                return new ThemeRed()
            default:
                return new ThemeDark()
        }
    }
}

/**
 * Class that represents a PixiJS ThemeDark.
 *
 * @example
 * // Create the app with a new dark theme
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 450,
 *     height: 150,
 *     theme: new ThemeDark()
 * }).setup().run()
 *
 * @class
 * @extends Theme
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest}
 */
export class ThemeDark extends Theme {

}

/**
 * Class that represents a PixiJS ThemeLight.
 * The color1 is set to 0xf6f6f6, color2 to 0x282828.
 *
 * @example
 * // Create the app with a new light theme
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 450,
 *     height: 150,
 *     theme: new ThemeLight()
 * }).setup().run()
 *
 * @class
 * @extends Theme
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest}
 */
export class ThemeLight extends Theme {

    /**
     * Creates an instance of a ThemeLight.
     *
     * @constructor
     */
    constructor() {

        super({color1: 0xf6f6f6, color2: 0x282828})
    }
}

/**
 * Class that represents a PixiJS ThemeRed.
 * The primaryColor is set to 0xd92f31.
 *
 * @example
 * // Create the app with a new red theme
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 450,
 *     height: 150,
 *     theme: new ThemeRed()
 * }).setup().run()
 *
 * @class
 * @extends Theme
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest}
 */
export class ThemeRed extends Theme {

    /**
     * Creates an instance of a ThemeRed.
     *
     * @constructor
     */
    constructor() {

        super({primaryColor: 0xd92f31})
    }
}


