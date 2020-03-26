
export default class Events {

    static stop(event) {
        event.preventDefault()
        event.stopPropagation()
    }

    static extractPoint(event) {
        switch (event.constructor.name) {
            case 'TouchEvent':
                for (let i = 0; i < event.targetTouches.length; i++) {
                    let t = event.targetTouches[i]
                    return { x: t.clientX, y: t.clientY }
                }
                break
            default:
                return { x: event.clientX, y: event.clientY }
        }
    }

    static isCaptured(event) {
        if (event.__capturedBy)
            return true
        return false
    }

    static capturedBy(event, obj) {
        event.__capturedBy = obj
    }

    static isMouseDown(event) {
        // Attempts to clone the which attribute of events failed in WebKit. May
        // be this is a bug or a security feature. Workaround: we introduce
        // a mouseDownSubstitute attribute that can be assigned to cloned
        // events after instantiation.
        if (Reflect.has(event, 'mouseDownSubstitute'))
            return event.mouseDownSubstitute
        return event.buttons || event.which
    }

    static isSimulatedEvent(event) {
        return Reflect.has(event, 'mouseDownSubstitute')
    }

    static isMouseRightClick(event) {
        return event.buttons || event.which
    }

    static extractTouches(targets) {
        let touches = []
        for (let i = 0; i < targets.length; i++) {
            let t = targets[i]
            touches.push({
                targetSelector: this.selector(t.target),
                identifier: t.identifier,
                screenX: t.screenX,
                screenY: t.screenY,
                clientX: t.clientX,
                clientY: t.clientY,
                pageX: t.pageX,
                pageY: t.pageY
            })
        }
        return touches
    }

    static createTouchList(targets) {
        let touches = []
        for (let i = 0; i < targets.length; i++) {
            let t = targets[i]
            let touchTarget = document.elementFromPoint(t.pageX, t.pageY)
            let touch = new Touch(undefined, touchTarget, t.identifier,
                t.pageX, t.pageY, t.screenX, t.screenY)
            touches.push(touch)
        }
        return new TouchList(...touches)
    }

    static extractEvent(timestamp, event) {
        let targetSelector = this.selector(event.target)
        let infos = {
            type: event.type,
            time: timestamp,
            constructor: event.constructor,
            data: {
                targetSelector: targetSelector,
                view: event.view,
                mouseDownSubstitute: event.buttons || event.which, // which cannot be cloned directly
                bubbles: event.bubbles,
                cancelable: event.cancelable,
                screenX: event.screenX,
                screenY: event.screenY,
                clientX: event.clientX,
                clientY: event.clientY,
                layerX: event.layerX,
                layerY: event.layerY,
                pageX: event.pageX,
                pageY: event.pageY,
                ctrlKey: event.ctrlKey,
                altKey: event.altKey,
                shiftKey: event.shiftKey,
                metaKey: event.metaKey
            }
        }
        if (event.type.startsWith('touch')) {
            // On Safari-WebKit the TouchEvent has layerX, layerY coordinates
            let data = infos.data
            data.targetTouches = this.extractTouches(event.targetTouches)
            data.changedTouches = this.extractTouches(event.changedTouches)
            data.touches = this.extractTouches(event.touches)
        }
        if (event.type.startsWith('pointer')) {
            let data = infos.data
            data.pointerId = event.pointerId
            data.pointerType = event.pointerType
        }
        if (Events.debug) {
            Events.extracted.push(this.toLine(event))
        }
        return infos
    }

    static cloneEvent(type, constructor, data) {
        if (type.startsWith('touch')) {
            // We need to find target from layerX, layerY
            //var target = document.querySelector(data.targetSelector)
            // elementFromPoint(data.layerX, data.layerY)
            //data.target = target
            data.targetTouches = this.createTouchList(data.targetTouches)
            data.changedTouches = this.createTouchList(data.changedTouches)
            data.touches = this.createTouchList(data.touches)
        }
        // We need to find target from pageX, pageY which are only
        // available after construction. They seem to getter items.

        let clone = Reflect.construct(constructor, [type, data])
        clone.mouseDownSubstitute = data.mouseDownSubstitute
        return clone
    }

