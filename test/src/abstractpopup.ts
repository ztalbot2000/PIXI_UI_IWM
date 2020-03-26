'use strict';

import  Theme from '../../src/theme';
import  AbstractPopup from '../../src/abstractpopup';

var OriginalAbstractPopup = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/abstractpopup.js');
      OriginalAbstractPopup = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/abstractpopup.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old AbstractPopup testing");
}

// The driver of what will be tested for the new AbstractPopup code
let runs = [
   {Constructor: AbstractPopup,
    AbstractPopup: null,
    Options: {Description: "New AbstractPopup", Type: 'N'}
   }
];


// The driver of what will be tested for the old AbstractPopup code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalAbstractPopup,
       AbstractPopup: null,
       Options: {Description: "Original AbstractPopup", Type: 'O'}
      }
   );
}

// Defaults within AbstractPopup
let default_x = 0;
let default_y = 0;
let default_padding = 12;
let default_minWidth = 320;
let default_minHeight = 130;
let defaultvisible = true;
let default_textStyleFontWeight = "500"

let default_header = "Hello"
let default_content = "Body of Text"
let default_sy = 5

before(function()
{
   console.log("   AbstractPopup Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
           assert.isNotNull(AbstractPopup, "AbstractPopup resulted in null");
         if (run.Options.Type == 'O')
           assert.isNotNull(OriginalAbstractPopup, "OriginalAbstractPopup resulted in null");
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
         run.AbstractPopup = new ( run.Constructor ) ();
         assert.isNotNull(run.AbstractPopup, "instance resulted in null");
      });
   });
});

describe("Testing AbstractPopup", function ()
{
   describe("Testing AbstractPopup variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.minWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.AbstractPopup).opts.minWidth === NUMBER), "abstractpopup.opts.minWidth is not an " + NUMBER + ". result: " + typeof (run.AbstractPopup).opts.minWidth );
         });

         it( run.Options.Description + ".opts.minWidth should be default: " + default_minWidth, function ()
         {
            let result =  (run.AbstractPopup).opts.minWidth;
            assert.equal(result, default_minWidth, "abstractpopup.opts.minWidth is not: " + default_minWidth + ". result: " + result );
         });

         it( run.Options.Description + ".x should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.AbstractPopup).x === NUMBER), "abstractpopup.x is not an " + NUMBER + ". result: " + typeof (run.AbstractPopup).x );
         });

         it( run.Options.Description + ".x should be default: " + default_x, function ()
         {
            let result =  (run.AbstractPopup).x;
            assert.equal(result, default_x, "theme.x is not: " + default_x + ". result: " + result );
         });

         it( run.Options.Description + ".y should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.AbstractPopup).y === NUMBER), "abstractpopup.y is not an " + NUMBER + ". result: " + typeof (run.AbstractPopup).y );
         });

         it( run.Options.Description + ".y should be default: " + default_y, function ()
         {
            let result =  (run.AbstractPopup).y;
            assert.equal(result, default_y, "abstractpopup.y is not: " + default_y + ". result: " + result );
         });


      });
   });
});


describe("Testing setting some AbstractPopup Options during Construction", function ()
{
/*
   runs.forEach(function (run)
   {
      it( run.Options.Description + ".opts.header should be settable.", function ()
      {
         let abstractpopup = new (run.Constructor)({"header": default_header, "content": default_content});
//         abstractpopup.setup().layout();

         let result = abstractpopup.header.text;
         assert.equal(result, default_header, "abstractpopup.header is incorrect. Expected: " + default_x + ". result: " + result );
      });

   });
*/
});
