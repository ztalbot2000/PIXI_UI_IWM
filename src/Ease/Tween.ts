import  { EaseBase }  from './EaseBase';
import  { Ease }  from './Ease';

// To Handle any object to Tween
interface INameToValueMap
{
    [key: string]: any;
}

export interface IRGB
{
   r: number;
   g: number;
   b: number;
}


// activeTweenObjects is used both by Class Tween and Class CallbackItem
var _activeTweenObjects:Array<INameToValueMap> = [];

class TweenObject
{
   public object: any;
   public tweens: INameToValueMap;
   public active: boolean
   public onUpdate: Function;

   public _tweenObjectId: number;

   public _currentCallbackID: number;

   // The user provides obj and we turn it into a tweenObject
   constructor( obj: any )
   {
      this.object = obj;
      this.tweens = {};
      this.active = false;
      this.onUpdate = null;

      this._tweenObjectId = undefined;

      this._currentCallbackID= undefined;
   }
};

class CallbackItem
{
   public _ready: boolean;
   private tweenObject: TweenObject;
   private parent: TweenObject;
   public key: string;
   private time: number;
   private callback: Function;
   private currentTime: number;

   constructor()
   {
      this._ready = false;
      this.tweenObject = null;
      this.parent = null;
      this.key = "";
      this.time = 0;
      this.callback = null;
      this.currentTime = 0;
   };

   private remove = (): void =>
   {
      this._ready = true;

      delete this.parent.tweens[ this.key ];

      if ( ! Object.keys( this.parent.tweens ).length )
      {
         this.parent.active = false;

         this.parent.onUpdate = null;

         delete _activeTweenObjects[ this.tweenObject._tweenObjectId ];
      }
   };

   public set = ( obj:TweenObject, callback: Function , time: number ): void =>
   {
      this.tweenObject = obj.object;

      if ( ! this.tweenObject._currentCallbackID )
      {
         this.tweenObject._currentCallbackID = 1;
      }
      else
      {
         this.tweenObject._currentCallbackID++;
      }

      this.time = time;
      this.parent = obj;
      this.callback = callback;
      this._ready = false;
      this.key = "cb_" + this.tweenObject._currentCallbackID;
      this.currentTime = 0;

      if ( ! this.parent.active )
      {
         this.parent.active = true;
         _activeTweenObjects[ this.tweenObject._tweenObjectId ] = this.parent;
      }
   };

   public update ( delta: number ): void
   {
      this.currentTime += delta;

      if ( this.currentTime >= this.time )
      {
         this.remove( );

         this.callback( );
      }
   };
}

interface TweenItemColor {
    r: number;
    g: number;
    b: number;
};

class TweenItem
{
   public _ready: boolean;
   private parent: TweenObject;
   private obj: any;
   private key: string;
   // This has been referred to as a string/number or {a}
   private from: any;
   // This has been referred to as a string/number or {a}
   private to: any;
   private time: number;
   private ease: EaseBase;
   private currentTime: number;
   private t: number;
   public isColor: boolean;

   private currentColor: TweenItemColor;

   private widthKeys:  Array<string>;
   private heightKeys: Array<string>;

   private surfix: string;

   constructor()
   {
      this._ready = false;
      this.parent = null;
      this.obj = null;
      this.key = "";
      this.from = 0;
      this.to = 0;
      this.time = 0;
      // ease is an Ease function
      this.ease = null;
      this.currentTime = 0;
      this.t = 0;
      this.isColor = false;

      this.currentColor = {r:0, g:0, b:0};

      this.widthKeys = [ "width", "minWidth", "maxWidth", "anchorLeft", "anchorRight", "left", "right", "x" ];
      this.heightKeys = [ "height", "minHeight", "maxHeight", "anchorTop", "anchorBottom", "top", "bottom", "y" ];

      // The fact that getSurface possibly did not return anything makes this a bug
      this.surfix = null;
   }

   private remove = ( ):void =>
   {
      this._ready = true;

      delete this.parent.tweens[ this.key ];

      if ( ! Object.keys( this.parent.tweens ).length )
      {
         this.parent.active = false;

         delete _activeTweenObjects[ this.obj._tweenObjectId ];
      }
   };

