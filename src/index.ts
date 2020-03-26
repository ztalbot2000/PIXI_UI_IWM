import * as PIXI from "pixi.js";

import { UI, } from "./UI";

var Library = {
    UI: UI,
};

//dump everything into extras

Object.assign(PIXI, Library);

module.exports = Library;
