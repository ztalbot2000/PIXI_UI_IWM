/* global apollo, subscriptions, gql */

import * as PIXI from 'pixi.js'

import Theme from './theme'
import Progress from './progress'
import { ProgressOptions } from './progress'
import Modal from './modal'
import Message from './message'
import { Size, Point } from './types'

/*
//
// A special InteractionManager for fullscreen apps, which may
// go beyond the limits of WebGL drawing buffers. On Safari and Chrome
// the drawing buffers are limited to 4096 in width ( Safari ) or 4096x4096
// in total buffer size ( Chrome ). The original InteractionManager.mapPositionToPoint
// does not work with these extreme sizes which mainly occur if large
// retina displays ( >= 4K ) are used with devicePixelRatio > 1.
//
// @private
// @class
// @extends PIXI.interaction.InteractionManager
// @see { @link http://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html|PIXI.interaction.InteractionManager }
// @see { @link https://stackoverflow.com/questions/29710696/webgl-drawing-buffer-size-does-not-equal-canvas-size }
//
class FullscreenInteractionManager extends PIXI.interaction.InteractionManager
{
   mapPositionToPoint( point, x: number, y: number )
   {
      let resolution = this.renderer.resolution
      let extendWidth = 1.0
      let extendHeight = 1.0
      let dy = 0
      let canvas = this.renderer.view
      let context = canvas.getContext( 'webgl' )
      if ( context.drawingBufferWidth < canvas.width ||
          context.drawingBufferHeight < canvas.height )
      {
         extendWidth = context.drawingBufferWidth / canvas.width
         extendHeight = context.drawingBufferHeight / canvas.height
         //dx = wantedWidth - context.drawingBufferWidth
         dy = ( canvas.height - context.drawingBufferHeight ) / resolution
      }
      x *= extendWidth
      y *= extendHeight

      super.mapPositionToPoint( point, x, y + dy )
   }
}
*/

//
// The class PixiApp extends the class PIXI.Application
// by several functions and makes meaningful pre-assumptions.
//
// @example
// // Create the app
// const app = new PIXIApp( {
//     view: canvas,
//     width: 450,
//     height: 150,
//     fpsLogging: true,
//     theme: 'light',
//     transparent: false
// } ).setup( ).run( )
//
// @class
// @extends PIXI.Application
// @see { @link http://pixijs.download/dev/docs/PIXI.Application.html|PIXI.Application }
//
interface AppOptions
{
   width?: number;
   height?: number;
   view?: HTMLCanvasElement;
   transparent?: boolean;
   backgroundColor?: number;
   theme?: Theme | string;
   antialias?: boolean;
   resolution?: number;
   autoResize?: boolean;
   fpsLogging?: boolean;
   progress?: ProgressOptions;
   roundPixels?: boolean;
   monkeyPatchMapping?: boolean;
   forceCanvas?: boolean;
   //graphql?: boolean;
}

export default class PIXIApp extends PIXI.Application
{
   //
   // Creates an instance of a PixiApp.
   //
   // @constructor
   // @param { object } [ opts = { } ]
   //        - An options object. The following options can be set:
   // @param { number } [ opts.width ]
   //        - The width of the renderer. If no set, the application
   //          will run in fullscreen.
   // @param { number } [ opts.height ]
   //        - The height of the renderer. If no set, the application
   //          will run in fullscreen.
   // @param { HTMLElement } [ opts.view ]
   //        - The canvas HTML element. If not set, a render-element is
   //          added inside the body.
   // @param { boolean } [ opts.transparent=true ]
   //        - Should the render view be transparent?
   // @param { boolean } [ opts.antialias=true ]
   //        - Sets antialias ( only applicable in chrome at the moment ).
   // @param { number } [ opts.resolution=window.devicePixelRatio | 1 ]
   //        - The resolution / device pixel ratio of the renderer, retina would be 2.
   // @param { boolean } [ opts.autoResize=true ]
   //        - Should the canvas-element be resized automatically
   //          if the resolution was set?
   // @param { number } [ opts.backgroundColor=0x282828 ]
   //        - The color of the background.
   // @param { string|Theme } [ opts.theme=dark ]
   //        - The name of the theme ( dark, light, red ) or a
   //          Theme object to use for styling.
   // @param { boolean } [ opts.fpsLogging=false ]
   //        - If set to true, the current frames per second are
   //          displayed in the upper left corner.
   // @param { object } [ opts.progress={ } ]
   //        - Can be used to add options to the progress bar.
   //          See class Progress for more informations.
   // @param { boolean } [ opts.forceCanvas=false ]
   //        - Prevents selection of WebGL renderer, even if such is present.
   // @param { boolean } [ opts.roundPixels=true ]
   //        - Align PIXI.DisplayObject coordinates to screen resolution.
   // @param { boolean } [ opts.monkeyPatchMapping=true ]
   //        - Monkey patch for canvas fullscreen support on large displays.
   //

