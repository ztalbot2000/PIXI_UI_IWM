import * as PIXI from 'pixi.js'

import Theme from './theme'
import Tooltip from './tooltip'
import  Tween  from './Ease/Tween';

interface Animated
{
   fill: number;
   fillAlpha: number;
   stroke: number;
   strokeWidth: number;
   strokeAlpha: number;
   controlFill: number;
   controlFillAlpha: number;
   controlStroke: number;
   controlStrokeWidth: number;
   controlStrokeAlpha: number;
   controlRadius: number;
}
//
// Callback for the switch action.
//
// @callback actionCallback
// @param { object } event
//        - The event object.
// @param { Switch } switch
//        - A reference to the switch ( also this refers to the switch ).
//

//
// Callback for the switch action.
//
// @callback actionActiveCallback
// @param { object } event
//        - The event object.
// @param { Switch } switch
//        - A reference to the switch ( also this refers to the switch ).
//

//
// Callback for the switch beforeAction.
//
// @callback beforeActionCallback
// @param { object } event
//        - The event object.
// @param { Switch } switch
//        - A reference to the switch ( also this refers to the switch ).
//

//
// Callback for the switch afterAction.
//
// @callback afterActionCallback
// @param { object } event
//        - The event object.
// @param { Switch } switch
//        - A reference to the switch ( also this refers to the switch ).
//

//
// Class that represents a PixiJS Switch.
//
// @example
// // Create the app
// const app = new PIXIApp(
// {
//     view: canvas,
//     width: 900,
//     height: 250
// } ).setup( ).run( )
//
// // Create the switch
// const switch1 = new Switch(
// {
//     x: 10,
//     y: 20
// } )
//
// // Add the switch to a DisplayObject
// app.scene.addChild( switch1 )
//
// @class
// @extends PIXI.Container
// @see { @link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container}
// @see { @link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/switch.html|DocTest}
//

interface SwitchOptions
{
   id?: number,
   x?: number,
   y?: number,
   width?: number,
   height?: number,
   theme?: Theme,
   fill?: number,
   fillAlpha?: number,
   fillActive?: number,
   fillActiveAlpha?: number,
   stroke?: number,
   strokeWidth?: number,
   strokeAlpha?: number,
   strokeActive?: number,
   strokeActiveWidth?: number,
   strokeActiveAlpha?: number,
   controlFill?: number,
   controlFillAlpha?: number,
   controlFillActive?: number,
   controlFillActiveAlpha?: number,
   controlStroke?: number,
   controlStrokeWidth?: number,
   controlStrokeAlpha?: number,
   controlStrokeActive?: number,
   controlStrokeActiveWidth?: number,
   controlStrokeActiveAlpha?: number,
   controlRadiusActive?: number,
   controlRadius?: number,
   duration?: number,
   durationActive?: number,
   disabled?: boolean,
   active?: boolean,
   action?: Function,
   actionActive?: Function,
   beforeAction?: Function,
   afterAction?: Function,
   // Stupid way to get around Typescript phooey
   tooltip?: null,
   visible?: boolean
}

