import { Cycle, Colors, Dates, isEmpty } from '../utils.js'
import { Capabilities } from '../capabilities.js'
import { BitmapLabeledGraphics, LabeledGraphics, FontInfo } from './labeledgraphics.js'


export class Ticks {

    get reservedPrefixes() {
        return ['decade', 'year', 'month', 'day', 'hour', 'minute', 'second']
    }

    get minWidth() {
        return 10
    }

    format(available) {
        return { year: '2-digit', timeZone: 'UTC' }
    }

    get minLabelWidth() {
        return 44
    }

    get formatKey() {
        return this.key
    }

    dateKey(date) {
        return this.key + date.getFullYear()
    }

    *iter(start, end) {
        let date = this.iterStart(start)
        while (date <= end) {
            yield date
            date = this.next(date)
        }
        yield date
    }

    *iterRanges(range) {
        for (let date of this.iter(range.start, range.end)) {
            let next = this.next(date)
            yield { start: date, end: next }
        }
    }

    selectedRange(timeline, info) {
        let first = null
        let last = null
        let visibleFirst = null
        let visibleLast = null
        let units = 0
        for (let { start, end } of this.iterRanges(info)) {
            if (timeline.visibleRange(start, end)) {
                if (first == null) {
                    first = start
                }
                last = end
            }
            if (timeline.visibleDate(start) && timeline.visibleDate(end)) {
                units += 1
                if (visibleFirst == null) {
                    visibleFirst = start
                }
                visibleLast = end
            }
        }
        if (first == null)
            return info
        return { start: first, end: last, visibleStart: visibleFirst, visibleEnd: visibleLast, units: units }
    }

    drawTick(timeline, x, y, date) {
        let visible = date > timeline.start && date < timeline.end
        if (!visible)
            return false
        timeline.drawTick(x)
        return true
    }

    toLocaleString(date, format) {
        return date.toLocaleDateString('de', format)
    }

    draw(timeline, range, width, height, available, format, nextFormat, level) {
        let first = null
        let last = null
        let keyedFormat = (format) ? format[this.formatKey] : null
        let keyedNextFormat = (nextFormat) ? nextFormat[this.formatKey] : null
        let redundant = (nextFormat) ? this.formatKey in nextFormat : false
        let fullyRedundant = keyedFormat != null && keyedFormat == keyedNextFormat
        let y = timeline.getY()

        for (let { start, end } of this.iterRanges(range)) {
            let x = timeline.toX(start)
            let xx = x
            let yy = y + timeline.tickLabelOffset(-1)
            if (this.drawTick(timeline, x, y, start) && format) {
                let key = this.dateKey(start)
                let text = this.toLocaleString(start, format)
                let align = 'center'
                let downTick = false
                if (nextFormat) {
                    yy = y + timeline.tickLabelOffset(-1, 1)
                    align = 'left'
                    timeline.drawTick(x, 4.2)
                    let nextX = timeline.toX(end) - 100
                    if (x < 0 && nextX > -100 && !redundant) {
                        xx = Math.min(4, nextX)
                    }
                    else {
                        xx -= 2
                    }
                    downTick = true
                }
                else if (level > 0) {
                    xx = x + available / 2
                }
                else {
                    downTick = true
                }
                if (!fullyRedundant) {
                    timeline.ensureLabel(key, text,
                        { x: xx, y: yy, align },
                        FontInfo.small)
                }
                if (downTick) timeline.drawTick(x, -1)
            }
            if (timeline.visibleRange(start, end)) {
                if (first == null)
                    first = start
                last = end
            }
        }
        if (first == null)
            return null
        return { start: first, end: last }
    }
}

export class DecadeTicks extends Ticks {

    get milliseconds() {
        return 10 * 365 * 24 * 60 * 60 * 1000
    }

    format(available) {
        return { year: 'numeric', timeZone: 'UTC' }
    }