   private theme: Theme
   private width: number
   private height: number
   private fpsLogging: boolean
   private progressOpts: ProgressOptions
   private _progress: Progress
   private fullScreen: boolean
   private autoResize: boolean
   private orient: boolean
   private originalMapPositionToPoint: Function
   private monkeyPatchMapping: boolean

   private scene: PIXI.Container

   constructor(opts: AppOptions = { } )
   {
      let width = opts.width || null
      let height = opts.height || null
      //let view = opts.view || null
      if (opts.transparent === undefined )
            opts.transparent = true

      if ( opts.backgroundColor === undefined )
           opts.backgroundColor = 0x282828
      if ( opts.autoResize === undefined )
           opts.autoResize = true
      if ( opts.progress === 'undefined' )
           opts.progress = {}
      opts.monkeyPatchMapping = false

      //let antialias = opts.antialias || true
      //let resolution = window.devicePixelRatio || 1
      let autoResize = opts.autoResize || true
      //let fpsLogging = false
      //let progress = opts.progress || {}
      // let monkeyPatchMapping = opts.monkeyPatchMapping || true

      // roundPixels is deprerecated since PIXI 5.0.  Use PIXI.settings.ROUND_PIXELS
      if ( opts.roundPixels )
         PIXI.settings.ROUND_PIXELS = true;
      else
         PIXI.settings.ROUND_PIXELS = false;

      // Do not pass roundPixels to super constructor
      // or you will get the warning we avoided above.
      delete opts.roundPixels

      const theme = Theme.fromString(opts.theme)

      let fullScreen = false
      //B They both need to be set or unset
      //B fullScreen = !opts.width || !opts.height
      fullScreen = !opts.width && !opts.height

      if ( fullScreen )
      {
         width = window.innerWidth
         height = window.innerHeight
      }

      super({
         view: opts.view || null,
         width: width,
         height: height,
         transparent: opts.transparent,
         backgroundColor: opts.backgroundColor,
         antialias: opts.antialias || true,
         resolution: window.devicePixelRatio || 1,
         forceCanvas: opts.forceCanvas || false,
      })

      this.theme = theme
      this.width = width
      this.height = height
      //this.monkeyPatchMapping = opts.monkeyPatchMapping || true
      this.monkeyPatchMapping = false
      this.fpsLogging = opts.fpsLogging || false
      this.fullScreen = fullScreen
      this.progressOpts = opts.progress || { }
      this.orient = null
      this.originalMapPositionToPoint = null
      this.autoResize = autoResize ||  true

      if ( this.fullScreen || this.autoResize )
      {
         console.log( 'App is in fullScreen mode' )
         window.addEventListener( 'resize', this.resize.bind( this ) )

         document.body.addEventListener( 'orientationchange', this.checkOrientation.bind( this ) )
      }

      if ( this.monkeyPatchMapping )
      {
         console.log( 'Using monkey patched coordinate mapping' )
         //O Pluggin the specializtion does not work. Monkey patching does
         //O this.renderer.plugins.interaction = new FullscreenInteractionManager( this.renderer )
         this.monkeyPatchPixiMapping( )
      }
   }

