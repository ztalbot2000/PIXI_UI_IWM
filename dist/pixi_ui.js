var pixi_ui;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__("./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__("./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__("./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./src/Ease/Ease.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ease = void 0;
var EaseBase_1 = __webpack_require__("./src/Ease/EaseBase.ts");
var ExponentialEase_1 = __webpack_require__("./src/Ease/ExponentialEase.ts");
var HALF_PI = Math.PI * 0.5;
var Ease = /** @class */ (function () {
    function Ease() {
        this.create = function (fn) {
            var e = new EaseBase_1.EaseBase();
            e.getPosition = fn;
            return e;
        };
        this.wrapEase = function (easeInFunction, easeOutFunction, easeInOutFunction) {
            return {
                easeIn: easeInFunction,
                easeOut: easeOutFunction,
                easeInOut: easeInOutFunction
            };
        };
        this.Linear = new EaseBase_1.EaseBase();
        this.Power0 =
            {
                easeNone: new EaseBase_1.EaseBase(),
            };
        this.Power1 = this.Quad = this.wrapEase(new ExponentialEase_1.ExponentialEase(1, 1, 0), new ExponentialEase_1.ExponentialEase(1, 0, 1), new ExponentialEase_1.ExponentialEase(1, 1, 1));
        this.Power2 = this.Cubic = this.wrapEase(new ExponentialEase_1.ExponentialEase(2, 1, 0), new ExponentialEase_1.ExponentialEase(2, 0, 1), new ExponentialEase_1.ExponentialEase(2, 1, 1));
        this.Power3 = this.Quart = this.wrapEase(new ExponentialEase_1.ExponentialEase(3, 1, 0), new ExponentialEase_1.ExponentialEase(3, 0, 1), new ExponentialEase_1.ExponentialEase(3, 1, 1));
        this.Power4 = this.Quint = this.wrapEase(new ExponentialEase_1.ExponentialEase(4, 1, 0), new ExponentialEase_1.ExponentialEase(4, 0, 1), new ExponentialEase_1.ExponentialEase(4, 1, 1));
        // Bounce
        this.Bounce =
            {
                BounceIn: this.create(function (p) {
                    if ((p = 1 - p) < 1 / 2.75) {
                        return 1 - (7.5625 * p * p);
                    }
                    else if (p < 2 / 2.75) {
                        return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
                    }
                    else if (p < 2.5 / 2.75) {
                        return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
                    }
                    return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
                }),
                BounceOut: this.create(function (p) {
                    if (p < 1 / 2.75) {
                        return 7.5625 * p * p;
                    }
                    else if (p < 2 / 2.75) {
                        return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
                    }
                    else if (p < 2.5 / 2.75) {
                        return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
                    }
                    return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
                }),
                BounceInOut: this.create(function (p) {
                    var invert = (p < 0.5);
                    if (invert) {
                        p = 1 - (p * 2);
                    }
                    else {
                        p = (p * 2) - 1;
                    }
                    if (p < 1 / 2.75) {
                        p = 7.5625 * p * p;
                    }
                    else if (p < 2 / 2.75) {
                        p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
                    }
                    else if (p < 2.5 / 2.75) {
                        p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
                    }
                    else {
                        p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
                    }
                    return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
                })
            };
        // Circ
        this.Circ =
            {
                CircIn: this.create(function (p) {
                    return -(Math.sqrt(1 - (p * p)) - 1);
                }),
                CircOut: this.create(function (p) {
                    return Math.sqrt(1 - (p = p - 1) * p);
                }),
                CircInOut: this.create(function (p) {
                    return ((p *= 2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
                })
            };
        // Expo
        this.Expo =
            {
                ExpoIn: this.create(function (p) {
                    return Math.pow(2, 10 * (p - 1)) - 0.001;
                }),
                ExpoOut: this.create(function (p) {
                    return 1 - Math.pow(2, -10 * p);
                }),
                ExpoInOut: this.create(function (p) {
                    return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
                })
            };
        // Sine
        this.Sine =
            {
                SineIn: this.create(function (p) {
                    return -Math.cos(p * HALF_PI) + 1;
                }),
                SineOut: this.create(function (p) {
                    return Math.sin(p * HALF_PI);
                }),
                SineInOut: this.create(function (p) {
                    return -0.5 * (Math.cos(Math.PI * p) - 1);
                })
            };
    }
    return Ease;
}());
exports.Ease = Ease;
;
// Exported name cannot be same as class name, so export instance as default
var ease = new Ease();
exports["default"] = ease;


/***/ }),

/***/ "./src/Ease/EaseBase.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EaseBase = void 0;
var EaseBase = /** @class */ (function () {
    function EaseBase() {
        this.getPosition = function (p) {
            return p;
        };
    }
    return EaseBase;
}());
exports.EaseBase = EaseBase;


/***/ }),

/***/ "./src/Ease/ExponentialEase.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExponentialEase = void 0;
var EaseBase_1 = __webpack_require__("./src/Ease/EaseBase.ts");
var ExponentialEase = /** @class */ (function (_super) {
    __extends(ExponentialEase, _super);
    function ExponentialEase(power, easeIn, easeOut) {
        var _this = _super.call(this) || this;
        _this.getPosition = function (p) {
            var r = (_this.t === 1) ? 1 - p : (_this.t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
            if (_this.pow === 1) {
                r *= r;
            }
            else if (_this.pow === 2) {
                r *= r * r;
            }
            else if (_this.pow === 3) {
                r *= r * r * r;
            }
            else if (_this.pow === 4) {
                r *= r * r * r * r;
            }
            return (_this.t === 1) ? 1 - r : (_this.t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
        };
        _this.pow = power;
        _this.t = easeIn && easeOut ? 3 : easeOut ? 1 : 2;
        return _this;
    }
    return ExponentialEase;
}(EaseBase_1.EaseBase));
exports.ExponentialEase = ExponentialEase;


/***/ }),

/***/ "./src/Ease/Ticker.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ticker = void 0;
var PIXI = __importStar(__webpack_require__("pixi.js"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var Ticker = /** @class */ (function (_super) {
    __extends(Ticker, _super);
    function Ticker(autoStart) {
        var _this = _super.call(this) || this;
        _this._disabled = true;
        _this._now = 0;
        _this.DeltaTime = 0;
        _this.Time = performance.now();
        _this.Ms = 0;
        if (autoStart) {
            _this.disabled = false;
        }
        Ticker.shared = _this;
        return _this;
    }
    //
    // Updates the text
    //
    // @private
    //
    Ticker.prototype.update = function (time) {
        Ticker.shared._now = time;
        Ticker.shared.Ms = Ticker.shared._now - Ticker.shared.Time;
        Ticker.shared.Time = Ticker.shared._now;
        Ticker.shared.DeltaTime = Ticker.shared.Ms * 0.001;
        Ticker.shared.emit("update", Ticker.shared.DeltaTime);
        Tween_1.default._update(Ticker.shared.DeltaTime);
        if (!Ticker.shared._disabled) {
            requestAnimationFrame(Ticker.shared.update);
        }
    };
    //public on (event: string | symbol, fn: Function, context?: any): this
    Ticker.prototype.on = function (event, fn) {
        _super.prototype.on.call(this, event, fn, context);
        return this;
    };
    // public once (event: string | symbol, fn: Function, context?: any): this
    Ticker.prototype.once = function (event, fn) {
        _super.prototype.once.call(this, event, fn, context);
        return this;
    };
    // public removeListener (event: string |  symbol, fn?: Function, context?: any): this
    Ticker.prototype.removeListener = function (event, fn) {
        _super.prototype.removeListener.call(this, event, fn, context);
        return this;
    };
    ;
    Object.defineProperty(Ticker.prototype, "shared", {
        get: function () {
            return Ticker.shared;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ticker.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            val = val;
            if (!this._disabled) {
                this._disabled = true;
            }
            else {
                this._disabled = false;
                Ticker.shared = this;
                this.update(performance.now());
            }
        },
        enumerable: false,
        configurable: true
    });
    return Ticker;
}(PIXI.utils.EventEmitter));
exports.Ticker = Ticker;
Ticker.shared = new Ticker(true);
exports["default"] = Ticker.shared;


/***/ }),

/***/ "./src/Ease/Tween.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tween = void 0;
// activeTweenObjects is used both by Class Tween and Class CallbackItem
var _activeTweenObjects = [];
var TweenObject = /** @class */ (function () {
    // The user provides obj and we turn it into a tweenObject
    function TweenObject(obj) {
        this.object = obj;
        this.tweens = {};
        this.active = false;
        this.onUpdate = null;
        this._tweenObjectId = undefined;
        this._currentCallbackID = undefined;
    }
    return TweenObject;
}());
;
var CallbackItem = /** @class */ (function () {
    function CallbackItem() {
        var _this = this;
        this.remove = function () {
            _this._ready = true;
            delete _this.parent.tweens[_this.key];
            if (!Object.keys(_this.parent.tweens).length) {
                _this.parent.active = false;
                _this.parent.onUpdate = null;
                delete _activeTweenObjects[_this.tweenObject._tweenObjectId];
            }
        };
        this.set = function (obj, callback, time) {
            _this.tweenObject = obj.object;
            if (!_this.tweenObject._currentCallbackID) {
                _this.tweenObject._currentCallbackID = 1;
            }
            else {
                _this.tweenObject._currentCallbackID++;
            }
            _this.time = time;
            _this.parent = obj;
            _this.callback = callback;
            _this._ready = false;
            _this.key = "cb_" + _this.tweenObject._currentCallbackID;
            _this.currentTime = 0;
            if (!_this.parent.active) {
                _this.parent.active = true;
                _activeTweenObjects[_this.tweenObject._tweenObjectId] = _this.parent;
            }
        };
        this._ready = false;
        this.tweenObject = null;
        this.parent = null;
        this.key = "";
        this.time = 0;
        this.callback = null;
        this.currentTime = 0;
    }
    ;
    CallbackItem.prototype.update = function (delta) {
        this.currentTime += delta;
        if (this.currentTime >= this.time) {
            this.remove();
            this.callback();
        }
    };
    ;
    return CallbackItem;
}());
;
var TweenItem = /** @class */ (function () {
    function TweenItem() {
        var _this = this;
        this.remove = function () {
            _this._ready = true;
            delete _this.parent.tweens[_this.key];
            if (!Object.keys(_this.parent.tweens).length) {
                _this.parent.active = false;
                delete _activeTweenObjects[_this.obj._tweenObjectId];
            }
        };
        this.set = function (obj, key, from, to, time, ease) {
            _this.isColor = isNaN(from) && from[0] == "#" || isNaN(to) && to[0] == "#";
            _this.parent = obj;
            //Note: We are in Class TweenItem
            //Note: TweenObject has type object, which is type Tween
            _this.obj = obj.object;
            _this.key = key;
            _this.surfix = _this.getSurfix(to);
            if (_this.isColor) {
                _this.to = TweenItem.hexToRgb(to);
                _this.from = TweenItem.hexToRgb(from);
                _this.currentColor =
                    {
                        r: _this.from.r,
                        g: _this.from.g,
                        b: _this.from.b
                    };
            }
            else {
                _this.to = _this.getToValue(to);
                _this.from = _this.getFromValue(from, to, _this.obj, key);
            }
            _this.time = time;
            _this.currentTime = 0;
            _this.ease = ease;
            _this._ready = false;
            if (!_this.parent.active) {
                _this.parent.active = true;
                _activeTweenObjects[_this.obj._tweenObjectId] = _this.parent;
            }
        };
        this.getFromValue = function (from, to, obj, key) {
            // both number
            if (!isNaN(from) && !isNaN(to))
                return from;
            // both percentage
            if (isNaN(from) && isNaN(to) && from.indexOf('%') !== -1 && to.indexOf('%') !== -1) {
                return parseFloat(from.replace('%', ''));
            }
            // convert from to px
            if (isNaN(from) && !isNaN(to) && from.indexOf('%') !== -1) {
                if (_this.widthKeys.indexOf(key) !== -1) {
                    return obj.parent._width * (parseFloat(from.replace('%', '')) * 0.01);
                }
                else if (_this.heightKeys.indexOf(key) !== -1) {
                    return obj.parent._height * (parseFloat(from.replace('%', '')) * 0.01);
                }
                else {
                    return 0;
                }
            }
            // convert from to percentage
            if (!isNaN(from) && isNaN(to) && to.indexOf('%') !== -1) {
                if (_this.widthKeys.indexOf(key) !== -1) {
                    return from / obj.parent._width * 100;
                }
                else if (_this.heightKeys.indexOf(key) !== -1) {
                    return from / obj.parent._height * 100;
                }
                else {
                    return 0;
                }
            }
            return 0;
        };
        this.getSurfix = function (to) {
            if (typeof to === 'string' && to.indexOf('%') !== -1) {
                return "%";
            }
            // this did not return anything before
            return null;
        };
        this.getToValue = function (to) {
            if (!isNaN(to)) {
                return to;
            }
            if (isNaN(to) && to.indexOf('%') !== -1) {
                return parseFloat(to.replace('%', ''));
            }
            console.warn("to(" + to + ") is not a number or string:" + typeof to);
            // getToValue did not return anything if fall through
            return to;
        };
        this._ready = false;
        this.parent = null;
        this.obj = null;
        this.key = "";
        this.from = 0;
        this.to = 0;
        this.time = 0;
        // ease is an Ease function
        this.ease = null;
        this.currentTime = 0;
        this.t = 0;
        this.isColor = false;
        this.currentColor = { r: 0, g: 0, b: 0 };
        this.widthKeys = ["width", "minWidth", "maxWidth", "anchorLeft", "anchorRight", "left", "right", "x"];
        this.heightKeys = ["height", "minHeight", "maxHeight", "anchorTop", "anchorBottom", "top", "bottom", "y"];
        // The fact that getSurface possibly did not return anything makes this a bug
        this.surfix = null;
    }
    TweenItem.prototype.update = function (delta) {
        this.currentTime += delta;
        this.t = Math.min(this.currentTime, this.time) / this.time;
        if (this.ease) {
            this.t = this.ease.getPosition(this.t);
        }
        if (this.isColor) {
            this.currentColor.r = Math.round(TweenItem.Lerp(this.from.r, this.to.r, this.t));
            this.currentColor.g = Math.round(TweenItem.Lerp(this.from.g, this.to.g, this.t));
            this.currentColor.b = Math.round(TweenItem.Lerp(this.from.b, this.to.b, this.t));
            this.obj[this.key] = TweenItem.rgbToNumber(this.currentColor.r, this.currentColor.g, this.currentColor.b);
        }
        else {
            var val = TweenItem.Lerp(this.from, this.to, this.t);
            this.obj[this.key] = this.surfix ? val + this.surfix : val;
        }
        if (this.currentTime >= this.time) {
            this.remove();
        }
    };
    ;
    TweenItem.Lerp = function (start, stop, amt) {
        if (amt > 1)
            amt = 1;
        else if (amt < 0)
            amt = 0;
        return start + (stop - start) * amt;
    };
    TweenItem.numberToRgb = function (c) {
        return {
            r: Math.floor(c / (256 * 256)),
            g: Math.floor(c / 256) % 256,
            b: c % 256,
        };
    };
    TweenItem.rgbToNumber = function (r, g, b) {
        return r * 65536 + g * 256 + b;
    };
    TweenItem.hexToRgb = function (hex) {
        if (hex === null)
            hex = 0xffffff;
        // Typescript checks that flowing through we can handle either type.
        if (typeof hex === 'number') {
            return TweenItem.numberToRgb(hex);
        }
        // at this point Typescript thinks hex is a string type
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        // convert string to number so that componentToHex can be called as it originally did.
        var hexS = hex.replace(shorthandRegex, function (_m, r, g, b) {
            return (r + r + g + g + b + b);
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexS);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    return TweenItem;
}());
var Tween = /** @class */ (function () {
    function Tween() {
        var _this = this;
        this.getCallbackItem = function () {
            for (var i = 0; i < _this._callbackItemCache.length; i++) {
                if (_this._callbackItemCache[i]._ready) {
                    return _this._callbackItemCache[i];
                }
            }
            var cb = new CallbackItem();
            _this._callbackItemCache.push(cb);
            return cb;
        };
        this.to = function (obj, time, params, ease) {
            var tweenObject = _this.getTweenObject(obj);
            var onUpdate = null;
            for (var key in params) {
                if (key === "onComplete") {
                    var cb = _this.getCallbackItem();
                    cb.set(tweenObject, params[key], time);
                    tweenObject.tweens[cb.key] = cb;
                    continue;
                }
                if (key === "onUpdate") {
                    onUpdate = params[key];
                    continue;
                }
                if (time) {
                    var match = params[key] == obj[key];
                    if (typeof obj[key] === "undefined")
                        continue;
                    if (match) {
                        if (tweenObject.tweens[key])
                            tweenObject.tweens[key].remove();
                    }
                    else {
                        if (!tweenObject.tweens[key]) {
                            tweenObject.tweens[key] = _this.getTweenItem();
                        }
                        tweenObject.tweens[key].set(tweenObject, key, obj[key], params[key], time, ease);
                    }
                }
            }
            if (time)
                tweenObject.onUpdate = onUpdate;
            else
                _this.set(obj, params);
        };
        this.from = function (obj, time, params, ease) {
            var tweenObject = _this.getTweenObject(obj);
            var onUpdate = null;
            for (var key in params) {
                if (key === "onComplete") {
                    var cb = _this.getCallbackItem();
                    cb.set(tweenObject, params[key], time);
                    tweenObject.tweens[cb.key] = cb;
                    continue;
                }
                if (key === "onUpdate") {
                    onUpdate = params[key];
                    continue;
                }
                if (time) {
                    var match = params[key] == obj[key];
                    if (typeof obj[key] === "undefined")
                        continue;
                    if (match) {
                        if (tweenObject.tweens[key])
                            tweenObject.tweens[key].remove();
                    }
                    else {
                        if (!tweenObject.tweens[key]) {
                            tweenObject.tweens[key] = _this.getTweenItem();
                        }
                        tweenObject.tweens[key].set(tweenObject, key, params[key], obj[key], time, ease);
                    }
                }
            }
            if (time)
                tweenObject.onUpdate = onUpdate;
            else
                _this.set(obj, params);
        };
        this.fromTo = function (obj, time, paramsFrom, paramsTo, ease) {
            var tweenObject = _this.getTweenObject(obj);
            var onUpdate = null;
            for (var key in paramsTo) {
                if (key === "onComplete") {
                    var cb = _this.getCallbackItem();
                    cb.set(tweenObject, paramsTo[key], time);
                    tweenObject.tweens[cb.key] = cb;
                    continue;
                }
                if (key === "onUpdate") {
                    onUpdate = paramsFrom[key];
                    continue;
                }
                if (time) {
                    var match = paramsFrom[key] == paramsTo[key];
                    if (typeof obj[key] === "undefined" || typeof paramsFrom[key] === "undefined")
                        continue;
                    if (match) {
                        if (tweenObject.tweens[key])
                            tweenObject.tweens[key].remove();
                        obj[key] = paramsTo[key];
                    }
                    else {
                        if (!tweenObject.tweens[key]) {
                            tweenObject.tweens[key] = _this.getTweenItem();
                        }
                        tweenObject.tweens[key].set(tweenObject, key, paramsFrom[key], paramsTo[key], time, ease);
                    }
                }
            }
            if (time)
                tweenObject.onUpdate = onUpdate;
            else
                _this.set(obj, paramsTo);
        };
        this.set = function (obj, params) {
            var tweenObject = _this.getTweenObject(obj);
            for (var key in params) {
                if (typeof obj[key] === "undefined") {
                    continue;
                }
                if (tweenObject.tweens[key]) {
                    tweenObject.tweens[key].remove();
                }
                obj[key] = params[key];
            }
        };
        // Changed getObject to getTweenObject for clarity
        this.getTweenObject = function (obj) {
            if (!obj._tweenObjectId) {
                obj._tweenObjectId = _this._currentId;
                _this._currentId++;
            }
            var tweenObject = _this._tweenObjects[obj._tweenObjectId];
            if (!tweenObject) {
                _this._tweenObjects[obj._tweenObjectId] = new TweenObject(obj);
                tweenObject = _this._tweenObjects[obj._tweenObjectId];
            }
            return tweenObject;
        };
        this.getTweenItem = function () {
            for (var i = 0; i < _this._tweenItemCache.length; i++) {
                if (_this._tweenItemCache[i]._ready) {
                    return _this._tweenItemCache[i];
                }
            }
            var tweenItem = new TweenItem();
            _this._tweenItemCache.push(tweenItem);
            return tweenItem;
        };
        if (!Tween.instance) {
            this._tweenItemCache = [];
            this._tweenObjects = [];
            this._currentId = 1;
            this._callbackItemCache = [];
            Tween.instance = this;
        }
        return Tween.instance;
    }
    ;
    ;
    Tween.prototype._update = function (delta) {
        for (var id in _activeTweenObjects) {
            var tweenObject = _activeTweenObjects[id];
            for (var key in tweenObject.tweens) {
                tweenObject.tweens[key].update(delta);
                if (tweenObject.onUpdate) {
                    tweenObject.onUpdate.call(tweenObject.object, delta);
                }
            }
        }
    };
    return Tween;
}());
exports.Tween = Tween;
;
// Exported name cannot be same as class name, so export instance as default
exports["default"] = new Tween();


/***/ }),

/***/ "./src/UI.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UI = void 0;
var utils_1 = __webpack_require__("./src/utils.ts");
var EaseBase_1 = __webpack_require__("./src/Ease/EaseBase.ts");
var ExponentialEase_1 = __webpack_require__("./src/Ease/ExponentialEase.ts");
var Ease_1 = __importDefault(__webpack_require__("./src/Ease/Ease.ts"));
var Ticker_1 = __importDefault(__webpack_require__("./src/Ease/Ticker.ts"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var tooltip_1 = __importDefault(__webpack_require__("./src/tooltip.ts"));
var volatile_1 = __importDefault(__webpack_require__("./src/volatile.ts"));
var abstractpopup_1 = __importDefault(__webpack_require__("./src/abstractpopup.ts"));
var popup_1 = __importDefault(__webpack_require__("./src/popup.ts"));
var popover_1 = __importDefault(__webpack_require__("./src/popover.ts"));
var popupmenu_1 = __importDefault(__webpack_require__("./src/popupmenu.ts"));
var slider_1 = __importDefault(__webpack_require__("./src/slider.ts"));
var badge_1 = __importDefault(__webpack_require__("./src/badge.ts"));
var button_1 = __importDefault(__webpack_require__("./src/button.ts"));
var buttongroup_1 = __importDefault(__webpack_require__("./src/buttongroup.ts"));
var checkbox_1 = __importDefault(__webpack_require__("./src/checkbox.ts"));
var modal_1 = __importDefault(__webpack_require__("./src/modal.ts"));
var app_1 = __importDefault(__webpack_require__("./src/app.ts"));
var message_1 = __importDefault(__webpack_require__("./src/message.ts"));
var progress_1 = __importDefault(__webpack_require__("./src/progress.ts"));
var progressbar_1 = __importDefault(__webpack_require__("./src/progressbar.ts"));
var progressdialog_1 = __importDefault(__webpack_require__("./src/progressdialog.ts"));
var capabilities_1 = __importDefault(__webpack_require__("./src/capabilities.ts"));
var labeledgraphics_1 = __importDefault(__webpack_require__("./src/labeledgraphics.ts"));
var list_1 = __importDefault(__webpack_require__("./src/list.ts"));
var switch_1 = __importDefault(__webpack_require__("./src/switch.ts"));
exports.UI = {
    // types: types,
    //   utils: utils,
    isEmpty: utils_1.isEmpty, uuid: utils_1.uuid, lerp: utils_1.lerp, sample: utils_1.sample, debounce: utils_1.debounce, getId: utils_1.getId, randomInt: utils_1.randomInt, randomFloat: utils_1.randomFloat, Dates: utils_1.Dates, Colors: utils_1.Colors, Cycle: utils_1.Cycle, Points: utils_1.Points, Sets: utils_1.Sets, Angle: utils_1.Angle, Elements: utils_1.Elements,
    EaseBase: EaseBase_1.EaseBase,
    ExponentialEase: ExponentialEase_1.ExponentialEase,
    Ease: Ease_1.default,
    Ticker: Ticker_1.default,
    Tween: Tween_1.default,
    Theme: theme_1.default,
    Tooltip: tooltip_1.default,
    Volatile: volatile_1.default,
    AbstractPopup: abstractpopup_1.default,
    Popup: popup_1.default,
    PopupMenu: popupmenu_1.default,
    Popover: popover_1.default,
    Slider: slider_1.default,
    Badge: badge_1.default,
    Button: button_1.default,
    ButtonGroup: buttongroup_1.default,
    Checkbox: checkbox_1.default,
    Modal: modal_1.default,
    App: app_1.default,
    Message: message_1.default,
    Progress: progress_1.default,
    ProgressBar: progressbar_1.default,
    ProgressDialog: progressdialog_1.default,
    Capabilities: capabilities_1.default,
    LabeledGraphics: labeledgraphics_1.default,
    List: list_1.default,
    Switch: switch_1.default,
};


/***/ }),

/***/ "./src/abstractpopup.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
//
// Callback for the popup onHidden.
//
// @callback hiddenCallback
// @param { AbstractPopup } abstractPopup - A reference to the popup ( also this refers to the popup ).
//
//
// Class that represents a PixiJS AbstractPopup.
// The class is used for various other Popup-like classes
// like Popup, Message, Tooltip...
//
// @class
// @abstract
// @extends PIXI.Graphics
// @see { @link http://pixijs.download/dev/docs/PIXI.Graphics.html|PIXI.Graphics }
//
var AbstractPopup = /** @class */ (function (_super) {
    __extends(AbstractPopup, _super);
    function AbstractPopup(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        // Convert theme ( string? ) to Theme
        var theme = theme_1.default.fromString(opts.theme);
        _this.theme = theme;
        _this.opts = Object.assign({}, {
            theme: theme,
            id: PIXI.utils.uid(),
            x: 0,
            y: 0,
            header: null,
            content: null,
            minWidth: 320,
            minHeight: 130,
            maxWidth: null,
            //B padding does not exist on theme.
            //B padding: theme.padding,
            padding: opts.padding || theme.opts.padding,
            //B fill does not exist on theme.
            //B fill: theme.fill,
            fill: opts.fill || theme.opts.fill,
            //B fillAlpha does not exist on theme.
            //B fillAlpha: theme.fillAlpha,
            fillAlpha: opts.fillAlpha || theme.opts.fillAlpha,
            anchor: opts.anchor || theme.opts.anchor,
            //B stroke does not exist on theme.
            //B stroke: theme.stroke,
            stroke: opts.stroke || theme.opts.stroke,
            //B strokeWidth does not exist on theme.
            //B strokeWidth: theme.strokeWidth,
            strokeWidth: opts.strokeWidth || theme.opts.strokeWidth,
            //B strokeAlpha does not exist on theme.
            //B strokeAlpha: theme.strokeAlpha,
            strokeAlpha: opts.strokeAlpha || theme.opts.strokeAlpha,
            //B headerStyle does not exist on theme.
            //B headerStyle: theme.textStyleLarge,
            headerStyle: opts.headerStyle || theme.opts.textStyleLarge,
            //B textStyleSmall does not exist on theme.
            //B textStyle: theme.textStyleSmall,
            textStyle: opts.textStyle || theme.opts.textStyleSmall,
            //B radius does not exist on theme.
            //B radius: theme.radius,
            radius: opts.radius || theme.opts.radius,
            onHidden: null,
            visible: true,
            orientation: null // 'portrait' | 'landscape'
        }, opts);
        _this.id = _this.opts.id;
        _this.headerStyle = new PIXI.TextStyle(_this.opts.headerStyle);
        _this.textStyle = new PIXI.TextStyle(_this.opts.textStyle);
        if (_this.opts.maxWidth) {
            _this.headerStyle.wordWrap = true;
            _this.headerStyle.wordWrapWidth = _this.opts.maxWidth - (2 * _this.opts.padding);
            _this.textStyle.wordWrap = true;
            _this.textStyle.wordWrapWidth = _this.opts.maxWidth - (2 * _this.opts.padding);
        }
        _this.alpha = 0;
        _this.visible = _this.opts.visible;
        _this._header = null;
        _this._content = null;
        // position
        _this.x = _this.opts.x;
        _this.y = _this.opts.y;
        // padding
        _this.innerPadding = _this.opts.padding * 1.5;
        // interaction
        //-----------------
        _this.interactive = true;
        //O this.on( 'added', e =>
        // @ts-ignore error TS6133: 'e' is declared but never read
        _this.on('added', function (e) {
            _this.show();
        });
        return _this;
    }
    //
    // Creates the framework and instantiates everything.
    //
    // @protected
    // @return { AbstractPopup } A reference to the popup for chaining.
    //
    AbstractPopup.prototype.setup = function () {
        // position
        //-----------------
        this.sy = this.opts.padding;
        // header
        //-----------------
        if (this.opts.header != null) {
            if (this.opts.header instanceof PIXI.Text) {
                this._header = this.opts.header;
            }
            else if (typeof this.opts.header === 'number') {
                //this._header =  new PIXI.Text( this.opts.header.toString( ), this.headerStyle )
                this._header = new PIXI.Text(this.opts.header.toString());
            }
            else {
                this._header = new PIXI.Text(this.opts.header, this.headerStyle);
            }
            this._header.x = this.opts.padding;
            this._header.y = this.sy;
            this.addChild(this._header);
            this.sy += this._header.height;
        }
        if (this.opts.header && this.opts.content)
            this.sy += this.innerPadding;
        // content
        //-----------------
        if (this.opts.content != null) {
            var content = null;
            if (typeof this.opts.content === 'string') {
                content = new PIXI.Text(this.opts.content, this.textStyle);
            }
            else if (typeof this.opts.content === 'number') {
                content = new PIXI.Text(this.opts.content.toString(), this.textStyle);
            }
            else {
                content = this.opts.content;
            }
            content.x = this.opts.padding;
            content.y = this.sy;
            this.sy += content.height;
            this.addChild(content);
            this._content = content;
        }
        return this;
    };
    //
    // Should be called to refresh the layout of the popup. Can be used after resizing.
    //
    // @return { AbstractPopup } A reference to the popup for chaining.
    //
    AbstractPopup.prototype.layout = function () {
        // wanted width & wanted height
        //-----------------
        var padding = this.opts.padding;
        var size = this.getInnerSize();
        var width = size.width + (2 * padding);
        var height = size.height + (2 * padding);
        this.wantedWidth = Math.max(width, this.opts.minWidth);
        this.wantedHeight = Math.max(height, this.opts.minHeight);
        if (this.opts.maxWidth)
            this.wantedWidth = Math.min(this.wantedWidth, this.opts.maxWidth);
        if (this.opts.radius * 2 > this.wantedWidth)
            this.wantedWidth = this.opts.radius * 2;
        if (this.opts.radius * 2 > this.wantedHeight)
            this.wantedHeight = this.opts.radius * 2;
        switch (this.opts.orientation) {
            case 'portrait':
                if (this.wantedWidth > this.wantedHeight)
                    this.wantedHeight = this.wantedWidth;
                break;
            case 'landscape':
                if (this.wantedHeight > this.wantedWidth)
                    this.wantedWidth = this.wantedHeight;
                break;
        }
        // PIXI should do this. .anchor did not work either
        if (this.headerStyle.align == 'center') {
            this._header.x = (this.wantedWidth - this._header.width) * .5;
        }
        this.draw();
        return this;
    };
    //
    // Draws the canvas.
    //
    // @private
    // @return { AbstractPopup } A reference to the popup for chaining.
    //
    AbstractPopup.prototype.draw = function () {
        var square = Math.round(this.wantedWidth) === Math.round(this.wantedHeight);
        var diameter = Math.round(this.opts.radius * 2);
        this.clear();
        this.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
        //V5 this.beginFill( this.opts.fill, this.opts.fillAlpha )
        this.beginFill(this.opts.fill);
        this.alpha = this.opts.fillAlpha;
        if (square && diameter === this.wantedWidth)
            this.drawCircle(this.wantedWidth / 2, this.wantedHeight / 2, this.opts.radius);
        else
            this.drawRoundedRect(0, 0, this.wantedWidth, this.wantedHeight, this.opts.radius);
        this.endFill();
        return this;
    };
    //
    // Calculates the size of the children of the AbstractPopup.
    // Cannot use getBounds( ) because it is not updated when children
    // are removed.
    //
    // @protected  ( Used by popup  )
    // @returns { object } An JavaScript object width the keys width and height.
    //
    AbstractPopup.prototype.getInnerSize = function () {
        var width = 0;
        var height = 0;
        if (this._header) {
            width = this._header.width;
            height = this._header.height;
        }
        if (this._header && this._content)
            height += this.innerPadding;
        if (this._content) {
            width = Math.max(width, this._content.width);
            height += this._content.height;
        }
        return { width: width, height: height };
    };
    //
    // Shows the popup ( sets his alpha values to 1 ).
    //
    // @param { callback } [cb] - Executed when show animation was completed.
    // @return { AbstractPopup } A reference to the popup for chaining.
    //
    // Must be public as it is used by Modal
    AbstractPopup.prototype.show = function (cb) {
        var _this = this;
        //B fast does not exist on theme.
        //B TweenLite.to( this, this.theme.fast,
        Tween_1.default.to(this, this.theme.opts.fast, {
            alpha: 1,
            onComplete: function () {
                if (cb)
                    cb.call(_this);
            }
        });
        return this;
    };
    //
    // Hides the popup ( sets his alpha values to 0 ).
    //
    // @param { callback } [cb] - Executed when hide animation was completed.
    // @return { AbstractPopup } A reference to the popup for chaining.
    //
    AbstractPopup.prototype.hide = function (cb) {
        var _this = this;
        //B fast does not exist on theme.
        //B TweenLite.to( this, this.theme.fast,
        Tween_1.default.to(this, this.theme.opts.fast, {
            alpha: 0,
            onComplete: function () {
                _this.visible = false;
                if (cb)
                    cb.call(_this);
            }
        });
        if (this.opts.onHidden)
            this.opts.onHidden.call(this, this);
        return this;
    };
    Object.defineProperty(AbstractPopup.prototype, "header", {
        //
        // Sets or gets the header. The getter always returns a PIXI.Text object.
        // The setter can receive a string, a number or a PIXI.Text object.
        //
        // @member { string|number|PIXI.Text }
        //
        get: function () {
            return this._header;
        },
        set: function (value) {
            if (this._header)
                this._header.destroy();
            this.opts.header = value;
            this.setup().layout();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractPopup.prototype, "content", {
        //
        // Sets or gets the content. The getter always returns an PIXI.DisplayObject.
        // The setter can receive a string, a number or a PIXI.DisplayObject.
        //
        // @member { string|number|PIXI.DisplayObject }
        //
        //O get content( ): string | number | PIXI.DisplayObject
        get: function () {
            return this._content;
        },
        //O set content( value: string | number | PIXI.DisplayObject )
        set: function (value) {
            if (this._content) {
                this._content.destroy();
            }
            this.opts.content = value;
            this.setup().layout();
        },
        enumerable: false,
        configurable: true
    });
    return AbstractPopup;
}(PIXI.Graphics));
exports["default"] = AbstractPopup;


/***/ }),

