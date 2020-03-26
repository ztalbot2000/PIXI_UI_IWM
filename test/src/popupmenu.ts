'use strict';

import  PopupMenu from '../../src/popupmenu';
import  Button from '../../src/button';

var OriginalPopupMenu = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/popupmenu.js');
      OriginalPopupMenu = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/popupmenu.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old PopupMenu testing");
}

// The driver of what will be tested for the new PopupMenu code
let runs = [
   {Constructor: PopupMenu,
    instance: null,
    Options: {Description: "New PopupMenu", Type: 'N'}
   }
];


// The driver of what will be tested for the old PopupMenu code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalPopupMenu,
       instance: null,
       Options: {Description: "Original PopupMenu", Type: 'O'}
      }
   );
}


before(function()
{
   console.log("   PopupMenu Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
           assert.isNotNull(PopupMenu, "PopupMenu resulted in null");
         if (run.Options.Type == 'O')
           assert.isNotNull(OriginalPopupMenu, "OriginalPopupMenu resulted in null");
      });

      it( run.Options.Description + " run.Constructor should not be null", function ()
      {
         assert.isNotNull(run.Constructor, "constructor is " + run.Constructor );
      });

   });

   // This should be in an after the above, but not a big deal, so long as
   // it is before the stuff below.
   runs.forEach(function (run)
   {
      it( run.Options.Description + " Creating instance to be used should not be null", function ()
      {
         run.instance = new ( run.Constructor ) ( );
         assert.isNotNull(run.instance, "instance resulted in null");
      });
   });
});

let default_closeOnPopup = true

describe("Testing PopupMenu", function ()
{
   describe("Testing PopupMenu variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.margin should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.margin === NUMBER), "button.opts.margin is not an " + NUMBER + ". result: " + typeof (run.instance).opts.margin );
         });

         it( run.Options.Description + ".opts.margin should equal theme.margin / 2", function ()
         {
            let result =  (run.instance).opts.margin;
            assert.equal(result, (run.instance).theme.margin / 2, ".opts.margin is not: " + ( ( run.instance ).theme.margin / 2 ) + ". result: " + result );
         });

         it( run.Options.Description + ".opts.closeOnPopup should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.closeOnPopup === BOOLEAN), "button.opts.closeOnPopup is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.closeOnPopup );
         });

         it( run.Options.Description + ".opts.closeOnPopup should equal theme.closeOnPopup / 2", function ()
         {
            let result =  (run.instance).opts.closeOnPopup;
            assert.equal(result, default_closeOnPopup, ".opts.closeOnPopup is not: " + ( ( run.instance ).closeOnPopup ) + ". result: " + result );
         });

      });
   });
});

describe("Testing setting some PopupMenu Options during Construction", function ()
{
   runs.forEach(function (run)
   {

   });
});
