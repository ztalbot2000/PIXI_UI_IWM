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

import  { isEmpty, uuid, lerp, sample, debounce, getId, randomInt, randomFloat, Dates, Colors, Cycle, Points, Sets, Angle, Elements, Polygon, Rect, Strings } from '../../src/utils';

var original_isEmpty = null; var original_uuid = null; var original_lerp = null; var original_sample = null; var original_debounce = null; var original_getId = null; var original_randomInt = null; var original_randomFloat = null; var Original_Dates = null; var Original_Colors = null; var Original_Cycle = null; var Original_Points = null; var Original_Sets = null; var Original_Angle = null; var Original_Elements = null; var Original_Polygon = null; var Original_Rect = null; var Original_Strings = null;

// To compare old code with behaviour of new code
if ( typeof COMPARE_ORIGINAL !== 'undefined' )
{
   try {
      //let r = require( '../originalSrc/iwmlib/lib/utils.js');
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
let run_uuid: IRunFunction = [
   { Proc: uuid,
      Options: {Description: "uuid (New)              ", Type: 'N'} } ];
let run_lerp:IRunFunction = [
   { Proc: lerp,
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
let run_Dates: IRunClass = [ { Constructor: Dates, instance: null,
      Options: {Description: "Dates (New)             ", Type: 'N'} } ];
let run_Colors: IRunClass = [ { Constructor: Colors, instance: null,
      Options: {Description: "Colors (New)            ", Type: 'N'} } ];
let run_Cycle: IRunClass = [ { Constructor: Cycle, instance: null,
      Options: {Description: "Cycle (New)             ", Type: 'N'} } ];
let run_Points: IRunClass = [ { Constructor: Points, instance: null,
      Options: {Description: "Points (New)            ", Type: 'N'} } ];
let run_Sets: IRunClass = [ { Constructor: Sets, instance: null,
      Options: {Description: "Sets (New)              ", Type: 'N'} } ];
let run_Angle: IRunClass = [ { Constructor: Angle, instance: null,
      Options: {Description: "Angle (New)             ", Type: 'N'} } ];
let run_Elements: IRunClass = [ { Constructor: Elements, instance: null,
      Options: {Description: "Elements (New)          ", Type: 'N'} } ];
let run_Polygon: IRunClass = [ { Constructor: Polygon, instance: null,
      Options: {Description: "Polygon (New)           ", Type: 'N'} } ];
let run_Rect: IRunClass = [ { Constructor: Rect, instance: null,
      Options: {Description: "Rect (New)              ", Type: 'N'} } ];
let run_Strings: IRunClass = [ { Constructor: Strings, instance: null,
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
   run_Dates.unshift( { Constructor: Original_Dates, instance: null,
      Options: {Description: "Dates (Original)        ", Type: 'O'} } );
   run_Colors.unshift( { Constructor: Original_Colors, instance: null,
      Options: {Description: "Colors (Original)       ", Type: 'O'} } );
   run_Cycle.unshift( { Constructor: Original_Cycle, instance: null,
      Options: {Description: "Cycle (Original)        ", Type: 'O'} } );
   run_Points.unshift( { Constructor: Original_Points, instance: null,
      Options: {Description: "Points (Original)       ", Type: 'O'} } );
   run_Sets.unshift( { Constructor: Original_Sets, instance: null,
      Options: {Description: "Sets (Original)         ", Type: 'O'} } );
   run_Angle.unshift( { Constructor: Original_Angle, instance: null,
      Options: {Description: "Angle (Original)        ", Type: 'O'} } );
   run_Elements.unshift( { Constructor: Original_Elements, instance: null,
      Options: {Description: "Elements (Original)     ", Type: 'O'} } );
   run_Polygon.unshift( { Constructor: Original_Polygon, instance: null,
      Options: {Description: "Polygon (Original)      ", Type: 'O'} } );
   run_Rect.unshift( { Constructor: Original_Rect, instance: null,
      Options: {Description: "Rect (Original)         ", Type: 'O'} } );
   run_Strings.unshift( { Constructor: Original_Strings, instance: null,
      Options: {Description: "Strings (Original)      ", Type: 'O'} } );
}

before(function()
{
   console.log("   Utils Setup (Before)");

   run_Dates.forEach(function (run, index, arr)
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

   run_Colors.forEach(function ( run, index, arr )
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

   run_Points.forEach(function ( run, index, arr )
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

   run_Sets.forEach(function ( run, index, arr )
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

   run_Angle.forEach(function ( run, index, arr )
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
   run_Elements.forEach(function ( run, index, arr )
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
   run_Rect.forEach(function ( run, index, arr )
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
   run_Strings.forEach(function ( run, index, arr )
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


describe("Testing Utils", function ()
{
   describe("Testing Utils Definitions", function ()
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

      run_Dates.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Dates", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Dates instance is null result: " + typeof arr[index].instance );
         });
      });

      run_Colors.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Colors", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Colors instance is null result: " + arr[index].instance );
         });
      });

      run_Cycle.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Cycle", function ()
         {
           // Funny, you cannot test if it is an instance of ..
           // Most likely why Array.isArray exists.
           //expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Cycle instance is null result: " + typeof arr[index].instance );
         });
      });

      run_Points.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Points", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Points instance is null result: " + arr[index].instance );
         });
      });

      run_Sets.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Sets", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Sets instance is null result: " + typeof arr[index].instance );
         });
      });

      run_Angle.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Angle", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Angle instance is null result: " + typeof arr[index].instance );
         });
      });

      run_Elements.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Elements", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Elements instance is null result: " + typeof arr[index].instance );
         });
      });

