import Theme from './theme'
import Tween from './Ease/Tween'

import { ModalOptions } from './modal'
import Modal from './modal'
import { ProgressBarOptions } from './progressbar'
import ProgressBar from './progressbar'
import { ButtonOptions }  from './button'
import Button from './button'



//
// Class that represents a PixiJS Progress Dialog
//
// @example
// // Create the progress
// const progress = new ProgressDialog( {
//     theme: Theme,
//     header: string | PIXI.Text,
//     headerStyle: PIXI.TextStyle,
//     progressBar: ProgressBarOptions,
//     destroyOnComplete: boolean,
//     onComplete: Function,
//     onCancel: Function,
//     cancelButton: ButtonOptions,
//  } )
//
// // Add the progress to a DisplayObject
// app.scene.addChild( progressDialog )
//
// @class
// @extends PIXI_UI.Modal
// @see { @link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container }
//
export interface ProgressDialogOptions extends ModalOptions
{
   // Already defined in modal
   theme?: Theme,
   header?: string | number | PIXI.Text,
   headerStyle?: PIXI.TextStyle,

   progressBar?: ProgressBarOptions,
   destroyOnComplete?: boolean,
   onComplete?: Function,
   onCancel?: Function,
   cancelButton?: ButtonOptions,
}
export default class ProgressDialog extends Modal
{
   //
   // Creates an instance of a Progress.
   //
   // @constructor
   // @param { Theme } [ opts.theme ]
   //        - The theme to use. ( default is dark ).
   // @param { string | number | PIXI.Text } [ opts.header ]
   //        - The title of the progress bar.
   // @param { PIXI.TextStyle } [ opts.headerStyle ]
   //        - The style of the title. Defaults to theme.textStyleLarge, centered.
   // @param { ProgressBarOptions } [ opts.progressBarOptions ]
   //        - Any progress bar options
   // @param { boolean } [ opts.destroyOnComplete ]
   //        - Close dialog after progress completes.
   // @param { Function } [ opts.onComplete ]
   //        - The function to call when the progress is completed.
   // @param { Function } [ opts.onCancel ]
   //        - The function to call when the progress is canceled.
   // @param { ButtonOptions } [ opts.cancelButton ]
   //        - The style of the Cancel button ...
   //          Defaults to theme.textStyleActive
   //

   protected opts: ProgressDialogOptions
   protected progressBar: ProgressBar
   protected progressBarOptions: ProgressBarOptions
   protected cancelButtonOptions: ButtonOptions
   protected cancelButton: Button

   constructor( opts: ProgressDialogOptions = { })
   {
      let theme = Theme.fromString( opts.theme )

      // The Title
      if ( ! opts.headerStyle )
         opts.headerStyle = theme.opts.textStyleLarge

      opts.headerStyle = Object.assign(
      {
         align: opts.headerStyle.align || 'center',
      },  opts.headerStyle )

      super( { app: opts.app,
               theme: theme,
               header: opts.header,
               headerStyle: opts.headerStyle,
               closeOnBackground: false,
             } )

      this.opts = opts
      if ( this.opts.destroyOnComplete === undefined )
         this.opts.destroyOnComplete = true

      // The progress bar
      if ( ! this.opts.progressBar )
         this.opts.progressBar = {}

      this.progressBarOptions = Object.assign(
      {
         theme: theme,
         x: theme.opts.padding * 2,
         y: this.popup.height * .4,
         width: this.opts.progressBar.width || this.popup.width  - theme.opts.padding * 4,
         height: this.opts.progressBar.height || this.popup.height * .1,
      },  this.opts.progressBar )

      this.progressBar = new ProgressBar( this.progressBarOptions )
      this.popup.addChild( this.progressBar )

      this.cancelButtonOptions= Object.assign(
      {
         x: this.popup.width * .25,
         y: this.popup.height * .6,
         width: this.popup.width * .5,
         height: this.popup.height * .2,
         backgroundFill: 0xFFF000,
         action: this.cancelCallback,
      },  this.opts.cancelButton )

      this.cancelButton = new Button( this.cancelButtonOptions );
      // Re-center after adding
      this.cancelButton.x = ( this.popup.width - this.cancelButton.width ) * .5

      this.popup.addChild( this.cancelButton )

      // When cancel is called, the this is the button
      // and not this the modal.  Setting parent (as it should be)
      // allows us to get the modal parent from the button
      this.cancelButton.grandParent = this
   }

   private cancelCallback( e: Event, button: Button )
   {
     // Set above, so cast is valid
     let dialog: ProgressDialog = < ProgressDialog > button.grandParent

     if ( dialog )
     {
        if ( dialog.opts.onCancel )
           dialog.opts.onCancel.call(this, e, dialog )

        dialog.destroy( )
     }
   }

   //
   // Gets or sets the progress. Has to be a number between 0 and 100.
   //
   // @member { number }
   //
   get progress( ): number
   {
      return this.progressBar.progress
   }
   set progress( value )
   {
      value = Math.round( value )

      if ( value < 0 )
         value = 0

      if ( value > 100 )
         value = 100

      let dialog = this
      Tween.to( this.progressBar, this.theme.opts.normal,
      {
         //Bypass progress tween for ours so onComplete will be called
         _progress: value,
         onUpdate: ( ) => this.progressBar.draw( ),
         onComplete: ( ) =>
         {
            if ( value === 100 && this.opts.destroyOnComplete )
            {
               Tween.to( dialog, this.theme.opts.fast,
               {
                  alpha: 0,
                  onComplete: ( ) => {
                     dialog.destroy( { children: true } )

                     if ( this.opts.onComplete )
                        this.opts.onComplete.call( this )
                  }
               })
            }
         }
      })
   }
}