   //
   // Extra setup method to construct complex scenes, etc...
   // Overwrite this method if you need additonal views and components.
   //
   // @return { PIXIApp } A reference to the PIXIApp for chaining.
   //
   setup( ): PIXIApp
   {
      this.scene = this.sceneFactory( )
      this.stage.addChild( this.scene )

      // fpsLogging
      if ( this.fpsLogging )
         this.addFpsDisplay( )

      // GraphQL
      //O if ( this.graphql && typeof apollo !== 'undefined' )
      //O {
      //O    const networkInterface = apollo.createNetworkInterface( {
      //O       uri: '/graphql'
      //O    } )

      //O    const wsClient = new subscriptions.SubscriptionClient( `wss://${location.hostname}/subscriptions`, {
      //O       reconnect: true,
      //O       connectionParams: { }
      //O    })

      //O    const networkInterfaceWithSubscriptions = subscriptions.addGraphQLSubscriptions({ networkInterface, wsClient})

      //O    this.apolloClient = new apollo.ApolloClient({
      //O       networkInterface: networkInterfaceWithSubscriptions
      //O    })
      //O }

      // progress
      this._progress = new Progress( Object.assign( { theme: this.theme },
         this.progressOpts, { app: this } )
      )

      this._progress.visible = false

      this.stage.addChild( this._progress )

      return this
   }

   //
   // Tests whether the width is larger than the height of the application.
   //
   // @return { boolean } Returns true if app is in landscape mode.
   //
   orientation( ): boolean
   {
      return this.width > this.height
   }

   //
   // Checks orientation and adapts view size if necessary. Implements a
   // handler for the orientationchange event.
   //
   // @param { event= } - orientationchange event
   //
   //O checkOrientation( event?: PIXI.interaction.InteractionEvent ): void
   // @ts-ignore error TS6133: 'event' is declared but never read
   checkOrientation( event?: Event ): void
   {
      var value = this.orientation( )

      if ( value != this.orient )
      {
         //B setTimeout( 100, function( )
         //B setTimeout is function, interval
         //B setTimeout( 100, function( )
         //B {
         //B    this.orientationChanged( true )
         //B }.bind( this ) )
         setTimeout( () =>
         {
            this.orientationChanged( true )
         }, 100 )

         this.orient = value
      }
   }

   //
   // Called if checkOrientation detects an orientation change event.
   //
   // @param { boolean= } [ force=false ]
   //        - Called if checkOrientation detects an orientation change event.
   //
   orientationChanged( force: boolean = false  ): void
   {
      if ( this.expandRenderer( ) || force  )
      {
         this.layout( )
      }
   }

   //
   // Called after a resize. Empty method but can be overwritten to
   // adapt their layout to the new app size.
   //
   // @param { number } [ width ] - The width of the app.
   // @param { number } [ height ] - The height of the app.
   //
   // @ts-ignore error TS6133: 'width' & height is declared but never read
   layout( width?: number, height?: number  ): void
   {

   }

   //
   // Draws the display tree of the app. Typically this can be delegated
   // to the layout method.
   //
   //
   draw( ): void
   {
      this.layout( this.width, this.height  )
   }

   //
   // Run the application. Override this method with everything
   // that is needed to maintain your App, e.g. setup calls, main loops, etc.
   //
   //
   run( ): PIXIApp
   {
      return this
   }

   //
   // Overwrite this factory method if your application needs a special
   // scene object.
   //
   // @returns { PIXI.Container }
   //          - A new PIXI Container for use as a scene.
   //
   sceneFactory( ): PIXI.Container
   {
      return new PIXI.Container( )
   }

   //
   // Adds the display of the frames per second to the renderer in the upper left corner.
   //
   // @return { PIXIApp }
   //         - Returns the PIXIApp for chaining.
   //
   addFpsDisplay( ): PIXIApp
   {
      const fpsDisplay = new FpsDisplay( this  )
      this.stage.addChild( fpsDisplay  )

      return this
   }

   //
   // Returns the size of the renderer as an object with the keys width and height.
   //
   // @readonly
   // @member { object }
   //
   get size( ): Size
   {
      return { width: this.width, height: this.height }
   }