   public set = ( obj: TweenObject, key: string, from: any, to: any, time: number, ease: EaseBase ):void =>
   {
      this.isColor = isNaN( from ) && from[ 0 ] == "#" || isNaN( to ) && to[ 0 ] == "#";
      this.parent = obj;
      //Note: We are in Class TweenItem
      //Note: TweenObject has type object, which is type Tween
      this.obj = obj.object;
      this.key = key;
      this.surfix = this.getSurfix( to );

      if ( this.isColor )
      {
         this.to = TweenItem.hexToRgb( to );
         this.from = TweenItem.hexToRgb( from );
         this.currentColor =
         {
            r: this.from.r,
            g: this.from.g,
            b: this.from.b
         };
      }
      else
      {
         this.to = this.getToValue( to );
         this.from = this.getFromValue( from, to, this.obj, key );
      }

      this.time = time;
      this.currentTime = 0;
      this.ease = ease;
      this._ready = false;

      if ( ! this.parent.active )
      {
         this.parent.active = true;

         _activeTweenObjects[ this.obj._tweenObjectId ] = this.parent;
      }
   };

   public update ( delta: number ): void
   {
      this.currentTime += delta;
      this.t = Math.min( this.currentTime, this.time ) / this.time;
      if ( this.ease )
      {
         this.t = this.ease.getPosition( this.t );
      }

      if ( this.isColor )
      {
         this.currentColor.r = Math.round( TweenItem.Lerp( this.from.r, this.to.r, this.t ) );
         this.currentColor.g = Math.round( TweenItem.Lerp( this.from.g, this.to.g, this.t ) );
         this.currentColor.b = Math.round( TweenItem.Lerp( this.from.b, this.to.b, this.t ) );
         this.obj[ this.key ] = TweenItem.rgbToNumber( this.currentColor.r, this.currentColor.g, this.currentColor.b );
      }
      else
      {
         let val = TweenItem.Lerp( this.from, this.to, this.t );
         this.obj[ this.key ] = this.surfix ? val + this.surfix : val;
      }

      if ( this.currentTime >= this.time )
      {
         this.remove( );
      }
   };
   public getFromValue = ( from: any, to: any, obj: INameToValueMap, key: string ):number =>
   {
      // both number
      if ( ! isNaN( from ) && ! isNaN( to ) )
         return < number > from ;

      // both percentage
      if (isNaN(from) && isNaN(to) && from.indexOf('%') !== -1 && to.indexOf('%') !== -1)
      {
         return parseFloat(from.replace('%', ''));
      }


      // convert from to px
      if ( isNaN( from ) && !isNaN( to ) && from.indexOf( '%' ) !== -1 )
      {
         if ( this.widthKeys.indexOf( key ) !== -1 )
         {
            return obj.parent._width * ( parseFloat( from.replace( '%', '' ) ) * 0.01 );
         }
         else if ( this.heightKeys.indexOf( key ) !== -1 )
         {
            return obj.parent._height * ( parseFloat( from.replace( '%', '' ) ) * 0.01 );
         }
         else
         {
            return 0;
         }
      }

      // convert from to percentage
      if ( ! isNaN( from ) && isNaN( to ) && to.indexOf( '%' ) !== -1 )
      {
         if ( this.widthKeys.indexOf( key ) !== -1 )
         {
            return ( < number > from ) / obj.parent._width * 100;
         }
         else if ( this.heightKeys.indexOf( key ) !== -1 )
         {
            return ( < number > from ) / obj.parent._height * 100;
         }
         else
         {
            return 0;
         }
      }
      return 0;
   }

   private getSurfix = ( to:( number | string) ): string =>
   {
      if ( typeof to === 'string' && to.indexOf( '%' ) !== -1 )
      {
         return "%";
      }
      // this did not return anything before
      return null;
   }

