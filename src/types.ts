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

import * as PIXI from 'pixi.js';

// The Options used by AbstractPopup
export interface AbstractPopupOptions
{
   // Can't win with typescript.  This is the better of the two evils.
   // @ts-ignore TS2304: Cannot find name 'Theme'.
   theme?: string | Theme,
   id?: number,
   x?: number,
   y?: number,
   // null or null
   header?: string | number | PIXI.Text,
   // null or String or PIXI.DisplayObject
   //B width|height is not on DisplayObject
   //B content?: string | number | PIXI.DisplayObject,
   // Container added for PopupMenu
   content?: string | number | PIXI.Text | PIXI.Container,
   minWidth?: number,
   minHeight?: number,
   maxWidth?: number,
   padding?: number,
   fill?: number,
   fillAlpha?: number,
   anchor?: PIXI.ObservablePoint,
   stroke?: number,
   strokeWidth?: number,
   strokeAlpha?: number,
   headerStyle?: PIXI.TextStyle,
   textStyle?: PIXI.TextStyle,
   radius?: number,
   onHidden?: Function,
   visible?: boolean,
   orientation?: string,
}

// The Options used by tooltip  ( extends AbstractPopup )
// that get merged with the above
export interface AbstractPopupOptions
{
   padding?: number,
   //B The Object must be a Container to add/remove children from.
   //B object?: PIXI.DisplayObject,
   object?: PIXI.Container,
   container?: PIXI.Container,
   offsetLeft?: number,
   offsetTop?: number,
   delay?: number,
}

// Used in badge.ts  ( extends AbstractPopup )
export interface AbstractPopupOptions
{
   // @ts-ignore TS2304: Cannot find name 'ToolTip'.
   tooltip?: ToolTip,

   // Used in button.ts for creating badge
   //  'left' | 'center' | 'right'
   align?: string,

   // Used in button.ts for creating badge
   //  'top'  | 'middle' | 'bottom'
   verticalAlign?: string,
}

// Used in InteractivePopup.ts  ( extends AbstractPopup )
export interface AbstractPopupOptions
{
   closeOnPopup?: boolean,
   closeButton?: boolean,
   // Can't win with typescript.  This is the better of the two evils.
   // @ts-ignore TS2304: Cannot find name 'Button'.
   button?: Button,
   // @ts-ignore TS2304: Cannot find name 'ButtonGroup'.
   buttonGroup?: ButtonGroup,
}

// Used in message.ts  ( extends AbstractPopup )
export interface AbstractPopupOptions
{
   // Can't win with typescript.  This is the better of the two evils.
   // @ts-ignore TS2304: Cannot find name 'PIXIApp'.
   app?: PIXIApp,
   // margin is also on popupmenu
   margin?: number,
   autoClose?: boolean,
   duration?: number,
   closeDuration?: number,
}

export interface PopupMenuItem
{
   label?: string,
   textStyle?: PIXI.TextStyle,
   action?: Function,
   disabled?: boolean,
   content?: PIXI.Graphics | PIXI.Text,
}


// Used in popupmenu.ts  ( extends AbstractPopup )
export interface AbstractPopupOptions
{
   items?: Array< PopupMenuItem >,
}

// A basic point used by app.ts
export interface Point
{
   x: number,
   y: number,
}

// Used in AbstractPopup
export interface Size
{
   width: number,
   height: number,
}

// See https://blog.logrocket.com/mastering-mapped-types-typescript/
// See https://typescript-v2-121.ortam.vercel.app/docs/handbook/advanced-types.html
export function strNumToNum(value: string | number) : number
{
  if ( typeof value === "number" )
  {
      return value;
  }
  if ( typeof value === "string" ) {
      return parseFloat( value );
  }
  throw new Error(`Expected string or number, got '${value}'.`);
}
