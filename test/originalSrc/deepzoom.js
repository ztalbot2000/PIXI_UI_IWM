import {Capabilities} from '../capabilities.js'
import {Points} from '../utils.js'

function isEven(n) {
    return n % 2 == 0
}

/**
 * A utility class that holds information typically provided by DZI files, i.e.
 * height and width of the overall image, overlap, and image type.
 *
 * @constructor
 * @param {obj} attrs - A JSON-Object holding the listed keys and values
 * @example
 *     {
 *         "tileSize": 1024,
 *         "format": "jpeg",
 *         "overlap": 1,
 *         "height": 4794,
 *         "width": 4095,
 *         "clip": { "minLevel": 12, "maxLevel": 20, "startCol": 301436, "startRow": 354060 },
 *                   // optional: minLevel and maxLevel define the level bounds
 *                   // startCol: first col at maxLevel
 *                   // startRow: first row at maxLevel
 *         "path": "var/Vermeer/Vermeer_files",
 *         "type": "dzi",  // optional: dzi (default) or map
 *         "urlTileTemplate": "{path}/{level}/{column}/{row}.{format}"
 *           // optional: {path}/{level}/{column}_{row}.{format} (default) or
 *           // a template String with the format of the URL
 *     }
 */
export class DeepZoomInfo {
    constructor(attrs) {
        for (let key in attrs) {
            this[key] = attrs[key]
        }
        this.maxLevel = 0 // The highest level number, typically corresponds to the
        // number in the file system for the folder with tiles
        this.clip = this.clip || null // e.g. { level: 12, col: 301436, row: 354060 }
        this.type = this.type || 'dzi'
        this.urlTileTemplate =
            this.urlTileTemplate || '{path}/{level}/{column}_{row}.{format}'
        this.setupDimensions()
    }

    /* Computes the needed number of layers from the width and height
    *  of the image. Note that this includes the level 0, i.e. 0 ... 4
    * means that 5 levels exist.
    **/
    numLevels() {
        let maxDimension = Math.max(this.width, this.height)
        let boundary = this.type === 'dzi' ? 1 : this.tileSize
        let numLevels = 0
        while (maxDimension >= boundary) {
            maxDimension /= 2
            numLevels++
        }
        return numLevels
    }

    /** Computes the scale at the given level.
     * @param {number} level - The level of the wanted layer
     * @returns {number} scale
     **/
    getScale(level) {
        let scale = 1
        if (this.type === 'dzi') {
            scale = Math.pow(0.5, this.maxLevel - level + 1)
        } else {
            scale = Math.pow(0.5, this.maxLevel - level)
        }
        return scale
    }

    /** Computes the scaled width and height of the given level.
     * @param {number} level - The level of the wanted layer
     * @returns {array} size - The width and height
     **/
    getDimensions(level) {
        let scale = this.getScale(level)
        let w = Math.ceil(this.width * scale)
        let h = Math.ceil(this.height * scale)
        return [w, h]
    }

    /** Computes the number of cols and rows of tiles.
     * @param {number} level - The level of the wanted layer
     * @returns {array} size - The cols and rows
     **/
    getNumTiles(level) {
        let dim = this.getDimensions(level)
        let cols = Math.ceil(dim[0] / this.tileSize)
        let rows = Math.ceil(dim[1] / this.tileSize)
        if (this.clip) {
            let rest = this.rests[level]
            if (rest) {
                if (rest.restCol) {
                    cols += 1
                }
                if (rest.restRows) {
                    rows += 1
                }
            }
        }
        return [cols, rows]
    }

    setupDimensions(loadBaseImage = false) {
        /** Setup instance variables and load the base image, i.e. the largest
        image that can be represented as a single tile.
        @private
        **/
        let ww = this.width
        let hh = this.height
        let scale = 1.0
        let level = 0
        let single = 0
        const tsize = this.tileSize

        if (this.clip) {
            this.baseLevel = this.clip.minLevel
            this.maxLevel = this.clip.maxLevel
            this.baseImage = null
            this.size = this.getDimensions(this.baseLevel)
            this.offsets = {}
            this.rests = {}
            let startCol = this.clip.startCol
            let startRow = this.clip.startRow
            let floatStartCol = startCol
            let floatStartRow = startRow
            for (let i = this.maxLevel; i >= this.baseLevel; i--) {
                this.offsets[i] = {startCol, startRow}
                let restCol = floatStartCol % 1
                let restRow = floatStartRow % 1
                this.rests[i] = {restCol, restRow}
                startCol = Math.floor(startCol / 2)
                startRow = Math.floor(startRow / 2)
                floatStartCol /= 2
                floatStartRow /= 2
            }
        } else {
            const boundary = this.type === 'dzi' ? 1.0 : tsize
            while (ww > boundary && hh > boundary) {
                if (ww >= tsize && hh >= tsize) {
                    single += 1
                }
                scale = scale / 2.0
                ww = Math.ceil(this.width * scale)
                hh = Math.ceil(this.height * scale)
                level += 1
            }
            this.baseLevel = level - single
            this.maxLevel = this.numLevels() - 1
            this.baseURL = this.urlForTile(this.baseLevel, 0, 0, false)

            if (loadBaseImage) {
                this.imageForURL(this.baseURL, e => {
                    this.size = [e.target.naturalWidth, e.target.naturalHeight]
                    this.baseImage = e.target
                })
            } else {
                this.baseImage = null
                this.size = this.getDimensions(this.baseLevel)
            }
        }
    }

    get maxLoadableLevel() {
        if (this.clip) {
            return this.maxLevel
        }
        return this.type === 'dzi' ? this.maxLevel : this.maxLevel
    }

