import Theme from './theme.js'
import AbstractPopup from './abstractpopup.js'

/**
 * Class that represents a PixiJS Tooltip.
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
 * const tooltip = new Tooltip({
 *     object: circle,
 *     container: app.scene,
 *     content: 'Das Gesetz ist der Freund des Schwachen.'
 * })
 *
 * @class
 * @extends AbstractPopup
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/tooltip.html|DocTest}
 */
export default class Tooltip extends AbstractPopup {
    
    /**
     * Creates an instance of a Tooltip.
     * 
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the tooltip.
     * @param {number} [opts.minWidth=0] - The minimum width of the tooltip.
     * @param {number} [opts.minHeight=0] - The minimum height of the tooltip.
     * @param {number} [opts.padding=Theme.padding / 2] - The inner spacing of the tooltip.
     * @param {PIXI.DisplayObject} opts.object - The object, where the tooltip should be displayed.
     * @param {PIXI.DisplayObject} [opts.container=object] - The container where the tooltip should be attached to.
     * @param {number} [opts.offsetLeft=8] - The horizontal shift of the tooltip.
     * @param {number} [opts.offsetTop=-8] - The vertical shift of the tooltip.
     * @param {number} [opts.delay=0] - A delay, after which the tooltip should be opened.
     */
    constructor(opts = {}) {
        
        const theme = Theme.fromString(opts.theme)
        
        opts = Object.assign({}, {
            minWidth: 0,
            minHeight: 0,
            padding: theme.padding / 2,
            object: null,
            container: null,
            offsetLeft: 8,
            offsetTop: -8,
            delay: 0
        }, opts)

        opts.container = opts.container || opts.object

        super(opts)

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
     * @return {Tooltip} A reference to the tooltip for chaining.
     */
    setup() {

        super.setup()

        // bind events this
        //-----------------
        this.interactive = true

        let mouseoverTooltip = false
        
        this.on('mouseover', e => {
            mouseoverTooltip = true
        })

        this.on('mouseout', e => {
            mouseoverTooltip = false
            if (!mouseoverObject) {
                this.hide(() => {
                    this.opts.container.removeChild(this)
                })
            }
        })
        
        // bind events object
        //-----------------
        const object = this.opts.object
        object.interactive = true

        let mouseoverObject = false

        object.on('mouseover', e => {

            this.timeout = window.setTimeout(() => {
                mouseoverObject = true
                this.visible = true
                this.opts.container.addChild(this)
                this.setPosition(e)
            }, this.opts.delay * 1000)
        })

        object.on('mousemove', e => {
            if (mouseoverObject) {
                this.setPosition(e)
            }
        })

        object.on('mouseout', e => {
            mouseoverObject = false
            window.clearTimeout(this.timeout)
            if (!mouseoverTooltip) {
                this.hide(() => {
                    this.opts.container.removeChild(this)
                })
            }
        })

        return this
    }
    
    /**
     * Calculates and sets the position of the tooltip.
     * 
     * @private
     * @return {Tooltip} A reference to the tooltip for chaining.
     */
    setPosition(e) {

        const position = e.data.getLocalPosition(this.opts.container)

        this.x = position.x + this.opts.offsetLeft
        this.y = position.y + this.opts.offsetTop - this.height

        return this
    }
}


