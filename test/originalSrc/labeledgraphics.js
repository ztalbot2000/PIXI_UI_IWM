

/**
 * Defines usefull default text styles.
 */
export class FontInfo {

    static get small() {
        return app.theme.textStyleSmall
    }

    static get normal() {
        return app.theme.textStyle
    }

    static get centered() {
        return Object.assign({}, app.theme.textStyle, { align: 'center' })
    }
}

/**
 * Static methods to support hyphenation of lines.
 * 
 * @class Hypenate
 */
export class Hypenate {

    static splitPart(part) {
        let parts = part.split('-')
        if (parts.length == 1)
            return [part]
        let result = []
        let last = parts.pop()
        for (let p of parts) {
            result.push(p + '-')
        }
        result.push(last)
        return result.filter(p => p.length > 0)
    }

    static splitWord(word) {
        if (typeof (language) == 'undefined') {
            if (word.indexOf('-') > -1) {
                return word.split('-')
            }
            return [word]
        }
        let parts = language.hyphenate(word)
        let result = []
        for (let part of parts) {
            for (let splitted of this.splitPart(part)) {
                result.push(splitted)
            }
        }
        return result
    }

    static abbreviateLine(label, style, width) {
        const pixiStyle = new PIXI.TextStyle(style)   
        let metrics = PIXI.TextMetrics.measureText(label, pixiStyle)
        while(metrics.width > width && label.length > 3) {
            label = label.slice(0, label.length-1)
            metrics = PIXI.TextMetrics.measureText(label, pixiStyle)
        }
        label = label.slice(0, label.length-1)
        return label + '…'
    }

