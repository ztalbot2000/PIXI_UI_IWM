import Theme from './theme.js'
import Tooltip from './tooltip.js'

/**
 * Callback for the slider action onStart.
 *
 * @callback onStartCallback
 * @param {object} event - The event object.
 * @param {Slider} slider - A reference to the slider (also this refers to the slider).
 */

/**
 * Callback for the slider action onUpdate.
 *
 * @callback onUpdateCallback
 * @param {object} event - The event object.
 * @param {Slider} slider - A reference to the slider (also this refers to the slider).
 */

/**
 * Callback for the slider action onComplete.
 *
 * @callback onCompleteCallback
 * @param {object} event - The event object.
 * @param {Slider} slider - A reference to the slider (also this refers to the slider).
 */

/**
 * Class that represents a PixiJS Slider.
 * 
 * @example
 * // Create the app
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 900,
 *     height: 250
 * }).setup().run()
 * 
 * // Create the slider
 * const slider = new Slider({
 *     x: 10,
 *     y: 20
 * })
 *
 * // Add the slider to a DisplayObject
 * app.scene.addChild(slider)
 *
 * @class
 * @extends PIXI.Container
 * @see {@link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container}
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/slider.html|DocTest}
 */
export default class Slider extends PIXI.Container {
    
    /**
     * Creates an instance of a Slider.
     * 
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the slider.
     * @param {number} [opts.id=auto generated] - The id of the slider.
     * @param {number} [opts.x=0] - The x position of the slider. Can be also set after creation with slider.x = 0.
     * @param {number} [opts.y=0] - The y position of the slider. Can be also set after creation with slider.y = 0.
     * @param {string|Theme} [opts.theme=dark] - The theme to use for this slider. Possible values are dark, light, red
     *     or a Theme object.
     * @param {number} [opts.width=250] - The width of the slider.
     * @param {number} [opts.height=2] - The height of the slider.
     * @param {PIXI.DisplayObject} [opts.container=window.app|object] - The container where the slider events should be attached to.
     * @param {number} [opts.fill=Theme.fill] - The color of the slider background as a hex value.
     * @param {number} [opts.fillAlpha=Theme.fillAlpha] - The alpha value of the background.
     * @param {number} [opts.stroke=Theme.stroke] - The color of the border as a hex value.
     * @param {number} [opts.strokeWidth=Theme.strokeWidth] - The width of the border in pixel.
     * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
     * @param {number} [opts.controlFill=Theme.stroke] - The color of the slider control background as a hex value.
     * @param {number} [opts.controlFillAlpha=Theme.strokeAlpha] - The alpha value of the background.
     * @param {number} [opts.controlStroke=Theme.stroke] - The color of the border as a hex value.
     * @param {number} [opts.controlStrokeWidth=Theme.strokeWidth * 0.8] - The width of the border in pixel.
     * @param {number} [opts.controlStrokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
     * @param {number} [opts.controlRadius=16] - The radius of the slider control.
     * @param {boolean} [opts.disabled=false] - Is the slider disabled? When disabled, the slider has a lower alpha value
     *     and cannot be clicked (interactive is set to false).
     * @param {onStartCallback} [opts.onStart] - Executed when the slider control starts to move.
     * @param {onUpdateCallback} [opts.onUpdate] - Executed when the slider control is moved.
     * @param {onCompleteCallback} [opts.onComplete] - Executed when the slider control was dropped.
     * @param {string|object} [opts.tooltip] - A string for the label of the tooltip or an object to configure the tooltip
     *     to display. 
     * @param {boolean} [opts.visible=true] - Is the slider initially visible (property visible)?
     */
    constructor(opts = {}) {

        super()
        
        const theme = Theme.fromString(opts.theme)
        this.theme = theme

        this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            x: 0,
            y: 0,
            width: 250,
            height: 2,
            container: null,
            fill: theme.fill,
            fillAlpha: theme.fillAlpha,
            stroke: theme.stroke,
            strokeWidth: theme.strokeWidth,
            strokeAlpha: theme.strokeAlpha,
            controlFill: theme.fill,
            controlFillAlpha: .5,
            controlStroke: theme.primaryColor,
            controlStrokeWidth: 2,
            controlStrokeAlpha: theme.strokeAlpha,
            controlRadius: 16,
            orientation: 'horizontal',
            min: 0,
            max: 100,
            value: 0,
            disabled: false,
            onStart: null,
            onUpdate: null,
            onComplete: null,
            tooltip: null,
            visible: true
        }, opts)
        
        this.opts.container = this.opts.container || this

        // Validation
        //-----------------
        if (this.opts.height > this.opts.width) {
            this.opts.height = this.opts.width
        }

        if (this.opts.value < this.opts.min) {
            this.opts.value = this.opts.min
        }

        if (this.opts.value > this.opts.max) {
            this.opts.value = this.opts.max
        }

        // Properties
        //-----------------
        this.id = this.opts.id
        this.radius = this.opts.height / 2

        this._value = this.opts.value
        this._disabled = null

        this.sliderObj = null
        this.control = null
        this.tooltip = null
        
        this.visible = this.opts.visible

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
     * @return {Slider} A reference to the slider for chaining.
     */
    setup() {

        // Container events
        //-----------------
        const container = this.opts.container

        this.on('pointermove', e => {
            if (this.control.dragging) {
                const moveX = this.control.event.data.getLocalPosition(this.control.parent).x
                this._value = this.pixelToValue(moveX - this.control.delta - this.opts.controlRadius)
                let x = this.valueToPixel(this._value) + this.opts.controlRadius
                this.control.x = x

                if (this.opts.onUpdate) {
                    this.opts.onUpdate.call(this, e, this)
                }
            }
        })

        if (container instanceof Element) {
            container.addEventListener('pointerup', e => this.onEnd(e), false)
            container.addEventListener('pointercancel', e => this.onEnd(e), false)
            container.addEventListener('pointerleave', e => this.onEnd(e), false)
            container.addEventListener('pointerout', e => this.onEnd(e), false)
            container.addEventListener('mouseup', e => this.onEnd(e), false)
            container.addEventListener('mousecancel', e => this.onEnd(e), false)
            container.addEventListener('mouseleave', e => this.onEnd(e), false)
            container.addEventListener('mouseout', e => this.onEnd(e), false)
        } else {
            container.interactive = true
            container.on('pointerup', e => this.onEnd(e))
            container.on('pointercancel', e => this.onEnd(e))
            container.on('pointerleave', e => this.onEnd(e))
            container.on('pointerout', e => this.onEnd(e))
        }

        // Slider
        //-----------------
        let sliderObj = new PIXI.Graphics()
        this.sliderObj = sliderObj
        this.addChild(sliderObj)

        // Control
        //-----------------
        let control = new PIXI.Graphics()
        control.x = this.opts.controlRadius + this.valueToPixel(this.opts.value)
        control.y = this.opts.controlRadius

        // pointerdown on the control for dragndrop
        control.on('pointerdown', e => {
            control.event = e
            control.delta = e.data.getLocalPosition(this.control).x
            control.dragging = true

            if (this.opts.onStart) {
                this.opts.onStart.call(this, e, this)
            }
        })

        this.control = control

        this.addChild(this.control)
        
        // interaction
        //-----------------
        this.sliderObj.on('pointerover', e => {
            TweenMax.to(this.control, this.theme.fast, {alpha: .83})
        })

        this.sliderObj.on('pointerout', e => {
            TweenMax.to(this.control, this.theme.fast, {alpha: 1})
        })

        this.sliderObj.on('pointerdown', e => {
            this.sliderObj.pointerdowned = true
            TweenMax.to(this.control, this.theme.fast, {alpha: .7})
        })

        // Click on the slider bar
        this.sliderObj.on('pointerup', e => {
            if (this.sliderObj.pointerdowned) {
                this.sliderObj.pointerdowned = false
                const position = e.data.getLocalPosition(this.control.parent)
                this.value = this.pixelToValue(position.x - this.opts.controlRadius)
                TweenMax.to(this.control, this.theme.fast, {alpha: .83})
            }
        })

        // disabled
        //-----------------
        this.disabled = this.opts.disabled
        
        // tooltip
        //-----------------
        if (this.opts.tooltip) {
            if (typeof this.opts.tooltip === 'string') {
                this.tooltip = new Tooltip({
                    object: this,
                    content: this.opts.tooltip
                })
            } else {
                this.opts.tooltip.object = this
                this.tooltip = new Tooltip(this.opts.tooltip)
            }
        }

        return this
    }
    
    /**
     * Should be called to refresh the layout of the slider. Can be used after resizing.
     * 
     * @return {Slider} A reference to the slider for chaining.
     */
    layout() {
        
        // set position
        //-----------------
        this.position.set(this.opts.x, this.opts.y)

        // draw
        //-----------------
        this.draw()

        return this
    }
    
    /**
     * Draws the slider to the canvas.
     * 
     * @private
     * @return {Slider} A reference to the slider for chaining.
     */
    draw() {

        const r = this.radius
        const cr = this.opts.controlRadius
        const w = this.opts.width
        const h = this.opts.height
        const x = cr + r
        const y = cr + r - h

        this.sliderObj.clear()
        this.sliderObj.beginFill(0xffffff, 0)
        this.sliderObj.drawRect(0, 0, x + w + cr, cr * 2)
        this.sliderObj.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha)
        this.sliderObj.beginFill(this.opts.fill, this.opts.fillAlpha)
        this.sliderObj.moveTo(x, y)
        this.sliderObj.lineTo(x + w, y)
        this.sliderObj.arcTo(x + w + r, y, x + w + r, y + r, r)
        this.sliderObj.lineTo(x + w + r, y + r + 1)                     // BUGFIX: If not specified, there is a small area without a stroke.
        this.sliderObj.arcTo(x + w + r, y + h, x + w, y + h, r)
        this.sliderObj.lineTo(x, y + h)
        this.sliderObj.arcTo(x - r, y + h, x - r, y + r, r)
        this.sliderObj.arcTo(x - r, y, x, y, r)
        this.sliderObj.endFill()

        // Draw control
        this.control.clear()
        this.control.lineStyle(this.opts.controlStrokeWidth, this.opts.controlStroke, this.opts.controlStrokeAlpha)
        this.control.beginFill(this.opts.controlFill, this.opts.controlFillAlpha)
        this.control.drawCircle(0, 0, cr - 1)
        this.control.beginFill(this.opts.controlStroke, this.opts.controlStrokeAlpha)
        this.control.drawCircle(0, 0, cr / 6)
        this.control.endFill()

        return this
    }

    /**
     * Executed, when the slider control movement ended.
     * 
     * @private
     * @return {Slider} A reference to the slider for chaining.
     */
    onEnd(e) {

        if (this.control.dragging) {
            this.control.event = null
            this.control.dragging = false
            if (this.opts.onComplete) {
                this.opts.onComplete.call(this, e, this)
            }
        }

        return this
    }

    /**
     * Calculates the value for a given pixel.
     * 
     * @private
     * @param {number} value 
     * @returns  {number} The calucalted pixel.
     */
    valueToPixel(value) {
        if (value < this.opts.min) {
            value = this.opts.min
        } else if (value > this.opts.max) {
            value = this.opts.max
        }
        return this.opts.width * (value - this.opts.min) / (this.opts.max - this.opts.min)
    }

    /**
     * Calculates the pixel for a given value.
     * 
     * @private
     * @param {number} pixel 
     * @returns {number} The calucalted value.
     */
    pixelToValue(pixel) {
        if (pixel < 0) {
            pixel = 0
        } else if (pixel > this.opts.width) {
            pixel = this.opts.width
        }
        return this.opts.min + ((this.opts.max - this.opts.min) * pixel / this.opts.width)
    }
    
    /**
     * Gets or sets the value.
     * 
     * @member {number}
     */
    get value() {
        return Math.round(this._value)
    }
    set value(value) {
        if (value < this.opts.min) {
            value = this.opts.min
        } else if (value > this.opts.max) {
            value = this.opts.max
        }
        this._value = value

        const x = this.valueToPixel(value) + this.opts.controlRadius

        TweenMax.to(this.control, this.theme.fast, {x: x})
    }
    
    /**
     * Gets or sets the disabled state. When disabled, the slider cannot be clicked.
     * 
     * @member {boolean}
     */
    get disabled() {
        return this._disabled
    }
    set disabled(value) {

        this._disabled = value
        
        if (this._disabled) {
            this.interactive = false
            this.sliderObj.interactive = false
            this.control.interactive = false
            this.control.buttonMode = false
            this.alpha = .5
        } else {
            this.interactive = true
            this.sliderObj.interactive = true
            this.control.interactive = true
            this.control.buttonMode = true
            this.alpha = 1
        }
    }

    /**
     * Shows the slider (sets his alpha values to 1).
     * 
     * @return {Slider} A reference to the slider for chaining.
     */
    show() {

        this.opts.strokeAlpha = 1
        this.opts.fillAlpha = 1
        this.opts.controlStrokeAlpha = 1
        this.opts.controlFillAlpha = 1

        this.layout()

        return this
    }
    
    /**
     * Hides the slider (sets his alpha values to 1).
     * 
     * @return {Slider} A reference to the slider for chaining.
     */
    hide() {

        this.opts.strokeAlpha = 0
        this.opts.fillAlpha = 0
        this.opts.controlStrokeAlpha = 0
        this.opts.controlFillAlpha = 0

        this.layout()

        return this
    }
}


