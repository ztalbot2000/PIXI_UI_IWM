import Events from '../events.js'
import { AbstractScatter } from '../scatter.js'
import { Angle, Points, Polygon } from '../utils.js'
import { InteractionMapper } from '../interaction.js'

/** A container for scatter objects, which uses a single InteractionMapper
 * for all children. This reduces the number of registered event handlers
 * and covers the common use case that multiple objects are scattered
 * on the same level.
 */
export class ScatterContainer extends PIXI.Graphics {

    /**
    * @constructor
    * @param {PIXI.Renderer} renderer - PIXI renderer, needed for hit testing
    * @param {Bool} stopEvents - Whether events should be stopped or propagated
    * @param {Bool} claimEvents - Whether events should be marked as claimed
    *                             if findTarget return as non-null value.
    * @param {Bool} showBounds - Show bounds for debugging purposes.
    * @param {Bool} showTouches - Show touches and pointer for debugging purposes.
    * @param {Color} backgroundColor - Set background color if specified.
    * @param {PIXIApp} application - Needed if showBounds is true to register
    *                                update handler.
    */
    constructor(renderer, {
        stopEvents = true,
        claimEvents = true,
        container = null,
        showBounds = false,
        showPolygon = false,
        showTouches = false,
        backgroundColor = null,
        application = null
    } = {}) {
        super()
        this.container = container
        if (this.container)
            this.containerDimensions = {
                x: this.container.width,
                y: this.container.height
            }
        this.renderer = renderer
        this.stopEvents = stopEvents
        this.claimEvents = claimEvents
        this.delegate = new InteractionMapper(this.eventReceiver, this)
        this.showBounds = showBounds
        this.showTouches = showTouches
        this.showPolygon = showPolygon
        this.backgroundColor = backgroundColor
        if (application && (showBounds || showTouches || showPolygon)) {
            console.log("Show TOUCHES!!!")
            application.ticker.add((delta) => this.update(delta), this)
        }
        if (backgroundColor) {
            this.updateBackground()
        }
    }

    updateBackground() {
        this.clear()
        this.beginFill(this.backgroundColor, 1)
        this.drawRect(0, 0, this.bounds.width, this.bounds.height)
        this.endFill()
    }

    get eventReceiver() {
        return this.renderer.plugins.interaction.interactionDOMElement
    }

    get bounds() {
        let x = 0
        let y = 0
        // @container: We need to call the constant values, as the container
        // gets resized, when a child moves outside the original boundaries.
        let w = (this.container) ? this.containerDimensions.x : app.width
        let h = (this.container) ? this.containerDimensions.y : app.height

        if (app.fullscreen && app.monkeyPatchMapping) {
            let fixed = this.mapPositionToPoint({ x: w, y: 0 })
            if (fixed.x < w) {
                w = fixed.x
            }
            if (fixed.y > 0) {
                y += fixed.y
                h -= fixed.y
            }
        }
        return new PIXI.Rectangle(x, y, w, h)
    }

    get center() {
        let r = this.bounds
        return { x: r.width / 2, y: r.height / 2 }
    }

    get polygon() {
        let r = this.bounds
        let w2 = r.width / 2
        let h2 = r.height / 2
        let center = { x: w2, y: h2 }
        let polygon = new Polygon(center)
        polygon.addPoint({ x: -w2, y: -h2 })
        polygon.addPoint({ x: w2, y: -h2 })
        polygon.addPoint({ x: w2, y: h2 })
        polygon.addPoint({ x: -w2, y: h2 })
        return polygon
    }

    update(dt) {
        this.clear()
        this.lineStyle(1, 0x0000FF)
        if (this.showBounds) {
            for (let child of this.children) {
                if (child.scatter) {
                    //let {x, y, width, height} = child.scatter.throwBounds()
                    // new PIXI.Rectangle(x, y, width, height)
                    this.drawShape(child.scatter.bounds)
                    let center = child.scatter.center
                    this.drawCircle(center.x, center.y, 4)
                    this.drawCircle(child.scatter.x, child.scatter.y, 4)
                }
            }
            this.lineStyle(2, 0x0000FF)
            this.drawShape(this.bounds)
        }
        if (this.showPolygon) {
            this.lineStyle(2, 0xFF0000)
            for (let child of this.children) {
                if (child.scatter) {
                    let polygon = child.scatter.polygon
                    let shape = new PIXI.Polygon(polygon.flatAbsolutePoints())
                    shape.close()
                    this.drawShape(shape)
                }
            }
        }
        if (this.showTouches) {
            let current = this.delegate.interaction.current
            for(let [key, point] of current.entries()) {
                let local = this.mapPositionToPoint(point)
                this.drawCircle(local.x, local.y, 12)
            }
        }
    }

