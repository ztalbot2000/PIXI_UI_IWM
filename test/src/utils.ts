'use strict';

interface IRunOptions
{
   Description: string;
   Type: string;
}
interface IRunFunction
{
   Proc: Function;
   Options: IRunOptions;
}
interface IRunClass
{
   Constructor: Function;
   instance: object;
   Options: IRunOptions;
}
interface IRunStaticClassMember
{
   ClassName: Class;
   Options: IRunOptions;
}

import  { isEmpty, uuid, lerp, sample, debounce, getId, randomInt, randomFloat, Dates, Colors, Cycle, Points, Sets, Angle, Elements, Polygon, Rect, Strings } from '../../src/utils';

var original_isEmpty = null; var original_uuid = null; var original_lerp = null; var original_sample = null; var original_debounce = null; var original_getId = null; var original_randomInt = null; var original_randomFloat = null; var Original_Dates = null; var Original_Colors = null; var Original_Cycle = null; var Original_Points = null; var Original_Sets = null; var Original_Angle = null; var Original_Elements = null; var Original_Polygon = null; var Original_Rect = null; var Original_Strings = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      let r = require( '../originalSrc/utils.js');
      original_isEmpty = r.isEmpty
      original_uuid = r.uuid
      original_lerp = r.lerp
      original_sample = r.sample
      original_debounce = r.debounce
      original_getId = r.getId
      original_randomInt = r.randomInt
      original_randomFloat = r.randomFloat
      Original_Dates = r.Dates
      Original_Colors = r.Colors
      Original_Cycle = r.Cycle
      Original_Points = r.Points
      Original_Sets = r.Sets
      Original_Angle = r.Angle
      Original_Elements = r.Elements
      Original_Polygon = r.Polygon;
      Original_Rect = r.Rect;
      Original_Strings = r.Strings;
   } catch (e)
   {
      if ( e instanceof Error && e.code === "MODULE_NOT_FOUND" )
        console.log( "Can't load ../originalSrc/iwmlib/lib/utils.js!" );
      else
        throw e;
   }
} else {
  console.log("COMPARE is undefined. Not doing old Utils testing");
}

// The driver of what will be tested for the Utils code
let run_isEmpty: IRunFunction = [ { Proc: isEmpty,
      Options: {Description: "isEmpty (New)           ", Type: 'N'} } ];
let run_uuid: IRunFunction = [ { Proc: uuid,
      Options: {Description: "uuid (New)              ", Type: 'N'} } ];
let run_lerp:IRunFunction = [ { Proc: lerp,
      Options: {Description: "lerp (New)              ", Type: 'N'} } ];
let run_sample: IRunFunction = [ { Proc: sample,
      Options: {Description: "sample (New)            ", Type: 'N'} } ];
let run_debounce: IRunFunction = [ { Proc: debounce,
      Options: {Description: "debounce (New)          ", Type: 'N'} } ];
let run_getId: IRunFunction = [ { Proc: getId,
      Options: {Description: "getId (New)             ", Type: 'N'} } ];
let run_randomInt: IRunFunction = [ { Proc: randomInt,
      Options: {Description: "randomInt (New)         ", Type: 'N'} } ];
let run_randomFloat: IRunFunction = [ { Proc: randomFloat,
      Options: {Description: "randomFloat (New)       ", Type: 'N'} } ];
let run_Dates: IRunStaticClassMember = [ { ClassName: Dates,
      Options: {Description: "Dates (New)             ", Type: 'N'} } ];
let run_Colors: IRunStaticClassMember = [ { ClassName: Colors,
      Options: {Description: "Colors (New)              ", Type: 'N'} } ];
let run_Cycle: IRunClass = [ { Constructor: Cycle, instance: null,
      Options: {Description: "Cycle (New)              ", Type: 'N'} } ];
let run_Points: IRunStaticClassMember = [ { ClassName: Points,
      Options: {Description: "Points (New)              ", Type: 'N'} } ];
let run_Sets: IRunStaticClassMember = [ { ClassName: Sets,
      Options: {Description: "Sets (New)              ", Type: 'N'} } ];
let run_Angle: IRunStaticClassMember = [ { ClassName: Angle,
      Options: {Description: "Angle (New)             ", Type: 'N'} } ];
