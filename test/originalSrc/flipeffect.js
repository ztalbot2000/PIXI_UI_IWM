import {getId, Angle} from '../utils.js'
import {DOMScatter} from '../scatter.js'
import {CardLoader, DOMFlip, DOMFlippable} from '../flippable.js'
import {Capabilities} from '../capabilities.js'
import {DeepZoomInfo, DeepZoomImage} from './deepzoom.js'

let globalScatterLoaderCanvas = null

export class ScatterLoader extends CardLoader {

    get scatter() {
        return this.src
    }

    unscaledSize() {
        let displayObject = this.scatter.displayObject
        let w = displayObject.width
        let h = displayObject.height
        return [w / displayObject.scale.x, h / displayObject.scale.y]
    }

    scaledSize() {
        let displayObject = this.scatter.displayObject
        let w = displayObject.width
        let h = displayObject.height
        return [w, h]
    }

    cloneScatterImage() {
        let w = this.scatter.width
        let h = this.scatter.height
        let isSprite = this.scatter.displayObject instanceof PIXI.Sprite
        let isDeepZoom = this.scatter.displayObject instanceof DeepZoomImage
        let resolution = app.renderer.resolution
        if (isSprite) {
            w = this.scatter.displayObject.texture.width
            h = this.scatter.displayObject.texture.height
        }
        else if (isDeepZoom) {
            let [ww, hh] = this.scatter.displayObject.baseSize
            w = ww
            h = hh
        }
        if (globalScatterLoaderCanvas === null) {
            globalScatterLoaderCanvas = document.createElement('canvas')
        }
        let canvas = globalScatterLoaderCanvas
        canvas.width = w
        canvas.height = h
        let renderer = new PIXI.WebGLRenderer(w, h, {
                                    view: canvas,
                                    resolution: resolution})

        let displayObject = this.scatter.displayObject
        let x = displayObject.x
        let y = displayObject.y
        let rot = displayObject.rotation
        let sx = displayObject.scale.x
        let sy = displayObject.scale.y
        displayObject.rotation = 0
        // The Safari WebGLRenderer wants everything flipped
        // See https://github.com/pixijs/pixi.js/issues/2283
        displayObject.x = 0
        if (Capabilities.isSafari) {
            displayObject.y = h
            displayObject.scale.set(1, -1) // sx, -sy)
        }
        else {
            displayObject.y = 0
            displayObject.scale.set(1, 1)
        }
        if (isSprite) {
            displayObject.width = w
            displayObject.height = h
        }
        renderer.render(displayObject)
        displayObject.rotation = rot
        displayObject.x = x
        displayObject.y = y
        displayObject.scale.set(sx, sy)

        let url = canvas.toDataURL()
        return [x, y, w, h, url]
    }

    load(domNode) {
        return new Promise((resolve, reject) => {
            let isImage = domNode instanceof HTMLImageElement
            let isSprite = this.scatter.displayObject instanceof PIXI.Sprite
            let image = (isImage) ? domNode : document.createElement("img")
            let [x, y, w, h, cloneURL] = this.cloneScatterImage()
            let [ww, hh] = this.unscaledSize()
            image.onload = (e) => {
                if (!isImage)
                    domNode.appendChild(image)
                this.x = x
                this.y = y
                this.wantedWidth = ww
                this.wantedHeight = hh
                this.scale = 1
                this.rotation = this.scatter.rotation
                resolve(this)
            }
            image.onerror = (e) => {
                reject(this)
            }
            image.src = cloneURL
            })
    }

}

export default class FlipEffect {

    constructor(scatter, domScatterContainer, flipTemplate, backLoader) {
        this.flipped = false
        this.scatter = scatter
        this.backLoader = backLoader
        this.scatterLoader = new ScatterLoader(scatter)
        this.domFlip = new DOMFlip(domScatterContainer, flipTemplate,
                                    this.scatterLoader,
                                    backLoader, {
                                        onBack: this.backCardClosed.bind(this)
                                    })
        this.setupInfoButton()
    }

    startFlip() {
        let center = this.flipCenter()
        let loader = this.backLoader
        this.domFlip.load().then((domFlip) => {
            this.scatter.displayObject.visible = false
            domFlip.centerAt(center)
            domFlip.zoom(this.scatter.scale)
            let target = this.constraintFlipCenter(center, loader)
            console.log("FlipEffect.startFlip", target, loader)
            domFlip.start({targetCenter: target})
        })
    }

    unscaledSize() {
        return this.scatterLoader.unscaledSize()
    }