    capture(event) {
        if (this.stopEvents)
            Events.stop(event)
        return true
    }

    fakeInteractionEvent(point, key) {
        return { data: { global: point, key: key } }
    }

    findHitScatter(data, displayObject, hit) {
        //     if (hit) {
        //             console.log("findHitScatter", displayObject)
        //         }
        if (hit && this.hitScatter === null && typeof (displayObject) != undefined) {
            this.hitScatter = (displayObject.scatter) ? displayObject.scatter : null
        }
    }

    mapPositionToPoint(point, element=null) {
        // In case of nested scatters we get an additional parameter that
        // contains the found scatter
        let local = new PIXI.Point()
        let interactionManager = this.renderer.plugins.interaction
        interactionManager.mapPositionToPoint(local, point.x, point.y)
        if (element instanceof DisplayObjectScatter) {
            return element.displayObject.parent.toLocal(local)
        }
        return local
    }

    /**
     * New method hitTest implemented (in InteractionManager, since 4.5.0).
     * See https://github.com/pixijs/pixi.js/pull/3878
     */
    findTarget(event, local, global) {
        if (event.claimedByScatter) {
            return null
        }
        this.hitScatter = null
        let interactionManager = this.renderer.plugins.interaction
        let fakeEvent = this.fakeInteractionEvent(local)
        interactionManager.processInteractive(fakeEvent,
            this,
            this.findHitScatter.bind(this), true)
        if (this.claimEvents)
            event.claimedByScatter = this.hitScatter
        return this.hitScatter
    }

    findTargetNew(event, local, global) {
        // UO: still problematic. Does not find non interactive elements
        // which are needed for some stylus applications
        if (event.claimedByScatter) {
            return null
        }
        this.hitScatter = null
        let interactionManager = this.renderer.plugins.interaction
        let displayObject = interactionManager.hitTest(local, this)
        if (displayObject != null && displayObject.scatter != null)
            this.hitScatter = displayObject.scatter
        if (this.claimEvents)
            event.claimedByScatter = this.hitScatter
        return this.hitScatter
    }


    onStart(event, interaction) {

    }

    onMove(event, interaction) {

    }

    onEnd(event, interaction) {
        for (let key of interaction.ended.keys()) {
            let point = interaction.ended.get(key)
            if (interaction.isLongPress(key)) {
                this.onLongPress(key, point)
            }
            if (interaction.isTap(key)) {
                this.onTap(key, point)
            }
        }
    }

    onTap(key, point) {
        console.info('ScatterContainer.onTap')
    }

    onLongPress(key, point) {
        console.info('ScatterContainer.onLongPress')
    }

    bringToFront(displayObject) {
        this.addChild(displayObject)
    }
}

/** A wrapper for child elements of a ScatterContainer. Can be used
 *  to combine scattered objects with non-scattered objects. Any
 *  PIXI.DisplayObject can be wrapped.
 */
export class DisplayObjectScatter extends AbstractScatter {

    constructor(displayObject, renderer,
        { x = null, y = null,
            minScale = 0.1,
            maxScale = 1.0,
            startScale = 1.0,
            autoBringToFront = true,
            translatable = true, scalable = true, rotatable = true, resizable = false,
            movableX = true,
            movableY = true,
            throwVisibility = 44,
            throwDamping = 0.95,
            autoThrow = true,
            rotationDegrees = null,
            rotation = null,
            overdoScaling = 1.5,
            onTransform = null } = {}) {
        // For the simulation of named parameters,
        // see: http://exploringjs.com/es6/ch_parameter-handling.html
        super({
            overdoScaling,
            minScale, maxScale,
            startScale,
            autoBringToFront,
            translatable, scalable, rotatable, resizable,
            movableX, movableY, throwVisibility, throwDamping,
            autoThrow,
            rotationDegrees, rotation,
            onTransform
        })
        this.displayObject = displayObject
        this.displayObject.scatter = this
        this.renderer = renderer
        this.scale = startScale
        this.rotationDegrees = this.startRotationDegrees

        // Only set x and y if they are specified.
        // Otherwise the displayobject gets corrupted.
        if (x != null) this.x = x
        if (y != null) this.y = y
    }