let run_Elements: IRunStaticClassMember = [ { ClassName: Elements,
      Options: {Description: "Elements (New)          ", Type: 'N'} } ];
let run_Polygon: IRunClass = [ { Constructor: Polygon, instance: null,
      Options: {Description: "Polygon (New)           ", Type: 'N'} } ];
let run_Rect: IRunStaticClassMember = [ { ClassName: Rect,
      Options: {Description: "Rect (New)              ", Type: 'N'} } ];
let run_Strings: IRunStaticClassMember = [ { ClassName: Strings,
      Options: {Description: "Strings (New)           ", Type: 'N'} } ];


// The driver of what will be tested for the old Utils code (if available to test)
// COMPARE_ORIGINAL is defined in package.json and checked in pixi.setup.js
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   run_isEmpty.unshift( { Proc: original_isEmpty,
      Options: {Description: "isEmpty (Original)      ", Type: 'O'} } );
   run_uuid.unshift( { Proc: original_uuid,
      Options: {Description: "uuid (Original)         ", Type: 'O'} } );
   run_lerp.unshift( { Proc: original_lerp,
      Options: {Description: "lerp (Original)         ", Type: 'O'} } );
   run_sample.unshift( { Proc: original_sample,
      Options: {Description: "sample (Original)       ", Type: 'O'} } );
   run_debounce.unshift( { Proc: original_debounce,
      Options: {Description: "debounce (Original)     ", Type: 'O'} } );
   run_getId.unshift( { Proc: original_getId,
      Options: {Description: "getId (Original)        ", Type: 'O'} } );
   run_randomInt.unshift( { Proc: original_randomInt,
      Options: {Description: "randomInt (Original)    ", Type: 'O'} } );
   run_randomFloat.unshift( { Proc: original_randomFloat,
      Options: {Description: "randomFloat (Original)  ", Type: 'O'} } );
   run_Dates.unshift( { ClassName: Original_Dates,
      Options: {Description: "Dates (Original)        ", Type: 'O'} } );
   run_Colors.unshift( { ClassName: Original_Colors,
      Options: {Description: "Colors (Original)       ", Type: 'O'} } );
   run_Cycle.unshift( { Constructor: Original_Cycle, instance: null,
      Options: {Description: "Cycle (Original)        ", Type: 'O'} } );
   run_Points.unshift( { ClassName: Original_Points,
      Options: {Description: "Points (Original)       ", Type: 'O'} } );
   run_Sets.unshift( { ClassName: Original_Sets,
      Options: {Description: "Sets (Original)         ", Type: 'O'} } );
   run_Angle.unshift( { ClassName: Original_Angle,
      Options: {Description: "Angle (Original)        ", Type: 'O'} } );
   run_Elements.unshift( { ClassName: Original_Elements,
      Options: {Description: "Elements (Original)     ", Type: 'O'} } );
   run_Polygon.unshift( { Constructor: Original_Polygon, instance: null,
      Options: {Description: "Polygon (Original)      ", Type: 'O'} } );
   run_Rect.unshift( { ClassName: Original_Rect,
      Options: {Description: "Rect (Original)         ", Type: 'O'} } );
   run_Strings.unshift( { ClassName: Original_Strings,
      Options: {Description: "Strings (Original)      ", Type: 'O'} } );
}

before(function()
{
   console.log("   Utils Setup (Before) - Run Consructors only");

   run_Cycle.forEach(function ( run, index, arr )
   {
      it( run.Options.Description + " Constructor should not be null", function ()
      {
         assert.isNotNull(run.Constructor, "constructor is " + run.Constructor );
      });

      it( run.Options.Description + " Creating instance to be used should not be null", function ()
      {
         arr[index].instance = new ( run.Constructor ) ();
         assert.isNotNull(arr[index].instance, "instance resulted in null");
      });
   });

   run_Polygon.forEach(function ( run, index, arr )
   {
      it( run.Options.Description + " Constructor should not be null", function ()
      {
         assert.isNotNull(run.Constructor, "constructor is " + run.Constructor );
      });

      it( run.Options.Description + " Creating instance to be used should not be null", function ()
      {
         arr[index].instance = new ( run.Constructor ) ();
         assert.isNotNull(arr[index].instance, "instance resulted in null");
      });
   });

});


