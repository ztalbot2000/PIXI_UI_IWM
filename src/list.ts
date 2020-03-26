import * as PIXI from 'pixi.js'
import PIXIApp from './app'
import { Point } from './types'

// No brackets, imports the default created Tween Instance from new.
import  Tween  from './Ease/Tween';

// No brackets, imports the default created Ease Instance from new.
import Ease from './Ease/Ease';


//O import Events from '../events.js'

//
// Class that represents a PixiJS List.
//
// @example
// const elephant1 = PIXI.Sprite.from( './assets/elephant-1.jpg' )
// const elephant2 = PIXI.Sprite.from( './assets/elephant-2.jpg' )
//
// // Create the list
// const list = new List( [elephant1, elephant2] )
//
// app.scene.addChild( list )
//
// @class
// @extends PIXI.Container
// @see { @link http://pixijs.download/dev/docs/PIXI.Container.html|PixiJS Container }
// @see  { @link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/list.html|DocTest }
//
//
interface ListOptions
{
   width?: number;
   height?: number;
   padding?: number;
   margin?: number;
   orientation?: string;
   align?: string;
   verticalAlign?: string;
   app?: PIXIApp
}
export default class List extends PIXI.Container
{
   //
   // Creates an instance of a Flippable.
   //
   // @constructor
   // @param { PIXI.DisplayObject[] } items
   //        - An array of PIXI.DisplayObjects.
   // @param { object } [opts]
   //        - An options object which can contain the following properties.
   // @param { number } [opts.width]
   //        - The width of the list. If the items are larger than this width,
   //          the overflow will be hidden.
   // @param { number } [opts.height]
   //        - The height of the list. If the items are larger than
   //          this height, the overflow will be hidden.
   // @param { number } [opts.padding=10]
   //        - The inner spacing ( distance from one item to the previous/next item ).
   // @param { number } [opts.margin=10]
   //        - The outer spacing ( distance from one item to the border ).
   // @param { string } [opts.orientation=vertical]
   //        - The orientation of the button group. Can be horizontal or vertical.
   // @param { string } [opts.align=left]
   //        - The horizontal position of the items. Possible values are
   //          left, center and right.
   // @param { string } [opts.verticalAlign=middle]
   //        - The vertical position of the items. Possible values are
   //          top, middle and bottom.
   // @param { PIXI.Application } [opts.app]
   //        - The PixiJS Application. Must be set if you want to use the mousewheel to
   //          scroll your list.
   //
   private opts: ListOptions
   private __items: Array< PIXI.Text >
   private __dragging: boolean
   private __mask: PIXI.Graphics
   private __delta: Point
   private container: PIXI.Container

   constructor( items: Array< PIXI.Text > = [ ], opts: ListOptions = { } )
   {
      super( )

      if ( items !== null && !Array.isArray(items))
         throw("Error: Array of items is required");

      this.opts = Object.assign( { } ,
      {
         padding: 10,
         margin: 10,
         orientation: 'vertical',
         align: 'left',
         verticalAlign: 'middle',
         width: null,
         height: null,
         app: null
      }, opts )

      this.__items = items
      this.__dragging = false

      // setup
      //--------------------
      this.setup( )
   }

