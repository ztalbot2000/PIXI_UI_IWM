import { isEmpty, uuid, lerp, sample, debounce, getId, randomInt, randomFloat, Dates, Colors, Cycle, Points, Sets, Angle, Elements } from './utils'
import { EaseBase } from './Ease/EaseBase'
import { ExponentialEase } from './Ease/ExponentialEase'
import Ease from './Ease/Ease'
import Ticker from './Ease/Ticker'
import Tween from './Ease/Tween'
import Theme from './theme'
import Tooltip from './tooltip'
import Volatile from './volatile'
import AbstractPopup from './abstractpopup'
import Popup from './popup'
import Popover from './popover'
import PopupMenu from './popupmenu'
import Slider from './slider'
import Badge from './badge'
import Button from './button'
import ButtonGroup from './buttongroup'
import Modal from './modal'
import App from './app'
import Message from './message'
import Progress from './progress'
import ProgressBar from './progressbar'
import ProgressDialog from './progressdialog'
import Capabilities from './capabilities'
import LabeledGraphics from './labeledgraphics'
import List from './list'
import Switch from './switch'



export var UI =
{
// types: types,
//   utils: utils,
isEmpty:isEmpty, uuid:uuid, lerp:lerp, sample:sample, debounce:debounce, getId:getId, randomInt:randomInt, randomFloat:randomFloat, Dates:Dates, Colors:Colors, Cycle:Cycle, Points:Points, Sets:Sets, Angle:Angle, Elements:Elements,
   EaseBase: EaseBase,
   ExponentialEase: ExponentialEase,
   Ease: Ease,
   Ticker:  Ticker,
   Tween: Tween,
   Theme: Theme,
   Tooltip: Tooltip,
   Volatile: Volatile,
   AbstractPopup: AbstractPopup,
   Popup: Popup,
   PopupMenu:  PopupMenu,
   Popover:  Popover,
   Slider: Slider,
   Badge: Badge,
   Button: Button,
   ButtonGroup: ButtonGroup,
   Modal: Modal,
   App: App,
   Message:  Message,
   Progress: Progress,
   ProgressBar: ProgressBar,
   ProgressDialog: ProgressDialog,
   Capabilities: Capabilities,
   LabeledGraphics: LabeledGraphics,
   List: List,
   Switch: Switch,
}
