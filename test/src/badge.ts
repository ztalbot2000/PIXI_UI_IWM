'use strict';

import  Badge from '../../src/badge';

var OriginalBadge = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/badge.js');
      OriginalBadge = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/badge.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old Badge testing");
}

// The driver of what will be tested for the new Badge code
let runs = [
   {Constructor: Badge,
    instance: null,
    Options: {Description: "New Badge", Type: 'N'}
   }
];


// The driver of what will be tested for the old Badge code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalBadge,
       instance: null,
       Options: {Description: "Original Badge", Type: 'O'}
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

before(function()
{
   console.log("   Badge Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
           assert.isNotNull(Badge, "Badge resulted in null");
         if (run.Options.Type == 'O')
           assert.isNotNull(OriginalBadge, "OriginalBadge resulted in null");
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
         run.instance = new ( run.Constructor ) ( { content: "Wahoo!" }  );
         assert.isNotNull(run.instance, "instance resulted in null");
      });
   });
});


describe("Testing Badge", function ()
{
   describe("Testing Badge variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.minWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.minWidth === NUMBER), "badge.opts.minWidth is not an " + NUMBER + ". result: " + typeof (run.instance).opts.minWidth );
         });
         it( run.Options.Description + ".opts.minWidth should be default: " + default_minWidth , function ()
         {
            let result =  (run.instance).opts.minWidth;
            assert.equal(result, default_minWidth, "badge.opts.minWidth is not: " + default_minWidth + ". result: " + result );
         });

         it( run.Options.Description + ".opts.minHeight should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.minHeight === NUMBER), "badge.opts.minHeight is not an " + NUMBER + ". result: " + typeof (run.instance).opts.minHeight );
         });

         it( run.Options.Description + ".opts.minHeight should be default: " + default_minHeight , function ()
         {
            let result =  (run.instance).opts.minHeight;
            assert.equal(result, default_minHeight, "badge.opts.minHeight is not: " + default_minHeight + ". result: " + result );
         });

         it( run.Options.Description + ".opts.padding should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.padding === NUMBER), "badge.opts.padding is not an " + NUMBER + ". result: " + typeof (run.instance).opts.padding );
         });

         it( run.Options.Description + ".padding should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.padding === NUMBER), "badge.opts.padding is not an " + NUMBER + ". result: " + typeof (run.instance).opts.padding );
         });

         it( run.Options.Description + ".padding should be equal theme.padding/2", function ()
         {
            let result =  (run.instance).opts.padding;
            assert.equal(result, (run.instance).theme.padding/2, "progress.opts.padding is not: " + ((run.instance).theme.padding/2) + ". result: " + result );
         });
      });
   });
});

describe("Testing setting some Badge Options during Construction", function ()
{
   runs.forEach(function (run)
   {
/*
      it( run.Options.Description + ".opts.margin should be settable.", function ()
      {
         let newMargin = 20;
         let badge = new (run.Constructor)({"margin": newMargin});
         let result = badge.opts.margin;
         assert.equal(result, newMargin, "badge.opts.margin is incorrect. Expected: " + default_margin + ". result: " + result );
      });
*/

   });
});
