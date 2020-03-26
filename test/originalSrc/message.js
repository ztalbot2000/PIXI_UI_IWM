import Theme from './theme.js'
import {InteractivePopup} from './popup.js'

/**
 * Class that represents a Message. A message pops up and disappears after a specific amount of time.
 * 
 * @example
 * // Create the PixiJS App
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 900,
 *     height: 250
 * }).setup().run()
 * 
 * // Create a button
 * let button = new Button({
 *     label: 'Click me',
 *     action: e => {
 *         const message = new Message({
 *             app: app,
 *             header: 'Header',
 *             content: 'Text.'
 *         })
 *         app.scene.addChild(message)
 *     }
 * })
 * 
 * // Add the button to the scene
 * app.scene.addChild(button)
 *
 * @class
 * @extends InteractivePopup
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/message.html|DocTest}
 */
export default class Message extends InteractivePopup {

    /**
     * Creates an instance of a Message.
     * 
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the message.
     * @param {PIXIApp} [opts.app=window.app] - The PIXIApp where this message belongs to.
     * @param {boolean} [opts.closeButton=false] - Should a close button be displayed in the upper right corner?
     * @param {number} [opts.minWidth=280] - The minimum width of the message box. Automatically expands with the content.
     * @param {number} [opts.minHeight=100] - The minimum height of the message box. Automatically expands with the content.
     * @param {number} [opts.margin=Theme.margin] - The outer spacing of the message box.
     * @param {string} [opts.align=right] - The horizontal position of the message box relative to the app. Possible
     *     values are left, center, right.
     * @param {string} [opts.verticalAlign=top] - The vertical position of the message box relative to the app. Possible
     *     values are top, middle, bottom.
     * @param {number} [opts.duration=5] - The duration in seconds when the message box should disappear.
     * @param {boolean} [opts.autoClose=true] - Should the message box be closed automatically?
     * @param {number} [opts.closeDuration=Theme.fast] - The duration in seconds of the closing of the message box.
     */
    constructor(opts = {}) {
        
        const theme = Theme.fromString(opts.theme)

        opts = Object.assign({}, {
            app: window.app,
            closeButton: false,
            minWidth: 280,
            minHeight: 100,
            margin: theme.margin,
            align: 'right',                     // left, center, right
            verticalAlign: 'top',               // top, middle, bottom
            duration: 5,
            autoClose: true,
            closeDuration: theme.fast
        }, opts)

        super(opts)
    }

    /**
     * Relayouts the position of the message box.
     * 
     * @return {Message} Returns the message box for chaining.
     */
    layout() {

        super.layout()

        // horizontal
        switch (this.opts.align) {
            case 'left':
                this.x = this.opts.margin
                break
            case 'center':
                this.x = (this.opts.app.size.width / 2) - (this.width / 2)
                break
            case 'right':
                this.x = this.opts.app.size.width - this.opts.margin - this.width
                break
        }

        // vertical
        switch (this.opts.verticalAlign) {
            case 'top':
                this.y = this.opts.margin
                break
            case 'middle':
                this.y = (this.opts.app.size.height / 2) - (this.height / 2)
                break
            case 'bottom':
                this.y = this.opts.app.size.height - this.opts.margin - this.height
                break
        }
    }

    /**
     * Shows the message box.
     * 
     * @private
     */
    show() {

        super.show()

        if (this.opts.autoClose) {
            window.setTimeout(() => {
                this.hide()
            }, this.opts.duration * 1000)
        }
    }
}


