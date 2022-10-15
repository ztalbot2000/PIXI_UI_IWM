/* global apollo, subscriptions, gql */

import Theme from './theme.js'
import Progress from './progress.js'
import Modal from './modal.js'
import Message from './message.js'

/**
 * A special InteractionManager for fullscreen apps, which may
 * go beyond the limits of WebGL drawing buffers. On Safari and Chrome
 * the drawing buffers are limited to 4096 in width (Safari) or 4096x4096
 * in total buffer size (Chrome). The original InteractionManager.mapPositionToPoint
 * does not work with these extreme sizes which mainly occur if large
 * retina displays (>= 4K) are used with devicePixelRatio > 1.
 *
 * @private
 * @class
 * @extends PIXI.interaction.InteractionManager
 * @see {@link http://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html|PIXI.interaction.InteractionManager}
 * @see {@link https://stackoverflow.com/questions/29710696/webgl-drawing-buffer-size-does-not-equal-canvas-size}
 */
class FullscreenInteractionManager extends PIXI.interaction.InteractionManager {

    mapPositionToPoint(point, x, y) {
        let resolution = this.renderer.resolution
        let extendWidth = 1.0
        let extendHeight = 1.0
        let dy = 0
        let canvas = this.renderer.view
        let context = canvas.getContext('webgl')
        if (context.drawingBufferWidth < canvas.width ||
            context.drawingBufferHeight < canvas.height) {
            extendWidth = context.drawingBufferWidth / canvas.width
            extendHeight = context.drawingBufferHeight / canvas.height
            //dx = wantedWidth - context.drawingBufferWidth
            dy = (canvas.height - context.drawingBufferHeight) / resolution
        }
        x *= extendWidth
        y *= extendHeight

        super.mapPositionToPoint(point, x, y + dy)
    }
}

/**
 * The class PixiApp extends the class PIXI.Application
 * by several functions and makes meaningful pre-assumptions.
 *
 * @example
 * // Create the app
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 450,
 *     height: 150,
 *     fpsLogging: true,
 *     theme: 'light',
 *     transparent: false
 * }).setup().run()
 *
 * @class
 * @extends PIXI.Application
 * @see {@link http://pixijs.download/dev/docs/PIXI.Application.html|PIXI.Application}
 */
export default class PIXIApp extends PIXI.Application {

    /**
     * Creates an instance of a PixiApp.
     *
     * @constructor
     * @param {object} [opts={}] - An options object. The following options can be set:
     * @param {number} [opts.width] - The width of the renderer. If no set, the application will run in fullscreen.
     * @param {number} [opts.height] - The height of the renderer. If no set, the application will run in fullscreen.
     * @param {HTMLElement} [opts.view] - The canvas HTML element. If not set, a render-element is added inside the body.
     * @param {boolean} [opts.transparent=true] - Should the render view be transparent?
     * @param {boolean} [opts.antialias=true] - Sets antialias (only applicable in chrome at the moment).
     * @param {number} [opts.resolution=window.devicePixelRatio | 1] - The resolution / device pixel ratio of the renderer, retina would be 2.
     * @param {boolean} [opts.autoResize=true] - Should the canvas-element be resized automatically if the resolution was set?
     * @param {number} [opts.backgroundColor=0x282828] - The color of the background.
     * @param {string|Theme} [opts.theme=dark] - The name of the theme (dark, light, red) or a Theme object to use for styling.
     * @param {boolean} [opts.fpsLogging=false] - If set to true, the current frames per second are displayed in the upper left corner.
     * @param {object} [opts.progress={}] - Can be used to add options to the progress bar. See class Progress for more informations.
     * @param {boolean} [opts.forceCanvas=false] - Prevents selection of WebGL renderer, even if such is present.
     * @param {boolean} [opts.roundPixels=true] - Align PIXI.DisplayObject coordinates to screen resolution.
     * @param {boolean} [opts.monkeyPatchMapping=true] - Monkey patch for canvas fullscreen support on large displays.
     */
    constructor({
        width = null, height = null, view = null,
        transparent = true, backgroundColor = 0x282828, theme = 'dark',
        antialias = true, resolution = window.devicePixelRatio || 1, autoResize = true,
        fpsLogging = false, progress = {}, forceCanvas = false, roundPixels = true, monkeyPatchMapping = true,
        graphql = false}) {

        const fullScreen = !width || !height

        if (fullScreen) {
            width = window.innerWidth
            height = window.innerHeight
        }

        super({
            view: view,
            width: width,
            height: height,
            transparent: transparent,
            antialias: antialias,
            resolution: resolution,
            autoResize: autoResize,
            backgroundColor: backgroundColor,
            roundPixels: roundPixels,
            forceCanvas: forceCanvas
        })

        this.width = width
        this.height = height
        this.theme = Theme.fromString(theme)
        this.fpsLogging = fpsLogging
        this.progressOpts = progress
        this.fullScreen = fullScreen
        this.orient = null
        this.originalMapPositionToPoint = null
        this.monkeyPatchMapping = monkeyPatchMapping
        this.graphql = graphql
        if (fullScreen) {
            console.log('App is in fullScreen mode')
            window.addEventListener('resize', this.resize.bind(this))
            document.body.addEventListener('orientationchange', this.checkOrientation.bind(this))
        }
        if (monkeyPatchMapping) {
            console.log('Using monkey patched coordinate mapping')
            // Pluggin the specializtion does not work. Monkey patching does
            // this.renderer.plugins.interaction = new FullscreenInteractionManager(this.renderer)
            this.monkeyPatchPixiMapping()
        }
    }