    /** Computes the url for the given level, column and and row.
     * @param {number} level - The level of the wanted layer
     * @param {number} column - The column of the tile
     * @param {number} row - The row of the tile
     * @returns {string} url
     **/
    urlForTile(level, column, row, compressed = true) {
        let format = this.format
        if (compressed && this.compression) {
            let supported = Capabilities.isIOS ? 'pvr' : 'dds'
            if (this.compression.indexOf(supported) >= 0) {
                format = supported
            }
        }
        if (this.clip) {
            let offset = this.offsets[level]
            if (offset) {
                let {startCol, startRow} = offset
                column += startCol
                row += startRow
            }
        }
        let url = this.urlTileTemplate
            .replace(/\{path\}/g, this.path)
            .replace(/\{level\}/g, level)
            .replace(/\{row\}/g, row)
            .replace(/\{column\}/g, column)
            .replace(/\{format\}/g, format)
        return url
    }

    /** Loads the image for the given url and executes a callback function
    on completion.
    * @param {string} url - The url of the tile
    * @param {function} complete - The callback function
    * @returns {Image} obj
    **/
    imageForURL(url, complete) {
        let img = new Image()
        img.onload = complete.bind(this)
        img.src = url
        return img
    }

    /** Computes the columns and rows as well as scaled width and height.
     * @param {number} level - The level of the wanted layer
     * @returns {array} [cols, rows, width, height]
     **/
    dimensions(level) {
        let dim = this.getDimensions(level)
        let tiles = this.getNumTiles(level)
        return [tiles[0], tiles[1], dim[0], dim[1]]
    }

    test() {
        //console.log("w=" + this.width + " h=" + this.height + " maxlevel=" + this.maxLevel + " base=" + this.baseLevel)
        for (let i = 0; i <= this.maxLevel; i++) {
            console.log(
                ' ' +
                    i +
                    ' -> ' +
                    this.getScale(i) +
                    ' [' +
                    this.dimensions(i) +
                    ']'
            )
        }
        console.log(this.urlForTile(this.baseLevel, 0, 0))
    }
}

/**
 * A utility class that describes a quad tree of tiles. Each tile on a given
 * level has up to four corresponding tiles on the next level. A TileQuadNode
 * uses the attributes nw (i.e. northwest), ne, sw, se to link to the
 * quad nodes on the next level. The previous attributes links to the quad
 * one level below that holds the given quad as nw, ne, sw, or se.
 * We use this node class because we need a representation of tiles that are
 * needed but not loaded yet to compute tiles which can be abandoned to reduce
 * the memory pressure.
 *
 * @constructor
 * @param {level} Number - The level the quad node belongs to
 * @param {col} Number - The col of the quad
 * @param {row} Number - The level the quad node belongs to
 * @param {url} String - The level the quad node belongs to
 */
class TileQuadNode {
    constructor(level, col, row, url) {
        this.level = level
        this.col = col
        this.row = row
        this.url = url
        this.nw = null
        this.ne = null
        this.sw = null
        this.se = null
        this.previous = null
    }

    /** Return True if this node has no successors and can be used as
    an indicator of tiles to free.
    **/
    noQuads() {
        if (this.previous === null) return false
        return (
            this.nw === null &&
            this.ne === null &&
            this.sw === null &&
            this.se === null
        )
    }

    /** Unlink the given quad node

    * @param {node} TileQuadNode - The TileQuadNode to remove
    **/
    unlink(node) {
        if (this.nw === node) this.nw = null
        if (this.ne === node) this.ne = null
        if (this.sw === node) this.sw = null
        if (this.se === node) this.se = null
    }

    /** Link this quad node to the given previous node. Use the north
    * and west flags to address nw, ne, sw, and se.

    * @param {node} TileQuadNode - The TileQuadNode to remove
    * @param {north} Boolean - Link to north (true) or south (false)
    * @param {west} Boolean - Link to west (true) or east (false)
    **/
    link(north, west, previous) {
        this.previous = previous
        if (north) {
            if (west) {
                previous.nw = this
            } else {
                previous.ne = this
            }
        } else {
            if (west) {
                previous.sw = this
            } else {
                previous.se = this
            }
        }
    }
}

/** The current Tile implementation simply uses PIXI.Sprites.
 *
 * BTW: PIXI.extras.TilingSprite is not appropriate. It should be used for
 * repeating patterns.
 **/
class Tile extends PIXI.Sprite {
    constructor(texture) {
        super(texture)
    }
}

/**
 * A Tile Loader component that can be plugged into a Tiles Layer.
 */
class TileLoader {
    constructor(tiles) {
        this.debug = false
        this.tiles = tiles
        this.setup()
    }

    /** Setup collections and instance vars. */
    setup() {
        this.map = new Map() // Map {url : [ col, row]}
        this.loading = new Set() // Set url
        this.loaded = new Map() // Map {url : sprite }
        this.loadQueue = []
    }

    /** Schedules a tile url for loading. The loading itself must be triggered
    by a call to loadOneTile or loadAll

    * @param {String} url - the url of the texture / tile
    * @param {Number} col - the tile col
    * @param {Number} row - the tile row
    **/
    schedule(url, col, row) {
        if (this.loaded.has(url)) return false
        if (this.loading.has(url)) return false
        this.map.set(url, [col, row])
        this.loading.add(url)
        this.loadQueue.push(url)
        return true
    }

    /** Cancels loading by clearing the load queue **/
    cancel() {
        this.loadQueue = []
        this.loading.clear()
    }

    /** Destroys alls collections. **/
    destroy() {
        this.setup()
    }

    /** Private method. Informs the tile layer about a texture for a given url.
     * Creates the sprite for the loaded texture and informs the tile layer.
     * @param {String} url - the url
     * @param {Object} texture - the loaded resource
     **/
    _textureAvailable(url, col, row, texture) {
        let tile = new Tile(texture)
        this.loaded.set(url, tile)
        this.tiles.tileAvailable(tile, col, row, url)
    }
}