    selection(timeline, dates, selected) {
        return dates
    }

    get key() {
        return 'decade'
    }

    get formatKey() {
        return 'year'
    }

    iterStart(start) {
        let modulo = start.getFullYear() % 10
        let year = start.getFullYear() - modulo
        return Dates.create(year, 0, 1)
    }

    next(decade) {
        return Dates.nextYear(decade, 10)
    }
}

export class YearTicks extends Ticks {

    get milliseconds() {
        return 365 * 24 * 60 * 60 * 1000
    }

    format(available) {
        if (available < 44)
            return { year: '2-digit', timeZone: 'UTC' }
        return { year: 'numeric', timeZone: 'UTC' }
    }

    get minLabelWidth() {
        return 22
    }

    get key() {
        return 'year'
    }

    iterStart(start) {
        return Dates.create(start.getFullYear(), 0, 1)
    }

    next(year) {
        return Dates.nextYear(year)
    }
}

export class MonthTicks extends Ticks {

    get milliseconds() {
        return (365 / 12) * 24 * 60 * 60 * 1000
    }

    format(available) {
        let format = { month: 'narrow', timeZone: 'UTC' }
        if (available > 44)
            format.month = 'short'
        if (available > 66)
            format.year = '2-digit'
        if (available > 100) {
            format.month = 'long'
            format.year = 'numeric'
        }
        return format
    }

    get minLabelWidth() {
        return 32
    }

    get key() {
        return 'month'
    }

    dateKey(date) {
        return this.key + date.getFullYear() + date.getMonth()
    }

    iterStart(start) {
        return Dates.create(start.getFullYear(), start.getMonth(), 1)
    }

    next(month) {
        return Dates.nextMonth(month)
    }
}

export class DayTicks extends Ticks {

    get milliseconds() {
        return 24 * 60 * 60 * 1000
    }

    format(available) {
        let format = { day: 'numeric', timeZone: 'UTC' }
        if (available > 44)
            format.month = 'short'
        if (available > 100) {
            format.month = 'long'
            format.year = '2-digit'
        }
        if (available > 150) {
            format.weekday = 'short'
        }
        if (available > 200) {
            format.year = 'numeric'
            format.weekday = 'long'
        }
        return format
    }

    get key() {
        return 'day'
    }

    dateKey(date) {
        return this.key + date.getFullYear() + date.getMonth() + date.getDate()
    }

    iterStart(start) {
        return Dates.create(start.getFullYear(), start.getMonth(), start.getDate())
    }

    next(date) {
        return Dates.nextDay(date)
    }
}

export class HourTicks extends Ticks {

    get milliseconds() {
        return 60 * 60 * 1000
    }

    format(available) {
        let format = {}
        if (available > 44) {
            format.hour = '2-digit'
        }
        if (available > 100) {
            format.day = '2-digit'
            format.month = '2-digit'
            format.year = '2-digit'
        }
        if (available > 150) {
            format.weekday = 'short'
            format.month = 'short'
        }
        if (available > 200) {
            format.day = 'numeric'
            format.year = 'numeric'
            format.month = 'long'
            format.weekday = 'long'
        }
        return format
    }

    get key() {
        return 'hour'
    }

    dateKey(date) {
        return this.key + date.getFullYear()
            + date.getMonth()
            + date.getDate()
            + date.getHours()
    }

    iterStart(start) {
        return Dates.create(start.getFullYear(),
            start.getMonth(),
            start.getDate(),
            start.getHours())
    }

    next(date) {
        return Dates.nextHour(date)
    }

    toLocaleString(date, format) {
        return date.toLocaleTimeString('de', format)
    }
}

export class MinuteTicks extends Ticks {

    get milliseconds() {
        return 60 * 1000
    }