export default class Switch extends PIXI.Container
{
   //
   // Creates an instance of a Switch.
   //
   // @constructor
   // @param { object } [ opts ]
   //        - An options object to specify to style and behaviour of the switch.
   // @param { number } [ opts.id=auto generated ]
   //        - The id of the switch.
   // @param { number } [ opts.x=0 ]
   //        - The x position of the switch. Can be also set after creation with switch.x = 0.
   // @param { number } [ opts.y=0 ]
   //        - The y position of the switch. Can be also set after creation with switch.y = 0.
   // @param { string|Theme } [ opts.theme=dark ]
   //        - The theme to use for this switch. Possible values are dark, light, red
   //     or a Theme object.
   // @param { number } [ opts.width=44 ]
   //        - The width of the switch.
   // @param { number } [ opts.height=28 ]
   //        - The height of the switch.
   // @param { number } [ opts.fill=Theme.fill ]
   //        - The color of the switch background as a hex value.
   // @param { number } [ opts.fillAlpha=Theme.fillAlpha ]
   //        - The alpha value of the background.
   // @param { number } [ opts.fillActive=Theme.fillActive ]
   //        - The color of the switch background when activated.
   // @param { number } [ opts.fillActiveAlpha=Theme.fillActiveAlpha ]
   //        - The alpha value of the background when activated.
   // @param { number } [ opts.stroke=Theme.stroke ]
   //        - The color of the border as a hex value.
   // @param { number } [ opts.strokeWidth=Theme.strokeWidth ]
   //        - The width of the border in pixel.
   // @param { number } [ opts.strokeAlpha=Theme.strokeAlpha ]
   //        - The alpha value of the border.
   // @param { number } [ opts.strokeActive=Theme.strokeActive ]
   //        - The color of the border when activated.
   // @param { number } [ opts.strokeActiveWidth=Theme.strokeActiveWidth ]
   //        - The width of the border in pixel when activated.
   // @param { number } [ opts.strokeActiveAlpha=Theme.strokeActiveAlpha ]
   //        - The alpha value of the border when activated.
   // @param { number } [ opts.controlFill=Theme.stroke ]
   //        - The color of the switch control background as a hex value.
   // @param { number } [ opts.controlFillAlpha=Theme.strokeAlpha ]
   //        - The alpha value of the background.
   // @param { number } [ opts.controlFillActive=Theme.stroke ]
   //        - The color of the switch control background when activated.
   // @param { number } [ opts.controlFillActiveAlpha=Theme.strokeAlpha ]
   //        - The alpha value of the background when activated.
   // @param { number } [ opts.controlStroke=Theme.stroke ]
   //        - The color of the border as a hex value.
   // @param { number } [ opts.controlStrokeWidth=Theme.strokeWidth * 0.8 ]
   //        - The width of the border in pixel.
   // @param { number } [ opts.controlStrokeAlpha=Theme.strokeAlpha ]
   //        - The alpha value of the border.
   // @param { number } [ opts.controlStrokeActive=Theme.stroke ]
   //        - The color of the border when activated.
   // @param { number } [ opts.controlStrokeActiveWidth=Theme.strokeActiveWidth * 0.8 ]
   //        - The width of the border in pixel when activated.
   // @param { number } [ opts.controlStrokeActiveAlpha=Theme.strokeActiveAlpha ]
   //        - The alpha value of the border when activated.
   // @param { number } [ opts.duration=Theme.fast ]
   //        - The duration of the animation when the switch gets activated in seconds.
   // @param { number } [ opts.durationActive=Theme.fast ]
   //        - The duration of the animation when the switch gets deactivated in seconds.
   // @param { boolean } [ opts.disabled=false ]
   //        - Is the switch disabled? When disabled, the switch has a lower alpha value
   //     and cannot be clicked ( interactive is set to false ).
   // @param { boolean } [ opts.active=false ]
   //        - Is the button initially active?
   // @param { actionCallback } [ opts.action ]
   //        - Executed when the switch was triggered in inactive state ( by pointerup ).
   // @param { actionActiveCallback } [ opts.actionActive ]
   //        - Executed when the button was triggered in active state ( by pointerup ).
   // @param { beforeActionCallback } [ opts.beforeAction ]
   //        - Executed before an action is triggered.
   // @param { afterActionCallback } [ opts.afterAction ]
   //        - Executed after an action was triggered.
   // @param { string|object } [ opts.tooltip ]
   //        - A string for the label of the tooltip or an object to configure the tooltip
   //     to display.
   // @param { boolean } [ opts.visible=true ]
   //        - Is the switch initially visible ( property visible )?
   //