   //
   // Creates children and instantiates everything.
   //
   // @private
   // @return { List } A reference to the list for chaining.
   //
   setup( ): List
   {
      // inner container
      //--------------------
      const container = new PIXI.Container( )
      this.addChild( container )
      this.container = container

      // mask
      //--------------------
      const mask = new PIXI.Graphics( )
      this.addChild( mask )
      this.__mask = mask

      // add items
      //--------------------
      for( let item of this.__items )
      {
         container.addChild( item )
      }

      // interaction
      //--------------------
      if ( this.opts.width || this.opts.height )
         this.interactive = true
      else
         this.interactive = false

      this.on( 'pointerdown', this.onStart.bind( this ) )
      this.on( 'pointermove', this.onMove.bind( this ) )
      this.on( 'pointerup', this.onEnd.bind( this ) )
      this.on( 'pointercancel', this.onEnd.bind( this ) )
      this.on( 'pointerout', this.onEnd.bind( this ) )
      this.on( 'pointerupoutside', this.onEnd.bind( this ) )
      this.on( 'scroll', this.onScroll.bind( this ) )

      // mousewheel
      //--------------------
      if ( this.opts.app )
      {
         const app = this.opts.app
         //O app.view.addEventListener( 'mousewheel', event =>
         // @ts-ignore error TS6133: 'event' is declared but never read
         app.view.addEventListener( 'mousewheel',  ( event?: WheelEvent ): void =>
         {
            let bounds: PIXI.Rectangle = null
            //B const bounds = this.mask ? this.mask.getBounds( ) : this.getBounds( )
            //B Since container already has a property of mask, the result is always
            //B true. What I believe is meant to be checked is this.__mask
            if ( this.__mask )
            {
                // Mask is of type PIXI.Graphics, it has containsPoint()
                // getBounds returns PIXI.Rectangle
               bounds = this.__mask.getBounds()
            }
            else
            {
               // this is of type PIXI.Container
               bounds = this.getBounds()
            }

            const x = event.clientX - app.view.getBoundingClientRect( ).left
            const y = event.clientY - app.view.getBoundingClientRect( ).top
            if ( bounds.contains( x, y ) )
            {
               event.preventDefault( )
               this.emit( 'scroll', event )
            }
         } )
      }

      this.layout( )

      return this
   }

   //
   // Replaces the existing items and relayouts the list.
   //
   // @param {PIXI.DisplayObject[] } items - An array of PIXI.DisplayObjects.
   // @return { List } A reference to the list for chaining.
   //
   setItems( items: Array< PIXI.Text > ): List
   {
      this.container.removeChildren( )
      this.__items = items
      for( let item of this.__items )
      {
         this.container.addChild( item )
      }
      this.layout( )

      //B Previously did not return anything
      return this;
   }

   //
   // Should be called to refresh the layout of the list ( the width or the height ).
   //
   // @return { List } A reference to the list for chaining.
   //
   layout( ): List
   {
      const margin = this.opts.margin

      let x = margin
      let y = margin

      for ( let item of this.__items )
      {

         item.x = x
         item.y = y

         if ( this.opts.orientation === 'vertical' )
         {
            y += item.height + this.opts.padding
         }
         else
         {
            x += item.width + this.opts.padding
         }
      }

      // vertical
      //--------------------
      if ( this.opts.orientation === 'vertical' )
      {
         switch ( this.opts.align )
         {
            case 'center':
               this.__items.forEach( it => it.x = margin + this.width / 2 - it.width / 2 )
               break
            case 'right':
               this.__items.forEach( it => it.x = margin + this.width - it.width )
               break
            default:
               this.__items.forEach( it => it.x = margin )
               break
         }

         if ( this.opts.height )
         {
            const mask = this.__mask
            mask.clear( )
            mask.beginFill( 0x000 )
            mask.drawRect( 0, 0, this.width + 2 * margin, this.opts.height )
            this.mask = mask

            this.interactive = this.innerHeight > this.opts.height
         }
      }

      // horizontal
      //--------------------
      if ( this.opts.orientation === 'horizontal' )
      {
         switch ( this.opts.verticalAlign )
         {
            case 'top':
               this.__items.forEach( it => it.y = margin )
               break
            case 'bottom':
               this.__items.forEach( it => it.y = margin + this.height - it.height )
               break
            default:
               this.__items.forEach( it => it.y = margin + this.height / 2 - it.height / 2 )
               break
         }

         if ( this.opts.width )
         {
            const mask = this.__mask
            mask.clear( )
            mask.beginFill( 0x000 )
            mask.drawRect( 0, 0, this.opts.width, this.height + 2 * margin )
            this.mask = mask

            this.interactive = this.innerWidth > this.opts.width
         }
      }

      return this
   }

   //
   //
   //
   get innerWidth( ): number
   {
      let size = 0

      this.__items.forEach( it => size += it.width )
      size += this.opts.padding * ( this.__items.length - 1 )
      size += 2 * this.opts.margin

      return size
   }