    /**
     * Extra setup method to construct complex scenes, etc...
     * Overwrite this method if you need additonal views and components.
     *
     * @return {PIXIApp} A reference to the PIXIApp for chaining.
     */
    setup() {
        this.scene = this.sceneFactory()
        this.stage.addChild(this.scene)

        // fpsLogging
        if (this.fpsLogging) {
            this.addFpsDisplay()
        }

        // GraphQL
        if (this.graphql && typeof apollo !== 'undefined') {

            const networkInterface = apollo.createNetworkInterface({
                uri: '/graphql'
            })

            const wsClient = new subscriptions.SubscriptionClient(`wss://${location.hostname}/subscriptions`, {
                reconnect: true,
                connectionParams: {}
            })

            const networkInterfaceWithSubscriptions = subscriptions.addGraphQLSubscriptions(
                networkInterface,
                wsClient
            )

            this.apolloClient = new apollo.ApolloClient({
                networkInterface: networkInterfaceWithSubscriptions
            })
        }

        // progress
        this._progress = new Progress(Object.assign({theme: this.theme}, this.progressOpts, {app: this}))
        this._progress.visible = false
        this.stage.addChild(this._progress)

        return this
    }

    /**
     * Tests whether the width is larger than the height of the application.
     *
     * @return {boolean} Returns true if app is in landscape mode.
     */
    orientation() {
        return this.width > this.height
    }

    /**
     * Checks orientation and adapts view size if necessary. Implements a
     * handler for the orientationchange event.
     *
     * @param {event=} - orientationchange event
     */
    checkOrientation(event) {
        var value = this.orientation()
        if (value != this.orient) {
            setTimeout(100, function() {
                this.orientationChanged(true)
            }.bind(this))
            this.orient = value
        }
    }

    /**
     * Called if checkOrientation detects an orientation change event.
     *
     * @param {boolean=} [force=false] - Called if checkOrientation detects an orientation change event.
     */
    orientationChanged(force=false) {
        if (this.expandRenderer() || force) {
            this.layout()
        }
    }

    /**
     * Called after a resize. Empty method but can be overwritten to
     * adapt their layout to the new app size.
     *
     * @param {number} [width] - The width of the app.
     * @param {number} [height] - The height of the app.
     */
    layout(width, height) {

    }

    /**
     * Draws the display tree of the app. Typically this can be delegated
     * to the layout method.
     *
     */
    draw() {
        this.layout(this.width, this.height)
    }

    /*
     * Run the application. Override this method with everything
     * that is needed to maintain your App, e.g. setup calls, main loops, etc.
     *
     */
    run() {
        return this
    }

    /*
     * Overwrite this factory method if your application needs a special
     * scene object.
     *
     * @returns {PIXI.Container} - A new PIXI Container for use as a scene.
     */
    sceneFactory() {
        return new PIXI.Container()
    }

    /**
     * Adds the display of the frames per second to the renderer in the upper left corner.
     *
     * @return {PIXIApp} - Returns the PIXIApp for chaining.
     */
    addFpsDisplay() {
        const fpsDisplay = new FpsDisplay(this)
        this.stage.addChild(fpsDisplay)

        return this
    }

