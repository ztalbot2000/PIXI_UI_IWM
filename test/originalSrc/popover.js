/**
 * 
 */
export default class Popover extends PIXI.Graphics {

    constructor({title = null, text = null, x = 0, y = 0, placement = 'top', width = 250, titleStyle = {}, textStyle = {fontSize: '1.6em'}} = {}) {
        super()

        this.opts = {title, text, x, y, placement, width, titleStyle, textStyle}
        
        this.padding = 12

        let style = {
            fontFamily: 'Arial',
            fontSize: '2em',
            stroke: '#f6f6f6',
            strokeThickness: 3,
            wordWrap: true,
            wordWrapWidth: width - (this.padding * 2)
        }

        this.titleTextStyle = new PIXI.TextStyle(Object.assign({}, style, titleStyle))
        this.textTextStyle = new PIXI.TextStyle(Object.assign({}, style, textStyle))
        
        if (title || text) {
            this.setup()
            this.draw()
            this.positioning()
        }
    }

    setup() {
        this.removeChildren()

        if (this.opts.title) {
            this.titleText = new PIXI.Text(this.opts.title, this.titleTextStyle)
            this.titleText.position.set(this.padding, this.padding)
            this.addChild(this.titleText)
        }

        this.titleY = this.titleText ? this.titleText.y : 0
        this.titleHeight = this.titleText ? this.titleText.height : 0

        if (this.opts.text) {
            this.textText = new PIXI.Text(this.opts.text, this.textTextStyle)
            this.textText.position.set(this.padding, this.titleY + this.titleHeight + this.padding)
            this.addChild(this.textText)
        }

        this.textY = this.textText ? this.textText.y : 0
        this.textHeight = this.textText ? this.textText.height : 0
    }

    close() {
        this.parent.removeChild(this)
    }

    draw() {
        this.clear()
        this.beginFill(0xffffff, 1)
        this.lineStyle(1, 0x282828, .5)

        // Draw rounded rectangle
        const height = this.height + this.padding
        this.drawRoundedRect(0, 0, this.opts.width, height, 8)

        // Draw anchor
        this.drawAnchor(this.opts.placement)

        // Draw title background
        if (this.opts.title) {
            this.lineStyle(0)
            this.beginFill(0xf7f7f7, 1)
            let x = 1
            let y = this.titleText.x + this.titleText.height + (this.padding / 2)
            this.moveTo(x, y)
            y = 9
            this.lineTo(x, y)
            this.quadraticCurveTo(x, y - 8, x + 8, y - 8)
            x += this.opts.width - 7
            y -= 8
            this.lineTo(x, y)
            this.quadraticCurveTo(x + 5, y, x + 5, y + 8)
            x += 5
            y += this.titleText.x + this.titleText.height + (this.padding / 2)
            this.lineTo(x, y)
            if (this.opts.text) {
                x = 1
                this.lineTo(x, y)
            } else {
                this.quadraticCurveTo(x, y, x - 5, y + 4)
                x = 6
                y += 4
                this.lineTo(x, y)
                this.quadraticCurveTo(x, y, x - 5, y - 4)
            }
        }

        this.endFill()
    }

    drawAnchor(placement) {

        let x = 0
        let y = 0

        switch (placement) {
            case 'bottom':
                if (this.opts.title) {
                    this.beginFill(0xf7f7f7, 1)
                }
                x = (this.width / 2) - 10
                y = 1
                this.moveTo(x, y)
                x += 10
                y -= 10
                this.lineTo(x, y)
                x += 10
                y += 10
                this.lineTo(x, y)
                break
            case 'right':
                x = 1
                y = (this.height / 2) - 10
                if (this.titleY + this.titleHeight > y) {
                    this.beginFill(0xf7f7f7, 1)
                }
                this.moveTo(x, y)
                x -= 10
                y += 10
                this.lineTo(x, y)
                x += 10
                y += 10
                this.lineTo(x, y)
                break
            case 'left':
                x = this.width - 2
                y = (this.height / 2) - 10
                if (this.titleY + this.titleHeight > y) {
                    this.beginFill(0xf7f7f7, 1)
                }
                this.moveTo(x, y)
                x += 10
                y += 10
                this.lineTo(x, y)
                x -= 10
                y += 10
                this.lineTo(x, y)
                break
            default:
                x = (this.width / 2) - 10
                y = this.height - 2
                this.moveTo(x, y)
                x += 10
                y += 10
                this.lineTo(x, y)
                x += 10
                y -= 10
                this.lineTo(x, y)
                break
        }
    }

    positioning() {

        const x = this.opts.x
        const y = this.opts.y

        switch (this.opts.placement) {
            case 'bottom':
                this.position.set(x - (this.width / 2), y + 10)
                break
            case 'right':
                this.position.set(x, y - (this.height / 2))
                break
            case 'left':
                this.position.set(x - this.width, y - (this.height / 2))
                break
            default:
                this.position.set(x - (this.width / 2), y - this.height)
                break
        }
    }
}


