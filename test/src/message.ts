'use strict';

// Message can only be tested in legacy mode
const PIXI = PIXIlegacy;
global.PIXI = PIXI;

import  Message from '../../src/message';
import  PIXIApp from '../../src/app';

var OriginalMessage = null;
var OriginalPIXIApp = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/message.js');
      OriginalMessage = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/message.js!" );
      else
        throw e;
   }
   // To test message, you also need PIXIApp
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
  console.log("COMPARE is undefined. Not doing old Message testing");
}

// The driver of what will be tested for the new Message code
let runs = [
   {Constructor: Message,
    instance: null,
    appInstance: null,
    Options: {Description: "New Message", Type: 'N'}
   }
];


// The driver of what will be tested for the old Message code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalMessage,
       instance: null,
       appInstance: null,
       Options: {Description: "Original Message", Type: 'O'}
      }
   );
}

let default_color1 = 0x282828;

let default_app = null
let default_theme = 'dark'
let default_minWidth = 280
let default_minHeight = 100
let default_margin = 12
let default_align = 'right'
let default_verticalAlign = 'top'
let default_duration = 5
let default_autoClose = true
let default_closeDuration = .25
let default_closeButton = false

before(function()
{
   console.log("   Message Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
         {
           assert.isNotNull(Message, "Message resulted in null");
           assert.isNotNull(PIXIApp, "PIXIApp resulted in null");
         }
         if (run.Options.Type == 'O')
         {
           assert.isNotNull(OriginalMessage, "OriginalMessage resulted in null");
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
         // Create the message insance
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

describe("Testing Message", function ()
{
   describe("Testing Message variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.closeButton should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.closeButton === BOOLEAN), "popup.opts.closeButton is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.closeButton );
         });

         it( run.Options.Description + ".opts.closeButton should be default: " + default_closeButton , function ()
         {
            let result =  (run.instance).opts.closeButton;
            assert.equal(result, default_closeButton, "popup.opts.closeButton is not: " + default_closeButton + ". result: " + result );
         });

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

         it( run.Options.Description + ".opts.margin should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.margin === NUMBER), "progress.opts.margin is not an " + NUMBER + ". result: " + typeof (run.instance).opts.margin );
         });

         it( run.Options.Description + ".opts.margin should equal default: " + default_margin, function ()
         {
            let result =  (run.instance).opts.margin;
            assert.equal(result, default_margin, "progress.opts.margin is not: " + default_margin + ". result: " + result );
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

         it( run.Options.Description + ".opts.duration should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.duration === NUMBER), "volatile.opts.duration is not an " + NUMBER + ". result: " + typeof (run.instance).opts.duration );
         });

         it( run.Options.Description + ".opts.duration should be default: " + default_duration, function ()
         {
            let result =  (run.instance).opts.duration;
            assert.equal(result, default_duration, "volatile.opts.duration is not: " + default_duration + " result: " + result );
         });

         it( run.Options.Description + ".opts.autoClose should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.autoClose === BOOLEAN), "popup.opts.autoClose is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.autoClose );
         });

         it( run.Options.Description + ".opts.autoClose should be default: " + default_autoClose , function ()
         {
            let result =  (run.instance).opts.autoClose;
            assert.equal(result, default_autoClose, "popup.opts.autoClose is not: " + default_autoClose + ". result: " + result );
         });

         it( run.Options.Description + ".opts.closeDuration should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.closeDuration === NUMBER), "volatile.opts.closeDuration is not an " + NUMBER + ". result: " + typeof (run.instance).opts.closeDuration );
         });

         it( run.Options.Description + ".opts.closeDuration should be default: " + default_closeDuration, function ()
         {
            let result =  (run.instance).opts.closeDuration;
            assert.equal(result, default_closeDuration, "volatile.opts.closeDuration is not: " + default_closeDuration + " result: " + result );
         });




      });
   });
});

/*
describe("Testing setting some Message Options during Construction", function ()
{
   runs.forEach(function (run)
   {

      it( run.Options.Description + ".opts.primaryColor should be settable.", function ()
      {
         let newPrimaryColor = 0xfefefe;
         let message = new (run.Constructor)({"primaryColor": newPrimaryColor});
         let result = message.opts.primaryColor;
         assert.equal(result, newPrimaryColor, "message.opts.primaryColor is incorrect. Expected: " + default_primaryColor + ". result: " + result );
      });

      it( run.Options.Description + ".opts.textStyle.fill should be settable.", function ()
      {
         let newTextStyleFill = 0xfefefe;
         let newTextStyle: PIXI.textStyle = {"fill": newTextStyleFill};
         let message = new (run.Constructor)({"textStyle": newTextStyle});

         let result = message.opts.textStyle.fill;
         assert.equal(result, newTextStyleFill, "message.opts.textStyle.fill is incorrect. Expected: " + newTextStyleFill + ". result: " + result );

         assert.equal(message.opts.textStyle.fontWeight, default_textStyleFontWeight, "message.opts.textStyle.fontWeight was changed. Expected: " + default_textStyleFontWeight + ". result: " + message.opts.textStyle.fontWeight );
      });

   });
});
*/
