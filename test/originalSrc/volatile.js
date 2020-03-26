/* global Quad */

import Theme from './theme.js'
import Tween from '../../src/Ease/Tween'
import Quad from '../../src/Ease/Tween'

/**
 * Class that represents a PixiJS Volatile.
 * 
 * @example
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 900,
 *     height: 250
 * }).setup().run()
 * 
 * const button = new Button({
 *     label: 'Volatile!',
 *     action: () => {
 *         new Volatile({
 *             object: button,
 *             direction: 'right',
 *             destroyOnComplete: false
 *         })
 *     }
 * })
 * 
 * app.scene.addChild(button)
 *
 * @class
 * @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/volatile.html|DocTest}
 */
export default class Volatile {
    
    /**
     * Creates an instance of a Volatile.
     * 
     * @constructor
     * @param {object} [opts] - An options object to specify to style and behaviour of the modal.
     * @param {number} [opts.id=auto generated] - The id of the tooltip.
     * @param {PIXI.DisplayObject|PIXI.DisplayObject[]} opts.object - The object where the volatile should be applied to.
     * @param {string} [opts.direction=top] - The animation direction. Possible values: top, right, bottom, left.
     * @param {function} [opts.onStart] - A function which is executed when the volatile animation starts.
     * @param {function} [opts.onComplete] - A function which is executed when the volatile animation finishes.
     * @param {number} [opts.distance=160] - The animation distance.
     * @param {number} [opts.duration=1.5] - The duration of the animation in seconds.
     * @param {object} [opts.ease=Quad.easeOut] - The easing of the animation, see {@link https://greensock.com/docs/Easing}
     * @param {boolean} [opts.destroyOnComplete=true] - Should the object be destroyed after the volatile animation?
     */
    constructor(opts = {}) {
        
        const theme = Theme.fromString(opts.theme)
        this.theme = theme

        this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            object: null,
            direction: 'top',               // top, right, bottom, left
            onStart: null,
            onComplete: null,
            distance: 160,
            duration: 1.5,
            ease: Quad.easeOut,
            destroyOnComplete: true
        }, opts)

        this.id = this.opts.id

        if (!Array.isArray(this.opts.object)) {
            this.opts.object = [this.opts.object]
        }

        this.objects = this.opts.object

        // setup
        //-----------------
        this.setup()

        // layout
        //-----------------
        this.layout()

        // run
        //-----------------
        this.run()
    }
    
    /**
     * Creates children and instantiates everything.
     * 
     * @private
     * @return {Volatile} A reference to the volatile for chaining.
     */
    setup() {

        return this
    }
    
    /**
     * Should be called to refresh the layout of the volatile. Can be used after resizing.
     * 
     * @return {Volatile} A reference to the volatile for chaining.
     */
    layout() {
        
        return this
    }
    
    /**
     * Starts the volatile animation.
     * 
     * @private
     * @return {Volatile} A reference to the volatile for chaining.
     */
    run() {

        for (let object of this.objects) {

            let x = object.x
            let y = object.y

            switch (this.opts.direction) {
                case 'top':
                    y -= this.opts.distance
                    break
                case 'right':
                    x += this.opts.distance
                    break
                case 'bottom':
                    y += this.opts.distance
                    break
                case 'left':
                    x -= this.opts.distance
                    break
            }

            //O TweenMax.to(object, this.opts.duration, {
            Tween.to(object, this.opts.duration, {
                x: x,
                y: y,
                alpha: 0,
                ease: this.opts.ease,
                overwrite: 'all',
                onStart: () => {
                    if (this.opts.onStart) {
                        this.opts.onStart.call(object, object)
                    }
                },
                onComplete: () => {
                    
                    if (this.opts.onComplete) {
                        this.opts.onComplete.call(object, object)
                    }

                    if (this.opts.destroyOnComplete) {
                        object.destroy({children: true})
                    }
                }
            })
        }

        return this
    }
}