/**
 * A Tile Loader component that can be plugged into a Tiles Layer.
 * Uses the PIXI Loader but can be replaced with othe loaders implementing
 * the public methods without underscore.
 * Calls the Tiles.tileAvailable method if the sprite is available.
 **/
class PIXITileLoader extends TileLoader {

    constructor(tiles, compression) {
        super(tiles)
        this.loader = new PIXI.loaders.Loader()
        this.loader.on('load', this._onLoaded.bind(this))
        this.loader.on('error', this._onError.bind(this))
        if (compression) {
            this.loader.pre(PIXI.compressedTextures.imageParser())
        }
    }

    schedule(url, col, row) {
        // Overwritten schedule to avoid BaseTexture and Texture already loaded errors.
        let texture = PIXI.utils.TextureCache[url]
        if (texture) {
            if (this.debug) console.log('Texture already loaded', texture)
            this._textureAvailable(url, col, row, texture)
            return false
        }
        let base = PIXI.utils.BaseTextureCache[url]
        if (base) {
            if (this.debug) console.log('BaseTexture already loaded', base)
            let texture = new PIXI.Texture(base)
            this._textureAvailable(url, col, row, texture)
            return false
        }
        return super.schedule(url, col, row)
    }

    /** Load one and only one of the scheduled tiles **/
    loadOneTile() {
        this._loadOneTile()
    }

    /** Load all scheduled tiles **/
    loadAll() {
        this._loadAllTiles()
    }

    /** Destroys the loader completly **/
    destroy() {
        this.loader.reset()
        super.destroy()
    }

    _onError(loader, error) {
        console.warn('Cannot load', error)
    }

    /** Private method. Called by the PIXI loader after each successfull
     * loading of a single tile.
     * Creates the sprite for the loaded texture and informs the tile layer.
     * @param {Object} loader - the loader instance
     * @param {Object} resource - the loaded resource with url and texture attr
     **/
    _onLoaded(loader, resource) {
        try {
            let [col, row] = this.map.get(resource.url)
            this._textureAvailable(resource.url, col, row, resource.texture)
        }
        catch(err) {
            console.warn("Texture unavailable: " + err.message)
        }
    }

    /** Private method: loads one tile from the queue. **/
    _loadOneTile(retry = 1) {
        //console.log("_loadOneTile")
        if (this.loader.loading) {
            setTimeout(() => {
                this._loadOneTile()
            }, retry)
            return
        }
        if (this.loadQueue.length > 0) {
            let url = this.loadQueue.pop()
            this.loader.add(url, url)
            this.loader.load()
        }
    }

    /** Private method: loads all tiles from the queue in batches. Batches are
    helpfull to avoid loading tiles that are no longer needed because the
    user has already zoomed to a different level.**/
    _loadAllTiles(batchSize = 8, retry = 16) {
        if (this.loadQueue.length > 0) {
            if (this.loader.loading) {
                //console.log("Loader busy", this.loadQueue.length)
                setTimeout(() => {
                    this._loadAllTiles()
                }, retry)
                return
            }
            let i = 0
            let urls = []
            while (i < batchSize && this.loadQueue.length > 0) {
                let url = this.loadQueue.pop()
                if (!this.loaded.has(url)) {
                    urls.push(url)
                    i += 1
                }
            }
            this.loader.add(urls).load(() => this._loadAllTiles())
        }
    }
}

class RequestTileLoader extends TileLoader {

    constructor(tiles, compression) {
        super(tiles)
        this.compression = compression
    }

    schedule(url, col, row) {
        this._load(url, col, row)
        return super.schedule(url, col, row)
    }

    _load(url, col, row, callback = null) {
        if (this.compression) {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url, false)
            xhr.responseType = 'arraybuffer'
            xhr.onload = e => {
                let CompressedImage = PIXI.compressedTextures.CompressedImage
                let compressed = CompressedImage.loadFromArrayBuffer(
                    xhr.response,
                    url
                )
                console.log('CompressedImage loaded')
                let base = new PIXI.BaseTexture(compressed)
                let texture = new PIXI.Texture(base)
                this._textureAvailable(url, col, row, texture)
                if (callback) callback()
            }
            xhr.send()
        } else {
            let texture = PIXI.Texture.fromImage('assets/image.png')
            this._textureAvailable(url, col, row, texture)
            if (callback) callback()
        }
    }

    /** Load one and only one of the scheduled tiles **/
    loadOneTile() {
        this._loadOneTile()
    }

    /** Load all scheduled tiles **/
    loadAll() {
        this._loadAllTiles()
    }

    /** Private method: loads one tile from the queue. **/
    _loadOneTile(retry = 1) {
        if (this.loadQueue.length > 0) {
            let url = this.loadQueue.pop()
            let [col, row] = this.map.get(url)
            this._load(url, col, row)
        }
    }

    /** Private method: loads all tiles from the queue in batches. Batches are
    helpfull to avoid loading tiles that are no longer needed because the
    user has already zoomed to a different level.**/
    _loadAllTiles(batchSize = 8, retry = 16) {
        if (this.loadQueue.length > 0) {
            let i = 0
            let urls = []
            while (i < batchSize && this.loadQueue.length > 0) {
                let url = this.loadQueue.pop()
                if (this.debug) console.time(url)
                if (!this.loaded.has(url)) {
                    urls.push(url)
                    i += 1
                }
            }
            let total = urls.length
            let count = 0
            for (let url of urls) {
                let [col, row] = this.map.get(url)
                this._load(url, col, row, () => {
                    count++
                    if (count == total) this._loadAllTiles()
                })
            }
        }
    }
}