   private getToValue = ( to: any ): number =>
   {
      if ( ! isNaN(to))
      {
         return < number > to ;
      }

      if (isNaN(to) && to.indexOf('%') !== -1)
      {
         return parseFloat( to.replace( '%', '' ) );
      }
      console.warn("to(" + to + ") is not a number or string:" + typeof to);
      // getToValue did not return anything if fall through
      return < number > to ;
   }

   static Lerp = (start: number, stop: number, amt: number): number =>
   {
      if ( amt > 1 )
         amt = 1;
      else if ( amt < 0 )
         amt = 0;

      return start + ( stop - start ) * amt;
   }

   static numberToRgb = (c: number): IRGB =>
   {
      return {
         r: Math.floor( c / (256 * 256) ),
         g: Math.floor( c / 256 ) % 256,
         b: c % 256,
      };
   }

   static rgbToNumber = ( r: number, g: number, b: number): number =>
   {
      return r * 65536 + g * 256 + b;
   }

   static hexToRgb = ( hex: string | number ): IRGB =>
   {
      if ( hex === null )
          hex = 0xffffff;

      // Typescript checks that flowing through we can handle either type.
      if ( typeof hex === 'number' )
      {
         return TweenItem.numberToRgb( hex );
      }

      // at this point Typescript thinks hex is a string type

      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      let shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

      // convert string to number so that componentToHex can be called as it originally did.
      let hexS = hex.replace( shorthandRegex,
                              function (_m, r, g, b) : string
                              {
                                 return (r + r + g + g + b + b);
                              });

      let result: Array<string> = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexS);

      return result ? {
          r: parseInt( result[1], 16 ),
          g: parseInt( result[2], 16 ),
          b: parseInt (result[3], 16 )
      } : null;
   }
}

export class Tween
{
   public static instance: Tween;
   private _tweenItemCache: Array<TweenItem>;
   private _tweenObjects: Array<TweenObject>;;
   private _currentId: number;
   private _callbackItemCache: Array<CallbackItem>;

   constructor()
   {
      if ( ! Tween.instance )
      {
         this._tweenItemCache = [ ];

         this._tweenObjects = [];

         this._currentId = 1;

         this._callbackItemCache = [ ];

         Tween.instance = this;
     }

     return Tween.instance;

   };


   private getCallbackItem = ( ): CallbackItem =>
   {
      for ( let i = 0; i < this._callbackItemCache.length; i++ )
      {
         if ( this._callbackItemCache[ i ]._ready )
         {
            return this._callbackItemCache[ i ];
         }
      }

      let cb = new CallbackItem( );
      this._callbackItemCache.push( cb );
      return cb;
   }

   public to = ( obj: any, time: number, params: INameToValueMap, ease?: EaseBase ): void =>
   {
      let tweenObject = this.getTweenObject( obj );

      let onUpdate = null;

      for ( let key in params )
      {
         if ( key === "onComplete" )
         {
            let cb = this.getCallbackItem( );
            cb.set( tweenObject, params[ key ], time );
            tweenObject.tweens[ cb.key ] = cb;

            continue;
         }

         if ( key === "onUpdate" )
         {
            onUpdate = params[ key ];
            continue;
         }

         if ( time )
         {
            let match = params[ key ] == obj[ key ];
            if ( typeof obj[ key ] === "undefined" ) continue;

            if ( match )
            {
               if ( tweenObject.tweens[ key ] ) tweenObject.tweens[ key ].remove( );
            }
            else
            {
               if ( ! tweenObject.tweens[ key ] )
               {
                  tweenObject.tweens[ key ] = this.getTweenItem( );
               }

               tweenObject.tweens[ key ].set( tweenObject, key, obj[ key ], params[ key ], time, ease );
            }
         }
      }

      if ( time )
         tweenObject.onUpdate = onUpdate;
      else
         this.set( obj, params );


   };

