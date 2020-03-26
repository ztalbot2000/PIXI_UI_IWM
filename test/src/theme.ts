'use strict';

import  Theme from '../../src/theme';

var OriginalTheme = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/theme.js');
      OriginalTheme = r.default;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/theme.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old Theme testing");
}

// The driver of what will be tested for the new Theme code
let runs = [
   {Constructor: Theme,
    instance: null,
    Options: {Description: "New Theme", Type: 'N'}
   }
];


// The driver of what will be tested for the old Theme code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   // Place Original before New
   runs.unshift(
      {Constructor: OriginalTheme,
       instance: null,
       Options: {Description: "Original Theme", Type: 'O'}
      }
   );
}

// Defaults within Theme
let default_margin = 12;
let default_padding = 12;
let default_radius = 4;
let default_fast = .25;
let default_normal = .5;
let default_slow = 1;
let default_primaryColor = 0x5ec7f8;
let default_color1 = 0x282828;
let default_color2 = 0xf6f6f6;
let default_fill = default_color1;
let default_fillAlpha = 1;
let default_fillActive = default_color1;
let default_fillActiveAlpha = 1;
let default_stroke = default_color2;
let original_default_strokeWidth = .6;
let new_default_strokeWidth = 1;
let default_strokeAlpha = 1;
let default_strokeActive = default_color2;
let original_default_strokeActiveWidth = .6;
let new_default_strokeActiveWidth = 1;
let default_strokeActiveAlpha = 1;
let default_iconColor = default_color2;
let default_iconColorActive = default_primaryColor;
let default_background = default_color1;

let default_textStyleFontWeight = "500"
let default_textStyleFontSize = 18
let default_textStyleFill = default_color2
let default_textStyleStroke = default_color1
let original_default_textStyleStrokeThickness = 0
let new_default_textStyleStrokeThickness = 1
let default_textStyleMiterLimit = 1
let default_textStyleLineJoin = "round"