class WorkerTileLoader extends TileLoader {

    constructor(tiles) {
        super(tiles)
        let worker = this.worker = new Worker("../../lib/pixi/tileloader.js")
        worker.onmessage = (event) => {
            if (event.data.success) {
                 let {url, col, row, buffer} = event.data
                 //console.log("WorkerTileLoader.loaded", url, buffer)
                 let CompressedImage = PIXI.compressedTextures.CompressedImage
                 let compressed = CompressedImage.loadFromArrayBuffer(buffer, url)
                 let base = new PIXI.BaseTexture(compressed)
                 let texture = new PIXI.Texture(base)
                 this._textureAvailable(url, col, row, texture)
            }
         }
    }

    loadOne() {
        if (this.loadQueue.length > 0) {
            let url = this.loadQueue.pop()
            let [col, row] = this.map.get(url)
            let tile = [col, row, url]
            this.worker.postMessage({command: "load", tiles: [tile]})
        }
    }

    loadAll() {
        let tiles = []
        while(this.loadQueue.length > 0) {
            let url = this.loadQueue.pop()
            let [col, row] = this.map.get(url)
            tiles.push([col, row, url])
        }
        this.worker.postMessage({command: "load", tiles})
    }

    cancel() {
        super.cancel()
        this.worker.postMessage({command: "abort"})
    }

    destroy() {
        this.worker.postMessage({command: "abort"})
        this.worker.terminate()
        this.worker = null
        super.destroy()
    }
}
/**
 * A layer of tiles that represents a zoom level of a DeepZoomImage as a grid
 * of sprites.
 * @constructor
 * @param {number} level - the zoom level of the tile layer
 * @param {DeepZoomImage} view - the zoomable image the layer belongs to
 * @param {number} scale - the scale of the tile layer
 * @param {number} cols - the number of columns of the layer
 * @param {number} rows - the number of rows of the layer
 * @param {number} width - the width of the layer in pixel
 * @param {number} height - the height of the layer in pixel
 * @param {number} tileSize - the size of a single tile in pixel
 * @param {number} overlap - the overlap of the tiles in pixel
 * @param {number} fadeInTime - time needed to fade in tiles if TweenLite is set
 **/
class Tiles extends PIXI.Container {
    constructor(
        level,
        view,
        scale,
        cols,
        rows,
        width,
        height,
        tileSize,
        overlap,
        fadeInTime = 0.25
    ) {
        super()
        this.debug = false
        this.showGrid = false
        this.view = view
        this.level = level
        this.cols = cols
        this.rows = rows
        this.pixelWidth = width
        this.pixelHeight = height
        this.tileSize = tileSize
        this.overlap = overlap
        this.needed = new Map() // url as key, [col, row] as value
        this.requested = new Set()
        this.available = new Map()
        this.scale.set(scale, scale)
        this.tileScale = scale
        this.fadeInTime = fadeInTime
        this.keep = false
        if (this.view.preferWorker && view.info.compression.length>0)
            this.loader = new WorkerTileLoader(this)
        else
            this.loader = new PIXITileLoader(this, view.info.compression)
        this.interactive = false
        this._highlight = null
        this.pprint()
    }

    /** Tests whether all tiles are loaded. **/
    isComplete() {
        return this.cols * this.rows === this.children.length
    }

    /** Returns the highligh graphics layer for debugging purposes.
     **/
    get highlight() {
        if (this._highlight == null) {
            let graphics = new PIXI.Graphics()
            graphics.beginFill(0xffff00, 0.1)
            graphics.lineStyle(2, 0xffff00)
            graphics.drawRect(1, 1, tileSize - 2, tileSize - 2)
            graphics.endFill()
            graphics.interactive = false
            this._highlight = graphics
        }
        return this._highlight
    }

    /** Helper method pretty printing debug information. **/
    pprint() {
        if (this.debug)
            console.log(
                'Tiles level: ' +
                    this.level +
                    ' scale: ' +
                    this.scale.x +
                    ' cols: ' +
                    this.cols +
                    ' rows: ' +
                    this.rows +
                    ' w: ' +
                    this.pixelWidth +
                    ' h: ' +
                    this.pixelHeight +
                    ' tsize:' +
                    this.tileSize
            )
    }

    /** Computes the tile position and obeys the overlap.
     * @param {number} col - The column of the tile
     * @param {number} row - The row of the tile
     * @returns {PIXI.Point} obj
     **/
    tilePosition(col, row) {
        let x = col * this.tileSize
        let y = row * this.tileSize
        let overlap = this.overlap
        if (col != 0) {
            x -= overlap
        }
        if (row != 0) {
            y -= overlap
        }
        return new PIXI.Point(x, y)
    }

    /** Computes the tile size without overlap
     * @param {number} col - The column of the tile
     * @param {number} row - The row of the tile
     * @returns {PIXI.Point} obj
     **/
    tileDimensions(col, row) {
        let w = this.tileSize
        let h = this.tileSize
        let pos = this.tilePosition(col, row)
        if (col == this.cols - 1) {
            w = this.pixelWidth - pos.x
        }
        if (row == this.rows - 1) {
            h = this.pixelHeight - pos.y
        }
        return new PIXI.Point(w, h)
    }

    /** Method to support debugging. Highlights the specified tile at col, row **/
    highlightTile(col, row) {
        if (col > -1 && row > -1 && col < this.cols && row < this.rows) {
            let graphics = this.highlight
            let dim = this.tileDimensions(col, row)
            graphics.position = this.tilePosition(col, row)
            graphics.clear()
            graphics.beginFill(0xff00ff, 0.1)
            graphics.lineStyle(2, 0xffff00)
            graphics.drawRect(1, 1, dim.x - 2, dim.y - 2)
            graphics.endFill()
            this.addChild(this.highlight)
        } else {
            this.removeChild(this.highlight)
        }
    }

