import * as PIXI from 'pixi.js'

import Theme from './theme'

interface INameToValueMap
{
    [key: string]: any;
}

// Try to resolve the mess below.
let defaultTheme = new Theme()

export function deepObject<T>(source: T)
{
   const result = {}

   Object.keys(source).forEach((key) => {
      // @ts-ignore
      const value = source[key]
      // @ts-ignore
      result[key] = deep(value)
   }, {})

   return result as T
}

//
// Defines usefull default text styles.
//
export class FontInfo
{
   static get small( ): PIXI.TextStyle
   {
      //O return app.theme.textStyle.textStyleSmall

      let w:Theme = null;
      if ((window as any).app && (((window as any).app) as any).theme)
      {
        w = ((((window as any).app) as any).theme)
        if ( w.opts && w.opts.textStyle )
          return w.opts.textStyleSmall
        else
          console.warn("labeledgraphics: small Doh");
      }

      console.warn("labeledgraphics: small called.  Should fix this....");
      return defaultTheme.opts.textStyleSmall
   }

   static get fontSize( ): number | string
   {
      //O return app.theme.textStyle

      let w:Theme = null;
      if ((window as any).app && (((window as any).app) as any).theme)
      {
        w = ((((window as any).app) as any).theme)
        if ( w.opts && w.opts.textStyle )
           return w.opts.textStyle.fontSize
        else
           console.warn("labeledgraphics: fontSize Doh"); 
      }

      console.warn("labeledgraphics: fontSize called.  Should fix this....");
      return defaultTheme.opts.textStyle.fontSize
   }

   static get normal( ): PIXI.TextStyle
   {
      //O return app.theme.textStyle

      let w:Theme = null;
      if ((window as any).app && (((window as any).app) as any).theme)
      {
        w = ((((window as any).app) as any).theme)
        if ( w.opts && w.opts.textStyle )
           return w.opts.textStyle
        else
           console.warn("labeledgraphics: normal Doh");
      }

      console.warn("labeledgraphics: normal called.  Should fix this....");
      return defaultTheme.opts.textStyle
   }

   static get centered( ): PIXI.TextStyle
   {
      //O return Object.assign( { }, app.theme.textStyle, { align: 'center' } )

      let w:Theme = null;
      if ((window as any).app && (((window as any).app) as any).theme)
      {
        w = ((((window as any).app) as any).theme)
        if ( w.opts.textStyle )
           return Object.assign( { }, w.opts.textStyle, { align: 'center' } )
        else
           console.warn("labeledgraphics: centered Doh");
      }

      console.warn("labeledgraphics: centered called.  Should fix this....");
      return defaultTheme.opts.textStyle
   }

   static get fontFamily( ): string | Array< string >
   {
      // This was missing ...

      let w:Theme = null;
      if ((window as any).app && (((window as any).app) as any).theme)
      {
         w = ((((window as any).app) as any).theme)
         if ( w.opts.textStyle )
            return w.opts.textStyle.fontFamily
         else
            console.warn("labeledgraphics: fontFamily Doh")
      }

      console.warn("labeledgraphics: centered called.  Should fix this....");
      return defaultTheme.opts.textStyle.fontFamily
   }
}

//
// Static methods to support hyphenation of lines.
//
// @class Hypenate
//
export class Hypenate
{
   static splitPart( part: string ): Array < string >
   {
      let parts = part.split( '-' )
      if ( parts.length == 1 )
         return [ part ]

      let result = [ ]
      let last = parts.pop( )
      for ( let p of parts )
      {
         result.push( p + '-' )
      }
      result.push( last )
      return result.filter( p => p.length > 0 )
   }

   static splitWord( word: string ): Array < string >
   {
      //B qu'Est-ce que c'est
      //B if ( typeof ( language ) == 'undefined' )
      //B{
         if ( word.indexOf( '-' ) > -1 )
         {
            return word.split( '-' )
         }
         return [ word ]
      //B
      /* NO IDEAL WHAT LANGUAGE IS OR MEANT TO BE IN THIS CODE
      let parts = language.hyphenate( word )
      let result = [ ]
      for ( let part of parts )
      {
         for ( let splitted of this.splitPart( part ) )
         {
            result.push( splitted )
         }
      }
      return result
      */
   }