   readonly id: number;
   private opts: SwitchOptions
   private switchObj: PIXI.Graphics
   private radius: number
   private _disabled: boolean
   private control: PIXI.Graphics
   private _active: boolean
   private theme: Theme
   private xActive: number
   private xInactive: number
   protected tooltip: Tooltip

   private tempAnimated: Animated

   constructor( opts: SwitchOptions = { } )
   {
      super( )

      const theme = Theme.fromString( opts.theme )
      this.theme = theme

      this.opts = Object.assign( { },
      {
         id: PIXI.utils.uid( ),
         x: 0,
         y: 0,
         width: 44,
         height: 28,
         fill: theme.opts.fill,
         fillAlpha: theme.opts.fillAlpha,
         fillActive: theme.opts.primaryColor,
         fillActiveAlpha: theme.opts.fillActiveAlpha,
         stroke: theme.opts.stroke,
         strokeWidth: theme.opts.strokeWidth,
         strokeAlpha: theme.opts.strokeAlpha,
         strokeActive: theme.opts.primaryColor,
         strokeActiveWidth: theme.opts.strokeActiveWidth,
         strokeActiveAlpha: theme.opts.strokeActiveAlpha,
         controlFill: theme.opts.stroke,
         controlFillAlpha: theme.opts.strokeAlpha,
         controlFillActive: theme.opts.stroke,
         controlFillActiveAlpha: theme.opts.strokeAlpha,
         controlStroke: theme.opts.stroke,
         controlStrokeWidth: theme.opts.strokeWidth * .8,
         controlStrokeAlpha: theme.opts.strokeAlpha,
         controlStrokeActive: theme.opts.stroke,
         controlStrokeActiveWidth: theme.opts.strokeActiveWidth * .8,
         controlStrokeActiveAlpha: theme.opts.strokeActiveAlpha,
         duration: theme.opts.fast,
         durationActive: theme.opts.fast,
         disabled: false,
         active: false,
         action: null,
         actionActive: null,
         beforeAction: null,
         afterAction: null,
         tooltip: null,
         visible: true
      }, opts )

      this.opts.controlRadius = this.opts.controlRadius || ( this.opts.height / 2 )
      this.opts.controlRadiusActive = this.opts.controlRadiusActive || this.opts.controlRadius

      // Validation
      //-----------------
      if ( this.opts.height > this.opts.width )
      {
         this.opts.height = this.opts.width
      }

      // Properties
      //-----------------
      this.id = this.opts.id
      this.radius = this.opts.height / 2

      this._active = null
      this._disabled = null

      this.switchObj = null
      this.control = null
      this.tooltip = null

      this.visible = this.opts.visible

      // animated
      //-----------------
      this.tempAnimated =
      {
         fill: this.opts.fill,
         fillAlpha: this.opts.fillAlpha,
         stroke: this.opts.stroke,
         strokeWidth: this.opts.strokeWidth,
         strokeAlpha: this.opts.strokeAlpha,
         controlFill: this.opts.controlFill,
         controlFillAlpha: this.opts.controlFillAlpha,
         controlStroke: this.opts.controlStroke,
         controlStrokeWidth: this.opts.controlStrokeWidth,
         controlStrokeAlpha: this.opts.controlStrokeAlpha,
         controlRadius: this.opts.controlRadius
      }

      // setup
      //-----------------
      this.setup( )

      // layout
      //-----------------
      this.layout( )
   }

