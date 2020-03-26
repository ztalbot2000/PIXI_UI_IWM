'use strict';

import Ease from '../../../src/Ease/Ease';

let runs = [{
   Ease: Ease,
   Options: { Description: "New Ease", Type: 'N' }
}];

// input Exponential Linear
let iEL  = 8;
let iEP0 = 8;
let iEP1 = 8;
let iEP2 = 8;
let iEP3 = 8;
let iEP4 = 8;

let iEBB = 8;

let iECC = .123;

let iEXXI = .002; let iEXXO = .08; let iEXXIO = .002;

let iESS = .123;

let exEL    = iEL;

let exEP0   = iEP0;

let exEP1EI = 64;
let exEP1EO = -48;
let exEP1EIO = -97;

let exEP2EI = 512;
let exEP2EO = 344;
let exEP2EIO = 1373;

let exEP3EI = 4096;
let exEP3EO = -2400;
let exEP3EIO = -19207;

let exEP4EI = 32768;
let exEP4EO = 16808;
let exEP4EIO = 268913;

let exEBBI = -369.5625;
let exEBBO = 376.37499
let exEBBIO = 746.9375

let exECCI = 0.007593329325119802;
let exECCO = 0.48049037451337157;
let exECCIO = 0.015365085863595696;

let exEXXI = -0.00000980519551754995;
let exEXXO = 0.42565082250148256;
let exEXXIO = 0.0005020087044219072;

let exESSI = 0.018606666259886717;
let exESSO = 0.19200813652;
let exESSIO = 0.036867124;


describe( "Testing Ease", function ()
{
   runs.forEach(function ( run)
   {
     it( run.Options.Description + " should not be null", function ()
     {
       if ( run.Options.Type == 'N')
          assert.isNotNull(Ease, "Ease resulted is null");
     });

     it( run.Options.Description + ".Linear should be a" + OBJECT, function ()
     {
       assert.isObject(( run.Ease).Linear, (run.Options.Description) + ".Linear: expected " + OBJECT + " received = " + typeof (run.Ease).Linear);
     });

     it( run.Options.Description + ".Linear.getPosition(" + iEL + ") should return:" + exEL, function ()
     {

       let result = (run.Ease).Linear.getPosition( iEL );

       assert.equal( result, exEL, (run.Options.Description) + ".Linear.easeNone.getPosition(" + iEL + "): expected " + exEL + " received = " + result);
     });

// ********** Power 0

     it( run.Options.Description + (run.Options.Description) + ".Power0 should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power0, (run.Options.Description) + ".Power0: expected " + OBJECT + " received = " + typeof (run.Ease).Power0);
     });

     it( run.Options.Description + (run.Options.Description) + ".Power0.easeNone should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power0.easeNone, (run.Options.Description) + ".Power0.easeNone: expected " + OBJECT + " received = " + typeof (run.Ease).Power0.easeNone);
     });

     it( run.Options.Description + run.Options.Description + ".Power0.easeNone.getPosition(" + iEL + ") should return:" + exEL, function ()
     {
       let result = (run.Ease).Power0.easeNone.getPosition( iEL );

       assert.equal( result, exEL, (run.Options.Description) + ".Power0.easeNone.getPosition(" + iEL + "): expected " + exEL + " received = " + result);
     });

// ********** Power 1

     it( run.Options.Description + ".Power1 should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power1, (run.Options.Description) + ".Power1: expected " + OBJECT + " received = " + typeof (run.Ease).Power1);
     });

     it( run.Options.Description + ".Power1.easeIn should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power1.easeIn, (run.Options.Description) + ".Power1.easeIn: expected " + OBJECT + " received = " + typeof (run.Ease).Power1.easeIn);
     });

     it( run.Options.Description + ".Power1.easeIn.getPosition(" + iEP1 + ") should return:" + exEP1EI, function ()
     {
       let result = (run.Ease).Power1.easeIn.getPosition( iEP1 );

       assert.equal( result, exEP1EI, (run.Options.Description) + ".Power1.easeIn.getPosition(" + iEP1 + "): expected " + exEP1EI + " received = " + result);
     });

     it( run.Options.Description + ".Power1.easeOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power1.easeOut, (run.Options.Description) + ".Power1.easeOut: expected " + OBJECT + " received = " + typeof (run.Ease).Power1.easeOut);
     });

     it( run.Options.Description + ".Power1.easeOut.getPosition(" + iEP1 + ") should return:" + exEP1EO, function ()
     {
       let result = (run.Ease).Power1.easeOut.getPosition( iEP1 );

       assert.equal( result, exEP1EO, (run.Options.Description) + ".Power1.easeOut.getPosition(" + iEP1 + "): expected " + exEP1EO + " received = " + result);
     });

     it( run.Options.Description + ".Power1.easeInOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power1.easeInOut, (run.Options.Description) + ".Power1.easeInOut: expected " + OBJECT + " received = " + typeof (run.Ease).Power1.easeInOut);
     });

     it( run.Options.Description + ".Power1.easeInOut.getPosition(" + iEP1 + ") should return:" + exEP1EIO, function ()
     {
       let result = (run.Ease).Power1.easeInOut.getPosition( iEP1 );

       assert.equal( result, exEP1EIO, (run.Options.Description) + ".Power1.easeInOut.getPosition(" + iEP1 + "): expected " + exEP1EIO + " received = " + result);
     });

