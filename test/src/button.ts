'use strict';

import  Button from '../../src/button';

var OriginalButton = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/button.js');
      OriginalButton = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/button.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old Button testing");
}

// The driver of what will be tested for the new Button code
let runs = [
   {Constructor: Button,
    instance: null,
    Options: {Description: "New Button", Type: 'N'}
   }
];


// The driver of what will be tested for the old Button code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalButton,
       instance: null,
       Options: {Description: "Original Button", Type: 'O'}
      }
   );
}

let default_textStyleFontWeight = "500"
let default_textStyleFontSize = 18
let default_textStyleFill = default_color2
let default_textStyleStroke = default_color1
let default_textStyleStrokeThickness = 0
let default_textStyleMiterLimit = 1
let default_textStyleLineJoin = "round"
let default_primaryColor = 0x5ec7f8;
let default_color1 = 0x282828;
let default_color2 = 0xf6f6f6;

let default_theme = 'dark'
let default_id = null
let default_label = null
let default_x = 0
let default_y = 0
let default_minWidth = 44
let default_minHeight = 44
let default_padding = 12
let default_icon = null
let default_iconActive = null
let default_iconPosition = 'left'
let default_iconColor = default_color2
let default_iconColorActive = default_primaryColor
let default_fill = default_color1
let default_fillAlpha = 1
let default_fillActive = default_color1
let default_fillActiveAlpha = 1
let default_stroke = default_color2
let default_strokeWidth = .6
let default_strokeAlpha = 1
let default_strokeActive = default_color2
let default_strokeActiveWidth = .6
let default_strokeActiveAlpha = 1
let default_textStyle = null
let default_textStyleActive = null
let default_style = 'default'
let default_radius = 4
let default_disabled = false
let default_active = false
let default_action = null
let default_beforeAction = null
let default_afterAction = null
let default_type = 'default'
let default_align = 'center'
let default_verticalAlign = 'middle'
let default_tooltipOptions = null
let default_badge = null
let default_visible = true


before(function()
{
   console.log("   Button Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
           assert.isNotNull(Button, "Button resulted in null");
         if (run.Options.Type == 'O')
           assert.isNotNull(OriginalButton, "OriginalButton resulted in null");
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
         run.instance = new ( run.Constructor ) ();
         assert.isNotNull(run.instance, "instance resulted in null");
      });
   });
});