    format(available) {
        let format = { minute: 'numeric', timeZone: 'UTC' }
        if (available > 44) {
            format.hour = 'numeric'
            format.minute = 'numeric'
        }
        if (available > 100) {
            format.month = 'short'
            format.year = '2-digit'
        }
        if (available > 150) {
            format.weekday = 'short'
        }
        if (available > 200) {
            format.year = 'numeric'
            format.weekday = 'long'
        }
        return format
    }

    get key() {
        return 'minute'
    }

    dateKey(date) {
        return this.key + date.getFullYear()
            + date.getMonth()
            + date.getDate()
            + date.getHours()
            + date.getMinutes()
    }

    iterStart(start) {
        return Dates.create(start.getFullYear(),
            start.getMonth(),
            start.getDate(),
            start.getHours(),
            start.getMinutes())
    }

    next(date) {
        return Dates.nextMinute(date)
    }

    toLocaleString(date, format) {
        return date.toLocaleTimeString('de', format)
    }
}

export class TimeTicks {

    constructor(...ticks) {
        this.ticks = ticks
    }

    selectedRange(timeline) {
        let info = { start: timeline.start, end: timeline.end, units: 0 }
        for (let ticks of this.ticks) {
            info = ticks.selectedRange(timeline, info)
            if (info.units > 1) {
                timeline.selection = [info.visibleStart, info.visibleEnd]
                return
            }
        }
        timeline.selection = [info.start, info.end]
    }

    draw(timeline, width, height) {
        let range = timeline
        let start = timeline.toX(range.start)
        let end = timeline.toX(range.end)
        let size = end - start
        let duration = timeline.end - timeline.start
        let formats = new Map()
        let nextFormats = new Map()
        let availables = new Map()
        let previous = null
        let visible = []
        for (let ticks of this.ticks) {
            let amount = ticks.milliseconds / duration
            let available = amount * size
            availables.set(ticks, available)
            if (available < ticks.minWidth)
                break
            formats.set(ticks, (available < ticks.minLabelWidth) ? null : ticks.format(available))
            nextFormats.set(previous, formats.get(ticks))
            previous = ticks
            visible.push(ticks)
        }
        let level = 0
        for (let ticks of visible) {
            if (range == null)
                return
            range = ticks.draw(timeline, range, width, height,
                availables.get(ticks),
                formats.get(ticks),
                nextFormats.get(ticks), level)
            level += 1
        }
    }
}

export class ColorRanges {

    constructor(label, color, ranges) {
        this.label = label
        this.color = color
        this.ranges = ranges
    }

    draw(timeline, width, height, size = 12) {
        let minimum = 1 / Capabilities.devicePixelRatio
        let h2 = size
        timeline.lineStyle(size, this.color)
        for (let range of this.ranges) {
            if (range.to === null) {
                range.to = Dates.nextDay(range.from)
            }
            let start = timeline.toX(range.from)
            let end = timeline.toX(range.to)
            if (end < start + minimum) {
                end = start + minimum
            }
            timeline.moveTo(start, h2)
            timeline.lineTo(end, h2)
        }
    }
}

export default class Timeline extends BitmapLabeledGraphics {

    constructor(width, height, { ticks = null,
        baseLine = 0.5, showRange = true } = {}) {
        super()
        this.wantedWidth = width
        this.wantedHeight = height
        this.extraLeft = 0
        this.extraRight = 0
        this.inset = 5
        this.showRange = showRange
        this.baseLine = baseLine
        this.tickHeight = 4
        this.zoom = 1
        this.minZoom = 1
        this.maxZoom = 12000
        this.scroll = 0
        this.deltas = []
        this.labelDates = []
        this.colorRanges = []
        this.rangeColors = new Cycle(Colors.eminence,
            Colors.steelblue,
            Colors.ochre,
            Colors.turquoise)
        this.callbacks = []
        this.onTapCallbacks = []
        this.onDoubleTapCallbacks = []
        this.onLongPressCallbacks = []
        this.progress = null
        this.start = null
        this.end = null
        this.selection = null
        this.autoScroll = false
        this.direction = -1
        this.timeticks = ticks || new TimeTicks(new DecadeTicks(),
            new YearTicks(),
            new MonthTicks(),
            new DayTicks())
        this.labelPrefix = '__'
    }

