/* globals Power2, Sine */
/*eslint no-console: ["error", { allow: ["log", "info", "error"] }]*/

/**
 * Callback for the flippable onStart function.
 *
 * @callback onStartCallback
 * @param {Flippable} flippable - A reference to the flippable (also this refers to the flippable).
 */

/**
 * Callback for the flippable onUpdate function.
 *
 * @callback onUpdateCallback
 * @param {Flippable} flippable - A reference to the flippable (also this refers to the flippable).
 */

/**
 * Callback for the flippable onComplete function.
 *
 * @callback onCompleteCallback
 * @param {Flippable} flippable - A reference to the flippable (also this refers to the flippable).
 */

/**
 * Class that represents a PixiJS Flippable.
 *
 * @example
 * const front = PIXI.Sprite.fromImage('./assets/front.jpg')
 * const back = PIXI.Sprite.fromImage('./assets/back.jpg')
 * app.scene.addChild(front)
 * 
 * // Create the flippable
 * const flippable = new Flippable(front, back, app.renderer)
 * 
 * front.interactive = true
 * front.on('click', event => flippable.toggle())
 *
 * @class
 * @extends PIXI.projection.Camera3d
 * @see {@link https://github.com/pixijs/pixi-projection|PixiJS Projection}
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/flippable.html|DocTest}
 */
export default class Flippable extends PIXI.projection.Camera3d {

    /**
     * Creates an instance of a Flippable.
     *
     * @constructor
     * @param {PIXI.DisplayObject} front - The object to show initially. Should have been added to the scene.
     * @param {PIXI.DisplayObject} back - The object to show on the backside. Should have not been added to the scene.
     * @param {PIXI.WebGLRenderer|PIXI.CanvasRenderer} renderer - The renderer of the application.
     * @param {object} [opts] - An options object which can contain the following properties.
     * @param {number} [opts.duration=1] - The duration of the flip animation in seconds.
     * @param {GSAP.Ease} [opts.ease=Power2.easeOut] - The ease of the flip animation.
     * @param {boolean} [opts.shadow=false] - Should be a shadow been display during the animation?
     * @param {numer} [opts.eulerX=0] - The shift of the x-axis during the animation.
     * @param {numer} [opts.eulerY=0] - The shift of the y-axis during the animation.
     * @param {GSAP.Ease} [opts.eulerEase=Sine.easeOut] - The ease of the shift.
     * @param {boolean} [opts.useBackTransforms=false] - When set to true, the flip animation also animates to the transform parameters of the back-object.
     * @param {GSAP.Ease} [opts.transformEase=Power2.easeOut] - The ease of the transform.
     * @param {numer} [opts.focus=800] - The value of the focus of the 3D camera (see pixi-projection).
     * @param {numer} [opts.near=10] - The near value of the 3D camera (see pixi-projection).
     * @param {numer} [opts.far=10000] - The far value of the 3D camera (see pixi-projection).
     * @param {boolean} [opts.orthographic=false] - Should the flip animation be an orthographic animation?
     * @param {function} [opts.onStart=null] - A callback executed on start of the flip animation.
     * @param {function} [opts.onUpdate=null] - A callback executed on each step of the flip animation.
     * @param {function} [opts.onComplete=null] - A callback executed when the flip animation is finished.
     */
    constructor(front, back, renderer, opts = {}) {

        super()

        this.opts = Object.assign({}, {
            front,
            back,
            renderer,
            duration: 1,
            ease: Power2.easeOut,
            shadow: false,
            eulerX: 0,
            eulerY: 0,
            eulerEase: Sine.easeOut,
            useBackTransforms: false,
            transformEase: Power2.easeOut,
            focus: 800,
            near: 10,
            far: 10000,
            orthographic: false
        }, opts)

        // planes
        //--------------------
        this.setPlanes(this.opts.focus, this.opts.near, this.opts.far, this.opts.orthographic)

        // flipped
        //--------------------
        this._flipped = false

        // objects
        //--------------------
        this.objects = {}

        // setup
        //--------------------
        this.setup()
    }