// ********** Power 2

     it( run.Options.Description + (run.Options.Description) + ".Power2 should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power2, (run.Options.Description) + ".Power2: expected " + OBJECT + " received = " + typeof (run.Ease).Power2);
     });

     it( run.Options.Description + ".Power2.easeIn should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power2.easeIn, (run.Options.Description) + ".Power2.easeIn: expected " + OBJECT + " received = " + typeof (run.Ease).Power2.easeIn);
     });

     it( run.Options.Description + (run.Options.Description) + ".Power2.easeIn.getPosition(8) should return:" + exEP2EI, function ()
     {
       let result = (run.Ease).Power2.easeIn.getPosition( iEP2 );

       assert.equal( result, exEP2EI, (run.Options.Description) + ".Power2.easeIn.getPosition(" + iEP2 + "): expected " + exEP2EI + " received = " + result);
     });

     it( run.Options.Description + (run.Options.Description) + ".Power2.easeOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power2.easeOut, (run.Options.Description) + ".Power2.easeOut: expected " + OBJECT + " received = " + typeof (run.Ease).Power2.easeOut);
     });

     it( run.Options.Description + ".Power2.easeOut.getPosition(" + iEP2 + ") should return:" + exEP2EO, function ()
     {
       let result = (run.Ease).Power2.easeOut.getPosition( iEP2 );

       assert.equal( result, exEP2EO, (run.Options.Description) + ".Power2.easeOut.getPosition(" + iEP2 + "): expected " + exEP2EO + " received = " + result);
     });

     it( run.Options.Description + ".Power2.easeInOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power2.easeInOut, (run.Options.Description) + ".PowePowePower2.easeInOut: expected " + OBJECT + " received = " + typeof (run.Ease).Power2.easeInOut);
     });

     it( run.Options.Description + ".Power2.easeInOut.getPosition(" + iEP2 + ") should return:" + exEP2EIO, function ()
     {
       let result = (run.Ease).Power2.easeInOut.getPosition( iEP2 );

       assert.equal( result, exEP2EIO, (run.Options.Description) + ".Power2.easeInOut.getPosition(" + iEP2 + "): expected " + exEP2EIO + " received = " + result);
     });