   static abbreviateLine( label: string, style: PIXI.TextStyle, width: number ): string
   {
      const pixiStyle = new PIXI.TextStyle( style )
      let metrics = PIXI.TextMetrics.measureText( label, pixiStyle )

      while( metrics.width > width && label.length > 3 )
      {
         label = label.slice( 0, label.length-1 )
         metrics = PIXI.TextMetrics.measureText( label, pixiStyle )
      }
      label = label.slice( 0, label.length-1 )
      return label + '…'
   }

   //O static splitLine( line: string, pixiStyle, width: number, space, minus )
   static splitLine( line: string, pixiStyle: PIXI.TextStyle, width: number, space: PIXI.TextMetrics ): string
   {
      let x = 0
      let result = ''
      let words = line.split( ' ' )
      for ( let word of words )
      {
         let wordMetrics = PIXI.TextMetrics.measureText( word, pixiStyle )
         if ( x + wordMetrics.width >= width )
         {
            let parts = this.splitWord( word )
            let newWord = ''
            if ( parts.length == 1 )
            {
                newWord += '\n' + word + ' '
                x = wordMetrics.width + space.width
            }
            else
            {
                let first = true
                let lastPart = ''
                for ( let part of parts )
                {
                   let partMetrics = PIXI.TextMetrics.measureText( part, pixiStyle )
                   if ( x + partMetrics.width + space.width > width )
                   {
                      newWord += ( ( first || lastPart.endsWith( '-' ) ) ? '\n' : '-\n' ) + part
                      x = partMetrics.width
                   }
                   else
                   {
                      newWord += part
                      x += partMetrics.width
                   }
                   lastPart = part
                   first = false
                }
                x += space.width
            }
            result += newWord + ' '
         }
         else
          {
            result += word + ' '
            x += wordMetrics.width + space.width
         }
      }
      return result
   }

   //
   //  Main method and entry point for text hyphenation 
   //
   // @static
   // @param { * } text
   // @param { * } style
   // @param { * } width
   //
   // @returns { string }
   // @memberof Hypenate
   //
   static splitLines( text: string, style: PIXI.TextStyle, width: number ): string
   {
      const pixiStyle = new PIXI.TextStyle( style )
      const lines = text.split( '\n' )
      const space = PIXI.TextMetrics.measureText( ' ', pixiStyle )
      //const minus = PIXI.TextMetrics.measureText( '-', pixiStyle )
      let result = [ ]
      for ( let line of lines )
      {
         //O result.push( this.splitLine( line, pixiStyle, width, space, minus ) )
         result.push( this.splitLine( line, pixiStyle, width, space ) )
      }
      return result.join( '\n' )
   }
}

class TextLabel extends PIXI.Text
{
   //
   // Creates an instance of TextLabel.
   // @param { string } text - The string that you would like the text to display
   // @param { object|PIXI.TextStyle } [ style ] - The style parameters 
   // @param { canvas } 
   //
   // @memberof TextLabel
   //
   private normFontSize: number
   private minZoom: number
   private maxZoom: number

   constructor( text: string, style: PIXI.TextStyle = null, canvas: HTMLCanvasElement = null, { minZoom = 0.1, maxZoom = 10 } = { } )
   {
      super( text, style, canvas  )
      this.normFontSize = this.style.fontSize
      this.minZoom = minZoom
      this.maxZoom = maxZoom
   }

   zoom( factor: number ): void
   {
      let oldValue = parseFloat( this.style.fontSize ) / this.normFontSize
      let value = oldValue * factor
      this.setZoom( value )
   }

   setZoom( value: number ): void
   {
      let oldValue = parseFloat( this.style.fontSize ) / this.normFontSize
      if ( value > this.maxZoom )
      {
         value = this.maxZoom
      }
      if ( value < this.minZoom )
      {
         value = this.minZoom
      }
      if ( value != oldValue )
      {
         this.style.fontSize = Math.max( value * this.normFontSize, 1 )
      }
   }

   setZoomAndScale( scale: number ): void
   {
      this.scale.set( 1 / scale )
      this.setZoom( scale )
   }
}

//
// A specialization of the PIXI.Graphics class that allows to
// resuse and place labels across different layout variants
//
// @export
// @class LabeledGraphics
// @extends { PIXI.Graphics }
//
export default class LabeledGraphics extends PIXI.Graphics
{
   //O private labels: Map
   //T Map<K, V>' requires 2 type argument(s).
   protected labels: Map<any, any>