before(function()
{
   console.log("   Theme Setup (Before)");
   runs.forEach(function (run)
   {
      it( run.Options.Description + " import should not be null", function ()
      {
         if (run.Options.Type == 'N')
           assert.isNotNull(Theme, "Theme resulted in null");
         if (run.Options.Type == 'O')
           assert.isNotNull(OriginalTheme, "OriginalTheme resulted in null");
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

describe("Testing Theme", function ()
{
   describe("Testing Theme variables", function ()
   {
      runs.forEach(function (run)
      {
         it( run.Options.Description + ".opts.margin should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.margin === NUMBER), "theme.opts.margin is not an " + NUMBER + ". result: " + typeof (run.instance).opts.margin );
         });

         it( run.Options.Description + ".opts.margin should be default: " + default_margin, function ()
         {
            let result =  (run.instance).opts.margin;
            assert.equal(result, default_margin, "theme.opts.margin is not: " + default_margin + ". result: " + result );
         });


         it( run.Options.Description + ".opts.padding should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.padding === NUMBER), "theme.opts.padding is not an " + NUMBER + ". result: " + typeof (run.instance).opts.padding );
         });

         it( run.Options.Description + ".opts.padding should be default: " + default_padding , function ()
         {
            let result =  (run.instance).opts.padding;
            assert.equal(result, default_padding, "theme.opts.padding is not: " + default_padding + ". result: " + result );
         });


         it( run.Options.Description + ".opts.radius should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.radius === NUMBER), "theme.opts.radius is not an " + NUMBER + ". result: " + typeof (run.instance).opts.radius );
         });

         it( run.Options.Description + ".opts.radius should be default:4 " , function ()
         {
            let result =  (run.instance).opts.radius;
            assert.equal(result, default_radius, "theme.opts.radius is not: " + default_radius + " result: " + result );
         });


         it( run.Options.Description + ".opts.fast should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fast === NUMBER), "theme.opts.fast is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fast );
         });

         it( run.Options.Description + ".opts.fast should be default: " + default_fast, function ()
         {
            let result =  (run.instance).opts.fast;
            assert.equal(result, default_fast, "theme.opts.fast is not: " + default_fast + ". result: " + result );
         });


         it( run.Options.Description + ".opts.normal should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.normal === NUMBER), "theme.opts.normal is not an " + NUMBER + ". result: " + typeof (run.instance).opts.normal );
         });

         it( run.Options.Description + ".opts.normal should be default: " + default_normal,function ()
         {
            let result =  (run.instance).opts.normal;
            assert.equal(result, default_normal, "theme.opts.normal is not: " + default_normal + ". result: " + result );
         });


         it( run.Options.Description + ".opts.slow should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.slow === NUMBER), "theme.opts.slow is not an " + NUMBER + ". result: " + typeof (run.instance).opts.slow );
         });

         it( run.Options.Description + ".opts.slow should be default: " + default_slow, function ()
         {
            let result =  (run.instance).opts.slow;
            assert.equal(result, default_slow, "theme.opts.slow is not: " + default_slow + " result: " + result );
         });


         it( run.Options.Description + ".opts.primaryColor should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.primaryColor === NUMBER), "theme.opts.primaryColor is not an " + NUMBER + ". result: " + typeof (run.instance).opts.primaryColor );
         });

         it( run.Options.Description + ".opts.primaryColor should be default: " + default_primaryColor, function ()
         {
            let result =  (run.instance).opts.primaryColor;
            assert.equal(result, default_primaryColor, "theme.opts.primaryColor is not: " + default_primaryColor + ". result: " + result );
         });


         it( run.Options.Description + ".opts.color1 should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.color1 === NUMBER), "theme.opts.color1 is not an " + NUMBER + ". result: " + typeof (run.instance).opts.color1 );
         });

         it( run.Options.Description + ".opts.color1 should be default: " + default_color1, function ()
         {
            let result =  (run.instance).opts.color1;
            assert.equal(result, default_color1, "theme.opts.color1 is not: " + default_color1 + " result: " + result );
         });


         it( run.Options.Description + ".opts.color2 should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.color2 === NUMBER), "theme.opts.color2 is not an " + NUMBER + ". result: " + typeof (run.instance).opts.color2 );
         });

         it( run.Options.Description + ".opts.color2 should be default: " + default_color2, function ()
         {
            let result =  (run.instance).opts.color2;
            assert.equal(result, default_color2, "theme.opts.color2 is not: " + default_color2 + ". result: " + result );
         });


         it( run.Options.Description + ".opts.fill should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fill === NUMBER), "theme.opts.fill is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fill );
         });

         it( run.Options.Description + ".opts.fill should be default: " + default_fill, function ()
         {
            let result =  (run.instance).opts.fill;
            assert.equal(result, default_fill, "theme.opts.fill is not: " + default_fill + ". result: " + result );
         });


         it( run.Options.Description + ".opts.fillAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillAlpha === NUMBER), "theme.opts.fillAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillAlpha );
         });

         it( run.Options.Description + ".opts.fillAlpha should be default: " + default_fillAlpha, function ()
         {
            let result =  (run.instance).opts.fillAlpha;
            assert.equal(result, default_fillAlpha, "theme.opts.fillAlpha is not: " + default_fillAlpha + ". result: " + result );
         });


         it( run.Options.Description + ".opts.fillActiveAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.fillActiveAlpha === NUMBER), "theme.opts.fillActiveAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.fillActiveAlpha );
         });

         it( run.Options.Description + ".opts.fillActiveAlpha should be default: " + default_fillActiveAlpha, function ()
         {
            let result =  (run.instance).opts.fillActiveAlpha;
            assert.equal(result, default_fillActiveAlpha, "theme.opts.fillActiveAlpha is not:  " + default_fillActiveAlpha + ". result: " + result );
         });


         it( run.Options.Description + ".opts.stroke should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.stroke === NUMBER), "theme.opts.stroke is not an " + NUMBER + ". result: " + typeof (run.instance).opts.stroke );
         });

         it( run.Options.Description + ".opts.stroke should be default: " + default_stroke, function ()
         {
            let result =  (run.instance).opts.stroke;
            assert.equal(result, default_stroke, "theme.opts.stroke is not: " + default_stroke + ". result: " + result );
         });





         it( run.Options.Description + ".opts.strokeWidth should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeWidth === NUMBER), "theme.opts.stroke is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeWidth );
         });

         if (run.Options.Type == 'O')
         {
            it( run.Options.Description + ".opts.strokeWidth should be default: " + original_default_strokeWidth, function ()
            {
               let result =  (run.instance).opts.strokeWidth;

                  assert.equal(result, original_default_strokeWidth, "theme.opts.strokeWidth is not: " + original_default_strokeWidth + ". result: " + result );

            });
         }

         if (run.Options.Type == 'N')
         {
            it( run.Options.Description + ".opts.strokeWidth should be default: " + new_default_strokeWidth, function ()
            {
               let result =  (run.instance).opts.strokeWidth;

               assert.equal(result, new_default_strokeWidth, "theme.opts.strokeWidth is not: " + new_default_strokeWidth + ". result: " + result );
            });
         }


         it( run.Options.Description + ".opts.strokeAlpha should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeAlpha === NUMBER), "theme.opts.strokeAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeAlpha );
         });

         it( run.Options.Description + ".opts.strokeAlpha should be default: " + default_strokeAlpha, function ()
         {
            let result =  (run.instance).opts.strokeAlpha;
            assert.equal(result, default_strokeAlpha, "theme.opts.strokeAlpha is not: " + default_strokeAlpha + ". result: " + result );
         });

         it( run.Options.Description + ".opts.strokeActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.strokeActive === NUMBER), "theme.opts.strokeAlpha is not an " + NUMBER + ". result: " + typeof (run.instance).opts.strokeActive );
         });

         it( run.Options.Description + ".opts.strokeActive should be default: " + default_strokeActive, function ()
         {
            let result =  (run.instance).opts.strokeActive;
            assert.equal(result, default_strokeActive, "theme.opts.strokeActive is not: " + default_strokeActive + ". result: " + result );
         });


         it( run.Options.Description + ".opts.iconColor should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.iconColor === NUMBER), "theme.opts.iconColor is not an " + NUMBER + ". result: " + typeof (run.instance).opts.iconColor );
         });

         it( run.Options.Description + ".opts.iconColor should be default: " + default_iconColor, function ()
         {
            let result =  (run.instance).opts.iconColor;
            assert.equal(result, default_iconColor, "theme.opts.iconColor is not: " + default_iconColor + ". result: " + result );
         });


         it( run.Options.Description + ".opts.iconColorActive should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.iconColorActive === NUMBER), "theme.opts.iconColorActive is not an " + NUMBER + ". result: " + typeof (run.instance).opts.iconColorActive );
         });

         it( run.Options.Description + ".opts.iconColorActive should be default: " + default_primaryColor, function ()
         {
            let result =  (run.instance).opts.iconColorActive;
            assert.equal(result, default_primaryColor, "theme.opts.iconColorActive is not: " + default_primaryColor + ". result: " + result );
         });


         it( run.Options.Description + ".opts.background should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.background === NUMBER), "theme.opts.background is not an " + NUMBER + ". result: " + typeof (run.instance).opts.background );
         });

         it( run.Options.Description + ".opts.background should be default: " + default_background, function ()
         {
            let result =  (run.instance).opts.background;
            assert.equal(result, default_background, "theme.opts.background is not: " + default_background + ". result: " + result );
         });


         it( run.Options.Description + ".opts.textStyle should be an " + OBJECT, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyle === OBJECT), "theme.opts.textStyle is not an " + OBJECT + ". result: " + typeof (run.instance).opts.textStyle );
         });


         it( run.Options.Description + ".opts.textStyleActive should be an " + OBJECT, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyleActive === OBJECT), "theme.opts.textStyleActive is not an " + OBJECT + ". result: " + typeof (run.instance).opts.textStyleActive );
         });


         it( run.Options.Description + ".opts.textStyleSmall should be an " + OBJECT, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyleSmall === OBJECT), "theme.opts.textStyleSmall is not an " + OBJECT + ". result: " + typeof (run.instance).opts.textStyleSmall );
         });


         it( run.Options.Description + ".opts.textStyleSmallActive should be an " + OBJECT, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyleSmallActive === OBJECT), "theme.opts.textStyleSmallActive is not an " + OBJECT + ". result: " + typeof (run.instance).opts.textStyleSmallActive );
         });


         it( run.Options.Description + ".opts.textStyleLarge should be an " + OBJECT, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyleLarge === OBJECT), "theme.opts.textStyleLarge is not an " + OBJECT + ". result: " + typeof (run.instance).opts.textStyleLarge );
         });


         it( run.Options.Description + ".opts.textStyleSmallActive should be an " + OBJECT, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyleSmallActive === OBJECT), "theme.opts.textStyleSmallActive is not an " + OBJECT + ". result: " + typeof (run.instance).opts.textStyleSmallActive );
         });


         it( run.Options.Description + ".opts.textStyleLargeActive should be an " + OBJECT, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyleLargeActive === OBJECT), "theme.opts.textStyleLargeActive is not an " + OBJECT + ". result: " + typeof (run.instance).opts.textStyleLargeActive );
         });

         // textStyle
         it( run.Options.Description + ".opts.textStyle.fontWeight should be an " + STRING, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyle.fontWeight === STRING), "theme.opts.fontWeight is not an " + STRING + ". result: " + typeof (run.instance).opts.textStyle.fontWeight );
         });

         it( run.Options.Description + ".opts.textStyle.fontWeight should be default: " + default_textStyleFontWeight, function ()
         {
            let result =  (run.instance).opts.textStyle.fontWeight;
            assert.equal(result, default_textStyleFontWeight, "theme.opts.textStyle.fontWeight is not: " + default_textStyleFontWeight + ". result: " + result );
         });

         it( run.Options.Description + ".opts.textStyle.fontSize should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyle.fontSize === NUMBER), "theme.opts.fontSize is not an " + NUMBER + ". result: " + typeof (run.instance).opts.textStyle.fontSize );
         });

         it( run.Options.Description + ".opts.textStyle.fontSize should be default: " + default_textStyleFontSize, function ()
         {
            let result =  (run.instance).opts.textStyle.fontSize;
            assert.equal(result, default_textStyleFontSize, "theme.opts.textStyle.fontSize is not: " + default_textStyleFontSize + ". result: " + result );
         });

         it( run.Options.Description + ".opts.textStyle.fill should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyle.fill === NUMBER), "theme.opts.stroke is not an " + NUMBER + ". result: " + typeof (run.instance).opts.textStyle.fill );
         });

         it( run.Options.Description + ".opts.textStyle.fill should be default: " + default_textStyleFill, function ()
         {
            let result =  (run.instance).opts.textStyle.fill;
            assert.equal(result, default_textStyleFill, "theme.opts.textStyle.fill is not: " + default_textStyleFill + ". result: " + result );
         });

         it( run.Options.Description + ".opts.textStyle.stroke should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyle.stroke === NUMBER), "theme.opts.stroke is not an " + NUMBER + ". result: " + typeof (run.instance).opts.textStyle.stroke );
         });

         it( run.Options.Description + ".opts.textStyle.stroke should be default: " + default_textStyleStroke, function ()
         {
            let result =  (run.instance).opts.textStyle.stroke;
            assert.equal(result, default_textStyleStroke, "theme.opts.textStyle.stroke is not: " + default_textStyleStroke + ". result: " + result );
         });

         it( run.Options.Description + ".opts.textStyle.strokeThickness should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyle.strokeThickness === NUMBER), "theme.opts.stroke is not an " + NUMBER + ". result: " + typeof (run.instance).opts.textStyle.strokeThickness );
         });

         if (run.Options.Type == 'O')
         {
            it( run.Options.Description + ".opts.textStyle.strokeThickness should be default: " + original_default_textStyleStrokeThickness, function ()
            {
               let result =  (run.instance).opts.textStyle.strokeThickness;
               assert.equal(result, original_default_textStyleStrokeThickness, "theme.opts.textStyle.strokeThickness is not: " + original_default_textStyleStrokeThickness + ". result: " + result );
            });
         }

         if (run.Options.Type == 'N')
         {
            it( run.Options.Description + ".opts.textStyle.strokeThickness should be default: " + new_default_textStyleStrokeThickness, function ()
            {
               let result =  (run.instance).opts.textStyle.strokeThickness;
               assert.equal(result, new_default_textStyleStrokeThickness, "theme.opts.textStyle.strokeThickness is not: " + new_default_textStyleStrokeThickness + ". result: " + result );
            });
         }

         it( run.Options.Description + ".opts.textStyle.miterLimit should be an " + NUMBER, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyle.miterLimit === NUMBER), "theme.opts.stroke is not an " + NUMBER + ". result: " + typeof (run.instance).opts.textStyle.miterLimit );
         });

         it( run.Options.Description + ".opts.textStyle.miterLimit should be default: " + default_textStyleMiterLimit, function ()
         {
            let result =  (run.instance).opts.textStyle.miterLimit;
            assert.equal(result, default_textStyleMiterLimit, "theme.opts.textStyle.miterLimit is not: " + default_textStyleMiterLimit + ". result: " + result );
         });

         it( run.Options.Description + ".opts.textStyle.lineJoin should be an " + STRING, function ()
         {
            assert.isTrue((typeof (run.instance).opts.textStyle.lineJoin === STRING), "theme.opts.textStyle.lineJoin is not an " + STRING + ". result: " + typeof (run.instance).opts.textStyle.lineJoin );
         });

         it( run.Options.Description + ".opts.textStyle.lineJoin should be default: " + default_textStyleLineJoin, function ()
         {
            let result =  (run.instance).opts.textStyle.lineJoin;
            assert.equal(result, default_textStyleLineJoin, "theme.opts.textStyle.lineJoin is not: " + default_textStyleLineJoin + ". result: " + result );
         });

      });
   });
});