describe("Testing Button", function ()
{
   describe("Testing Button variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.theme should not be null ", function ()
         {
            assert.isNotNull((run.instance).opts.theme, "button.opts.theme is null.  result: " + (run.instance).opts.theme );
         });

         it( run.Options.Description + ".opts.x should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.x === NUMBER), "button.opts.x is not an " + NUMBER + ". result: " + typeof (run.instance).opts.x );
         });

         it( run.Options.Description + ".opts.x should be default: " +  default_x, function ()
         {
            let result =  (run.instance).opts.x;
            assert.equal(result, default_x, "button.opts.x is not: " + default_x + ". result: " + result );
         });

         it( run.Options.Description + ".opts.y should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.y === NUMBER), "button.opts.y is not an " + NUMBER + ". result: " + typeof (run.instance).opts.y );
         });

         it( run.Options.Description + ".opts.y should be default: " +  default_y, function ()
         {
            let result =  (run.instance).opts.y;
            assert.equal(result, default_y, "button.opts.y is not: " + default_y + ". result: " + result );
         });

         it( run.Options.Description + ".opts.padding should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.padding === NUMBER), "button.opts.padding is not an " + NUMBER + ". result: " + typeof (run.instance).opts.padding );
         });

         it( run.Options.Description + ".opts.padding should equal button.opts.theme.padding", function ()
         {
            let result =  (run.instance).opts.padding;
            assert.equal(result, (run.instance).theme.padding, "button.opts.padding is not: " + (run.instance).theme.padding + ". result: " + result );
         });

         it( run.Options.Description + ".opts.iconPosition should be an " + STRING, function ()
         {
            assert.isTrue((typeof (run.instance).opts.iconPosition === STRING), "button.opts.padding is not an " + STRING + ". result: " + typeof (run.instance).opts.iconPosition );
         });

         it( run.Options.Description + ".opts.iconPosition should equal:" + default_iconPosition, function ()
         {
            let result =  (run.instance).opts.iconPosition;
            assert.equal(result, default_iconPosition, "button.opts.iconPosition is not: " + default_iconPosition + ". result: " + result );
         });

         it( run.Options.Description + ".opts.iconColor should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.iconColor === NUMBER), "button.opts.iconColor is not an " + NUMBER + ". result: " + typeof (run.instance).opts.iconColor );
         });

         it( run.Options.Description + ".opts.iconColor should equal button.opts.theme.iconColor", function ()
         {
            let result =  (run.instance).opts.iconColor;
            assert.equal(result, (run.instance).theme.iconColor, "button.opts.iconColor is not: " + (run.instance).theme.iconColor + ". result: " + result );
         });

         it( run.Options.Description + ".opts.iconColorActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.iconColorActive === NUMBER), "button.opts.iconColorActive is not an " + NUMBER + ". result: " + typeof (run.instance).opts.iconColorActive );
         });

         it( run.Options.Description + ".opts.iconColorActive should equal button.opts.theme.iconColorActive", function ()
         {
            let result =  (run.instance).opts.iconColorActive;
            assert.equal(result, (run.instance).theme.iconColorActive, "button.opts.iconColorActive is not: " + (run.instance).theme.iconColorActive + ". result: " + result );
         });

         it( run.Options.Description + ".opts.fill should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fill === NUMBER), "button.opts.fill is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fill );
         });

         it( run.Options.Description + ".opts.fill should be equal opts.theme.fill", function ()
         {
            let result =  (run.instance).opts.fill;
            assert.equal(result, (run.instance).theme.fill, "button.opts.fill is not: " + (run.instance).theme.fill + ". result: " + result );
         });

         it( run.Options.Description + ".opts.fillAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillAlpha === NUMBER), "button.opts.fillAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillAlpha );
         });

         it( run.Options.Description + ".opts.fillAlpha should be equal opts.theme.fillAlpha", function ()
         {
            let result =  (run.instance).opts.fillAlpha;
            assert.equal(result, (run.instance).theme.fillAlpha, "button.opts.fillAlpha is not: " + (run.instance).theme.fillAlpha + ". result: " + result );
         });


         it( run.Options.Description + ".opts.fillActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillActive === NUMBER), "button.opts.fillActive is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillActive );
         });

         it( run.Options.Description + ".opts.fillActive should be equal opts.theme.fillActive", function ()
         {
            let result =  (run.instance).opts.fillActive;
            assert.equal(result, (run.instance).theme.fillActive, "button.opts.fillActive is not: " + (run.instance).theme.fillActive + ". result: " + result );
         });

         it( run.Options.Description + ".opts.fillActiveAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillActiveAlpha === NUMBER), "button.opts.fillActiveAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillActiveAlpha );
         });

         it( run.Options.Description + ".opts.fillActiveAlpha should be equal opts.theme.fillActiveAlpha", function ()
         {
            let result =  (run.instance).opts.fillActiveAlpha;
            assert.equal(result, (run.instance).theme.fillActiveAlpha, "button.opts.fillActiveAlpha is not: " + (run.instance).theme.fillActiveAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.stroke should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.stroke === NUMBER), "button.opts.stroke is not an " + NUMBER + ". result: " + typeof (run.instance).opts.stroke );
         });

         it( run.Options.Description + ".opts.stroke should be equal opts.theme.stroke", function ()
         {
            let result =  (run.instance).opts.stroke;
            assert.equal(result, (run.instance).theme.stroke, "button.opts.stroke is not: " + (run.instance).theme.stroke + ". result: " + result );
         });


         it( run.Options.Description + ".opts.strokeWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeWidth === NUMBER), "button.opts.strokeWidth is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeWidth );
         });

         it( run.Options.Description + ".opts.strokeWidth should be equal opts.theme.strokeWidth", function ()
         {
            let result =  (run.instance).opts.strokeWidth;
            assert.equal(result, (run.instance).theme.strokeWidth, "button.opts.strokeWidth is not: " + (run.instance).theme.strokeWidth + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeAlpha === NUMBER), "button.opts.strokeAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeAlpha );
         });

         it( run.Options.Description + ".opts.strokeAlpha should be equal opts.theme.strokeAlpha", function ()
         {
            let result =  (run.instance).opts.strokeAlpha;
            assert.equal(result, (run.instance).theme.strokeAlpha, "button.opts.strokeAlpha is not: " + (run.instance).theme.strokeAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActive === NUMBER), "button.opts.strokeActive is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActive );
         });

         it( run.Options.Description + ".opts.strokeActive should be equal opts.theme.strokeActive", function ()
         {
            let result =  (run.instance).opts.strokeActive;
            assert.equal(result, (run.instance).theme.strokeActive, "button.opts.strokeActive is not: " + (run.instance).theme.strokeActive + ". result: " + result );
         });


         it( run.Options.Description + ".opts.strokeActiveWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActiveWidth === NUMBER), "button.opts.strokeActiveWidth is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActiveWidth );
         });

         it( run.Options.Description + ".opts.strokeActiveWidth should be equal opts.theme.strokeActiveWidth", function ()
         {
            let result =  (run.instance).opts.strokeActiveWidth;
            assert.equal(result, (run.instance).theme.strokeActiveWidth, "button.opts.strokeActiveWidth is not: " + (run.instance).theme.strokeActiveWidth + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeActiveAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActiveAlpha === NUMBER), "button.opts.strokeActiveAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActiveAlpha );
         });

         it( run.Options.Description + ".opts.strokeActiveAlpha should be equal opts.theme.strokeActiveAlpha", function ()
         {
            let result =  (run.instance).opts.strokeActiveAlpha;
            assert.equal(result, (run.instance).theme.strokeActiveAlpha, "button.opts.strokeActiveAlpha is not: " + (run.instance).theme.strokeActiveAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.textStyle should be equal opts.theme.textStyle", function ()
         {
            let result =  (run.instance).opts.textStyle;
            assert.equal(result, (run.instance).theme.textStyle, "button.opts.textStyle is not: " + (run.instance).theme.textStyle + ". result: " + result );
         });

         it( run.Options.Description + ".opts.radius should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.radius === NUMBER), "button.opts.radius is not an " + NUMBER + ". result: " + typeof (run.instance).opts.radius );
         });

         it( run.Options.Description + ".opts.radius should be equal opts.theme.radius", function ()
         {
            let result =  (run.instance).opts.radius;
            assert.equal(result, (run.instance).theme.radius, "button.opts.radius is not: " + (run.instance).theme.radius + ". result: " + result );
         });

         it( run.Options.Description + ".opts.disabled should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.disabled === BOOLEAN), "button.opts.disabled is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.disabled );
         });

         it( run.Options.Description + ".opts.disabled should be equal:" + default_disabled, function ()
         {
            let result =  (run.instance).opts.disabled;
            assert.equal(result, default_disabled, "button.opts.disabled is not: " + default_disabled + ". result: " + result );
         });

         it( run.Options.Description + ".opts.active should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.active === BOOLEAN), "button.opts.active is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.active );
         });

         it( run.Options.Description + ".opts.active should be equal:" + default_active, function ()
         {
            let result =  (run.instance).opts.active;
            assert.equal(result, default_active, "button.opts.active is not: " + default_active + ". result: " + result );
         });

         it( run.Options.Description + ".opts.type should be an " + STRING, function ()
         {
            assert.isTrue((typeof (run.instance).opts.type === STRING), "button.opts.type is not an " + STRING + ". result: " + typeof (run.instance).opts.type );
         });

         it( run.Options.Description + ".opts.type should be equal:" + default_type, function ()
         {
            let result =  (run.instance).opts.type;
            assert.equal(result, default_type, "button.opts.type is not: " + default_type + ". result: " + result );
         });

         it( run.Options.Description + ".opts.align should be an " + STRING, function ()
         {
            assert.isTrue(( typeof (run.instance).opts.align === STRING), "button.opts.align is not an " + STRING + ". result: " + typeof (run.instance).opts.align );
         });

         it( run.Options.Description + ".opts.align should be equal:" + default_align, function ()
         {
            let result =  (run.instance).opts.align;
            assert.equal(result, default_align, "button.opts.align is not: " + default_align + ". result: " + result );
         });


         it( run.Options.Description + ".opts.verticalAlign should be an " + STRING, function ()
         {
            assert.isTrue((typeof (run.instance).opts.verticalAlign === STRING), "button.opts.verticalAlign is not an " + STRING + ". result: " + typeof (run.instance).opts.verticalAlign );
         });

         it( run.Options.Description + ".opts.verticalAlign should be equal:" + default_verticalAlign, function ()
         {
            let result =  (run.instance).opts.verticalAlign;
            assert.equal(result, default_verticalAlign, "button.opts.verticalAlign is not: " + default_verticalAlign + ". result: " + result );
         });
      });
   });
});

describe("Testing setting some Button Options during Construction", function ()
{
   runs.forEach(function (run)
   {

/*
      it( run.Options.Description + ".opts.primaryColor should be settable.", function ()
      {
         let newPrimaryColor = 0xfefefe;
         let button = new (run.Constructor)({"primaryColor": newPrimaryColor});
         let result = button.opts.primaryColor;
         assert.equal(result, newPrimaryColor, "button.opts.primaryColor is incorrect. Expected: " + default_primaryColor + ". result: " + result );
      });

      it( run.Options.Description + ".opts.textStyle.fill should be settable.", function ()
      {
         let newTextStyleFill = 0xfefefe;
         let newTextStyle: PIXI.textStyle = {"fill": newTextStyleFill};
         let button = new (run.Constructor)({"textStyle": newTextStyle});

         let result = button.opts.textStyle.fill;
         assert.equal(result, newTextStyleFill, "button.opts.textStyle.fill is incorrect. Expected: " + newTextStyleFill + ". result: " + result );

         assert.equal(button.opts.textStyle.fontWeight, default_textStyleFontWeight, "button.opts.textStyle.fontWeight was changed. Expected: " + default_textStyleFontWeight + ". result: " + button.opts.textStyle.fontWeight );
      });
*/

   });
});
