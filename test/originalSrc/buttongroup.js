import Theme from './theme.js'
import Button from './button.js'

/**
 * Class that represents a PixiJS ButtonGroup.
 * 
 * @example
 * // Create the button group
 * const buttonGroup = new ButtonGroup({
 *     buttons: [
 *         {label: 'Button 1', action: event => console.log(event)},
 *         {label: 'Button 2', action: event => console.log(event)},
 *         {label: 'Button 3', action: event => console.log(event)}
 *     ],
 *     minWidth: 100
 * })
 *
 * // Add the button group to a DisplayObject
 * app.scene.addChild(buttonGroup)
 *
 * @class
 * @extends PIXI.Graphics
 * @see {@link http://pixijs.download/dev/docs/PIXI.Graphics.html|PIXI.Graphics}
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/buttongroup.html|DocTest}
 */
export default class ButtonGroup extends PIXI.Graphics {

    /**
     * Creates an instance of a ButtonGroup.
     * 
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the button group.
     * @param {number} [opts.id=auto generated] - The id of the button group.
     * @param {number} [opts.x=0] - The x position of the button group. Can be also set after creation with buttonGroup.x = 0.
     * @param {number} [opts.y=0] - The y position of the button group. Can be also set after creation with buttonGroup.y = 0.
     * @param {object[]} [opts.buttons=[]] - An array of the buttons of the button group. One item of the array (one object)
     *     can have exactly the same properties as an Button object when instantiating a Button. If a property of the button group
     *     conflicts with a property of a button object, the value from the button object will be used.
     * @param {string|Theme=} [opts.theme=dark] - The theme to use for this button group. Possible values are dark, light, red
     *     or a Theme object.
     * @param {number} [opts.minWidth=44] - Button: The minimum width of one button.
     * @param {number} [opts.minHeight=44] - Button: The minimum height of one button.
     * @param {number} [opts.padding=Theme.padding] - Button: The inner spacing (distance from icon and/or label) the the border.
     * @param {number} [opts.margin=Theme.margin] - The outer spacing (distance from one button to the previous/next button).
     * @param {string} [opts.iconPosition=left] - Button: The position of the icon in relation to the label. Can be left or right.
     * @param {number} [opts.iconColor=Theme.iconColor] - Button: The color of the icon (set by the tint property) as a hex value.
     * @param {number} [opts.iconColorActive=Theme.iconColorActive] - Button: The color of the icon when activated.
     * @param {number} [opts.fill=Theme.fill] - Button: The color of the button background as a hex value.
     * @param {number} [opts.fillAlpha=Theme.fillAlpha] - Button: The alpha value of the background.
     * @param {number} [opts.fillActive=Theme.fillActive] - Button: The color of the button background when activated.
     * @param {number} [opts.fillActiveAlpha=Theme.fillActiveAlpha] - Button: The alpha value of the background when activated.
     * @param {number} [opts.stroke=Theme.stroke] - Button: The color of the border as a hex value.
     * @param {number} [opts.strokeWidth=Theme.strokeWidth] - Button: The width of the border in pixel.
     * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - Button: The alpha value of the border.
     * @param {number} [opts.strokeActive=Theme.strokeActive] - Button: The color of the border when activated.
     * @param {number} [opts.strokeActiveWidth=Theme.strokeActiveWidth] - Button: The width of the border in pixel when activated.
     * @param {number} [opts.strokeActiveAlpha=Theme.strokeActiveAlpha] - Button: The alpha value of the border when activated.
     * @param {object} [opts.textStyle=Theme.textStyle] - Button: A textstyle object for the styling of the label. See PIXI.TextStyle
     *     for possible options.
     * @param {number} [opts.textStyleActive=Theme.textStyleActive] - Button: A textstyle object for the styling of the label when the
     *     button is activated. See PIXI.TextStyle for possible options.
     * @param {string} [opts.style=default] - A shortcut for styling options. Possible values are default, link.
     * @param {number} [opts.radius=Theme.radius] - Button: The radius of the four corners of the button (which is a rounded rectangle).
     * @param {boolean} [opts.disabled=false] - Is the button group disabled? When disabled, the button group has a lower alpha value
     *     and cannot be clicked (interactive of every button is set to false).
     * @param {string} [opts.type=default] - The type of the button group. Can be default, checkbox or radio. When the type is
     *     checkbox, the active state is toggled for each button automatically. When the type is radio, only one button can
     *     be activated at the same time.
     * @param {string} [opts.orientation=horizontal] - The orientation of the button group. Can be horizontal or vertical.
     * @param {string} [opts.align=center] - Button: The horizontal position of the label and the icon. Possible values are
     *     left, center and right. Only affects the style when the minWidth is bigger than the width of the icon and label.
     * @param {string} [opts.verticalAlign=middle] - Button: The vertical position of the label and the icon. Possible values are
     *     top, middle and button. Only affects the style when the minHeight is bigger than the height of the icon and label.
     * @param {boolean} [opts.visible=true] - Is the button group initially visible (property visible)?
     */
    constructor(opts = {}) {

        super()
        
        const theme = Theme.fromString(opts.theme)
        this.theme = theme

        this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            x: 0,
            y: 0,
            buttons: [],
            minWidth: 44,
            minHeight: 44,
            padding: theme.padding,
            margin: theme.margin,
            iconPosition: 'left',             // left, right
            iconColor: theme.iconColor,
            iconColorActive: theme.iconColorActive,
            fill: theme.fill,
            fillAlpha: theme.fillAlpha,
            fillActive: theme.fillActive,
            fillActiveAlpha: theme.fillActiveAlpha,
            stroke: theme.stroke,
            strokeWidth: theme.strokeWidth,
            strokeAlpha: theme.strokeAlpha,
            strokeActive: theme.strokeActive,
            strokeActiveWidth: theme.strokeActiveWidth,
            strokeActiveAlpha: theme.strokeActiveAlpha,
            textStyle: theme.textStyle,
            textStyleActive: theme.textStyleActive,
            style: 'default',
            radius: theme.radius,
            disabled: null,
            type: 'default',                   // default, checkbox, radio
            orientation: 'horizontal',
            align: 'center',                   // left, center, right
            verticalAlign: 'middle',           // top, middle, bottom
            visible: true
        }, opts)

        this.buttons = []

        this._disabled = null
        
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
     * @return {ButtonGroup} A reference to the button group for chaining.
     */
    setup() {

        // Buttons
        //-----------------
        let position = 0

        for (let it of this.opts.buttons) {

            delete it.x
            delete it.y

            if (this.opts.orientation === 'horizontal') {
                it.x = position
            } else {
                it.y = position
            }

            it.theme = it.theme || this.opts.theme
            it.minWidth = it.minWidth || this.opts.minWidth
            it.minHeight = it.minHeight || this.opts.minHeight
            it.padding = it.padding || this.opts.padding
            it.iconPosition = it.iconPosition || this.opts.iconPosition
            it.iconColor = it.iconColor || this.opts.iconColor
            it.iconColorActive = it.iconColorActive || this.opts.iconColorActive
            it.fill = it.fill || this.opts.fill
            it.fillAlpha = it.fillAlpha || this.opts.fillAlpha
            it.fillActive = it.fillActive || this.opts.fillActive
            it.fillActiveAlpha = it.fillActiveAlpha || this.opts.fillActiveAlpha
            it.stroke = it.stroke || this.opts.stroke
            it.strokeWidth = it.strokeWidth != null ? it.strokeWidth : this.opts.strokeWidth
            it.strokeAlpha = it.strokeAlpha != null ? it.strokeAlpha : this.opts.strokeAlpha
            it.strokeActive = it.strokeActive || this.opts.strokeActive
            it.strokeActiveWidth = it.strokeActiveWidth != null ? it.strokeActiveWidth : this.opts.strokeActiveWidth
            it.strokeActiveAlpha = it.strokeActiveAlpha != null ? it.strokeActiveAlpha : this.opts.strokeActiveAlpha
            it.textStyle = it.textStyle || this.opts.textStyle
            it.textStyleActive = it.textStyleActive || this.opts.textStyleActive
            it.style = it.style || this.opts.style
            it.radius = it.radius != null ? it.radius : this.opts.radius
            if (!it.type) {
                switch (this.opts.type) {
                    case 'checkbox':
                        it.type = this.opts.type
                        break
                    default:
                        it.type = 'default'
                        break
                }
            }
            //it.type = it.type || this.opts.type || 'default'
            it.align = it.align || this.opts.align
            it.verticalAlign = it.verticalAlign || this.opts.verticalAlign
            it.afterAction = (event, button) => {
                if (this.opts.type === 'radio' && button.opts.type === 'default') {
                    this.buttons.forEach(it => {
                        if (it.opts.type === 'default') {
                            it.active = false
                        }
                    })

                    if (button.opts.type === 'default') {
                        button.active = true
                    }
                }
            }

            if (it.tooltip) {
                if (typeof it.tooltip === 'string') {
                    it.tooltip = {content: it.tooltip, container: this}
                } else {
                    it.tooltip = Object.assign({}, {container: this}, it.tooltip)
                }
            }
            
            let button = new Button(it)

            this.addChild(button)
            this.buttons.push(button)

            position += (this.opts.orientation === 'horizontal' ? button.width : button.height) + this.opts.margin
        }

        if (this.opts.orientation === 'vertical') {
            const maxWidth = this.getMaxButtonWidth()

            this.buttons.forEach(it => {
                it.opts.minWidth = maxWidth
                it.layout()
            })
        }

        // disabled
        //-----------------
        if (this.opts.disabled != null) {
            this.disabled = this.opts.disabled
        }

        return this
    }
    
    /**
     * Should be called to refresh the layout of the button group. Can be used after resizing.
     * 
     * @return {ButtonGroup} A reference to the button group for chaining.
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
     * Draws the canvas.
     * 
     * @private
     * @return {ButtonGroup} A reference to the button group for chaining.
     */
    draw() {

        if (this.opts.margin === 0) {

            this.buttons.forEach(it => it.hide())

            this.clear()
            this.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha)
            this.beginFill(this.opts.fill, this.opts.fillAlpha)
            this.drawRoundedRect(0, 0, this.width, this.height, this.opts.radius)

            // Draw borders
            this.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha / 2)

            this.buttons.forEach((it, i) => {
                if (i > 0) {
                    this.moveTo(it.x, it.y)

                    if (this.opts.orientation === 'horizontal') {
                        this.lineTo(it.x, it.height)
                    } else {
                        this.lineTo(it.width, it.y)
                    }
                    
                }
            })

            this.endFill()
        }

        return this
    }
    
    /**
     * Gets or sets the disabled state. When disabled, no button of the button group can be clicked.
     * 
     * @member {boolean}
     */
    get disabled() {
        return this._disabled
    }

    set disabled(value) {

        this._disabled = value

        this.buttons.forEach(it => it.disabled = value)
    }
    
    /**
     * Searches all buttons of the button group and returns the maximum width of one button.
     * 
     * @private
     * @return {number} The maximum with of a button of the button group.
     */
    getMaxButtonWidth() {

        let widths = this.buttons.map(it => it.width)

        return Math.max(...widths)
    }
    
    /**
     * Shows the button group (sets his alpha value to 1).
     * 
     * @return {ButtonGroup} A reference to the button group for chaining.
     */
    show() {

        this.alpha = 1

        return this
    }

    /**
     * Hides the button group (sets his alpha value to 0).
     * 
     * @return {ButtonGroup} A reference to the button group for chaining.
     */
    hide() {

        this.alpha = 0

        return this
    }
}