   //
   // Creates an instance of LabeledGraphics and defines a local label cache.
   // 
   // @memberof LabeledGraphics
   //
   constructor( )
   {
      super( )
      this.labels = new Map( )
   }

   _createText( label: string, fontInfo: PIXI.TextStyle ): TextLabel
   {
      return new TextLabel( label, fontInfo )
   }

   //
   // Main additional method. Ensures that a text object is created that is cached
   // under the given key.
   //
   // @param { * } key
   //        - The cache key
   // @param { * } label
   //        - The label to show
   // @param { * } [ attrs={ } ]
   //        - Defines attributes of the text object. 
   //          align: 'right', 'left', or 'center'
   //          justify: 'top', 'bottom', or 'center'
   //          maxLines: { integer } truncates the text and adds ellipsis
   //          maxHeight: { number } truncates text that needs more space
   //                                and adds ellipsis
   //          maxWidth: { number } word wraps text using hyphenation if possible
   // @param { * } [ fontInfo=FontInfo.normal ]
   //        - Defines PIXI.TextStyle attributes
   //
   // @returns { PIXI.Text }
   //          - instance
   //
   // @memberof LabeledGraphics
   //
   ensureLabel( key: string, label: string, attrs:INameToValueMap = { }, fontInfo = FontInfo.normal ): PIXI.Text
   {
      if ( attrs.maxWidth && attrs.maxLines == 1 )
      {
         label = Hypenate.abbreviateLine( label, fontInfo, attrs.maxWidth )
      }
      else
      {
         if ( attrs.maxWidth )
         {
            label = Hypenate.splitLines( label, fontInfo, attrs.maxWidth )
         }
         if ( attrs.maxLines )
         {
            label = this.truncateLabel( label, fontInfo, attrs.maxLines )
         }
         if ( attrs.maxHeight )
         {
            let styleInfo = new PIXI.TextStyle( fontInfo )
            let metrics = PIXI.TextMetrics.measureText( label, styleInfo )
            let maxLines = Math.max( attrs.maxHeight / metrics.lineHeight, 1 )
            label = this.truncateLabel( label, fontInfo, maxLines )
         }
      }

      if ( !this.labels.has( key ) )
      {
         let text = this._createText( label, fontInfo )
         this.labels.set( key, text )
         this.addChild( text )
      }
      let text = this.labels.get( key )
      for ( let k in attrs )
      {
         text[ k ] = attrs[ k ]
      }
      if ( label != text.text )
         text.text = label

      // We do not follow the flexbox jargon and use align for x and justify for y axis
      // This deviation is needed to ensure backward compatability
      switch ( attrs.justify || null )
      {
         case 'top':
            text.anchor.y = 0
            break
         case 'bottom':
            text.anchor.x = 1
            break
         default:
            text.anchor.y = 0.5
            break
      }

      switch ( attrs.align )
      {
         case 'right':
            text.anchor.x = 1
            break
         case 'center':
            text.anchor.x = 0.5
            break
         default:
            text.anchor.x = 0
            break
      }
      text.visible = true
      return text
   }

   //
   // Private method that truncates the text and adds an ellipsis if there are more lines
   // than wanted
   //
   // @param { * } text
   // @param { * } style
   // @param { * } [ maxLines=Infinity ]
   //
   // @returns { string }
   // @memberof LabeledGraphics
   //
   truncateLabel( text: string, style: PIXI.TextStyle, maxLines = Infinity ): string
   {
      if ( maxLines === Infinity )
      {
         return text
      }
      const { wordWrapWidth } = style
      const pixiStyle = new PIXI.TextStyle( style )
      const { lines } = PIXI.TextMetrics.measureText( text, pixiStyle )
      let newText = text
      if ( lines.length > maxLines )
      {
         const truncatedLines = lines.slice( 0, maxLines )
         const lastLine = truncatedLines[ truncatedLines.length - 1 ]
         const words = lastLine.split( ' ' )
         const wordMetrics = PIXI.TextMetrics.measureText( `\u00A0\n...\n${ words.join( '\n' ) }`, pixiStyle )
         const [ spaceLength, dotsLength, ...wordLengths ] = wordMetrics.lineWidths
         const { text: newLastLine } = wordLengths.reduce( ( data, wordLength, i ) =>
         {
            if ( data.length + wordLength + spaceLength >= wordWrapWidth )
            {
                return { ...data, length: wordWrapWidth }
            }
            return {
                text: `${ data.text }${ i > 0 ? ' ' : '' }${ words[ i ] }`,
                length: data.length + wordLength + spaceLength,
            };
         }, { text: '', length: dotsLength } )
         truncatedLines[ truncatedLines.length - 1 ] = `${ newLastLine }...`
         newText = truncatedLines.join( '\n' )
      }
      return newText
   }

