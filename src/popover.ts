import * as PIXI from 'pixi.js'

//
//
//
interface PopoverOptions
{
   title?: string,
   text?: string,
   x?: number,
   y?: number,
   placement?: string,
   width?: number,
   titleStyle?: PIXI.TextStyle,
   textStyle?: PIXI.TextStyle,
}
export default class Popover extends PIXI.Graphics
{
   private opts: PopoverOptions
   private padding: number
   private titleTextStyle: PIXI.TextStyle
   private textTextStyle: PIXI.TextStyle
   private titleText: PIXI.Text
   private textText: PIXI.Text
   private titleY: number
   private titleHeight: number
   protected textY: number
   protected textHeight: number

   constructor( opts: PopoverOptions )
   {
      super( )

      this.opts = Object.assign( { } ,
      {
         title: opts.title || null,
         text: opts.text || null,
         x: opts.x || 0,
         y: opts.y || 0,
         placement: opts.placement || 'top',
         width: opts.width || 250,
         titleStyle: opts.titleStyle || < PIXI.TextStyle > { },
         textStyle: opts.textStyle || < PIXI.TextStyle > { fontSize: '1.6em' }
      } )

      this.padding = 12

      let style =
      {
         fontFamily: 'Arial',
         fontSize: '2em',
         stroke: '#f6f6f6',
         strokeThickness: 3,
         wordWrap: true,
         wordWrapWidth: this.opts.width - ( this.padding * 2 )
      }

      this.titleTextStyle = new PIXI.TextStyle( Object.assign( {}, style, this.opts.titleStyle ) )
      this.textTextStyle = new PIXI.TextStyle( Object.assign( {}, style, this.opts.textStyle ) )

      if ( this.opts.title || this.opts.text )
      {
         this.setup( )
         this.draw( )
         this.positioning( )
      }
   }

   setup( ): Popover
   {
      this.removeChildren( )

      if ( this.opts.title )
      {
         this.titleText = new PIXI.Text( this.opts.title, this.titleTextStyle )
         this.titleText.position.set( this.padding, this.padding )
         this.addChild( this.titleText )
      }

      this.titleY = this.titleText ? this.titleText.y : 0
      this.titleHeight = this.titleText ? this.titleText.height : 0

      if ( this.opts.text )
      {
         this.textText = new PIXI.Text( this.opts.text, this.textTextStyle )
         this.textText.position.set( this.padding, this.titleY + this.titleHeight + this.padding )
         this.addChild( this.textText )
      }

      this.textY = this.textText ? this.textText.y : 0
      this.textHeight = this.textText ? this.textText.height : 0

      return this
   }

   close( ): Popover
   {
      this.parent.removeChild( this )

      return this
   }

   draw( ): Popover
   {
      this.clear( )
      //V5 Changes
      //O this.beginFill( 0xffffff, 1 )
      this.beginFill( 0xffffff )
      this.alpha = 1
      this.lineStyle( 1, 0x282828, .5 )

      // Draw rounded rectangle
      const height = this.height + this.padding
      this.drawRoundedRect( 0, 0, this.opts.width, height, 8 )

      // Draw anchor
      this.drawAnchor( this.opts.placement )

      // Draw title background
      if ( this.opts.title )
      {
         this.lineStyle( 0 )
         //V5 Changes
         //O this.beginFill( 0xf7f7f7, 1 )
         this.beginFill( 0xf7f7f7 )
         this.alpha = 1
         let x = 1
         let y = this.titleText.x + this.titleText.height + ( this.padding / 2 )
         this.moveTo( x, y )
         y = 9
         this.lineTo( x, y )
         this.quadraticCurveTo( x, y - 8, x + 8, y - 8 )
         x += this.opts.width - 7
         y -= 8
         this.lineTo( x, y )
         this.quadraticCurveTo( x + 5, y, x + 5, y + 8 )
         x += 5
         y += this.titleText.x + this.titleText.height + ( this.padding / 2 )
         this.lineTo( x, y )
         if ( this.opts.text )
         {
            x = 1
            this.lineTo( x, y )
         }
         else
         {
            this.quadraticCurveTo( x, y, x - 5, y + 4 )
            x = 6
            y += 4
            this.lineTo( x, y )
            this.quadraticCurveTo( x, y, x - 5, y - 4 )
         }
      }

      this.endFill( )

      return this
   }

   drawAnchor( placement: string ): Popover
   {
      let x = 0
      let y = 0

      switch ( placement )
      {
          case 'bottom':
             if ( this.opts.title )
             {
                //V5 Changes
                //O this.beginFill( 0xf7f7f7, 1 )
                this.beginFill( 0xf7f7f7 )
                this.alpha = 1
             }
             x = ( this.width / 2 ) - 10
             y = 1
             this.moveTo( x, y )
             x += 10
             y -= 10
             this.lineTo( x, y )
             x += 10
             y += 10
             this.lineTo( x, y )
             break
          case 'right':
             x = 1
             y = ( this.height / 2 ) - 10
             if ( this.titleY + this.titleHeight > y )
             {
                //V5 Changes
                //O this.beginFill( 0xf7f7f7, 1 )
                this.beginFill( 0xf7f7f7 )
                this.alpha = 1
             }
             this.moveTo( x, y )
             x -= 10
             y += 10
             this.lineTo( x, y )
             x += 10
             y += 10
             this.lineTo( x, y )
             break
          case 'left':
             x = this.width - 2
             y = ( this.height / 2 ) - 10
             if ( this.titleY + this.titleHeight > y )
             {
                //V5 Changes
                //O this.beginFill( 0xf7f7f7, 1 )
                this.beginFill( 0xf7f7f7 )
                this.alpha = 1
             }
             this.moveTo( x, y )
             x += 10
             y += 10
             this.lineTo( x, y )
             x -= 10
             y += 10
             this.lineTo( x, y )
             break
          default:
             x = ( this.width / 2 ) - 10
             y = this.height - 2
             this.moveTo( x, y )
             x += 10
             y += 10
             this.lineTo( x, y )
             x += 10
             y -= 10
             this.lineTo( x, y )
             break
      }

      return this
   }

   positioning( ): Popover
   {
      const x = this.opts.x
      const y = this.opts.y

      switch ( this.opts.placement )
      {
         case 'bottom':
            this.position.set( x - ( this.width / 2 ), y + 10 )
            break
         case 'right':
            this.position.set( x, y - ( this.height / 2 ) )
            break
         case 'left':
            this.position.set( x - this.width, y - ( this.height / 2 ) )
            break
         default:
            this.position.set( x - ( this.width / 2 ), y - this.height )
            break
      }

      return this
   }
}