   //
   // Returns the center of the renderer as an object with the keys x and y.
   //
   // @readonly
   // @member { object }
   //
   get center( ): Point
   {
      return { x: this.width / 2, y: this.height / 2 }
   }

   //
   // Resizes the renderer to fit into the window or given width and height.
   //
   // @param { object } [ event ]
   //        - The event.
   // @param { object= } [ opts = { } ]
   //        - The event.
   // @param { number } [ opts.width = window.innerWidth ]
   //        - The width of the app to resize to.
   // @param { number } [ opts.height = window.innerHeight ]
   //        - The height of the app to resize to.
   // @return { PIXIApp }
   //        - Returns the PIXIApp for chaining.
   //
   // @ts-ignore error TS6133: 'event' is declared but never read
   resize( event?: Event ,
           { width = window.innerWidth,
             height = window.innerHeight } = { }  ): PIXIApp
   {
      this.width = width
      this.height = height
      this.expandRenderer( )
      this.layout( width, height  )
      // if ( this.scene  ) {
      // console.log( "gl.drawingBufferWidth", this.renderer.view.getContext( 'webgl' ).drawingBufferWidth  )
      // console.log( "scene", this.scene.scale, this.renderer, this.renderer.autoResize, this.renderer.resolution  )
      // }
      return this
   }

   //
   // @todo Write the documentation.
   //
   // @private
   //
   monkeyPatchPixiMapping( )
   {
      if ( this.originalMapPositionToPoint === null  )
      {
         let interactionManager = this.renderer.plugins.interaction

         this.originalMapPositionToPoint = interactionManager.mapPositionToPoint

         interactionManager.mapPositionToPoint = ( point, x, y  ) =>
         {
            return this.fixedMapPositionToPoint( point, x, y  )
         }
      }
   }

   //
   // In some browsers the canvas is distorted if the screen resolution and
   // overall size of the canvas exceeds the internal limits ( e.g. 4096 x 4096 pixels ).
   // To compensate these distortions we need to fix the mapping to the actual
   // drawing buffer coordinates.
   // @private
   // @param { any } local
   // @param { number } x
   // @param { number } y
   //
   // @return { } interactionManager.mapPositionToPoint
   //
   fixedMapPositionToPoint( local: any, x: number, y: number  ): { Point: PIXI.Point, x: number, y: number }
   {
      let resolution = this.renderer.resolution
      let interactionManager = this.renderer.plugins.interaction
      let extendWidth = 1.0
      let extendHeight = 1.0
      let dy = 0
      let canvas = this.renderer.view
      let context = canvas.getContext( 'webgl'  )

      if ( context !== null && ( context.drawingBufferWidth < canvas.width ||
           context.drawingBufferHeight < canvas.height  )  )
      {
         extendWidth = context.drawingBufferWidth / canvas.width
         extendHeight = context.drawingBufferHeight / canvas.height
         //dx = wantedWidth - context.drawingBufferWidth
         dy = ( canvas.height - context.drawingBufferHeight  ) / resolution
      }
      x *= extendWidth
      y *= extendHeight
      return this.originalMapPositionToPoint.call( interactionManager, local, x, y + dy  )
   }

   //
   // Expand the renderer step-wise on resize.
   //
   // @param { number } [ expand ] - The amount of additional space for the renderer [ px].
   // @return { boolean } true if the renderer was resized.
   //
   expandRenderer( expand: number = 256  ): boolean
   {
      let renderer = this.renderer
      // Set but never read
      //O let resolution = this.renderer.resolution
      let ww = this.width
      let hh = this.height
      let sw = this.screen.width
      let sh = this.screen.height
      if ( ww > sw || hh > sh  )
      {
         console.log( 'App.expandRenderer'  )
         renderer.resize( ww + expand, hh + expand  )
         return true
      }

      renderer.resize( ww, hh  )
      return false
   }

   //
   // Set the loading progress of the application. If called for
   // the first time, display the progress bar.
   //
   // @param { number } [ value ]
   //        - Should be a value between 0 and 100. If 100, the
   //          progress bar will disappear.
   // @return { PIXIApp|Progress }
   //        - The PixiApp object for chaining or the Progress object
   //          when the method was called without a parameter.
   //
   progress( value: number ): PIXIApp | Progress
   {
      if ( typeof value === 'undefined' )
      {
         return this._progress
      }

      this._progress.visible = true
      this._progress.progress = value

      return this
   }