/***/ "./src/app.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/* global apollo, subscriptions, gql */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var progress_1 = __importDefault(__webpack_require__("./src/progress.ts"));
var modal_1 = __importDefault(__webpack_require__("./src/modal.ts"));
var message_1 = __importDefault(__webpack_require__("./src/message.ts"));
var PIXIApp = /** @class */ (function (_super) {
    __extends(PIXIApp, _super);
    function PIXIApp(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        var width = opts.width || null;
        var height = opts.height || null;
        //let view = opts.view || null
        if (opts.backgroundAlpha === undefined)
            opts.backgroundAlpha = 1;
        if (opts.backgroundColor === undefined)
            opts.backgroundColor = 0x282828;
        if (opts.autoResize === undefined)
            opts.autoResize = true;
        if (opts.progress === 'undefined')
            opts.progress = {};
        opts.monkeyPatchMapping = false;
        //let antialias = opts.antialias || true
        //let resolution = window.devicePixelRatio || 1
        var autoResize = opts.autoResize || true;
        //let fpsLogging = false
        //let progress = opts.progress || {}
        // let monkeyPatchMapping = opts.monkeyPatchMapping || true
        // roundPixels is deprerecated since PIXI 5.0.  Use PIXI.settings.ROUND_PIXELS
        if (opts.roundPixels)
            PIXI.settings.ROUND_PIXELS = true;
        else
            PIXI.settings.ROUND_PIXELS = false;
        // Do not pass roundPixels to super constructor
        // or you will get the warning we avoided above.
        delete opts.roundPixels;
        var theme = theme_1.default.fromString(opts.theme);
        var fullScreen = false;
        //B They both need to be set or unset
        //B fullScreen = !opts.width || !opts.height
        fullScreen = !opts.width && !opts.height;
        if (fullScreen) {
            width = window.innerWidth;
            height = window.innerHeight;
        }
        _this = _super.call(this, {
            view: opts.view || null,
            width: width,
            height: height,
            backgroundAlpha: opts.backgroundAlpha,
            backgroundColor: opts.backgroundColor,
            antialias: opts.antialias || true,
            resolution: window.devicePixelRatio || 1,
            forceCanvas: opts.forceCanvas || false,
        }) || this;
        _this.theme = theme;
        _this.width = width;
        _this.height = height;
        //this.monkeyPatchMapping = opts.monkeyPatchMapping || true
        _this.monkeyPatchMapping = false;
        _this.fpsLogging = opts.fpsLogging || false;
        _this.fullScreen = fullScreen;
        _this.progressOpts = opts.progress || {};
        _this.orient = null;
        _this.originalMapPositionToPoint = null;
        _this.autoResize = autoResize || true;
        if (_this.fullScreen || _this.autoResize) {
            console.log('App is in fullScreen mode');
            window.addEventListener('resize', _this.resize.bind(_this));
            document.body.addEventListener('orientationchange', _this.checkOrientation.bind(_this));
        }
        if (_this.monkeyPatchMapping) {
            console.log('Using monkey patched coordinate mapping');
            //O Pluggin the specializtion does not work. Monkey patching does
            //O this.renderer.plugins.interaction = new FullscreenInteractionManager( this.renderer )
            _this.monkeyPatchPixiMapping();
        }
        return _this;
    }
    //
    // Extra setup method to construct complex scenes, etc...
    // Overwrite this method if you need additonal views and components.
    //
    // @return { PIXIApp } A reference to the PIXIApp for chaining.
    //
    PIXIApp.prototype.setup = function () {
        this.scene = this.sceneFactory();
        this.stage.addChild(this.scene);
        // fpsLogging
        if (this.fpsLogging)
            this.addFpsDisplay();
        // GraphQL
        //O if ( this.graphql && typeof apollo !== 'undefined' )
        //O {
        //O    const networkInterface = apollo.createNetworkInterface( {
        //O       uri: '/graphql'
        //O    } )
        //O    const wsClient = new subscriptions.SubscriptionClient( `wss://${location.hostname}/subscriptions`, {
        //O       reconnect: true,
        //O       connectionParams: { }
        //O    })
        //O    const networkInterfaceWithSubscriptions = subscriptions.addGraphQLSubscriptions({ networkInterface, wsClient})
        //O    this.apolloClient = new apollo.ApolloClient({
        //O       networkInterface: networkInterfaceWithSubscriptions
        //O    })
        //O }
        // progress
        this._progress = new progress_1.default(Object.assign({ theme: this.theme }, this.progressOpts, { app: this }));
        this._progress.visible = false;
        this.stage.addChild(this._progress);
        return this;
    };
    //
    // Tests whether the width is larger than the height of the application.
    //
    // @return { boolean } Returns true if app is in landscape mode.
    //
    PIXIApp.prototype.orientation = function () {
        return this.width > this.height;
    };
    //
    // Checks orientation and adapts view size if necessary. Implements a
    // handler for the orientationchange event.
    //
    // @param { event= } - orientationchange event
    //
    //O checkOrientation( event?: PIXI.interaction.InteractionEvent ): void
    // @ts-ignore error TS6133: 'event' is declared but never read
    PIXIApp.prototype.checkOrientation = function (event) {
        var _this = this;
        var value = this.orientation();
        if (value != this.orient) {
            //B setTimeout( 100, function( )
            //B setTimeout is function, interval
            //B setTimeout( 100, function( )
            //B {
            //B    this.orientationChanged( true )
            //B }.bind( this ) )
            setTimeout(function () {
                _this.orientationChanged(true);
            }, 100);
            this.orient = value;
        }
    };
    //
    // Called if checkOrientation detects an orientation change event.
    //
    // @param { boolean= } [ force=false ]
    //        - Called if checkOrientation detects an orientation change event.
    //
    PIXIApp.prototype.orientationChanged = function (force) {
        if (force === void 0) { force = false; }
        if (this.expandRenderer() || force) {
            this.layout();
        }
    };
    //
    // Called after a resize. Empty method but can be overwritten to
    // adapt their layout to the new app size.
    //
    // @param { number } [ width ] - The width of the app.
    // @param { number } [ height ] - The height of the app.
    //
    // @ts-ignore error TS6133: 'width' & height is declared but never read
    PIXIApp.prototype.layout = function (width, height) {
    };
    //
    // Draws the display tree of the app. Typically this can be delegated
    // to the layout method.
    //
    //
    PIXIApp.prototype.draw = function () {
        this.layout(this.width, this.height);
    };
    //
    // Run the application. Override this method with everything
    // that is needed to maintain your App, e.g. setup calls, main loops, etc.
    //
    //
    PIXIApp.prototype.run = function () {
        return this;
    };
    //
    // Overwrite this factory method if your application needs a special
    // scene object.
    //
    // @returns { PIXI.Container }
    //          - A new PIXI Container for use as a scene.
    //
    PIXIApp.prototype.sceneFactory = function () {
        return new PIXI.Container();
    };
    //
    // Adds the display of the frames per second to the renderer in the upper left corner.
    //
    // @return { PIXIApp }
    //         - Returns the PIXIApp for chaining.
    //
    PIXIApp.prototype.addFpsDisplay = function () {
        var fpsDisplay = new FpsDisplay(this);
        this.stage.addChild(fpsDisplay);
        return this;
    };
    Object.defineProperty(PIXIApp.prototype, "size", {
        //
        // Returns the size of the renderer as an object with the keys width and height.
        //
        // @readonly
        // @member { object }
        //
        get: function () {
            return { width: this.width, height: this.height };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PIXIApp.prototype, "center", {
        //
        // Returns the center of the renderer as an object with the keys x and y.
        //
        // @readonly
        // @member { object }
        //
        get: function () {
            return { x: this.width / 2, y: this.height / 2 };
        },
        enumerable: false,
        configurable: true
    });
    //
    // Resizes the renderer to fit into the window or given width and height.
    //
    // @param { object } [ event ]
    //        - The event.
    // @param { object= } [ opts = { } ]
    //        - The event.
    // @param { number } [ opts.width = window.innerWidth ]
    //        - The width of the app to resize to.
    // @param { number } [ opts.height = window.innerHeight ]
    //        - The height of the app to resize to.
    // @return { PIXIApp }
    //        - Returns the PIXIApp for chaining.
    //
    // @ts-ignore error TS6133: 'event' is declared but never read
    PIXIApp.prototype.resize = function (event, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.width, width = _c === void 0 ? window.innerWidth : _c, _d = _b.height, height = _d === void 0 ? window.innerHeight : _d;
        this.width = width;
        this.height = height;
        this.expandRenderer();
        this.layout(width, height);
        // if ( this.scene  ) {
        // console.log( "gl.drawingBufferWidth", this.renderer.view.getContext( 'webgl' ).drawingBufferWidth  )
        // console.log( "scene", this.scene.scale, this.renderer, this.renderer.autoResize, this.renderer.resolution  )
        // }
        return this;
    };
    //
    // @todo Write the documentation.
    //
    // @private
    //
    PIXIApp.prototype.monkeyPatchPixiMapping = function () {
        var _this = this;
        if (this.originalMapPositionToPoint === null) {
            var interactionManager = this.renderer.plugins.interaction;
            this.originalMapPositionToPoint = interactionManager.mapPositionToPoint;
            interactionManager.mapPositionToPoint = function (point, x, y) {
                return _this.fixedMapPositionToPoint(point, x, y);
            };
        }
    };
    //
    // In some browsers the canvas is distorted if the screen resolution and
    // overall size of the canvas exceeds the internal limits ( e.g. 4096 x 4096 pixels ).
    // To compensate these distortions we need to fix the mapping to the actual
    // drawing buffer coordinates.
    // @private
    // @param { any } local
    // @param { number } x
    // @param { number } y
    //
    // @return { } interactionManager.mapPositionToPoint
    //
    PIXIApp.prototype.fixedMapPositionToPoint = function (local, x, y) {
        var resolution = this.renderer.resolution;
        var interactionManager = this.renderer.plugins.interaction;
        var extendWidth = 1.0;
        var extendHeight = 1.0;
        var dy = 0;
        var canvas = this.renderer.view;
        var context = canvas.getContext('webgl');
        if (context !== null && (context.drawingBufferWidth < canvas.width ||
            context.drawingBufferHeight < canvas.height)) {
            extendWidth = context.drawingBufferWidth / canvas.width;
            extendHeight = context.drawingBufferHeight / canvas.height;
            //dx = wantedWidth - context.drawingBufferWidth
            dy = (canvas.height - context.drawingBufferHeight) / resolution;
        }
        x *= extendWidth;
        y *= extendHeight;
        return this.originalMapPositionToPoint.call(interactionManager, local, x, y + dy);
    };
    //
    // Expand the renderer step-wise on resize.
    //
    // @param { number } [ expand ] - The amount of additional space for the renderer [ px].
    // @return { boolean } true if the renderer was resized.
    //
    PIXIApp.prototype.expandRenderer = function (expand) {
        if (expand === void 0) { expand = 256; }
        var renderer = this.renderer;
        // Set but never read
        //O let resolution = this.renderer.resolution
        var ww = this.width;
        var hh = this.height;
        var sw = this.screen.width;
        var sh = this.screen.height;
        if (ww > sw || hh > sh) {
            console.log('App.expandRenderer');
            renderer.resize(ww + expand, hh + expand);
            return true;
        }
        renderer.resize(ww, hh);
        return false;
    };
    //
    // Set the loading progress of the application. If called for
    // the first time, display the progress bar.
    //
    // @param { number } [ value ]
    //        - Should be a value between 0 and 100. If 100, the
    //          progress bar will disappear.
    // @return { PIXIApp|Progress }
    //        - The PixiApp object for chaining or the Progress object
    //          when the method was called without a parameter.
    //
    PIXIApp.prototype.progress = function (value) {
        if (typeof value === 'undefined') {
            return this._progress;
        }
        this._progress.visible = true;
        this._progress.progress = value;
        return this;
    };
    //
    // Opens a new Modal object binded to this app.
    //
    // @param { object } [ opts ] - An options object for the Modal object.
    // @return { Modal } Returns the Modal object.
    //
    PIXIApp.prototype.modal = function (opts) {
        if (opts === void 0) { opts = {}; }
        var modal = new modal_1.default(Object.assign({ theme: this.theme }, opts, { app: this }));
        this.scene.addChild(modal);
        return modal;
    };
    //
    // Opens a new Message object binded to this app.
    //
    // @param { object } [ opts ] - An options object for the Message object.
    // @return { Message } Returns the Message object.
    //
    PIXIApp.prototype.message = function (opts) {
        if (opts === void 0) { opts = {}; }
        var message = new message_1.default(Object.assign({ theme: this.theme }, opts, { app: this }));
        this.scene.addChild(message);
        return message;
    };
    //
    // Loads sprites, e.g. images into the PIXI TextureCache.
    //
    // @param { string|string[ ] } resources
    //        - A String or an Array of urls to the images to load.
    // @param { function } [ loaded ]
    //        - A callback which is executed after all resources has been loaded.
    //          Receives one paramter, a Map of sprites where the key is
    //          the path of the image which was loaded and the value is
    //          the PIXI.Sprite object.
    // @param { object } [ opts ]
    //        - An options object for more specific parameters.
    // @param { boolean } [ opts.resolutionDependent=true ]
    //        - Should the sprites be loaded dependent of the
    //          renderer resolution?
    // @param { boolean } [ opts.progress=false ]
    //        - Should a progress bar display the loading status?
    //
    // @return { PIXIApp }
    //         - The PIXIApp object for chaining.
    //
    PIXIApp.prototype.loadSprites = function (resources, loaded, _a) {
        var _this = this;
        if (loaded === void 0) { loaded = null; }
        var _b = _a === void 0 ? {} : _a, _c = _b.resolutionDependent, resolutionDependent = _c === void 0 ? true : _c, _d = _b.progress, progress = _d === void 0 ? false : _d;
        this.loadTextures(resources, function (textures) {
            var e_1, _a;
            var sprites = new Map();
            try {
                for (var textures_1 = __values(textures), textures_1_1 = textures_1.next(); !textures_1_1.done; textures_1_1 = textures_1.next()) {
                    var _b = __read(textures_1_1.value, 2), key = _b[0], texture = _b[1];
                    sprites.set(key, new PIXI.Sprite(texture));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (textures_1_1 && !textures_1_1.done && (_a = textures_1.return)) _a.call(textures_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (loaded) {
                loaded.call(_this, sprites);
            }
        }, { resolutionDependent: resolutionDependent, progress: progress });
        return this;
    };
    //
    // Loads textures, e.g. images into the PIXI TextureCache.
    //
    // @param { string|string[ ] } resources
    //        - A String or an Array of urls to the images to load.
    // @param { function } [ loaded ]
    //        - A callback which is executed after all resources has been loaded.
    //          Receives one paramter, a Map of textures where the key
    //          is the path of the image which was loaded and the value
    //          is the PIXI.Texture object.
    // @param { object } [ opts ]
    //        - An options object for more specific parameters.
    // @param { boolean } [ opts.resolutionDependent=true ]
    //        - Should the textures be loaded dependent of the
    //          renderer resolution?
    // @param { boolean } [ opts.progress=false ]
    //        - Should a progress bar display the loading status?
    //
    // @return { PIXIApp }
    //         - The PIXIApp object for chaining.
    //
    PIXIApp.prototype.loadTextures = function (resources, loaded, _a) {
        var e_2, _b;
        var _this = this;
        if (loaded === void 0) { loaded = null; }
        var _c = _a === void 0 ? {} : _a, _d = _c.resolutionDependent, resolutionDependent = _d === void 0 ? true : _d, _e = _c.progress, progress = _e === void 0 ? false : _e;
        if (!Array.isArray(resources)) {
            resources = [resources];
        }
        var loader = this.loader;
        try {
            for (var resources_1 = __values(resources), resources_1_1 = resources_1.next(); !resources_1_1.done; resources_1_1 = resources_1.next()) {
                var resource = resources_1_1.value;
                if (!loader.resources[resource]) {
                    if (resolutionDependent) {
                        var resolution = Math.round(this.renderer.resolution);
                        switch (resolution) {
                            case 2:
                                loader.add(resource, resource.replace(/\.([^.]*)$/, '@2x.$1'));
                                break;
                            case 3:
                                loader.add(resource, resource.replace(/\.([^.]*)$/, '@3x.$1'));
                                break;
                            default:
                                loader.add(resource);
                                break;
                        }
                    }
                    else {
                        loader.add(resource);
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (resources_1_1 && !resources_1_1.done && (_b = resources_1.return)) _b.call(resources_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (progress) {
            // loader.on( 'progress', e =>
            loader.onLoad.add(function () {
                //this.progress( e.progress )
                _this.progress(loader.progress);
            });
        }
        // Interesting. without loader, an error occurs that type string (resources)
        // cannot be used to index type loader.
        // @ts-ignore error TS6133: 'loader' is declared but never read
        loader.load(function (loader, resources) {
            var textures = new Map();
            for (var key in resources) {
                textures.set(key, resources[key].texture);
            }
            if (loaded) {
                loaded.call(_this, textures);
            }
        });
        return this;
    };
    return PIXIApp;
}(PIXI.Application));
exports["default"] = PIXIApp;
//
// The class fpsdisplay shows in the upper left corner
// of the renderer the current image refresh rate.
//
// @private
// @class
// @extends PIXI.Graphics
// @see { @link http://pixijs.download/dev/docs/PIXI.Graphics.html|PIXI.Graphics }
//
var FpsDisplay = /** @class */ (function (_super) {
    __extends(FpsDisplay, _super);
    function FpsDisplay(app) {
        var _this = _super.call(this) || this;
        _this.app = app;
        _this.lineStyle(3, 0x434f4f, 1)
            .beginFill(0x434f4f, .6)
            .drawRoundedRect(0, 0, 68, 32, 5)
            .endFill()
            .position.set(20, 20);
        _this.text = new PIXI.Text(_this.fps, new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: 'bold',
            fill: '#f6f6f6',
            stroke: '#434f4f',
            strokeThickness: 3
        }));
        _this.text.position.set(6, 6);
        _this.addChild(_this.text);
        _this.refreshFps();
        window.setInterval(_this.refreshFps.bind(_this), 1000);
        return _this;
    }
    //
    // Refreshes fps number.
    //
    // @return { PIXIApp }
    //         - Returns the PIXIApp object for chaining.
    //
    //refreshFps( ): PIXIApp
    FpsDisplay.prototype.refreshFps = function () {
        this.text.text = "".concat((this.app.ticker.FPS).toFixed(1), " fps");
        //B 'this' is not PIXIApp, but FpsDisplay.  Either the documentation is
        //B wrong or the code is.  I'll go with the documentation. To be checked
        //B later.
        return this;
    };
    return FpsDisplay;
}(PIXI.Graphics));


/***/ }),

/***/ "./src/badge.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var abstractpopup_1 = __importDefault(__webpack_require__("./src/abstractpopup.ts"));
var tooltip_1 = __importDefault(__webpack_require__("./src/tooltip.ts"));
//
// Class that represents a PixiJS Badge.
//
// @example
// // Create the app
// const app = new PIXIApp({
//     view: canvas,
//     width: 900,
//     height: 250
// }).setup().run()
//
// // Add an DisplayObject to the app
// const circle = new PIXI.Graphics()
// circle.beginFill(0x5251a3)
// circle.drawCircle(50, 50, 40)
// app.scene.addChild(circle)
//
// const badge1 = new Badge({
//     object: circle,
//     container: app.scene,
//     content: 'The law is the friend of the weak'.
// })
//
// @class
// @extends AbstractPopup
// @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/badge.html|DocTest}
//
var Badge = /** @class */ (function (_super) {
    __extends(Badge, _super);
    function Badge(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        var theme = theme_1.default.fromString(opts.theme);
        opts = Object.assign({}, {
            minWidth: 0,
            minHeight: 0,
            //O padding: theme.padding / 2,
            padding: theme.opts.padding / 2,
            tooltip: null
        }, opts);
        _this = _super.call(this, opts) || this;
        _this.tooltip = null;
        if (_this.opts.content === null)
            throw ("Error: Badge, Optional parameter content should not be optional");
        // setup
        //-----------------
        _this.setup();
        // layout
        //-----------------
        _this.layout();
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @override
    // @return {Badge} A reference to the badge for chaining.
    ///
    Badge.prototype.setup = function () {
        _super.prototype.setup.call(this);
        // tooltip
        //-----------------
        if (this.opts.tooltip) {
            if (typeof this.opts.tooltip === 'string') {
                this.tooltip = new tooltip_1.default({ object: this, content: this.opts.tooltip });
            }
            else {
                this.opts.tooltip = Object.assign({}, { object: this }, this.opts.tooltip);
                this.tooltip = new tooltip_1.default(this.opts.tooltip);
            }
        }
        return this;
    };
    //
    // Should be called to refresh the layout of the badge. Can be used after resizing.
    //
    // @override
    // @return {Badge} A reference to the badge for chaining.
    //
    Badge.prototype.layout = function () {
        _super.prototype.layout.call(this);
        //T this.content.x = this.width / 2 - this.content.width / 2 - this.opts.strokeWidth / 2
        //T Accessors must always have sane type, so use this._content
        this._content.x = this.width / 2 - this._content.width / 2 -
            this.opts.strokeWidth / 2;
        //T this.content.y = this.height / 2 - this.content.height / 2 - this.opts.strokeWidth / 2
        //T Accessors must always have sane type, so use this._content
        this._content.y = this.height / 2 - this._content.height / 2 -
            this.opts.strokeWidth / 2;
        return this;
    };
    return Badge;
}(abstractpopup_1.default));
exports["default"] = Badge;


/***/ }),

/***/ "./src/button.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var tooltip_1 = __importDefault(__webpack_require__("./src/tooltip.ts"));
var badge_1 = __importDefault(__webpack_require__("./src/badge.ts"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        // See note above.
        _this.grandParent = null;
        var theme = theme_1.default.fromString(opts.theme);
        _this.theme = theme;
        _this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            label: null,
            x: 0,
            y: 0,
            minWidth: 44,
            minHeight: 44,
            //B padding: theme.padding,
            padding: theme.opts.padding,
            icon: undefined,
            iconActive: undefined,
            iconPosition: 'left',
            //B iconColor: theme.iconColor,
            iconColor: theme.opts.iconColor,
            //B iconColorActive: theme.iconColorActive,
            iconColorActive: theme.opts.iconColorActive,
            //B fill: theme.fill,
            fill: theme.opts.fill,
            //B fillAlpha: theme.fillAlpha,
            fillAlpha: theme.opts.fillAlpha,
            //B fillActive: theme.fillActive,
            fillActive: theme.opts.fillActive,
            //B fillActiveAlpha: theme.fillActiveAlpha,
            fillActiveAlpha: theme.opts.fillActiveAlpha,
            //B stroke: theme.stroke,
            stroke: theme.opts.stroke,
            //B strokeWidth: theme.strokeWidth,
            strokeWidth: theme.opts.strokeWidth,
            //B strokeAlpha: theme.strokeAlpha,
            strokeAlpha: theme.opts.strokeAlpha,
            //B strokeActive: theme.strokeActive,
            strokeActive: theme.opts.strokeActive,
            //B strokeActiveWidth: theme.strokeActiveWidth,
            strokeActiveWidth: theme.opts.strokeActiveWidth,
            //B strokeActiveAlpha: theme.strokeActiveAlpha,
            strokeActiveAlpha: theme.opts.strokeActiveAlpha,
            //B textStyle: theme.textStyle,
            textStyle: theme.opts.textStyle,
            //B textStyleActive: theme.textStyleActive,
            textStyleActive: theme.opts.textStyleActive,
            style: 'default',
            //B radius: theme.radius,
            radius: theme.opts.radius,
            disabled: false,
            active: false,
            action: null,
            beforeAction: null,
            afterAction: null,
            type: 'default',
            align: 'center',
            verticalAlign: 'middle',
            tooltip: null,
            badge: null,
            visible: true
        }, opts);
        _this.id = _this.opts.id;
        if (typeof _this.opts.icon === 'undefined' && typeof _this.opts.iconActive !== 'undefined') {
            _this.opts.icon = _this.opts.iconActive;
        }
        else if (typeof _this.opts.icon !== 'undefined' && typeof _this.opts.iconActive === 'undefined') {
            _this.opts.iconActive = _this.opts.icon;
        }
        if (_this.opts.style === 'link') {
            Object.assign(_this.opts, { strokeAlpha: 0, strokeActiveAlpha: 0, fillAlpha: 0, fillActiveAlpha: 0 });
        }
        _this._active = null;
        _this._disabled = null;
        _this.iconInactive = null;
        _this.iconActive = null;
        _this.text = null;
        _this.button = null;
        _this.content = null;
        _this.tooltip = null;
        _this.badge = null;
        _this.visible = _this.opts.visible;
        // setup
        //-----------------
        _this.setup();
        return _this;
    }
    //
    // Captures an event to inform InteractionMapper about processed events.
    //
    // @param {event|PIXI.InteractionEvent} event - The PIXI event to capture.
    //
    // We do not handle event recording
    //capture(event)
    //{
    //   Events.capturedBy(event.data.originalEvent, this)
    //}
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return {Button} A reference to the button for chaining.
    //
    Button.prototype.setup = function () {
        var _this = this;
        // Button
        //-----------------
        var button = new PIXI.Graphics();
        this.button = button;
        this.addChild(button);
        // Content
        //-----------------
        var content = new PIXI.Container();
        this.content = content;
        this.addChild(content);
        // Text
        //-----------------
        if (this.opts.label) {
            this.text = new PIXI.Text(this.opts.label, this.opts.textStyle);
        }
        // Icon
        //-----------------
        if (this.opts.icon) {
            this.iconInactive = this.loadIcon(this.opts.icon, this.opts.iconColor);
        }
        if (this.opts.iconActive) {
            this.iconActive = this.loadIcon(this.opts.iconActive, this.opts.iconColorActive);
        }
        // interaction
        //-----------------
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.button.on('pointerover', function (e) {
            // We do not handle event recording
            // this.capture(e)
            //B TweenLite.to([this.button, this.content], this.theme.fast, {alpha: .83, overwrite: 'none'})
            //B Overwrite is true/false/"auto". Assume none is false
            Tween_1.default.to([_this.button, _this.content], _this.theme.opts.fast, { alpha: .83, overwrite: false });
        });
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.button.on('pointermove', function (e) {
            // We do not handle event recording
            //this.capture(e)
        });
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.button.on('pointerout', function (e) {
            // We do not handle event recording
            //this.capture(e)
            //B TweenLite.to([this.button, this.content], this.theme.fast, {alpha: 1, overwrite: 'none'})
            //B Overwrite is true/false/"auto". Assume none is false
            Tween_1.default.to([_this.button, _this.content], _this.theme.opts.fast, { alpha: 1, overwrite: false });
        });
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.button.on('pointerdown', function (e) {
            // We do not handle event recording
            //this.capture(e)
            //B TweenLite.to([this.button, this.content], this.theme.fast, {alpha: .7, overwrite: 'none'})
            //B Overwrite is true/false/"auto". Assume none is false
            Tween_1.default.to([_this.button, _this.content], _this.theme.opts.fast, { alpha: .7, overwrite: false });
        });
        this.button.on('pointerup', function (e) {
            // We do not handle event recording
            // this.capture(e)
            if (_this.opts.beforeAction) {
                _this.opts.beforeAction.call(_this, e, _this);
            }
            if (_this.opts.action) {
                _this.opts.action.call(_this, e, _this);
            }
            //B TweenLite.to([this.button, this.content], this.theme.fast, {alpha: .83, overwrite: 'none'})
            //B Overwrite is true/false/"auto". Assume none is false
            Tween_1.default.to([_this.button, _this.content], _this.theme.opts.fast, { alpha: .83, overwrite: false });
            if (_this.opts.type === 'checkbox') {
                _this.active = !_this.active;
            }
            if (_this.opts.afterAction) {
                _this.opts.afterAction.call(_this, e, _this);
            }
        });
        // disabled
        //-----------------
        this.disabled = this.opts.disabled;
        // active
        //-----------------
        this.active = this.opts.active; // calls .layout()
        // tooltip
        //-----------------
        if (this.opts.tooltip) {
            if (typeof this.opts.tooltip === 'string') {
                this.tooltip = new tooltip_1.default({ object: this, content: this.opts.tooltip });
            }
            else {
                this.opts.tooltip = Object.assign({}, { object: this }, this.opts.tooltip);
                this.tooltip = new tooltip_1.default(this.opts.tooltip);
            }
        }
        // badge
        //-----------------
        if (this.opts.badge) {
            var opts = Object.assign({}, {
                align: 'right',
                verticalAlign: 'top',
                offsetLeft: 0,
                offsetTop: 0
            });
            if (typeof this.opts.badge === 'string') {
                opts = Object.assign(opts, { content: this.opts.badge });
            }
            else {
                opts = Object.assign(opts, this.opts.badge);
            }
            var badge = new badge_1.default(opts);
            switch (opts.align) {
                case 'left':
                    badge.x = this.x - badge.width / 2 + opts.offsetLeft;
                    break;
                case 'center':
                    badge.x = this.x + this.width / 2 - badge.width / 2 + opts.offsetLeft;
                    break;
                case 'right':
                    badge.x = this.x + this.width - badge.width / 2 + opts.offsetLeft;
            }
            switch (opts.verticalAlign) {
                case 'top':
                    badge.y = this.y - badge.height / 2 + opts.offsetTop;
                    break;
                case 'middle':
                    badge.y = this.y + this.height / 2 - badge.height / 2 + opts.offsetTop;
                    break;
                case 'bottom':
                    badge.y = this.y + this.height - badge.height / 2 + opts.offsetTop;
            }
            this.addChild(badge);
            this.badge = badge;
        }
        // set position
        //-----------------
        this.position.set(this.opts.x, this.opts.y);
        return this;
    };
    //
    // Should be called to refresh the layout of the button. Can be used after resizing.
    //
    // @return {Button} A reference to the button for chaining.
    //
    Button.prototype.layout = function () {
        // Clear content
        //-----------------
        this.removeChild(this.content);
        this.content = new PIXI.Container();
        this.addChild(this.content);
        // Set the icon
        //-----------------
        var icon = null;
        if (!this.active && this.iconInactive) {
            icon = this.iconInactive;
        }
        else if (this.active && this.iconActive) {
            icon = this.iconActive;
        }
        // Set the text
        //-----------------
        if (this.text) {
            this.text.position.set(0, 0);
        }
        // Width and Height
        //-----------------
        var width = 0;
        if (icon && this.text) {
            width = icon.width + this.text.width + 3 * this.opts.padding;
        }
        else if (icon) {
            width = icon.width + 2 * this.opts.padding;
        }
        else if (this.text) {
            width = this.text.width + 2 * this.opts.padding;
        }
        if (width < this.opts.minWidth) {
            width = this.opts.minWidth;
        }
        var height = 0;
        if (icon) {
            height = icon.height + 2 * this.opts.padding;
        }
        else if (this.text) {
            height = this.text.height + 2 * this.opts.padding;
        }
        if (height < this.opts.minHeight) {
            height = this.opts.minHeight;
        }
        this._width = width;
        this._height = height;
        // Position icon and text
        //-----------------
        if (icon && this.text) {
            if (this.opts.iconPosition === 'right') {
                icon.x = this.text.width + this.opts.padding;
            }
            else {
                this.text.x = icon.width + this.opts.padding;
            }
            this.content.addChild(icon, this.text);
        }
        else if (icon) {
            this.content.addChild(icon);
        }
        else if (this.text) {
            this.content.addChild(this.text);
        }
        this.layoutInnerContent();
        this.layoutContent();
        this.icon = icon;
        // draw
        //-----------------
        this.draw();
        return this;
    };
    //
    // Calculates the positions of the content children (icon and/or text).
    //
    // @private
    // @return {Button} A reference to the button for chaining.
    //
    Button.prototype.layoutInnerContent = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.content.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                // We only add PIXI.Text objects or icons (PIXI.Graphics) as children
                // so cast is valid to make typescript happy.
                var buttonChild = child;
                switch (this.opts.verticalAlign) {
                    case 'top':
                        //T child.y = 0
                        buttonChild.y = 0;
                        break;
                    case 'middle':
                        //T child.y = this.content.height / 2 - child.height / 2
                        buttonChild.y = this.content.height / 2 - buttonChild.height / 2;
                        break;
                    case 'bottom':
                        //T child.y = this.content.height - child.height
                        buttonChild.y = this.content.height - buttonChild.height;
                        break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    //
    // Sets the horizontal and vertical position of the content.
    // Uses the option keys "align" and "verticalAlign".
    //
    // @private
    // @return {Button} A reference to the button for chaining.
    //
    Button.prototype.layoutContent = function () {
        switch (this.opts.align) {
            case 'left':
                this.content.x = this.opts.padding;
                break;
            case 'center':
                this.content.x = ((this._width - this.content.width) / 2);
                break;
            case 'right':
                this.content.x = this._width - this.opts.padding - this.content.width;
                break;
        }
        switch (this.opts.verticalAlign) {
            case 'top':
                this.content.y = this.opts.padding;
                break;
            case 'middle':
                this.content.y = (this._height - this.content.height) / 2;
                break;
            case 'bottom':
                this.content.y = this._height - this.opts.padding - this.content.height;
                break;
        }
        return this;
    };
    //
    // Draws the canvas.
    //
    // @private
    // @return {Button} A reference to the button for chaining.
    //
    Button.prototype.draw = function () {
        this.button.clear();
        this.opts.strokeWidth = 1;
        this.opts.strokeActiveWidth = 1;
        if (this.active) {
            this.button.lineStyle(this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha);
            //V5 this.button.beginFill(this.opts.fillActive, this.opts.fillActiveAlpha)
            this.button.alpha = this.opts.fillActiveAlpha;
            this.button.beginFill(this.opts.fillActive);
        }
        else {
            this.button.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
            //V5 this.button.beginFill(this.opts.fill, this.opts.fillAlpha)
            this.button.alpha = this.opts.fillAlpha;
            this.button.beginFill(this.opts.fill);
        }
        this.button.drawRoundedRect(0, 0, this._width, this._height, this.opts.radius);
        this.button.endFill();
        return this;
    };
    Object.defineProperty(Button.prototype, "active", {
        //
        // Gets or sets the active state.
        //
        // @member {boolean}
        //
        get: function () {
            return this._active;
        },
        set: function (value) {
            this._active = value;
            if (this._active) {
                if (this.text) {
                    this.text.style = this.opts.textStyleActive;
                }
            }
            else {
                if (this.text) {
                    this.text.style = this.opts.textStyle;
                }
            }
            this.layout();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "disabled", {
        //
        // Gets or sets the disabled state. When disabled, the button cannot be clicked.
        //
        // @member {boolean}
        //
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value;
            if (this._disabled) {
                this.button.interactive = false;
                this.button.buttonMode = false;
                this.button.alpha = .5;
                if (this.icon) {
                    this.icon.alpha = .5;
                }
                if (this.text) {
                    this.text.alpha = .5;
                }
            }
            else {
                this.button.interactive = true;
                this.button.buttonMode = true;
                this.button.alpha = 1;
                if (this.icon) {
                    this.icon.alpha = 1;
                }
                if (this.text) {
                    this.text.alpha = 1;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    //
    // Shows the button (sets his alpha values to 1).
    //
    // @return {Button} A reference to the button for chaining.
    //
    // Must be public as Modal uses popup an extension of abstractpopup
    Button.prototype.show = function () {
        this.opts.strokeAlpha = 1;
        this.opts.strokeActiveAlpha = 1;
        this.opts.fillAlpha = 1;
        this.opts.fillActiveAlpha = 1;
        this.layout();
        return this;
    };
    //
    // Hides the button (sets his alpha values to 0).
    //
    // @return {Button} A reference to the button for chaining.
    //
    Button.prototype.hide = function () {
        this.opts.strokeAlpha = 0;
        this.opts.strokeActiveAlpha = 0;
        this.opts.fillAlpha = 0;
        this.opts.fillActiveAlpha = 0;
        this.layout();
        return this;
    };
    //
    // Loads an icon
    //
    // @private
    // @param {string|PIXI.Graphics} icon - The icon to load.
    // @param {number} color - The color of the icon (if not an PIXI.Graphic Object).
    // @return {PIXI.Graphics} Return the icon as an PIXI.Graphics Object.
    //
    Button.prototype.loadIcon = function (icon, color) {
        var graphicsObject = null;
        if (icon instanceof PIXI.Graphics) {
            graphicsObject = icon;
        }
        else {
            var size = 17;
            if (this.text) {
                size = this.text.height;
            }
            else if (this.opts.minHeight) {
                size = this.opts.minHeight - (2 * this.opts.padding);
            }
            //O const url = Button.iconIsUrl(icon) ? icon : `../../assets/icons/png/flat/${icon}.png`
            var url = Button.iconIsUrl(icon) ? icon : "./assets/icons/png/flat/".concat(icon, ".png");
            //PIXI V5 const iconTexture = PIXI.Texture.fromImage(url, true)
            var iconTexture = PIXI.Texture.from(url);
            var sprite = new PIXI.Sprite(iconTexture);
            sprite.tint = color;
            sprite.width = size;
            sprite.height = size;
            graphicsObject = sprite;
        }
        return graphicsObject;
    };
    //
    // Tests if an icon string is an url.
    //
    // @private
    // @static
    // @param {string} url - The url to test.
    // @return {boolean} true if the url is an url to an image.
    ///
    Button.iconIsUrl = function (url) {
        return /\.(png|svg|gif|jpg|jpeg|tif|tiff)$/i.test(url);
    };
    Object.defineProperty(Button.prototype, "iconColor", {
        //
        // Gets or sets the color of the current icon (no matter how the status is). Changing the color, changes
        // the tint property of the icon sprite.
        //
        // @member {number}
        //
        get: function () {
            return this.icon ? this.icon.tint : null;
        },
        set: function (value) {
            if (this.icon) {
                this.icon.tint = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    return Button;
}(PIXI.Container));
exports["default"] = Button;


/***/ }),

/***/ "./src/buttongroup.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
//import { AbstractPopupOptions } from './types'
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var button_1 = __importDefault(__webpack_require__("./src/button.ts"));
var ButtonGroup = /** @class */ (function (_super) {
    __extends(ButtonGroup, _super);
    function ButtonGroup(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        var theme = theme_1.default.fromString(opts.theme);
        _this.theme = theme;
        _this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            x: 0,
            y: 0,
            buttons: [],
            minWidth: 44,
            minHeight: 44,
            padding: theme.opts.padding,
            margin: theme.opts.margin,
            iconPosition: 'left',
            iconColor: theme.opts.iconColor,
            iconColorActive: theme.opts.iconColorActive,
            fill: theme.opts.fill,
            fillAlpha: theme.opts.fillAlpha,
            fillActive: theme.opts.fillActive,
            fillActiveAlpha: theme.opts.fillActiveAlpha,
            stroke: theme.opts.stroke,
            strokeWidth: theme.opts.strokeWidth,
            strokeAlpha: theme.opts.strokeAlpha,
            strokeActive: theme.opts.strokeActive,
            strokeActiveWidth: theme.opts.strokeActiveWidth,
            strokeActiveAlpha: theme.opts.strokeActiveAlpha,
            textStyle: theme.opts.textStyle,
            textStyleActive: theme.opts.textStyleActive,
            style: 'default',
            radius: theme.opts.radius,
            disabled: null,
            type: 'default',
            orientation: 'horizontal',
            align: 'center',
            verticalAlign: 'middle',
            visible: true
        }, opts);
        _this.buttons = [];
        _this._disabled = null;
        _this.visible = _this.opts.visible;
        // setup
        //-----------------
        _this.setup();
        // layout
        //-----------------
        _this.layout();
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return {ButtonGroup} A reference to the button group for chaining.
    //
    ButtonGroup.prototype.setup = function () {
        var e_1, _a;
        var _this = this;
        // Buttons
        //-----------------
        var position = 0;
        try {
            for (var _b = __values(this.opts.buttons), _c = _b.next(); !_c.done; _c = _b.next()) {
                var bit = _c.value;
                var it = bit.opts;
                delete it.x;
                delete it.y;
                if (this.opts.orientation === 'horizontal') {
                    it.x = position;
                }
                else {
                    it.y = position;
                }
                //B it.theme = it.theme || this.opts.theme
                //B type string|Theme os not assignable to type Theme.  i believe what is
                //B is required is the converted value.
                it.theme = it.theme || this.theme;
                it.minWidth = it.minWidth || this.opts.minWidth;
                it.minHeight = it.minHeight || this.opts.minHeight;
                it.padding = it.padding || this.opts.padding;
                it.iconPosition = it.iconPosition || this.opts.iconPosition;
                it.iconColor = it.iconColor || this.opts.iconColor;
                it.iconColorActive = it.iconColorActive || this.opts.iconColorActive;
                it.fill = it.fill || this.opts.fill;
                it.fillAlpha = it.fillAlpha || this.opts.fillAlpha;
                it.fillActive = it.fillActive || this.opts.fillActive;
                it.fillActiveAlpha = it.fillActiveAlpha || this.opts.fillActiveAlpha;
                it.stroke = it.stroke || this.opts.stroke;
                it.strokeWidth = it.strokeWidth != null ? it.strokeWidth : this.opts.strokeWidth;
                it.strokeAlpha = it.strokeAlpha != null ? it.strokeAlpha : this.opts.strokeAlpha;
                it.strokeActive = it.strokeActive || this.opts.strokeActive;
                it.strokeActiveWidth = it.strokeActiveWidth != null ? it.strokeActiveWidth : this.opts.strokeActiveWidth;
                it.strokeActiveAlpha = it.strokeActiveAlpha != null ? it.strokeActiveAlpha : this.opts.strokeActiveAlpha;
                it.textStyle = it.textStyle || this.opts.textStyle;
                it.textStyleActive = it.textStyleActive || this.opts.textStyleActive;
                it.style = it.style || this.opts.style;
                it.radius = it.radius != null ? it.radius : this.opts.radius;
                if (!it.type) {
                    switch (this.opts.type) {
                        case 'checkbox':
                            it.type = this.opts.type;
                            break;
                        default:
                            it.type = 'default';
                            break;
                    }
                }
                //it.type = it.type || this.opts.type || 'default'
                it.align = it.align || this.opts.align;
                it.verticalAlign = it.verticalAlign || this.opts.verticalAlign;
                // @ts-ignore error TS6133: 'e' is declared but never read
                it.afterAction = function (event, button) {
                    if (_this.opts.type === 'radio' && button.opts.type === 'default') {
                        _this.buttons.forEach(function (it) {
                            if (it.opts.type === 'default') {
                                it.active = false;
                            }
                        });
                        if (button.opts.type === 'default') {
                            button.active = true;
                        }
                    }
                };
                if (it.tooltip) {
                    if (typeof it.tooltip === 'string') {
                        // @ts-ignore
                        it.tooltip = { content: it.tooltip, container: this };
                    }
                    else {
                        it.tooltip = Object.assign({}, { container: this }, it.tooltip);
                    }
                }
                var button = new button_1.default(it);
                this.addChild(button);
                this.buttons.push(button);
                position += (this.opts.orientation === 'horizontal' ? button.width : button.height) + this.opts.margin;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.opts.orientation === 'vertical') {
            var maxWidth_1 = this.getMaxButtonWidth();
            this.buttons.forEach(function (it) {
                it.opts.minWidth = maxWidth_1;
                it.layout();
            });
        }
        // disabled
        //-----------------
        if (this.opts.disabled != null) {
            this.disabled = this.opts.disabled;
        }
        return this;
    };
    //
    // Should be called to refresh the layout of the button group. Can be used after resizing.
    //
    // @return {ButtonGroup} A reference to the button group for chaining.
    //
    ButtonGroup.prototype.layout = function () {
        // set position
        //-----------------
        this.position.set(this.opts.x, this.opts.y);
        // draw
        //-----------------
        this.draw();
        return this;
    };
    //
    // Draws the canvas.
    //
    // @private
    // @return {ButtonGroup} A reference to the button group for chaining.
    //
    ButtonGroup.prototype.draw = function () {
        var _this = this;
        if (this.opts.margin === 0) {
            this.buttons.forEach(function (it) { return it.hide(); });
            this.clear();
            this.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
            //V5 this.beginFill( this.opts.fill, this.opts.fillAlpha )
            this.beginFill(this.opts.fill);
            this.alpha = this.opts.fillAlpha;
            this.drawRoundedRect(0, 0, this.width, this.height, this.opts.radius);
            // Draw borders
            this.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha / 2);
            this.buttons.forEach(function (it, i) {
                if (i > 0) {
                    _this.moveTo(it.x, it.y);
                    if (_this.opts.orientation === 'horizontal') {
                        _this.lineTo(it.x, it.height);
                    }
                    else {
                        _this.lineTo(it.width, it.y);
                    }
                }
            });
            this.endFill();
        }
        return this;
    };
    Object.defineProperty(ButtonGroup.prototype, "disabled", {
        //
        // Gets or sets the disabled state. When disabled, no button of the button group can be clicked.
        //
        // @member {boolean}
        //
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value;
            this.buttons.forEach(function (it) { return it.disabled = value; });
        },
        enumerable: false,
        configurable: true
    });
    //
    // Searches all buttons of the button group and returns the maximum width of one button.
    //
    // @private
    // @return {number} The maximum with of a button of the button group.
    //
    ButtonGroup.prototype.getMaxButtonWidth = function () {
        var widths = this.buttons.map(function (it) { return it.width; });
        return Math.max.apply(Math, __spreadArray([], __read(widths), false));
    };
    //
    // Shows the button group ( sets his alpha value to 1 ).
    //
    // @return {ButtonGroup} A reference to the button group for chaining.
    //
    // Must be public as Modal uses popup an extension of abstractpopup
    ButtonGroup.prototype.show = function () {
        this.alpha = 1;
        return this;
    };
    //
    // Hides the button group ( sets his alpha value to 0 ).
    //
    // @return {ButtonGroup} A reference to the button group for chaining.
    //
    ButtonGroup.prototype.hide = function () {
        this.alpha = 0;
        return this;
    };
    return ButtonGroup;
}(PIXI.Graphics));
exports["default"] = ButtonGroup;


/***/ }),

/***/ "./src/capabilities.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CapabilitiesTests = void 0;
// Report capabilities with guaranteed values.
//
var Capabilities = /** @class */ (function () {
    function Capabilities() {
    }
    Object.defineProperty(Capabilities, "userAgent", {
        // Returns the browser userAgent.
        // @return { string }
        //
        get: function () {
            return navigator.userAgent || 'Unknown Agent';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Capabilities, "isMobile", {
        // Tests whether the app is running on a mobile device.
        // Implemented as a readonly attribute.
        // @return { boolean }
        //
        get: function () {
            return (/Mobi/.test(navigator.userAgent));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Capabilities, "isIOS", {
        // Tests whether the app is running on a iOS device.
        // Implemented as a readonly attribute.
        // @return { boolean }
        //
        get: function () {
            // @ts-ignore - error TS2339: Property 'MSStream' does not exist on type 'Window & typeof globalThis'.
            return (/iPad|iPhone|iPod/.test(navigator.userAgent)) && !window.MSStream;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Capabilities, "isSafari", {
        // Tests whether the app is running in a Safari environment.
        // See https://stackoverflow.com/questions/7944460/detect-safari-browser
        // Implemented as a readonly attribute.
        // @return { boolean }
        //
        get: function () {
            return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Capabilities, "isElectron", {
        //
        // Distincts if the app is running inside electron or not.
        //
        // source: https://discuss.atom.io/t/detect-electron-or-web-page-running/33180/3
        //
        get: function () {
            // @ts-ignore
            return typeof process != 'undefined' && process.versions && process.versions.electron !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Capabilities, "devicePixelRatio", {
        // Returns the display resolution. Necessary for retina displays.
        // @return { number }
        //
        get: function () {
            return window.devicePixelRatio || 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Capabilities, "isMultiTouchTable", {
        // Returns true if the device is a multi-touch table. This method is currently not universal usable and not sure!
        // @return { boolean }
        //
        get: function () {
            return Capabilities.devicePixelRatio > 2 && Capabilities.isMobile === false && /Windows/i.test(Capabilities.userAgent);
        },
        enumerable: false,
        configurable: true
    });
    // Returns true if mouse events are supported
    // @return { boolean }
    //
    Capabilities.supportsMouseEvents = function () {
        return typeof (window.MouseEvent) != 'undefined';
    };
    // Returns true if touch events are supported
    // @return { boolean }
    //
    Capabilities.supportsTouchEvents = function () {
        return typeof (window.TouchEvent) != 'undefined';
    };
    // Returns true if pointer events are supported
    // @return { boolean }
    //
    Capabilities.supportsPointerEvents = function () {
        return typeof (window.PointerEvent) != 'undefined';
    };
    // Returns true if DOM templates are supported
    // @return { boolean }
    //
    Capabilities.supportsTemplate = function () {
        return 'content' in document.createElement('template');
    };
    return Capabilities;
}());
exports["default"] = Capabilities;
// Basic tests for Capabilities.
//
var CapabilitiesTests = /** @class */ (function () {
    function CapabilitiesTests() {
    }
    CapabilitiesTests.testConfirm = function () {
        var bool = confirm('Please confirm');
        document.getElementById('demo').innerHTML = (bool) ? 'Confirmed' : 'Not confirmed';
    };
    CapabilitiesTests.testPrompt = function () {
        var person = prompt('Please enter your name', 'Harry Potter');
        if (person != null) {
            //O demo.innerHTML = 'Hello ' + person + '! How are you today?'
            document.getElementById('demo').innerHTML = 'Hello ' + person + '! How are you today?';
        }
    };
    CapabilitiesTests.testUserAgent = function () {
        var agent = 'User-agent: ' + Capabilities.userAgent;
        //O user_agent.innerHTML = agent
        document.getElementById('user_agent').innerHTML = agent;
    };
    CapabilitiesTests.testDevicePixelRatio = function () {
        var value = 'Device Pixel Ratio: ' + Capabilities.devicePixelRatio;
        //O device_pixel_ratio.innerHTML = value
        document.getElementById('device_pixel_ratio').innerHTML = value;
    };
    CapabilitiesTests.testMultiTouchTable = function () {
        var value = 'Is the device a multi-touch table? ' + Capabilities.isMultiTouchTable;
        //O multi_touch_table.innerHTML = value
        document.getElementById('multi_touch_table').innerHTML = value;
    };
    CapabilitiesTests.testSupportedEvents = function () {
        var events = [];
        if (Capabilities.supportsMouseEvents()) {
            events.push('MouseEvents');
        }
        if (Capabilities.supportsTouchEvents()) {
            events.push('TouchEvents');
        }
        if (Capabilities.supportsPointerEvents()) {
            events.push('PointerEvents');
        }
        //O supported_events.innerHTML = 'Supported Events: ' + events.join( ', ' )
        document.getElementById('supported_events').innerHTML = 'Supported Events: ' + events.join(', ');
    };
    CapabilitiesTests.testAll = function () {
        this.testUserAgent();
        this.testDevicePixelRatio();
        this.testMultiTouchTable();
        this.testSupportedEvents();
    };
    return CapabilitiesTests;
}());
exports.CapabilitiesTests = CapabilitiesTests;
// Optional global variables, needed in DocTests. //
// @ts-ignore
window.Capabilities = Capabilities;
// @ts-ignore
window.CapabilitiesTests = CapabilitiesTests;


/***/ }),

/***/ "./src/checkbox.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

//
// Convenince Class that extends Button with type='checkbox'.
//
// @example
// // Create the Checkbox
// const checkbox = new Checkbox({
//     label: 'My Checkbox',
//     action: () => console.log('Checked')
// })
//
// See Button for full list of options
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var button_1 = __importDefault(__webpack_require__("./src/button.ts"));
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    //
    // Creates an instance of a Checkbox.
    //
    // @constructor  ( Same as Button, except type = 'checkbox'
    // @param {object} [opts]
    //        - An options object to specify to style and behaviour of the button.
    // @param {number} [opts.id=auto generated]
    //        - The id of the button.
    // @param {string} [opts.label]
    //        - The label of the button.
    // @param {number} [opts.x=0]
    //        - The x position of the button. Can be also set after
    //          creation with button.x = 0.
    // @param {number} [opts.y=0]
    //        - The y position of the button. Can be also set after
    //          creation with button.y = 0.
    // @param {string|Theme} [opts.theme=dark]
    //        - The theme to use for this button. Possible values are dark, light, red
    //          or a Theme object.
    // @param {number} [opts.minWidth=44]
    //        - The minimum width of the button.
    // @param {number} [opts.minHeight=44]
    //        - The minimum height of the button.
    // @param {number} [opts.padding=Theme.padding]
    //        - The inner spacing (distance from icon and/or label) to the border.
    // @param {string|PIXI.DisplayObject} [opts.icon]
    //        - The icon of the button. Can be a predefined one,
    //          an URL or an PIXI.DisplayObject.
    // @param {string|PIXI.DisplayObject} [opts.iconActive=icon]
    //        - The icon of the button when activated. Can be a
    //          predefined one, an URL or an PIXI.DisplayObject.
    // @param {string} [opts.iconPosition=left]
    //        - The position of the icon in relation to the label. Can be left or right.
    // @param {number} [opts.iconColor=Theme.iconColor]
    //        - The color of the icon (set by the tint property) as a hex value.
    // @param {number} [opts.iconColorActive=Theme.iconColorActive]
    //        - The color of the icon when activated.
    // @param {number} [opts.fill=Theme.fill]
    //        - The color of the button background as a hex value.
    // @param {number} [opts.fillAlpha=Theme.fillAlpha]
    //        - The alpha value of the background.
    // @param {number} [opts.fillActive=Theme.fillActive]
    //        - The color of the button background when activated.
    // @param {number} [opts.fillActiveAlpha=Theme.fillActiveAlpha]
    //        - The alpha value of the background when activated.
    // @param {number} [opts.stroke=Theme.stroke]
    //        - The color of the border as a hex value.
    // @param {number} [opts.strokeWidth=Theme.strokeWidth]
    //        - The width of the border in pixel.
    // @param {number} [opts.strokeAlpha=Theme.strokeAlpha]
    //        - The alpha value of the border.
    // @param {number} [opts.strokeActive=Theme.strokeActive]
    //        - The color of the border when activated.
    // @param {number} [opts.strokeActiveWidth=Theme.strokeActiveWidth]
    //        - The width of the border in pixel when activated.
    // @param {number} [opts.strokeActiveAlpha=Theme.strokeActiveAlpha]
    //        - The alpha value of the border when activated.
    // @param {object} [opts.textStyle=Theme.textStyle]
    //        - A textstyle object for the styling of the label. See PIXI.TextStyle
    //          for possible options.
    // @param {number} [opts.textStyleActive=Theme.textStyleActive]
    //        - A textstyle object for the styling of the label when the
    //          button is activated. See PIXI.TextStyle for possible options.
    // @param {string} [opts.style=default]
    //        - A shortcut for styling options. Possible values are default, link.
    // @param {number} [opts.radius=Theme.radius]
    //        - The radius of the four corners of the button
    //          (which is a rounded rectangle).
    // @param {boolean} [opts.disabled=false]
    //        - Is the button disabled? When disabled, the button has a lower alpha value
    //          and cannot be clicked (interactive is set to false).
    // @param {boolean} [opts.active=false]
    //        - Is the button initially active?
    // @param {actionCallback} [opts.action]
    //        - Executed when the button was triggered (by pointerup).
    // @param {beforeActionCallback} [opts.beforeAction]
    //        - Executed before the main action is triggered.
    // @param {afterActionCallback} [opts.afterAction]
    //        - Executed after the main action was triggered.
    // @param {string} [opts.type=default]
    //        - set to checkbox
    // @param {string} [opts.align=center]
    //        - The horizontal position of the label and the icon. Possible values are
    //          left, center and right. Only affects the style when the minWidth
    //          is bigger than the width of the icon and label.
    // @param {string} [opts.verticalAlign=middle]
    //        - The vertical position of the label and the icon. Possible values are
    //          top, middle and button. Only affects the style when the minHeight
    //          is bigger than the height of the icon and label.
    // @param {string|object} [opts.tooltip]
    //        - A string for the label of the tooltip or an object to
    //          configure the tooltip
    //          to display.
    // @param {string|object} [opts.badge]
    //        - A string for the label of the badge or an object to configure
    //          the badge to display.
    //          If the parameter is an object, all badge options can be set
    //          plus the following:
    // @param {string} [opts.badge.align=right]
    //        - The horizontal alignment of the badge.
    //          Possible values: left, center, right
    // @param {string} [opts.badge.verticalAlign=top]
    //        - The vertical alignment of the badge. Possible values: top, middle, bottom
    // @param {number} [opts.badge.offsetLeft=0]
    //        - The horizontal shift of the badge.
    // @param {number} [opts.badge.offsetTop=0]
    //        - The vertical shift of the badge.
    // @param {boolean} [opts.visible=true]
    //        - Is the button initially visible (property visible)?
    //
    function Checkbox(opts) {
        if (opts === void 0) { opts = {}; }
        opts.type = 'checkbox';
        return _super.call(this, opts) || this;
    }
    return Checkbox;
}(button_1.default));
exports["default"] = Checkbox;


/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var UI_1 = __webpack_require__("./src/UI.ts");
var Library = {
    UI: UI_1.UI,
};
//dump everything into extras
Object.assign(PIXI, Library);
module.exports = Library;


/***/ }),

/***/ "./src/labeledgraphics.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpriteLabel = exports.Hypenate = exports.FontInfo = exports.deepObject = void 0;
var PIXI = __importStar(__webpack_require__("pixi.js"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var types_1 = __webpack_require__("./src/types.ts");
// Try to resolve the mess below.
var defaultTheme = new theme_1.default();
function deepObject(source) {
    var result = {};
    Object.keys(source).forEach(function (key) {
        // @ts-ignore
        var value = source[key];
        // @ts-ignore
        result[key] = deep(value);
    }, {});
    return result;
}
exports.deepObject = deepObject;
//
// Defines usefull default text styles.
//
var FontInfo = /** @class */ (function () {
    function FontInfo() {
    }
    Object.defineProperty(FontInfo, "small", {
        get: function () {
            //O return app.theme.textStyle.textStyleSmall
            var w = null;
            if (window.app && (window.app).theme) {
                w = ((window.app).theme);
                if (w.opts && w.opts.textStyle)
                    return w.opts.textStyleSmall;
                else
                    console.warn("labeledgraphics: small Doh");
            }
            console.warn("labeledgraphics: small called.  Should fix this....");
            return defaultTheme.opts.textStyleSmall;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FontInfo, "fontSize", {
        get: function () {
            //O return app.theme.textStyle
            var w = null;
            if (window.app && (window.app).theme) {
                w = ((window.app).theme);
                if (w.opts && w.opts.textStyle)
                    return w.opts.textStyle.fontSize;
                else
                    console.warn("labeledgraphics: fontSize Doh");
            }
            console.warn("labeledgraphics: fontSize called.  Should fix this....");
            return defaultTheme.opts.textStyle.fontSize;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FontInfo, "normal", {
        get: function () {
            //O return app.theme.textStyle
            var w = null;
            if (window.app && (window.app).theme) {
                w = ((window.app).theme);
                if (w.opts && w.opts.textStyle)
                    return w.opts.textStyle;
                else
                    console.warn("labeledgraphics: normal Doh");
            }
            console.warn("labeledgraphics: normal called.  Should fix this....");
            return defaultTheme.opts.textStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FontInfo, "centered", {
        get: function () {
            //O return Object.assign( { }, app.theme.textStyle, { align: 'center' } )
            var w = null;
            if (window.app && (window.app).theme) {
                w = ((window.app).theme);
                if (w.opts.textStyle)
                    return Object.assign({}, w.opts.textStyle, { align: 'center' });
                else
                    console.warn("labeledgraphics: centered Doh");
            }
            console.warn("labeledgraphics: centered called.  Should fix this....");
            return defaultTheme.opts.textStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FontInfo, "fontFamily", {
        get: function () {
            // This was missing ...
            var w = null;
            if (window.app && (window.app).theme) {
                w = ((window.app).theme);
                if (w.opts.textStyle)
                    return w.opts.textStyle.fontFamily;
                else
                    console.warn("labeledgraphics: fontFamily Doh");
            }
            console.warn("labeledgraphics: centered called.  Should fix this....");
            return defaultTheme.opts.textStyle.fontFamily;
        },
        enumerable: false,
        configurable: true
    });
    return FontInfo;
}());
exports.FontInfo = FontInfo;
//
// Static methods to support hyphenation of lines.
//
// @class Hypenate
//
var Hypenate = /** @class */ (function () {
    function Hypenate() {
    }
    Hypenate.splitPart = function (part) {
        var e_1, _a;
        var parts = part.split('-');
        if (parts.length == 1)
            return [part];
        var result = [];
        var last = parts.pop();
        try {
            for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                var p = parts_1_1.value;
                result.push(p + '-');
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) _a.call(parts_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        result.push(last);
        return result.filter(function (p) { return p.length > 0; });
    };
    Hypenate.splitWord = function (word) {
        //B qu'Est-ce que c'est
        //B if ( typeof ( language ) == 'undefined' )
        //B{
        if (word.indexOf('-') > -1) {
            return word.split('-');
        }
        return [word];
        //B
        /* NO IDEAL WHAT LANGUAGE IS OR MEANT TO BE IN THIS CODE
        let parts = language.hyphenate( word )
        let result = [ ]
        for ( let part of parts )
        {
           for ( let splitted of this.splitPart( part ) )
           {
              result.push( splitted )
           }
        }
        return result
        */
    };
    Hypenate.abbreviateLine = function (label, style, width) {
        var pixiStyle = new PIXI.TextStyle(style);
        var metrics = PIXI.TextMetrics.measureText(label, pixiStyle);
        while (metrics.width > width && label.length > 3) {
            label = label.slice(0, label.length - 1);
            metrics = PIXI.TextMetrics.measureText(label, pixiStyle);
        }
        label = label.slice(0, label.length - 1);
        return label + '…';
    };
    //O static splitLine( line: string, pixiStyle, width: number, space, minus )
    Hypenate.splitLine = function (line, pixiStyle, width, space) {
        var e_2, _a, e_3, _b;
        var x = 0;
        var result = '';
        var words = line.split(' ');
        try {
            for (var words_1 = __values(words), words_1_1 = words_1.next(); !words_1_1.done; words_1_1 = words_1.next()) {
                var word = words_1_1.value;
                var wordMetrics = PIXI.TextMetrics.measureText(word, pixiStyle);
                if (x + wordMetrics.width >= width) {
                    var parts = this.splitWord(word);
                    var newWord = '';
                    if (parts.length == 1) {
                        newWord += '\n' + word + ' ';
                        x = wordMetrics.width + space.width;
                    }
                    else {
                        var first = true;
                        var lastPart = '';
                        try {
                            for (var parts_2 = (e_3 = void 0, __values(parts)), parts_2_1 = parts_2.next(); !parts_2_1.done; parts_2_1 = parts_2.next()) {
                                var part = parts_2_1.value;
                                var partMetrics = PIXI.TextMetrics.measureText(part, pixiStyle);
                                if (x + partMetrics.width + space.width > width) {
                                    newWord += ((first || lastPart.endsWith('-')) ? '\n' : '-\n') + part;
                                    x = partMetrics.width;
                                }
                                else {
                                    newWord += part;
                                    x += partMetrics.width;
                                }
                                lastPart = part;
                                first = false;
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (parts_2_1 && !parts_2_1.done && (_b = parts_2.return)) _b.call(parts_2);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        x += space.width;
                    }
                    result += newWord + ' ';
                }
                else {
                    result += word + ' ';
                    x += wordMetrics.width + space.width;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (words_1_1 && !words_1_1.done && (_a = words_1.return)) _a.call(words_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    //
    //  Main method and entry point for text hyphenation 
    //
    // @static
    // @param { * } text
    // @param { * } style
    // @param { * } width
    //
    // @returns { string }
    // @memberof Hypenate
    //
    Hypenate.splitLines = function (text, style, width) {
        var e_4, _a;
        var pixiStyle = new PIXI.TextStyle(style);
        var lines = text.split('\n');
        var space = PIXI.TextMetrics.measureText(' ', pixiStyle);
        //const minus = PIXI.TextMetrics.measureText( '-', pixiStyle )
        var result = [];
        try {
            for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                var line = lines_1_1.value;
                //O result.push( this.splitLine( line, pixiStyle, width, space, minus ) )
                result.push(this.splitLine(line, pixiStyle, width, space));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return result.join('\n');
    };
    return Hypenate;
}());
exports.Hypenate = Hypenate;
var TextLabel = /** @class */ (function (_super) {
    __extends(TextLabel, _super);
    function TextLabel(text, style, canvas, _a) {
        if (style === void 0) { style = null; }
        if (canvas === void 0) { canvas = null; }
        var _b = _a === void 0 ? {} : _a, _c = _b.minZoom, minZoom = _c === void 0 ? 0.1 : _c, _d = _b.maxZoom, maxZoom = _d === void 0 ? 10 : _d;
        var _this = _super.call(this, text, style, canvas) || this;
        _this.normFontSize = (0, types_1.strNumToNum)(_this.style.fontSize);
        _this.minZoom = minZoom;
        _this.maxZoom = maxZoom;
        return _this;
    }
    TextLabel.prototype.zoom = function (factor) {
        var oldValue = (0, types_1.strNumToNum)(this.style.fontSize) / this.normFontSize;
        var value = oldValue * factor;
        this.setZoom(value);
    };
    TextLabel.prototype.setZoom = function (value) {
        var oldValue = (0, types_1.strNumToNum)(this.style.fontSize) / this.normFontSize;
        if (value > this.maxZoom) {
            value = this.maxZoom;
        }
        if (value < this.minZoom) {
            value = this.minZoom;
        }
        if (value != oldValue) {
            this.style.fontSize = Math.max(value * this.normFontSize, 1);
        }
    };
    TextLabel.prototype.setZoomAndScale = function (scale) {
        this.scale.set(1 / scale);
        this.setZoom(scale);
    };
    return TextLabel;
}(PIXI.Text));
//
// A specialization of the PIXI.Graphics class that allows to
// resuse and place labels across different layout variants
//
// @export
// @class LabeledGraphics
// @extends { PIXI.Graphics }
//
var LabeledGraphics = /** @class */ (function (_super) {
    __extends(LabeledGraphics, _super);
    //
    // Creates an instance of LabeledGraphics and defines a local label cache.
    // 
    // @memberof LabeledGraphics
    //
    function LabeledGraphics() {
        var _this = _super.call(this) || this;
        _this.labels = new Map();
        return _this;
    }
    LabeledGraphics.prototype._createText = function (label, fontInfo) {
        return new TextLabel(label, fontInfo);
    };
    //
    // Main additional method. Ensures that a text object is created that is cached
    // under the given key.
    //
    // @param { * } key
    //        - The cache key
    // @param { * } label
    //        - The label to show
    // @param { * } [ attrs={ } ]
    //        - Defines attributes of the text object. 
    //          align: 'right', 'left', or 'center'
    //          justify: 'top', 'bottom', or 'center'
    //          maxLines: { integer } truncates the text and adds ellipsis
    //          maxHeight: { number } truncates text that needs more space
    //                                and adds ellipsis
    //          maxWidth: { number } word wraps text using hyphenation if possible
    // @param { * } [ fontInfo=FontInfo.normal ]
    //        - Defines PIXI.TextStyle attributes
    //
    // @returns { PIXI.Text }
    //          - instance
    //
    // @memberof LabeledGraphics
    //
    LabeledGraphics.prototype.ensureLabel = function (key, label, attrs, fontInfo) {
        if (attrs === void 0) { attrs = {}; }
        if (fontInfo === void 0) { fontInfo = FontInfo.normal; }
        if (attrs.maxWidth && attrs.maxLines == 1) {
            label = Hypenate.abbreviateLine(label, fontInfo, attrs.maxWidth);
        }
        else {
            if (attrs.maxWidth) {
                label = Hypenate.splitLines(label, fontInfo, attrs.maxWidth);
            }
            if (attrs.maxLines) {
                label = this.truncateLabel(label, fontInfo, attrs.maxLines);
            }
            if (attrs.maxHeight) {
                var styleInfo = new PIXI.TextStyle(fontInfo);
                var metrics = PIXI.TextMetrics.measureText(label, styleInfo);
                var maxLines = Math.max(attrs.maxHeight / metrics.lineHeight, 1);
                label = this.truncateLabel(label, fontInfo, maxLines);
            }
        }
        if (!this.labels.has(key)) {
            var text_1 = this._createText(label, fontInfo);
            this.labels.set(key, text_1);
            this.addChild(text_1);
        }
        var text = this.labels.get(key);
        for (var k in attrs) {
            text[k] = attrs[k];
        }
        if (label != text.text)
            text.text = label;
        // We do not follow the flexbox jargon and use align for x and justify for y axis
        // This deviation is needed to ensure backward compatability
        switch (attrs.justify || null) {
            case 'top':
                text.anchor.y = 0;
                break;
            case 'bottom':
                text.anchor.x = 1;
                break;
            default:
                text.anchor.y = 0.5;
                break;
        }
        switch (attrs.align) {
            case 'right':
                text.anchor.x = 1;
                break;
            case 'center':
                text.anchor.x = 0.5;
                break;
            default:
                text.anchor.x = 0;
                break;
        }
        text.visible = true;
        return text;
    };
    //
    // Private method that truncates the text and adds an ellipsis if there are more lines
    // than wanted
    //
    // @param { * } text
    // @param { * } style
    // @param { * } [ maxLines=Infinity ]
    //
    // @returns { string }
    // @memberof LabeledGraphics
    //
    LabeledGraphics.prototype.truncateLabel = function (text, style, maxLines) {
        if (maxLines === void 0) { maxLines = Infinity; }
        if (maxLines === Infinity) {
            return text;
        }
        var wordWrapWidth = style.wordWrapWidth;
        var pixiStyle = new PIXI.TextStyle(style);
        var lines = PIXI.TextMetrics.measureText(text, pixiStyle).lines;
        var newText = text;
        if (lines.length > maxLines) {
            var truncatedLines = lines.slice(0, maxLines);
            var lastLine = truncatedLines[truncatedLines.length - 1];
            var words_2 = lastLine.split(' ');
            var wordMetrics = PIXI.TextMetrics.measureText("\u00A0\n...\n".concat(words_2.join('\n')), pixiStyle);
            var _a = __read(wordMetrics.lineWidths), spaceLength_1 = _a[0], dotsLength = _a[1], wordLengths = _a.slice(2);
            var newLastLine = wordLengths.reduce(function (data, wordLength, i) {
                if (data.length + wordLength + spaceLength_1 >= wordWrapWidth) {
                    return __assign(__assign({}, data), { length: wordWrapWidth });
                }
                return {
                    text: "".concat(data.text).concat(i > 0 ? ' ' : '').concat(words_2[i]),
                    length: data.length + wordLength + spaceLength_1,
                };
            }, { text: '', length: dotsLength }).text;
            truncatedLines[truncatedLines.length - 1] = "".concat(newLastLine, "...");
            newText = truncatedLines.join('\n');
        }
        return newText;
    };
    //
    // Returns the label for the given key.
    //
    // @param { * } key
    //
    // @returns { Object }
    // @memberof LabeledGraphics
    //
    LabeledGraphics.prototype.getLabel = function (key) {
        return this.labels.get(key);
    };
    //
    // Hides the label with the given key.
    //
    // @param { * } key
    // @memberof LabeledGraphics
    //
    LabeledGraphics.prototype.hideLabel = function (key) {
        var label = this.labels.get(key);
        if (label) {
            label.visible = false;
        }
    };
    // 
    // Removes the label with the given key.
    // @param { * } key
    // @memberof LabeledGraphics
    //
    LabeledGraphics.prototype.removeLabel = function (key) {
        var label = this.labels.get(key);
        this.labels.delete(key);
        label.destroy();
    };
    //
    // Ensures that labels are hidden on clear.
    //
    // @memberof LabeledGraphics
    // WTF is wrong with this statement
    // @ts-ignore error TS2416: Property 'clear' in type 'LabeledGraphics' is not assignable to the same property in base type 'Graphics'.
    LabeledGraphics.prototype.clear = function () {
        var e_5, _a;
        var r = _super.prototype.clear.call(this);
        try {
            for (var _b = __values(this.labels.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                this.hideLabel(key);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        // return this
        //return super
        return r;
    };
    //
    // Logs debugging infos
    //
    // @memberof LabeledGraphics
    //
    LabeledGraphics.prototype.debugInfos = function () {
        console.log({ size: this.labels.size, labels: this.labels });
    };
    return LabeledGraphics;
}(PIXI.Graphics));
exports["default"] = LabeledGraphics;
var labelCache = new Map();
function getTexture(label, style) {
    if (style === void 0) { style = FontInfo.normal; }
    //O let key = label + fontInfo.fontFamily + fontInfo.fontSize
    var key = label + style.fontFamily + style.fontSize;
    if (labelCache.has(key)) {
        return labelCache.get(key);
    }
    // let expandedFont = Object.assign( { }, fontInfo )
    var expandedStyle = Object.assign({}, style);
    //O expandedFont.fontSize *= window.devicePixelRatio
    if (typeof expandedStyle.fontSize == 'number')
        expandedStyle.fontSize *= window.devicePixelRatio;
    //Olet text = new PIXI.Text( label, expandedFont )
    var text = new PIXI.Text(label, expandedStyle);
    // The below makes no sense to me as it does exist?
    // @ts-ignore TS2339: Property 'updateText' does not exist on type 'Text'.
    text.updateText();
    labelCache.set(key, text.texture);
    return text.texture;
}
// This was never exported. Perhaps this is why BitmappedLabeledGraphics is here?. Maybe this is the class that is wrong.
var SpriteLabel = /** @class */ (function (_super) {
    __extends(SpriteLabel, _super);
    //O constructor( label: string, fontInfo?: FontInfo )
    //B FontInfo is static and cannot be used this way
    function SpriteLabel(label, style) {
        var _this = this;
        if (!style)
            style = FontInfo.normal;
        //O let texture = getTexture( label, fontInfo )
        var texture = getTexture(label, style);
        _this = _super.call(this, texture) || this;
        //O this.fontInfo = fontInfo
        _this.style = style;
        _this.label = label;
        _this.scale.set(0.8 / window.devicePixelRatio);
        return _this;
    }
    Object.defineProperty(SpriteLabel.prototype, "text", {
        get: function () {
            return this.label;
        },
        set: function (label) {
            this.label = label;
            //O this.texture = getTexture( label, this.fontInfo )
            this.texture = getTexture(label, this.style);
        },
        enumerable: false,
        configurable: true
    });
    return SpriteLabel;
}(PIXI.Sprite));
exports.SpriteLabel = SpriteLabel;
/* This is just crap. it has no reason to extend LabelGraphics and then retuen a SpriteLabel with a parameter that is incompatible with SpriteLabel.

timeline extends it, but thankfully does not call createText, so it can extend
LabeledGraphics instead.
export class BitmapLabeledGraphics extends LabeledGraphics
{
   //O _createText( label: string, fontInfo?: PIXI.TextStyle ): SpriteLabel
   // @ts-ignore TS2416: Property '_createText' in type 'BitmapLabeledGraphics' is not assignable to the same property in base type 'LabeledGraphics'  Stupid TypeScript
   _createText( label: string, style?: PIXI.TextStyle ): SpriteLabel
   {
      //O let texture = getTexture( label, fontInfo )
      let texture = getTexture( label, style )
      return new SpriteLabel( texture )
   }
}
*/


/***/ }),

/***/ "./src/list.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
// No brackets, imports the default created Tween Instance from new.
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
// No brackets, imports the default created Ease Instance from new.
var Ease_1 = __importDefault(__webpack_require__("./src/Ease/Ease.ts"));
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(items, opts) {
        if (items === void 0) { items = []; }
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        if (items !== null && !Array.isArray(items))
            throw ("Error: Array of items is required");
        _this.opts = Object.assign({}, {
            padding: 10,
            margin: 10,
            orientation: 'vertical',
            align: 'left',
            verticalAlign: 'middle',
            width: null,
            height: null,
            app: null
        }, opts);
        _this.__items = items;
        _this.__dragging = false;
        // setup
        //--------------------
        _this.setup();
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return { List } A reference to the list for chaining.
    //
    List.prototype.setup = function () {
        var e_1, _a;
        var _this = this;
        // inner container
        //--------------------
        var container = new PIXI.Container();
        this.addChild(container);
        this.container = container;
        // mask
        //--------------------
        var mask = new PIXI.Graphics();
        this.addChild(mask);
        this.__mask = mask;
        try {
            // add items
            //--------------------
            for (var _b = __values(this.__items), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                container.addChild(item);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // interaction
        //--------------------
        if (this.opts.width || this.opts.height)
            this.interactive = true;
        else
            this.interactive = false;
        this.on('pointerdown', this.onStart.bind(this));
        this.on('pointermove', this.onMove.bind(this));
        this.on('pointerup', this.onEnd.bind(this));
        this.on('pointercancel', this.onEnd.bind(this));
        this.on('pointerout', this.onEnd.bind(this));
        this.on('pointerupoutside', this.onEnd.bind(this));
        this.on('scroll', this.onScroll.bind(this));
        // mousewheel
        //--------------------
        if (this.opts.app) {
            var app_1 = this.opts.app;
            //O app.view.addEventListener( 'mousewheel', event =>
            // @ts-ignore error TS6133: 'event' is declared but never read
            app_1.view.addEventListener('mousewheel', function (event) {
                var bounds = null;
                //B const bounds = this.mask ? this.mask.getBounds( ) : this.getBounds( )
                //B Since container already has a property of mask, the result is always
                //B true. What I believe is meant to be checked is this.__mask
                if (_this.__mask) {
                    // Mask is of type PIXI.Graphics, it has containsPoint()
                    // getBounds returns PIXI.Rectangle
                    bounds = _this.__mask.getBounds();
                }
                else {
                    // this is of type PIXI.Container
                    bounds = _this.getBounds();
                }
                var x = event.clientX - app_1.view.getBoundingClientRect().left;
                var y = event.clientY - app_1.view.getBoundingClientRect().top;
                if (bounds.contains(x, y)) {
                    event.preventDefault();
                    _this.emit('scroll', event);
                }
            });
        }
        this.layout();
        return this;
    };
    //
    // Replaces the existing items and relayouts the list.
    //
    // @param {PIXI.DisplayObject[] } items - An array of PIXI.DisplayObjects.
    // @return { List } A reference to the list for chaining.
    //
    List.prototype.setItems = function (items) {
        var e_2, _a;
        this.container.removeChildren();
        this.__items = items;
        try {
            for (var _b = __values(this.__items), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                this.container.addChild(item);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.layout();
        //B Previously did not return anything
        return this;
    };
    //
    // Should be called to refresh the layout of the list ( the width or the height ).
    //
    // @return { List } A reference to the list for chaining.
    //
    List.prototype.layout = function () {
        var e_3, _a;
        var _this = this;
        var margin = this.opts.margin;
        var x = margin;
        var y = margin;
        try {
            for (var _b = __values(this.__items), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                item.x = x;
                item.y = y;
                if (this.opts.orientation === 'vertical') {
                    y += item.height + this.opts.padding;
                }
                else {
                    x += item.width + this.opts.padding;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // vertical
        //--------------------
        if (this.opts.orientation === 'vertical') {
            switch (this.opts.align) {
                case 'center':
                    this.__items.forEach(function (it) { return it.x = margin + _this.width / 2 - it.width / 2; });
                    break;
                case 'right':
                    this.__items.forEach(function (it) { return it.x = margin + _this.width - it.width; });
                    break;
                default:
                    this.__items.forEach(function (it) { return it.x = margin; });
                    break;
            }
            if (this.opts.height) {
                var mask = this.__mask;
                mask.clear();
                mask.beginFill(0x000);
                mask.drawRect(0, 0, this.width + 2 * margin, this.opts.height);
                this.mask = mask;
                this.interactive = this.innerHeight > this.opts.height;
            }
        }
        // horizontal
        //--------------------
        if (this.opts.orientation === 'horizontal') {
            switch (this.opts.verticalAlign) {
                case 'top':
                    this.__items.forEach(function (it) { return it.y = margin; });
                    break;
                case 'bottom':
                    this.__items.forEach(function (it) { return it.y = margin + _this.height - it.height; });
                    break;
                default:
                    this.__items.forEach(function (it) { return it.y = margin + _this.height / 2 - it.height / 2; });
                    break;
            }
            if (this.opts.width) {
                var mask = this.__mask;
                mask.clear();
                mask.beginFill(0x000);
                mask.drawRect(0, 0, this.opts.width, this.height + 2 * margin);
                this.mask = mask;
                this.interactive = this.innerWidth > this.opts.width;
            }
        }
        return this;
    };
    Object.defineProperty(List.prototype, "innerWidth", {
        //
        //
        //
        get: function () {
            var size = 0;
            this.__items.forEach(function (it) { return size += it.width; });
            size += this.opts.padding * (this.__items.length - 1);
            size += 2 * this.opts.margin;
            return size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "innerHeight", {
        //
        //
        //
        get: function () {
            var size = 0;
            this.__items.forEach(function (it) { return size += it.height; });
            size += this.opts.padding * (this.__items.length - 1);
            size += 2 * this.opts.margin;
            return size;
        },
        enumerable: false,
        configurable: true
    });
    //
    // Resizes the list.
    //
    // @param { number } widthOrHeight
    //        - The new width ( if orientation is horizontal ) or
    //          height ( if orientation is vertical ) of the list.
    //
    List.prototype.resize = function (widthOrHeight) {
        if (this.opts.orientation === 'horizontal') {
            this.opts.width = widthOrHeight;
        }
        else {
            this.opts.height = widthOrHeight;
        }
        this.layout();
    };
    //
    //
    // @private
    // @param { * } event
    //
    List.prototype.onStart = function (event) {
        this.__dragging = true;
        //O this.capture( event )
        this.__delta =
            {
                x: this.container.position.x - event.data.global.x,
                y: this.container.position.y - event.data.global.y
            };
        /*
        //killTweenOf is not on TweenLite
              TweenLite.killTweensOf( this.container.position, { x: true, y: true })
        
              if ( typeof ThrowPropsPlugin != "undefined" )
              {
                 ThrowPropsPlugin.track( this.container.position, 'x,y' )
              }
        */
    };
    //
    //
    // @private
    // @param { * } event
    //
    List.prototype.onMove = function (event) {
        if (this.__dragging) {
            //O this.capture( event )
            if (this.opts.orientation === 'horizontal') {
                this.container.position.x = event.data.global.x + this.__delta.x;
            }
            else {
                this.container.position.y = event.data.global.y + this.__delta.y;
            }
        }
    };
    //
    //
    // @private
    // @param { * } event
    //
    // @ts-ignore error TS6133: 'event' is declared but never read
    List.prototype.onEnd = function (event) {
        if (this.__dragging) {
            this.__dragging = false;
            //O this.capture( event )
            /*
                     const throwProps = { }
            
                     if ( this.opts.orientation === 'horizontal' )
                     {
                        let min = this.opts.width - this.innerWidth
                        min = min > 0 ? 0 : min
                        throwProps.x =
                        {
                           velocity: 'auto',
                           min,
                           max: 0
                        }
                     }
                     else
                     {
                        let min = this.opts.height - this.innerHeight
                        min = min > 0 ? 0 : min
                        throwProps.y =
                        {
                           velocity: 'auto',
                           min,
                           max: 0
                        }
                     }
            
                     if ( typeof ThrowPropsPlugin != "undefined" )
                     {
                        ThrowPropsPlugin.to( this.container.position,
                        {
                           throwProps,
                           ease: Strong.easeOut,
                           onComplete: ( ) => ThrowPropsPlugin.untrack( this.container.position )
                        }, .8, .4 )
                     }
            */
            Tween_1.default.to(this.container, 1.5, { x: .8, y: .4 }, Ease_1.default.Power2.easeOut);
        }
    };
    //
    //
    // @private
    // @param { * } event
    //
    List.prototype.onScroll = function (event) {
        //O this.capture( event )
        if (this.opts.orientation === 'horizontal') {
            this.container.position.x -= event.deltaX;
            if (this.container.position.x > 0) {
                this.container.position.x = 0;
            }
            else if (this.container.position.x + this.innerWidth < this.opts.width) {
                this.container.position.x = this.opts.width - this.innerWidth;
            }
        }
        else {
            this.container.position.y -= event.deltaY;
            if (this.container.position.y > 0) {
                this.container.position.y = 0;
            }
            else if (this.container.position.y + this.innerHeight < this.opts.height) {
                this.container.position.y = this.opts.height - this.innerHeight;
            }
        }
    };
    return List;
}(PIXI.Container));
exports["default"] = List;


/***/ }),

/***/ "./src/message.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var popup_1 = __webpack_require__("./src/popup.ts");
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    //
    // Creates an instance of a Message.
    //
    // @constructor
    // @param {object} [opts]
    //        - An options object to specify to style and behaviour of the message.
    // @param {PIXIApp} [opts.app=window.app]
    //        - The PIXIApp where this message belongs to.
    // @param {boolean} [opts.closeButton=false]
    //        - Should a close button be displayed in the upper right corner?
    // @param {number} [opts.minWidth=280]
    //        - The minimum width of the message box. Automatically
    //          expands with the content.
    // @param {number} [opts.minHeight=100]
    //        - The minimum height of the message box. Automatically
    //          expands with the content.
    // @param {number} [opts.margin=Theme.margin]
    //        - The outer spacing of the message box.
    // @param {string} [opts.align=right]
    //        - The horizontal position of the message box relative to the app. Possible
    //     values are left, center, right.
    // @param {string} [opts.verticalAlign=top]
    //        - The vertical position of the message box relative to the app. Possible
    //          values are top, middle, bottom.
    // @param {number} [opts.duration=5]
    //        - The duration in seconds when the message box should disappear.
    // @param {boolean} [opts.autoClose=true]
    //        - Should the message box be closed automatically?
    // @param {number} [opts.closeDuration=Theme.fast]
    //        - The duration in seconds of the closing of the message box.
    //
    function Message(opts) {
        if (opts === void 0) { opts = {}; }
        var theme = theme_1.default.fromString(opts.theme);
        opts = Object.assign({}, {
            //O app: window.app,
            // opts.app should be required
            app: opts.app,
            closeButton: false,
            minWidth: 280,
            minHeight: 100,
            margin: theme.opts.margin,
            align: 'right',
            verticalAlign: 'top',
            duration: 5,
            autoClose: true,
            closeDuration: theme.opts.fast
        }, opts);
        return _super.call(this, opts) || this;
    }
    //
    // Relayouts the position of the message box.
    //
    // @return {Message} Returns the message box for chaining.
    //
    Message.prototype.layout = function () {
        _super.prototype.layout.call(this);
        // horizontal
        switch (this.opts.align) {
            case 'left':
                this.x = this.opts.margin;
                break;
            case 'center':
                this.x = (this.opts.app.size.width / 2) - (this.width / 2);
                break;
            case 'right':
                this.x = this.opts.app.size.width - this.opts.margin - this.width;
                break;
        }
        // vertical
        switch (this.opts.verticalAlign) {
            case 'top':
                this.y = this.opts.margin;
                break;
            case 'middle':
                this.y = (this.opts.app.size.height / 2) - (this.height / 2);
                break;
            case 'bottom':
                this.y = this.opts.app.size.height - this.opts.margin - this.height;
                break;
        }
        return this;
    };
    //
    // Shows the message box.
    //
    // @private
    //
    // Must be public as Modal uses popup an extension of abstractpopup
    Message.prototype.show = function (cb) {
        var _this = this;
        _super.prototype.show.call(this, cb);
        if (this.opts.autoClose) {
            window.setTimeout(function () {
                _this.hide();
            }, this.opts.duration * 1000);
        }
        return this;
    };
    return Message;
}(popup_1.InteractivePopup));
exports["default"] = Message;


/***/ }),

/***/ "./src/modal.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var popup_1 = __webpack_require__("./src/popup.ts");
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        if (!opts.app)
            throw ("Error: Modal, app should not be optional");
        _this = _super.call(this) || this;
        _this.theme = theme_1.default.fromString(opts.theme);
        _this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            //O app: window.app,
            // opts.app should be required
            app: opts.app,
            header: opts.header,
            headerStyle: opts.headerStyle,
            content: opts.content,
            //O backgroundFill: this.theme.background,
            backgroundFill: _this.theme.opts.background,
            backgroundFillAlpha: .6,
            closeOnBackground: true,
            visible: true
        }, opts);
        _this.id = _this.opts.id;
        //if ( opts.app )
        ////   this.app = opts.app
        _this.background = null;
        _this.popup = null;
        _this.alpha = 0;
        _this.visible = _this.opts.visible;
        // setup
        //-----------------
        _this.setup();
        // layout
        //-----------------
        _this.layout();
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return { Modal } A reference to the modal for chaining.
    //
    Modal.prototype.setup = function () {
        var _this = this;
        // interaction
        //-----------------
        this.interactive = true;
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.on('added', function (e) {
            if (_this.visible) {
                _this.show();
            }
        });
        // background
        //-----------------
        var background = new PIXI.Graphics();
        this.background = background;
        this.addChild(this.background);
        if (this.opts.closeOnBackground) {
            background.interactive = true;
            // @ts-ignore error TS6133: 'e' is declared but never read
            background.on('pointerup', function (e) {
                _this.hide();
            });
        }
        // popup
        //-----------------
        var popupOpts = Object.assign({}, this.opts, {
            visible: true,
            onHidden: function () {
                _this.hide();
            }
        });
        this.popup = new popup_1.InteractivePopup(popupOpts);
        this.addChild(this.popup);
        this.popup.show();
        return this;
    };
    //
    // Should be called to refresh the layout of the modal. Can be used after resizing.
    //
    // @return { Modal } A reference to the modal for chaining.
    //
    Modal.prototype.layout = function () {
        var width = this.opts.app.size.width;
        var height = this.opts.app.size.height;
        // background
        //-----------------
        this.background.clear();
        //V5 this.background.beginFill( this.opts.backgroundFill, this.opts.backgroundFillAlpha )
        this.background.beginFill(this.opts.backgroundFill);
        this.background.alpha = this.opts.backgroundFillAlpha;
        this.background.drawRect(0, 0, width, height);
        this.background.endFill();
        // position
        this.popup.x = width / 2 - this.popup.width / 2;
        this.popup.y = height / 2 - this.popup.height / 2;
        return this;
    };
    //
    // Shows the modal ( sets his alpha values to 1 ).
    //
    // @return { Modal } A reference to the modal for chaining.
    ///
    Modal.prototype.show = function () {
        var _this = this;
        //O TweenLite.to( this, this.theme.fast, { alpha: 1, onStart: ( ) => this.visible = true } )
        Tween_1.default.to(this, this.theme.opts.fast, { alpha: 1, onStart: function () { return _this.visible = true; } });
        return this;
    };
    //
    // Hides the modal ( sets his alpha values to 0 ).
    //
    // @return { Modal } A reference to the modal for chaining.
    ///
    Modal.prototype.hide = function () {
        var _this = this;
        //O TweenLite.to( this, this.theme.fast, { alpha: 0, onComplete: ( ) => this.visible = false } )
        Tween_1.default.to(this, this.theme.opts.fast, { alpha: 0, onComplete: function () { return _this.visible = false; } });
        return this;
    };
    Object.defineProperty(Modal.prototype, "header", {
        //
        // Sets or gets the header. The getter always returns a PIXI.Text object. The setter can receive
        // a string or a PIXI.Text object.
        //
        // @member { string|PIXI.Text }
        //
        get: function () {
            return this.popup._header;
        },
        set: function (value) {
            this.opts.header = value;
            this.background.destroy();
            this.popup.destroy();
            this.setup().layout();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "content", {
        //
        // Sets or gets the content. The getter always returns an PIXI.DisplayObject. The setter can receive
        // a string or a PIXI.DisplayObject.
        //
        // @member { string|PIXI.DisplayObject }
        //
        get: function () {
            return this.popup.content;
        },
        set: function (value) {
            if (this.popup._content)
                this.popup._content.destroy();
            this.opts.content = value;
            this.background.destroy();
            this.popup.destroy();
            this.setup().layout();
        },
        enumerable: false,
        configurable: true
    });
    return Modal;
}(PIXI.Container));
exports["default"] = Modal;


/***/ }),

/***/ "./src/popover.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var Popover = /** @class */ (function (_super) {
    __extends(Popover, _super);
    function Popover(opts) {
        var _this = _super.call(this) || this;
        _this.opts = Object.assign({}, {
            title: opts.title || null,
            text: opts.text || null,
            x: opts.x || 0,
            y: opts.y || 0,
            placement: opts.placement || 'top',
            width: opts.width || 250,
            titleStyle: opts.titleStyle || {},
            textStyle: opts.textStyle || { fontSize: '1.6em' }
        });
        _this.padding = 12;
        var style = {
            fontFamily: 'Arial',
            fontSize: '2em',
            stroke: '#f6f6f6',
            strokeThickness: 3,
            wordWrap: true,
            wordWrapWidth: _this.opts.width - (_this.padding * 2)
        };
        _this.titleTextStyle = new PIXI.TextStyle(Object.assign({}, style, _this.opts.titleStyle));
        _this.textTextStyle = new PIXI.TextStyle(Object.assign({}, style, _this.opts.textStyle));
        if (_this.opts.title || _this.opts.text) {
            _this.setup();
            _this.draw();
            _this.positioning();
        }
        return _this;
    }
    Popover.prototype.setup = function () {
        this.removeChildren();
        if (this.opts.title) {
            this.titleText = new PIXI.Text(this.opts.title, this.titleTextStyle);
            this.titleText.position.set(this.padding, this.padding);
            this.addChild(this.titleText);
        }
        this.titleY = this.titleText ? this.titleText.y : 0;
        this.titleHeight = this.titleText ? this.titleText.height : 0;
        if (this.opts.text) {
            this.textText = new PIXI.Text(this.opts.text, this.textTextStyle);
            this.textText.position.set(this.padding, this.titleY + this.titleHeight + this.padding);
            this.addChild(this.textText);
        }
        this.textY = this.textText ? this.textText.y : 0;
        this.textHeight = this.textText ? this.textText.height : 0;
        return this;
    };
    Popover.prototype.close = function () {
        this.parent.removeChild(this);
        return this;
    };
    Popover.prototype.draw = function () {
        this.clear();
        //V5 Changes
        //O this.beginFill( 0xffffff, 1 )
        this.beginFill(0xffffff);
        this.alpha = 1;
        this.lineStyle(1, 0x282828, .5);
        // Draw rounded rectangle
        var height = this.height + this.padding;
        this.drawRoundedRect(0, 0, this.opts.width, height, 8);
        // Draw anchor
        this.drawAnchor(this.opts.placement);
        // Draw title background
        if (this.opts.title) {
            this.lineStyle(0);
            //V5 Changes
            //O this.beginFill( 0xf7f7f7, 1 )
            this.beginFill(0xf7f7f7);
            this.alpha = 1;
            var x = 1;
            var y = this.titleText.x + this.titleText.height + (this.padding / 2);
            this.moveTo(x, y);
            y = 9;
            this.lineTo(x, y);
            this.quadraticCurveTo(x, y - 8, x + 8, y - 8);
            x += this.opts.width - 7;
            y -= 8;
            this.lineTo(x, y);
            this.quadraticCurveTo(x + 5, y, x + 5, y + 8);
            x += 5;
            y += this.titleText.x + this.titleText.height + (this.padding / 2);
            this.lineTo(x, y);
            if (this.opts.text) {
                x = 1;
                this.lineTo(x, y);
            }
            else {
                this.quadraticCurveTo(x, y, x - 5, y + 4);
                x = 6;
                y += 4;
                this.lineTo(x, y);
                this.quadraticCurveTo(x, y, x - 5, y - 4);
            }
        }
        this.endFill();
        return this;
    };
    Popover.prototype.drawAnchor = function (placement) {
        var x = 0;
        var y = 0;
        switch (placement) {
            case 'bottom':
                if (this.opts.title) {
                    //V5 Changes
                    //O this.beginFill( 0xf7f7f7, 1 )
                    this.beginFill(0xf7f7f7);
                    this.alpha = 1;
                }
                x = (this.width / 2) - 10;
                y = 1;
                this.moveTo(x, y);
                x += 10;
                y -= 10;
                this.lineTo(x, y);
                x += 10;
                y += 10;
                this.lineTo(x, y);
                break;
            case 'right':
                x = 1;
                y = (this.height / 2) - 10;
                if (this.titleY + this.titleHeight > y) {
                    //V5 Changes
                    //O this.beginFill( 0xf7f7f7, 1 )
                    this.beginFill(0xf7f7f7);
                    this.alpha = 1;
                }
                this.moveTo(x, y);
                x -= 10;
                y += 10;
                this.lineTo(x, y);
                x += 10;
                y += 10;
                this.lineTo(x, y);
                break;
            case 'left':
                x = this.width - 2;
                y = (this.height / 2) - 10;
                if (this.titleY + this.titleHeight > y) {
                    //V5 Changes
                    //O this.beginFill( 0xf7f7f7, 1 )
                    this.beginFill(0xf7f7f7);
                    this.alpha = 1;
                }
                this.moveTo(x, y);
                x += 10;
                y += 10;
                this.lineTo(x, y);
                x -= 10;
                y += 10;
                this.lineTo(x, y);
                break;
            default:
                x = (this.width / 2) - 10;
                y = this.height - 2;
                this.moveTo(x, y);
                x += 10;
                y += 10;
                this.lineTo(x, y);
                x += 10;
                y -= 10;
                this.lineTo(x, y);
                break;
        }
        return this;
    };
    Popover.prototype.positioning = function () {
        var x = this.opts.x;
        var y = this.opts.y;
        switch (this.opts.placement) {
            case 'bottom':
                this.position.set(x - (this.width / 2), y + 10);
                break;
            case 'right':
                this.position.set(x, y - (this.height / 2));
                break;
            case 'left':
                this.position.set(x - this.width, y - (this.height / 2));
                break;
            default:
                this.position.set(x - (this.width / 2), y - this.height);
                break;
        }
        return this;
    };
    return Popover;
}(PIXI.Graphics));
exports["default"] = Popover;


/***/ }),

/***/ "./src/popup.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InteractivePopup = void 0;
var PIXI = __importStar(__webpack_require__("pixi.js"));
var abstractpopup_1 = __importDefault(__webpack_require__("./src/abstractpopup.ts"));
var button_1 = __importDefault(__webpack_require__("./src/button.ts"));
var buttongroup_1 = __importDefault(__webpack_require__("./src/buttongroup.ts"));
var InteractivePopup = /** @class */ (function (_super) {
    __extends(InteractivePopup, _super);
    function InteractivePopup(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        opts = Object.assign({}, {
            closeOnPopup: false,
            closeButton: true,
            button: null,
            buttonGroup: null
        }, opts);
        _this = _super.call(this, opts) || this;
        // See note above.
        _this.grandParent = null;
        _this._closeButton = null;
        _this._buttons = null;
        // padding
        _this.smallPadding = _this.opts.padding / 2;
        // setup
        //-----------------
        _this.setup();
        // layout
        //-----------------
        _this.layout();
        return _this;
    }
    //
    // Creates the framework and instantiates everything.
    //
    // @private
    // @return {AbstractPopup} A reference to the popup for chaining.
    //
    InteractivePopup.prototype.setup = function () {
        var _this = this;
        _super.prototype.setup.call(this);
        // interaction
        //-----------------
        this.on('pointerup', function (e) {
            if (_this.opts.closeOnPopup) {
                _this.hide();
            }
            else {
                e.stopPropagation();
            }
        });
        // closeButton
        //-----------------
        if (this.opts.closeButton) {
            //O let closeButton = PIXI.Sprite.fromImage( '../../assets/icons/png/flat/close.png', true )
            //P Pixi V5 changed to just from
            var closeButton = PIXI.Sprite.from('./assets/icons/png/flat/close.png');
            if (typeof this.headerStyle.fontSize == 'string') {
                // fontSize could be like 26px or 1.5cm
                console.warn("popup fontSize('" + this.headerStyle.fontSize + "') is a string and may be handled incorrectly");
                closeButton.width = this.headerStyle.fontSize;
            }
            else {
                closeButton.width = this.headerStyle.fontSize;
            }
            closeButton.height = closeButton.width;
            //B color2 is on opts
            //B closeButton.tint = this.theme.color2
            closeButton.tint = this.theme.opts.color2;
            // This is needed, because the closeButton belongs to the content. The popup must resize with the closeButton.
            if (this._header) {
                closeButton.x = this._header.width + this.innerPadding;
            }
            else if (this._content) {
                closeButton.x = this._content.width + this.innerPadding;
            }
            closeButton.interactive = true;
            closeButton.buttonMode = true;
            // @ts-ignore error TS6133: 'e' is declared but never read
            closeButton.on('pointerdown', function (e) {
                _this.hide();
            });
            this._closeButton = closeButton;
            this.addChild(closeButton);
            // maxWidth is set and a closeButton should be displayed
            //-----------------
            if (this.opts.maxWidth) {
                var wordWrapWidth = this.opts.maxWidth - (2 / this.opts.padding) - this.smallPadding - this._closeButton.width;
                if (this._header) {
                    this.headerStyle.wordWrapWidth = wordWrapWidth;
                }
                else if (this._content) {
                    this.textStyle.wordWrapWidth = wordWrapWidth;
                }
            }
        }
        {
        }
        // buttons
        //-----------------
        if (this.opts.button || this.opts.buttonGroup) {
            if (this.opts.button) {
                //B textStyleSmall is on theme.opts
                //B this._buttons = new Button( Object.assign( {textStyle: this.theme.textStyleSmall},
                this._buttons = new button_1.default(Object.assign({ textStyle: this.theme.opts.textStyleSmall }, this.opts.button));
            }
            else {
                //B textStyleSmall is on theme.opts
                //B this._buttons = new ButtonGroup( Object.assign( {textStyle: this.theme.textStyleSmall},
                this._buttons = new buttongroup_1.default(Object.assign({ textStyle: this.theme.opts.textStyleSmall }, this.opts.buttonGroup));
            }
            this.addChild(this._buttons);
            this._buttons.y = this.innerPadding + this.sy;
        }
        return this;
    };
    //
    // Should be called to refresh the layout of the popup. Can be used after resizing.
    //
    // @return {AbstractPopup} A reference to the popup for chaining.
    //
    InteractivePopup.prototype.layout = function () {
        _super.prototype.layout.call(this);
        // closeButton
        //-----------------
        if (this.opts.closeButton) {
            this._closeButton.x = this.wantedWidth - this.smallPadding - this._closeButton.width;
            this._closeButton.y = this.smallPadding;
        }
        // buttons
        //-----------------
        if (this._buttons) {
            this._buttons.x = this.wantedWidth - this.opts.padding - this._buttons.width;
            this._buttons.y = this.wantedHeight - this.opts.padding - this._buttons.height;
        }
        return this;
    };
    //
    // Calculates the size of the children of the AbstractPopup.
    // Cannot use getBounds( ) because it is not updated when children
    // are removed.
    //
    // @protected
    // @override
    // @returns {object} An JavaScript object width the keys width and height.
    //
    InteractivePopup.prototype.getInnerSize = function () {
        var size = _super.prototype.getInnerSize.call(this);
        if (this._closeButton) {
            size.width += this.smallPadding + this._closeButton.width;
        }
        if (this._buttons) {
            size.width = Math.max(size.width, this._buttons.x + this._buttons.width);
            size.height += this.innerPadding + this._buttons.height;
        }
        return size;
    };
    return InteractivePopup;
}(abstractpopup_1.default));
exports.InteractivePopup = InteractivePopup;
//
// Class that represents a PixiJS Popup.
//
// @example
// // Create the popup
// const popup = new Popup( {
//     header: 'Goethe',
//     content: 'Man kann die Erfahrung nicht frÃ¼h genug machen, wie entbehrlich man in der Welt ist.'
// } )
//
// // Add the popup to a DisplayObject
// app.scene.addChild( popup )
//
// @class
// @extends InteractivePopup
// @see {@link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/popup.html|DocTest}
//
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    //
    // Creates an instance of a Popup.
    //
    // @constructor
    // @param {object} [opts]
    //        - An options object to specify to style and behaviour of the popup.
    // @param {boolean} [opts.closeButton=false]
    //        - Should a close button be displayed on the upper right corner?
    // @param {number} [opts.minWidth=0]
    //        - The minimum width of the popup.
    // @param {number} [opts.minHeight=0]
    //        - The minimum height of the popup.
    //
    function Popup(opts) {
        if (opts === void 0) { opts = {}; }
        opts = Object.assign({}, {
            closeButton: false,
            minWidth: 0,
            minHeight: 0
        }, opts);
        return _super.call(this, opts) || this;
    }
    return Popup;
}(InteractivePopup));
exports["default"] = Popup;


/***/ }),

/***/ "./src/popupmenu.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var popup_1 = __importDefault(__webpack_require__("./src/popup.ts"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var PopupMenu = /** @class */ (function (_super) {
    __extends(PopupMenu, _super);
    //
    // Creates an instance of a PopupMenu.
    //
    // @constructor
    //
    // @param { object } [ opts ]
    //        - An options object to specify to style and behaviour of the modal.
    // @param { object[ ] } [ opts.items=[ ] ]
    //        - A list of the menu items. Each item must be of type object.
    //          If an object has a label property, a PIXI.Text object is
    //          created ( using the textStyle property ).
    //          If an object hasn't a label property, it must contain a
    //          content property which has to be a PIXI.DisplayObject.
    // @param { number } [ opts.margin=Theme.margin / 2 ]
    //        - The app where the modal belongs to.
    // @param { object } [ opts.textStyle=Theme.textStyle ]
    //        - The color of the background.
    // @param { boolean } [ opts.closeOnPopup=true ]
    //        - The opacity of the background.
    //
    function PopupMenu(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        var theme = theme_1.default.fromString(opts.theme);
        opts = Object.assign({}, {
            items: [],
            margin: theme.opts.margin / 2,
            textStyle: theme.opts.textStyle,
            closeOnPopup: true
        }, opts);
        _this = _super.call(this, opts) || this;
        _this.theme = theme;
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return { PopupMenu } A reference to the popupmenu for chaining.
    //
    PopupMenu.prototype.setup = function () {
        var e_1, _a;
        var _this = this;
        // content
        //-----------------
        var content = new PIXI.Container();
        var y = 0;
        var _loop_1 = function (item) {
            var object = null;
            if (item.label) {
                object = new PIXI.Text(item.label, item.textStyle || this_1.opts.textStyle);
            }
            else {
                object = item.content;
            }
            object.y = y;
            if (item.action) {
                if (item.disabled) {
                    object.alpha = .5;
                }
                else {
                    object.interactive = true;
                    object.buttonMode = true;
                }
                // @ts-ignore error TS6133: 'e' is declared but never read
                object.on('pointerover', function (e) {
                    //O TweenLite.to( object, this.theme.fast, { alpha: .83, overwrite: 'none' } )
                    Tween_1.default.to(object, _this.theme.opts.fast, { alpha: .83, overwrite: false });
                });
                // @ts-ignore error TS6133: 'e' is declared but never read
                object.on('pointerout', function (e) {
                    //O TweenLite.to( object, this.theme.fast, { alpha: 1, overwrite: 'none' } )
                    Tween_1.default.to(object, _this.theme.opts.fast, { alpha: 1, overwrite: false });
                });
                // @ts-ignore error TS6133: 'e' is declared but never read
                object.on('pointerup', function (e) {
                    item.action.call(object, e, object);
                    //O if ( this.opts.closeOnAction )
                    //B this was supposed to be closeOnPopup
                    if (_this.opts.closeOnPopup) {
                        _this.hide();
                    }
                });
            }
            content.addChild(object);
            y += object.height + this_1.opts.margin;
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.opts.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                _loop_1(item);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.opts.content = content;
        _super.prototype.setup.call(this);
        //T Must return same type as class
        return this;
    };
    return PopupMenu;
}(popup_1.default));
exports["default"] = PopupMenu;


/***/ }),

/***/ "./src/progress.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var Progress = /** @class */ (function (_super) {
    __extends(Progress, _super);
    function Progress(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        if (!opts.app)
            throw ("Error: Progress, app should not be optional");
        _this = _super.call(this) || this;
        var theme = theme_1.default.fromString(opts.theme);
        _this.theme = theme;
        _this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            //O app: window.app,
            // opts.app should be required
            app: opts.app,
            width: null,
            height: 2,
            margin: 100,
            padding: 0,
            //O fill: theme.fill,
            fill: theme.opts.fill,
            //O fillAlpha: theme.fillAlpha,
            fillAlpha: theme.opts.fillAlpha,
            //O fillActive: theme.primaryColor,
            fillActive: theme.opts.primaryColor,
            //O fillActiveAlpha: theme.fillActiveAlpha,
            fillActiveAlpha: theme.opts.fillActiveAlpha,
            //O stroke: theme.stroke,
            stroke: theme.opts.stroke,
            strokeWidth: 0,
            //O strokeAlpha: theme.strokeAlpha,
            strokeAlpha: theme.opts.strokeAlpha,
            //O strokeActive: theme.strokeActive,
            strokeActive: theme.opts.strokeActive,
            strokeActiveWidth: 0,
            //O strokeActiveAlpha: theme.strokeActiveAlpha,
            strokeActiveAlpha: theme.opts.strokeActiveAlpha,
            background: false,
            //O backgroundFill: theme.background,
            backgroundFill: theme.opts.background,
            backgroundFillAlpha: 1,
            //O radius: theme.radius,
            radius: theme.opts.radius,
            destroyOnComplete: true,
            visible: true
        }, opts);
        _this.id = _this.opts.id;
        _this.background = null;
        _this.bar = null;
        _this.barActive = null;
        _this.alpha = 0;
        _this.visible = _this.opts.visible;
        _this._progress = 0;
        // setup
        //-----------------
        _this.setup();
        // layout
        //-----------------
        _this.layout();
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return { Progress } A reference to the progress for chaining.
    //
    Progress.prototype.setup = function () {
        var _this = this;
        // interaction
        //-----------------
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.on('added', function (e) {
            _this.show();
        });
        // background
        //-----------------
        if (this.opts.background) {
            var background = new PIXI.Graphics();
            this.background = background;
            this.addChild(background);
        }
        // bar
        //-----------------
        var bar = new PIXI.Graphics();
        this.bar = bar;
        this.addChild(bar);
        var barActive = new PIXI.Graphics();
        this.barActive = barActive;
        this.bar.addChild(barActive);
        return this;
    };
    //
    // Should be called to refresh the layout of the progress. Can be used after resizing.
    //
    // @return { Progress } A reference to the progress for chaining.
    //
    Progress.prototype.layout = function () {
        //O const width = this.opts.app.size.width
        //const width = this.opts.app.screen.width
        var width = this.opts.app.size.width;
        //O const height = this.opts.app.size.height
        //const height = this.opts.app.screen.height
        var height = this.opts.app.size.height;
        // background
        //-----------------
        if (this.opts.background) {
            this.background.clear();
            //V5 this.background.beginFill( this.opts.backgroundFill, this.opts.backgroundFillAlpha )
            this.background.beginFill(this.opts.backgroundFill);
            this.background.alpha = this.opts.backgroundFillAlpha;
            this.background.drawRect(0, 0, width, height);
            this.background.endFill();
        }
        this.draw();
        return this;
    };
    //
    // Draws the canvas.
    //
    // @private
    // @return { Progress } A reference to the progress for chaining.
    //
    Progress.prototype.draw = function () {
        this.bar.clear();
        this.barActive.clear();
        this.drawBar();
        this.drawBarActive();
        return this;
    };
    //
    // Draws the bar.
    //
    // @private
    // @return { Progress } A reference to the progress for chaining.
    //
    Progress.prototype.drawBar = function () {
        //O const width = this.opts.app.size.width
        // const width = this.opts.app.screen.width
        var width = this.opts.app.size.width;
        //O const height = this.opts.app.size.height
        // const height = this.opts.app.screen.height
        var height = this.opts.app.size.height;
        this.radius = this.opts.radius;
        if ((this.radius * 2) > this.opts.height) {
            this.radius = this.opts.height / 2;
        }
        var wantedWidth = this.opts.width || (width - (2 * this.opts.margin));
        var wantedHeight = this.opts.height;
        this.bar.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
        //V5 this.bar.beginFill( this.opts.fill, this.opts.fillAlpha )
        this.bar.beginFill(this.opts.fill);
        this.bar.alpha = this.opts.fillAlpha;
        if (this.radius > 1) {
            this.bar.drawRoundedRect(0, 0, wantedWidth, wantedHeight, this.radius);
        }
        else {
            this.bar.drawRect(0, 0, wantedWidth, wantedHeight);
        }
        this.bar.endFill();
        this.bar.x = width / 2 - this.bar.width / 2;
        this.bar.y = height / 2 - this.bar.height / 2;
        return this;
    };
    //
    // Draws the active bar.
    //
    // @private
    // @return { Progress } A reference to the progress for chaining.
    //
    Progress.prototype.drawBarActive = function () {
        var wantedWidth = this.bar.width - (2 * this.opts.padding);
        var wantedHeight = this.bar.height - (2 * this.opts.padding);
        var barActiveWidth = wantedWidth * this._progress / 100;
        this.barActive.lineStyle(this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha);
        //V5 this.barActive.beginFill( this.opts.fillActive, this.opts.fillActiveAlpha )
        this.barActive.beginFill(this.opts.fillActive);
        this.barActive.alpha = this.opts.fillActiveAlpha;
        if (barActiveWidth > 0) {
            if (this.radius > 1) {
                this.barActive.drawRoundedRect(0, 0, barActiveWidth, wantedHeight, this.radius);
            }
            else {
                this.barActive.drawRect(0, 0, barActiveWidth, wantedHeight);
            }
        }
        this.barActive.endFill();
        this.barActive.x = this.opts.padding;
        this.barActive.y = this.opts.padding;
        return this;
    };
    //
    // Shows the progress ( sets his alpha values to 1 ).
    //
    // @return { Progress } A reference to the progress for chaining.
    //
    Progress.prototype.show = function () {
        //O TweenLite.to( this, this.theme.fast, { alpha: 1 })
        //TweenLite.to( this, this.theme.opts.fast, { alpha: 1 })
        Tween_1.default.to(this, this.theme.opts.fast, {
            alpha: 1
        });
        return this;
    };
    //
    // Hides the progress ( sets his alpha values to 1 ).
    //
    // @return { Progress } A reference to the progress for chaining.
    //
    Progress.prototype.hide = function () {
        //O TweenLite.to( this, this.theme.fast, { alpha: 0, onComplete: ( ) => this.visible = false })
        // TweenLite.to( this, this.theme.opts.fast, { alpha: 0, onComplete: ( ) => this.visible = false })
        var _this = this;
        Tween_1.default.to(this, this.theme.opts.fast, {
            alpha: 0,
            onComplete: function () {
                _this.visible = false;
            }
        });
        return this;
    };
    Object.defineProperty(Progress.prototype, "progress", {
        //
        // Gets or sets the progress. Has to be a number between 0 and 100.
        //
        // @member { number }
        //
        get: function () {
            return this._progress;
        },
        set: function (value) {
            var _this = this;
            value = Math.round(value);
            if (value < 0) {
                value = 0;
            }
            if (value > 100) {
                value = 100;
            }
            //O TweenLite.to( this, this.theme.normal,
            //TweenLite.to( this, this.theme.opts.normal,
            //{
            //   _progress: value,
            //   onUpdate: ( ) => this.draw( ),
            //   onComplete: ( ) =>
            //   {
            //      if ( value === 100 && this.opts.destroyOnComplete )
            //      {
            //         //O TweenLite.to( this, this.theme.fast,
            //         TweenLite.to( this, this.theme.opts.fast,
            //         {
            //            alpha: 0,
            //            onComplete: ( ) => this.destroy( { children: true }
            //         )}
            //      )}
            //   }
            //})
            Tween_1.default.to(this, this.theme.opts.normal, {
                _progress: value,
                onUpdate: function () { return _this.draw(); },
                onComplete: function () {
                    if (value === 100 && _this.opts.destroyOnComplete) {
                        Tween_1.default.to(_this, _this.theme.opts.fast, {
                            alpha: 0,
                            onComplete: function () { return _this.destroy({ children: true }); }
                        });
                    }
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    return Progress;
}(PIXI.Container));
exports["default"] = Progress;


/***/ }),

/***/ "./src/progressbar.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var ProgressBar = /** @class */ (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        var theme = theme_1.default.fromString(opts.theme);
        _this.theme = theme;
        _this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            width: null,
            height: 2,
            x: opts.x || 0,
            y: opts.y || 0,
            //O fill: theme.fill,
            fill: theme.opts.fill,
            //O fillAlpha: theme.fillAlpha,
            fillAlpha: theme.opts.fillAlpha,
            //O fillActive: theme.primaryColor,
            fillActive: theme.opts.primaryColor,
            //O fillActiveAlpha: theme.fillActiveAlpha,
            fillActiveAlpha: theme.opts.fillActiveAlpha,
            //O stroke: theme.stroke,
            stroke: theme.opts.stroke,
            strokeWidth: 0,
            //O strokeAlpha: theme.strokeAlpha,
            strokeAlpha: theme.opts.strokeAlpha,
            //O strokeActive: theme.strokeActive,
            strokeActive: theme.opts.strokeActive,
            strokeActiveWidth: 0,
            //O strokeActiveAlpha: theme.strokeActiveAlpha,
            strokeActiveAlpha: theme.opts.strokeActiveAlpha,
            //O radius: theme.radius,
            radius: theme.opts.radius,
            destroyOnComplete: true,
            visible: true
        }, opts);
        _this.id = _this.opts.id;
        _this.bar = null;
        _this.barActive = null;
        _this.alpha = 0;
        _this.visible = _this.opts.visible;
        _this._progress = 0;
        // setup
        //-----------------
        _this.setup();
        // layout
        //-----------------
        _this.layout();
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return { ProgressBar } A reference to the progress bar for chaining.
    //
    ProgressBar.prototype.setup = function () {
        var _this = this;
        // interaction
        //-----------------
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.on('added', function (e) {
            _this.show();
        });
        // bar
        //-----------------
        var bar = new PIXI.Graphics();
        this.bar = bar;
        this.addChild(bar);
        var barActive = new PIXI.Graphics();
        this.barActive = barActive;
        this.bar.addChild(barActive);
        return this;
    };
    //
    // Should be called to refresh the layout of the progress. Can be used after resizing.
    //
    // @return { ProgressBar } A reference to the progress bar for chaining.
    //
    ProgressBar.prototype.layout = function () {
        this.draw();
        return this;
    };
    //
    // Draws the canvas.
    //
    // @public - Used by progressDialog
    // @return { ProgressBar } A reference to the progress bar for chaining.
    //
    ProgressBar.prototype.draw = function () {
        this.bar.clear();
        this.barActive.clear();
        this.drawBar();
        this.drawBarActive();
        return this;
    };
    //
    // Draws the bar.
    //
    // @private
    // @return { ProgressBar } A reference to the progress bar for chaining.
    //
    ProgressBar.prototype.drawBar = function () {
        this.radius = this.opts.radius;
        if ((this.radius * 2) > this.opts.height) {
            this.radius = this.opts.height * .5;
        }
        var wantedWidth = this.opts.width;
        var wantedHeight = this.opts.height;
        this.bar.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
        //V5 this.bar.beginFill( this.opts.fill, this.opts.fillAlpha )
        this.bar.beginFill(this.opts.fill);
        this.bar.alpha = this.opts.fillAlpha;
        if (this.radius > 1) {
            this.bar.drawRoundedRect(this.opts.x, this.opts.y, wantedWidth, wantedHeight, this.radius);
        }
        else {
            this.bar.drawRect(this.opts.x, this.opts.y, wantedWidth, wantedHeight);
        }
        this.bar.endFill();
        return this;
    };
    //
    // Draws the active bar.
    //
    // @private
    // @return { ProgressBar } A reference to the progress bar for chaining.
    //
    ProgressBar.prototype.drawBarActive = function () {
        var wantedWidth = this.bar.width;
        var wantedHeight = this.bar.height;
        var barActiveWidth = wantedWidth * this._progress / 100;
        this.barActive.lineStyle(this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha);
        //V5 this.barActive.beginFill( this.opts.fillActive, this.opts.fillActiveAlpha )
        this.barActive.beginFill(this.opts.fillActive);
        this.barActive.alpha = this.opts.fillActiveAlpha;
        if (barActiveWidth > 0) {
            if (this.radius > 1) {
                this.barActive.drawRoundedRect(this.opts.x, this.opts.y, barActiveWidth, wantedHeight, this.radius);
            }
            else {
                this.barActive.drawRect(this.opts.x, this.opts.y, barActiveWidth, wantedHeight);
            }
        }
        this.barActive.endFill();
        return this;
    };
    //
    // Shows the progress ( sets his alpha values to 1 ).
    //
    // @return { ProgressBar } A reference to the progress bar for chaining.
    //
    ProgressBar.prototype.show = function () {
        Tween_1.default.to(this, this.theme.opts.fast, {
            alpha: 1
        });
        return this;
    };
    //
    // Hides the progress ( sets his alpha values to 1 ).
    //
    // @return { ProgressBar } A reference to the progress bar for chaining.
    //
    ProgressBar.prototype.hide = function () {
        var _this = this;
        Tween_1.default.to(this, this.theme.opts.fast, {
            alpha: 0,
            onComplete: function () {
                _this.visible = false;
            }
        });
        return this;
    };
    Object.defineProperty(ProgressBar.prototype, "progress", {
        //
        // Gets or sets the progress. Has to be a number between 0 and 100.
        //
        // @member { number }
        //
        get: function () {
            return this._progress;
        },
        set: function (value) {
            var _this = this;
            value = Math.round(value);
            if (value < 0)
                value = 0;
            if (value > 100)
                value = 100;
            Tween_1.default.to(this, this.theme.opts.normal, {
                _progress: value,
                onUpdate: function () { return _this.draw(); },
                onComplete: function () {
                    if (value === 100 && _this.opts.destroyOnComplete) {
                        Tween_1.default.to(_this, _this.theme.opts.fast, {
                            alpha: 0,
                            onComplete: function () { return _this.destroy({ children: true }); }
                        });
                    }
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    return ProgressBar;
}(PIXI.Container));
exports["default"] = ProgressBar;


/***/ }),

/***/ "./src/progressdialog.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var modal_1 = __importDefault(__webpack_require__("./src/modal.ts"));
var progressbar_1 = __importDefault(__webpack_require__("./src/progressbar.ts"));
var button_1 = __importDefault(__webpack_require__("./src/button.ts"));
var ProgressDialog = /** @class */ (function (_super) {
    __extends(ProgressDialog, _super);
    function ProgressDialog(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        var theme = theme_1.default.fromString(opts.theme);
        // The Title
        if (!opts.headerStyle)
            opts.headerStyle = theme.opts.textStyleLarge;
        opts.headerStyle = Object.assign({
            align: opts.headerStyle.align || 'center',
        }, opts.headerStyle);
        _this = _super.call(this, { app: opts.app,
            theme: theme,
            header: opts.header,
            headerStyle: opts.headerStyle,
            closeOnBackground: false,
        }) || this;
        _this.opts = opts;
        if (_this.opts.destroyOnComplete === undefined)
            _this.opts.destroyOnComplete = true;
        // The progress bar
        if (!_this.opts.progressBar)
            _this.opts.progressBar = {};
        _this.progressBarOptions = Object.assign({
            theme: theme,
            x: theme.opts.padding * 2,
            y: _this.popup.height * .4,
            width: _this.opts.progressBar.width || _this.popup.width - theme.opts.padding * 4,
            height: _this.opts.progressBar.height || _this.popup.height * .1,
        }, _this.opts.progressBar);
        _this.progressBar = new progressbar_1.default(_this.progressBarOptions);
        _this.popup.addChild(_this.progressBar);
        _this.cancelButtonOptions = Object.assign({
            x: _this.popup.width * .25,
            y: _this.popup.height * .6,
            width: _this.popup.width * .5,
            height: _this.popup.height * .2,
            backgroundFill: 0xFFF000,
            action: _this.cancelCallback,
        }, _this.opts.cancelButton);
        _this.cancelButton = new button_1.default(_this.cancelButtonOptions);
        // Re-center after adding
        _this.cancelButton.x = (_this.popup.width - _this.cancelButton.width) * .5;
        _this.popup.addChild(_this.cancelButton);
        // When cancel is called, the this is the button
        // and not this the modal.  Setting parent (as it should be)
        // allows us to get the modal parent from the button
        _this.cancelButton.grandParent = _this;
        return _this;
    }
    ProgressDialog.prototype.cancelCallback = function (e, button) {
        // Set above, so cast is valid
        var dialog = button.grandParent;
        if (dialog) {
            if (dialog.opts.onCancel)
                dialog.opts.onCancel.call(this, e, dialog);
            dialog.destroy();
        }
    };
    Object.defineProperty(ProgressDialog.prototype, "progress", {
        //
        // Gets or sets the progress. Has to be a number between 0 and 100.
        //
        // @member { number }
        //
        get: function () {
            return this.progressBar.progress;
        },
        set: function (value) {
            var _this = this;
            value = Math.round(value);
            if (value < 0)
                value = 0;
            if (value > 100)
                value = 100;
            var dialog = this;
            Tween_1.default.to(this.progressBar, this.theme.opts.normal, {
                //Bypass progress tween for ours so onComplete will be called
                _progress: value,
                onUpdate: function () { return _this.progressBar.draw(); },
                onComplete: function () {
                    if (value === 100 && _this.opts.destroyOnComplete) {
                        Tween_1.default.to(dialog, _this.theme.opts.fast, {
                            alpha: 0,
                            onComplete: function () {
                                dialog.destroy({ children: true });
                                if (_this.opts.onComplete)
                                    _this.opts.onComplete.call(_this);
                            }
                        });
                    }
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    return ProgressDialog;
}(modal_1.default));
exports["default"] = ProgressDialog;


/***/ }),

/***/ "./src/slider.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Control = void 0;
var PIXI = __importStar(__webpack_require__("pixi.js"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var tooltip_1 = __importDefault(__webpack_require__("./src/tooltip.ts"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
//
// Callback for the slider action onStart.
//
// @callback onStartCallback
// @param { object } event
//        - The event object.
// @param { Slider } slider
//        - A reference to the slider ( also this refers to the slider ).
//
//
// Callback for the slider action onUpdate.
//
// @callback onUpdateCallback
// @param { object } event
//        - The event object.
// @param { Slider } slider
//        - A reference to the slider ( also this refers to the slider ).
//
//
// Callback for the slider action onComplete.
//
// @callback onCompleteCallback
// @param { object } event
//        - The event object.
// @param { Slider } slider
//        - A reference to the slider ( also this refers to the slider ).
//
//
// Class that represents a PixiJS Slider.
//
// @example
// // Create the app
// const app = new PIXIApp( {
//     view: canvas,
//     width: 900,
//     height: 250
// } ).setup( ).run( )
//
// // Create the slider
// const slider = new Slider( {
//     x: 10,
//     y: 20
// } )
//
// // Add the slider to a DisplayObject
// app.scene.addChild( slider )
//
// @class
// @extends PIXI.Container
// @see { @link http://pixijs.download/dev/docs/PIXI.Container.html|PIXI.Container }
// @see { @link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/slider.html|DocTest }
//
// This class is created to handle the extra parameters added.
var Control = /** @class */ (function (_super) {
    __extends(Control, _super);
    function Control() {
        var _this = _super.call(this) || this;
        _this.dragging = false;
        _this.delta = 0;
        _this.event = null;
        _this.pointerdowned = false;
        return _this;
    }
    return Control;
}(PIXI.Graphics));
exports.Control = Control;
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        var theme = theme_1.default.fromString(opts.theme);
        _this.theme = theme;
        _this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            x: 0,
            y: 0,
            width: 250,
            height: 2,
            container: null,
            fill: theme.opts.fill,
            fillAlpha: theme.opts.fillAlpha,
            stroke: theme.opts.stroke,
            strokeWidth: theme.opts.strokeWidth,
            strokeAlpha: theme.opts.strokeAlpha,
            controlFill: theme.opts.fill,
            controlFillAlpha: .5,
            controlStroke: theme.opts.primaryColor,
            controlStrokeWidth: 2,
            controlStrokeAlpha: theme.opts.strokeAlpha,
            controlRadius: 16,
            orientation: 'horizontal',
            min: 0,
            max: 100,
            value: 0,
            disabled: false,
            onStart: null,
            onUpdate: null,
            onComplete: null,
            tooltip: null,
            visible: true
        }, opts);
        _this.opts.container = _this.opts.container || _this;
        // Validation
        //-----------------
        if (_this.opts.height > _this.opts.width) {
            _this.opts.height = _this.opts.width;
        }
        if (_this.opts.value < _this.opts.min) {
            _this.opts.value = _this.opts.min;
        }
        if (_this.opts.value > _this.opts.max) {
            _this.opts.value = _this.opts.max;
        }
        // Properties
        //-----------------
        _this.id = _this.opts.id;
        _this.radius = _this.opts.height / 2;
        _this._value = _this.opts.value;
        _this._disabled = null;
        _this.sliderObj = null;
        _this.control = null;
        _this.tooltip = null;
        _this.visible = _this.opts.visible;
        // setup
        //-----------------
        _this.setup();
        // layout
        //-----------------
        _this.layout();
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return { Slider } A reference to the slider for chaining.
    //
    Slider.prototype.setup = function () {
        var _this = this;
        // Container events
        //-----------------
        var container = this.opts.container;
        this.on('pointermove', function (e) {
            if (_this.control.dragging) {
                var moveX = _this.control.event.data.getLocalPosition(_this.control.parent).x;
                _this._value = _this.pixelToValue(moveX - _this.control.delta - _this.opts.controlRadius);
                var x = _this.valueToPixel(_this._value) + _this.opts.controlRadius;
                _this.control.x = x;
                if (_this.opts.onUpdate) {
                    _this.opts.onUpdate.call(_this, e, _this);
                }
            }
        });
        if (container instanceof Element) {
            container.addEventListener('pointerup', function (e) { return _this.onEnd(e); }, false);
            container.addEventListener('pointercancel', function (e) { return _this.onEnd(e); }, false);
            container.addEventListener('pointerleave', function (e) { return _this.onEnd(e); }, false);
            container.addEventListener('pointerout', function (e) { return _this.onEnd(e); }, false);
            container.addEventListener('mouseup', function (e) { return _this.onEnd(e); }, false);
            container.addEventListener('mousecancel', function (e) { return _this.onEnd(e); }, false);
            container.addEventListener('mouseleave', function (e) { return _this.onEnd(e); }, false);
            container.addEventListener('mouseout', function (e) { return _this.onEnd(e); }, false);
        }
        else {
            container.interactive = true;
            container.on('pointerup', function (e) { return _this.onEnd(e); });
            container.on('pointercancel', function (e) { return _this.onEnd(e); });
            container.on('pointerleave', function (e) { return _this.onEnd(e); });
            container.on('pointerout', function (e) { return _this.onEnd(e); });
        }
        // Slider
        //-----------------
        var sliderObj = new Control();
        this.sliderObj = sliderObj;
        this.addChild(sliderObj);
        // Control
        //-----------------
        var control = new Control();
        control.x = this.opts.controlRadius + this.valueToPixel(this.opts.value);
        control.y = this.opts.controlRadius;
        // pointerdown on the control for dragndrop
        control.on('pointerdown', function (e) {
            control.event = e;
            control.delta = e.data.getLocalPosition(_this.control).x;
            control.dragging = true;
            if (_this.opts.onStart) {
                _this.opts.onStart.call(_this, e, _this);
            }
        });
        this.control = control;
        this.addChild(this.control);
        // interaction
        //-----------------
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.sliderObj.on('pointerover', function (e) {
            Tween_1.default.to(_this.control, _this.theme.opts.fast, { alpha: .83 });
        });
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.sliderObj.on('pointerout', function (e) {
            Tween_1.default.to(_this.control, _this.theme.opts.fast, { alpha: 1 });
        });
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.sliderObj.on('pointerdown', function (e) {
            _this.sliderObj.pointerdowned = true;
            Tween_1.default.to(_this.control, _this.theme.opts.fast, { alpha: .7 });
        });
        // Click on the slider bar
        this.sliderObj.on('pointerup', function (e) {
            if (_this.sliderObj.pointerdowned) {
                _this.sliderObj.pointerdowned = false;
                var position = e.data.getLocalPosition(_this.control.parent);
                _this.value = _this.pixelToValue(position.x - _this.opts.controlRadius);
                Tween_1.default.to(_this.control, _this.theme.opts.fast, { alpha: .83 });
            }
        });
        // disabled
        //-----------------
        this.disabled = this.opts.disabled;
        // tooltip
        //-----------------
        if (this.opts.tooltip) {
            if (typeof this.opts.tooltip === 'string') {
                this.tooltip = new tooltip_1.default({
                    object: this,
                    content: this.opts.tooltip
                });
            }
            else {
                // @ts-ignore TS2531: Object is possibly 'null'.  Why. It's checked above?
                this.opts.tooltip.object = this;
                this.tooltip = new tooltip_1.default(this.opts.tooltip);
            }
        }
        return this;
    };
    //
    // Should be called to refresh the layout of the slider. Can be used after resizing.
    //
    // @return { Slider } A reference to the slider for chaining.
    //
    Slider.prototype.layout = function () {
        // set position
        //-----------------
        this.position.set(this.opts.x, this.opts.y);
        // draw
        //-----------------
        this.draw();
        return this;
    };
    //
    // Draws the slider to the canvas.
    //
    // @private
    // @return { Slider } - A reference to the slider for chaining.
    //
    Slider.prototype.draw = function () {
        var r = this.radius;
        var cr = this.opts.controlRadius;
        var w = this.opts.width;
        var h = this.opts.height;
        var x = cr + r;
        var y = cr + r - h;
        this.sliderObj.clear();
        this.sliderObj.beginFill(0xffffff, 0);
        this.sliderObj.drawRect(0, 0, x + w + cr, cr * 2);
        this.sliderObj.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
        this.sliderObj.beginFill(this.opts.fill, this.opts.fillAlpha);
        this.sliderObj.moveTo(x, y);
        this.sliderObj.lineTo(x + w, y);
        this.sliderObj.arcTo(x + w + r, y, x + w + r, y + r, r);
        this.sliderObj.lineTo(x + w + r, y + r + 1); // BUGFIX: If not specified, there is a small area without a stroke.
        this.sliderObj.arcTo(x + w + r, y + h, x + w, y + h, r);
        this.sliderObj.lineTo(x, y + h);
        this.sliderObj.arcTo(x - r, y + h, x - r, y + r, r);
        this.sliderObj.arcTo(x - r, y, x, y, r);
        this.sliderObj.endFill();
        // Draw control
        this.control.clear();
        this.control.lineStyle(this.opts.controlStrokeWidth, this.opts.controlStroke, this.opts.controlStrokeAlpha);
        this.control.beginFill(this.opts.controlFill, this.opts.controlFillAlpha);
        this.control.drawCircle(0, 0, cr - 1);
        this.control.beginFill(this.opts.controlStroke, this.opts.controlStrokeAlpha);
        this.control.drawCircle(0, 0, cr / 6);
        this.control.endFill();
        return this;
    };
    //
    // Executed, when the slider control movement ended.
    //
    // @private
    // @return { Slider } A reference to the slider for chaining.
    //
    Slider.prototype.onEnd = function (e) {
        if (this.control.dragging) {
            this.control.event = null;
            this.control.dragging = false;
            if (this.opts.onComplete) {
                this.opts.onComplete.call(this, e, this);
            }
        }
        return this;
    };
    //
    // Calculates the value for a given pixel.
    //
    // @private
    // @param { number } value 
    // @returns  { number } The calculated pixel.
    //
    Slider.prototype.valueToPixel = function (value) {
        if (value < this.opts.min) {
            value = this.opts.min;
        }
        else if (value > this.opts.max) {
            value = this.opts.max;
        }
        return this.opts.width * (value - this.opts.min) / (this.opts.max - this.opts.min);
    };
    //
    // Calculates the pixel for a given value.
    //
    // @private
    // @param { number } pixel
    // @returns { number } The calculated value.
    //
    Slider.prototype.pixelToValue = function (pixel) {
        if (pixel < 0) {
            pixel = 0;
        }
        else if (pixel > this.opts.width) {
            pixel = this.opts.width;
        }
        return this.opts.min + ((this.opts.max - this.opts.min) * pixel / this.opts.width);
    };
    Object.defineProperty(Slider.prototype, "value", {
        //
        // Gets or sets the value.
        //
        // @member { number }
        //
        get: function () {
            return Math.round(this._value);
        },
        set: function (value) {
            if (value < this.opts.min) {
                value = this.opts.min;
            }
            else if (value > this.opts.max) {
                value = this.opts.max;
            }
            this._value = value;
            var x = this.valueToPixel(value) + this.opts.controlRadius;
            Tween_1.default.to(this.control, this.theme.opts.fast, { x: x });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "disabled", {
        //
        // Gets or sets the disabled state. When disabled, the slider cannot be clicked.
        //
        // @member { boolean }
        //
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value;
            if (this._disabled) {
                this.interactive = false;
                this.sliderObj.interactive = false;
                this.control.interactive = false;
                this.control.buttonMode = false;
                this.alpha = .5;
            }
            else {
                this.interactive = true;
                this.sliderObj.interactive = true;
                this.control.interactive = true;
                this.control.buttonMode = true;
                this.alpha = 1;
            }
        },
        enumerable: false,
        configurable: true
    });
    //
    // Shows the slider ( sets his alpha values to 1 ).
    //
    // @return { Slider } A reference to the slider for chaining.
    //
    Slider.prototype.show = function () {
        this.opts.strokeAlpha = 1;
        this.opts.fillAlpha = 1;
        this.opts.controlStrokeAlpha = 1;
        this.opts.controlFillAlpha = 1;
        this.layout();
        return this;
    };
    //
    // Hides the slider ( sets his alpha values to 1 ).
    //
    // @return { Slider } A reference to the slider for chaining.
    //
    Slider.prototype.hide = function () {
        this.opts.strokeAlpha = 0;
        this.opts.fillAlpha = 0;
        this.opts.controlStrokeAlpha = 0;
        this.opts.controlFillAlpha = 0;
        this.layout();
        return this;
    };
    return Slider;
}(PIXI.Container));
exports["default"] = Slider;


/***/ }),

/***/ "./src/switch.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var tooltip_1 = __importDefault(__webpack_require__("./src/tooltip.ts"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        var theme = theme_1.default.fromString(opts.theme);
        _this.theme = theme;
        _this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            x: 0,
            y: 0,
            width: 44,
            height: 28,
            fill: theme.opts.fill,
            fillAlpha: theme.opts.fillAlpha,
            fillActive: theme.opts.primaryColor,
            fillActiveAlpha: theme.opts.fillActiveAlpha,
            stroke: theme.opts.stroke,
            strokeWidth: theme.opts.strokeWidth,
            strokeAlpha: theme.opts.strokeAlpha,
            strokeActive: theme.opts.primaryColor,
            strokeActiveWidth: theme.opts.strokeActiveWidth,
            strokeActiveAlpha: theme.opts.strokeActiveAlpha,
            controlFill: theme.opts.stroke,
            controlFillAlpha: theme.opts.strokeAlpha,
            controlFillActive: theme.opts.stroke,
            controlFillActiveAlpha: theme.opts.strokeAlpha,
            controlStroke: theme.opts.stroke,
            controlStrokeWidth: theme.opts.strokeWidth * .8,
            controlStrokeAlpha: theme.opts.strokeAlpha,
            controlStrokeActive: theme.opts.stroke,
            controlStrokeActiveWidth: theme.opts.strokeActiveWidth * .8,
            controlStrokeActiveAlpha: theme.opts.strokeActiveAlpha,
            duration: theme.opts.fast,
            durationActive: theme.opts.fast,
            disabled: false,
            active: false,
            action: null,
            actionActive: null,
            beforeAction: null,
            afterAction: null,
            tooltip: null,
            visible: true
        }, opts);
        _this.opts.controlRadius = _this.opts.controlRadius || (_this.opts.height / 2);
        _this.opts.controlRadiusActive = _this.opts.controlRadiusActive || _this.opts.controlRadius;
        // Validation
        //-----------------
        if (_this.opts.height > _this.opts.width) {
            _this.opts.height = _this.opts.width;
        }
        // Properties
        //-----------------
        _this.id = _this.opts.id;
        _this.radius = _this.opts.height / 2;
        _this._active = null;
        _this._disabled = null;
        _this.switchObj = null;
        _this.control = null;
        _this.tooltip = null;
        _this.visible = _this.opts.visible;
        // animated
        //-----------------
        _this.tempAnimated =
            {
                fill: _this.opts.fill,
                fillAlpha: _this.opts.fillAlpha,
                stroke: _this.opts.stroke,
                strokeWidth: _this.opts.strokeWidth,
                strokeAlpha: _this.opts.strokeAlpha,
                controlFill: _this.opts.controlFill,
                controlFillAlpha: _this.opts.controlFillAlpha,
                controlStroke: _this.opts.controlStroke,
                controlStrokeWidth: _this.opts.controlStrokeWidth,
                controlStrokeAlpha: _this.opts.controlStrokeAlpha,
                controlRadius: _this.opts.controlRadius
            };
        // setup
        //-----------------
        _this.setup();
        // layout
        //-----------------
        _this.layout();
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return { Switch } A reference to the switch for chaining.
    //
    Switch.prototype.setup = function () {
        var _this = this;
        // Switch
        //-----------------
        var switchObj = new PIXI.Graphics();
        this.switchObj = switchObj;
        this.addChild(switchObj);
        // Control
        //-----------------
        this.xInactive = this.opts.controlRadius;
        this.xActive = this.opts.width - this.opts.controlRadiusActive;
        var control = new PIXI.Graphics();
        control.x = this.opts.active ? this.xActive : this.xInactive;
        control.y = this.opts.height / 2;
        this.control = control;
        this.addChild(this.control);
        // interaction
        //-----------------
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.switchObj.on('pointerover', function (e) {
            //TweenLite.to( this.control, this.theme.fast, { alpha: .83 } )
            Tween_1.default.to(_this.control, _this.theme.opts.fast, { alpha: .83 });
        });
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.switchObj.on('pointerout', function (e) {
            //O TweenLite.to( this.control, this.theme.fast, { alpha: 1 } )
            Tween_1.default.to(_this.control, _this.theme.opts.fast, { alpha: 1 });
        });
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.switchObj.on('pointerdown', function (e) {
            //O TweenLite.to( this.control, this.theme.fast, { alpha: .7 } )
            Tween_1.default.to(_this.control, _this.theme.opts.fast, { alpha: .7 });
        });
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.switchObj.on('pointerup', function (e) {
            if (_this.opts.beforeAction) {
                _this.opts.beforeAction.call(_this, e, _this);
            }
            _this.active = !_this.active;
            if (_this.active) {
                if (_this.opts.action) {
                    _this.opts.action.call(_this, e, _this);
                }
            }
            else {
                if (_this.opts.actionActive) {
                    _this.opts.actionActive.call(_this, e, _this);
                }
            }
            //O TweenLite.to( this.control, this.theme.fast, { alpha: .83 } )
            Tween_1.default.to(_this.control, _this.theme.opts.fast, { alpha: .83 });
            if (_this.opts.afterAction) {
                _this.opts.afterAction.call(_this, e, _this);
            }
        });
        // disabled
        //-----------------
        this.disabled = this.opts.disabled;
        // active
        //-----------------
        this.active = this.opts.active;
        // tooltip
        //-----------------
        if (this.opts.tooltip) {
            if (typeof this.opts.tooltip === 'string') {
                this.tooltip = new tooltip_1.default({
                    object: this,
                    content: this.opts.tooltip
                });
            }
            else {
                // @ts-ignore TS2531: Object is possibly 'null'.  Why. It's checked above?
                this.opts.tooltip.object = this;
                this.tooltip = new tooltip_1.default(this.opts.tooltip);
            }
        }
        return this;
    };
    //
    // Should be called to refresh the layout of the switch. Can be used after resizing.
    //
    // @return { Switch } A reference to the switch for chaining.
    //
    Switch.prototype.layout = function () {
        // set position
        //-----------------
        this.position.set(this.opts.x, this.opts.y);
        // draw
        //-----------------
        this.draw();
        return this;
    };
    //
    // Draws the switch to the canvas.
    //
    // @private
    // @return { Switch } A reference to the switch for chaining.
    //
    Switch.prototype.draw = function () {
        this.switchObj.clear();
        if (this.active) {
            this.switchObj.lineStyle(this.opts.strokeActiveWidth, this.opts.strokeActive, this.opts.strokeActiveAlpha);
            //V5 this.switchObj.beginFill( this.opts.fillActive, this.opts.fillActiveAlpha )
            this.switchObj.beginFill(this.opts.fillActive);
            this.switchObj.alpha = this.opts.fillActiveAlpha;
        }
        else {
            this.switchObj.lineStyle(this.opts.strokeWidth, this.opts.stroke, this.opts.strokeAlpha);
            //V5 this.switchObj.beginFill( this.opts.fill, this.opts.fillAlpha )
            this.switchObj.beginFill(this.opts.fill);
            this.switchObj.alpha = this.opts.fillAlpha;
        }
        this.switchObj.moveTo(this.radius, 0);
        this.switchObj.lineTo(this.opts.width - this.radius, 0);
        this.switchObj.arcTo(this.opts.width, 0, this.opts.width, this.radius, this.radius);
        this.switchObj.lineTo(this.opts.width, this.radius + 1); // BUGFIX: If not specified, there is a small area without a stroke.
        this.switchObj.arcTo(this.opts.width, this.opts.height, this.opts.width - this.radius, this.opts.height, this.radius);
        this.switchObj.lineTo(this.radius, this.opts.height);
        this.switchObj.arcTo(0, this.opts.height, 0, this.radius, this.radius);
        this.switchObj.arcTo(0, 0, this.radius, 0, this.radius);
        this.switchObj.endFill();
        // Draw control
        this.control.clear();
        if (this.active) {
            this.control.lineStyle(this.opts.controlStrokeActiveWidth, this.opts.controlStrokeActive, this.opts.controlStrokeActiveAlpha);
            //V5 this.control.beginFill( this.opts.controlFillActive, this.opts.controlFillActiveAlpha )
            this.control.beginFill(this.opts.controlFillActive);
            this.control.alpha = this.opts.controlFillActiveAlpha;
            this.control.drawCircle(0, 0, this.opts.controlRadiusActive - 1);
        }
        else {
            this.control.lineStyle(this.opts.controlStrokeWidth, this.opts.controlStroke, this.opts.controlStrokeAlpha);
            //V5 this.control.beginFill( this.opts.controlFill, this.opts.controlFillAlpha )
            this.control.beginFill(this.opts.controlFill);
            this.control.alpha = this.opts.controlFillAlpha;
            this.control.drawCircle(0, 0, this.opts.controlRadius - 1);
        }
        this.control.endFill();
        return this;
    };
    //
    // Draws the animation.
    //
    // @private
    // @return { Switch } A reference to the switch for chaining.
    //
    Switch.prototype.drawAnimated = function () {
        this.switchObj.clear();
        this.switchObj.lineStyle(this.tempAnimated.strokeWidth, this.tempAnimated.stroke, this.tempAnimated.strokeAlpha);
        //V5 this.switchObj.beginFill( this.tempAnimated.fill, this.tempAnimated.fillAlpha )
        this.switchObj.beginFill(this.tempAnimated.fill);
        this.switchObj.alpha = this.tempAnimated.fillAlpha;
        this.switchObj.moveTo(this.radius, 0);
        this.switchObj.lineTo(this.opts.width - this.radius, 0);
        this.switchObj.arcTo(this.opts.width, 0, this.opts.width, this.radius, this.radius);
        this.switchObj.lineTo(this.opts.width, this.radius + 1); // BUGFIX: If not specified, there is a small area without a stroke.
        this.switchObj.arcTo(this.opts.width, this.opts.height, this.opts.width - this.radius, this.opts.height, this.radius);
        this.switchObj.lineTo(this.radius, this.opts.height);
        this.switchObj.arcTo(0, this.opts.height, 0, this.radius, this.radius);
        this.switchObj.arcTo(0, 0, this.radius, 0, this.radius);
        this.switchObj.endFill();
        this.control.clear();
        this.control.lineStyle(this.tempAnimated.controlStrokeWidth, this.tempAnimated.controlStroke, this.tempAnimated.controlStrokeAlpha);
        //V5 this.control.beginFill( this.tempAnimated.controlFill, this.tempAnimated.controlFillAlpha )
        this.control.beginFill(this.tempAnimated.controlFill);
        this.control.alpha = this.tempAnimated.controlFillAlpha;
        this.control.drawCircle(0, 0, this.tempAnimated.controlRadius - 1);
        this.control.endFill();
        return this;
    };
    Object.defineProperty(Switch.prototype, "active", {
        //
        // Gets or sets the active state.
        //
        // @member { boolean}
        //
        get: function () {
            return this._active;
        },
        set: function (value) {
            var _this = this;
            this._active = value;
            if (this._active) {
                Tween_1.default.to(this.control, this.opts.duration, { x: this.xActive });
                Tween_1.default.to(this.tempAnimated, this.opts.duration, {
                    colorProps: {
                        fill: this.opts.fillActive,
                        stroke: this.opts.strokeActive,
                        controlFill: this.opts.controlFillActive,
                        controlStroke: this.opts.controlStrokeActive,
                        format: 'number'
                    },
                    fillAlpha: this.opts.fillActiveAlpha,
                    strokeWidth: this.opts.strokeActiveWidth,
                    strokeAlpha: this.opts.strokeActiveAlpha,
                    controlFillAlpha: this.opts.controlFillActiveAlpha,
                    controlStrokeWidth: this.opts.controlStrokeActiveWidth,
                    controlStrokeAlpha: this.opts.controlStrokeActiveAlpha,
                    controlRadius: this.opts.controlRadiusActive,
                    onUpdate: function () { return _this.drawAnimated(); },
                    onComplete: function () { return _this.draw(); }
                });
            }
            else {
                Tween_1.default.to(this.control, this.opts.durationActive, { x: this.xInactive });
                Tween_1.default.to(this.tempAnimated, this.opts.durationActive, {
                    colorProps: {
                        fill: this.opts.fill,
                        stroke: this.opts.stroke,
                        controlFill: this.opts.controlFill,
                        controlStroke: this.opts.controlStroke,
                        format: 'number'
                    },
                    fillAlpha: this.opts.fillAlpha,
                    strokeWidth: this.opts.strokeWidth,
                    strokeAlpha: this.opts.strokeAlpha,
                    controlFillAlpha: this.opts.controlFillAlpha,
                    controlStrokeWidth: this.opts.controlStrokeWidth,
                    controlStrokeAlpha: this.opts.controlStrokeAlpha,
                    controlRadius: this.opts.controlRadius,
                    onUpdate: function () { return _this.drawAnimated(); },
                    onComplete: function () { return _this.draw(); }
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Switch.prototype, "disabled", {
        //
        // Gets or sets the disabled state. When disabled, the switch cannot be clicked.
        //
        // @member { boolean}
        //
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value;
            if (this._disabled) {
                this.switchObj.interactive = false;
                this.switchObj.buttonMode = false;
                this.switchObj.alpha = .5;
                this.control.alpha = .5;
            }
            else {
                this.switchObj.interactive = true;
                this.switchObj.buttonMode = true;
                this.switchObj.alpha = 1;
                this.control.alpha = 1;
            }
        },
        enumerable: false,
        configurable: true
    });
    //
    // Shows the switch ( sets his alpha values to 1 ).
    //
    // @return { Switch } A reference to the switch for chaining.
    //
    Switch.prototype.show = function () {
        this.opts.strokeAlpha = 1;
        this.opts.strokeActiveAlpha = 1;
        this.opts.fillAlpha = 1;
        this.opts.fillActiveAlpha = 1;
        this.opts.controlStrokeAlpha = 1;
        this.opts.controlStrokeActiveAlpha = 1;
        this.opts.controlFillAlpha = 1;
        this.opts.controlFillActiveAlpha = 1;
        this.layout();
        return this;
    };
    //
    // Hides the switch ( sets his alpha values to 1 ).
    //
    // @return { Switch } A reference to the switch for chaining.
    //
    Switch.prototype.hide = function () {
        this.opts.strokeAlpha = 0;
        this.opts.strokeActiveAlpha = 0;
        this.opts.fillAlpha = 0;
        this.opts.fillActiveAlpha = 0;
        this.opts.controlStrokeAlpha = 0;
        this.opts.controlStrokeActiveAlpha = 0;
        this.opts.controlFillAlpha = 0;
        this.opts.controlFillActiveAlpha = 0;
        this.layout();
        return this;
    };
    return Switch;
}(PIXI.Container));
exports["default"] = Switch;


/***/ }),

/***/ "./src/theme.ts":
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThemeRed = exports.ThemeLight = exports.ThemeDark = void 0;
var Theme = /** @class */ (function () {
    function Theme(opts) {
        if (opts === void 0) { opts = {}; }
        // blue
        var colorPrimary = opts.primaryColor != null ? opts.primaryColor : 0x5ec7f8;
        // black
        var color1 = opts.color1 != null ? opts.color1 : 0x282828;
        // white
        var color2 = opts.color2 != null ? opts.color2 : 0xf6f6f6;
        this.opts = Object.assign({}, {
            margin: 12,
            padding: 12,
            radius: 4,
            fast: .25,
            normal: .5,
            slow: 1,
            primaryColor: colorPrimary,
            color1: color1,
            color2: color2,
            fill: color1,
            fillAlpha: 1,
            fillActive: color1,
            fillActiveAlpha: 1,
            anchor: { x: 0, y: 0 },
            stroke: color2,
            //O strokeWidth: .6,
            //B Either a PIXI V5 or Legacy or whatever, but .6 results in most of the
            //B button outline missing, except the corners.
            strokeWidth: 1,
            strokeAlpha: 1,
            strokeActive: color2,
            //O strokeActiveWidth: .6,
            //B Either a PIXI V5 or Legacy or whatever, but .6 results in most of the
            //B button outline missing, except the corners.
            strokeActiveWidth: 1,
            strokeActiveAlpha: 1,
            iconColor: color2,
            iconColorActive: colorPrimary,
            background: color1,
            textStyle: null,
            textStyleSmall: null,
            textStyleLarge: null,
            textStyleSmallActive: null,
            textStyleLargeActive: null,
        }, opts);
        // Set textStyle and variants
        this.opts.textStyle = Object.assign({}, {
            fontFamily: '"Avenir Next", "Open Sans", "Segoe UI", "Roboto", "Helvetica Neue", -apple-system, system-ui, BlinkMacSystemFont, Arial, sans-serif !default',
            fontWeight: '500',
            fontSize: 18,
            fill: color2,
            stroke: color1,
            //O strokeThickness: 0,
            //B Either a PIXI V5 or Legacy or whatever, but 0 results in most of the
            //B switch outline missing, except the corners.
            strokeThickness: 1,
            miterLimit: 1,
            lineJoin: 'round'
        }, this.opts.textStyle);
        this.opts.textStyleSmall = Object.assign({}, this.opts.textStyle, { fontSize: this.opts.textStyle.fontSize - 3 }, this.opts.textStyleSmall);
        this.opts.textStyleLarge = Object.assign({}, this.opts.textStyle, { fontSize: this.opts.textStyle.fontSize + 3 }, this.opts.textStyleLarge);
        this.opts.textStyleActive = Object.assign({}, this.opts.textStyle, { fill: this.opts.primaryColor }, this.opts.textStyleActive);
        this.opts.textStyleSmallActive = Object.assign({}, this.opts.textStyleSmall, { fill: this.opts.primaryColor }, this.opts.textStyleSmallActive);
        this.opts.textStyleLargeActive = Object.assign({}, this.opts.textStyleLarge, { fill: this.opts.primaryColor }, this.opts.textStyleLargeActive);
        Object.assign(this, this.opts);
    }
    //
    // Factory function
    //
    // @static
    // @param { string } theme = dark - The name of the theme to load.
    // @return { Theme } Returns a newly created Theme object.
    //
    Theme.fromString = function (theme) {
        if (theme && typeof theme === 'object') {
            return theme;
        }
        switch (theme) {
            case 'light':
                return new ThemeLight();
            case 'red':
                return new ThemeRed();
            default:
                return new ThemeDark();
        }
    };
    return Theme;
}());
exports["default"] = Theme;
//
// Class that represents a PixiJS ThemeDark.
//
// @example
// // Create the app with a new dark theme
// const app = new PIXIApp( {
//     view: canvas,
//     width: 450,
//     height: 150,
//     theme: new ThemeDark( )
// } ).setup( ).run( )
//
// @class
// @extends Theme
// @see { @link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest }
//
var ThemeDark = /** @class */ (function (_super) {
    __extends(ThemeDark, _super);
    function ThemeDark() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ThemeDark;
}(Theme));
exports.ThemeDark = ThemeDark;
//
// Class that represents a PixiJS ThemeLight.
// The color1 is set to 0xf6f6f6, color2 to 0x282828.
//
// @example
// // Create the app with a new light theme
// const app = new PIXIApp( {
//     view: canvas,
//     width: 450,
//     height: 150,
//     theme: new ThemeLight( )
// } ).setup( ).run( )
//
// @class
// @extends Theme
// @see { @link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest }
//
var ThemeLight = /** @class */ (function (_super) {
    __extends(ThemeLight, _super);
    //
    // Creates an instance of a ThemeLight.
    //
    // @constructor
    //
    function ThemeLight() {
        return _super.call(this, { color1: 0xf6f6f6, color2: 0x282828 }) || this;
    }
    return ThemeLight;
}(Theme));
exports.ThemeLight = ThemeLight;
//
// Class that represents a PixiJS ThemeRed.
// The primaryColor is set to 0xd92f31.
//
// @example
// // Create the app with a new red theme
// const app = new PIXIApp( {
//     view: canvas,
//     width: 450,
//     height: 150,
//     theme: new ThemeRed( )
// } ).setup( ).run( )
//
// @class
// @extends Theme
// @see { @link https://www.iwm-tuebingen.de/iwmbrowser/lib/pixi/theme.html|DocTest }
//
var ThemeRed = /** @class */ (function (_super) {
    __extends(ThemeRed, _super);
    //
    // Creates an instance of a ThemeRed.
    //
    // @constructor
    //
    function ThemeRed() {
        return _super.call(this, { primaryColor: 0xd92f31 }) || this;
    }
    return ThemeRed;
}(Theme));
exports.ThemeRed = ThemeRed;


/***/ }),

/***/ "./src/tooltip.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var abstractpopup_1 = __importDefault(__webpack_require__("./src/abstractpopup.ts"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        var theme = theme_1.default.fromString(opts.theme);
        opts = Object.assign({}, {
            minWidth: 0,
            minHeight: 0,
            //B padding does not exist on theme
            //B padding: theme.padding / 2,
            padding: theme.opts.padding / 2,
            object: null,
            container: null,
            offsetLeft: 8,
            offsetTop: -8,
            delay: 0
        }, opts);
        opts.container = opts.container || opts.object;
        _this = _super.call(this, opts) || this;
        // setup
        //-----------------
        _this.setup();
        // layout
        //-----------------
        _this.layout();
        return _this;
    }
    //
    // Creates children and instantiates everything.
    //
    // @protected
    // @return {Tooltip} A reference to the tooltip for chaining.
    //
    Tooltip.prototype.setup = function () {
        var _this = this;
        _super.prototype.setup.call(this);
        // bind events this
        //-----------------
        this.interactive = true;
        var mouseoverTooltip = false;
        //O this.on('mouseover', e =>
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.on('mouseover', function (e) {
            mouseoverTooltip = true;
        });
        //O this.on('mouseout', e =>
        // @ts-ignore error TS6133: 'e' is declared but never read
        this.on('mouseout', function (e) {
            mouseoverTooltip = false;
            if (!mouseoverObject) {
                _this.hide(function () {
                    _this.opts.container.removeChild(_this);
                });
            }
        });
        //Fixme   Change objects to be a required parameter. TBD as this currently
        //Fixme   would break comparison testing.
        if (this.opts.object === null)
            throw ("Error: Volatile, no object(s) passed in. This should be changed to a required parameter instead of an option");
        // bind events object
        //-----------------
        var object = this.opts.object;
        object.interactive = true;
        var mouseoverObject = false;
        //O object.on('mouseover', e =>
        object.on('mouseover', function (e) {
            _this.timeout = window.setTimeout(function () {
                mouseoverObject = true;
                _this.visible = true;
                _this.opts.container.addChild(_this);
                _this.setPosition(e);
            }, _this.opts.delay * 1000);
        });
        //O object.on('mousemove', e =>
        object.on('mousemove', function (e) {
            if (mouseoverObject) {
                _this.setPosition(e);
            }
        });
        //O object.on('mouseout', e =>
        // @ts-ignore error TS6133: 'e' is declared but never read
        object.on('mouseout', function (e) {
            mouseoverObject = false;
            window.clearTimeout(_this.timeout);
            if (!mouseoverTooltip) {
                _this.hide(function () {
                    _this.opts.container.removeChild(_this);
                });
            }
        });
        return this;
    };
    //
    // Calculates and sets the position of the tooltip.
    //
    // @private
    // @return {Tooltip} A reference to the tooltip for chaining.
    //
    Tooltip.prototype.setPosition = function (e) {
        var position = e.data.getLocalPosition(this.opts.container);
        this.x = position.x + this.opts.offsetLeft;
        this.y = position.y + this.opts.offsetTop - this.height;
        return this;
    };
    return Tooltip;
}(abstractpopup_1.default));
exports["default"] = Tooltip;


/***/ }),

/***/ "./src/types.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//
//   IMPORTANT: DO NOT IMPORT ANYTHING IN THIS FILE !!!
//
//   While interfaces can be extended ( Merged ), they cannot
//   be merged if the file contains an import.  Move them here so
//   they will be merged accordingly
//
//   The things we do for typescript :-(
//
//                        signed
//                            Management
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.strNumToNum = void 0;
// See https://blog.logrocket.com/mastering-mapped-types-typescript/
// See https://typescript-v2-121.ortam.vercel.app/docs/handbook/advanced-types.html
function strNumToNum(value) {
    if (typeof value === "number") {
        return value;
    }
    if (typeof value === "string") {
        return parseFloat(value);
    }
    throw new Error("Expected string or number, got '".concat(value, "'."));
}
exports.strNumToNum = strNumToNum;


/***/ }),

/***/ "./src/utils.ts":
/***/ (function(__unused_webpack_module, exports) {

"use strict";

// globals WebKitPoint
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Strings = exports.Rect = exports.Polygon = exports.Elements = exports.Angle = exports.Sets = exports.Points = exports.Cycle = exports.Colors = exports.Dates = exports.randomFloat = exports.randomInt = exports.getId = exports.debounce = exports.sample = exports.lerp = exports.uuid = exports.isEmpty = void 0;
// Tests whether an object is empty
// @param {Object} obj - the object to be tested
// @return {boolean}
//
function isEmpty(obj) {
    // > isEmpty( { } )
    // true
    for (var i in obj) {
        // TS6133: 'i' is declared but its value is never read
        i = i;
        return false;
    }
    return true;
}
exports.isEmpty = isEmpty;
// Returns a universal unique id
// @return {string}
// See https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/21963136#21963136
//
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuid = uuid;
function lerp(start, stop, amt) {
    return amt * (stop - start) + start;
}
exports.lerp = lerp;
function sample(population, k) {
    /*
        From https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array/38571132

        Chooses k unique random elements from a population sequence or set.

        Returns a new list containing elements from the population while
        leaving the original population unchanged.  The resulting list is
        in selection order so that all sub-slices will also be valid random
        samples.  This allows raffle winners (the sample) to be partitioned
        into grand prize and second place winners (the subslices).

        Members of the population need not be hashable or unique.  If the
        population contains repeats, then each occurrence is a possible
        selection in the sample.

        To choose a sample in a range of integers, use range as an argument.
        This is especially fast and space efficient for sampling from a
        large population:   sample(range(10000000), 60)

        Sampling without replacement entails tracking either potential
        selections (the pool) in a list or previous selections in a set.

        When the number of selections is small compared to the
        population, then tracking selections is efficient, requiring
        only a small set and an occasional reselection.  For
        a larger number of selections, the pool tracking method is
        preferred since the list takes less space than the
        set and it doesn't suffer from frequent reselections.
    */
    if (!Array.isArray(population))
        throw new TypeError("Error: Utils, Population must be an array.");
    var n = population.length;
    if (k < 0 || k > n)
        throw new RangeError("Error: Utils, Sample larger than population or is negative");
    var result = new Array(k);
    var setsize = 21; // size of a small set minus size of an empty list
    if (k > 5)
        //B setsize += Math.pow(4, Math.ceil(Math.log(k * 3, 4)))
        //B Math.log, expected 1 argument, received two
        setsize += Math.pow(4, Math.ceil(Math.log(k * 3)));
    if (n <= setsize) {
        // An n-length list is smaller than a k-length set
        var pool = population.slice();
        for (var i = 0; i < k; i++) { // invariant:  non-selected at [0,n-i)
            var j = Math.random() * (n - i) | 0;
            result[i] = pool[j];
            pool[j] = pool[n - i - 1]; // move non-selected item into vacancy
        }
    }
    else {
        var selected = new Set();
        for (var i = 0; i < k; i++) {
            var j = Math.random() * (n - i) | 0;
            while (selected.has(j)) {
                j = Math.random() * (n - i) | 0;
            }
            selected.add(j);
            result[i] = population[j];
        }
    }
    return result;
}
exports.sample = sample;
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// Taken from: https://davidwalsh.name/essential-javascript-functions
//export function debounce( func: Function, wait: number, immediate: boolean )
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        // @ts-ignore - error TS2683 : 'this' implicitly has type 'any' because it does not have a type annotation.
        var context = this;
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
exports.debounce = debounce;
// Returns an id that is guaranteed to be unique within the livetime of the
// application
// @return {string}
//
var _idGenerator = 0;
function getId() {
    return 'id' + _idGenerator++;
}
exports.getId = getId;
function randomInt(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomInt = randomInt;
function randomFloat(min, max) {
    if (min === void 0) { min = 0.0; }
    if (max === void 0) { max = 1.0; }
    return Math.random() * (max - min) + min;
}
exports.randomFloat = randomFloat;
var Dates = /** @class */ (function () {
    function Dates() {
    }
    //static create( fullYear: number, month: number, day: number, hour?: number, minutes?: number ): Date
    Dates.create = function (fullYear, month, day) {
        //O return new Date( Date.UTC( fullYear, month, day, hour, minutes ) )
        return new Date(Date.UTC(fullYear, month, day));
    };
    Dates.daysInMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    Dates.startYearRange = function (date) {
        return new Date(Date.UTC(date.getFullYear() - 1, 11, 31, 23, 59, 59, 999));
    };
    Dates.endYearRange = function (date) {
        return new Date(Date.UTC(date.getFullYear() + 1, 0, 1));
    };
    Dates.prevYear = function (date, offset) {
        if (offset === void 0) { offset = 1; }
        return this.create(date.getFullYear() - offset, 0, 1);
    };
    Dates.nextYear = function (date, offset) {
        if (offset === void 0) { offset = 1; }
        return this.create(date.getFullYear() + offset, 0, 1);
    };
    Dates.nextMonth = function (date) {
        return this.create(date.getFullYear(), date.getMonth() + 1, 1);
    };
    Dates.nextDay = function (date) {
        return this.create(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    };
    Dates.nextHour = function (date) {
        // See http://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object
        return new Date(date.getTime() + 60 * 60 * 1000);
    };
    Dates.nextMinute = function (date) {
        // See above
        return new Date(date.getTime() + 60 * 1000);
    };
    Dates.nextSecond = function (date) {
        // See above
        return new Date(date.getTime() + 1000);
    };
    Dates.nextMillisecond = function (date) {
        // See above
        return new Date(date.getTime() + 1);
    };
    Dates.iterYears = function (start, end) {
        var date;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = this.create(start.getFullYear(), 0, 1);
                    _a.label = 1;
                case 1:
                    if (!(date <= end)) return [3 /*break*/, 3];
                    return [4 /*yield*/, date];
                case 2:
                    _a.sent();
                    date = this.nextYear(date);
                    return [3 /*break*/, 1];
                case 3: return [4 /*yield*/, date
                    //N Stupid typescript
                ];
                case 4:
                    _a.sent();
                    //N Stupid typescript
                    return [2 /*return*/, null];
            }
        });
    };
    Dates.iterMonths = function (year, limit) {
        var month, date;
        if (limit === void 0) { limit = 12; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    month = 0;
                    _a.label = 1;
                case 1:
                    if (!(month < limit)) return [3 /*break*/, 3];
                    date = this.create(year.getFullYear(), month, 1);
                    return [4 /*yield*/, date];
                case 2:
                    _a.sent();
                    month += 1;
                    return [3 /*break*/, 1];
                case 3: 
                //N Stupid typescript
                return [2 /*return*/, null];
            }
        });
    };
    //static *iterMonthsOfYears( years: Array< Date > ): Date
    Dates.iterMonthsOfYears = function (years) {
        var years_1, years_1_1, year, _a, _b, month, e_1_1, e_2_1;
        var e_2, _c, e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 11, 12, 13]);
                    years_1 = __values(years), years_1_1 = years_1.next();
                    _e.label = 1;
                case 1:
                    if (!!years_1_1.done) return [3 /*break*/, 10];
                    year = years_1_1.value;
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 7, 8, 9]);
                    _a = (e_1 = void 0, __values(this.iterMonths(year))), _b = _a.next();
                    _e.label = 3;
                case 3:
                    if (!!_b.done) return [3 /*break*/, 6];
                    month = _b.value;
                    return [4 /*yield*/, month];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _b = _a.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9:
                    years_1_1 = years_1.next();
                    return [3 /*break*/, 1];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (years_1_1 && !years_1_1.done && (_c = years_1.return)) _c.call(years_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 13: 
                //N Stupid typescript
                return [2 /*return*/, null];
            }
        });
    };
    Dates.iterDays = function (month) {
        var day, limit, date;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    day = 1;
                    limit = Dates.daysInMonth(month);
                    _a.label = 1;
                case 1:
                    if (!(day <= limit)) return [3 /*break*/, 3];
                    date = this.create(month.getFullYear(), month.getMonth(), day);
                    return [4 /*yield*/, date];
                case 2:
                    _a.sent();
                    day += 1;
                    return [3 /*break*/, 1];
                case 3: 
                //N Stupid typescript
                return [2 /*return*/, null];
            }
        });
    };
    Dates.iterDaysOfMonths = function (months) {
        var months_1, months_1_1, month, _a, _b, day, e_3_1, e_4_1;
        var e_4, _c, e_3, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 11, 12, 13]);
                    months_1 = __values(months), months_1_1 = months_1.next();
                    _e.label = 1;
                case 1:
                    if (!!months_1_1.done) return [3 /*break*/, 10];
                    month = months_1_1.value;
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 7, 8, 9]);
                    _a = (e_3 = void 0, __values(this.iterDays(month))), _b = _a.next();
                    _e.label = 3;
                case 3:
                    if (!!_b.done) return [3 /*break*/, 6];
                    day = _b.value;
                    return [4 /*yield*/, day];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _b = _a.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_3_1 = _e.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 9:
                    months_1_1 = months_1.next();
                    return [3 /*break*/, 1];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_4_1 = _e.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (months_1_1 && !months_1_1.done && (_c = months_1.return)) _c.call(months_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 13: 
                //N Stupid typescript
                return [2 /*return*/, null];
            }
        });
    };
    return Dates;
}());
exports.Dates = Dates;
// Color conversion functions
var Colors = /** @class */ (function () {
    function Colors() {
    }
    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    Colors.rgb2num = function (red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return 0x000000 + rgb;
    };
    Colors.rgb2hex = function (red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1);
    };
    Colors.hex2rgb = function (hex) {
        // long version
        var r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (r) {
            return r.slice(1, 4).map(function (x) {
                return parseInt(x, 16);
            });
        }
        // short version
        r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        if (r) {
            return r.slice(1, 4).map(function (x) {
                return 0x11 * parseInt(x, 16);
            });
        }
        return null;
    };
    Colors.rgb = function (r, g, b) {
        return { r: r, g: g, b: b };
    };
    Colors.lerp = function (rgb1, rgb2, amount) {
        return {
            r: Math.round(lerp(rgb1.r, rgb2.r, amount)),
            g: Math.round(lerp(rgb1.g, rgb2.g, amount)),
            b: Math.round(lerp(rgb1.b, rgb2.b, amount))
        };
    };
    Object.defineProperty(Colors, "violet", {
        get: function () {
            return Colors.rgb2num(89, 34, 131);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Colors, "steelblue", {
        get: function () {
            return Colors.rgb2num(0, 130, 164);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Colors, "ochre", {
        get: function () {
            return Colors.rgb2num(181, 157, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Colors, "turquoise", {
        get: function () {
            return Colors.rgb2num(34, 164, 131);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Colors, "eminence", {
        get: function () {
            return Colors.rgb2num(150, 60, 134);
        },
        enumerable: false,
        configurable: true
    });
    Colors.random = function () {
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        return Colors.rgb2num(r, g, b);
    };
    return Colors;
}());
exports.Colors = Colors;
//B God knows how this handles pop, push, splice, slice, shift & unshift
var Cycle = /** @class */ (function (_super) {
    __extends(Cycle, _super);
    function Cycle() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([], __read(items), false)) || this;
    }
    Cycle.prototype.next = function () {
        if (this.index == this.length) {
            this.index = 0;
        }
        return this[this.index++];
    };
    Cycle.prototype.current = function () {
        if (this.index === this.length) {
            this.index = 0;
        }
        return this[this.index];
    };
    return Cycle;
}(Array));
exports.Cycle = Cycle;
// Static methods to compute 2D points with x and y coordinates.
//
var Points = /** @class */ (function () {
    function Points() {
    }
    //B static length( a: Point ): number
    //B length is a reserver property name
    Points.pointLength = function (a) {
        return Math.sqrt(a.x * a.x + a.y * a.y);
    };
    Points.normalize = function (p) {
        //B let len = this.length( p )
        //B length is a reservered property name
        var len = this.pointLength(p);
        return this.multiplyScalar(p, 1 / len);
    };
    Points.mean = function (a, b) {
        return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    };
    Points.subtract = function (a, b) {
        return { x: a.x - b.x, y: a.y - b.y };
    };
    Points.multiply = function (a, b) {
        return { x: a.x * b.x, y: a.y * b.y };
    };
    Points.divide = function (a, b) {
        return { x: a.x / b.x, y: a.y / b.y };
    };
    Points.multiplyScalar = function (a, b) {
        return { x: a.x * b, y: a.y * b };
    };
    Points.add = function (a, b) {
        return { x: a.x + b.x, y: a.y + b.y };
    };
    Points.negate = function (p) {
        return { x: -p.x, y: -p.y };
    };
    Points.angle = function (p1, p2) {
        return Math.atan2(p1.y - p2.y, p1.x - p2.x);
    };
    Points.normalizedAngle = function (p1, p2) {
        return Angle.normalize(this.angle(p1, p2));
    };
    Points.normalized2Angle = function (p1, p2) {
        return Angle.normalize2(this.angle(p1, p2));
    };
    Points.arc = function (p, alpha, radius) {
        return {
            x: p.x + radius * Math.cos(alpha),
            y: p.y + radius * Math.sin(alpha)
        };
    };
    Points.distance = function (a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    // This uses a function on the global window, based on iwmlib.
    //  So this cannot be unit tested easily. TBD
    // https://gitea.iwm-tuebingen.de/IWMBrowser/iwmlib/commit/80317c502614c5968dd81d2863d0c15ef4fcc75f
    Points.fromPageToNode = function (element, p) {
        //    if ( window.webkitConvertPointFromPageToNode )
        //    {
        //             return window.webkitConvertPointFromPageToNode( element,
        //                                                     new WebKitPoint( p.x, p.y ) )
        //    }
        // @ts-ignore TS2339: Property 'convertPointFromPageToNode' does not exist on type 'Window & typeof globalThis'.
        return window.convertPointFromPageToNode(element, p.x, p.y);
    };
    // This uses a function on the global window, based on iwmlib.
    //  So this cannot be unit tested easily. TBD
    // https://gitea.iwm-tuebingen.de/IWMBrowser/iwmlib/commit/80317c502614c5968dd81d2863d0c15ef4fcc75f
    Points.fromNodeToPage = function (element, p) {
        //  if ( window.webkitConvertPointFromNodeToPage )
        //  {
        //             return window.webkitConvertPointFromNodeToPage( element,
        //                                                     new WebKitPoint( p.x, p.y ) )
        //  }
        // @ts-ignore TS2339: Property 'convertPointFromPageToNode' does not exist on type 'Window & typeof globalThis'.
        return window.convertPointFromNodeToPage(element, p.x, p.y);
    };
    return Points;
}());
exports.Points = Points;
//
// A helper class for common set operations.
//
// @export
// @class Sets
//
//export class Sets extends Set
var Sets = /** @class */ (function () {
    function Sets() {
    }
    //
    // Returns the intersection of all sets
    // https://stackoverflow.com/questions/31930894/javascript-set-data-structure-intersect
    // @static
    // @param {*} sets
    // @returns
    // @memberof Sets
    //
    Sets.intersect = function () {
        var e_5, _a;
        var sets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sets[_i] = arguments[_i];
        }
        if (!sets.length)
            return new Set();
        var i = sets.reduce(function (m, s, i) { return s.size < sets[m].size ? i : m; }, 0);
        var _b = __read(sets.splice(i, 1), 1), smallest = _b[0];
        var res = new Set();
        var _loop_1 = function (val) {
            if (sets.every(function (s) { return s.has(val); }))
                res.add(val);
        };
        try {
            for (var smallest_1 = __values(smallest), smallest_1_1 = smallest_1.next(); !smallest_1_1.done; smallest_1_1 = smallest_1.next()) {
                var val = smallest_1_1.value;
                _loop_1(val);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (smallest_1_1 && !smallest_1_1.done && (_a = smallest_1.return)) _a.call(smallest_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return res;
    };
    //
    // Returns the union of all sets
    //
    // @static
    // @param {*} sets
    // @returns
    // @memberof Sets
    //
    Sets.union = function () {
        var e_6, _a, e_7, _b;
        var sets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sets[_i] = arguments[_i];
        }
        var result = new Set();
        try {
            for (var sets_1 = __values(sets), sets_1_1 = sets_1.next(); !sets_1_1.done; sets_1_1 = sets_1.next()) {
                var set = sets_1_1.value;
                try {
                    for (var set_1 = (e_7 = void 0, __values(set)), set_1_1 = set_1.next(); !set_1_1.done; set_1_1 = set_1.next()) {
                        var m = set_1_1.value;
                        result.add(m);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (set_1_1 && !set_1_1.done && (_b = set_1.return)) _b.call(set_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (sets_1_1 && !sets_1_1.done && (_a = sets_1.return)) _a.call(sets_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return result;
    };
    //
    // Returns the difference of the given sets. Starts with the first set and removing all elements of the following sets.
    //
    // @static
    // @param {*} set
    // @param {*} sets
    // @returns
    // @memberof Sets
    //
    Sets.difference = function (set) {
        var e_8, _a, e_9, _b, e_10, _c;
        var sets = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sets[_i - 1] = arguments[_i];
        }
        var result = new Set();
        try {
            for (var set_2 = __values(set), set_2_1 = set_2.next(); !set_2_1.done; set_2_1 = set_2.next()) {
                var m = set_2_1.value;
                result.add(m);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (set_2_1 && !set_2_1.done && (_a = set_2.return)) _a.call(set_2);
            }
            finally { if (e_8) throw e_8.error; }
        }
        try {
            for (var sets_2 = __values(sets), sets_2_1 = sets_2.next(); !sets_2_1.done; sets_2_1 = sets_2.next()) {
                var s = sets_2_1.value;
                try {
                    for (var s_1 = (e_10 = void 0, __values(s)), s_1_1 = s_1.next(); !s_1_1.done; s_1_1 = s_1.next()) {
                        var m = s_1_1.value;
                        result.delete(m);
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (s_1_1 && !s_1_1.done && (_c = s_1.return)) _c.call(s_1);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (sets_2_1 && !sets_2_1.done && (_b = sets_2.return)) _b.call(sets_2);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return result;
    };
    return Sets;
}());
exports.Sets = Sets;
// Static methods to compute angles.
//
var Angle = /** @class */ (function () {
    function Angle() {
    }
    Angle.normalize = function (angle) {
        var twoPI = Math.PI * 2.0;
        while (angle > Math.PI) {
            angle -= twoPI;
        }
        while (angle < -Math.PI) {
            angle += twoPI;
        }
        return angle;
    };
    Angle.normalize2 = function (angle) {
        var TAU = Math.PI * 2.0;
        while (angle > TAU) {
            angle -= TAU;
        }
        while (angle < 0) {
            angle += TAU;
        }
        return angle;
    };
    Angle.normalizeDegree = function (angle) {
        var full = 360.0;
        while (angle > 180.0) {
            angle -= full;
        }
        while (angle < -180.0) {
            angle += full;
        }
        return angle;
    };
    Angle.diff = function (a, b) {
        return Angle.normalize(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
    };
    Angle.degree2radian = function (degree) {
        return Math.PI * degree / 180.0;
    };
    Angle.radian2degree = function (rad) {
        return 180.0 / Math.PI * rad;
    };
    return Angle;
}());
exports.Angle = Angle;
var Elements = /** @class */ (function () {
    function Elements() {
    }
    Elements.setStyle = function (element, styles) {
        for (var key in styles) {
            element.style[key] = styles[key];
        }
    };
    Elements.addClass = function (element, cssClass) {
        element.classList.add(cssClass);
    };
    Elements.removeClass = function (element, cssClass) {
        element.classList.remove(cssClass);
    };
    Elements.toggleClass = function (element, cssClass) {
        element.classList.toggle(cssClass);
    };
    Elements.hasClass = function (element, cssClass) {
        return element.classList.contains(cssClass);
    };
    return Elements;
}());
exports.Elements = Elements;
/* Not supported at this time
export class MapProxy
{
    // This class is needed if we want to use the interaction classes
    //in Firefox 45.8 and modern Browsers.

    // A workaround for https://github.com/babel/babel/issues/2334
    //
    private map: Array<string>

    constructor(  )
    {
        this.map = new Map(  )
    }

    get size(  ): number
    {
        return this.map.size
    }

    get( key: string )
    {
        return this.map.get( key )
    }

    set( key: string, value: number )
    {
        return this.map.set( key, value )
    }

    delete( key: string )
    {
        return this.map.delete( key )
    }

    clear(  )
    {
        return this.map.clear(  )
    }

    has( key: string )
    {
        return this.map.has( key )
    }

    keys(  ): Array< string >
    {
        return this.map.keys(  )
    }

    values(  ): Array< number >
    {
        return this.map.values(  )
    }

    entries(  )
    {
        return this.map.entries(  )
    }

    forEach( func: Array< Function > )
    {
        this.map.forEach( func )
    }
}

*/
// Based om https://gist.github.com/cwleonard/e124d63238bda7a3cbfa
var Polygon = /** @class */ (function () {
    function Polygon(center) {
        this.points = new Array();
        this.center = center;
    }
    //
    //  Point x and y values should be relative to the center.
    //
    Polygon.prototype.addPoint = function (p) {
        this.points.push(p);
    };
    //
    //  Point x and y values should be absolute coordinates.
    //
    Polygon.prototype.addAbsolutePoint = function (p) {
        this.points.push({ x: p.x - this.center.x, y: p.y - this.center.y });
    };
    //
    // Returns the number of sides. Equal to the number of vertices.
    //
    Polygon.prototype.getNumberOfSides = function () {
        return this.points.length;
    };
    //
    // rotate the polygon by a number of radians
    //
    Polygon.prototype.rotate = function (rads) {
        for (var i = 0; i < this.points.length; i++) {
            var x = this.points[i].x;
            var y = this.points[i].y;
            this.points[i].x = Math.cos(rads) * x - Math.sin(rads) * y;
            this.points[i].y = Math.sin(rads) * x + Math.cos(rads) * y;
        }
    };
    //
    //  The draw function takes as a parameter a Context object from
    //  a Canvas element and draws the polygon on it.
    //
    Polygon.prototype.draw = function (context, 
    //O {lineWidth = 2, stroke = '#000000', fill = null} = {} )
    //  Typescript workaround
    _a) {
        var 
        //O {lineWidth = 2, stroke = '#000000', fill = null} = {} )
        //  Typescript workaround
        _b = _a === void 0 ? {} : _a, _c = _b.lineWidth, lineWidth = _c === void 0 ? 2 : _c, _d = _b.stroke, stroke = _d === void 0 ? '#000000' : _d, _e = _b.fill, fill = _e === void 0 ? '' : _e;
        context.beginPath();
        context.moveTo(this.points[0].x + this.center.x, this.points[0].y + this.center.y);
        for (var i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x + this.center.x, this.points[i].y + this.center.y);
        }
        context.closePath();
        context.lineWidth = lineWidth;
        if (stroke) {
            context.strokeStyle = stroke;
            context.stroke();
        }
        //O if ( fill )
        //  Typescript workaround
        if (fill && fill != '') {
            context.fillStyle = fill;
            context.fill();
        }
    };
    Polygon.prototype.absolutePoints = function () {
        var e_11, _a;
        var result = new Array();
        try {
            for (var _b = __values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                result.push(Points.add(p, this.center));
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return result;
    };
    Polygon.prototype.flatAbsolutePoints = function () {
        var e_12, _a;
        var result = new Array();
        try {
            for (var _b = __values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                var a = Points.add(p, this.center);
                result.push(a.x);
                result.push(a.y);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return result;
    };
    //
    //  This function returns true if the given point is inside the polygon,
    //  and false otherwise.
    ///
    Polygon.prototype.containsPoint = function (pnt) {
        var nvert = this.points.length;
        var testx = pnt.x;
        var testy = pnt.y;
        var vertx = new Array();
        for (var q = 0; q < this.points.length; q++) {
            vertx.push(this.points[q].x + this.center.x);
        }
        var verty = new Array();
        for (var w = 0; w < this.points.length; w++) {
            verty.push(this.points[w].y + this.center.y);
        }
        var i, j = 0;
        var c = false;
        for (i = 0, j = nvert - 1; i < nvert; j = i++) {
            if (verty[i] > testy != verty[j] > testy &&
                testx <
                    (vertx[j] - vertx[i]) *
                        (testy - verty[i]) /
                        (verty[j] - verty[i]) +
                        vertx[i])
                c = !c;
        }
        return c;
    };
    Polygon.prototype.multiplyScalar = function (scale) {
        var e_13, _a;
        var center = Points.multiplyScalar(this.center, scale);
        var clone = new Polygon(center);
        try {
            for (var _b = __values(this.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                clone.addPoint(Points.multiplyScalar(p, scale));
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return clone;
    };
    //
    //  To detect intersection with another Polygon object, this
    //  function uses the Separating Axis Theorem. It returns false
    //  if there is no intersection, or an object if there is. The object
    //  contains 2 fields, overlap and axis. Moving the polygon by overlap
    //  on axis will get the polygons out of intersection.
    ///
    Polygon.prototype.intersectsWith = function (other) {
        var axis = { x: 0, y: 0 };
        var tmp, minA, maxA, minB, maxB;
        var side, i;
        var smallest = null;
        var overlap = 99999999;
        // test polygon A's sides
        for (side = 0; side < this.getNumberOfSides(); side++) {
            // get the axis that we will project onto
            if (side == 0) {
                axis.x =
                    this.points[this.getNumberOfSides() - 1].y -
                        this.points[0].y;
                axis.y =
                    this.points[0].x -
                        this.points[this.getNumberOfSides() - 1].x;
            }
            else {
                axis.x = this.points[side - 1].y - this.points[side].y;
                axis.y = this.points[side].x - this.points[side - 1].x;
            }
            // normalize the axis
            tmp = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
            axis.x /= tmp;
            axis.y /= tmp;
            // project polygon A onto axis to determine the min/max
            minA = maxA = this.points[0].x * axis.x + this.points[0].y * axis.y;
            for (i = 1; i < this.getNumberOfSides(); i++) {
                tmp = this.points[i].x * axis.x + this.points[i].y * axis.y;
                if (tmp > maxA)
                    maxA = tmp;
                else if (tmp < minA)
                    minA = tmp;
            }
            // correct for offset
            tmp = this.center.x * axis.x + this.center.y * axis.y;
            minA += tmp;
            maxA += tmp;
            // project polygon B onto axis to determine the min/max
            minB = maxB =
                other.points[0].x * axis.x + other.points[0].y * axis.y;
            for (i = 1; i < other.getNumberOfSides(); i++) {
                tmp = other.points[i].x * axis.x + other.points[i].y * axis.y;
                if (tmp > maxB)
                    maxB = tmp;
                else if (tmp < minB)
                    minB = tmp;
            }
            // correct for offset
            tmp = other.center.x * axis.x + other.center.y * axis.y;
            minB += tmp;
            maxB += tmp;
            // test if lines intersect, if not, return false
            if (maxA < minB || minA > maxB) {
                return false;
            }
            else {
                var o = maxA > maxB ? maxB - minA : maxA - minB;
                if (o < overlap) {
                    overlap = o;
                    smallest = { x: axis.x, y: axis.y };
                }
            }
        }
        // test polygon B's sides
        for (side = 0; side < other.getNumberOfSides(); side++) {
            // get the axis that we will project onto
            if (side == 0) {
                axis.x =
                    other.points[other.getNumberOfSides() - 1].y -
                        other.points[0].y;
                axis.y =
                    other.points[0].x -
                        other.points[other.getNumberOfSides() - 1].x;
            }
            else {
                axis.x = other.points[side - 1].y - other.points[side].y;
                axis.y = other.points[side].x - other.points[side - 1].x;
            }
            // normalize the axis
            tmp = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
            axis.x /= tmp;
            axis.y /= tmp;
            // project polygon A onto axis to determine the min/max
            minA = maxA = this.points[0].x * axis.x + this.points[0].y * axis.y;
            for (i = 1; i < this.getNumberOfSides(); i++) {
                tmp = this.points[i].x * axis.x + this.points[i].y * axis.y;
                if (tmp > maxA)
                    maxA = tmp;
                else if (tmp < minA)
                    minA = tmp;
            }
            // correct for offset
            tmp = this.center.x * axis.x + this.center.y * axis.y;
            minA += tmp;
            maxA += tmp;
            // project polygon B onto axis to determine the min/max */
            minB = maxB =
                other.points[0].x * axis.x + other.points[0].y * axis.y;
            for (i = 1; i < other.getNumberOfSides(); i++) {
                tmp = other.points[i].x * axis.x + other.points[i].y * axis.y;
                if (tmp > maxB)
                    maxB = tmp;
                else if (tmp < minB)
                    minB = tmp;
            }
            // correct for offset
            tmp = other.center.x * axis.x + other.center.y * axis.y;
            minB += tmp;
            maxB += tmp;
            // test if lines intersect, if not, return false
            if (maxA < minB || minA > maxB) {
                return false;
            }
            else {
                var o = maxA > maxB ? maxB - minA : maxA - minB;
                if (o < overlap) {
                    overlap = o;
                    smallest = { x: axis.x, y: axis.y };
                }
            }
        }
        return { overlap: overlap + 0.001, axis: smallest };
    };
    Polygon.fromPoints = function (points) {
        var e_14, _a, e_15, _b;
        var min = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };
        var max = { x: Number.MIN_VALUE, y: Number.MIN_VALUE };
        try {
            for (var points_1 = __values(points), points_1_1 = points_1.next(); !points_1_1.done; points_1_1 = points_1.next()) {
                var p = points_1_1.value;
                min.x = Math.min(p.x, min.x);
                max.x = Math.max(p.x, max.x);
                min.y = Math.min(p.y, min.y);
                max.y = Math.max(p.y, max.y);
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (points_1_1 && !points_1_1.done && (_a = points_1.return)) _a.call(points_1);
            }
            finally { if (e_14) throw e_14.error; }
        }
        var center = Points.mean(min, max);
        var polygon = new Polygon(center);
        try {
            for (var points_2 = __values(points), points_2_1 = points_2.next(); !points_2_1.done; points_2_1 = points_2.next()) {
                var p = points_2_1.value;
                polygon.addAbsolutePoint(p);
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (points_2_1 && !points_2_1.done && (_b = points_2.return)) _b.call(points_2);
            }
            finally { if (e_15) throw e_15.error; }
        }
        return polygon;
    };
    return Polygon;
}());
exports.Polygon = Polygon;
//
// Util functions to deal with DOMRects.
//
var Rect = /** @class */ (function () {
    function Rect() {
    }
    //
    // Test if a given point is contained by the provided Rect.
    //
    // @static
    // @param {DOMRect} rect - Rectangle to check the collision with.
    // @param {Point} point - Point that should be tested.
    // @returns {boolean} - True if point is inside of rect, otherwise false.
    // @memberof Rect
    //
    Rect.contains = function (rect, point) {
        return (point.x > rect.left &&
            point.x < rect.x + rect.right &&
            point.y > rect.top &&
            point.y < rect.bottom);
    };
    //
    // Returns the position of an rect as point object.
    //
    // @static
    // @param {Rect} rect - The rectangle we want to get the position from.
    // @returns {Point} - Returns the position as Point.
    // @memberof Rect
    //
    Rect.getPosition = function (rect) {
        return { x: rect.x, y: rect.y };
    };
    return Rect;
}());
exports.Rect = Rect;
// String utility functions
var Strings = /** @class */ (function () {
    function Strings() {
    }
    Strings.toUpperCaseFirstChar = function (str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    };
    Strings.toLowerCaseFirstChar = function (str) {
        return str.substr(0, 1).toLowerCase() + str.substr(1);
    };
    Strings.toUpperCaseEachWord = function (str, delim) {
        if (delim === void 0) { delim = ' '; }
        // B return str.split(delim).map((v) => v.toUpperCaseFirstChar()).join(delim)
        // B Unit testing of original code gives
        // B TypeError: v.toUpperCaseFirstChar is not a function
        return str.split(delim).map(function (v) { return Strings.toUpperCaseFirstChar(v); }).join(delim);
    };
    Strings.toLowerCaseEachWord = function (str, delim) {
        if (delim === void 0) { delim = ' '; }
        // B return str.split(delim).map((v) => v.toLowerCaseFirstChar()).join(delim)
        // B Unit testing of original code gives
        // B TypeError: v.toLowerCaseFirstChar is not a function
        return str.split(delim).map(function (v) { return Strings.toLowerCaseFirstChar(v); }).join(delim);
    };
    return Strings;
}());
exports.Strings = Strings;


/***/ }),

/***/ "./src/volatile.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PIXI = __importStar(__webpack_require__("pixi.js"));
var Tween_1 = __importDefault(__webpack_require__("./src/Ease/Tween.ts"));
var Ease_1 = __importDefault(__webpack_require__("./src/Ease/Ease.ts"));
var theme_1 = __importDefault(__webpack_require__("./src/theme.ts"));
var Volatile = /** @class */ (function () {
    function Volatile(opts) {
        if (opts === void 0) { opts = {}; }
        var theme = theme_1.default.fromString(opts.theme);
        this.theme = theme;
        this.opts = Object.assign({}, {
            id: PIXI.utils.uid(),
            object: null,
            // top, right, bottom, left
            direction: 'top',
            onStart: null,
            onComplete: null,
            distance: 160,
            duration: 1.5,
            ease: Ease_1.default.Quad.easeOut,
            destroyOnComplete: true
        }, opts);
        this.id = this.opts.id;
        if (!Array.isArray(this.opts.object))
            this.opts.object = [this.opts.object];
        this.objects = this.opts.object;
        // setup
        //-----------------
        this.setup();
        // layout
        //-----------------
        this.layout();
        // run
        //-----------------
        this.run();
    }
    //
    // Creates children and instantiates everything.
    //
    // @private
    // @return {Volatile} A reference to the volatile for chaining.
    //
    Volatile.prototype.setup = function () {
        return this;
    };
    //
    // Should be called to refresh the layout of the volatile.
    // Can be used after resizing.
    //
    // @return {Volatile} A reference to the volatile for chaining.
    //
    Volatile.prototype.layout = function () {
        return this;
    };
    //
    // Starts the volatile animation.
    //
    // @private
    // @return {Volatile} A reference to the volatile for chaining.
    //
    Volatile.prototype.run = function () {
        var e_1, _a;
        var _this = this;
        //B Bug fix found during Unit Testing.  Objects should not be an option
        //B but a requirement. Otherwise an objects will be created as an array
        //B with one element and that element is null.
        //Fixme   Change objects to be a required parameter. TBD as this currently
        //Fixme   would break comparison testing.
        if (this.objects.length == 1 && this.objects[0] == null)
            throw ("Error: Volatile, no object(s) passed in. This should be changed to a required parameter instead of an option");
        var _loop_1 = function (object) {
            var x = object.x;
            var y = object.y;
            switch (this_1.opts.direction) {
                case 'top':
                    y -= this_1.opts.distance;
                    break;
                case 'right':
                    x += this_1.opts.distance;
                    break;
                case 'bottom':
                    y += this_1.opts.distance;
                    break;
                case 'left':
                    x -= this_1.opts.distance;
                    break;
            }
            Tween_1.default.to(object, this_1.opts.duration, {
                x: x,
                y: y,
                alpha: 0,
                ease: this_1.opts.ease,
                //O overwrite: 'all',
                // Overwrite is true/false/"auto". Assume true
                overwrite: true,
                onStart: function () {
                    if (_this.opts.onStart)
                        _this.opts.onStart.call(object, object);
                },
                onComplete: function () {
                    if (_this.opts.onComplete)
                        _this.opts.onComplete.call(object, object);
                    if (_this.opts.destroyOnComplete) {
                        //O object.destroy({children: true})
                        // PIXI DisplayObject.destroy has no children option
                        object.destroy();
                    }
                }
            });
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.objects), _c = _b.next(); !_c.done; _c = _b.next()) {
                var object = _c.value;
                _loop_1(object);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    return Volatile;
}());
exports["default"] = Volatile;


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);

    this.client = new WebSocket(url);

    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }
  /**
   * @param {(...args: any[]) => void} f
   */


  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }
    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    } // call f with the message string as the first argument

    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);

  return WebSocketClient;
}();



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=localhost&port=9000&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=false&live-reload=true":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=localhost&port=9000&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=false&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />









/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | { warnings?: boolean, errors?: boolean, trustedTypesPolicyName?: string }} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @type {Status}
 */

var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};
/** @type {Options} */

var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};

if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}

if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}

if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}

if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
  } // Fill in default "true" params for partially-specified objects.


  if (typeof options.overlay === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true
    }, options.overlay);
  }

  enabledFeatures.Overlay = true;
}

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}
/**
 * @param {string} level
 */


function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }

    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }

    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling..."); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },

  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,

  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }

    options.overlay = value;
  },

  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }

    options.reconnect = value;
  },

  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },

  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'

  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");

    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
          header = _formatProblem.header,
          body = _formatProblem.body;

      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);

    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }

    var needShowOverlayForWarnings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;

    if (needShowOverlayForWarnings) {
      var trustedTypesPolicyName = typeof options.overlay === "object" && options.overlay.trustedTypesPolicyName;
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("warning", _warnings, trustedTypesPolicyName || null);
    }

    if (params && params.preventReloading) {
      return;
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },

  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");

    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
          header = _formatProblem2.header,
          body = _formatProblem2.body;

      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);

    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }

    var needShowOverlayForErrors = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;

    if (needShowOverlayForErrors) {
      var trustedTypesPolicyName = typeof options.overlay === "object" && options.overlay.trustedTypesPolicyName;
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("error", _errors, trustedTypesPolicyName || null);
    }
  },

  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {


/**
 * Client stub for tapable SyncBailHook
 */

module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var LogType = Object.freeze({
  error:
  /** @type {"error"} */
  "error",
  // message, c style arguments
  warn:
  /** @type {"warn"} */
  "warn",
  // message, c style arguments
  info:
  /** @type {"info"} */
  "info",
  // message, c style arguments
  log:
  /** @type {"log"} */
  "log",
  // message, c style arguments
  debug:
  /** @type {"debug"} */
  "debug",
  // message, c style arguments
  trace:
  /** @type {"trace"} */
  "trace",
  // no arguments
  group:
  /** @type {"group"} */
  "group",
  // [label]
  groupCollapsed:
  /** @type {"groupCollapsed"} */
  "groupCollapsed",
  // [label]
  groupEnd:
  /** @type {"groupEnd"} */
  "groupEnd",
  // [label]
  profile:
  /** @type {"profile"} */
  "profile",
  // [profileName]
  profileEnd:
  /** @type {"profileEnd"} */
  "profileEnd",
  // [profileName]
  time:
  /** @type {"time"} */
  "time",
  // name, time as [seconds, nanoseconds]
  clear:
  /** @type {"clear"} */
  "clear",
  // no arguments
  status:
  /** @type {"status"} */
  "status" // message, arguments

});
exports.LogType = LogType;
/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");

var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);

    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }

  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }

      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);

      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }

      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);

  return WebpackLogger;
}();

exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_10785__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var _require = __nested_webpack_require_10785__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    LogType = _require.LogType;
/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */

/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */

/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */


var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace( // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }

  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }

  if (typeof item === "function") {
    return item;
  }

  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};
/**
 * @enum {number}
 */


var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};
/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */

module.exports = function (_ref) {
  var _ref$level = _ref.level,
      level = _ref$level === void 0 ? "info" : _ref$level,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] :
  /** @type {FilterItemTypes[]} */
  [].concat(debug).map(filterToFunction);
  /** @type {number} */

  var loglevel = LogLevel["".concat(level)] || 0;
  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */

  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };

    var debug = debugFilters.some(function (f) {
      return f(name);
    });

    switch (type) {
      case LogType.debug:
        if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;

      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;

        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;
        }

      // falls through

      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }

        break;

      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");

          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }

          break;
        }

      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }

        break;

      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;

        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }

        break;

      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };

  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20872__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

var SyncBailHook = __nested_webpack_require_20872__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");

var _require = __nested_webpack_require_20872__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    Logger = _require.Logger;

var createConsoleLogger = __nested_webpack_require_20872__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");
/** @type {createConsoleLogger.LoggerOptions} */


var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */

exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};
/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */


exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);

  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};

exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_23009__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_23009__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_23009__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_23009__.o(definition, key) && !__nested_webpack_require_23009__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_23009__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_23009__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_23009__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_23009__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23009__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatProblem": () => (/* binding */ formatProblem),
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "show": () => (/* binding */ show)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_1__);
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).