   //
   // Creates children and instantiates everything.
   //
   // @private
   // @return { Switch } A reference to the switch for chaining.
   //
   setup( ): Switch
   {
      // Switch
      //-----------------
      let switchObj = new PIXI.Graphics( )
      this.switchObj = switchObj
      this.addChild( switchObj )

      // Control
      //-----------------
      this.xInactive = this.opts.controlRadius
      this.xActive = this.opts.width - this.opts.controlRadiusActive

      let control = new PIXI.Graphics( )
      control.x = this.opts.active ? this.xActive : this.xInactive
      control.y = this.opts.height / 2

      this.control = control

      this.addChild( this.control )

      // interaction
      //-----------------
      // @ts-ignore error TS6133: 'e' is declared but never read
      this.switchObj.on( 'pointerover', (e?: PIXI.interaction.InteractionEvent ):void =>
      {
         //TweenLite.to( this.control, this.theme.fast, { alpha: .83 } )
         Tween.to( this.control, this.theme.opts.fast, { alpha: .83 } )
      })

      // @ts-ignore error TS6133: 'e' is declared but never read
      this.switchObj.on( 'pointerout', (e?: PIXI.interaction.InteractionEvent ):void =>
      {
         //O TweenLite.to( this.control, this.theme.fast, { alpha: 1 } )
         Tween.to( this.control, this.theme.opts.fast, { alpha: 1 } )
      })

      // @ts-ignore error TS6133: 'e' is declared but never read
      this.switchObj.on( 'pointerdown', (e?: PIXI.interaction.InteractionEvent ):void =>
      {
         //O TweenLite.to( this.control, this.theme.fast, { alpha: .7 } )
         Tween.to( this.control, this.theme.opts.fast, { alpha: .7 } )
      })

      // @ts-ignore error TS6133: 'e' is declared but never read
      this.switchObj.on( 'pointerup', (e?: PIXI.interaction.InteractionEvent ):void =>
      {
         if ( this.opts.beforeAction )
         {
             this.opts.beforeAction.call( this, e, this )
         }

         this.active = !this.active

         if ( this.active )
         {
             if ( this.opts.action )
             {
                 this.opts.action.call( this, e, this )
             }
         } else
         {
             if ( this.opts.actionActive )
             {
                 this.opts.actionActive.call( this, e, this )
             }
         }

         //O TweenLite.to( this.control, this.theme.fast, { alpha: .83 } )
         Tween.to( this.control, this.theme.opts.fast, { alpha: .83 } )

         if ( this.opts.afterAction )
         {
             this.opts.afterAction.call( this, e, this )
         }
      })

      // disabled
      //-----------------
      this.disabled = this.opts.disabled

      // active
      //-----------------
      this.active = this.opts.active

      // tooltip
      //-----------------
      if ( this.opts.tooltip )
      {
         if ( typeof this.opts.tooltip === 'string' )
         {
             this.tooltip = new Tooltip(
             {
                 object: this,
                 content: this.opts.tooltip
             })
         }
         else
         {
             // @ts-ignore TS2531: Object is possibly 'null'.  Why. It's checked above?
             this.opts.tooltip.object = this

             this.tooltip = new Tooltip( this.opts.tooltip )
         }
      }

      return this
   }

   //
   // Should be called to refresh the layout of the switch. Can be used after resizing.
   //
   // @return { Switch } A reference to the switch for chaining.
   //
   layout( ): Switch
   {
      // set position
      //-----------------
      this.position.set( this.opts.x, this.opts.y )

      // draw
      //-----------------
      this.draw( )

      return this
   }