    /** Loads the tiles for the given urls and adds the tiles as sprites.
     * @param {array} urlpos - An array of URL, pos pairs
     * @param {boolean} onlyone - Loads only on tile at a time if true
     **/
    loadTiles(urlpos, onlyone, refCol, refRow) {
        if (this.showGrid) {
            this.highlightTile(refCol, refRow)
        }
        urlpos.forEach(d => {
            let [url, col, row] = d
            if (this.loader.schedule(url, col, row)) {
                if (onlyone) {
                    return this.loader.loadOneTile()
                }
            }
        })
        this.loader.loadAll()
    }

    /** Private method: add a red border to a tile for debugging purposes. **/
    _addTileBorder(tile, col, row) {
        let dim = this.tileDimensions(col, row)
        let graphics = new PIXI.Graphics()
        graphics.beginFill(0, 0)
        graphics.lineStyle(2, 0xff0000)
        graphics.drawRect(1, 1, dim.x - 2, dim.y - 2)
        graphics.endFill()
        tile.addChild(graphics)
    }

    /** Adds a tile. **/
    addTile(tile, col, row, url) {
        if (this.available.has(url)) return
        this.addChild(tile)
        this.available.set(url, tile)
    }

    //    * Remove a tile. **/
    //     removeTile(col, row, url) {
    //         if (this.available.has(url)) {
    //             let tile = this.available.get(url)
    //             this.removeChild(tile)
    //             tile.destroy(true)
    //             if (this.debug) console.log("Destroyed tile", url)
    //             this.available.delete(url)
    //         }
    //     }

    /** Called by the loader after each successfull loading of a single tile.
     * Adds the sprite to the tile layer.
     * @param {Object} tile - the loaded tile sprite
     * @param {Number} col - the col position
     * @param {Number} row - the rowposition
     **/
    tileAvailable(tile, col, row, url) {
        let pos = this.tilePosition(col, row)
        if (this.showGrid) {
            this._addTileBorder(tile, col, row)
        }
        tile.position = pos
        tile.interactive = false
        if (TweenMax) {
            tile.alpha = 0
            TweenMax.to(tile, this.fadeInTime, {alpha: this.alpha})
        }
        this.addTile(tile, col, row, url)
    }

    /** Destroys the tiles layer and    destroys the loader. Async load calls are
     * cancelled.
     **/
    destroy() {
        this.loader.destroy()
        //app.renderer.textureGC.unload(this)
        super.destroy(true) // Calls destroyChildren
        this.available.clear()
    }

    /* Destroys the tiles which are not with the bounds of the app to free
    * memory.
    **/
    destroyTiles(quadTrees) {
        let count = 0
        for (let [url, tile] of this.available.entries()) {
            if (!quadTrees.has(url)) {
                this.removeChild(tile)
                tile.destroy(true)
                this.requested.delete(url)
                this.available.delete(url)
                count += 1
            }
        }
        if (count && this.debug)
            console.log('destroyObsoleteTiles', this.level, count)
    }

    tintTiles(quadTrees) {
        for (let [url, tile] of this.available.entries()) {
            if (!quadTrees.has(url)) tile.tint = 0xff0000
        }
    }

    untintTiles() {
        for (let [url, tile] of this.available.entries()) {
            tile.tint = 0xffffff
        }
    }
}

/**
* The main class of a deeply zoomable image that is represented by a hierarchy
* of tile layers for each zoom level. This gives the user the impression that
* even huge pictures (up to gigapixel-images) can be zoomed instantaneously,
* since the tiles at smaller levels are scaled immediately and overloaded by
* more detailed tiles at the larger level as fast as possible.

* @constructor
* @param {DeepZoomInfo} deepZoomInfo - Information extracted from a JSON-Object
*/
export class DeepZoomImage extends PIXI.Container {
    constructor(
        deepZoomInfo,
        {
            debug = false,
            shadow = false,
            center = false,
            highResolution = true,
            autoLoadTiles = true,
            preferWorker = false,
            minimumLevel = 0,
            alpha = 1
        } = {}
    ) {
        super()
        this.debug = debug
        this.shadow = shadow
        this.preferWorker = preferWorker
        this.resolution = highResolution
            ? Math.round(window.devicePixelRatio)
            : 1
        this.alpha = alpha
        this.fastLoads = 0
        this.autoLoadTiles = autoLoadTiles
        this.minimumLevel = minimumLevel
        this.quadTrees = new Map() // url as keys, TileQuadNodes as values
        this.setup(deepZoomInfo, center)
        if (debug) {
            console.log('DeepZoomImage.constructor', minimumLevel)
            console.log("   prefers worker loader")
        }
    }

    /** Reads the DeepZoomInfo object and initializes all tile layers.
     * Called by the constructor.
     * Creates the sprite for the loaded texture and add the sprite to the tile
     * layer.
     * @param {Object} deepZoomInfo - the DeepZoomInfo instance
     * @param {boolean} center - If true ensures that the pivot is set to the center
     **/
    setup(deepZoomInfo, center) {
        this.info = deepZoomInfo
        this.interactive = true
        this.tileLayers = {}

        this._foreground = null
        this.tileContainer = new PIXI.Container()
        this.tileContainer.interactive = false

        let [w, h] = this.baseSize
        if (this.shadow) {
            this.filters = [new PIXI.filters.DropShadowFilter(45, 3)]
        }
        this.addChild(this.tileContainer)

        if (deepZoomInfo.clip) {
            let mask = new PIXI.Graphics()
            mask.beginFill(1, 1)
            mask.drawRect(0, 0, w, h)
            mask.endFill()
            this.mask = mask
            mask.alpha= 0
            this.addChild(mask)
            this.minimumLevel = deepZoomInfo.baseLevel
        }
        this.currentLevel = Math.max(this.minimumLevel, deepZoomInfo.baseLevel)
        if (this.autoLoadTiles) {
            this.setupTiles(center)
        }
    }