describe("Testing Definitions", function ()
{
   describe("Testing Utils Function Definitions", function ()
   {
      run_isEmpty.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " should be a " + FUNCTION, function ()
         {
            assert.isTrue((typeof run.Proc === FUNCTION), "utils.isEmpty is not an " + FUNCTION + ". result: " + typeof run.Proc );
         });

      });

      run_uuid.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " should be a " + FUNCTION, function ()
         {
            assert.isTrue((typeof run.Proc === FUNCTION), "utils.uuid is not an " + FUNCTION + ". result: " + typeof run.Proc );
         });
      });

      run_lerp.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " should be a " + FUNCTION, function ()
         {
            assert.isTrue((typeof run.Proc === FUNCTION), "utils.lerp is not an " + FUNCTION + ". result: " + typeof run.Proc );
         });
      });

      run_sample.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " should be a " + FUNCTION, function ()
         {
            assert.isTrue((typeof run.Proc === FUNCTION), "utils.sample is not an " + FUNCTION + ". result: " + typeof run.Proc );
         });
      });

      run_debounce.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " should be a " + FUNCTION, function ()
         {
            assert.isTrue((typeof run.Proc === FUNCTION), "utils.debounce is not an " + FUNCTION + ". result: " + typeof run.Proc );
         });
      });

      run_getId.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " should be a " + FUNCTION, function ()
         {
            assert.isTrue((typeof run.Proc === FUNCTION), "utils.getdId is not an " + FUNCTION + ". result: " + typeof run.Proc );
         });
      });

      run_randomInt.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " should be a " + FUNCTION, function ()
         {
            assert.isTrue((typeof run.Proc === FUNCTION), "utils.randomInt is not an " + FUNCTION + ". result: " + typeof run.Proc );
         });
      });

      run_randomFloat.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " should be a " + FUNCTION, function ()
         {
            assert.isTrue((typeof run.Proc === FUNCTION), "utils.randomFloat is not an " + FUNCTION + ". result: " + typeof run.Proc );
         });
      });

      run_Polygon.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Polygon", function ()
         {
            expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
            assert.isNotNull((typeof arr[index].instance), "utils.Polygon instance is null result: " + typeof arr[index].instance );
         });
      });
   });
});

