import * as PIXI from 'pixi.js'

import  Tween  from './Ease/Tween';

import PIXIApp from './app'

import Theme from './theme'
import { InteractivePopup } from './popup'
import { AbstractPopupOptions } from './types'

//
// Class that represents a PixiJS Modal.
//
// @example
// // Create the button and the modal when clicked
// const button = new Button( {
//     label: 'Show Modal',
//     action: e => {
//         const modal = new Modal( {
//             app: app,
//             header: 'This is the header',
//             content: 'This is the text.'
//         })
//         app.scene.addChild( modal )
//     }
// })
//
// // Add the button to a DisplayObject
// app.scene.addChild( button )
//
// @class
// @extends PIXI.Container
// @extends InteractivePopup
// @see { @link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container }
// @see { @link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/modal.html|DocTest }
//

export interface ModalOptions
{
   id?: number,
   theme?: Theme,
   app?: PIXIApp
   width?: number,
   height?: number,
   header?: string | number | PIXI.Text,
   headerStyle?: PIXI.TextStyle,
   // Container added for PopupMenu
   content?: string | number | PIXI.Text | PIXI.Container,
   backgroundFill?: number,
   backgroundFillAlpha?: number,
   closeOnBackground?: boolean,
   visible?: boolean,
}

export default class Modal extends PIXI.Container
{
   //
   // Creates an instance of a Modal.
   //
   // @constructor
   // @param { object } [opts]
   //        - An options object to specify to style and behaviour of the modal.
   // @param { number } [opts.id=auto generated]
   //        - The id of the modal.
   //B app should not be optional
   // @param { PIXIApp } [opts.app=window.app]
   //        - The app where the modal belongs to.
   // @param { number } [opts.backgroundFill=Theme.background]
   //        - The color of the background.
   // @param { number } [opts.backgroundFillAlpha=0.6]
   //        - The opacity of the background.
   // @param { boolean } [opts.closeOnBackground=true]
   //        - Should the modal be closed when the user clicks the
   //     background?
   // @param { boolean } [opts.visible=true]
   //        - Is the modal initially visible ( property visible )?
   //

   protected opts: ModalOptions
   protected theme: Theme;
   protected popup: InteractivePopup;
   protected background: PIXI.Graphics
   protected id: number

   constructor( opts: ModalOptions = { } )
   {
      if ( !opts.app )
         throw( "Error: Modal, app should not be optional" )

      super( )

      this.theme = Theme.fromString( opts.theme )

      this.opts = Object.assign( { },
      {
         id: PIXI.utils.uid( ),
         //O app: window.app,
         // opts.app should be required
         app: opts.app,
         header: opts.header,
         headerStyle: opts.headerStyle,
         content: opts.content,
         //O backgroundFill: this.theme.background,
         backgroundFill: this.theme.opts.background,
         backgroundFillAlpha: .6,
         closeOnBackground: true,
         visible: true
      }, opts )

      this.id = this.opts.id

      //if ( opts.app )
      ////   this.app = opts.app

      this.background = null
      this.popup = null

      this.alpha = 0
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
   // @return { Modal } A reference to the modal for chaining.
   //
   protected setup( ): Modal
   {
      // interaction
      //-----------------
      this.interactive = true

      // @ts-ignore error TS6133: 'e' is declared but never read
      this.on( 'added', ( e?: PIXI.interaction.InteractionEvent ):void =>
      {
         if ( this.visible )
         {
            this.show( )
         }
      })

      // background
      //-----------------
      let background = new PIXI.Graphics( )
      this.background = background
      this.addChild( this.background )

      if ( this.opts.closeOnBackground )
      {
         background.interactive = true

         // @ts-ignore error TS6133: 'e' is declared but never read
         background.on( 'pointerup', ( e?: PIXI.interaction.InteractionEvent ):void =>
         {
            this.hide( )
         })
      }

      // popup
      //-----------------
      const popupOpts:AbstractPopupOptions = Object.assign( { } , this.opts,
      {
         visible: true,
         onHidden: ( ) =>
         {
            this.hide( )
         }
      })

      this.popup = new InteractivePopup( popupOpts )
      this.addChild( this.popup )
      this.popup.show( )

      return this
   }

   //
   // Should be called to refresh the layout of the modal. Can be used after resizing.
   //
   // @return { Modal } A reference to the modal for chaining.
   //
   protected layout( ): Modal
   {

      const width = this.opts.app.size.width
      const height = this.opts.app.size.height

      // background
      //-----------------
      this.background.clear( )
      //V5 this.background.beginFill( this.opts.backgroundFill, this.opts.backgroundFillAlpha )
      this.background.beginFill( this.opts.backgroundFill )
      this.background.alpha = this.opts.backgroundFillAlpha
      this.background.drawRect( 0, 0, width, height )
      this.background.endFill( )

      // position
      this.popup.x = width / 2 - this.popup.width / 2
      this.popup.y = height / 2 - this.popup.height / 2

      return this
   }

   //
   // Shows the modal ( sets his alpha values to 1 ).
   //
   // @return { Modal } A reference to the modal for chaining.
   ///
   protected show( ): Modal
   {
      //O TweenLite.to( this, this.theme.fast, { alpha: 1, onStart: ( ) => this.visible = true } )
      Tween.to( this, this.theme.opts.fast, { alpha: 1, onStart: ( ) => this.visible = true } )

      return this
   }

   //
   // Hides the modal ( sets his alpha values to 0 ).
   //
   // @return { Modal } A reference to the modal for chaining.
   ///
   protected hide( ): Modal
   {
      //O TweenLite.to( this, this.theme.fast, { alpha: 0, onComplete: ( ) => this.visible = false } )
      Tween.to( this, this.theme.opts.fast, { alpha: 0, onComplete: ( ) => this.visible = false } )

      return this
   }

   //
   // Sets or gets the header. The getter always returns a PIXI.Text object. The setter can receive
   // a string or a PIXI.Text object.
   //
   // @member { string|PIXI.Text }
   //
   get header( ): string | PIXI.Text
   {
      return this.popup._header
   }
   set header( value: string | PIXI.Text )
   {
      this.opts.header = value
      this.background.destroy( )
      this.popup.destroy( )
      this.setup( ).layout( )
   }

   //
   // Sets or gets the content. The getter always returns an PIXI.DisplayObject. The setter can receive
   // a string or a PIXI.DisplayObject.
   //
   // @member { string|PIXI.DisplayObject }
   //
   get content( ): string | number | PIXI.Text | PIXI.Container
   {
      return this.popup.content
   }
   set content( value: string | number | PIXI.Text | PIXI.Container )
   {
      if ( this.popup._content )
         this.popup._content.destroy( )

      this.opts.content = value
      this.background.destroy( )
      this.popup.destroy( )
      this.setup( ).layout( )
   }
}
