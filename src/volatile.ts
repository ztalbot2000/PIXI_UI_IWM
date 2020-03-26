import * as PIXI from 'pixi.js'

import  Tween  from './Ease/Tween';
import Ease from './Ease/Ease';


import Theme from './theme'


//
// Class that represents a PixiJS Volatile.
//
// @example
// const app = new PIXIApp({
//     view: canvas,
//     width: 900,
//     height: 250
// }).setup().run()
//
// const button = new Button({
//     label: 'Volatile!',
//     action: () => {
//         new Volatile({
//             object: button,
//             direction: 'right',
//             destroyOnComplete: false
//         })
//     }
// })
//
// app.scene.addChild(button)
//
// @class
// @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/volatile.html|DocTest}
//

interface VolatileOptions
{
    theme?: Theme;
    // PIXI.utils.uid(),
    id?: number;
    object?: Array< PIXI.DisplayObject >;
    // 'top' | 'right' | 'bottom' | 'left'
    direction?: string;
    onStart?: Function;
    onComplete?: Function;
    distance?: number;
    duration?: number;
    // @ts-ignore TS2503: Cannot find namespace 'Quad'
    ease?: Ease.Quad.easeOut;
    destroyOnComplete?: number;
}

export default class Volatile
{
    //
    // Creates an instance of a Volatile.
    //
    // @constructor
    // @param {object} [opts]
    //        - An options object to specify to style and behaviour of the modal.
    // @param {number} [opts.id=auto generated]
    //        - The id of the tooltip.
    // @param {PIXI.DisplayObject|PIXI.DisplayObject[]} opts.object
    //        - The object where the volatile should be applied to.
    // @param {string} [opts.direction=top]
    //        - The animation direction. Possible values: top, right, bottom, left.
    // @param {function} [opts.onStart]
    //        - A function which is executed when the volatile animation starts.
    // @param {function} [opts.onComplete]
    //        - A function which is executed when the volatile animation finishes.
    // @param {number} [opts.distance=160]
    //        - The animation distance.
    // @param {number} [opts.duration=1.5]
    //        - The duration of the animation in seconds.
    // @param {object} [opts.ease=Quad.easeOut]
    //        - The easing of the animation,
    //          see {@link https://greensock.com/docs/Easing}
    // @param {boolean} [opts.destroyOnComplete=true]
    //        - Should the object be destroyed after the volatile animation?
    //

    readonly opts: VolatileOptions
    readonly theme: Theme
    readonly id: number
    private objects: Array<PIXI.DisplayObject>

    constructor(opts:VolatileOptions = {})
    {
        const theme = Theme.fromString(opts.theme)
        this.theme = theme

        this.opts = Object.assign({},
        {
            id: PIXI.utils.uid(),
            object: null,
            // top, right, bottom, left
            direction: 'top',
            onStart: null,
            onComplete: null,
            distance: 160,
            duration: 1.5,
            ease: Ease.Quad.easeOut,
            destroyOnComplete: true
        }, opts)

        this.id = this.opts.id

        if (!Array.isArray(this.opts.object))
            this.opts.object = [this.opts.object]

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

    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return {Volatile} A reference to the volatile for chaining.
    //
    private setup(): Volatile
    {
        return this
    }

    //
    // Should be called to refresh the layout of the volatile.
    // Can be used after resizing.
    //
    // @return {Volatile} A reference to the volatile for chaining.
    //
    private layout(): Volatile
    {
        return this
    }

    //
    // Starts the volatile animation.
    //
    // @private
    // @return {Volatile} A reference to the volatile for chaining.
    //
    private run(): Volatile
    {
        //B Bug fix found during Unit Testing.  Objects should not be an option
        //B but a requirement. Otherwise an objects will be created as an array
        //B with one element and that element is null.
        //Fixme   Change objects to be a required parameter. TBD as this currently
        //Fixme   would break comparison testing.
        if ( this.objects.length == 1 && this.objects[0] == null )
           throw("Error: Volatile, no object(s) passed in. This should be changed to a required parameter instead of an option");

        for (let object of this.objects)
        {
            let x = object.x
            let y = object.y

            switch (this.opts.direction)
            {
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

            Tween.to(object, this.opts.duration,
            {
                x: x,
                y: y,
                alpha: 0,
                ease: this.opts.ease,
                //O overwrite: 'all',
                // Overwrite is true/false/"auto". Assume true
                overwrite: true,
                onStart: () =>
                {
                    if (this.opts.onStart)
                        this.opts.onStart.call(object, object)
                },
                onComplete: () =>
                {
                    if (this.opts.onComplete)
                        this.opts.onComplete.call(object, object)

                    if (this.opts.destroyOnComplete)
                    {
                        //O object.destroy({children: true})
                        // PIXI DisplayObject.destroy has no children option
                        object.destroy()
                    }
                }
            })
        }

        return this
    }
}