    /**
     * Returns the size of the renderer as an object with the keys width and height.
     *
     * @readonly
     * @member {object}
     */
    get size() {
        return {width: this.width, height: this.height}
    }

    /**
     * Returns the center of the renderer as an object with the keys x and y.
     *
     * @readonly
     * @member {object}
     */
    get center() {
        return {x: this.width / 2, y: this.height / 2}
    }

    /**
     * Resizes the renderer to fit into the window or given width and height.
     *
     * @param {object} [event] - The event.
     * @param {object=} [opts={}] - The event.
     * @param {number} [opts.width=window.innerWidth] - The width of the app to resize to.
     * @param {number} [opts.height=window.innerHeight] - The height of the app to resize to.
     * @return {PIXIApp} - Returns the PIXIApp for chaining.
     */
    resize(event, {width = window.innerWidth, height = window.innerHeight} = {}) {
        this.width = width
        this.height = height
        this.expandRenderer()
        this.layout(width, height)
        // if (this.scene) {
        // console.log("gl.drawingBufferWidth", this.renderer.view.getContext('webgl').drawingBufferWidth)
        // console.log("scene", this.scene.scale, this.renderer, this.renderer.autoResize, this.renderer.resolution)
        // }
        return this
    }

    /**
     * @todo Write the documentation.
     *
     * @private
     */
    monkeyPatchPixiMapping() {
        if (this.originalMapPositionToPoint === null) {
            let interactionManager = this.renderer.plugins.interaction
            this.originalMapPositionToPoint = interactionManager.mapPositionToPoint
            interactionManager.mapPositionToPoint = (point, x, y) => {
                return this.fixedMapPositionToPoint(point, x, y)
            }
        }
    }

    /**
     * In some browsers the canvas is distorted if the screen resolution and 
     * overall size of the canvas exceeds the internal limits (e.g. 4096 x 4096 pixels).
     * To compensate these distortions we need to fix the mapping to the actual
     * drawing buffer coordinates.
     * @private
     * @param {any} local
     * @param {number} x
     * @param {number} y
     * @return {} interactionManager.mapPositionToPoint
     */
    fixedMapPositionToPoint(local, x, y) {
        let resolution = this.renderer.resolution
        let interactionManager = this.renderer.plugins.interaction
        let extendWidth = 1.0
        let extendHeight = 1.0
        let dy = 0
        let canvas = this.renderer.view
        let context = canvas.getContext('webgl')

        if (context !== null && (context.drawingBufferWidth < canvas.width ||
            context.drawingBufferHeight < canvas.height)) {
            extendWidth = context.drawingBufferWidth / canvas.width
            extendHeight = context.drawingBufferHeight / canvas.height
            //dx = wantedWidth - context.drawingBufferWidth
            dy = (canvas.height - context.drawingBufferHeight) / resolution
        }
        x *= extendWidth
        y *= extendHeight
        return this.originalMapPositionToPoint.call(interactionManager, local, x, y + dy)
    }

    /**
     * Expand the renderer step-wise on resize.
     *
     * @param {number} [expand] - The amount of additional space for the renderer [px].
     * @return {boolean} true if the renderer was resized.
     */
    expandRenderer(expand=256) {
        let renderer = this.renderer
        let resolution = this.renderer.resolution
        let ww = this.width
        let hh = this.height
        let sw = this.screen.width
        let sh = this.screen.height
        if (ww > sw || hh > sh) {
            console.log('App.expandRenderer')
            renderer.resize(ww + expand, hh + expand)
            return true
        }

        renderer.resize(ww, hh)
        return false
    }

    /**
     * Set the loading progress of the application. If called for the first time, display the progress bar.
     *
     * @param {number} [value] - Should be a value between 0 and 100. If 100, the progress bar will disappear.
     * @return {PIXIApp|Progress} The PixiApp object for chaining or the Progress object when the method was
     *     called without a parameter.
     */
    progress(value) {

        if (typeof value === 'undefined') {
            return this._progress
        }

        this._progress.visible = true
        this._progress.progress = value

        return this
    }

    /**
     * Opens a new Modal object binded to this app.
     *
     * @param {object} [opts] - An options object for the Modal object.
     * @return {Modal} Returns the Modal object.
     */
    modal(opts = {}) {

        let modal = new Modal(Object.assign({theme: this.theme}, opts, {app: this}))
        this.scene.addChild(modal)

        return modal
    }

