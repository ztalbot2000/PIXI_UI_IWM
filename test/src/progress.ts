'use strict';

// Progress can only be tested in legacy mode
const PIXI = PIXIlegacy;
global.PIXI = PIXI;

import  Progress from '../../src/progress';
import  PIXIApp from '../../src/app';

var OriginalProgress = null;
var OriginalPIXIApp = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/progress.js');
      OriginalProgress = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/progress.js!" );
      else
        throw e;
   }
   // To test progress, you also need PIXIApp
   try {
      let a = require( '../originalSrc/app.js');
      OriginalPIXIApp = a.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/app.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old Progress testing");
}

// The driver of what will be tested for the new Progress code
let runs = [
   {Constructor: Progress,
    instance: null,
    appInstance: null,
    Options: {Description: "New Progress", Type: 'N'}
   }
];


// The driver of what will be tested for the old Progress code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalProgress,
       instance: null,
       appInstance: null,
       Options: {Description: "Original Progress", Type: 'O'}
      }
   );
}

let default_primaryColor = 0x5ec7f8;
let default_color1 = 0x282828;
let default_color2 = 0xf6f6f6;

let default_id = null
let default_height = 2
let default_theme = 'dark'
let default_margin = 100
let default_padding = 0
let default_fill = default_color1
let default_fillAlpha = 1
let default_fillActive = default_color1
let default_fillActiveAlpha = 1
let default_stroke = default_color2
let default_strokeWidth = 0
let default_strokeAlpha = 1
let default_strokeActive = default_color2
let default_strokeActiveWidth = 0
let default_strokeActiveAlpha = 1
let default_background = false
let default_backgroundFill = false
let default_backgroundFillAlpha = 1
let default_radius = 4
let default_destroyOnComplete = true
let default_visible = true


before(function()
{
   console.log("   Progress Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
         {
           assert.isNotNull(Progress, "Progress resulted in null");
           assert.isNotNull(PIXIApp, "PIXIApp resulted in null");
         }
         if (run.Options.Type == 'O')
         {
           assert.isNotNull(OriginalProgress, "OriginalProgress resulted in null");
           assert.isNotNull(OriginalPIXIApp, "OriginalPIXIApp resulted in null");
         }
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
         // Create the modal insance
         if (run.Options.Type == 'O')
         {

            // PIXI V5 roundPixels is deprecated. Use PIXI.settings.ROUND_PIXELS
            // For backward compatability set to false. Our new version sets
            // PIXI.settings.ROUND_PIXELS internally.
            // Create the Original PIXIApp instance
            run.appInstance = new ( OriginalPIXIApp ) ({ forceCanvas: true, roundPixels: false } );
            assert.isNotNull(run.appInstance, "App instance resulted in null");

            run.instance = new ( run.Constructor ) ( { app: run.appInstance } );
         }
         else
         {
            // Create the New PIXIApp instance
            run.appInstance = new ( PIXIApp ) ({ forceCanvas: true } );
            assert.isNotNull(run.appInstance, "App instance resulted in null");

            run.instance = new ( run.Constructor ) ({ app: run.appInstance } );
         }

         assert.isNotNull(run.instance, "instance resulted in null");

      });
   });
});

