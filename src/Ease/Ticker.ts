import * as PIXI from 'pixi.js'

import  Tween  from './Tween';

export class Ticker extends PIXI.utils.EventEmitter
{
   private _disabled: boolean;
   private _now: number;
   private DeltaTime: number;
   private Time: number;
   private Ms: number;

   static shared: Ticker;

   constructor (autoStart?: boolean)
   {
      super();

      this._disabled = true;

      this._now = 0;

      this.DeltaTime = 0;
      this.Time = performance.now();
      this.Ms = 0;

      if (autoStart)
      {
         this.disabled = false;
      }

      Ticker.shared = this;
   }
   //
   // Updates the text
   //
   // @private
   //
   private update (time :number)
   {
       Ticker.shared._now = time;
       Ticker.shared.Ms = Ticker.shared._now - Ticker.shared.Time;
       Ticker.shared.Time = Ticker.shared._now;
       Ticker.shared.DeltaTime = Ticker.shared.Ms * 0.001;
       Ticker.shared.emit("update", Ticker.shared.DeltaTime);
       Tween._update(Ticker.shared.DeltaTime);

       if (!Ticker.shared._disabled)
       {
          requestAnimationFrame(Ticker.shared.update);
       }
   }

   public on (event: string | symbol, fn: Function, context?: any): this
   {
      super.on(event, fn, context);

      return this;
   }

   public once (event: string | symbol, fn: Function, context?: any): this
   {
      super.once(event, fn, context);

      return this;
   }

   public removeListener (event: string |  symbol, fn?: Function, context?: any): this
   {
      super.removeListener(event, fn, context);

      return this;
   };

   get shared (): Ticker
   {
     return Ticker.shared;
   }

   get disabled (): boolean
   {
      return this._disabled;
   }
   set disabled (val: boolean)
   {
      val=val;
      if (!this._disabled)
      {
         this._disabled = true;
      }
      else
      {
         this._disabled = false;
         Ticker.shared = this;
         this.update(performance.now());
      }
   }
}

Ticker.shared = new Ticker(true);
export default Ticker.shared;
