/*!
 * Open Web Console - 一个类似浏览器控制台Console的插件，可以实现在页面中进行打印。
 * git+https://github.com/hai2007/Open-Web-Console.git
 *
 * author 你好2007 < https://hai2007.gitee.io/sweethome >
 *
 * version 0.1.2
 *
 * Copyright (c) 2021 hai2007 走一步，再走一步。
 * Released under the MIT license
 *
 * Date:Fri Dec 03 2021 21:13:38 GMT+0800 (GMT+08:00)
 */
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * 判断一个值是不是Object。
   *
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Object返回true，否则返回false
   */
  function _isObject (value) {
    var type = _typeof(value);

    return value != null && (type === 'object' || type === 'function');
  }

  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType (value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }

  /**
   * 判断一个值是不是Boolean。
   *
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Boolean返回true，否则返回false
   */

  function _isBoolean (value) {
    return value === true || value === false || value !== null && _typeof(value) === 'object' && getType(value) === '[object Boolean]';
  }

  /**
   * 判断一个值是不是number。
   *
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是number返回true，否则返回false
   */

  function _isNumber (value) {
    return typeof value === 'number' || value !== null && _typeof(value) === 'object' && getType(value) === '[object Number]';
  }

  /**
   * 判断一个值是不是String。
   *
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */

  function _isString (value) {
    var type = _typeof(value);

    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
  }

  /**
   * 判断一个值是不是Function。
   *
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Function返回true，否则返回false
   */

  function _isFunction (value) {
    if (!_isObject(value)) {
      return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object Proxy]';
  }

  /**
   * 判断一个值是不是一个朴素的'对象'
   * 所谓"纯粹的对象"，就是该对象是通过"{}"或"new Object"创建的
   *
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
   */

  function _isPlainObject (value) {
    if (value === null || _typeof(value) !== 'object' || getType(value) != '[object Object]') {
      return false;
    } // 如果原型为null


    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  }

  var domTypeHelp = function domTypeHelp(types, value) {
    return value !== null && _typeof(value) === 'object' && types.indexOf(value.nodeType) > -1 && !_isPlainObject(value);
  };
  /*!
   * 💡 - 值类型判断方法
   * https://github.com/hai2007/tool.js/blob/master/type.js
   *
   * author hai2007 < https://hai2007.gitee.io/sweethome >
   *
   * Copyright (c) 2020-present hai2007 走一步，再走一步。
   * Released under the MIT license
   */


  var isObject = _isObject; // 基本类型

  var isUndefined = function isUndefined(input) {
    return input === undefined;
  };
  var isNull = function isNull(input) {
    return input === null;
  };
  var isBoolean = _isBoolean;
  var isNumber = _isNumber;
  var isString = _isString;

  var isFunction = _isFunction;

  var isElement = function isElement(input) {
    return domTypeHelp([1, 9, 11], input);
  };

  /*!
   * 🌐 - 提供常用的DOM操作方法
   * https://github.com/hai2007/browser.js/blob/master/xhtml.js
   *
   * author hai2007 < https://hai2007.gitee.io/sweethome >
   *
   * Copyright (c) 2021-present hai2007 走一步，再走一步。
   * Released under the MIT license
   */
  // 命名空间路径
  var namespace = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  /**
   * 结点操作补充
   */

  var xhtml = {
    // 阻止冒泡
    "stopPropagation": function stopPropagation(event) {
      event = event || window.event;

      if (event.stopPropagation) {
        //这是其他非IE浏览器
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
    // 阻止默认事件
    "preventDefault": function preventDefault(event) {
      event = event || window.event;

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    // 判断是否是结点
    "isNode": function isNode(param) {
      return param && (param.nodeType === 1 || param.nodeType === 9 || param.nodeType === 11);
    },
    // 绑定事件
    "bind": function bind(dom, eventType, callback) {
      if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
          this.bind(dom[i], eventType, callback);
        }

        return;
      }

      if (window.attachEvent) dom.attachEvent("on" + eventType, callback);else dom.addEventListener(eventType, callback, false);
    },
    // 去掉绑定事件
    "unbind": function unbind(dom, eventType, handler) {
      if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
          this.unbind(dom[i], eventType, handler);
        }

        return;
      }

      if (window.detachEvent) dom.detachEvent('on' + eventType, handler);else dom.removeEventListener(eventType, handler, false);
    },
    // 在当前上下文context上查找结点
    // selectFun可选，返回boolean用以判断当前面对的结点是否保留
    "find": function find(context, selectFun, tagName) {
      if (!this.isNode(context)) return [];
      var nodes = context.getElementsByTagName(tagName || '*');
      var result = [];

      for (var i = 0; i < nodes.length; i++) {
        if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i]))) result.push(nodes[i]);
      }

      return result;
    },
    // 寻找当前结点的孩子结点
    // selectFun可选，返回boolean用以判断当前面对的结点是否保留
    "children": function children(dom, selectFun) {
      var nodes = dom.childNodes;
      var result = [];

      for (var i = 0; i < nodes.length; i++) {
        if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i]))) result.push(nodes[i]);
      }

      return result;
    },
    // 判断结点是否有指定class
    // clazzs可以是字符串或数组字符串
    // notStrict可选，boolean值，默认false表示结点必须包含全部class,true表示至少包含一个即可
    "hasClass": function hasClass(dom, clazzs, notStrict) {
      if (clazzs.constructor !== Array) clazzs = [clazzs];
      var class_str = " " + (dom.getAttribute('class') || "") + " ";

      for (var i = 0; i < clazzs.length; i++) {
        if (class_str.indexOf(" " + clazzs[i] + " ") >= 0) {
          if (notStrict) return true;
        } else {
          if (!notStrict) return false;
        }
      }

      return true;
    },
    // 删除指定class
    "removeClass": function removeClass(dom, clazz) {
      var oldClazz = " " + (dom.getAttribute('class') || "") + " ";
      var newClazz = oldClazz.replace(" " + clazz.trim() + " ", " ");
      dom.setAttribute('class', newClazz.trim());
    },
    // 添加指定class
    "addClass": function addClass(dom, clazz) {
      if (this.hasClass(dom, clazz)) return;
      var oldClazz = dom.getAttribute('class') || "";
      dom.setAttribute('class', oldClazz + " " + clazz);
    },
    // 字符串变成结点
    // isSvg可选，boolean值，默认false表示结点是html，为true表示svg类型
    "toNode": function toNode(template, isSvg) {
      var frame; // html和svg上下文不一样

      if (isSvg) frame = document.createElementNS(namespace.svg, 'svg');else {
        var frameTagName = 'div'; // 大部分的标签可以直接使用div作为容器
        // 部分特殊的需要特殊的容器标签

        if (/^<tr[> ]/.test(template)) {
          frameTagName = "tbody";
        } else if (/^<th[> ]/.test(template) || /^<td[> ]/.test(template)) {
          frameTagName = "tr";
        } else if (/^<thead[> ]/.test(template) || /^<tbody[> ]/.test(template)) {
          frameTagName = "table";
        }

        frame = document.createElement(frameTagName);
      } // 低版本浏览器svg没有innerHTML，考虑是vue框架中，没有补充

      frame.innerHTML = template;
      var childNodes = frame.childNodes;

      for (var i = 0; i < childNodes.length; i++) {
        if (this.isNode(childNodes[i])) return childNodes[i];
      }
    },
    // 主动触发事件
    "trigger": function trigger(dom, eventType) {
      //创建event的对象实例。
      if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        dom.fireEvent('on' + eventType, document.createEventObject());
      } // 其他标准浏览器使用dispatchEvent方法
      else {
        var _event = document.createEvent('HTMLEvents'); // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为


        _event.initEvent(eventType, true, false);

        dom.dispatchEvent(_event);
      }
    },
    // 获取样式
    "getStyle": function getStyle(dom, name) {
      // 获取结点的全部样式
      var allStyle = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(dom, null) : dom.currentStyle; // 如果没有指定属性名称，返回全部样式

      return typeof name === 'string' ? allStyle.getPropertyValue(name) : allStyle;
    },
    // 获取元素位置
    "offsetPosition": function offsetPosition(dom) {
      var left = 0;
      var top = 0;
      top = dom.offsetTop;
      left = dom.offsetLeft;
      dom = dom.offsetParent;

      while (dom) {
        top += dom.offsetTop;
        left += dom.offsetLeft;
        dom = dom.offsetParent;
      }

      return {
        "left": left,
        "top": top
      };
    },
    // 获取鼠标相对元素位置
    "mousePosition": function mousePosition(dom, event) {
      var bounding = dom.getBoundingClientRect();
      if (!event || !event.clientX) throw new Error('Event is necessary!');
      return {
        "x": event.clientX - bounding.left,
        "y": event.clientY - bounding.top
      };
    },
    // 删除结点
    "remove": function remove(dom) {
      dom.parentNode.removeChild(dom);
    },
    // 设置多个样式
    "setStyles": function setStyles(dom, styles) {
      for (var key in styles) {
        dom.style[key] = styles[key];
      }
    },
    // 获取元素大小
    "size": function size(dom, type) {
      var elemHeight, elemWidth;

      if (type == 'content') {
        //内容
        elemWidth = dom.clientWidth - (this.getStyle(dom, 'padding-left') + "").replace('px', '') - (this.getStyle(dom, 'padding-right') + "").replace('px', '');
        elemHeight = dom.clientHeight - (this.getStyle(dom, 'padding-top') + "").replace('px', '') - (this.getStyle(dom, 'padding-bottom') + "").replace('px', '');
      } else if (type == 'padding') {
        //内容+内边距
        elemWidth = dom.clientWidth;
        elemHeight = dom.clientHeight;
      } else if (type == 'border') {
        //内容+内边距+边框
        elemWidth = dom.offsetWidth;
        elemHeight = dom.offsetHeight;
      } else if (type == 'scroll') {
        //滚动的宽（不包括border）
        elemWidth = dom.scrollWidth;
        elemHeight = dom.scrollHeight;
      } else {
        elemWidth = dom.offsetWidth;
        elemHeight = dom.offsetHeight;
      }

      return {
        width: elemWidth,
        height: elemHeight
      };
    },
    // 在被选元素内部的结尾插入内容
    "append": function append(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.appendChild(node);
      return node;
    },
    // 在被选元素内部的开头插入内容
    "prepend": function prepend(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.insertBefore(node, el.childNodes[0]);
      return node;
    },
    // 在被选元素之后插入内容
    "after": function after(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.parentNode.insertBefore(node, el.nextSibling);
      return node;
    },
    // 在被选元素之前插入内容
    "before": function before(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.parentNode.insertBefore(node, el);
      return node;
    }
  };

  function getTime () {
    var now = new Date();
    return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  }

  var doit = function doit(target, obj) {
    xhtml.bind(target.getElementsByTagName('i')[0], 'click', function () {
      // 如果是字符串，就不需要展开了
      if (isString(obj)) return; // 如果没有加载过

      if (target.getAttribute('hadload') != 'yes') {
        target.setAttribute('hadload', 'yes');
        target.setAttribute('isopen', 'yes');
        var template = "<div class='item'>";

        for (var key in obj) {
          try {
            template += "<span isopen='no'><i><em style='font-style:normal;color:#905'>".concat(key, "</em>:").concat(obj[key], "</i></span>");
          } catch (e) {// todo
          }
        }

        template += "</div>";
        xhtml.append(target, template); // 添加交互

        var index = 0,
            lis = target.getElementsByTagName('span');

        for (var _key in obj) {
          doit(lis[index++], obj[_key]);
        }
      } // 如果加载过了，直接控制打开或者关闭即可
      else {
        if (target.getAttribute('isopen') == 'no') target.setAttribute('isopen', 'yes');else target.setAttribute('isopen', 'no');
      }
    });
  };

  function showData (target, msg) {
    // 如果是字符串、函数、数字等
    if (isString(msg) || isFunction(msg) || isNumber(msg) || isBoolean(msg)) {
      target.innerText = msg;
    } else if (isUndefined(msg)) target.innerText = 'undefined';else if (isNull(msg)) target.innerText = 'null';else {
      target.setAttribute('defType', 'showobject'); // 默认作为对象显示

      target.setAttribute('hadload', 'no');
      target.setAttribute('isopen', 'no');
      target.innerHTML = "<i>".concat(msg, "</i>");
      doit(target, msg);
    }
  }

  function doConsole (msg, color) {
    if (isObject(msg)) {
      var target = xhtml.append(this._el, "<div class='item'>\n            <span class='time'>".concat(getTime(), "</span>\n            <span class='msg' style='color:").concat(color, "'></span>\n        </div>"));
      showData(target.getElementsByTagName('span')[1], msg);
    } else {
      xhtml.append(this._el, "<div class='item'>\n            <span class='time'>".concat(getTime(), "</span>\n            <span class='msg' style='color:").concat(color, "'>").concat(msg, "</span>\n        </div>"));
    }
  }

  var $RegExp = {
    // 空白字符:http://www.w3.org/TR/css3-selectors/#whitespace
    blankReg: new RegExp("[\\x20\\t\\r\\n\\f]"),
    blanksReg: /^[\x20\t\r\n\f]{0,}$/,
    // 标志符
    identifier: /^[a-zA-Z_$][0-9a-zA-Z_$]{0,}$/
  };

  // 比如一个注释就是一块，无论注释的内容有多少

  function analyseBlock (source) {
    var i = -1,
        // 当前面对的字符
    currentChar = null; // 获取下一个字符

    var next = function next() {
      currentChar = i++ < source.length - 1 ? source[i] : null;
      return currentChar;
    }; // 获取往后n个值


    var nextNValue = function nextNValue(n) {
      return source.substring(i, n + i > source.length ? source.length : n + i);
    };

    var blocks = [];
    var currentBlock = "";
    next();

    while (true) {
      // 先剔除空白字符
      // 保证正式开始的时候匹配的是有效的
      while ($RegExp.blankReg.test(currentChar)) {
        next();
      } // 如果匹配的字符没有了


      if (currentChar == null) break; // 如果是注释
      // /* 类型一 */

      if (nextNValue(2) == '/*') {
        next();
        next();
        currentBlock = "/*";

        while (nextNValue(2) != '*/' && currentChar != null) {
          currentBlock += currentChar;
          next();
        } // 对于注释 /* */
        // 如果到结尾都没有闭合，应该提示语法错误


        if (currentChar == null) {
          throw new Error('The comment is not closed.');
        }

        currentBlock += "*/";
        next();
        next();
        blocks.push({
          value: currentBlock,
          type: "comment-double"
        });
      } // 如果是注释
      // // 类型二
      else if (nextNValue(2) == '//') {
        currentBlock = '';

        while (currentChar != '\n' && currentChar != null) {
          currentBlock += currentChar;
          next();
        }

        blocks.push({
          value: currentBlock,
          type: "comment-single"
        });
      } // 如果是结束
      //  }
      else if (currentChar == '}') {
        blocks.push({
          value: "}",
          type: "end"
        });
        next();
      } // 余下，只有两种情况：
      // 1.如是是开始
      //  xxx {
      // 2.可能是一个语句
      //  xxx : xxx ;
      // 这两种都需要进一步匹配
      else {
        currentBlock = ''; // 目前先没有考虑下列情况：
        // 语句 content:";"

        while (currentChar != '{' && currentChar != ';' && currentChar != null) {
          currentBlock += currentChar;
          next();
        }

        if (currentChar == null) {
          throw new Error('Statement or code block missing closure.');
        }

        blocks.push({
          value: currentBlock + currentChar,
          type: {
            '{': "begin",
            ';': 'statement'
          }[currentChar]
        });
        next();
      }
    }

    return blocks;
  }

  function toSelector (preSelectorArray, deep) {
    var selectors = preSelectorArray[0],
        i,
        j,
        k; // 一层层深入

    for (i = 1; i < deep; i++) {
      var temp = []; // 前置循环

      for (j = 0; j < selectors.length; j++) {
        // 预选循环
        for (k = 0; k < preSelectorArray[i].length; k++) {
          temp.push(selectors[j] + preSelectorArray[i][k]);
        }
      }

      selectors = temp;
    } // 最后补充 {


    return "\n" + selectors.join(',') + "{\n";
  }

  /*!
   * 🔪 - 把 SCSS 解析成 CSS 的算法实现
   * https://github.com/hai2007/algorithm.js/blob/master/scss.js
   *
   * author hai2007 < https://hai2007.gitee.io/sweethome >
   *
   * Copyright (c) 2021-present hai2007 走一步，再走一步。
   * Released under the MIT license
   */
  function scssToCss (source) {
    // 分析出代码块
    var blocks = analyseBlock(source); // 根据代码块获得最终代码

    var i,
        j,
        cssCode = "",
        preSelectorArray = [],
        deep = 0;

    for (i = 0; i < blocks.length; i++) {
      // 注释 double
      if (blocks[i].type == 'comment-double') {
        cssCode += blocks[i].value;
      } // 注释 single
      else if (blocks[i].type == 'comment-single') {
        cssCode += "\n/* " + blocks[i].value + " */\n";
      } // 开始
      else if (blocks[i].type == 'begin') {
        var preSplit = blocks[i].value.split(',');
        var preSelect = [];

        for (j = 0; j < preSplit.length; j++) {
          // 去掉两端的空格
          preSelect[j] = preSplit[j].replace(/\{$/, '').trim(); // 判断拼接方式

          if (/^&/.test(preSelect[j])) {
            preSelect[j] = preSelect[j].replace(/^&/, '');
          } else {
            preSelect[j] = " " + preSelect[j];
          }
        } // 登记到前缀数组


        preSelectorArray[deep] = preSelect;
        deep += 1;
      } // 结束
      else if (blocks[i].type == 'end') {
        deep -= 1;
      } // 语句
      else if (blocks[i].type == 'statement') {
        // 如果是第一个
        j = 1;
        var preType = blocks[i - j].type;

        while (['comment-double', 'comment-single'].indexOf(preType) > -1) {
          j += 1;
          preType = blocks[i - j].type;
        }

        if (['end', 'begin'].indexOf(preType) > -1) {
          cssCode += toSelector(preSelectorArray, deep);
        }

        cssCode += "\n" + blocks[i].value + "\n"; // 如果是最后一个

        j = 1;
        var nextType = blocks[i + j].type;

        while (['comment-double', 'comment-single'].indexOf(nextType) > -1) {
          j += 1;
          nextType = blocks[i + j].type;
        }

        if (['end', 'begin'].indexOf(nextType) > -1) {
          cssCode += "\n}\n";
        }
      }
    }

    return cssCode;
  }

  function style () {
    if (document.getElementById('open-web-console@style')) return;
    var styleElement = document.createElement('style');
    var head = document.head || document.getElementsByTagName('head')[0];
    styleElement.setAttribute('id', 'open-web-console@style');
    styleElement.innerHTML = scssToCss("\n\n    [open-web-console]{\n        overflow: auto;\n        background-color:#f3f3f4;\n        outline: 5px solid #cfcfd4;\n        border-radius: 5px;\n        user-select: none;\n        font-size:12px;\n        [isopen]{\n            position:relative;\n            &:before{\n                content: \" \";\n                display: inline-block;\n                width: 0;\n                height: 0;\n                position: absolute;\n                left: -15px;\n                top: 4px;\n            }\n        }\n        [isopen='no']{\n            &>div{\n                display:none;\n            }\n            &:before{\n                border-top: 5px solid transparent;\n                border-bottom: 5px solid transparent;\n                border-left: 10px solid #9e9e9e;\n            }\n        }\n        [isopen='yes']{\n            &:before{\n                border-left: 5px solid transparent;\n                border-right: 5px solid transparent;\n                border-top: 10px solid #9e9e9e;\n            }\n        }\n        [defType='showobject']{\n            span{\n                display:block;\n                margin-top:5px;\n            }\n            .item{\n                margin-left:20px;\n            }\n            i{\n                font-style: normal;\n                cursor: pointer;\n            }\n        }\n\n        &>.item{\n            padding:10px;\n            border-bottom: 1px solid #cfcfd4;\n            &>span{\n                display: inline-block;\n                vertical-align: top;\n                &.time{\n                    width: 80px;\n                    font-weight: 800;\n                }\n                &.msg{\n\n                }\n            }\n        }\n        .item{\n            white-space: nowrap;\n        }\n    }\n    ");
    styleElement.setAttribute('type', 'text/css');
    head.appendChild(styleElement);
  }

  var OpenWebConsole = function OpenWebConsole(options) {
    if (!(this instanceof OpenWebConsole)) {
      throw new Error('Open-Web-Console is a constructor and should be called with the `new` keyword');
    }

    style(); // 控制台挂载点

    if (isElement(options.el)) {
      this._el = options.el;

      this._el.setAttribute('open-web-console', '');

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
  }; // 挂载方法


  OpenWebConsole.prototype.$doConsole = doConsole; // 判断当前环境，如果不是浏览器环境

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = OpenWebConsole;
  } // 浏览器环境下
  else {
    window.OpenWebConsole = OpenWebConsole;
  }

}());