describe("Testing Progress", function ()
{
   describe("Testing Progress variables", function ()
   {
      runs.forEach(function (run)
      {
         // Since id is a random number, you cannot test its value
         it( run.Options.Description + ".opts.id should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.id === NUMBER), "progress.opts.id is not an " + NUMBER + ". result: " + typeof (run.instance).opts.id );
         });

         it( run.Options.Description + ".opts.height should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.height === NUMBER), "progress.opts.height is not an " + NUMBER + ". result: " + typeof (run.instance).opts.height );
         });

         it( run.Options.Description + ".opts.height should be default: " +  default_height, function ()
         {
            let result =  (run.instance).opts.height;
            assert.equal(result, default_height, "progress.opts.height is not: " + default_height + ". result: " + result );
         });

         it( run.Options.Description + ".opts.theme should not be null ", function ()
         {
            assert.isNotNull((run.instance).opts.theme, "progress.opts.theme is null.  result: " + (run.instance).opts.theme );
         });

         it( run.Options.Description + ".opts.margin should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.margin === NUMBER), "progress.opts.margin is not an " + NUMBER + ". result: " + typeof (run.instance).opts.margin );
         });

         it( run.Options.Description + ".opts.margin should equal default: " + default_margin, function ()
         {
            let result =  (run.instance).opts.margin;
            assert.equal(result, default_margin, "progress.opts.margin is not: " + default_margin + ". result: " + result );
         });

         it( run.Options.Description + ".opts.padding should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.padding === NUMBER), "progress.opts.padding is not an " + NUMBER + ". result: " + typeof (run.instance).opts.padding );
         });

         it( run.Options.Description + ".opts.padding should equal default: " + default_padding, function ()
         {
            let result =  (run.instance).opts.padding;
            assert.equal(result, default_padding, "progress.opts.padding is not: " + default_padding + ". result: " + result );
         });

         it( run.Options.Description + ".opts.fill should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fill === NUMBER), "progress.opts.fill is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fill );
         });

         it( run.Options.Description + ".opts.fill should be equal opts.theme.fill", function ()
         {
            let result =  (run.instance).opts.fill;
            assert.equal(result, (run.instance).theme.fill, "progress.opts.fill is not: " + (run.instance).theme.fill + ". result: " + result );
         });

         it( run.Options.Description + ".opts.fillAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillAlpha === NUMBER), "progress.opts.fillAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillAlpha );
         });

         it( run.Options.Description + ".opts.fillAlpha should be equal opts.theme.fillAlpha", function ()
         {
            let result =  (run.instance).opts.fillAlpha;
            assert.equal(result, (run.instance).theme.fillAlpha, "progress.opts.fillAlpha is not: " + (run.instance).theme.fillAlpha + ". result: " + result );
         });


         it( run.Options.Description + ".opts.fillActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillActive === NUMBER), "progress.opts.fillActive is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillActive );
         });

         it( run.Options.Description + ".opts.fillActive should be equal opts.theme.primaryColor", function ()
         {
            let result =  (run.instance).opts.fillActive;
            assert.equal(result, (run.instance).theme.primaryColor, "progress.opts.fillActive is not: " + (run.instance).theme.primaryColor + ". result: " + result );
         });

         it( run.Options.Description + ".opts.fillActiveAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillActiveAlpha === NUMBER), "progress.opts.fillActiveAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillActiveAlpha );
         });

         it( run.Options.Description + ".opts.fillActiveAlpha should be equal opts.theme.fillActiveAlpha", function ()
         {
            let result =  (run.instance).opts.fillActiveAlpha;
            assert.equal(result, (run.instance).theme.fillActiveAlpha, "progress.opts.fillActiveAlpha is not: " + (run.instance).theme.fillActiveAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.stroke should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.stroke === NUMBER), "progress.opts.stroke is not an " + NUMBER + ". result: " + typeof (run.instance).opts.stroke );
         });

         it( run.Options.Description + ".opts.stroke should be equal opts.theme.stroke", function ()
         {
            let result =  (run.instance).opts.stroke;
            assert.equal(result, (run.instance).theme.stroke, "progress.opts.stroke is not: " + (run.instance).theme.stroke + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeWidth === NUMBER), "progress.opts.strokeWidth is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeWidth );
         });

         it( run.Options.Description + ".opts.strokeWidth should be equal default: " + default_strokeWidth, function ()
         {
            let result =  (run.instance).opts.strokeWidth;
            assert.equal(result, default_strokeWidth, "progress.opts.strokeWidth is not: " + default_strokeWidth + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeAlpha === NUMBER), "progress.opts.strokeAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeAlpha );
         });

         it( run.Options.Description + ".opts.strokeAlpha should be equal opts.theme.strokeAlpha", function ()
         {
            let result =  (run.instance).opts.strokeAlpha;
            assert.equal(result, (run.instance).theme.strokeAlpha, "progress.opts.strokeAlpha is not: " + (run.instance).theme.strokeAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActive === NUMBER), "progress.opts.strokeActive is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActive );
         });

         it( run.Options.Description + ".opts.strokeActive should be equal opts.theme.strokeActive", function ()
         {
            let result =  (run.instance).opts.strokeActive;
            assert.equal(result, (run.instance).theme.strokeActive, "progress.opts.strokeActive is not: " + (run.instance).theme.strokeActive + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeActiveWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActiveWidth === NUMBER), "progress.opts.strokeActiveWidth is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActiveWidth );
         });

         it( run.Options.Description + ".opts.strokeActiveWidth should be equal default: " + default_strokeActiveWidth, function ()
         {
            let result =  (run.instance).opts.strokeActiveWidth;
            assert.equal(result, default_strokeActiveWidth, "progress.opts.strokeActiveWidth is not: " + default_strokeActiveWidth + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeActiveAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActiveAlpha === NUMBER), "progress.opts.strokeActiveAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActiveAlpha );
         });

         it( run.Options.Description + ".opts.strokeActiveAlpha should be equal opts.theme.strokeActiveAlpha", function ()
         {
            let result =  (run.instance).opts.strokeActiveAlpha;
            assert.equal(result, (run.instance).theme.strokeActiveAlpha, "progress.opts.strokeActiveAlpha is not: " + (run.instance).theme.strokeActiveAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.background should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.background === BOOLEAN), "progress.opts.background is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.background );
         });

         it( run.Options.Description + ".opts.background should equal default value: " + default_background, function ()
         {
            let result =  (run.instance).opts.background;
            assert.equal(result, default_background, "progress.opts.background is not: " + default_background + ". result: " + result );
         });

         it( run.Options.Description + ".opts.backgroundFill should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.backgroundFill === NUMBER), "progress.opts.background is not an " + NUMBER + ". result: " + typeof (run.instance).opts.background );
         });

         it( run.Options.Description + ".opts.backgroundFill should equal theme.backgroundFill", function ()
         {
            let result =  (run.instance).theme.backgroundFill;
            assert.equal(result, (run.instance).theme.backgroundFill, "progress.opts.backgroundFill is not: " + (run.instance).theme.backgroundFill + ". result: " + result );
         });

         it( run.Options.Description + ".opts.backgroundFillAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.backgroundFillAlpha === NUMBER), "progress.opts.backgroundAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.backgroundAlpha );
         });

         it( run.Options.Description + ".opts.backgroundFillAlpha should equal default value: " + default_backgroundFillAlpha, function ()
         {
            let result =  (run.instance).opts.backgroundFillAlpha;
            assert.equal(result, default_backgroundFillAlpha, "progress.opts.backgroundFillAlpha is not: " + default_backgroundFillAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.radius should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.radius === NUMBER), "progress.opts.radius is not an " + NUMBER + ". result: " + typeof (run.instance).opts.radius );
         });

         it( run.Options.Description + ".opts.radius should be equal opts.theme.radius", function ()
         {
            let result =  (run.instance).opts.radius;
            assert.equal(result, (run.instance).theme.radius, "progress.opts.radius is not: " + (run.instance).theme.radius + ". result: " + result );
         });

         it( run.Options.Description + ".opts.destroyOnComplete should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.destroyOnComplete === BOOLEAN), "progress.opts.destroyOnComplete is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.destroyOnComplete );
         });

         it( run.Options.Description + ".opts.destroyOnComplete should be equal:" + default_destroyOnComplete, function ()
         {
            let result =  (run.instance).opts.destroyOnComplete;
            assert.equal(result, default_destroyOnComplete, "progress.opts.destroyOnComplete is not: " + default_destroyOnComplete + ". result: " + result );
         });

         it( run.Options.Description + ".opts.visible should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.visible === BOOLEAN), "progress.opts.visible is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.visible );
         });

         it( run.Options.Description + ".opts.visible should be equal:" + default_visible, function ()
         {
            let result =  (run.instance).opts.visible;
            assert.equal(result, default_visible, "progress.opts.visible is not: " + default_visible + ". result: " + result );
         });
      });
   });
});