   //
   // Draws the switch to the canvas.
   //
   // @private
   // @return { Switch } A reference to the switch for chaining.
   //
   draw( ): Switch
   {
      this.switchObj.clear( )
      if ( this.active )
      {
         this.switchObj.lineStyle( this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha )
         //V5 this.switchObj.beginFill( this.opts.fillActive, this.opts.fillActiveAlpha )
         this.switchObj.beginFill( this.opts.fillActive )
         this.switchObj.alpha = this.opts.fillActiveAlpha
      }
      else
      {
         this.switchObj.lineStyle( this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha )
         //V5 this.switchObj.beginFill( this.opts.fill, this.opts.fillAlpha )
         this.switchObj.beginFill( this.opts.fill )
         this.switchObj.alpha = this.opts.fillAlpha
      }
      this.switchObj.moveTo( this.radius, 0 )
      this.switchObj.lineTo( this.opts.width - this.radius, 0 )
      this.switchObj.arcTo( this.opts.width, 0, this.opts.width, this.radius, this.radius )
      this.switchObj.lineTo( this.opts.width, this.radius + 1 )                                   // BUGFIX: If not specified, there is a small area without a stroke.
      this.switchObj.arcTo( this.opts.width, this.opts.height, this.opts.width - this.radius, this.opts.height, this.radius )
      this.switchObj.lineTo( this.radius, this.opts.height )
      this.switchObj.arcTo( 0, this.opts.height, 0, this.radius, this.radius )
      this.switchObj.arcTo( 0, 0, this.radius, 0, this.radius )
      this.switchObj.endFill( )

      // Draw control
      this.control.clear( )
      if ( this.active )
      {
         this.control.lineStyle( this.opts.controlStrokeActiveWidth, this.opts.controlStrokeActive, this.opts.controlStrokeActiveAlpha )
         //V5 this.control.beginFill( this.opts.controlFillActive, this.opts.controlFillActiveAlpha )
         this.control.beginFill( this.opts.controlFillActive )
         this.control.alpha = this.opts.controlFillActiveAlpha
         this.control.drawCircle( 0, 0, this.opts.controlRadiusActive - 1 )
      }
      else
      {
         this.control.lineStyle( this.opts.controlStrokeWidth, this.opts.controlStroke, this.opts.controlStrokeAlpha )
         //V5 this.control.beginFill( this.opts.controlFill, this.opts.controlFillAlpha )
         this.control.beginFill( this.opts.controlFill )
         this.control.alpha = this.opts.controlFillAlpha
         this.control.drawCircle( 0, 0, this.opts.controlRadius - 1 )
      }
      this.control.endFill( )

      return this
   }

   //
   // Draws the animation.
   //
   // @private
   // @return { Switch } A reference to the switch for chaining.
   //
   drawAnimated( ): Switch
   {
      this.switchObj.clear( )
      this.switchObj.lineStyle( this.tempAnimated.strokeWidth, this.tempAnimated.stroke, this.tempAnimated.strokeAlpha )
      //V5 this.switchObj.beginFill( this.tempAnimated.fill, this.tempAnimated.fillAlpha )
      this.switchObj.beginFill( this.tempAnimated.fill )
      this.switchObj.alpha = this.tempAnimated.fillAlpha
      this.switchObj.moveTo( this.radius, 0 )
      this.switchObj.lineTo( this.opts.width - this.radius, 0 )
      this.switchObj.arcTo( this.opts.width, 0, this.opts.width, this.radius, this.radius )
      this.switchObj.lineTo( this.opts.width, this.radius + 1 )                                   // BUGFIX: If not specified, there is a small area without a stroke.
      this.switchObj.arcTo( this.opts.width, this.opts.height, this.opts.width - this.radius, this.opts.height, this.radius )
      this.switchObj.lineTo( this.radius, this.opts.height )
      this.switchObj.arcTo( 0, this.opts.height, 0, this.radius, this.radius )
      this.switchObj.arcTo( 0, 0, this.radius, 0, this.radius )
      this.switchObj.endFill( )

      this.control.clear( )
      this.control.lineStyle( this.tempAnimated.controlStrokeWidth, this.tempAnimated.controlStroke, this.tempAnimated.controlStrokeAlpha )
      //V5 this.control.beginFill( this.tempAnimated.controlFill, this.tempAnimated.controlFillAlpha )
      this.control.beginFill( this.tempAnimated.controlFill )
      this.control.alpha = this.tempAnimated.controlFillAlpha
      this.control.drawCircle( 0, 0, this.tempAnimated.controlRadius - 1 )
      this.control.endFill( )

      return this
   }

   //
   // Gets or sets the active state.
   //
   // @member { boolean}
   //
   get active( ): boolean
   {
      return this._active
   }