   public from = ( obj: any, time: number, params: INameToValueMap, ease: EaseBase ): void =>
   {
      let tweenObject = this.getTweenObject( obj );

      let onUpdate = null;

      for ( let key in params )
      {
         if ( key === "onComplete" )
         {
            let cb = this.getCallbackItem( );
            cb.set( tweenObject, params[ key ], time );
            tweenObject.tweens[ cb.key ] = cb;
            continue;
         }

         if ( key === "onUpdate" )
         {
            onUpdate = params[ key ];
            continue;
         }

         if ( time )
         {
            let match = params[ key ] == obj[ key ];

            if ( typeof obj[ key ] === "undefined" )
               continue;

            if ( match )
            {
               if ( tweenObject.tweens[ key ] ) tweenObject.tweens[ key ].remove( );
            }
            else
            {
               if ( ! tweenObject.tweens[ key ] )
               {
                  tweenObject.tweens[ key ] = this.getTweenItem( );
               }

               tweenObject.tweens[ key ].set( tweenObject, key, params[ key ], obj[ key ], time, ease );
            }
         }
      }

      if ( time )
         tweenObject.onUpdate = onUpdate;
      else
         this.set( obj, params );
   };

   public fromTo = ( obj: any, time: number, paramsFrom:INameToValueMap, paramsTo:INameToValueMap, ease:Ease): void =>
   {
      let tweenObject = this.getTweenObject( obj );

      let onUpdate = null;

      for ( let key in paramsTo )
      {
         if ( key === "onComplete" )
         {
            let cb = this.getCallbackItem( );
            cb.set( tweenObject, paramsTo[ key ], time );
            tweenObject.tweens[ cb.key ] = cb;
            continue;
         }

         if ( key === "onUpdate" )
         {
            onUpdate = paramsFrom[ key ];
            continue;
         }

         if ( time )
         {
            let match = paramsFrom[ key ] == paramsTo[ key ];

            if ( typeof obj[ key ] === "undefined" || typeof paramsFrom[ key ] === "undefined" ) continue

            if ( match )
            {
               if ( tweenObject.tweens[ key ] ) tweenObject.tweens[ key ].remove( );
               obj[ key ] = paramsTo[ key ];
            }
            else
            {
               if ( ! tweenObject.tweens[ key ] )
               {
                  tweenObject.tweens[ key ] = this.getTweenItem( );
               }
               tweenObject.tweens[ key ].set( tweenObject, key, paramsFrom[ key ], paramsTo[ key ], time, ease );
            }
         }
      }

      if ( time )
         tweenObject.onUpdate = onUpdate;
      else
         this.set( obj, paramsTo );
   };

   public set = ( obj: any, params: INameToValueMap ): void  =>
   {
      let tweenObject = this.getTweenObject( obj );
      for ( let key in params )
      {
         if ( typeof obj[ key ] === "undefined" )
         {
            continue;
         }
         if ( tweenObject.tweens[ key ] )
         {
            tweenObject.tweens[ key ].remove( );
         }
         obj[ key ] = params[ key ];
      }
   }

   public _update ( delta: number ): void
   {
      for ( let id in _activeTweenObjects )
      {
         let tweenObject = _activeTweenObjects[ id ];
         for ( let key in tweenObject.tweens )
         {
            tweenObject.tweens[ key ].update( delta );

            if ( tweenObject.onUpdate )
            {
               tweenObject.onUpdate.call( tweenObject.object, delta );
            }
         }
      }

   }
   // Changed getObject to getTweenObject for clarity
   private getTweenObject = ( obj: any ): TweenObject =>
   {
      if ( ! obj._tweenObjectId )
      {
         obj._tweenObjectId = this._currentId;
         this._currentId++;
      }
      let tweenObject:TweenObject = this._tweenObjects[ obj._tweenObjectId ];

      if ( ! tweenObject )
      {
         this._tweenObjects[ obj._tweenObjectId ] = new TweenObject( obj );
         tweenObject = this._tweenObjects[ obj._tweenObjectId ];
      }

      return tweenObject;
   };

   private getTweenItem = ( ): TweenItem =>
   {
      for ( let i = 0; i < this._tweenItemCache.length; i++ )
      {
         if ( this._tweenItemCache[ i ]._ready )
         {
            return this._tweenItemCache[ i ];
         }
      }

      let tweenItem= new TweenItem( );
      this._tweenItemCache.push( tweenItem );
      return tweenItem;
   };
};




// Exported name cannot be same as class name, so export instance as default
export default new Tween();
