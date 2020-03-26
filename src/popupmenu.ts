import * as PIXI from 'pixi.js'
import Theme from './theme'
import Popup from './popup'
import  Tween  from './Ease/Tween';

//
// Class that represents a PixiJS PopupMenu.
//
// @example
// // Create the button and the modal when clicked
// const button = new Button( {
//     label: 'Show PopupMenu',
//     action: e => {
//         const popupmenu = new PopupMenu( {
//             items: [
//                 { label: 'Save', action: ( ) => alert( 'Saved' ) },
//                 { label: 'Edit', action: ( ) => alert( 'Edited' ) },
//                 { label: 'Delete', action: ( ) => alert( 'Deleted' ) }
//             ]
//         } )
//         app.scene.addChild( popupmenu )
//     }
// } )
//
// // Add the button to a DisplayObject
// app.scene.addChild( button )
//
// @class
// @extends Popup
// @see { @link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/popupmenu.html|DocTest }
//

export interface PopupMenuItem
{
   label?: string;
   textStyle?: PIXI.TextStyle;
   action?: Function;
   disabled?: boolean;
   content?: PIXI.Graphics | PIXI.Text;
}
interface PopupMenuOptions
{
   theme?: string | Theme
   items?: Array< PopupMenuItem >;
   margin?: number;
   textStyle?: PIXI.TextStyle;
   closeOnPopup?: boolean;
}
export default class PopupMenu extends Popup
{
   //
   // Creates an instance of a PopupMenu.
   //
   // @constructor
   //
   // @param { object } [ opts ]
   //        - An options object to specify to style and behaviour of the modal.
   // @param { object[ ] } [ opts.items=[ ] ]
   //        - A list of the menu items. Each item must be of type object.
   //          If an object has a label property, a PIXI.Text object is
   //          created ( using the textStyle property ).
   //          If an object hasn't a label property, it must contain a
   //          content property which has to be a PIXI.DisplayObject.
   // @param { number } [ opts.margin=Theme.margin / 2 ]
   //        - The app where the modal belongs to.
   // @param { object } [ opts.textStyle=Theme.textStyle ]
   //        - The color of the background.
   // @param { boolean } [ opts.closeOnPopup=true ]
   //        - The opacity of the background.
   //

   constructor( opts: PopupMenuOptions = { } )
   {
      const theme = Theme.fromString( opts.theme )

      opts = Object.assign( { } ,
      {
         items: [],
         margin: theme.opts.margin / 2,
         textStyle: theme.opts.textStyle,
         closeOnPopup: true
      }, opts )

      super( opts )

      this.theme = theme
   }

   //
   // Creates children and instantiates everything.
   //
   // @private
   // @return { PopupMenu } A reference to the popupmenu for chaining.
   //
   public setup( ): this
   {
      // content
      //-----------------
      const content = new PIXI.Container( )

      let y = 0
      for ( let item of this.opts.items )
      {
         let object: PIXI.Text | PIXI.Graphics = null

         if ( item.label )
         {
            object = new PIXI.Text( item.label, item.textStyle || this.opts.textStyle )
         }
         else
         {
            object = item.content
         }

         object.y = y

         if ( item.action )
         {
            if ( item.disabled )
            {
               object.alpha = .5
            }
            else
            {
               object.interactive = true
               object.buttonMode = true
            }

            // @ts-ignore error TS6133: 'e' is declared but never read
            object.on( 'pointerover', ( e?: PIXI.interaction.InteractionEvent ): void =>
            {
               //O TweenLite.to( object, this.theme.fast, { alpha: .83, overwrite: 'none' } )
               Tween.to( object, this.theme.opts.fast, { alpha: .83, overwrite: false } )
            } )

            // @ts-ignore error TS6133: 'e' is declared but never read
            object.on( 'pointerout', ( e?: PIXI.interaction.InteractionEvent ): void =>
            {
               //O TweenLite.to( object, this.theme.fast, { alpha: 1, overwrite: 'none' } )
               Tween.to( object, this.theme.opts.fast, { alpha: 1, overwrite: false } )
            } )

            // @ts-ignore error TS6133: 'e' is declared but never read
            object.on( 'pointerup', ( e?: PIXI.interaction.InteractionEvent ): void =>
            {
               item.action.call( object, e, object )
               //O if ( this.opts.closeOnAction )
               //B this was supposed to be closeOnPopup
               if ( this.opts.closeOnPopup )
               {
                  this.hide( )
               }
            } )
         }

         content.addChild( object )

         y += object.height + this.opts.margin
      }

      this.opts.content = content

      super.setup( )

      //T Must return same type as class
      return this
   }
}
