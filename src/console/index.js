import { isObject } from '@hai2007/tool/type';
import xhtml from '@hai2007/browser/xhtml';
import getTime from '../tool/getTime';
import showData from './showData';

export default function (msg, color) {

    if (isObject(msg)) {

        let target = xhtml.append(this._el, `<div class='item'>
            <span class='time'>${getTime()}</span>
            <span class='msg' style='color:${color}'></span>
        </div>`);

        showData(target.getElementsByTagName('span')[1], msg);

    } else {

        xhtml.append(this._el, `<div class='item'>
            <span class='time'>${getTime()}</span>
            <span class='msg' style='color:${color}'>${msg}</span>
        </div>`);

    }

};