    updateSelection() {
        if (this.visibleDate(this.start) && this.visibleDate(this.end)) {
            this.selection = [this.start, this.end]
        }
        else {
            this.timeticks.selectedRange(this)
        }

        return this.selection
    }

    addCallback(callback) {
        this.callbacks.push(callback)
    }

    addTabCallback(callback) {
        this.onTapCallbacks.push(callback)
    }

    addDoubleTapCallback(callback) {
        this.onDoubleTapCallbacks.push(callback)
    }

    addLongPressCallback(callback) {
        this.onLongPressCallbacks.push(callback)
    }

    addLabels(labels) {
        this.labelDates = labels
    }

    range(start, end) {
        this.start = start
        this.end = end
    }

    draw(width, height) {
        this.wantedWidth = width
        this.wantedHeight = height
        this.redraw()
    }

    updateColorRanges(w, h) {
        let xx = w - this.inset
        let size = FontInfo.small.fontSize
        let yy = h - size
        for (let i = this.colorRanges.length - 1; i >= 0; i--) {
            let cr = this.colorRanges[i]
            let label = cr.label
            cr.draw(this, w, h)
            let current = this.ensureLabel('colorRange:' + label, label,
                { x: xx, y: yy, align: 'right' }, FontInfo.small)
            let r = current.getBounds()
            xx -= r.width + 16

            this.lineStyle(size, cr.color)
            this.moveTo(xx, yy)
            this.lineTo(xx + size, yy)
            xx -= size + 4
        }
    }

    drawSelectedRamge(selected) {
        this.lineStyle(2, app.theme.primaryColor)
        let start = this.toX(selected[0])
        let end = this.toX(selected[1])
        this.moveTo(start, 0)
        this.lineTo(end, 0)
        this.drawTick(start, -1.5, 0)
        this.drawTick(end, -1.5, 0)
    }

    redraw() {
        this.clear()
        let h = this.wantedHeight
        let w = this.wantedWidth
        let y = this.getY()
        this.prepareLabels()
        this.updateColorRanges(w, h)

        this.lineStyle(2, 0xFFFFFF)
        if (this.start != null && this.end != null) {
            this.moveTo(this.toX(this.start), y)
            this.lineTo(this.toX(this.end), y)
            this.updateTicksAndLabels(w, h)
            this.updateSelection()
            let selected = this.selection
            if (selected[0] != this.start && selected[1] != this.end) {
                if (this.showRange)
                    this.drawSelectedRamge(selected)
            }
            for (let callback of this.callbacks) {
                callback(this.scroll, this.zoom, this.selection)
            }
        }
        else {
            this.moveTo(this.inset, y)
            this.lineTo(w - this.inset, y)
        }

        if (this.progress != null && this.progress < 1) {
            this.lineStyle(2, 0xCCCCFF)
            this.moveTo(this.inset, y)
            this.lineTo((w - this.inset) * this.progress, y)
        }
    }

    totalWidth(bounded = false) {
        let w = this.wantedWidth - (2 * this.inset)
        return w * this.validZoom(this.zoom, bounded)
    }

    validZoom(zoom, bounded = true) {
        let overshoot = (bounded) ? 1.0 : 2.0
        zoom = Math.max(zoom, this.minZoom / overshoot)
        zoom = Math.min(zoom, this.maxZoom * overshoot)
        return zoom
    }

    getY() {
        return this.wantedHeight * this.baseLine
    }

    toX(date) {
        let total = this.end - this.start
        let offset = this.inset + this.scroll
        let width = this.totalWidth()
        let delta = date - this.start
        let ratio = delta / total
        return offset + ratio * width
    }