describe("Testing setting some Progress Options during Construction", function ()
{
   runs.forEach(function (run)
   {

/*
      it( run.Options.Description + ".opts.primaryColor should be settable.", function ()
      {
         let newPrimaryColor = 0xfefefe;
         let progress = new (run.Constructor)({"primaryColor": newPrimaryColor});
         let result = progress.opts.primaryColor;
         assert.equal(result, newPrimaryColor, "progress.opts.primaryColor is incorrect. Expected: " + default_primaryColor + ". result: " + result );
      });

      it( run.Options.Description + ".opts.textStyle.fill should be settable.", function ()
      {
         let newTextStyleFill = 0xfefefe;
         let newTextStyle: PIXI.textStyle = {"fill": newTextStyleFill};
         let progress = new (run.Constructor)({"textStyle": newTextStyle});

         let result = progress.opts.textStyle.fill;
         assert.equal(result, newTextStyleFill, "progress.opts.textStyle.fill is incorrect. Expected: " + newTextStyleFill + ". result: " + result );

         assert.equal(progress.opts.textStyle.fontWeight, default_textStyleFontWeight, "progress.opts.textStyle.fontWeight was changed. Expected: " + default_textStyleFontWeight + ". result: " + progress.opts.textStyle.fontWeight );
      });
*/

   });
});
