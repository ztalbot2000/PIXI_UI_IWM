import Theme from './theme.js'
import Tooltip from './tooltip.js'
import Badge from './badge.js'
//O import Events from '../events.js'
import Events from './events.js'

/**
 * Callback for the button action.
 *
 * @callback actionCallback
 * @param {object} event - The event object.
 * @param {Button} button - A reference to the button (also this refers to the button).
 */

/**
 * Callback for the button beforeAction.
 *
 * @callback beforeActionCallback
 * @param {object} event - The event object.
 * @param {Button} button - A reference to the button (also this refers to the button).
 */

/**
 * Callback for the button afterAction.
 *
 * @callback afterActionCallback
 * @param {object} event - The event object.
 * @param {Button} button - A reference to the button (also this refers to the button).
 */

/**
 * Class that represents a PixiJS Button.
 *
 * @example
 * // Create the button
 * const button = new Button({
 *     label: 'My Button',
 *     action: () => console.log('Button was clicked')
 * })
 *
 * // Add the button to a DisplayObject
 * app.scene.addChild(button)
 *
 * @class
 * @extends PIXI.Container
 * @see {@link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container}
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/button.html|DocTest}
 */
export default class Button extends PIXI.Container {

    /**
     * Creates an instance of a Button.
     *
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the button.
     * @param {number} [opts.id=auto generated] - The id of the button.
     * @param {string} [opts.label] - The label of the button.
     * @param {number} [opts.x=0] - The x position of the button. Can be also set after creation with button.x = 0.
     * @param {number} [opts.y=0] - The y position of the button. Can be also set after creation with button.y = 0.
     * @param {string|Theme} [opts.theme=dark] - The theme to use for this button. Possible values are dark, light, red
     *     or a Theme object.
     * @param {number} [opts.minWidth=44] - The minimum width of the button.
     * @param {number} [opts.minHeight=44] - The minimum height of the button.
     * @param {number} [opts.padding=Theme.padding] - The inner spacing (distance from icon and/or label) to the border.
     * @param {string|PIXI.DisplayObject} [opts.icon] - The icon of the button. Can be a predefined one, an URL or an PIXI.DisplayObject.
     * @param {string|PIXI.DisplayObject} [opts.iconActive=icon] - The icon of the button when activated. Can be a predefined one, an URL or an PIXI.DisplayObject.
     * @param {string} [opts.iconPosition=left] - The position of the icon in relation to the label. Can be left or right.
     * @param {number} [opts.iconColor=Theme.iconColor] - The color of the icon (set by the tint property) as a hex value.
     * @param {number} [opts.iconColorActive=Theme.iconColorActive] - The color of the icon when activated.
     * @param {number} [opts.fill=Theme.fill] - The color of the button background as a hex value.
     * @param {number} [opts.fillAlpha=Theme.fillAlpha] - The alpha value of the background.
     * @param {number} [opts.fillActive=Theme.fillActive] - The color of the button background when activated.
     * @param {number} [opts.fillActiveAlpha=Theme.fillActiveAlpha] - The alpha value of the background when activated.
     * @param {number} [opts.stroke=Theme.stroke] - The color of the border as a hex value.
     * @param {number} [opts.strokeWidth=Theme.strokeWidth] - The width of the border in pixel.
     * @param {number} [opts.strokeAlpha=Theme.strokeAlpha] - The alpha value of the border.
     * @param {number} [opts.strokeActive=Theme.strokeActive] - The color of the border when activated.
     * @param {number} [opts.strokeActiveWidth=Theme.strokeActiveWidth] - The width of the border in pixel when activated.
     * @param {number} [opts.strokeActiveAlpha=Theme.strokeActiveAlpha] - The alpha value of the border when activated.
     * @param {object} [opts.textStyle=Theme.textStyle] - A textstyle object for the styling of the label. See PIXI.TextStyle
     *     for possible options.
     * @param {number} [opts.textStyleActive=Theme.textStyleActive] - A textstyle object for the styling of the label when the
     *     button is activated. See PIXI.TextStyle for possible options.
     * @param {string} [opts.style=default] - A shortcut for styling options. Possible values are default, link.
     * @param {number} [opts.radius=Theme.radius] - The radius of the four corners of the button (which is a rounded rectangle).
     * @param {boolean} [opts.disabled=false] - Is the button disabled? When disabled, the button has a lower alpha value
     *     and cannot be clicked (interactive is set to false).
     * @param {boolean} [opts.active=false] - Is the button initially active?
     * @param {actionCallback} [opts.action] - Executed when the button was triggered (by pointerup).
     * @param {beforeActionCallback} [opts.beforeAction] - Executed before the main action is triggered.
     * @param {afterActionCallback} [opts.afterAction] - Executed after the main action was triggered.
     * @param {string} [opts.type=default] - The type of the button. Can be default or checkbox. When the type is
     *     checkbox, the active state is toggled automatically.
     * @param {string} [opts.align=center] - The horizontal position of the label and the icon. Possible values are
     *     left, center and right. Only affects the style when the minWidth is bigger than the width of the icon and label.
     * @param {string} [opts.verticalAlign=middle] - The vertical position of the label and the icon. Possible values are
     *     top, middle and button. Only affects the style when the minHeight is bigger than the height of the icon and label.
     * @param {string|object} [opts.tooltip] - A string for the label of the tooltip or an object to configure the tooltip
     *     to display.
     * @param {string|object} [opts.badge] - A string for the label of the badge or an object to configure the badge to display.
     *     If the parameter is an object, all badge options can be set plus the following:
     * @param {string} [opts.badge.align=right] - The horizontal alignment of the badge. Possible values: left, center, right
     * @param {string} [opts.badge.verticalAlign=top] - The vertical alignment of the badge. Possible values: top, middle, bottom
     * @param {number} [opts.badge.offsetLeft=0] - The horizontal shift of the badge.
     * @param {number} [opts.badge.offsetTop=0] - The vertical shift of the badge.
     * @param {boolean} [opts.visible=true] - Is the button initially visible (property visible)?
     */
    constructor(opts = {}) {

        super()

        const theme = Theme.fromString(opts.theme)
        this.theme = theme

        this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            label: null,
            x: 0,
            y: 0,
            minWidth: 44,
            minHeight: 44,
            padding: theme.padding,
            icon: undefined,
            iconActive: undefined,
            iconPosition: 'left',
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
            disabled: false,
            active: false,
            action: null,
            beforeAction: null,
            afterAction: null,
            type: 'default',
            align: 'center',
            verticalAlign: 'middle',
            tooltip: null,
            badge: null,
            visible: true
        }, opts)

        this.id = this.opts.id

        if (typeof this.opts.icon === 'undefined' && typeof this.opts.iconActive !== 'undefined') {
            this.opts.icon = this.opts.iconActive
        } else if (typeof this.opts.icon !== 'undefined' && typeof this.opts.iconActive === 'undefined') {
            this.opts.iconActive = this.opts.icon
        }

        if (this.opts.style === 'link') {
            Object.assign(this.opts, {strokeAlpha: 0, strokeActiveAlpha: 0, fillAlpha: 0, fillActiveAlpha: 0})
        }

        this._active = null
        this._disabled = null

        this.iconInactive = null
        this.iconActive = null
        this.text = null

        this.button = null
        this.content = null

        this.tooltip = null
        this.badge = null

        this.visible = this.opts.visible

        // setup
        //-----------------
        this.setup()
    }

    /**
     * Captures an event to inform InteractionMapper about processed events.
     *
     * @param {event|PIXI.InteractionEvent} event - The PIXI event to capture.
     */
    capture(event) {
        Events.capturedBy(event.data.originalEvent, this)
    }

    /**
     * Creates children and instantiates everything.
     *
     * @private
     * @return {Button} A reference to the button for chaining.
     */
    setup() {

        // Button
        //-----------------
        let button = new PIXI.Graphics()
        this.button = button
        this.addChild(button)

        // Content
        //-----------------
        let content = new PIXI.Container()
        this.content = content
        this.addChild(content)

        // Text
        //-----------------
        if (this.opts.label) {
            this.text = new PIXI.Text(this.opts.label, this.opts.textStyle)
        }

        // Icon
        //-----------------
        if (this.opts.icon) {
            this.iconInactive = this.loadIcon(this.opts.icon, this.opts.iconColor)
        }

        if (this.opts.iconActive) {
            this.iconActive = this.loadIcon(this.opts.iconActive, this.opts.iconColorActive)
        }

        // interaction
        //-----------------
        this.button.on('pointerover', e => {
            this.capture(e)
            TweenMax.to([this.button, this.content], this.theme.fast, {alpha: .83, overwrite: 'none'})
        })

        this.button.on('pointermove', e => {
            this.capture(e)
        })

        this.button.on('pointerout', e => {
            this.capture(e)
            TweenMax.to([this.button, this.content], this.theme.fast, {alpha: 1, overwrite: 'none'})
        })

        this.button.on('pointerdown', e => {
            //this.capture(e)
            TweenMax.to([this.button, this.content], this.theme.fast, {alpha: .7, overwrite: 'none'})
        })

        this.button.on('pointerup', e => {
            this.capture(e)
            if (this.opts.beforeAction) {
                this.opts.beforeAction.call(this, e, this)
            }

            if (this.opts.action) {
                this.opts.action.call(this, e, this)
            }

            TweenMax.to([this.button, this.content], this.theme.fast, {alpha: .83, overwrite: 'none'})

            if (this.opts.type === 'checkbox') {
                this.active = !this.active
            }

            if (this.opts.afterAction) {
                this.opts.afterAction.call(this, e, this)
            }
        })

        // disabled
        //-----------------
        this.disabled = this.opts.disabled

        // active
        //-----------------
        this.active = this.opts.active      // calls .layout()

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

        // badge
        //-----------------
        if (this.opts.badge) {
            let opts = Object.assign({}, {
                align: 'right',
                verticalAlign: 'top',
                offsetLeft: 0,
                offsetTop: 0
            })
            if (typeof this.opts.badge === 'string') {
                opts = Object.assign(opts, {content: this.opts.badge})
            } else {
                opts = Object.assign(opts, this.opts.badge)
            }

            const badge = new Badge(opts)

            switch (opts.align) {
                case 'left':
                    badge.x = this.x - badge.width / 2 + opts.offsetLeft
                    break
                case 'center':
                    badge.x = this.x + this.width / 2 - badge.width / 2 + opts.offsetLeft
                    break
                case 'right':
                    badge.x = this.x + this.width - badge.width / 2 + opts.offsetLeft
            }

            switch (opts.verticalAlign) {
                case 'top':
                    badge.y = this.y - badge.height / 2 + opts.offsetTop
                    break
                case 'middle':
                    badge.y = this.y + this.height / 2 - badge.height / 2 + opts.offsetTop
                    break
                case 'bottom':
                    badge.y = this.y + this.height - badge.height / 2 + opts.offsetTop
            }

            this.addChild(badge)

            this.badge = badge
        }

        // set position
        //-----------------
        this.position.set(this.opts.x, this.opts.y)

        return this
    }

    /**
     * Should be called to refresh the layout of the button. Can be used after resizing.
     *
     * @return {Button} A reference to the button for chaining.
     */
    layout() {

        // Clear content
        //-----------------
        this.removeChild(this.content)
        this.content = new PIXI.Container()
        this.addChild(this.content)

        // Set the icon
        //-----------------
        let icon = null

        if (!this.active && this.iconInactive) {
            icon = this.iconInactive
        } else if (this.active && this.iconActive) {
            icon = this.iconActive
        }

        // Set the text
        //-----------------
        if (this.text) {
            this.text.position.set(0, 0)
        }

        // Width and Height
        //-----------------
        let width = 0
        if (icon && this.text) {
            width = icon.width + this.text.width + 3 * this.opts.padding
        } else if (icon) {
            width = icon.width + 2 * this.opts.padding
        } else if (this.text) {
            width = this.text.width + 2 * this.opts.padding
        }

        if (width < this.opts.minWidth) {
            width = this.opts.minWidth
        }

        let height = 0
        if (icon) {
            height = icon.height + 2 * this.opts.padding
        } else if (this.text) {
            height = this.text.height + 2 * this.opts.padding
        }

        if (height < this.opts.minHeight) {
            height = this.opts.minHeight
        }

        this._width = width
        this._height = height

        // Position icon and text
        //-----------------
        if (icon && this.text) {
            if (this.opts.iconPosition === 'right') {
                icon.x = this.text.width + this.opts.padding
            } else {
                this.text.x = icon.width + this.opts.padding
            }
            this.content.addChild(icon, this.text)
        } else if (icon) {
            this.content.addChild(icon)
        } else if (this.text) {
            this.content.addChild(this.text)
        }

        this.layoutInnerContent()
        this.layoutContent()

        this.icon = icon

        // draw
        //-----------------
        this.draw()

        return this
    }

    /**
     * Calculates the positions of the content children (icon and/or text).
     *
     * @private
     * @return {Button} A reference to the button for chaining.
     */
    layoutInnerContent() {

        for (let child of this.content.children) {
            switch (this.opts.verticalAlign) {
                case 'top':
                    child.y = 0
                    break
                case 'middle':
                    child.y = this.content.height / 2 - child.height / 2
                    break
                case 'bottom':
                    child.y = this.content.height - child.height
                    break
            }
        }

        return this
    }

    /**
     * Sets the horizontal and vertical position of the content.
     * Uses the option keys "align" and "verticalAlign".
     *
     * @private
     * @return {Button} A reference to the button for chaining.
     */
    layoutContent() {

        switch (this.opts.align) {
            case 'left':
                this.content.x = this.opts.padding
                break
            case 'center':
                this.content.x = ((this._width - this.content.width) / 2)
                break
            case 'right':
                this.content.x = this._width - this.opts.padding - this.content.width
                break
        }

        switch (this.opts.verticalAlign) {
            case 'top':
                this.content.y = this.opts.padding
                break
            case 'middle':
                this.content.y = (this._height - this.content.height) / 2
                break
            case 'bottom':
                this.content.y = this._height - this.opts.padding - this.content.height
                break
        }

        return this
    }

    /**
     * Draws the canvas.
     *
     * @private
     * @return {Button} A reference to the button for chaining.
     */
    draw() {

        this.button.clear()
        if (this.active) {
            this.button.lineStyle(this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha)
            this.button.beginFill(this.opts.fillActive, this.opts.fillActiveAlpha)
        } else {
            this.button.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha)
            this.button.beginFill(this.opts.fill, this.opts.fillAlpha)
        }
        this.button.drawRoundedRect(0, 0, this._width, this._height, this.opts.radius)
        this.button.endFill()

        return this
    }

    /**
     * Gets or sets the active state.
     *
     * @member {boolean}
     */
    get active() {
        return this._active
    }
    set active(value) {

        this._active = value

        if (this._active) {
            if (this.text) {
                this.text.style = this.opts.textStyleActive
            }
        } else {
            if (this.text) {
                this.text.style = this.opts.textStyle
            }
        }

        this.layout()
    }

    /**
     * Gets or sets the disabled state. When disabled, the button cannot be clicked.
     *
     * @member {boolean}
     */
    get disabled() {
        return this._disabled
    }
    set disabled(value) {

        this._disabled = value

        if (this._disabled) {
            this.button.interactive = false
            this.button.buttonMode = false
            this.button.alpha = .5
            if (this.icon) {
                this.icon.alpha = .5
            }
            if (this.text) {
                this.text.alpha = .5
            }
        } else {
            this.button.interactive = true
            this.button.buttonMode = true
            this.button.alpha = 1
            if (this.icon) {
                this.icon.alpha = 1
            }
            if (this.text) {
                this.text.alpha = 1
            }
        }
    }

    /**
     * Shows the button (sets his alpha values to 1).
     *
     * @return {Button} A reference to the button for chaining.
     */
    show() {

        this.opts.strokeAlpha = 1
        this.opts.strokeActiveAlpha = 1
        this.opts.fillAlpha = 1
        this.opts.fillActiveAlpha = 1

        this.layout()

        return this
    }

    /**
     * Hides the button (sets his alpha values to 0).
     *
     * @return {Button} A reference to the button for chaining.
     */
    hide() {

        this.opts.strokeAlpha = 0
        this.opts.strokeActiveAlpha = 0
        this.opts.fillAlpha = 0
        this.opts.fillActiveAlpha = 0

        this.layout()

        return this
    }

    /**
     * Loads an icon
     *
     * @private
     * @param {string|PIXI.DisplayObject} icon - The icon to load.
     * @param {number} color - The color of the icon (if not an PIXI.DisplayObject).
     * @return {PIXI.DisplayObject} Return the icon as an PIXI.DisplayObject.
     */
    loadIcon(icon, color) {

        let displayObject = null

        if (icon instanceof PIXI.DisplayObject) {
            displayObject = icon
        } else {
            let size = 17
            if (this.text) {
                size = this.text.height
            } else if (this.opts.minHeight) {
                size = this.opts.minHeight - (2 * this.opts.padding)
            }

            const url = Button.iconIsUrl(icon) ? icon : `../../assets/icons/png/flat/${icon}.png`
            const iconTexture = PIXI.Texture.fromImage(url, true)

            const sprite = new PIXI.Sprite(iconTexture)
            sprite.tint = color
            sprite.width = size
            sprite.height = size

            displayObject = sprite
        }

        return displayObject
    }

    /**
     * Tests if an icon string is an url.
     *
     * @private
     * @static
     * @param {string} url - The url to test.
     * @return {boolean} true if the url is an url to an image.
     */
    static iconIsUrl(url) {
        return /\.(png|svg|gif|jpg|jpeg|tif|tiff)$/i.test(url)
    }

    /**
     * Gets or sets the color of the current icon (no matter how the status is). Changing the color, changes
     * the tint property of the icon sprite.
     *
     * @member {number}
     */
    get iconColor() {
        return this.icon ? this.icon.tint : null
    }
    set iconColor(value) {
        if (this.icon) {
            this.icon.tint = value
        }
    }
}


