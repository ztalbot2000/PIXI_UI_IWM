import Theme from './theme.js'
import AbstractPopup from './abstractpopup.js'
import Tooltip from './tooltip.js'

/**
 * Class that represents a PixiJS Badge.
 * 
 * @example
 * // Create the app
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 900,
 *     height: 250
 * }).setup().run()
 * 
 * // Add an DisplayObject to the app
 * const circle = new PIXI.Graphics()
 * circle.beginFill(0x5251a3)
 * circle.drawCircle(50, 50, 40)
 * app.scene.addChild(circle)
 * 
 * const badge1 = new Badge({
 *     object: circle,
 *     container: app.scene,
 *     content: 'Das Gesetz ist der Freund des Schwachen.'
 * })
 *
 * @class
 * @extends AbstractPopup
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/badge.html|DocTest}
 */
export default class Badge extends AbstractPopup {
    
    /**
     * Creates an instance of a Badge.
     * 
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the badge.
     * @param {number} [opts.minWidth=0] - The minimum width of the badge.
     * @param {number} [opts.minHeight=0] - The minimum height of the badge.
     * @param {number} [opts.padding=Theme.padding / 2] - The inner spacing of the badge.
     * @param {string|object} [opts.tooltip] - A string for the label of the tooltip or an object to configure the tooltip
     *     to display.
     */
    constructor(opts = {}) {
        
        const theme = Theme.fromString(opts.theme)
        
        opts = Object.assign({}, {
            minWidth: 0,
            minHeight: 0,
            padding: theme.padding / 2,
            tooltip: null
        }, opts)

        super(opts)

        this.tooltip = null

        // setup
        //-----------------
        this.setup()

        // layout
        //-----------------
        this.layout()
    }
    
    /**
     * Creates children and instantiates everything.
     *
     * @private
     * @override
     * @return {Badge} A reference to the badge for chaining.
     */
    setup() {

        super.setup()

        // tooltip
        //-----------------
        if (this.opts.tooltip) {
            if (typeof this.opts.tooltip === 'string') {
                this.tooltip = new Tooltip({object: this, content: this.opts.tooltip})
            } else {
                this.opts.tooltip = Object.assign({}, {object: this}, this.opts.tooltip)
                this.tooltip = new Tooltip(this.opts.tooltip)
            }
        }

        return this
    }
    
    /**
     * Should be called to refresh the layout of the badge. Can be used after resizing.
     * 
     * @override
     * @return {Badge} A reference to the badge for chaining.
     */
    layout() {

        super.layout()

        this.content.x = this.width / 2 - this.content.width / 2 - this.opts.strokeWidth / 2
        this.content.y = this.height / 2 - this.content.height / 2 - this.opts.strokeWidth / 2

        return this
    }
}


