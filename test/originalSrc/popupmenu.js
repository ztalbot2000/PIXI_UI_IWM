import Theme from './theme.js'
import Popup from './popup.js'

/**
 * Class that represents a PixiJS PopupMenu.
 * 
 * @example
 * // Create the button and the modal when clicked
 * const button = new Button({
 *     label: 'Show PopupMenu',
 *     action: e => {
 *         const popupmenu = new PopupMenu({
 *             items: [
 *                 {label: 'Save', action: () => alert('Saved')},
 *                 {label: 'Edit', action: () => alert('Edited')},
 *                 {label: 'Delete', action: () => alert('Deleted')}
 *             ]
 *         })
 *         app.scene.addChild(popupmenu)
 *     }
 * })
 *
 * // Add the button to a DisplayObject
 * app.scene.addChild(button)
 *
 * @class
 * @extends Popup
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/popupmenu.html|DocTest}
 */
export default class PopupMenu extends Popup {
    
    /**
     * Creates an instance of a PopupMenu.
     * 
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the modal.
     * @param {object[]} [opts.items=[]] - A list of the menu items. Each item must be of type object.
     *     If an object has a label property, a PIXI.Text object is created (using the textStyle property).
     *     If an object hasn't a label property, it must contain a content property which has to be a
     *     PIXI.DisplayObject.
     * @param {number} [opts.margin=Theme.margin / 2] - The app where the modal belongs to.
     * @param {object} [opts.textStyle=Theme.textStyle] - The color of the background.
     * @param {boolean} [opts.closeOnPopup=true] - The opacity of the background.
     */
    constructor(opts = {}) {
        
        const theme = Theme.fromString(opts.theme)
        
        opts = Object.assign({}, {
            items: [],
            margin: theme.margin / 2,
            textStyle: theme.textStyle,
            closeOnPopup: true
        }, opts)

        super(opts)
    }
    
    /**
     * Creates children and instantiates everything.
     * 
     * @private
     * @return {PopupMenu} A reference to the popupmenu for chaining.
     */
    setup() {

        // content
        //-----------------
        const content = new PIXI.Container()
        
        let y = 0
        for (let item of this.opts.items) {

            let object = null

            if (item.label) {
                object = new PIXI.Text(item.label, item.textStyle || this.opts.textStyle)
            } else {
                object = item.content
            }

            object.y = y

            if (item.action) {
                if (item.disabled) {
                    object.alpha = .5
                } else {
                    object.interactive = true
                    object.buttonMode = true
                }
                object.on('pointerover', e => {
                    TweenMax.to(object, this.theme.fast, {alpha: .83, overwrite: 'none'})
                })
                object.on('pointerout', e => {
                    TweenMax.to(object, this.theme.fast, {alpha: 1, overwrite: 'none'})
                })
                object.on('pointerup', e => {
                    item.action.call(object, e, object)
                    if (this.opts.closeOnAction) {
                        this.hide()
                    }
                })
            }

            content.addChild(object)

            y += object.height + this.opts.margin
        }

        this.opts.content = content

        super.setup()
    }
}