var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
/** @type {HTMLIFrameElement | null | undefined} */

var iframeContainerElement;
/** @type {HTMLDivElement | null | undefined} */

var containerElement;
/** @type {Array<(element: HTMLDivElement) => void>} */

var onLoadQueue = [];
/** @type {TrustedTypePolicy | undefined} */

var overlayTrustedTypesPolicy;
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);
/**
 * @param {string | null} trustedTypesPolicyName
 */

function createContainer(trustedTypesPolicyName) {
  // Enable Trusted Types if they are available in the current browser.
  if (window.trustedTypes) {
    overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
      createHTML: function createHTML(value) {
        return value;
      }
    });
  }

  iframeContainerElement = document.createElement("iframe");
  iframeContainerElement.id = "webpack-dev-server-client-overlay";
  iframeContainerElement.src = "about:blank";
  iframeContainerElement.style.position = "fixed";
  iframeContainerElement.style.left = 0;
  iframeContainerElement.style.top = 0;
  iframeContainerElement.style.right = 0;
  iframeContainerElement.style.bottom = 0;
  iframeContainerElement.style.width = "100vw";
  iframeContainerElement.style.height = "100vh";
  iframeContainerElement.style.border = "none";
  iframeContainerElement.style.zIndex = 9999999999;

  iframeContainerElement.onload = function () {
    containerElement =
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.createElement("div");
    containerElement.id = "webpack-dev-server-client-overlay-div";
    containerElement.style.position = "fixed";
    containerElement.style.boxSizing = "border-box";
    containerElement.style.left = 0;
    containerElement.style.top = 0;
    containerElement.style.right = 0;
    containerElement.style.bottom = 0;
    containerElement.style.width = "100vw";
    containerElement.style.height = "100vh";
    containerElement.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    containerElement.style.color = "#E8E8E8";
    containerElement.style.fontFamily = "Menlo, Consolas, monospace";
    containerElement.style.fontSize = "large";
    containerElement.style.padding = "2rem";
    containerElement.style.lineHeight = "1.2";
    containerElement.style.whiteSpace = "pre-wrap";
    containerElement.style.overflow = "auto";
    var headerElement = document.createElement("span");
    headerElement.innerText = "Compiled with problems:";
    var closeButtonElement = document.createElement("button");
    closeButtonElement.innerText = "X";
    closeButtonElement.style.background = "transparent";
    closeButtonElement.style.border = "none";
    closeButtonElement.style.fontSize = "20px";
    closeButtonElement.style.fontWeight = "bold";
    closeButtonElement.style.color = "white";
    closeButtonElement.style.cursor = "pointer";
    closeButtonElement.style.cssFloat = "right"; // @ts-ignore

    closeButtonElement.style.styleFloat = "right";
    closeButtonElement.addEventListener("click", function () {
      hide();
    });
    containerElement.appendChild(headerElement);
    containerElement.appendChild(closeButtonElement);
    containerElement.appendChild(document.createElement("br"));
    containerElement.appendChild(document.createElement("br"));
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.body.appendChild(containerElement);
    onLoadQueue.forEach(function (onLoad) {
      onLoad(
      /** @type {HTMLDivElement} */
      containerElement);
    });
    onLoadQueue = [];
    /** @type {HTMLIFrameElement} */

    iframeContainerElement.onload = null;
  };

  document.body.appendChild(iframeContainerElement);
}
/**
 * @param {(element: HTMLDivElement) => void} callback
 * @param {string | null} trustedTypesPolicyName
 */