   //
   // Returns the label for the given key.
   //
   // @param { * } key
   //
   // @returns { Object }
   // @memberof LabeledGraphics
   //
   getLabel( key: string ): string
   {
      return this.labels.get( key )
   }

   //
   // Hides the label with the given key.
   //
   // @param { * } key
   // @memberof LabeledGraphics
   //
   hideLabel( key: string ): void
   {
      let label = this.labels.get( key )
      if ( label )
      {
         label.visible = false
      }
   }

   // 
   // Removes the label with the given key.
   // @param { * } key
   // @memberof LabeledGraphics
   //
   removeLabel( key: string ): void
   {
      let label = this.labels.get( key )
      this.labels.delete( key )
      label.destroy( )
   }

   //
   // Ensures that labels are hidden on clear.
   //
   // @memberof LabeledGraphics
   //
   clear( ): PIXI.Graphics
   {
      super.clear( )

      for ( let key of this.labels.keys( ) )
      {
         this.hideLabel( key )
      }
      return this
   }

   //
   // Logs debugging infos
   //
   // @memberof LabeledGraphics
   //
   debugInfos( ): void
   {
      console.log( { size: this.labels.size, labels: this.labels } )
   }
}

const labelCache = new Map( )

function getTexture( label: string, style: PIXI.TextStyle = FontInfo.normal ): PIXI.Texture
{
   //O let key = label + fontInfo.fontFamily + fontInfo.fontSize
   let key = label + style.fontFamily + style.fontSize

   if ( labelCache.has( key ) )
   {
      return labelCache.get( key )
   }
   // let expandedFont = Object.assign( { }, fontInfo )
   let expandedStyle: PIXI.TextStyle = Object.assign( { }, style )

   //O expandedFont.fontSize *= window.devicePixelRatio
   if ( typeof expandedStyle.fontSize == 'number' )
      expandedStyle.fontSize *= window.devicePixelRatio

   //Olet text = new PIXI.Text( label, expandedFont )
   let text:PIXI.Text = new PIXI.Text( label, expandedStyle )

   // The below makes no sense to me as it does exist?
   // @ts-ignore TS2339: Property 'updateText' does not exist on type 'Text'.
   text.updateText()
   labelCache.set( key, text.texture )
   return text.texture
}

// This was never exported. Perhaps this is why BitmappedLabeledGraphics is here?. Maybe this is the class that is wrong.
export class SpriteLabel extends PIXI.Sprite
{
   private label: string
   //private scale: PIXI.Point
   public texture: PIXI.Texture
   //O private fontInfo: FontInfo
   private style: PIXI.TextStyle

   //O constructor( label: string, fontInfo?: FontInfo )
   //B FontInfo is static and cannot be used this way
   constructor( label: string, style?: PIXI.TextStyle )
   {
      if (! style )
         style = FontInfo.normal

      //O let texture = getTexture( label, fontInfo )
      let texture = getTexture( label, style )
      super( texture )

      //O this.fontInfo = fontInfo
      this.style = style

      this.label = label
      this.scale.set( 0.8 / window.devicePixelRatio )
   }

   set text( label: string )
   {
      this.label = label
      //O this.texture = getTexture( label, this.fontInfo )
      this.texture = getTexture( label, this.style )
   }

   get text( ): string
   {
      return this.label
   }
}

/* This is just crap. it has no reason to extend LabelGraphics and then retuen a SpriteLabel with a parameter that is incompatible with SpriteLabel.

timeline extends it, but thankfully does not call createText, so it can extend
LabeledGraphics instead.
export class BitmapLabeledGraphics extends LabeledGraphics
{
   //O _createText( label: string, fontInfo?: PIXI.TextStyle ): SpriteLabel
   // @ts-ignore TS2416: Property '_createText' in type 'BitmapLabeledGraphics' is not assignable to the same property in base type 'LabeledGraphics'  Stupid TypeScript
   _createText( label: string, style?: PIXI.TextStyle ): SpriteLabel
   {
      //O let texture = getTexture( label, fontInfo )
      let texture = getTexture( label, style )
      return new SpriteLabel( texture )
   }
}
*/