   //
   // Opens a new Modal object binded to this app.
   //
   // @param { object } [ opts ] - An options object for the Modal object.
   // @return { Modal } Returns the Modal object.
   //
   modal( opts = { }  ): Modal
   {
      let modal = new Modal( Object.assign( { theme: this.theme } , opts, { app: this } ) )
      this.scene.addChild( modal )

      return modal
   }

   //
   // Opens a new Message object binded to this app.
   //
   // @param { object } [ opts ] - An options object for the Message object.
   // @return { Message } Returns the Message object.
   //
   message( opts = { }  ): Message
   {
      let message = new Message( Object.assign( { theme: this.theme } , opts, { app: this } ) )
      this.scene.addChild( message )

      return message
   }

   //
   // Loads sprites, e.g. images into the PIXI TextureCache.
   //
   // @param { string|string[ ] } resources
   //        - A String or an Array of urls to the images to load.
   // @param { function } [ loaded ]
   //        - A callback which is executed after all resources has been loaded.
   //          Receives one paramter, a Map of sprites where the key is
   //          the path of the image which was loaded and the value is
   //          the PIXI.Sprite object.
   // @param { object } [ opts ]
   //        - An options object for more specific parameters.
   // @param { boolean } [ opts.resolutionDependent=true ]
   //        - Should the sprites be loaded dependent of the
   //          renderer resolution?
   // @param { boolean } [ opts.progress=false ]
   //        - Should a progress bar display the loading status?
   //
   // @return { PIXIApp }
   //         - The PIXIApp object for chaining.
   //
   loadSprites( resources: string | Array< string >,
                loaded: Function = null,
                { resolutionDependent = true,
                  progress = false } = { }  ): PIXIApp
   {
      this.loadTextures( resources, (textures:Array< Array <PIXI.Texture > >) =>
      {
         let sprites = new Map( )

         for ( let [ key, texture ] of textures )
         {
            sprites.set( key, new PIXI.Sprite( texture ) )
         }

         if ( loaded )
         {
            loaded.call( this, sprites )
         }

      } , { resolutionDependent, progress } )

      return this
   }

   //
   // Loads textures, e.g. images into the PIXI TextureCache.
   //
   // @param { string|string[ ] } resources
   //        - A String or an Array of urls to the images to load.
   // @param { function } [ loaded ]
   //        - A callback which is executed after all resources has been loaded.
   //          Receives one paramter, a Map of textures where the key
   //          is the path of the image which was loaded and the value
   //          is the PIXI.Texture object.
   // @param { object } [ opts ]
   //        - An options object for more specific parameters.
   // @param { boolean } [ opts.resolutionDependent=true ]
   //        - Should the textures be loaded dependent of the
   //          renderer resolution?
   // @param { boolean } [ opts.progress=false ]
   //        - Should a progress bar display the loading status?
   //
   // @return { PIXIApp }
   //         - The PIXIApp object for chaining.
   //
   loadTextures( resources: string | Array< string >,
                 loaded: Function = null,
                 { resolutionDependent = true,
                   progress = false } = { }  ): PIXIApp
   {

      if ( !Array.isArray( resources ) )
      {
         resources = [ resources ]
      }

      const loader = this.loader

      for ( let resource of resources )
      {

         if ( !loader.resources[ resource ] )
         {
            if ( resolutionDependent )
            {
               let resolution = Math.round( this.renderer.resolution )
               switch ( resolution )
               {
                  case 2:
                     loader.add( resource, resource.replace(/\.([^.]*)$/, '@2x.$1') )
                     break
                  case 3:
                     loader.add( resource, resource.replace(/\.([^.]*)$/, '@3x.$1') )
                     break
                  default:
                     loader.add( resource )
                     break
               }
            }
            else
            {
               loader.add( resource )
            }
         }
      }

      if ( progress )
      {
         loader.on( 'progress', e =>
         {
            this.progress( e.progress )
         } )
      }

      // Interesting. without loader, an error occurs that type string (resources)
      // cannot be used to index type loader.
      // @ts-ignore error TS6133: 'loader' is declared but never read
      loader.load( ( loader, resources ) =>
      {
         const textures = new Map( )

         for ( let key in resources )
         {
            textures.set( key, resources[ key ].texture )
         }

         if ( loaded )
         {
            loaded.call( this, textures )
         }
      } )

      return this
   }

