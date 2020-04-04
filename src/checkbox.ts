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

import Button from './button'
import { ButtonOptions } from './button'

export default class Checkbox extends Button
{
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

   constructor( opts: ButtonOptions = { } )
   {
      opts.type = 'checkbox'
      super( opts )
   }
}
