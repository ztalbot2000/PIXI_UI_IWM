'use strict';

// List can only be tested in legacy mode
const PIXI = PIXIlegacy;
global.PIXI = PIXI;

import  List from '../../src/list';
import  PIXIApp from '../../src/app';

var OriginalList = null;
var OriginalPIXIApp = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/list.js');
      OriginalList = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/list.js!" );
      else
        throw e;
   }
   // To test list, you also need PIXIApp
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
  console.log("COMPARE is undefined. Not doing old List testing");
}

// The driver of what will be tested for the new List code
let runs = [
   {Constructor: List,
    instance: null,
    appInstance: null,
    Options: {Description: "New List", Type: 'N'}
   }
];


// The driver of what will be tested for the old List code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalList,
       instance: null,
       appInstance: null,
       Options: {Description: "Original List", Type: 'O'}
      }
   );
}

let default_color1 = 0x282828;

let default_padding = 10
let default_margin = 10
let default_orientation = 'vertical'
let default_align = 'right'
let default_verticalAlign = 'right'
let default_width = null
let default_height = null
let default_app = null

before(function()
{
   console.log("   List Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
         {
           assert.isNotNull(List, "List resulted in null");
           assert.isNotNull(PIXIApp, "PIXIApp resulted in null");
         }
         if (run.Options.Type == 'O')
         {
           assert.isNotNull(OriginalList, "OriginalList resulted in null");
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
         // Create the list insance
         if (run.Options.Type == 'O')
         {

            // PIXI V5 roundPixels is deprecated. Use PIXI.settings.ROUND_PIXELS
            // For backward compatability set to false. Our new version sets
            // PIXI.settings.ROUND_PIXELS internally.
            // Create the Original PIXIApp instance
            run.appInstance = new ( OriginalPIXIApp ) ({ forceCanvas: true, roundPixels: false } );
            assert.isNotNull(run.appInstance, "App instance resulted in null");

            //run.instance = new ( run.Constructor ) ( { app: run.appInstance } );
            run.instance = new ( run.Constructor ) ( [] );
         }
         else
         {
            // Create the New PIXIApp instance
            run.appInstance = new ( PIXIApp ) ({ forceCanvas: true } );
            assert.isNotNull(run.appInstance, "App instance resulted in null");

            //run.instance = new ( run.Constructor ) ( [], { app: run.appInstance } );
            run.instance = new ( run.Constructor ) ( [] );
         }

         assert.isNotNull(run.instance, "instance resulted in null");
      });
   });
});

describe("Testing List", function ()
{
   describe("Testing List variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.padding should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.padding === NUMBER), "progress.opts.padding is not an " + NUMBER + ". result: " + typeof (run.instance).opts.padding );
         });

/*

         it( run.Options.Description + ".opts.padding should equal default: " + default_padding, function ()
         {
            let result =  (run.instance).opts.padding;
            assert.equal(result, default_padding, "progress.opts.padding is not: " + default_padding + ". result: " + result );
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

         it( run.Options.Description + ".opts.orientation should be an " + STRING, function ()
         {
            assert.isTrue(( typeof (run.instance).opts.orientation === STRING), "buttongroup.opts.orientation is not an " + STRING + ". result: " + typeof (run.instance).opts.orientation );
         });

         it( run.Options.Description + ".opts.orientation should be equal:" + default_orientation, function ()
         {
            let result =  (run.instance).opts.orientation;
            assert.equal(result, default_orientation, "buttongroup.opts.orientation is not: " + default_orientation + ". result: " + result );
         });

         it( run.Options.Description + ".opts.align should be an " + STRING, function ()
         {
            assert.isTrue(( typeof (run.instance).opts.align === STRING), "buttongroup.opts.align is not an " + STRING + ". result: " + typeof (run.instance).opts.align );
         });

         it( run.Options.Description + ".opts.align should be equal:" + default_align, function ()
         {
            let result =  (run.instance).opts.align;
            assert.equal(result, default_align, "buttongroup.opts.align is not: " + default_align + ". result: " + result );
         });

         it( run.Options.Description + ".opts.verticalAlign should be an " + STRING, function ()
         {
            assert.isTrue((typeof (run.instance).opts.verticalAlign === STRING), "buttongroup.opts.verticalAlign is not an " + STRING + ". result: " + typeof (run.instance).opts.verticalAlign );
         });

         it( run.Options.Description + ".opts.verticalAlign should be equal:" + default_verticalAlign, function ()
         {
            let result =  (run.instance).opts.verticalAlign;
            assert.equal(result, default_verticalAlign, "buttongroup.opts.verticalAlign is not: " + default_verticalAlign + ". result: " + result );
         });

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


*/




      });
   });
});

/*
describe("Testing setting some List Options during Construction", function ()
{
   runs.forEach(function (run)
   {

      it( run.Options.Description + ".opts.primaryColor should be settable.", function ()
      {
         let newPrimaryColor = 0xfefefe;
         let list = new (run.Constructor)({"primaryColor": newPrimaryColor});
         let result = list.opts.primaryColor;
         assert.equal(result, newPrimaryColor, "list.opts.primaryColor is incorrect. Expected: " + default_primaryColor + ". result: " + result );
      });

      it( run.Options.Description + ".opts.textStyle.fill should be settable.", function ()
      {
         let newTextStyleFill = 0xfefefe;
         let newTextStyle: PIXI.textStyle = {"fill": newTextStyleFill};
         let list = new (run.Constructor)({"textStyle": newTextStyle});

         let result = list.opts.textStyle.fill;
         assert.equal(result, newTextStyleFill, "list.opts.textStyle.fill is incorrect. Expected: " + newTextStyleFill + ". result: " + result );

         assert.equal(list.opts.textStyle.fontWeight, default_textStyleFontWeight, "list.opts.textStyle.fontWeight was changed. Expected: " + default_textStyleFontWeight + ". result: " + list.opts.textStyle.fontWeight );
      });

   });
});
*/