/* Not supported at this time
      run_MapProxy.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of MapProxy", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof run.arr[index]), "utils.MapProxy instance is null result: " + typeof arr[index].instance );
         });
      });
*/

      run_Polygon.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Polygon", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Polygon instance is null result: " + typeof arr[index].instance );
         });
      });

      run_Rect.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Rect", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Rect instance is null result: " + typeof arr[index].instance );
         });
      });

      run_Strings.forEach(function ( run, index, arr )
      {
         it( run.Options.Description + " Created instance should be an instance of Strings", function ()
         {
           expect((arr[index].instance)).to.be.an.instanceof(run.Constructor);
           assert.isNotNull((typeof arr[index].instance), "utils.Strings instance is null result: " + typeof arr[index].instance );
         });
      });

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
         it( "Dates.create of YYYY/MM/DD should create the same Date" , function ()
         {
            let originalDate = (run_Dates[0].Constructor).create(1964, 6, 21);
            let newDate      = (run_Dates[1].Constructor).create(1964, 6, 21);
            assert.deepEqual(originalDate, newDate, "utils.Dates are different. originalDate: " + originalDate + " newDate: " + newDate );
         });

         it( "Dates.create of YYYY/MM/DD+1 should not create the same Date" , function ()
         {
            let originalDate = (run_Dates[0].Constructor).create(1964, 6, 21);
            let newDate      = (run_Dates[1].Constructor).create(1964, 6, 22);
            assert.notDeepEqual(originalDate, newDate, "utils.Dates are different. originalDate: " + originalDate + " newDate: " + newDate );
         });

         it( "Dates.daysInMonth of 2020/02/01 should be the same. (29)" , function ()
         {
            let originalDate = (run_Dates[0].Constructor).create(2020, 2, 1);
            let newDate      = (run_Dates[1].Constructor).create(2020, 2, 1);
            let originalDaysInMonth = (run_Dates[0].Constructor).daysInMonth( originalDate );
            let newDaysInMonth =      (run_Dates[1].Constructor).daysInMonth( newDate );
            assert.equal(originalDaysInMonth, newDaysInMonth, "utils.Dates are different. originalDaysInMonth: " + originalDaysInMonth + " newDaysInMonth: " + newDaysInMonth );
            assert.equal(originalDaysInMonth, 29, "utils.Dates are different. originalDaysInMonth: " + originalDaysInMonth + " newDaysInMonth: " + newDaysInMonth );
         });
         it( "Dates.daysInMonth of 2026/02/01 should be the same. (28)" , function ()
         {
            let originalDate = (run_Dates[0].Constructor).create(2026, 2, 1);
            let newDate      = (run_Dates[1].Constructor).create(2026, 2, 1);
            let originalDaysInMonth = (run_Dates[0].Constructor).daysInMonth( originalDate );
            let newDaysInMonth =      (run_Dates[1].Constructor).daysInMonth( newDate );
            assert.equal(originalDaysInMonth, newDaysInMonth, "utils.Dates are different. originalDaysInMonth: " + originalDaysInMonth + " originalDaysInMonth: " + originalDaysInMonth );
            assert.equal(originalDaysInMonth, 28, "utils.Dates are different. originalDaysInMonth: " + originalDaysInMonth + " newDaysInMonth: " + newDaysInMonth );
         });
         it( "Dates.startYearRange of 2022/08/01 should be the same." , function ()
         {
            let originalDate = (run_Dates[0].Constructor).create(2022, 8, 1);
            let newDate      = (run_Dates[1].Constructor).create(2022, 8, 1);
            let originalStartYearRange = (run_Dates[0].Constructor).startYearRange( originalDate );
            let newStartYearRange =      (run_Dates[1].Constructor).startYearRange( newDate );
            assert.deepEqual(originalStartYearRange, newStartYearRange, "utils.Dates are different. originalStartYearRange: " + originalStartYearRange + " newStartYearRange: " + newStartYearRange );
         });
         it( "Dates.endYearRange of 2022/08/01 should be the same." , function ()
         {
            let originalDate = (run_Dates[0].Constructor).create(2022, 8, 1);
            let newDate      = (run_Dates[1].Constructor).create(2022, 8, 1);
            let originalEndYearRange = (run_Dates[0].Constructor).endYearRange( originalDate );
            let newEndYearRange =      (run_Dates[1].Constructor).endYearRange( newDate );
            assert.deepEqual(originalEndYearRange, newEndYearRange, "utils.Dates are different. originalEndYearRange: " + originalEndYearRange + " newEndYearRange: " + newEndYearRange );
         });
         it( "Dates.prevYear of 2027/12/30, -2 should be the same." , function ()
         {
            let originalDate = (run_Dates[0].Constructor).create(2027, 12, 30);
            let newDate      = (run_Dates[1].Constructor).create(2027, 12, 30);
            let originalPrevYear = (run_Dates[0].Constructor).prevYear( originalDate, -2 );
            let newPrevYear =      (run_Dates[1].Constructor).prevYear( newDate, -2 );
            assert.deepEqual(originalPrevYear, newPrevYear, "utils.Dates are different. originalPrevYear: " + originalPrevYear + " newPrevYear: " + newPrevYear );
         });
         it( "Dates.nextYear of 1997/12/30, 2 should be the same." , function ()
         {
            let originalDate = (run_Dates[0].Constructor).create(1997, 12, 30);
            let newDate      = (run_Dates[1].Constructor).create(1997, 12, 30);
            let originalNextYear = (run_Dates[0].Constructor).nextYear( originalDate, 2 );
            let newNextYear =      (run_Dates[1].Constructor).nextYear( newDate, 2 );
            assert.deepEqual(originalNextYear, newNextYear, "utils.Dates are different. originalNextYear: " + originalNextYear + " newNextYear: " + newNextYear );
         });
         it( "Dates.nextDay of 1997/12/30 should be the same." , function ()
         {
            let originalDate = (run_Dates[0].Constructor).create(1997, 12, 30);
            let newDate      = (run_Dates[1].Constructor).create(1997, 12, 30);
            let originalNextDay = (run_Dates[0].Constructor).nextDay( originalDate );
            let newNextDay =      (run_Dates[1].Constructor).nextDay( newDate );
            assert.deepEqual(originalNextDay, newNextDay, "utils.Dates are different. originalNextDay: " + originalNextDay + " newNextDay: " + newNextDay );
         });
      });
      describe("Testing DOm Rect functionality for DomRect (x:1,y:1,left:1,right:5,top:5,bottom:10", function ()
      {
         run_Rect.forEach(function ( run, index )
         {
            it( run.Options.Description + " contains point(x:3, y:7)" , function ()
            {
                // P.x is between left and R.x + R.right
                // P.y is between R.top & R.bottom
                let DOMrect = {x: 1, y:1, left: 1, right:5, top:5, bottom: 10};
                let point = {x: 3, y:7};
                let result = (run.Constructor).contains(DOMrect, point);
                assert.isTrue(result, "utils.Rect.contains point(" + point.x + "," + point.y + "). Px is supposed to be between R.left: " + DOMrect.left + " & " + DOMrect.x + DOMrect.right + " Py is between R.top: " + DOMrect.top + " & R.bottom: " + DOMrect.bottom );
            });

            it( run.Options.Description + " does not contain point(x:3, y:3)" , function ()
            {
                // P.x is between left and R.x + R.right
                // P.y is between R.top & R.bottom
                let DOMrect = {x: 1, y:1, left: 1, right:5, top:5, bottom: 10};
                let point = {x: 3, y:3};
                let result = (run.Constructor).contains(DOMrect, point);
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
               let result = (run.Constructor).toLowerCaseFirstChar( testString );
               assert.equal(result, expectedResult, "  Expected result: " + expectedResult  + " not equal to result: " + result);
            });
            it( run.Options.Description + " toUpperCaseFirstChar Lowercases first char" , function ()
            {
               let testString = "imHO who??";
               let expectedResult = "ImHO who??";
               let result = (run.Constructor).toUpperCaseFirstChar( testString );
               assert.equal(result, expectedResult, "  Expected result: " + expectedResult  + " not equal to result: " + result);
            });
            it( run.Options.Description + " toUpperCaseEachWord uppers each first word" , function ()
            {
               let testString     = "eise The buy who-builds the boat";
               let expectedResult = "Eise The Buy Who-builds The Boat";
               let result = (run.Constructor).toUpperCaseEachWord( testString );
               assert.equal(result, expectedResult, "  Expected result: " + expectedResult  + " not equal to result: " + result);
            });
            it( run.Options.Description + " toLowerCaseEachWord lowers each first word" , function ()
            {
               let testString     = "Eise The Buy Who-Builds The Boat";
               let expectedResult = "eise the buy who-Builds the boat";
               let result = (run.Constructor).toLowerCaseEachWord( testString );
               assert.equal(result, expectedResult, "  Expected result: " + expectedResult  + " not equal to result: " + result);
            });
         });
      });
   });
});