    /**
     * Opens a new Message object binded to this app.
     *
     * @param {object} [opts] - An options object for the Message object.
     * @return {Message} Returns the Message object.
     */
    message(opts = {}) {

        let message = new Message(Object.assign({theme: this.theme}, opts, {app: this}))
        this.scene.addChild(message)

        return message
    }

    /**
     * Loads sprites, e.g. images into the PIXI TextureCache.
     *
     * @param {string|string[]} resources - A String or an Array of urls to the images to load.
     * @param {function} [loaded] - A callback which is executed after all resources has been loaded.
     *     Receives one paramter, a Map of sprites where the key is the path of the image which was
     *     loaded and the value is the PIXI.Sprite object.
     * @param {object} [opts] - An options object for more specific parameters.
     * @param {boolean} [opts.resolutionDependent=true] - Should the sprites be loaded dependent of the
     *     renderer resolution?
     * @param {boolean} [opts.progress=false] - Should a progress bar display the loading status?
     * @return {PIXIApp} The PIXIApp object for chaining.
     */
    loadSprites(resources, loaded = null, {resolutionDependent = true, progress = false} = {}) {

        this.loadTextures(resources, textures => {

            let sprites = new Map()

            for (let [key, texture] of textures) {
                sprites.set(key, new PIXI.Sprite(texture))
            }

            if (loaded) {
                loaded.call(this, sprites)
            }

        }, {resolutionDependent, progress})

        return this
    }

    /**
     * Loads textures, e.g. images into the PIXI TextureCache.
     *
     * @param {string|string[]} resources - A String or an Array of urls to the images to load.
     * @param {function} [loaded] - A callback which is executed after all resources has been loaded.
     *     Receives one paramter, a Map of textures where the key is the path of the image which was
     *     loaded and the value is the PIXI.Texture object.
     * @param {object} [opts] - An options object for more specific parameters.
     * @param {boolean} [opts.resolutionDependent=true] - Should the textures be loaded dependent of the
     *     renderer resolution?
     * @param {boolean} [opts.progress=false] - Should a progress bar display the loading status?
     * @return {PIXIApp} The PIXIApp object for chaining.
     */
    loadTextures(resources, loaded = null, {resolutionDependent = true, progress = false} = {}) {

        if (!Array.isArray(resources)) {
            resources = [resources]
        }

        const loader = this.loader

        for (let resource of resources) {

            if (!loader.resources[resource]) {
                
                if (resolutionDependent) {
                    let resolution = Math.round(this.renderer.resolution)
                    switch (resolution) {
                        case 2:
                            loader.add(resource, resource.replace(/\.([^.]*)$/, '@2x.$1'))
                            break
                        case 3:
                            loader.add(resource, resource.replace(/\.([^.]*)$/, '@3x.$1'))
                            break
                        default:
                            loader.add(resource)
                            break
                    }
                } else {
                    loader.add(resource)
                }
            }
        }

        if (progress) {
            loader.on('progress', e => {
                this.progress(e.progress)
            })
        }

        loader.load((loader, resources) => {
            const textures = new Map()

            for (let key in resources) {
                textures.set(key, resources[key].texture)
            }

            if (loaded) {
                loaded.call(this, textures)
            }
        })

        return this
    }

    /**
     * Queries the GraphQL endpoint.
     *
     * @param {string} [query] - The GraphQL query string.
     * @param {object} [opts={}] - An options object. The following options can be set:
     *     http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.query
     * @return {Promise} Returns a Promise which is either resolved with the resulting data or
     *     rejected with an error.
     */
    query(query, opts = {}) {

        if (typeof query === 'string') {
            opts = Object.assign({}, opts, {query})
        } else {
            opts = Object.assign({}, query)
        }

        opts.query = opts.query.trim()

        if (!opts.query.startsWith('query')) {
            if (opts.query.startsWith('{')) {
                opts.query = `query ${opts.query}`
            } else {
                opts.query = `query {${opts.query}}`
            }
        }

        opts.query = gql(opts.query)

        return this.apolloClient.query(opts)
    }

