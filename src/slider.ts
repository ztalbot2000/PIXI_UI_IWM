import * as PIXI from 'pixi.js'

import Theme from './theme'
import Tooltip from './tooltip'
import Tween from './Ease/Tween'

//
// Callback for the slider action onStart.
//
// @callback onStartCallback
// @param { object } event
//        - The event object.
// @param { Slider } slider
//        - A reference to the slider ( also this refers to the slider ).
//

//
// Callback for the slider action onUpdate.
//
// @callback onUpdateCallback
// @param { object } event
//        - The event object.
// @param { Slider } slider
//        - A reference to the slider ( also this refers to the slider ).
//

//
// Callback for the slider action onComplete.
//
// @callback onCompleteCallback
// @param { object } event
//        - The event object.
// @param { Slider } slider
//        - A reference to the slider ( also this refers to the slider ).
//

//
// Class that represents a PixiJS Slider.
//
// @example
// // Create the app
// const app = new PIXIApp( {
//     view: canvas,
//     width: 900,
//     height: 250
// } ).setup( ).run( )
//
// // Create the slider
// const slider = new Slider( {
//     x: 10,
//     y: 20
// } )
//
// // Add the slider to a DisplayObject
// app.scene.addChild( slider )
//
// @class
// @extends PIXI.Container
// @see { @link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container }
// @see { @link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/slider.html|DocTest }
//

// This class is created to handle the extra parameters added.
export class Control extends PIXI.Graphics
{
   public dragging: boolean
   public event: PIXI.InteractionEvent
   public delta: number
   public pointerdowned: boolean
   constructor()
   {
      super()
      this.dragging = false;
      this.delta = 0;
      this.event = null;
      this.pointerdowned = false
   }
}
export interface SliderOptions
{
   id?: number,
   x?: number,
   y?: number,
   theme?: Theme,
   width?: number,
   height?: number,
   container?: PIXI.Container,
   fill?: number,
   fillAlpha?: number,
   stroke?: number,
   strokeWidth?: number,
   strokeAlpha?: number,
   controlFill?: number,
   controlFillAlpha?: number,
   controlStroke?: number,
   controlStrokeWidth?: number,
   controlStrokeAlpha?: number,
   controlRadius?: number,
   orientation?: string,  //'horizontal' | 'vertical'
   min?: number,
   max?: number,
   value?: number,
   disabled?: boolean,
   onStart?: Function,
   onUpdate?: Function,
   onComplete?: Function,
   // Stupid way to get around Typescript phooey
   tooltip?: null,
   visible?: boolean
}