describe("Testing setting some Theme Options during Construction", function ()
{
   runs.forEach(function (run)
   {
      it( run.Options.Description + ".opts.margin should be settable.", function ()
      {
         let newMargin = 20;
         let theme = new (run.Constructor)({"margin": newMargin});
         let result = theme.opts.margin;
         assert.equal(result, newMargin, "theme.opts.margin is incorrect. Expected: " + default_margin + ". result: " + result );
      });

      it( run.Options.Description + ".opts.primaryColor should be settable.", function ()
      {
         let newPrimaryColor = 0xfefefe;
         let theme = new (run.Constructor)({"primaryColor": newPrimaryColor});
         let result = theme.opts.primaryColor;
         assert.equal(result, newPrimaryColor, "theme.opts.primaryColor is incorrect. Expected: " + default_primaryColor + ". result: " + result );
      });

      it( run.Options.Description + ".opts.textStyle.fill should be settable.", function ()
      {
         let newTextStyleFill = 0xfefefe;
         let newTextStyle: PIXI.textStyle = {"fill": newTextStyleFill};
         let theme = new (run.Constructor)({"textStyle": newTextStyle});

         let result = theme.opts.textStyle.fill;
         assert.equal(result, newTextStyleFill, "theme.opts.textStyle.fill is incorrect. Expected: " + newTextStyleFill + ". result: " + result );

         assert.equal(theme.opts.textStyle.fontWeight, default_textStyleFontWeight, "theme.opts.textStyle.fontWeight was changed. Expected: " + default_textStyleFontWeight + ". result: " + theme.opts.textStyle.fontWeight );
      });

   });
});
