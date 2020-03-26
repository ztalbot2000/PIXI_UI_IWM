'use strict';

import  ButtonGroup from '../../src/buttongroup';

var OriginalButtonGroup = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/buttongroup.js');
      OriginalButtonGroup = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/buttongroup.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old ButtonGroup testing");
}

// The driver of what will be tested for the new ButtonGroup code
let runs = [
   {Constructor: ButtonGroup,
    instance: null,
    Options: {Description: "New ButtonGroup", Type: 'N'}
   }
];


// The driver of what will be tested for the old ButtonGroup code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalButtonGroup,
       instance: null,
       Options: {Description: "Original ButtonGroup", Type: 'O'}
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
let default_buttonsArrayLength = 0;
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
let default_disabled = null
let default_active = false
let default_action = null
let default_beforeAction = null
let default_afterAction = null
let default_type = 'default'
let default_align = 'center'
let default_verticalAlign = 'middle'
let default_orientation = 'horizontal'
let default_visible = true


before(function()
{
   console.log("   ButtonGroup Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
           assert.isNotNull(ButtonGroup, "ButtonGroup resulted in null");
         if (run.Options.Type == 'O')
           assert.isNotNull(OriginalButtonGroup, "OriginalButtonGroup resulted in null");
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

describe("Testing ButtonGroup", function ()
{
   describe("Testing ButtonGroup variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.theme should not be null ", function ()
         {
            assert.isNotNull((run.instance).opts.theme, "buttongroup.opts.theme is null.  result: " + (run.instance).opts.theme );
         });

         it( run.Options.Description + ".opts.x should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.x === NUMBER), "buttongroup.opts.x is not an " + NUMBER + ". result: " + typeof (run.instance).opts.x );
         });

         it( run.Options.Description + ".opts.x should be default: " +  default_x, function ()
         {
            let result =  (run.instance).opts.x;
            assert.equal(result, default_x, "buttongroup.opts.x is not: " + default_x + ". result: " + result );
         });

         it( run.Options.Description + ".opts.y should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.y === NUMBER), "buttongroup.opts.y is not an " + NUMBER + ". result: " + typeof (run.instance).opts.y );
         });

         it( run.Options.Description + ".opts.y should be default: " +  default_y, function ()
         {
            let result =  (run.instance).opts.y;
            assert.equal(result, default_y, "buttongroup.opts.y is not: " + default_y + ". result: " + result );
         });

         it( run.Options.Description + ".opts.buttons should be an " + ARRAY, function ()
         {
            assert.isArray((run.instance).opts.buttons, "buttongroup.opts.buttons is not an " + ARRAY + ". result: " + typeof (run.instance).opts.buttons );
         });

         it( run.Options.Description + ".opts.buttons should length should be " + default_buttonsArrayLength, function ()
         {
            let result =  (run.instance).opts.buttons.length;
            assert.equal(result, default_buttonsArrayLength, "buttongroup.opts.buttons is not: " + (run.instance).length + ". result: " + result );
         });

         it( run.Options.Description + ".opts.minWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.minWidth === NUMBER), "buttongroup.opts.minWidth is not an " + NUMBER + ". result: " + typeof (run.instance).opts.minWidth );
         });

         it( run.Options.Description + ".opts.minWidth should equal: " +  default_minWidth, function ()
         {
            let result =  (run.instance).opts.minWidth;
            assert.equal(result, default_minWidth, "buttongroup.opts.minWidth is not: " + default_minWidth + ". result: " + result );
         });

         it( run.Options.Description + ".opts.minHeight should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.minHeight === NUMBER), "buttongroup.opts.minHeight is not an " + NUMBER + ". result: " + typeof (run.instance).opts.minHeight );
         });

         it( run.Options.Description + ".opts.minHeight should equal: " +  default_minHeight, function ()
         {
            let result =  (run.instance).opts.minHeight;
            assert.equal(result, default_minHeight, "buttongroup.opts.minHeight is not: " + default_minHeight + ". result: " + result );
         });

         it( run.Options.Description + ".opts.padding should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.padding === NUMBER), "buttongroup.opts.padding is not an " + NUMBER + ". result: " + typeof (run.instance).opts.padding );
         });

         it( run.Options.Description + ".opts.padding should equal buttongroup.opts.theme.padding", function ()
         {
            let result =  (run.instance).opts.padding;
            assert.equal(result, (run.instance).theme.padding, "buttongroup.opts.padding is not: " + (run.instance).theme.padding + ". result: " + result );
         });

         it( run.Options.Description + ".opts.iconPosition should be an " + STRING, function ()
         {
            assert.isTrue((typeof (run.instance).opts.iconPosition === STRING), "buttongroup.opts.padding is not an " + STRING + ". result: " + typeof (run.instance).opts.iconPosition );
         });

         it( run.Options.Description + ".opts.iconPosition should equal:" + default_iconPosition, function ()
         {
            let result =  (run.instance).opts.iconPosition;
            assert.equal(result, default_iconPosition, "buttongroup.opts.iconPosition is not: " + default_iconPosition + ". result: " + result );
         });

         it( run.Options.Description + ".opts.iconColor should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.iconColor === NUMBER), "buttongroup.opts.iconColor is not an " + NUMBER + ". result: " + typeof (run.instance).opts.iconColor );
         });

         it( run.Options.Description + ".opts.iconColor should equal buttongroup.opts.theme.iconColor", function ()
         {
            let result =  (run.instance).opts.iconColor;
            assert.equal(result, (run.instance).theme.iconColor, "buttongroup.opts.iconColor is not: " + (run.instance).theme.iconColor + ". result: " + result );
         });

         it( run.Options.Description + ".opts.iconColorActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.iconColorActive === NUMBER), "buttongroup.opts.iconColorActive is not an " + NUMBER + ". result: " + typeof (run.instance).opts.iconColorActive );
         });

         it( run.Options.Description + ".opts.iconColorActive should equal buttongroup.opts.theme.iconColorActive", function ()
         {
            let result =  (run.instance).opts.iconColorActive;
            assert.equal(result, (run.instance).theme.iconColorActive, "buttongroup.opts.iconColorActive is not: " + (run.instance).theme.iconColorActive + ". result: " + result );
         });

         it( run.Options.Description + ".opts.fill should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fill === NUMBER), "buttongroup.opts.fill is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fill );
         });

         it( run.Options.Description + ".opts.fill should be equal opts.theme.fill", function ()
         {
            let result =  (run.instance).opts.fill;
            assert.equal(result, (run.instance).theme.fill, "buttongroup.opts.fill is not: " + (run.instance).theme.fill + ". result: " + result );
         });

         it( run.Options.Description + ".opts.fillAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillAlpha === NUMBER), "buttongroup.opts.fillAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillAlpha );
         });

         it( run.Options.Description + ".opts.fillAlpha should be equal opts.theme.fillAlpha", function ()
         {
            let result =  (run.instance).opts.fillAlpha;
            assert.equal(result, (run.instance).theme.fillAlpha, "buttongroup.opts.fillAlpha is not: " + (run.instance).theme.fillAlpha + ". result: " + result );
         });


         it( run.Options.Description + ".opts.fillActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillActive === NUMBER), "buttongroup.opts.fillActive is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillActive );
         });

         it( run.Options.Description + ".opts.fillActive should be equal opts.theme.fillActive", function ()
         {
            let result =  (run.instance).opts.fillActive;
            assert.equal(result, (run.instance).theme.fillActive, "buttongroup.opts.fillActive is not: " + (run.instance).theme.fillActive + ". result: " + result );
         });

         it( run.Options.Description + ".opts.fillActiveAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillActiveAlpha === NUMBER), "buttongroup.opts.fillActiveAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillActiveAlpha );
         });

         it( run.Options.Description + ".opts.fillActiveAlpha should be equal opts.theme.fillActiveAlpha", function ()
         {
            let result =  (run.instance).opts.fillActiveAlpha;
            assert.equal(result, (run.instance).theme.fillActiveAlpha, "buttongroup.opts.fillActiveAlpha is not: " + (run.instance).theme.fillActiveAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.stroke should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.stroke === NUMBER), "buttongroup.opts.stroke is not an " + NUMBER + ". result: " + typeof (run.instance).opts.stroke );
         });

         it( run.Options.Description + ".opts.stroke should be equal opts.theme.stroke", function ()
         {
            let result =  (run.instance).opts.stroke;
            assert.equal(result, (run.instance).theme.stroke, "buttongroup.opts.stroke is not: " + (run.instance).theme.stroke + ". result: " + result );
         });


         it( run.Options.Description + ".opts.strokeWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeWidth === NUMBER), "buttongroup.opts.strokeWidth is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeWidth );
         });

         it( run.Options.Description + ".opts.strokeWidth should be equal opts.theme.strokeWidth", function ()
         {
            let result =  (run.instance).opts.strokeWidth;
            assert.equal(result, (run.instance).theme.strokeWidth, "buttongroup.opts.strokeWidth is not: " + (run.instance).theme.strokeWidth + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeAlpha === NUMBER), "buttongroup.opts.strokeAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeAlpha );
         });

         it( run.Options.Description + ".opts.strokeAlpha should be equal opts.theme.strokeAlpha", function ()
         {
            let result =  (run.instance).opts.strokeAlpha;
            assert.equal(result, (run.instance).theme.strokeAlpha, "buttongroup.opts.strokeAlpha is not: " + (run.instance).theme.strokeAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActive === NUMBER), "buttongroup.opts.strokeActive is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActive );
         });

         it( run.Options.Description + ".opts.strokeActive should be equal opts.theme.strokeActive", function ()
         {
            let result =  (run.instance).opts.strokeActive;
            assert.equal(result, (run.instance).theme.strokeActive, "buttongroup.opts.strokeActive is not: " + (run.instance).theme.strokeActive + ". result: " + result );
         });


         it( run.Options.Description + ".opts.strokeActiveWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActiveWidth === NUMBER), "buttongroup.opts.strokeActiveWidth is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActiveWidth );
         });

         it( run.Options.Description + ".opts.strokeActiveWidth should be equal opts.theme.strokeActiveWidth", function ()
         {
            let result =  (run.instance).opts.strokeActiveWidth;
            assert.equal(result, (run.instance).theme.strokeActiveWidth, "buttongroup.opts.strokeActiveWidth is not: " + (run.instance).theme.strokeActiveWidth + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeActiveAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActiveAlpha === NUMBER), "buttongroup.opts.strokeActiveAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActiveAlpha );
         });

         it( run.Options.Description + ".opts.strokeActiveAlpha should be equal opts.theme.strokeActiveAlpha", function ()
         {
            let result =  (run.instance).opts.strokeActiveAlpha;
            assert.equal(result, (run.instance).theme.strokeActiveAlpha, "buttongroup.opts.strokeActiveAlpha is not: " + (run.instance).theme.strokeActiveAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.textStyle should be equal opts.theme.textStyle", function ()
         {
            let result =  (run.instance).opts.textStyle;
            assert.equal(result, (run.instance).theme.textStyle, "buttongroup.opts.textStyle is not: " + (run.instance).theme.textStyle + ". result: " + result );
         });

         it( run.Options.Description + ".opts.radius should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.radius === NUMBER), "buttongroup.opts.radius is not an " + NUMBER + ". result: " + typeof (run.instance).opts.radius );
         });

         it( run.Options.Description + ".opts.radius should be equal opts.theme.radius", function ()
         {
            let result =  (run.instance).opts.radius;
            assert.equal(result, (run.instance).theme.radius, "buttongroup.opts.radius is not: " + (run.instance).theme.radius + ". result: " + result );
         });

         // disabled is null, thus cannot check type
         //it( run.Options.Description + ".opts.disabled should be an " + BOOLEAN, function ()
         //{
         //   assert.isTrue((typeof (run.instance).opts.disabled === BOOLEAN), "buttongroup.opts.disabled is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.disabled );
         //});

         it( run.Options.Description + ".opts.disabled should be equal:" + default_disabled, function ()
         {
            let result =  (run.instance).opts.disabled;
            assert.equal(result, default_disabled, "buttongroup.opts.disabled is not: " + default_disabled + ". result: " + result );
         });

         it( run.Options.Description + ".opts.type should be an " + STRING, function ()
         {
            assert.isTrue((typeof (run.instance).opts.type === STRING), "buttongroup.opts.type is not an " + STRING + ". result: " + typeof (run.instance).opts.type );
         });

         it( run.Options.Description + ".opts.type should be equal:" + default_type, function ()
         {
            let result =  (run.instance).opts.type;
            assert.equal(result, default_type, "buttongroup.opts.type is not: " + default_type + ". result: " + result );
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

         it( run.Options.Description + ".opts.visible should be an " + BOOLEAN, function ()
         {
            assert.isTrue((typeof (run.instance).opts.visible === BOOLEAN), "buttongroup.opts.visible is not an " + BOOLEAN + ". result: " + typeof (run.instance).opts.visible );
         });

         it( run.Options.Description + ".opts.visible should be equal:" + default_visible, function ()
         {
            let result =  (run.instance).opts.visible;
            assert.equal(result, default_visible, "buttongroup.opts.visible is not: " + default_visible + ". result: " + result );
         });
      });
   });
});