   //
   //
   //
   get innerHeight( ): number
   {
      let size = 0

      this.__items.forEach( it => size += it.height )
      size += this.opts.padding * ( this.__items.length - 1 )
      size += 2 * this.opts.margin

      return size
   }

   //
   // Resizes the list.
   //
   // @param { number } widthOrHeight
   //        - The new width ( if orientation is horizontal ) or
   //          height ( if orientation is vertical ) of the list.
   //
   resize( widthOrHeight: number ): void
   {
      if ( this.opts.orientation === 'horizontal' )
      {
         this.opts.width = widthOrHeight
      }
      else
      {
         this.opts.height = widthOrHeight
      }

      this.layout( )
   }

   //
   //
   // @private
   // @param { * } event
   //
   onStart( event: PIXI.interaction.InteractionEvent ): void
   {
      this.__dragging = true

      //O this.capture( event )

      this.__delta =
      {
         x: this.container.position.x - event.data.global.x,
         y: this.container.position.y - event.data.global.y
      }

/*
//killTweenOf is not on TweenLite
      TweenLite.killTweensOf( this.container.position, { x: true, y: true })

      if ( typeof ThrowPropsPlugin != "undefined" )
      {
         ThrowPropsPlugin.track( this.container.position, 'x,y' )
      }
*/
   }

   //
   //
   // @private
   // @param { * } event
   //
   onMove( event: PIXI.interaction.InteractionEvent ): void
   {
      if ( this.__dragging )
      {
         //O this.capture( event )

         if ( this.opts.orientation === 'horizontal' )
         {
            this.container.position.x = event.data.global.x + this.__delta.x
         }
         else
         {
            this.container.position.y = event.data.global.y + this.__delta.y
         }
      }
   }

   //
   //
   // @private
   // @param { * } event
   //
   // @ts-ignore error TS6133: 'event' is declared but never read
   onEnd( event: PIXI.interaction.InteractionEvent ): void
   {
      if ( this.__dragging )
      {
         this.__dragging = false

         //O this.capture( event )

/*
         const throwProps = { }

         if ( this.opts.orientation === 'horizontal' )
         {
            let min = this.opts.width - this.innerWidth
            min = min > 0 ? 0 : min
            throwProps.x =
            {
               velocity: 'auto',
               min,
               max: 0
            }
         }
         else
         {
            let min = this.opts.height - this.innerHeight
            min = min > 0 ? 0 : min
            throwProps.y =
            {
               velocity: 'auto',
               min,
               max: 0
            }
         }

         if ( typeof ThrowPropsPlugin != "undefined" )
         {
            ThrowPropsPlugin.to( this.container.position,
            {
               throwProps,
               ease: Strong.easeOut,
               onComplete: ( ) => ThrowPropsPlugin.untrack( this.container.position )
            }, .8, .4 )
         }
*/
         Tween.to(this.container, 1.5, {x: .8, y: .4}, Ease.Power2.easeOut);
      }
   }

   //
   //
   // @private
   // @param { * } event
   //
   onScroll( event: WheelEvent ): void
   {
      //O this.capture( event )

      if ( this.opts.orientation === 'horizontal' )
      {
         this.container.position.x -= event.deltaX
         if ( this.container.position.x > 0 )
         {
            this.container.position.x = 0
         }
         else if ( this.container.position.x + this.innerWidth < this.opts.width )
         {
            this.container.position.x = this.opts.width - this.innerWidth
         }
      }
      else
      {
         this.container.position.y -= event.deltaY
         if ( this.container.position.y > 0 )
         {
            this.container.position.y = 0
         }
         else
         if ( this.container.position.y + this.innerHeight < this.opts.height )
         {
            this.container.position.y = this.opts.height - this.innerHeight
         }
      }
   }

   //
   // Captures an event to inform InteractionMapper about processed events.
   //
   // @param { event|PIXI.InteractionEvent } event
   //        - The PIXI event to capture.
   //
   //O capture( event: PIXI.interaction.InteractionEvent )
   //O {
   //O    const originalEvent = event.data && event.data.originalEvent ? event.data.originalEvent : event
   //O    Events.capturedBy( originalEvent, this )
   //O }
}