   //
   // Queries the GraphQL endpoint.
   //
   // @param { string } [ query ]
   //        - The GraphQL query string.
   // @param { object } [ opts={ } ]
   //        - An options object. The following options can be set:
   //     http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.query
   //
   // @return { Promise }
   //        - Returns a Promise which is either resolved with the resulting data or
   //          rejected with an error.
   //
   //O query( query: string, opts = { }  )
   //O {
   //O    if ( typeof query === 'string' )
   //O    {
   //O       opts = Object.assign( { } , opts, { query } )
   //O    }
   //O    else
   //O    {
   //O       opts = Object.assign( { }, query )
   //O    }

   //O    opts.query = opts.query.trim( )

   //O    if ( !opts.query.startsWith( 'query' ) )
   //O    {
   //O       if ( opts.query.startsWith( '{' ) )
   //O       {
   //O          opts.query = `query ${opts.query}`
   //O       }
   //O       else
   //O       {
   //O          opts.query = `query {${opts.query}}`
   //O       }
   //O    }

   //O    opts.query = gql( opts.query )

   //O    return this.apolloClient.query( opts )
   //O }

   //
   // Mutate the GraphQL endpoint.
   //
   // @param { string } [ mutation ]
   //        - The GraphQL mutation string.
   // @param { object } [ opts={ } ]
   //        - An options object. The following options can be set:
   //     http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.mutate
   //
   // @return { Promise }
   //         - Returns a Promise which is either resolved with the resulting data or
   //           rejected with an error.
   //
   //O mutate( mutation: string, opts = { }  )
   //O {
   //O    if ( typeof mutation === 'string' )
   //O    {
   //O       opts = Object.assign( { } , opts, { mutation } )
   //O    }
   //O    else
   //O    {
   //O       opts = Object.assign( { }, mutation )
   //O    }

   //O    opts.mutation = opts.mutation.trim( )

   //O    if ( !opts.mutation.startsWith( 'mutation' ) )
   //O    {
   //O       if ( opts.mutation.startsWith( '{' ) )
   //O       {
   //O          opts.mutation = `mutation ${opts.mutation}`
   //O       }
   //O       else
   //O       {
   //O          opts.mutation = `mutation {${opts.mutation}}`
   //O       }
   //O    }

   //O    opts.mutation = gql( opts.mutation )

   //O    return this.apolloClient.mutate( opts )
   //O }

   //
   // Subscribe the GraphQL endpoint.
   //
   // @param { string } [ subscription ]
   //        - The GraphQL subscription.
   // @param { object } [ opts={ } ]
   //        - An options object. The following options can be set:
   //     http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.query
   //
   // @return { Promise }
   //         - Returns a Promise which is either resolved with the resulting data or
   //           rejected with an error.
   //
   //O subscribe( subscription: string, opts = { }  )
   //O {
   //O    if ( typeof subscription === 'string' )
   //O    {
   //O       opts = Object.assign( { } , opts,
   //O       {
   //O          subscription
   //O       } )
   //O    }
   //O    else
   //O    {
   //O       opts = Object.assign( { }, subscription )
   //O    }

   //O    opts.subscription = opts.subscription.trim( )

   //O    if ( !opts.subscription.startsWith( 'subscription' ) )
   //O    {
   //O       if ( opts.subscription.startsWith( '{' ) )
   //O       {
   //O          opts.subscription = `subscription ${opts.subscription}`
   //O       }
   //O       else
   //O       {
   //O          opts.subscription = `subscription {${opts.subscription}}`
   //O       }
   //O    }

   //O    opts.query = gql( opts.subscription )