// ********** Power 3

     it( run.Options.Description + ".Power3 should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power3, (run.Options.Description) + ".Power3: expected " + OBJECT + " received = " + typeof (run.Ease).Power3);
     });

     it( run.Options.Description + ".Power3.easeIn should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power3.easeIn, (run.Options.Description) + ".Power3.easeIn: expected " + OBJECT + " received = " + typeof (run.Ease).Power3.easeIn);
     });

     it( run.Options.Description + ".Power3.easeIn.getPosition(" + iEP3 + ") should return:" + exEP3EI, function ()
     {
       let result = (run.Ease).Power3.easeIn.getPosition( iEP3 );

       assert.equal( result, exEP3EI, (run.Options.Description) + ".Power3.easeIn.getPosition(" + iEP3 + "): expected " + exEP3EI + " received = " + result);
     });

     it( run.Options.Description + ".Power3.easeOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power3.easeOut, (run.Options.Description) + ".Power3.easeOut: expected " + OBJECT + " received = " + typeof (run.Ease).Power3.easeOut);
     });

     it( run.Options.Description + ".Power3.easeOut.getPosition(" + iEP3 + ") should return:" + exEP3EO, function ()
     {
       let result = (run.Ease).Power3.easeOut.getPosition( iEP3 );

       assert.equal( result, exEP3EO, (run.Options.Description) + ".Power3.easeOut.getPosition(" + iEP3 + "): expected " + exEP3EO + " received = " + result);
     });

     it( run.Options.Description + ".Power3.easeInOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power3.easeInOut, (run.Options.Description) + ".Power3.easeInOut: expected " + OBJECT + " received = " + typeof (run.Ease).Power3.easeInOut);
     });

     it( run.Options.Description + ".Power3.easeInOut.getPosition(" + iEP3 + ") should return:" + exEP3EIO, function ()
     {
       let result = (run.Ease).Power3.easeInOut.getPosition( iEP3 );

       assert.equal( result, exEP3EIO, (run.Options.Description) + ".Power3.easeInOut.getPosition(" + iEP3 + "): expected " + exEP3EIO + " received = " + result);
     });

// ********** Power 4

     it( run.Options.Description + ".Power4 should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power4, (run.Options.Description) + ".Power4: expected " + OBJECT + " received = " + typeof (run.Ease).Power4);
     });

     it( run.Options.Description + ".Power4.easeIn should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power4.easeIn, (run.Options.Description) + ".Power4.easeIn: expected " + OBJECT + " received = " + typeof (run.Ease).Power4.easeIn);
     });

     it( run.Options.Description + ".Power4.easeIn.getPosition(" + iEP4 + ") should return:" + exEP4EI, function ()
     {
       let result = (run.Ease).Power4.easeIn.getPosition( iEP4 );

       assert.equal( result, exEP4EI, (run.Options.Description) + ".Power4.easeIn.getPosition(" + iEP4 + "): expected " + exEP4EI + " received = " + result);
     });

     it( run.Options.Description + ".Power4.easeOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power4.easeOut, (run.Options.Description) + ".Power4.easeOut: expected " + OBJECT + " received = " + typeof (run.Ease).Power4.easeOut);
     });

     it( run.Options.Description + ".Power4.easeOut.getPosition(" + iEP4 + ") should return:" + exEP4EO, function ()
     {
       let result = (run.Ease).Power4.easeOut.getPosition( iEP4 );

       assert.equal( result, exEP4EO, (run.Options.Description) + ".Power4.easeOut.getPosition(" + iEP4 + "): expected " + exEP4EO + " received = " + result);
     });

     it( run.Options.Description + ".Power4.easeInOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Power4.easeInOut, (run.Options.Description) + ".Power4.easeInOut: expected " + OBJECT + " received = " + typeof (run.Ease).Power4.easeInOut);
     });

     it( run.Options.Description + ".Power4.easeInOut.getPosition(" + iEP4 + ") should return:" + exEP4EIO, function ()
     {
       let result = (run.Ease).Power4.easeInOut.getPosition( iEP4 );

       assert.equal( result, exEP4EIO, (run.Options.Description) + ".Power4.easeInOut.getPosition(" + iEP4 + "): expected " + exEP4EIO + " received = " + result);
     });

