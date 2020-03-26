'use strict';

import  Popup from '../../src/popup';
import  Button from '../../src/button';

var OriginalPopup = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/popup.js');
      OriginalPopup = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/popup.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old Popup testing");
}

// The driver of what will be tested for the new Popup code
let runs = [
   {Constructor: Popup,
    instance: null,
    Options: {Description: "New Popup", Type: 'N'}
   }
];


// The driver of what will be tested for the old Popup code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalPopup,
       instance: null,
       Options: {Description: "Original Popup", Type: 'O'}
      }
   );
}

let default_closeOnPopup = false;
let default_closeButton = false;

before(function()
{
   console.log("   Popup Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
           assert.isNotNull(Popup, "Popup resulted in null");
         if (run.Options.Type == 'O')
           assert.isNotNull(OriginalPopup, "OriginalPopup resulted in null");
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


describe("Testing Popup", function ()
{
   describe("Testing Popup variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.closeOnPopup should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.closeOnPopup === BOOLEAN), "popup.opts.closeOnPopup is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.closeOnPopup );
         });

         it( run.Options.Description + ".opts.closeOnPopup should be default: " + default_closeOnPopup , function ()
         {
            let result =  (run.instance).opts.closeOnPopup;
            assert.equal(result, default_closeOnPopup, "popup.opts.closeOnPopup is not: " + default_closeOnPopup + ". result: " + result );
         });

         it( run.Options.Description + ".opts.closeButton should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.closeButton === BOOLEAN), "popup.opts.closeButton is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.closeButton );
         });

         it( run.Options.Description + ".opts.closeButton should be default: " + default_closeButton , function ()
         {
            let result =  (run.instance).opts.closeButton;
            assert.equal(result, default_closeButton, "popup.opts.closeButton is not: " + default_closeButton + ". result: " + result );
         });

      });
   });
});

describe("Testing setting some Popup Options during Construction", function ()
{
   runs.forEach(function (run)
   {
      it( run.Options.Description + " with closeButton= true should create an instance of Button" , function ()
      {
         let popup = new (run.Constructor)( { closeButton:true } )

         assert.isNotNull(popup, "popup created should not be null result: " + popup);

         assert.isNotNull(popup._closeButton, "popup._closeButton created should not be null result: " + popup._closeButton);
      });

      it( run.Options.Description + " with header= 'hello' should create an instance of Button" , function ()
      {
         let popup = new (run.Constructor)( { header:"Hello" } )

         assert.isNotNull(popup, "popup created should not be null result: " + popup);

         assert.isNotNull(popup._header, "popup._header created should not be null result: " + popup._header);
      });

/*
      it( run.Options.Description + ".opts.buttongroup should be an " + NUMBER, function ()
      {
         assert.isTrue((typeof (run.instance).opts.buttongroup === NUMBER), "popup.opts.buttongroup is not an " + NUMBER + ". result: " + typeof (run.instance).opts.buttongroup );
      });

      it( run.Options.Description + ".opts.margin should be settable.", function ()
      {
         let newMargin = 20;
         let popup = new (run.Constructor)({"margin": newMargin});
         let result = popup.opts.margin;
         assert.equal(result, newMargin, "popup.opts.margin is incorrect. Expected: " + default_margin + ". result: " + result );
      });
*/

   });
});