export default class Slider extends PIXI.Container
{
   //
   // Creates an instance of a Slider.
   //
   // @constructor
   // @param { object } [ opts ]
   //        - An options object to specify to style and behaviour of the slider.
   // @param { number } [ opts.id = auto generated ]
   //        - The id of the slider.
   // @param { number } [ opts.x = 0 ]
   //        - The x position of the slider. Can be also set after creation with slider.x = 0.
   // @param { number } [ opts.y = 0 ]
   //        - The y position of the slider. Can be also set after creation with slider.y = 0.
   // @param { string|Theme } [ opts.theme = dark ]
   //        - The theme to use for this slider. Possible values are dark, light, red
   //          or a Theme object.
   // @param { number } [ opts.width = 250 ]
   //        - The width of the slider.
   // @param { number } [ opts.height = 2 ]
   //        - The height of the slider.
   // @param { PIXI.DisplayObject } [ opts.container = window.app|object ]
   //        - The container where the slider events should be attached to.
   // @param { number } [ opts.fill = Theme.fill ]
   //        - The color of the slider background as a hex value.
   // @param { number } [ opts.fillAlpha = Theme.fillAlpha ]
   //        - The alpha value of the background.
   // @param { number } [ opts.stroke = Theme.stroke ]
   //        - The color of the border as a hex value.
   // @param { number } [ opts.strokeWidth = Theme.strokeWidth ]
   //        - The width of the border in pixel.
   // @param { number } [ opts.strokeAlpha = Theme.strokeAlpha ]
   //        - The alpha value of the border.
   // @param { number } [ opts.controlFill = Theme.stroke ]
   //        - The color of the slider control background as a hex value.
   // @param { number } [ opts.controlFillAlpha = Theme.strokeAlpha ]
   //        - The alpha value of the background.
   // @param { number } [ opts.controlStroke = Theme.stroke ]
   //        - The color of the border as a hex value.
   // @param { number } [ opts.controlStrokeWidth = Theme.strokeWidth * 0.8 ]
   //        - The width of the border in pixel.
   // @param { number } [ opts.controlStrokeAlpha = Theme.strokeAlpha ]
   //        - The alpha value of the border.
   // @param { number } [ opts.controlRadius = 16 ]
   //        - The radius of the slider control.
   // @param { boolean } [ opts.disabled = false  ]
   //        - Is the slider disabled? When disabled, the slider has a lower alpha value
   //          and cannot be clicked ( interactive is set to false ).
   // @param { onStartCallback } [ opts.onStart ]
   //        - Executed when the slider control starts to move.
   // @param { onUpdateCallback } [ opts.onUpdate ]
   //        - Executed when the slider control is moved.
   // @param { onCompleteCallback } [ opts.onComplete ]
   //        - Executed when the slider control was dropped.
   // @param { string|object } [ opts.tooltip ]
   //        - A string for the label of the tooltip or an object to configure the tooltip
   //          to display.
   // @param { boolean } [ opts.visible = true ]
   //        - Is the slider initially visible ( property visible )?
   //
   protected id: number
   protected theme: Theme
   protected opts: SliderOptions
   private radius: number
   private sliderObj: Control
   private _disabled: boolean
   private _value: number
   private control: Control
   protected tooltip: Tooltip
   protected pointerdowned: boolean