// ********** Bounce

     it( run.Options.Description + ".Bounce should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Bounce, (run.Options.Description) + ".Bounce: expected " + OBJECT + " received = " + typeof (run.Ease).Bounce);
     });

     it( run.Options.Description + ".Bounce.BounceIn should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Bounce.BounceIn, (run.Options.Description) + ".Bounce.BounceIn: expected " + OBJECT + " received = " + typeof (run.Ease).Bounce.BounceIn);
     });

     it( run.Options.Description + ".Bounce.BounceIn.getPosition(" + iEBB + ") should return:" + exEBBI, function ()
     {
       let result = (run.Ease).Bounce.BounceIn.getPosition( iEBB );

       assert.equal( result, exEBBI, (run.Options.Description) + ".Bounce.BounceIn.getPosition(" + iEBB + "): expected " + exEBBI + " received = " + result);
     });

     it( run.Options.Description + ".Bounce.BounceOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Bounce.BounceOut, (run.Options.Description) + ".Bounce.BounceOut: expected " + OBJECT + " received = " + typeof (run.Ease).Bounce.BounceOut);
     });

     it( run.Options.Description + ".Bounce.BounceOut.getPosition(" + iEBB + ") should return:" + exEBBO, function ()
     {
       let result = (run.Ease).Bounce.BounceOut.getPosition( iEBB );

       assert.closeTo( result, exEBBO, .0005, (run.Options.Description) + ".Bounce.BounceOut.getPosition(" + iEBB + "): expected " + exEBBO + " received = " + result);
     });

     it( run.Options.Description + ".Bounce.BounceInOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Bounce.BounceInOut, (run.Options.Description) + ".Bounce.BounceInOut: expected " + OBJECT + " received = " + typeof (run.Ease).Bounce.BounceInOut);
     });

     it( run.Options.Description + ".Bounce.BounceInOut.getPosition(" + iEBB + ") should return:" + exEBBIO, function ()
     {
       let result = (run.Ease).Bounce.BounceInOut.getPosition( iEBB );

       assert.closeTo( result, exEBBIO, .0005, (run.Options.Description) + ".Bounce.BounceInOut.getPosition(" + iEBB + "): expected " + exEBBIO + " received = " + result);
     });

// ********** Circ

     it( run.Options.Description + ".Circ should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Circ, (run.Options.Description) + ".Circ: expected " + OBJECT + " received = " + typeof (run.Ease).Circ);
     });

     it( run.Options.Description + ".Circ.CircIn should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Circ.CircIn, (run.Options.Description) + ".Circ.CircIn: expected " + OBJECT + " received = " + typeof (run.Ease).Circ.CircIn);
     });

     it( run.Options.Description + ".Circ.CircIn.getPosition(" + iECC + ") should return:" + exECCI, function ()
     {
       let result = (run.Ease).Circ.CircIn.getPosition( iECC );

       assert.closeTo( result, exECCI, .0000005, (run.Options.Description) + ".Circ.CircInOut.getPosition(" + iECC + "): expected " + exECCI + " received = " + result);
     });

     it( run.Options.Description + ".Circ.CircOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Circ.CircOut, (run.Options.Description) + ".Circ.CircOut: expected " + OBJECT + " received = " + typeof (run.Ease).Circ.CircOut);
     });

     it( run.Options.Description + ".Circ.CircOut.getPosition(" + iECC + ") should return:" + exECCO, function ()
     {
       let result = (run.Ease).Circ.CircOut.getPosition( iECC );

       assert.closeTo( result, exECCO, .0000005, (run.Options.Description) + ".Circ.CircOut.getPosition(" + iECC + "): expected " + exECCO + " received = " + result);
     });

     it( run.Options.Description + ".Circ.CircInOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Circ.CircInOut, (run.Options.Description) + ".Circ.CircInOut: expected " + OBJECT + " received = " + typeof (run.Ease).Circ.CircInOut);
     });

     it( run.Options.Description + ".Circ.CircInOut.getPosition(" + iECC + ") should return:" + exECCIO, function ()
     {
       let result = (run.Ease).Circ.CircInOut.getPosition( iECC );

       assert.closeTo( result, exECCIO, .0000005, (run.Options.Description) + ".Circ.CircInOut.getPosition(" + iECC + "): expected " + exECCIO + " received = " + result);
     });