    /** Default setup method for tiles. Loads all tiles of the current level.
    Can be overwritten in subclasses.
    @param {boolean} center - If true ensures that the pivot is set to the center
    **/
    setupTiles(center = false) {
        // First load background tile
        let tiles = this.ensureAllTiles(this.currentLevel)
        if (center) {
            this.pivot.set(w / 2, h / 2)
        }
        let scaleLevel = this.levelForScale(1)
        this.ensureAllTiles(scaleLevel)
    }

    removeTileQuadNode(level, col, row, url) {
        if (this.quadTrees.has(url)) {
            let quad = this.quadTrees.get(url)
            this.tileQuadRemoved(quad)
            this.quadTrees.delete(url)
        }
    }

    addTileQuadNode(level, col, row, url) {
        if (this.quadTrees.has(url)) return this.quadTrees.get(url)
        let quad = new TileQuadNode(level, col, row, url)
        this.quadTrees.set(url, quad)
        this.tileQuadAdded(quad)
        return quad
    }

    tileQuadRemoved(quad) {
        let below = quad.previous
        // if (this.debug) console.log("tileQuadRemoved", quad)
        if (below) {
            below.unlink(quad)
            if (below.noQuads()) {
                if (this.debug) console.log('Removed tile below')
                let levelBelow = quad.level - 1
                if (levelBelow < this.minimumLevel) return
                let c = Math.floor(quad.col / 2)
                let r = Math.floor(quad.row / 2)
                let urlBelow = this.info.urlForTile(levelBelow, c, r)
                if (this.quadTrees.has(urlBelow)) {
                    this.removeTileQuadNode(levelBelow, c, r, urlBelow)
                }
            }
        }
    }

    tileQuadAdded(quad) {
        let levelBelow = quad.level - 1
        if (levelBelow < this.minimumLevel) return
        //if (this.debug) console.log("tileQuadAdded", quad)
        let c = Math.floor(quad.col / 2)
        let r = Math.floor(quad.row / 2)
        let urlBelow = this.info.urlForTile(levelBelow, c, r)
        let below = null
        if (!this.quadTrees.has(urlBelow)) {
            below = this.addTileQuadNode(levelBelow, c, r, urlBelow)
            quad.link(isEven(quad.row), isEven(quad.col), below)
        }
    }

    /** Returns the tile layer level that corresponds to the given scale.
     * @param {number} scale - the scale factor
     **/
    levelForScale(scale) {
        let level = Math.round(Math.log2(scale * this.resolution)) // Math.floor(Math.log2(event.scale))+1
        let newLevel = this.info.baseLevel + Math.max(level, 0)
        return Math.min(newLevel, this.info.maxLoadableLevel)
    }


    /** Adds a tile layer to the DeepZoomImage.
     * @param {string} key - the access key
     * @param {Tiles} tiles - the tile layer object
     **/
    addTiles(key, tiles) {
        this.tileContainer.addChild(tiles)
        this.tileLayers[key] = tiles
    }

    /** Getter for PIXI.Container foreground layer.
     * Adds a PIXI.Container if necessary.
     **/
    get foreground() {
        if (this._foreground == null) {
            this._foreground = new PIXI.Container()
            this.addChild(this._foreground)
        }
        return this._foreground
    }

    /** Getter for the DeepZoomInfo base level size.
     **/
    get baseSize() {
        return this.info.getDimensions(this.info.baseLevel)
    }

    /** Getter for the current scaled size in pixels.
     **/
    get pixelSize() {
        let [w, h] = this.baseSize
        return [w * this.scale.x, h * this.scale.y]
    }

    /** Getter for the max scale factor.
     **/
    get maxScale() {
        let delta = this.info.maxLevel - this.info.baseLevel
        return Math.pow(2, delta) / this.resolution * 2
    }

    /** Getter for the current width.
     **/
    get width() {
        return this.pixelSize[0]
    }

    /** Getter for the current height.
     **/
    get height() {
        return this.pixelSize[1]
    }
    

    /* Overrides PIXI.Container.hitArea()
     * Allows to optimize the hit testing. Container with hit areas are directly
     * hit tested without consideration of children.
     */
    get hitArea() {
        // Defining the hitArea resulted hitting the scatter in masked area
        // when a mask was used (@TÃ¼sch[submaps]). Removing the hitArea() altogether
        // broke the interaction in other projects (@googleart). 
        // Fix: When masked, the hitArea is ignored by returning null.
        // TODO: test if childs are hittested, without setting interactiveChildren.
        // Opel, 03-05-2018
        if(this.mask){
            return null
        }
        return this
    }

    /* Overrides PIXI.Container.contains()
     * Allows to optimize the hit testing.
     */
    contains(x, y) {
        let [w, h] = this.baseSize
        return x >= 0 && x <= w && y >= 0 && y <= h
    }

    /** Overrides PIXI.Container._calculateBounds()
     * Only considers the base size and reduces the calculation to a single
     * rect.
     */
    _calculateBounds() {
        let [w, h] = this.baseSize
        this._bounds.addFrame(this.transform, 0, 0, w, h)
    }

    /** Overrides PIXI.Container.calculateBounds()
     * Skips the children and only considers the deep zoom base size. Calls
     * the also overwritten _calculateBounds method.
     */
    calculateBounds() {
        this._bounds.clear()
        this._calculateBounds()
        this._lastBoundsID = this._boundsID
    }

