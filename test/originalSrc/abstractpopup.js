import Theme from './theme.js'

import Tween from '../../src/Ease/Tween'


/**
 * Class that represents a PixiJS AbstractPopup.
 * The class is used for various other Popup-like classes
 * like Popup, Message, Tooltip...
 *
 * @class
 * @abstract
 * @extends PIXI.Graphics
 * @see {@link http://pixijs.download/dev/docs/PIXI.Graphics.html|PIXI.Graphics}
 */
export default class AbstractPopup extends PIXI.Graphics {
    
    /**
     * Creates an instance of an AbstractPopup (only for internal use).
     * 
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the popup.
     * @param {number} [opts.id=auto generated] - The id of the popup.
     * @param {number} [opts.x=0] - The x position of the popup. Can be also set after creation with popup.x = 0.
     * @param {number} [opts.y=0] - The y position of the popup. Can be also set after creation with popup.y = 0.
     * @param {string|Theme} [opts.theme=dark] - The theme to use for this popup. Possible values are dark, light, red
     *     or a Theme object.
     * @param {string|number|PIXI.Text} [opts.header] - The heading inside the popup as a string, a number (will be
     *     converted to a text) or as a PIXI.Text object.
     * @param {string|number|PIXI.DisplayObject} [opts.content] - A text, a number (will be converted to a text) or
     *     an PIXI.DisplayObject as the content of the popup.
     * @param {number} [opts.minWidth=320] - The minimum width of the popup.
     * @param {number} [opts.minHeight=130] - The minimum height of the popup.
     * @param {number} [opts.padding=Theme.padding] - The inner spacing (distance from header and content) the the border.
     * @param {number} [opts.fill=Theme.fill] - The color of the button background as a hex value.
     * @param {number} [opts.fillAlpha=Theme.fillAlpha] - The alpha value of the background.
     * @param {number} [opts.stroke=Theme.stroke] - The color of the border as a hex value.
     * @param {number} [opts.strokeWidth=Theme.strokeWidth] - The width of the border in pixel.
     * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
     * @param {object} [opts.headerStyle=Theme.textStyleLarge] - A textstyle object for the styling of the header. See PIXI.TextStyle
     *     for possible options.
     * @param {object} [opts.textStyle=Theme.textStyleSmall] - A textstyle object for the styling of the text. See PIXI.TextStyle
     *     for possible options.
     * @param {number} [opts.radius=Theme.radius] - The radius of the four corners of the popup (which is a rounded rectangle).
     * @param {hiddenCallback} [opts.onHidden] - Executed when the popup gets hidden.
     * @param {boolean} [opts.visible=true] - Is the popup initially visible (property visible)?
     * @param {string} [opts.orientation] - When set to portrait, the popup cannot be displayed in landscape mode. When set
     *     to landscape, the popup cannot be displayed in portrait mode.
     */
    constructor(opts = {}) {

        super()
        
        const theme = Theme.fromString(opts.theme)
        this.theme = theme

        this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            x: 0,
            y: 0,
            header: null,                       // null or null
            content: null,                      // null or String or PIXI.DisplayObject
            minWidth: 320,
            minHeight: 130,
            maxWidth: null,
            padding: theme.padding,
            fill: theme.fill,
            fillAlpha: theme.fillAlpha,
            stroke: theme.stroke,
            strokeWidth: theme.strokeWidth,
            strokeAlpha: theme.strokeAlpha,
            headerStyle: theme.textStyleLarge,
            textStyle: theme.textStyleSmall,
            radius: theme.radius,
            onHidden: null,
            visible: true,
            orientation: null
        }, opts)

        this.id = this.opts.id

        this.headerStyle = new PIXI.TextStyle(this.opts.headerStyle)
        this.textStyle = new PIXI.TextStyle(this.opts.textStyle)

        if (this.opts.maxWidth) {
            this.headerStyle.wordWrap = true
            this.headerStyle.wordWrapWidth = this.opts.maxWidth - (2 * this.opts.padding)

            this.textStyle.wordWrap = true
            this.textStyle.wordWrapWidth = this.opts.maxWidth - (2 * this.opts.padding)
        }

        this.alpha = 0
        this.visible = this.opts.visible

        this._header = null
        this._content = null

        // position
        this.x = this.opts.x
        this.y = this.opts.y

        // padding
        this.innerPadding = this.opts.padding * 1.5
        
        // interaction
        //-----------------
        this.interactive = true
        this.on('added', e => {
            this.show()
        })
    }
    
    /**
     * Creates the framework and instantiates everything.
     * 
     * @private
     * @return {AbstractPopup} A reference to the popup for chaining.
     */
    setup() {

        // position
        //-----------------
        this.sy = this.opts.padding

        // header
        //-----------------
        if (this.opts.header != null) {

            let header = null

            if (this.opts.header instanceof PIXI.Text) {
                header = this.opts.header
            } else if (typeof this.opts.header === 'number') {
                header =  new PIXI.Text(this.opts.header.toString(), this.headerStyle)
            } else {
                header =  new PIXI.Text(this.opts.header, this.headerStyle)
            }

            header.x = this.opts.padding
            header.y = this.sy

            this.addChild(header)

            this.sy += header.height

            this._header = header
        }

        if (this.opts.header && this.opts.content) {
            this.sy += this.innerPadding
        }

        // content
        //-----------------
        if (this.opts.content != null) {

            let content = null

            if (typeof this.opts.content === 'string') {
                content = new PIXI.Text(this.opts.content, this.textStyle)
            } else if (typeof this.opts.content === 'number') {
                content = new PIXI.Text(this.opts.content.toString(), this.textStyle)
            } else {
                content = this.opts.content
            }

            content.x = this.opts.padding
            content.y = this.sy

            this.sy += content.height

            this.addChild(content)

            this._content = content
        }

        return this
    }
    
    /**
     * Should be called to refresh the layout of the popup. Can be used after resizing.
     * 
     * @return {AbstractPopup} A reference to the popup for chaining.
     */
    layout() {
        
        // wanted width & wanted height
        //-----------------
        const padding = this.opts.padding
        const size = this.getInnerSize()
        const width = size.width + (2 * padding)
        const height = size.height + (2 * padding)

        this.wantedWidth = Math.max(width, this.opts.minWidth)
        this.wantedHeight = Math.max(height, this.opts.minHeight)
        
        if (this.opts.maxWidth) {
            this.wantedWidth = Math.min(this.wantedWidth, this.opts.maxWidth)
        }

        if (this.opts.radius * 2 > this.wantedWidth) {
            this.wantedWidth = this.opts.radius * 2
        }

        if (this.opts.radius * 2 > this.wantedHeight) {
            this.wantedHeight = this.opts.radius * 2
        }

        switch (this.opts.orientation) {
            case 'portrait':
                if (this.wantedWidth > this.wantedHeight) {
                    this.wantedHeight = this.wantedWidth
                }
                break
            case 'landscape':
                if (this.wantedHeight > this.wantedWidth) {
                    this.wantedWidth = this.wantedHeight
                }
                break
        }

        this.draw()

        return this
    }
    
    /**
     * Draws the canvas.
     * 
     * @private
     * @return {AbstractPopup} A reference to the popup for chaining.
     */
    draw() {

        const square = Math.round(this.wantedWidth) === Math.round(this.wantedHeight)
        const diameter = Math.round(this.opts.radius * 2)

        this.clear()
        this.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha)
        this.beginFill(this.opts.fill, this.opts.fillAlpha)
        if (square && diameter === this.wantedWidth) {
            this.drawCircle(this.wantedWidth / 2, this.wantedHeight / 2, this.opts.radius)
        } else {
            this.drawRoundedRect(0, 0, this.wantedWidth, this.wantedHeight, this.opts.radius)
        }
        this.endFill()

        return this
    }
    
    /**
     * Calculates the size of the children of the AbstractPopup.
     * Cannot use getBounds() because it is not updated when children
     * are removed.
     * 
     * @private
     * @returns {object} An JavaScript object width the keys width and height.
     */
    getInnerSize() {

        let width = 0
        let height = 0

        if (this._header) {
            width = this._header.width
            height = this._header.height
        }

        if (this._header && this._content) {
            height += this.innerPadding
        }

        if (this._content) {
            width = Math.max(width, this._content.width)
            height += this._content.height
        }

        return {width, height}
    }
    
    /**
     * Shows the popup (sets his alpha values to 1).
     * 
     * @param {callback} [cb] - Executed when show animation was completed.
     * @return {AbstractPopup} A reference to the popup for chaining.
     */
    show(cb) {

        //O TweenLite.to(this, this.theme.fast, {
        Tween.to(this, this.theme.fast, {
            alpha: 1,
            onComplete: () => {
                if (cb) {
                    cb.call(this)
                }
            }
        })

        return this
    }
    
    /**
     * Hides the popup (sets his alpha values to 0).
     * 
     * @param {callback} [cb] - Executed when hide animation was completed.
     * @return {AbstractPopup} A reference to the popup for chaining.
     */
    hide(cb) {

        //O TweenLite.to(this, this.theme.fast, {
        Tween.to(this, this.theme.fast, {
            alpha: 0,
            onComplete: () => {
                this.visible = false
                if (cb) {
                    cb.call(this)
                }
            }
        })

        if (this.opts.onHidden) {
            this.opts.onHidden.call(this, this)
        }

        return this
    }

    /**
     * Sets or gets the header. The getter always returns a PIXI.Text object. The setter can receive
     * a string, a number or a PIXI.Text object.
     * 
     * @member {string|number|PIXI.Text}
     */
    get header() {
        return this._header
    }
    set header(value) {
        if (this._header) {
            this._header.destroy()
        }
        this.opts.header = value
        this.setup().layout()
    }
    
    /**
     * Sets or gets the content. The getter always returns an PIXI.DisplayObject. The setter can receive
     * a string, a number or a PIXI.DisplayObject.
     * 
     * @member {string|number|PIXI.DisplayObject}
     */
    get content() {
        return this._content
    }
    set content(value) {
        if (this._content) {
            this._content.destroy()
        }
        this.opts.content = value
        this.setup().layout()
    }
}