function ensureOverlayExists(callback, trustedTypesPolicyName) {
  if (containerElement) {
    // Everything is ready, call the callback right away.
    callback(containerElement);
    return;
  }

  onLoadQueue.push(callback);

  if (iframeContainerElement) {
    return;
  }

  createContainer(trustedTypesPolicyName);
} // Successful compilation.


function hide() {
  if (!iframeContainerElement) {
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(iframeContainerElement);
  iframeContainerElement = null;
  containerElement = null;
}
/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string }} item
 * @returns {{ header: string, body: string }}
 */


function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";

  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || ""; // eslint-disable-next-line no-nested-ternary

    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }

  return {
    header: header,
    body: body
  };
} // Compilation with errors (e.g. syntax error or missing modules).

/**
 * @param {string} type
 * @param {Array<string  | { file?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @param {string | null} trustedTypesPolicyName
 */


function show(type, messages, trustedTypesPolicyName) {
  ensureOverlayExists(function () {
    messages.forEach(function (message) {
      var entryElement = document.createElement("div");
      var typeElement = document.createElement("span");

      var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;

      typeElement.innerText = header;
      typeElement.style.color = "#".concat(colors.red); // Make it look similar to our terminal.

      var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(body));
      var messageTextNode = document.createElement("div");
      messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
      entryElement.appendChild(typeElement);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(messageTextNode);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      /** @type {HTMLDivElement} */

      containerElement.appendChild(entryElement);
    });
  }, trustedTypesPolicyName);
}



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "client": () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__("./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */

 // this WebsocketClient is here as a default fallback, in case the client is not injected

/* eslint-disable camelcase */

var Client = // eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10; // Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports

var client = null;
/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */

var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;

    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);

    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";

  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }

  var auth = objURL.auth || "";

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }

  var host = "";

  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));

    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }

  var pathname = objURL.pathname || "";

  if (objURL.slashes) {
    host = "//".concat(host || "");

    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }

  var search = objURL.search || "";

  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }

  var hash = objURL.hash || "";

  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }

  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}