    /**
     * Creates children and instantiates everything.
     *
     * @private
     * @return {Flippable} A reference to the flippable for chaining.
     */
    setup() {

        const scale = .5

        // filters
        //--------------------
        const blurFilter = new PIXI.filters.BlurFilter()
        blurFilter.blur = 0.2
        this.objects.blurFilter = blurFilter

        // outer
        //--------------------
        const outer = new PIXI.projection.Container3d()
        outer.scale3d.set(scale)
        this.addChild(outer)
        this.objects.outer = outer

        // shadow
        //--------------------
        const shadow = new PIXI.projection.Sprite3d(PIXI.Texture.fromImage('../../assets/images/shadow.png'))
        shadow.renderable = false
        shadow.anchor.set(0.5)
        shadow.scale3d.set(.98)
        shadow.alpha = 0.7
        shadow.filters = [blurFilter]
        shadow.visible = this.opts.shadow
        outer.addChild(shadow)
        this.objects.shadow = shadow
        
        // inner
        //--------------------
        const inner = new PIXI.projection.Container3d()
        inner.euler.y = Math.PI
        outer.addChild(inner)
        this.objects.inner = inner

        // front
        //--------------------
        const front = new PIXI.projection.Sprite3d(PIXI.Texture.EMPTY)
        front.scale.set(-1 / scale, 1 / scale)
        front.renderable = true
        front.anchor.set(.5)
        inner.addChild(front)
        this.objects.front = front

        // back
        //--------------------
        const back = new PIXI.projection.Sprite3d(PIXI.Texture.EMPTY)
        back.scale.set(1 / scale, 1 / scale)
        back.renderable = false
        back.anchor.set(.5)
        inner.addChild(back)
        this.objects.back = back

        return this
    }

    /**
     * Gets or sets the flipped state.
     *
     * @member {boolean}
     */
    get flipped() {
        return this._flipped
    }
    set flipped(toBack) {

        this._flipped = toBack

        // references
        //--------------------
        const front = this.objects.front
        const back = this.objects.back
        const inner = this.objects.inner
        const shadow = this.objects.shadow
        const blurFilter = this.objects.blurFilter

        const half = this.opts.duration / 2
        const ease = this.opts.eulerEase

        const fromObject = toBack ? this.opts.front : this.opts.back
        const toObject = toBack ? this.opts.back : this.opts.front

        // set textures for virtual front and virtual back
        //--------------------
        front.texture = this.generateTexture(this.opts.front)
        back.texture = this.generateTexture(this.opts.back)
        
        // switch objects and set params for virtual objects
        //--------------------
        const fromCenter = this.anchorToCenter(fromObject)
        const toCenter = this.anchorToCenter(toObject)

        // from values
        //--------------------
        this.x = fromCenter.x
        this.y = fromCenter.y
        front.width = fromObject.width * 2
        front.height = fromObject.height * 2
        back.width = fromObject.width * 2
        back.height = fromObject.height * 2
        this.rotation = fromObject.rotation
        this.skew.x = fromObject.skew.x
        this.skew.y = fromObject.skew.y

        // calculate to values
        //--------------------
        const to = {
            x: this.opts.useBackTransforms ? toCenter.x : fromCenter.x,
            y: this.opts.useBackTransforms ? toCenter.y : fromCenter.y,
            anchorX: this.opts.useBackTransforms ? toObject.x : fromObject.x,
            anchorY: this.opts.useBackTransforms ? toObject.y : fromObject.y,
            width: this.opts.useBackTransforms ? toObject.width * 2 : fromObject.width * 2,
            height: this.opts.useBackTransforms ? toObject.height * 2 : fromObject.height * 2,
            rotation: this.opts.useBackTransforms ? toObject.rotation : fromObject.rotation,
            skewX: this.opts.useBackTransforms ? toObject.skew.x : fromObject.skew.x,
            skewY: this.opts.useBackTransforms ? toObject.skew.y : fromObject.skew.y
        }

        // set toObject end values
        //--------------------
        toObject.x = to.anchorX
        toObject.y = to.anchorY
        toObject.width = to.width / 2
        toObject.height = to.height / 2
        toObject.rotation = to.rotation
        toObject.skew.x = to.skewX
        toObject.skew.y = to.skewY

        // flip
        //--------------------
        TweenMax.to(inner.euler, this.opts.duration, {
            y: toBack ? 0 : Math.PI,
            ease: this.opts.ease,
            onStart: () => {
                this.switchDisplayObject(fromObject, this)
                shadow.renderable = true
                if (this.opts.onStart) {
                    this.opts.onStart(this, this)
                }
            },
            onUpdate: () => {
                this.layout()
                if (this.opts.onUpdate) {
                    this.opts.onUpdate(this, this)
                }
            },
            onComplete: () => {
                this.switchDisplayObject(this, toObject)
                shadow.renderable = false
                if (this.opts.onComplete) {
                    this.opts.onComplete(this, this)
                }
            }
        })

        // x & y
        //--------------------
        TweenMax.to(this, this.opts.duration, {
            x: to.x,
            y: to.y,
            ease: this.opts.transformEase
        })

        // width & height
        //--------------------
        TweenMax.to([front, back], this.opts.duration, {
            width: to.width,
            height: to.height,
            ease: this.opts.transformEase
        })

        // rotation
        //--------------------
        TweenMax.to(this, this.opts.duration, {
            directionalRotation: {
                rotation: `${to.rotation}_short`,
                useRadians: true
            },
            ease: this.opts.transformEase
        })

        // skewX & skewY
        //--------------------
        TweenMax.to(this.skew, this.opts.duration, {
            x: to.skewX,
            y: to.skewY,
            ease: this.opts.transformEase
        })

        // camera
        //--------------------
        new TimelineMax()
            .to(this.euler, half, {x: this.opts.eulerX, y: this.opts.eulerY, ease})
            .to(this.euler, half, {x: 0, y: 0, ease})

        // shadow
        //--------------------
        new TimelineMax()
            .to(shadow, half, {alpha: .3, ease})
            .to(shadow, half, {alpha: .7, ease})
        
        // blurfilter
        //--------------------
        new TimelineMax()
            .to(blurFilter, half, {blur: 6, ease})
            .to(blurFilter, half, {blur: .2, ease})
    }

