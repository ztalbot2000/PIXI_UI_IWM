'use strict';

// Modal can only be tested in legacy mode
const PIXI = PIXIlegacy;
global.PIXI = PIXI;

import  Modal from '../../src/modal';
import  PIXIApp from '../../src/app';

var OriginalModal = null;
var OriginalPIXIApp = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/modal.js');
      OriginalModal = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/modal.js!" );
      else
        throw e;
   }
   // To test modal, you also need PIXIApp
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
  console.log("COMPARE is undefined. Not doing old Modal testing");
}

// The driver of what will be tested for the new Modal code
let runs = [
   {Constructor: Modal,
    instance: null,
    appInstance: null,
    Options: {Description: "New Modal", Type: 'N'}
   }
];


// The driver of what will be tested for the old Modal code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalModal,
       instance: null,
       appInstance: null,
       Options: {Description: "Original Modal", Type: 'O'}
      }
   );
}

let default_color1 = 0x282828;

let default_id = 999
let default_theme = 'dark'
let default_app = null
let default_header = null
let default_content = null
let default_backgroundFill = default_color1
let default_backgroundFillAlpha = 1
let default_closeOnBackground = true
let default_visible = true

before(function()
{
   console.log("   Modal Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
         {
           assert.isNotNull(Modal, "Modal resulted in null");
           assert.isNotNull(PIXIApp, "PIXIApp resulted in null");
         }
         if (run.Options.Type == 'O')
         {
           assert.isNotNull(OriginalModal, "OriginalModal resulted in null");
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

describe("Testing Modal", function ()
{
   describe("Testing Modal variables", function ()
   {
      runs.forEach(function (run)
      {
         // The ,id is a random number, so cannot be tested for value, only its type
         it( run.Options.Description + ".id should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).id === NUMBER), "modal.id is not an " + NUMBER + ". result: " + typeof (run.instance).id );
         });

         it( run.Options.Description + ".theme should be an " + OBJECT, function ()
         {
            assert.isTrue((typeof (run.instance).theme === OBJECT), "modal.theme is not an " + OBJECT + ". result: " + typeof (run.instance).id );
         });


      });
   });
});

/*
describe("Testing setting some Modal Options during Construction", function ()
{
   runs.forEach(function (run)
   {

      it( run.Options.Description + ".opts.primaryColor should be settable.", function ()
      {
         let newPrimaryColor = 0xfefefe;
         let modal = new (run.Constructor)({"primaryColor": newPrimaryColor});
         let result = modal.opts.primaryColor;
         assert.equal(result, newPrimaryColor, "modal.opts.primaryColor is incorrect. Expected: " + default_primaryColor + ". result: " + result );
      });

      it( run.Options.Description + ".opts.textStyle.fill should be settable.", function ()
      {
         let newTextStyleFill = 0xfefefe;
         let newTextStyle: PIXI.textStyle = {"fill": newTextStyleFill};
         let modal = new (run.Constructor)({"textStyle": newTextStyle});

         let result = modal.opts.textStyle.fill;
         assert.equal(result, newTextStyleFill, "modal.opts.textStyle.fill is incorrect. Expected: " + newTextStyleFill + ". result: " + result );

         assert.equal(modal.opts.textStyle.fontWeight, default_textStyleFontWeight, "modal.opts.textStyle.fontWeight was changed. Expected: " + default_textStyleFontWeight + ". result: " + modal.opts.textStyle.fontWeight );
      });

   });
});
*/
