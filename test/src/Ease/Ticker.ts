
import { Ticker } from '../../../src/Ease/Ticker';
import sharedTicker from '../../../src/Ease/Ticker';

let runs = [{
   Ticker: sharedTicker,
   Options: { Description: "New Shared Ticker", Type: 'N' }
}];

describe( "Testing Ticker", function ()
{
   runs.forEach(function (run)
   {
      it( run.Options.Description + " should be available", function ()
      {
         if (run.Options.Type == 'O')
            expect((run.Ticker)).to.be.a(FUNCTION);

      });

      it( run.Options.Description + ".on. should only be updated once", function ()
      {
         var callback = sinon.spy();
         run.Ticker.on("update", callback, this);

         run.Ticker.shared.update(performance.now());

         assert.isTrue(callback.calledOnce, run.Options.Description + " should only be updated once. Expected: 1 to equal:" + callback.callCount);
      });

      it( run.Options.Description + ".on. should only be updated twice", function ()
      {
         var callback = sinon.spy();
         run.Ticker.on("update", callback, this);

         run.Ticker.shared.update(performance.now());
         run.Ticker.shared.update(performance.now());

         assert.isTrue(callback.calledTwice, run.Options.Description + " should be updated twice. Expected: 2 to equal:" + callback.callCount);
      });

      it( run.Options.Description + ".once. should only be updated once", function ()
      {
         var callback = sinon.spy();
         run.Ticker.once("update", callback, this);

         run.Ticker.shared.update(performance.now());

         assert.isTrue(callback.calledOnce, run.Options.Description + ".once failed. Expected: 1 to equal:" + callback.callCount);
      });

      it( run.Options.Description + ".once, updated twice should be once", function ()
      {
         var callback = sinon.spy();
         (run.Ticker).once("update", callback, this);

         //Call it twice, callcount should still be one !
         (run.Ticker).shared.update(performance.now());
         (run.Ticker).shared.update(performance.now());

         assert.isTrue(callback.calledOnce, run.Options.Description + ".once failed. Expected: 1 to equal:" + callback.callCount);
      });

      it( run.Options.Description + ".disabled, Should keep Ticker disabled", function ()
      {
         var callback = sinon.spy();
         (run.Ticker).disabled = true;
         (run.Ticker).on("update", callback, this);

         // Call it twice, callcount increases, but ticker stays disabled
         // Meaning no animation frame will be done.
         (run.Ticker).shared.update(performance.now());
         (run.Ticker).shared.update(performance.now());

         assert.isTrue(callback.calledTwice, run.Options.Description + " should be updated twice. Expected: 2 to equal:" + callback.callCount);

         assert.isTrue((run.Ticker).disabled, run.Options.Description + ".disabled failed. Expected: true to equal:" + (run.Ticker).disabled);
      });
   });
});