   set active( value: boolean )
   {

      this._active = value

      if ( this._active )
      {
         Tween.to( this.control, this.opts.duration, { x: this.xActive } )
         Tween.to( this.tempAnimated, this.opts.duration,
         {
             colorProps:
             {
                 fill: this.opts.fillActive,
                 stroke: this.opts.strokeActive,
                 controlFill: this.opts.controlFillActive,
                 controlStroke: this.opts.controlStrokeActive,
                 format: 'number'
             },
             fillAlpha: this.opts.fillActiveAlpha,
             strokeWidth: this.opts.strokeActiveWidth,
             strokeAlpha: this.opts.strokeActiveAlpha,
             controlFillAlpha: this.opts.controlFillActiveAlpha,
             controlStrokeWidth: this.opts.controlStrokeActiveWidth,
             controlStrokeAlpha: this.opts.controlStrokeActiveAlpha,
             controlRadius: this.opts.controlRadiusActive,
             onUpdate: ( ) => this.drawAnimated( ),
             onComplete: ( ) => this.draw( )
         } )


      }
      else
      {
         Tween.to( this.control, this.opts.durationActive, { x: this.xInactive } )
         Tween.to( this.tempAnimated, this.opts.durationActive,
         {
             colorProps:
             {
                 fill: this.opts.fill,
                 stroke: this.opts.stroke,
                 controlFill: this.opts.controlFill,
                 controlStroke: this.opts.controlStroke,
                 format: 'number'
             },
             fillAlpha: this.opts.fillAlpha,
             strokeWidth: this.opts.strokeWidth,
             strokeAlpha: this.opts.strokeAlpha,
             controlFillAlpha: this.opts.controlFillAlpha,
             controlStrokeWidth: this.opts.controlStrokeWidth,
             controlStrokeAlpha: this.opts.controlStrokeAlpha,
             controlRadius: this.opts.controlRadius,
             onUpdate: ( ) => this.drawAnimated( ),
             onComplete: ( ) => this.draw( )
         } )
      }
   }

   //
   // Gets or sets the disabled state. When disabled, the switch cannot be clicked.
   //
   // @member { boolean}
   //
   get disabled( ): boolean
   {
      return this._disabled
   }

   set disabled( value: boolean )
   {

      this._disabled = value

      if ( this._disabled )
      {
         this.switchObj.interactive = false
         this.switchObj.buttonMode = false
         this.switchObj.alpha = .5
         this.control.alpha = .5
      }
      else
      {
         this.switchObj.interactive = true
         this.switchObj.buttonMode = true
         this.switchObj.alpha = 1
         this.control.alpha = 1
      }
   }

   //
   // Shows the switch ( sets his alpha values to 1 ).
   //
   // @return { Switch } A reference to the switch for chaining.
   //
   show( ): Switch
   {
      this.opts.strokeAlpha = 1
      this.opts.strokeActiveAlpha = 1
      this.opts.fillAlpha = 1
      this.opts.fillActiveAlpha = 1
      this.opts.controlStrokeAlpha = 1
      this.opts.controlStrokeActiveAlpha = 1
      this.opts.controlFillAlpha = 1
      this.opts.controlFillActiveAlpha = 1

      this.layout( )

      return this
   }

   //
   // Hides the switch ( sets his alpha values to 1 ).
   //
   // @return { Switch } A reference to the switch for chaining.
   //
   hide( ): Switch
   {
      this.opts.strokeAlpha = 0
      this.opts.strokeActiveAlpha = 0
      this.opts.fillAlpha = 0
      this.opts.fillActiveAlpha = 0
      this.opts.controlStrokeAlpha = 0
      this.opts.controlStrokeActiveAlpha = 0
      this.opts.controlFillAlpha = 0
      this.opts.controlFillActiveAlpha = 0

      this.layout( )

      return this
   }
}