describe("Testing Functionality", function ()
{
   describe("Testing isEmpty functionality", function ()
   {
      let emptyArray = [];
      let emptyTuple = {};
      let arrayOfLength3 = [ 1, 2, 3 ];
      let tupleOfLength3 = { "one": 1, "two": 2, "three": 3 };
      run_isEmpty.forEach(function ( run, index )
      {
         it( run.Options.Description + " should return true if array is empty" , function ()
         {
            let result = (run.Proc)( emptyArray )
            assert.isTrue(result, "utils.isEmpty is not empty. result: " + result );
         });
         it( run.Options.Description + " should return false if array is not empty" , function ()
         {
            let result = (run.Proc)( arrayOfLength3 )
            assert.isFalse(result, "utils.isEmpty is not false. result: " + result );
         });
         it( run.Options.Description + " should return true if tuple is empty" , function ()
         {
            let result = (run.Proc)( emptyTuple )
            assert.isTrue(result, "utils.isEmpty is not empty. result: " + result );
         });
         it( run.Options.Description + " should return false if tuple is not empty" , function ()
         {
            let result = (run.Proc)( tupleOfLength3 )
            assert.isFalse(result, "utils.isEmpty is not false. result: " + result );
         });
      });
   });
   describe("Testing uuid functionality", function ()
   {
      run_uuid.forEach(function ( run, index )
      {
         let result = (run.Proc)( )
         it( run.Options.Description + " should return a string" , function ()
         {
            assert.isString(result, "utils.uuid did not return a string. result: " + typeof result );
         });
         it( run.Options.Description + " return strings length should be 36" , function ()
         {
            assert.equal(result.length, 36, "utils.uuid did not return a string. result: " + typeof result );
         });
         it( run.Options.Description + " return string[14] must equal '4'" , function ()
         {
            let pos = result.charAt(14);
            assert.equal(pos, "4", "utils.uuid did not return correct result: " + pos );
         });
         it( run.Options.Description + " return string[19] must equal '[8-f]'" , function ()
         {
            let pos = result.charAt(19);
            expect(pos).to.be.oneOf(['8', '9', 'a', 'b', 'c', 'd', 'e', 'f'], "utils.uuid did not return correct result: " + pos);
         });
         it( run.Options.Description + " return string must have '-' correctly" , function ()
         {
            let pos = result.charAt(8);
            assert.equal(pos, "-", "utils.uuid[8] did not return correct result: " + pos );
            let pos = result.charAt(13);
            assert.equal(pos, "-", "utils.uuid[13] did not return correct result: " + pos );
            let pos = result.charAt(18);
            assert.equal(pos, "-", "utils.uuid[16] did not return correct result: " + pos );
            let pos = result.charAt(23);
            assert.equal(pos, "-", "utils.uuid[23] did not return correct result: " + pos );
         });
         it( run.Options.Description + " remaining characters must equal '[0-f]'" , function ()
         {
            for (let index = 0; index <36; index ++ )
            {
               if ( index == 8 ) continue;  // -
               if ( index == 13 ) continue;  // -
               if ( index == 16 ) continue;  // -
               if ( index == 18 ) continue;  // -
               if ( index == 23 ) continue;  // -

               let pos = result.charAt( index );

               expect(pos).to.be.oneOf(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'], "utils.uuid did not return correct result at index: " + index + " for uuid: " + result + " . found pos:" + pos);
             }
         });
      });
   });
   describe("Testing Dates functionality", function ()
   {
      run_Dates.forEach(function ( run, index )
      {
         it( "Dates.create of YYYY/MM/DD should create the same Date" , function ()
         {
            let year = 1964;
            let month = 6;
            let day = 21;
            let result =  ( run.ClassName ).create(year, month, day);

            expect((result)).to.be.an.instanceof( Date, "Dates instance resulted in null " + result);

            assert.equal(result.getFullYear(), year, "utils.Date.year is incorrect. Date: " + result );
            assert.equal(result.getMonth(), 6, "utils.Date.month is incorrect. Date: " + result );
            assert.equal(result.getDate(), day-1, "utils.Date.date is incorrect. Date: " + result );
         });

         it( "Dates.daysInMonth of 2020/02/01 should be the same. (29)" , function ()
         {
            let year = 2020;
            let month = 2;
            let day = 1;
            let date = ( run.ClassName ).create(year, month, day);

            expect((date)).to.be.an.instanceof( Date, "Dates instance resulted in null " + date);

            let result = ( run.ClassName ).daysInMonth( date );

            // Feb of 2020 has 29 days
            assert.equal(result, 29, "utils.Date.daysInMonth is incorrect. Date: " + result );
         });
         it( "Dates.daysInMonth of 2026/02/01 should be the same. (28)" , function ()
         {
            let year = 2026;
            let month = 2;
            let day = 1;
            let date = ( run.ClassName ).create(year, month, day);

            expect((date)).to.be.an.instanceof( Date, "Dates instance resulted in null " + date);

            let result = ( run.ClassName ).daysInMonth( date );

            // Feb of 2026 has 29 days (Counted from 1, so subtract 1)
            assert.equal(result, 28, "utils.Date.daysInMonth is incorrect. Date: " + result );
         });
         it( "Dates.startYearRange of 2022/08/01 should be the same." ,    function ()
         {
            let year = 2022;
            let month = 8;
            let day = 22;

            let date = ( run.ClassName ).create(year, month, day);

            expect((date)).to.be.an.instanceof( Date, "Dates instance resulted in null " + date);

            let result = ( run.ClassName ).startYearRange( date );


            // Feb of 2026 has 29 days
            assert.equal(result.getYear(), 121, "utils.Date.startYearRange is incorrect. Date: " + result );
         });
         it( "Dates.endYearRange of 2022/08/01 should be the same." , function ()
         {
            let year = 2022;
            let month = 8;
            let day = 1;

            let date = ( run.ClassName ).create(year, month, day);

            expect((date)).to.be.an.instanceof( Date, "Dates instance resulted in null " + date);

            let result = ( run.ClassName ).endYearRange( date );


            // Feb of 2026 has 29 days
            assert.equal(result.getYear(), 122, "utils.Date.endYearRange is incorrect. Date: " + result );
         });
         it( "Dates.prevYear of 2027/12/30, -2 should be the same." , function ()
         {
            let year = 2027;
            let month = 12;
            let day = 30;

            let date = ( run.ClassName ) .create(year, month, day);

            expect((date)).to.be.an.instanceof( Date, "Dates instance resulted in null " + date);

            let result = ( run.ClassName ).prevYear( date, -2 );


            // Feb of 2026 has 29 days
            assert.equal(result.getYear(), 129, "utils.Date.prevYear is incorrect. Date: " + result );

         });
         it( "Dates.nextYear of 1997/12/30, 2 should be the same." , function ()
         {
            let year = 1997;
            let month = 12;
            let day = 30;

            let date = ( run.ClassName ).create(year, month, day);

            expect((date)).to.be.an.instanceof( Date, "Dates instance resulted in null " + date);

            let result = ( run.ClassName ).nextYear( date, 2 );

            //
            assert.equal(result.getYear(), 99, "utils.Date.nextYear is incorrect. Date: " + result );
         });
         it( "Dates.nextDay of 1997/12/30 should be the same." , function ()
         {
            let year = 1997;
            let month = 12;
            let day = 30;

            let date = ( run.ClassName ).create(year, month, day);

            expect((date)).to.be.an.instanceof( Date, "Dates instance resulted in null " + date);

            let result = ( run.ClassName ).nextDay( date );

            // Feb of 2026 has 29 days
            assert.equal(result.getYear(), 98, "utils.Date.nextYear is incorrect. Date: " + result );

            assert.equal(result.getFullYear(), year +1, "utils.Date.year is incorrect. Date: " + result );
            assert.equal(result.getMonth(), 0, "utils.Date.month is incorrect. Date: " + result );
            assert.equal(result.getDate(), day-1, "utils.Date.date is incorrect. Date: " + result );


         });
      });
   });
   describe("Testing Colors functionality", function ()
   {
      run_Colors.forEach(function ( run, index, arr )
      {
         it( "Color rgb2num of red:12, green:121, blue: 75 should create the same number" , function ()
         {
            let red = 12;
            let green = 121;
            let blue = 75;
            let result =  ( run.ClassName ).rgb2num(red, green, blue);

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 817483, "rgb2num is incorrect. result: " + result );
         });
         it( "Color rgb2hex of red:12, green:121, blue: 75 should create the same number" , function ()
         {
            let red = 12;
            let green = 121;
            let blue = 75;
            let result =  ( run.ClassName ).rgb2hex(red, green, blue);

            // Cannot check instanceof as string is a primative
            // type not a Class object
            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.a( 'string' );

            assert.equal(result, '#0c794b', "rgb2hex is incorrect. result: " + result );
         });
         it( "Color hex2rgb of 0x24140f: 75 should create the same rgb" , function ()
         {
            let hex = "#24150f";
            let result =  ( run.ClassName ).hex2rgb(hex);

            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.an.instanceof( Array );

            expect(result, "Color hex2rb is incorrect " + result ).to.eql( [ 36, 21, 15] );
         });
         it( "Color rgb of 36, 21, 15 should create the same rgb" , function ()
         {
            let red = 36;
            let green = 21;
            let blue = 15;
            let result =  ( run.ClassName ).rgb( red, green, blue );

            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.an.instanceof( Object );
            expect(result, "Color rgb is incorrect " + result ).to.eql( { r:36, g:21, b:15 } );
         });

         it( "Color lerp of rgb1:12, rgb2:121 should create the same number" , function ()
         {
            let rgb1 = { r: 12, g: 15, b: 2 };
            let rgb2 = { r: 35, g: 17, b: 3 };
            let amt1 = 3;
            let amt2 = 4;

            let result =  ( run.ClassName ).lerp(rgb1, rgb2, amt1, amt2);

            expect(result, "lerp resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "Color lerp is incorrect " + result ).to.eql( { r:81, g:21, b:5 } );
         });

         it( "Color violet should create the same rgb2num" , function ()
         {
            let result =  ( run.ClassName ).violet();

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 5841539, "violet is incorrect. result: " + result );
         });

         it( "Color steelblue should create the same rgb2num" , function ()
         {
            let result =  ( run.ClassName ).steelblue();

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 33444, "steelblue is incorrect. result: " + result );
         });

         it( "Color ochre should create the same rgb2num" , function ()
         {
            let result =  ( run.ClassName ).violet();

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 5841539, "ochre is incorrect. result: " + result );
         });

         it( "Color turquoise should create the same rgb2num" , function ()
         {
            let result =  ( run.ClassName ).turquoise();

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 2270339, "turquoise is incorrect. result: " + result );
         });

         it( "Color eminence should create the same rgb2num" , function ()
         {
            let result =  ( run.ClassName ).eminence();

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 9845894, "eminence is incorrect. result: " + result );
         });
         it( "Color random should create the same rgb2num" , function ()
         {
            let result =  ( run.ClassName ).random();

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Color instance resulted is incorrect " + typeof result ).to.be.a( 'number' );
            });
      });
   });

   describe("Testing Cycle functionality", function ()
   {
      run_Cycle.forEach(function ( run, index, arr )
      {
         it( "Cycle new should create the same Array" , function ()
         {
            let red = 12;
            let green = 121;
            let blue = 75;
            let result =  new ( run.Constructor )( 15, 10, 5, 0 );

            expect(result, "Cycle instance resulted is incorrect " + typeof result ).to.be.an.instanceof( Array );

            expect(result, "Cycle result is incorrect " + result ).to.eql( [ 15, 10, 5, 0 ] );
         });
      });
   });
   describe("Testing Points functionality", function ()
   {
      run_Points.forEach(function ( run, index, arr )
      {
         it( "Points pointLength should create the same result" , function ()
         {
            let point: Point = { x: 15, y: 20 };

            if ( index == 0 )
               let result =  ( run.ClassName ).length( point );
            else if ( index == 1 )
               let result =  ( run.ClassName ).pointLength( point );
            else
               throw("Error: Cant index into Points.pointLength typescript VS length Javascript");

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Points result is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 25, "pointLength is incorrect. result: " + result );
         });
         it( "Points normalize should create the same result" , function ()
         {
            let point: Point = { x: 3, y: 4 };

            let result =  ( run.ClassName ).normalize( point );

            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "normalize result is incorrect " + result ).to.eql( { x: 0.6000000000000001, y: 0.8 } );
         });

         it( "Points mean should create the same result" , function ()
         {
            let point1: Point = { x: 3, y: 4 };
            let point2: Point = { x: 12, y: 15 };

            let result =  ( run.ClassName ).mean( point1, point2 );

            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "mean result is incorrect " + result ).to.eql( { x: 7.5, y: 9.5 } );
         });

         it( "Points subtract should create the same result" , function ()
         {
            let point1: Point = { x: 3, y: 4 };
            let point2: Point = { x: 12, y: 15 };

            let result =  ( run.ClassName ).subtract( point1, point2 );

            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "subtract result is incorrect " + result ).to.eql( { x: -9, y: -11 } );
         });

         it( "Points multiply should create the same result" , function ()
         {
            let point1: Point = { x: 3, y: 4 };
            let point2: Point = { x: 12, y: 15 };

            let result =  ( run.ClassName ).multiply( point1, point2 );

            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "multiply result is incorrect " + result ).to.eql( { x: 36, y: 60 } );
         });

         it( "Points divide should create the same result" , function ()
         {
            let point1: Point = { x: 12, y: 60 };
            let point2: Point = { x: 4, y: 3 };

            let result =  ( run.ClassName ).divide( point1, point2 );

            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "subtract result is incorrect " + result ).to.eql( { x: 3, y: 20 } );
         });

         it( "Points multplyScalar should create the same result" , function ()
         {
            let point1: Point = { x: 12, y: 60 };

            let result =  ( run.ClassName ).multiplyScalar( point1, 3 );

            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "multiplyScalar result is incorrect " + result ).to.eql( { x: 36, y: 180 } );
         });

         it( "Points add should create the same result" , function ()
         {
            let point1: Point = { x: 12, y: 60 };
            let point2: Point = { x: 4, y: 3 };

            let result =  ( run.ClassName ).add( point1, point2 );

            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "add result is incorrect " + result ).to.eql( { x: 16, y: 63 } );
         });

         it( "Points negate should create the same result" , function ()
         {
            let point: Point = { x: 12, y: 60 };

            let result =  ( run.ClassName ).negate( point );

            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "negate result is incorrect " + result ).to.eql( { x: -12, y: -60 } );
         });

         it( "Points angle should create the same result" , function ()
         {
            let point1: Point = { x: 12, y: 60 };
            let point2: Point = { x: 4, y: 3 };

            let result =  ( run.ClassName ).angle( point1, point2 );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'number' );

            expect(result, "angle result is incorrect " + result ).to.equal(  1.431356269703559 );
         });
