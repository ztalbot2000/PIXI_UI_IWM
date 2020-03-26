'use strict';

// PIXIApp can only be tested in legacy mode
const PIXI = PIXIlegacy;
global.PIXI = PIXI;

import  PIXIApp from '../../src/app';

var OriginalPIXIApp = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/app.js');
      OriginalPIXIApp = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/app.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old PIXIApp testing");
}

// The driver of what will be tested for the new PIXIApp code
let runs = [
   {Constructor: PIXIApp,
    instance: null,
    Options: {Description: "New PIXIApp", Type: 'N'}
   }
];


// The driver of what will be tested for the old PIXIApp code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalPIXIApp,
       instance: null,
       Options: {Description: "Original PIXIApp", Type: 'O'}
      }
   );
}

let default_color1 = 0x282828;

let default_width = 1024
let default_height = 768
let default_backgroundColor = default_color1
let default_theme = 'dark'
let default_autoResize = true
let default_fpsLogging = false
// Must set to true for DOM testing
let default_monkeyPatchMapping = false


before(function()
{
   console.log("   PIXIApp Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
           assert.isNotNull(PIXIApp, "PIXIApp resulted in null");
         if (run.Options.Type == 'O')
           assert.isNotNull(OriginalPIXIApp, "OriginalPIXIApp resulted in null");
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
         // PIXI V5 roundPixels is deprecated. Use PIXI.settings.ROUND_PIXELS
         // For backward compatability set to false. Our new version sets
         // PIXI.settings.ROUND_PIXELS internally.
         if (run.Options.Type == 'O')
            run.instance = new ( run.Constructor ) ({ forceCanvas: true, roundPixels: false } );
         else
            run.instance = new ( run.Constructor ) ({ forceCanvas: true } );

         assert.isNotNull(run.instance, "instance resulted in null");
      });
   });
});

describe("Testing PIXIApp", function ()
{
   describe("Testing PIXIApp variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".width should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).width === NUMBER), "app.width is not an " + NUMBER + ". result: " + typeof (run.instance).width );
         });

         it( run.Options.Description + ".width should be default: " +  default_width, function ()
         {
            let result =  (run.instance).width;
            assert.equal(result, default_width, "app.width is not: " + default_width + ". result: " + result );
         });
         it( run.Options.Description + ".height should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).height === NUMBER), "app.height is not an " + NUMBER + ". result: " + typeof (run.instance).height );
         });

         it( run.Options.Description + ".height should be default: " +  default_height, function ()
         {
            let result =  (run.instance).height;
            assert.equal(result, default_height, "app.height is not: " + default_height + ". result: " + result );
         });

         it( run.Options.Description + ".theme should not be null ", function ()
         {
            assert.isNotNull((run.instance).theme, "app.theme is null.  result: " + (run.instance).theme );
         });

         it( run.Options.Description + ".fpsLogging should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).fpsLogging === BOOLEAN), "app.fpsLogging is not an " + BOOLEAN + ". result: " + typeof (run.instance).fpsLogging );
         });

         it( run.Options.Description + ".fpsLogging should equal default value: " + default_fpsLogging, function ()
         {
            let result =  (run.instance).fpsLogging;
            assert.equal(result, default_fpsLogging, "app.fpsLogging is not: " + default_fpsLogging + ". result: " + result );
         });


      });
   });
});

/*
describe("Testing setting some PIXIApp Options during Construction", function ()
{
   runs.forEach(function (run)
   {

      it( run.Options.Description + ".opts.primaryColor should be settable.", function ()
      {
         let newPrimaryColor = 0xfefefe;
         let app = new (run.Constructor)({"primaryColor": newPrimaryColor});
         let result = app.opts.primaryColor;
         assert.equal(result, newPrimaryColor, "app.opts.primaryColor is incorrect. Expected: " + default_primaryColor + ". result: " + result );
      });

      it( run.Options.Description + ".opts.textStyle.fill should be settable.", function ()
      {
         let newTextStyleFill = 0xfefefe;
         let newTextStyle: PIXI.textStyle = {"fill": newTextStyleFill};
         let app = new (run.Constructor)({"textStyle": newTextStyle});

         let result = app.opts.textStyle.fill;
         assert.equal(result, newTextStyleFill, "app.opts.textStyle.fill is incorrect. Expected: " + newTextStyleFill + ". result: " + result );

         assert.equal(app.opts.textStyle.fontWeight, default_textStyleFontWeight, "app.opts.textStyle.fontWeight was changed. Expected: " + default_textStyleFontWeight + ". result: " + app.opts.textStyle.fontWeight );
      });

   });
});
*/