    /** Returns a single sprite that can be used a thumbnail representation of
     * large images.
     * @return {Sprite} sprite - A sprite with a single tile texture
     */
    thumbnail() {
        return new PIXI.Sprite.fromImage(this.info.baseURL)
    }

    /** Returns a list of all tiles of a given level.
     * @param {Tiles} tiles - the grid of tiles
     * @param {number} level - The zoom level of the grid
     * @return {Array[]} - An array of [url, col, row] arrays
     **/
    allTiles(tiles, level) {
        let result = []
        for (let col = 0; col < tiles.cols; col++) {
            for (let row = 0; row < tiles.rows; row++) {
                let url = this.info.urlForTile(level, col, row)
                result.push([url, col, row])
            }
        }
        return result
    }

    /** Loads all tiles that are needed to fill the app bounds.
     * @param {Tiles} tiles - the grid of tiles
     * @param {number} level - The zoom level of the grid
     * @param {boolean} debug
     * @return {Array[]} - An array of [url, col, row] arrays
     */
    neededTiles(tiles, level, debug = false) {
        let result = []
        let tsize = tiles.tileSize
        let domBounds = app.view.getBoundingClientRect()
        let maxWidth = domBounds.width
        let maxHeight = domBounds.height
        let offset = tsize
        let bounds = new PIXI.Rectangle(
            -offset,
            -offset,
            maxWidth + 2 * offset,
            maxHeight + 2 * offset
        )
        let scaledTileSize = tsize * tiles.tileScale
        let pointInWindow = new PIXI.Point()

        let worldTransform = this.worldTransform
        let worldCenter = new PIXI.Point(maxWidth / 2, maxWidth / 2)

        let tilesCenter = this.toLocal(worldCenter)
        /* UO: we need a toLocal call here since the transform may need an update
        which is guaranteed by the toLocal method. */
        let centerCol = Math.round(tilesCenter.x / scaledTileSize)
        let centerRow = Math.round(tilesCenter.y / scaledTileSize)

        let maxTilesWidth =
            Math.ceil(maxWidth / tiles.tileSize / 2 + 6) * this.resolution
        let maxTilesHeight =
            Math.ceil(maxHeight / tiles.tileSize / 2 + 4) * this.resolution

        let startCol = Math.max(0, centerCol - maxTilesWidth)
        let endCol = Math.min(tiles.cols, centerCol + maxTilesWidth)

        let startRow = Math.max(0, centerRow - maxTilesHeight)
        let endRow = Math.min(tiles.rows, centerRow + maxTilesHeight)

        for (let col = startCol; col < endCol; col++) {
            let cx = (col + 0.5) * scaledTileSize
            for (let row = startRow; row < endRow; row++) {
                let cy = (row + 0.5) * scaledTileSize
                let tileCenter = new PIXI.Point(cx, cy)
                // This replaces the more traditional this.toGlobal(center, pointInWindow, true)
                worldTransform.apply(tileCenter, pointInWindow)
                if (bounds.contains(pointInWindow.x, pointInWindow.y)) {
                    let url = this.info.urlForTile(level, col, row)
                    result.push([url, col, row])
                }
            }
        }
        return result
    }

    /** Returns all changed tiles for a given level.
     * @param {Tiles} tiles - the grid of tiles
     * @param {number} level - The zoom level of the grid
     * @return {object} - An object with the keys added and removed which values are [url, col, row] arrays
     */
    changedTiles(tiles, level) {
        if (this.debug) console.time('changedTiles')
        let changed = {added: [], removed: []}
        if (!tiles.isComplete()) {
            let newNeeded = new Map()
            let needed = this.neededTiles(tiles, level)
            needed.forEach(d => {
                let [url, col, row] = d
                newNeeded.set(url, [col, row])
                if (!tiles.requested.has(url)) {
                    changed.added.push(d)
                }
            })
            for (let url of tiles.needed.keys()) {
                if (!newNeeded.has(url)) {
                    let [col, row] = tiles.needed.get(url)
                    changed.removed.push([url, col, row])
                }
            }
            tiles.needed = newNeeded
            if (this.debug) console.log(newNeeded)
        }
        if (this.debug) console.timeEnd('changedTiles')

        return changed
    }

    /** Populates all tiles for a given level.
     * @param {Tiles} tiles - the grid of tiles
     * @param {number} level - The zoom level of the grid
     */
    populateAllTiles(tiles, level) {
        let all = this.allTiles(tiles, level)
        for (let [url, col, row] of all) {
            this.addTileQuadNode(level, col, row, url)
        }
        tiles.loadTiles(all, false, 0, 0)
    }

    /** Loads all tiles that are needed to fill the browser window.
     * If the optional about parameter is provided (as a point with col as x,
     * and row as y attr) the tiles are sorted by the distance to this point.
     *
     * @param {Tiles} tiles - the grid of tiles
     * @param {number} level - The zoom level of the grid
     * Optional parameter:
     * @param {boolean} onlyone - if true only one tile is loaded
     * @param {PIXI.Point} about - point of interaction
     */
    populateTiles(tiles, level, {onlyone = false, about = null} = {}) {
        let changed = this.changedTiles(tiles, level)
        let removed = changed.removed
        for (let [url, col, row] of removed) {
            this.removeTileQuadNode(level, col, row, url)
        }
        let added = changed.added
        if (added.length == 0) return
        for (let [url, col, row] of added) {
            this.addTileQuadNode(level, col, row, url)
        }
        let referenceCol = -1
        let referenceRow = -1
        if (about != null) {
            // We want to load tiles in the focus of the user first, therefore
            // we sort according to the distance of the focus of interaction
            let refPoint = this.toLocal(about)
            let scaledTileSize = tiles.tileSize * tiles.tileScale

            referenceCol = Math.floor(refPoint.x / scaledTileSize)
            referenceRow = Math.floor(refPoint.y / scaledTileSize)

            let ref = new PIXI.Point(referenceCol, referenceRow)

            // Note: The array must be sorted in a way that the nearest tiles
            // are at the end of the array since the load queue uses Array.push
            // Array.pop

            added.sort((a, b) => {
                let aa = new PIXI.Point(a[1], a[2])
                let bb = new PIXI.Point(b[1], b[2])
                let da = Points.distance(aa, ref)
                let db = Points.distance(bb, ref)
                return db - da
            })
            //console.log("sorted populateTiles",  referenceCol, referenceRow, missing)
        }
        //console.log("populateTiles " +  missing.length)
        tiles.loadTiles(added, onlyone, referenceCol, referenceRow)
    }

