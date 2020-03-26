import Theme from './theme'
import AbstractPopup from './abstractpopup'

import Tooltip from './tooltip'
import { TooltipOptions } from './tooltip'

// The Options used by Badge
export interface BadgeOptions
{
   theme?:  Theme;
   minWidth?: number;
   minHeight?: number;
   padding?: number;
   // This can be tooltip options or the string used in creating a tooltip
   tooltip?: TooltipOptions | string;
}


//
// Class that represents a PixiJS Badge.
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
// const badge1 = new Badge({
//     object: circle,
//     container: app.scene,
//     content: 'The law is the friend of the weak'.
// })
//
// @class
// @extends AbstractPopup
// @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/badge.html|DocTest}
//
export default class Badge extends AbstractPopup
{
   //
   // Creates an instance of a Badge.
   //
   // @constructor
   // @param {object} [opts] - An options object to specify to style and behaviour of the badge.
   // @param {number} [opts.minWidth=0] - The minimum width of the badge.
   // @param {number} [opts.minHeight=0] - The minimum height of the badge.
   // @param {number} [opts.padding=Theme.padding / 2] - The inner spacing of the badge.
   // @param {string|object} [opts.tooltip] - A string for the label of the tooltip or an object to configure the tooltip. This hovers over the content.
   // @param {string|object} [opts.content] - A string for the label of the tooltip or an object to configure the tooltip. This should be required !!!
   //     to display.
   //
   protected tooltip: Tooltip;

   constructor(opts: BadgeOptions = {})
   {
      const theme = Theme.fromString(opts.theme)


      opts = Object.assign({},
      {
         minWidth: 0,
         minHeight: 0,
         //O padding: theme.padding / 2,
         padding: theme.opts.padding / 2,
         tooltip: null
      }, opts)


      super( opts )

      this.tooltip = null

      if ( this.opts.content === null )
         throw( "Error: Badge, Optional parameter content should not be optional");

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
   // @private
   // @override
   // @return {Badge} A reference to the badge for chaining.
   ///
   protected setup()
   {
      super.setup()

      // tooltip
      //-----------------
      if (this.opts.tooltip)
      {
         if (typeof this.opts.tooltip === 'string')
         {
            this.tooltip = new Tooltip({object: this, content: this.opts.tooltip})
         } else {
            this.opts.tooltip = Object.assign({}, {object: this}, this.opts.tooltip)
            this.tooltip = new Tooltip(this.opts.tooltip)
         }
     }

     return this
   }

   //
   // Should be called to refresh the layout of the badge. Can be used after resizing.
   //
   // @override
   // @return {Badge} A reference to the badge for chaining.
   //
   protected layout()
   {
      super.layout()

      //T this.content.x = this.width / 2 - this.content.width / 2 - this.opts.strokeWidth / 2
      //T Accessors must always have sane type, so use this._content
      this._content.x = this.width / 2 - this._content.width / 2 -
                        this.opts.strokeWidth / 2
      //T this.content.y = this.height / 2 - this.content.height / 2 - this.opts.strokeWidth / 2
      //T Accessors must always have sane type, so use this._content
      this._content.y = this.height / 2 - this._content.height / 2 -
                        this.opts.strokeWidth / 2

      return this
   }
}
