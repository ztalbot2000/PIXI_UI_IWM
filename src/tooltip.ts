import * as PIXI from 'pixi.js'

import AbstractPopup from './abstractpopup'
import Theme from './theme'

//
// Class that represents a PixiJS Tooltip.
//
// @example
// // Create the app
// const app = new PIXIApp({
//     view: canvas,
//     width: 900,
//     height: 250
// }).setup().run()
//
// // Add an DisplayObject to the app
// const circle = new PIXI.Graphics()
// circle.beginFill(0x5251a3)
// circle.drawCircle(50, 50, 40)
// app.scene.addChild(circle)
//
// const tooltip = new Tooltip({
//     object: circle,
//     container: app.scene,
//     content: 'Das Gesetz ist der Freund des Schwachen.'
// })
//
// @class
// @extends AbstractPopup
// @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/tooltip.html|DocTest}
//

export interface TooltipOptions
{
   theme?: Theme;
   minWidth?: number;
   minHeight?: number;
   padding?: number;
   //B The Object must be a Container to add/remove children from.
   //B object?: PIXI.DisplayObject;
   object?: PIXI.Container;
   container?: PIXI.Container;
   offsetLeft?: number;
   offsetTop?: number;
   delay?: number;
   content?: string | number | PIXI.Text;
}


export default class Tooltip extends AbstractPopup
{
    //
    // Creates an instance of a Tooltip.
    //
    // @constructor
    // @param {object} [opts]
    //        - An options object to specify to style and behaviour of the tooltip.
    // @param {number} [opts.minWidth=0]
    //        - The minimum width of the tooltip.
    // @param {number} [opts.minHeight=0]
    //        - The minimum height of the tooltip.
    // @param {number} [opts.padding=Theme.padding / 2]
    //        - The inner spacing of the tooltip.
    // @param {PIXI.DisplayObject} opts.object
    //        - The object, where the tooltip should be displayed.
    // @param {PIXI.DisplayObject} [opts.container=object]
    //        - The container where the tooltip should be attached to.
    // @param {number} [opts.offsetLeft=8]
    //        - The horizontal shift of the tooltip.
    // @param {number} [opts.offsetTop=-8]
    //        - The vertical shift of the tooltip.
    // @param {number} [opts.delay=0]
    //        - A delay, after which the tooltip should be opened.
    //

    private timeout:  number

    constructor(opts:TooltipOptions = {})
    {
        const theme = Theme.fromString(opts.theme)

        opts = Object.assign({},
        {
            minWidth: 0,
            minHeight: 0,
            //B padding does not exist on theme
            //B padding: theme.padding / 2,
            padding: theme.opts.padding / 2,
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

    //
    // Creates children and instantiates everything.
    //
    // @protected
    // @return {Tooltip} A reference to the tooltip for chaining.
    //
    protected setup(): Tooltip
    {
        super.setup()

        // bind events this
        //-----------------
        this.interactive = true

        let mouseoverTooltip = false

        //O this.on('mouseover', e =>
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.on('mouseover', (e?: PIXI.interaction.InteractionEvent ):void =>
        {
            mouseoverTooltip = true
        })

        //O this.on('mouseout', e =>
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.on('mouseout', (e?: PIXI.interaction.InteractionEvent ):void =>
        {
            mouseoverTooltip = false
            if (!mouseoverObject)
            {
                this.hide(() =>
                {
                    this.opts.container.removeChild(this)
                })
            }
        })

        //Fixme   Change objects to be a required parameter. TBD as this currently
        //Fixme   would break comparison testing.
        if ( this.opts.object === null )
           throw("Error: Volatile, no object(s) passed in. This should be changed to a required parameter instead of an option");

        // bind events object
        //-----------------
        const object = this.opts.object
        object.interactive = true

        let mouseoverObject = false

        //O object.on('mouseover', e =>
        object.on('mouseover', (e: PIXI.InteractionEvent ):void =>
        {
            this.timeout = window.setTimeout(() =>
            {
                mouseoverObject = true
                this.visible = true
                this.opts.container.addChild(this)
                this.setPosition(e)
            }, this.opts.delay * 1000)
        })

        //O object.on('mousemove', e =>
        object.on('mousemove', (e: PIXI.InteractionEvent ):void =>
        {
            if (mouseoverObject)
            {
                this.setPosition(e)
            }
        })

        //O object.on('mouseout', e =>
        // @ts-ignore error TS6133: 'e' is declared but never read
        object.on('mouseout', (e?: PIXI.interaction.InteractionEvent ):void =>
        {
            mouseoverObject = false
            window.clearTimeout(this.timeout)
            if (!mouseoverTooltip)
            {
                this.hide(() =>
                {
                    this.opts.container.removeChild(this)
                })
            }
        })

        return this
    }

    //
    // Calculates and sets the position of the tooltip.
    //
    // @private
    // @return {Tooltip} A reference to the tooltip for chaining.
    //
    private setPosition(e: PIXI.InteractionEvent): Tooltip
    {
        const position = e.data.getLocalPosition(this.opts.container)

        this.x = position.x + this.opts.offsetLeft
        this.y = position.y + this.opts.offsetTop - this.height

        return this
    }
}
