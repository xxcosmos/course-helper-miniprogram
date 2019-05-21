// Built by eustia.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root._ = factory();
    }
}(this, function () {
    var _ = {};

    /* ------------------------------ inherits ------------------------------ */

    var inherits = _.inherits = (function (exports) {
        /* Inherit the prototype methods from one constructor into another.
         *
         * |Name      |Type    |Desc       |
         * |----------|--------|-----------|
         * |Class     |function|Child Class|
         * |SuperClass|function|Super Class|
         */

        /* example
         * function People(name) {
         *     this._name = name;
         * }
         * People.prototype = {
         *     getName: function () {
         *         return this._name;
         *     }
         * };
         * function Student(name) {
         *     this._name = name;
         * }
         * inherits(Student, People);
         * var s = new Student('RedHood');
         * s.getName(); // -> 'RedHood'
         */

        /* typescript
         * export declare function inherits(Class: Function, SuperClass: Function): void;
         */
        exports = function exports(Class, SuperClass) {
            if (objCreate) return (Class.prototype = objCreate(SuperClass.prototype));
            noop.prototype = SuperClass.prototype;
            Class.prototype = new noop();
        };

        var objCreate = Object.create;

        function noop() {
        }

        return exports;
    })({});

    /* ------------------------------ rgbToHsl ------------------------------ */

    var rgbToHsl = _.rgbToHsl = (function (exports) {
        /* Convert rgb to hsl.
         *
         * |Name  |Type |Desc      |
         * |------|-----|----------|
         * |rgb   |array|Rgb values|
         * |return|array|Hsl values|
         */

        /* example
         * rgbToHsl([52, 203, 165, 0.8]); // -> [165, 59, 50, 0.8]
         */

        /* typescript
         * export declare function rgbToHsl(rgb: number[]): number[];
         */
        exports = function exports(rgb) {
            var r = rgb[0] / 255,
                g = rgb[1] / 255,
                b = rgb[2] / 255,
                min = mMin(r, g, b),
                max = mMax(r, g, b),
                delta = max - min,
                h,
                s,
                l;

            if (max === min) {
                h = 0;
            } else if (r === max) {
                h = (g - b) / delta;
            } else if (g === max) {
                h = 2 + (b - r) / delta;
            } else {
                h = 4 + (r - g) / delta;
            }

            h = mMin(h * 60, 360);
            if (h < 0) h += 360;
            l = (min + max) / 2;

            if (max === min) {
                s = 0;
            } else if (l <= 0.5) {
                s = delta / (max + min);
            } else {
                s = delta / (2 - max - min);
            }

            var ret = [round(h), round(s * 100), round(l * 100)];
            if (rgb[3]) ret[3] = rgb[3];
            return ret;
        };

        var mMin = Math.min,
            mMax = Math.max,
            round = Math.round;

        return exports;
    })({});

    /* ------------------------------ hslToRgb ------------------------------ */

    var hslToRgb = _.hslToRgb = (function (exports) {
        /* Convert hsl to rgb.
         *
         * |Name  |Type |Desc      |
         * |------|-----|----------|
         * |hsl   |array|Hsl values|
         * |return|array|Rgb values|
         */

        /* example
         * hslToRgb([165, 59, 50, 0.8]); // -> [52, 203, 165, 0.8]
         */

        /* typescript
         * export declare function hslToRgb(hsl: number[]): number[];
         */
        exports = function exports(hsl) {
            var h = hsl[0] / 360,
                s = hsl[1] / 100,
                l = hsl[2] / 100,
                ret = [],
                t1,
                t2,
                t3,
                val;
            if (hsl[3]) ret[3] = hsl[3];

            if (s === 0) {
                val = round(l * 255);
                ret[0] = ret[1] = ret[2] = val;
                return ret;
            }

            if (l < 0.5) {
                t2 = l * (1 + s);
            } else {
                t2 = l + s - l * s;
            }

            t1 = 2 * l - t2;

            for (var i = 0; i < 3; i++) {
                t3 = h + (1 / 3) * -(i - 1);
                if (t3 < 0) t3++;
                if (t3 > 1) t3--;

                if (6 * t3 < 1) {
                    val = t1 + (t2 - t1) * 6 * t3;
                } else if (2 * t3 < 1) {
                    val = t2;
                } else if (3 * t3 < 2) {
                    val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
                } else {
                    val = t1;
                }

                ret[i] = round(val * 255);
            }

            return ret;
        };

        var round = Math.round;

        return exports;
    })({});

    /* ------------------------------ convertBase ------------------------------ */

    var convertBase = _.convertBase = (function (exports) {
        /* Convert base of a number.
         *
         * |Name  |Type         |Desc             |
         * |------|-------------|-----------------|
         * |num   |number string|Number to convert|
         * |from  |number       |Base from        |
         * |to    |number       |Base to          |
         * |return|string       |Converted number |
         */

        /* example
         * convertBase('10', 2, 10); // -> '2'
         * convertBase('ff', 16, 2); // -> '11111111'
         */

        /* typescript
         * export declare function convertBase(
         *     num: number | string,
         *     from: number,
         *     to: number
         * ): string;
         */
        exports = function exports(num, from, to) {
            return parseInt(num, from).toString(to);
        };

        return exports;
    })({});

    /* ------------------------------ uniqId ------------------------------ */

    var uniqId = _.uniqId = (function (exports) {
        /* Generate a globally-unique id.
         *
         * |Name    |Type  |Desc              |
         * |--------|------|------------------|
         * |[prefix]|string|Id prefix         |
         * |return  |string|Globally-unique id|
         */

        /* example
         * uniqId('eusita_'); // -> 'eustia_xxx'
         */

        /* typescript
         * export declare function uniqId(prefix?: string): string;
         */
        var idCounter = 0;

        exports = function exports(prefix) {
            var id = ++idCounter + '';
            return prefix ? prefix + id : id;
        };

        return exports;
    })({});

    /* ------------------------------ has ------------------------------ */

    var has = _.has = (function (exports) {
        /* Checks if key is a direct property.
         *
         * |Name  |Type   |Desc                            |
         * |------|-------|--------------------------------|
         * |obj   |object |Object to query                 |
         * |key   |string |Path to check                   |
         * |return|boolean|True if key is a direct property|
         */

        /* example
         * has({one: 1}, 'one'); // -> true
         */

        /* typescript
         * export declare function has(obj: {}, key: string): boolean;
         */
        var hasOwnProp = Object.prototype.hasOwnProperty;

        exports = function exports(obj, key) {
            return hasOwnProp.call(obj, key);
        };

        return exports;
    })({});

    /* ------------------------------ slice ------------------------------ */

    var slice = _.slice = (function (exports) {
        /* Create slice of source array or array-like object.
         *
         * |Name              |Type  |Desc                      |
         * |------------------|------|--------------------------|
         * |array             |array |Array to slice            |
         * |[start=0]         |number|Start position            |
         * |[end=array.length]|number|End position, not included|
         */

        /* example
         * slice([1, 2, 3, 4], 1, 2); // -> [2]
         */

        /* typescript
         * export declare function slice(array: any[], start?: number, end?: number): any[];
         */
        exports = function exports(arr, start, end) {
            var len = arr.length;

            if (start == null) {
                start = 0;
            } else if (start < 0) {
                start = Math.max(len + start, 0);
            } else {
                start = Math.min(start, len);
            }

            if (end == null) {
                end = len;
            } else if (end < 0) {
                end = Math.max(len + end, 0);
            } else {
                end = Math.min(end, len);
            }

            var ret = [];

            while (start < end) {
                ret.push(arr[start++]);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ LinkedList ------------------------------ */

    var LinkedList = _.LinkedList = (function (exports) {
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError('Cannot call a class as a function');
            }
        }

        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }

        /* Doubly-linked list implementation.
         *
         * ### size
         *
         * List size.
         *
         * ### head.
         *
         * First node.
         *
         * ### tail
         *
         * Last node.
         *
         * ### push
         *
         * Add an value to the end of the list.
         *
         * |Name  |Type  |Desc         |
         * |------|------|-------------|
         * |val   |*     |Value to push|
         * |return|number|Current size |
         *
         * ### pop
         *
         * Get the last value of the list.
         *
         * ### unshift
         *
         * Add an value to the head of the list.
         *
         * ### shift
         *
         * Get the first value of the list.
         *
         * ### rmNode
         *
         * Remove node.
         *
         * ### forEach
         *
         * Iterate over the list.
         *
         * ### toArr
         *
         * Convert the list to a JavaScript array.
         */

        /* example
         * var linkedList = new LinkedList();
         * linkedList.push(5);
         * linkedList.pop(); // -> 5
         */

        /* typescript
         * export declare namespace LinkedList {
         *     class Node {
         *         value: any;
         *         prev: Node | null;
         *         next: Node | null;
         *     }
         * }
         * export declare class LinkedList {
         *     size: number;
         *     head: LinkedList.Node;
         *     tail: LinkedList.Node;
         *     push(val: any): number;
         *     pop(): any;
         *     unshift(val: any): number;
         *     shift(): any;
         *     delNode(node: LinkedList.Node): void;
         *     forEach(iterator: Function, ctx?: any);
         *     toArr(): any[];
         * }
         */
        exports =
            /*#__PURE__*/
            (function () {
                function LinkedList() {
                    _classCallCheck(this, LinkedList);

                    this.tail = null;
                    this.head = null;
                    this.size = 0;
                }

                _createClass(LinkedList, [
                    {
                        key: 'push',
                        value: function push(val) {
                            var node = new Node(val, this.tail, null, this);
                            this.tail = node;
                            this.head = this.head || node;
                            this.size++;
                            return this.size;
                        }
                    },
                    {
                        key: 'pop',
                        value: function pop() {
                            if (!this.tail) return;
                            var node = this.tail;
                            this.tail = node.prev;

                            if (this.tail) {
                                this.tail.next = null;
                            } else {
                                this.head = null;
                            }

                            this.size--;
                            return node.value;
                        }
                    },
                    {
                        key: 'unshift',
                        value: function unshift(val) {
                            var node = new Node(val, null, this.head, this);
                            this.head = node;
                            this.tail = this.tail || node;
                            this.size++;
                            return this.size;
                        }
                    },
                    {
                        key: 'shift',
                        value: function shift() {
                            if (!this.head) return;
                            var node = this.head;
                            this.head = node.next;

                            if (this.head) {
                                this.head.prev = null;
                            } else {
                                this.tail = null;
                            }

                            this.size--;
                            return node.value;
                        }
                    },
                    {
                        key: 'rmNode',
                        value: function rmNode(node) {
                            if (node.list !== this) {
                                throw Error('Node does not belong to this list');
                            }

                            var next = node.next,
                                prev = node.prev;

                            if (next) {
                                next.prev = prev;
                            }

                            if (prev) {
                                prev.next = next;
                            }

                            if (node === this.head) {
                                this.head = next;
                            }

                            if (node === this.tail) {
                                this.tail = prev;
                            }

                            node.list = null;
                            node.prev = null;
                            node.next = null;
                            this.size--;
                        }
                    },
                    {
                        key: 'forEach',
                        value: function forEach(iterator, ctx) {
                            ctx = arguments.length > 1 ? ctx : this;

                            for (
                                var i = 0, current = this.head;
                                current !== null;
                                i++
                            ) {
                                iterator.call(ctx, current.value, i, this);
                                current = current.next;
                            }
                        }
                    },
                    {
                        key: 'toArr',
                        value: function toArr() {
                            var arr = new Array(this.size);

                            for (
                                var i = 0, current = this.head;
                                current !== null;
                                i++
                            ) {
                                arr[i] = current.value;
                                current = current.next;
                            }

                            return arr;
                        }
                    }
                ]);

                return LinkedList;
            })();

        var Node = (exports.Node = function Node(val, prev, next, list) {
            _classCallCheck(this, Node);

            this.value = val;
            this.list = list;

            if (prev) {
                prev.next = this;
                this.prev = prev;
            } else {
                this.prev = null;
            }

            if (next) {
                next.prev = this;
                this.next = next;
            } else {
                this.next = null;
            }
        });

        return exports;
    })({});

    /* ------------------------------ isUndef ------------------------------ */

    var isUndef = _.isUndef = (function (exports) {
        /* Check if value is undefined.
         *
         * |Name  |Type   |Desc                      |
         * |------|-------|--------------------------|
         * |val   |*      |Value to check            |
         * |return|boolean|True if value is undefined|
         */

        /* example
         * isUndef(void 0); // -> true
         * isUndef(null); // -> false
         */

        /* typescript
         * export declare function isUndef(val: any): boolean;
         */
        exports = function exports(val) {
            return val === void 0;
        };

        return exports;
    })({});

    /* ------------------------------ clamp ------------------------------ */

    var clamp = _.clamp = (function (exports) {
        /* Clamp number within the inclusive lower and upper bounds.
         *
         * |Name   |Type  |Desc           |
         * |-------|------|---------------|
         * |n      |number|Number to clamp|
         * |[lower]|number|Lower bound    |
         * |upper  |number|Upper bound    |
         * |return |number|Clamped number |
         */

        /* example
         * clamp(-10, -5, 5); // -> -5
         * clamp(10, -5, 5); // -> 5
         * clamp(2, -5, 5); // -> 2
         * clamp(10, 5); // -> 5
         * clamp(2, 5); // -> 2
         */

        /* typescript
         * export declare function clamp(n: number, lower: number, upper: number): number;
         * export declare function clamp(n: number, upper: number): number;
         */

        /* dependencies
         * isUndef 
         */

        exports = function exports(n, lower, upper) {
            if (isUndef(upper)) {
                upper = lower;
                lower = undefined;
            }

            if (!isUndef(lower) && n < lower) return lower;
            if (n > upper) return upper;
            return n;
        };

        return exports;
    })({});

    /* ------------------------------ isObj ------------------------------ */

    var isObj = _.isObj = (function (exports) {
        function _typeof(obj) {
            if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                        ? 'symbol'
                        : typeof obj;
                };
            }
            return _typeof(obj);
        }

        /* Check if value is the language type of Object.
         *
         * |Name  |Type   |Desc                      |
         * |------|-------|--------------------------|
         * |val   |*      |Value to check            |
         * |return|boolean|True if value is an object|
         *
         * [Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
         */

        /* example
         * isObj({}); // -> true
         * isObj([]); // -> true
         */

        /* typescript
         * export declare function isObj(val: any): boolean;
         */
        exports = function exports(val) {
            var type = _typeof(val);

            return !!val && (type === 'function' || type === 'object');
        };

        return exports;
    })({});

    /* ------------------------------ nextTick ------------------------------ */

    var nextTick = _.nextTick = (function (exports) {
        function _typeof(obj) {
            if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                        ? 'symbol'
                        : typeof obj;
                };
            }
            return _typeof(obj);
        }

        /* Next tick for both node and browser.
         *
         * |Name|Type    |Desc            |
         * |----|--------|----------------|
         * |cb  |function|Function to call|
         *
         * Use process.nextTick if available.
         *
         * Otherwise setImmediate or setTimeout is used as fallback.
         */

        /* example
         * nextTick(function () {
         *     // Do something...
         * });
         */

        /* typescript
         * export declare function nextTick(cb: Function): void;
         */
        if (
            (typeof process === 'undefined' ? 'undefined' : _typeof(process)) ===
            'object' &&
            process.nextTick
        ) {
            exports = process.nextTick;
        } else if (typeof setImmediate === 'function') {
            exports = function exports(cb) {
                setImmediate(ensureCallable(cb));
            };
        } else {
            exports = function exports(cb) {
                setTimeout(ensureCallable(cb), 0);
            };
        }

        function ensureCallable(fn) {
            if (typeof fn !== 'function')
                throw new TypeError(fn + ' is not a function');
            return fn;
        }

        return exports;
    })({});

    /* ------------------------------ noop ------------------------------ */

    var noop = _.noop = (function (exports) {
        /* A no-operation function.
         */

        /* example
         * noop(); // Does nothing
         */

        /* typescript
         * export declare function noop(): void;
         */
        exports = function exports() {
        };

        return exports;
    })({});

    /* ------------------------------ QuickLru ------------------------------ */

    _.QuickLru = (function (exports) {
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError('Cannot call a class as a function');
            }
        }

        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }

        /* LRU implementation without linked list.
         *
         * Inspired by the [hashlru algorithm](https://github.com/dominictarr/hashlru#algorithm).
         *
         * The api is the same as Lru module.
         */

        /* example
         * const cache = new QuickLru(50);
         * cache.set('test', 'licia');
         * cache.get('test'); // -> 'licia'
         */

        /* typescript
         * export declare class QuickLru {
         *     constructor(max: number): void;
         *     has(key: string): boolean;
         *     remove(key: string): void;
         *     get(key: string): any;
         *     set(key: string, val: any): void;
         *     clear(): void;
         * }
         */

        /* dependencies
         * isUndef 
         */

        exports =
            /*#__PURE__*/
            (function () {
                function QuickLru(max) {
                    _classCallCheck(this, QuickLru);

                    this._max = max;
                    this._cache = {};
                    this._oldCache = {};
                    this._size = 0;
                }

                _createClass(QuickLru, [
                    {
                        key: 'has',
                        value: function has(key) {
                            return (
                                !isUndef(this._cache[key]) ||
                                !isUndef(this._oldCache[key])
                            );
                        }
                    },
                    {
                        key: 'remove',
                        value: function remove(key) {
                            if (!isUndef(this._cache[key]))
                                this._cache[key] = undefined;
                            if (!isUndef(this._oldCache[key]))
                                this._oldCache[key] = undefined;
                        }
                    },
                    {
                        key: 'get',
                        value: function get(key) {
                            if (!isUndef(this._cache[key])) {
                                return this._cache[key];
                            }

                            var val = this._oldCache[key];

                            if (!isUndef(val)) {
                                this._update(key, val);

                                return val;
                            }
                        }
                    },
                    {
                        key: 'set',
                        value: function set(key, val) {
                            if (!isUndef(this._cache[key])) {
                                this._cache[key] = val;
                            } else {
                                this._update(key, val);
                            }
                        }
                    },
                    {
                        key: 'clear',
                        value: function clear() {
                            this._cache = {};
                            this._oldCache = {};
                        }
                    },
                    {
                        key: '_update',
                        value: function _update(key, val) {
                            this._cache[key] = val;
                            this._size++;

                            if (this._size > this._max) {
                                this._size = 0;
                                this._oldCache = this._cache;
                                this._cache = {};
                            }
                        }
                    }
                ]);

                return QuickLru;
            })();

        return exports;
    })({});

    /* ------------------------------ now ------------------------------ */

    var now = _.now = (function (exports) {
        /* Gets the number of milliseconds that have elapsed since the Unix epoch.
         */

        /* example
         * now(); // -> 1468826678701
         */

        /* typescript
         * export declare function now(): number;
         */
        exports =
            Date.now ||
            function () {
                return new Date().getTime();
            };

        return exports;
    })({});

    /* ------------------------------ isBrowser ------------------------------ */

    var isBrowser = _.isBrowser = (function (exports) {
        function _typeof(obj) {
            if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                        ? 'symbol'
                        : typeof obj;
                };
            }
            return _typeof(obj);
        }

        /* Check if running in a browser.
         */

        /* example
         * console.log(isBrowser); // -> true if running in a browser
         */

        /* typescript
         * export declare const isBrowser: boolean;
         */
        exports =
            (typeof window === 'undefined' ? 'undefined' : _typeof(window)) ===
            'object' &&
            (typeof document === 'undefined' ? 'undefined' : _typeof(document)) ===
            'object' &&
            document.nodeType === 9;

        return exports;
    })({});

    /* ------------------------------ raf ------------------------------ */

    var raf = _.raf = (function (exports) {
        /* Shortcut for requestAnimationFrame.
         *
         * Use setTimeout if native requestAnimationFrame is not supported.
         */

        /* example
         * var id = raf(function tick() {
         *     // Animation stuff
         *     raf(tick);
         * });
         * raf.cancel(id);
         */

        /* typescript
         * export declare namespace raf {
         *     function cancel(id: number);
         * }
         * export declare function raf(cb: Function): number;
         */

        /* dependencies
         * now isBrowser 
         */

        var raf, cancel;

        if (isBrowser) {
            raf = window.requestAnimationFrame;
            cancel = window.cancelAnimationFrame;
            var lastTime = 0,
                vendors = ['ms', 'moz', 'webkit', 'o'];

            for (var i = 0, len = vendors.length; i < len && !raf; i++) {
                raf = window[vendors[i] + 'RequestAnimationFrame'];
                cancel =
                    window[vendors[i] + 'CancelAnimationFrame'] ||
                    window[vendors[i] + 'CancelRequestAnimationFrame'];
            }
        }

        raf =
            raf ||
            function (cb) {
                var curTime = now();
                var timeToCall = Math.max(0, 16 - (curTime - lastTime)),
                    id = setTimeout(function () {
                        cb(curTime + timeToCall);
                    }, timeToCall);
                lastTime = curTime + timeToCall;
                return id;
            };

        cancel =
            cancel ||
            function (id) {
                clearTimeout(id);
            };

        raf.cancel = cancel;
        exports = raf;

        return exports;
    })({});

    /* ------------------------------ root ------------------------------ */

    var root = _.root = (function (exports) {
        /* Root object reference, `global` in nodeJs, `window` in browser. */

        /* typescript
         * export declare const root: any;
         */

        /* dependencies
         * isBrowser 
         */

        exports = isBrowser ? window : global;

        return exports;
    })({});

    /* ------------------------------ detectMocha ------------------------------ */

    var detectMocha = _.detectMocha = (function (exports) {
        /* Detect if mocha is running.
         */

        /* example
         * detectMocha(); // -> True if mocha is running.
         */

        /* typescript
         * export declare function detectMocha(): boolean;
         */

        /* dependencies
         * root 
         */

        exports = function exports() {
            for (var i = 0, len = methods.length; i < len; i++) {
                var method = methods[i];
                if (typeof root[method] !== 'function') return false;
            }

            return true;
        };

        var methods = ['afterEach', 'after', 'beforeEach', 'before', 'describe', 'it'];

        return exports;
    })({});

    /* ------------------------------ keys ------------------------------ */

    var keys = _.keys = (function (exports) {
        /* Create an array of the own enumerable property names of object.
         *
         * |Name  |Type  |Desc                   |
         * |------|------|-----------------------|
         * |obj   |object|Object to query        |
         * |return|array |Array of property names|
         */

        /* example
         * keys({a: 1}); // -> ['a']
         */

        /* typescript
         * export declare function keys(obj: any): string[];
         */

        /* dependencies
         * has detectMocha 
         */

        if (Object.keys && !detectMocha()) {
            exports = Object.keys;
        } else {
            exports = function exports(obj) {
                var ret = [],
                    key;

                for (key in obj) {
                    if (has(obj, key)) ret.push(key);
                }

                return ret;
            };
        }

        return exports;
    })({});

    /* ------------------------------ freeze ------------------------------ */

    var freeze = _.freeze = (function (exports) {
        /* Shortcut for Object.freeze.
         *
         * Use Object.defineProperties if Object.freeze is not supported.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |obj   |object|Object to freeze|
         * |return|object|Object passed in|
         */

        /* example
         * var a = {b: 1};
         * freeze(a);
         * a.b = 2;
         * console.log(a); // -> {b: 1}
         */

        /* typescript
         * export declare function freeze<T>(obj: T): T;
         */

        /* dependencies
         * keys 
         */

        exports = function exports(obj) {
            if (Object.freeze) return Object.freeze(obj);
            keys(obj).forEach(function (prop) {
                if (!Object.getOwnPropertyDescriptor(obj, prop).configurable) return;
                Object.defineProperty(obj, prop, {
                    writable: false,
                    configurable: false
                });
            });
            return obj;
        };

        return exports;
    })({});

    /* ------------------------------ isBool ------------------------------ */

    var isBool = _.isBool = (function (exports) {
        /* Check if value is a boolean primitive.
         *
         * |Name  |Type   |Desc                      |
         * |------|-------|--------------------------|
         * |val   |*      |Value to check            |
         * |return|boolean|True if value is a boolean|
         */

        /* example
         * isBool(true); // -> true
         * isBool(false); // -> true
         * isBool(1); // -> false
         */

        /* typescript
         * export declare function isBool(val: any): boolean;
         */
        exports = function exports(val) {
            return val === true || val === false;
        };

        return exports;
    })({});

    /* ------------------------------ after ------------------------------ */

    _.after = (function (exports) {
        /* Create a function that invokes once it's called n or more times.
         *
         * |Name  |Type    |Desc                          |
         * |------|--------|------------------------------|
         * |n     |number  |Number of calls before invoked|
         * |fn    |function|Function to restrict          |
         * |return|function|New restricted function       |
         */

        /* example
         * var fn = after(5, function() {
         *     // -> Only invoke after fn is called 5 times.
         * });
         */

        /* typescript
         * export declare function after(n: number, fn: Function): Function;
         */
        exports = function exports(n, fn) {
            return function () {
                if (--n < 1) return fn.apply(this, arguments);
            };
        };

        return exports;
    })({});

    /* ------------------------------ allKeys ------------------------------ */

    var allKeys = _.allKeys = (function (exports) {
        /* Retrieve all the names of object's own and inherited properties.
         *
         * |Name  |Type  |Desc                       |
         * |------|------|---------------------------|
         * |obj   |object|Object to query            |
         * |return|array |Array of all property names|
         *
         * Members of Object's prototype won't be retrieved.
         */

        /* example
         * var obj = Object.create({zero: 0});
         * obj.one = 1;
         * allKeys(obj) // -> ['zero', 'one']
         */

        /* typescript
         * export declare function allKeys(obj: any): string[];
         */
        exports = function exports(obj) {
            var ret = [],
                key;

            for (key in obj) {
                ret.push(key);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ base64 ------------------------------ */

    var base64 = _.base64 = (function (exports) {
        /* Basic base64 encoding and decoding.
         *
         * ### encode
         *
         * Turn a byte array into a base64 string.
         *
         * |Name  |Type  |Desc         |
         * |------|------|-------------|
         * |arr   |array |Byte array   |
         * |return|string|Base64 string|
         *
         * ### decode
         *
         * Turn a base64 string into a byte array.
         *
         * |Name  |Type  |Desc         |
         * |------|------|-------------|
         * |str   |string|Base64 string|
         * |return|array |Byte array   |
         */

        /* example
         * base64.encode([168, 174, 155, 255]); // -> 'qK6b/w=='
         * base64.decode('qK6b/w=='); // -> [168, 174, 155, 255]
         */

        /* typescript
         * export declare const base64: {
         *     encode(arr: number[]): string;
         *     decode(str: string): number[];
         * };
         */
        exports = {
            encode: function encode(arr) {
                var ret = [],
                    len = arr.length,
                    remain = len % 3;
                len = len - remain;

                for (var i = 0; i < len; i += 3) {
                    ret.push(
                        numToBase64((arr[i] << 16) + (arr[i + 1] << 8) + arr[i + 2])
                    );
                }

                len = arr.length;
                var tmp;

                if (remain === 1) {
                    tmp = arr[len - 1];
                    ret.push(code[tmp >> 2]);
                    ret.push(code[(tmp << 4) & 0x3f]);
                    ret.push('==');
                } else if (remain === 2) {
                    tmp = (arr[len - 2] << 8) + arr[len - 1];
                    ret.push(code[tmp >> 10]);
                    ret.push(code[(tmp >> 4) & 0x3f]);
                    ret.push(code[(tmp << 2) & 0x3f]);
                    ret.push('=');
                }

                return ret.join('');
            },
            decode: function decode(str) {
                var len = str.length,
                    remain = 0;
                if (str[len - 2] === '=') remain = 2;
                else if (str[len - 1] === '=') remain = 1;
                var ret = new Array((len * 3) / 4 - remain);
                len = remain > 0 ? len - 4 : len;

                for (var i = 0, j = 0; i < len; i += 4) {
                    var num = base64ToNum(str[i], str[i + 1], str[i + 2], str[i + 3]);
                    ret[j++] = (num >> 16) & 0xff;
                    ret[j++] = (num >> 8) & 0xff;
                    ret[j++] = num & 0xff;
                }

                var tmp;

                if (remain === 2) {
                    tmp =
                        (codeMap[str.charCodeAt(i)] << 2) |
                        (codeMap[str.charCodeAt(i + 1)] >> 4);
                    ret[j++] = tmp & 0xff;
                } else if (remain === 1) {
                    tmp =
                        (codeMap[str.charCodeAt(i)] << 10) |
                        (codeMap[str.charCodeAt(i + 1)] << 4) |
                        (codeMap[str.charCodeAt(i + 2)] >> 2);
                    ret[j++] = (tmp >> 8) & 0xff;
                    ret[j++] = tmp & 0xff;
                }

                return ret;
            }
        };
        var codeMap = [],
            code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

        for (var i = 0, len = code.length; i < len; i++) {
            codeMap[code.charCodeAt(i)] = i;
        }

        function numToBase64(num) {
            return (
                code[(num >> 18) & 0x3f] +
                code[(num >> 12) & 0x3f] +
                code[(num >> 6) & 0x3f] +
                code[num & 0x3f]
            );
        }

        function base64ToNum(str1, str2, str3, str4) {
            return (
                (codeMap[str1.charCodeAt(0)] << 18) |
                (codeMap[str2.charCodeAt(0)] << 12) |
                (codeMap[str3.charCodeAt(0)] << 6) |
                codeMap[str4.charCodeAt(0)]
            );
        }

        return exports;
    })({});

    /* ------------------------------ average ------------------------------ */

    _.average = (function (exports) {
        /* Get average value of given numbers.
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |...num|number|Numbers to calculate|
         * |return|number|Average value       |
         */

        /* example
         * average(5, 3, 1); // -> 3
         */

        /* typescript
         * export declare function average(...num: number[]): number;
         */
        exports = function exports() {
            var arr = arguments,
                sum = 0;

            for (var i = 0, len = arr.length; i < len; i++) {
                sum += arr[i];
            }

            return sum / len;
        };

        return exports;
    })({});

    /* ------------------------------ before ------------------------------ */

    var before = _.before = (function (exports) {
        /* Create a function that invokes less than n times.
         *
         * |Name  |Type    |Desc                                            |
         * |------|--------|------------------------------------------------|
         * |n     |number  |Number of calls at which fn is no longer invoked|
         * |fn    |function|Function to restrict                            |
         * |return|function|New restricted function                         |
         *
         * Subsequent calls to the created function return the result of the last fn invocation.
         */

        /* example
         * const fn = before(5, function() {});
         * fn(); // Allow function to be call 4 times at last.
         */

        /* typescript
         * export declare function before(n: number, fn: Function): Function;
         */
        exports = function exports(n, fn) {
            var memo;
            return function () {
                if (--n > 0) memo = fn.apply(this, arguments);
                if (n <= 1) fn = null;
                return memo;
            };
        };

        return exports;
    })({});

    /* ------------------------------ binarySearch ------------------------------ */

    _.binarySearch = (function (exports) {
        /* Binary search implementation.
         *
         * |Name        |Type    |Desc         |
         * |------------|--------|-------------|
         * |array       |array   |Sorted array |
         * |value       |*       |Value to seek|
         * |[comparator]|function|Comparator   |
         * |return      |number  |Value index  |
         */

        /* example
         * binarySearch([1, 2, 3], 2); // -> 1
         * binarySearch([1, 2], 3); // -> -1
         * binarySearch(
         *     [
         *         {
         *             key: 1
         *         },
         *         {
         *             key: 2
         *         }
         *     ],
         *     { key: 1 },
         *     (a, b) => {
         *         if (a.key === b.key) return 0;
         *         return a.key < b.key ? -1 : 1;
         *     }
         * ); // -> 0
         */

        /* typescript
         * export declare function binarySearch(
         *     array: any[],
         *     value: any,
         *     comparator?: Function
         * ): number;
         */
        exports = function exports(arr, val, cmp) {
            cmp = cmp || comparator;
            var startIdx = 0;
            var endIdx = arr.length - 1;

            while (startIdx <= endIdx) {
                var middleIdx = startIdx + Math.floor((endIdx - startIdx) / 2);
                var middleVal = arr[middleIdx];

                if (cmp(middleVal, val) === 0) {
                    return middleIdx;
                }

                if (cmp(middleVal, val) < 0) {
                    startIdx = middleIdx + 1;
                } else {
                    endIdx = middleIdx - 1;
                }
            }

            return -1;
        };

        function comparator(a, b) {
            return a - b;
        }

        return exports;
    })({});

    /* ------------------------------ restArgs ------------------------------ */

    var restArgs = _.restArgs = (function (exports) {
        /* This accumulates the arguments passed into an array, after a given index.
         *
         * |Name        |Type    |Desc                                   |
         * |------------|--------|---------------------------------------|
         * |function    |function|Function that needs rest parameters    |
         * |[startIndex]|number  |The start index to accumulates         |
         * |return      |function|Generated function with rest parameters|
         */

        /* example
         * var paramArr = restArgs(function (rest) { return rest });
         * paramArr(1, 2, 3, 4); // -> [1, 2, 3, 4]
         */

        /* typescript
         * export declare function restArgs(fn: Function, startIndex?: number): Function;
         */
        exports = function exports(fn, startIdx) {
            startIdx = startIdx == null ? fn.length - 1 : +startIdx;
            return function () {
                var len = Math.max(arguments.length - startIdx, 0),
                    rest = new Array(len),
                    i;

                for (i = 0; i < len; i++) {
                    rest[i] = arguments[i + startIdx];
                } // Call runs faster than apply.

                switch (startIdx) {
                    case 0:
                        return fn.call(this, rest);

                    case 1:
                        return fn.call(this, arguments[0], rest);

                    case 2:
                        return fn.call(this, arguments[0], arguments[1], rest);
                }

                var args = new Array(startIdx + 1);

                for (i = 0; i < startIdx; i++) {
                    args[i] = arguments[i];
                }

                args[startIdx] = rest;
                return fn.apply(this, args);
            };
        };

        return exports;
    })({});

    /* ------------------------------ bind ------------------------------ */

    var bind = _.bind = (function (exports) {
        /* Create a function bound to a given object.
         *
         * |Name   |Type    |Desc                    |
         * |-------|--------|------------------------|
         * |fn     |function|Function to bind        |
         * |ctx    |*       |This binding of given fn|
         * |...rest|*       |Optional arguments      |
         * |return |function|New bound function      |
         */

        /* example
         * var fn = bind(function (msg) {
         *     console.log(this.name + ':' + msg);
         * }, {name: 'eustia'}, 'I am a utility library.');
         * fn(); // -> 'eustia: I am a utility library.'
         */

        /* typescript
         * export declare function bind(fn: Function, ctx: any, ...rest: any[]): Function;
         */

        /* dependencies
         * restArgs 
         */

        exports = restArgs(function (fn, ctx, rest) {
            return restArgs(function (callArgs) {
                return fn.apply(ctx, rest.concat(callArgs));
            });
        });

        return exports;
    })({});

    /* ------------------------------ swap ------------------------------ */

    var swap = _.swap = (function (exports) {
        /* Swap two items in an array.
         *
         * |Name  |Type  |Desc         |
         * |------|------|-------------|
         * |arr   |array |Array to swap|
         * |a     |number|First index  |
         * |b     |number|Second index |
         * |return|array |Array given  |
         */

        /* example
         * var arr = [1, 2];
         * swap(arr, 0, 1); // -> [2, 1]
         */

        /* typescript
         * export declare function swap(arr: any[], a: number, b: number): any[];
         */
        exports = function exports(arr, a, b) {
            var tmp = arr[a];
            arr[a] = arr[b];
            arr[b] = tmp;
            return arr;
        };

        return exports;
    })({});

    /* ------------------------------ bubbleSort ------------------------------ */

    _.bubbleSort = (function (exports) {
        /* Bubble sort implementation.
         *
         * |Name  |Type    |Desc         |
         * |------|--------|-------------|
         * |arr   |array   |Array to sort|
         * |[cmp] |function|Comparator   |
         * |return|array   |Sorted array |
         */

        /* example
         * bubbleSort([2, 1]); // -> [1, 2]
         */

        /* typescript
         * export declare function bubbleSort(arr: any[], cmp?: Function): any[];
         */

        /* dependencies
         * swap 
         */

        exports = function exports(arr, cmp) {
            cmp = cmp || comparator;

            for (var i = 0, len = arr.length; i < len; i++) {
                for (var j = i; j > 0; j--) {
                    if (cmp(arr[j], arr[j - 1]) < 0) {
                        swap(arr, j, j - 1);
                    }
                }
            }

            return arr;
        };

        function comparator(a, b) {
            return a - b;
        }

        return exports;
    })({});

    /* ------------------------------ bytesToStr ------------------------------ */

    var bytesToStr = _.bytesToStr = (function (exports) {
        /* Convert bytes to string.
         *
         * |Name  |Type  |Desc         |
         * |------|------|-------------|
         * |str   |array |Bytes array  |
         * |return|string|Result string|
         */

        /* example
         * bytesToStr([108, 105, 99, 105, 97]); // -> 'licia'
         */

        /* typescript
         * export declare function bytesToStr(bytes: number[]): string;
         */
        exports = function exports(bytes) {
            var str = [];

            for (var i = 0, len = bytes.length; i < len; i++) {
                str.push(String.fromCharCode(bytes[i]));
            }

            return str.join('');
        };

        return exports;
    })({});

    /* ------------------------------ callbackify ------------------------------ */

    _.callbackify = (function (exports) {
        /* Convert a function that returns a Promise to a function following the error-first callback style.
         *
         * |Name  |Type    |Desc                                            |
         * |------|--------|------------------------------------------------|
         * |fn    |function|Function that returns a Promise                 |
         * |return|function|Function following the error-fist callback style|
         */

        /* example
         * function fn() {
         *     return new Promise(function (resolve, reject) {
         *         // ...
         *     });
         * }
         *
         * var cbFn = callbackify(fn);
         *
         * cbFn(function (err, value) {
         *     // ...
         * });
         */

        /* typescript
         * export declare function callbackify(fn: Function): Function;
         */

        /* dependencies
         * restArgs 
         */

        exports = function exports(fn) {
            return restArgs(function (args) {
                var cb = args.pop();
                fn.apply(this, args).then(
                    function (value) {
                        cb(null, value);
                    },
                    function (err) {
                        if (err === null) err = new Error();
                        cb(err);
                    }
                );
            });
        };

        return exports;
    })({});

    /* ------------------------------ splitCase ------------------------------ */

    var splitCase = _.splitCase = (function (exports) {
        /* Split different string case to an array.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |str   |string|String to split|
         * |return|array |Result array   |
         */

        /* example
         * splitCase('foo-bar'); // -> ['foo', 'bar']
         * splitCase('foo bar'); // -> ['foo', 'bar']
         * splitCase('foo_bar'); // -> ['foo', 'bar']
         * splitCase('foo.bar'); // -> ['foo', 'bar']
         * splitCase('fooBar'); // -> ['foo', 'bar']
         * splitCase('foo-Bar'); // -> ['foo', 'bar']
         */

        /* typescript
         * export declare function splitCase(str: string): string[];
         */
        var regUpperCase = /([A-Z])/g,
            regSeparator = /[_.\- ]+/g,
            regTrim = /(^-)|(-$)/g;

        exports = function exports(str) {
            str = str
                .replace(regUpperCase, '-$1')
                .toLowerCase()
                .replace(regSeparator, '-')
                .replace(regTrim, '');
            return str.split('-');
        };

        return exports;
    })({});

    /* ------------------------------ camelCase ------------------------------ */

    var camelCase = _.camelCase = (function (exports) {
        /* Convert string to "camelCase".
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |str   |string|String to convert |
         * |return|string|Camel cased string|
         */

        /* example
         * camelCase('foo-bar'); // -> fooBar
         * camelCase('foo bar'); // -> fooBar
         * camelCase('foo_bar'); // -> fooBar
         * camelCase('foo.bar'); // -> fooBar
         */

        /* typescript
         * export declare function camelCase(str: string): string;
         */

        /* dependencies
         * splitCase 
         */

        exports = function exports(str) {
            var arr = splitCase(str);
            var ret = arr[0];
            arr.shift();
            arr.forEach(capitalize, arr);
            ret += arr.join('');
            return ret;
        };

        function capitalize(val, idx) {
            this[idx] = val.replace(/\w/, function (match) {
                return match.toUpperCase();
            });
        }

        return exports;
    })({});

    /* ------------------------------ capitalize ------------------------------ */

    var capitalize = _.capitalize = (function (exports) {
        /* Convert the first character to upper case and the remaining to lower case.
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |str   |string|String to capitalize|
         * |return|string|Capitalized string  |
         */

        /* example
         * capitalize('rED'); // -> Red
         */

        /* typescript
         * export declare function capitalize(str: string): string;
         */
        exports = function exports(str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        };

        return exports;
    })({});

    /* ------------------------------ char ------------------------------ */

    _.char = (function (exports) {
        /* Return string representing a character whose Unicode code point is the given integer.
         *
         * |Name  |Type  |Desc                                  |
         * |------|------|--------------------------------------|
         * |num   |number|Integer to convert                    |
         * |return|string|String representing corresponding char|
         */

        /* example
         * char(65); // -> 'A'
         * char(97); // -> 'a'
         */

        /* typescript
         * export declare function char(num: number): string;
         */
        exports = function exports(num) {
            return String.fromCodePoint(num);
        };

        return exports;
    })({});

    /* ------------------------------ chunk ------------------------------ */

    _.chunk = (function (exports) {
        /* Split array into groups the length of given size.
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |arr   |array |Array to process    |
         * |size=1|number|Length of each chunk|
         * |return|array |Chunks of given size|
         */

        /* example
         * chunk([1, 2, 3, 4], 2); // -> [[1, 2], [3, 4]]
         * chunk([1, 2, 3, 4], 3); // -> [[1, 2, 3], [4]]
         * chunk([1, 2, 3, 4]); // -> [[1], [2], [3], [4]]
         */

        /* typescript
         * export declare function chunk(arr: any[], size?: number): Array<any[]>;
         */
        exports = function exports(arr, size) {
            var ret = [];
            size = size || 1;

            for (var i = 0, len = Math.ceil(arr.length / size); i < len; i++) {
                var start = i * size,
                    end = start + size;
                ret.push(arr.slice(start, end));
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ max ------------------------------ */

    var max = _.max = (function (exports) {
        /* Get maximum value of given numbers.
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |...num|number|Numbers to calculate|
         * |return|number|Maximum value       |
         */

        /* example
         * max(2.3, 1, 4.5, 2); // 4.5
         */

        /* typescript
         * export declare function max(...num: number[]): number;
         */
        exports = function exports() {
            var arr = arguments,
                ret = arr[0];

            for (var i = 1, len = arr.length; i < len; i++) {
                if (arr[i] > ret) ret = arr[i];
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ combine ------------------------------ */

    _.combine = (function (exports) {
        /* Create an array by using one array for keys and another for its values.
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |keys  |array |Keys to be used  |
         * |values|array |Values to be used|
         * |return|object|Created object   |
         */

        /* example
         * combine(['a', 'b', 'c'], [1, 2, 3]); // -> {a: 1, b: 2, c: 3}
         */

        /* typescript
         * export declare function combine(keys: string[], values: any[]): any;
         */
        exports = function exports(keys, values) {
            var ret = {};

            for (var i = 0, len = keys.length; i < len; i++) {
                ret[keys[i]] = values[i];
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ compose ------------------------------ */

    _.compose = (function (exports) {
        /* Compose a list of functions.
         *
         * Each function consumes the return value of the function that follows.
         *
         * |Name  |Type    |Desc                |
         * |------|--------|--------------------|
         * |...fn |function|Functions to compose|
         * |return|function|Composed function   |
         */

        /* example
         * var welcome = compose(function (name) {
         *     return 'hi: ' + name;
         * }, function (name) {
         *     return name.toUpperCase() + '!';
         * });
         *
         * welcome('licia'); // -> 'hi: LICIA!'
         */

        /* typescript
         * export declare function compose(...fn: Function[]): Function;
         */

        /* dependencies
         * restArgs 
         */

        exports = restArgs(function (fnList) {
            return function () {
                var i = fnList.length - 1;
                var result = fnList[i].apply(this, arguments);

                while (i--) {
                    result = fnList[i].call(this, result);
                }

                return result;
            };
        });

        return exports;
    })({});

    /* ------------------------------ idxOf ------------------------------ */

    var idxOf = _.idxOf = (function (exports) {
        /* Get the index at which the first occurrence of value.
         *
         * |Name     |Type  |Desc                |
         * |---------|------|--------------------|
         * |arr      |array |Array to search     |
         * |val      |*     |Value to search for |
         * |fromIdx=0|number|Index to search from|
         * |return   |number|Value index         |
         */

        /* example
         * idxOf([1, 2, 1, 2], 2, 2); // -> 3
         */

        /* typescript
         * export declare function idxOf(arr: any[], val: any, fromIdx?: number): number;
         */
        exports = function exports(arr, val, fromIdx) {
            return Array.prototype.indexOf.call(arr, val, fromIdx);
        };

        return exports;
    })({});

    /* ------------------------------ toStr ------------------------------ */

    var toStr = _.toStr = (function (exports) {
        /* Convert value to a string.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |val   |*     |Value to convert|
         * |return|string|Resulted string |
         */

        /* example
         * toStr(null); // -> ''
         * toStr(1); // -> '1'
         * toStr(false); // -> 'false'
         * toStr([1, 2, 3]); // -> '1,2,3'
         */

        /* typescript
         * export declare function toStr(val: any): string;
         */
        exports = function exports(val) {
            return val == null ? '' : val.toString();
        };

        return exports;
    })({});

    /* ------------------------------ debounce ------------------------------ */

    var debounce = _.debounce = (function (exports) {
        /* Return a new debounced version of the passed function.
         *
         * |Name  |Type    |Desc                           |
         * |------|--------|-------------------------------|
         * |fn    |function|Function to debounce           |
         * |wait  |number  |Number of milliseconds to delay|
         * |return|function|New debounced function         |
         */

        /* example
         * const calLayout = debounce(function () {}, 300);
         * // $(window).resize(calLayout);
         */

        /* typescript
         * export declare function debounce(fn: Function, wait: number): Function;
         */
        exports = function exports(fn, wait, immediate) {
            var timeout;
            return function () {
                var ctx = this,
                    args = arguments;

                var throttler = function throttler() {
                    timeout = null;
                    fn.apply(ctx, args);
                };

                if (!immediate) clearTimeout(timeout);
                if (!immediate || !timeout) timeout = setTimeout(throttler, wait);
            };
        };

        return exports;
    })({});

    /* ------------------------------ ucs2 ------------------------------ */

    var ucs2 = _.ucs2 = (function (exports) {
        /* UCS-2 encoding and decoding.
         *
         * ### encode
         *
         * Create a string using an array of code point values.
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |arr   |array |Array of code points|
         * |return|string|Encoded string      |
         *
         * ### decode
         *
         * Create an array of code point values using a string.
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |str   |string|Input string        |
         * |return|array |Array of code points|
         */

        /* example
         * ucs2.encode([0x61, 0x62, 0x63]); // -> 'abc'
         * ucs2.decode('abc'); // -> [0x61, 0x62, 0x63]
         * '𝌆'.length; // -> 2
         * ucs2.decode('𝌆').length; // -> 1
         */

        /* typescript
         * export declare const ucs2: {
         *     encode(arr: number[]): string;
         *     decode(str: string): number[];
         * };
         */
        // https://mathiasbynens.be/notes/javascript-encoding
        exports = {
            encode: function encode(arr) {
                return String.fromCodePoint.apply(String, arr);
            },
            decode: function decode(str) {
                var ret = [];
                var i = 0,
                    len = str.length;

                while (i < len) {
                    var c = str.charCodeAt(i++); // A high surrogate

                    if (c >= 0xd800 && c <= 0xdbff && i < len) {
                        var tail = str.charCodeAt(i++); // nextC >= 0xDC00 && nextC <= 0xDFFF

                        if ((tail & 0xfc00) === 0xdc00) {
                            // C = (H - 0xD800) * 0x400 + L - 0xDC00 + 0x10000
                            ret.push(((c & 0x3ff) << 10) + (tail & 0x3ff) + 0x10000);
                        } else {
                            ret.push(c);
                            i--;
                        }
                    } else {
                        ret.push(c);
                    }
                }

                return ret;
            }
        };

        return exports;
    })({});

    /* ------------------------------ utf8 ------------------------------ */

    var utf8 = _.utf8 = (function (exports) {
        /* UTF-8 encoding and decoding.
         *
         * ### encode
         *
         * Turn any UTF-8 decoded string into UTF-8 encoded string.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |str   |string|String to encode|
         * |return|string|Encoded string  |
         *
         * ### decode
         *
         * Turn any UTF-8 encoded string into UTF-8 decoded string.
         *
         * |Name      |Type   |Desc                  |
         * |----------|-------|----------------------|
         * |str       |string |String to decode      |
         * |safe=false|boolean|Suppress error if true|
         * |return    |string |Decoded string        |
         */

        /* example
         * utf8.encode('\uD800\uDC00'); // ->  '\xF0\x90\x80\x80'
         * utf8.decode('\xF0\x90\x80\x80'); // -> '\uD800\uDC00'
         */

        /* typescript
         * export declare const utf8: {
         *     encode(str: string): string;
         *     decode(str: string, safe?: boolean): string;
         * };
         */

        /* dependencies
         * ucs2 
         */ // https://encoding.spec.whatwg.org/#utf-8

        exports = {
            encode: function encode(str) {
                var codePoints = ucs2.decode(str);
                var byteArr = '';

                for (var i = 0, len = codePoints.length; i < len; i++) {
                    byteArr += encodeCodePoint(codePoints[i]);
                }

                return byteArr;
            },
            decode: function decode(str, safe) {
                byteArr = ucs2.decode(str);
                byteIdx = 0;
                byteCount = byteArr.length;
                codePoint = 0;
                bytesSeen = 0;
                bytesNeeded = 0;
                lowerBoundary = 0x80;
                upperBoundary = 0xbf;
                var codePoints = [];
                var tmp;

                while ((tmp = decodeCodePoint(safe)) !== false) {
                    codePoints.push(tmp);
                }

                return ucs2.encode(codePoints);
            }
        };
        var fromCharCode = String.fromCharCode;

        function encodeCodePoint(codePoint) {
            // U+0000 to U+0080, ASCII code point
            if ((codePoint & 0xffffff80) === 0) {
                return fromCharCode(codePoint);
            }

            var ret = '',
                count,
                offset; // U+0080 to U+07FF, inclusive

            if ((codePoint & 0xfffff800) === 0) {
                count = 1;
                offset = 0xc0;
            } else if ((codePoint & 0xffff0000) === 0) {
                // U+0800 to U+FFFF, inclusive
                count = 2;
                offset = 0xe0;
            } else if ((codePoint & 0xffe00000) == 0) {
                // U+10000 to U+10FFFF, inclusive
                count = 3;
                offset = 0xf0;
            }

            ret += fromCharCode((codePoint >> (6 * count)) + offset);

            while (count > 0) {
                var tmp = codePoint >> (6 * (count - 1));
                ret += fromCharCode(0x80 | (tmp & 0x3f));
                count--;
            }

            return ret;
        }

        var byteArr,
            byteIdx,
            byteCount,
            codePoint,
            bytesSeen,
            bytesNeeded,
            lowerBoundary,
            upperBoundary;

        function decodeCodePoint(safe) {
            /* eslint-disable no-constant-condition */
            while (true) {
                if (byteIdx >= byteCount && bytesNeeded) {
                    if (safe) return goBack();
                    throw new Error('Invalid byte index');
                }

                if (byteIdx === byteCount) return false;
                var _byte = byteArr[byteIdx];
                byteIdx++;

                if (!bytesNeeded) {
                    // 0x00 to 0x7F
                    if ((_byte & 0x80) === 0) {
                        return _byte;
                    } // 0xC2 to 0xDF

                    if ((_byte & 0xe0) === 0xc0) {
                        bytesNeeded = 1;
                        codePoint = _byte & 0x1f;
                    } else if ((_byte & 0xf0) === 0xe0) {
                        // 0xE0 to 0xEF
                        if (_byte === 0xe0) lowerBoundary = 0xa0;
                        if (_byte === 0xed) upperBoundary = 0x9f;
                        bytesNeeded = 2;
                        codePoint = _byte & 0xf;
                    } else if ((_byte & 0xf8) === 0xf0) {
                        // 0xF0 to 0xF4
                        if (_byte === 0xf0) lowerBoundary = 0x90;
                        if (_byte === 0xf4) upperBoundary = 0x8f;
                        bytesNeeded = 3;
                        codePoint = _byte & 0x7;
                    } else {
                        if (safe) return goBack();
                        throw new Error('Invalid UTF-8 detected');
                    }

                    continue;
                }

                if (_byte < lowerBoundary || _byte > upperBoundary) {
                    if (safe) {
                        byteIdx--;
                        return goBack();
                    }

                    throw new Error('Invalid continuation byte');
                }

                lowerBoundary = 0x80;
                upperBoundary = 0xbf;
                codePoint = (codePoint << 6) | (_byte & 0x3f);
                bytesSeen++;
                if (bytesSeen !== bytesNeeded) continue;
                var tmp = codePoint;
                codePoint = 0;
                bytesNeeded = 0;
                bytesSeen = 0;
                return tmp;
            }
        }

        function goBack() {
            var start = byteIdx - bytesSeen - 1;
            byteIdx = start + 1;
            codePoint = 0;
            bytesNeeded = 0;
            bytesSeen = 0;
            lowerBoundary = 0x80;
            upperBoundary = 0xbf;
            return byteArr[start];
        }

        return exports;
    })({});

    /* ------------------------------ delay ------------------------------ */

    _.delay = (function (exports) {
        /* Invoke function after certain milliseconds.
         *
         * |Name     |Type    |Desc                                      |
         * |---------|--------|------------------------------------------|
         * |fn       |function|Function to delay                         |
         * |wait     |number  |Number of milliseconds to delay invocation|
         * |[...args]|*       |Arguments to invoke fn with               |
         */

        /* example
         * delay(function (text) {
         *     console.log(text);
         * }, 1000, 'later');
         * // -> Logs 'later' after one second
         */

        /* typescript
         * export declare function delay(fn: Function, wait: number, ...args: any[]): void;
         */

        /* dependencies
         * restArgs 
         */

        exports = restArgs(function (fn, wait, args) {
            return setTimeout(function () {
                return fn.apply(null, args);
            }, wait);
        });

        return exports;
    })({});

    /* ------------------------------ detectOs ------------------------------ */

    _.detectOs = (function (exports) {
        /* Detect operating system using ua.
         *
         * |Name                  |Type  |Desc                 |
         * |----------------------|------|---------------------|
         * |ua=navigator.userAgent|string|Browser userAgent    |
         * |return                |string|Operating system name|
         *
         * Supported os: windows, os x, linux, ios, android, windows phone
         */

        /* example
         * if (detectOs() === 'ios') {
         *     // Do something about ios...
         * }
         */

        /* typescript
         * export declare function detectOs(ua?: string): string;
         */

        /* dependencies
         * isBrowser 
         */

        exports = function exports(ua) {
            ua = ua || (isBrowser ? navigator.userAgent : '');
            ua = ua.toLowerCase();
            if (detect('windows phone')) return 'windows phone';
            if (detect('win')) return 'windows';
            if (detect('android')) return 'android';
            if (detect('ipad') || detect('iphone') || detect('ipod')) return 'ios';
            if (detect('mac')) return 'os x';
            if (detect('linux')) return 'linux';

            function detect(keyword) {
                return ua.indexOf(keyword) > -1;
            }

            return 'unknown';
        };

        return exports;
    })({});

    /* ------------------------------ dotCase ------------------------------ */

    _.dotCase = (function (exports) {
        /* Convert string to "dotCase".
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |str   |string|String to convert|
         * |return|string|Dot cased string |
         */

        /* example
         * dotCase('fooBar'); // -> foo.bar
         * dotCase('foo bar'); // -> foo.bar
         */

        /* typescript
         * export declare function dotCase(str: string): string;
         */

        /* dependencies
         * splitCase 
         */

        exports = function exports(str) {
            return splitCase(str).join('.');
        };

        return exports;
    })({});

    /* ------------------------------ optimizeCb ------------------------------ */

    var optimizeCb = _.optimizeCb = (function (exports) {
        /* Used for function context binding.
         */

        /* typescript
         * export declare function optimizeCb(fn: Function, ctx: any, argCount?: number): Function;
         */

        /* dependencies
         * isUndef 
         */

        exports = function exports(fn, ctx, argCount) {
            if (isUndef(ctx)) return fn;

            switch (argCount == null ? 3 : argCount) {
                case 1:
                    return function (val) {
                        return fn.call(ctx, val);
                    };

                case 3:
                    return function (val, idx, collection) {
                        return fn.call(ctx, val, idx, collection);
                    };

                case 4:
                    return function (accumulator, val, idx, collection) {
                        return fn.call(ctx, accumulator, val, idx, collection);
                    };
            }

            return function () {
                return fn.apply(ctx, arguments);
            };
        };

        return exports;
    })({});

    /* ------------------------------ types ------------------------------ */

    var types = _.types = (function (exports) {
        /* Used for typescript definitions only.
         */

        /* typescript
         * export declare namespace types {
         *     interface Collection<T> {}
         *     interface List<T> extends Collection<T> {
         *         [index: number]: T;
         *         length: number;
         *     }
         *     interface ListIterator<T, TResult> {
         *         (value: T, index: number, list: List<T>): TResult;
         *     }
         *     interface Dictionary<T> extends Collection<T> {
         *         [index: string]: T;
         *     }
         *     interface ObjectIterator<T, TResult> {
         *         (element: T, key: string, list: Dictionary<T>): TResult;
         *     }
         *     interface MemoIterator<T, TResult> {
         *         (prev: TResult, curr: T, index: number, list: List<T>): TResult;
         *     }
         *     interface MemoObjectIterator<T, TResult> {
         *         (prev: TResult, curr: T, key: string, list: Dictionary<T>): TResult;
         *     }
         * }
         * export declare const types: {}
         */
        exports = {};

        return exports;
    })({});

    /* ------------------------------ upperFirst ------------------------------ */

    var upperFirst = _.upperFirst = (function (exports) {
        /* Convert the first character of string to upper case.
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |str   |string|String to convert|
         * |return|string|Converted string |
         */

        /* example
         * upperFirst('red'); // -> Red
         */

        /* typescript
         * export declare function upperFirst(str: string): string;
         */
        exports = function exports(str) {
            if (str.length < 1) return str;
            return str[0].toUpperCase() + str.slice(1);
        };

        return exports;
    })({});

    /* ------------------------------ endWith ------------------------------ */

    var endWith = _.endWith = (function (exports) {
        /* Check if string ends with the given target string.
         *
         * |Name  |Type   |Desc                           |
         * |------|-------|-------------------------------|
         * |str   |string |The string to search           |
         * |suffix|string |String suffix                  |
         * |return|boolean|True if string ends with target|
         */

        /* example
         * endWith('ab', 'b'); // -> true
         */

        /* typescript
         * export declare function endWith(str: string, suffix: string): boolean;
         */
        exports = function exports(str, suffix) {
            var idx = str.length - suffix.length;
            return idx >= 0 && str.indexOf(suffix, idx) === idx;
        };

        return exports;
    })({});

    /* ------------------------------ escape ------------------------------ */

    var escape = _.escape = (function (exports) {
        /* Escapes a string for insertion into HTML, replacing &, <, >, ", `, and ' characters.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |str   |string|String to escape|
         * |return|string|Escaped string  |
         */

        /* example
         * escape('You & Me'); // -> 'You &amp; Me'
         */

        /* typescript
         * export declare function escape(str: string): string;
         */

        /* dependencies
         * keys 
         */

        exports = function exports(str) {
            return regTest.test(str) ? str.replace(regReplace, replaceFn) : str;
        };

        var map = (exports.map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        });
        var regSrc = '(?:' + keys(map).join('|') + ')',
            regTest = new RegExp(regSrc),
            regReplace = new RegExp(regSrc, 'g');

        function replaceFn(match) {
            return map[match];
        }

        return exports;
    })({});

    /* ------------------------------ escapeJsStr ------------------------------ */

    _.escapeJsStr = (function (exports) {
        /* Escape string to be a valid JavaScript string literal between quotes.
         *
         * http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |str   |string|String to escape|
         * |return|string|Escaped string  |
         */

        /* example
         * escapeJsStr('\"\n'); // -> '\\"\\\\n'
         */

        /* typescript
         * export declare function escapeJsStr(str: string): string;
         */

        /* dependencies
         * toStr 
         */

        exports = function exports(str) {
            return toStr(str).replace(regEscapeChars, function (_char) {
                switch (_char) {
                    case '"':
                    case "'":
                    case '\\':
                        return '\\' + _char;

                    case '\n':
                        return '\\n';

                    case '\r':
                        return '\\r';
                    // Line separator

                    case '\u2028':
                        return '\\u2028';
                    // Paragraph separator

                    case '\u2029':
                        return '\\u2029';
                }
            });
        };

        var regEscapeChars = /["'\\\n\r\u2028\u2029]/g;

        return exports;
    })({});

    /* ------------------------------ escapeRegExp ------------------------------ */

    var escapeRegExp = _.escapeRegExp = (function (exports) {
        /* Escape special chars to be used as literals in RegExp constructors.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |str   |string|String to escape|
         * |return|string|Escaped string  |
         */

        /* example
         * escapeRegExp('[licia]'); // -> '\\[licia\\]'
         */

        /* typescript
         * export declare function escapeRegExp(str: string): string;
         */
        exports = function exports(str) {
            return str.replace(/\W/g, '\\$&');
        };

        return exports;
    })({});

    /* ------------------------------ memoize ------------------------------ */

    var memoize = _.memoize = (function (exports) {
        /* Memoize a given function by caching the computed result.
         *
         * |Name    |Type    |Desc                                |
         * |--------|--------|------------------------------------|
         * |fn      |function|Function to have its output memoized|
         * |[hashFn]|function|Function to create cache key        |
         * |return  |function|New memoized function               |
         */

        /* example
         * var fibonacci = memoize(function(n) {
         *     return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
         * });
         */

        /* typescript
         * export declare function memoize(fn: Function, hashFn?: Function): Function;
         */

        /* dependencies
         * has 
         */

        exports = function exports(fn, hashFn) {
            var memoize = function memoize(key) {
                var cache = memoize.cache,
                    address = '' + (hashFn ? hashFn.apply(this, arguments) : key);
                if (!has(cache, address)) cache[address] = fn.apply(this, arguments);
                return cache[address];
            };

            memoize.cache = {};
            return memoize;
        };

        return exports;
    })({});

    /* ------------------------------ fibonacci ------------------------------ */

    _.fibonacci = (function (exports) {
        /* Calculate fibonacci number.
         *
         * |Name  |Type  |Desc                       |
         * |------|------|---------------------------|
         * |n     |number|Index of fibonacci sequence|
         * |return|number|Expected fibonacci number  |
         */

        /* example
         * fibonacci(1); // -> 1
         * fibonacci(3); // -> 2
         */

        /* typescript
         * export declare function fibonacci(n: number): number;
         */

        /* dependencies
         * memoize 
         */

        exports = memoize(function (n) {
            return n < 2 ? n : exports(n - 1) + exports(n - 2);
        });

        return exports;
    })({});

    /* ------------------------------ fileSize ------------------------------ */

    _.fileSize = (function (exports) {
        /* Turn bytes into human readable file size.
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |bytes |number|File bytes        |
         * |return|string|Readable file size|
         */

        /* example
         * fileSize(5); // -> '5'
         * fileSize(1500); // -> '1.46K'
         * fileSize(1500000); // -> '1.43M'
         * fileSize(1500000000); // -> '1.4G'
         * fileSize(1500000000000); // -> '1.36T'
         */

        /* typescript
         * export declare function fileSize(bytes: number): string;
         */
        exports = function exports(bytes) {
            if (bytes <= 0) return '0';
            var suffixIdx = Math.floor(Math.log(bytes) / Math.log(1024)),
                val = bytes / Math.pow(2, suffixIdx * 10);
            return +val.toFixed(2) + suffixList[suffixIdx];
        };

        var suffixList = ['', 'K', 'M', 'G', 'T'];

        return exports;
    })({});

    /* ------------------------------ fill ------------------------------ */

    _.fill = (function (exports) {
        /* Fill elements of array with value.
         *
         * |Name          |Type  |Desc                    |
         * |--------------|------|------------------------|
         * |list          |array |Array to fill           |
         * |value         |*     |Value to fill array with|
         * |start=0       |number|Start position          |
         * |end=arr.length|number|End position            |
         * |return        |array |Filled array            |
         */

        /* example
         * fill([1, 2, 3], '*'); // -> ['*', '*', '*']
         * fill([1, 2, 3], '*', 1, 2); // -> [1, '*', 3]
         */

        /* typescript
         * export declare function fill(
         *     list: any[],
         *     value: any,
         *     start?: number,
         *     end?: number
         * ): any[];
         */

        /* dependencies
         * isUndef 
         */

        exports = function exports(arr, val, start, end) {
            var len = arr.length;
            if (!len) return [];
            if (isUndef(end)) end = len;
            if (isUndef(start)) start = 0;

            while (start < end) {
                arr[start++] = val;
            }

            return arr;
        };

        return exports;
    })({});

    /* ------------------------------ stripCmt ------------------------------ */

    var stripCmt = _.stripCmt = (function (exports) {
        /* Strip comments from source code.
         *
         * |Name  |Type  |Desc                 |
         * |------|------|---------------------|
         * |str   |string|Source code          |
         * |return|string|Code without comments|
         */

        /* example
         * stripCmt('// comment \n var a = 5; /* comment2\n * comment3\n *\/'); // -> ' var a = 5; '
         */

        /* typescript
         * export declare function stripCmt(str: string): string;
         */
        exports = function exports(str) {
            str = ('__' + str + '__').split('');
            var mode = {
                singleQuote: false,
                doubleQuote: false,
                regex: false,
                blockComment: false,
                lineComment: false,
                condComp: false
            };

            for (var i = 0, l = str.length; i < l; i++) {
                if (mode.regex) {
                    if (str[i] === '/' && str[i - 1] !== '\\') mode.regex = false;
                    continue;
                }

                if (mode.singleQuote) {
                    if (str[i] === "'" && str[i - 1] !== '\\') mode.singleQuote = false;
                    continue;
                }

                if (mode.doubleQuote) {
                    if (str[i] === '"' && str[i - 1] !== '\\') mode.doubleQuote = false;
                    continue;
                }

                if (mode.blockComment) {
                    if (str[i] === '*' && str[i + 1] === '/') {
                        str[i + 1] = '';
                        mode.blockComment = false;
                    }

                    str[i] = '';
                    continue;
                }

                if (mode.lineComment) {
                    if (str[i + 1] === '\n') mode.lineComment = false;
                    str[i] = '';
                    continue;
                }

                mode.doubleQuote = str[i] === '"';
                mode.singleQuote = str[i] === "'";

                if (str[i] === '/') {
                    if (str[i + 1] === '*') {
                        str[i] = '';
                        mode.blockComment = true;
                        continue;
                    }

                    if (str[i + 1] === '/') {
                        str[i] = '';
                        mode.lineComment = true;
                        continue;
                    }

                    mode.regex = true;
                }
            }

            return str.join('').slice(2, -2);
        };

        return exports;
    })({});

    /* ------------------------------ startWith ------------------------------ */

    var startWith = _.startWith = (function (exports) {
        /* Check if string starts with the given target string.
         *
         * |Name  |Type   |Desc                             |
         * |------|-------|---------------------------------|
         * |str   |string |String to search                 |
         * |prefix|string |String prefix                    |
         * |return|boolean|True if string starts with prefix|
         */

        /* example
         * startWith('ab', 'a'); // -> true
         */

        /* typescript
         * export declare function startWith(str: string, prefix: string): boolean;
         */
        exports = function exports(str, prefix) {
            return str.indexOf(prefix) === 0;
        };

        return exports;
    })({});

    /* ------------------------------ gcd ------------------------------ */

    var gcd = _.gcd = (function (exports) {
        /* Compute the greatest common divisor using Euclid's algorithm.
         *
         * |Name  |Type  |Desc                   |
         * |------|------|-----------------------|
         * |a     |number|Number to calculate    |
         * |b     |number|Number to calculate    |
         * |return|number|Greatest common divisor|
         */

        /* example
         * gcd(121, 44); // -> 11
         */

        /* typescript
         * export declare function gcd(a: number, b: number): number;
         */
        exports = (function (_exports) {
            function exports(_x, _x2) {
                return _exports.apply(this, arguments);
            }

            exports.toString = function () {
                return _exports.toString();
            };

            return exports;
        })(function (a, b) {
            if (b === 0) return a;
            return exports(b, a % b);
        });

        return exports;
    })({});

    /* ------------------------------ precision ------------------------------ */

    var precision = _.precision = (function (exports) {
        /* Find decimal precision of a given number.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |num   |number|Number to check|
         * |return|number|Precision      |
         */

        /* example
         * precision(1.234); // -> 3;
         */

        /* typescript
         * export declare function precision(num: number): number;
         */
        exports = function exports(num) {
            num = num.toExponential().match(regExponential);
            var coefficient = num[1],
                exponent = parseInt(num[2], 10);
            var places = (coefficient.split('.')[1] || '').length;
            var ret = places - exponent;
            return ret < 0 ? 0 : ret;
        };

        var regExponential = /^(-?\d?\.?\d+)e([+-]\d)+/;

        return exports;
    })({});

    /* ------------------------------ fraction ------------------------------ */

    _.fraction = (function (exports) {
        /* Convert number to fraction.
         *
         * |Name  |Type  |Desc                  |
         * |------|------|----------------------|
         * |num   |number|Number to convert     |
         * |return|string|Corresponding fraction|
         */

        /* example
         * fraction(1.2); // -> '6/5'
         */

        /* typescript
         * export declare function fraction(num: number): string;
         */

        /* dependencies
         * gcd precision 
         */

        exports = function exports(num) {
            if (num === 0) return '0';

            var _precision = precision(num);

            _precision = pow(10, _precision);
            var numerator = num * _precision,
                denominator = _precision;

            var _gcd = abs(gcd(numerator, denominator));

            numerator /= _gcd;
            denominator /= _gcd;
            return numerator + '/' + denominator;
        };

        var abs = Math.abs,
            pow = Math.pow;

        return exports;
    })({});

    /* ------------------------------ freezeDeep ------------------------------ */

    _.freezeDeep = (function (exports) {
        /* Recursively use Object.freeze.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |obj   |object|Object to freeze|
         * |return|object|Object passed in|
         */

        /* example
         * var a = {b: {c: 1}};
         * freezeDeep(a);
         * a.b.c = 2;
         * console.log(a); // -> {b: {c: 1}}
         */

        /* typescript
         * export declare function freezeDeep<T>(obj: T): T;
         */

        /* dependencies
         * freeze keys isObj 
         */

        exports = (function (_exports) {
            function exports(_x) {
                return _exports.apply(this, arguments);
            }

            exports.toString = function () {
                return _exports.toString();
            };

            return exports;
        })(function (obj) {
            freeze(obj);
            keys(obj).forEach(function (prop) {
                var val = obj[prop];
                if (isObj(val) && !Object.isFrozen(val)) exports(val);
            });
            return obj;
        });

        return exports;
    })({});

    /* ------------------------------ identity ------------------------------ */

    var identity = _.identity = (function (exports) {
        /* Return the first argument given.
         *
         * |Name  |Type|Desc       |
         * |------|----|-----------|
         * |val   |*   |Any value  |
         * |return|*   |Given value|
         */

        /* example
         * identity('a'); // -> 'a'
         */

        /* typescript
         * export declare function identity<T>(val: T): T;
         */
        exports = function exports(val) {
            return val;
        };

        return exports;
    })({});

    /* ------------------------------ repeat ------------------------------ */

    var repeat = _.repeat = (function (exports) {
        /* Repeat string n-times.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |str   |string|String to repeat|
         * |n     |number|Repeat times    |
         * |return|string|Repeated string |
         */

        /* example
         * repeat('a', 3); // -> 'aaa'
         * repeat('ab', 2); // -> 'abab'
         * repeat('*', 0); // -> ''
         */

        /* typescript
         * export declare function repeat(str: string, n: number): string;
         */
        exports = function exports(str, n) {
            var ret = '';
            if (n < 1) return '';

            while (n > 0) {
                if (n & 1) ret += str;
                n >>= 1;
                str += str;
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ lpad ------------------------------ */

    var lpad = _.lpad = (function (exports) {
        /* Pad string on the left side if it's shorter than length.
         *
         * |Name   |Type  |Desc                  |
         * |-------|------|----------------------|
         * |str    |string|String to pad         |
         * |len    |number|Padding length        |
         * |[chars]|string|String used as padding|
         * |return |string|Resulted string       |
         */

        /* example
         * lpad('a', 5); // -> '    a'
         * lpad('a', 5, '-'); // -> '----a'
         * lpad('abc', 3, '-'); // -> 'abc'
         * lpad('abc', 5, 'ab'); // -> 'ababc'
         */

        /* typescript
         * export declare function lpad(str: string, len: number, chars?: string): string;
         */

        /* dependencies
         * repeat toStr 
         */

        exports = function exports(str, len, chars) {
            str = toStr(str);
            var strLen = str.length;
            chars = chars || ' ';
            if (strLen < len) str = (repeat(chars, len - strLen) + str).slice(-len);
            return str;
        };

        return exports;
    })({});

    /* ------------------------------ insertionSort ------------------------------ */

    _.insertionSort = (function (exports) {
        /* Insertion sort implementation.
         *
         * |Name  |Type    |Desc         |
         * |------|--------|-------------|
         * |arr   |array   |Array to sort|
         * |[cmp] |function|Comparator   |
         * |return|array   |Sorted array |
         */

        /* example
         * insertionSort([2, 1]); // -> [1, 2]
         */

        /* typescript
         * export declare function insertionSort(arr: any[], cmp?: Function): any[];
         */

        /* dependencies
         * swap 
         */

        exports = function exports(arr, cmp) {
            cmp = cmp || comparator;

            for (var i = 1, len = arr.length; i < len; i++) {
                for (var j = i; j > 0; j--) {
                    if (cmp(arr[j], arr[j - 1]) < 0) {
                        swap(arr, j, j - 1);
                    }
                }
            }

            return arr;
        };

        function comparator(a, b) {
            return a - b;
        }

        return exports;
    })({});

    /* ------------------------------ intersectRange ------------------------------ */

    _.intersectRange = (function (exports) {
        /* Intersect two ranges.
         *
         * |Name  |Type  |Desc                 |
         * |------|------|---------------------|
         * |a     |object|Range a              |
         * |b     |object|Range b              |
         * |return|object|Intersection if exist|
         */

        /* example
         * intersectRange({start: 0, end: 12}, {start: 11, end: 13});
         * // -> {start: 11, end: 12}
         * intersectRange({start: 0, end: 5}, {start: 6, end: 7});
         * // -> undefined
         */

        /* typescript
         * export declare namespace intersectRange {
         *     interface IRange {
         *         start: number;
         *         end: number;
         *     }
         * }
         * export declare function intersectRange(
         *     a: intersectRange.IRange,
         *     b: intersectRange.IRange
         * ): intersectRange.IRange | void;
         */
        exports = function exports(a, b) {
            var min = a.start < b.start ? a : b,
                max = min === a ? b : a;
            if (min.end < max.start) return;
            return {
                start: max.start,
                end: min.end < max.end ? min.end : max.end
            };
        };

        return exports;
    })({});

    /* ------------------------------ isAbsoluteUrl ------------------------------ */

    _.isAbsoluteUrl = (function (exports) {
        /* Check if an url is absolute.
         *
         * |Name  |Type   |Desc                   |
         * |------|-------|-----------------------|
         * |url   |string |Url to check           |
         * |return|boolean|True if url is absolute|
         */

        /* example
         * isAbsoluteUrl('http://www.surunzi.com'); // -> true
         * isAbsoluteUrl('//www.surunzi.com'); // -> false
         * isAbsoluteUrl('surunzi.com'); // -> false
         */

        /* typescript
         * export declare function isAbsoluteUrl(url: string): boolean;
         */
        exports = function exports(url) {
            return regAbsolute.test(url);
        };

        var regAbsolute = /^[a-z][a-z0-9+.-]*:/;

        return exports;
    })({});

    /* ------------------------------ objToStr ------------------------------ */

    var objToStr = _.objToStr = (function (exports) {
        /* Alias of Object.prototype.toString.
         *
         * |Name  |Type  |Desc                                |
         * |------|------|------------------------------------|
         * |val   |*     |Source value                        |
         * |return|string|String representation of given value|
         */

        /* example
         * objToStr(5); // -> '[object Number]'
         */

        /* typescript
         * export declare function objToStr(val: any): string;
         */
        var ObjToStr = Object.prototype.toString;

        exports = function exports(val) {
            return ObjToStr.call(val);
        };

        return exports;
    })({});

    /* ------------------------------ isArgs ------------------------------ */

    var isArgs = _.isArgs = (function (exports) {
        /* Check if value is classified as an arguments object.
         *
         * |Name  |Type   |Desc                                |
         * |------|-------|------------------------------------|
         * |val   |*      |Value to check                      |
         * |return|boolean|True if value is an arguments object|
         */

        /* example
         * (function () {
         *     isArgs(arguments); // -> true
         * })();
         */

        /* typescript
         * export declare function isArgs(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object Arguments]';
        };

        return exports;
    })({});

    /* ------------------------------ isArr ------------------------------ */

    var isArr = _.isArr = (function (exports) {
        /* Check if value is an `Array` object.
         *
         * |Name  |Type   |Desc                              |
         * |------|-------|----------------------------------|
         * |val   |*      |Value to check                    |
         * |return|boolean|True if value is an `Array` object|
         */

        /* example
         * isArr([]); // -> true
         * isArr({}); // -> false
         */

        /* typescript
         * export declare function isArr(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports =
            Array.isArray ||
            function (val) {
                return objToStr(val) === '[object Array]';
            };

        return exports;
    })({});

    /* ------------------------------ castPath ------------------------------ */

    var castPath = _.castPath = (function (exports) {
        /* Cast value into a property path array.
         *
         * |Name  |Type        |Desc               |
         * |------|------------|-------------------|
         * |path  |string array|Value to inspect   |
         * |[obj] |object      |Object to query    |
         * |return|array       |Property path array|
         */

        /* example
         * castPath('a.b.c'); // -> ['a', 'b', 'c']
         * castPath(['a']); // -> ['a']
         * castPath('a[0].b'); // -> ['a', '0', 'b']
         * castPath('a.b.c', {'a.b.c': true}); // -> ['a.b.c']
         */

        /* typescript
         * export declare function castPath(path: string | string[], obj?: any): string[];
         */

        /* dependencies
         * has isArr 
         */

        exports = function exports(str, obj) {
            if (isArr(str)) return str;
            if (obj && has(obj, str)) return [str];
            var ret = [];
            str.replace(regPropName, function (match, number, quote, str) {
                ret.push(quote ? str.replace(regEscapeChar, '$1') : number || match);
            });
            return ret;
        }; // Lodash _stringToPath

        var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            regEscapeChar = /\\(\\)?/g;

        return exports;
    })({});

    /* ------------------------------ safeDel ------------------------------ */

    var safeDel = _.safeDel = (function (exports) {
        /* Delete object property.
         *
         * |Name  |Type        |Desc                      |
         * |------|------------|--------------------------|
         * |obj   |object      |Object to query           |
         * |path  |array string|Path of property to delete|
         * |return|*           |Deleted value or undefined|
         */

        /* example
         * var obj = {a: {aa: {aaa: 1}}};
         * safeDel(obj, 'a.aa.aaa'); // -> 1
         * safeDel(obj, ['a', 'aa']); // -> {}
         * safeDel(obj, 'a.b'); // -> undefined
         */

        /* typescript
         * export declare function safeDel(obj: any, path: string | string[]): any;
         */

        /* dependencies
         * isUndef castPath 
         */

        exports = function exports(obj, path) {
            path = castPath(path, obj);
            var prop, ret;
            /* eslint-disable no-cond-assign */

            while ((prop = path.shift())) {
                ret = obj[prop];
                if (path.length === 0) delete obj[prop];
                obj = ret;
                if (isUndef(obj)) return;
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ safeGet ------------------------------ */

    var safeGet = _.safeGet = (function (exports) {
        /* Get object property, don't throw undefined error.
         *
         * |Name  |Type        |Desc                     |
         * |------|------------|-------------------------|
         * |obj   |object      |Object to query          |
         * |path  |array string|Path of property to get  |
         * |return|*           |Target value or undefined|
         */

        /* example
         * var obj = {a: {aa: {aaa: 1}}};
         * safeGet(obj, 'a.aa.aaa'); // -> 1
         * safeGet(obj, ['a', 'aa']); // -> {aaa: 1}
         * safeGet(obj, 'a.b'); // -> undefined
         */

        /* typescript
         * export declare function safeGet(obj: any, path: string | string[]): any;
         */

        /* dependencies
         * isUndef castPath 
         */

        exports = function exports(obj, path) {
            path = castPath(path, obj);
            var prop;
            prop = path.shift();

            while (!isUndef(prop)) {
                obj = obj[prop];
                if (obj == null) return;
                prop = path.shift();
            }

            return obj;
        };

        return exports;
    })({});

    /* ------------------------------ safeSet ------------------------------ */

    var safeSet = _.safeSet = (function (exports) {
        /* Set value at path of object.
         *
         * If a portion of path doesn't exist, it's created.
         *
         * |Name|Type        |Desc                   |
         * |----|------------|-----------------------|
         * |obj |object      |Object to modify       |
         * |path|array string|Path of property to set|
         * |val |*           |Value to set           |
         */

        /* example
         * var obj = {};
         * safeSet(obj, 'a.aa.aaa', 1); // obj = {a: {aa: {aaa: 1}}}
         * safeSet(obj, ['a', 'aa'], 2); // obj = {a: {aa: 2}}
         * safeSet(obj, 'a.b', 3); // obj = {a: {aa: 2, b: 3}}
         */

        /* typescript
         * export declare function safeSet(obj: any, path: string | string[], val: any): void;
         */

        /* dependencies
         * castPath isUndef 
         */

        exports = function exports(obj, path, val) {
            path = castPath(path, obj);
            var lastProp = path.pop(),
                prop;
            prop = path.shift();

            while (!isUndef(prop)) {
                if (!obj[prop]) obj[prop] = {};
                obj = obj[prop];
                prop = path.shift();
            }

            obj[lastProp] = val;
        };

        return exports;
    })({});

    /* ------------------------------ flatten ------------------------------ */

    var flatten = _.flatten = (function (exports) {
        /* Recursively flatten an array.
         *
         * |Name  |Type |Desc               |
         * |------|-----|-------------------|
         * |arr   |array|Array to flatten   |
         * |return|array|New flattened array|
         */

        /* example
         * flatten(['a', ['b', ['c']], 'd', ['e']]); // -> ['a', 'b', 'c', 'd', 'e']
         */

        /* typescript
         * export declare function flatten(arr: any[]): any[];
         */

        /* dependencies
         * isArr 
         */

        exports = function exports(arr) {
            return flat(arr, []);
        };

        function flat(arr, res) {
            var len = arr.length,
                i = -1,
                cur;

            while (len--) {
                cur = arr[++i];
                isArr(cur) ? flat(cur, res) : res.push(cur);
            }

            return res;
        }

        return exports;
    })({});

    /* ------------------------------ isDate ------------------------------ */

    var isDate = _.isDate = (function (exports) {
        /* Check if value is classified as a Date object.
         *
         * |Name  |Type   |Desc                          |
         * |------|-------|------------------------------|
         * |val   |*      |value to check                |
         * |return|boolean|True if value is a Date object|
         */

        /* example
         * isDate(new Date()); // -> true
         */

        /* typescript
         * export declare function isDate(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object Date]';
        };

        return exports;
    })({});

    /* ------------------------------ isFn ------------------------------ */

    var isFn = _.isFn = (function (exports) {
        /* Check if value is a function.
         *
         * |Name  |Type   |Desc                       |
         * |------|-------|---------------------------|
         * |val   |*      |Value to check             |
         * |return|boolean|True if value is a function|
         *
         * Generator function is also classified as true.
         */

        /* example
         * isFn(function() {}); // -> true
         * isFn(function*() {}); // -> true
         */

        /* typescript
         * export declare function isFn(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            var objStr = objToStr(val);
            return (
                objStr === '[object Function]' ||
                objStr === '[object GeneratorFunction]'
            );
        };

        return exports;
    })({});

    /* ------------------------------ isMiniProgram ------------------------------ */

    var isMiniProgram = _.isMiniProgram = (function (exports) {
        /* Check if running in wechat mini program.
         */

        /* example
         * console.log(isMiniProgram); // -> true if running in mini program.
         */

        /* typescript
         * export declare const isMiniProgram: boolean;
         */

        /* dependencies
         * isFn 
         */
        /* eslint-disable no-undef */

        exports = typeof wx !== 'undefined' && isFn(wx.openLocation);

        return exports;
    })({});

    /* ------------------------------ isPlainObj ------------------------------ */

    var isPlainObj = _.isPlainObj = (function (exports) {
        /* Check if value is an object created by Object constructor.
         *
         * |Name  |Type   |Desc                           |
         * |------|-------|-------------------------------|
         * |val   |*      |Value to check                 |
         * |return|boolean|True if value is a plain object|
         */

        /* example
         * isPlainObj({}); // -> true
         * isPlainObj([]); // -> false
         * isPlainObj(function () {}); // -> false
         */

        /* typescript
         * export declare function isPlainObj(val: any): boolean;
         */

        /* dependencies
         * isObj isArr isFn has 
         */

        exports = function exports(val) {
            if (!isObj(val)) return false;
            var ctor = val.constructor;
            if (!isFn(ctor)) return false;
            if (!has(ctor.prototype, 'isPrototypeOf')) return false;
            return !isArr(val) && !isFn(val);
        };

        return exports;
    })({});

    /* ------------------------------ isNode ------------------------------ */

    var isNode = _.isNode = (function (exports) {
        /* Check if running in node.
         */

        /* example
         * console.log(isNode); // -> true if running in node
         */

        /* typescript
         * export declare const isNode: boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports =
            typeof process !== 'undefined' && objToStr(process) === '[object process]';

        return exports;
    })({});

    /* ------------------------------ isNum ------------------------------ */

    var isNum = _.isNum = (function (exports) {
        /* Check if value is classified as a Number primitive or object.
         *
         * |Name  |Type   |Desc                                 |
         * |------|-------|-------------------------------------|
         * |val   |*      |Value to check                       |
         * |return|boolean|True if value is correctly classified|
         */

        /* example
         * isNum(5); // -> true
         * isNum(5.1); // -> true
         * isNum({}); // -> false
         */

        /* typescript
         * export declare function isNum(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object Number]';
        };

        return exports;
    })({});

    /* ------------------------------ indent ------------------------------ */

    _.indent = (function (exports) {
        /* Indent each line in a string.
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |str   |string|String to indent    |
         * |[char]|string|Character to prepend|
         * |[len] |number|Indent length       |
         * |return|string|Indented string     |
         */

        /* example
         * indent('foo\nbar', ' ', 4); // -> 'foo\n    bar'
         */

        /* typescript
         * export declare function indent(str: string, char?: string, len?: number): string;
         */

        /* dependencies
         * isNum isUndef repeat 
         */

        var regLineBegin = /^(?!\s*$)/gm;

        exports = function exports(str, _char, len) {
            if (isNum(_char)) {
                len = _char;
                _char = ' ';
            }

            if (isUndef(len)) len = 4;
            if (isUndef(_char)) _char = ' ';
            _char = repeat(_char, len);
            return str.replace(regLineBegin, _char);
        };

        return exports;
    })({});

    /* ------------------------------ isArrLike ------------------------------ */

    var isArrLike = _.isArrLike = (function (exports) {
        /* Check if value is array-like.
         *
         * |Name  |Type   |Desc                       |
         * |------|-------|---------------------------|
         * |val   |*      |Value to check             |
         * |return|boolean|True if value is array like|
         *
         * Function returns false.
         */

        /* example
         * isArrLike('test'); // -> true
         * isArrLike(document.body.children); // -> true;
         * isArrLike([1, 2, 3]); // -> true
         */

        /* typescript
         * export declare function isArrLike(val: any): boolean;
         */

        /* dependencies
         * isNum isFn 
         */

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        exports = function exports(val) {
            if (!val) return false;
            var len = val.length;
            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
        };

        return exports;
    })({});

    /* ------------------------------ each ------------------------------ */

    var each = _.each = (function (exports) {
        /* Iterate over elements of collection and invokes iterator for each element.
         *
         * |Name    |Type        |Desc                          |
         * |--------|------------|------------------------------|
         * |obj     |object array|Collection to iterate over    |
         * |iterator|function    |Function invoked per iteration|
         * |[ctx]   |*           |Function context              |
         */

        /* example
         * each({'a': 1, 'b': 2}, function (val, key) {});
         */

        /* typescript
         * export declare function each<T>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, void>,
         *     ctx?: any
         * ): types.List<T>;
         * export declare function each<T>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, void>,
         *     ctx?: any
         * ): types.Collection<T>;
         */

        /* dependencies
         * isArrLike keys optimizeCb types 
         */

        exports = function exports(obj, iterator, ctx) {
            iterator = optimizeCb(iterator, ctx);
            var i, len;

            if (isArrLike(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    iterator(obj[i], i, obj);
                }
            } else {
                var _keys = keys(obj);

                for (i = 0, len = _keys.length; i < len; i++) {
                    iterator(obj[_keys[i]], _keys[i], obj);
                }
            }

            return obj;
        };

        return exports;
    })({});

    /* ------------------------------ arrToMap ------------------------------ */

    var arrToMap = _.arrToMap = (function (exports) {
        /* Make an object map using array of strings.
         *
         * |Name    |Type  |Desc            |
         * |--------|------|----------------|
         * |arr     |array |Array of strings|
         * |val=true|*     |Key value       |
         * |return  |object|Object map      |
         */

        /* example
         * const needPx = arrToMap([
         *     'column-count', 'columns', 'font-weight', 'line-weight', 'opacity', 'z-index', 'zoom'
         * ]);
         * const key = 'column-count';
         * let val = '5';
         * if (needPx[key]) val += 'px';
         * console.log(val); // -> '5px'
         */

        /* typescript
         * export declare function arrToMap<T>(
         *     arr: string[],
         *     val?: T
         * ): { [key: string]: T };
         */

        /* dependencies
         * each isUndef isFn 
         */

        exports = function exports(arr, val) {
            if (isUndef(val)) val = true;

            var _isFn = isFn(val);

            var ret = {};
            each(arr, function (key) {
                ret[key] = _isFn ? val(key) : val;
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ createAssigner ------------------------------ */

    var createAssigner = _.createAssigner = (function (exports) {
        /* Used to create extend, extendOwn and defaults.
         *
         * |Name    |Type    |Desc                          |
         * |--------|--------|------------------------------|
         * |keysFn  |function|Function to get object keys   |
         * |defaults|boolean |No override when set to true  |
         * |return  |function|Result function, extend...    |
         */

        /* typescript
         * export declare function createAssigner(keysFn: Function, defaults: boolean): Function;
         */

        /* dependencies
         * isUndef each 
         */

        exports = function exports(keysFn, defaults) {
            return function (obj) {
                each(arguments, function (src, idx) {
                    if (idx === 0) return;
                    var keys = keysFn(src);
                    each(keys, function (key) {
                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                    });
                });
                return obj;
            };
        };

        return exports;
    })({});

    /* ------------------------------ defaults ------------------------------ */

    var defaults = _.defaults = (function (exports) {
        /* Fill in undefined properties in object with the first value present in the following list of defaults objects.
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |obj   |object|Destination object|
         * |*src  |object|Sources objects   |
         * |return|object|Destination object|
         */

        /* example
         * defaults({name: 'RedHood'}, {name: 'Unknown', age: 24}); // -> {name: 'RedHood', age: 24}
         */

        /* typescript
         * export declare function defaults(obj: any, ...src: any[]): any;
         */

        /* dependencies
         * createAssigner allKeys 
         */

        exports = createAssigner(allKeys, true);

        return exports;
    })({});

    /* ------------------------------ extend ------------------------------ */

    var extend = _.extend = (function (exports) {
        /* Copy all of the properties in the source objects over to the destination object.
         *
         * |Name       |Type  |Desc              |
         * |-----------|------|------------------|
         * |destination|object|Destination object|
         * |...sources |object|Sources objects   |
         * |return     |object|Destination object|
         */

        /* example
         * extend({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
         */

        /* typescript
         * export declare function extend(destination: any, ...sources: any[]): any;
         */

        /* dependencies
         * createAssigner allKeys 
         */

        exports = createAssigner(allKeys);

        return exports;
    })({});

    /* ------------------------------ clone ------------------------------ */

    var clone = _.clone = (function (exports) {
        /* Create a shallow-copied clone of the provided plain object.
         *
         * Any nested objects or arrays will be copied by reference, not duplicated.
         *
         * |Name  |Type|Desc          |
         * |------|----|--------------|
         * |val   |*   |Value to clone|
         * |return|*   |Cloned value  |
         */

        /* example
         * clone({name: 'eustia'}); // -> {name: 'eustia'}
         */

        /* typescript
         * export declare function clone<T>(val: T): T;
         */

        /* dependencies
         * isObj isArr extend 
         */

        exports = function exports(obj) {
            if (!isObj(obj)) return obj;
            return isArr(obj) ? obj.slice() : extend({}, obj);
        };

        return exports;
    })({});

    /* ------------------------------ extendOwn ------------------------------ */

    var extendOwn = _.extendOwn = (function (exports) {
        /* Like extend, but only copies own properties over to the destination object.
         *
         * |Name       |Type  |Desc              |
         * |-----------|------|------------------|
         * |destination|object|Destination object|
         * |...sources |object|Sources objects   |
         * |return     |object|Destination object|
         */

        /* example
         * extendOwn({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
         */

        /* typescript
         * export declare function extendOwn(destination: any, ...sources: any[]): any;
         */

        /* dependencies
         * keys createAssigner 
         */

        exports = createAssigner(keys);

        return exports;
    })({});

    /* ------------------------------ easing ------------------------------ */

    var easing = _.easing = (function (exports) {
        /* Easing functions adapted from http://jqueryui.com/ .
         *
         * |Name   |Type  |Desc                  |
         * |-------|------|----------------------|
         * |percent|number|Number between 0 and 1|
         * |return |number|Calculated number     |
         */

        /* example
         * easing.linear(0.5); // -> 0.5
         * easing.inElastic(0.5, 500); // -> 0.03125
         */

        /* typescript
         * export declare const easing: {
         *     linear(percent: number): number;
         *     inQuad(percent: number): number;
         *     outQuad(percent: number): number;
         *     inOutQuad(percent: number): number;
         *     outInQuad(percent: number): number;
         *     inCubic(percent: number): number;
         *     outCubic(percent: number): number;
         *     inQuart(percent: number): number;
         *     outQuart(percent: number): number;
         *     inQuint(percent: number): number;
         *     outQuint(percent: number): number;
         *     inExpo(percent: number): number;
         *     outExpo(percent: number): number;
         *     inSine(percent: number): number;
         *     outSine(percent: number): number;
         *     inCirc(percent: number): number;
         *     outCirc(percent: number): number;
         *     inElastic(percent: number, elasticity?: number): number;
         *     outElastic(percent: number, elasticity?: number): number;
         *     inBack(percent: number): number;
         *     outBack(percent: number): number;
         *     inOutBack(percent: number): number;
         *     outInBack(percent: number): number;
         *     inBounce(percent: number): number;
         *     outBounce(percent: number): number;
         * };
         */

        /* dependencies
         * each upperFirst 
         */

        exports.linear = function (t) {
            return t;
        };

        var pow = Math.pow,
            sqrt = Math.sqrt,
            sin = Math.sin,
            min = Math.min,
            asin = Math.asin,
            PI = Math.PI;
        var fns = {
            sine: function sine(t) {
                return 1 + sin((PI / 2) * t - PI / 2);
            },
            circ: function circ(t) {
                return 1 - sqrt(1 - t * t);
            },
            elastic: function elastic(t, m) {
                m = m || DEFAULT_ELASTICITY;
                if (t === 0 || t === 1) return t;
                var p = 1 - min(m, 998) / 1000,
                    st = t / 1,
                    st1 = st - 1,
                    s = (p / (2 * PI)) * asin(1);
                return -(pow(2, 10 * st1) * sin(((st1 - s) * (2 * PI)) / p));
            },
            back: function back(t) {
                return t * t * (3 * t - 2);
            },
            bounce: function bounce(t) {
                var pow2,
                    bounce = 4;
                /* eslint-disable no-empty */

                while (t < ((pow2 = pow(2, --bounce)) - 1) / 11) {
                }

                return (
                    1 / pow(4, 3 - bounce) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2)
                );
            }
        };
        each(['quad', 'cubic', 'quart', 'quint', 'expo'], function (name, i) {
            fns[name] = function (t) {
                return pow(t, i + 2);
            };
        });
        var DEFAULT_ELASTICITY = 400;
        each(fns, function (fn, name) {
            name = upperFirst(name);
            exports['in' + name] = fn;

            exports['out' + name] = function (t, m) {
                return 1 - fn(1 - t, m);
            };

            exports['inOut' + name] = function (t, m) {
                return t < 0.5 ? fn(t * 2, m) / 2 : 1 - fn(t * -2 + 2, m) / 2;
            };

            exports['outIn' + name] = function (t, m) {
                return t < 0.5
                    ? (1 - fn(1 - 2 * t, m)) / 2
                    : (fn(t * 2 - 1, m) + 1) / 2;
            };
        });

        return exports;
    })({});

    /* ------------------------------ invert ------------------------------ */

    var invert = _.invert = (function (exports) {
        /* Create an object composed of the inverted keys and values of object.
         *
         * |Name  |Type  |Desc               |
         * |------|------|-------------------|
         * |obj   |object|Object to invert   |
         * |return|object|New inverted object|
         *
         * If object contains duplicate values, subsequent values overwrite property assignments of previous values.
         */

        /* example
         * invert({a: 'b', c: 'd', e: 'f'}); // -> {b: 'a', d: 'c', f: 'e'}
         */

        /* typescript
         * export declare function invert(obj: any): any;
         */

        /* dependencies
         * each 
         */

        exports = function exports(obj) {
            var ret = {};
            each(obj, function (val, key) {
                ret[val] = key;
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ values ------------------------------ */

    var values = _.values = (function (exports) {
        /* Create an array of the own enumerable property values of object.
         *
         * |Name  |Type  |Desc                    |
         * |------|------|------------------------|
         * |obj   |object|Object to query         |
         * |return|array |Array of property values|
         */

        /* example
         * values({one: 1, two: 2}); // -> [1, 2]
         */

        /* typescript
         * export declare function values(obj: any): any[];
         */

        /* dependencies
         * each 
         */

        exports = function exports(obj) {
            var ret = [];
            each(obj, function (val) {
                ret.push(val);
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ contain ------------------------------ */

    var contain = _.contain = (function (exports) {
        /* Check if the value is present in the list.
         *
         * |Name  |Type        |Desc                                |
         * |------|------------|------------------------------------|
         * |target|array object|Target object                       |
         * |value |*           |Value to check                      |
         * |return|boolean     |True if value is present in the list|
         */

        /* example
         * contain([1, 2, 3], 1); // -> true
         * contain({a: 1, b: 2}, 1); // -> true
         */

        /* typescript
         * export declare function contain(arr: any[] | {}, val: any): boolean;
         */

        /* dependencies
         * idxOf isArrLike values 
         */

        exports = function exports(arr, val) {
            if (!isArrLike(arr)) arr = values(arr);
            return idxOf(arr, val) >= 0;
        };

        return exports;
    })({});

    /* ------------------------------ isStr ------------------------------ */

    var isStr = _.isStr = (function (exports) {
        /* Check if value is a string primitive.
         *
         * |Name  |Type   |Desc                               |
         * |------|-------|-----------------------------------|
         * |val   |*      |Value to check                     |
         * |return|boolean|True if value is a string primitive|
         */

        /* example
         * isStr('licia'); // -> true
         */

        /* typescript
         * export declare function isStr(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object String]';
        };

        return exports;
    })({});

    /* ------------------------------ className ------------------------------ */

    _.className = (function (exports) {
        /* Utility for conditionally joining class names.
         *
         * |Name    |Type               |Desc              |
         * |--------|-------------------|------------------|
         * |...class|string object array|Class names       |
         * |return  |string             |Joined class names|
         */

        /* example
         * className('a', 'b', 'c'); // -> 'a b c'
         * className('a', false, 'b', 0, 1, 'c'); // -> 'a b 1 c'
         * className('a', ['b', 'c']); // -> 'a b c'
         * className('a', {b: false, c: true}); // -> 'a c'
         * className('a', ['b', 'c', {d: true, e: false}]); // -> 'a b c d';
         */

        /* typescript
         * export declare function className(...arr: any[]): string;
         */

        /* dependencies
         * each isStr isNum isArr isObj 
         */

        exports = (function (_exports) {
            function exports() {
                return _exports.apply(this, arguments);
            }

            exports.toString = function () {
                return _exports.toString();
            };

            return exports;
        })(function () {
            var ret = [];
            each(arguments, function (arg) {
                if (!arg) return;
                if (isStr(arg) || isNum(arg)) return ret.push(arg);
                if (isArr(arg)) return ret.push(exports.apply(null, arg));
                if (!isObj(arg)) return;
                each(arg, function (val, key) {
                    if (val) ret.push(key);
                });
            });
            return ret.join(' ');
        });

        return exports;
    })({});

    /* ------------------------------ dateFormat ------------------------------ */

    var dateFormat = _.dateFormat = (function (exports) {
        /* Simple but extremely useful date format function.
         *
         * |Name         |Type   |Desc                 |
         * |-------------|-------|---------------------|
         * |date=new Date|Date   |Date object to format|
         * |mask         |string |Format mask          |
         * |utc=false    |boolean|UTC or not           |
         * |gmt=false    |boolean|GMT or not           |
         *
         * |Mask|Description                                                      |
         * |----|-----------------------------------------------------------------|
         * |d   |Day of the month as digits; no leading zero for single-digit days|
         * |dd  |Day of the month as digits; leading zero for single-digit days   |
         * |ddd |Day of the week as a three-letter abbreviation                   |
         * |dddd|Day of the week as its full name                                 |
         * |m   |Month as digits; no leading zero for single-digit months         |
         * |mm  |Month as digits; leading zero for single-digit months            |
         * |mmm |Month as a three-letter abbreviation                             |
         * |mmmm|Month as its full name                                           |
         * |yy  |Year as last two digits; leading zero for years less than 10     |
         * |yyyy|Year represented by four digits                                  |
         * |h   |Hours; no leading zero for single-digit hours (12-hour clock)    |
         * |hh  |Hours; leading zero for single-digit hours (12-hour clock)       |
         * |H   |Hours; no leading zero for single-digit hours (24-hour clock)    |
         * |HH  |Hours; leading zero for single-digit hours (24-hour clock)       |
         * |M   |Minutes; no leading zero for single-digit minutes                |
         * |MM  |Minutes; leading zero for single-digit minutes                   |
         * |s   |Seconds; no leading zero for single-digit seconds                |
         * |ss  |Seconds; leading zero for single-digit seconds                   |
         * |l L |Milliseconds. l gives 3 digits. L gives 2 digits                 |
         * |t   |Lowercase, single-character time marker string: a or p           |
         * |tt  |Lowercase, two-character time marker string: am or pm            |
         * |T   |Uppercase, single-character time marker string: A or P           |
         * |TT  |Uppercase, two-character time marker string: AM or PM            |
         * |Z   |US timezone abbreviation, e.g. EST or MDT                        |
         * |o   |GMT/UTC timezone offset, e.g. -0500 or +0230                     |
         * |S   |The date's ordinal suffix (st, nd, rd, or th)                    |
         * |UTC:|Must be the first four characters of the mask                    |
         */

        /* example
         * dateFormat('isoDate'); // -> 2016-11-19
         * dateFormat('yyyy-mm-dd HH:MM:ss'); // -> 2016-11-19 19:00:04
         * dateFormat(new Date(), 'yyyy-mm-dd'); // -> 2016-11-19
         */

        /* typescript
         * export declare function dateFormat(
         *     date: Date,
         *     mask: string,
         *     utc?: boolean,
         *     gmt?: boolean
         * ): string;
         * export declare function dateFormat(
         *     mask: string,
         *     utc?: boolean,
         *     gmt?: boolean
         * ): string;
         */

        /* dependencies
         * isStr isDate toStr lpad 
         */

        exports = (function (_exports) {
            function exports(_x, _x2, _x3, _x4) {
                return _exports.apply(this, arguments);
            }

            exports.toString = function () {
                return _exports.toString();
            };

            return exports;
        })(function (date, mask, utc, gmt) {
            if (arguments.length === 1 && isStr(date) && !regNum.test(date)) {
                mask = date;
                date = undefined;
            }

            date = date || new Date();
            if (!isDate(date)) date = new Date(date);
            mask = toStr(exports.masks[mask] || mask || exports.masks['default']);
            var maskSlice = mask.slice(0, 4);

            if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
                mask = mask.slice(4);
                utc = true;
                if (maskSlice === 'GMT:') gmt = true;
            }

            var prefix = utc ? 'getUTC' : 'get',
                d = date[prefix + 'Date'](),
                D = date[prefix + 'Day'](),
                m = date[prefix + 'Month'](),
                y = date[prefix + 'FullYear'](),
                H = date[prefix + 'Hours'](),
                M = date[prefix + 'Minutes'](),
                s = date[prefix + 'Seconds'](),
                L = date[prefix + 'Milliseconds'](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: padZero(d),
                    ddd: exports.i18n.dayNames[D],
                    dddd: exports.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: padZero(m + 1),
                    mmm: exports.i18n.monthNames[m],
                    mmmm: exports.i18n.monthNames[m + 12],
                    yy: toStr(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: padZero(H % 12 || 12),
                    H: H,
                    HH: padZero(H),
                    M: M,
                    MM: padZero(M),
                    s: s,
                    ss: padZero(s),
                    l: padZero(L, 3),
                    L: padZero(Math.round(L / 10)),
                    t: H < 12 ? 'a' : 'p',
                    tt: H < 12 ? 'am' : 'pm',
                    T: H < 12 ? 'A' : 'P',
                    TT: H < 12 ? 'AM' : 'PM',
                    Z: gmt
                        ? 'GMT'
                        : utc
                            ? 'UTC'
                            : (toStr(date).match(regTimezone) || [''])
                                .pop()
                                .replace(regTimezoneClip, ''),
                    o:
                        (o > 0 ? '-' : '+') +
                        padZero(
                            Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60),
                            4
                        ),
                    S: ['th', 'st', 'nd', 'rd'][
                        d % 10 > 3 ? 0 : (((d % 100) - (d % 10) != 10) * d) % 10
                        ]
                };
            return mask.replace(regToken, function (match) {
                if (match in flags) return flags[match];
                return match.slice(1, match.length - 1);
            });
        });

        function padZero(str, len) {
            return lpad(toStr(str), len || 2, '0');
        }

        var regToken = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g,
            regTimezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            regNum = /\d/,
            regTimezoneClip = /[^-+\dA-Z]/g;
        exports.masks = {
            default: 'ddd mmm dd yyyy HH:MM:ss',
            shortDate: 'm/d/yy',
            mediumDate: 'mmm d, yyyy',
            longDate: 'mmmm d, yyyy',
            fullDate: 'dddd, mmmm d, yyyy',
            shortTime: 'h:MM TT',
            mediumTime: 'h:MM:ss TT',
            longTime: 'h:MM:ss TT Z',
            isoDate: 'yyyy-mm-dd',
            isoTime: 'HH:MM:ss',
            isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
            expiresHeaderFormat: 'ddd, dd mmm yyyy HH:MM:ss Z'
        };
        exports.i18n = {
            dayNames: [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ],
            monthNames: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
        };

        return exports;
    })({});

    /* ------------------------------ defineProp ------------------------------ */

    var defineProp = _.defineProp = (function (exports) {
        /* Shortcut for Object.defineProperty(defineProperties).
         *
         * |Name      |Type  |Desc               |
         * |----------|------|-------------------|
         * |obj       |object|Object to define   |
         * |prop      |string|Property path      |
         * |descriptor|object|Property descriptor|
         * |return    |object|Object itself      |
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |obj   |object|Object to define    |
         * |prop  |object|Property descriptors|
         * |return|object|Object itself       |
         */

        /* example
         * const obj = {b: {c: 3}, d: 4, e: 5};
         * defineProp(obj, 'a', {
         *     get: function () {
         *         return this.e * 2;
         *     }
         * });
         * // obj.a is equal to 10
         * defineProp(obj, 'b.c', {
         *     set: (function (val) {
         *         // this is pointed to obj.b
         *         this.e = val;
         *     }).bind(obj)
         * });
         * obj.b.c = 2;
         * // obj.a is equal to 4
         *
         * const obj2 = {a: 1, b: 2, c: 3};
         * defineProp(obj2, {
         *     a: {
         *         get: function () {
         *             return this.c;
         *         }
         *     },
         *     b: {
         *         set: function (val) {
         *             this.c = val / 2;
         *         }
         *     }
         * });
         * // obj2.a is equal to 3
         * obj2.b = 4;
         * // obj2.a is equal to 2
         */

        /* typescript
         * export declare function defineProp<T>(
         *     obj: T,
         *     prop: string,
         *     descriptor: PropertyDescriptor
         * ): T;
         * export declare function defineProp<T>(obj: T, descriptor: PropertyDescriptorMap): T;
         */

        /* dependencies
         * castPath isStr isObj each 
         */

        exports = function exports(obj, prop, descriptor) {
            if (isStr(prop)) {
                defineProp(obj, prop, descriptor);
            } else if (isObj(prop)) {
                each(prop, function (descriptor, prop) {
                    defineProp(obj, prop, descriptor);
                });
            }

            return obj;
        };

        function defineProp(obj, prop, descriptor) {
            var path = castPath(prop, obj),
                lastProp = path.pop();
            /* eslint-disable no-cond-assign */

            while ((prop = path.shift())) {
                if (!obj[prop]) obj[prop] = {};
                obj = obj[prop];
            }

            Object.defineProperty(obj, lastProp, descriptor);
        }

        return exports;
    })({});

    /* ------------------------------ isEmpty ------------------------------ */

    var isEmpty = _.isEmpty = (function (exports) {
        /* Check if value is an empty object or array.
         *
         * |Name  |Type   |Desc                  |
         * |------|-------|----------------------|
         * |val   |*      |Value to check        |
         * |return|boolean|True if value is empty|
         */

        /* example
         * isEmpty([]); // -> true
         * isEmpty({}); // -> true
         * isEmpty(''); // -> true
         */

        /* typescript
         * export declare function isEmpty(val: any): boolean;
         */

        /* dependencies
         * isArrLike isArr isStr isArgs keys 
         */

        exports = function exports(val) {
            if (val == null) return true;

            if (isArrLike(val) && (isArr(val) || isStr(val) || isArgs(val))) {
                return val.length === 0;
            }

            return keys(val).length === 0;
        };

        return exports;
    })({});

    /* ------------------------------ toNum ------------------------------ */

    var toNum = _.toNum = (function (exports) {
        /* Convert value to a number.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |val   |*     |Value to process|
         * |return|number|Resulted number |
         */

        /* example
         * toNum('5'); // -> 5
         */

        /* typescript
         * export declare function toNum(val: any): number;
         */

        /* dependencies
         * isNum isObj isFn isStr 
         */

        exports = function exports(val) {
            if (isNum(val)) return val;

            if (isObj(val)) {
                var temp = isFn(val.valueOf) ? val.valueOf() : val;
                val = isObj(temp) ? temp + '' : temp;
            }

            if (!isStr(val)) return val === 0 ? val : +val;
            return +val;
        };

        return exports;
    })({});

    /* ------------------------------ toInt ------------------------------ */

    var toInt = _.toInt = (function (exports) {
        /* Convert value to an integer.
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |val   |*     |Value to convert |
         * |return|number|Converted integer|
         */

        /* example
         * toInt(1.1); // -> 1
         * toInt(undefined); // -> 0
         */

        /* typescript
         * export declare function toInt(val: any): number;
         */

        /* dependencies
         * toNum 
         */

        exports = function exports(val) {
            if (!val) return val === 0 ? val : 0;
            val = toNum(val);
            return val - (val % 1);
        };

        return exports;
    })({});

    /* ------------------------------ cmpVersion ------------------------------ */

    _.cmpVersion = (function (exports) {
        /* Compare version strings.
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |v1    |string|Version to compare|
         * |v2    |string|Version to compare|
         * |return|number|Comparison result |
         */

        /* example
         * cmpVersion('1.1.8', '1.0.4'); // -> 1
         * cmpVersion('1.0.2', '1.0.2'); // -> 0
         * cmpVersion('2.0', '2.0.0'); // -> 0
         * cmpVersion('3.0.1', '3.0.0.2'); // -> 1
         * cmpVersion('1.1.1', '1.2.3'); // -> -1
         */

        /* typescript
         * export declare function cmpVersion(v1: string, v2: string): number;
         */

        /* dependencies
         * toInt max 
         */

        exports = function exports(v1, v2) {
            v1 = v1.split('.');
            v2 = v2.split('.');
            var len = max(v1.length, v2.length);

            for (var i = 0; i < len; i++) {
                var num1 = toInt(v1[i]),
                    num2 = toInt(v2[i]);
                if (num1 > num2) return 1;
                if (num1 < num2) return -1;
            }

            return 0;
        };

        return exports;
    })({});

    /* ------------------------------ detectBrowser ------------------------------ */

    _.detectBrowser = (function (exports) {
        /* Detect browser info using ua.
         *
         * |Name                  |Type  |Desc                              |
         * |----------------------|------|----------------------------------|
         * |ua=navigator.userAgent|string|Browser userAgent                 |
         * |return                |object|Object containing name and version|
         *
         * Browsers supported: ie, chrome, edge, firefox, opera, safari, ios(mobile safari), android(android browser)
         */

        /* example
         * var browser = detectBrowser();
         * if (browser.name === 'ie' && browser.version < 9) {
         *     // Do something about old IE...
         * }
         */

        /* typescript
         * export declare namespace detectBrowser {
         *     interface IBrowser {
         *         name: string;
         *         version: number;
         *     }
         * }
         * export declare function detectBrowser(ua?: string): detectBrowser.IBrowser;
         */

        /* dependencies
         * isBrowser toInt keys 
         */

        exports = function exports(ua) {
            ua = ua || (isBrowser ? navigator.userAgent : '');
            ua = ua.toLowerCase();
            var ieVer = getVer(ua, 'msie ');
            if (ieVer)
                return {
                    version: ieVer,
                    name: 'ie'
                };
            if (regIe11.test(ua))
                return {
                    version: 11,
                    name: 'ie'
                };

            for (var i = 0, len = browsers.length; i < len; i++) {
                var name = browsers[i],
                    match = ua.match(regBrowsers[name]);
                if (match == null) continue;
                var version = toInt(match[1].split('.')[0]);
                if (name === 'opera') version = getVer(ua, 'version/') || version;
                return {
                    name: name,
                    version: version
                };
            }

            return {
                name: 'unknown',
                version: -1
            };
        };

        var regBrowsers = {
            edge: /edge\/([0-9._]+)/,
            firefox: /firefox\/([0-9.]+)(?:\s|$)/,
            opera: /opera\/([0-9.]+)(?:\s|$)/,
            android: /android\s([0-9.]+)/,
            ios: /version\/([0-9._]+).*mobile.*safari.*/,
            safari: /version\/([0-9._]+).*safari/,
            chrome: /(?!chrom.*opr)chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/
        };
        var regIe11 = /trident\/7\./,
            browsers = keys(regBrowsers);

        function getVer(ua, mark) {
            var idx = ua.indexOf(mark);
            if (idx > -1)
                return toInt(ua.substring(idx + mark.length, ua.indexOf('.', idx)));
        }

        return exports;
    })({});

    /* ------------------------------ format ------------------------------ */

    _.format = (function (exports) {
        /* Format string in a printf-like format.
         *
         * |Name     |Type  |Desc                               |
         * |---------|------|-----------------------------------|
         * |str      |string|String to format                   |
         * |...values|*     |Values to replace format specifiers|
         * |return   |string|Formatted string                   |
         *
         * ### Format Specifiers
         *
         * |Specifier|Desc                |
         * |---------|--------------------|
         * |%s       |String              |
         * |%d, %i   |Integer             |
         * |%f       |Floating point value|
         * |%o       |Object              |
         */

        /* example
         * format('%s_%s', 'foo', 'bar'); // -> 'foo bar'
         */

        /* typescript
         * export declare function format(str: string, ...values: any[]): string;
         */

        /* dependencies
         * restArgs toInt toNum toStr 
         */

        exports = restArgs(function (str, values) {
            var ret = '';

            for (var i = 0, len = str.length; i < len; i++) {
                var c = str[i];

                if (c !== '%' || values.length === 0) {
                    ret += c;
                    continue;
                }

                i++;
                var val = values.shift();

                switch (str[i]) {
                    case 'i':
                    case 'd':
                        ret += toInt(val);
                        break;

                    case 'f':
                        ret += toNum(val);
                        break;

                    case 's':
                        ret += toStr(val);
                        break;

                    case 'o':
                        ret += tryStringify(val);
                        break;

                    default:
                        i--;
                        values.unshift(val);
                        ret += c;
                }
            }

            return ret;
        });

        function tryStringify(obj) {
            try {
                return JSON.stringify(obj);
            } catch (err) {
                return '[Error Stringify]';
            }
        }

        return exports;
    })({});

    /* ------------------------------ isArrBuffer ------------------------------ */

    _.isArrBuffer = (function (exports) {
        /* Check if value is an ArrayBuffer.
         *
         * |Name  |Type   |Desc                           |
         * |------|-------|-------------------------------|
         * |val   |*      |Value to check                 |
         * |return|boolean|True if value is an ArrayBuffer|
         */

        /* example
         * isArrBuffer(new ArrayBuffer(8)); // -> true
         */

        /* typescript
         * export declare function isArrBuffer(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object ArrayBuffer]';
        };

        return exports;
    })({});

    /* ------------------------------ isClose ------------------------------ */

    _.isClose = (function (exports) {
        /* Check if values are close(almost equal) to each other.
         *
         * `abs(a-b) <= max(relTol * max(abs(a), abs(b)), absTol)`
         *
         * |Name       |Type   |Desc                    |
         * |-----------|-------|------------------------|
         * |a          |number |Number to compare       |
         * |b          |number |Number to compare       |
         * |relTol=1e-9|number |Relative tolerance      |
         * |absTol=0   |number |Absolute tolerance      |
         * |return     |boolean|True if values are close|
         */

        /* example
         * isClose(1, 1.0000000001); // -> true
         * isClose(1, 2); // -> false
         * isClose(1, 1.2, 0.3); // -> true
         * isClose(1, 1.2, 0.1, 0.3); // -> true
         */

        /* typescript
         * export declare function isClose(
         *     a: number,
         *     b: number,
         *     relTol?: number,
         *     absTol?: number
         * ): boolean;
         */

        /* dependencies
         * isNum 
         */

        exports = function exports(a, b, relTol, absTol) {
            if (!isNum(relTol)) relTol = 1e-9;
            if (!isNum(absTol)) absTol = 0;
            return abs(a - b) <= max(relTol * max(abs(a), abs(b)), absTol);
        };

        var abs = Math.abs,
            max = Math.max;

        return exports;
    })({});

    /* ------------------------------ isEmail ------------------------------ */

    _.isEmail = (function (exports) {
        /* Loosely validate an email address.
         *
         * |Name  |Type   |Desc                                 |
         * |------|-------|-------------------------------------|
         * |val   |string |Value to check                       |
         * |return|boolean|True if value is an email like string|
         */

        /* example
         * isEmail('surunzi@foxmail.com'); // -> true
         */

        /* typescript
         * export declare function isEmail(val: string): boolean;
         */
        exports = function exports(val) {
            return regEmail.test(val);
        };

        var regEmail = /.+@.+\..+/;

        return exports;
    })({});

    /* ------------------------------ isEqual ------------------------------ */

    _.isEqual = (function (exports) {
        function _typeof(obj) {
            if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                        ? 'symbol'
                        : typeof obj;
                };
            }
            return _typeof(obj);
        }

        /* Performs an optimized deep comparison between the two objects, to determine if they should be considered equal.
         *
         * |Name  |Type   |Desc                         |
         * |------|-------|-----------------------------|
         * |val   |*      |Value to compare             |
         * |other |*      |Other value to compare       |
         * |return|boolean|True if values are equivalent|
         */

        /* example
         * isEqual([1, 2, 3], [1, 2, 3]); // -> true
         */

        /* typescript
         * export declare function isEqual(val: any, other: any): boolean;
         */

        /* dependencies
         * isFn has keys 
         */

        exports = function exports(a, b) {
            return eq(a, b);
        };

        function deepEq(a, b, aStack, bStack) {
            var className = toString.call(a);
            if (className !== toString.call(b)) return false;

            switch (className) {
                case '[object RegExp]':
                case '[object String]':
                    return '' + a === '' + b;

                case '[object Number]':
                    if (+a !== +a) return +b !== +b;
                    return +a === 0 ? 1 / +a === 1 / b : +a === +b;

                case '[object Date]':
                case '[object Boolean]':
                    return +a === +b;
            }

            var areArrays = className === '[object Array]';

            if (!areArrays) {
                if (_typeof(a) != 'object' || _typeof(b) != 'object') return false;
                var aCtor = a.constructor,
                    bCtor = b.constructor;
                if (
                    aCtor !== bCtor &&
                    !(
                        isFn(aCtor) &&
                        aCtor instanceof aCtor &&
                        isFn(bCtor) &&
                        bCtor instanceof bCtor
                    ) &&
                    'constructor' in a &&
                    'constructor' in b
                )
                    return false;
            }

            aStack = aStack || [];
            bStack = bStack || [];
            var length = aStack.length;

            while (length--) {
                if (aStack[length] === a) return bStack[length] === b;
            }

            aStack.push(a);
            bStack.push(b);

            if (areArrays) {
                length = a.length;
                if (length !== b.length) return false;

                while (length--) {
                    if (!eq(a[length], b[length], aStack, bStack)) return false;
                }
            } else {
                var _keys = keys(a),
                    key;

                length = _keys.length;
                if (keys(b).length !== length) return false;

                while (length--) {
                    key = _keys[length];
                    if (!(has(b, key) && eq(a[key], b[key], aStack, bStack)))
                        return false;
                }
            }

            aStack.pop();
            bStack.pop();
            return true;
        }

        function eq(a, b, aStack, bStack) {
            if (a === b) return a !== 0 || 1 / a === 1 / b;
            if (a == null || b == null) return a === b;
            if (a !== a) return b !== b;

            var type = _typeof(a);

            if (type !== 'function' && type !== 'object' && _typeof(b) != 'object')
                return false;
            return deepEq(a, b, aStack, bStack);
        }

        return exports;
    })({});

    /* ------------------------------ isErr ------------------------------ */

    _.isErr = (function (exports) {
        /* Check if value is an error.
         *
         * |Name  |Type   |Desc                     |
         * |------|-------|-------------------------|
         * |val   |*      |Value to check           |
         * |return|boolean|True if value is an error|
         */

        /* example
         * isErr(new Error()); // -> true
         */

        /* typescript
         * export declare function isErr(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object Error]';
        };

        return exports;
    })({});

    /* ------------------------------ isInt ------------------------------ */

    var isInt = _.isInt = (function (exports) {
        /* Checks if value is classified as a Integer.
         *
         * |Name  |Type   |Desc                                 |
         * |------|-------|-------------------------------------|
         * |val   |*      |Value to check                       |
         * |return|boolean|True if value is correctly classified|
         */

        /* example
         * isInt(5); // -> true
         * isInt(5.1); // -> false
         * isInt({}); // -> false
         */

        /* typescript
         * export declare function isInt(val: any): boolean;
         */

        /* dependencies
         * isNum 
         */

        exports = function exports(val) {
            return isNum(val) && val % 1 === 0;
        };

        return exports;
    })({});

    /* ------------------------------ isEven ------------------------------ */

    _.isEven = (function (exports) {
        /* Check if number is even.
         *
         * |Name  |Type   |Desc                  |
         * |------|-------|----------------------|
         * |num   |number |Number to check       |
         * |return|boolean|True if number is even|
         */

        /* example
         * isEven(0); // -> true
         * isEven(1); // -> false
         * isEven(2); // -> true
         */

        /* typescript
         * export declare function isEven(num: number): boolean;
         */

        /* dependencies
         * isInt 
         */

        exports = function exports(num) {
            if (!isInt(num)) return false;
            return num % 2 === 0;
        };

        return exports;
    })({});

    /* ------------------------------ isFinite ------------------------------ */

    var isFinite = _.isFinite = (function (exports) {
        /* Check if value is a finite primitive number.
         *
         * |Name  |Type   |Desc                            |
         * |------|-------|--------------------------------|
         * |val   |*      |Value to check                  |
         * |return|boolean|True if value is a finite number|
         */

        /* example
         * isFinite(3); // -> true
         * isFinite(Infinity); // -> false
         */

        /* typescript
         * export declare function isFinite(val: any): boolean;
         */

        /* dependencies
         * root 
         */

        var nativeIsFinite = root.isFinite,
            nativeIsNaN = root.isNaN;

        exports = function exports(val) {
            return nativeIsFinite(val) && !nativeIsNaN(parseFloat(val));
        };

        return exports;
    })({});

    /* ------------------------------ isGeneratorFn ------------------------------ */

    _.isGeneratorFn = (function (exports) {
        /* Check if value is a generator function.
         *
         * |Name  |Type   |Desc                                 |
         * |------|-------|-------------------------------------|
         * |val   |*      |Value to check                       |
         * |return|boolean|True if value is a generator function|
         */

        /* example
         * isGeneratorFn(function * () {}); // -> true;
         * isGeneratorFn(function () {}); // -> false;
         */

        /* typescript
         * export declare function isGeneratorFn(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object GeneratorFunction]';
        };

        return exports;
    })({});

    /* ------------------------------ isJson ------------------------------ */

    _.isJson = (function (exports) {
        /* Check if value is a valid JSON.
         *
         * It uses `JSON.parse()` and a `try... catch` block.
         *
         * |Name  |Type   |Desc                         |
         * |------|-------|-----------------------------|
         * |val   |string |JSON string                  |
         * |return|boolean|True if value is a valid JSON|
         */

        /* example
         * isJson('{"a": 5}'); // -> true
         * isJson("{'a': 5}"); // -> false
         */

        /* typescript
         * export declare function isJson(val: string): boolean;
         */
        exports = function exports(val) {
            try {
                JSON.parse(val);
                return true;
            } catch (e) {
                return false;
            }
        };

        return exports;
    })({});

    /* ------------------------------ isLeapYear ------------------------------ */

    var isLeapYear = _.isLeapYear = (function (exports) {
        /* Check if a year is a leap year.
         *
         * |Name  |Type   |Desc                       |
         * |------|-------|---------------------------|
         * |year  |number |Year to check              |
         * |return|boolean|True if year is a leap year|
         */

        /* example
         * isLeapYear(2000); // -> true
         * isLeapYear(2002); // -> false
         */

        /* typescript
         * export declare function isLeapYear(year: number): boolean;
         */
        exports = function exports(year) {
            return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
        };

        return exports;
    })({});

    /* ------------------------------ isMap ------------------------------ */

    _.isMap = (function (exports) {
        /* Check if value is a Map object.
         *
         * |Name  |Type   |Desc                  |
         * |------|-------|----------------------|
         * |val   |*      |Value to check        |
         * |return|boolean|True if value is a Map|
         */

        /* example
         * isMap(new Map()); // -> true
         * isMap(new WeakMap()); // -> false
         */

        /* typescript
         * export declare function isMap(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object Map]';
        };

        return exports;
    })({});

    /* ------------------------------ isMatch ------------------------------ */

    var isMatch = _.isMatch = (function (exports) {
        /* Check if keys and values in src are contained in obj.
         *
         * |Name  |Type   |Desc                              |
         * |------|-------|----------------------------------|
         * |obj   |object |Object to inspect                 |
         * |src   |object |Object of property values to match|
         * |return|boolean|True if object is match           |
         */

        /* example
         * isMatch({a: 1, b: 2}, {a: 1}); // -> true
         */

        /* typescript
         * export declare function isMatch(obj: any, src: any): boolean;
         */

        /* dependencies
         * keys 
         */

        exports = function exports(obj, src) {
            var _keys = keys(src),
                len = _keys.length;

            if (obj == null) return !len;
            obj = Object(obj);

            for (var i = 0; i < len; i++) {
                var key = _keys[i];
                if (src[key] !== obj[key] || !(key in obj)) return false;
            }

            return true;
        };

        return exports;
    })({});

    /* ------------------------------ isMobile ------------------------------ */

    _.isMobile = (function (exports) {
        /* Check whether client is using a mobile browser using ua.
         *
         * |Name                  |Type   |Desc                                 |
         * |----------------------|-------|-------------------------------------|
         * |ua=navigator.userAgent|string |User agent                           |
         * |return                |boolean|True if ua belongs to mobile browsers|
         */

        /* example
         * isMobile(navigator.userAgent);
         */

        /* typescript
         * export declare function isMobile(ua?: string): boolean;
         */

        /* dependencies
         * isBrowser memoize 
         */

        var regMobileAll = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            regMobileFour = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i;
        exports = memoize(function (ua) {
            ua = ua || (isBrowser ? navigator.userAgent : '');
            return regMobileAll.test(ua) || regMobileFour.test(ua.substr(0, 4));
        });

        return exports;
    })({});

    /* ------------------------------ isNaN ------------------------------ */

    var isNaN = _.isNaN = (function (exports) {
        /* Check if value is an NaN.
         *
         * |Name  |Type   |Desc                   |
         * |------|-------|-----------------------|
         * |val   |*      |Value to check         |
         * |return|boolean|True if value is an NaN|
         *
         * Undefined is not an NaN, different from global isNaN function.
         */

        /* example
         * isNaN(0); // -> false
         * isNaN(NaN); // -> true
         */

        /* typescript
         * export declare function isNaN(val: any): boolean;
         */

        /* dependencies
         * isNum 
         */

        exports = function exports(val) {
            return isNum(val) && val !== +val;
        };

        return exports;
    })({});

    /* ------------------------------ isNil ------------------------------ */

    var isNil = _.isNil = (function (exports) {
        /* Check if value is null or undefined, the same as value == null.
         *
         * |Name  |Type   |Desc                              |
         * |------|-------|----------------------------------|
         * |val   |*      |Value to check                    |
         * |return|boolean|True if value is null or undefined|
         */

        /* example
         * isNil(null); // -> true
         * isNil(void 0); // -> true
         * isNil(undefined); // -> true
         * isNil(false); // -> false
         * isNil(0); // -> false
         * isNil([]); // -> false
         */

        /* typescript
         * export declare function isNil(val: any): boolean;
         */
        exports = function exports(val) {
            return val == null;
        };

        return exports;
    })({});

    /* ------------------------------ toSrc ------------------------------ */

    var toSrc = _.toSrc = (function (exports) {
        /* Convert function to its source code.
         *
         * |Name  |Type    |Desc               |
         * |------|--------|-------------------|
         * |fn    |function|Function to convert|
         * |return|string  |Source code        |
         */

        /* example
         * toSrc(Math.min); // -> 'function min() { [native code] }'
         * toSrc(function () {}) // -> 'function () { }'
         */

        /* typescript
         * export declare function toSrc(fn: Function): string;
         */

        /* dependencies
         * isNil 
         */

        exports = function exports(fn) {
            if (isNil(fn)) return '';

            try {
                return fnToStr.call(fn);
                /* eslint-disable no-empty */
            } catch (e) {
            }

            try {
                return fn + '';
                /* eslint-disable no-empty */
            } catch (e) {
            }

            return '';
        };

        var fnToStr = Function.prototype.toString;

        return exports;
    })({});

    /* ------------------------------ fnParams ------------------------------ */

    _.fnParams = (function (exports) {
        /* Get a function parameter's names.
         *
         * |Name  |Type           |Desc                      |
         * |------|---------------|--------------------------|
         * |fn    |function string|Function to get parameters|
         * |return|array          |Names                     |
         */

        /* example
         * fnParams(function (a, b) {}); // -> ['a', 'b']
         */

        /* typescript
         * export declare function fnParams(fn: Function | string): string[];
         */

        /* dependencies
         * toSrc stripCmt startWith isStr 
         */

        exports = function exports(fn) {
            var fnStr = stripCmt(isStr(fn) ? fn : toSrc(fn));
            var open;
            var close;

            if (
                !startWith(fnStr, 'async') &&
                !startWith(fnStr, 'function') &&
                !startWith(fnStr, '(')
            ) {
                // Arrow function with no brackets
                open = 0;
                close = fnStr.indexOf('=>');
            } else {
                open = fnStr.indexOf('(') + 1;
                close = fnStr.indexOf(')');
            }

            var ret = fnStr.slice(open, close);
            ret = ret.match(regArgNames);
            return ret === null ? [] : ret;
        };

        var regArgNames = /[^\s,]+/g;

        return exports;
    })({});

    /* ------------------------------ isNative ------------------------------ */

    _.isNative = (function (exports) {
        /* Check if value is a native function.
         *
         * |Name  |Type   |Desc                              |
         * |------|-------|----------------------------------|
         * |val   |*      |Value to check                    |
         * |return|boolean|True if value is a native function|
         */

        /* example
         * isNative(function () {}); // -> false
         * isNative(Math.min); // -> true
         */

        /* typescript
         * export declare function isNative(val: any): boolean;
         */

        /* dependencies
         * isObj isFn toSrc 
         */

        exports = function exports(val) {
            if (!isObj(val)) return false;
            if (isFn(val)) return regIsNative.test(toSrc(val)); // Detect host constructors (Safari > 4; really typed array specific)

            return regIsHostCtor.test(toSrc(val));
        };

        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var regIsNative = new RegExp(
            '^' +
            toSrc(hasOwnProperty)
                .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                .replace(
                    /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                    '$1.*?'
                ) +
            '$'
        );
        var regIsHostCtor = /^\[object .+?Constructor\]$/;

        return exports;
    })({});

    /* ------------------------------ isNull ------------------------------ */

    _.isNull = (function (exports) {
        /* Check if value is an Null.
         *
         * |Name  |Type   |Desc                    |
         * |------|-------|------------------------|
         * |val   |*      |Value to check          |
         * |return|boolean|True if value is an Null|
         */

        /* example
         * isNull(null); // -> true
         */

        /* typescript
         * export declare function isNull(val: any): boolean;
         */
        exports = function exports(val) {
            return val === null;
        };

        return exports;
    })({});

    /* ------------------------------ isNumeric ------------------------------ */

    _.isNumeric = (function (exports) {
        /* Check if value is numeric.
         *
         * |Name  |Type   |Desc                    |
         * |------|-------|------------------------|
         * |val   |*      |Value to check          |
         * |return|boolean|True if value is numeric|
         */

        /* example
         * isNumeric(1); // -> true
         * isNumeric('1'); // -> true
         * isNumeric(Number.MAX_VALUE); // -> true
         * isNumeric(0xFF); // -> true
         * isNumeric(''); // -> false
         * isNumeric('1.1.1'); // -> false
         * isNumeric(NaN); // -> false
         */

        /* typescript
         * export declare function isNumeric(val: any): boolean;
         */

        /* dependencies
         * isStr isNaN isFinite isArr 
         */

        exports = function exports(val) {
            if (isStr(val)) val = val.replace(regComma, '');
            return !isNaN(parseFloat(val)) && isFinite(val) && !isArr(val);
        };

        var regComma = /,/g;

        return exports;
    })({});

    /* ------------------------------ isOdd ------------------------------ */

    _.isOdd = (function (exports) {
        /* Check if number is odd.
         *
         * |Name  |Type   |Desc                 |
         * |------|-------|---------------------|
         * |num   |number |Number to check      |
         * |return|boolean|True if number is odd|
         */

        /* example
         * isOdd(0); // -> false
         * isOdd(1); // -> true
         * isOdd(2); // -> false
         */

        /* typescript
         * export declare function isOdd(num: number): boolean;
         */

        /* dependencies
         * isInt 
         */

        exports = function exports(num) {
            if (!isInt(num)) return false;
            return num % 2 !== 0;
        };

        return exports;
    })({});

    /* ------------------------------ isPrime ------------------------------ */

    _.isPrime = (function (exports) {
        /* Check if the provided integer is a prime number.
         *
         * |Name  |Type   |Desc                            |
         * |------|-------|--------------------------------|
         * |num   |number |Number to check                 |
         * |return|boolean|True if number is a prime number|
         */

        /* example
         * isPrime(11); // -> true
         * isPrime(8); // -> false
         */

        /* typescript
         * export declare function isPrime(num: number): boolean;
         */
        exports = function exports(num) {
            var boundary = Math.floor(Math.sqrt(num));

            for (var i = 2; i <= boundary; i++) {
                if (num % i === 0) {
                    return false;
                }
            }

            return num >= 2;
        };

        return exports;
    })({});

    /* ------------------------------ isPrimitive ------------------------------ */

    _.isPrimitive = (function (exports) {
        function _typeof(obj) {
            if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                        ? 'symbol'
                        : typeof obj;
                };
            }
            return _typeof(obj);
        }

        /* Check if value is string, number, boolean or null.
         *
         * |Name  |Type   |Desc                        |
         * |------|-------|----------------------------|
         * |val   |*      |Value to check              |
         * |return|boolean|True if value is a primitive|
         */

        /* example
         * isPrimitive(5); // -> true
         * isPrimitive('abc'); // -> true
         * isPrimitive(false); // -> true
         */

        /* typescript
         * export declare function isPrimitive(val: any): boolean;
         */
        exports = function exports(val) {
            var type = _typeof(val);

            return val == null || (type !== 'function' && type !== 'object');
        };

        return exports;
    })({});

    /* ------------------------------ isPromise ------------------------------ */

    _.isPromise = (function (exports) {
        /* Check if value looks like a promise.
         *
         * |Name  |Type   |Desc                              |
         * |------|-------|----------------------------------|
         * |val   |*      |Value to check                    |
         * |return|boolean|True if value looks like a promise|
         */

        /* example
         * isPromise(new Promise(function () {})); // -> true
         * isPromise({}); // -> false
         */

        /* typescript
         * export declare function isPromise(val: any): boolean;
         */

        /* dependencies
         * isObj isFn 
         */

        exports = function exports(val) {
            return isObj(val) && isFn(val.then);
        };

        return exports;
    })({});

    /* ------------------------------ isRegExp ------------------------------ */

    var isRegExp = _.isRegExp = (function (exports) {
        /* Check if value is a regular expression.
         *
         * |Name  |Type   |Desc                                 |
         * |------|-------|-------------------------------------|
         * |val   |*      |Value to check                       |
         * |return|boolean|True if value is a regular expression|
         */

        /* example
         * isRegExp(/a/); // -> true
         */

        /* typescript
         * export declare function isRegExp(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object RegExp]';
        };

        return exports;
    })({});

    /* ------------------------------ isRelative ------------------------------ */

    _.isRelative = (function (exports) {
        /* Check if path appears to be relative.
         *
         * |Name  |Type   |Desc                               |
         * |------|-------|-----------------------------------|
         * |path  |string |Path to check                      |
         * |return|boolean|True if path appears to be relative|
         */

        /* example
         * isRelative('README.md'); // -> true
         */

        /* typescript
         * export declare function isRelative(path: string): boolean;
         */
        exports = function exports(path) {
            return !regAbsolute.test(path);
        };

        var regAbsolute = /^([a-z]+:)?[\\/]/i;

        return exports;
    })({});

    /* ------------------------------ isSet ------------------------------ */

    _.isSet = (function (exports) {
        /* Check if value is a Set object.
         *
         * |Name  |Type   |Desc                  |
         * |------|-------|----------------------|
         * |val   |*      |Value to check        |
         * |return|boolean|True if value is a Set|
         */

        /* example
         * isSet(new Set()); // -> true
         * isSet(new WeakSet()); // -> false
         */

        /* typescript
         * export declare function isSet(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object Set]';
        };

        return exports;
    })({});

    /* ------------------------------ isSorted ------------------------------ */

    _.isSorted = (function (exports) {
        /* Check if an array is sorted.
         *
         * |Name  |Type    |Desc                   |
         * |------|--------|-----------------------|
         * |arr   |array   |Array to check         |
         * |[cmp] |function|Comparator             |
         * |return|boolean |True if array is sorted|
         */

        /* example
         * isSorted([1, 2, 3]); // -> true
         * isSorted([3, 2, 1]); // -> false
         */

        /* typescript
         * export declare function isSorted(arr: any[], cmp?: Function): boolean;
         */
        exports = function exports(arr, cmp) {
            cmp = cmp || comparator;

            for (var i = 0, len = arr.length; i < len - 1; i++) {
                if (cmp(arr[i], arr[i + 1]) > 0) return false;
            }

            return true;
        };

        function comparator(a, b) {
            return a - b;
        }

        return exports;
    })({});

    /* ------------------------------ isTypedArr ------------------------------ */

    _.isTypedArr = (function (exports) {
        /* Check if value is a typed array.
         *
         * |Name  |Type   |Desc                          |
         * |------|-------|------------------------------|
         * |val   |*      |Value to check                |
         * |return|boolean|True if value is a typed array|
         */

        /* example
         * isTypedArr([]); // -> false
         * isTypedArr(new Uint8Array(8)); // -> true
         */

        /* typescript
         * export declare function isTypedArr(val: any): boolean;
         */

        /* dependencies
         * objToStr each 
         */

        exports = function exports(val) {
            return !!map[objToStr(val)];
        };

        var map = {};
        each(
            [
                'Int8Array',
                'Int16Array',
                'Int32Array',
                'Uint8Array',
                'Uint8ClampedArray',
                'Uint16Array',
                'Uint32Array',
                'Float32Array',
                'Float64Array'
            ],
            function (val) {
                map['[object ' + val + ']'] = true;
            }
        );

        return exports;
    })({});

    /* ------------------------------ isUrl ------------------------------ */

    _.isUrl = (function (exports) {
        /* Loosely validate an url.
         *
         * |Name  |Type   |Desc                               |
         * |------|-------|-----------------------------------|
         * |val   |string |Value to check                     |
         * |return|boolean|True if value is an url like string|
         */

        /* example
         * isUrl('http://www.example.com?foo=bar&param=test'); // -> true
         */

        /* typescript
         * export declare function isUrl(val: string): boolean;
         */
        exports = function exports(val) {
            return regUrl.test(val);
        };

        var regUrl = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

        return exports;
    })({});

    /* ------------------------------ isWeakMap ------------------------------ */

    _.isWeakMap = (function (exports) {
        /* Check if value is a WeakMap object.
         *
         * |Name  |Type   |Desc                      |
         * |------|-------|--------------------------|
         * |val   |*      |Value to check            |
         * |return|boolean|True if value is a WeakMap|
         */

        /* example
         * isWeakMap(new Map()); // -> false
         * isWeakMap(new WeakMap()); // -> true
         */

        /* typescript
         * export declare function isWeakMap(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object WeakMap]';
        };

        return exports;
    })({});

    /* ------------------------------ isWeakSet ------------------------------ */

    _.isWeakSet = (function (exports) {
        /* Check if value is a WeakSet object.
         *
         * |Name  |Type   |Desc                      |
         * |------|-------|--------------------------|
         * |val   |*      |Value to check            |
         * |return|boolean|True if value is a WeakSet|
         */

        /* example
         * isWeakSet(new Set()); // -> false
         * isWeakSet(new WeakSet()); // -> true
         */

        /* typescript
         * export declare function isWeakSet(val: any): boolean;
         */

        /* dependencies
         * objToStr 
         */

        exports = function exports(val) {
            return objToStr(val) === '[object WeakSet]';
        };

        return exports;
    })({});

    /* ------------------------------ kebabCase ------------------------------ */

    _.kebabCase = (function (exports) {
        /* Convert string to "kebabCase".
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |str   |string|String to convert |
         * |return|string|Kebab cased string|
         */

        /* example
         * kebabCase('fooBar'); // -> foo-bar
         * kebabCase('foo bar'); // -> foo-bar
         * kebabCase('foo_bar'); // -> foo-bar
         * kebabCase('foo.bar'); // -> foo-bar
         */

        /* typescript
         * export declare function kebabCase(str: string): string;
         */

        /* dependencies
         * splitCase 
         */

        exports = function exports(str) {
            return splitCase(str).join('-');
        };

        return exports;
    })({});

    /* ------------------------------ keyCode ------------------------------ */

    _.keyCode = (function (exports) {
        /* Key codes and key names conversion.
         *
         * Get key code's name.
         *
         * |Name  |Type  |Desc                  |
         * |------|------|----------------------|
         * |code  |number|Key code              |
         * |return|string|Corresponding key name|
         *
         * Get key name's code.
         *
         * |Name  |Type  |Desc                  |
         * |------|------|----------------------|
         * |name  |string|Key name              |
         * |return|number|Corresponding key code|
         */

        /* example
         * keyCode(13); // -> 'enter'
         * keyCode('enter'); // -> 13
         */

        /* typescript
         * export declare function keyCode(name: string): number;
         * export declare function keyCode(code: number): string;
         */

        /* dependencies
         * isStr invert 
         */

        exports = function exports(val) {
            if (isStr(val)) return codeMap[val];
            return nameMap[val];
        };

        var codeMap = {
            backspace: 8,
            tab: 9,
            enter: 13,
            shift: 16,
            ctrl: 17,
            alt: 18,
            'pause/break': 19,
            'caps lock': 20,
            esc: 27,
            space: 32,
            'page up': 33,
            'page down': 34,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            insert: 45,
            delete: 46,
            windows: 91,
            'right windows': 92,
            'windows menu': 93,
            'numpad *': 106,
            'numpad +': 107,
            'numpad -': 109,
            'numpad .': 110,
            'numpad /': 111,
            'num lock': 144,
            'scroll lock': 145,
            ';': 186,
            '=': 187,
            ',': 188,
            '-': 189,
            '.': 190,
            '/': 191,
            '`': 192,
            '[': 219,
            '\\': 220,
            ']': 221,
            "'": 222
        }; // Lower case chars

        for (var i = 97; i < 123; i++) {
            codeMap[String.fromCharCode(i)] = i - 32;
        } // Numbers

        for (i = 48; i < 58; i++) {
            codeMap[i - 48] = i;
        } // Function keys

        for (i = 1; i < 13; i++) {
            codeMap['f' + i] = i + 111;
        } // Numpad keys

        for (i = 0; i < 10; i++) {
            codeMap['numpad ' + i] = i + 96;
        }

        var nameMap = invert(codeMap);

        return exports;
    })({});

    /* ------------------------------ last ------------------------------ */

    _.last = (function (exports) {
        /* Get the last element of array.
         *
         * |Name  |Type |Desc                     |
         * |------|-----|-------------------------|
         * |arr   |array|The array to query       |
         * |return|*    |The last element of array|
         */

        /* example
         * last([1, 2]); // -> 2
         */

        /* typescript
         * export declare function last(arr: any[]): any;
         */
        exports = function exports(arr) {
            var len = arr ? arr.length : 0;
            if (len) return arr[len - 1];
        };

        return exports;
    })({});

    /* ------------------------------ size ------------------------------ */

    var size = _.size = (function (exports) {
        /* Get size of object or length of array like object.
         *
         * |Name  |Type        |Desc                 |
         * |------|------------|---------------------|
         * |obj   |array object|Collection to inspect|
         * |return|number      |Collection size      |
         */

        /* example
         * size({a: 1, b: 2}); // -> 2
         * size([1, 2, 3]); // -> 3
         */

        /* typescript
         * export declare function size(obj: any): number;
         */

        /* dependencies
         * isArrLike keys 
         */

        exports = function exports(obj) {
            return isArrLike(obj) ? obj.length : keys(obj).length;
        };

        return exports;
    })({});

    /* ------------------------------ longest ------------------------------ */

    var longest = _.longest = (function (exports) {
        /* Get the longest item in an array.
         *
         * |Name  |Type |Desc            |
         * |------|-----|----------------|
         * |arr   |array|Array to inspect|
         * |return|*    |Longest item    |
         */

        /* example
         * longest(['a', 'abcde', 'abc']); // -> 'abcde'
         */

        /* typescript
         * export declare function longest(arr: string[]): string;
         */

        /* dependencies
         * size 
         */

        exports = function exports(arr) {
            if (arr.length < 1) return;
            var ret = arr[0],
                retSize = size(arr[0]);

            for (var i = 1, len = arr.length; i < len; i++) {
                var elSize = size(arr[i]);

                if (elSize > retSize) {
                    ret = arr[i];
                    retSize = elSize;
                }
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ lowerCase ------------------------------ */

    _.lowerCase = (function (exports) {
        /* Convert string to lower case.
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |str   |string|String to convert |
         * |return|string|Lower cased string|
         */

        /* example
         * lowerCase('TEST'); // -> 'test'
         */

        /* typescript
         * export declare function lowerCase(str: string): string;
         */

        /* dependencies
         * toStr 
         */

        exports = function exports(str) {
            return toStr(str).toLocaleLowerCase();
        };

        return exports;
    })({});

    /* ------------------------------ ltrim ------------------------------ */

    var ltrim = _.ltrim = (function (exports) {
        /* Remove chars or white-spaces from beginning of string.
         *
         * |Name   |Type        |Desc              |
         * |-------|------------|------------------|
         * |str    |string      |String to trim    |
         * |[chars]|string array|Characters to trim|
         * |return |string      |Trimmed string    |
         */

        /* example
         * ltrim(' abc  '); // -> 'abc  '
         * ltrim('_abc_', '_'); // -> 'abc_'
         * ltrim('_abc_', ['a', '_']); // -> 'bc_'
         */

        /* typescript
         * export declare function ltrim(str: string, chars?: string | string[]): string;
         */
        var regSpace = /^\s+/;

        exports = function exports(str, chars) {
            if (chars == null) return str.replace(regSpace, '');
            var start = 0,
                len = str.length,
                charLen = chars.length,
                found = true,
                i,
                c;

            while (found && start < len) {
                found = false;
                i = -1;
                c = str.charAt(start);

                while (++i < charLen) {
                    if (c === chars[i]) {
                        found = true;
                        start++;
                        break;
                    }
                }
            }

            return start >= len ? '' : str.substr(start, len);
        };

        return exports;
    })({});

    /* ------------------------------ matcher ------------------------------ */

    var matcher = _.matcher = (function (exports) {
        /* Return a predicate function that checks if attrs are contained in an object.
         *
         * |Name  |Type    |Desc                              |
         * |------|--------|----------------------------------|
         * |attrs |object  |Object of property values to match|
         * |return|function|New predicate function            |
         */

        /* example
         * const objects = [
         *     {a: 1, b: 2, c: 3 },
         *     {a: 4, b: 5, c: 6 }
         * ];
         * // filter(objects, matcher({a: 4, c: 6 }));
         */

        /* typescript
         * export declare function matcher(attrs: any): Function;
         */

        /* dependencies
         * extendOwn isMatch 
         */

        exports = function exports(attrs) {
            attrs = extendOwn({}, attrs);
            return function (obj) {
                return isMatch(obj, attrs);
            };
        };

        return exports;
    })({});

    /* ------------------------------ safeCb ------------------------------ */

    var safeCb = _.safeCb = (function (exports) {
        /* Create callback based on input value.
         */

        /* typescript
         * export declare function safeCb(val?: any, ctx?: any, argCount?: number): Function;
         */

        /* dependencies
         * isFn isObj optimizeCb matcher identity 
         */

        exports = function exports(val, ctx, argCount) {
            if (val == null) return identity;
            if (isFn(val)) return optimizeCb(val, ctx, argCount);
            if (isObj(val)) return matcher(val);
            return function (key) {
                return function (obj) {
                    return obj == null ? undefined : obj[key];
                };
            };
        };

        return exports;
    })({});

    /* ------------------------------ every ------------------------------ */

    _.every = (function (exports) {
        /* Check if predicate return truthy for all elements.
         *
         * |Name      |Type        |Desc                                         |
         * |----------|------------|---------------------------------------------|
         * |object    |array object|Collection to iterate over                   |
         * |[iterator]|function    |Function invoked per iteration               |
         * |[context] |*           |Predicate context                            |
         * |return    |boolean     |True if all elements pass the predicate check|
         */

        /* example
         * every([2, 4], function (val) {
         *     return val % 2 === 0;
         * }); // -> false
         */

        /* typescript
         * export declare function every<T>(
         *     object: types.List<T>,
         *     iterator?: types.ListIterator<T, boolean>,
         *     context?: any
         * ): boolean;
         * export declare function every<T>(
         *     object: types.Dictionary<T>,
         *     iterator?: types.ObjectIterator<T, boolean>,
         *     context?: any
         * ): boolean;
         */

        /* dependencies
         * safeCb isArrLike keys types 
         */

        exports = function exports(obj, predicate, ctx) {
            predicate = safeCb(predicate, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len = (_keys || obj).length;

            for (var i = 0; i < len; i++) {
                var curKey = _keys ? _keys[i] : i;
                if (!predicate(obj[curKey], curKey, obj)) return false;
            }

            return true;
        };

        return exports;
    })({});

    /* ------------------------------ filter ------------------------------ */

    var filter = _.filter = (function (exports) {
        /* Iterates over elements of collection, returning an array of all the values that pass a truth test.
         *
         * |Name     |Type    |Desc                                   |
         * |---------|--------|---------------------------------------|
         * |obj      |array   |Collection to iterate over             |
         * |predicate|function|Function invoked per iteration         |
         * |[ctx]    |*       |Predicate context                      |
         * |return   |array   |Array of all values that pass predicate|
         */

        /* example
         * filter([1, 2, 3, 4, 5], function (val) {
         *     return val % 2 === 0;
         * }); // -> [2, 4]
         */

        /* typescript
         * export declare function filter<T>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, boolean>,
         *     context?: any
         * ): T[];
         * export declare function filter<T>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, boolean>,
         *     context?: any
         * ): T[];
         */

        /* dependencies
         * safeCb each types 
         */

        exports = function exports(obj, predicate, ctx) {
            var ret = [];
            predicate = safeCb(predicate, ctx);
            each(obj, function (val, idx, list) {
                if (predicate(val, idx, list)) ret.push(val);
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ compact ------------------------------ */

    _.compact = (function (exports) {
        /* Return a copy of the array with all falsy values removed.
         *
         * The values false, null, 0, "", undefined, and NaN are falsey.
         *
         * |Name  |Type |Desc                        |
         * |------|-----|----------------------------|
         * |arr   |array|Array to compact            |
         * |return|array|New array of filtered values|
         */

        /* example
         * compact([0, 1, false, 2, '', 3]); // -> [1, 2, 3]
         */

        /* typescript
         * export declare function compact(arr: any[]): any[];
         */

        /* dependencies
         * filter 
         */

        exports = function exports(arr) {
            return filter(arr, function (val) {
                return !!val;
            });
        };

        return exports;
    })({});

    /* ------------------------------ difference ------------------------------ */

    _.difference = (function (exports) {
        /* Create an array of unique array values not included in the other given array.
         *
         * |Name     |Type |Desc                        |
         * |---------|-----|----------------------------|
         * |arr      |array|Array to inspect            |
         * |[...rest]|array|Values to exclude           |
         * |return   |array|New array of filtered values|
         */

        /* example
         * difference([3, 2, 1], [4, 2]); // -> [3, 1]
         */

        /* typescript
         * export declare function difference(arr: any[], ...rest: any[]): any[];
         */

        /* dependencies
         * restArgs flatten filter contain 
         */

        exports = restArgs(function (arr, rest) {
            rest = flatten(rest);
            return filter(arr, function (val) {
                return !contain(rest, val);
            });
        });

        return exports;
    })({});

    /* ------------------------------ unique ------------------------------ */

    var unique = _.unique = (function (exports) {
        /* Create duplicate-free version of an array.
         *
         * |Name     |Type    |Desc                         |
         * |---------|--------|-----------------------------|
         * |arr      |array   |Array to inspect             |
         * |[compare]|function|Function for comparing values|
         * |return   |array   |New duplicate free array     |
         */

        /* example
         * unique([1, 2, 3, 1]); // -> [1, 2, 3]
         */

        /* typescript
         * export declare function unique(
         *     arr: any[],
         *     compare?: (a: any, b: any) => boolean | number
         * ): any[];
         */

        /* dependencies
         * filter 
         */

        exports = function exports(arr, compare) {
            compare = compare || isEqual;
            return filter(arr, function (item, idx, arr) {
                var len = arr.length;

                while (++idx < len) {
                    if (compare(item, arr[idx])) return false;
                }

                return true;
            });
        };

        function isEqual(a, b) {
            return a === b;
        }

        return exports;
    })({});

    /* ------------------------------ findIdx ------------------------------ */

    var findIdx = _.findIdx = (function (exports) {
        /* Return the first index where the predicate truth test passes.
         *
         * |Name     |Type    |Desc                          |
         * |---------|--------|------------------------------|
         * |arr      |array   |Array to search               |
         * |predicate|function|Function invoked per iteration|
         * |return   |number  |Index of matched element      |
         */

        /* example
         * findIdx([{
         *     name: 'john',
         *     age: 24
         * }, {
         *     name: 'jane',
         *     age: 23
         * }], function (val) {
         *     return val.age === 23;
         * }); // -> 1
         */

        /* typescript
         * export declare function findIdx(arr: any[], predicate: Function): number;
         */

        /* dependencies
         * safeCb 
         */

        exports = function exports(arr, predicate, ctx, dir) {
            dir = dir || 1;
            predicate = safeCb(predicate, ctx);
            var len = arr.length,
                i = dir > 0 ? 0 : len - 1;

            while (i >= 0 && i < len) {
                if (predicate(arr[i], i, arr)) return i;
                i += dir;
            }

            return -1;
        };

        return exports;
    })({});

    /* ------------------------------ findLastIdx ------------------------------ */

    _.findLastIdx = (function (exports) {
        /* Return the last index where the predicate truth test passes.
         *
         * |Name     |Type    |Desc                          |
         * |---------|--------|------------------------------|
         * |arr      |array   |Array to search               |
         * |predicate|function|Function invoked per iteration|
         * |return   |number  |Last index of matched element |
         */

        /* example
         * findLastIdx([{
         *     name: 'john',
         *     age: 24
         * }, {
         *     name: 'jane',
         *     age: 23
         * }, {
         *     name: 'kitty',
         *     age: 24
         * }], function (val) {
         *     return val.age === 24;
         * }); // -> 2
         */

        /* typescript
         * export declare function findLastIdx(arr: any[], predicate: Function): number;
         */

        /* dependencies
         * findIdx 
         */

        exports = function exports(arr, predicate, ctx) {
            return findIdx(arr, predicate, ctx, -1);
        };

        return exports;
    })({});

    /* ------------------------------ findKey ------------------------------ */

    var findKey = _.findKey = (function (exports) {
        /* Return the first key where the predicate truth test passes.
         *
         * |Name     |Type    |Desc                          |
         * |---------|--------|------------------------------|
         * |obj      |object  |Object to search              |
         * |predicate|function|Function invoked per iteration|
         * |[ctx]    |*       |Predicate context             |
         * |return   |string  |Key of matched element        |
         */

        /* example
         * findKey({a: 1, b: 2}, function (val) {
         *     return val === 1;
         * }); // -> a
         */

        /* typescript
         * export declare function findKey(
         *     obj: any,
         *     predicate: Function,
         *     ctx?: any
         * ): string | void;
         */

        /* dependencies
         * safeCb keys 
         */

        exports = function exports(obj, predicate, ctx) {
            predicate = safeCb(predicate, ctx);

            var _keys = keys(obj),
                key;

            for (var i = 0, len = _keys.length; i < len; i++) {
                key = _keys[i];
                if (predicate(obj[key], key, obj)) return key;
            }
        };

        return exports;
    })({});

    /* ------------------------------ find ------------------------------ */

    _.find = (function (exports) {
        /* Find the first value that passes a truth test in a collection.
         *
         * |Name     |Type        |Desc                             |
         * |---------|------------|---------------------------------|
         * |object   |array object|Collection to iterate over       |
         * |iterator |function    |Function invoked per iteration   |
         * |[context]|*           |Predicate context                |
         * |return   |*           |First value that passes predicate|
         */

        /* example
         * find([{
         *     name: 'john',
         *     age: 24
         * }, {
         *     name: 'jane',
         *     age: 23
         * }], function (val) {
         *     return val.age === 23;
         * }); // -> {name: 'jane', age: 23}
         */

        /* typescript
         * export declare function find<T>(
         *     object: types.List<T>,
         *     iterator: types.ListIterator<T, boolean>,
         *     context?: any
         * ): T | undefined;
         * export declare function find<T>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, boolean>,
         *     context?: any
         * ): T | undefined;
         */

        /* dependencies
         * findKey findIdx isArrLike isUndef types 
         */

        exports = function exports(obj, predicate, ctx) {
            var keyFinder = isArrLike(obj) ? findIdx : findKey;
            var key = keyFinder(obj, predicate, ctx);
            if (!isUndef(key) && key !== -1) return obj[key];
        };

        return exports;
    })({});

    /* ------------------------------ map ------------------------------ */

    var map = _.map = (function (exports) {
        /* Create an array of values by running each element in collection through iteratee.
         *
         * |Name     |Type        |Desc                          |
         * |---------|------------|------------------------------|
         * |object   |array object|Collection to iterate over    |
         * |iterator |function    |Function invoked per iteration|
         * |[context]|*           |Function context              |
         * |return   |array       |New mapped array              |
         */

        /* example
         * map([4, 8], function (n) { return n * n; }); // -> [16, 64]
         */

        /* typescript
         * export declare function map<T, TResult>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, TResult>,
         *     context?: any
         * ): TResult[];
         * export declare function map<T, TResult>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, TResult>,
         *     context?: any
         * ): TResult[];
         */

        /* dependencies
         * safeCb keys isArrLike types 
         */

        exports = function exports(obj, iterator, ctx) {
            iterator = safeCb(iterator, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len = (_keys || obj).length,
                results = Array(len);

            for (var i = 0; i < len; i++) {
                var curKey = _keys ? _keys[i] : i;
                results[i] = iterator(obj[curKey], curKey, obj);
            }

            return results;
        };

        return exports;
    })({});

    /* ------------------------------ atob ------------------------------ */

    _.atob = (function (exports) {
        /* Use Buffer to emulate atob when running in node.
         */

        /* example
         * atob('SGVsbG8gV29ybGQ='); // -> 'Hello World'
         */

        /* typescript
         * export declare function atob(str: string): string;
         */

        /* dependencies
         * root isNode base64 map detectMocha 
         */

        if (isNode) {
            exports = function exports(str) {
                return new Buffer(str, 'base64').toString('binary');
            };
        } else {
            if (root.atob && !detectMocha()) {
                exports = root.atob;
            } else {
                exports = function exports(str) {
                    return map(base64.decode(str), function (c) {
                        return String.fromCharCode(c);
                    }).join('');
                };
            }
        }

        return exports;
    })({});

    /* ------------------------------ btoa ------------------------------ */

    _.btoa = (function (exports) {
        /* Use Buffer to emulate btoa when running in node.
         */

        /* example
         * btoa('Hello World'); // -> 'SGVsbG8gV29ybGQ='
         */

        /* typescript
         * export declare function btoa(str: string): string;
         */

        /* dependencies
         * root isNode base64 map detectMocha 
         */

        if (isNode) {
            exports = function exports(str) {
                return new Buffer(str, 'binary').toString('base64');
            };
        } else {
            if (root.btoa && !detectMocha()) {
                exports = root.btoa;
            } else {
                exports = function exports(str) {
                    return base64.encode(
                        map(str, function (c) {
                            return c.charCodeAt(0);
                        })
                    );
                };
            }
        }

        return exports;
    })({});

    /* ------------------------------ centerAlign ------------------------------ */

    _.centerAlign = (function (exports) {
        /* Center align text in a string.
         *
         * |Name   |Type        |Desc                    |
         * |-------|------------|------------------------|
         * |str    |string array|String to align         |
         * |[width]|number      |Total width of each line|
         * |return |string      |Center aligned string   |
         */

        /* example
         * centerAlign('test', 8); // -> '  test'
         * centerAlign('test\nlines', 8); // -> '  test\n lines'
         * centerAlign(['test', 'lines'], 8); // -> '  test\n lines'
         */

        /* typescript
         * export declare function centerAlign(str: string | string[], width?: number): string;
         */

        /* dependencies
         * longest isArr isUndef map lpad 
         */

        exports = function exports(str, width) {
            var ret = str;

            if (!isArr(ret)) {
                ret = ret.split(regLineBreak);
            }

            if (isUndef(width)) width = longest(str);
            ret = map(ret, function (str) {
                var len = str.length;
                return lpad(str, floor((width - len) / 2) + len);
            });
            return ret.join('\n');
        };

        var regLineBreak = /\n/g,
            floor = Math.floor;

        return exports;
    })({});

    /* ------------------------------ decodeUriComponent ------------------------------ */

    _.decodeUriComponent = (function (exports) {
        /* Better decodeURIComponent that does not throw if input is invalid.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |str   |string|String to decode|
         * |return|string|Decoded string  |
         */

        /* example
         * decodeUriComponent('%%25%'); // -> '%%%'
         * decodeUriComponent('%E0%A4%A'); // -> '\xE0\xA4%A'
         */

        /* typescript
         * export declare function decodeUriComponent(str: string): string;
         */

        /* dependencies
         * each ucs2 map utf8 
         */

        exports = function exports(str) {
            try {
                return decodeURIComponent(str);
            } catch (e) {
                var matches = str.match(regMatcher);
                each(matches, function (match) {
                    str = str.replace(match, decode(match));
                });
                return str;
            }
        };

        function decode(str) {
            str = str.split('%').slice(1);
            var bytes = map(str, hexToInt);
            str = ucs2.encode(bytes);
            str = utf8.decode(str, true);
            return str;
        }

        function hexToInt(numStr) {
            return +('0x' + numStr);
        }

        var regMatcher = /(%[a-f0-9]{2})+/gi;

        return exports;
    })({});

    /* ------------------------------ toArr ------------------------------ */

    var toArr = _.toArr = (function (exports) {
        /* Convert value to an array.
         *
         * |Name  |Type |Desc            |
         * |------|-----|----------------|
         * |val   |*    |Value to convert|
         * |return|array|Converted array |
         */

        /* example
         * toArr({a: 1, b: 2}); // -> [{a: 1, b: 2}]
         * toArr('abc'); // -> ['abc']
         * toArr(1); // -> [1]
         * toArr(null); // -> []
         */

        /* typescript
         * export declare function toArr(val: any): any[];
         */

        /* dependencies
         * isArrLike map isArr isStr 
         */

        exports = function exports(val) {
            if (!val) return [];
            if (isArr(val)) return val;
            if (isArrLike(val) && !isStr(val)) return map(val);
            return [val];
        };

        return exports;
    })({});

    /* ------------------------------ Class ------------------------------ */

    var Class = _.Class = (function (exports) {
        /* Create JavaScript class.
         *
         * |Name     |Type    |Desc                             |
         * |---------|--------|---------------------------------|
         * |methods  |object  |Public methods                   |
         * |[statics]|object  |Static methods                   |
         * |return   |function|Function used to create instances|
         */

        /* example
         * var People = Class({
         *     initialize: function People(name, age) {
         *         this.name = name;
         *         this.age = age;
         *     },
         *     introduce: function () {
         *         return 'I am ' + this.name + ', ' + this.age + ' years old.';
         *     }
         * });
         *
         * var Student = People.extend({
         *     initialize: function Student(name, age, school) {
         *         this.callSuper(People, 'initialize', arguments);
         *
         *         this.school = school;
         *     },
         *     introduce: function () {
         *         return this.callSuper(People, 'introduce') + '\n I study at ' + this.school + '.';
         *     }
         * }, {
         *     is: function (obj) {
         *         return obj instanceof Student;
         *     }
         * });
         *
         * var a = new Student('allen', 17, 'Hogwarts');
         * a.introduce(); // -> 'I am allen, 17 years old. \n I study at Hogwarts.'
         * Student.is(a); // -> true
         */

        /* typescript
         * export declare namespace Class {
         *     class Base {
         *         toString(): string;
         *     }
         *     class IConstructor extends Base {
         *         constructor(...args: any[]);
         *         static extend(methods: any, statics: any): IConstructor;
         *         static inherits(Class: Function): void;
         *         static methods(methods: any): IConstructor;
         *         static statics(statics: any): IConstructor;
         *         [method: string]: any;
         *     }
         * }
         * export declare function Class(methods: any, statics?: any): Class.IConstructor;
         */

        /* dependencies
         * extend toArr inherits safeGet isMiniProgram 
         */

        exports = function exports(methods, statics) {
            return Base.extend(methods, statics);
        };

        function makeClass(parent, methods, statics) {
            statics = statics || {};
            var className =
                methods.className || safeGet(methods, 'initialize.name') || '';
            delete methods.className;
            var ctor;

            if (isMiniProgram) {
                ctor = function ctor() {
                    var args = toArr(arguments);
                    return this.initialize
                        ? this.initialize.apply(this, args) || this
                        : this;
                };
            } else {
                ctor = new Function(
                    'toArr',
                    'return function ' +
                    className +
                    '()' +
                    '{' +
                    'var args = toArr(arguments);' +
                    'return this.initialize ? this.initialize.apply(this, args) || this : this;' +
                    '};'
                )(toArr);
            }

            inherits(ctor, parent);
            ctor.prototype.constructor = ctor;

            ctor.extend = function (methods, statics) {
                return makeClass(ctor, methods, statics);
            };

            ctor.inherits = function (Class) {
                inherits(ctor, Class);
            };

            ctor.methods = function (methods) {
                extend(ctor.prototype, methods);
                return ctor;
            };

            ctor.statics = function (statics) {
                extend(ctor, statics);
                return ctor;
            };

            ctor.methods(methods).statics(statics);
            return ctor;
        }

        var Base = (exports.Base = makeClass(Object, {
            className: 'Base',
            callSuper: function callSuper(parent, name, args) {
                var superMethod = parent.prototype[name];
                return superMethod.apply(this, args);
            },
            toString: function toString() {
                return this.constructor.name;
            }
        }));

        return exports;
    })({});

    /* ------------------------------ Color ------------------------------ */

    _.Color = (function (exports) {
        /* Color converter.
         *
         * ### constructor
         *
         * |Name |Type         |Desc            |
         * |-----|-------------|----------------|
         * |color|string object|Color to convert|
         *
         * ### toRgb
         *
         * Get color rgb string format.
         *
         * ### toHex
         *
         * Get color hex string format.
         *
         * ### toHsl
         *
         * Get color hsl string format.
         *
         * ### parse
         *
         * [static] Parse color string into object containing value and model.
         *
         * |Name  |Type  |Desc                             |
         * |------|------|---------------------------------|
         * |color |string|Color string                     |
         * |return|object|Object containing value and model|
         */

        /* example
         * Color.parse('rgb(170, 287, 204, 0.5)'); // -> {val: [170, 187, 204, 0.5], model: 'rgb'}
         * var color = new Color('#abc');
         * color.toRgb(); // -> 'rgb(170, 187, 204)'
         * color.toHsl(); // -> 'hsl(210, 25%, 73%)'
         */

        /* typescript
         * export declare namespace Color {
         *     interface IColor {
         *         val: number[];
         *         model: string;
         *     }
         * }
         * export declare class Color {
         *     constructor(color: string | Color.IColor);
         *     toRgb(): string;
         *     toHex(): string;
         *     toHsl(): string;
         *     static parse(colorStr: string): Color.IColor;
         * }
         */

        /* dependencies
         * Class isStr clamp rgbToHsl hslToRgb lpad convertBase 
         */

        exports = Class(
            {
                initialize: function Color(color) {
                    if (isStr(color)) color = exports.parse(color);
                    this.model = color.model;
                    this.val = color.val;
                },
                toRgb: function toRgb() {
                    var val = this.val;
                    if (this.model === 'hsl') val = hslToRgb(val);
                    var prefix = 'rgba';

                    if (val[3] === 1) {
                        prefix = 'rgb';
                        val = val.slice(0, 3);
                    }

                    return prefix + '(' + val.join(', ') + ')';
                },
                toHex: function toHex() {
                    var val = this.val;
                    if (this.model === 'hsl') val = hslToRgb(val);
                    var ret = hexDouble(val[0]) + hexDouble(val[1]) + hexDouble(val[2]);

                    if (ret[0] === ret[1] && ret[2] === ret[3] && ret[4] === ret[5]) {
                        ret = ret[0] + ret[2] + ret[5];
                    }

                    return '#' + ret;
                },
                toHsl: function toHsl() {
                    var val = this.val;
                    if (this.model === 'rgb') val = rgbToHsl(val);
                    var prefix = 'hsla';

                    if (val[3] === 1) {
                        prefix = 'hsl';
                        val = val.slice(0, 3);
                    }

                    val[1] = val[1] + '%';
                    val[2] = val[2] + '%';
                    return prefix + '(' + val.join(', ') + ')';
                }
            },
            {
                parse: function parse(colorStr) {
                    var i, match;
                    var val = [0, 0, 0, 1],
                        model = 'rgb';
                    /* eslint-disable no-cond-assign */

                    if ((match = colorStr.match(regHexAbbr))) {
                        match = match[1];

                        for (i = 0; i < 3; i++) {
                            val[i] = parseInt(match[i] + match[i], 16);
                        }
                    } else if ((match = colorStr.match(regHex))) {
                        match = match[1];

                        for (i = 0; i < 3; i++) {
                            var i2 = i * 2;
                            val[i] = parseInt(match.slice(i2, i2 + 2), 16);
                        }
                    } else if ((match = colorStr.match(regRgba))) {
                        for (i = 0; i < 3; i++) {
                            val[i] = parseInt(match[i + 1], 0);
                        }

                        if (match[4]) val[3] = parseFloat(match[4]);
                    } else if ((match = colorStr.match(regRgbaPer))) {
                        for (i = 0; i < 3; i++) {
                            val[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
                        }

                        if (match[4]) val[3] = parseFloat(match[4]);
                    } else if ((match = colorStr.match(regHsla))) {
                        model = 'hsl';
                        val = [
                            ((parseFloat(match[1]) % 360) + 360) % 360,
                            clamp(parseFloat(match[2]), 0, 100),
                            clamp(parseFloat(match[3]), 0, 100),
                            clamp(parseFloat(match[4]), 0, 1)
                        ];
                    }

                    return {
                        val: val,
                        model: model
                    };
                }
            }
        );
        var regHexAbbr = /^#([a-fA-F0-9]{3})$/,
            regHex = /^#([a-fA-F0-9]{6})$/,
            regRgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/,
            regRgbaPer = /^rgba?\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/,
            regHsla = /^hsla?\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;

        function hexDouble(num) {
            return lpad(convertBase(num, 10, 16), '0', 2);
        }

        return exports;
    })({});

    /* ------------------------------ Dispatcher ------------------------------ */

    _.Dispatcher = (function (exports) {
        /* Flux dispatcher.
         *
         * [Related docs](https://facebook.github.io/flux/docs/dispatcher.html)
         */

        /* example
         * var dispatcher = new Dispatcher();
         *
         * dispatcher.register(function (payload) {
         *    switch (payload.actionType) {
         *        // Do something
         *    }
         * });
         *
         * dispatcher.dispatch({
         *     actionType: 'action'
         * });
         */

        /* typescript
         * export declare class Dispatcher {
         *     dispatch(payload: any);
         *     register(cb: Function): void;
         *     waitFor(ids: string[]): void;
         *     unregister(id: string): void;
         *     isDispatching(): boolean;
         * }
         */

        /* dependencies
         * Class uniqId 
         */

        exports = Class({
            initialize: function Dispatcher() {
                this._callbacks = {};
                this._isDispatching = false;
                this._isHandled = {};
                this._isPending = {};
            },
            dispatch: function dispatch(payload) {
                this._startDispatching(payload);

                for (var id in this._callbacks) {
                    if (this._isPending[id]) continue;

                    this._invokeCb(id);
                }

                this._stopDispatching();
            },
            register: function register(cb) {
                var id = uniqId('ID_');
                this._callbacks[id] = cb;
                return id;
            },
            waitFor: function waitFor(ids) {
                for (var i = 0, len = ids.length; i < len; i++) {
                    var id = ids[i];
                    if (this._isPending[id]) continue;

                    this._invokeCb(id);
                }
            },
            unregister: function unregister(id) {
                delete this._callbacks[id];
            },
            isDispatching: function isDispatching() {
                return this._isDispatching;
            },
            _startDispatching: function _startDispatching(payload) {
                for (var id in this._callbacks) {
                    this._isPending[id] = false;
                    this._isHandled[id] = false;
                }

                this._pendingPayload = payload;
                this._isDispatching = true;
            },
            _stopDispatching: function _stopDispatching() {
                delete this._pendingPayload;
                this._isDispatching = false;
            },
            _invokeCb: function _invokeCb(id) {
                this._isPending[id] = true;

                this._callbacks[id](this._pendingPayload);

                this._isHandled[id] = true;
            }
        });

        return exports;
    })({});

    /* ------------------------------ Enum ------------------------------ */

    var Enum = _.Enum = (function (exports) {
        /* Enum type implementation.
         *
         * ### constructor
         *
         * |Name|Type |Desc            |
         * |----|-----|----------------|
         * |arr |array|Array of strings|
         *
         * |Name|Type  |Desc                  |
         * |----|------|----------------------|
         * |obj |object|Pairs of key and value|
         */

        /* example
         * var importance = new Enum([
         *     'NONE', 'TRIVIAL', 'REGULAR', 'IMPORTANT', 'CRITICAL'
         * ]);
         * const val = 1;
         * if (val === importance.CRITICAL) {
         *     // Do something.
         * }
         */

        /* typescript
         * export declare class Enum {
         *     size: number;
         *     constructor(map: string[] | { [member: string]: any });
         *     [key: string]: any;
         * }
         */

        /* dependencies
         * Class freeze isArr each keys 
         */

        exports = Class({
            initialize: function Enum(map) {
                if (isArr(map)) {
                    this.size = map.length;
                    each(
                        map,
                        function (member, val) {
                            this[member] = val;
                        },
                        this
                    );
                } else {
                    this.size = keys(map).length;
                    each(
                        map,
                        function (val, member) {
                            this[member] = val;
                        },
                        this
                    );
                }

                freeze(this);
            }
        });

        return exports;
    })({});

    /* ------------------------------ PseudoMap ------------------------------ */

    var PseudoMap = _.PseudoMap = (function (exports) {
        /* Like es6 Map, without iterators.
         *
         * It supports only string keys, and uses Map if exists.
         */

        /* example
         * var map = new PseudoMap();
         * map.set('1', 1);
         * map.get('1'); // -> 1
         */

        /* typescript
         * export declare const PseudoMap: typeof Map;
         */

        /* dependencies
         * Class root detectMocha defineProp keys each isArr isUndef 
         */

        if (root.Map && !detectMocha()) {
            exports = root.Map;
        } else {
            exports = Class({
                initialize: function PseudoMap(data) {
                    this.clear();
                    var self = this;
                    defineProp(this, 'size', {
                        get: function get() {
                            return keys(self._data).length;
                        },
                        set: function set() {
                        },
                        enumerable: true,
                        configurable: true
                    });

                    if (data instanceof exports) {
                        data.forEach(function (val, key) {
                            this.set(key, val);
                        }, this);
                    } else if (isArr(data)) {
                        each(
                            data,
                            function (val) {
                                this.set(val[0], val[1]);
                            },
                            this
                        );
                    }
                },
                forEach: function forEach(fn, ctx) {
                    each(
                        this._data,
                        function (val, key) {
                            fn.call(this, val, key);
                        },
                        ctx
                    );
                },
                has: function has(key) {
                    return !isUndef(this._data[key]);
                },
                get: function get(key) {
                    return this._data[key];
                },
                set: function set(key, val) {
                    this._data[key] = val;
                },
                delete: function _delete(key) {
                    delete this._data[key];
                },
                clear: function clear() {
                    this._data = {};
                }
            });
        }

        return exports;
    })({});

    /* ------------------------------ Lru ------------------------------ */

    _.Lru = (function (exports) {
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError('Cannot call a class as a function');
            }
        }

        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }

        /* Simple LRU cache.
         *
         * ### constructor
         *
         * |Name|Type  |Desc              |
         * |----|------|------------------|
         * |max |number|Max items in cache|
         *
         * ### has
         *
         * Check if has cache.
         *
         * |Name  |Type  |Desc     |
         * |------|------|---------|
         * |key   |string|Cache key|
         *
         * ### remove
         *
         * Remove cache.
         *
         * |Name  |Type  |Desc     |
         * |------|------|---------|
         * |key   |string|Cache key|
         *
         * ### get
         *
         * Get cache value.
         *
         * |Name  |Type  |Desc       |
         * |------|------|-----------|
         * |key   |string|Cache key  |
         * |return|*     |Cache value|
         *
         * ### set
         *
         * Set cache.
         *
         * |Name  |Type  |Desc       |
         * |------|------|-----------|
         * |key   |string|Cache key  |
         * |val   |*     |Cache value|
         *
         * ### clear
         *
         * Clear cache.
         */

        /* example
         * const cache = new Lru(50);
         * cache.set('test', 'licia');
         * cache.get('test'); // -> 'licia'
         */

        /* typescript
         * export declare class Lru {
         *     constructor(max: number): void;
         *     has(key: string): boolean;
         *     remove(key: string): void;
         *     get(key: string): any;
         *     set(key: string, val: any): void;
         *     clear(): void;
         * }
         */

        /* dependencies
         * LinkedList PseudoMap 
         */

        exports =
            /*#__PURE__*/
            (function () {
                function Lru(max) {
                    _classCallCheck(this, Lru);

                    this._max = max;
                    this._list = new LinkedList();
                    this._map = new PseudoMap();
                }

                _createClass(Lru, [
                    {
                        key: 'has',
                        value: function has(key) {
                            return this._map.has(key);
                        }
                    },
                    {
                        key: 'remove',
                        value: function remove(key) {
                            var map = this._map;

                            if (this.has(key)) {
                                var node = map.get(key);

                                this._list.rmNode(node);

                                map['delete'](key);
                            }
                        }
                    },
                    {
                        key: 'get',
                        value: function get(key) {
                            var list = this._list;
                            var map = this._map;
                            var ret;

                            if (this.has(key)) {
                                var node = map.get(key);
                                ret = node.value.val;
                                list.rmNode(node);
                                list.unshift(node.value);
                                map.set(key, list.head);
                            }

                            return ret;
                        }
                    },
                    {
                        key: 'set',
                        value: function set(key, val) {
                            var list = this._list;
                            var map = this._map;

                            if (this.has(key)) {
                                var node = map.get(key);
                                list.rmNode(node);
                                list.unshift({
                                    key: key,
                                    val: val
                                });
                                map.set(key, list.head);
                            } else {
                                list.unshift({
                                    key: key,
                                    val: val
                                });
                                map.set(key, list.head);

                                if (list.size > this._max) {
                                    var item = list.pop();
                                    map['delete'](item.key);
                                }
                            }
                        }
                    },
                    {
                        key: 'clear',
                        value: function clear() {
                            this._map = new PseudoMap();
                            this._list = new LinkedList();
                        }
                    }
                ]);

                return Lru;
            })();

        return exports;
    })({});

    /* ------------------------------ Queue ------------------------------ */

    _.Queue = (function (exports) {
        /* Queue data structure.
         *
         * ### clear
         *
         * Clear the queue.
         *
         * ### enqueue
         *
         * Add an item to the queue.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |item  |*     |Item to enqueue|
         * |return|number|Current size   |
         *
         * ### dequeue
         *
         * Remove the first item of the queue.
         *
         * ### peek
         *
         * Get the first item without removing it.
         *
         * ### forEach
         *
         * Iterate over the queue.
         *
         * |Name    |Type    |Desc                      |
         * |--------|--------|--------------------------|
         * |iterator|function|Function invoked iteration|
         * |[ctx]   |*       |Function context          |
         *
         * ### toArr
         *
         * Convert queue to a JavaScript array.
         */

        /* example
         * var queue = new Queue();
         *
         * console.log(queue.size); // -> 0
         * queue.enqueue(2);
         * queue.enqueue(3);
         * queue.dequeue(); // -> 2
         * console.log(queue.size); // -> 1
         * queue.peek(); // -> 3
         * console.log(queue.size); // -> 1
         */

        /* typescript
         * export declare class Queue {
         *     size: number;
         *     clear(): void;
         *     enqueue(item: any): number;
         *     dequeue(): any;
         *     peek(): any;
         *     forEach(iterator: Function, context?: any): void;
         *     toArr(): any[];
         * }
         */

        /* dependencies
         * Class 
         */

        exports = Class({
            initialize: function Queue() {
                this.clear();
            },
            clear: function clear() {
                this._items = [];
                this.size = 0;
            },
            enqueue: function enqueue(item) {
                this._items.push(item);

                return ++this.size;
            },
            dequeue: function dequeue() {
                if (!this.size) return;
                this.size--;
                return this._items.shift();
            },
            peek: function peek() {
                if (!this.size) return;
                return this._items[0];
            },
            forEach: function forEach(iterator, ctx) {
                ctx = arguments.length > 1 ? ctx : this;
                var items = this._items;

                for (var i = 0, size = this.size; i < size; i++) {
                    iterator.call(ctx, items[i], i, this);
                }
            },
            toArr: function toArr() {
                return this._items.slice(0);
            }
        });

        return exports;
    })({});

    /* ------------------------------ Stack ------------------------------ */

    _.Stack = (function (exports) {
        /* Stack data structure.
         *
         * ### clear
         *
         * Clear the stack.
         *
         * ### push
         *
         * Add an item to the stack.
         *
         * |Name  |Type  |Desc        |
         * |------|------|------------|
         * |item  |*     |Item to add |
         * |return|number|Current size|
         *
         * ### pop
         *
         * Get the last item of the stack.
         *
         * ### peek
         *
         * Get the last item without removing it.
         *
         * ### forEach
         *
         * Iterate over the stack.
         *
         * |Name    |Type    |Desc                      |
         * |--------|--------|--------------------------|
         * |iterator|function|Function invoked iteration|
         * |[ctx]   |*       |Function context          |
         *
         * ### toArr
         *
         * Convert the stack to a JavaScript array.
         */

        /* example
         * var stack = new Stack();
         *
         * stack.push(2); // -> 1
         * stack.push(3); // -> 2
         * stack.pop(); // -> 3
         */

        /* typescript
         * export declare class Stack {
         *     size: number;
         *     clear(): void;
         *     push(item: any): number;
         *     pop(): any;
         *     peek(): any;
         *     forEach(iterator: Function, context?: any): void;
         *     toArr(): any[];
         * }
         */

        /* dependencies
         * Class 
         */

        exports = Class({
            initialize: function Stack() {
                this.clear();
            },
            clear: function clear() {
                this._items = [];
                this.size = 0;
            },
            push: function push(item) {
                this._items.push(item);

                return ++this.size;
            },
            pop: function pop() {
                this.size--;
                return this._items.pop();
            },
            peek: function peek() {
                return this._items[this.size - 1];
            },
            forEach: function forEach(iterator, ctx) {
                ctx = arguments.length > 1 ? ctx : this;
                var items = this._items;

                for (var i = this.size - 1, j = 0; i >= 0; i--, j++) {
                    iterator.call(ctx, items[i], j, this);
                }
            },
            toArr: function toArr() {
                return this._items.slice(0).reverse();
            }
        });

        return exports;
    })({});

    /* ------------------------------ Validator ------------------------------ */

    _.Validator = (function (exports) {
        /* Object values validation.
         *
         * ### constructor
         *
         * |Name   |Type  |Desc                    |
         * |-------|------|------------------------|
         * |options|object|Validation configuration|
         *
         * ### validate
         *
         * Validate object.
         *
         * |Name  |Type  |Desc                            |
         * |------|------|--------------------------------|
         * |obj   |object|Object to validate              |
         * |return|*     |Validation result, true means ok|
         *
         * ### addPlugin
         *
         * [static] Add plugin.
         *
         * |Name  |Type    |Desc              |
         * |------|--------|------------------|
         * |name  |string  |Plugin name       |
         * |plugin|function|Validation handler|
         *
         * ### Default Plugins
         *
         * Required, number, boolean, string and regexp.
         */

        /* example
         * Validator.addPlugin('custom', function (val, key, config) {
         *     if (typeof val === 'string' && val.length === 5) return true;
         *
         *     return key + ' should be a string with length 5';
         * });
         * var validator = new Validator({
         *     'test': {
         *         required: true,
         *         custom: true
         *     }
         * });
         * validator.validate({}); // -> 'test is required'
         * validator.validate({test: 1}); // -> 'test should be a string with length 5';
         * validator.validate({test: 'licia'}); // -> true
         */

        /* typescript
         * export declare class Validator {
         *     constructor(options: { [name: string]: any });
         *     validate(object: any): string | boolean;
         *     static plugins: any;
         *     static addPlugin(name: string, plugin: Function): void;
         * }
         */

        /* dependencies
         * Class keys safeGet isFn isUndef isNum isStr isBool 
         */

        exports = Class(
            {
                className: 'Validator',
                initialize: function initialize(options) {
                    this._options = options;
                    this._optKeys = keys(options);
                },
                validate: function validate(obj) {
                    obj = obj || {};
                    var options = this._options,
                        objKeys = this._optKeys;

                    for (var i = 0, len = objKeys.length; i < len; i++) {
                        var key = objKeys[i];

                        var result = this._validateVal(
                            safeGet(obj, key),
                            options[key],
                            key
                        );

                        if (result !== true) return result;
                    }

                    return true;
                },
                _validateVal: function _validateVal(val, rules, objKey) {
                    var plugins = exports.plugins;
                    if (isFn(rules)) return rules(val);
                    var ruleKeys = keys(rules);

                    for (var i = 0, len = ruleKeys.length; i < len; i++) {
                        var key = ruleKeys[i],
                            config = rules[key],
                            result = true;
                        if (isFn(config)) result = config(val, objKey);
                        var plugin = plugins[key];
                        if (plugin) result = plugin(val, objKey, config);
                        if (result !== true) return result;
                    }

                    return true;
                }
            },
            {
                plugins: {
                    required: function required(val, key, config) {
                        if (config && isUndef(val)) return key + ' is required';
                        return true;
                    },
                    number: function number(val, key, config) {
                        if (config && !isUndef(val) && !isNum(val))
                            return key + ' should be a number';
                        return true;
                    },
                    boolean: function boolean(val, key, config) {
                        if (config && !isUndef(val) && !isBool(val))
                            return key + ' should be a boolean';
                        return true;
                    },
                    string: function string(val, key, config) {
                        if (config && !isUndef(val) && !isStr(val))
                            return key + ' should be a string';
                        return true;
                    },
                    regexp: function regexp(val, key, config) {
                        if (isStr(val) && !config.test(val))
                            return (
                                key + ' should match given regexp ' + config.toString()
                            );
                        return true;
                    }
                },
                addPlugin: function addPlugin(name, plugin) {
                    exports.plugins[name] = plugin;
                }
            }
        );

        return exports;
    })({});

    /* ------------------------------ JsonTransformer ------------------------------ */

    _.JsonTransformer = (function (exports) {
        /* Json to json transformer.
         *
         * ### constructor
         *
         * |Name     |Type  |Desc                     |
         * |---------|------|-------------------------|
         * |[data={}]|object|Json object to manipulate|
         *
         * ### set
         *
         * Set object value.
         *
         * |Name |Type  |Desc        |
         * |-----|------|------------|
         * |[key]|string|Object key  |
         * |val  |*     |Value to set|
         *
         * If key is not given, the whole source object is replaced by val.
         *
         * ### get
         *
         * Get object value.
         *
         * |Name  |Type  |Desc                           |
         * |------|------|-------------------------------|
         * |[key] |string|Object key                     |
         * |return|*     |Specified value or whole object|
         *
         * ### remove
         *
         * Remove object value.
         *
         * |Name|Type        |Desc                 |
         * |----|------------|---------------------|
         * |key |array string|Object keys to remove|
         *
         * ### map
         *
         * Shortcut for array map.
         *
         * |Name|Type    |Desc                          |
         * |----|--------|------------------------------|
         * |from|string  |From object path              |
         * |to  |string  |Target object path            |
         * |fn  |function|Function invoked per iteration|
         *
         * ### filter
         *
         * Shortcut for array filter.
         *
         * ### compute
         *
         * Compute value from several object values.
         *
         * |Name|Type        |Desc                            |
         * |----|------------|--------------------------------|
         * |from|array string|Source values                   |
         * |to  |string      |Target object path              |
         * |fn  |function    |Function to compute target value|
         */

        /* example
         * var data = new JsonTransformer({
         *     books: [{
         *         title: 'Book 1',
         *         price: 5
         *     }, {
         *         title: 'Book 2',
         *         price: 10
         *     }],
         *     author: {
         *         lastname: 'Su',
         *         firstname: 'RedHood'
         *     }
         * });
         * data.filter('books', function (book) { return book.price > 5 });
         * data.compute('author', function (author) { return author.firstname + author.lastname });
         * data.set('count', data.get('books').length);
         * data.get(); // -> {books: [{title: 'Book 2', price: 10}], author: 'RedHoodSu', count: 1}
         */

        /* typescript
         * export declare class JsonTransformer {
         *     constructor(data: any);
         *     set(key: string, val: any): JsonTransformer;
         *     get(key?: string): any;
         *     map(from: string, to: string, fn: Function): JsonTransformer;
         *     map(from: string, fn: Function): JsonTransformer;
         *     filter(from: string, to: string, fn: Function): JsonTransformer;
         *     filter(from: string, fn: Function): JsonTransformer;
         *     remove(keys: string | string[]): JsonTransformer;
         *     compute(from: string | string[], to: string, fn: Function): JsonTransformer;
         *     compute(from: string, fn: Function): JsonTransformer;
         *     toString(): string;
         * }
         */

        /* dependencies
         * Class safeSet safeGet map filter isFn safeDel toArr each 
         */

        exports = Class({
            className: 'JsonTransformer',
            initialize: function initialize(data) {
                this._data = data || {};
            },
            set: function set(key, val) {
                if (arguments.length === 1) {
                    this._data = key;
                    return this;
                }

                safeSet(this._data, key, val);
                return this;
            },
            get: function get(key) {
                if (key == null) return this._data;
                return safeGet(this._data, key);
            },
            map: (function (_map) {
                function map(_x, _x2, _x3) {
                    return _map.apply(this, arguments);
                }

                map.toString = function () {
                    return _map.toString();
                };

                return map;
            })(function (from, to, fn) {
                if (isFn(from)) return this.set(map(this._data, from, this));

                if (isFn(to)) {
                    fn = to;
                    to = from;
                }

                return this.set(to, map(this.get(from), fn, this));
            }),
            filter: (function (_filter) {
                function filter(_x4, _x5, _x6) {
                    return _filter.apply(this, arguments);
                }

                filter.toString = function () {
                    return _filter.toString();
                };

                return filter;
            })(function (from, to, fn) {
                if (isFn(from)) return this.set(filter(this._data, from, this));

                if (isFn(to)) {
                    fn = to;
                    to = from;
                }

                return this.set(to, filter(this.get(from), fn, this));
            }),
            remove: function remove(keys) {
                keys = toArr(keys);
                var data = this._data;
                each(keys, function (key) {
                    safeDel(data, key);
                });
                return this;
            },
            compute: function compute(from, to, fn) {
                if (isFn(from)) return this.set(from.call(this, this._data));
                if (isFn(to)) return this.set(from, to.call(this, this.get(from)));
                from = map(
                    toArr(from),
                    function (key) {
                        return safeGet(this._data, key);
                    },
                    this
                );
                return this.set(to, fn.apply(this, from));
            },
            toString: function toString() {
                return JSON.stringify(this._data);
            }
        });

        return exports;
    })({});

    /* ------------------------------ abbrev ------------------------------ */

    _.abbrev = (function (exports) {
        /* Calculate the set of unique abbreviations for a given set of strings.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |...arr|string|List of names   |
         * |return|object|Abbreviation map|
         */

        /* example
         * abbrev('lina', 'luna');
         * // -> {li: 'lina', lin: 'lina', lina: 'lina', lu: 'luna', lun: 'luna', luna: 'luna'}
         */

        /* typescript
         * export declare function abbrev(
         *     ...arr: string[]
         * ): { [abbreviation: string]: string };
         */

        /* dependencies
         * toArr 
         */

        exports = function exports() {
            var args = toArr(arguments);
            args = args.sort(nameSort);
            var ret = {},
                idleMap = {};

            for (var i = 0, len = args.length; i < len; i++) {
                var str = args[i],
                    nextStr = args[i + 1] || '';
                if (str === nextStr) continue;
                var start = false,
                    abbrev = '';

                for (var j = 0, strLen = str.length; j < strLen; j++) {
                    abbrev += str[j];
                    if (!start && (str[j] !== nextStr[j] || j === strLen - 1))
                        start = true;

                    if (!start) {
                        idleMap[abbrev] = str;
                    } else if (!ret[abbrev] && !idleMap[abbrev]) {
                        ret[abbrev] = str;
                    }
                }
            }

            return ret;
        };

        function nameSort(a, b) {
            return a === b ? 0 : a > b ? 1 : -1;
        }

        return exports;
    })({});

    /* ------------------------------ concat ------------------------------ */

    _.concat = (function (exports) {
        /* Concat multiple arrays into a single array.
         *
         * |Name  |Type |Desc              |
         * |------|-----|------------------|
         * |...arr|array|Arrays to concat  |
         * |return|array|Concatenated array|
         */

        /* example
         * concat([1, 2], [3], [4, 5]); // -> [1, 2, 3, 4, 5]
         */

        /* typescript
         * export declare function concat(...args: Array<any[]>): any[];
         */

        /* dependencies
         * toArr 
         */

        exports = function exports() {
            var args = toArr(arguments),
                ret = [];

            for (var i = 0, len = args.length; i < len; i++) {
                ret = ret.concat(toArr(args[i]));
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ curry ------------------------------ */

    _.curry = (function (exports) {
        /* Function currying.
         *
         * |Name  |Type    |Desc                |
         * |------|--------|--------------------|
         * |fn    |function|Function to curry   |
         * |return|function|New curried function|
         */

        /* example
         * var add = curry(function (a, b) { return a + b });
         * var add1 = add(1);
         * add1(2); // -> 3
         */

        /* typescript
         * export declare function curry(fn: Function): Function;
         */

        /* dependencies
         * toArr 
         */

        exports = function exports(fn) {
            var len = fn.length;
            return function curriedFn() {
                var args = toArr(arguments);

                if (args.length < len) {
                    return function () {
                        return curriedFn.apply(null, args.concat(toArr(arguments)));
                    };
                }

                return fn.apply(null, args);
            };
        };

        return exports;
    })({});

    /* ------------------------------ define ------------------------------ */

    var define = _.define = (function (exports) {
        /* Define a module, should be used along with use.
         *
         * |Name      |Type    |Desc        |
         * |----------|--------|------------|
         * |name      |string  |Module name |
         * |[requires]|array   |Dependencies|
         * |method    |function|Module body |
         *
         * The module won't be executed until it's used by use function.
         */

        /* example
         * define('A', function () {
         *     return 'A';
         * });
         * define('B', ['A'], function (A) {
         *     return 'B' + A;
         * });
         */

        /* typescript
         * export declare function define(name: string, requires: string[], method: Function): void;
         * export declare function define(name: string, method: Function): void;
         */

        /* dependencies
         * toArr 
         */

        exports = function exports(name, requires, method) {
            if (arguments.length === 2) {
                method = requires;
                requires = [];
            }

            define(name, requires, method);
        };

        var modules = (exports._modules = {});

        function define(name, requires, method) {
            modules[name] = {
                requires: toArr(requires),
                body: method
            };
        }

        return exports;
    })({});

    /* ------------------------------ intersect ------------------------------ */

    _.intersect = (function (exports) {
        /* Compute the list of values that are the intersection of all the arrays.
         *
         * |Name  |Type |Desc                          |
         * |------|-----|------------------------------|
         * |...arr|array|Arrays to inspect             |
         * |return|array|New array of inspecting values|
         */

        /* example
         * intersect([1, 2, 3, 4], [2, 1, 10], [2, 1]); // -> [1, 2]
         */

        /* typescript
         * export declare function intersect(...arr: Array<any[]>): any[];
         */

        /* dependencies
         * contain toArr 
         */

        exports = function exports(arr) {
            var ret = [],
                args = toArr(arguments),
                argsLen = args.length,
                item,
                i,
                j,
                len;

            for (i = 0, len = arr.length; i < len; i++) {
                item = arr[i];
                if (contain(ret, item)) continue;

                for (j = 1; j < argsLen; j++) {
                    if (!contain(args[j], item)) break;
                }

                if (j === argsLen) ret.push(item);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ mapObj ------------------------------ */

    var mapObj = _.mapObj = (function (exports) {
        /* Map for objects.
         *
         * |Name     |Type    |Desc                          |
         * |---------|--------|------------------------------|
         * |object   |object  |Object to iterate over        |
         * |iterator |function|Function invoked per iteration|
         * |[context]|*       |Function context              |
         * |return   |object  |New mapped object             |
         */

        /* example
         * mapObj({a: 1, b: 2}, function (val, key) { return val + 1 }); // -> {a: 2, b: 3}
         */

        /* typescript
         * export declare function mapObj<T, TResult>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, TResult>,
         *     context?: any
         * ): types.Dictionary<TResult>;
         */

        /* dependencies
         * safeCb keys types 
         */

        exports = function exports(obj, iterator, ctx) {
            iterator = safeCb(iterator, ctx);

            var _keys = keys(obj),
                len = _keys.length,
                ret = {};

            for (var i = 0; i < len; i++) {
                var curKey = _keys[i];
                ret[curKey] = iterator(obj[curKey], curKey, obj);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ cloneDeep ------------------------------ */

    var cloneDeep = _.cloneDeep = (function (exports) {
        /* Recursively clone value.
         *
         * |Name  |Type|Desc             |
         * |------|----|-----------------|
         * |val   |*   |Value to clone   |
         * |return|*   |Deep cloned Value|
         */

        /* example
         * var obj = [{a: 1}, {a: 2}];
         * var obj2 = cloneDeep(obj);
         * console.log(obj[0] === obj2[1]); // -> false
         */

        /* typescript
         * export declare function cloneDeep<T>(val: T): T;
         */

        /* dependencies
         * isObj isFn isArr mapObj 
         */

        exports = (function (_exports) {
            function exports(_x) {
                return _exports.apply(this, arguments);
            }

            exports.toString = function () {
                return _exports.toString();
            };

            return exports;
        })(function (obj) {
            if (isArr(obj)) {
                return obj.map(function (val) {
                    return exports(val);
                });
            }

            if (isObj(obj) && !isFn(obj)) {
                return mapObj(obj, function (val) {
                    return exports(val);
                });
            }

            return obj;
        });

        return exports;
    })({});

    /* ------------------------------ extendDeep ------------------------------ */

    _.extendDeep = (function (exports) {
        /* Recursive object extending.
         *
         * |Name       |Type  |Desc              |
         * |-----------|------|------------------|
         * |destination|object|Destination object|
         * |...sources |object|Sources objects   |
         * |return     |object|Destination object|
         */

        /* example
         * extendDeep({
         *     name: 'RedHood',
         *     family: {
         *         mother: 'Jane',
         *         father: 'Jack'
         *     }
         * }, {
         *     family: {
         *         brother: 'Bruce'
         *     }
         * });
         * // -> {name: 'RedHood', family: {mother: 'Jane', father: 'Jack', brother: 'Bruce'}}
         */

        /* typescript
         * export declare function extendDeep(destination: any, ...sources: any[]): any;
         */

        /* dependencies
         * isPlainObj each cloneDeep 
         */

        exports = (function (_exports) {
            function exports(_x) {
                return _exports.apply(this, arguments);
            }

            exports.toString = function () {
                return _exports.toString();
            };

            return exports;
        })(function (obj) {
            var i = 0,
                ret = obj,
                len = arguments.length;

            while (++i < len) {
                obj = arguments[i];

                if (isPlainObj(ret) && isPlainObj(obj)) {
                    each(obj, function (val, key) {
                        ret[key] = exports(ret[key], obj[key]);
                    });
                } else {
                    ret = cloneDeep(obj);
                }
            }

            return ret;
        });

        return exports;
    })({});

    /* ------------------------------ remove ------------------------------ */

    var remove = _.remove = (function (exports) {
        /* Remove all elements from array that predicate returns truthy for and return an array of the removed elements.
         *
         * Unlike filter, this method mutates array.
         *
         * |Name     |Type    |Desc                                |
         * |---------|--------|------------------------------------|
         * |list     |array   |Collection to iterate over          |
         * |iterator |function|Function invoked per iteration      |
         * |[context]|*       |Predicate context                   |
         * |return   |array   |Array of all values that are removed|
         */

        /* example
         * var arr = [1, 2, 3, 4, 5];
         * var evens = remove(arr, function (val) { return val % 2 === 0 });
         * console.log(arr); // -> [1, 3, 5]
         * console.log(evens); // -> [2, 4]
         */

        /* typescript
         * export declare function remove<T, TResult>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, boolean>,
         *     context?: any
         * ): TResult[];
         */

        /* dependencies
         * safeCb types 
         */

        exports = function exports(arr, iterator, ctx) {
            var ret = [];
            iterator = safeCb(iterator, ctx);
            var i = -1;
            var len = arr.length;

            while (++i < len) {
                var val = arr[i];

                if (iterator(val, i, arr)) {
                    ret.push(val);
                    arr.splice(i, 1);
                }
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ ReduceStore ------------------------------ */

    _.ReduceStore = (function (exports) {
        /* Simplified redux like state container.
         *
         * ### constructor
         *
         * |Name        |Type    |Desc                       |
         * |------------|--------|---------------------------|
         * |reducer     |function|Function returns next state|
         * |initialState|*       |Initial state              |
         *
         * ### subscribe
         *
         * Add a change listener.
         *
         * |Name    |Type    |Desc                                |
         * |--------|--------|------------------------------------|
         * |listener|function|Callback to invoke on every dispatch|
         * |return  |function|Function to unsubscribe             |
         *
         * ### dispatch
         *
         * Dispatch an action.
         *
         * |Name  |Type  |Desc                       |
         * |------|------|---------------------------|
         * |action|object|Object representing changes|
         * |return|object|Same action object         |
         *
         * ### getState
         *
         * Get the current state.
         */

        /* example
         * var store = new ReduceStore(function (state, action) {
         *     switch (action.type) {
         *         case 'INCREMENT': return state + 1;
         *         case 'DECREMENT': return state - 1;
         *         default: return state;
         *     }
         * }, 0);
         *
         * store.subscribe(function () {
         *     console.log(store.getState());
         * });
         *
         * store.dispatch({type: 'INCREMENT'}); // 1
         * store.dispatch({type: 'INCREMENT'}); // 2
         * store.dispatch({type: 'DECREMENT'}); // 1
         */

        /* typescript
         * export declare class ReduceStore {
         *     constructor(reducer: Function, initialState: any);
         *     subscribe(listener: Function): Function;
         *     dispatch(action: any): any;
         *     getState(): any;
         * }
         */

        /* dependencies
         * Class clone remove 
         */

        exports = Class({
            initialize: function ReduceStore(reducer, initialState) {
                this._reducer = reducer;
                this._state = initialState;
                this._curListeners = [];
                this._nextListeners = this._curListeners;
            },
            subscribe: function subscribe(listener) {
                var isSubscribed = true;

                this._ensureCanMutateNextListeners();

                this._nextListeners.push(listener);

                var self = this;
                return function () {
                    if (!isSubscribed) return;
                    isSubscribed = false;

                    self._ensureCanMutateNextListeners();

                    remove(self._nextListeners, function (val) {
                        return val === listener;
                    });
                };
            },
            dispatch: function dispatch(action) {
                this._state = this._reducer(this._state, action);
                var listeners = (this._curListeners = this._nextListeners);

                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i]();
                }

                return action;
            },
            getState: function getState() {
                return this._state;
            },
            _ensureCanMutateNextListeners: function _ensureCanMutateNextListeners() {
                if (this._nextListeners === this._curListeners) {
                    this._nextListeners = clone(this._curListeners);
                }
            }
        });

        return exports;
    })({});

    /* ------------------------------ some ------------------------------ */

    var some = _.some = (function (exports) {
        /* Check if predicate return truthy for any element.
         *
         * |Name     |Type        |Desc                                          |
         * |---------|------------|----------------------------------------------|
         * |obj      |array object|Collection to iterate over                    |
         * |predicate|function    |Function to invoked per iteration             |
         * |ctx      |*           |Predicate context                             |
         * |return   |boolean     |True if any element passes the predicate check|
         */

        /* example
         * some([2, 5], function (val) {
         *     return val % 2 === 0;
         * }); // -> true
         */

        /* typescript
         * export declare function some<T>(
         *     list: types.List<T>,
         *     iterator?: types.ListIterator<T, boolean>,
         *     context?: any
         * ): boolean;
         * export declare function some<T>(
         *     object: types.Dictionary<T>,
         *     iterator?: types.ObjectIterator<T, boolean>,
         *     context?: any
         * ): boolean;
         */

        /* dependencies
         * safeCb isArrLike keys types 
         */

        exports = function exports(obj, predicate, ctx) {
            predicate = safeCb(predicate, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len = (_keys || obj).length;

            for (var i = 0; i < len; i++) {
                var key = _keys ? _keys[i] : i;
                if (predicate(obj[key], key, obj)) return true;
            }

            return false;
        };

        return exports;
    })({});

    /* ------------------------------ strToBytes ------------------------------ */

    var strToBytes = _.strToBytes = (function (exports) {
        /* Convert string into bytes.
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |str   |string|String to convert|
         * |return|array |Bytes array      |
         */

        /* example
         * strToBytes('licia'); // -> [108, 105, 99, 105, 97]
         */

        /* typescript
         * export declare function strToBytes(str: string): number[];
         */
        exports = function exports(str) {
            var bytes = [];

            for (var i = 0, len = str.length; i < len; i++) {
                bytes.push(str.charCodeAt(i) & 0xff);
            }

            return bytes;
        };

        return exports;
    })({});

    /* ------------------------------ md5 ------------------------------ */

    _.md5 = (function (exports) {
        /* MD5 implementation.
         *
         * |Name   |Type  |Desc              |
         * |-------|------|------------------|
         * |msg    |string|Message to encrypt|
         * |return |string|MD5 hash          |
         */

        /* example
         * md5('licia'); // -> 'e59f337d85e9a467f1783fab282a41d0'
         */

        /* typescript
         * export declare function md5(msg: string): string;
         */

        /* dependencies
         * utf8 strToBytes 
         */ // https://github.com/pvorb/node-md5

        exports = function exports(msg) {
            var bytes = strToBytes(utf8.encode(msg));
            var m = bytesToWords(bytes);
            var l = bytes.length * 8;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878; // Swap endian

            for (var i = 0; i < m.length; i++) {
                m[i] =
                    (((m[i] << 8) | (m[i] >>> 24)) & 0x00ff00ff) |
                    (((m[i] << 24) | (m[i] >>> 8)) & 0xff00ff00);
            } // Padding

            m[l >>> 5] |= 0x80 << l % 32;
            m[(((l + 64) >>> 9) << 4) + 14] = l;

            for (var _i = 0; _i < m.length; _i += 16) {
                var aa = a;
                var bb = b;
                var cc = c;
                var dd = d;
                a = FF(a, b, c, d, m[_i + 0], 7, -680876936);
                d = FF(d, a, b, c, m[_i + 1], 12, -389564586);
                c = FF(c, d, a, b, m[_i + 2], 17, 606105819);
                b = FF(b, c, d, a, m[_i + 3], 22, -1044525330);
                a = FF(a, b, c, d, m[_i + 4], 7, -176418897);
                d = FF(d, a, b, c, m[_i + 5], 12, 1200080426);
                c = FF(c, d, a, b, m[_i + 6], 17, -1473231341);
                b = FF(b, c, d, a, m[_i + 7], 22, -45705983);
                a = FF(a, b, c, d, m[_i + 8], 7, 1770035416);
                d = FF(d, a, b, c, m[_i + 9], 12, -1958414417);
                c = FF(c, d, a, b, m[_i + 10], 17, -42063);
                b = FF(b, c, d, a, m[_i + 11], 22, -1990404162);
                a = FF(a, b, c, d, m[_i + 12], 7, 1804603682);
                d = FF(d, a, b, c, m[_i + 13], 12, -40341101);
                c = FF(c, d, a, b, m[_i + 14], 17, -1502002290);
                b = FF(b, c, d, a, m[_i + 15], 22, 1236535329);
                a = GG(a, b, c, d, m[_i + 1], 5, -165796510);
                d = GG(d, a, b, c, m[_i + 6], 9, -1069501632);
                c = GG(c, d, a, b, m[_i + 11], 14, 643717713);
                b = GG(b, c, d, a, m[_i + 0], 20, -373897302);
                a = GG(a, b, c, d, m[_i + 5], 5, -701558691);
                d = GG(d, a, b, c, m[_i + 10], 9, 38016083);
                c = GG(c, d, a, b, m[_i + 15], 14, -660478335);
                b = GG(b, c, d, a, m[_i + 4], 20, -405537848);
                a = GG(a, b, c, d, m[_i + 9], 5, 568446438);
                d = GG(d, a, b, c, m[_i + 14], 9, -1019803690);
                c = GG(c, d, a, b, m[_i + 3], 14, -187363961);
                b = GG(b, c, d, a, m[_i + 8], 20, 1163531501);
                a = GG(a, b, c, d, m[_i + 13], 5, -1444681467);
                d = GG(d, a, b, c, m[_i + 2], 9, -51403784);
                c = GG(c, d, a, b, m[_i + 7], 14, 1735328473);
                b = GG(b, c, d, a, m[_i + 12], 20, -1926607734);
                a = HH(a, b, c, d, m[_i + 5], 4, -378558);
                d = HH(d, a, b, c, m[_i + 8], 11, -2022574463);
                c = HH(c, d, a, b, m[_i + 11], 16, 1839030562);
                b = HH(b, c, d, a, m[_i + 14], 23, -35309556);
                a = HH(a, b, c, d, m[_i + 1], 4, -1530992060);
                d = HH(d, a, b, c, m[_i + 4], 11, 1272893353);
                c = HH(c, d, a, b, m[_i + 7], 16, -155497632);
                b = HH(b, c, d, a, m[_i + 10], 23, -1094730640);
                a = HH(a, b, c, d, m[_i + 13], 4, 681279174);
                d = HH(d, a, b, c, m[_i + 0], 11, -358537222);
                c = HH(c, d, a, b, m[_i + 3], 16, -722521979);
                b = HH(b, c, d, a, m[_i + 6], 23, 76029189);
                a = HH(a, b, c, d, m[_i + 9], 4, -640364487);
                d = HH(d, a, b, c, m[_i + 12], 11, -421815835);
                c = HH(c, d, a, b, m[_i + 15], 16, 530742520);
                b = HH(b, c, d, a, m[_i + 2], 23, -995338651);
                a = II(a, b, c, d, m[_i + 0], 6, -198630844);
                d = II(d, a, b, c, m[_i + 7], 10, 1126891415);
                c = II(c, d, a, b, m[_i + 14], 15, -1416354905);
                b = II(b, c, d, a, m[_i + 5], 21, -57434055);
                a = II(a, b, c, d, m[_i + 12], 6, 1700485571);
                d = II(d, a, b, c, m[_i + 3], 10, -1894986606);
                c = II(c, d, a, b, m[_i + 10], 15, -1051523);
                b = II(b, c, d, a, m[_i + 1], 21, -2054922799);
                a = II(a, b, c, d, m[_i + 8], 6, 1873313359);
                d = II(d, a, b, c, m[_i + 15], 10, -30611744);
                c = II(c, d, a, b, m[_i + 6], 15, -1560198380);
                b = II(b, c, d, a, m[_i + 13], 21, 1309151649);
                a = II(a, b, c, d, m[_i + 4], 6, -145523070);
                d = II(d, a, b, c, m[_i + 11], 10, -1120210379);
                c = II(c, d, a, b, m[_i + 2], 15, 718787259);
                b = II(b, c, d, a, m[_i + 9], 21, -343485551);
                a = (a + aa) >>> 0;
                b = (b + bb) >>> 0;
                c = (c + cc) >>> 0;
                d = (d + dd) >>> 0;
            }

            return bytesToHex(wordsToBytes(endian([a, b, c, d])));
        };

        function FF(a, b, c, d, x, s, t) {
            var n = a + ((b & c) | (~b & d)) + (x >>> 0) + t;
            return ((n << s) | (n >>> (32 - s))) + b;
        }

        function GG(a, b, c, d, x, s, t) {
            var n = a + ((b & d) | (c & ~d)) + (x >>> 0) + t;
            return ((n << s) | (n >>> (32 - s))) + b;
        }

        function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + (x >>> 0) + t;
            return ((n << s) | (n >>> (32 - s))) + b;
        }

        function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
            return ((n << s) | (n >>> (32 - s))) + b;
        }

        function wordsToBytes(words) {
            var bytes = [];

            for (var b = 0, len = words.length * 32; b < len; b += 8) {
                bytes.push((words[b >>> 5] >>> (24 - (b % 32))) & 0xff);
            }

            return bytes;
        }

        function bytesToHex(bytes) {
            var hex = [];

            for (var i = 0, len = bytes.length; i < len; i++) {
                hex.push((bytes[i] >>> 4).toString(16));
                hex.push((bytes[i] & 0xf).toString(16));
            }

            return hex.join('');
        }

        function endian(n) {
            if (n.constructor == Number) {
                return (rotl(n, 8) & 0x00ff00ff) | (rotl(n, 24) & 0xff00ff00);
            }

            for (var i = 0; i < n.length; i++) {
                n[i] = endian(n[i]);
            }

            return n;
        }

        function rotl(n, b) {
            return (n << b) | (n >>> (32 - b));
        }

        function bytesToWords(bytes) {
            var words = [];

            for (var i = 0, b = 0, len = bytes.length; i < len; i++, b += 8) {
                words[b >>> 5] |= bytes[i] << (24 - (b % 32));
            }

            return words;
        }

        return exports;
    })({});

    /* ------------------------------ memStorage ------------------------------ */

    _.memStorage = (function (exports) {
        /* Memory-backed implementation of the Web Storage API.
         *
         * A replacement for environments where localStorage or sessionStorage is not available.
         */

        /* example
         * var localStorage = window.localStorage || memStorage;
         * localStorage.setItem('test', 'licia');
         */

        /* typescript
         * export declare const memStorage: typeof window.localStorage;
         */

        /* dependencies
         * keys 
         */

        exports = {
            getItem: function getItem(key) {
                return (API_KEYS[key] ? cloak[key] : this[key]) || null;
            },
            setItem: function setItem(key, val) {
                API_KEYS[key] ? (cloak[key] = val) : (this[key] = val);
            },
            removeItem: function removeItem(key) {
                API_KEYS[key] ? delete cloak[key] : delete this[key];
            },
            key: function key(i) {
                var keys = enumerableKeys();
                return i >= 0 && i < keys.length ? keys[i] : null;
            },
            clear: function clear() {
                var keys = uncloakedKeys();
                /* eslint-disable no-cond-assign */

                for (var i = 0, key; (key = keys[i]); i++) {
                    delete this[key];
                }

                keys = cloakedKeys();
                /* eslint-disable no-cond-assign */

                for (i = 0; (key = keys[i]); i++) {
                    delete cloak[key];
                }
            }
        };
        Object.defineProperty(exports, 'length', {
            enumerable: false,
            configurable: true,
            get: function get() {
                return enumerableKeys().length;
            }
        });
        var cloak = {};
        var API_KEYS = {
            getItem: 1,
            setItem: 1,
            removeItem: 1,
            key: 1,
            clear: 1,
            length: 1
        };

        function enumerableKeys() {
            return uncloakedKeys().concat(cloakedKeys());
        }

        function uncloakedKeys() {
            return keys(exports).filter(function (key) {
                return !API_KEYS[key];
            });
        }

        function cloakedKeys() {
            return keys(cloak);
        }

        return exports;
    })({});

    /* ------------------------------ mergeSort ------------------------------ */

    _.mergeSort = (function (exports) {
        /* Merge sort implementation.
         *
         * Note: It's not an "in-place" sort.
         *
         * |Name  |Type    |Desc         |
         * |------|--------|-------------|
         * |arr   |array   |Array to sort|
         * |[cmp] |function|Comparator   |
         * |return|array   |Sorted array |
         */

        /* example
         * mergeSort([2, 1]); // -> [1, 2]
         */

        /* typescript
         * export declare function mergeSort(arr: any[], cmp?: Function): any[];
         */
        exports = (function (_exports) {
            function exports(_x, _x2) {
                return _exports.apply(this, arguments);
            }

            exports.toString = function () {
                return _exports.toString();
            };

            return exports;
        })(function (arr, cmp) {
            cmp = cmp || comparator;
            if (arr.length <= 1) return arr;
            var middle = floor(arr.length / 2),
                left = arr.slice(0, middle),
                right = arr.slice(middle);
            return merge(exports(left, cmp), exports(right, cmp), cmp);
        });

        function merge(left, right, cmp) {
            var ret = [],
                i = 0,
                j = 0;

            while (i < left.length && j < right.length) {
                cmp(left[i], right[j]) < 0 ? ret.push(left[i++]) : ret.push(right[j++]);
            }

            while (i < left.length) {
                ret.push(left[i++]);
            }

            while (j < right.length) {
                ret.push(right[j++]);
            }

            return ret;
        }

        function comparator(a, b) {
            return a - b;
        }

        var floor = Math.floor;

        return exports;
    })({});

    /* ------------------------------ methods ------------------------------ */

    _.methods = (function (exports) {
        /* Return a sorted list of the names of every method in an object.
         *
         * |Name  |Type  |Desc                    |
         * |------|------|------------------------|
         * |obj   |object|Object to check         |
         * |return|array |Function names in object|
         */

        /* example
         * methods(console); // -> ['Console', 'assert', 'dir', ...]
         */

        /* typescript
         * export declare function methods(obj: any): string[];
         */

        /* dependencies
         * isFn 
         */

        exports = function exports(obj) {
            var ret = [];

            for (var key in obj) {
                if (isFn(obj[key])) ret.push(key);
            }

            return ret.sort();
        };

        return exports;
    })({});

    /* ------------------------------ min ------------------------------ */

    _.min = (function (exports) {
        /* Get minimum value of given numbers.
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |...num|number|Numbers to calculate|
         * |return|number|Minimum value       |
         */

        /* example
         * min(2.3, 1, 4.5, 2); // 1
         */

        /* typescript
         * export declare function min(...num: number[]): number;
         */
        exports = function exports() {
            var arr = arguments,
                ret = arr[0];

            for (var i = 1, len = arr.length; i < len; i++) {
                if (arr[i] < ret) ret = arr[i];
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ toDate ------------------------------ */

    var toDate = _.toDate = (function (exports) {
        /* Convert value to a Date.
         *
         * |Name  |Type|Desc            |
         * |------|----|----------------|
         * |val   |*   |Value to convert|
         * |return|Date|Converted Date  |
         */

        /* example
         * toDate('20180501');
         * toDate('2018-05-01');
         * toDate(1525107450849);
         */

        /* typescript
         * export declare function toDate(val: any): Date;
         */

        /* dependencies
         * isDate isStr 
         */

        exports = function exports(val) {
            if (!val) return new Date();
            if (isDate(val)) return val;

            if (isStr(val)) {
                var match = val.match(regDate);
                if (match) return new Date(match[1], match[2] - 1, match[3]);
            }

            return new Date(val);
        };

        var regDate = /^(\d{4})-?(\d{2})-?(\d{1,2})$/;

        return exports;
    })({});

    /* ------------------------------ ms ------------------------------ */

    var ms = _.ms = (function (exports) {
        /* Convert time string formats to milliseconds.
         *
         * Turn time string into milliseconds.
         *
         * |Name  |Type  |Desc         |
         * |------|------|-------------|
         * |str   |string|String format|
         * |return|number|Milliseconds |
         *
         * Turn milliseconds into time string.
         *
         * |Name  |Type  |Desc         |
         * |------|------|-------------|
         * |num   |number|Milliseconds |
         * |return|string|String format|
         */

        /* example
         * ms('1s'); // -> 1000
         * ms('1m'); // -> 60000
         * ms('1.5h'); // -> 5400000
         * ms('1d'); // -> 86400000
         * ms('1y'); // -> 31557600000
         * ms('1000'); // -> 1000
         * ms(1500); // -> '1.5s'
         * ms(60000); // -> '1m'
         */

        /* typescript
         * export declare function ms(str: string): number;
         * export declare function ms(num: number): string;
         */

        /* dependencies
         * toNum isStr 
         */

        exports = function exports(str) {
            if (isStr(str)) {
                var match = str.match(regStrTime);
                if (!match) return 0;
                return toNum(match[1]) * factor[match[2] || 'ms'];
            } else {
                var num = str,
                    suffix = 'ms';

                for (var i = 0, len = suffixList.length; i < len; i++) {
                    if (num >= factor[suffixList[i]]) {
                        suffix = suffixList[i];
                        break;
                    }
                }

                return +(num / factor[suffix]).toFixed(2) + suffix;
            }
        };

        var factor = {
            ms: 1,
            s: 1000
        };
        factor.m = factor.s * 60;
        factor.h = factor.m * 60;
        factor.d = factor.h * 24;
        factor.y = factor.d * 365.25;
        var suffixList = ['y', 'd', 'h', 'm', 's'];
        var regStrTime = /^((?:\d+)?\.?\d+) *(s|m|h|d|y)?$/;

        return exports;
    })({});

    /* ------------------------------ moment ------------------------------ */

    _.moment = (function (exports) {
        /* Tiny moment.js like implementation.
         *
         * It only supports a subset of moment.js api.
         *
         * ### Available methods
         *
         * format, isValid, isLeapYear, isSame, isBefore, isAfter, year,
         * month, date, hour, minute, second, millisecond, unix, clone,
         * toDate, toArray, toJSON, toISOString, toObject, toString, set,
         * startOf, endOf, add, subtract, diff
         *
         * ### Not supported
         *
         * locale and units like quarter and week.
         *
         * Note: Format uses dateFormat module, so the mask is not quite the same as moment.js.
         */

        /* example
         * moment('20180501').format('yyyy-mm-dd'); // -> '2018-05-01'
         */

        /* typescript
         * export declare namespace moment {
         *    class M {
         *        constructor(value: string | Date);
         *        format(mask: string): string;
         *        isValid(): boolean;
         *        isLeapYear(): boolean;
         *        isSame(that: M): boolean;
         *        valueOf(): number;
         *        isBefore(that: M): boolean;
         *        isAfter(that: M): boolean;
         *        year(): number;
         *        year(number): M;
         *        month(): number;
         *        month(number): M;
         *        date(): number;
         *        date(number): M;
         *        hour(): number;
         *        hour(number): M;
         *        minute(): number;
         *        minute(number): M;
         *        second(): number;
         *        second(number): M;
         *        millisecond(): number;
         *        millisecond(number): M;
         *        unix(): number;
         *        clone(): M;
         *        toDate(): Date;
         *        toArray(): number[];
         *        toJSON(): string;
         *        toISOString(): string;
         *        toObject(): any;
         *        toString(): string;
         *        set(unit: string, num: number): M;
         *        startOf(unit: string): M;
         *        endOf(unit: string): M;
         *        daysInMonth(): number;
         *        add(num: number, unit: string): M;
         *        subtract(num: number, unit: string): M;
         *        diff(input: M | string | Date, unit: string, asFloat: boolean): number;
         *    }
         * }
         * export declare function moment(value: string | Date): moment.M;
         */

        /* dependencies
         * Class toDate dateFormat isLeapYear extend toStr isNil ms 
         */

        exports = function exports(val) {
            return new Moment(val);
        };

        var Moment = Class({
            initialize: function initialize(val) {
                this._d = toDate(val);

                this._init();
            },
            _init: function _init() {
                var d = this._d;
                extend(this, {
                    _year: d.getFullYear(),
                    _month: d.getMonth(),
                    _date: d.getDate(),
                    _hour: d.getHours(),
                    _minute: d.getMinutes(),
                    _second: d.getSeconds(),
                    _millisecond: d.getMilliseconds()
                });
                return this;
            },
            format: function format(mask) {
                return dateFormat(this._d, mask);
            },
            isValid: function isValid() {
                return !(this._d.toString() === 'Invalid Date');
            },
            isLeapYear: (function (_isLeapYear) {
                function isLeapYear() {
                    return _isLeapYear.apply(this, arguments);
                }

                isLeapYear.toString = function () {
                    return _isLeapYear.toString();
                };

                return isLeapYear;
            })(function () {
                return isLeapYear(this._year);
            }),
            isSame: function isSame(that) {
                return this.valueOf() === that.valueOf();
            },
            valueOf: function valueOf() {
                return this._d.getTime();
            },
            isBefore: function isBefore(that) {
                return this.valueOf() < that.valueOf();
            },
            isAfter: function isAfter(that) {
                return this.valueOf() > that.valueOf();
            },
            year: makeGetSet('year'),
            month: makeGetSet('month'),
            date: makeGetSet('date'),
            hour: makeGetSet('hour'),
            minute: makeGetSet('minute'),
            second: makeGetSet('second'),
            millisecond: makeGetSet('millisecond'),
            unix: function unix() {
                return floor(this.valueOf() / 1000);
            },
            clone: function clone() {
                return new Moment(this);
            },
            toDate: function toDate() {
                return new Date(this._d);
            },
            toArray: function toArray() {
                return [
                    this._year,
                    this._month,
                    this._date,
                    this._hour,
                    this._minute,
                    this._second,
                    this._millisecond
                ];
            },
            toJSON: function toJSON() {
                return this.toISOString();
            },
            toISOString: function toISOString() {
                return this.toDate().toISOString();
            },
            toObject: function toObject() {
                return {
                    years: this._year,
                    months: this._month,
                    date: this._date,
                    hours: this._hour,
                    minutes: this._minute,
                    seconds: this._second,
                    milliseconds: this._millisecond
                };
            },
            toString: function toString() {
                return this._d.toUTCString();
            },
            set: function set(unit, num) {
                var d = this._d;
                unit = normalizeUnit(unit);

                switch (unit) {
                    case 'year':
                        d.setFullYear(num);
                        break;

                    case 'month':
                        d.setMonth(num);
                        break;

                    case 'date':
                        d.setDate(num);
                        break;

                    case 'hour':
                        d.setHours(num);
                        break;

                    case 'minute':
                        d.setMinutes(num);
                        break;

                    case 'second':
                        d.setSeconds(num);
                        break;

                    case 'millisecond':
                        d.setMilliseconds(num);
                        break;
                }

                return this._init();
            },
            startOf: function startOf(unit) {
                unit = normalizeUnit(unit);
                /* eslint-disable no-fallthrough */

                switch (unit) {
                    case 'year':
                        this.month(0);

                    case 'month':
                        this.date(1);

                    case 'day':
                    case 'date':
                        this.hour(0);

                    case 'hour':
                        this.minute(0);

                    case 'minute':
                        this.second(0);

                    case 'second':
                        this.millisecond(0);
                }

                return this;
            },
            endOf: function endOf(unit) {
                return this.startOf(unit)
                    .add(1, unit)
                    .subtract(1, 'ms');
            },
            daysInMonth: function daysInMonth() {
                return this.clone()
                    .endOf('month')
                    .date();
            },
            add: createAdder(1),
            subtract: createAdder(-1),
            diff: function diff(input, unit, asFloat) {
                var that = input instanceof Moment ? input : new Moment(input),
                    ret;
                unit = normalizeUnit(unit);
                var diff = this - that;

                switch (unit) {
                    case 'year':
                        ret = monthDiff(this, that) / 12;
                        break;

                    case 'month':
                        ret = monthDiff(this, that);
                        break;

                    case 'second':
                        ret = diff / 1e3;
                        break;
                    // 1000

                    case 'minute':
                        ret = diff / 6e4;
                        break;
                    // 1000 * 60

                    case 'hour':
                        ret = diff / 36e5;
                        break;
                    // 1000 * 60 * 60

                    case 'day':
                        ret = diff / 864e5;
                        break;
                    // 1000 * 60 * 60 * 24

                    default:
                        ret = diff;
                }

                return asFloat ? ret : absFloor(ret);
            }
        });
        var floor = Math.floor,
            ceil = Math.ceil;

        function absFloor(num) {
            return num < 0 ? ceil(num) || 0 : floor(num);
        }

        var unitShorthandMap = {
            y: 'year',
            M: 'month',
            D: 'date',
            d: 'day',
            h: 'hour',
            m: 'minute',
            s: 'second',
            ms: 'millisecond'
        };
        var regEndS = /s$/; // Turn 'y' or 'years' into 'year'

        function normalizeUnit(unit) {
            unit = toStr(unit);
            if (unitShorthandMap[unit]) return unitShorthandMap[unit];
            return unit.toLowerCase().replace(regEndS, '');
        }

        function makeGetSet(unit) {
            return function (num) {
                return isNil(num) ? this['_' + unit] : this.set(unit, num);
            };
        }

        function createAdder(dir) {
            return function (num, unit) {
                unit = normalizeUnit(unit);
                if (unit === 'month') return this.month(this._month + dir * num);
                if (unit === 'year') return this.year(this._year + dir * num);
                var duration = createDuration(num, unit);
                this._d = new Date(this.valueOf() + dir * duration);
                return this._init();
            };
        }

        var msMap = {
            day: 'd',
            hour: 'h',
            minute: 'm',
            second: 's',
            millisecond: ''
        };

        function createDuration(num, unit) {
            return ms(num + msMap[unit]);
        } // From moment.js

        function monthDiff(a, b) {
            var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
                anchor = a.clone().add(wholeMonthDiff, 'months'),
                anchor2,
                adjust;

            if (b - anchor < 0) {
                anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
                adjust = (b - anchor) / (anchor - anchor2);
            } else {
                anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
                adjust = (b - anchor) / (anchor2 - anchor);
            }

            return -(wholeMonthDiff + adjust) || 0;
        }

        return exports;
    })({});

    /* ------------------------------ negate ------------------------------ */

    var negate = _.negate = (function (exports) {
        /* Create a function that negates the result of the predicate function.
         *
         * |Name     |Type    |Desc               |
         * |---------|--------|-------------------|
         * |predicate|function|Predicate to negate|
         * |return   |function|New function       |
         */

        /* example
         * function even(n) { return n % 2 === 0 }
         * // filter([1, 2, 3, 4, 5, 6], negate(even)); -> [1, 3, 5]
         */

        /* typescript
         * export declare function negate(predicate: Function): Function;
         */
        exports = function exports(predicate) {
            return function () {
                return !predicate.apply(this, arguments);
            };
        };

        return exports;
    })({});

    /* ------------------------------ normalizeHeader ------------------------------ */

    _.normalizeHeader = (function (exports) {
        /* Normalize http header name.
         *
         * |Name  |Type  |Desc               |
         * |------|------|-------------------|
         * |header|string|Header to normalize|
         * |return|string|Normalized header  |
         */

        /* example
         * normalizeHeader('content-type'); // -> 'Content-Type'
         * normalizeHeader('etag'); // -> 'ETag'
         */

        /* typescript
         * export declare function normalizeHeader(header: string): string;
         */

        /* dependencies
         * map capitalize 
         */

        exports = function exports(header) {
            var ret = specialHeaders[header.toLowerCase()];

            if (!ret) {
                ret = map(header.split('-'), capitalize).join('-');
            }

            return ret;
        };

        var specialHeaders = {
            'content-md5': 'Content-MD5',
            dnt: 'DNT',
            etag: 'ETag',
            'last-event-id': 'Last-Event-ID',
            tcn: 'TCN',
            te: 'TE',
            'www-authenticate': 'WWW-Authenticate',
            'x-dnsprefetch-control': 'X-DNSPrefetch-Control'
        };

        return exports;
    })({});

    /* ------------------------------ normalizePath ------------------------------ */

    _.normalizePath = (function (exports) {
        /* Normalize file path slashes.
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |path  |string|Path to normalize|
         * |return|string|Normalized path  |
         */

        /* example
         * normalizePath('\\foo\\bar\\'); // -> '/foo/bar/'
         * normalizePath('./foo//bar'); // -> './foo/bar'
         */

        /* typescript
         * export declare function normalizePath(path: string): string;
         */
        exports = function exports(path) {
            return path.replace(regSlashes, '/');
        };

        var regSlashes = /[\\/]+/g;

        return exports;
    })({});

    /* ------------------------------ pick ------------------------------ */

    var pick = _.pick = (function (exports) {
        /* Return a filtered copy of an object.
         *
         * |Name  |Type                 |Desc           |
         * |------|---------------------|---------------|
         * |object|object               |Source object  |
         * |filter|string array function|Object filter  |
         * |return|object               |Filtered object|
         */

        /* example
         * pick({a: 1, b: 2}, 'a'); // -> {a: 1}
         * pick({a: 1, b: 2, c: 3}, ['b', 'c']) // -> {b: 2, c: 3}
         * pick({a: 1, b: 2, c: 3, d: 4}, function (val, key) {
         *     return val % 2;
         * }); // -> {a: 1, c: 3}
         */

        /* typescript
         * export declare function pick(
         *     object: any,
         *     filter: string | string[] | Function,
         * ): any;
         */

        /* dependencies
         * isStr isArr contain each 
         */

        exports = function exports(obj, filter, omit) {
            if (isStr(filter)) filter = [filter];

            if (isArr(filter)) {
                var keys = filter;

                filter = function filter(val, key) {
                    return contain(keys, key);
                };
            }

            var ret = {};

            var iteratee = function iteratee(val, key) {
                if (filter(val, key)) ret[key] = val;
            };

            if (omit) {
                iteratee = function iteratee(val, key) {
                    if (!filter(val, key)) ret[key] = val;
                };
            }

            each(obj, iteratee);
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ omit ------------------------------ */

    _.omit = (function (exports) {
        /* Opposite of pick.
         *
         * |Name  |Type                 |Desc           |
         * |------|---------------------|---------------|
         * |obj   |object               |Source object  |
         * |filter|string array function|Object filter  |
         * |return|object               |Filtered object|
         */

        /* example
         * omit({a: 1, b: 2}, 'a'); // -> {b: 2}
         * omit({a: 1, b: 2, c: 3}, ['b', 'c']) // -> {a: 1}
         * omit({a: 1, b: 2, c: 3, d: 4}, function (val, key) {
         *     return val % 2;
         * }); // -> {b: 2, d: 4}
         */

        /* typescript
         * export declare function omit(obj: any, filter: string | string[] | Function): any;
         */

        /* dependencies
         * pick 
         */

        exports = function exports(obj, filter) {
            return pick(obj, filter, true);
        };

        return exports;
    })({});

    /* ------------------------------ partial ------------------------------ */

    var partial = _.partial = (function (exports) {
        /* Partially apply a function by filling in given arguments.
         *
         * |Name       |Type    |Desc                                    |
         * |-----------|--------|----------------------------------------|
         * |fn         |function|Function to partially apply arguments to|
         * |...partials|*       |Arguments to be partially applied       |
         * |return     |function|New partially applied function          |
         */

        /* example
         * var sub5 = partial(function (a, b) { return b - a }, 5);
         * sub5(20); // -> 15
         */

        /* typescript
         * export declare function partial(fn: Function, ...partials: any[]): Function;
         */

        /* dependencies
         * restArgs toArr 
         */

        exports = restArgs(function (fn, partials) {
            return function () {
                var args = [];
                args = args.concat(partials);
                args = args.concat(toArr(arguments));
                return fn.apply(this, args);
            };
        });

        return exports;
    })({});

    /* ------------------------------ once ------------------------------ */

    var once = _.once = (function (exports) {
        /* Create a function that invokes once.
         *
         * |Name  |Type    |Desc                   |
         * |------|--------|-----------------------|
         * |fn    |function|Function to restrict   |
         * |return|function|New restricted function|
         */

        /* example
         * function init() {};
         * var initOnce = once(init);
         * initOnce();
         * initOnce(); // -> init is invoked once
         */

        /* typescript
         * export declare function once(fn: Function): Function;
         */

        /* dependencies
         * partial before 
         */

        exports = partial(before, 2);

        return exports;
    })({});

    /* ------------------------------ Emitter ------------------------------ */

    var Emitter = _.Emitter = (function (exports) {
        /* Event emitter class which provides observer pattern.
         *
         * ### on
         *
         * Bind event.
         *
         * ### off
         *
         * Unbind event.
         *
         * ### once
         *
         * Bind event that trigger once.
         *
         * |Name    |Type    |Desc          |
         * |--------|--------|--------------|
         * |event   |string  |Event name    |
         * |listener|function|Event listener|
         *
         * ### emit
         *
         * Emit event.
         *
         * |Name   |Type  |Desc                        |
         * |-------|------|----------------------------|
         * |event  |string|Event name                  |
         * |...args|*     |Arguments passed to listener|
         *
         * ### mixin
         *
         * [static] Mixin object class methods.
         *
         * |Name|Type  |Desc           |
         * |----|------|---------------|
         * |obj |object|Object to mixin|
         */

        /* example
         * var event = new Emitter();
         * event.on('test', function () { console.log('test') });
         * event.emit('test'); // Logs out 'test'.
         * Emitter.mixin({});
         */

        /* typescript
         * export declare namespace Emitter {
         *     function mixin(obj: any): any;
         * }
         * export declare class Emitter {
         *     on(event: string, listener: Function): Emitter;
         *     off(event: string, listener: Function): Emitter;
         *     once(event: string, listener: Function): Emitter;
         *     emit(event: string): Emitter;
         * }
         */

        /* dependencies
         * Class has each slice once 
         */

        exports = Class(
            {
                initialize: function Emitter() {
                    this._events = this._events || {};
                },
                on: function on(event, listener) {
                    this._events[event] = this._events[event] || [];

                    this._events[event].push(listener);

                    return this;
                },
                off: function off(event, listener) {
                    if (!has(this._events, event)) return;

                    this._events[event].splice(
                        this._events[event].indexOf(listener),
                        1
                    );

                    return this;
                },
                once: (function (_once) {
                    function once(_x, _x2) {
                        return _once.apply(this, arguments);
                    }

                    once.toString = function () {
                        return _once.toString();
                    };

                    return once;
                })(function (event, listener) {
                    this.on(event, once(listener));
                    return this;
                }),
                emit: function emit(event) {
                    if (!has(this._events, event)) return;
                    var args = slice(arguments, 1);
                    each(
                        this._events[event],
                        function (val) {
                            val.apply(this, args);
                        },
                        this
                    );
                    return this;
                }
            },
            {
                mixin: function mixin(obj) {
                    each(['on', 'off', 'once', 'emit'], function (val) {
                        obj[val] = exports.prototype[val];
                    });
                    obj._events = obj._events || {};
                }
            }
        );

        return exports;
    })({});

    /* ------------------------------ Logger ------------------------------ */

    _.Logger = (function (exports) {
        /* Simple logger with level filter.
         *
         * ### constructor
         *
         * |Name       |Type  |Desc        |
         * |-----------|------|------------|
         * |name       |string|Logger name |
         * |level=DEBUG|number|Logger level|
         *
         * ### setLevel
         *
         * Set level.
         *
         * |Name |Type         |Desc        |
         * |-----|-------------|------------|
         * |level|number string|Logger level|
         *
         * ### getLevel
         *
         * Get current level.
         *
         * ### trace, debug, info, warn, error
         *
         * Logging methods.
         *
         * ### Log Levels
         *
         * TRACE, DEBUG, INFO, WARN, ERROR and SILENT.
         */

        /* example
         * var logger = new Logger('licia', Logger.level.ERROR);
         * logger.trace('test');
         *
         * // Format output.
         * logger.formatter = function (type, argList) {
         *     argList.push(new Date().getTime());
         *
         *     return argList;
         * };
         *
         * logger.on('all', function (type, argList) {
         *     // It's not affected by log level.
         * });
         *
         * logger.on('debug', function (argList) {
         *     // Affected by log level.
         * });
         */

        /* typescript
         * export declare class Logger extends Emitter {
         *     name: string;
         *     formatter(type: string, argList: any[]): any[];
         *     constructor(name: string, level?: string | number);
         *     setLevel(level: string | number): Logger;
         *     getLevel(): number;
         *     trace(...args: any[]): Logger;
         *     debug(...args: any[]): Logger;
         *     info(...args: any[]): Logger;
         *     warn(...args: any[]): Logger;
         *     error(...args: any[]): Logger;
         *     static level: Enum;
         * }
         */

        /* dependencies
         * Emitter Enum toArr isUndef clone isStr isNum 
         */

        exports = Emitter.extend(
            {
                initialize: function Logger(name, level) {
                    this.name = name;
                    this.setLevel(isUndef(level) ? exports.level.DEBUG : level);
                    this.callSuper(Emitter, 'initialize', arguments);
                },
                setLevel: function setLevel(level) {
                    if (isStr(level)) {
                        level = exports.level[level.toUpperCase()];
                        if (level) this._level = level;
                        return this;
                    }

                    if (isNum(level)) this._level = level;
                    return this;
                },
                getLevel: function getLevel() {
                    return this._level;
                },
                formatter: function formatter(type, argList) {
                    return argList;
                },
                trace: function trace() {
                    return this._log('trace', arguments);
                },
                debug: function debug() {
                    return this._log('debug', arguments);
                },
                info: function info() {
                    return this._log('info', arguments);
                },
                warn: function warn() {
                    return this._log('warn', arguments);
                },
                error: function error() {
                    return this._log('error', arguments);
                },
                _log: function _log(type, argList) {
                    argList = toArr(argList);
                    if (argList.length === 0) return this;
                    this.emit('all', type, clone(argList));
                    if (exports.level[type.toUpperCase()] < this._level) return this;
                    this.emit(type, clone(argList));
                    /* eslint-disable no-console */

                    var consoleMethod = type === 'debug' ? console.log : console[type];
                    consoleMethod.apply(console, this.formatter(type, argList));
                    return this;
                }
            },
            {
                level: new Enum({
                    TRACE: 0,
                    DEBUG: 1,
                    INFO: 2,
                    WARN: 3,
                    ERROR: 4,
                    SILENT: 5
                })
            }
        );

        return exports;
    })({});

    /* ------------------------------ State ------------------------------ */

    var State = _.State = (function (exports) {
        /* Simple state machine.
         *
         * Extend from Emitter.
         *
         * ### constructor
         *
         * |Name   |Type  |Desc                  |
         * |-------|------|----------------------|
         * |initial|string|Initial state         |
         * |events |object|Events to change state|
         *
         * ### is
         *
         * Check current state.
         *
         * |Name  |Type   |Desc                                    |
         * |------|-------|----------------------------------------|
         * |value |string |State to check                          |
         * |return|boolean|True if current state equals given value|
         */

        /* example
         * var state = new State('empty', {
         *     load: {from: 'empty', to: 'pause'},
         *     play: {from: 'pause', to: 'play'},
         *     pause: {from: ['play', 'empty'], to: 'pause'},
         *     unload: {from: ['play', 'pause'], to: 'empty'}
         * });
         *
         * state.is('empty'); // -> true
         * state.load();
         * state.is('pause'); // -> true
         * state.on('play', function (src) {
         *     console.log(src); // -> 'eustia'
         * });
         * state.on('error', function (err, event) {
         *     // Error handler
         * });
         * state.play('eustia');
         */

        /* typescript
         * export declare class State extends Emitter {
         *     constructor(initial: string, events: any);
         *     is(state: string): boolean;
         *     [event: string]: any;
         * }
         */

        /* dependencies
         * Emitter each some toArr 
         */

        exports = Emitter.extend({
            className: 'State',
            initialize: function initialize(initial, events) {
                this.callSuper(Emitter, 'initialize');
                this.current = initial;
                var self = this;
                each(events, function (event, key) {
                    self[key] = buildEvent(key, event);
                });
            },
            is: function is(state) {
                return this.current === state;
            }
        });

        function buildEvent(name, event) {
            var from = toArr(event.from),
                to = event.to;
            return function () {
                var args = toArr(arguments);
                args.unshift(name);
                var hasEvent = some(
                    from,
                    function (val) {
                        return this.current === val;
                    },
                    this
                );

                if (hasEvent) {
                    this.current = to;
                    this.emit.apply(this, args);
                } else {
                    this.emit(
                        'error',
                        new Error(this.current + ' => ' + to + ' error'),
                        name
                    );
                }
            };
        }

        return exports;
    })({});

    /* ------------------------------ Promise ------------------------------ */

    var Promise = _.Promise = (function (exports) {
        /* Lightweight Promise implementation.
         *
         * [Promises spec](https://github.com/promises-aplus/promises-spec)
         */

        /* example
         * function get(url) {
         *     return new Promise(function (resolve, reject) {
         *         var req = new XMLHttpRequest();
         *         req.open('GET', url);
         *         req.onload = function () {
         *             req.status == 200 ? resolve(req.response) : reject(Error(req.statusText));
         *         };
         *         req.onerror = function () { reject(Error('Network Error')) };
         *         req.send();
         *     });
         * }
         *
         * get('test.json').then(function (result) {
         *     // Do something...
         * });
         */

        /* typescript
         */

        /* dependencies
         * Class isObj isFn State bind nextTick noop 
         */

        var Promise = (exports = Class(
            {
                initialize: function Promise(fn) {
                    if (!isObj(this))
                        throw new TypeError('Promises must be constructed via new');
                    if (!isFn(fn)) throw new TypeError(fn + ' is not a function');
                    var self = this;
                    this._state = new State('pending', {
                        fulfill: {
                            from: 'pending',
                            to: 'fulfilled'
                        },
                        reject: {
                            from: 'pending',
                            to: 'rejected'
                        },
                        adopt: {
                            from: 'pending',
                            to: 'adopted'
                        }
                    })
                        .on('fulfill', assignVal)
                        .on('reject', assignVal)
                        .on('adopt', assignVal);

                    function assignVal(val) {
                        self._value = val;
                    }

                    this._handled = false;
                    this._value = undefined;
                    this._deferreds = [];
                    doResolve(fn, this);
                },
                catch: function _catch(onRejected) {
                    return this.then(null, onRejected);
                },
                then: function then(onFulfilled, onRejected) {
                    var promise = new Promise(noop);
                    handle(this, new Handler(onFulfilled, onRejected, promise));
                    return promise;
                }
            },
            {
                all: function all(arr) {
                    var args = toArr(arr);
                    return new Promise(function (resolve, reject) {
                        if (args.length === 0) return resolve([]);
                        var remaining = args.length;

                        function res(i, val) {
                            try {
                                if (val && (isObj(val) || isFn(val))) {
                                    var then = val.then;

                                    if (isFn(then)) {
                                        then.call(
                                            val,
                                            function (val) {
                                                res(i, val);
                                            },
                                            reject
                                        );
                                        return;
                                    }
                                }

                                args[i] = val;
                                if (--remaining === 0) resolve(args);
                            } catch (e) {
                                reject(e);
                            }
                        }

                        for (var i = 0; i < args.length; i++) {
                            res(i, args[i]);
                        }
                    });
                },
                resolve: function resolve(val) {
                    if (val && isObj(val) && val.constructor === Promise) return val;
                    return new Promise(function (resolve) {
                        resolve(val);
                    });
                },
                reject: function reject(val) {
                    return new Promise(function (resolve, reject) {
                        reject(val);
                    });
                },
                race: function race(values) {
                    return new Promise(function (resolve, reject) {
                        for (var i = 0, len = values.length; i < len; i++) {
                            values[i].then(resolve, reject);
                        }
                    });
                }
            }
        ));
        var Handler = Class({
            initialize: function Handler(onFulfilled, onRejected, promise) {
                this.onFulfilled = isFn(onFulfilled) ? onFulfilled : null;
                this.onRejected = isFn(onRejected) ? onRejected : null;
                this.promise = promise;
            }
        });

        function reject(self, err) {
            self._state.reject(err);

            finale(self);
        }

        function resolve(self, val) {
            try {
                if (val === self)
                    throw new TypeError('A promise cannot be resolved with itself');

                if (val && (isObj(val) || isFn(val))) {
                    var then = val.then;

                    if (val instanceof Promise) {
                        self._state.adopt(val);

                        return finale(self);
                    }

                    if (isFn(then)) return doResolve(bind(then, val), self);
                }

                self._state.fulfill(val);

                finale(self);
            } catch (e) {
                reject(self, e);
            }
        }

        function finale(self) {
            for (var i = 0, len = self._deferreds.length; i < len; i++) {
                handle(self, self._deferreds[i]);
            }

            self._deferreds = null;
        }

        function handle(self, deferred) {
            while (self._state.is('adopted')) {
                self = self._value;
            }

            if (self._state.is('pending')) return self._deferreds.push(deferred);
            self._handled = true;
            nextTick(function () {
                var isFulfilled = self._state.is('fulfilled');

                var cb = isFulfilled ? deferred.onFulfilled : deferred.onRejected;
                if (cb === null)
                    return (isFulfilled ? resolve : reject)(
                        deferred.promise,
                        self._value
                    );
                var ret;

                try {
                    ret = cb(self._value);
                } catch (e) {
                    return reject(deferred.promise, e);
                }

                resolve(deferred.promise, ret);
            });
        }

        function doResolve(fn, self) {
            var done = false;

            try {
                fn(
                    function (val) {
                        if (done) return;
                        done = true;
                        resolve(self, val);
                    },
                    function (reason) {
                        if (done) return;
                        done = true;
                        reject(self, reason);
                    }
                );
            } catch (e) {
                if (done) return;
                done = true;
                reject(self, e);
            }
        }

        return exports;
    })({});

    /* ------------------------------ Store ------------------------------ */

    _.Store = (function (exports) {
        /* Memory storage.
         *
         * Extend from Emitter.
         *
         * ### constructor
         *
         * |Name|Type  |Desc        |
         * |----|------|------------|
         * |data|object|Initial data|
         *
         * ### set
         *
         * Set value.
         *
         * |Name|Type  |Desc        |
         * |----|------|------------|
         * |key |string|Value key   |
         * |val |*     |Value to set|
         *
         * Set values.
         *
         * |Name|Type  |Desc           |
         * |----|------|---------------|
         * |vals|object|Key value pairs|
         *
         * This emit a change event whenever is called.
         *
         * ### get
         *
         * Get value.
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |key   |string|Value key         |
         * |return|*     |Value of given key|
         *
         * Get values.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |keys  |array |Array of keys  |
         * |return|object|Key value pairs|
         *
         * ### remove
         *
         * Remove value.
         *
         * |Name|Type        |Desc         |
         * |----|------------|-------------|
         * |key |string array|Key to remove|
         *
         * ### clear
         *
         * Clear all data.
         *
         * ### each
         *
         * Iterate over values.
         *
         * |Name|Type    |Desc                           |
         * |----|--------|-------------------------------|
         * |fn  |function|Function invoked per interation|
         */

        /* example
         * var store = new Store('test');
         * store.set('user', {name: 'licia'});
         * store.get('user').name; // -> 'licia'
         * store.clear();
         * store.each(function (val, key) {
         *     // Do something.
         * });
         * store.on('change', function (key, newVal, oldVal) {
         *     // It triggers whenever set is called.
         * });
         */

        /* typescript
         * export declare class Store extends Emitter {
         *     constructor(data?: {});
         *     set(key: string, val: any): void;
         *     set(vals: {}): void;
         *     get(key: string): any;
         *     get(keys: string[]): {};
         *     remove(key: string): void;
         *     remove(keys: string[]): void;
         *     clear(): void;
         *     each(fn: (...args: any[]) => void): void;
         * }
         */

        /* dependencies
         * Emitter isStr isObj each toArr 
         */

        exports = Emitter.extend({
            initialize: function Store(data) {
                this.callSuper(Emitter, 'initialize', arguments);
                this._data = data || {};
                this.save(this._data);
            },
            set: function set(key, val) {
                var data;

                if (isStr(key)) {
                    data = {};
                    data[key] = val;
                } else if (isObj(key)) {
                    data = key;
                }

                var self = this;
                each(data, function (val, key) {
                    var oldVal = self._data[key];
                    self._data[key] = val;
                    self.emit('change', key, val, oldVal);
                });
                this.save(this._data);
            },
            get: function get(key) {
                var data = this._data;
                if (isStr(key)) return data[key];
                var ret = {};
                each(key, function (val) {
                    ret[val] = data[val];
                });
                return ret;
            },
            remove: function remove(key) {
                key = toArr(key);
                var data = this._data;
                each(key, function (val) {
                    delete data[val];
                });
                this.save(data);
            },
            clear: function clear() {
                this._data = {};
                this.save(this._data);
            },
            each: (function (_each) {
                function each(_x) {
                    return _each.apply(this, arguments);
                }

                each.toString = function () {
                    return _each.toString();
                };

                return each;
            })(function (fn) {
                each(this._data, fn);
            }),
            // This methods exists to be overwritten.
            save: function save(data) {
                this._data = data;
            }
        });

        return exports;
    })({});

    /* ------------------------------ Tween ------------------------------ */

    _.Tween = (function (exports) {
        /* Tween engine for JavaScript animations.
         *
         * Extend from Emitter.
         *
         * ### constructor
         *
         * |Name|Type  |Desc           |
         * |----|------|---------------|
         * |obj |object|Values to tween|
         *
         * ### to
         *
         * |Name       |Type           |Desc            |
         * |-----------|---------------|----------------|
         * |destination|obj            |Final properties|
         * |duration   |number         |Tween duration  |
         * |ease       |string function|Easing function |
         *
         * ### play
         *
         * Begin playing forward.
         *
         * ### pause
         *
         * Pause the animation.
         *
         * ### paused
         *
         * Get animation paused state.
         *
         * ### progress
         *
         * Update or get animation progress.
         *
         * |Name      |Type  |Desc                  |
         * |----------|------|----------------------|
         * |[progress]|number|Number between 0 and 1|
         */

        /* example
         * var pos = {x: 0, y: 0};
         *
         * var tween = new Tween(pos);
         * tween.on('update', function (target) {
         *     console.log(target.x, target.y);
         * }).on('end', function (target) {
         *     console.log(target.x, target.y); // -> 100, 100
         * });
         * tween.to({x: 100, y: 100}, 1000, 'inElastic').play();
         */

        /* typescript
         * export declare class Tween extends Emitter {
         *     constructor(target: any);
         *     to(props: any, duration?: number, ease?: string | Function): Tween;
         *     progress(): number;
         *     progress(progress: number): Tween;
         *     play(): Tween;
         *     pause(): Tween;
         *     paused(): boolean;
         * }
         */

        /* dependencies
         * Emitter State easing now each raf isFn 
         */

        exports = Emitter.extend({
            className: 'Tween',
            initialize: function initialize(target) {
                this.callSuper(Emitter, 'initialize', arguments);
                this._target = target;
                this._dest = {};
                this._duration = 0;
                this._progress = 0;
                this._origin = {};
                this._diff = {};
                this._ease = easing['linear'];
                this._state = new State('pause', {
                    play: {
                        from: 'pause',
                        to: 'play'
                    },
                    pause: {
                        from: 'play',
                        to: 'pause'
                    }
                });
            },
            to: function to(props, duration, ease) {
                var origin = {},
                    target = this._target,
                    diff = {};
                ease = ease || this._ease;
                this._dest = props;
                this._duration = duration || this._duration;
                this._ease = isFn(ease) ? ease : easing[ease];
                each(props, function (val, key) {
                    origin[key] = target[key];
                    diff[key] = val - origin[key];
                });
                this._origin = origin;
                this._diff = diff;
                return this;
            },
            progress: function progress(_progress) {
                var ease = this._ease,
                    target = this._target,
                    origin = this._origin,
                    diff = this._diff,
                    dest = this._dest,
                    self = this;

                if (_progress != null) {
                    _progress = _progress < 1 ? _progress : 1;
                    this._progress = _progress;
                    each(dest, function (val, key) {
                        target[key] = origin[key] + diff[key] * ease(_progress);
                    });
                    self.emit('update', target);
                    return this;
                }

                return this._progress;
            },
            play: function play() {
                var state = this._state;
                if (state.is('play')) return;
                state.play();
                var startTime = now(),
                    progress = this._progress,
                    duration = this._duration * (1 - progress),
                    target = this._target,
                    self = this;

                function render() {
                    if (state.is('pause')) return;
                    var time = now();
                    self.progress(progress + (time - startTime) / duration);

                    if (self._progress === 1) {
                        state.pause();
                        self.emit('end', target);
                        return;
                    }

                    raf(render);
                }

                raf(render);
                return this;
            },
            pause: function pause() {
                var state = this._state;
                if (state.is('pause')) return;
                state.pause();
                return this;
            },
            paused: function paused() {
                return this._state.is('pause');
            }
        });

        return exports;
    })({});

    /* ------------------------------ pad ------------------------------ */

    _.pad = (function (exports) {
        /* Pad string on the left and right sides if it's shorter than length.
         *
         * |Name  |Type  |Desc                  |
         * |------|------|----------------------|
         * |str   |string|String to pad         |
         * |len   |number|Padding length        |
         * |chars |string|String used as padding|
         * |return|string|Resulted string       |
         */

        /* example
         * pad('a', 5); // -> '  a  '
         * pad('a', 5, '-'); // -> '--a--'
         * pad('abc', 3, '-'); // -> 'abc'
         * pad('abc', 5, 'ab'); // -> 'babca'
         * pad('ab', 5, 'ab'); // -> 'ababa'
         */

        /* typescript
         * export declare function pad(str: string, len: number, chars?: string): string;
         */

        /* dependencies
         * repeat toStr 
         */

        exports = function exports(str, len, chars) {
            str = toStr(str);
            var strLen = str.length;
            chars = chars || ' ';

            if (strLen < len) {
                var padStr = repeat(chars, Math.ceil((len - strLen) / 2));
                str = padStr + str + padStr;
                str = str.substr(Math.ceil((str.length - len) / 2), len);
            }

            return str;
        };

        return exports;
    })({});

    /* ------------------------------ pairs ------------------------------ */

    _.pairs = (function (exports) {
        /* Convert an object into a list of [key, value] pairs.
         *
         * |Name  |Type  |Desc                      |
         * |------|------|--------------------------|
         * |obj   |object|Object to convert         |
         * |return|array |List of [key, value] pairs|
         */

        /* example
         * pairs({a: 1, b: 2}); // -> [['a', 1], ['b', 2]]
         */

        /* typescript
         * export declare function pairs(obj: any): Array<any[]>;
         */

        /* dependencies
         * keys 
         */

        exports = function exports(obj) {
            var _keys = keys(obj),
                len = _keys.length,
                ret = Array(len);

            for (var i = 0; i < len; i++) {
                ret[i] = [_keys[i], obj[_keys[i]]];
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ parallel ------------------------------ */

    _.parallel = (function (exports) {
        /* Run an array of functions in parallel.
         *
         * |Name |Type    |Desc                   |
         * |-----|--------|-----------------------|
         * |tasks|array   |Array of functions     |
         * |[cb] |function|Callback once completed|
         */

        /* example
         * parallel([
         *     function(cb) {
         *         setTimeout(function () { cb(null, 'one') }, 200);
         *     },
         *     function(cb) {
         *         setTimeout(function () { cb(null, 'two') }, 100);
         *     }
         * ], function (err, results) {
         *     // results -> ['one', 'two']
         * });
         */

        /* typescript
         * export declare function parallel(tasks: Function[], cb?: Function): void;
         */

        /* dependencies
         * noop each nextTick 
         */

        exports = function exports(tasks, cb) {
            cb = cb || noop;
            var results = [],
                pending = tasks.length;
            if (!pending) return done(null);
            each(tasks, function (task, i) {
                task(function (err, result) {
                    taskCb(i, err, result);
                });
            });

            function taskCb(i, err, result) {
                results[i] = result;
                if (--pending === 0 || err) done(err);
            }

            function done(err) {
                nextTick(function () {
                    cb(err, results);
                    cb = noop;
                });
            }
        };

        return exports;
    })({});

    /* ------------------------------ toBool ------------------------------ */

    var toBool = _.toBool = (function (exports) {
        /* Convert value to a boolean.
         *
         * |Name  |Type   |Desc             |
         * |------|-------|-----------------|
         * |val   |*      |Value to convert |
         * |return|boolean|Converted boolean|
         */

        /* example
         * toBool(true); // -> true
         * toBool(null); // -> false
         * toBool(1); // -> true
         * toBool(0); // -> false
         * toBool('0'); // -> false
         * toBool('1'); // -> true
         * toBool('false'); // -> false
         */

        /* typescript
         * export declare function toBool(val: any): boolean;
         */

        /* dependencies
         * isStr 
         */

        exports = function exports(val) {
            if (isStr(val)) {
                val = val.toLowerCase();
                return val !== '0' && val !== '' && val !== 'false';
            }

            return !!val;
        };

        return exports;
    })({});

    /* ------------------------------ parseArgs ------------------------------ */

    _.parseArgs = (function (exports) {
        /* Parse command line argument options, the same as minimist.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |args  |array |Argument array |
         * |opts  |object|Parse options  |
         * |return|object|Parsed result  |
         *
         * ### options
         *
         * |Name      |Type  |Desc             |
         * |----------|------|-----------------|
         * |names     |object|option names     |
         * |shorthands|object|option shorthands|
         */

        /* example
         * parseArgs(['eustia', '--output', 'util.js', '-w'], {
         *     names: {
         *         output: 'string',
         *         watch: 'boolean'
         *     },
         *     shorthands: {
         *         output: 'o',
         *         watch: 'w'
         *     }
         * });
         * // -> {remain: ['eustia'], output: 'util.js', watch: true}
         */

        /* typescript
         * export declare function parseArgs(names: string[], shorthands: any): any;
         */

        /* dependencies
         * defaults toNum invert toBool 
         */

        exports = function exports(args, opts) {
            opts = opts || {};
            defaults(opts, defOpts);
            var names = opts.names,
                shorthands = invert(opts.shorthands);
            var remain = [],
                ret = {
                    remain: remain
                },
                name,
                type;

            for (var i = 0, len = args.length; i < len; i++) {
                var arg = args[i],
                    nextArg = args[i + 1];
                var match;
                match = arg.match(regDoubleDash);

                if (match) {
                    name = match[1];
                    type = names[name];

                    if (!type) {
                        remain.push(arg);
                    } else if (nextArg && !regDashStart.test(nextArg)) {
                        setArg(name, nextArg);
                        i++;
                    } else if (type === 'boolean') {
                        setArg(name, true);
                        i++;
                    }

                    continue;
                }

                match = arg.match(regSingleDash);

                if (match) {
                    var letters = match[1];

                    for (var j = 0; j < letters.length; j++) {
                        var letter = letters[j];
                        name = shorthands[letter];
                        if (!name) continue;
                        type = names[name];
                        if (type === 'boolean') setArg(shorthands[letter], true);
                    }

                    continue;
                }

                remain.push(arg);
            }

            function setArg(name, val) {
                var type = names[name];

                switch (type) {
                    case 'number':
                        val = toNum(val);
                        break;

                    case 'boolean':
                        val = toBool(val);
                        break;

                    default:
                        break;
                }

                ret[name] = val;
            }

            return ret;
        };

        var defOpts = {
            names: {},
            shorthands: {}
        };
        var regDoubleDash = /^--(.+)/,
            regSingleDash = /^-([^-]+)/,
            regDashStart = /^-/;

        return exports;
    })({});

    /* ------------------------------ pascalCase ------------------------------ */

    _.pascalCase = (function (exports) {
        /* Convert string to "pascalCase".
         *
         * |Name  |Type  |Desc               |
         * |------|------|-------------------|
         * |str   |string|String to convert  |
         * |return|string|Pascal cased string|
         */

        /* example
         * pascalCase('fooBar'); // -> FooBar
         * pascalCase('foo bar'); // -> FooBar
         * pascalCase('foo_bar'); // -> FooBar
         * pascalCase('foo.bar'); // -> FooBar
         */

        /* typescript
         * export declare function pascalCase(str: string): string;
         */

        /* dependencies
         * camelCase upperFirst 
         */

        exports = function exports(str) {
            return upperFirst(camelCase(str));
        };

        return exports;
    })({});

    /* ------------------------------ perfNow ------------------------------ */

    var perfNow = _.perfNow = (function (exports) {
        /* High resolution time up to microsecond precision.
         */

        /* example
         * var start = perfNow();
         *
         * // Do something.
         *
         * console.log(perfNow() - start);
         */

        /* typescript
         * export declare function perfNow(): number;
         */

        /* dependencies
         * now root 
         */

        var performance = root.performance,
            process = root.process,
            loadTime;

        if (performance && performance.now) {
            exports = function exports() {
                return performance.now();
            };
        } else if (process && process.hrtime) {
            var getNanoSeconds = function getNanoSeconds() {
                var hr = process.hrtime();
                return hr[0] * 1e9 + hr[1];
            };

            loadTime = getNanoSeconds() - process.uptime() * 1e9;

            exports = function exports() {
                return (getNanoSeconds() - loadTime) / 1e6;
            };
        } else {
            loadTime = now();

            exports = function exports() {
                return now() - loadTime;
            };
        }

        return exports;
    })({});

    /* ------------------------------ property ------------------------------ */

    var property = _.property = (function (exports) {
        /* Return a function that will itself return the key property of any passed-in object.
         *
         * |Name  |Type        |Desc                       |
         * |------|------------|---------------------------|
         * |path  |string array|Path of the property to get|
         * |return|function    |New accessor function      |
         */

        /* example
         * var obj = {a: {b: 1}};
         * property('a')(obj); // -> {b: 1}
         * property(['a', 'b'])(obj); // -> 1
         */

        /* typescript
         * export declare function property(path: string | string[]): Function;
         */

        /* dependencies
         * isArr safeGet 
         */

        exports = function exports(path) {
            if (!isArr(path)) return shallowProperty(path);
            return function (obj) {
                return safeGet(obj, path);
            };
        };

        function shallowProperty(key) {
            return function (obj) {
                return obj == null ? void 0 : obj[key];
            };
        }

        return exports;
    })({});

    /* ------------------------------ pluck ------------------------------ */

    var pluck = _.pluck = (function (exports) {
        /* Extract a list of property values.
         *
         * |Name  |Type        |Desc                           |
         * |------|------------|-------------------------------|
         * |obj   |object array|Collection to iterate over     |
         * |key   |string array|Property path                  |
         * |return|array       |New array of specified property|
         */

        /* example
         * var stooges = [
         *     {name: 'moe', age: 40},
         *     {name: 'larry', age: 50},
         *     {name: 'curly', age: 60}
         * ];
         * pluck(stooges, 'name'); // -> ['moe', 'larry', 'curly']
         */

        /* typescript
         * export declare function pluck(object: any, key: string | string[]): any[];
         */

        /* dependencies
         * map property 
         */

        exports = function exports(obj, key) {
            return map(obj, property(key));
        };

        return exports;
    })({});

    /* ------------------------------ promisify ------------------------------ */

    _.promisify = (function (exports) {
        /* Convert callback based functions into Promises.
         *
         * |Name           |Type    |Desc                                  |
         * |---------------|--------|--------------------------------------|
         * |fn             |function|Callback based function               |
         * |multiArgs=false|boolean |If callback has multiple success value|
         * |return         |function|Result function                       |
         *
         * If multiArgs is set to true, the resulting promise will always fulfill with an array of the callback's success values.
         */

        /* example
         * var fs = require('fs');
         *
         * var readFile = promisify(fs.readFile);
         * readFile('test.js', 'utf-8').then(function (data) {
         *     // Do something with file content.
         * });
         */

        /* typescript
         * export declare function promisify(fn: Function, multiArgs?: boolean): Function;
         */

        /* dependencies
         * restArgs root Promise 
         */

        exports = (function (_exports) {
            function exports(_x, _x2) {
                return _exports.apply(this, arguments);
            }

            exports.toString = function () {
                return _exports.toString();
            };

            return exports;
        })(function (fn, multiArgs) {
            return restArgs(function (args) {
                return new exports.Promise(function (resolve, reject) {
                    args.push(
                        restArgs(function callback(err, values) {
                            if (err) return reject(err);
                            if (!multiArgs) return resolve(values[0]);
                            resolve(values);
                        })
                    );
                    fn.apply(this, args);
                });
            });
        });

        exports.Promise = root.Promise || Promise;

        return exports;
    })({});

    /* ------------------------------ quickSort ------------------------------ */

    _.quickSort = (function (exports) {
        /* Quick sort implementation.
         *
         * |Name  |Type    |Desc         |
         * |------|--------|-------------|
         * |arr   |array   |Array to sort|
         * |[cmp] |function|Comparator   |
         * |return|array   |Sorted array |
         */

        /* example
         * quickSort([2, 1]); // -> [1, 2]
         */

        /* typescript
         * export declare function quickSort(arr: any[], cmp?: Function): any[];
         */

        /* dependencies
         * swap 
         */

        exports = function exports(arr, cmp) {
            cmp = cmp || comparator;
            return quickSort(arr, 0, arr.length - 1, cmp);
        };

        function quickSort(arr, left, right, cmp) {
            var idx;
            if (arr.length <= 1) return arr;
            idx = partition(arr, left, right, cmp);
            if (left < idx - 1) quickSort(arr, left, idx - 1, cmp);
            if (idx < right) quickSort(arr, idx, right, cmp);
            return arr;
        }

        function partition(arr, left, right, cmp) {
            var pivot = arr[floor((right + left) / 2)];

            while (left <= right) {
                while (cmp(arr[left], pivot) < 0) {
                    left++;
                }

                while (cmp(arr[right], pivot) > 0) {
                    right--;
                }

                if (left <= right) {
                    swap(arr, left, right);
                    left++;
                    right--;
                }
            }

            return left;
        }

        var floor = Math.floor;

        function comparator(a, b) {
            return a - b;
        }

        return exports;
    })({});

    /* ------------------------------ random ------------------------------ */

    var random = _.random = (function (exports) {
        /* Produces a random number between min and max(inclusive).
         *
         * |Name          |Type   |Desc                  |
         * |--------------|-------|----------------------|
         * |min           |number |Minimum possible value|
         * |max           |number |Maximum possible value|
         * |floating=false|boolean|Float or not          |
         * |return        |number |Random number         |
         */

        /* example
         * random(1, 5); // -> an integer between 0 and 5
         * random(5); // -> an integer between 0 and 5
         * random(1.2, 5.2, true); /// -> a floating-point number between 1.2 and 5.2
         */

        /* typescript
         * export declare function random(min: number, max?: number, floating?: boolean): number;
         */
        exports = function exports(min, max, floating) {
            if (max == null) {
                max = min;
                min = 0;
            }

            var rand = Math.random();

            if (floating || min % 1 || max % 1) {
                return Math.min(
                    min +
                    rand *
                    (max - min + parseFloat('1e-' + ((rand + '').length - 1))),
                    max
                );
            }

            return min + Math.floor(rand * (max - min + 1));
        };

        return exports;
    })({});

    /* ------------------------------ randomBytes ------------------------------ */

    var randomBytes = _.randomBytes = (function (exports) {
        /* Random bytes generator.
         *
         * Use crypto module in node or crypto object in browser if possible.
         *
         * |Name  |Type  |Desc                        |
         * |------|------|----------------------------|
         * |size  |number|Number of bytes to generate |
         * |return|object|Random bytes of given length|
         */

        /* example
         * randomBytes(5); // -> [55, 49, 153, 30, 122]
         */

        /* typescript
         * export declare function randomBytes(size: number): Uint8Array;
         */

        /* dependencies
         * random isBrowser isNode 
         */

        exports = function exports(size) {
            var ret = new Uint8Array(size);

            for (var i = 0; i < size; i++) {
                ret[i] = random(0, 255);
            }

            return ret;
        };

        var crypto;

        if (isBrowser) {
            crypto = window.crypto || window.msCrypto;

            if (crypto) {
                exports = function exports(size) {
                    var ret = new Uint8Array(size);
                    crypto.getRandomValues(ret);
                    return ret;
                };
            }
        } else if (isNode) {
            crypto = require('crypto');

            exports = function exports(size) {
                return crypto.randomBytes(size);
            };
        }

        return exports;
    })({});

    /* ------------------------------ randomItem ------------------------------ */

    _.randomItem = (function (exports) {
        /* Get a random item from an array.
         *
         * |Name  |Type |Desc                |
         * |------|-----|--------------------|
         * |arr   |array|Array to get        |
         * |return|*    |Randomly picked item|
         */

        /* example
         * randomItem([1, 2, 3]); // -> 2
         */

        /* typescript
         * export declare function randomItem(arr: any[]): any;
         */

        /* dependencies
         * random 
         */

        exports = function exports(arr) {
            return arr[random(0, arr.length - 1)];
        };

        return exports;
    })({});

    /* ------------------------------ range ------------------------------ */

    _.range = (function (exports) {
        /* Create flexibly-numbered lists of integers.
         *
         * |Name   |Type  |Desc                              |
         * |-------|------|----------------------------------|
         * |[start]|number|Start of the range                |
         * |end    |number|End of the range                  |
         * |step=1 |number|Value to increment or decrement by|
         * |return |array |List of integers                  |
         */

        /* example
         * range(5); // -> [0, 1, 2, 3, 4]
         * range(0, 5, 2) // -> [0, 2, 4]
         */

        /* typescript
         * export declare function range(start: number, end?: number, step?: number): number[];
         */
        exports = function exports(start, end, step) {
            if (end == null) {
                end = start || 0;
                start = 0;
            }

            if (!step) step = end < start ? -1 : 1;
            var len = Math.max(Math.ceil((end - start) / step), 0),
                ret = Array(len);

            for (var i = 0; i < len; i++, start += step) {
                ret[i] = start;
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ rc4 ------------------------------ */

    _.rc4 = (function (exports) {
        /* RC4 symmetric encryption implementation.
         *
         * ### encrypt
         *
         * RC4 encryption, result as base64 string.
         *
         * ### decrypt
         *
         * RC4 decryption, pass base64 string as input.
         *
         * |Name  |Type  |Desc                            |
         * |------|------|--------------------------------|
         * |key   |string|Secret key                      |
         * |str   |string|String to be encrypted/decrypted|
         * |return|string|Encrypted/decrypted string      |
         */

        /* example
         * rc4.encrypt('licia', 'Hello world'); // -> 'j9y2VpSfR3AdNN8='
         * rc4.decrypt('licia', 'j9y2VpSfR3AdNN8='); // -> 'Hello world'
         */

        /* typescript
         * export declare const rc4: {
         *     encrypt(key: string, str: string): string;
         *     decrypt(key: string, str: string): string;
         * };
         */

        /* dependencies
         * utf8 base64 bytesToStr strToBytes 
         */

        exports = {
            encrypt: function encrypt(key, str) {
                return rc4(key, str, false);
            },
            decrypt: function decrypt(key, str) {
                return rc4(key, str, true);
            }
        };

        function rc4(key, str, decrypt) {
            key = strToBytes(utf8.encode(key));

            if (!decrypt) {
                str = strToBytes(utf8.encode(str));
            } else {
                str = base64.decode(str);
            }

            var result = [];
            var s = [];
            var j = 0;
            var i = 0;
            var x;

            for (i = 0; i < 256; i++) {
                s[i] = i;
            }

            for (i = 0; i < 256; i++) {
                j = (j + s[i] + key[i % key.length]) % 256;
                x = s[i];
                s[i] = s[j];
                s[j] = x;
            }

            i = 0;
            j = 0;

            for (var y = 0, len = str.length; y < len; y++) {
                i = (i + 1) % 256;
                j = (j + s[i]) % 256;
                x = s[i];
                s[i] = s[j];
                s[j] = x;
                result.push(str[y] ^ s[(s[i] + s[j]) % 256]);
            }

            return !decrypt ? base64.encode(result) : utf8.decode(bytesToStr(result));
        }

        function stringToBytes(msg) {
            var bytes = [];
            msg = utf8.encode(msg);

            for (var i = 0, len = msg.length; i < len; i++) {
                bytes.push(msg.charCodeAt(i) & 0xff);
            }

            return bytes;
        }

        return exports;
    })({});

    /* ------------------------------ reduce ------------------------------ */

    var reduce = _.reduce = (function (exports) {
        /* Turn a list of values into a single value.
         *
         * |Name             |Type        |Desc                          |
         * |-----------------|------------|------------------------------|
         * |obj              |object array|Collection to iterate over    |
         * |iterator=identity|function    |Function invoked per iteration|
         * |[initial]        |*           |Initial value                 |
         * |[ctx]            |*           |Function context              |
         * |return           |*           |Accumulated value             |
         */

        /* example
         * reduce([1, 2, 3], function (sum, n) { return sum + n }, 0); // -> 6
         */

        /* typescript
         * export declare function reduce<T, TResult>(
         *     list: types.List<T>,
         *     iterator: types.MemoIterator<T, TResult>,
         *     memo?: TResult,
         *     context?: any
         * ): TResult;
         * export declare function reduce<T, TResult>(
         *     list: types.Dictionary<T>,
         *     iterator: types.MemoObjectIterator<T, TResult>,
         *     memo?: TResult,
         *     context?: any
         * ): TResult;
         */

        /* dependencies
         * optimizeCb isArrLike isUndef keys types 
         */

        exports = createReduce(1);
        exports.create = createReduce;

        function createReduce(dir) {
            return function (obj, iterator, initial, ctx) {
                iterator = optimizeCb(iterator, ctx);
                var i, len, key;

                if (isArrLike(obj)) {
                    len = obj.length;
                    i = dir > 0 ? 0 : len - 1;

                    if (isUndef(initial)) {
                        initial = obj[i];
                        i += dir;
                    }

                    for (; i < len && i >= 0; i += dir) {
                        initial = iterator(initial, obj[i], i, obj);
                    }
                } else {
                    var _keys = keys(obj);

                    len = _keys.length;
                    i = dir > 0 ? 0 : len - 1;

                    if (isUndef(initial)) {
                        initial = obj[_keys[i]];
                        i += dir;
                    }

                    for (; i < len && i >= 0; i += dir) {
                        key = _keys[i];
                        initial = iterator(initial, obj[key], key, obj);
                    }
                }

                return initial;
            };
        }

        return exports;
    })({});

    /* ------------------------------ reduceRight ------------------------------ */

    _.reduceRight = (function (exports) {
        /* Right-associative version of reduce.
         */

        /* example
         * reduceRight([[1], [2], [3]], function (a, b) { return a.concat(b) }, []); // -> [3, 2, 1]
         */

        /* typescript
         * export declare function reduceRight<T, TResult>(
         *     list: types.Collection<T>,
         *     iterator: types.MemoIterator<T, TResult>,
         *     memo?: TResult,
         *     context?: any
         * ): TResult;
         */

        /* dependencies
         * reduce types 
         */

        exports = reduce.create(-1);

        return exports;
    })({});

    /* ------------------------------ reject ------------------------------ */

    _.reject = (function (exports) {
        /* Opposite of filter.
         *
         * |Name     |Type    |Desc                                          |
         * |---------|--------|----------------------------------------------|
         * |obj      |array   |Collection to iterate over                    |
         * |predicate|function|Function invoked per iteration                |
         * |[ctx]    |*       |Predicate context                             |
         * |return   |array   |Array of all values that didn't pass predicate|
         */

        /* example
         * reject([1, 2, 3, 4, 5], function (val) {
         *     return val % 2 === 0;
         * }); // -> [1, 3, 5]
         */

        /* typescript
         * export declare function reject<T>(
         *     list: types.List<T>,
         *     iterator: types.ListIterator<T, boolean>,
         *     context?: any
         * ): T[];
         * export declare function reject<T>(
         *     object: types.Dictionary<T>,
         *     iterator: types.ObjectIterator<T, boolean>,
         *     context?: any
         * ): T[];
         */

        /* dependencies
         * safeCb negate filter types 
         */

        exports = function exports(obj, predicate, ctx) {
            predicate = safeCb(negate(predicate), ctx);
            return filter(obj, predicate);
        };

        return exports;
    })({});

    /* ------------------------------ rpad ------------------------------ */

    _.rpad = (function (exports) {
        /* Pad string on the right side if it's shorter than length.
         *
         * |Name  |Type  |Desc                  |
         * |------|------|----------------------|
         * |str   |string|String to pad         |
         * |len   |number|Padding length        |
         * |chars |string|String used as padding|
         * |return|string|Resulted string       |
         */

        /* example
         * rpad('a', 5); // -> 'a    '
         * rpad('a', 5, '-'); // -> 'a----'
         * rpad('abc', 3, '-'); // -> 'abc'
         * rpad('abc', 5, 'ab'); // -> 'abcab'
         */

        /* typescript
         * export declare function rpad(str: string, len: number, chars?: string): string;
         */

        /* dependencies
         * repeat toStr 
         */

        exports = function exports(str, len, chars) {
            str = toStr(str);
            var strLen = str.length;
            chars = chars || ' ';
            if (strLen < len) str = (str + repeat(chars, len - strLen)).slice(0, len);
            return str;
        };

        return exports;
    })({});

    /* ------------------------------ rtrim ------------------------------ */

    var rtrim = _.rtrim = (function (exports) {
        /* Remove chars or white-spaces from end of string.
         *
         * |Name   |Type        |Desc              |
         * |-------|------------|------------------|
         * |str    |string      |String to trim    |
         * |[chars]|string array|Characters to trim|
         * |return |string      |Trimmed string    |
         */

        /* example
         * rtrim(' abc  '); // -> ' abc'
         * rtrim('_abc_', '_'); // -> '_abc'
         * rtrim('_abc_', ['c', '_']); // -> '_ab'
         */

        /* typescript
         * export declare function rtrim(str: string, chars?: string | string[]): string;
         */
        var regSpace = /\s+$/;

        exports = function exports(str, chars) {
            if (chars == null) return str.replace(regSpace, '');
            var end = str.length - 1,
                charLen = chars.length,
                found = true,
                i,
                c;

            while (found && end >= 0) {
                found = false;
                i = -1;
                c = str.charAt(end);

                while (++i < charLen) {
                    if (c === chars[i]) {
                        found = true;
                        end--;
                        break;
                    }
                }
            }

            return end >= 0 ? str.substring(0, end + 1) : '';
        };

        return exports;
    })({});

    /* ------------------------------ trim ------------------------------ */

    var trim = _.trim = (function (exports) {
        /* Remove chars or white-spaces from beginning end of string.
         *
         * |Name  |Type        |Desc              |
         * |------|------------|------------------|
         * |str   |string      |String to trim    |
         * |chars |string array|Characters to trim|
         * |return|string      |Trimmed string    |
         */

        /* example
         * trim(' abc  '); // -> 'abc'
         * trim('_abc_', '_'); // -> 'abc'
         * trim('_abc_', ['a', 'c', '_']); // -> 'b'
         */

        /* typescript
         * export declare function trim(str: string, chars?: string | string[]): string;
         */

        /* dependencies
         * ltrim rtrim 
         */

        var regSpace = /^\s+|\s+$/g;

        exports = function exports(str, chars) {
            if (chars == null) return str.replace(regSpace, '');
            return ltrim(rtrim(str, chars), chars);
        };

        return exports;
    })({});

    /* ------------------------------ extractBlockCmts ------------------------------ */

    _.extractBlockCmts = (function (exports) {
        /* Extract block comments from source code.
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |str   |string|String to extract|
         * |return|array |Block comments   |
         */

        /* example
         * extractBlockCmts('\/*licia*\/'); // -> ['licia']
         */

        /* typescript
         * export declare function extractBlockCmts(str: string): string[];
         */

        /* dependencies
         * map trim 
         */

        var regBlockCmt = /(\/\*[\s\S]*?\*\/)/gm;

        exports = function exports(str) {
            var ret = str.match(regBlockCmt);
            if (!ret) return [];
            ret = map(ret, function (comment) {
                return trim(
                    map(comment.split('\n'), function (line) {
                        return trim(line).replace(/^\/\*+|\*+\/$|^\*+/g, '');
                    }).join('\n')
                );
            });
            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ extractUrls ------------------------------ */

    var extractUrls = _.extractUrls = (function (exports) {
        /* Extract urls from plain text.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |str   |string|Text to extract|
         * |return|array |Url list       |
         */

        /* example
         * var str = '[Official site: http://eustia.liriliri.io](http://eustia.liriliri.io)';
         * extractUrls(str); // -> ['http://eustia.liriliri.io']
         */

        /* typescript
         * export declare function extractUrls(str: string): string[];
         */

        /* dependencies
         * unique trim map toArr 
         */

        exports = function exports(str) {
            var urlList = toArr(str.match(regUrl));
            return unique(
                map(urlList, function (url) {
                    return trim(url);
                })
            );
        };

        var regUrl = /((https?)|(ftp)):\/\/[\w.]+[^ \f\n\r\t\v"\\<>[\]\u2100-\uFFFF(),]*/gi;

        return exports;
    })({});

    /* ------------------------------ linkify ------------------------------ */

    _.linkify = (function (exports) {
        /* Hyperlink urls in a string.
         *
         * |Name       |Type    |Desc                     |
         * |-----------|--------|-------------------------|
         * |str        |string  |String to hyperlink      |
         * |[hyperlink]|function|Function to hyperlink url|
         * |return     |string  |Result string            |
         */

        /* example
         * var str = 'Official site: http://eustia.liriliri.io'
         * linkify(str); // -> 'Official site: <a href="http://eustia.liriliri.io">http://eustia.liriliri.io</a>'
         * linkify(str, function (url) {
         *     return '<a href="' + url + '" target="_blank">' + url + '</a>';
         * });
         */

        /* typescript
         * export declare function linkify(str: string, hyperlink?: Function): string;
         */

        /* dependencies
         * extractUrls each escapeRegExp 
         */

        exports = function exports(str, hyperlink) {
            hyperlink = hyperlink || defHyperlink;
            var urlList = extractUrls(str);
            each(urlList, function (url) {
                str = str.replace(new RegExp(escapeRegExp(url), 'g'), hyperlink);
            });
            return str;
        };

        function defHyperlink(url) {
            return '<a href="' + url + '">' + url + '</a>';
        }

        return exports;
    })({});

    /* ------------------------------ isDataUrl ------------------------------ */

    _.isDataUrl = (function (exports) {
        /* Check if a string is a valid data url.
         *
         * |Name  |Type   |Desc                        |
         * |------|-------|----------------------------|
         * |str   |string |String to check             |
         * |return|boolean|True if string is a data url|
         */

        /* example
         * isDataUrl('http://eustia.liriliri.io'); // -> false
         * isDataUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D'); // -> true
         */

        /* typescript
         * export declare function isDataUrl(str: string): boolean;
         */

        /* dependencies
         * trim 
         */

        exports = function exports(str) {
            return regDataUrl.test(trim(str));
        }; // https://tools.ietf.org/html/rfc2397

        var regDataUrl = /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)$/i;

        return exports;
    })({});

    /* ------------------------------ query ------------------------------ */

    var query = _.query = (function (exports) {
        /* Parse and stringify url query strings.
         *
         * ### parse
         *
         * Parse a query string into an object.
         *
         * |Name  |Type  |Desc        |
         * |------|------|------------|
         * |str   |string|Query string|
         * |return|object|Query object|
         *
         * ### stringify
         *
         * Stringify an object into a query string.
         *
         * |Name  |Type  |Desc        |
         * |------|------|------------|
         * |obj   |object|Query object|
         * |return|string|Query string|
         */

        /* example
         * query.parse('foo=bar&eruda=true'); // -> {foo: 'bar', eruda: 'true'}
         * query.stringify({foo: 'bar', eruda: 'true'}); // -> 'foo=bar&eruda=true'
         * query.parse('name=eruda&name=eustia'); // -> {name: ['eruda', 'eustia']}
         */

        /* typescript
         * export declare const query: {
         *     parse(str: string): any;
         *     stringify(object: any): string;
         * };
         */

        /* dependencies
         * trim each isUndef isArr map isEmpty filter isObj 
         */

        exports = {
            parse: function parse(str) {
                var ret = {};
                str = trim(str).replace(regIllegalChars, '');
                each(str.split('&'), function (param) {
                    var parts = param.split('=');
                    var key = parts.shift(),
                        val = parts.length > 0 ? parts.join('=') : null;
                    key = decodeURIComponent(key);
                    val = decodeURIComponent(val);

                    if (isUndef(ret[key])) {
                        ret[key] = val;
                    } else if (isArr(ret[key])) {
                        ret[key].push(val);
                    } else {
                        ret[key] = [ret[key], val];
                    }
                });
                return ret;
            },
            stringify: function stringify(obj, arrKey) {
                return filter(
                    map(obj, function (val, key) {
                        if (isObj(val) && isEmpty(val)) return '';
                        if (isArr(val)) return exports.stringify(val, key);
                        return (
                            (arrKey
                                ? encodeURIComponent(arrKey)
                                : encodeURIComponent(key)) +
                            '=' +
                            encodeURIComponent(val)
                        );
                    }),
                    function (str) {
                        return str.length > 0;
                    }
                ).join('&');
            }
        };
        var regIllegalChars = /^(\?|#|&)/g;

        return exports;
    })({});

    /* ------------------------------ Url ------------------------------ */

    var Url = _.Url = (function (exports) {
        /* Simple url manipulator.
         *
         * ### constructor
         *
         * |Name        |Type  |Desc      |
         * |------------|------|----------|
         * |url=location|string|Url string|
         *
         * ### setQuery
         *
         * Set query value.
         *
         * |Name  |Type  |Desc       |
         * |------|------|-----------|
         * |name  |string|Query name |
         * |value |string|Query value|
         * |return|Url   |this       |
         *
         * |Name  |Type  |Desc        |
         * |------|------|------------|
         * |query |object|query object|
         * |return|Url   |this        |
         *
         * ### rmQuery
         *
         * Remove query value.
         *
         * |Name  |Type        |Desc      |
         * |------|------------|----------|
         * |name  |string array|Query name|
         * |return|Url         |this      |
         *
         * ### parse
         *
         * [static] Parse url into an object.
         *
         * |Name  |Type  |Desc      |
         * |------|------|----------|
         * |url   |string|Url string|
         * |return|object|Url object|
         *
         * ### stringify
         *
         * [static] Stringify url object into a string.
         *
         * |Name  |Type  |Desc      |
         * |------|------|----------|
         * |url   |object|Url object|
         * |return|string|Url string|
         *
         * An url object contains the following properties:
         *
         * |Name    |Desc                                                                                  |
         * |--------|--------------------------------------------------------------------------------------|
         * |protocol|The protocol scheme of the URL (e.g. http:)                                           |
         * |slashes |A boolean which indicates whether the protocol is followed by two forward slashes (//)|
         * |auth    |Authentication information portion (e.g. username:password)                           |
         * |hostname|Host name without port number                                                         |
         * |port    |Optional port number                                                                  |
         * |pathname|URL path                                                                              |
         * |query   |Parsed object containing query string                                                 |
         * |hash    |The "fragment" portion of the URL including the pound-sign (#)                        |
         */

        /* example
         * var url = new Url('http://example.com:8080?eruda=true');
         * console.log(url.port); // -> '8080'
         * url.query.foo = 'bar';
         * url.rmQuery('eruda');
         * url.toString(); // -> 'http://example.com:8080/?foo=bar'
         */

        /* typescript
         * export declare namespace Url {
         *     interface IUrl {
         *         protocol: string;
         *         auth: string;
         *         hostname: string;
         *         hash: string;
         *         query: any;
         *         port: string;
         *         pathname: string;
         *         slashes: boolean;
         *     }
         * }
         * export declare class Url {
         *     protocol: string;
         *     auth: string;
         *     hostname: string;
         *     hash: string;
         *     query: any;
         *     port: string;
         *     pathname: string;
         *     slashes: boolean;
         *     constructor(url: string);
         *     setQuery(name: string, value: string): Url;
         *     setQuery(query: { [name: string]: string }): Url;
         *     rmQuery(name: string | string[]): Url;
         *     toString(): string;
         *     static parse(url: string): Url.IUrl;
         *     static stringify(object: Url.IUrl): string;
         * }
         */

        /* dependencies
         * Class extend trim query isEmpty each isArr toArr isBrowser isObj 
         */

        exports = Class(
            {
                className: 'Url',
                initialize: function initialize(url) {
                    if (!url && isBrowser) url = window.location.href;
                    extend(this, exports.parse(url || ''));
                },
                setQuery: function setQuery(name, val) {
                    var query = this.query;

                    if (isObj(name)) {
                        each(name, function (val, key) {
                            query[key] = val;
                        });
                    } else {
                        query[name] = val;
                    }

                    return this;
                },
                rmQuery: function rmQuery(name) {
                    var query = this.query;
                    if (!isArr(name)) name = toArr(name);
                    each(name, function (key) {
                        delete query[key];
                    });
                    return this;
                },
                toString: function toString() {
                    return exports.stringify(this);
                }
            },
            {
                parse: function parse(url) {
                    var ret = {
                            protocol: '',
                            auth: '',
                            hostname: '',
                            hash: '',
                            query: {},
                            port: '',
                            pathname: '',
                            slashes: false
                        },
                        rest = trim(url);
                    var proto = rest.match(regProto);

                    if (proto) {
                        proto = proto[0];
                        ret.protocol = proto.toLowerCase();
                        rest = rest.substr(proto.length);
                    }

                    if (proto) {
                        var slashes = rest.substr(0, 2) === '//';

                        if (slashes) {
                            rest = rest.slice(2);
                            ret.slashes = true;
                        }
                    }

                    if (slashes) {
                        var hostEnd = -1;

                        for (var i = 0, len = hostEndingChars.length; i < len; i++) {
                            var pos = rest.indexOf(hostEndingChars[i]);
                            if (pos !== -1 && (hostEnd === -1 || pos < hostEnd))
                                hostEnd = pos;
                        }

                        var host = rest.slice(0, hostEnd);
                        rest = rest.slice(hostEnd);
                        var atSign = host.lastIndexOf('@');

                        if (atSign !== -1) {
                            ret.auth = decodeURIComponent(host.slice(0, atSign));
                            host = host.slice(atSign + 1);
                        }

                        ret.hostname = host;
                        var port = host.match(regPort);

                        if (port) {
                            port = port[0];
                            if (port !== ':') ret.port = port.substr(1);
                            ret.hostname = host.substr(0, host.length - port.length);
                        }
                    }

                    var hash = rest.indexOf('#');

                    if (hash !== -1) {
                        ret.hash = rest.substr(hash);
                        rest = rest.slice(0, hash);
                    }

                    var queryMark = rest.indexOf('?');

                    if (queryMark !== -1) {
                        ret.query = query.parse(rest.substr(queryMark + 1));
                        rest = rest.slice(0, queryMark);
                    }

                    ret.pathname = rest || '/';
                    return ret;
                },
                stringify: function stringify(obj) {
                    var ret =
                        obj.protocol +
                        (obj.slashes ? '//' : '') +
                        (obj.auth ? encodeURIComponent(obj.auth) + '@' : '') +
                        obj.hostname +
                        (obj.port ? ':' + obj.port : '') +
                        obj.pathname;
                    if (!isEmpty(obj.query)) ret += '?' + query.stringify(obj.query);
                    if (obj.hash) ret += obj.hash;
                    return ret;
                }
            }
        );
        var regProto = /^([a-z0-9.+-]+:)/i,
            regPort = /:[0-9]*$/,
            hostEndingChars = ['/', '?', '#'];

        return exports;
    })({});

    /* ------------------------------ getUrlParam ------------------------------ */

    _.getUrlParam = (function (exports) {
        /* Get url param.
         *
         * |Name        |Type  |Desc            |
         * |------------|------|----------------|
         * |name        |string|Param name      |
         * |url=location|string|Url to get param|
         * |return      |string|Param value     |
         */

        /* example
         * getUrlParam('test', 'http://example.com/?test=true'); // -> 'true'
         */

        /* typescript
         * export declare function getUrlParam(name: string, url?:string): string | undefined;
         */

        /* dependencies
         * Url 
         */

        exports = function exports(name, url) {
            return new Url(url).query[name];
        };

        return exports;
    })({});

    /* ------------------------------ sample ------------------------------ */

    var sample = _.sample = (function (exports) {
        /* Sample random values from a collection.
         *
         * |Name  |Type        |Desc                  |
         * |------|------------|----------------------|
         * |obj   |array object|Collection to sample  |
         * |n     |number      |Number of values      |
         * |return|array       |Array of sample values|
         */

        /* example
         * sample([2, 3, 1], 2); // -> [2, 3]
         * sample({a: 1, b: 2, c: 3}, 1); // -> [2]
         */

        /* typescript
         * export declare function sample(obj: any, n: number): any[];
         */

        /* dependencies
         * isArrLike clone values random swap 
         */

        exports = function exports(obj, n) {
            var sample = isArrLike(obj) ? clone(obj) : values(obj),
                len = sample.length;
            n = Math.max(Math.min(n, len), 0);
            var last = len - 1;

            for (var i = 0; i < n; i++) {
                var rand = random(i, last);
                swap(sample, i, rand);
            }

            return sample.slice(0, n);
        };

        return exports;
    })({});

    /* ------------------------------ selectionSort ------------------------------ */

    _.selectionSort = (function (exports) {
        /* Selection sort implementation.
         *
         * |Name  |Type    |Desc         |
         * |------|--------|-------------|
         * |arr   |array   |Array to sort|
         * |[cmp] |function|Comparator   |
         * |return|array   |Sorted array |
         */

        /* example
         * selectionSort([2, 1]); // -> [1, 2]
         */

        /* typescript
         * export declare function selectionSort(arr: any[], cmp?: Function): any[];
         */

        /* dependencies
         * swap 
         */

        exports = function exports(arr, cmp) {
            cmp = cmp || comparator;
            var min;

            for (var i = 0, len = arr.length; i < len; i++) {
                min = i;

                for (var j = i + 1; j < len; j++) {
                    if (cmp(arr[j], arr[min]) < 0) {
                        min = j;
                    }
                }

                if (i != min) {
                    swap(arr, i, min);
                }
            }

            return arr;
        };

        function comparator(a, b) {
            return a - b;
        }

        return exports;
    })({});

    /* ------------------------------ shuffle ------------------------------ */

    _.shuffle = (function (exports) {
        /* Randomize the order of the elements in a given array.
         *
         * |Name  |Type |Desc              |
         * |------|-----|------------------|
         * |arr   |array|Array to randomize|
         * |return|array|Randomized Array  |
         */

        /* example
         * shuffle([1, 2, 3]); // -> [3, 1, 2]
         */

        /* typescript
         * export declare function shuffle(arr: any[]): any[];
         */

        /* dependencies
         * sample 
         */

        exports = function exports(obj) {
            return sample(obj, Infinity);
        };

        return exports;
    })({});

    /* ------------------------------ sleep ------------------------------ */

    _.sleep = (function (exports) {
        /* Resolve a promise after a specified timeout.
         *
         * |Name   |Type   |Desc         |
         * |-------|-------|-------------|
         * |timeout|number |Sleep timeout|
         */

        /* example
         * ;(async function () {
         *     await sleep(2000);
         * })();
         */

        /* typescript
         * export declare function sleep(timeout: number): Promise<void>;
         */
        exports = function exports(timeout) {
            return new Promise(function (resolve) {
                return setTimeout(resolve, timeout);
            });
        };

        return exports;
    })({});

    /* ------------------------------ snakeCase ------------------------------ */

    _.snakeCase = (function (exports) {
        /* Convert string to "snakeCase".
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |str   |string|String to convert |
         * |return|string|Snake cased string|
         */

        /* example
         * snakeCase('fooBar'); // -> foo_bar
         * snakeCase('foo bar'); // -> foo_bar
         * snakeCase('foo.bar'); // -> foo_bar
         */

        /* typescript
         * export declare function snakeCase(str: string): string;
         */

        /* dependencies
         * splitCase 
         */

        exports = function exports(str) {
            return splitCase(str).join('_');
        };

        return exports;
    })({});

    /* ------------------------------ sortBy ------------------------------ */

    _.sortBy = (function (exports) {
        /* Return an array of elements sorted in ascending order by results of running each element through iteratee.
         *
         * |Name               |Type        |Desc                      |
         * |-------------------|------------|--------------------------|
         * |arr                |object array|Collection to iterate over|
         * |[iterator=identity]|function    |Iterator to sort by       |
         * |[ctx]              |*           |Iterator context          |
         * |return             |array       |New sorted array          |
         */

        /* example
         * sortBy([1, 2, 3, 4, 5, 6], function (num) {
         *     return Math.sin(num);
         * }); // -> [5, 4, 6, 3, 1, 2]
         */

        /* typescript
         * export declare function sortBy(arr: any, iterator?: Function, ctx?: any): any[];
         */

        /* dependencies
         * safeCb pluck map isUndef 
         */

        exports = function exports(obj, iteratee, ctx) {
            iteratee = safeCb(iteratee, ctx);
            var idx = 0;
            return pluck(
                map(obj, function (val, key) {
                    return {
                        val: val,
                        idx: idx++,
                        criteria: iteratee(val, key, obj)
                    };
                }).sort(function (left, right) {
                    var a = left.criteria,
                        b = right.criteria;

                    if (a !== b) {
                        if (a > b || isUndef(a)) return 1;
                        if (a < b || isUndef(b)) return -1;
                    }

                    return left.idx - right.idx;
                }),
                'val'
            );
        };

        return exports;
    })({});

    /* ------------------------------ spaceCase ------------------------------ */

    _.spaceCase = (function (exports) {
        /* Convert string to "spaceCase".
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |str   |string|String to convert |
         * |return|string|Space cased string|
         */

        /* example
         * spaceCase('fooBar'); // -> foo bar
         * spaceCase('foo.bar'); // -> foo bar
         * spaceCase('foo.bar'); // -> foo bar
         */

        /* typescript
         * export declare function spaceCase(str: string): string;
         */

        /* dependencies
         * splitCase 
         */

        exports = function exports(str) {
            return splitCase(str).join(' ');
        };

        return exports;
    })({});

    /* ------------------------------ splitPath ------------------------------ */

    _.splitPath = (function (exports) {
        /* Split path into dir, name and ext.
         *
         * |Name  |Type  |Desc                               |
         * |------|------|-----------------------------------|
         * |path  |string|Path to split                      |
         * |return|object|Object containing dir, name and ext|
         */

        /* example
         * splitPath('f:/foo/bar.txt'); // -> {dir: 'f:/foo/', name: 'bar.txt', ext: '.txt'}
         * splitPath('/home/foo/bar.txt'); // -> {dir: '/home/foo/', name: 'bar.txt', ext: '.txt'}
         */

        /* typescript
         * export declare namespace splitPath {
         *     interface IPath {
         *         dir: string;
         *         name: string;
         *         ext: string;
         *     }
         * }
         * export declare function splitPath(path: string): splitPath.IPath;
         */
        exports = function exports(path) {
            var match = path.match(regSplit);
            return {
                dir: match[1],
                name: match[2],
                ext: match[3]
            };
        };

        var regSplit = /^([\s\S]*?)((?:\.{1,2}|[^\\/]+?|)(\.[^./\\]*|))(?:[\\/]*)$/;

        return exports;
    })({});

    /* ------------------------------ strHash ------------------------------ */

    _.strHash = (function (exports) {
        /* String hash function using djb2.
         *
         * |Name  |Type  |Desc          |
         * |------|------|--------------|
         * |str   |string|String to hash|
         * |return|number|Hash result   |
         */

        /* example
         * strHash('test'); // -> 2090770981
         */

        /* typescript
         * export declare function strHash(str: string): number;
         */
        exports = function exports(str) {
            var hash = 5381;
            var i = str.length;

            while (i) {
                hash = (hash << 5) + hash + str.charCodeAt(--i);
            }

            return hash >>> 0; // Make sure it's always positive.
        };

        return exports;
    })({});

    /* ------------------------------ type ------------------------------ */

    var type = _.type = (function (exports) {
        /* Determine the internal JavaScript [[Class]] of an object.
         *
         * |Name  |Type  |Desc                      |
         * |------|------|--------------------------|
         * |val   |*     |Value to get type         |
         * |return|string|Type of object, lowercased|
         */

        /* example
         * type(5); // -> 'number'
         * type({}); // -> 'object'
         * type(function () {}); // -> 'function'
         * type([]); // -> 'array'
         */

        /* typescript
         * export declare function type(val: any): string;
         */

        /* dependencies
         * objToStr isNaN 
         */

        exports = function exports(val) {
            if (val === null) return 'null';
            if (val === undefined) return 'undefined';
            if (isNaN(val)) return 'nan';
            var ret = objToStr(val).match(regObj);
            if (!ret) return '';
            return ret[1].toLowerCase();
        };

        var regObj = /^\[object\s+(.*?)]$/;

        return exports;
    })({});

    /* ------------------------------ stringify ------------------------------ */

    _.stringify = (function (exports) {
        /* JSON stringify with support for circular object, function etc.
         *
         * Undefined is treated as null value.
         *
         * |Name  |Type  |Desc               |
         * |------|------|-------------------|
         * |obj   |object|Object to stringify|
         * |spaces|number|Indent spaces      |
         * |return|string|Stringified object |
         */

        /* example
         * stringify({a: function () {}}); // -> '{"a":"[Function function () {}]"}'
         * var obj = {a: 1, b: {}};
         * obj.b = obj;
         * stringify(obj); // -> '{"a":1,"b":"[Circular ~]"}'
         */

        /* typescript
         * export declare function stringify(obj: any, spaces?: number): string;
         */

        /* dependencies
         * type upperFirst toStr isUndef isFn isRegExp 
         */

        exports = function exports(obj, spaces) {
            return JSON.stringify(obj, serializer(), spaces);
        };

        function serializer() {
            var stack = [],
                keys = [];
            return function (key, val) {
                if (stack.length > 0) {
                    var pos = stack.indexOf(this);

                    if (pos > -1) {
                        stack.splice(pos + 1);
                        keys.splice(pos, Infinity, key);
                    } else {
                        stack.push(this);
                        keys.push(key);
                    }

                    var valPos = stack.indexOf(val);

                    if (valPos > -1) {
                        if (stack[0] === val) {
                            val = '[Circular ~]';
                        } else {
                            val =
                                '[Circular ~.' + keys.slice(0, valPos).join('.') + ']';
                        }
                    }
                } else {
                    stack.push(val);
                }

                if (isRegExp(val) || isFn(val)) {
                    val = '[' + upperFirst(type(val)) + ' ' + toStr(val) + ']';
                } else if (isUndef(val)) {
                    val = null;
                }

                return val;
            };
        }

        return exports;
    })({});

    /* ------------------------------ stripAnsi ------------------------------ */

    _.stripAnsi = (function (exports) {
        /* Strip ansi codes from a string.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |str   |string|String to strip|
         * |return|string|Resulted string|
         */

        /* example
         * stripAnsi('\u001b[4mcake\u001b[0m'); // -> 'cake'
         */

        /* typescript
         * export declare function stripAnsi(str: string): string;
         */

        /* eslint-disable no-control-regex */
        var regAnsi = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

        exports = function exports(str) {
            return str.replace(regAnsi, '');
        };

        return exports;
    })({});

    /* ------------------------------ stripColor ------------------------------ */

    _.stripColor = (function (exports) {
        /* Strip ansi color codes from a string.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |str   |string|String to strip|
         * |return|string|Resulted string|
         */

        /* example
         * stripColor('\u001b[31mred\u001b[39m'); // -> 'red'
         */

        /* typescript
         * export declare function stripColor(str: string): string;
         */

        /* eslint-disable no-control-regex */
        var regColor = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g;

        exports = function exports(str) {
            return str.replace(regColor, '');
        };

        return exports;
    })({});

    /* ------------------------------ stripHtmlTag ------------------------------ */

    _.stripHtmlTag = (function (exports) {
        /* Strip html tags from a string.
         *
         * |Name  |Type  |Desc           |
         * |------|------|---------------|
         * |str   |string|String to strip|
         * |return|string|Resulted string|
         */

        /* example
         * stripHtmlTag('<p>Hello</p>'); // -> 'Hello'
         */

        /* typescript
         * export declare function stripHtmlTag(str: string): string;
         */
        var regHtmlTag = /<[^>]*>/g;

        exports = function exports(str) {
            return str.replace(regHtmlTag, '');
        };

        return exports;
    })({});

    /* ------------------------------ sum ------------------------------ */

    _.sum = (function (exports) {
        /* Compute sum of given numbers.
         *
         * |Name  |Type  |Desc                |
         * |------|------|--------------------|
         * |...num|number|Numbers to calculate|
         * |return|number|Sum of numbers      |
         */

        /* example
         * sum(1, 2, 5); // -> 8
         */

        /* typescript
         * export declare function sum(...num: number[]): number;
         */
        exports = function exports() {
            var arr = arguments,
                ret = 0;

            for (var i = 0, len = arr.length; i < len; i++) {
                ret += arr[i];
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ template ------------------------------ */

    _.template = (function (exports) {
        function _typeof(obj) {
            if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                        ? 'symbol'
                        : typeof obj;
                };
            }
            return _typeof(obj);
        }

        /* Compile JavaScript template into function that can be evaluated for rendering.
         *
         * |Name  |Type    |Desc                      |
         * |------|--------|--------------------------|
         * |str   |string  |Template string           |
         * |[util]|object  |Utility functions         |
         * |return|function|Compiled template function|
         */

        /* example
         * template('Hello <%= name %>!')({name: 'licia'}); // -> 'Hello licia!'
         * template('<p><%- name %></p>')({name: '<licia>'}); // -> '<p>&lt;licia&gt;</p>'
         * template('<%if (echo) {%>Hello licia!<%}%>')({echo: true}); // -> 'Hello licia!'
         * template('<p><%= util["upperCase"](name) %></p>', {
         *     upperCase: function (str) {
         *         return str.toLocaleUpperCase();
         *     }
         * })({ name: 'licia' }); // -> '<p>LICIA</p>'
         */

        /* typescript
         * export declare function template(str: string, util?: any): Function;
         */

        /* dependencies
         * escape defaults 
         */
        /* eslint-disable quotes */

        var regEvaluate = /<%([\s\S]+?)%>/g,
            regInterpolate = /<%=([\s\S]+?)%>/g,
            regEscape = /<%-([\s\S]+?)%>/g,
            regMatcher = RegExp(
                [regEscape.source, regInterpolate.source, regEvaluate.source].join(
                    '|'
                ) + '|$',
                'g'
            );
        var escapes = {
            "'": "'",
            '\\': '\\',
            '\r': 'r',
            '\n': 'n',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };
        var regEscapeChar = /\\|'|\r|\n|\u2028|\u2029/g;

        var escapeChar = function escapeChar(match) {
            return '\\' + escapes[match];
        };

        exports = function exports(str, util) {
            if (!util) {
                util =
                    (typeof _ === 'undefined' ? 'undefined' : _typeof(_)) === 'object'
                        ? _
                        : {
                            escape: escape
                        };
            } else {
                defaults(util, {
                    escape: escape
                });
            }

            var index = 0,
                src = "__p+='";
            str.replace(regMatcher, function (
                match,
                escape,
                interpolate,
                evaluate,
                offset
            ) {
                src += str.slice(index, offset).replace(regEscapeChar, escapeChar);
                index = offset + match.length;

                if (escape) {
                    src += "'+\n((__t=(" + escape + "))==null?'':util.escape(__t))+\n'";
                } else if (interpolate) {
                    src += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                } else if (evaluate) {
                    src += "';\n" + evaluate + "\n__p+='";
                }

                return match;
            });
            src += "';\n";
            src = 'with(obj||{}){\n' + src + '}\n';
            src =
                "var __t,__p='',__j=Array.prototype.join," +
                "print=function(){__p+=__j.call(arguments,'');};\n" +
                src +
                'return __p;\n';
            var render = new Function('obj', 'util', src);
            return function (data) {
                return render.call(null, data, util);
            };
        };

        return exports;
    })({});

    /* ------------------------------ throttle ------------------------------ */

    _.throttle = (function (exports) {
        /* Return a new throttled version of the passed function.
         *
         * |Name  |Type    |Desc                           |
         * |------|--------|-------------------------------|
         * |fn    |function|Function to throttle           |
         * |wait  |number  |Number of milliseconds to delay|
         * |return|function|New throttled function         |
         */

        /* example
         * const updatePos = throttle(function () {}, 100);
         * // $(window).scroll(updatePos);
         */

        /* typescript
         * export declare function throttle(fn: Function, wait: number): Function;
         */

        /* dependencies
         * debounce 
         */

        exports = function exports(fn, wait) {
            return debounce(fn, wait, true);
        };

        return exports;
    })({});

    /* ------------------------------ timeAgo ------------------------------ */

    _.timeAgo = (function (exports) {
        /* Format datetime with *** time ago statement.
         *
         * |Name          |Type  |Desc                     |
         * |--------------|------|-------------------------|
         * |date          |Date  |Date to calculate        |
         * |[now=new Date]|Date  |Current date             |
         * |return        |string|Formatted time ago string|
         */

        /* example
         * var now = new Date().getTime();
         * timeAgo(now - 1000 * 6); // -> right now
         * timeAgo(now + 1000 * 15); // -> in 15 minutes
         * timeAgo(now - 1000 * 60 * 60 * 5, now); // -> 5 hours ago
         */

        /* typescript
         * export declare function timeAgo(date: Date | number, now?: Date | number): string;
         */

        /* dependencies
         * isDate toInt 
         */

        exports = function exports(date, now) {
            if (!isDate(date)) date = new Date(date);
            now = now || new Date();
            if (!isDate(now)) now = new Date(now);
            var diff = (now - date) / 1000,
                i = 0,
                ago = diff > 0;
            diff = Math.abs(diff);

            while (diff >= secArr[i] && i < secArrLen) {
                diff /= secArr[i];
                i++;
            }

            diff = toInt(diff);
            i *= 2;
            if (diff > (i === 0 ? 9 : 1)) i += 1;
            return format(diff, i, ago);
        };

        var secArr = [60, 60, 24, 7, 365 / 7 / 12, 12],
            secArrLen = secArr.length;

        function format(diff, i, ago) {
            return exports.i18n[i][ago ? 0 : 1].replace('%s', diff);
        }

        exports.i18n = [
            ['just now', 'right now'],
            ['%s seconds ago', 'in %s seconds'],
            ['1 minute ago', 'in 1 minute'],
            ['%s minutes ago', 'in %s minutes'],
            ['1 hour ago', 'in 1 hour'],
            ['%s hours ago', 'in %s hours'],
            ['1 day ago', 'in 1 day'],
            ['%s days ago', 'in %s days'],
            ['1 week ago', 'in 1 week'],
            ['%s weeks ago', 'in %s weeks'],
            ['1 month ago', 'in 1 month'],
            ['%s months ago', 'in %s months'],
            ['1 year ago', 'in 1 year'],
            ['%s years ago', 'in %s years']
        ];

        return exports;
    })({});

    /* ------------------------------ timeTaken ------------------------------ */

    _.timeTaken = (function (exports) {
        /* Get execution time of a function.
         *
         * |Name  |Type    |Desc                    |
         * |------|--------|------------------------|
         * |fn    |function|Function to measure time|
         * |return|number  |Execution time, ms      |
         */

        /* example
         * timeTaken(function () {
         *     // Do something.
         * }); // -> Time taken to execute given function.
         */

        /* typescript
         * export declare function timeTaken(fn: Function): number;
         */

        /* dependencies
         * perfNow 
         */

        exports = function exports(fn) {
            var start = perfNow();
            fn();
            return perfNow() - start;
        };

        return exports;
    })({});

    /* ------------------------------ times ------------------------------ */

    _.times = (function (exports) {
        /* Invoke given function n times.
         *
         * |Name  |Type    |Desc                          |
         * |------|--------|------------------------------|
         * |n     |number  |Times to invoke function      |
         * |fn    |function|Function invoked per iteration|
         * |[ctx] |*       |Function context              |
         * |return|array   |Array of results              |
         */

        /* example
         * times(3, String); // -> ['0', '1', '2', '3']
         */

        /* typescript
         * export declare function times<T>(n: number, fn: (n: number) => T, ctx?: any): T[];
         */

        /* dependencies
         * optimizeCb 
         */

        exports = function exports(n, fn, ctx) {
            var ret = Array(Math.max(0, n));
            fn = optimizeCb(fn, ctx, 1);

            for (var i = 0; i < n; i++) {
                ret[i] = fn(i);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ topoSort ------------------------------ */

    _.topoSort = (function (exports) {
        /* Topological sorting algorithm.
         *
         * |Name  |Type |Desc        |
         * |------|-----|------------|
         * |edges |array|Dependencies|
         * |return|array|Sorted order|
         */

        /* example
         * topoSort([[1, 2], [1, 3], [3, 2]]); // -> [1, 3, 2]
         */

        /* typescript
         * export declare function topoSort(edges: any[]): any[];
         */
        exports = function exports(edges) {
            return sort(uniqueNodes(edges), edges);
        };

        function uniqueNodes(arr) {
            var ret = [];

            for (var i = 0, len = arr.length; i < len; i++) {
                var edge = arr[i];
                if (ret.indexOf(edge[0]) < 0) ret.push(edge[0]);
                if (ret.indexOf(edge[1]) < 0) ret.push(edge[1]);
            }

            return ret;
        }

        function sort(nodes, edges) {
            var cursor = nodes.length,
                sorted = new Array(cursor),
                visited = {},
                i = cursor;

            while (i--) {
                if (!visited[i]) visit(nodes[i], i, []);
            }

            function visit(node, i, predecessors) {
                if (predecessors.indexOf(node) >= 0) {
                    throw new Error('Cyclic dependency: ' + JSON.stringify(node));
                }

                if (visited[i]) return;
                visited[i] = true;
                var outgoing = edges.filter(function (edge) {
                    return edge[0] === node;
                });
                /* eslint-disable no-cond-assign */

                if ((i = outgoing.length)) {
                    var preds = predecessors.concat(node);

                    do {
                        var child = outgoing[--i][1];
                        visit(child, nodes.indexOf(child), preds);
                    } while (i);
                }

                sorted[--cursor] = node;
            }

            return sorted;
        }

        return exports;
    })({});

    /* ------------------------------ tryIt ------------------------------ */

    _.tryIt = (function (exports) {
        /* Run function in a try catch.
         *
         * |Name|Type    |Desc                 |
         * |----|--------|---------------------|
         * |fn  |function|Function to try catch|
         * |[cb]|function|Callback             |
         */

        /* example
         * tryIt(function () {
         *     // Do something that might cause an error.
         * }, function (err, result) {
         *     if (err) console.log(err);
         * });
         */

        /* typescript
         * export declare function tryIt(fn: Function, cb?: Function): void;
         */

        /* dependencies
         * noop 
         */

        exports = function exports(fn, cb) {
            cb = cb || noop;

            try {
                cb(null, fn());
            } catch (e) {
                cb(e);
                return;
            }
        };

        return exports;
    })({});

    /* ------------------------------ unescape ------------------------------ */

    _.unescape = (function (exports) {
        /* Convert HTML entities back, the inverse of escape.
         *
         * |Name  |Type  |Desc              |
         * |------|------|------------------|
         * |str   |string|String to unescape|
         * |return|string|unescaped string  |
         */

        /* example
         * unescape('You &amp; Me'); // -> 'You & Me'
         */

        /* typescript
         * export declare function unescape(str: string): string;
         */

        /* dependencies
         * escape keys invert 
         */

        exports = function exports(str) {
            return regTest.test(str) ? str.replace(regReplace, replaceFn) : str;
        };

        var map = invert(escape.map);
        var regSrc = '(?:' + keys(map).join('|') + ')',
            regTest = new RegExp(regSrc),
            regReplace = new RegExp(regSrc, 'g');

        function replaceFn(match) {
            return map[match];
        }

        return exports;
    })({});

    /* ------------------------------ union ------------------------------ */

    _.union = (function (exports) {
        /* Create an array of unique values, in order, from all given arrays.
         *
         * |Name  |Type |Desc                        |
         * |------|-----|----------------------------|
         * |...arr|array|Arrays to inspect           |
         * |return|array|New array of combined values|
         */

        /* example
         * union([2, 1], [4, 2], [1, 2]); // -> [2, 1, 4]
         */

        /* typescript
         * export declare function union(...arr: Array<any[]>): any[];
         */

        /* dependencies
         * restArgs unique flatten 
         */

        exports = restArgs(function (arrays) {
            return unique(flatten(arrays));
        });

        return exports;
    })({});

    /* ------------------------------ unzip ------------------------------ */

    var unzip = _.unzip = (function (exports) {
        /* Opposite of zip.
         *
         * |Name  |Type |Desc                                |
         * |------|-----|------------------------------------|
         * |arr   |array|Array of grouped elements to process|
         * |return|array|New array of regrouped elements     |
         */

        /* example
         * unzip([['a', 1, true], ['b', 2, false]]); // -> [['a', 'b'], [1, 2], [true, false]]
         */

        /* typescript
         * declare function unzip(arr: Array<any[]>): Array<any[]>;
         */

        /* dependencies
         * map pluck max 
         */

        exports = function exports(arr) {
            var len = max.apply(
                null,
                map(arr, function (arr) {
                    return arr.length;
                })
                ),
                ret = Array(len);

            for (var i = 0; i < len; i++) {
                ret[i] = pluck(arr, i);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ upperCase ------------------------------ */

    _.upperCase = (function (exports) {
        /* Convert string to upper case.
         *
         * |Name  |Type  |Desc             |
         * |------|------|-----------------|
         * |str   |string|String to convert|
         * |return|string|Uppercased string|
         */

        /* example
         * upperCase('test'); // -> 'TEST'
         */

        /* typescript
         * export declare function upperCase(str: string): string;
         */

        /* dependencies
         * toStr 
         */

        exports = function exports(str) {
            return toStr(str).toLocaleUpperCase();
        };

        return exports;
    })({});

    /* ------------------------------ use ------------------------------ */

    _.use = (function (exports) {
        /* Use modules that is created by define.
         *
         * |Name      |Type    |Desc                |
         * |----------|--------|--------------------|
         * |[requires]|array   |Dependencies        |
         * |method    |function|Codes to be executed|
         */

        /* example
         * // define('A', () => 'A');
         * use(['A'], function (A) {
         *     console.log(A + 'B'); // -> 'AB'
         * });
         */

        /* typescript
         * export declare function use(requires: string[], method: Function): void;
         * export declare function use(method: Function): void;
         */

        /* dependencies
         * map define has toArr 
         */

        exports = function exports(requires, method) {
            if (method == null) {
                method = requires;
                requires = [];
            }

            requires = map(toArr(requires), function (val) {
                return req(val);
            });
            method.apply(null, requires);
        };

        var modules = define._modules;
        var requireMarks = {};

        function req(name) {
            if (has(requireMarks, name)) return modules[name];
            var requires = modules[name].requires,
                body = modules[name].body,
                len = requires.length;

            for (var i = 0; i < len; i++) {
                requires[i] = req(requires[i]);
            }

            var exports = body.apply(null, requires);
            if (exports) modules[name] = exports;
            requireMarks[name] = true;
            return modules[name];
        }

        return exports;
    })({});

    /* ------------------------------ uuid ------------------------------ */

    _.uuid = (function (exports) {
        /* RFC4122 version 4 compliant uuid generator.
         *
         * Check [RFC4122 4.4](http://www.ietf.org/rfc/rfc4122.txt) for reference.
         */

        /* example
         * uuid(); // -> '53ce0497-6554-49e9-8d79-347406d2a88b'
         */

        /* typescript
         * export declare function uuid(): string;
         */

        /* dependencies
         * randomBytes 
         */

        exports = function exports() {
            var b = randomBytes(16);
            b[6] = (b[6] & 0x0f) | 0x40;
            b[8] = (b[8] & 0x3f) | 0x80;
            return (
                hexBytes[b[0]] +
                hexBytes[b[1]] +
                hexBytes[b[2]] +
                hexBytes[b[3]] +
                '-' +
                hexBytes[b[4]] +
                hexBytes[b[5]] +
                '-' +
                hexBytes[b[6]] +
                hexBytes[b[7]] +
                '-' +
                hexBytes[b[8]] +
                hexBytes[b[9]] +
                '-' +
                hexBytes[b[10]] +
                hexBytes[b[11]] +
                hexBytes[b[12]] +
                hexBytes[b[13]] +
                hexBytes[b[14]] +
                hexBytes[b[15]]
            );
        };

        var hexBytes = [];

        for (var i = 0; i < 256; i++) {
            hexBytes[i] = (i + 0x100).toString(16).substr(1);
        }

        return exports;
    })({});

    /* ------------------------------ vlq ------------------------------ */

    _.vlq = (function (exports) {
        /* Variable-length quantity encoding and decoding.
         *
         * ### encode
         *
         * Encode numbers into vlq string.
         *
         * |Name  |Type        |Desc            |
         * |------|------------|----------------|
         * |number|number array|Number to encode|
         * |return|string      |Encoded string  |
         *
         * ### decode
         *
         * Decode vlq string into numbers.
         *
         * |Name  |Type  |Desc            |
         * |------|------|----------------|
         * |string|string|String to decode|
         * |return|array |Decoded numbers |
         */

        /* example
         * vlq.encode(123); // -> '2H'
         * vlq.encode([123, 456, 789]); // -> '2HwcqxB'
         * vlq.decode('2H'); // -> [123]
         * vlq.decode('2HwcqxB'); // -> [123, 456, 789]
         */

        /* typescript
         * export declare const vlq: {
         *     encode(number: number | number[]): string;
         *     decode(string: string): number[];
         * };
         */

        /* dependencies
         * toArr 
         */ // https://github.com/google/closure-compiler/blob/master/src/com/google/debugging/sourcemap/Base64VLQ.java

        exports = {
            encode: function encode(arr) {
                arr = toArr(arr);
                var ret = '';

                for (var i = 0, len = arr.length; i < len; i++) {
                    ret += _encode(arr[i]);
                }

                return ret;
            },
            decode: function decode(str) {
                var ret = [];
                var i = 0;
                var len = str.length;

                while (i < len) {
                    var value = 0;
                    var continuation = false;
                    var shift = 0;

                    do {
                        var digit = charToInt[str[i++]];
                        continuation = (digit & VLQ_CONTINUATION_BIT) !== 0;
                        digit &= VLQ_BASE_MASK;
                        value = value + (digit << shift);
                        shift = shift + VLQ_BASE_SHIFT;
                    } while (continuation);

                    ret.push(fromVLQSigned(value));
                }

                return ret;
            }
        };
        var charToInt = {};
        var intToChar = {};
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        for (var i = 0, len = chars.length; i < len; i++) {
            charToInt[chars[i]] = i;
            intToChar[i] = chars[i];
        }

        var VLQ_BASE_SHIFT = 5;
        var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
        var VLQ_BASE_MASK = VLQ_BASE - 1;
        var VLQ_CONTINUATION_BIT = VLQ_BASE;

        function _encode(value) {
            var ret = '';
            value = toVLQSigned(value);

            do {
                var digit = value & VLQ_BASE_MASK;
                value >>>= VLQ_BASE_SHIFT;

                if (value > 0) {
                    digit |= VLQ_CONTINUATION_BIT;
                }

                ret += intToChar[digit];
            } while (value > 0);

            return ret;
        }

        function toVLQSigned(value) {
            if (value < 0) {
                return (-value << 1) + 1;
            } else {
                return (value << 1) + 0;
            }
        }

        function fromVLQSigned(value) {
            var negate = (value & 1) === 1;
            value = value >> 1;
            return negate ? -value : value;
        }

        return exports;
    })({});

    /* ------------------------------ waitUntil ------------------------------ */

    _.waitUntil = (function (exports) {
        /* Wait until function returns a truthy value.
         *
         * |Name          |Type    |Desc              |
         * |--------------|--------|------------------|
         * |condition     |function|Condition function|
         * |[timeout=0]   |number  |Timeout           |
         * |[interval=250]|number  |Wait interval     |
         */

        /* example
         * let a = 5;
         * setTimeout(() => a = 10, 500);
         * waitUntil(() => a === 10).then(() => {
         *     console.log(a); // -> 10
         * });
         */

        /* typescript
         * export declare function waitUntil(
         *     condition: Function,
         *     timeout?: number,
         *     interval?: number
         * ): Promise<any>;
         */

        /* dependencies
         * now 
         */

        exports = function exports(condition) {
            var timeout =
                arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var interval =
                arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;

            function evalCondition() {
                return new Promise(function (resolve, reject) {
                    try {
                        resolve(condition());
                    } catch (e) {
                        reject(e);
                    }
                });
            }

            return new Promise(function (resolve, reject) {
                var startTime = now();

                var pollCondition = function pollCondition() {
                    evalCondition().then(function (val) {
                        var elapsed = now() - startTime;

                        if (val) {
                            resolve(val);
                        } else if (timeout && elapsed >= timeout) {
                            reject(
                                Error('Wait timed out after '.concat(elapsed, ' ms'))
                            );
                        } else {
                            setTimeout(pollCondition, interval);
                        }
                    }, reject);
                };

                pollCondition();
            });
        };

        return exports;
    })({});

    /* ------------------------------ waterfall ------------------------------ */

    _.waterfall = (function (exports) {
        /* Run an array of functions in series.
         *
         * |Name |Type    |Desc                   |
         * |-----|--------|-----------------------|
         * |tasks|array   |Array of functions     |
         * |[cb] |function|Callback once completed|
         */

        /* example
         * waterfall([
         *     function (cb) {
         *         cb(null, 'one');
         *     },
         *     function (arg1, cb) {
         *         // arg1 -> 'one'
         *         cb(null, 'done');
         *     }
         * ], function (err, result) {
         *     // result -> 'done'
         * });
         */

        /* typescript
         * export declare function waterfall(tasks: Function[], cb?: Function): void;
         */

        /* dependencies
         * noop nextTick restArgs 
         */

        exports = function exports(tasks, cb) {
            cb = cb || noop;
            var current = 0;
            var taskCb = restArgs(function (err, args) {
                if (++current >= tasks.length || err) {
                    args.unshift(err);
                    nextTick(function () {
                        cb.apply(null, args);
                    });
                } else {
                    args.push(taskCb);
                    tasks[current].apply(null, args);
                }
            });

            if (tasks.length) {
                tasks[0](taskCb);
            } else {
                nextTick(function () {
                    cb();
                });
            }
        };

        return exports;
    })({});

    /* ------------------------------ wrap ------------------------------ */

    _.wrap = (function (exports) {
        /* Wrap the function inside a wrapper function, passing it as the first argument.
         *
         * |Name   |Type    |Desc            |
         * |-------|--------|----------------|
         * |fn     |function|Function to wrap|
         * |wrapper|function|Wrapper function|
         * |return |function|New function    |
         */

        /* example
         * var p = wrap(escape, function(fn, text) {
         *     return '<p>' + fn(text) + '</p>';
         * });
         * p('You & Me'); // -> '<p>You &amp; Me</p>'
         */

        /* typescript
         * export declare function wrap(fn: Function, wrapper: Function): Function;
         */

        /* dependencies
         * partial 
         */

        exports = function exports(fn, wrapper) {
            return partial(wrapper, fn);
        };

        return exports;
    })({});

    /* ------------------------------ wx ------------------------------ */

    _.wx = (function (exports) {
        /* Promised version of mini program wx object.
         */

        /* example
         * wx.getStorage('test').then(res => {
         *     console.log(res.data);
         * });
         */

        /* typescript
         * export declare const wx: any;
         */

        /* dependencies
         * each arrToMap startWith endWith 
         */

        // https://github.com/Tencent/wepy
        const noPromiseMethods = arrToMap([
            'stopRecord',
            'getRecorderManager',
            'pauseVoice',
            'stopVoice',
            'pauseBackgroundAudio',
            'stopBackgroundAudio',
            'getBackgroundAudioManager',
            'createAudioContext',
            'createInnerAudioContext',
            'createVideoContext',
            'createCameraContext',

            'createMapContext',

            'canIUse',
            'startAccelerometer',
            'stopAccelerometer',
            'startCompass',
            'stopCompass',
            'onBLECharacteristicValueChange',
            'onBLEConnectionStateChange',

            'hideToast',
            'hideLoading',
            'showNavigationBarLoading',
            'hideNavigationBarLoading',
            'navigateBack',
            'createAnimation',
            'pageScrollTo',
            'createSelectorQuery',
            'createCanvasContext',
            'createContext',
            'drawCanvas',
            'hideKeyboard',
            'stopPullDownRefresh',

            'arrayBufferToBase64',
            'base64ToArrayBuffer'
        ]);

        function needToPromisify(name) {
            return (
                !noPromiseMethods[name] &&
                !startWith(name, 'on') &&
                !endWith(name, 'Sync')
            );
        }

        each(wx, (fn, name) => {
            if (!needToPromisify(name)) return;

            exports[name] = function (obj) {
                return new Promise((resolve, reject) => {
                    fn.call(wx, {
                        ...obj,
                        success(res) {
                            resolve(res);
                        },
                        fail(res) {
                            reject(res);
                        }
                    });
                });
            };
        });

        return exports;
    })({});

    /* ------------------------------ zip ------------------------------ */

    _.zip = (function (exports) {
        /* Merge together the values of each of the arrays with the values at the corresponding position.
         *
         * |Name  |Type |Desc                         |
         * |------|-----|-----------------------------|
         * |...arr|array|Arrays to process            |
         * |return|array|New array of grouped elements|
         */

        /* example
         * zip(['a', 'b'], [1, 2], [true, false]); // -> [['a', 1, true], ['b', 2, false]]
         */

        /* typescript
         * export declare function zip(...arr: Array<any[]>): Array<any[]>;
         */

        /* dependencies
         * restArgs unzip 
         */

        exports = restArgs(unzip);

        return exports;
    })({});

    return _;
}));