    fromX(value) {
        let total = this.end - this.start
        let offset = this.inset + this.scroll
        let width = this.totalWidth()
        let ratio = (value - offset) / width
        let time = this.start.getTime() + total * ratio
        let date = new Date(time)
        return date
    }

    drawTick(x, direction = 1, y = null) {
        if (y == null) {
            y = this.getY()
        }
        this.moveTo(x, y)
        this.lineTo(x, y - (this.tickHeight * direction * this.direction))
    }

    prepareLabels() {
        for (let key of this.labels.keys()) {
            if (!key.startsWith(this.labelPrefix))
                this.labels.get(key).visible = false
        }
    }

    updateTicksAndLabels(width, height) {
        this.drawTick(this.toX(this.start))
        this.drawTick(this.toX(this.end))
        this.timeticks.draw(this, width, height)
        this.updateLabels(width, height)
    }

    visibleDate(date, offset = 0) {
        if (date >= this.start && date <= this.end) {
            let x = this.toX(date) + offset
            return (x > 0 && x < this.wantedWidth)
        }
        return false
    }

    visibleRange(start, end) {
        let x = this.toX(start)
        if (x > this.wantedWidth)
            return false
        x = this.toX(end)
        if (x < 0)
            return false
        return true
    }

    tickLabelOffset(direction = 1, level = 0) {
        let fs = FontInfo.small.fontSize
        let dh = fs + (level * (fs + 2))
        return this.direction * direction * dh
    }

    updateLabels(width, height) {
        let h2 = height / 2
        if (this.labelDates) {
            let last = null
            let y = h2 + this.tickLabelOffset()
            for (let i = this.labelDates.length - 1; i >= 0; i--) {
                let [label, date] = this.labelDates[i]
                let align = 'center' // (last == null) ? 'right' : 'left'
                let x = this.toX(date)
                let current = this.ensureLabel(this.labelPrefix + label, label,
                    {
                        x: x, y: y,
                        align
                    },
                    FontInfo.small)
                let r = current.getBounds()
                current.visible = !(last != null && r.x + r.width > last.x)
                if (current.visible) {
                    this.drawTick(x, -1)
                    last = r
                }
            }
        }
        else {
            let start = this.start.toLocaleDateString('de', { year: 'numeric', month: 'numeric', day: 'numeric' })
            let end = this.end.toLocaleDateString('de', { year: 'numeric', month: 'numeric', day: 'numeric' })
            this.ensureLabel(this.labelPrefix + 'start', start, { x: this.toX(this.start), y: h2 })
            this.ensureLabel(this.labelPrefix + 'end', end, { x: this.toX(this.end), y: h2, align: 'right' })
        }
    }

    onZoom(zoom, anchor) {
        let date = this.fromX(anchor.x)
        let newZoom = this.validZoom(this.zoom * zoom, false)
        this.zoom = newZoom
        let newX = this.toX(date)
        this.scroll += anchor.x - newX
    }

    onStart(event, interaction) {
        this.killTweens()
        this.deltas = []
        this.validScroll()
        if (typeof ThrowPropsPlugin != "undefined") {
            ThrowPropsPlugin.track(this, 'delta')
        }
    }

    onMove(event, interaction) {
        let delta = interaction.delta()
        this.scroll += delta.x
        while (this.deltas.length > 10) {
            this.deltas.pop(0)
        }
        this.deltas.push(delta.x)
        if (interaction.current.size > 1) {
            this.onZoom(delta.zoom, delta.about)
        }
        this.redraw()
    }

