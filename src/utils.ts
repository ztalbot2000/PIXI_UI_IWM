// globals WebKitPoint

export interface Point
{
   x: number;
   y: number;
}
export interface Rect
{
   x: number;
   y: number;
   left: number;
   right: number;
   top: number;
   bottom: number;
}
export interface RGB
{
   r: number;
   g: number;
   b: number;
}

// Tests whether an object is empty
// @param {Object} obj - the object to be tested
// @return {boolean}
//
export function isEmpty( obj:Array<any> ): boolean
{
    // > isEmpty( { } )
    // true
    for ( let i in obj )
    {
        // TS6133: 'i' is declared but its value is never read
        i=i
        return false
    }
    return true
}

// Returns a universal unique id
// @return {string}
// See https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/21963136#21963136
//
export function uuid( ): string
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, c => {
        let r = ( Math.random( ) * 16 ) | 0,
            v = c == 'x' ? r : ( r & 0x3 ) | 0x8
        return v.toString( 16 )
    } )
}

export function lerp( start: number, stop: number, amt: number ): number
{
   return amt * ( stop - start ) + start
}

export function sample(population: Array<string>, k: number): Array< string >
{
    /*
        From https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array/38571132

        Chooses k unique random elements from a population sequence or set.

        Returns a new list containing elements from the population while
        leaving the original population unchanged.  The resulting list is
        in selection order so that all sub-slices will also be valid random
        samples.  This allows raffle winners (the sample) to be partitioned
        into grand prize and second place winners (the subslices).

        Members of the population need not be hashable or unique.  If the
        population contains repeats, then each occurrence is a possible
        selection in the sample.

        To choose a sample in a range of integers, use range as an argument.
        This is especially fast and space efficient for sampling from a
        large population:   sample(range(10000000), 60)

        Sampling without replacement entails tracking either potential
        selections (the pool) in a list or previous selections in a set.

        When the number of selections is small compared to the
        population, then tracking selections is efficient, requiring
        only a small set and an occasional reselection.  For
        a larger number of selections, the pool tracking method is
        preferred since the list takes less space than the
        set and it doesn't suffer from frequent reselections.
    */

    if (!Array.isArray(population))
        throw new TypeError("Error: Utils, Population must be an array.")
    let n = population.length
    if (k < 0 || k > n)
        throw new RangeError("Error: Utils, Sample larger than population or is negative")

    let result = new Array(k)
    let setsize = 21   // size of a small set minus size of an empty list

    if (k > 5)
        //B setsize += Math.pow(4, Math.ceil(Math.log(k * 3, 4)))
        //B Math.log, expected 1 argument, received two
        setsize += Math.pow(4, Math.ceil(Math.log(k * 3)))

    if (n <= setsize) {
        // An n-length list is smaller than a k-length set
        let pool = population.slice()
        for (let i = 0; i < k; i++) {          // invariant:  non-selected at [0,n-i)
            let j = Math.random() * (n - i) | 0
            result[i] = pool[j]
            pool[j] = pool[n - i - 1]       // move non-selected item into vacancy
        }
    } else {
        let selected = new Set()
        for (let i = 0; i < k; i++) {
            let j = Math.random() * (n - i) | 0
            while (selected.has(j)) {
                j = Math.random() * (n - i) | 0
            }
            selected.add(j)
            result[i] = population[j]
        }
    }

    return result
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// Taken from: https://davidwalsh.name/essential-javascript-functions
//export function debounce( func: Function, wait: number, immediate: boolean )
export function debounce( func: Function, wait: number, immediate: boolean ): Function
{
    let timeout: ReturnType<typeof setTimeout>
    return function( )
    {
        // @ts-ignore - error TS2683 : 'this' implicitly has type 'any' because it does not have a type annotation.
        let context = this
        let args = arguments
        let later = function( )
        {
            timeout = null
            if ( !immediate )
                func.apply( context, args )
        }
        let callNow = immediate && !timeout
        clearTimeout( timeout )
        timeout = setTimeout( later, wait )
        if ( callNow )
           func.apply( context, args )
    }
}

// Returns an id that is guaranteed to be unique within the livetime of the
// application
// @return {string}
//
let _idGenerator: number = 0;
export function getId( ): string
{
    return 'id' + _idGenerator++
}

export function randomInt(min:number = 0, max:number = 100):number
{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomFloat(min:number = 0.0, max:number = 1.0):number
{
    return Math.random() * (max - min) + min
}

export class Dates
{
    //static create( fullYear: number, month: number, day: number, hour?: number, minutes?: number ): Date
    static create( fullYear: number, month: number, day: number ): Date
    {
        //O return new Date( Date.UTC( fullYear, month, day, hour, minutes ) )
        return new Date( Date.UTC( fullYear, month, day ) )
    }

    static daysInMonth( date: Date ): number
    {
        return new Date( date.getFullYear( ), date.getMonth(  ) + 1, 0 ).getDate(  )
    }

    static startYearRange(date: Date): Date
    {
        return new Date(Date.UTC(date.getFullYear() - 1, 11, 31, 23, 59, 59, 999))
    }

    static endYearRange(date: Date): Date
    {
        return new Date(Date.UTC(date.getFullYear() + 1, 0, 1))
    }

    static prevYear(date: Date, offset: number = 1): Date
    {
        return this.create(date.getFullYear() - offset, 0, 1)
    }

    static nextYear( date: Date, offset:number = 1 ): Date
    {
        return this.create( date.getFullYear( ) + offset, 0, 1 )
    }

    static nextMonth( date: Date ): Date
    {
        return this.create( date.getFullYear( ), date.getMonth(  ) + 1, 1 )
    }

    static nextDay( date: Date ): Date
    {
        return this.create(
            date.getFullYear( ),
            date.getMonth( ),
            date.getDate( ) + 1
         )
    }

    static nextHour( date: Date ): Date
    {
        // See http://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object
        return new Date( date.getTime( ) + 60 * 60 * 1000 )
    }

    static nextMinute( date: Date ): Date
    {
        // See above
        return new Date( date.getTime( ) + 60 * 1000 )
    }

    static nextSecond( date: Date ): Date
    {
        // See above
        return new Date( date.getTime( ) + 1000 )
    }

    static nextMillisecond( date: Date ): Date
    {
        // See above
        return new Date( date.getTime( ) + 1 )
    }

    static *iterYears( start: Date, end: Date ): Generator<Date, string, boolean>
    {
        let date = this.create( start.getFullYear( ), 0, 1 )
        while ( date <= end )
        {
            yield date
            date = this.nextYear( date )
        }
        yield date

        //N Stupid typescript
        return null
    }

    static *iterMonths( year: Date, limit: number = 12 ): Generator<Date, string, boolean>
    {
        let month = 0
        while ( month < limit )
        {
            let date = this.create( year.getFullYear( ), month, 1 )
            yield date
            month += 1
        }

        //N Stupid typescript
        return null
    }

    //static *iterMonthsOfYears( years: Array< Date > ): Date
    static *iterMonthsOfYears( years: Array< Date > ): Generator<Date, string, boolean>
    {
        for ( let year of years )
        {
            for ( let month of this.iterMonths( year ) )
            {
                yield month
            }
        }

        //N Stupid typescript
        return null
    }

    static *iterDays( month: Date ): Generator<Date, string, boolean>
    {
        let day = 1
        let limit = Dates.daysInMonth( month )
        while ( day <= limit )
        {
            let date = this.create( month.getFullYear(  ), month.getMonth( ), day )
            yield date
            day += 1
        }

        //N Stupid typescript
        return null
    }

    static *iterDaysOfMonths( months: Array< Date > ): Generator<Date, string, boolean>
    {
        for ( let month of months )
        {
            for ( let day of this.iterDays( month ) )
            {
                yield day
            }
        }

        //N Stupid typescript
        return null
    }
}
// Color conversion functions

export class Colors
{
    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

    static rgb2num( red: number, green: number, blue: number ): number
    {
        let rgb = blue | ( green << 8 ) | ( red << 16 )
        return 0x000000 + rgb
    }

    static rgb2hex( red: number, green: number, blue: number ): string
    {
        let rgb = blue | ( green << 8 ) | ( red << 16 )
        return '#' + ( 0x1000000 + rgb ).toString( 16 ).slice( 1 )
    }

    static hex2rgb( hex: string )
    {
        // long version
        let r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
        if ( r )
        {
            return r.slice( 1, 4 ).map( x => {
                return parseInt( x, 16 )
            } )
        }
        // short version
        r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
        if ( r )
        {
            return r.slice( 1, 4 ).map( x => {
                return 0x11 * parseInt( x, 16 )
            } )
        }
        return null
    }

    static rgb( r: number, g: number, b: number ): RGB
    {
        return {r, g, b}
    }

    static lerp( rgb1: RGB, rgb2: RGB, amount: number ): RGB
    {
        return {
            r: Math.round( lerp( rgb1.r, rgb2.r, amount ) ),
            g: Math.round( lerp( rgb1.g, rgb2.g, amount ) ),
            b: Math.round( lerp( rgb1.b, rgb2.b, amount ) )
        }
    }

    static violet( ): number
    {
        return Colors.rgb2num( 89, 34, 131 )
    }

    static steelblue( ): number
    {
        return Colors.rgb2num( 0, 130, 164 )
    }

    static ochre( ): number
    {
        return Colors.rgb2num( 181, 157, 0 )
    }

    static turquoise( ): number
    {
        return Colors.rgb2num( 34, 164, 131 )
    }

    static eminence( ): number
    {
        return Colors.rgb2num( 150, 60, 134 )
    }

    static random(): number
    {
        let r = Math.round(Math.random() * 255)
        let g = Math.round(Math.random() * 255)
        let b = Math.round(Math.random() * 255)
        return Colors.rgb2num(r, g, b)
    }
}

//B God knows how this handles pop, push, splice, slice, shift & unshift
export class Cycle<T> extends Array<T>
{
    private index: number

    constructor( ...items: Array<T> )
    {
        super( ...items )
    }

    next(  )
    {
        if ( this.index == this.length )
        {
            this.index = 0
        }
        return this[ this.index++ ]
    }

    current(  )
    {
        if ( this.index === this.length )
        {
            this.index = 0
        }
        return this[ this.index ]
    }
}

// Static methods to compute 2D points with x and y coordinates.
//
export class Points
{
    //B static length( a: Point ): number
    //B length is a reserver property name
    static pointLength( a: Point ): number
    {
        return Math.sqrt( a.x * a.x + a.y * a.y )
    }

    static normalize( p: Point )
    {
        //B let len = this.length( p )
        //B length is a reservered property name
        let len = this.pointLength( p )
        return this.multiplyScalar( p, 1 / len )
    }

    static mean( a: Point, b: Point ): Point
    {
        return {x: ( a.x + b.x ) / 2, y: ( a.y + b.y ) / 2}
    }

    static subtract( a: Point, b: Point )
    {
        return {x: a.x - b.x, y: a.y - b.y}
    }

    static multiply( a: Point, b: Point ): Point
    {
        return {x: a.x * b.x, y: a.y * b.y}
    }

    static divide(a: Point, b: Point): Point
    {
        return { x: a.x / b.x, y: a.y / b.y }
    }

    static multiplyScalar( a: Point, b: number )
    {
        return {x: a.x * b, y: a.y * b}
    }

    static add( a: Point, b: Point ): Point
    {
        return {x: a.x + b.x, y: a.y + b.y}
    }

    static negate( p: Point ): Point
    {
        return {x: -p.x, y: -p.y}
    }

    static angle( p1: Point, p2: Point ): number
    {
        return Math.atan2( p1.y - p2.y, p1.x - p2.x )
    }

    static normalizedAngle(p1: Point, p2: Point): number
    {
        return Angle.normalize(this.angle(p1, p2))
    }

    static normalized2Angle(p1: Point, p2: Point): number
    {
        return Angle.normalize2(this.angle(p1, p2))
    }

    static arc( p: Point, alpha: number, radius: number ): Point
    {
        return {
            x: p.x + radius * Math.cos( alpha ),
            y: p.y + radius * Math.sin( alpha )
        }
    }

    static distance( a: Point, b: Point ): number
    {
        let dx = a.x - b.x
        let dy = a.y - b.y
        return Math.sqrt( dx * dx + dy * dy )
    }

    // This uses a function on the global window, based on iwmlib.
    //  So this cannot be unit tested easily. TBD
    // https://gitea.iwm-tuebingen.de/IWMBrowser/iwmlib/commit/80317c502614c5968dd81d2863d0c15ef4fcc75f
    static fromPageToNode( element: HTMLElement, p: Point )
    {
        //    if ( window.webkitConvertPointFromPageToNode )
        //    {
        //             return window.webkitConvertPointFromPageToNode( element,
        //                                                     new WebKitPoint( p.x, p.y ) )
        //    }
        // @ts-ignore TS2339: Property 'convertPointFromPageToNode' does not exist on type 'Window & typeof globalThis'.
        return window.convertPointFromPageToNode( element, p.x, p.y )
    }

    // This uses a function on the global window, based on iwmlib.
    //  So this cannot be unit tested easily. TBD
    // https://gitea.iwm-tuebingen.de/IWMBrowser/iwmlib/commit/80317c502614c5968dd81d2863d0c15ef4fcc75f
    static fromNodeToPage( element: HTMLElement, p: Point )
    {
        //  if ( window.webkitConvertPointFromNodeToPage )
        //  {
        //             return window.webkitConvertPointFromNodeToPage( element,
        //                                                     new WebKitPoint( p.x, p.y ) )
        //  }
        // @ts-ignore TS2339: Property 'convertPointFromPageToNode' does not exist on type 'Window & typeof globalThis'.
        return window.convertPointFromNodeToPage( element, p.x, p.y )
    }
}

//
// A helper class for common set operations.
//
// @export
// @class Sets
//

//export class Sets extends Set
export class Sets
{
    //
    // Returns the intersection of all sets
    // https://stackoverflow.com/questions/31930894/javascript-set-data-structure-intersect
    // @static
    // @param {*} sets
    // @returns
    // @memberof Sets
    //
    static intersect( ...sets: Array<any>): Set<any>
    {
        if ( !sets.length )
           return new Set( )
        const i = sets.reduce( ( m, s, i ) => s.size < sets[m].size ? i : m, 0 )
        const [smallest] = sets.splice( i, 1 )
        const res = new Set()
        for  ( let val of smallest )
            if ( sets.every( s => s.has( val ) ) )
                res.add( val )
        return res
    }

    //
    // Returns the union of all sets
    //
    // @static
    // @param {*} sets
    // @returns
    // @memberof Sets
    //
    static union( ...sets: Array<any> ): Set<any>
    {
        let result = new Set( )
        for ( let set of sets )
        {
            for ( let m of set )
            {
                result.add( m )
            }
        }
        return result
    }

    //
    // Returns the difference of the given sets. Starts with the first set and removing all elements of the following sets.
    //
    // @static
    // @param {*} set
    // @param {*} sets
    // @returns
    // @memberof Sets
    //
    static difference( set: Array<any>, ...sets: Array<Array<any>> ): Set<any>
    {
        let result = new Set( )
        for ( let m of set )
        {
            result.add( m )
        }
        for ( let s of sets )
        {
            for ( let m of s )
            {
                result.delete( m )
            }
        }
        return result
    }
}

// Static methods to compute angles.
//
export class Angle
{
    static normalize( angle: number ): number
    {
        let twoPI = Math.PI * 2.0
        while ( angle > Math.PI )
        {
            angle -= twoPI
        }
        while ( angle < -Math.PI )
        {
            angle += twoPI
        }
        return angle
    }

    static normalize2( angle: number ): number
    {
        let TAU = Math.PI * 2.0
        while ( angle > TAU )
        {
            angle -= TAU
        }
        while ( angle < 0 )
        {
            angle += TAU
        }
        return angle
    }

    static normalizeDegree( angle: number ): number
    {
        let full = 360.0
        while ( angle > 180.0 )
        {
            angle -= full
        }
        while ( angle < -180.0 )
        {
            angle += full
        }
        return angle
    }

    static diff( a: number, b: number ): number
    {
        return Angle.normalize( Math.atan2( Math.sin( a - b ), Math.cos( a - b ) ) )
    }

    static degree2radian( degree: number ): number
    {
        return Math.PI * degree / 180.0
    }

    static radian2degree( rad: number ): number
    {
        return 180.0 / Math.PI * rad
    }
}

export class Elements
{
    static setStyle( element: HTMLElement, styles: Array< string >  )
    {
        for ( let key in styles )
        {
            element.style[ key ] = styles[ key ]
        }
    }

    static addClass( element: HTMLElement, cssClass: string )
    {
        element.classList.add( cssClass )
    }

    static removeClass( element: HTMLElement, cssClass: string )
    {
        element.classList.remove( cssClass )
    }

    static toggleClass( element: HTMLElement, cssClass: string )
    {
        element.classList.toggle( cssClass )
    }

    static hasClass( element: HTMLElement, cssClass: string )
    {
        return element.classList.contains( cssClass )
    }
}

/* Not supported at this time
export class MapProxy
{
    // This class is needed if we want to use the interaction classes
    //in Firefox 45.8 and modern Browsers.

    // A workaround for https://github.com/babel/babel/issues/2334
    //
    private map: Array<string>

    constructor(  )
    {
        this.map = new Map(  )
    }

    get size(  ): number
    {
        return this.map.size
    }

    get( key: string )
    {
        return this.map.get( key )
    }

    set( key: string, value: number )
    {
        return this.map.set( key, value )
    }

    delete( key: string )
    {
        return this.map.delete( key )
    }

    clear(  )
    {
        return this.map.clear(  )
    }

    has( key: string )
    {
        return this.map.has( key )
    }

    keys(  ): Array< string >
    {
        return this.map.keys(  )
    }

    values(  ): Array< number >
    {
        return this.map.values(  )
    }

    entries(  )
    {
        return this.map.entries(  )
    }

    forEach( func: Array< Function > )
    {
        this.map.forEach( func )
    }
}

*/

// Based om https://gist.github.com/cwleonard/e124d63238bda7a3cbfa
export class Polygon
{
    //
    //  This is the Polygon constructor. All points are center-relative.
    //
    private points: Array< Point >
    private center: Point

    constructor( center: Point )
    {
        this.points = new Array( )
        this.center = center
    }

    //
    //  Point x and y values should be relative to the center.
    //
    addPoint( p: Point )
    {
        this.points.push( p )
    }

    //
    //  Point x and y values should be absolute coordinates.
    //
    addAbsolutePoint( p: Point )
    {
        this.points.push( { x: p.x - this.center.x, y: p.y - this.center.y } )
    }

    //
    // Returns the number of sides. Equal to the number of vertices.
    //
    getNumberOfSides(  )
    {
        return this.points.length
    }

    //
    // rotate the polygon by a number of radians
    //
    rotate( rads: number )
    {
        for ( let i = 0; i < this.points.length; i++ )
        {
            let x = this.points[ i ].x
            let y = this.points[ i ].y
            this.points[ i ].x = Math.cos( rads ) * x - Math.sin( rads ) * y
            this.points[ i ].y = Math.sin( rads ) * x + Math.cos( rads ) * y
        }
    }

    //
    //  The draw function takes as a parameter a Context object from
    //  a Canvas element and draws the polygon on it.
    //
    draw( context: CanvasRenderingContext2D,
         //O {lineWidth = 2, stroke = '#000000', fill = null} = {} )
         //  Typescript workaround
         {lineWidth = 2, stroke = '#000000', fill = ''} = {} )
    {
        context.beginPath(  )
        context.moveTo(
            this.points[ 0 ].x + this.center.x,
            this.points[ 0 ].y + this.center.y
         )
        for ( let i = 1; i < this.points.length; i++ )
        {
            context.lineTo(
                this.points[i].x + this.center.x,
                this.points[i].y + this.center.y
             )
        }
        context.closePath( )
        context.lineWidth = lineWidth
        if ( stroke )
        {
            context.strokeStyle = stroke
            context.stroke( )
        }
        //O if ( fill )
        //  Typescript workaround
        if ( fill && fill != ''  )
        {
            context.fillStyle = fill
            context.fill( )
        }
    }

    absolutePoints(  )
    {
        let result = new Array(  )
        for ( let p of this.points )
        {
            result.push( Points.add( p, this.center ) )
        }
        return result
    }

    flatAbsolutePoints(  )
    {
        let result = new Array(  )
        for ( let p of this.points )
        {
            let a = Points.add( p, this.center )
            result.push( a.x )
            result.push( a.y )
        }
        return result
    }

    //
    //  This function returns true if the given point is inside the polygon,
    //  and false otherwise.
    ///
    containsPoint( pnt: Point )
    {
        let nvert = this.points.length
        let testx = pnt.x
        let testy = pnt.y

        let vertx = new Array(  )
        for ( let q = 0; q < this.points.length; q++ )
        {
            vertx.push( this.points[ q ].x + this.center.x )
        }

        let verty = new Array(  )
        for ( let w = 0; w < this.points.length; w++ )
        {
            verty.push( this.points[ w ].y + this.center.y )
        }

        let i,
            j = 0
        let c = false
        for ( i = 0, j = nvert - 1; i < nvert; j = i++ )
        {
            if (
                verty[ i ] > testy != verty[ j ] > testy &&
                testx <
                    ( vertx[ j ] - vertx[ i ] ) *
                        ( testy - verty[ i ] ) /
                        ( verty[ j ] - verty[ i ] ) +
                        vertx[ i ]
             )
                c = !c
        }
        return c
    }

    multiplyScalar( scale: number )
    {
        let center = Points.multiplyScalar( this.center, scale )
        let clone = new Polygon( center )
        for ( let p of this.points )
        {
            clone.addPoint( Points.multiplyScalar( p, scale ) )
        }
        return clone
    }

    //
    //  To detect intersection with another Polygon object, this
    //  function uses the Separating Axis Theorem. It returns false
    //  if there is no intersection, or an object if there is. The object
    //  contains 2 fields, overlap and axis. Moving the polygon by overlap
    //  on axis will get the polygons out of intersection.
    ///
    intersectsWith( other: Polygon )
    {
        let axis: Point = { x: 0, y: 0 }
        let tmp, minA, maxA, minB, maxB
        let side, i
        let smallest = null
        let overlap = 99999999

        // test polygon A's sides
        for ( side = 0; side < this.getNumberOfSides(  ); side++ )
        {
            // get the axis that we will project onto
            if ( side == 0 )
            {
                axis.x =
                    this.points[this.getNumberOfSides(  ) - 1 ].y -
                    this.points[ 0 ].y
                axis.y =
                    this.points[ 0 ].x -
                    this.points[this.getNumberOfSides(  ) - 1 ].x
            } else {
                axis.x = this.points[ side - 1 ].y - this.points[ side ].y
                axis.y = this.points[ side].x - this.points[ side - 1 ].x
            }

            // normalize the axis
            tmp = Math.sqrt( axis.x * axis.x + axis.y * axis.y )
            axis.x /= tmp
            axis.y /= tmp

            // project polygon A onto axis to determine the min/max
            minA = maxA = this.points[ 0 ].x * axis.x + this.points[ 0 ].y * axis.y
            for ( i = 1; i < this.getNumberOfSides( ); i++ )
            {
                tmp = this.points[ i ].x * axis.x + this.points[ i ].y * axis.y
                if ( tmp > maxA )
                   maxA = tmp
                else if ( tmp < minA )
                   minA = tmp
            }
            // correct for offset
            tmp = this.center.x * axis.x + this.center.y * axis.y
            minA += tmp
            maxA += tmp

            // project polygon B onto axis to determine the min/max
            minB = maxB =
                other.points[ 0 ].x * axis.x + other.points[ 0 ].y * axis.y
            for ( i = 1; i < other.getNumberOfSides( ); i++ )
            {
                tmp = other.points[ i ].x * axis.x + other.points[ i ].y * axis.y
                if ( tmp > maxB )
                   maxB = tmp
                else if ( tmp < minB )
                   minB = tmp
            }
            // correct for offset
            tmp = other.center.x * axis.x + other.center.y * axis.y
            minB += tmp
            maxB += tmp

            // test if lines intersect, if not, return false
            if ( maxA < minB || minA > maxB ) {
                return false
            } else {
                let o = maxA > maxB ? maxB - minA : maxA - minB
                if ( o < overlap )
                {
                    overlap = o
                    smallest = { x: axis.x, y: axis.y }
                }
            }
        }

        // test polygon B's sides
        for ( side = 0; side < other.getNumberOfSides(  ); side++ )
        {
            // get the axis that we will project onto
            if ( side == 0 )
            {
                axis.x =
                    other.points[ other.getNumberOfSides( ) - 1 ].y -
                    other.points[ 0 ].y
                axis.y =
                    other.points[ 0 ].x -
                    other.points[other.getNumberOfSides( ) - 1].x
            } else {
                axis.x = other.points[ side - 1 ].y - other.points[ side ].y
                axis.y = other.points[ side ].x - other.points[ side - 1 ].x
            }

            // normalize the axis
            tmp = Math.sqrt( axis.x * axis.x + axis.y * axis.y )
            axis.x /= tmp
            axis.y /= tmp

            // project polygon A onto axis to determine the min/max
            minA = maxA = this.points[ 0 ].x * axis.x + this.points[ 0 ].y * axis.y
            for ( i = 1; i < this.getNumberOfSides(  ); i++ )
            {
                tmp = this.points[ i ].x * axis.x + this.points[ i ].y * axis.y
                if ( tmp > maxA )
                   maxA = tmp
                else if ( tmp < minA )
                   minA = tmp
            }
            // correct for offset
            tmp = this.center.x * axis.x + this.center.y * axis.y
            minA += tmp
            maxA += tmp

            // project polygon B onto axis to determine the min/max */
            minB = maxB =
                other.points[0].x * axis.x + other.points[0].y * axis.y
            for ( i = 1; i < other.getNumberOfSides(  ); i++ )
            {
                tmp = other.points[i].x * axis.x + other.points[i].y * axis.y
                if ( tmp > maxB )
                   maxB = tmp
                else if ( tmp < minB )
                   minB = tmp
            }
            // correct for offset
            tmp = other.center.x * axis.x + other.center.y * axis.y
            minB += tmp
            maxB += tmp

            // test if lines intersect, if not, return false
            if ( maxA < minB || minA > maxB )
            {
                return false
            } else {
                let o = maxA > maxB ? maxB - minA : maxA - minB
                if ( o < overlap )
                {
                    overlap = o
                    smallest = { x: axis.x, y: axis.y }
                }
            }
        }
        return { overlap: overlap + 0.001, axis: smallest }
    }

    static fromPoints( points: Array< Point > )
    {
        let min = {x: Number.MAX_VALUE, y: Number.MAX_VALUE}
        let max = {x: Number.MIN_VALUE, y: Number.MIN_VALUE}
        for ( let p of points )
        {
            min.x = Math.min( p.x, min.x )
            max.x = Math.max( p.x, max.x )
            min.y = Math.min( p.y, min.y )
            max.y = Math.max( p.y, max.y )
        }
        let center = Points.mean( min, max )
        let polygon = new Polygon( center )
        for ( let p of points )
        {
            polygon.addAbsolutePoint( p )
        }
        return polygon
    }
}


//
// Util functions to deal with DOMRects.
//
export class Rect
{
    //
    // Test if a given point is contained by the provided Rect.
    //
    // @static
    // @param {DOMRect} rect - Rectangle to check the collision with.
    // @param {Point} point - Point that should be tested.
    // @returns {boolean} - True if point is inside of rect, otherwise false.
    // @memberof Rect
    //
    static contains( rect: Rect, point: Point ): boolean
    {
        return ( point.x > rect.left &&
                 point.x < rect.x + rect.right &&
                 point.y > rect.top &&
                 point.y < rect.bottom )
    }


    //
    // Returns the position of an rect as point object.
    //
    // @static
    // @param {Rect} rect - The rectangle we want to get the position from.
    // @returns {Point} - Returns the position as Point.
    // @memberof Rect
    //
    static getPosition( rect: Rect ): Point
    {
        return { x: rect.x, y: rect.y }
    }
}

// String utility functions
export class Strings
{
    static toUpperCaseFirstChar( str: string )
    {
        return str.substr( 0, 1 ).toUpperCase( ) + str.substr( 1 )
    }

    static toLowerCaseFirstChar( str: string )
    {
        return str.substr( 0, 1 ).toLowerCase( ) + str.substr( 1 )
    }

    static toUpperCaseEachWord( str: string, delim: string = ' ' )
    {
        // B return str.split(delim).map((v) => v.toUpperCaseFirstChar()).join(delim)
        // B Unit testing of original code gives
        // B TypeError: v.toUpperCaseFirstChar is not a function
        return str.split( delim ).map( ( v ) => Strings.toUpperCaseFirstChar( v ) ).join( delim )
    }

    static toLowerCaseEachWord( str: string, delim: string = ' ')
    {
        // B return str.split(delim).map((v) => v.toLowerCaseFirstChar()).join(delim)
        // B Unit testing of original code gives
        // B TypeError: v.toLowerCaseFirstChar is not a function
        return str.split( delim ).map( ( v ) => Strings.toLowerCaseFirstChar( v ) ).join( delim )
    }

}



