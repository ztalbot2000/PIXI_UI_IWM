import { EaseBase } from './EaseBase';
import { ExponentialEase } from './ExponentialEase';

// Map the various Ease functions to their exact names
// See: https://www.typescriptlang.org/docs/handbook/advanced-types.html
export interface EaseMap
{
   easeIn: EaseBase;
   easeOut: EaseBase;
   easeInOut: EaseBase;
}

export interface EaseNoneMap
{
   easeNone: EaseBase;
}

export interface EaseBounceMap
{
   BounceIn: EaseBase;
   BounceOut: EaseBase;
   BounceInOut: EaseBase;
}

export interface EaseCircMap
{
   CircIn: EaseBase;
   CircOut: EaseBase;
   CircInOut: EaseBase;
}

export interface EaseExpoMap
{
   ExpoIn: EaseBase;
   ExpoOut: EaseBase;
   ExpoInOut: EaseBase;
}

export interface EaseSineMap
{
   SineIn: EaseBase;
   SineOut: EaseBase;
   SineInOut: EaseBase;
}

let HALF_PI = Math.PI * 0.5;

export class Ease
{
   public Linear: EaseBase;
   public Power0: EaseNoneMap;
   public Power1: EaseMap;
   public Power2: EaseMap;
   public Power3: EaseMap;
   public Power4: EaseMap;
   public Quad:   EaseMap;
   public Cubic:  EaseMap;
   public Quart:  EaseMap;
   public Quint:  EaseMap;
   public Bounce: EaseBounceMap;
   public Circ:   EaseCircMap;
   public Expo:   EaseExpoMap;
   public Sine:   EaseSineMap;

   private create = ( fn: ( p: number  ) => number  ): EaseBase =>
   {
      let e =  new EaseBase( );
      e.getPosition = fn;
      return e;
   }

   private wrapEase = ( easeInFunction: ExponentialEase, easeOutFunction: ExponentialEase, easeInOutFunction: ExponentialEase  ): EaseMap =>
   {
      return {
         easeIn: easeInFunction,
         easeOut: easeOutFunction,
         easeInOut: easeInOutFunction
      };
   }

   constructor( )
   {
      this.Linear = new EaseBase( );

      this.Power0 =
      {
         easeNone: new EaseBase( ),
      };

      this.Power1 = this.Quad = this.wrapEase(
         new ExponentialEase( 1, 1, 0 ),
         new ExponentialEase( 1, 0, 1 ),
         new ExponentialEase( 1, 1, 1 ) );

      this.Power2 = this.Cubic = this.wrapEase(
          new ExponentialEase( 2, 1, 0 ),
          new ExponentialEase( 2, 0, 1 ),
          new ExponentialEase( 2, 1, 1 ) );

      this.Power3 = this.Quart = this.wrapEase(
          new ExponentialEase( 3, 1, 0 ),
          new ExponentialEase( 3, 0, 1 ),
          new ExponentialEase( 3, 1, 1 ) );

      this.Power4 = this.Quint = this.wrapEase(
          new ExponentialEase( 4, 1, 0 ),
          new ExponentialEase( 4, 0, 1 ),
          new ExponentialEase( 4, 1, 1 ) );

      // Bounce
      this.Bounce =
      {
         BounceIn: this.create( function ( p: number ): number
         {
            if ( ( p = 1 - p ) < 1 / 2.75 )
            {
                return 1 - ( 7.5625 * p * p );
            }
            else if ( p < 2 / 2.75 )
            {
                return 1 - ( 7.5625 * ( p -= 1.5 / 2.75 ) * p + 0.75 );
            }
            else if ( p < 2.5 / 2.75 )
            {
                return 1 - ( 7.5625 * ( p -= 2.25 / 2.75 ) * p + 0.9375 );
            }
            return 1 - ( 7.5625 * ( p -= 2.625 / 2.75 ) * p + 0.984375 );
         } ),
         BounceOut: this.create( function ( p: number ): number {
            if ( p < 1 / 2.75 ) {
                return 7.5625 * p * p;
            }
            else if ( p < 2 / 2.75 )
            {
                return 7.5625 * ( p -= 1.5 / 2.75 ) * p + 0.75;
            }
            else if ( p < 2.5 / 2.75 )
            {
                return 7.5625 * ( p -= 2.25 / 2.75 ) * p + 0.9375;
            }
            return 7.5625 * ( p -= 2.625 / 2.75 ) * p + 0.984375;
         } ),
         BounceInOut: this.create( function ( p: number ): number
         {
            var invert = ( p < 0.5 );
            if ( invert )
            {
                p = 1 - ( p * 2 );
            } else {
                p = ( p * 2 ) - 1;
            }
            if ( p < 1 / 2.75 )
            {
                p = 7.5625 * p * p;
            } else if ( p < 2 / 2.75 ) {
                p = 7.5625 * ( p -= 1.5 / 2.75 ) * p + 0.75;
            } else if ( p < 2.5 / 2.75 ) {
                p = 7.5625 * ( p -= 2.25 / 2.75 ) * p + 0.9375;
            } else {
                p = 7.5625 * ( p -= 2.625 / 2.75 ) * p + 0.984375;
            }
            return invert ? ( 1 - p ) * 0.5 : p * 0.5 + 0.5;
         } )
      };

      // Circ
      this.Circ =
      {
         CircIn: this.create( function ( p: number ): number
         {
             return -( Math.sqrt( 1 - ( p * p ) ) - 1 );
         } ),
         CircOut: this.create( function ( p: number ): number
         {
             return Math.sqrt( 1 - ( p = p - 1 ) * p );
         } ),
         CircInOut: this.create( function ( p: number ): number
         {
             return ( ( p *= 2 ) < 1 ) ? -0.5 * ( Math.sqrt( 1 - p * p ) - 1 ) : 0.5 * ( Math.sqrt( 1 - ( p -= 2 ) * p ) + 1 );
         } )
      };

      // Expo
      this.Expo =
      {
         ExpoIn: this.create( function ( p: number ): number
         {
            return Math.pow( 2, 10 * ( p - 1 ) ) - 0.001;
         } ),
         ExpoOut: this.create( function ( p: number ): number
         {
            return 1 - Math.pow( 2, -10 * p );
         } ),
         ExpoInOut: this.create( function ( p: number ): number
         {
            return ( ( p *= 2 ) < 1 ) ? 0.5 * Math.pow( 2, 10 * ( p - 1 ) ) : 0.5 * ( 2 - Math.pow( 2, -10 * ( p - 1 ) ) );
         } )
      };

      // Sine
      this.Sine =
      {
         SineIn: this.create( function ( p: number ): number
         {
            return -Math.cos( p * HALF_PI ) + 1;
         } ),
         SineOut: this.create( function ( p: number ): number
         {
            return Math.sin( p * HALF_PI );
         } ),
         SineInOut: this.create( function ( p: number ): number
         {
            return -0.5 * ( Math.cos( Math.PI * p ) - 1 );
         } )
      };
   }
};

// Exported name cannot be same as class name, so export instance as default
let ease = new Ease();
export default ease;
