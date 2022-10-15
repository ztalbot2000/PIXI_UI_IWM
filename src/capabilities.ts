// Report capabilities with guaranteed values.
//
export default class Capabilities
{
   // Returns the browser userAgent.
   // @return { string }
   //
   static get userAgent( ): string
   {
      return navigator.userAgent || 'Unknown Agent'
   }

   // Tests whether the app is running on a mobile device.
   // Implemented as a readonly attribute.
   // @return { boolean }
   //
   static get isMobile( ): boolean
   {
      return ( /Mobi/.test( navigator.userAgent ) )
   }

   // Tests whether the app is running on a iOS device.
   // Implemented as a readonly attribute.
   // @return { boolean }
   //
   static get isIOS( ): boolean
   {
      // @ts-ignore - error TS2339: Property 'MSStream' does not exist on type 'Window & typeof globalThis'.
      return ( /iPad|iPhone|iPod/.test( navigator.userAgent ) ) && !window.MSStream
   }

   // Tests whether the app is running in a Safari environment.
   // See https://stackoverflow.com/questions/7944460/detect-safari-browser
   // Implemented as a readonly attribute.
   // @return { boolean }
   //
   static get isSafari( ): boolean
   {
      return navigator.vendor && navigator.vendor.indexOf( 'Apple' ) > -1 && navigator.userAgent && !navigator.userAgent.match( 'CriOS' )
   }

   //
   // Distincts if the app is running inside electron or not.
   //
   // source: https://discuss.atom.io/t/detect-electron-or-web-page-running/33180/3
   //
   static get isElectron( ): boolean
   {
      // @ts-ignore
      return typeof process != 'undefined' && process.versions && process.versions.electron !== undefined
   }

   // Returns the display resolution. Necessary for retina displays.
   // @return { number }
   //
   static get devicePixelRatio( ): number
   {
      return window.devicePixelRatio || 1
   }

   // Returns true if the device is a multi-touch table. This method is currently not universal usable and not sure!
   // @return { boolean }
   //
   static get isMultiTouchTable( ): boolean
   {
      return Capabilities.devicePixelRatio > 2 && Capabilities.isMobile === false && /Windows/i.test( Capabilities.userAgent )
   }

   // Returns true if mouse events are supported
   // @return { boolean }
   //
   static supportsMouseEvents( ): boolean
   {
      return typeof( window.MouseEvent ) != 'undefined'
   }

   // Returns true if touch events are supported
   // @return { boolean }
   //
   static supportsTouchEvents( ): boolean
   {
      return typeof( window.TouchEvent ) != 'undefined'
   }

   // Returns true if pointer events are supported
   // @return { boolean }
   //
   static supportsPointerEvents( ): boolean
   {
      return typeof( window.PointerEvent ) != 'undefined'
   }

   // Returns true if DOM templates are supported
   // @return { boolean }
   //
   static supportsTemplate( ): boolean
   {
      return 'content' in document.createElement( 'template' );
   }
}

// Basic tests for Capabilities.
//
export class CapabilitiesTests
{
   static testConfirm( ): void
   {
      let bool = confirm( 'Please confirm' )
      document.getElementById( 'demo' ).innerHTML = ( bool ) ? 'Confirmed' : 'Not confirmed'
   }

   static testPrompt( ): void
   {
      let person = prompt( 'Please enter your name', 'Harry Potter' )
      if ( person != null )
      {
         //O demo.innerHTML = 'Hello ' + person + '! How are you today?'
         document.getElementById( 'demo' ).innerHTML = 'Hello ' + person + '! How are you today?'
      }
   }

   static testUserAgent( ): void
   {
      let agent = 'User-agent: ' + Capabilities.userAgent
      //O user_agent.innerHTML = agent
      document.getElementById( 'user_agent' ).innerHTML = agent
   }

   static testDevicePixelRatio( ): void
   {
      let value = 'Device Pixel Ratio: ' + Capabilities.devicePixelRatio
      //O device_pixel_ratio.innerHTML = value
      document.getElementById( 'device_pixel_ratio' ).innerHTML = value
   }

   static testMultiTouchTable( ): void
   {
      let value = 'Is the device a multi-touch table? ' + Capabilities.isMultiTouchTable
      //O multi_touch_table.innerHTML = value
      document.getElementById( 'multi_touch_table' ).innerHTML = value
   }

   static testSupportedEvents( ): void
   {
      let events = []
      if ( Capabilities.supportsMouseEvents( ) )
      {
          events.push( 'MouseEvents' )
      }
      if ( Capabilities.supportsTouchEvents( ) )
      {
          events.push( 'TouchEvents' )
      }
      if ( Capabilities.supportsPointerEvents( ) )
      {
          events.push( 'PointerEvents' )
      }
      //O supported_events.innerHTML = 'Supported Events: ' + events.join( ', ' )
      document.getElementById( 'supported_events' ).innerHTML = 'Supported Events: ' + events.join( ', ' )
   }

   static testAll( ): void
   {
      this.testUserAgent( )
      this.testDevicePixelRatio( )
      this.testMultiTouchTable( )
      this.testSupportedEvents( )
   }
}

// Optional global variables, needed in DocTests. //
// @ts-ignore
window.Capabilities = Capabilities
// @ts-ignore
window.CapabilitiesTests = CapabilitiesTests