/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */


function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname; // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'

  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]"; // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384

  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }

  var socketURLProtocol = parsedURL.protocol || self.location.protocol; // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.

  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }

  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = ""; // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them

  if (parsedURL.username) {
    socketURLAuth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.

    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  } // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided


  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;

  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  } // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.


  var socketURLPathname = "/ws";

  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }

  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  } // Fallback to getting all scripts running in the document.


  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });

  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  } // Fail as there was no script to use.


  throw new Error("[webpack-dev-server] Failed to get current script source.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "logEnabledFeatures": () => (/* binding */ logEnabledFeatures),
/* harmony export */   "setLogLevel": () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server"; // default level is set on the client side, so it does not need
// to be set by the CLI or API

var defaultLevel = "info"; // options new options, merge with old options

/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */

function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}

setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);

var logEnabledFeatures = function logEnabledFeatures(features) {
  var enabledFeatures = Object.keys(features);

  if (!features || enabledFeatures.length === 0) {
    return;
  }

  var logString = "Server started:"; // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.

  for (var i = 0; i < enabledFeatures.length; i++) {
    var key = enabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  } // replace last comma with a period


  logString = logString.slice(0, -1).concat(".");
  log.info(logString);
};



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */

function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};

  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");

    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;

    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {// URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }

    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }

  return options;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/webpack-dev-server/client/utils/log.js");


/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */

function reloadApp(_ref, status) {
  var hot = _ref.hot,
      liveReload = _ref.liveReload;

  if (status.isUnloading) {
    return;
  }

  var currentHash = status.currentHash,
      previousHash = status.previousHash;
  var isInitial = currentHash.indexOf(
  /** @type {string} */
  previousHash) >= 0;

  if (isInitial) {
    return;
  }
  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */


  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }

  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;

  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);

    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;

        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */
// Send messages to the outside, so plugins can consume it.

/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");
/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */

function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }

  return string.replace(ansiRegex, "");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stripAnsi);

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__("./node_modules/webpack/node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/webpack/node_modules/events/events.js":
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "pixi.js":
/***/ ((module) => {

"use strict";
module.exports = PIXI;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("3a54ce540455727374c6")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=localhost&port=9000&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=false&live-reload=true");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	pixi_ui = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=pixi_ui.js.map