    /**
     * Mutate the GraphQL endpoint.
     *
     * @param {string} [mutation] - The GraphQL mutation string.
     * @param {object} [opts={}] - An options object. The following options can be set:
     *     http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.mutate
     * @return {Promise} Returns a Promise which is either resolved with the resulting data or
     *     rejected with an error.
     */
    mutate(mutation, opts = {}) {

        if (typeof mutation === 'string') {
            opts = Object.assign({}, opts, {mutation})
        } else {
            opts = Object.assign({}, mutation)
        }

        opts.mutation = opts.mutation.trim()

        if (!opts.mutation.startsWith('mutation')) {
            if (opts.mutation.startsWith('{')) {
                opts.mutation = `mutation ${opts.mutation}`
            } else {
                opts.mutation = `mutation {${opts.mutation}}`
            }
        }

        opts.mutation = gql(opts.mutation)

        return this.apolloClient.mutate(opts)
    }

    /**
     * Subscribe the GraphQL endpoint.
     *
     * @param {string} [subscription] - The GraphQL subscription.
     * @param {object} [opts={}] - An options object. The following options can be set:
     *     http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient.query
     * @return {Promise} Returns a Promise which is either resolved with the resulting data or
     *     rejected with an error.
     */
    subscribe(subscription, opts = {}) {

        if (typeof subscription === 'string') {
            opts = Object.assign({}, opts, {subscription})
        } else {
            opts = Object.assign({}, subscription)
        }

        opts.subscription = opts.subscription.trim()

        if (!opts.subscription.startsWith('subscription')) {
            if (opts.subscription.startsWith('{')) {
                opts.subscription = `subscription ${opts.subscription}`
            } else {
                opts.subscription = `subscription {${opts.subscription}}`
            }
        }

        opts.query = gql(opts.subscription)

        delete opts.subscription

        return this.apolloClient.subscribe(opts)
    }

    /**
     * Supports the page as a global coordinate system and converts browser page coordinates
     * to local DisplayObject coordinates.
     *
     * @param {DisplayObject} displayObject - The PIXI displayObject.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     *  
     * @return {PIXI.Point} Returns a PIXI.Point.
     */

    convertPointFromPageToNode(displayObject, x, y) {
        let resolution = this.renderer.resolution
        console.log("resolution", resolution)
        let pixiGlobal = window.convertPointFromPageToNode(app.view,  x, y)
        pixiGlobal.x /= resolution
        pixiGlobal.y /= resolution
        return displayObject.toLocal(new PIXI.Point(pixiGlobal.x, pixiGlobal.y))
    }

    /**
     * Supports the page as a global coordinate system and converts local DisplayObject coordinates
     * to browser page coordinates.
     *
     * @param {DisplayObject} displayObject - The PIXI displayObject.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     *  
     * @return {Point} Returns a DOM Point.
     */

    convertPointFromNodeToPage(displayObject, x, y) {
        let resolution = this.renderer.resolution
        let pixiGlobal = displayObject.toGlobal(new PIXI.Point(x, y))
        pixiGlobal.x *= resolution
        pixiGlobal.y *= resolution
       // console.log("app.convertPointFromNodeToPage", pixiGlobal)
        return window.convertPointFromNodeToPage(app.view, pixiGlobal.x, pixiGlobal.y)
    }
}

/**
 * The class fpsdisplay shows in the upper left corner
 * of the renderer the current image refresh rate.
 *
 * @private
 * @class
 * @extends PIXI.Graphics
 * @see {@link http://pixijs.download/dev/docs/PIXI.Graphics.html|PIXI.Graphics}
 */
class FpsDisplay extends PIXI.Graphics {

    /**
     * Creates an instance of a FpsDisplay.
     *
     * @constructor
     * @param {PIXIApp} app - The PIXIApp where the frames per second should be displayed.
     */
    constructor(app) {

        super()

        this.app = app

        this.lineStyle(3, 0x434f4f, 1)
            .beginFill(0x434f4f, .6)
            .drawRoundedRect(0, 0, 68, 32, 5)
            .endFill()
            .position.set(20, 20)

        this.text = new PIXI.Text(this.fps, new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: 'bold',
            fill: '#f6f6f6',
            stroke: '#434f4f',
            strokeThickness: 3
        }))
        this.text.position.set(6, 6)

        this.addChild(this.text)

        this.refreshFps()

        window.setInterval(this.refreshFps.bind(this), 1000)
    }

    /**
     * Refreshes fps numer.
     *
     * @return {PIXIApp} Returns the PIXIApp object for chaining.
     */
    refreshFps() {
        this.text.text = `${(this.app.ticker.FPS).toFixed(1)} fps`

        return this
    }
}