    static splitLine(line, pixiStyle, width, space, minus) {
        let x = 0
        let result = ''
        let words = line.split(' ')
        for (let word of words) {
            let wordMetrics = PIXI.TextMetrics.measureText(word, pixiStyle)
            if (x + wordMetrics.width >= width) {
                let parts = this.splitWord(word)
                let newWord = ''
                if (parts.length == 1) {
                    newWord += '\n' + word + ' '
                    x = wordMetrics.width + space.width
                }
                else {
                    let first = true
                    let lastPart = ''
                    for (let part of parts) {
                        let partMetrics = PIXI.TextMetrics.measureText(part, pixiStyle)
                        if (x + partMetrics.width + space.width > width) {
                            newWord += ((first || lastPart.endsWith('-')) ? '\n' : '-\n') + part
                            x = partMetrics.width
                        }
                        else {
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
            else {
                result += word + ' '
                x += wordMetrics.width + space.width
            }
        }
        return result
    }

    /**
     *  Main method and entry point for text hyphenation 
     *
     * @static
     * @param {*} text
     * @param {*} style
     * @param {*} width
     * @memberof Hypenate
     * @returns {string}
     */
    static splitLines(text, style, width) {
        const pixiStyle = new PIXI.TextStyle(style)
        const lines = text.split('\n')
        const space = PIXI.TextMetrics.measureText(' ', pixiStyle)
        const minus = PIXI.TextMetrics.measureText('-', pixiStyle)
        let result = []
        for (let line of lines) {
            result.push(this.splitLine(line, pixiStyle, width, space, minus))
        }
        return result.join('\n')
    }
}

class TextLabel extends PIXI.Text {

    /**
     *Creates an instance of TextLabel.
     * @param {string} text - The string that you would like the text to display
     * @param {object|PIXI.TextStyle} [style] - The style parameters 
     * @param {canvas} 
     * @memberof TextLabel
     */
    constructor(text, style=null, canvas=null, { minZoom = 0.1, maxZoom = 10} = {}) {
        super(text, style, canvas )
        this.normFontSize = this.style.fontSize 
        this.minZoom = minZoom
        this.maxZoom = maxZoom
    }

    zoom(factor) {
        let oldValue = parseFloat(this.style.fontSize) / this.normFontSize
        let value = oldValue * factor
        this.setZoom(value)
    }

    setZoom(value) {
        let oldValue = parseFloat(this.style.fontSize) / this.normFontSize
        if (value > this.maxZoom) {
            value = this.maxZoom
        }
        if (value < this.minZoom) {
            value = this.minZoom
        }
        if (value != oldValue) {
            this.style.fontSize = Math.max(value * this.normFontSize, 1)
        }
    }

    setZoomAndScale(scale) {
        this.scale.set(1 / scale)
        this.setZoom(scale)
    }
}

/**
 * A specialization of the PIXI.Graphics class that allows to
 * resuse and place labels across different layout variants
 *
 * @export
 * @class LabeledGraphics
 * @extends {PIXI.Graphics}
 */
export class LabeledGraphics extends PIXI.Graphics {

    /**
     * Creates an instance of LabeledGraphics and defines a local label cache.
     * 
     * @memberof LabeledGraphics
     */
    constructor() {
        super()
        this.labels = new Map()
    }

    _createText(label, fontInfo) {
        return new TextLabel(label, fontInfo)
    }

    
    /**
     * Main additional method. Ensures that a text object is created that is cached
     * under the given key.
     *
     * @param {*} key - The cache key
     * @param {*} label - The label to show
     * @param {*} [attrs={}] - Defines attributes of the text object. 
     *                               align: 'right', 'left', or 'center'
     *                               justify: 'top', 'bottom', or 'center'
     *                               maxLines: {integer} truncates the text and adds ellipsis
     *                               maxHeight: {number} truncates text that needs more space and adds ellipsis
     *                               maxWidth: {number} word wraps text using hyphenation if possible
     * @param {*} [fontInfo=FontInfo.normal] - Defines PIXI.TextStyle attributes
     * @returns {PIXI.Text} - instance
     * @memberof LabeledGraphics
     */
    ensureLabel(key, label, attrs = {}, fontInfo = FontInfo.normal) {

        if (attrs.maxWidth && attrs.maxLines == 1) {
            label = Hypenate.abbreviateLine(label, fontInfo, attrs.maxWidth)
        }
        else {
            if (attrs.maxWidth) {
                label = Hypenate.splitLines(label, fontInfo, attrs.maxWidth)
            }
            if (attrs.maxLines) {
                label = this.truncateLabel(label, fontInfo, attrs.maxLines)
            }
            if (attrs.maxHeight) {
                let styleInfo = new PIXI.TextStyle(fontInfo)
                let metrics = PIXI.TextMetrics.measureText(label, styleInfo)
                let maxLines = Math.max(attrs.maxHeight / metrics.lineHeight, 1)
                label = this.truncateLabel(label, fontInfo, maxLines)
            }
        }
       
        if (!this.labels.has(key)) {
            let text = this._createText(label, fontInfo)
            this.labels.set(key, text)
            this.addChild(text)
        }
        let text = this.labels.get(key)
        for (let k in attrs) {
            text[k] = attrs[k]
        }
        if (label != text.text)
            text.text = label
        // We do not follow the flexbox jargon and use align for x and justify for y axis
        // This deviation is needed to ensure backward compatability
        switch (attrs.justify || null) {
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
        switch (attrs.align) {
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

    /**
     * Private method that truncates the text and adds an ellipsis if there are more lines
     * than wanted
     *
     * @param {*} text
     * @param {*} style
     * @param {*} [maxLines=Infinity]
     * @returns {string}
     * @memberof LabeledGraphics
     */
    truncateLabel(text, style, maxLines = Infinity) {
        if (maxLines === Infinity) {
            return text
        }
        const { wordWrapWidth } = style
        const pixiStyle = new PIXI.TextStyle(style)
        const { lines } = PIXI.TextMetrics.measureText(text, pixiStyle)
        let newText = text
        if (lines.length > maxLines) {
            const truncatedLines = lines.slice(0, maxLines)
            const lastLine = truncatedLines[truncatedLines.length - 1]
            const words = lastLine.split(' ')
            const wordMetrics = PIXI.TextMetrics.measureText(`\u00A0\n...\n${words.join('\n')}`, pixiStyle)
            const [spaceLength, dotsLength, ...wordLengths] = wordMetrics.lineWidths
            const { text: newLastLine } = wordLengths.reduce((data, wordLength, i) => {
                if (data.length + wordLength + spaceLength >= wordWrapWidth) {
                    return { ...data, length: wordWrapWidth }
                }
                return {
                    text: `${data.text}${i > 0 ? ' ' : ''}${words[i]}`,
                    length: data.length + wordLength + spaceLength,
                };
            }, { text: '', length: dotsLength })
            truncatedLines[truncatedLines.length - 1] = `${newLastLine}...`
            newText = truncatedLines.join('\n')
        }
        return newText
    }

    /**
     * Returns the label for the given key.
     *
     * @param {*} key
     * @returns {Object}
     * @memberof LabeledGraphics
     */
    getLabel(key) {
        return this.labels.get(key)
    }

    /** 
     * Hides the label with the given key.
     * @param {*} key
     * @memberof LabeledGraphics
     */
    hideLabel(key) {
        let label = this.labels.get(key)
        if (label) {
            label.visible = false
        }
    }

    /** 
     * Removes the label with the given key.
     * @param {*} key
     * @memberof LabeledGraphics
     */
    removeLabel(key) {
        let label = this.labels.get(key)
        this.labels.delete(key)
        label.destroy()
    }

   
    /**
     * Ensures that labels are hidden on clear.
     *
     * @memberof LabeledGraphics
     */
    clear() {
        super.clear()
        for (let key of this.labels.keys()) {
            this.hideLabel(key)
        }
    }

    /**
     * Logs debugging infos
     *
     * @memberof LabeledGraphics
     */
    debugInfos() {
        console.log({ size: this.labels.size, labels: this.labels })
    }
}


const labelCache = new Map()

function getTexture(label, fontInfo = FontInfo.normal) {
    let key = label + fontInfo.fontFamily + fontInfo.fontSize

    if (labelCache.has(key)) {
        return labelCache.get(key)
    }
    let expandedFont = Object.assign({}, fontInfo)
    expandedFont.fontSize *= window.devicePixelRatio
    let text = new PIXI.Text(label, expandedFont)
    text.updateText()
    labelCache.set(key, text.texture)
    return text.texture
}

class SpriteLabel extends PIXI.Sprite {

    constructor(label, fontInfo) {
        let texture = getTexture(label, fontInfo)
        super(texture)
        this.label = label
        this.fontInfo = fontInfo
        this.scale.set(0.8 / window.devicePixelRatio)
    }

    set text(label) {
        this.label = label
        this.texture = getTexture(label, this.fontInfo)
    }

    get text() {
        return this.label
    }
}

export class BitmapLabeledGraphics extends LabeledGraphics {

    _createText(label, fontInfo) {
        let texture = getTexture(label, fontInfo)
        return new SpriteLabel(texture)
    }

}