    /** Returns geometry data as object. **/
    getState() {
        return {
            scale: this.scale,
            x: this.x,
            y: this.y,
            rotation: this.rotation
        }
    }

    setup() {
        this.setupMouseWheelInteraction()
    }

    roundPixel(value) {
        // UO: Should be obsolete because Renderer supports roundPixels by default
        return value
        let res = this.renderer.resolution
        return Math.round(value * res) / res
    }

    get container() {
        // return this.displayObject.parent
        let obj = this.displayObject
        while (obj.parent != null && !(obj.parent instanceof ScatterContainer))
            obj = obj.parent
        return obj.parent
    }

    get x() {
        return this.position.x
    }

    set x(value) {
        this.position.x = value
    }

    get y() {
        return this.position.y
    }

    set y(value) {
        this.position.y = value
    }

    get polygon() {
        let polygon = new Polygon(this.center)
        let w2 = this.width / 2
        let h2 = this.height / 2
        polygon.addPoint({ x: -w2, y: -h2 })
        polygon.addPoint({ x: w2, y: -h2 })
        polygon.addPoint({ x: w2, y: h2 })
        polygon.addPoint({ x: -w2, y: h2 })
        polygon.rotate(this.rotation)
        return polygon
    }

    get containerBounds() {
        return this.container.bounds
    }

    get containerPolygon() {
        let container = this.container
        if (container == null) return null
        return container.polygon
    }

    get position() {
        return this.displayObject.position
    }

    set position(value) {
        this.displayObject.position = value
    }

    get scale() {
        return this.displayObject.scale.x
    }

    set scale(value) {
        this.displayObject.scale.x = value
        this.displayObject.scale.y = value
    }

    get width() {
        return this.displayObject.width
    }

    get height() {
        return this.displayObject.height
    }

    get bounds() {
        return this.displayObject.getBounds()
    }

    get pivot() {
        return this.displayObject.pivot
    }

    get rotation() {
        return this.displayObject.rotation
    }

    set rotation(value) {
        this.displayObject.rotation = value
    }

    get rotationDegrees() {
        return Angle.radian2degree(this.displayObject.rotation)
    }

    set rotationDegrees(value) {
        this.displayObject.rotation = Angle.degree2radian(value)
    }

    get center() {
        let w2 = this.width / 2
        let h2 = this.height / 2
        let dist = Math.sqrt(w2 * w2 + h2 * h2)
        let angle = Points.angle({ x: w2, y: h2 }, { x: 0, y: 0 })
        let p = this.displayObject.x
        let c = Points.arc(this.position, this.rotation + angle, dist)
        return c // Points.subtract(c, this.pivot)
    }

    get rotationOrigin() {
        // In PIXI the default rotation and scale origin is the position
        return this.position // Points.add(this.position, this.pivot)
    }

    mapPositionToContainerPoint(point) {
        // UO: We need the coordinates related to this scatter in case
        // of nested scatters
        return this.container.mapPositionToPoint(point, this)
    }

    capture(event) {
        return true
    }

    bringToFront() {
        if (this.autoBringToFront) {
            if (this.displayObject.parent instanceof ScatterContainer) {
                let scatterContainer = this.displayObject.parent
                scatterContainer.bringToFront(this.displayObject)
            } else if (this.displayObject.parent.scatter) {
                this.displayObject.parent.scatter.toFront(this.displayObject)
            }
        }
    }

    toFront(displayObject) {
        this.displayObject.addChild(displayObject)
    }

    validScale(scale) {
        scale = Math.max(scale, this.minScale)
        scale = Math.min(scale, this.maxScale)
        return scale
    }
}