    /**
     * Should be called to refresh the layout of the camera.
     *
     * @return {Flippable} A reference to the flippable for chaining.
     */
    layout() {

        const front = this.objects.front
        const back = this.objects.back
        const shadow = this.objects.shadow
        const inner = this.objects.inner
        
        inner.position3d.z = -Math.sin(inner.euler.y) * front.texture.baseTexture.width * 2

        //this.objects.shadow.euler = this.objects.inner.euler
        shadow.euler.x = -inner.euler.x
        shadow.euler.y = -inner.euler.y
        
        if (this.frontSideInFront) {
            front.renderable = true
            back.renderable = false
            shadow.width = front.width
            shadow.height = front.height
        } else {
            front.renderable = false
            back.renderable = true
            shadow.width = back.width
            shadow.height = back.height
        }

        return this
    }

    /**
     * Toggles the flippable. Switches the sides.
     *
     * @private
     * @return {Flippable} A reference to the flippable for chaining.
     */
    toggle() {
        this.flipped = !this.flipped

        return this
    }

    /**
     * Gets the alignment state. true if the front side is in front, false otherwise.
     *
     * @member {boolean}
     */
    get frontSideInFront() {
        return !this.objects.inner.isFrontFace()
    }

    /**
     * Calculates the center point of an PIXI.DisplayObject.
     *
     * @private
     * @param {PIXI.DisplayObject} displayObject - The DisplayObject from which to calculate the center.
     * @return {object} Return an object with x and y.
     */
    anchorToCenter(displayObject) {
        const bounds = displayObject.getBounds()
        return {
            x: bounds.x + bounds.width / 2,
            y: bounds.y + bounds.height / 2
        }
    }

    /**
     * Creates children and instantiates everything.
     *
     * @private
     * @param {PIXI.DisplayObject} displayObject - The DisplayObject from which to generate the texture.
     * @return {PIXI.Texture} The generated PIXI.Texture.
     */
    generateTexture(displayObject) {

        // renderTexture
        //--------------------
        const renderTexture = PIXI.RenderTexture.create(displayObject.width, displayObject.height)

        // save position
        const transform = [displayObject.x, displayObject.y, displayObject.scale.x, displayObject.scale.y, displayObject.rotation, displayObject.skew.x, displayObject.skew.y, displayObject.pivot.x, displayObject.pivot.y]

        displayObject.position.set(0, 0)
        displayObject.skew.set(0, 0)
        displayObject.rotation = 0

        // render
        //--------------------
        this.opts.renderer.render(displayObject, renderTexture)
        
        // restore position
        displayObject.setTransform(...transform)

        return renderTexture
    }

    /**
     * Removed the first DisplayObject and adds the second one at the exactly same position.
     *
     * @private
     * @param {PIXI.DisplayObject} first - The old DisplayObject.
     * @param {PIXI.DisplayObject} second - The new DisplayObject.
     * @return {Flippable} A reference to the flippable for chaining.
     */
    switchDisplayObject(first, second) {
        if (first && second && first.parent) {
            const parent = first.parent
            const index = parent.getChildIndex(first)
            parent.addChildAt(second, index)
            parent.removeChild(first)
        }

        return this
    }
}


