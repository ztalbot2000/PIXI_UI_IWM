'use strict';

import  { ExponentialEase } from '../../../src/Ease/ExponentialEase';

let power = 2;
let easeIn = 3;
let easeOut = 1;
let num = 8;
let expectedResult = 1373;

let exponentialEase = new ExponentialEase( power, easeIn, easeOut );

let runs = [{
   ExponentialEase: exponentialEase,
   Options: { Description: "New ExponentialEase", Type: 'N' }
}];

describe( "Testing ExponentialEase", function ()
{
   runs.forEach(function (run)
   {
      it( run.Options.Description + " class should not be null", function ()
      {
         if (run.Options.Type == 'N')
            assert.isNotNull(ExponentialEase, "ExponentialEase resulted is null");
      });

      it( run.Options.Description + " should not be null", function ()
      {
         assert.isNotNull(run.ExponentalEase, "exponentalEase resulted is null");
      });

      it( run.Options.Description + ".getPosition should be a " + FUNCTION, function ()
      {
         assert.isFunction((run.ExponentialEase).getPosition, "exponentialEase.getPosition: expected " + FUNCTION + " received = " + typeof (run.ExponentialEase).getPosition);
      });

      it( run.Options.Description + ".getPosition(" + num + ") should return " + expectedResult, function ()
      {
         let result = (run.ExponentialEase).getPosition(num);

         assert.equal(result, expectedResult, "exponentialEase.getPosition(" + num +"): expected " + expectedResult + " received = " + result );
      });
   });
});