    static simulateEvent(type, constructor, data) {
        data.target = document.querySelector(data.targetSelector)
        let clone = this.cloneEvent(type, constructor, data)
        if (data.target != null) {
            data.target.dispatchEvent(clone)
        }
        if (Events.debug) {
            Events.simulated.push(this.toLine(clone))
        }
    }

    static toLine(event) {
        return `${event.type} #${event.target.id} ${event.clientX} ${event.clientY}`
        let result = event.type
        let selector = this.selector(event.target)
        result += ' selector: ' + selector
        if (event.target != document.querySelector(selector))
            console.log('Cannot resolve', selector)
        let keys = ['layerX', 'layerY', 'pageX', 'pageY', 'clientX', 'clientY']
        for (let key of keys) {
            try {
                result += ' ' + key + ':' + event[key]
            }
            catch (e) {
                console.log('Invalid key: ' + key)
            }
        }
        return result
    }

    static compareExtractedWithSimulated() {
        var diffs = 0
        if (this.extracted.length != this.simulated.length) {
            alert('Unequal length of extracted [' + this.extracted.length +
                '] and simulated events [' + this.simulated.length + '].')
            diffs += 1
        }
        else {
            for (let i = 0; i < this.extracted.length; i++) {
                var extracted = this.extracted[i]
                var simulated = this.simulated[i]
                if (extracted != simulated) {
                    console.log('Events differ:' + extracted + '|' + simulated)
                    diffs += 1
                }
            }
        }
    }

    static selector(context) {
        return OptimalSelect.select(context)
    }

    static reset() {
        this.extracted = []
        this.simulated = []
    }

    static resetSimulated() {
        this.simulated = []
    }

    static showExtractedEvents(event) {
        if (!event.shiftKey) {
            return
        }
        if (this.popup == null) {
            let element = document.createElement('div')
            Elements.setStyle(element, {
                position: 'absolute',
                width: '480px',
                height: '640px',
                overflow: 'auto',
                backgroundColor: 'lightgray'
            })
            document.body.appendChild(element)
            this.popup = element
        }
        this.popup.innerHTML = ''
        for (let line of this.extracted) {
            let div = document.createElement('div')
            div.innerHTML = line
            this.popup.appendChild(div)
        }
        let div = document.createElement('div')
        div.innerHTML = '------------ Simulated -----------'
        this.popup.appendChild(div)
        for (let line of this.simulated) {
            let div = document.createElement('div')
            div.innerHTML = line
            this.popup.appendChild(div)
        }
        Elements.setStyle(this.popup,
            { left: event.clientX + 'px', top: event.clientY + 'px' })
    }
}

Events.popup = null
Events.debug = true
Events.extracted = []
Events.simulated = []
Events.simulationRunning = false

export class EventRecorder {

    constructor() {
        this.recording = []
        this.recorded = []
        this.step = 0
    }

    record(event) {
        let length = this.recording.length
        if (length == 0) {
            this.startTime = event.timeStamp
            Events.reset()
        }
        else {
            let last = this.recording[length - 1]
            if (event.timeStamp < last.time) {
                console.log('warning: wrong temporal order')
            }
        }
        let t = event.timeStamp - this.startTime
        this.recording.push(Events.extractEvent(t, event))
    }

    stopRecording() {
        this.recorded = this.recording
        this.recording = []
        console.log('Recorded ' + this.recorded.length + ' events')
    }

    startReplay(whileCondition = null, onComplete = null) {
        this.step = 0
        Events.resetSimulated()
        console.log('Start replay')
        Events.simulationRunning = true
        this.replay(whileCondition, onComplete)
    }

    replay(whileCondition = null, onComplete = null) {
        if (this.step < this.recorded.length) {
            let { type, time, constructor, data } = this.recorded[this.step]
            Events.simulateEvent(type, constructor, data)
            
            this.step += 1
            let dt = 0
            if (this.step < this.recorded.length) {
                var next = this.recorded[this.step]
                dt = next.time - time
                if (dt < 0) {
                    console.log('warning: wrong temporal order')
                }
            }
            if (whileCondition == null || whileCondition()) {
                let delta = Math.round(dt)
                setTimeout(() => this.replay(whileCondition, onComplete), delta)
            }
        }
        else {
            console.log('Played ' + this.step + ' events' + onComplete)
            Events.simulationRunning = false
            if (onComplete != null) {
                onComplete()
            }
            //Events.compareExtractedWithSimulated()
        }
    }
}

