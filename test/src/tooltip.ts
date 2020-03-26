'use strict';

import  Tooltip from '../../src/tooltip';

var OriginalTooltip = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/tooltip.js');
      OriginalTooltip = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/tooltip.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old Tooltip testing");
}

// The driver of what will be tested for the new Tooltip code
let runs = [
   {Constructor: Tooltip,
    instance: null,
    Options: {Description: "New Tooltip", Type: 'N'}
   }
];


// The driver of what will be tested for the old Tooltip code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalTooltip,
       instance: null,
       Options: {Description: "Original Tooltip", Type: 'O'}
      }
   );
}

let default_theme = 'dark'
let default_minWidth = 0
let default_minHeight = 0
let default_object = null
let default_container = null
let default_offsetLeft = 8
let default_offsetTop = -8
let default_delay = 0
let default_content = null
let default_object = new PIXI.Container();

before(function()
{
   console.log("   Tooltip Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
           assert.isNotNull(Tooltip, "Tooltip resulted in null");
         if (run.Options.Type == 'O')
           assert.isNotNull(OriginalTooltip, "OriginalTooltip resulted in null");
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
         run.instance = new ( run.Constructor ) ( { object: default_object }  );
         assert.isNotNull(run.instance, "instance resulted in null");
      });
   });
});


describe("Testing Tooltip", function ()
{
   describe("Testing Tooltip variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.minWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.minWidth === NUMBER), "tooltip.opts.minWidth is not an " + NUMBER + ". result: " + typeof (run.instance).opts.minWidth );
         });

         it( run.Options.Description + ".opts.minWidth should be default: " + default_minWidth , function ()
         {
            let result =  (run.instance).opts.minWidth;
            assert.equal(result, default_minWidth, "tooltip.opts.minWidth is not: " + default_minWidth + ". result: " + result );
         });

         it( run.Options.Description + ".opts.minHeight should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.minHeight === NUMBER), "tooltip.opts.minHeight is not an " + NUMBER + ". result: " + typeof (run.instance).opts.minHeight );
         });

         it( run.Options.Description + ".opts.minHeight should be default: " + default_minHeight , function ()
         {
            let result =  (run.instance).opts.minHeight;
            assert.equal(result, default_minHeight, "tooltip.opts.minHeight is not: " + default_minHeight + ". result: " + result );
         });

         it( run.Options.Description + ".opts.padding should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.padding === NUMBER), "tooltip.opts.padding is not an " + NUMBER + ". result: " + typeof (run.instance).opts.padding );
         });

         it( run.Options.Description + ".opts.offsetLeft should be default: " + default_offsetLeft , function ()
         {
            let result =  (run.instance).opts.offsetLeft;
            assert.equal(result, default_offsetLeft, "tooltip.opts.offsetLeft is not: " + default_offsetLeft + ". result: " + result );
         });

         it( run.Options.Description + ".opts.offsetLeft should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.offsetLeft === NUMBER), "tooltip.opts.offsetLeft is not an " + NUMBER + ". result: " + typeof (run.instance).opts.offsetLeft );
         });

         it( run.Options.Description + ".opts.offsetLeft should be default: " + default_offsetLeft , function ()
         {
            let result =  (run.instance).opts.offsetLeft;
            assert.equal(result, default_offsetLeft, "tooltip.opts.offsetLeft is not: " + default_offsetLeft + ". result: " + result );
         });


         it( run.Options.Description + ".opts.offsetTop should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.offsetTop === NUMBER), "tooltip.opts.offsetTop is not an " + NUMBER + ". result: " + typeof (run.instance).opts.offsetTop );
         });

         it( run.Options.Description + ".opts.offsetTop should be default: " + default_offsetTop , function ()
         {
            let result =  (run.instance).opts.offsetTop;
            assert.equal(result, default_offsetTop, "tooltip.opts.offsetTop is not: " + default_offsetTop + ". result: " + result );
         });

         it( run.Options.Description + ".opts.delay should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.delay === NUMBER), "tooltip.opts.delay is not an " + NUMBER + ". result: " + typeof (run.instance).opts.delay );
         });

         it( run.Options.Description + ".opts.delay should be default: " + default_delay , function ()
         {
            let result =  (run.instance).opts.delay;
            assert.equal(result, default_delay, "tooltip.opts.delay is not: " + default_delay + ". result: " + result );
         });

      });
   });
});

describe("Testing setting some Tooltip Options during Construction", function ()
{
   runs.forEach(function (run)
   {
/*
      it( run.Options.Description + ".opts.margin should be settable.", function ()
      {
         let newMargin = 20;
         let tooltip = new (run.Constructor)({"margin": newMargin});
         let result = tooltip.opts.margin;
         assert.equal(result, newMargin, "tooltip.opts.margin is incorrect. Expected: " + default_margin + ". result: " + result );
      });
*/

   });
});
