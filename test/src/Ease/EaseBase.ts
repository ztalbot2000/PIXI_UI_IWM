'use strict';

import { EaseBase } from '../../../src/Ease/EaseBase';

let easeBase = new EaseBase();

let runs = [{
   EaseBase: easeBase,
   Options: { Description: "New EaseBase", Type: 'N' }
}];

describe( "Testing EaseBase", function ()
{
   runs.forEach(function (run)
   {
     it( run.Options.Description + " class should not be null", function ()
     {
       if (run.Options.Type == 'N')
          assert.isNotNull(EaseBase, "EaseBase resulted is null");
     });

     it( run.Options.Description + " should not be null", function ()
     {
       assert.isNotNull(run.EaseBase, "easeBase resulted is null");
     });

     it( run.Options.Description + ".getPosition should be a " + FUNCTION, function ()
     {
       assert.isFunction((run.EaseBase).getPosition, "easeBase.getPosition: expected " + FUNCTION + " received = " + typeof (run.EaseBase).getPosition);
     });

     it( run.Options.Description + ".getPosition(15) should return 15", function ()
     {
       let num = 15;

       let expectedResult = num;
       let result = (run.EaseBase).getPosition( num );

       assert.equal(result, expectedResult, "easeBase.getPosition(" + num +"): expected " + expectedResult + " received = " + result );
     });
   });
});

