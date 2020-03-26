import { EaseBase } from './EaseBase';

export class ExponentialEase extends EaseBase
{
   private pow: number;
   private t : number;

   constructor ( power: number, easeIn: number, easeOut: number )
   {
     super( );

     this.pow = power;
     this.t = easeIn && easeOut ? 3 : easeOut ? 1 : 2;
   }

   public getPosition = ( p: number ): number =>
   {
      let r = ( this.t === 1 ) ? 1 - p : ( this.t === 2 ) ? p : ( p < 0.5 ) ? p * 2 : ( 1 - p ) * 2;
      if ( this.pow === 1 )
      {
         r *= r;
      }
      else if ( this.pow === 2 )
      {
         r *= r * r;
      }
      else if ( this.pow === 3 )
      {
         r *= r * r * r;
      }
      else if ( this.pow === 4 )
      {
         r *= r * r * r * r;
      }

      return ( this.t === 1 ) ? 1 - r : ( this.t === 2 ) ? r : ( p < 0.5 ) ? r / 2 : 1 - ( r / 2 );
   };
}
