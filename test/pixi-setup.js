/* setup.js */
/* These instructions taken from: https://airbnb.io/enzyme/docs/guides/jsdom.html */

const fs = require('fs')

const { JSDOM } = require('jsdom-canvas-2');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}


global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);

const PIXI = require('pixi.js');
const PIXIlegacy = require('pixi.js-legacy');
global.PIXI = PIXI;
global.PIXIlegacy = PIXIlegacy;

const chai = require('chai')
global.chai = chai;
const expect = chai.expect
global.expect = expect;
const assert = chai.assert;
global.assert = assert;
const sinon = require('sinon');
global.sinon = sinon;

// For easy lookup
let OBJECT = "object";
global.OBJECT = OBJECT;
let STRING = "string";
global.STRING = STRING;
let BOOLEAN = "boolean";
global.BOOLEAN = BOOLEAN;
let NUMBER = "number";
global.NUMBER = NUMBER;
let FUNCTION = "function";
global.FUNCTION = FUNCTION;
let ARRAY = "array";
global.ARRAY = ARRAY;

// For unit testing, test against original is possible
if ( process.env.COMPARE_ORIGINAL !== 'undefined' &&
      process.env.COMPARE_ORIGINAL)
{
   fs.access("./test/originalSrc/theme.js", err =>
   {
      if ( err )
      {
         // The check failed
         console.log("Missing original source to run comparison tests. err:" + err);
         throw(err);
      }
   });

   const COMPARE_ORIGINAL = process.env.COMPARE_ORIGINAL;
   global.COMPARE_ORIGINAL = COMPARE_ORIGINAL;
}

// For unit testing, Generate a random number between 1 & 100;
global.genRan = function () { return Math.floor(Math.random() * 100) + 1 };

// Solves Tween
//global.gs = require('gsap');
//global.Quad = global.gs.Quad;
//global.TweenMax = global.gs.TweenMax;
//global.TweenLite = global.gs.TweenLite;