    /** Private method: creates all tiles for a given level.
     * @param {number} level - The zoom level of the grid
     * @return {Tiles} - tiles
     */
    _createTiles(key, level) {
        let [cols, rows, w, h] = this.info.dimensions(level)
        let increasedLevels = level - this.info.baseLevel
        let invScale = Math.pow(0.5, increasedLevels)
        let tiles = new Tiles(
            level,
            this,
            invScale,
            cols,
            rows,
            w,
            h,
            this.info.tileSize,
            this.info.overlap
        )
        this.addTiles(key, tiles)
        if (this.info.clip) {
            let rest = this.info.rests[level]
            if (rest) {
                let x = rest.restCol * this.info.tileSize * invScale
                let y = rest.restRow * this.info.tileSize * invScale
                tiles.x = -x
                tiles.y = -y
            }
        }
        return tiles
    }

    /** Ensures that all needed tiles of a given level are loaded. Creates
     * a new Tiles layer if necessary
     * @param {number} level - The zoom level of the grid
     * @return {Tiles} tiles
     */
    ensureTiles(level, about) {
        let key = level.toString()
        if (key in this.tileLayers) {
            let tiles = this.tileLayers[key]
            this.populateTiles(tiles, level, {about: about})
            return tiles
        }
        let tiles = this._createTiles(key, level)
        this.populateTiles(tiles, level, {about: about})
        //console.log("ensureTiles", level)
        return tiles
    }

    untintTiles(level) {
        let key = level.toString()
        if (key in this.tileLayers) {
            let tiles = this.tileLayers[key]
        }
    }

    /** Ensures that all tiles of a given level are loaded.
     * @param {number} level - The zoom level of the grid
     */
    ensureAllTiles(level) {
        let key = level.toString()
        if (key in this.tileLayers) {
            let tiles = this.tileLayers[key]
            this.populateAllTiles(tiles, level)
            tiles.keep = true
            return
        }
        let tiles = this._createTiles(key, level)
        this.populateAllTiles(tiles, level)
        tiles.keep = true
        return tiles
    }

    /** Destroys all tiles above a given level to ensure that the memory can
     * be reused.
     * @param {number} level - The zoom level of the grid
     */
    destroyTilesAboveLevel(level) {
        Object.keys(this.tileLayers).forEach(key => {
            let tiles = this.tileLayers[key]
            if (tiles.level > level && !tiles.keep) {
                for (let url of tiles.available.keys()) {
                    let quad = this.quadTrees.get(url)
                    if (quad) this.removeTileQuadNode(quad)
                }
                this.tileContainer.removeChild(tiles)
                tiles.destroy()
                delete this.tileLayers[key]
            }
        })
    }

    destroyTiles() {
        return
        // UO: This is buggy
        // Object.keys(this.tileLayers).forEach(key => {
        //     let tiles = this.tileLayers[key]
        //     if (!tiles.keep) tiles.destroyTiles(this.quadTrees)
        // })
    }

    /* Tint all tiles
    * @param {number} level - The zoom level of the grid
    */
    tintTilesBelowLevel(level) {
        Object.keys(this.tileLayers).forEach(key => {
            let tiles = this.tileLayers[key]
            if (tiles.level < level) {
                tiles.tintTiles(this.quadTrees)
            }
        })
    }

    _eventLevel(event) {
        return this.levelForScale(event.scale)
    }

    /** A callback function that can be used by a Scatter view to inform
     * the zoomable image that it has been moved, rotated or scaled, and should
     * load tiles accordingly.
     * @param {PIXI.Point} translated - the movement of the scatter
     * @param {number} scale - the zoom factor
     * @param {PIXI.Point} about - the anchor point of the zoom
     * @param {boolean} fast - informs the callback to return as fast as possible,
     *  i.e. after loading a single tile
     * @param {boolean} debug - log debug infos
     */
    transformed(event) {
        // console.log("DeepZoom.transformed", event)
        let key = this.currentLevel.toString()
        let currentTiles = this.tileLayers[key]
        if (event.fast) {
            this.fastLoads += 1
            this.populateTiles(currentTiles, this.currentLevel, {
                onlyone: false,
                about: event.about
            })
            this.destroyTiles()
            return
        }
        if (event.scale == null) {
            this.ensureTiles(this.currentLevel, event.about)
            return
        }
        let newLevel = Math.max(this._eventLevel(event), this.minimumLevel)
        if (newLevel != this.currentLevel) {
            if (!currentTiles.keep) currentTiles.loader.cancel()
            this.destroyTilesAboveLevel(newLevel)
            if (this.debug) this.tintTilesBelowLevel(newLevel)
            this.destroyTiles()
            let tiles = this.ensureTiles(newLevel, event.about)
            tiles.untintTiles()
            this.currentLevel = newLevel
        } else {
            this.ensureTiles(this.currentLevel, event.about)
            this.destroyTiles()
        }

        if (this._foreground) {
            this.addChild(this._foreground)
        }
    }
}