describe("Testing setting some ButtonGroup Options during Construction", function ()
{
   runs.forEach(function (run)
   {

/*
      it( run.Options.Description + ".opts.primaryColor should be settable.", function ()
      {
         let newPrimaryColor = 0xfefefe;
         let buttongroup = new (run.Constructor)({"primaryColor": newPrimaryColor});
         let result = buttongroup.opts.primaryColor;
         assert.equal(result, newPrimaryColor, "buttongroup.opts.primaryColor is incorrect. Expected: " + default_primaryColor + ". result: " + result );
      });

      it( run.Options.Description + ".opts.textStyle.fill should be settable.", function ()
      {
         let newTextStyleFill = 0xfefefe;
         let newTextStyle: PIXI.textStyle = {"fill": newTextStyleFill};
         let buttongroup = new (run.Constructor)({"textStyle": newTextStyle});

         let result = buttongroup.opts.textStyle.fill;
         assert.equal(result, newTextStyleFill, "buttongroup.opts.textStyle.fill is incorrect. Expected: " + newTextStyleFill + ". result: " + result );

         assert.equal(buttongroup.opts.textStyle.fontWeight, default_textStyleFontWeight, "buttongroup.opts.textStyle.fontWeight was changed. Expected: " + default_textStyleFontWeight + ". result: " + buttongroup.opts.textStyle.fontWeight );
      });
*/

   });
});