//here

         it( "Points normalizedAngle should create the same result" , function ()
         {
            let point1: Point = { x: 12, y: 60 };
            let point2: Point = { x: 4, y: 3 };

            let result =  ( run.ClassName ).normalizedAngle( point1, point2 );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'number' );

            expect(result, "normalizedAngle result is incorrect " + result ).to.equal(  1.431356269703559 );
         });

         it( "Points normalized2Angle should create the same result" , function ()
         {
            let point1: Point = { x: 12, y: 60 };
            let point2: Point = { x: 4, y: 3 };

            let result =  ( run.ClassName ).normalized2Angle( point1, point2 );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'number' );

            expect(result, "normalized2Angle result is incorrect " + result ).to.equal(  1.431356269703559 );
         });

         it( "Points arc should create the same result" , function ()
         {
            let point: Point = { x: 12, y: 60 };
            let alpha = 0.1;
            let radius = 30;

            let result =  ( run.ClassName ).arc( point, alpha, radius );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'object' );

            expect(result, "arc result is incorrect " + result ).to.eql( {x: 41.85012495834077, y: 62.99500249940485 } );
         });

         it( "Points distance should create the same result" , function ()
         {
            let point1: Point = { x: 12, y: 60 };
            let point2: Point = { x: 4, y: 3 };

            let result =  ( run.ClassName ).distance( point1, point2 );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Points resulted is incorrect " + typeof result ).to.be.a( 'number' );

            expect(result, "distance result is incorrect " + result ).to.equal(  57.55866572463264 );
         });
         it( "Points fromPageToNode should create the same result" , function ()
         {
         });
         it( "Points fromNodeToPage should create the same result" , function ()
         {
         });
      });
   });

   describe("Testing Sets functionality", function ()
   {
      run_Sets.forEach(function ( run, index, arr )
      {
         it( "Sets intersect should create the same result" , function ()
         {
            let set: Set = new Set( [ 3, 2, 3, 4 ] );

            let expectedSet =  new Set();
            expectedSet.add(3);
            expectedSet.add(2);
            expectedSet.add(4);


            let result =  ( run.ClassName ).intersect( set );


            expect(result, "Set instance resulted is incorrect " + typeof result ).to.be.an.instanceof( Set );
            expect(result, "Set intersect is incorrect " + result ).to.eql( expectedSet );
         });
         it( "Sets union should create the same result" , function ()
         {
         });
         it( "Sets difference should create the same result" , function ()
         {
         });
      });
   });

   describe("Testing Angle functionality", function ()
   {
      run_Angle.forEach(function ( run, index, arr )
      {
         it( "Angle normalize should create the same result" , function ()
         {
            let angle: Number = 22;

            let result =  ( run.ClassName ).normalize( angle );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Angle resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, -3.132741228718345, "normalize is incorrect. result: " + result );
         });
         it( "Angle normalize2 (TAI) should create the same result" , function ()
         {
            let angle: Number = 22;

            let result =  ( run.ClassName ).normalize2( angle );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Angle resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 3.1504440784612413, "normalize2 is incorrect. result: " + result );
         });

         it( "Angle normalizeDegree of > 180 should create the same result" , function ()
         {
            let angle: Number = 190;

            let result =  ( run.ClassName ).normalizeDegree( angle );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Angle resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, -170, "normalizeDegree is incorrect. result: " + result );
         });

         it( "Angle diff should create the same result" , function ()
         {
            let result =  ( run.ClassName ).diff( 16, 142 );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Angle resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, -0.3362938564082704, "diff is incorrect. result: " + result );
         });

         it( "Angle degree2Radian should create the same result" , function ()
         {
            let result =  ( run.ClassName ).degree2radian( 32.5 );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Angle resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 0.5672320068981571, "degree2Radian is incorrect. result: " + result );
         });

         it( "Angle radian2degree should create the same result" , function ()
         {
            let result =  ( run.ClassName ).radian2degree( .5 );

            // Cannot check instanceof as number is a primative
            // type not a Class object
            expect(result, "Angle resulted is incorrect " + typeof result ).to.be.a( 'number' );

            assert.equal(result, 28.64788975654116, "radian2Degree is incorrect. result: " + result );
         });
      });
   });

   // Intricate
   describe("Testing Elements functionality", function ()
   {
      run_Elements.forEach(function ( run, index, arr )
      {
         it( "Elements setStyle should create the same result" , function ()
         {
         });
         it( "Elements addClass should create the same result" , function ()
         {
         });
         it( "Elements removeClass should create the same result" , function ()
         {
         });
         it( "Elements toggleClass should create the same result" , function ()
         {
         });
         it( "Elements hasClass should create the same result" , function ()
         {
         });
      });
   });

   // Not supported at this time
   describe("Testing MapProxy functionality", function ()
   {
      // run_MapProxy.forEach(function ( run, index, arr )
      // {
      //    it( run.Options.Description + " Created instance should be an instance of MapProxy", function ()
      //    {
      //    expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
      //       assert.isNotNull((typeof run.arr[index]), "utils.MapProxy instance is null result: " + typeof arr[index].instance );
      //    });
      // });
   });

   describe("Testing DOm Rect functionality for DomRect (x:1,y:1,left:1,right:5,top:5,bottom:10)", function ()
   {
      run_Rect.forEach(function ( run, index )
      {
         it( run.Options.Description + " contains point(x:3, y:7)" , function ()
         {
             // P.x is between left and R.x + R.right
             // P.y is between R.top & R.bottom
             let DOMrect = {x: 1, y:1, left: 1, right:5, top:5, bottom: 10};
             let point = {x: 3, y:7};
             let result = (run.ClassName).contains(DOMrect, point);
             assert.isTrue(result, "utils.Rect.contains point(" + point.x + "," + point.y + "). Px is supposed to be between R.left: " + DOMrect.left + " & " + DOMrect.x + DOMrect.right + " Py is between R.top: " + DOMrect.top + " & R.bottom: " + DOMrect.bottom );
         });

         it( run.Options.Description + " does not contain point(x:3, y:3)" , function ()
         {
             // P.x is between left and R.x + R.right
             // P.y is between R.top & R.bottom
             let DOMrect = {x: 1, y:1, left: 1, right:5, top:5, bottom: 10};
             let point = {x: 3, y:3};
             let result = (run.ClassName).contains(DOMrect, point);
             assert.isFalse(result, "utils.Rect.contains point(" + point.x + "," + point.y + "). Px is supposed to be between R.left: " + DOMrect.left + " & " + DOMrect.x + DOMrect.right + " Py is between R.top: " + DOMrect.top + " & R.bottom: " + DOMrect.bottom );
         });
      });
   });
   describe("Testing Strings functionality", function ()
   {
      run_Strings.forEach(function ( run, index )
      {
         it( run.Options.Description + " toLowerCaseFirstChar uppercases first char" , function ()
         {
            let testString = "IMHO Who?";
            let expectedResult = "iMHO Who?";
            let result = (run.ClassName).toLowerCaseFirstChar( testString );
            assert.equal(result, expectedResult, "  Expected result: " + expectedResult  + " not equal to result: " + result);
         });

         it( run.Options.Description + " toUpperCaseFirstChar Lowercases first char" , function ()
         {
            let testString = "imHO who??";
            let expectedResult = "ImHO who??";
            let result = (run.ClassName).toUpperCaseFirstChar( testString );
            assert.equal(result, expectedResult, "  Expected result: " + expectedResult  + " not equal to result: " + result);
         });

         it( run.Options.Description + " toUpperCaseEachWord uppers each first word" , function ()
         {
            let testString     = "eise The buy who-builds the boat";
            let expectedResult = "Eise The Buy Who-builds The Boat";

            let result =  ( run.ClassName ).toUpperCaseEachWord( testString );

            assert.equal(result, expectedResult, "  Expected result: " + expectedResult  + " not equal to result: " + result);
         });

         it( run.Options.Description + " toLowerCaseEachWord lowers each first word" , function ()
         {
            let testString     = "Eise The Buy Who-Builds The Boat";
            let expectedResult = "eise the buy who-Builds the boat";

            let result =  ( run.ClassName ).toLowerCaseEachWord( testString );

            assert.equal(result, expectedResult, "  Expected result: " + expectedResult  + " not equal to result: " + result);
         });
      });
   });
});