// ********** Expo

     it( run.Options.Description + ".Expo should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Expo, (run.Options.Description) + ".Expo: expected " + OBJECT + " received = " + typeof (run.Ease).Expo);
     });

     it( run.Options.Description + ".Expo.ExpoIn should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Expo.ExpoIn, (run.Options.Description) + ".Expo.ExpoIn: expected " + OBJECT + " received = " + typeof (run.Ease).Expo.ExpoIn);
     });

     it( run.Options.Description + ".Expo.ExpoIn.getPosition(" + iEXXI + ") should return:" + exEXXI, function ()
     {
       let result = (run.Ease).Expo.ExpoIn.getPosition( iEXXI );

       assert.closeTo( result, exEXXI, .0000005, (run.Options.Description) + ".Expo.ExpoIn.getPosition(" + iEXXI + "): expected " + exEXXI + " received = " + result);
     });

     it( run.Options.Description + ".Expo.ExpoOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Expo.ExpoOut, (run.Options.Description) + ".Expo.ExpoOut: expected " + OBJECT + " received = " + typeof (run.Ease).Expo.ExpoOut);
     });


     it( run.Options.Description + ".Expo.ExpoOut.getPosition(" + iEXXO + ") should return:" + exEXXO, function ()
     {
       let result = (run.Ease).Expo.ExpoOut.getPosition( iEXXO );

       assert.closeTo( result, exEXXO, .0000005, (run.Options.Description) + ".Expo.ExpoOut.getPosition(" + iEXXO + "): expected " + exEXXO + " received = " + result);
     });

     it( run.Options.Description + ".Expo.ExpoInOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Expo.ExpoInOut, (run.Options.Description) + ".Expo.ExpoInOut: expected " + OBJECT + " received = " + typeof (run.Ease).Expo.ExpoInOut);
     });

     it( run.Options.Description + ".Expo.ExpoInOut.getPosition(" + iEXXIO + ") should return:" + exEXXIO, function ()
     {
       let result = (run.Ease).Expo.ExpoInOut.getPosition( iEXXIO );

       assert.closeTo( result, exEXXIO, .0000005, (run.Options.Description) + ".Expo.ExpoInOut.getPosition(" + iEXXIO + "): expected " + exEXXIO + " received = " + result);
     });

// ********** Sine

     it( run.Options.Description + ".Sine should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Sine, (run.Options.Description) + ".Sine: expected " + OBJECT + " received = " + typeof (run.Ease).Sine);
     });

     it( run.Options.Description + ".Sine.SineIn should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Sine.SineIn, (run.Options.Description) + ".Sine.SineIn: expected " + OBJECT + " received = " + typeof (run.Ease).Sine.SineIn);
     });

     it( run.Options.Description + ".Sine.SineIn.getPosition(" + iESS + ") should return:" + exESSI, function ()
     {
       let result = (run.Ease).Sine.SineIn.getPosition( iESS );

       assert.closeTo( result, exESSI, .0000005, (run.Options.Description) + ".Sine.SineIn.getPosition(" + iESS + "): expected " + exESSI + " received = " + result);
     });

     it( run.Options.Description + ".Sine.SineOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Sine.SineOut, (run.Options.Description) + ".Sine.SineOut: expected " + OBJECT + " received = " + typeof (run.Ease).Sine.SineOut);
     });

     it( run.Options.Description + (run.Options.Description) + ".Sine.SineOut.getPosition(.123) should return:" + exESSO, function ()
     {
       let result = (run.Ease).Sine.SineOut.getPosition( iESS );

       assert.closeTo( result, exESSO, .0000005, (run.Options.Description) + ".Ease.Sine.SineOut.getPosition(" + iESS + "): expected " + exESSO + " received = " + result);
     });

     it( run.Options.Description + ".Sine.SineInOut should be an " + OBJECT, function ()
     {
       assert.isObject( (run.Ease).Sine.SineInOut, (run.Options.Description) + ".Ease.Sine.SineInOut: expected " + OBJECT + " received = " + typeof (run.Ease).Sine.SineInOut);
     });

     it( run.Options.Description + ".Sine.SineInOut.getPosition(" + iESS + ") should return:" + exESSIO, function ()
     {
       let result = (run.Ease).Sine.SineInOut.getPosition( iESS );

       assert.closeTo( result, exESSIO, .0000005, (run.Options.Description) + ".Ease.Sine.SineInOut.getPosition(" + iESS + "): expected " + exESSIO + " received = " + result);
     });
   });
});
