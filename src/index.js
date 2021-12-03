import { isElement } from '@hai2007/tool/type';
import doConsole from './console/index';
import style from './style';

let OpenWebConsole = function (options) {

    if (!(this instanceof OpenWebConsole)) {
        throw new Error('Open-Web-Console is a constructor and should be called with the `new` keyword');
    }

    style();

    // 控制台挂载点
    if (isElement(options.el)) {

        this._el = options.el;
        this._el.setAttribute('open-web-console','');

        this.log = function (msg) {
            this.$doConsole(msg, "gray");
        };

        this.trace = function (msg) {
            this.$doConsole(msg, 'white');
        };

        this.info = function (msg) {
            this.$doConsole(msg, 'green');
        };

        this.error = function (msg) {
            this.$doConsole(msg, 'red');
        };

        this.warn = function (msg) {
            this.$doConsole(msg, '#f1c010');
        };

        this.debug = function (msg) {
            this.$doConsole(msg, 'blue');
        };

    } else {

        // 挂载点是必须的，一定要有
        throw new Error('options.el is not a element!');
    }

};

// 挂载方法
OpenWebConsole.prototype.$doConsole = doConsole;

// 判断当前环境，如果不是浏览器环境
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = OpenWebConsole;
}
// 浏览器环境下
else {
    window.OpenWebConsole = OpenWebConsole;
}