   //O    delete opts.subscription

   //O    return this.apolloClient.subscribe( opts )
   //O }

   //
   // Supports the page as a global coordinate system and converts
   // browser page coordinates to local DisplayObject coordinates.
   //
   // @param { DisplayObject } displayObject
   //        - The PIXI displayObject.
   // @param { number } x
   //        - The x coordinate.
   // @param { number } y
   //        - The y coordinate.
   //
   // @return { PIXI.Point }
   //         - Returns a PIXI.Point.
   //

   //O convertPointFromPageToNode( displayObject: PIXI.DisplayObject, x: number, y: number ): PIXI.Point
   //O {
   //O    let resolution = this.renderer.resolution
   //O    console.log( "resolution", resolution )
   //O    let pixiGlobal = window.convertPointFromPageToNode( app.view,  x, y )
   //O    pixiGlobal.x /= resolution
   //O    pixiGlobal.y /= resolution
   //O    return displayObject.toLocal( new PIXI.Point( pixiGlobal.x, pixiGlobal.y ) )
   //O }

   //
   // Supports the page as a global coordinate system and converts
   // local DisplayObject coordinates to browser page coordinates.
   //
   // @param { DisplayObject } displayObject
   //        - The PIXI displayObject.
   // @param { number } x
   //        - The x coordinate.
   // @param { number } y
   //        - The y coordinate.
   //
   // @return { Point } Returns a DOM Point.
   //

   //O convertPointFromNodeToPage( displayObject: PIXI.DisplayObject, x: number, y: number )
   //O {
   //O    let resolution = this.renderer.resolution
   //O    let pixiGlobal = displayObject.toGlobal( new PIXI.Point( x, y ) )
   //O    pixiGlobal.x *= resolution
   //O    pixiGlobal.y *= resolution
   //O    // console.log( "app.convertPointFromNodeToPage", pixiGlobal )
   //O    //O return window.convertPointFromNodeToPage( app.view, pixiGlobal.x, pixiGlobal.y )
   //O    //B app.view is undefined.  I believe this.view is what was wanted
   //O    return window.convertPointFromNodeToPage( this.view, pixiGlobal.x, pixiGlobal.y )
   //O }
}

//
// The class fpsdisplay shows in the upper left corner
// of the renderer the current image refresh rate.
//
// @private
// @class
// @extends PIXI.Graphics
// @see { @link http://pixijs.download/dev/docs/PIXI.Graphics.html|PIXI.Graphics }
//
class FpsDisplay extends PIXI.Graphics
{
   //
   // Creates an instance of a FpsDisplay.
   //
   // @constructor
   // @param { PIXIApp } app
   //        - The PIXIApp where the frames per second should be displayed.
   //
   private app: PIXIApp
   private text: PIXI.Text
   private fps: string

   constructor( app: PIXIApp )
   {
      super( )

      this.app = app

      this.lineStyle( 3, 0x434f4f, 1 )
          .beginFill( 0x434f4f, .6 )
          .drawRoundedRect( 0, 0, 68, 32, 5 )
          .endFill( )
          .position.set( 20, 20 )

      this.text = new PIXI.Text( this.fps, new PIXI.TextStyle(
      {
         fontFamily: 'Arial',
         fontSize: 14,
         fontWeight: 'bold',
         fill: '#f6f6f6',
         stroke: '#434f4f',
         strokeThickness: 3
      } ) )

      this.text.position.set( 6, 6 )

      this.addChild( this.text )

      this.refreshFps( )

      window.setInterval( this.refreshFps.bind( this ), 1000 )
   }

   //
   // Refreshes fps number.
   //
   // @return { PIXIApp }
   //         - Returns the PIXIApp object for chaining.
   //
   //refreshFps( ): PIXIApp
   refreshFps( ): FpsDisplay
   {
      this.text.text = `${(this.app.ticker.FPS ).toFixed( 1 )} fps`

      //B 'this' is not PIXIApp, but FpsDisplay.  Either the documentation is
      //B wrong or the code is.  I'll go with the documentation. To be checked
      //B later.
      return this
   }
}