    onEnd(event, interaction) {

        if (typeof ThrowPropsPlugin != "undefined") {
            let vel = ThrowPropsPlugin.getVelocity(this, 'delta')
            ThrowPropsPlugin.untrack(this)
        }

        this.killTweens()
        this.redraw()
        let delta = 0
        for (let d of this.deltas) {
            delta += d
        }
        if (this.deltas.length > 0) {
            delta /= this.deltas.length
        }
        this.autoScroll = true
        let anchor = interaction.current.mean()
        this.keepInBounds(delta, anchor)

        for(let key of interaction.ended.keys()) {
            if (interaction.isDoubleTap(key)) {
                this.onDoubleTap(event, interaction, key)
            }
            else if (interaction.isTap(key)) {
                this.onTap(event, interaction, key)
            }
            else if (interaction.isLongPress(key)) {
                this.onLongPress(event, interaction, key)
            }
        }
    }

    onLongPress(event, interaction, key) {
        for(let callback of this.onLongPressCallbacks) {
            callback(event, interaction, key)
        }
    }

    onTap(event, interaction, key) {
        for(let callback of this.onTapCallbacks) {
            callback(event, interaction, key)
        }
    }

    onDoubleTap(event, interaction, key) {
        for(let callback of this.onDoubleTapCallbacks) {
            callback(event, interaction, key)
        }
    }

    _scrollMinimum(bounded) {
        let total = this.totalWidth(bounded)
        return -total + this.wantedWidth - 2 * this.inset
    }

    _scrollMaximum(bounded) {
        let total = this.totalWidth(bounded)
        let limit = this.wantedWidth
        if (total > limit)
            return 0
        let w = limit - 2 * this.inset
        return (w - total) / 2
    }

    scrollMinimum(bounded) {
        return this._scrollMinimum(bounded) - this.extraRight
    }

    scrollMaximum(bounded) {
        return this._scrollMaximum(bounded) + this.extraLeft
    }

    killTweens() {
        TweenLite.killTweensOf(this)
        this.autoScroll = false
    }


    validScroll(bounded = true) {
        let minimum = this.scrollMinimum(bounded)
        let maximum = this.scrollMaximum(bounded)
        if (this.scroll < minimum) {
            this.scroll = minimum
        }
        if (this.scroll > maximum) {
            this.scroll = maximum
        }
    }

    keepInBounds(delta, anchor) {
        let bounded = true
        let minimum = this.scrollMinimum(bounded)
        let maximum = this.scrollMaximum(bounded)
        let tweens = {}
        if (this.zoom > this.maxZoom) {
            tweens.zoom = this.maxZoom
            let date = this.fromX(anchor.x)
            let oldZoom = this.zoom
            this.zoom = this.maxZoom
            let newX = this.toX(date)
            tweens.scroll = this.scroll + anchor.x - newX
            this.zoom = oldZoom
        }
        else {
            if (this.zoom < this.minZoom) {
                tweens.zoom = this.minZoom
            }
            if (this.scroll > maximum) {
                tweens.scroll = maximum
            }
            if (this.scroll < minimum) {
                tweens.scroll = minimum
            }
        }
        if (!isEmpty(tweens)) {
            tweens.onUpdate = () => { this.redraw() }
            TweenLite.to(this, 0.5, tweens).delay(0.1)
            return
        }
        this.scroll += delta
        delta *= 0.985
        this.redraw()
        if (Math.abs(delta) > 1 && this.autoScroll) {
            setTimeout(() => this.keepInBounds(delta, anchor), 1000 / 100)
        }
    }

    onMouseWheel(event) {
        this.killTweens()
        let direction = event.detail < 0 || event.wheelDelta > 0
        let anchor = { x: event.clientX, y: event.clientY }
        const zoomFactor = 1.5
        this.onZoom((direction) ? zoomFactor : 1 / zoomFactor, anchor)
        this.redraw()
        this.keepInBounds(0, anchor)
    }

    showRanges(ranges, label = "Untitled", color = null) {
        for (let cr of this.colorRanges) {
            if (cr.label == label)
                return
        }
        while (this.colorRanges.length >= this.rangeColors.length) {
            this.colorRanges.shift()
        }
        this.colorRanges.push(new ColorRanges(label, color, ranges))
        this.redraw()
    }
}