   constructor( opts: SliderOptions = { } )
   {
      super( )

      const theme = Theme.fromString( opts.theme )
      this.theme = theme

      this.opts = Object.assign( { },
      {
         id: PIXI.utils.uid( ),
         x: 0,
         y: 0,
         width: 250,
         height: 2,
         container: null,
         fill: theme.opts.fill,
         fillAlpha: theme.opts.fillAlpha,
         stroke: theme.opts.stroke,
         strokeWidth: theme.opts.strokeWidth,
         strokeAlpha: theme.opts.strokeAlpha,
         controlFill: theme.opts.fill,
         controlFillAlpha: .5,
         controlStroke: theme.opts.primaryColor,
         controlStrokeWidth: 2,
         controlStrokeAlpha: theme.opts.strokeAlpha,
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
      }, opts )

      this.opts.container = this.opts.container || this

      // Validation
      //-----------------
      if ( this.opts.height > this.opts.width )
      {
         this.opts.height = this.opts.width
      }

      if ( this.opts.value < this.opts.min )
      {
         this.opts.value = this.opts.min
      }

      if ( this.opts.value > this.opts.max )
      {
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
      this.setup( )

      // layout
      //-----------------
      this.layout( )
   }

   //
   // Creates children and instantiates everything.
   //
   // @private
   // @return { Slider } A reference to the slider for chaining.
   //
   private setup( ): Slider
   {
      // Container events
      //-----------------
      const container = this.opts.container

      this.on( 'pointermove', (e?: Event) =>
      {
         if ( this.control.dragging )
         {
             const moveX = this.control.event.data.getLocalPosition( this.control.parent ).x
             this._value = this.pixelToValue( moveX - this.control.delta - this.opts.controlRadius )
             let x = this.valueToPixel( this._value ) + this.opts.controlRadius
             this.control.x = x

             if ( this.opts.onUpdate )
             {
                 this.opts.onUpdate.call( this, e, this )
              }
          }
       } )

      if ( container instanceof Element )
      {
         container.addEventListener( 'pointerup', e => this.onEnd( e ), false )
         container.addEventListener( 'pointercancel', e => this.onEnd( e ), false )
         container.addEventListener( 'pointerleave', e => this.onEnd( e ), false )
         container.addEventListener( 'pointerout', e => this.onEnd( e ), false )
         container.addEventListener( 'mouseup', e => this.onEnd( e ), false )
         container.addEventListener( 'mousecancel', e => this.onEnd( e ), false )
         container.addEventListener( 'mouseleave', e => this.onEnd( e ), false )
         container.addEventListener( 'mouseout', e => this.onEnd( e ), false )
      }
      else
      {
         container.interactive = true
         container.on( 'pointerup', (e: Event ) => this.onEnd( e ) )
         container.on( 'pointercancel', (e: Event ) => this.onEnd( e ) )
         container.on( 'pointerleave', (e: Event ) => this.onEnd( e ) )
         container.on( 'pointerout', (e: Event ) => this.onEnd( e ) )
      }

      // Slider
      //-----------------
      let sliderObj = new Control( )
      this.sliderObj = sliderObj
      this.addChild( sliderObj )

      // Control
      //-----------------
      let control = new Control( )
      control.x = this.opts.controlRadius + this.valueToPixel( this.opts.value )
      control.y = this.opts.controlRadius

      // pointerdown on the control for dragndrop
      control.on( 'pointerdown', (e: PIXI.InteractionEvent ):void =>
      {
         control.event = e
         control.delta = e.data.getLocalPosition( this.control ).x
         control.dragging = true

         if ( this.opts.onStart )
          {
             this.opts.onStart.call( this, e, this )
          }
       } )

      this.control = control

      this.addChild( this.control )

      // interaction
      //-----------------
      // @ts-ignore error TS6133: 'e' is declared but never read
      this.sliderObj.on( 'pointerover', (e: PIXI.InteractionEvent ):void =>
      {
         Tween.to( this.control, this.theme.opts.fast, { alpha: .83 } )
      } )

      // @ts-ignore error TS6133: 'e' is declared but never read
      this.sliderObj.on( 'pointerout', (e: PIXI.InteractionEvent ):void =>
      {
         Tween.to( this.control, this.theme.opts.fast, { alpha: 1 } )
      } )

      // @ts-ignore error TS6133: 'e' is declared but never read
      this.sliderObj.on( 'pointerdown', (e: PIXI.InteractionEvent ):void =>
      {
         this.sliderObj.pointerdowned = true
         Tween.to( this.control, this.theme.opts.fast, { alpha: .7 } )
      } )

      // Click on the slider bar
      this.sliderObj.on( 'pointerup', (e: PIXI.InteractionEvent ):void =>
      {
         if ( this.sliderObj.pointerdowned )
         {
             this.sliderObj.pointerdowned = false
             const position = e.data.getLocalPosition( this.control.parent )
             this.value = this.pixelToValue( position.x - this.opts.controlRadius )
             Tween.to( this.control, this.theme.opts.fast, { alpha: .83 } )
         }
      } )

      // disabled
      //-----------------
      this.disabled = this.opts.disabled

      // tooltip
      //-----------------
      if ( this.opts.tooltip)
      {
         if ( typeof this.opts.tooltip=== 'string' )
         {
             this.tooltip = new Tooltip( {
                 object: this,
                 content: this.opts.tooltip
             } )
         }
         else
         {
             // @ts-ignore TS2531: Object is possibly 'null'.  Why. It's checked above?
             this.opts.tooltip.object = this
             this.tooltip = new Tooltip( this.opts.tooltip)
         }
      }

      return this
    }

   //
   // Should be called to refresh the layout of the slider. Can be used after resizing.
   //
   // @return { Slider } A reference to the slider for chaining.
   //
   private layout( ): Slider
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
   // Draws the slider to the canvas.
   //
   // @private
   // @return { Slider } - A reference to the slider for chaining.
   //
   private draw( ): Slider
   {
      const r = this.radius
      const cr = this.opts.controlRadius
      const w = this.opts.width
      const h = this.opts.height
      const x = cr + r
      const y = cr + r - h

      this.sliderObj.clear( )
      this.sliderObj.beginFill( 0xffffff, 0 )
      this.sliderObj.drawRect( 0, 0, x + w + cr, cr * 2 )
      this.sliderObj.lineStyle( this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha )
      this.sliderObj.beginFill( this.opts.fill, this.opts.fillAlpha )
      this.sliderObj.moveTo( x, y )
      this.sliderObj.lineTo( x + w, y )
      this.sliderObj.arcTo( x + w + r, y, x + w + r, y + r, r )
      this.sliderObj.lineTo( x + w + r, y + r + 1 )                     // BUGFIX: If not specified, there is a small area without a stroke.
      this.sliderObj.arcTo( x + w + r, y + h, x + w, y + h, r )
      this.sliderObj.lineTo( x, y + h )
      this.sliderObj.arcTo( x - r, y + h, x - r, y + r, r )
      this.sliderObj.arcTo( x - r, y, x, y, r )
      this.sliderObj.endFill( )

      // Draw control
      this.control.clear( )
      this.control.lineStyle( this.opts.controlStrokeWidth, this.opts.controlStroke, this.opts.controlStrokeAlpha )
      this.control.beginFill( this.opts.controlFill, this.opts.controlFillAlpha )
      this.control.drawCircle( 0, 0, cr - 1 )
      this.control.beginFill( this.opts.controlStroke, this.opts.controlStrokeAlpha )
      this.control.drawCircle( 0, 0, cr / 6 )
      this.control.endFill( )

      return this
    }

   //
   // Executed, when the slider control movement ended.
   //
   // @private
   // @return { Slider } A reference to the slider for chaining.
   //
   onEnd( e: Event ): Slider
   {

      if ( this.control.dragging )
      {
         this.control.event = null
         this.control.dragging = false
         if ( this.opts.onComplete )
         {
             this.opts.onComplete.call( this, e, this )
         }
      }

      return this
   }

   //
   // Calculates the value for a given pixel.
   //
   // @private
   // @param { number } value 
   // @returns  { number } The calculated pixel.
   //
   private valueToPixel( value: number ): number
   {
      if ( value < this.opts.min )
      {
         value = this.opts.min
       }
      else if ( value > this.opts.max )
      {
         value = this.opts.max
       }
      return this.opts.width * ( value - this.opts.min ) / ( this.opts.max - this.opts.min )
    }

   //
   // Calculates the pixel for a given value.
   //
   // @private
   // @param { number } pixel
   // @returns { number } The calculated value.
   //
   private pixelToValue( pixel: number ): number
   {
      if ( pixel < 0 )
      {
         pixel = 0
      }
      else if ( pixel > this.opts.width )
      {
         pixel = this.opts.width
      }
      return this.opts.min + ( ( this.opts.max - this.opts.min ) * pixel / this.opts.width )
   }

   //
   // Gets or sets the value.
   //
   // @member { number }
   //
   get value( ): number
   {
      return Math.round( this._value )
   }
   set value( value: number )
   {
      if ( value < this.opts.min )
      {
         value = this.opts.min
      }
      else if ( value > this.opts.max )
      {
         value = this.opts.max
      }
      this._value = value

      const x = this.valueToPixel( value ) + this.opts.controlRadius

      Tween.to( this.control, this.theme.opts.fast, { x } )
   }

   //
   // Gets or sets the disabled state. When disabled, the slider cannot be clicked.
   //
   // @member { boolean }
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
         this.interactive = false
         this.sliderObj.interactive = false
         this.control.interactive = false
         this.control.buttonMode = false
         this.alpha = .5
      }
      else
      {
         this.interactive = true
         this.sliderObj.interactive = true
         this.control.interactive = true
         this.control.buttonMode = true
         this.alpha = 1
       }
    }

   //
   // Shows the slider ( sets his alpha values to 1 ).
   //
   // @return { Slider } A reference to the slider for chaining.
   //
   show( ): Slider
   {

      this.opts.strokeAlpha = 1
      this.opts.fillAlpha = 1
      this.opts.controlStrokeAlpha = 1
      this.opts.controlFillAlpha = 1

      this.layout( )

      return this
   }

   //
   // Hides the slider ( sets his alpha values to 1 ).
   //
   // @return { Slider } A reference to the slider for chaining.
   //
   hide( ): Slider
   {
      this.opts.strokeAlpha = 0
      this.opts.fillAlpha = 0
      this.opts.controlStrokeAlpha = 0
      this.opts.controlFillAlpha = 0

      this.layout( )

      return this
   }
}