    flipCenter() {
        let isSprite = this.scatter.displayObject instanceof PIXI.Sprite
        let resolution = (isSprite) ? app.renderer.resolution : 1
        let center = this.scatter.center
        let canvas = app.renderer.view
        let domNode = this.domFlip.domScatterContainer.element
        let page = window.convertPointFromNodeToPage(canvas,
                                                        center.x*resolution,
                                                        center.y*resolution)
        let local = window.convertPointFromPageToNode(domNode, page.x, page.y)
        return local
    }

    constraintFlipCenter(center, loader) {
        let w = loader.wantedWidth
        let h = loader.wantedHeight
        console.log("constraintFlipCenter", w, h)
        let canvas = app.renderer.view
        let x = center.x
        let y = center.y
        if (x < w/2)
            x = w/2
        if (y < h/2)
           y = h/2
        if (x > canvas.width)
            x = canvas.width - w/2
        if (y > canvas.height)
            y = canvas.height - h/2
        return { x, y }
    }

    setupInfoButton() {
        let iscale = 1.0 / this.scatter.scale
        this.infoBtn = new PIXI.Graphics()
        this.infoBtn.beginFill(0x333333)
        this.infoBtn.lineStyle(4, 0xFFFFFF)
        this.infoBtn.drawCircle(0, 0, 22)
        this.infoBtn.endFill()

        this.infoBtn.beginFill(0xFFFFFF)
        this.infoBtn.lineStyle(0)
        this.infoBtn.drawCircle(0, -8, 4)
        this.infoBtn.endFill()

        this.infoBtn.lineStyle(6, 0xFFFFFF)
        this.infoBtn.moveTo(0, -2)
        this.infoBtn.lineTo(0, 14)
        this.infoBtn.endFill()

        this.infoBtn.on('click', (e) => { this.infoSelected() })
        this.infoBtn.on('tap', (e) => { this.infoSelected() })

        this.infoBtn.interactive = true
        this.infoBtn.width = 44
        this.infoBtn.height = 44
        this.infoBtn.pivot.x = 30
        this.infoBtn.pivot.y = 30

        let displayObject = this.scatter.displayObject
        let [w, h] = this.unscaledSize()
        this.infoBtn.position = new PIXI.Point(w, h)
        if (displayObject.foreground) {
            this.infoBtn.scale.x = iscale
            this.infoBtn.scale.y = iscale
            displayObject.foreground.addChild(this.infoBtn)
        }
        else {
            displayObject.addChild(this.infoBtn)
        }

        this.scatter.addTransformEventCallback(e => {
            let displayObject = this.scatter.displayObject
            if (displayObject.foreground) {
                if (e.scale) {
                    let iscale = 1.0 / e.scale
                    this.infoBtn.scale.x = iscale
                    this.infoBtn.scale.y = iscale
                }
            }
        })
    }

    setupButton(url) {
        let svgImage = new Image()
        let canvas = document.createElement('canvas')
        canvas.width = 88 * 4
        canvas.height = 44 * 4
        svgImage.onload = e => {
            let displayObject = this.scatter.displayObject
            canvas.getContext ('2d').drawImage(svgImage, 0, 0,
                                            canvas.width, canvas.height)
            let texure = new PIXI.Texture(new PIXI.BaseTexture(canvas))
            this.infoBtn = new PIXI.Sprite(texure)
            this.infoBtn.anchor.set(0.5, 0.5)
            if (displayObject.foreground) {
                displayObject.foreground.addChild(this.infoBtn)
            }
            else {
                displayObject.addChild(this.infoBtn)
            }
            this.infoBtn.scale.set(0.5, 0.5)

            let [w, h] = this.unscaledSize()
            this.infoBtn.position = new PIXI.Point(w, h)
            this.infoBtn.interactive = true
            this.infoBtn.updateTransform()
            this.infoBtn.on('click', (e) => { this.infoSelected() })
            this.infoBtn.on('tap', (e) => { this.infoSelected() })
        }
        svgImage.src = url
    }

    infoSelected() {
        this.startFlip()
    }

    backSelected() {
        this.domFlip.start()
    }

    backCardClosed() {
        /*** The flip effect should now be in it's initial state again. All
        memory should be freed. ***/
        let displayObject = this.scatter.displayObject
        displayObject.visible = true
        this.domFlip.fadeOutAndRemove()
        this.flipped = false
    }

    targetRotation(alpha) {
        let ortho = 90
        let rest = alpha % ortho
        let delta = 0.0
        if (rest > (ortho / 2.0)) {
            delta = ortho - rest
        }
        else {
            delta = -rest
        }
        return delta
    }
}



