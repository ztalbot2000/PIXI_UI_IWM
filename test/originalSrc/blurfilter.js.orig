/**
 * A Gaussian blur filter. With this filter, you can blur an area of a PIXI.DisplayObject. This cannot
 * be done with the PIXI.filters.BlurFilter (when you use the PIXI.filters.BlurFilter with
 * an filter area, all pixels outside of the area are not displayed). Attention: The area of
 * the filter is always in global scope, NOT relative to the PIXI.DisplayObject the filter
 * is assigned to!
 *
 * @example
 * // Create the app
 * const app = new PIXIApp({
 *     view: canvas,
 *     width: 480,
 *     height: 270,
 *     transparent: false
 * }).setup().run()
 * 
 * // Add a video sprite
 * const sprite = new PIXI.Sprite(PIXI.Texture.fromVideo("assets/blurfilter.mp4"))
 * sprite.width = app.size.width
 * sprite.height = app.size.height
 * app.scene.addChild(sprite)
 * 
 * // Create the filter and assign it to the scene
 * const blurFilter = new BlurFilter(new PIXI.Rectangle(20, 20, 80, 60))
 * app.scene.filters = [blurFilter]
 * 
 * @class
 * @extends PIXI.Filter
 * @param {PIXI.Rectangle|PIXI.DisplayObject} rectangle The area where the blur effect should be applied to. Relative to the
 *     canvas, NOT relative to the PIXI.DisplayObject where the blur effect is assigned to!
 * @param {number} [blur=50] The strength of the blur.
 */
export default class BlurFilter extends PIXI.Filter {
    
    constructor(rectangle, blur = 50) {
        super()

        if (rectangle instanceof PIXI.DisplayObject) {
            rectangle = rectangle.getBounds()
        }

        this.tiltShiftXFilter = new TiltShiftXFilter(rectangle, blur)
        this.tiltShiftYFilter = new TiltShiftYFilter(rectangle, blur)
    }

    apply(filterManager, input, output) {
        let renderTarget = filterManager.getRenderTarget(true)
        this.tiltShiftXFilter.apply(filterManager, input, renderTarget)
        this.tiltShiftYFilter.apply(filterManager, renderTarget, output)
        filterManager.returnRenderTarget(renderTarget)
        //console.log(filterManager)
    }

    /**
     * The strength of the blur.
     *
     * @member {number}
     */
    get blur() {
        return this.tiltShiftXFilter.blur
    }
    set blur(value) {
        this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = value
    }
    
    /**
     * The blur rectangle.
     *
     * @member {PIXI.Rectangle}
     */
    get rectangle() {
        return this.tiltShiftXFilter.rectangle
    }
    set rectangle(value) {
        
        if (value instanceof PIXI.DisplayObject) {
            value = value.getBounds()
        }

        this.tiltShiftXFilter.rectangle = this.tiltShiftYFilter.rectangle = value
    }
}

/**
 * A TiltShiftAxisFilter.
 *
 * @class
 * @extends PIXI.Filter
 * @abstract
 * @private
 */
class TiltShiftAxisFilter extends PIXI.Filter {

    constructor(rectangle, blur){

        const vertex = `
            attribute vec2 aVertexPosition;
            attribute vec2 aTextureCoord;

            uniform mat3 projectionMatrix;

            varying vec2 vTextureCoord;

            void main(void) {
                gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
                vTextureCoord = aTextureCoord;
            }
        `

        const fragment = `
            varying vec2 vTextureCoord;

            uniform vec4 filterArea;
            uniform sampler2D uSampler;
            uniform vec4 rectangle;
            uniform float blur;
            uniform vec2 delta;
            uniform vec2 texSize;

            float random(vec3 scale, float seed) {
                return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
            }

            void main(void) {
                // textureCoord to pixelCoord
                vec2 pixelCoord = vTextureCoord * filterArea.xy - vec2(4.0, 4.0);   // FIXME: There's a shift of 4 * 4 pixels, don't know why...

                if (pixelCoord.x >= rectangle.x && pixelCoord.x <= rectangle.z && pixelCoord.y >= rectangle.y && pixelCoord.y <= rectangle.w) {
                    vec4 color = vec4(0.0);
                    float total = 0.0;

                    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);

                    for (float t = -30.0; t <= 30.0; t++) {
                        float percent = (t + offset - 0.5) / 30.0;
                        float weight = 1.0 - abs(percent);
                        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * blur);
                        sample.rgb *= sample.a;
                        color += sample * weight;
                        total += weight;
                    }

                    gl_FragColor = color / total;
                    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;
                } else {
                    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
                }
            }
        `

        super(vertex, fragment)

        this.uniforms.rectangle = [rectangle.left, rectangle.top, rectangle.right, rectangle.bottom]
        this.uniforms.blur = blur
        this.uniforms.delta = new PIXI.Point(0, 0)
        this.uniforms.texSize = new PIXI.Point(480, 270)

        this.updateDelta()
    }

    /**
     * The strength of the blur.
     *
     * @member {number}
     * @memberof PIXI.filters.TiltShiftAxisFilter#
     */
    get blur() {
        return this.uniforms.blur
    }
    set blur(value) {
        this.uniforms.blur = value
    }
    
    /**
     * The blur rectangle.
     *
     * @member {PIXI.Rectangle}
     * @memberof PIXI.filters.TiltShiftAxisFilter#
     */
    get rectangle() {
        const rect = this.uniforms.rectangle
        return new PIXI.Rectangle(rect[0], rect[1], rect[2], rect[3])
    }
    set rectangle(value) {
        this.uniforms.rectangle = [value.left, value.top, value.right, value.bottom]
    }
}

/**
 * A TiltShiftXFilter.
 *
 * @class
 * @extends PIXI.TiltShiftAxisFilter
 * @private
 */
class TiltShiftXFilter extends TiltShiftAxisFilter {
    /**
     * Updates the filter delta values.
     */
    updateDelta() {
        this.uniforms.delta.x = 0.1
        this.uniforms.delta.y = 0
    }
}

/**
 * A TiltShiftYFilter.
 *
 * @class
 * @extends PIXI.TiltShiftAxisFilter
 * @private
 */
class TiltShiftYFilter extends TiltShiftAxisFilter {
    /**
     * Updates the filter delta values.
     */
    updateDelta() {
        this.uniforms.delta.x = 0
        this.uniforms.delta.y = 0.1
    }
}



