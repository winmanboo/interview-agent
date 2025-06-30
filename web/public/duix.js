(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DUIX = factory());
})(this, (function () { 'use strict';

  function _mergeNamespaces(n, m) {
    m.forEach(function (e) {
      e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
        if (k !== 'default' && !(k in n)) {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    });
    return Object.freeze(n);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return {
            value: void 0,
            done: !0
          };
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable || "" === iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      throw new TypeError(typeof iterable + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
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
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateMethodInitSpec(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }

  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */

  let logDisabled_ = true;
  let deprecationWarnings_ = true;

  /**
   * Extract browser version out of the provided user agent string.
   *
   * @param {!string} uastring userAgent string.
   * @param {!string} expr Regular expression used as match criteria.
   * @param {!number} pos position in the version string to be returned.
   * @return {!number} browser version.
   */
  function extractVersion(uastring, expr, pos) {
    const match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
  }

  // Wraps the peerconnection event eventNameToWrap in a function
  // which returns the modified event object (or false to prevent
  // the event).
  function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
    if (!window.RTCPeerConnection) {
      return;
    }
    const proto = window.RTCPeerConnection.prototype;
    const nativeAddEventListener = proto.addEventListener;
    proto.addEventListener = function (nativeEventName, cb) {
      if (nativeEventName !== eventNameToWrap) {
        return nativeAddEventListener.apply(this, arguments);
      }
      const wrappedCallback = e => {
        const modifiedEvent = wrapper(e);
        if (modifiedEvent) {
          if (cb.handleEvent) {
            cb.handleEvent(modifiedEvent);
          } else {
            cb(modifiedEvent);
          }
        }
      };
      this._eventMap = this._eventMap || {};
      if (!this._eventMap[eventNameToWrap]) {
        this._eventMap[eventNameToWrap] = new Map();
      }
      this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
      return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
    };
    const nativeRemoveEventListener = proto.removeEventListener;
    proto.removeEventListener = function (nativeEventName, cb) {
      if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      if (!this._eventMap[eventNameToWrap].has(cb)) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      const unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
      this._eventMap[eventNameToWrap].delete(cb);
      if (this._eventMap[eventNameToWrap].size === 0) {
        delete this._eventMap[eventNameToWrap];
      }
      if (Object.keys(this._eventMap).length === 0) {
        delete this._eventMap;
      }
      return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
    };
    Object.defineProperty(proto, 'on' + eventNameToWrap, {
      get() {
        return this['_on' + eventNameToWrap];
      },
      set(cb) {
        if (this['_on' + eventNameToWrap]) {
          this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
          delete this['_on' + eventNameToWrap];
        }
        if (cb) {
          this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
        }
      },
      enumerable: true,
      configurable: true
    });
  }
  function disableLog(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + typeof bool + '. Please use a boolean.');
    }
    logDisabled_ = bool;
    return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
  }

  /**
   * Disable or enable deprecation warnings
   * @param {!boolean} bool set to true to disable warnings.
   */
  function disableWarnings(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + typeof bool + '. Please use a boolean.');
    }
    deprecationWarnings_ = !bool;
    return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
  }
  function log() {
    if (typeof window === 'object') {
      if (logDisabled_) {
        return;
      }
      if (typeof console !== 'undefined' && typeof console.log === 'function') {
        console.log.apply(console, arguments);
      }
    }
  }

  /**
   * Shows a deprecation warning suggesting the modern and spec-compatible API.
   */
  function deprecated(oldMethod, newMethod) {
    if (!deprecationWarnings_) {
      return;
    }
    console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
  }

  /**
   * Browser detector.
   *
   * @return {object} result containing browser and version
   *     properties.
   */
  function detectBrowser(window) {
    // Returned result object.
    const result = {
      browser: null,
      version: null
    };

    // Fail early if it's not a browser
    if (typeof window === 'undefined' || !window.navigator || !window.navigator.userAgent) {
      result.browser = 'Not a browser.';
      return result;
    }
    const {
      navigator
    } = window;
    if (navigator.mozGetUserMedia) {
      // Firefox.
      result.browser = 'firefox';
      result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
    } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection) {
      // Chrome, Chromium, Webview, Opera.
      // Version matches Chrome/WebRTC version.
      // Chrome 74 removed webkitGetUserMedia on http as well so we need the
      // more complicated fallback to webkitRTCPeerConnection.
      result.browser = 'chrome';
      result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
    } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
      // Safari.
      result.browser = 'safari';
      result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
      result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
    } else {
      // Default fallthrough: not supported.
      result.browser = 'Not a supported browser.';
      return result;
    }
    return result;
  }

  /**
   * Checks if something is an object.
   *
   * @param {*} val The something you want to check.
   * @return true if val is an object, false otherwise.
   */
  function isObject$1(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  }

  /**
   * Remove all empty objects and undefined values
   * from a nested object -- an enhanced and vanilla version
   * of Lodash's `compact`.
   */
  function compactObject(data) {
    if (!isObject$1(data)) {
      return data;
    }
    return Object.keys(data).reduce(function (accumulator, key) {
      const isObj = isObject$1(data[key]);
      const value = isObj ? compactObject(data[key]) : data[key];
      const isEmptyObject = isObj && !Object.keys(value).length;
      if (value === undefined || isEmptyObject) {
        return accumulator;
      }
      return Object.assign(accumulator, {
        [key]: value
      });
    }, {});
  }

  /* iterates the stats graph recursively. */
  function walkStats(stats, base, resultSet) {
    if (!base || resultSet.has(base.id)) {
      return;
    }
    resultSet.set(base.id, base);
    Object.keys(base).forEach(name => {
      if (name.endsWith('Id')) {
        walkStats(stats, stats.get(base[name]), resultSet);
      } else if (name.endsWith('Ids')) {
        base[name].forEach(id => {
          walkStats(stats, stats.get(id), resultSet);
        });
      }
    });
  }

  /* filter getStats for a sender/receiver track. */
  function filterStats(result, track, outbound) {
    const streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
    const filteredResult = new Map();
    if (track === null) {
      return filteredResult;
    }
    const trackStats = [];
    result.forEach(value => {
      if (value.type === 'track' && value.trackIdentifier === track.id) {
        trackStats.push(value);
      }
    });
    trackStats.forEach(trackStat => {
      result.forEach(stats => {
        if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
          walkStats(result, stats, filteredResult);
        }
      });
    });
    return filteredResult;
  }

  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  const logging = log;
  function shimGetUserMedia$2(window, browserDetails) {
    const navigator = window && window.navigator;
    if (!navigator.mediaDevices) {
      return;
    }
    const constraintsToChrome_ = function (c) {
      if (typeof c !== 'object' || c.mandatory || c.optional) {
        return c;
      }
      const cc = {};
      Object.keys(c).forEach(key => {
        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
          return;
        }
        const r = typeof c[key] === 'object' ? c[key] : {
          ideal: c[key]
        };
        if (r.exact !== undefined && typeof r.exact === 'number') {
          r.min = r.max = r.exact;
        }
        const oldname_ = function (prefix, name) {
          if (prefix) {
            return prefix + name.charAt(0).toUpperCase() + name.slice(1);
          }
          return name === 'deviceId' ? 'sourceId' : name;
        };
        if (r.ideal !== undefined) {
          cc.optional = cc.optional || [];
          let oc = {};
          if (typeof r.ideal === 'number') {
            oc[oldname_('min', key)] = r.ideal;
            cc.optional.push(oc);
            oc = {};
            oc[oldname_('max', key)] = r.ideal;
            cc.optional.push(oc);
          } else {
            oc[oldname_('', key)] = r.ideal;
            cc.optional.push(oc);
          }
        }
        if (r.exact !== undefined && typeof r.exact !== 'number') {
          cc.mandatory = cc.mandatory || {};
          cc.mandatory[oldname_('', key)] = r.exact;
        } else {
          ['min', 'max'].forEach(mix => {
            if (r[mix] !== undefined) {
              cc.mandatory = cc.mandatory || {};
              cc.mandatory[oldname_(mix, key)] = r[mix];
            }
          });
        }
      });
      if (c.advanced) {
        cc.optional = (cc.optional || []).concat(c.advanced);
      }
      return cc;
    };
    const shimConstraints_ = function (constraints, func) {
      if (browserDetails.version >= 61) {
        return func(constraints);
      }
      constraints = JSON.parse(JSON.stringify(constraints));
      if (constraints && typeof constraints.audio === 'object') {
        const remap = function (obj, a, b) {
          if (a in obj && !(b in obj)) {
            obj[b] = obj[a];
            delete obj[a];
          }
        };
        constraints = JSON.parse(JSON.stringify(constraints));
        remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
        remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
        constraints.audio = constraintsToChrome_(constraints.audio);
      }
      if (constraints && typeof constraints.video === 'object') {
        // Shim facingMode for mobile & surface pro.
        let face = constraints.video.facingMode;
        face = face && (typeof face === 'object' ? face : {
          ideal: face
        });
        const getSupportedFacingModeLies = browserDetails.version < 66;
        if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
          delete constraints.video.facingMode;
          let matches;
          if (face.exact === 'environment' || face.ideal === 'environment') {
            matches = ['back', 'rear'];
          } else if (face.exact === 'user' || face.ideal === 'user') {
            matches = ['front'];
          }
          if (matches) {
            // Look for matches in label, or use last cam for back (typical).
            return navigator.mediaDevices.enumerateDevices().then(devices => {
              devices = devices.filter(d => d.kind === 'videoinput');
              let dev = devices.find(d => matches.some(match => d.label.toLowerCase().includes(match)));
              if (!dev && devices.length && matches.includes('back')) {
                dev = devices[devices.length - 1]; // more likely the back cam
              }

              if (dev) {
                constraints.video.deviceId = face.exact ? {
                  exact: dev.deviceId
                } : {
                  ideal: dev.deviceId
                };
              }
              constraints.video = constraintsToChrome_(constraints.video);
              logging('chrome: ' + JSON.stringify(constraints));
              return func(constraints);
            });
          }
        }
        constraints.video = constraintsToChrome_(constraints.video);
      }
      logging('chrome: ' + JSON.stringify(constraints));
      return func(constraints);
    };
    const shimError_ = function (e) {
      if (browserDetails.version >= 64) {
        return e;
      }
      return {
        name: {
          PermissionDeniedError: 'NotAllowedError',
          PermissionDismissedError: 'NotAllowedError',
          InvalidStateError: 'NotAllowedError',
          DevicesNotFoundError: 'NotFoundError',
          ConstraintNotSatisfiedError: 'OverconstrainedError',
          TrackStartError: 'NotReadableError',
          MediaDeviceFailedDueToShutdown: 'NotAllowedError',
          MediaDeviceKillSwitchOn: 'NotAllowedError',
          TabCaptureError: 'AbortError',
          ScreenCaptureError: 'AbortError',
          DeviceCaptureError: 'AbortError'
        }[e.name] || e.name,
        message: e.message,
        constraint: e.constraint || e.constraintName,
        toString() {
          return this.name + (this.message && ': ') + this.message;
        }
      };
    };
    const getUserMedia_ = function (constraints, onSuccess, onError) {
      shimConstraints_(constraints, c => {
        navigator.webkitGetUserMedia(c, onSuccess, e => {
          if (onError) {
            onError(shimError_(e));
          }
        });
      });
    };
    navigator.getUserMedia = getUserMedia_.bind(navigator);

    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    if (navigator.mediaDevices.getUserMedia) {
      const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = function (cs) {
        return shimConstraints_(cs, c => origGetUserMedia(c).then(stream => {
          if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
            stream.getTracks().forEach(track => {
              track.stop();
            });
            throw new DOMException('', 'NotFoundError');
          }
          return stream;
        }, e => Promise.reject(shimError_(e))));
      };
    }
  }

  /*
   *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */

  function shimGetDisplayMedia$1(window, getSourceId) {
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
      return;
    }
    if (!window.navigator.mediaDevices) {
      return;
    }
    // getSourceId is a function that returns a promise resolving with
    // the sourceId of the screen/window/tab to be shared.
    if (typeof getSourceId !== 'function') {
      console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
      return;
    }
    window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
      return getSourceId(constraints).then(sourceId => {
        const widthSpecified = constraints.video && constraints.video.width;
        const heightSpecified = constraints.video && constraints.video.height;
        const frameRateSpecified = constraints.video && constraints.video.frameRate;
        constraints.video = {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
            maxFrameRate: frameRateSpecified || 3
          }
        };
        if (widthSpecified) {
          constraints.video.mandatory.maxWidth = widthSpecified;
        }
        if (heightSpecified) {
          constraints.video.mandatory.maxHeight = heightSpecified;
        }
        return window.navigator.mediaDevices.getUserMedia(constraints);
      });
    };
  }

  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  function shimMediaStream(window) {
    window.MediaStream = window.MediaStream || window.webkitMediaStream;
  }
  function shimOnTrack$1(window) {
    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
        get() {
          return this._ontrack;
        },
        set(f) {
          if (this._ontrack) {
            this.removeEventListener('track', this._ontrack);
          }
          this.addEventListener('track', this._ontrack = f);
        },
        enumerable: true,
        configurable: true
      });
      const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        if (!this._ontrackpoly) {
          this._ontrackpoly = e => {
            // onaddstream does not fire when a track is added to an existing
            // stream. But stream.onaddtrack is implemented so we use that.
            e.stream.addEventListener('addtrack', te => {
              let receiver;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = this.getReceivers().find(r => r.track && r.track.id === te.track.id);
              } else {
                receiver = {
                  track: te.track
                };
              }
              const event = new Event('track');
              event.track = te.track;
              event.receiver = receiver;
              event.transceiver = {
                receiver
              };
              event.streams = [e.stream];
              this.dispatchEvent(event);
            });
            e.stream.getTracks().forEach(track => {
              let receiver;
              if (window.RTCPeerConnection.prototype.getReceivers) {
                receiver = this.getReceivers().find(r => r.track && r.track.id === track.id);
              } else {
                receiver = {
                  track
                };
              }
              const event = new Event('track');
              event.track = track;
              event.receiver = receiver;
              event.transceiver = {
                receiver
              };
              event.streams = [e.stream];
              this.dispatchEvent(event);
            });
          };
          this.addEventListener('addstream', this._ontrackpoly);
        }
        return origSetRemoteDescription.apply(this, arguments);
      };
    } else {
      // even if RTCRtpTransceiver is in window, it is only used and
      // emitted in unified-plan. Unfortunately this means we need
      // to unconditionally wrap the event.
      wrapPeerConnectionEvent(window, 'track', e => {
        if (!e.transceiver) {
          Object.defineProperty(e, 'transceiver', {
            value: {
              receiver: e.receiver
            }
          });
        }
        return e;
      });
    }
  }
  function shimGetSendersWithDtmf(window) {
    // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
    if (typeof window === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
      const shimSenderWithDtmf = function (pc, track) {
        return {
          track,
          get dtmf() {
            if (this._dtmf === undefined) {
              if (track.kind === 'audio') {
                this._dtmf = pc.createDTMFSender(track);
              } else {
                this._dtmf = null;
              }
            }
            return this._dtmf;
          },
          _pc: pc
        };
      };

      // augment addTrack when getSenders is not available.
      if (!window.RTCPeerConnection.prototype.getSenders) {
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          this._senders = this._senders || [];
          return this._senders.slice(); // return a copy of the internal state.
        };

        const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
          let sender = origAddTrack.apply(this, arguments);
          if (!sender) {
            sender = shimSenderWithDtmf(this, track);
            this._senders.push(sender);
          }
          return sender;
        };
        const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
        window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
          origRemoveTrack.apply(this, arguments);
          const idx = this._senders.indexOf(sender);
          if (idx !== -1) {
            this._senders.splice(idx, 1);
          }
        };
      }
      const origAddStream = window.RTCPeerConnection.prototype.addStream;
      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._senders = this._senders || [];
        origAddStream.apply(this, [stream]);
        stream.getTracks().forEach(track => {
          this._senders.push(shimSenderWithDtmf(this, track));
        });
      };
      const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
      window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._senders = this._senders || [];
        origRemoveStream.apply(this, [stream]);
        stream.getTracks().forEach(track => {
          const sender = this._senders.find(s => s.track === track);
          if (sender) {
            // remove sender
            this._senders.splice(this._senders.indexOf(sender), 1);
          }
        });
      };
    } else if (typeof window === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
      const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        const senders = origGetSenders.apply(this, []);
        senders.forEach(sender => sender._pc = this);
        return senders;
      };
      Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
        get() {
          if (this._dtmf === undefined) {
            if (this.track.kind === 'audio') {
              this._dtmf = this._pc.createDTMFSender(this.track);
            } else {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        }
      });
    }
  }
  function shimGetStats(window) {
    if (!window.RTCPeerConnection) {
      return;
    }
    const origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
      const [selector, onSucc, onErr] = arguments;

      // If selector is a function then we are in the old style stats so just
      // pass back the original getStats format to avoid breaking old users.
      if (arguments.length > 0 && typeof selector === 'function') {
        return origGetStats.apply(this, arguments);
      }

      // When spec-style getStats is supported, return those when called with
      // either no arguments or the selector argument is null.
      if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) {
        return origGetStats.apply(this, []);
      }
      const fixChromeStats_ = function (response) {
        const standardReport = {};
        const reports = response.result();
        reports.forEach(report => {
          const standardStats = {
            id: report.id,
            timestamp: report.timestamp,
            type: {
              localcandidate: 'local-candidate',
              remotecandidate: 'remote-candidate'
            }[report.type] || report.type
          };
          report.names().forEach(name => {
            standardStats[name] = report.stat(name);
          });
          standardReport[standardStats.id] = standardStats;
        });
        return standardReport;
      };

      // shim getStats with maplike support
      const makeMapStats = function (stats) {
        return new Map(Object.keys(stats).map(key => [key, stats[key]]));
      };
      if (arguments.length >= 2) {
        const successCallbackWrapper_ = function (response) {
          onSucc(makeMapStats(fixChromeStats_(response)));
        };
        return origGetStats.apply(this, [successCallbackWrapper_, selector]);
      }

      // promise-support
      return new Promise((resolve, reject) => {
        origGetStats.apply(this, [function (response) {
          resolve(makeMapStats(fixChromeStats_(response)));
        }, reject]);
      }).then(onSucc, onErr);
    };
  }
  function shimSenderReceiverGetStats(window) {
    if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
      return;
    }

    // shim sender stats.
    if (!('getStats' in window.RTCRtpSender.prototype)) {
      const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      if (origGetSenders) {
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          const senders = origGetSenders.apply(this, []);
          senders.forEach(sender => sender._pc = this);
          return senders;
        };
      }
      const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
      if (origAddTrack) {
        window.RTCPeerConnection.prototype.addTrack = function addTrack() {
          const sender = origAddTrack.apply(this, arguments);
          sender._pc = this;
          return sender;
        };
      }
      window.RTCRtpSender.prototype.getStats = function getStats() {
        const sender = this;
        return this._pc.getStats().then(result =>
        /* Note: this will include stats of all senders that
         *   send a track with the same id as sender.track as
         *   it is not possible to identify the RTCRtpSender.
         */
        filterStats(result, sender.track, true));
      };
    }

    // shim receiver stats.
    if (!('getStats' in window.RTCRtpReceiver.prototype)) {
      const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
      if (origGetReceivers) {
        window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
          const receivers = origGetReceivers.apply(this, []);
          receivers.forEach(receiver => receiver._pc = this);
          return receivers;
        };
      }
      wrapPeerConnectionEvent(window, 'track', e => {
        e.receiver._pc = e.srcElement;
        return e;
      });
      window.RTCRtpReceiver.prototype.getStats = function getStats() {
        const receiver = this;
        return this._pc.getStats().then(result => filterStats(result, receiver.track, false));
      };
    }
    if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
      return;
    }

    // shim RTCPeerConnection.getStats(track).
    const origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
      if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
        const track = arguments[0];
        let sender;
        let receiver;
        let err;
        this.getSenders().forEach(s => {
          if (s.track === track) {
            if (sender) {
              err = true;
            } else {
              sender = s;
            }
          }
        });
        this.getReceivers().forEach(r => {
          if (r.track === track) {
            if (receiver) {
              err = true;
            } else {
              receiver = r;
            }
          }
          return r.track === track;
        });
        if (err || sender && receiver) {
          return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
        } else if (sender) {
          return sender.getStats();
        } else if (receiver) {
          return receiver.getStats();
        }
        return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
      }
      return origGetStats.apply(this, arguments);
    };
  }
  function shimAddTrackRemoveTrackWithNative(window) {
    // shim addTrack/removeTrack with native variants in order to make
    // the interactions with legacy getLocalStreams behave as in other browsers.
    // Keeps a mapping stream.id => [stream, rtpsenders...]
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      return Object.keys(this._shimmedLocalStreams).map(streamId => this._shimmedLocalStreams[streamId][0]);
    };
    const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
      if (!stream) {
        return origAddTrack.apply(this, arguments);
      }
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      const sender = origAddTrack.apply(this, arguments);
      if (!this._shimmedLocalStreams[stream.id]) {
        this._shimmedLocalStreams[stream.id] = [stream, sender];
      } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
        this._shimmedLocalStreams[stream.id].push(sender);
      }
      return sender;
    };
    const origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      stream.getTracks().forEach(track => {
        const alreadyExists = this.getSenders().find(s => s.track === track);
        if (alreadyExists) {
          throw new DOMException('Track already exists.', 'InvalidAccessError');
        }
      });
      const existingSenders = this.getSenders();
      origAddStream.apply(this, arguments);
      const newSenders = this.getSenders().filter(newSender => existingSenders.indexOf(newSender) === -1);
      this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
    };
    const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      delete this._shimmedLocalStreams[stream.id];
      return origRemoveStream.apply(this, arguments);
    };
    const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      if (sender) {
        Object.keys(this._shimmedLocalStreams).forEach(streamId => {
          const idx = this._shimmedLocalStreams[streamId].indexOf(sender);
          if (idx !== -1) {
            this._shimmedLocalStreams[streamId].splice(idx, 1);
          }
          if (this._shimmedLocalStreams[streamId].length === 1) {
            delete this._shimmedLocalStreams[streamId];
          }
        });
      }
      return origRemoveTrack.apply(this, arguments);
    };
  }
  function shimAddTrackRemoveTrack(window, browserDetails) {
    if (!window.RTCPeerConnection) {
      return;
    }
    // shim addTrack and removeTrack.
    if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
      return shimAddTrackRemoveTrackWithNative(window);
    }

    // also shim pc.getLocalStreams when addTrack is shimmed
    // to return the original streams.
    const origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
      const nativeStreams = origGetLocalStreams.apply(this);
      this._reverseStreams = this._reverseStreams || {};
      return nativeStreams.map(stream => this._reverseStreams[stream.id]);
    };
    const origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};
      stream.getTracks().forEach(track => {
        const alreadyExists = this.getSenders().find(s => s.track === track);
        if (alreadyExists) {
          throw new DOMException('Track already exists.', 'InvalidAccessError');
        }
      });
      // Add identity mapping for consistency with addTrack.
      // Unless this is being used with a stream from addTrack.
      if (!this._reverseStreams[stream.id]) {
        const newStream = new window.MediaStream(stream.getTracks());
        this._streams[stream.id] = newStream;
        this._reverseStreams[newStream.id] = stream;
        stream = newStream;
      }
      origAddStream.apply(this, [stream]);
    };
    const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};
      origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
      delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
      delete this._streams[stream.id];
    };
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
      if (this.signalingState === 'closed') {
        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
      }
      const streams = [].slice.call(arguments, 1);
      if (streams.length !== 1 || !streams[0].getTracks().find(t => t === track)) {
        // this is not fully correct but all we can manage without
        // [[associated MediaStreams]] internal slot.
        throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
      }
      const alreadyExists = this.getSenders().find(s => s.track === track);
      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }
      this._streams = this._streams || {};
      this._reverseStreams = this._reverseStreams || {};
      const oldStream = this._streams[stream.id];
      if (oldStream) {
        // this is using odd Chrome behaviour, use with caution:
        // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
        // Note: we rely on the high-level addTrack/dtmf shim to
        // create the sender with a dtmf sender.
        oldStream.addTrack(track);

        // Trigger ONN async.
        Promise.resolve().then(() => {
          this.dispatchEvent(new Event('negotiationneeded'));
        });
      } else {
        const newStream = new window.MediaStream([track]);
        this._streams[stream.id] = newStream;
        this._reverseStreams[newStream.id] = stream;
        this.addStream(newStream);
      }
      return this.getSenders().find(s => s.track === track);
    };

    // replace the internal stream id with the external one and
    // vice versa.
    function replaceInternalStreamId(pc, description) {
      let sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(internalId => {
        const externalStream = pc._reverseStreams[internalId];
        const internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp
      });
    }
    function replaceExternalStreamId(pc, description) {
      let sdp = description.sdp;
      Object.keys(pc._reverseStreams || []).forEach(internalId => {
        const externalStream = pc._reverseStreams[internalId];
        const internalStream = pc._streams[externalStream.id];
        sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
      });
      return new RTCSessionDescription({
        type: description.type,
        sdp
      });
    }
    ['createOffer', 'createAnswer'].forEach(function (method) {
      const nativeMethod = window.RTCPeerConnection.prototype[method];
      const methodObj = {
        [method]() {
          const args = arguments;
          const isLegacyCall = arguments.length && typeof arguments[0] === 'function';
          if (isLegacyCall) {
            return nativeMethod.apply(this, [description => {
              const desc = replaceInternalStreamId(this, description);
              args[0].apply(null, [desc]);
            }, err => {
              if (args[1]) {
                args[1].apply(null, err);
              }
            }, arguments[2]]);
          }
          return nativeMethod.apply(this, arguments).then(description => replaceInternalStreamId(this, description));
        }
      };
      window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
    const origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
      if (!arguments.length || !arguments[0].type) {
        return origSetLocalDescription.apply(this, arguments);
      }
      arguments[0] = replaceExternalStreamId(this, arguments[0]);
      return origSetLocalDescription.apply(this, arguments);
    };

    // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

    const origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
    Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
      get() {
        const description = origLocalDescription.get.apply(this);
        if (description.type === '') {
          return description;
        }
        return replaceInternalStreamId(this, description);
      }
    });
    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
      if (this.signalingState === 'closed') {
        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
      }
      // We can not yet check for sender instanceof RTCRtpSender
      // since we shim RTPSender. So we check if sender._pc is set.
      if (!sender._pc) {
        throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
      }
      const isLocal = sender._pc === this;
      if (!isLocal) {
        throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
      }

      // Search for the native stream the senders track belongs to.
      this._streams = this._streams || {};
      let stream;
      Object.keys(this._streams).forEach(streamid => {
        const hasTrack = this._streams[streamid].getTracks().find(track => sender.track === track);
        if (hasTrack) {
          stream = this._streams[streamid];
        }
      });
      if (stream) {
        if (stream.getTracks().length === 1) {
          // if this is the last track of the stream, remove the stream. This
          // takes care of any shimmed _senders.
          this.removeStream(this._reverseStreams[stream.id]);
        } else {
          // relying on the same odd chrome behaviour as above.
          stream.removeTrack(sender.track);
        }
        this.dispatchEvent(new Event('negotiationneeded'));
      }
    };
  }
  function shimPeerConnection$1(window, browserDetails) {
    if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
      // very basic support for old versions.
      window.RTCPeerConnection = window.webkitRTCPeerConnection;
    }
    if (!window.RTCPeerConnection) {
      return;
    }

    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
    if (browserDetails.version < 53) {
      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {
          [method]() {
            arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
            return nativeMethod.apply(this, arguments);
          }
        };
        window.RTCPeerConnection.prototype[method] = methodObj[method];
      });
    }
  }

  // Attempt to fix ONN in plan-b mode.
  function fixNegotiationNeeded(window, browserDetails) {
    wrapPeerConnectionEvent(window, 'negotiationneeded', e => {
      const pc = e.target;
      if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === 'plan-b') {
        if (pc.signalingState !== 'stable') {
          return;
        }
      }
      return e;
    });
  }

  var chromeShim = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fixNegotiationNeeded: fixNegotiationNeeded,
    shimAddTrackRemoveTrack: shimAddTrackRemoveTrack,
    shimAddTrackRemoveTrackWithNative: shimAddTrackRemoveTrackWithNative,
    shimGetDisplayMedia: shimGetDisplayMedia$1,
    shimGetSendersWithDtmf: shimGetSendersWithDtmf,
    shimGetStats: shimGetStats,
    shimGetUserMedia: shimGetUserMedia$2,
    shimMediaStream: shimMediaStream,
    shimOnTrack: shimOnTrack$1,
    shimPeerConnection: shimPeerConnection$1,
    shimSenderReceiverGetStats: shimSenderReceiverGetStats
  });

  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  function shimGetUserMedia$1(window, browserDetails) {
    const navigator = window && window.navigator;
    const MediaStreamTrack = window && window.MediaStreamTrack;
    navigator.getUserMedia = function (constraints, onSuccess, onError) {
      // Replace Firefox 44+'s deprecation warning with unprefixed version.
      deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    };
    if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
      const remap = function (obj, a, b) {
        if (a in obj && !(b in obj)) {
          obj[b] = obj[a];
          delete obj[a];
        }
      };
      const nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = function (c) {
        if (typeof c === 'object' && typeof c.audio === 'object') {
          c = JSON.parse(JSON.stringify(c));
          remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
          remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
        }
        return nativeGetUserMedia(c);
      };
      if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
        const nativeGetSettings = MediaStreamTrack.prototype.getSettings;
        MediaStreamTrack.prototype.getSettings = function () {
          const obj = nativeGetSettings.apply(this, arguments);
          remap(obj, 'mozAutoGainControl', 'autoGainControl');
          remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
          return obj;
        };
      }
      if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
        const nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
        MediaStreamTrack.prototype.applyConstraints = function (c) {
          if (this.kind === 'audio' && typeof c === 'object') {
            c = JSON.parse(JSON.stringify(c));
            remap(c, 'autoGainControl', 'mozAutoGainControl');
            remap(c, 'noiseSuppression', 'mozNoiseSuppression');
          }
          return nativeApplyConstraints.apply(this, [c]);
        };
      }
    }
  }

  /*
   *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */

  function shimGetDisplayMedia(window, preferredMediaSource) {
    if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
      return;
    }
    if (!window.navigator.mediaDevices) {
      return;
    }
    window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
      if (!(constraints && constraints.video)) {
        const err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
        err.name = 'NotFoundError';
        // from https://heycam.github.io/webidl/#idl-DOMException-error-names
        err.code = 8;
        return Promise.reject(err);
      }
      if (constraints.video === true) {
        constraints.video = {
          mediaSource: preferredMediaSource
        };
      } else {
        constraints.video.mediaSource = preferredMediaSource;
      }
      return window.navigator.mediaDevices.getUserMedia(constraints);
    };
  }

  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  function shimOnTrack(window) {
    if (typeof window === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get() {
          return {
            receiver: this.receiver
          };
        }
      });
    }
  }
  function shimPeerConnection(window, browserDetails) {
    if (typeof window !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
      return; // probably media.peerconnection.enabled=false in about:config
    }

    if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
      // very basic support for old versions.
      window.RTCPeerConnection = window.mozRTCPeerConnection;
    }
    if (browserDetails.version < 53) {
      // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {
          [method]() {
            arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
            return nativeMethod.apply(this, arguments);
          }
        };
        window.RTCPeerConnection.prototype[method] = methodObj[method];
      });
    }
    const modernStatsTypes = {
      inboundrtp: 'inbound-rtp',
      outboundrtp: 'outbound-rtp',
      candidatepair: 'candidate-pair',
      localcandidate: 'local-candidate',
      remotecandidate: 'remote-candidate'
    };
    const nativeGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
      const [selector, onSucc, onErr] = arguments;
      return nativeGetStats.apply(this, [selector || null]).then(stats => {
        if (browserDetails.version < 53 && !onSucc) {
          // Shim only promise getStats with spec-hyphens in type names
          // Leave callback version alone; misc old uses of forEach before Map
          try {
            stats.forEach(stat => {
              stat.type = modernStatsTypes[stat.type] || stat.type;
            });
          } catch (e) {
            if (e.name !== 'TypeError') {
              throw e;
            }
            // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
            stats.forEach((stat, i) => {
              stats.set(i, Object.assign({}, stat, {
                type: modernStatsTypes[stat.type] || stat.type
              }));
            });
          }
        }
        return stats;
      }).then(onSucc, onErr);
    };
  }
  function shimSenderGetStats(window) {
    if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
      return;
    }
    if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
      return;
    }
    const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    if (origGetSenders) {
      window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        const senders = origGetSenders.apply(this, []);
        senders.forEach(sender => sender._pc = this);
        return senders;
      };
    }
    const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    if (origAddTrack) {
      window.RTCPeerConnection.prototype.addTrack = function addTrack() {
        const sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
      };
    }
    window.RTCRtpSender.prototype.getStats = function getStats() {
      return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
    };
  }
  function shimReceiverGetStats(window) {
    if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
      return;
    }
    if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
      return;
    }
    const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
    if (origGetReceivers) {
      window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
        const receivers = origGetReceivers.apply(this, []);
        receivers.forEach(receiver => receiver._pc = this);
        return receivers;
      };
    }
    wrapPeerConnectionEvent(window, 'track', e => {
      e.receiver._pc = e.srcElement;
      return e;
    });
    window.RTCRtpReceiver.prototype.getStats = function getStats() {
      return this._pc.getStats(this.track);
    };
  }
  function shimRemoveStream(window) {
    if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
      return;
    }
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      deprecated('removeStream', 'removeTrack');
      this.getSenders().forEach(sender => {
        if (sender.track && stream.getTracks().includes(sender.track)) {
          this.removeTrack(sender);
        }
      });
    };
  }
  function shimRTCDataChannel(window) {
    // rename DataChannel to RTCDataChannel (native fix in FF60):
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
    if (window.DataChannel && !window.RTCDataChannel) {
      window.RTCDataChannel = window.DataChannel;
    }
  }
  function shimAddTransceiver(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === 'object' && window.RTCPeerConnection)) {
      return;
    }
    const origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
    if (origAddTransceiver) {
      window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
        this.setParametersPromises = [];
        // WebIDL input coercion and validation
        let sendEncodings = arguments[1] && arguments[1].sendEncodings;
        if (sendEncodings === undefined) {
          sendEncodings = [];
        }
        sendEncodings = [...sendEncodings];
        const shouldPerformCheck = sendEncodings.length > 0;
        if (shouldPerformCheck) {
          // If sendEncodings params are provided, validate grammar
          sendEncodings.forEach(encodingParam => {
            if ('rid' in encodingParam) {
              const ridRegex = /^[a-z0-9]{0,16}$/i;
              if (!ridRegex.test(encodingParam.rid)) {
                throw new TypeError('Invalid RID value provided.');
              }
            }
            if ('scaleResolutionDownBy' in encodingParam) {
              if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
                throw new RangeError('scale_resolution_down_by must be >= 1.0');
              }
            }
            if ('maxFramerate' in encodingParam) {
              if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
                throw new RangeError('max_framerate must be >= 0.0');
              }
            }
          });
        }
        const transceiver = origAddTransceiver.apply(this, arguments);
        if (shouldPerformCheck) {
          // Check if the init options were applied. If not we do this in an
          // asynchronous way and save the promise reference in a global object.
          // This is an ugly hack, but at the same time is way more robust than
          // checking the sender parameters before and after the createOffer
          // Also note that after the createoffer we are not 100% sure that
          // the params were asynchronously applied so we might miss the
          // opportunity to recreate offer.
          const {
            sender
          } = transceiver;
          const params = sender.getParameters();
          if (!('encodings' in params) ||
          // Avoid being fooled by patched getParameters() below.
          params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
            params.encodings = sendEncodings;
            sender.sendEncodings = sendEncodings;
            this.setParametersPromises.push(sender.setParameters(params).then(() => {
              delete sender.sendEncodings;
            }).catch(() => {
              delete sender.sendEncodings;
            }));
          }
        }
        return transceiver;
      };
    }
  }
  function shimGetParameters(window) {
    if (!(typeof window === 'object' && window.RTCRtpSender)) {
      return;
    }
    const origGetParameters = window.RTCRtpSender.prototype.getParameters;
    if (origGetParameters) {
      window.RTCRtpSender.prototype.getParameters = function getParameters() {
        const params = origGetParameters.apply(this, arguments);
        if (!('encodings' in params)) {
          params.encodings = [].concat(this.sendEncodings || [{}]);
        }
        return params;
      };
    }
  }
  function shimCreateOffer(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === 'object' && window.RTCPeerConnection)) {
      return;
    }
    const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer() {
      if (this.setParametersPromises && this.setParametersPromises.length) {
        return Promise.all(this.setParametersPromises).then(() => {
          return origCreateOffer.apply(this, arguments);
        }).finally(() => {
          this.setParametersPromises = [];
        });
      }
      return origCreateOffer.apply(this, arguments);
    };
  }
  function shimCreateAnswer(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === 'object' && window.RTCPeerConnection)) {
      return;
    }
    const origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
    window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
      if (this.setParametersPromises && this.setParametersPromises.length) {
        return Promise.all(this.setParametersPromises).then(() => {
          return origCreateAnswer.apply(this, arguments);
        }).finally(() => {
          this.setParametersPromises = [];
        });
      }
      return origCreateAnswer.apply(this, arguments);
    };
  }

  var firefoxShim = /*#__PURE__*/Object.freeze({
    __proto__: null,
    shimAddTransceiver: shimAddTransceiver,
    shimCreateAnswer: shimCreateAnswer,
    shimCreateOffer: shimCreateOffer,
    shimGetDisplayMedia: shimGetDisplayMedia,
    shimGetParameters: shimGetParameters,
    shimGetUserMedia: shimGetUserMedia$1,
    shimOnTrack: shimOnTrack,
    shimPeerConnection: shimPeerConnection,
    shimRTCDataChannel: shimRTCDataChannel,
    shimReceiverGetStats: shimReceiverGetStats,
    shimRemoveStream: shimRemoveStream,
    shimSenderGetStats: shimSenderGetStats
  });

  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  function shimLocalStreamsAPI(window) {
    if (typeof window !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        return this._localStreams;
      };
    }
    if (!('addStream' in window.RTCPeerConnection.prototype)) {
      const _addTrack = window.RTCPeerConnection.prototype.addTrack;
      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        if (!this._localStreams.includes(stream)) {
          this._localStreams.push(stream);
        }
        // Try to emulate Chrome's behaviour of adding in audio-video order.
        // Safari orders by track id.
        stream.getAudioTracks().forEach(track => _addTrack.call(this, track, stream));
        stream.getVideoTracks().forEach(track => _addTrack.call(this, track, stream));
      };
      window.RTCPeerConnection.prototype.addTrack = function addTrack(track, ...streams) {
        if (streams) {
          streams.forEach(stream => {
            if (!this._localStreams) {
              this._localStreams = [stream];
            } else if (!this._localStreams.includes(stream)) {
              this._localStreams.push(stream);
            }
          });
        }
        return _addTrack.apply(this, arguments);
      };
    }
    if (!('removeStream' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        if (!this._localStreams) {
          this._localStreams = [];
        }
        const index = this._localStreams.indexOf(stream);
        if (index === -1) {
          return;
        }
        this._localStreams.splice(index, 1);
        const tracks = stream.getTracks();
        this.getSenders().forEach(sender => {
          if (tracks.includes(sender.track)) {
            this.removeTrack(sender);
          }
        });
      };
    }
  }
  function shimRemoteStreamsAPI(window) {
    if (typeof window !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
      window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
        return this._remoteStreams ? this._remoteStreams : [];
      };
    }
    if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
        get() {
          return this._onaddstream;
        },
        set(f) {
          if (this._onaddstream) {
            this.removeEventListener('addstream', this._onaddstream);
            this.removeEventListener('track', this._onaddstreampoly);
          }
          this.addEventListener('addstream', this._onaddstream = f);
          this.addEventListener('track', this._onaddstreampoly = e => {
            e.streams.forEach(stream => {
              if (!this._remoteStreams) {
                this._remoteStreams = [];
              }
              if (this._remoteStreams.includes(stream)) {
                return;
              }
              this._remoteStreams.push(stream);
              const event = new Event('addstream');
              event.stream = stream;
              this.dispatchEvent(event);
            });
          });
        }
      });
      const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        const pc = this;
        if (!this._onaddstreampoly) {
          this.addEventListener('track', this._onaddstreampoly = function (e) {
            e.streams.forEach(stream => {
              if (!pc._remoteStreams) {
                pc._remoteStreams = [];
              }
              if (pc._remoteStreams.indexOf(stream) >= 0) {
                return;
              }
              pc._remoteStreams.push(stream);
              const event = new Event('addstream');
              event.stream = stream;
              pc.dispatchEvent(event);
            });
          });
        }
        return origSetRemoteDescription.apply(pc, arguments);
      };
    }
  }
  function shimCallbacksAPI(window) {
    if (typeof window !== 'object' || !window.RTCPeerConnection) {
      return;
    }
    const prototype = window.RTCPeerConnection.prototype;
    const origCreateOffer = prototype.createOffer;
    const origCreateAnswer = prototype.createAnswer;
    const setLocalDescription = prototype.setLocalDescription;
    const setRemoteDescription = prototype.setRemoteDescription;
    const addIceCandidate = prototype.addIceCandidate;
    prototype.createOffer = function createOffer(successCallback, failureCallback) {
      const options = arguments.length >= 2 ? arguments[2] : arguments[0];
      const promise = origCreateOffer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
      const options = arguments.length >= 2 ? arguments[2] : arguments[0];
      const promise = origCreateAnswer.apply(this, [options]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    let withCallback = function (description, successCallback, failureCallback) {
      const promise = setLocalDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setLocalDescription = withCallback;
    withCallback = function (description, successCallback, failureCallback) {
      const promise = setRemoteDescription.apply(this, [description]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.setRemoteDescription = withCallback;
    withCallback = function (candidate, successCallback, failureCallback) {
      const promise = addIceCandidate.apply(this, [candidate]);
      if (!failureCallback) {
        return promise;
      }
      promise.then(successCallback, failureCallback);
      return Promise.resolve();
    };
    prototype.addIceCandidate = withCallback;
  }
  function shimGetUserMedia(window) {
    const navigator = window && window.navigator;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // shim not needed in Safari 12.1
      const mediaDevices = navigator.mediaDevices;
      const _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
      navigator.mediaDevices.getUserMedia = constraints => {
        return _getUserMedia(shimConstraints(constraints));
      };
    }
    if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
        navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
      }.bind(navigator);
    }
  }
  function shimConstraints(constraints) {
    if (constraints && constraints.video !== undefined) {
      return Object.assign({}, constraints, {
        video: compactObject(constraints.video)
      });
    }
    return constraints;
  }
  function shimRTCIceServerUrls(window) {
    if (!window.RTCPeerConnection) {
      return;
    }
    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
    const OrigPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
      if (pcConfig && pcConfig.iceServers) {
        const newIceServers = [];
        for (let i = 0; i < pcConfig.iceServers.length; i++) {
          let server = pcConfig.iceServers[i];
          if (server.urls === undefined && server.url) {
            deprecated('RTCIceServer.url', 'RTCIceServer.urls');
            server = JSON.parse(JSON.stringify(server));
            server.urls = server.url;
            delete server.url;
            newIceServers.push(server);
          } else {
            newIceServers.push(pcConfig.iceServers[i]);
          }
        }
        pcConfig.iceServers = newIceServers;
      }
      return new OrigPeerConnection(pcConfig, pcConstraints);
    };
    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
    // wrap static methods. Currently just generateCertificate.
    if ('generateCertificate' in OrigPeerConnection) {
      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
        get() {
          return OrigPeerConnection.generateCertificate;
        }
      });
    }
  }
  function shimTrackEventTransceiver(window) {
    // Add event.transceiver member over deprecated event.receiver
    if (typeof window === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
      Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
        get() {
          return {
            receiver: this.receiver
          };
        }
      });
    }
  }
  function shimCreateOfferLegacy(window) {
    const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
      if (offerOptions) {
        if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
          // support bit values
          offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
        }
        const audioTransceiver = this.getTransceivers().find(transceiver => transceiver.receiver.track.kind === 'audio');
        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
          if (audioTransceiver.direction === 'sendrecv') {
            if (audioTransceiver.setDirection) {
              audioTransceiver.setDirection('sendonly');
            } else {
              audioTransceiver.direction = 'sendonly';
            }
          } else if (audioTransceiver.direction === 'recvonly') {
            if (audioTransceiver.setDirection) {
              audioTransceiver.setDirection('inactive');
            } else {
              audioTransceiver.direction = 'inactive';
            }
          }
        } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
          this.addTransceiver('audio', {
            direction: 'recvonly'
          });
        }
        if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
          // support bit values
          offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
        }
        const videoTransceiver = this.getTransceivers().find(transceiver => transceiver.receiver.track.kind === 'video');
        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
          if (videoTransceiver.direction === 'sendrecv') {
            if (videoTransceiver.setDirection) {
              videoTransceiver.setDirection('sendonly');
            } else {
              videoTransceiver.direction = 'sendonly';
            }
          } else if (videoTransceiver.direction === 'recvonly') {
            if (videoTransceiver.setDirection) {
              videoTransceiver.setDirection('inactive');
            } else {
              videoTransceiver.direction = 'inactive';
            }
          }
        } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
          this.addTransceiver('video', {
            direction: 'recvonly'
          });
        }
      }
      return origCreateOffer.apply(this, arguments);
    };
  }
  function shimAudioContext(window) {
    if (typeof window !== 'object' || window.AudioContext) {
      return;
    }
    window.AudioContext = window.webkitAudioContext;
  }

  var safariShim = /*#__PURE__*/Object.freeze({
    __proto__: null,
    shimAudioContext: shimAudioContext,
    shimCallbacksAPI: shimCallbacksAPI,
    shimConstraints: shimConstraints,
    shimCreateOfferLegacy: shimCreateOfferLegacy,
    shimGetUserMedia: shimGetUserMedia,
    shimLocalStreamsAPI: shimLocalStreamsAPI,
    shimRTCIceServerUrls: shimRTCIceServerUrls,
    shimRemoteStreamsAPI: shimRemoteStreamsAPI,
    shimTrackEventTransceiver: shimTrackEventTransceiver
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var sdp$1 = {exports: {}};

  /* eslint-env node */
  (function (module) {

    // SDP helpers.
    const SDPUtils = {};

    // Generate an alphanumeric identifier for cname or mids.
    // TODO: use UUIDs instead? https://gist.github.com/jed/982883
    SDPUtils.generateIdentifier = function () {
      return Math.random().toString(36).substring(2, 12);
    };

    // The RTCP CNAME used by all peerconnections from the same JS.
    SDPUtils.localCName = SDPUtils.generateIdentifier();

    // Splits SDP into lines, dealing with both CRLF and LF.
    SDPUtils.splitLines = function (blob) {
      return blob.trim().split('\n').map(line => line.trim());
    };
    // Splits SDP into sessionpart and mediasections. Ensures CRLF.
    SDPUtils.splitSections = function (blob) {
      const parts = blob.split('\nm=');
      return parts.map((part, index) => (index > 0 ? 'm=' + part : part).trim() + '\r\n');
    };

    // Returns the session description.
    SDPUtils.getDescription = function (blob) {
      const sections = SDPUtils.splitSections(blob);
      return sections && sections[0];
    };

    // Returns the individual media sections.
    SDPUtils.getMediaSections = function (blob) {
      const sections = SDPUtils.splitSections(blob);
      sections.shift();
      return sections;
    };

    // Returns lines that start with a certain prefix.
    SDPUtils.matchPrefix = function (blob, prefix) {
      return SDPUtils.splitLines(blob).filter(line => line.indexOf(prefix) === 0);
    };

    // Parses an ICE candidate line. Sample input:
    // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
    // rport 55996"
    // Input can be prefixed with a=.
    SDPUtils.parseCandidate = function (line) {
      let parts;
      // Parse both variants.
      if (line.indexOf('a=candidate:') === 0) {
        parts = line.substring(12).split(' ');
      } else {
        parts = line.substring(10).split(' ');
      }
      const candidate = {
        foundation: parts[0],
        component: {
          1: 'rtp',
          2: 'rtcp'
        }[parts[1]] || parts[1],
        protocol: parts[2].toLowerCase(),
        priority: parseInt(parts[3], 10),
        ip: parts[4],
        address: parts[4],
        // address is an alias for ip.
        port: parseInt(parts[5], 10),
        // skip parts[6] == 'typ'
        type: parts[7]
      };
      for (let i = 8; i < parts.length; i += 2) {
        switch (parts[i]) {
          case 'raddr':
            candidate.relatedAddress = parts[i + 1];
            break;
          case 'rport':
            candidate.relatedPort = parseInt(parts[i + 1], 10);
            break;
          case 'tcptype':
            candidate.tcpType = parts[i + 1];
            break;
          case 'ufrag':
            candidate.ufrag = parts[i + 1]; // for backward compatibility.
            candidate.usernameFragment = parts[i + 1];
            break;
          default:
            // extension handling, in particular ufrag. Don't overwrite.
            if (candidate[parts[i]] === undefined) {
              candidate[parts[i]] = parts[i + 1];
            }
            break;
        }
      }
      return candidate;
    };

    // Translates a candidate object into SDP candidate attribute.
    // This does not include the a= prefix!
    SDPUtils.writeCandidate = function (candidate) {
      const sdp = [];
      sdp.push(candidate.foundation);
      const component = candidate.component;
      if (component === 'rtp') {
        sdp.push(1);
      } else if (component === 'rtcp') {
        sdp.push(2);
      } else {
        sdp.push(component);
      }
      sdp.push(candidate.protocol.toUpperCase());
      sdp.push(candidate.priority);
      sdp.push(candidate.address || candidate.ip);
      sdp.push(candidate.port);
      const type = candidate.type;
      sdp.push('typ');
      sdp.push(type);
      if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
        sdp.push('raddr');
        sdp.push(candidate.relatedAddress);
        sdp.push('rport');
        sdp.push(candidate.relatedPort);
      }
      if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
        sdp.push('tcptype');
        sdp.push(candidate.tcpType);
      }
      if (candidate.usernameFragment || candidate.ufrag) {
        sdp.push('ufrag');
        sdp.push(candidate.usernameFragment || candidate.ufrag);
      }
      return 'candidate:' + sdp.join(' ');
    };

    // Parses an ice-options line, returns an array of option tags.
    // Sample input:
    // a=ice-options:foo bar
    SDPUtils.parseIceOptions = function (line) {
      return line.substring(14).split(' ');
    };

    // Parses a rtpmap line, returns RTCRtpCoddecParameters. Sample input:
    // a=rtpmap:111 opus/48000/2
    SDPUtils.parseRtpMap = function (line) {
      let parts = line.substring(9).split(' ');
      const parsed = {
        payloadType: parseInt(parts.shift(), 10) // was: id
      };

      parts = parts[0].split('/');
      parsed.name = parts[0];
      parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
      parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
      // legacy alias, got renamed back to channels in ORTC.
      parsed.numChannels = parsed.channels;
      return parsed;
    };

    // Generates a rtpmap line from RTCRtpCodecCapability or
    // RTCRtpCodecParameters.
    SDPUtils.writeRtpMap = function (codec) {
      let pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      const channels = codec.channels || codec.numChannels || 1;
      return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
    };

    // Parses a extmap line (headerextension from RFC 5285). Sample input:
    // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
    // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
    SDPUtils.parseExtmap = function (line) {
      const parts = line.substring(9).split(' ');
      return {
        id: parseInt(parts[0], 10),
        direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
        uri: parts[1],
        attributes: parts.slice(2).join(' ')
      };
    };

    // Generates an extmap line from RTCRtpHeaderExtensionParameters or
    // RTCRtpHeaderExtension.
    SDPUtils.writeExtmap = function (headerExtension) {
      return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + (headerExtension.attributes ? ' ' + headerExtension.attributes : '') + '\r\n';
    };

    // Parses a fmtp line, returns dictionary. Sample input:
    // a=fmtp:96 vbr=on;cng=on
    // Also deals with vbr=on; cng=on
    SDPUtils.parseFmtp = function (line) {
      const parsed = {};
      let kv;
      const parts = line.substring(line.indexOf(' ') + 1).split(';');
      for (let j = 0; j < parts.length; j++) {
        kv = parts[j].trim().split('=');
        parsed[kv[0].trim()] = kv[1];
      }
      return parsed;
    };

    // Generates a fmtp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
    SDPUtils.writeFmtp = function (codec) {
      let line = '';
      let pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      if (codec.parameters && Object.keys(codec.parameters).length) {
        const params = [];
        Object.keys(codec.parameters).forEach(param => {
          if (codec.parameters[param] !== undefined) {
            params.push(param + '=' + codec.parameters[param]);
          } else {
            params.push(param);
          }
        });
        line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
      }
      return line;
    };

    // Parses a rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
    // a=rtcp-fb:98 nack rpsi
    SDPUtils.parseRtcpFb = function (line) {
      const parts = line.substring(line.indexOf(' ') + 1).split(' ');
      return {
        type: parts.shift(),
        parameter: parts.join(' ')
      };
    };

    // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
    SDPUtils.writeRtcpFb = function (codec) {
      let lines = '';
      let pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
        // FIXME: special handling for trr-int?
        codec.rtcpFeedback.forEach(fb => {
          lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
        });
      }
      return lines;
    };

    // Parses a RFC 5576 ssrc media attribute. Sample input:
    // a=ssrc:3735928559 cname:something
    SDPUtils.parseSsrcMedia = function (line) {
      const sp = line.indexOf(' ');
      const parts = {
        ssrc: parseInt(line.substring(7, sp), 10)
      };
      const colon = line.indexOf(':', sp);
      if (colon > -1) {
        parts.attribute = line.substring(sp + 1, colon);
        parts.value = line.substring(colon + 1);
      } else {
        parts.attribute = line.substring(sp + 1);
      }
      return parts;
    };

    // Parse a ssrc-group line (see RFC 5576). Sample input:
    // a=ssrc-group:semantics 12 34
    SDPUtils.parseSsrcGroup = function (line) {
      const parts = line.substring(13).split(' ');
      return {
        semantics: parts.shift(),
        ssrcs: parts.map(ssrc => parseInt(ssrc, 10))
      };
    };

    // Extracts the MID (RFC 5888) from a media section.
    // Returns the MID or undefined if no mid line was found.
    SDPUtils.getMid = function (mediaSection) {
      const mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
      if (mid) {
        return mid.substring(6);
      }
    };

    // Parses a fingerprint line for DTLS-SRTP.
    SDPUtils.parseFingerprint = function (line) {
      const parts = line.substring(14).split(' ');
      return {
        algorithm: parts[0].toLowerCase(),
        // algorithm is case-sensitive in Edge.
        value: parts[1].toUpperCase() // the definition is upper-case in RFC 4572.
      };
    };

    // Extracts DTLS parameters from SDP media section or sessionpart.
    // FIXME: for consistency with other functions this should only
    //   get the fingerprint line as input. See also getIceParameters.
    SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
      const lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
      // Note: a=setup line is ignored since we use the 'auto' role in Edge.
      return {
        role: 'auto',
        fingerprints: lines.map(SDPUtils.parseFingerprint)
      };
    };

    // Serializes DTLS parameters to SDP.
    SDPUtils.writeDtlsParameters = function (params, setupType) {
      let sdp = 'a=setup:' + setupType + '\r\n';
      params.fingerprints.forEach(fp => {
        sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
      });
      return sdp;
    };

    // Parses a=crypto lines into
    //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
    SDPUtils.parseCryptoLine = function (line) {
      const parts = line.substring(9).split(' ');
      return {
        tag: parseInt(parts[0], 10),
        cryptoSuite: parts[1],
        keyParams: parts[2],
        sessionParams: parts.slice(3)
      };
    };
    SDPUtils.writeCryptoLine = function (parameters) {
      return 'a=crypto:' + parameters.tag + ' ' + parameters.cryptoSuite + ' ' + (typeof parameters.keyParams === 'object' ? SDPUtils.writeCryptoKeyParams(parameters.keyParams) : parameters.keyParams) + (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') + '\r\n';
    };

    // Parses the crypto key parameters into
    //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
    SDPUtils.parseCryptoKeyParams = function (keyParams) {
      if (keyParams.indexOf('inline:') !== 0) {
        return null;
      }
      const parts = keyParams.substring(7).split('|');
      return {
        keyMethod: 'inline',
        keySalt: parts[0],
        lifeTime: parts[1],
        mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
        mkiLength: parts[2] ? parts[2].split(':')[1] : undefined
      };
    };
    SDPUtils.writeCryptoKeyParams = function (keyParams) {
      return keyParams.keyMethod + ':' + keyParams.keySalt + (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') + (keyParams.mkiValue && keyParams.mkiLength ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength : '');
    };

    // Extracts all SDES parameters.
    SDPUtils.getCryptoParameters = function (mediaSection, sessionpart) {
      const lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=crypto:');
      return lines.map(SDPUtils.parseCryptoLine);
    };

    // Parses ICE information from SDP media section or sessionpart.
    // FIXME: for consistency with other functions this should only
    //   get the ice-ufrag and ice-pwd lines as input.
    SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
      const ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-ufrag:')[0];
      const pwd = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-pwd:')[0];
      if (!(ufrag && pwd)) {
        return null;
      }
      return {
        usernameFragment: ufrag.substring(12),
        password: pwd.substring(10)
      };
    };

    // Serializes ICE parameters to SDP.
    SDPUtils.writeIceParameters = function (params) {
      let sdp = 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
      if (params.iceLite) {
        sdp += 'a=ice-lite\r\n';
      }
      return sdp;
    };

    // Parses the SDP media section and returns RTCRtpParameters.
    SDPUtils.parseRtpParameters = function (mediaSection) {
      const description = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: [],
        rtcp: []
      };
      const lines = SDPUtils.splitLines(mediaSection);
      const mline = lines[0].split(' ');
      description.profile = mline[2];
      for (let i = 3; i < mline.length; i++) {
        // find all codecs from mline[3..]
        const pt = mline[i];
        const rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
        if (rtpmapline) {
          const codec = SDPUtils.parseRtpMap(rtpmapline);
          const fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
          // Only the first a=fmtp:<pt> is considered.
          codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
          codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
          description.codecs.push(codec);
          // parse FEC mechanisms from rtpmap lines.
          switch (codec.name.toUpperCase()) {
            case 'RED':
            case 'ULPFEC':
              description.fecMechanisms.push(codec.name.toUpperCase());
              break;
          }
        }
      }
      SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(line => {
        description.headerExtensions.push(SDPUtils.parseExtmap(line));
      });
      const wildcardRtcpFb = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:* ').map(SDPUtils.parseRtcpFb);
      description.codecs.forEach(codec => {
        wildcardRtcpFb.forEach(fb => {
          const duplicate = codec.rtcpFeedback.find(existingFeedback => {
            return existingFeedback.type === fb.type && existingFeedback.parameter === fb.parameter;
          });
          if (!duplicate) {
            codec.rtcpFeedback.push(fb);
          }
        });
      });
      // FIXME: parse rtcp.
      return description;
    };

    // Generates parts of the SDP media section describing the capabilities /
    // parameters.
    SDPUtils.writeRtpDescription = function (kind, caps) {
      let sdp = '';

      // Build the mline.
      sdp += 'm=' + kind + ' ';
      sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
      sdp += ' ' + (caps.profile || 'UDP/TLS/RTP/SAVPF') + ' ';
      sdp += caps.codecs.map(codec => {
        if (codec.preferredPayloadType !== undefined) {
          return codec.preferredPayloadType;
        }
        return codec.payloadType;
      }).join(' ') + '\r\n';
      sdp += 'c=IN IP4 0.0.0.0\r\n';
      sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

      // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
      caps.codecs.forEach(codec => {
        sdp += SDPUtils.writeRtpMap(codec);
        sdp += SDPUtils.writeFmtp(codec);
        sdp += SDPUtils.writeRtcpFb(codec);
      });
      let maxptime = 0;
      caps.codecs.forEach(codec => {
        if (codec.maxptime > maxptime) {
          maxptime = codec.maxptime;
        }
      });
      if (maxptime > 0) {
        sdp += 'a=maxptime:' + maxptime + '\r\n';
      }
      if (caps.headerExtensions) {
        caps.headerExtensions.forEach(extension => {
          sdp += SDPUtils.writeExtmap(extension);
        });
      }
      // FIXME: write fecMechanisms.
      return sdp;
    };

    // Parses the SDP media section and returns an array of
    // RTCRtpEncodingParameters.
    SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
      const encodingParameters = [];
      const description = SDPUtils.parseRtpParameters(mediaSection);
      const hasRed = description.fecMechanisms.indexOf('RED') !== -1;
      const hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

      // filter a=ssrc:... cname:, ignore PlanB-msid
      const ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(line => SDPUtils.parseSsrcMedia(line)).filter(parts => parts.attribute === 'cname');
      const primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
      let secondarySsrc;
      const flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(line => {
        const parts = line.substring(17).split(' ');
        return parts.map(part => parseInt(part, 10));
      });
      if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
        secondarySsrc = flows[0][1];
      }
      description.codecs.forEach(codec => {
        if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
          let encParam = {
            ssrc: primarySsrc,
            codecPayloadType: parseInt(codec.parameters.apt, 10)
          };
          if (primarySsrc && secondarySsrc) {
            encParam.rtx = {
              ssrc: secondarySsrc
            };
          }
          encodingParameters.push(encParam);
          if (hasRed) {
            encParam = JSON.parse(JSON.stringify(encParam));
            encParam.fec = {
              ssrc: primarySsrc,
              mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
            };
            encodingParameters.push(encParam);
          }
        }
      });
      if (encodingParameters.length === 0 && primarySsrc) {
        encodingParameters.push({
          ssrc: primarySsrc
        });
      }

      // we support both b=AS and b=TIAS but interpret AS as TIAS.
      let bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
      if (bandwidth.length) {
        if (bandwidth[0].indexOf('b=TIAS:') === 0) {
          bandwidth = parseInt(bandwidth[0].substring(7), 10);
        } else if (bandwidth[0].indexOf('b=AS:') === 0) {
          // use formula from JSEP to convert b=AS to TIAS value.
          bandwidth = parseInt(bandwidth[0].substring(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
        } else {
          bandwidth = undefined;
        }
        encodingParameters.forEach(params => {
          params.maxBitrate = bandwidth;
        });
      }
      return encodingParameters;
    };

    // parses http://draft.ortc.org/#rtcrtcpparameters*
    SDPUtils.parseRtcpParameters = function (mediaSection) {
      const rtcpParameters = {};

      // Gets the first SSRC. Note that with RTX there might be multiple
      // SSRCs.
      const remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(line => SDPUtils.parseSsrcMedia(line)).filter(obj => obj.attribute === 'cname')[0];
      if (remoteSsrc) {
        rtcpParameters.cname = remoteSsrc.value;
        rtcpParameters.ssrc = remoteSsrc.ssrc;
      }

      // Edge uses the compound attribute instead of reducedSize
      // compound is !reducedSize
      const rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
      rtcpParameters.reducedSize = rsize.length > 0;
      rtcpParameters.compound = rsize.length === 0;

      // parses the rtcp-mux attrіbute.
      // Note that Edge does not support unmuxed RTCP.
      const mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
      rtcpParameters.mux = mux.length > 0;
      return rtcpParameters;
    };
    SDPUtils.writeRtcpParameters = function (rtcpParameters) {
      let sdp = '';
      if (rtcpParameters.reducedSize) {
        sdp += 'a=rtcp-rsize\r\n';
      }
      if (rtcpParameters.mux) {
        sdp += 'a=rtcp-mux\r\n';
      }
      if (rtcpParameters.ssrc !== undefined && rtcpParameters.cname) {
        sdp += 'a=ssrc:' + rtcpParameters.ssrc + ' cname:' + rtcpParameters.cname + '\r\n';
      }
      return sdp;
    };

    // parses either a=msid: or a=ssrc:... msid lines and returns
    // the id of the MediaStream and MediaStreamTrack.
    SDPUtils.parseMsid = function (mediaSection) {
      let parts;
      const spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
      if (spec.length === 1) {
        parts = spec[0].substring(7).split(' ');
        return {
          stream: parts[0],
          track: parts[1]
        };
      }
      const planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(line => SDPUtils.parseSsrcMedia(line)).filter(msidParts => msidParts.attribute === 'msid');
      if (planB.length > 0) {
        parts = planB[0].value.split(' ');
        return {
          stream: parts[0],
          track: parts[1]
        };
      }
    };

    // SCTP
    // parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
    // to draft-ietf-mmusic-sctp-sdp-05
    SDPUtils.parseSctpDescription = function (mediaSection) {
      const mline = SDPUtils.parseMLine(mediaSection);
      const maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
      let maxMessageSize;
      if (maxSizeLine.length > 0) {
        maxMessageSize = parseInt(maxSizeLine[0].substring(19), 10);
      }
      if (isNaN(maxMessageSize)) {
        maxMessageSize = 65536;
      }
      const sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
      if (sctpPort.length > 0) {
        return {
          port: parseInt(sctpPort[0].substring(12), 10),
          protocol: mline.fmt,
          maxMessageSize
        };
      }
      const sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
      if (sctpMapLines.length > 0) {
        const parts = sctpMapLines[0].substring(10).split(' ');
        return {
          port: parseInt(parts[0], 10),
          protocol: parts[1],
          maxMessageSize
        };
      }
    };

    // SCTP
    // outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
    // support by now receiving in this format, unless we originally parsed
    // as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
    // protocol of DTLS/SCTP -- without UDP/ or TCP/)
    SDPUtils.writeSctpDescription = function (media, sctp) {
      let output = [];
      if (media.protocol !== 'DTLS/SCTP') {
        output = ['m=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n', 'c=IN IP4 0.0.0.0\r\n', 'a=sctp-port:' + sctp.port + '\r\n'];
      } else {
        output = ['m=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n', 'c=IN IP4 0.0.0.0\r\n', 'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'];
      }
      if (sctp.maxMessageSize !== undefined) {
        output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
      }
      return output.join('');
    };

    // Generate a session ID for SDP.
    // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
    // recommends using a cryptographically random +ve 64-bit value
    // but right now this should be acceptable and within the right range
    SDPUtils.generateSessionId = function () {
      return Math.random().toString().substr(2, 22);
    };

    // Write boiler plate for start of SDP
    // sessId argument is optional - if not supplied it will
    // be generated randomly
    // sessVersion is optional and defaults to 2
    // sessUser is optional and defaults to 'thisisadapterortc'
    SDPUtils.writeSessionBoilerplate = function (sessId, sessVer, sessUser) {
      let sessionId;
      const version = sessVer !== undefined ? sessVer : 2;
      if (sessId) {
        sessionId = sessId;
      } else {
        sessionId = SDPUtils.generateSessionId();
      }
      const user = sessUser || 'thisisadapterortc';
      // FIXME: sess-id should be an NTP timestamp.
      return 'v=0\r\n' + 'o=' + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
    };

    // Gets the direction from the mediaSection or the sessionpart.
    SDPUtils.getDirection = function (mediaSection, sessionpart) {
      // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
      const lines = SDPUtils.splitLines(mediaSection);
      for (let i = 0; i < lines.length; i++) {
        switch (lines[i]) {
          case 'a=sendrecv':
          case 'a=sendonly':
          case 'a=recvonly':
          case 'a=inactive':
            return lines[i].substring(2);
          // FIXME: What should happen here?
        }
      }

      if (sessionpart) {
        return SDPUtils.getDirection(sessionpart);
      }
      return 'sendrecv';
    };
    SDPUtils.getKind = function (mediaSection) {
      const lines = SDPUtils.splitLines(mediaSection);
      const mline = lines[0].split(' ');
      return mline[0].substring(2);
    };
    SDPUtils.isRejected = function (mediaSection) {
      return mediaSection.split(' ', 2)[1] === '0';
    };
    SDPUtils.parseMLine = function (mediaSection) {
      const lines = SDPUtils.splitLines(mediaSection);
      const parts = lines[0].substring(2).split(' ');
      return {
        kind: parts[0],
        port: parseInt(parts[1], 10),
        protocol: parts[2],
        fmt: parts.slice(3).join(' ')
      };
    };
    SDPUtils.parseOLine = function (mediaSection) {
      const line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
      const parts = line.substring(2).split(' ');
      return {
        username: parts[0],
        sessionId: parts[1],
        sessionVersion: parseInt(parts[2], 10),
        netType: parts[3],
        addressType: parts[4],
        address: parts[5]
      };
    };

    // a very naive interpretation of a valid SDP.
    SDPUtils.isValidSDP = function (blob) {
      if (typeof blob !== 'string' || blob.length === 0) {
        return false;
      }
      const lines = SDPUtils.splitLines(blob);
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
          return false;
        }
        // TODO: check the modifier a bit more.
      }

      return true;
    };

    // Expose public methods.
    {
      module.exports = SDPUtils;
    }
  })(sdp$1);
  var sdpExports = sdp$1.exports;
  var SDPUtils = /*@__PURE__*/getDefaultExportFromCjs(sdpExports);

  var sdp = /*#__PURE__*/_mergeNamespaces({
    __proto__: null,
    default: SDPUtils
  }, [sdpExports]);

  /*
   *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */
  function shimRTCIceCandidate(window) {
    // foundation is arbitrarily chosen as an indicator for full support for
    // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
    if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
      return;
    }
    const NativeRTCIceCandidate = window.RTCIceCandidate;
    window.RTCIceCandidate = function RTCIceCandidate(args) {
      // Remove the a= which shouldn't be part of the candidate string.
      if (typeof args === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
        args = JSON.parse(JSON.stringify(args));
        args.candidate = args.candidate.substring(2);
      }
      if (args.candidate && args.candidate.length) {
        // Augment the native candidate with the parsed fields.
        const nativeCandidate = new NativeRTCIceCandidate(args);
        const parsedCandidate = SDPUtils.parseCandidate(args.candidate);
        for (const key in parsedCandidate) {
          if (!(key in nativeCandidate)) {
            Object.defineProperty(nativeCandidate, key, {
              value: parsedCandidate[key]
            });
          }
        }

        // Override serializer to not serialize the extra attributes.
        nativeCandidate.toJSON = function toJSON() {
          return {
            candidate: nativeCandidate.candidate,
            sdpMid: nativeCandidate.sdpMid,
            sdpMLineIndex: nativeCandidate.sdpMLineIndex,
            usernameFragment: nativeCandidate.usernameFragment
          };
        };
        return nativeCandidate;
      }
      return new NativeRTCIceCandidate(args);
    };
    window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    wrapPeerConnectionEvent(window, 'icecandidate', e => {
      if (e.candidate) {
        Object.defineProperty(e, 'candidate', {
          value: new window.RTCIceCandidate(e.candidate),
          writable: 'false'
        });
      }
      return e;
    });
  }
  function shimRTCIceCandidateRelayProtocol(window) {
    if (!window.RTCIceCandidate || window.RTCIceCandidate && 'relayProtocol' in window.RTCIceCandidate.prototype) {
      return;
    }

    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    wrapPeerConnectionEvent(window, 'icecandidate', e => {
      if (e.candidate) {
        const parsedCandidate = SDPUtils.parseCandidate(e.candidate.candidate);
        if (parsedCandidate.type === 'relay') {
          // This is a libwebrtc-specific mapping of local type preference
          // to relayProtocol.
          e.candidate.relayProtocol = {
            0: 'tls',
            1: 'tcp',
            2: 'udp'
          }[parsedCandidate.priority >> 24];
        }
      }
      return e;
    });
  }
  function shimMaxMessageSize(window, browserDetails) {
    if (!window.RTCPeerConnection) {
      return;
    }
    if (!('sctp' in window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
        get() {
          return typeof this._sctp === 'undefined' ? null : this._sctp;
        }
      });
    }
    const sctpInDescription = function (description) {
      if (!description || !description.sdp) {
        return false;
      }
      const sections = SDPUtils.splitSections(description.sdp);
      sections.shift();
      return sections.some(mediaSection => {
        const mLine = SDPUtils.parseMLine(mediaSection);
        return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
      });
    };
    const getRemoteFirefoxVersion = function (description) {
      // TODO: Is there a better solution for detecting Firefox?
      const match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
      if (match === null || match.length < 2) {
        return -1;
      }
      const version = parseInt(match[1], 10);
      // Test for NaN (yes, this is ugly)
      return version !== version ? -1 : version;
    };
    const getCanSendMaxMessageSize = function (remoteIsFirefox) {
      // Every implementation we know can send at least 64 KiB.
      // Note: Although Chrome is technically able to send up to 256 KiB, the
      //       data does not reach the other peer reliably.
      //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
      let canSendMaxMessageSize = 65536;
      if (browserDetails.browser === 'firefox') {
        if (browserDetails.version < 57) {
          if (remoteIsFirefox === -1) {
            // FF < 57 will send in 16 KiB chunks using the deprecated PPID
            // fragmentation.
            canSendMaxMessageSize = 16384;
          } else {
            // However, other FF (and RAWRTC) can reassemble PPID-fragmented
            // messages. Thus, supporting ~2 GiB when sending.
            canSendMaxMessageSize = 2147483637;
          }
        } else if (browserDetails.version < 60) {
          // Currently, all FF >= 57 will reset the remote maximum message size
          // to the default value when a data channel is created at a later
          // stage. :(
          // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
          canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
        } else {
          // FF >= 60 supports sending ~2 GiB
          canSendMaxMessageSize = 2147483637;
        }
      }
      return canSendMaxMessageSize;
    };
    const getMaxMessageSize = function (description, remoteIsFirefox) {
      // Note: 65536 bytes is the default value from the SDP spec. Also,
      //       every implementation we know supports receiving 65536 bytes.
      let maxMessageSize = 65536;

      // FF 57 has a slightly incorrect default remote max message size, so
      // we need to adjust it here to avoid a failure when sending.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
      if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
        maxMessageSize = 65535;
      }
      const match = SDPUtils.matchPrefix(description.sdp, 'a=max-message-size:');
      if (match.length > 0) {
        maxMessageSize = parseInt(match[0].substring(19), 10);
      } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
        // If the maximum message size is not present in the remote SDP and
        // both local and remote are Firefox, the remote peer can receive
        // ~2 GiB.
        maxMessageSize = 2147483637;
      }
      return maxMessageSize;
    };
    const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
      this._sctp = null;
      // Chrome decided to not expose .sctp in plan-b mode.
      // As usual, adapter.js has to do an 'ugly worakaround'
      // to cover up the mess.
      if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
        const {
          sdpSemantics
        } = this.getConfiguration();
        if (sdpSemantics === 'plan-b') {
          Object.defineProperty(this, 'sctp', {
            get() {
              return typeof this._sctp === 'undefined' ? null : this._sctp;
            },
            enumerable: true,
            configurable: true
          });
        }
      }
      if (sctpInDescription(arguments[0])) {
        // Check if the remote is FF.
        const isFirefox = getRemoteFirefoxVersion(arguments[0]);

        // Get the maximum message size the local peer is capable of sending
        const canSendMMS = getCanSendMaxMessageSize(isFirefox);

        // Get the maximum message size of the remote peer.
        const remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

        // Determine final maximum message size
        let maxMessageSize;
        if (canSendMMS === 0 && remoteMMS === 0) {
          maxMessageSize = Number.POSITIVE_INFINITY;
        } else if (canSendMMS === 0 || remoteMMS === 0) {
          maxMessageSize = Math.max(canSendMMS, remoteMMS);
        } else {
          maxMessageSize = Math.min(canSendMMS, remoteMMS);
        }

        // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
        // attribute.
        const sctp = {};
        Object.defineProperty(sctp, 'maxMessageSize', {
          get() {
            return maxMessageSize;
          }
        });
        this._sctp = sctp;
      }
      return origSetRemoteDescription.apply(this, arguments);
    };
  }
  function shimSendThrowTypeError(window) {
    if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
      return;
    }

    // Note: Although Firefox >= 57 has a native implementation, the maximum
    //       message size can be reset for all data channels at a later stage.
    //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

    function wrapDcSend(dc, pc) {
      const origDataChannelSend = dc.send;
      dc.send = function send() {
        const data = arguments[0];
        const length = data.length || data.size || data.byteLength;
        if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
          throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
        }
        return origDataChannelSend.apply(dc, arguments);
      };
    }
    const origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
    window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
      const dataChannel = origCreateDataChannel.apply(this, arguments);
      wrapDcSend(dataChannel, this);
      return dataChannel;
    };
    wrapPeerConnectionEvent(window, 'datachannel', e => {
      wrapDcSend(e.channel, e.target);
      return e;
    });
  }

  /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
   * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
   * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
   * since DTLS failures would be hidden. See
   * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
   * for the Firefox tracking bug.
   */
  function shimConnectionState(window) {
    if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
      return;
    }
    const proto = window.RTCPeerConnection.prototype;
    Object.defineProperty(proto, 'connectionState', {
      get() {
        return {
          completed: 'connected',
          checking: 'connecting'
        }[this.iceConnectionState] || this.iceConnectionState;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(proto, 'onconnectionstatechange', {
      get() {
        return this._onconnectionstatechange || null;
      },
      set(cb) {
        if (this._onconnectionstatechange) {
          this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
          delete this._onconnectionstatechange;
        }
        if (cb) {
          this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
        }
      },
      enumerable: true,
      configurable: true
    });
    ['setLocalDescription', 'setRemoteDescription'].forEach(method => {
      const origMethod = proto[method];
      proto[method] = function () {
        if (!this._connectionstatechangepoly) {
          this._connectionstatechangepoly = e => {
            const pc = e.target;
            if (pc._lastConnectionState !== pc.connectionState) {
              pc._lastConnectionState = pc.connectionState;
              const newEvent = new Event('connectionstatechange', e);
              pc.dispatchEvent(newEvent);
            }
            return e;
          };
          this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
        }
        return origMethod.apply(this, arguments);
      };
    });
  }
  function removeExtmapAllowMixed(window, browserDetails) {
    /* remove a=extmap-allow-mixed for webrtc.org < M71 */
    if (!window.RTCPeerConnection) {
      return;
    }
    if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
      return;
    }
    if (browserDetails.browser === 'safari' && browserDetails.version >= 605) {
      return;
    }
    const nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
      if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
        const sdp = desc.sdp.split('\n').filter(line => {
          return line.trim() !== 'a=extmap-allow-mixed';
        }).join('\n');
        // Safari enforces read-only-ness of RTCSessionDescription fields.
        if (window.RTCSessionDescription && desc instanceof window.RTCSessionDescription) {
          arguments[0] = new window.RTCSessionDescription({
            type: desc.type,
            sdp
          });
        } else {
          desc.sdp = sdp;
        }
      }
      return nativeSRD.apply(this, arguments);
    };
  }
  function shimAddIceCandidateNullOrEmpty(window, browserDetails) {
    // Support for addIceCandidate(null or undefined)
    // as well as addIceCandidate({candidate: "", ...})
    // https://bugs.chromium.org/p/chromium/issues/detail?id=978582
    // Note: must be called before other polyfills which change the signature.
    if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) {
      return;
    }
    const nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
    if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) {
      return;
    }
    window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
      if (!arguments[0]) {
        if (arguments[1]) {
          arguments[1].apply(null);
        }
        return Promise.resolve();
      }
      // Firefox 68+ emits and processes {candidate: "", ...}, ignore
      // in older versions.
      // Native support for ignoring exists for Chrome M77+.
      // Safari ignores as well, exact version unknown but works in the same
      // version that also ignores addIceCandidate(null).
      if ((browserDetails.browser === 'chrome' && browserDetails.version < 78 || browserDetails.browser === 'firefox' && browserDetails.version < 68 || browserDetails.browser === 'safari') && arguments[0] && arguments[0].candidate === '') {
        return Promise.resolve();
      }
      return nativeAddIceCandidate.apply(this, arguments);
    };
  }

  // Note: Make sure to call this ahead of APIs that modify
  // setLocalDescription.length
  function shimParameterlessSetLocalDescription(window, browserDetails) {
    if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) {
      return;
    }
    const nativeSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    if (!nativeSetLocalDescription || nativeSetLocalDescription.length === 0) {
      return;
    }
    window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
      let desc = arguments[0] || {};
      if (typeof desc !== 'object' || desc.type && desc.sdp) {
        return nativeSetLocalDescription.apply(this, arguments);
      }
      // The remaining steps should technically happen when SLD comes off the
      // RTCPeerConnection's operations chain (not ahead of going on it), but
      // this is too difficult to shim. Instead, this shim only covers the
      // common case where the operations chain is empty. This is imperfect, but
      // should cover many cases. Rationale: Even if we can't reduce the glare
      // window to zero on imperfect implementations, there's value in tapping
      // into the perfect negotiation pattern that several browsers support.
      desc = {
        type: desc.type,
        sdp: desc.sdp
      };
      if (!desc.type) {
        switch (this.signalingState) {
          case 'stable':
          case 'have-local-offer':
          case 'have-remote-pranswer':
            desc.type = 'offer';
            break;
          default:
            desc.type = 'answer';
            break;
        }
      }
      if (desc.sdp || desc.type !== 'offer' && desc.type !== 'answer') {
        return nativeSetLocalDescription.apply(this, [desc]);
      }
      const func = desc.type === 'offer' ? this.createOffer : this.createAnswer;
      return func.apply(this).then(d => nativeSetLocalDescription.apply(this, [d]));
    };
  }

  var commonShim = /*#__PURE__*/Object.freeze({
    __proto__: null,
    removeExtmapAllowMixed: removeExtmapAllowMixed,
    shimAddIceCandidateNullOrEmpty: shimAddIceCandidateNullOrEmpty,
    shimConnectionState: shimConnectionState,
    shimMaxMessageSize: shimMaxMessageSize,
    shimParameterlessSetLocalDescription: shimParameterlessSetLocalDescription,
    shimRTCIceCandidate: shimRTCIceCandidate,
    shimRTCIceCandidateRelayProtocol: shimRTCIceCandidateRelayProtocol,
    shimSendThrowTypeError: shimSendThrowTypeError
  });

  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */

  // Shimming starts here.
  function adapterFactory({
    window
  } = {}, options = {
    shimChrome: true,
    shimFirefox: true,
    shimSafari: true
  }) {
    // Utils.
    const logging = log;
    const browserDetails = detectBrowser(window);
    const adapter = {
      browserDetails,
      commonShim,
      extractVersion: extractVersion,
      disableLog: disableLog,
      disableWarnings: disableWarnings,
      // Expose sdp as a convenience. For production apps include directly.
      sdp
    };

    // Shim browser if found.
    switch (browserDetails.browser) {
      case 'chrome':
        if (!chromeShim || !shimPeerConnection$1 || !options.shimChrome) {
          logging('Chrome shim is not included in this adapter release.');
          return adapter;
        }
        if (browserDetails.version === null) {
          logging('Chrome shim can not determine version, not shimming.');
          return adapter;
        }
        logging('adapter.js shimming chrome.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = chromeShim;

        // Must be called before shimPeerConnection.
        shimAddIceCandidateNullOrEmpty(window, browserDetails);
        shimParameterlessSetLocalDescription(window);
        shimGetUserMedia$2(window, browserDetails);
        shimMediaStream(window);
        shimPeerConnection$1(window, browserDetails);
        shimOnTrack$1(window);
        shimAddTrackRemoveTrack(window, browserDetails);
        shimGetSendersWithDtmf(window);
        shimGetStats(window);
        shimSenderReceiverGetStats(window);
        fixNegotiationNeeded(window, browserDetails);
        shimRTCIceCandidate(window);
        shimRTCIceCandidateRelayProtocol(window);
        shimConnectionState(window);
        shimMaxMessageSize(window, browserDetails);
        shimSendThrowTypeError(window);
        removeExtmapAllowMixed(window, browserDetails);
        break;
      case 'firefox':
        if (!firefoxShim || !shimPeerConnection || !options.shimFirefox) {
          logging('Firefox shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming firefox.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = firefoxShim;

        // Must be called before shimPeerConnection.
        shimAddIceCandidateNullOrEmpty(window, browserDetails);
        shimParameterlessSetLocalDescription(window);
        shimGetUserMedia$1(window, browserDetails);
        shimPeerConnection(window, browserDetails);
        shimOnTrack(window);
        shimRemoveStream(window);
        shimSenderGetStats(window);
        shimReceiverGetStats(window);
        shimRTCDataChannel(window);
        shimAddTransceiver(window);
        shimGetParameters(window);
        shimCreateOffer(window);
        shimCreateAnswer(window);
        shimRTCIceCandidate(window);
        shimConnectionState(window);
        shimMaxMessageSize(window, browserDetails);
        shimSendThrowTypeError(window);
        break;
      case 'safari':
        if (!safariShim || !options.shimSafari) {
          logging('Safari shim is not included in this adapter release.');
          return adapter;
        }
        logging('adapter.js shimming safari.');
        // Export to the adapter global object visible in the browser.
        adapter.browserShim = safariShim;

        // Must be called before shimCallbackAPI.
        shimAddIceCandidateNullOrEmpty(window, browserDetails);
        shimParameterlessSetLocalDescription(window);
        shimRTCIceServerUrls(window);
        shimCreateOfferLegacy(window);
        shimCallbacksAPI(window);
        shimLocalStreamsAPI(window);
        shimRemoteStreamsAPI(window);
        shimTrackEventTransceiver(window);
        shimGetUserMedia(window);
        shimAudioContext(window);
        shimRTCIceCandidate(window);
        shimRTCIceCandidateRelayProtocol(window);
        shimMaxMessageSize(window, browserDetails);
        shimSendThrowTypeError(window);
        removeExtmapAllowMixed(window, browserDetails);
        break;
      default:
        logging('Unsupported browser!');
        break;
    }
    return adapter;
  }

  /*
   *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
   *
   *  Use of this source code is governed by a BSD-style license
   *  that can be found in the LICENSE file in the root of the source
   *  tree.
   */
  /* eslint-env node */

  const adapter = adapterFactory({
    window: typeof window === 'undefined' ? undefined : window
  });

  var Event$1 = /*#__PURE__*/function () {
    function Event() {
      _classCallCheck(this, Event);
      this._stores = Object.create(null);
    }

    //订阅事件 ctx事件执行的上下文对象
    _createClass(Event, [{
      key: "on",
      value: function on(event, handler, ctx) {
        if (typeof handler !== 'function') {
          throw new Error('listener must be a function');
        }
        (this._stores[event] = this._stores[event] || []).push({
          cb: handler,
          ctx: ctx
        });
        return this;
      }

      //事件类型只订阅一个事件，调用后删除
    }, {
      key: "once",
      value: function once(event, handler, ctx) {
        var that = this;
        function on() {
          that.off(event, on);
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          handler.apply(this, args);
        }
        this.on(event, on, ctx);
        return that;
      }

      //发布事件
    }, {
      key: "emit",
      value: function emit(event) {
        var store = this._stores[event];
        if (store && store.length) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          for (var i = 0, len = store.length; i < len; i++) {
            var _store$i$ctx;
            store[i].cb.apply((_store$i$ctx = store[i].ctx) !== null && _store$i$ctx !== void 0 ? _store$i$ctx : null, args);
          }
        }
      }

      //取消订阅
    }, {
      key: "off",
      value: function off(event, handler) {
        // all 取消所有的订阅事件
        if (!arguments.length) {
          this._stores = {};
          return;
        }

        // specific event
        var store = this._stores[event];
        if (!store) return;

        // remove all handlers  取消当前事件类型对应的所有事件
        if (arguments.length === 1) {
          delete store[event];
          return;
        }

        // remove specific handler 取消特定事件
        for (var i = 0, len = store.length; i < len; i++) {
          if (store[i].cb === handler) {
            store.splice(i, 1);
            break;
          }
        }
        return;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._stores = Object.create(null);
      }
    }]);
    return Event;
  }();

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  if (!Math.hypot) Math.hypot = function () {
    var y = 0,
      i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create$3() {
    var out = new ARRAY_TYPE(16);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */

  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function orthoNO(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  /**
   * Alias for {@link mat4.orthoNO}
   * @function
   */

  var ortho = orthoNO;
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */

  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];
    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create$2() {
    var out = new ARRAY_TYPE(3);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */

  function fromValues$2(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  (function () {
    var vec = create$2();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 3;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }
      return a;
    };
  })();

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */

  function create$1() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }
    return out;
  }
  /**
   * Creates a new vec4 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} a new 4D vector
   */

  function fromValues$1(x, y, z, w) {
    var out = new ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  /**
   * Calculates the dot product of two vec4's
   *
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {Number} dot product of a and b
   */

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  (function () {
    var vec = create$1();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 4;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }
      return a;
    };
  })();

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */

  function create() {
    var out = new ARRAY_TYPE(2);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }
    return out;
  }
  /**
   * Creates a new vec2 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} a new 2D vector
   */

  function fromValues(x, y) {
    var out = new ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
  }
  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  (function () {
    var vec = create();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 2;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }
      return a;
    };
  })();

  var vsSource$1 = "\nattribute vec4 aVertexPosition;\nattribute vec2 aTexturePosition;\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nvarying lowp vec2 vTexturePosition;\nvoid main(void) {\n  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;\n  vTexturePosition = aTexturePosition;\n}\n";

  // Fragment shader program

  var fsSource$1 = "\nprecision mediump float;\nvarying lowp vec2 vTexturePosition;\nuniform sampler2D uTexture; \nvoid main(void) {\n\n  vec4 color =   texture2D(uTexture, vTexturePosition);\n  vec4 alphacolor =   texture2D(uTexture, vTexturePosition + vec2(0.5, 0));\n\n  color.a = alphacolor.r;\n\n  gl_FragColor = color;\n\n}\n";
  var RectMaskRender = /*#__PURE__*/function () {
    function RectMaskRender(gl, width, height) {
      _classCallCheck(this, RectMaskRender);
      _defineProperty(this, "gl", undefined);
      _defineProperty(this, "width", 0);
      _defineProperty(this, "height", 0);
      _defineProperty(this, "programInfo", undefined);
      _defineProperty(this, "buffers", undefined);
      this.width = width;
      this.height = height;
      this.gl = gl;
      this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
      var _this$initShaderProgr = this.initShaderProgram(vsSource$1, fsSource$1),
        shaderProgram = _this$initShaderProgr.shaderProgram,
        vertexShader = _this$initShaderProgr.vertexShader,
        fragmentShader = _this$initShaderProgr.fragmentShader;
      this.programInfo = {
        program: shaderProgram,
        vshader: vertexShader,
        fshader: fragmentShader,
        attribLocations: {
          vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          texturePosition: this.gl.getAttribLocation(shaderProgram, 'aTexturePosition')
        },
        uniformLocations: {
          projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
          viewMatrix: this.gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
          texture: this.gl.getUniformLocation(shaderProgram, 'uTexture')
        }
      };
      this.buffers = this.initBuffers();
      var texture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.texture = texture;
    }
    _createClass(RectMaskRender, [{
      key: "updateTexture",
      value: function updateTexture(rgbabuf) {
        var textunit = 3;
        this.gl.activeTexture(this.gl.TEXTURE0 + textunit);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, rgbabuf);
        this.drawNow();
      }
    }, {
      key: "getRGBA",
      value: function getRGBA() {
        var pixels = new Uint8Array(this.width * this.height * 4);
        this.gl.readPixels(0, 0, this.width, this.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);
        return pixels;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.buffers.position) {
          this.gl.deleteBuffer(this.buffers.position);
        }
        if (this.buffers.texposition) {
          this.gl.deleteBuffer(this.buffers.texposition);
        }
        if (this.buffers.indices) {
          this.gl.deleteBuffer(this.buffers.indices);
        }
        if (this.texture) {
          this.gl.deleteTexture(this.texture);
        }
        if (this.programInfo.program) {
          this.gl.deleteProgram(this.programInfo.program);
        }
        if (this.programInfo.vshader) {
          this.gl.deleteShader(this.programInfo.vshader);
        }
        if (this.programInfo.fshader) {
          this.gl.deleteShader(this.programInfo.fshader);
        }
      }
    }, {
      key: "drawNow",
      value: function drawNow() {
        this.gl.viewport(0, 0, this.width, this.height);
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0); // Clear to black, fully opaque

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        var zNear = 0.1;
        var zFar = 100.0;
        var projectionMatrix = create$3();
        ortho(projectionMatrix, -1, 1, -1, 1, zNear, zFar);
        var modelMatrix = create$3();
        identity(modelMatrix);
        var viewMatrix = create$3();
        lookAt(viewMatrix, fromValues$2(0, 0, 0), fromValues$2(0, 0, -1), fromValues$2(0, 1, 0));
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.texposition);
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.texturePosition, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.texturePosition);
        var textunit = 2;
        this.gl.activeTexture(this.gl.TEXTURE0 + textunit);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
        this.gl.useProgram(this.programInfo.program);
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelMatrix, false, modelMatrix);
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.viewMatrix, false, viewMatrix);
        this.gl.uniform1i(this.programInfo.uniformLocations.texture, textunit);
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
      }
    }, {
      key: "initBuffers",
      value: function initBuffers() {
        var _texturePos;
        var positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        var positions = [
        // Front face
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
        var facePos = [[0.0, 1.0], [0.5, 1.0], [0.5, 0.0], [0.0, 0.0]];

        // Convert the array of colors into a table for all the vertices.

        var texturePos = [];
        texturePos = (_texturePos = texturePos).concat.apply(_texturePos, facePos);
        var texpositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texpositionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texturePos), this.gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        var indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        var indices = [0, 1, 2, 0, 2, 3];

        // Now send the element array to GL

        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
        return {
          position: positionBuffer,
          texposition: texpositionBuffer,
          indices: indexBuffer
        };
      }
    }, {
      key: "initShaderProgram",
      value: function initShaderProgram(vsSource, fsSource) {
        var vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
        var fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);
        var shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
          console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram));
          return;
        }
        return {
          shaderProgram: shaderProgram,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        };
      }
    }, {
      key: "loadShader",
      value: function loadShader(type, source) {
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          console.error('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
          this.gl.deleteShader(shader);
          return;
        }
        return shader;
      }
    }]);
    return RectMaskRender;
  }();

  var vsSource = "\nattribute vec4 aVertexPosition;\nattribute vec2 aTexturePosition;\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nvarying highp vec2 vTexturePosition;\nvoid main(void) {\n  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;\n  vTexturePosition = aTexturePosition;\n}\n";

  // Fragment shader program

  var fsSource = "\nprecision highp float;\nvarying highp vec2 vTexturePosition;\nuniform sampler2D uTexture; \n\n\nuniform float opacity;      //\u4E0D\u900F\u660E  [0.0 , 1.0]  \u9ED8\u8BA4 1.0\nuniform float contrast;     //\u5BF9\u6BD4\u5EA6  [-1.0, 1.0]   \u9ED8\u8BA4 0\nuniform float brightness;   //\u4EAE\u5EA6   [-1.0, 1.0]   \u9ED8\u8BA4 0\nuniform float gamma;        //gamma  [-1.0, 1.0]   \u9ED8\u8BA4 0\n\n\nuniform float similarity; //\u76F8\u4F3C\u5EA6 [0.0 , 1.0]  \u9ED8\u8BA4 0.4\nuniform float smoothness; //\u5E73\u6ED1\u5EA6 [0.0 , 1.0]  \u9ED8\u8BA4 0.08\nuniform float spill;       //\u4E3B\u8272\u6CC4\u9732\u51CF\u5C11 [0.0 , 1.0]  \u9ED8\u8BA4 0.1\nuniform vec2 chroma_key;         //\u62A0\u56FE\u989C\u8272 RGB->YCbCr,\u8FD9\u91CC\u53EA\u8981 Cb\u548CCr \u4E24\u4E2A\u989C\u8272\u5206\u91CF\nuniform vec2 pixel_size;         //\u4E00\u4E2A\u50CF\u7D20\u5728\u7EB9\u7406\u7A7A\u95F4\u7684\u5927\u5C0F (1.0/width, 1.0/height)\n\nvec4 cb_v4 = vec4( -0.100644, -0.338572,  0.439216, 0.501961);\nvec4 cr_v4 = vec4( 0.439216, -0.398942, -0.040274, 0.501961);\n\n\nvec4 CalcColor(vec4 rgba)\n{\n\treturn vec4(pow(rgba.rgb, vec3(gamma, gamma, gamma)) * contrast + brightness, rgba.a);\n}\n\nfloat GetChromaDist(vec3 rgb)\n{\n\tfloat cb = dot(rgb.rgb, cb_v4.xyz) + cb_v4.w;\n\tfloat cr = dot(rgb.rgb, cr_v4.xyz) + cr_v4.w;\n\treturn distance(chroma_key, vec2(cb, cr));\n}\n\n\nvec3 SampleTexture(vec2 uv)\n{\n\tvec3 rgb = texture2D(uTexture, uv).rgb;\n    return rgb;\n}\n\nfloat GetBoxFilteredChromaDist(vec3 rgb, vec2 texCoord)\n{\n\tvec2 h_pixel_size = pixel_size / 2.0;\n\tvec2 point_0 = vec2(pixel_size.x, h_pixel_size.y);\n\tvec2 point_1 = vec2(h_pixel_size.x, -pixel_size.y);\n\tfloat distVal = GetChromaDist(SampleTexture(texCoord-point_0));\n\tdistVal += GetChromaDist(SampleTexture(texCoord+point_0));\n\tdistVal += GetChromaDist(SampleTexture(texCoord-point_1));\n\tdistVal += GetChromaDist(SampleTexture(texCoord+point_1));\n\tdistVal *= 2.0;\n    distVal += GetChromaDist(rgb);\n\treturn distVal / 9.0;\n}\n\nvec4 ProcessChromaKey(vec4 rgba, vec2 uv)\n{\n\tfloat chromaDist = GetBoxFilteredChromaDist(rgba.rgb, uv);\n\tfloat baseMask = chromaDist - similarity;\n\tfloat fullMask = pow(clamp(baseMask / smoothness, 0.0, 1.0), 1.5);\n\tfloat spillVal = pow(clamp(baseMask / spill, 0.0, 1.0), 1.5);\n\n\trgba.a *= opacity;\n\trgba.a *= fullMask;\n\n\tfloat desat = dot(rgba.rgb, vec3(0.2126, 0.7152, 0.0722));\n\trgba.rgb = mix(vec3(desat, desat, desat), rgba.rgb, spillVal);\n\n\treturn CalcColor(rgba);\n}\n\nvec4 PSChromaKeyRGBA(vec2 uv) \n{\n\tvec4 rgba = texture2D(uTexture, uv);\n\trgba.rgb = max(vec3(0.0, 0.0, 0.0), rgba.rgb / rgba.a);\n\trgba = ProcessChromaKey(rgba, uv);\n    //rgba.rgb *= rgba.a;\n\treturn rgba;\n}\n\n\nvoid main(void) {\n\n    gl_FragColor = PSChromaKeyRGBA(vTexturePosition);\n\n}\n";
  var RectRender = /*#__PURE__*/function () {
    function RectRender(gl, width, height) {
      _classCallCheck(this, RectRender);
      _defineProperty(this, "gl", undefined);
      _defineProperty(this, "width", 0);
      _defineProperty(this, "height", 0);
      _defineProperty(this, "programInfo", undefined);
      _defineProperty(this, "buffers", undefined);
      _defineProperty(this, "settings", undefined);
      this.width = width;
      this.height = height;
      this.gl = gl;
      this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
      var _this$initShaderProgr = this.initShaderProgram(vsSource, fsSource),
        shaderProgram = _this$initShaderProgr.shaderProgram,
        vertexShader = _this$initShaderProgr.vertexShader,
        fragmentShader = _this$initShaderProgr.fragmentShader;
      this.programInfo = {
        program: shaderProgram,
        vshader: vertexShader,
        fshader: fragmentShader,
        attribLocations: {
          vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          texturePosition: this.gl.getAttribLocation(shaderProgram, 'aTexturePosition')
        },
        uniformLocations: {
          projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
          viewMatrix: this.gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
          texture: this.gl.getUniformLocation(shaderProgram, 'uTexture'),
          opacity: this.gl.getUniformLocation(shaderProgram, 'opacity'),
          contrast: this.gl.getUniformLocation(shaderProgram, 'contrast'),
          brightness: this.gl.getUniformLocation(shaderProgram, 'brightness'),
          gamma: this.gl.getUniformLocation(shaderProgram, 'gamma'),
          similarity: this.gl.getUniformLocation(shaderProgram, 'similarity'),
          smoothness: this.gl.getUniformLocation(shaderProgram, 'smoothness'),
          spill: this.gl.getUniformLocation(shaderProgram, 'spill'),
          chroma_key: this.gl.getUniformLocation(shaderProgram, 'chroma_key'),
          pixel_size: this.gl.getUniformLocation(shaderProgram, 'pixel_size')
        }
      };
      this.buffers = this.initBuffers();
      var texture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.texture = texture;
      this.settings = {};
      this.settings.opacity = 1.0;
      this.settings.contrast = 1.0;
      this.settings.brightness = 0.;
      this.settings.gamma = 1.0;
      this.settings.similarity = 0.4;
      this.settings.smoothness = 0.08;
      this.settings.spill = 0.1;
      var chromeColor = fromValues$1(0., 1., 0., 1.0); //这里默认是绿色，可以调整其他颜色
      var cb_v4 = fromValues$1(-0.100644, -0.338572, 0.439216, 0.501961);
      var cr_v4 = fromValues$1(0.439216, -0.398942, -0.040274, 0.501961);
      this.settings.chroma_key = fromValues(dot(chromeColor, cb_v4), dot(chromeColor, cr_v4));
      this.settings.pixel_size = fromValues(1.0 / width, 1.0 / height);
    }
    _createClass(RectRender, [{
      key: "updateTexture",
      value: function updateTexture(rgbabuf) {
        var textunit = 3;
        this.gl.activeTexture(this.gl.TEXTURE0 + textunit);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, rgbabuf);
        this.drawNow();
      }
    }, {
      key: "getRGBA",
      value: function getRGBA() {
        var pixels = new Uint8Array(this.width * this.height * 4);
        this.gl.readPixels(0, 0, this.width, this.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);
        return pixels;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.buffers.position) {
          this.gl.deleteBuffer(this.buffers.position);
        }
        if (this.buffers.texposition) {
          this.gl.deleteBuffer(this.buffers.texposition);
        }
        if (this.buffers.indices) {
          this.gl.deleteBuffer(this.buffers.indices);
        }
        if (this.texture) {
          this.gl.deleteTexture(this.texture);
        }
        if (this.programInfo.program) {
          this.gl.deleteProgram(this.programInfo.program);
        }
        if (this.programInfo.vshader) {
          this.gl.deleteShader(this.programInfo.vshader);
        }
        if (this.programInfo.fshader) {
          this.gl.deleteShader(this.programInfo.fshader);
        }
      }
    }, {
      key: "initBuffers",
      value: function initBuffers() {
        var _texturePos;
        var positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        var positions = [
        // Front face
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
        var facePos = [[0.0, 1.0], [1.0, 1.0], [1.0, 0.0], [0.0, 0.0]];

        // Convert the array of colors into a table for all the vertices.

        var texturePos = [];
        texturePos = (_texturePos = texturePos).concat.apply(_texturePos, facePos);
        var texpositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texpositionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texturePos), this.gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        var indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        var indices = [0, 1, 2, 0, 2, 3];

        // Now send the element array to GL

        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
        return {
          position: positionBuffer,
          texposition: texpositionBuffer,
          indices: indexBuffer
        };
      }
    }, {
      key: "drawNow",
      value: function drawNow() {
        this.gl.viewport(0, 0, this.width, this.height);
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0); // Clear to black, fully opaque

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        var zNear = 0.1;
        var zFar = 100.0;
        var projectionMatrix = create$3();
        ortho(projectionMatrix, -1, 1, -1, 1, zNear, zFar);
        var modelMatrix = create$3();
        identity(modelMatrix);
        var viewMatrix = create$3();
        lookAt(viewMatrix, fromValues$2(0, 0, 0), fromValues$2(0, 0, -1), fromValues$2(0, 1, 0));
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.texposition);
        this.gl.vertexAttribPointer(this.programInfo.attribLocations.texturePosition, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.texturePosition);
        var textunit = 2;
        this.gl.activeTexture(this.gl.TEXTURE0 + textunit);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
        this.gl.useProgram(this.programInfo.program);
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelMatrix, false, modelMatrix);
        this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.viewMatrix, false, viewMatrix);
        this.gl.uniform1i(this.programInfo.uniformLocations.texture, textunit);
        this.gl.uniform1f(this.programInfo.uniformLocations.opacity, this.settings.opacity);
        this.gl.uniform1f(this.programInfo.uniformLocations.contrast, this.settings.contrast);
        this.gl.uniform1f(this.programInfo.uniformLocations.brightness, this.settings.brightness);
        this.gl.uniform1f(this.programInfo.uniformLocations.gamma, this.settings.gamma);
        this.gl.uniform1f(this.programInfo.uniformLocations.similarity, this.settings.similarity);
        this.gl.uniform1f(this.programInfo.uniformLocations.smoothness, this.settings.smoothness);
        this.gl.uniform1f(this.programInfo.uniformLocations.spill, this.settings.spill);
        this.gl.uniform2fv(this.programInfo.uniformLocations.chroma_key, this.settings.chroma_key);
        this.gl.uniform2fv(this.programInfo.uniformLocations.pixel_size, this.settings.pixel_size);
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
      }
    }, {
      key: "initShaderProgram",
      value: function initShaderProgram(vsSource, fsSource) {
        var vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
        var fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);
        var shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
          console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram));
          return;
        }
        return {
          shaderProgram: shaderProgram,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        };
      }
    }, {
      key: "loadShader",
      value: function loadShader(type, source) {
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          console.error('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
          this.gl.deleteShader(shader);
          return;
        }
        return shader;
      }
    }]);
    return RectRender;
  }();

  var alphacanvas = document.createElement('canvas'); // 最终展示的画布
  var alphacanvasGL = createContextGL(alphacanvas);
  var render = null;
  var video = null;
  var fps = 25;
  var lastTime = 0;

  /**
   * 
   * @param {Element} v 需要扣背景的video标签
   * @param {number} f fps，默认25
   */
  function wipe(v) {
    var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;
    video = v;
    fps = f;
    video.parentElement.appendChild(alphacanvas);
    video.parentElement.style.fontSize = 0;
    video.parentElement.style.positon = 'relative';
    rollWipe();
  }

  /**
   * 
   * @param {Element} v 需要扣背景的video标签
   * @param {number} f fps，默认25
   */
  function wipeGreen(v) {
    var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;
    video = v;
    fps = f;
    video.parentElement.appendChild(alphacanvas);
    video.parentElement.style.fontSize = 0;
    video.parentElement.style.positon = 'relative';
    rollWipeGreen();
  }

  /**
   * 停止扣背景，释放资源
   */
  function stopWipe() {
    if (render) {
      render.destroy();
      render = null;
    }
  }
  function createContextGL(canvas) {
    var gl = null;
    var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
    var nameIndex = 0;
    while (!gl && nameIndex < validContextNames.length) {
      var contextName = validContextNames[nameIndex];
      try {
        var contextOptions = {
          preserveDrawingBuffer: true,
          antialias: true
        };
        gl = canvas.getContext(contextName, contextOptions);
      } catch (e) {
        gl = null;
      }
      if (!gl || typeof gl.getParameter !== 'function') {
        gl = null;
      }
      ++nameIndex;
    }
    return gl;
  }
  function rollWipe(timestamp) {
    if (!timestamp) {
      lastTime = timestamp = performance.now();
    }
    var frameTime = 1000 / fps;
    if (timestamp - lastTime >= frameTime && 0 !== video.videoWidth) {
      if (!render) {
        render = new RectMaskRender(alphacanvasGL, video.videoWidth / 2, video.videoHeight);
        alphacanvas.width = video.videoWidth / 2;
        alphacanvas.height = video.videoHeight;
        Object.assign(alphacanvas.style, {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        });
      }
      render.updateTexture(video, video.videoWidth, video.videoHeight);
      lastTime = timestamp;
    }
    requestAnimationFrame(rollWipe);
  }
  function rollWipeGreen(timestamp) {
    if (!timestamp) {
      lastTime = timestamp = performance.now();
    }
    var frameTime = 1000 / fps;
    if (timestamp - lastTime >= frameTime && 0 !== video.videoWidth) {
      if (!render) {
        render = new RectRender(alphacanvasGL, video.videoWidth, video.videoHeight);
        alphacanvas.width = video.videoWidth;
        alphacanvas.height = video.videoHeight;
        Object.assign(alphacanvas.style, {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        });
      }
      render.updateTexture(video, video.videoWidth, video.videoHeight);
      lastTime = timestamp;
    }
    requestAnimationFrame(rollWipeGreen);
  }

  var uuid = function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };
  // 客户端唯一标记
  function clientUuid() {
    var clientId = localStorage.getItem('__client');
    if (clientId) {
      return clientId;
    }
    clientId = 'C_' + uuid();
    localStorage.setItem('__client', clientId);
    return clientId;
  }
  function pick(obj, keys) {
    return keys.reduce(function (acc, key) {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }
  function set(obj, path, value) {
    if (Object(obj) !== obj) return obj;
    if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
    path.slice(0, -1).reduce(function (a, c, i) {
      return Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {};
    }, obj)[path[path.length - 1]] = value;
    return obj;
  }
  function isObject(item) {
    return item && _typeof(item) === 'object' && !Array.isArray(item);
  }
  function merge(target, source) {
    var output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(function (key) {
        if (isObject(source[key])) {
          if (!(key in target)) Object.assign(output, _defineProperty({}, key, source[key]));else output[key] = merge(target[key], source[key]);
        } else {
          Object.assign(output, _defineProperty({}, key, source[key]));
        }
      });
    }
    return output;
  }
  function urlAppendParam(uri) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var url = new URL(uri);
    Object.keys(params).forEach(function (key) {
      return url.searchParams.append(key, params[key]);
    });
    return url.toString();
  }
  function getUrlParams(uri) {
    var url = new URL(uri);
    var params = new URLSearchParams(url.search);
    var obj = {};
    var _iterator = _createForOfIteratorHelper(params.entries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var pair = _step.value;
        obj[pair[0]] = pair[1];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return obj;
  }
  function getUrlParamsString(uri) {
    var url = new URL(uri);
    var params = new URLSearchParams(url.search);
    return params.toString();
  }

  var http = {
    get: function get(url, param) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var query;
        if (param) {
          query = Object.keys(param).map(function (item) {
            return "".concat(item, "=").concat(param[item]);
          }).join('&');
        }
        xhr.open('get', query ? "".concat(url, "?").concat(query) : url);
        xhr.setRequestHeader('sig', sessionStorage.getItem('_duix_sign'));
        xhr.responseType = 'json';
        xhr.send();
        xhr.timeout = 15000;
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.ontimeout = function () {
          reject({
            code: '504',
            text: 'timeout'
          });
        };
      });
    },
    post: function post(url, params) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Uuid', sessionStorage.getItem('_duix_sessionId'));
        xhr.setRequestHeader('Request-Date', new Date().getTime());
        xhr.setRequestHeader('token', sessionStorage.getItem('_duix_token'));
        xhr.setRequestHeader('sig', sessionStorage.getItem('_duix_sign'));
        xhr.send(JSON.stringify(params));
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              if (xhr.responseText) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                resolve();
              }
            } else {
              reject('Error: ' + xhr.status);
            }
          }
        };
      });
    },
    stream: function stream(url, data) {
      var xhr = new XMLHttpRequest();
      xhr.open('post', url);
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');
      xhr.timeout = 15000;
      xhr.send(data);
      return new Promise(function (resolve) {
        xhr.onload = function () {
          resolve(xhr.response);
        };
      });
    }
  };

  function commonjsRequire(path) {
  	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }

  var localforage$1 = {exports: {}};

  /*!
      localForage -- Offline Storage, Improved
      Version 1.10.0
      https://localforage.github.io/localForage
      (c) 2013-2017 Mozilla, Apache License 2.0
  */
  (function (module, exports) {
    (function (f) {
      {
        module.exports = f();
      }
    })(function () {
      return function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof commonjsRequire == "function" && commonjsRequire;
              if (!u && a) return a(o, !0);
              if (i) return i(o, !0);
              var f = new Error("Cannot find module '" + o + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {
              exports: {}
            };
            t[o][0].call(l.exports, function (e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
          }
          return n[o].exports;
        }
        var i = typeof commonjsRequire == "function" && commonjsRequire;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s;
      }({
        1: [function (_dereq_, module, exports) {
          (function (global) {

            var Mutation = global.MutationObserver || global.WebKitMutationObserver;
            var scheduleDrain;
            {
              if (Mutation) {
                var called = 0;
                var observer = new Mutation(nextTick);
                var element = global.document.createTextNode('');
                observer.observe(element, {
                  characterData: true
                });
                scheduleDrain = function () {
                  element.data = called = ++called % 2;
                };
              } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
                var channel = new global.MessageChannel();
                channel.port1.onmessage = nextTick;
                scheduleDrain = function () {
                  channel.port2.postMessage(0);
                };
              } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
                scheduleDrain = function () {
                  // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                  // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                  var scriptEl = global.document.createElement('script');
                  scriptEl.onreadystatechange = function () {
                    nextTick();
                    scriptEl.onreadystatechange = null;
                    scriptEl.parentNode.removeChild(scriptEl);
                    scriptEl = null;
                  };
                  global.document.documentElement.appendChild(scriptEl);
                };
              } else {
                scheduleDrain = function () {
                  setTimeout(nextTick, 0);
                };
              }
            }
            var draining;
            var queue = [];
            //named nextTick for less confusing stack traces
            function nextTick() {
              draining = true;
              var i, oldQueue;
              var len = queue.length;
              while (len) {
                oldQueue = queue;
                queue = [];
                i = -1;
                while (++i < len) {
                  oldQueue[i]();
                }
                len = queue.length;
              }
              draining = false;
            }
            module.exports = immediate;
            function immediate(task) {
              if (queue.push(task) === 1 && !draining) {
                scheduleDrain();
              }
            }
          }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {}],
        2: [function (_dereq_, module, exports) {

          var immediate = _dereq_(1);

          /* istanbul ignore next */
          function INTERNAL() {}
          var handlers = {};
          var REJECTED = ['REJECTED'];
          var FULFILLED = ['FULFILLED'];
          var PENDING = ['PENDING'];
          module.exports = Promise;
          function Promise(resolver) {
            if (typeof resolver !== 'function') {
              throw new TypeError('resolver must be a function');
            }
            this.state = PENDING;
            this.queue = [];
            this.outcome = void 0;
            if (resolver !== INTERNAL) {
              safelyResolveThenable(this, resolver);
            }
          }
          Promise.prototype["catch"] = function (onRejected) {
            return this.then(null, onRejected);
          };
          Promise.prototype.then = function (onFulfilled, onRejected) {
            if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
              return this;
            }
            var promise = new this.constructor(INTERNAL);
            if (this.state !== PENDING) {
              var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
              unwrap(promise, resolver, this.outcome);
            } else {
              this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
            }
            return promise;
          };
          function QueueItem(promise, onFulfilled, onRejected) {
            this.promise = promise;
            if (typeof onFulfilled === 'function') {
              this.onFulfilled = onFulfilled;
              this.callFulfilled = this.otherCallFulfilled;
            }
            if (typeof onRejected === 'function') {
              this.onRejected = onRejected;
              this.callRejected = this.otherCallRejected;
            }
          }
          QueueItem.prototype.callFulfilled = function (value) {
            handlers.resolve(this.promise, value);
          };
          QueueItem.prototype.otherCallFulfilled = function (value) {
            unwrap(this.promise, this.onFulfilled, value);
          };
          QueueItem.prototype.callRejected = function (value) {
            handlers.reject(this.promise, value);
          };
          QueueItem.prototype.otherCallRejected = function (value) {
            unwrap(this.promise, this.onRejected, value);
          };
          function unwrap(promise, func, value) {
            immediate(function () {
              var returnValue;
              try {
                returnValue = func(value);
              } catch (e) {
                return handlers.reject(promise, e);
              }
              if (returnValue === promise) {
                handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
              } else {
                handlers.resolve(promise, returnValue);
              }
            });
          }
          handlers.resolve = function (self, value) {
            var result = tryCatch(getThen, value);
            if (result.status === 'error') {
              return handlers.reject(self, result.value);
            }
            var thenable = result.value;
            if (thenable) {
              safelyResolveThenable(self, thenable);
            } else {
              self.state = FULFILLED;
              self.outcome = value;
              var i = -1;
              var len = self.queue.length;
              while (++i < len) {
                self.queue[i].callFulfilled(value);
              }
            }
            return self;
          };
          handlers.reject = function (self, error) {
            self.state = REJECTED;
            self.outcome = error;
            var i = -1;
            var len = self.queue.length;
            while (++i < len) {
              self.queue[i].callRejected(error);
            }
            return self;
          };
          function getThen(obj) {
            // Make sure we only access the accessor once as required by the spec
            var then = obj && obj.then;
            if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
              return function appyThen() {
                then.apply(obj, arguments);
              };
            }
          }
          function safelyResolveThenable(self, thenable) {
            // Either fulfill, reject or reject with error
            var called = false;
            function onError(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.reject(self, value);
            }
            function onSuccess(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.resolve(self, value);
            }
            function tryToUnwrap() {
              thenable(onSuccess, onError);
            }
            var result = tryCatch(tryToUnwrap);
            if (result.status === 'error') {
              onError(result.value);
            }
          }
          function tryCatch(func, value) {
            var out = {};
            try {
              out.value = func(value);
              out.status = 'success';
            } catch (e) {
              out.status = 'error';
              out.value = e;
            }
            return out;
          }
          Promise.resolve = resolve;
          function resolve(value) {
            if (value instanceof this) {
              return value;
            }
            return handlers.resolve(new this(INTERNAL), value);
          }
          Promise.reject = reject;
          function reject(reason) {
            var promise = new this(INTERNAL);
            return handlers.reject(promise, reason);
          }
          Promise.all = all;
          function all(iterable) {
            var self = this;
            if (Object.prototype.toString.call(iterable) !== '[object Array]') {
              return this.reject(new TypeError('must be an array'));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var values = new Array(len);
            var resolved = 0;
            var i = -1;
            var promise = new this(INTERNAL);
            while (++i < len) {
              allResolver(iterable[i], i);
            }
            return promise;
            function allResolver(value, i) {
              self.resolve(value).then(resolveFromAll, function (error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });
              function resolveFromAll(outValue) {
                values[i] = outValue;
                if (++resolved === len && !called) {
                  called = true;
                  handlers.resolve(promise, values);
                }
              }
            }
          }
          Promise.race = race;
          function race(iterable) {
            var self = this;
            if (Object.prototype.toString.call(iterable) !== '[object Array]') {
              return this.reject(new TypeError('must be an array'));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var i = -1;
            var promise = new this(INTERNAL);
            while (++i < len) {
              resolver(iterable[i]);
            }
            return promise;
            function resolver(value) {
              self.resolve(value).then(function (response) {
                if (!called) {
                  called = true;
                  handlers.resolve(promise, response);
                }
              }, function (error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });
            }
          }
        }, {
          "1": 1
        }],
        3: [function (_dereq_, module, exports) {
          (function (global) {

            if (typeof global.Promise !== 'function') {
              global.Promise = _dereq_(2);
            }
          }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {
          "2": 2
        }],
        4: [function (_dereq_, module, exports) {

          var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
          } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function getIDB() {
            /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
            try {
              if (typeof indexedDB !== 'undefined') {
                return indexedDB;
              }
              if (typeof webkitIndexedDB !== 'undefined') {
                return webkitIndexedDB;
              }
              if (typeof mozIndexedDB !== 'undefined') {
                return mozIndexedDB;
              }
              if (typeof OIndexedDB !== 'undefined') {
                return OIndexedDB;
              }
              if (typeof msIndexedDB !== 'undefined') {
                return msIndexedDB;
              }
            } catch (e) {
              return;
            }
          }
          var idb = getIDB();
          function isIndexedDBValid() {
            try {
              // Initialize IndexedDB; fall back to vendor-prefixed versions
              // if needed.
              if (!idb || !idb.open) {
                return false;
              }
              // We mimic PouchDB here;
              //
              // We test for openDatabase because IE Mobile identifies itself
              // as Safari. Oh the lulz...
              var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
              var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

              // Safari <10.1 does not meet our requirements for IDB support
              // (see: https://github.com/pouchdb/pouchdb/issues/5572).
              // Safari 10.1 shipped with fetch, we can use that to detect it.
              // Note: this creates issues with `window.fetch` polyfills and
              // overrides; see:
              // https://github.com/localForage/localForage/issues/856
              return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
              // some outdated implementations of IDB that appear on Samsung
              // and HTC Android devices <4.4 are missing IDBKeyRange
              // See: https://github.com/mozilla/localForage/issues/128
              // See: https://github.com/mozilla/localForage/issues/272
              typeof IDBKeyRange !== 'undefined';
            } catch (e) {
              return false;
            }
          }

          // Abstracts constructing a Blob object, so it also works in older
          // browsers that don't support the native Blob constructor. (i.e.
          // old QtWebKit versions, at least).
          // Abstracts constructing a Blob object, so it also works in older
          // browsers that don't support the native Blob constructor. (i.e.
          // old QtWebKit versions, at least).
          function createBlob(parts, properties) {
            /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
            parts = parts || [];
            properties = properties || {};
            try {
              return new Blob(parts, properties);
            } catch (e) {
              if (e.name !== 'TypeError') {
                throw e;
              }
              var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
              var builder = new Builder();
              for (var i = 0; i < parts.length; i += 1) {
                builder.append(parts[i]);
              }
              return builder.getBlob(properties.type);
            }
          }

          // This is CommonJS because lie is an external dependency, so Rollup
          // can just ignore it.
          if (typeof Promise === 'undefined') {
            // In the "nopromises" build this will just throw if you don't have
            // a global promise object, but it would throw anyway later.
            _dereq_(3);
          }
          var Promise$1 = Promise;
          function executeCallback(promise, callback) {
            if (callback) {
              promise.then(function (result) {
                callback(null, result);
              }, function (error) {
                callback(error);
              });
            }
          }
          function executeTwoCallbacks(promise, callback, errorCallback) {
            if (typeof callback === 'function') {
              promise.then(callback);
            }
            if (typeof errorCallback === 'function') {
              promise["catch"](errorCallback);
            }
          }
          function normalizeKey(key) {
            // Cast the key to a string, as that's all we can set as a key.
            if (typeof key !== 'string') {
              console.warn(key + ' used as a key, but it is not a string.');
              key = String(key);
            }
            return key;
          }
          function getCallback() {
            if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
              return arguments[arguments.length - 1];
            }
          }

          // Some code originally from async_storage.js in
          // [Gaia](https://github.com/mozilla-b2g/gaia).

          var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
          var supportsBlobs = void 0;
          var dbContexts = {};
          var toString = Object.prototype.toString;

          // Transaction Modes
          var READ_ONLY = 'readonly';
          var READ_WRITE = 'readwrite';

          // Transform a binary string to an array buffer, because otherwise
          // weird stuff happens when you try to work with the binary string directly.
          // It is known.
          // From http://stackoverflow.com/questions/14967647/ (continues on next line)
          // encode-decode-image-with-base64-breaks-image (2013-04-21)
          function _binStringToArrayBuffer(bin) {
            var length = bin.length;
            var buf = new ArrayBuffer(length);
            var arr = new Uint8Array(buf);
            for (var i = 0; i < length; i++) {
              arr[i] = bin.charCodeAt(i);
            }
            return buf;
          }

          //
          // Blobs are not supported in all versions of IndexedDB, notably
          // Chrome <37 and Android <5. In those versions, storing a blob will throw.
          //
          // Various other blob bugs exist in Chrome v37-42 (inclusive).
          // Detecting them is expensive and confusing to users, and Chrome 37-42
          // is at very low usage worldwide, so we do a hacky userAgent check instead.
          //
          // content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
          // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
          // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
          //
          // Code borrowed from PouchDB. See:
          // https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
          //
          function _checkBlobSupportWithoutCaching(idb) {
            return new Promise$1(function (resolve) {
              var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
              var blob = createBlob(['']);
              txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');
              txn.onabort = function (e) {
                // If the transaction aborts now its due to not being able to
                // write to the database, likely due to the disk being full
                e.preventDefault();
                e.stopPropagation();
                resolve(false);
              };
              txn.oncomplete = function () {
                var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                var matchedEdge = navigator.userAgent.match(/Edge\//);
                // MS Edge pretends to be Chrome 42:
                // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
                resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
              };
            })["catch"](function () {
              return false; // error, so assume unsupported
            });
          }

          function _checkBlobSupport(idb) {
            if (typeof supportsBlobs === 'boolean') {
              return Promise$1.resolve(supportsBlobs);
            }
            return _checkBlobSupportWithoutCaching(idb).then(function (value) {
              supportsBlobs = value;
              return supportsBlobs;
            });
          }
          function _deferReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];

            // Create a deferred object representing the current database operation.
            var deferredOperation = {};
            deferredOperation.promise = new Promise$1(function (resolve, reject) {
              deferredOperation.resolve = resolve;
              deferredOperation.reject = reject;
            });

            // Enqueue the deferred operation.
            dbContext.deferredOperations.push(deferredOperation);

            // Chain its promise to the database readiness.
            if (!dbContext.dbReady) {
              dbContext.dbReady = deferredOperation.promise;
            } else {
              dbContext.dbReady = dbContext.dbReady.then(function () {
                return deferredOperation.promise;
              });
            }
          }
          function _advanceReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];

            // Dequeue a deferred operation.
            var deferredOperation = dbContext.deferredOperations.pop();

            // Resolve its promise (which is part of the database readiness
            // chain of promises).
            if (deferredOperation) {
              deferredOperation.resolve();
              return deferredOperation.promise;
            }
          }
          function _rejectReadiness(dbInfo, err) {
            var dbContext = dbContexts[dbInfo.name];

            // Dequeue a deferred operation.
            var deferredOperation = dbContext.deferredOperations.pop();

            // Reject its promise (which is part of the database readiness
            // chain of promises).
            if (deferredOperation) {
              deferredOperation.reject(err);
              return deferredOperation.promise;
            }
          }
          function _getConnection(dbInfo, upgradeNeeded) {
            return new Promise$1(function (resolve, reject) {
              dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
              if (dbInfo.db) {
                if (upgradeNeeded) {
                  _deferReadiness(dbInfo);
                  dbInfo.db.close();
                } else {
                  return resolve(dbInfo.db);
                }
              }
              var dbArgs = [dbInfo.name];
              if (upgradeNeeded) {
                dbArgs.push(dbInfo.version);
              }
              var openreq = idb.open.apply(idb, dbArgs);
              if (upgradeNeeded) {
                openreq.onupgradeneeded = function (e) {
                  var db = openreq.result;
                  try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                      // Added when support for blob shims was added
                      db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                  } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                      console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                      throw ex;
                    }
                  }
                };
              }
              openreq.onerror = function (e) {
                e.preventDefault();
                reject(openreq.error);
              };
              openreq.onsuccess = function () {
                var db = openreq.result;
                db.onversionchange = function (e) {
                  // Triggered when the database is modified (e.g. adding an objectStore) or
                  // deleted (even when initiated by other sessions in different tabs).
                  // Closing the connection here prevents those operations from being blocked.
                  // If the database is accessed again later by this instance, the connection
                  // will be reopened or the database recreated as needed.
                  e.target.close();
                };
                resolve(db);
                _advanceReadiness(dbInfo);
              };
            });
          }
          function _getOriginalConnection(dbInfo) {
            return _getConnection(dbInfo, false);
          }
          function _getUpgradedConnection(dbInfo) {
            return _getConnection(dbInfo, true);
          }
          function _isUpgradeNeeded(dbInfo, defaultVersion) {
            if (!dbInfo.db) {
              return true;
            }
            var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
            var isDowngrade = dbInfo.version < dbInfo.db.version;
            var isUpgrade = dbInfo.version > dbInfo.db.version;
            if (isDowngrade) {
              // If the version is not the default one
              // then warn for impossible downgrade.
              if (dbInfo.version !== defaultVersion) {
                console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
              }
              // Align the versions to prevent errors.
              dbInfo.version = dbInfo.db.version;
            }
            if (isUpgrade || isNewStore) {
              // If the store is new then increment the version (if needed).
              // This will trigger an "upgradeneeded" event which is required
              // for creating a store.
              if (isNewStore) {
                var incVersion = dbInfo.db.version + 1;
                if (incVersion > dbInfo.version) {
                  dbInfo.version = incVersion;
                }
              }
              return true;
            }
            return false;
          }

          // encode a blob for indexeddb engines that don't support blobs
          function _encodeBlob(blob) {
            return new Promise$1(function (resolve, reject) {
              var reader = new FileReader();
              reader.onerror = reject;
              reader.onloadend = function (e) {
                var base64 = btoa(e.target.result || '');
                resolve({
                  __local_forage_encoded_blob: true,
                  data: base64,
                  type: blob.type
                });
              };
              reader.readAsBinaryString(blob);
            });
          }

          // decode an encoded blob
          function _decodeBlob(encodedBlob) {
            var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
            return createBlob([arrayBuff], {
              type: encodedBlob.type
            });
          }

          // is this one of our fancy encoded blobs?
          function _isEncodedBlob(value) {
            return value && value.__local_forage_encoded_blob;
          }

          // Specialize the default `ready()` function by making it dependent
          // on the current database operations. Thus, the driver will be actually
          // ready when it's been initialized (default) *and* there are no pending
          // operations on the database (initiated by some other instances).
          function _fullyReady(callback) {
            var self = this;
            var promise = self._initReady().then(function () {
              var dbContext = dbContexts[self._dbInfo.name];
              if (dbContext && dbContext.dbReady) {
                return dbContext.dbReady;
              }
            });
            executeTwoCallbacks(promise, callback, callback);
            return promise;
          }

          // Try to establish a new db connection to replace the
          // current one which is broken (i.e. experiencing
          // InvalidStateError while creating a transaction).
          function _tryReconnect(dbInfo) {
            _deferReadiness(dbInfo);
            var dbContext = dbContexts[dbInfo.name];
            var forages = dbContext.forages;
            for (var i = 0; i < forages.length; i++) {
              var forage = forages[i];
              if (forage._dbInfo.db) {
                forage._dbInfo.db.close();
                forage._dbInfo.db = null;
              }
            }
            dbInfo.db = null;
            return _getOriginalConnection(dbInfo).then(function (db) {
              dbInfo.db = db;
              if (_isUpgradeNeeded(dbInfo)) {
                // Reopen the database for upgrading.
                return _getUpgradedConnection(dbInfo);
              }
              return db;
            }).then(function (db) {
              // store the latest db reference
              // in case the db was upgraded
              dbInfo.db = dbContext.db = db;
              for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
              }
            })["catch"](function (err) {
              _rejectReadiness(dbInfo, err);
              throw err;
            });
          }

          // FF doesn't like Promises (micro-tasks) and IDDB store operations,
          // so we have to do it with callbacks
          function createTransaction(dbInfo, mode, callback, retries) {
            if (retries === undefined) {
              retries = 1;
            }
            try {
              var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
              callback(null, tx);
            } catch (err) {
              if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
                return Promise$1.resolve().then(function () {
                  if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                      dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                  }
                }).then(function () {
                  return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                  });
                })["catch"](callback);
              }
              callback(err);
            }
          }
          function createDbContext() {
            return {
              // Running localForages sharing a database.
              forages: [],
              // Shared database.
              db: null,
              // Database readiness (promise).
              dbReady: null,
              // Deferred operations on the database.
              deferredOperations: []
            };
          }

          // Open the IndexedDB database (automatically creates one if one didn't
          // previously exist), using any options set in the config.
          function _initStorage(options) {
            var self = this;
            var dbInfo = {
              db: null
            };
            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            }

            // Get the current context of the database;
            var dbContext = dbContexts[dbInfo.name];

            // ...or create a new context.
            if (!dbContext) {
              dbContext = createDbContext();
              // Register the new context in the global container.
              dbContexts[dbInfo.name] = dbContext;
            }

            // Register itself as a running localForage in the current context.
            dbContext.forages.push(self);

            // Replace the default `ready()` function with the specialized one.
            if (!self._initReady) {
              self._initReady = self.ready;
              self.ready = _fullyReady;
            }

            // Create an array of initialization states of the related localForages.
            var initPromises = [];
            function ignoreErrors() {
              // Don't handle errors here,
              // just makes sure related localForages aren't pending.
              return Promise$1.resolve();
            }
            for (var j = 0; j < dbContext.forages.length; j++) {
              var forage = dbContext.forages[j];
              if (forage !== self) {
                // Don't wait for itself...
                initPromises.push(forage._initReady()["catch"](ignoreErrors));
              }
            }

            // Take a snapshot of the related localForages.
            var forages = dbContext.forages.slice(0);

            // Initialize the connection process only when
            // all the related localForages aren't pending.
            return Promise$1.all(initPromises).then(function () {
              dbInfo.db = dbContext.db;
              // Get the connection or open a new one without upgrade.
              return _getOriginalConnection(dbInfo);
            }).then(function (db) {
              dbInfo.db = db;
              if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
                // Reopen the database for upgrading.
                return _getUpgradedConnection(dbInfo);
              }
              return db;
            }).then(function (db) {
              dbInfo.db = dbContext.db = db;
              self._dbInfo = dbInfo;
              // Share the final connection amongst related localForages.
              for (var k = 0; k < forages.length; k++) {
                var forage = forages[k];
                if (forage !== self) {
                  // Self is already up-to-date.
                  forage._dbInfo.db = dbInfo.db;
                  forage._dbInfo.version = dbInfo.version;
                }
              }
            });
          }
          function getItem(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);
                    req.onsuccess = function () {
                      var value = req.result;
                      if (value === undefined) {
                        value = null;
                      }
                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }
                      resolve(value);
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Iterate over all items stored in database.
          function iterate(iterator, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;
                    req.onsuccess = function () {
                      var cursor = req.result;
                      if (cursor) {
                        var value = cursor.value;
                        if (_isEncodedBlob(value)) {
                          value = _decodeBlob(value);
                        }
                        var result = iterator(value, cursor.key, iterationNumber++);

                        // when the iterator callback returns any
                        // (non-`undefined`) value, then we stop
                        // the iteration immediately
                        if (result !== void 0) {
                          resolve(result);
                        } else {
                          cursor["continue"]();
                        }
                      } else {
                        resolve();
                      }
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem(key, value, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              var dbInfo;
              self.ready().then(function () {
                dbInfo = self._dbInfo;
                if (toString.call(value) === '[object Blob]') {
                  return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                      return value;
                    }
                    return _encodeBlob(value);
                  });
                }
                return value;
              }).then(function (value) {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                      value = undefined;
                    }
                    var req = store.put(value, key);
                    transaction.oncomplete = function () {
                      // Cast to undefined so the value passed to
                      // callback/promise is the same as what one would get out
                      // of `getItem()` later. This leads to some weirdness
                      // (setItem('foo', undefined) will return `null`), but
                      // it's not my fault localStorage is our baseline and that
                      // it's weird.
                      if (value === undefined) {
                        value = null;
                      }
                      resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                      var err = req.error ? req.error : req.transaction.error;
                      reject(err);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function removeItem(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                      resolve();
                    };
                    transaction.onerror = function () {
                      reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                      var err = req.error ? req.error : req.transaction.error;
                      reject(err);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function clear(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();
                    transaction.oncomplete = function () {
                      resolve();
                    };
                    transaction.onabort = transaction.onerror = function () {
                      var err = req.error ? req.error : req.transaction.error;
                      reject(err);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();
                    req.onsuccess = function () {
                      resolve(req.result);
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key(n, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              if (n < 0) {
                resolve(null);
                return;
              }
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();
                    req.onsuccess = function () {
                      var cursor = req.result;
                      if (!cursor) {
                        // this means there weren't enough keys
                        resolve(null);
                        return;
                      }
                      if (n === 0) {
                        // We have the first key, return it if that's what they
                        // wanted.
                        resolve(cursor.key);
                      } else {
                        if (!advanced) {
                          // Otherwise, ask the cursor to skip ahead n
                          // records.
                          advanced = true;
                          cursor.advance(n);
                        } else {
                          // When we get here, we've got the nth key.
                          resolve(cursor.key);
                        }
                      }
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];
                    req.onsuccess = function () {
                      var cursor = req.result;
                      if (!cursor) {
                        resolve(keys);
                        return;
                      }
                      keys.push(cursor.key);
                      cursor["continue"]();
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function dropInstance(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== 'function' && options || {};
            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject('Invalid arguments');
            } else {
              var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;
              var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                dbContext.db = db;
                for (var i = 0; i < forages.length; i++) {
                  forages[i]._dbInfo.db = db;
                }
                return db;
              });
              if (!options.storeName) {
                promise = dbPromise.then(function (db) {
                  _deferReadiness(options);
                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();
                  for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                  }
                  var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);
                    req.onerror = function () {
                      var db = req.result;
                      if (db) {
                        db.close();
                      }
                      reject(req.error);
                    };
                    req.onblocked = function () {
                      // Closing all open connections in onversionchange handler should prevent this situation, but if
                      // we do get here, it just means the request remains pending - eventually it will succeed or error
                      console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };
                    req.onsuccess = function () {
                      var db = req.result;
                      if (db) {
                        db.close();
                      }
                      resolve(db);
                    };
                  });
                  return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                      var _forage = forages[i];
                      _advanceReadiness(_forage._dbInfo);
                    }
                  })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                  });
                });
              } else {
                promise = dbPromise.then(function (db) {
                  if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                  }
                  var newVersion = db.version + 1;
                  _deferReadiness(options);
                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();
                  for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                  }
                  var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);
                    req.onerror = function (err) {
                      var db = req.result;
                      db.close();
                      reject(err);
                    };
                    req.onupgradeneeded = function () {
                      var db = req.result;
                      db.deleteObjectStore(options.storeName);
                    };
                    req.onsuccess = function () {
                      var db = req.result;
                      db.close();
                      resolve(db);
                    };
                  });
                  return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                      var _forage2 = forages[j];
                      _forage2._dbInfo.db = db;
                      _advanceReadiness(_forage2._dbInfo);
                    }
                  })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                  });
                });
              }
            }
            executeCallback(promise, callback);
            return promise;
          }
          var asyncStorage = {
            _driver: 'asyncStorage',
            _initStorage: _initStorage,
            _support: isIndexedDBValid(),
            iterate: iterate,
            getItem: getItem,
            setItem: setItem,
            removeItem: removeItem,
            clear: clear,
            length: length,
            key: key,
            keys: keys,
            dropInstance: dropInstance
          };
          function isWebSQLValid() {
            return typeof openDatabase === 'function';
          }

          // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
          // it to Base64, so this is how we store it to prevent very strange errors with less
          // verbose ways of binary <-> string data storage.
          var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
          var BLOB_TYPE_PREFIX = '~~local_forage_type~';
          var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
          var SERIALIZED_MARKER = '__lfsc__:';
          var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

          // OMG the serializations!
          var TYPE_ARRAYBUFFER = 'arbf';
          var TYPE_BLOB = 'blob';
          var TYPE_INT8ARRAY = 'si08';
          var TYPE_UINT8ARRAY = 'ui08';
          var TYPE_UINT8CLAMPEDARRAY = 'uic8';
          var TYPE_INT16ARRAY = 'si16';
          var TYPE_INT32ARRAY = 'si32';
          var TYPE_UINT16ARRAY = 'ur16';
          var TYPE_UINT32ARRAY = 'ui32';
          var TYPE_FLOAT32ARRAY = 'fl32';
          var TYPE_FLOAT64ARRAY = 'fl64';
          var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
          var toString$1 = Object.prototype.toString;
          function stringToBuffer(serializedString) {
            // Fill the string into a ArrayBuffer.
            var bufferLength = serializedString.length * 0.75;
            var len = serializedString.length;
            var i;
            var p = 0;
            var encoded1, encoded2, encoded3, encoded4;
            if (serializedString[serializedString.length - 1] === '=') {
              bufferLength--;
              if (serializedString[serializedString.length - 2] === '=') {
                bufferLength--;
              }
            }
            var buffer = new ArrayBuffer(bufferLength);
            var bytes = new Uint8Array(buffer);
            for (i = 0; i < len; i += 4) {
              encoded1 = BASE_CHARS.indexOf(serializedString[i]);
              encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
              encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
              encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

              /*jslint bitwise: true */
              bytes[p++] = encoded1 << 2 | encoded2 >> 4;
              bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
              bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
            }
            return buffer;
          }

          // Converts a buffer to a string to store, serialized, in the backend
          // storage library.
          function bufferToString(buffer) {
            // base64-arraybuffer
            var bytes = new Uint8Array(buffer);
            var base64String = '';
            var i;
            for (i = 0; i < bytes.length; i += 3) {
              /*jslint bitwise: true */
              base64String += BASE_CHARS[bytes[i] >> 2];
              base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
              base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
              base64String += BASE_CHARS[bytes[i + 2] & 63];
            }
            if (bytes.length % 3 === 2) {
              base64String = base64String.substring(0, base64String.length - 1) + '=';
            } else if (bytes.length % 3 === 1) {
              base64String = base64String.substring(0, base64String.length - 2) + '==';
            }
            return base64String;
          }

          // Serialize a value, afterwards executing a callback (which usually
          // instructs the `setItem()` callback/promise to be executed). This is how
          // we store binary data with localStorage.
          function serialize(value, callback) {
            var valueType = '';
            if (value) {
              valueType = toString$1.call(value);
            }

            // Cannot use `value instanceof ArrayBuffer` or such here, as these
            // checks fail when running the tests using casper.js...
            //
            // TODO: See why those tests fail and use a better solution.
            if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
              // Convert binary arrays to a string and prefix the string with
              // a special marker.
              var buffer;
              var marker = SERIALIZED_MARKER;
              if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
              } else {
                buffer = value.buffer;
                if (valueType === '[object Int8Array]') {
                  marker += TYPE_INT8ARRAY;
                } else if (valueType === '[object Uint8Array]') {
                  marker += TYPE_UINT8ARRAY;
                } else if (valueType === '[object Uint8ClampedArray]') {
                  marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueType === '[object Int16Array]') {
                  marker += TYPE_INT16ARRAY;
                } else if (valueType === '[object Uint16Array]') {
                  marker += TYPE_UINT16ARRAY;
                } else if (valueType === '[object Int32Array]') {
                  marker += TYPE_INT32ARRAY;
                } else if (valueType === '[object Uint32Array]') {
                  marker += TYPE_UINT32ARRAY;
                } else if (valueType === '[object Float32Array]') {
                  marker += TYPE_FLOAT32ARRAY;
                } else if (valueType === '[object Float64Array]') {
                  marker += TYPE_FLOAT64ARRAY;
                } else {
                  callback(new Error('Failed to get type for BinaryArray'));
                }
              }
              callback(marker + bufferToString(buffer));
            } else if (valueType === '[object Blob]') {
              // Conver the blob to a binaryArray and then to a string.
              var fileReader = new FileReader();
              fileReader.onload = function () {
                // Backwards-compatible prefix for the blob type.
                var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
              };
              fileReader.readAsArrayBuffer(value);
            } else {
              try {
                callback(JSON.stringify(value));
              } catch (e) {
                console.error("Couldn't convert value into a JSON string: ", value);
                callback(null, e);
              }
            }
          }

          // Deserialize data we've inserted into a value column/field. We place
          // special markers into our strings to mark them as encoded; this isn't
          // as nice as a meta field, but it's the only sane thing we can do whilst
          // keeping localStorage support intact.
          //
          // Oftentimes this will just deserialize JSON content, but if we have a
          // special marker (SERIALIZED_MARKER, defined above), we will extract
          // some kind of arraybuffer/binary data/typed array out of the string.
          function deserialize(value) {
            // If we haven't marked this string as being specially serialized (i.e.
            // something other than serialized JSON), we can just return it and be
            // done with it.
            if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
              return JSON.parse(value);
            }

            // The following code deals with deserializing some kind of Blob or
            // TypedArray. First we separate out the type of data we're dealing
            // with from the data itself.
            var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
            var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
            var blobType;
            // Backwards-compatible blob type serialization strategy.
            // DBs created with older versions of localForage will simply not have the blob type.
            if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
              var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
              blobType = matcher[1];
              serializedString = serializedString.substring(matcher[0].length);
            }
            var buffer = stringToBuffer(serializedString);

            // Return the right type based on the code/type set during
            // serialization.
            switch (type) {
              case TYPE_ARRAYBUFFER:
                return buffer;
              case TYPE_BLOB:
                return createBlob([buffer], {
                  type: blobType
                });
              case TYPE_INT8ARRAY:
                return new Int8Array(buffer);
              case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);
              case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);
              case TYPE_INT16ARRAY:
                return new Int16Array(buffer);
              case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);
              case TYPE_INT32ARRAY:
                return new Int32Array(buffer);
              case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);
              case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);
              case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);
              default:
                throw new Error('Unkown type: ' + type);
            }
          }
          var localforageSerializer = {
            serialize: serialize,
            deserialize: deserialize,
            stringToBuffer: stringToBuffer,
            bufferToString: bufferToString
          };

          /*
           * Includes code from:
           *
           * base64-arraybuffer
           * https://github.com/niklasvh/base64-arraybuffer
           *
           * Copyright (c) 2012 Niklas von Hertzen
           * Licensed under the MIT license.
           */

          function createDbTable(t, dbInfo, callback, errorCallback) {
            t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
          }

          // Open the WebSQL database (automatically creates one if one didn't
          // previously exist), using any options set in the config.
          function _initStorage$1(options) {
            var self = this;
            var dbInfo = {
              db: null
            };
            if (options) {
              for (var i in options) {
                dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
              }
            }
            var dbInfoPromise = new Promise$1(function (resolve, reject) {
              // Open the database; the openDatabase API will automatically
              // create it for us if it doesn't exist.
              try {
                dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
              } catch (e) {
                return reject(e);
              }

              // Create our key/value table if it doesn't exist.
              dbInfo.db.transaction(function (t) {
                createDbTable(t, dbInfo, function () {
                  self._dbInfo = dbInfo;
                  resolve();
                }, function (t, error) {
                  reject(error);
                });
              }, reject);
            });
            dbInfo.serializer = localforageSerializer;
            return dbInfoPromise;
          }
          function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
            t.executeSql(sqlStatement, args, callback, function (t, error) {
              if (error.code === error.SYNTAX_ERR) {
                t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                  if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                      t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                  } else {
                    errorCallback(t, error);
                  }
                }, errorCallback);
              } else {
                errorCallback(t, error);
              }
            }, errorCallback);
          }
          function getItem$1(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    resolve(result);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate$1(iterator, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                      var item = rows.item(i);
                      var result = item.value;

                      // Check to see if this is serialized content
                      // we need to unpack.
                      if (result) {
                        result = dbInfo.serializer.deserialize(result);
                      }
                      result = iterator(result, item.key, i + 1);

                      // void(0) prevents problems with redefinition
                      // of `undefined`.
                      if (result !== void 0) {
                        resolve(result);
                        return;
                      }
                    }
                    resolve();
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function _setItem(key, value, callback, retriesLeft) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                // The localStorage API doesn't return undefined values in an
                // "expected" way, so undefined is always cast to null in all
                // drivers. See: https://github.com/mozilla/localForage/pull/42
                if (value === undefined) {
                  value = null;
                }

                // Save the original value to pass to the callback.
                var originalValue = value;
                var dbInfo = self._dbInfo;
                dbInfo.serializer.serialize(value, function (value, error) {
                  if (error) {
                    reject(error);
                  } else {
                    dbInfo.db.transaction(function (t) {
                      tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                        resolve(originalValue);
                      }, function (t, error) {
                        reject(error);
                      });
                    }, function (sqlError) {
                      // The transaction failed; check
                      // to see if it's a quota error.
                      if (sqlError.code === sqlError.QUOTA_ERR) {
                        // We reject the callback outright for now, but
                        // it's worth trying to re-run the transaction.
                        // Even if the user accepts the prompt to use
                        // more storage on Safari, this error will
                        // be called.
                        //
                        // Try to re-run the transaction.
                        if (retriesLeft > 0) {
                          resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                          return;
                        }
                        reject(sqlError);
                      }
                    });
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem$1(key, value, callback) {
            return _setItem.apply(this, [key, value, callback, 1]);
          }
          function removeItem$1(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Deletes every item in the table.
          // TODO: Find out if this resets the AUTO_INCREMENT number.
          function clear$1(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Does a simple `COUNT(key)` to get the number of items stored in
          // localForage.
          function length$1(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  // Ahhh, SQL makes this one soooooo easy.
                  tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Return the key located at key index X; essentially gets the key from a
          // `WHERE id = ?`. This is the most efficient way I can think to implement
          // this rarely-used (in my experience) part of the API, but it can seem
          // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
          // the ID of each key will change every time it's updated. Perhaps a stored
          // procedure for the `setItem()` SQL would solve this problem?
          // TODO: Don't change ID on `setItem()`.
          function key$1(n, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$1(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];
                    for (var i = 0; i < results.rows.length; i++) {
                      keys.push(results.rows.item(i).key);
                    }
                    resolve(keys);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }

          // https://www.w3.org/TR/webdatabase/#databases
          // > There is no way to enumerate or delete the databases available for an origin from this API.
          function getAllStoreNames(db) {
            return new Promise$1(function (resolve, reject) {
              db.transaction(function (t) {
                t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                  var storeNames = [];
                  for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                  }
                  resolve({
                    db: db,
                    storeNames: storeNames
                  });
                }, function (t, error) {
                  reject(error);
                });
              }, function (sqlError) {
                reject(sqlError);
              });
            });
          }
          function dropInstance$1(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== 'function' && options || {};
            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject('Invalid arguments');
            } else {
              promise = new Promise$1(function (resolve) {
                var db;
                if (options.name === currentConfig.name) {
                  // use the db reference of the current instance
                  db = self._dbInfo.db;
                } else {
                  db = openDatabase(options.name, '', '', 0);
                }
                if (!options.storeName) {
                  // drop all database tables
                  resolve(getAllStoreNames(db));
                } else {
                  resolve({
                    db: db,
                    storeNames: [options.storeName]
                  });
                }
              }).then(function (operationInfo) {
                return new Promise$1(function (resolve, reject) {
                  operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                      return new Promise$1(function (resolve, reject) {
                        t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                          resolve();
                        }, function (t, error) {
                          reject(error);
                        });
                      });
                    }
                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                      operations.push(dropTable(operationInfo.storeNames[i]));
                    }
                    Promise$1.all(operations).then(function () {
                      resolve();
                    })["catch"](function (e) {
                      reject(e);
                    });
                  }, function (sqlError) {
                    reject(sqlError);
                  });
                });
              });
            }
            executeCallback(promise, callback);
            return promise;
          }
          var webSQLStorage = {
            _driver: 'webSQLStorage',
            _initStorage: _initStorage$1,
            _support: isWebSQLValid(),
            iterate: iterate$1,
            getItem: getItem$1,
            setItem: setItem$1,
            removeItem: removeItem$1,
            clear: clear$1,
            length: length$1,
            key: key$1,
            keys: keys$1,
            dropInstance: dropInstance$1
          };
          function isLocalStorageValid() {
            try {
              return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
              // in IE8 typeof localStorage.setItem === 'object'
              !!localStorage.setItem;
            } catch (e) {
              return false;
            }
          }
          function _getKeyPrefix(options, defaultConfig) {
            var keyPrefix = options.name + '/';
            if (options.storeName !== defaultConfig.storeName) {
              keyPrefix += options.storeName + '/';
            }
            return keyPrefix;
          }

          // Check if localStorage throws when saving an item
          function checkIfLocalStorageThrows() {
            var localStorageTestKey = '_localforage_support_test';
            try {
              localStorage.setItem(localStorageTestKey, true);
              localStorage.removeItem(localStorageTestKey);
              return false;
            } catch (e) {
              return true;
            }
          }

          // Check if localStorage is usable and allows to save an item
          // This method checks if localStorage is usable in Safari Private Browsing
          // mode, or in any other case where the available quota for localStorage
          // is 0 and there wasn't any saved items yet.
          function _isLocalStorageUsable() {
            return !checkIfLocalStorageThrows() || localStorage.length > 0;
          }

          // Config the localStorage backend, using options set in the config.
          function _initStorage$2(options) {
            var self = this;
            var dbInfo = {};
            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            }
            dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);
            if (!_isLocalStorageUsable()) {
              return Promise$1.reject();
            }
            self._dbInfo = dbInfo;
            dbInfo.serializer = localforageSerializer;
            return Promise$1.resolve();
          }

          // Remove all keys from the datastore, effectively destroying all data in
          // the app's key/value store!
          function clear$2(callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var keyPrefix = self._dbInfo.keyPrefix;
              for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);
                if (key.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key);
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Retrieve an item from the store. Unlike the original async_storage
          // library in Gaia, we don't modify return values at all. If a key's value
          // is `undefined`, we pass that value to the callback function.
          function getItem$2(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var result = localStorage.getItem(dbInfo.keyPrefix + key);

              // If a result was found, parse it from the serialized
              // string into a JS object. If result isn't truthy, the key
              // is likely undefined and we'll pass it straight to the
              // callback.
              if (result) {
                result = dbInfo.serializer.deserialize(result);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Iterate over all items in the store.
          function iterate$2(iterator, callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var keyPrefix = dbInfo.keyPrefix;
              var keyPrefixLength = keyPrefix.length;
              var length = localStorage.length;

              // We use a dedicated iterator instead of the `i` variable below
              // so other keys we fetch in localStorage aren't counted in
              // the `iterationNumber` argument passed to the `iterate()`
              // callback.
              //
              // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
              var iterationNumber = 1;
              for (var i = 0; i < length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(keyPrefix) !== 0) {
                  continue;
                }
                var value = localStorage.getItem(key);

                // If a result was found, parse it from the serialized
                // string into a JS object. If result isn't truthy, the
                // key is likely undefined and we'll pass it straight
                // to the iterator.
                if (value) {
                  value = dbInfo.serializer.deserialize(value);
                }
                value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
                if (value !== void 0) {
                  return value;
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Same as localStorage's key() method, except takes a callback.
          function key$2(n, callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var result;
              try {
                result = localStorage.key(n);
              } catch (error) {
                result = null;
              }

              // Remove the prefix from the key, if a key is found.
              if (result) {
                result = result.substring(dbInfo.keyPrefix.length);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$2(callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var length = localStorage.length;
              var keys = [];
              for (var i = 0; i < length; i++) {
                var itemKey = localStorage.key(i);
                if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                  keys.push(itemKey.substring(dbInfo.keyPrefix.length));
                }
              }
              return keys;
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Supply the number of keys in the datastore to the callback function.
          function length$2(callback) {
            var self = this;
            var promise = self.keys().then(function (keys) {
              return keys.length;
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Remove an item from the store, nice and simple.
          function removeItem$2(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              localStorage.removeItem(dbInfo.keyPrefix + key);
            });
            executeCallback(promise, callback);
            return promise;
          }

          // Set a key's value and run an optional callback once the value is set.
          // Unlike Gaia's implementation, the callback function is passed the value,
          // in case you want to operate on that value only after you're sure it
          // saved, or something like that.
          function setItem$2(key, value, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = self.ready().then(function () {
              // Convert undefined values to null.
              // https://github.com/mozilla/localForage/pull/42
              if (value === undefined) {
                value = null;
              }

              // Save the original value to pass to the callback.
              var originalValue = value;
              return new Promise$1(function (resolve, reject) {
                var dbInfo = self._dbInfo;
                dbInfo.serializer.serialize(value, function (value, error) {
                  if (error) {
                    reject(error);
                  } else {
                    try {
                      localStorage.setItem(dbInfo.keyPrefix + key, value);
                      resolve(originalValue);
                    } catch (e) {
                      // localStorage capacity exceeded.
                      // TODO: Make this a specific error/event.
                      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        reject(e);
                      }
                      reject(e);
                    }
                  }
                });
              });
            });
            executeCallback(promise, callback);
            return promise;
          }
          function dropInstance$2(options, callback) {
            callback = getCallback.apply(this, arguments);
            options = typeof options !== 'function' && options || {};
            if (!options.name) {
              var currentConfig = this.config();
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject('Invalid arguments');
            } else {
              promise = new Promise$1(function (resolve) {
                if (!options.storeName) {
                  resolve(options.name + '/');
                } else {
                  resolve(_getKeyPrefix(options, self._defaultConfig));
                }
              }).then(function (keyPrefix) {
                for (var i = localStorage.length - 1; i >= 0; i--) {
                  var key = localStorage.key(i);
                  if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                  }
                }
              });
            }
            executeCallback(promise, callback);
            return promise;
          }
          var localStorageWrapper = {
            _driver: 'localStorageWrapper',
            _initStorage: _initStorage$2,
            _support: isLocalStorageValid(),
            iterate: iterate$2,
            getItem: getItem$2,
            setItem: setItem$2,
            removeItem: removeItem$2,
            clear: clear$2,
            length: length$2,
            key: key$2,
            keys: keys$2,
            dropInstance: dropInstance$2
          };
          var sameValue = function sameValue(x, y) {
            return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
          };
          var includes = function includes(array, searchElement) {
            var len = array.length;
            var i = 0;
            while (i < len) {
              if (sameValue(array[i], searchElement)) {
                return true;
              }
              i++;
            }
            return false;
          };
          var isArray = Array.isArray || function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
          };

          // Drivers are stored here when `defineDriver()` is called.
          // They are shared across all instances of localForage.
          var DefinedDrivers = {};
          var DriverSupport = {};
          var DefaultDrivers = {
            INDEXEDDB: asyncStorage,
            WEBSQL: webSQLStorage,
            LOCALSTORAGE: localStorageWrapper
          };
          var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
          var OptionalDriverMethods = ['dropInstance'];
          var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);
          var DefaultConfig = {
            description: '',
            driver: DefaultDriverOrder.slice(),
            name: 'localforage',
            // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
            // we can use without a prompt.
            size: 4980736,
            storeName: 'keyvaluepairs',
            version: 1.0
          };
          function callWhenReady(localForageInstance, libraryMethod) {
            localForageInstance[libraryMethod] = function () {
              var _args = arguments;
              return localForageInstance.ready().then(function () {
                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
              });
            };
          }
          function extend() {
            for (var i = 1; i < arguments.length; i++) {
              var arg = arguments[i];
              if (arg) {
                for (var _key in arg) {
                  if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                      arguments[0][_key] = arg[_key].slice();
                    } else {
                      arguments[0][_key] = arg[_key];
                    }
                  }
                }
              }
            }
            return arguments[0];
          }
          var LocalForage = function () {
            function LocalForage(options) {
              _classCallCheck(this, LocalForage);
              for (var driverTypeKey in DefaultDrivers) {
                if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                  var driver = DefaultDrivers[driverTypeKey];
                  var driverName = driver._driver;
                  this[driverTypeKey] = driverName;
                  if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                  }
                }
              }
              this._defaultConfig = extend({}, DefaultConfig);
              this._config = extend({}, this._defaultConfig, options);
              this._driverSet = null;
              this._initDriver = null;
              this._ready = false;
              this._dbInfo = null;
              this._wrapLibraryMethodsWithReady();
              this.setDriver(this._config.driver)["catch"](function () {});
            }

            // Set any config values for localForage; can be called anytime before
            // the first API call (e.g. `getItem`, `setItem`).
            // We loop through options so we don't overwrite existing config
            // values.

            LocalForage.prototype.config = function config(options) {
              // If the options argument is an object, we use it to set values.
              // Otherwise, we return either a specified config value or all
              // config values.
              if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                // If localforage is ready and fully initialized, we can't set
                // any new configuration values. Instead, we return an error.
                if (this._ready) {
                  return new Error("Can't call config() after localforage " + 'has been used.');
                }
                for (var i in options) {
                  if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                  }
                  if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                  }
                  this._config[i] = options[i];
                }

                // after all config options are set and
                // the driver option is used, try setting it
                if ('driver' in options && options.driver) {
                  return this.setDriver(this._config.driver);
                }
                return true;
              } else if (typeof options === 'string') {
                return this._config[options];
              } else {
                return this._config;
              }
            };

            // Used to define a custom driver, shared across all instances of
            // localForage.

            LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
              var promise = new Promise$1(function (resolve, reject) {
                try {
                  var driverName = driverObject._driver;
                  var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                  // A driver name should be defined and not overlap with the
                  // library-defined, default drivers.
                  if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                  }
                  var driverMethods = LibraryMethods.concat('_initStorage');
                  for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                      reject(complianceError);
                      return;
                    }
                  }
                  var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                      return function () {
                        var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                        var promise = Promise$1.reject(error);
                        executeCallback(promise, arguments[arguments.length - 1]);
                        return promise;
                      };
                    };
                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                      var optionalDriverMethod = OptionalDriverMethods[_i];
                      if (!driverObject[optionalDriverMethod]) {
                        driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                      }
                    }
                  };
                  configureMissingMethods();
                  var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                      console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                  };
                  if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                      driverObject._support().then(setDriverSupport, reject);
                    } else {
                      setDriverSupport(!!driverObject._support);
                    }
                  } else {
                    setDriverSupport(true);
                  }
                } catch (e) {
                  reject(e);
                }
              });
              executeTwoCallbacks(promise, callback, errorCallback);
              return promise;
            };
            LocalForage.prototype.driver = function driver() {
              return this._driver || null;
            };
            LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
              var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
              executeTwoCallbacks(getDriverPromise, callback, errorCallback);
              return getDriverPromise;
            };
            LocalForage.prototype.getSerializer = function getSerializer(callback) {
              var serializerPromise = Promise$1.resolve(localforageSerializer);
              executeTwoCallbacks(serializerPromise, callback);
              return serializerPromise;
            };
            LocalForage.prototype.ready = function ready(callback) {
              var self = this;
              var promise = self._driverSet.then(function () {
                if (self._ready === null) {
                  self._ready = self._initDriver();
                }
                return self._ready;
              });
              executeTwoCallbacks(promise, callback, callback);
              return promise;
            };
            LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
              var self = this;
              if (!isArray(drivers)) {
                drivers = [drivers];
              }
              var supportedDrivers = this._getSupportedDrivers(drivers);
              function setDriverToConfig() {
                self._config.driver = self.driver();
              }
              function extendSelfWithDriver(driver) {
                self._extend(driver);
                setDriverToConfig();
                self._ready = self._initStorage(self._config);
                return self._ready;
              }
              function initDriver(supportedDrivers) {
                return function () {
                  var currentDriverIndex = 0;
                  function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                      var driverName = supportedDrivers[currentDriverIndex];
                      currentDriverIndex++;
                      self._dbInfo = null;
                      self._ready = null;
                      return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }
                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                  }
                  return driverPromiseLoop();
                };
              }

              // There might be a driver initialization in progress
              // so wait for it to finish in order to avoid a possible
              // race condition to set _dbInfo
              var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
                return Promise$1.resolve();
              }) : Promise$1.resolve();
              this._driverSet = oldDriverSetDone.then(function () {
                var driverName = supportedDrivers[0];
                self._dbInfo = null;
                self._ready = null;
                return self.getDriver(driverName).then(function (driver) {
                  self._driver = driver._driver;
                  setDriverToConfig();
                  self._wrapLibraryMethodsWithReady();
                  self._initDriver = initDriver(supportedDrivers);
                });
              })["catch"](function () {
                setDriverToConfig();
                var error = new Error('No available storage method found.');
                self._driverSet = Promise$1.reject(error);
                return self._driverSet;
              });
              executeTwoCallbacks(this._driverSet, callback, errorCallback);
              return this._driverSet;
            };
            LocalForage.prototype.supports = function supports(driverName) {
              return !!DriverSupport[driverName];
            };
            LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
              extend(this, libraryMethodsAndProperties);
            };
            LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
              var supportedDrivers = [];
              for (var i = 0, len = drivers.length; i < len; i++) {
                var driverName = drivers[i];
                if (this.supports(driverName)) {
                  supportedDrivers.push(driverName);
                }
              }
              return supportedDrivers;
            };
            LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
              // Add a stub for each driver API method that delays the call to the
              // corresponding driver method until localForage is ready. These stubs
              // will be replaced by the driver methods as soon as the driver is
              // loaded, so there is no performance impact.
              for (var i = 0, len = LibraryMethods.length; i < len; i++) {
                callWhenReady(this, LibraryMethods[i]);
              }
            };
            LocalForage.prototype.createInstance = function createInstance(options) {
              return new LocalForage(options);
            };
            return LocalForage;
          }();

          // The actual localForage object that we expose as a module or via a
          // global. It's extended by pulling in one of our other libraries.

          var localforage_js = new LocalForage();
          module.exports = localforage_js;
        }, {
          "3": 3
        }]
      }, {}, [4])(4);
    });
  })(localforage$1);
  var localforageExports = localforage$1.exports;
  var localforage = /*@__PURE__*/getDefaultExportFromCjs(localforageExports);

  var API = {
    checkSig: '{DOMAIN}/duix-openapi-v2/sdk/checkSig?sig=',
    queryConversationMaterialById: '{DOMAIN}/duix-openapi-v2/v1/queryConversationMaterialById',
    getByQuestion: '{DOMAIN}/duix-openapi-v2/answer/getByQuestion',
    getAnswerStream: '{DOMAIN}/duix-openapi-v2/answer/getAnswerStream',
    createSession: '{DOMAIN}/duix-openapi-v2/sdk/createSession',
    saveLog: '{DOMAIN}/duix-openapi-v2/common/saveLogs'
  };
  var ErrorMessage = {
    4001: 'Start Fail.',
    4002: 'Local im disconnected.',
    4003: 'Server im unavailable.',
    4005: 'Signature verification failed.',
    4006: 'Signature verification exception.',
    4007: 'The server actively closes the session.',
    4008: 'Failed to get media stream.',
    4009: 'Server error.',
    // rtc相关
    3001: 'RTC connect Fail'
  };
  var DefaultConfig = {
    domain: 'https://duix.guiji.ai'
  };

  /**
    * 会话状态：
    * connecting: 正在开启;
    * connected: 已开启;
    * closing: 正在关闭;
    * closed: 已关闭
    */
  var SessionState = {
    CONNECTING: 0,
    CONNECTED: 1,
    CLOSING: 2,
    CLOSED: 3
  };

  /**
   * 实时识别状态：
   * opening: 正在开启
   * opened: 已开启;
   * closing: 正在关闭;
   * closed: 已关闭
   */
  var AsrState = {
    OPENING: 0,
    OPENED: 1,
    CLOSING: 2,
    CLOSED: 3
  };

  /**
    * 录音状态：
    * opening: 正在开启
    * opened: 已开启
    * closing: 正在关闭
    * closed: 已关闭
    */
  var RecordState = {
    OPENING: 0,
    OPENED: 1,
    CLOSING: 2,
    CLOSED: 3
  };
  var SpeakState = {
    SPEAKING: 0,
    SLIENT: 1
  };

  var style = 'background:green;color:#fff;padding:0 2px;';
  localforage.config({
    version: 1.0,
    storeName: 'duixlog'
  });
  var LEVEL = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  };
  var Logger = /*#__PURE__*/function () {
    function Logger(catalogue) {
      _classCallCheck(this, Logger);
      this.option = {
        level: 'info'
      };
      this.option.catalogue = catalogue;
      this.logger = console;
    }
    _createClass(Logger, [{
      key: "debug",
      value: function debug() {
        if (LEVEL[this.option.level.toUpperCase()] <= LEVEL.DEBUG) {
          var _this$logger;
          (_this$logger = this.logger).debug.apply(_this$logger, ['%cDUIX', style].concat(Array.prototype.slice.call(arguments)));
          this._storage.apply(this, arguments);
        }
      }
    }, {
      key: "info",
      value: function info() {
        if (LEVEL[this.option.level.toUpperCase()] <= LEVEL.INFO) {
          var _this$logger2;
          (_this$logger2 = this.logger).info.apply(_this$logger2, ['%cDUIX', style].concat(Array.prototype.slice.call(arguments)));
          this._storage.apply(this, arguments);
        }
      }
    }, {
      key: "warn",
      value: function warn() {
        if (LEVEL[this.option.level.toUpperCase()] <= LEVEL.WARN) {
          var _this$logger3;
          (_this$logger3 = this.logger).warn.apply(_this$logger3, ['%cDUIX', style].concat(Array.prototype.slice.call(arguments)));
          this._storage.apply(this, arguments);
        }
      }
    }, {
      key: "error",
      value: function error() {
        if (LEVEL[this.option.level.toUpperCase()] <= LEVEL.ERROR) {
          var _this$logger4;
          (_this$logger4 = this.logger).error.apply(_this$logger4, ['%cDUIX', style].concat(Array.prototype.slice.call(arguments)));
          this._storage.apply(this, arguments);
        }
      }
    }, {
      key: "_storage",
      value: function _storage() {
        var logs = Array.from(arguments).map(function (item) {
          if (typeof item === 'string') return item;
          return JSON.stringify(item);
        });
        var sessionId = sessionStorage.getItem('_duix_sessionId');
        localforage.setItem(uuid(), {
          timestamp: new Date().getTime(),
          uuid: sessionId,
          text: logs.join(' ')
        });
      }
    }]);
    return Logger;
  }();
  Logger.start = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var domain = options.domain,
      interval = options.interval;
    Logger.domain = domain || DefaultConfig.domain;
    Logger.interval = interval;
    setInterval(function () {
      return Logger.report();
    }, Logger.interval);
  };
  Logger.report = function () {
    var url = API.saveLog.replace('{DOMAIN}', Logger.domain);
    localforage.keys().then(function (keys) {
      Promise.all(keys.map(function (key) {
        return localforage.getItem(key);
      })).then(function (values) {
        var list = values.filter(function (item) {
          return !!item;
        });
        list.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        if (list.length > 0) {
          http.post(url, list);
          keys.map(function (k) {
            return localforage.removeItem(k);
          });
        }
      });
    });
  };

  var logger$4 = new Logger('webrtc');
  logger$4.info('浏览器详情：', adapter.browserDetails);
  var WebRtc = /*#__PURE__*/function (_Event) {
    _inherits(WebRtc, _Event);
    var _super = _createSuper(WebRtc);
    function WebRtc() {
      var _this;
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, WebRtc);
      _this = _super.call(this);
      _this.containerLable = null;
      _this.dhVideo = null;
      _this.sessionType = 'answer'; //'answer' 应答模式  
      _this.peeConfig = null;
      _this.muted = false; //是否静音播放视频，默认不静音

      _this.enhanceOpus = false; //是否开启立体声
      _this.vpxMaxBitrate = 0; // 码率增强

      _this.openAsr = false; // 是否立即开启ASR识别

      _this.peerConnection = null;
      _this.audioCtx = null;
      _this.mediaStreamDest = null; //AudioNode结束节点
      _this.mediaStreamSource = null; //通过createMediaStreamSource()创建的AudioNode节点

      _this.mediaStreamConstraints = config.mediaStreamConstraints || {
        audio: {
          autoGainControl: false
        }
      };
      _this.localMediaStream = null; //本地（采集设备）媒体流

      _this.localStream = null; //AudioNode结束节点输出流（可添加到RTCPeerConnection，传输到远端）  
      _this.remoteStream = null; //rtc远端媒体流
      _this.reportTimer = null; //上报report事件定时器
      _this.trackLength = 0;

      //展示媒体流容器
      _this.setsContainerLable(config.containerLable);
      return _this;
    }

    //开始连接，创建RTCPeerConnection实例
    _createClass(WebRtc, [{
      key: "open",
      value: function open() {
        var _options$enhanceOpus;
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.sessionType = options.sessionType; //呼叫或应答
        this.peeConfig = options.peeConfig;
        this.muted = !!options.muted;
        this.enhanceOpus = (_options$enhanceOpus = options.enhanceOpus) !== null && _options$enhanceOpus !== void 0 ? _options$enhanceOpus : this.enhanceOpus;
        this.vpxMaxBitrate = options.vpxMaxBitrate;
        this.openAsr = options.openAsr;
        this.transparent = options.transparent;
        this.wipeGreen = options.wipeGreen;
        this.createDHVideo(options.transparent || options.wipeGreen);
        this.peerConnection = new RTCPeerConnection(this.peeConfig);
        this.addHandler();
      }

      //关闭连接
    }, {
      key: "close",
      value: function close() {
        this.trackLength = 0;
        this.closeAudioContext();
        this.closeLocalMediaStream();
        this.localStream = null;
        this.localMediaStream = null;
        if (this.peerConnection && this.peerConnection.connectionState !== 'closed') {
          this.peerConnection.close();
          this.peerConnection = null;
        }
        if (this.reportTimer) {
          clearInterval(this.reportTimer);
        }
        stopWipe();
      }
    }, {
      key: "addHandler",
      value: function addHandler() {
        var _this2 = this;
        //当需要会话协商更改时触发，
        //这种协商应该作为提议者进行，因为有些会话改变不能作为应答者进行协商。
        this.peerConnection.onnegotiationneeded = function () {
          logger$4.info('<onnegotiationneeded> peerConnection会话协商');
        };

        //webRtc连接状态
        this.peerConnection.onconnectionstatechange = function () {
          logger$4.info("[peerConnection\u8FDE\u63A5\u72B6\u6001] onconnectionstatechange - connectionState: ".concat(_this2.peerConnection.connectionState));
          var connectionState = _this2.peerConnection.connectionState;
          var params = {
            step: 'connectionstate',
            connectionState: connectionState
          };
          if (connectionState === 'disconnected' || connectionState === 'failed') {
            params.success = false;
          } else if (connectionState === 'connected') {
            params.success = true;
          }
          _this2.emit(WebRtc.EventType.STATUS, params);
        };

        //信令状态更改时触发
        //信令状态：描述连接或重新连接到另一个对等端的信令过程的状态。
        this.peerConnection.onsignalingstatechange = function () {
          logger$4.info("[peerConnection\u4FE1\u4EE4\u72B6\u6001] onsignalingstatechange - signalingState: ".concat(_this2.peerConnection.signalingState));
        };

        //ICE收集状态变更时回调
        this.peerConnection.onicegatheringstatechange = function () {
          logger$4.info("[peerConnectionICE\u6536\u96C6\u72B6\u6001] onicegatheringstatechange - iceGatheringState: ".concat(_this2.peerConnection.iceGatheringState));
        };

        //当设置本地会话描述peerConnection.setLocalDescription()后，触发candidate回调
        this.peerConnection.onicecandidate = function (_ref) {
          var candidate = _ref.candidate;
          // 收集可用的candidate通过信令服务器把候选信息发送给远端

          if (candidate) {
            _this2.emit(WebRtc.EventType.SENDCANDIDATE, candidate);
          }
        };

        //ice连接状态变更
        this.peerConnection.oniceconnectionstatechange = function () {
          logger$4.info("[peerConnectionICE\u8FDE\u63A5\u72B6\u6001] oniceconnectionstatechange - iceConnectionState: ".concat(_this2.peerConnection.iceConnectionState));
        };
        this.peerConnection.ontrack = function (event) {
          logger$4.info('[peerConnection接收轨道] ontrack', event.track);
          _this2.trackLength++;
          // if (this.trackLength > 1) {
          //   this.playRemoteStream()
          // }
        };

        this.report();
      }

      // 对外报告WebRTC状态信息
    }, {
      key: "report",
      value: function report() {
        var _this3 = this;
        clearInterval(this.reportTimer);
        if (!this.peerConnection) return;
        this.reportTimer = setInterval(function () {
          _this3.peerConnection.getStats().then(function (stats) {
            var r = _this3._explainStats(stats, _this3.lastStats);
            if (_this3.lastStats) {
              _this3.emit(WebRtc.EventType.REPORT, r);
            }
            _this3.lastStats = stats;
          });
        }, 1000);
      }

      /**
       * 将需要的stats解释出来
       * @param {RTCStatsReport} stats 当前 stats
       * @param {RTCStatsReport} last 上一次stats
       * @returns 加工后的对象，格式如下
       */
    }, {
      key: "_explainStats",
      value: function _explainStats(stats, last) {
        if (!last) {
          last = stats;
        }
        var currStats = Array.from(stats).map(function (item) {
          return item[1];
        });
        var lastStats = Array.from(last).map(function (item) {
          return item[1];
        });
        var r = {};
        var pickedInfo = null;
        var temp1 = null;
        var temp2 = null;

        // 下行视频流相关指标
        temp1 = currStats.find(function (item) {
          return 'inbound-rtp' === item.type && 'video' === item.kind;
        });
        if (temp1) {
          pickedInfo = pick(temp1, ['frameWidth', 'frameHeight', 'framesPerSecond', 'packetsLost']);
          set(r, 'video.download', pickedInfo);
          temp2 = lastStats.find(function (item) {
            return 'inbound-rtp' === item.type && 'video' === item.kind;
          });
          if (temp2) {
            merge(r.video.download, {
              packetsLostPerSecond: temp1.packetsLost - temp2.packetsLost // 丢包率
            });
          }
        }

        // 当前ICE通路信息
        temp1 = currStats.find(function (item) {
          return 'candidate-pair' === item.type && 'succeeded' === item.state && item.nominated;
        });
        if (temp1) {
          pickedInfo = pick(temp1, ['bytesSent', 'bytesReceived', 'currentRoundTripTime', 'timestamp']);
          pickedInfo.currentRoundTripTime = pickedInfo.currentRoundTripTime * 1000; // 往返时间 单位ms
          set(r, 'connection', pickedInfo);
          temp2 = lastStats.find(function (item) {
            return 'candidate-pair' === item.type && 'succeeded' === item.state && item.nominated;
          });
          if (temp2) {
            merge(r.connection, {
              receivedBitsPerSecond: (temp1.bytesReceived - temp2.bytesReceived) * 8,
              //接收码率
              sentBitsPerSecond: (temp1.bytesSent - temp2.bytesSent) * 8 //发送码率
            });
          }
        }

        return r;
      }

      //添加candidate
    }, {
      key: "addIceCandidate",
      value: function addIceCandidate(candidate) {
        if (!candidate) {
          return new Error('Candidate does not exist');
        }
        this.peerConnection.addIceCandidate(candidate).then(function () {
          // Do stuff when the candidate is successfully passed to the ICE agent
        })["catch"](function (error) {
          logger$4.error('Error: Failure during addIceCandidate()', error);
        });
      }

      //设置容器
    }, {
      key: "setsContainerLable",
      value: function setsContainerLable(containerLable) {
        if (containerLable) {
          containerLable = typeof containerLable === 'string' ? document.querySelector(containerLable) : containerLable instanceof HTMLElement ? containerLable : null;
        }
        if (!containerLable) {
          throw new Error('containerLable is null');
        }
        this.containerLable = containerLable;
      }

      //获取answer
    }, {
      key: "createAnswer",
      value: function createAnswer() {
        this.setLocalDescription('createAnswer', this.peerConnection.createAnswer());
      }

      //设置本地sdp
    }, {
      key: "setLocalDescription",
      value: function setLocalDescription(step, sdpPromise) {
        var _this4 = this;
        sdpPromise.then(function (sessionDescription) {
          if (_this4.enhanceOpus) {
            sessionDescription.sdp = sessionDescription.sdp.replace(/\r\na=fmtp:111 minptime=10;useinbandfec=1/g, '\r\na=fmtp:111 minptime=10;useinbandfec=1;stereo=1;maxaveragebitrate=128000;maxplaybackrate=48000');
          }

          // 设置 vpx 的码率
          if (_this4.vpxMaxBitrate && _this4.vpxMaxBitrate > 0) {
            logger$4.info("\u7801\u7387\u8BBE\u7F6E\u4E3A\uFF1A".concat(_this4.vpxMaxBitrate));
            var max = _this4.vpxMaxBitrate;
            var min = max * 0.8;
            var start = min;
            sessionDescription.sdp = sessionDescription.sdp.replace(/\r\na=rtcp-fb:96 transport-cc/g, "\r\na=rtcp-fb:96 transport-cc\r\na=fmtp:96 x-google-max-bitrate=".concat(max, ";x-google-min-bitrate=").concat(min, ";x-google-start-bitrate=").concat(start));
            sessionDescription.sdp = sessionDescription.sdp.replace(/\r\na=fmtp:98 profile-id=0/g, "\r\na=fmtp:98 profile-id=0;x-google-max-bitrate=".concat(max, ";x-google-min-bitrate=").concat(min, ";x-google-start-bitrate=").concat(start));
            sessionDescription.sdp = sessionDescription.sdp.replace(/\r\na=fmtp:100 profile-id=2/g, "\r\na=fmtp:100 profile-id=2;x-google-max-bitrate=".concat(max, ";x-google-min-bitrate=").concat(min, ";x-google-start-bitrate=").concat(start));
          }

          //设置本地描述
          return _this4.peerConnection.setLocalDescription(sessionDescription);
        }).then(function () {
          // 发送localDescription
          _this4.sendSdp(_this4.peerConnection.localDescription);
        })["catch"](function (error) {
          _this4.emit(WebRtc.EventType.STATUS, {
            step: step,
            success: false,
            message: "".concat(step, " failed.")
          });
          logger$4.error("".concat(step, " sdp failed"), error);
        });
      }

      //设置远端描述
    }, {
      key: "setRemoteDescription",
      value: function setRemoteDescription(sessionDescription) {
        var _this5 = this;
        var isRestartICE = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        this.peerConnection.setRemoteDescription(sessionDescription).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!(_this5.sessionType === 'answer')) {
                  _context.next = 5;
                  break;
                }
                if (!(_this5.openAsr && !isRestartICE)) {
                  _context.next = 4;
                  break;
                }
                _context.next = 4;
                return _this5.getMediaStream();
              case 4:
                if (_this5.peerConnection) {
                  if (!isRestartICE) {
                    _this5.peerAddTrack();
                  }
                  _this5.createAnswer();
                } else {
                  _this5.closeLocalMediaStream();
                }
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee);
        })))["catch"](function (error) {
          logger$4.error('setremotedescription failed', error);
          _this5.emit(WebRtc.EventType.STATUS, {
            step: 'setRemoteDescription',
            success: false,
            message: 'setremotedescription failed'
          });
        });
      }

      //获取媒体设备能力，捕获媒体流
    }, {
      key: "getMediaStream",
      value: function getMediaStream() {
        var _this6 = this;
        return navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints).then(function (stream) {
          logger$4.info('获取到本地媒体流');
          _this6.localMediaStream = stream;
          return true;
        })["catch"](function (error) {
          var name = error.name,
            message = error.message;
          logger$4.error("getUserMedia failed. ".concat(name, ": ").concat(message));
          _this6.emit(WebRtc.EventType.STATUS, {
            step: 'getUserMedia',
            success: false,
            message: "getUserMedia failed. ".concat(name, ": ").concat(message)
          });
        });
      }

      /**
       * 创建mediaStreamSource节点，接入到AudioContext
       */
    }, {
      key: "mediaStreamConnect",
      value: function mediaStreamConnect() {
        if (this.localMediaStream && this.mediaStreamDest) {
          this.mediaStreamSource = this.audioCtx.createMediaStreamSource(this.localMediaStream);
          this.mediaStreamSource.connect(this.mediaStreamDest);
          logger$4.info('本地麦克风流已添加到AudioContext');
        }
      }

      /**
       * 断开mediaStreamSource节点的连接
       */
    }, {
      key: "mediaStreamDisconnect",
      value: function mediaStreamDisconnect() {
        if (this.audioCtx && this.mediaStreamSource && this.mediaStreamDest) {
          this.mediaStreamSource.disconnect(this.mediaStreamDest);
          this.mediaStreamSource = null;
          logger$4.warn('把mediaStreamSource节点，从mediaStreamDest中 disconnect');
        }
      }

      /**
       * 重新打开麦克风，并接入新的本地媒体流
       */
    }, {
      key: "mediaStreamReconnect",
      value: function () {
        var _mediaStreamReconnect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var streamFlag;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getMediaStream();
              case 2:
                streamFlag = _context2.sent;
                if (streamFlag) {
                  this.mediaStreamConnect();
                }
                return _context2.abrupt("return", streamFlag);
              case 5:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function mediaStreamReconnect() {
          return _mediaStreamReconnect.apply(this, arguments);
        }
        return mediaStreamReconnect;
      }()
    }, {
      key: "peerAddTrack",
      value: function peerAddTrack() {
        var _this7 = this;
        this.audioCtx = new AudioContext();
        this.mediaStreamDest = this.audioCtx.createMediaStreamDestination();
        this.mediaStreamConnect();
        this.localStream = this.mediaStreamDest.stream;

        // 把本地媒体流轨道添加到连接上
        this.localStream.getTracks().forEach(function (track) {
          return _this7.peerConnection.addTrack(track, _this7.localStream);
        });
      }

      //关闭本地媒体设备流
    }, {
      key: "closeLocalMediaStream",
      value: function closeLocalMediaStream() {
        var _this$localMediaStrea;
        logger$4.info('关闭本地媒体设备流');
        var tracks = (_this$localMediaStrea = this.localMediaStream) === null || _this$localMediaStrea === void 0 ? void 0 : _this$localMediaStrea.getTracks();
        if (tracks !== null && tracks !== void 0 && tracks.length) {
          tracks.forEach(function (track) {
            track.stop();
          });
        }
      }

      //关闭AudioContext
    }, {
      key: "closeAudioContext",
      value: function closeAudioContext() {
        var _this$audioCtx,
          _this8 = this;
        if (!this.audioCtx || this.audioCtx.state === 'closed') {
          return;
        }
        (_this$audioCtx = this.audioCtx) === null || _this$audioCtx === void 0 ? void 0 : _this$audioCtx.close().then(function () {
          logger$4.info('AudioContext关闭成功: ');

          //this.closeLocalMediaStream();

          _this8.audioCtx = null;
          _this8.mediaStreamDest = null;
          _this8.mediaStreamSource = null;
        })["catch"](function (error) {
          logger$4.error('AudioContext关闭失败: ', error);
        });
      }

      /**
       * 创建视频标签
       * @param {boolean} isTransparent 是否透明背景
       * @returns 
       */
    }, {
      key: "createDHVideo",
      value: function createDHVideo(isTransparent) {
        var _this9 = this;
        if (this.dhVideo) return;
        this.dhVideo = document.createElement('video');
        this.dhVideo.autoplay = true; //远端流自动播放
        this.dhVideo.muted = this.muted; //是否静音
        this.dhVideo.addEventListener('playing', function () {
          var _this9$dhVideo$style, _this9$dhVideo$style2;
          logger$4.info('dhvideo playing', (_this9$dhVideo$style = _this9.dhVideo.style) === null || _this9$dhVideo$style === void 0 ? void 0 : _this9$dhVideo$style.visibility);
          if (((_this9$dhVideo$style2 = _this9.dhVideo.style) === null || _this9$dhVideo$style2 === void 0 ? void 0 : _this9$dhVideo$style2.visibility) !== 'visible') {
            _this9.showDHVideo();
            _this9.emit(WebRtc.EventType.SHOW);
          }
        });
        if (isTransparent) {
          Object.assign(this.dhVideo.style, {
            width: '1px',
            height: '1px',
            zIndex: -1,
            position: 'absolute',
            top: '50%',
            left: '50%'
          });
        } else {
          Object.assign(this.dhVideo.style, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          });
        }
        Object.assign(this.dhVideo.style, {
          visibility: 'hidden'
        });
        this.dhVideo.setAttribute('playsinline', true);
        this.dhVideo.setAttribute('preload', 'auto');
        Object.assign(this.containerLable.style, {
          position: 'relative'
        });
        this.containerLable.appendChild(this.dhVideo);
      }
    }, {
      key: "showDHVideo",
      value: function showDHVideo() {
        Object.assign(this.dhVideo.style, {
          visibility: 'visible'
        });
        if (this.wipeGreen) {
          // 优先使用扣绿幕方案，节省服端资源
          wipeGreen(this.dhVideo);
        } else if (this.transparent) {
          wipe(this.dhVideo);
        }
      }
    }, {
      key: "hideDHVideo",
      value: function hideDHVideo() {
        if (this.dhVideo) {
          Object.assign(this.dhVideo.style, {
            visibility: 'hidden'
          });
        }
      }

      /**
       * 移除视频标签
       */
    }, {
      key: "removeVideoLabel",
      value: function removeVideoLabel() {
        if (this.containerLable && this.dhVideo) {
          this.containerLable.removeChild(this.dhVideo);
          this.dhVideo = null;
        }
      }

      /**
       * 设置远端媒体流静音状态
       * @param {Boolean} muted true: 静音, false: 取消静音 
       */
    }, {
      key: "setVideoMuted",
      value: function setVideoMuted(muted) {
        if (!this.dhVideo) return;
        if (this.dhVideo.muted !== muted) {
          this.dhVideo.muted = muted;
        }
      }

      //发送SDP
    }, {
      key: "sendSdp",
      value: function sendSdp(localDescription) {
        //logger.info('sendSdp localDescription', localDescription)

        this.emit(WebRtc.EventType.SENDSDP, localDescription);
      }
    }, {
      key: "playRemoteStream",
      value: function playRemoteStream() {
        var _this10 = this;
        try {
          var tracks = this.peerConnection.getReceivers().map(function (receiver) {
            return receiver.track;
          });
          this.dhVideo.srcObject = this.remoteStream = new MediaStream([tracks[0], tracks[1]]);
          setTimeout(function () {
            var _this10$dhVideo$style;
            if (((_this10$dhVideo$style = _this10.dhVideo.style) === null || _this10$dhVideo$style === void 0 ? void 0 : _this10$dhVideo$style.visibility) !== 'visible') {
              _this10.dhVideo.play(); // 部分ios，autoplay不触发playing
            }
          }, 250);
        } catch (e) {
          console.warn(e);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.close();
        _get(_getPrototypeOf(WebRtc.prototype), "destroy", this).call(this);
      }
    }]);
    return WebRtc;
  }(Event$1);
  //自定义事件
  _defineProperty(WebRtc, "EventType", {
    STATUS: 'STATUS',
    //状态更新
    SENDSDP: 'SENDSDP',
    //发送 answer SDP
    SENDCANDIDATE: 'SENDCANDIDATE',
    //发送candidate
    REPORT: 'REPORT',
    //报告网络信息
    SHOW: 'SHOW' //RTC流可显示
  });

  /*
  录音
  https://github.com/xiangyuecn/Recorder
  */


  var NOOP = function NOOP() {};
  var Recorder = function Recorder(set) {
    return new initFn(set);
  };
  Recorder.LM = '2022-05-04 20:10';
  var RecTxt = 'Recorder';

  //是否已经打开了全局的麦克风录音，所有工作都已经准备好了，就等接收音频数据了
  Recorder.IsOpen = function () {
    var stream = Recorder.Stream;
    if (stream) {
      var tracks = stream.getTracks && stream.getTracks() || stream.audioTracks || [];
      var track = tracks[0];
      if (track) {
        var state = track.readyState;
        return state == 'live' || state == track.LIVE;
      }
    }
    return false;
  };
  /*H5录音时的AudioContext缓冲大小。会影响H5录音时的onProcess调用速率，相对于AudioContext.sampleRate=48000时，4096接近12帧/s，调节此参数可生成比较流畅的回调动画。
    取值256, 512, 1024, 2048, 4096, 8192, or 16384
    注意，取值不能过低，2048开始不同浏览器可能回调速率跟不上造成音质问题。
    一般无需调整，调整后需要先close掉已打开的录音，再open时才会生效。
  */
  Recorder.BufferSize = 4096;
  //销毁已持有的所有全局资源，当要彻底移除Recorder时需要显式的调用此方法
  Recorder.Destroy = function () {
    CLog(RecTxt + ' Destroy');
    Disconnect(); //断开可能存在的全局Stream、资源

    for (var k in DestroyList) {
      DestroyList[k]();
    }
  };
  var DestroyList = {};
  //登记一个需要销毁全局资源的处理方法
  Recorder.BindDestroy = function (key, call) {
    DestroyList[key] = call;
  };
  //判断浏览器是否支持录音，随时可以调用。注意：仅仅是检测浏览器支持情况，不会判断和调起用户授权，不会判断是否支持特定格式录音。
  Recorder.Support = function () {
    var AC = window.AudioContext;
    if (!AC) {
      AC = window.webkitAudioContext;
    }
    if (!AC) {
      return false;
    }
    var scope = navigator.mediaDevices || {};
    if (!scope.getUserMedia) {
      scope = navigator;
      scope.getUserMedia || (scope.getUserMedia = scope.webkitGetUserMedia || scope.mozGetUserMedia || scope.msGetUserMedia);
    }
    if (!scope.getUserMedia) {
      return false;
    }
    Recorder.Scope = scope;
    if (!Recorder.Ctx || Recorder.Ctx.state == 'closed') {
      //不能反复构造，低版本number of hardware contexts reached maximum (6)
      Recorder.Ctx = new AC();
      Recorder.BindDestroy('Ctx', function () {
        var ctx = Recorder.Ctx;
        if (ctx && ctx.close) {
          //能关掉就关掉，关不掉就保留着
          ctx.close();
          Recorder.Ctx = 0;
        }
      });
    }
    return true;
  };

  /*是否启用AudioWorklet特性来进行音频采集连接（如果浏览器支持的话），默认禁用，禁用后将使用过时的ScriptProcessor来连接（如果方法还在的话），当前AudioWorklet的实现在移动端没有ScriptProcessor稳健*/
  var ConnectEnableWorklet = 'ConnectEnableWorklet';
  Recorder[ConnectEnableWorklet] = false;

  /*初始化H5音频采集连接。如果自行提供了sourceStream将只进行一次简单的连接处理。如果是普通麦克风录音，此时的Stream是全局的，Safari上断开后就无法再次进行连接使用，表现为静音，因此使用全部使用全局处理避免调用到disconnect；全局处理也有利于屏蔽底层细节，start时无需再调用底层接口，提升兼容、可靠性。*/
  var Connect = function Connect(streamStore) {
    streamStore = streamStore || Recorder;
    var bufferSize = streamStore.BufferSize || Recorder.BufferSize;
    var ctx = Recorder.Ctx,
      stream = streamStore.Stream;
    var media = stream._m = ctx.createMediaStreamSource(stream);
    var calls = stream._call;

    //浏览器回传的音频数据处理
    var exec = function exec(e, workletArr) {
      if (workletArr && !isWorklet) {
        CLog(audioWorklet + '多余回调', 3);
        return;
      }
      for (var k0 in calls) {
        //has item
        var o = workletArr || e.inputBuffer.getChannelData(0); //块是共享的，必须复制出来
        var size = o.length;
        var pcm = new Int16Array(size);
        var sum = 0;
        for (var j = 0; j < size; j++) {
          //floatTo16BitPCM 
          var s = Math.max(-1, Math.min(1, o[j]));
          s = s < 0 ? s * 0x8000 : s * 0x7FFF;
          pcm[j] = s;
          sum += Math.abs(s);
        }
        for (var k in calls) {
          calls[k](pcm, sum);
        }
        return;
      }
    };
    var scriptProcessor = 'ScriptProcessor'; //一堆字符串名字，有利于压缩js
    var audioWorklet = 'audioWorklet';
    var recAudioWorklet = RecTxt + ' ' + audioWorklet;
    var RecProc = 'RecProc';

    //古董级别的 ScriptProcessor 处理，目前所有浏览器均兼容，虽然是过时的方法，但更稳健，移动端性能比AudioWorklet强
    var oldFn = ctx.createScriptProcessor || ctx.createJavaScriptNode;
    var oldIsBest = '。由于' + audioWorklet + '内部1秒375次回调，在移动端可能会有性能问题导致回调丢失录音变短，PC端无影响，暂不建议开启' + audioWorklet + '。';
    var oldScript = function oldScript() {
      isWorklet = stream.isWorklet = false;
      _Disconn_n(stream);
      CLog('Connect采用老的' + scriptProcessor + '，' + (Recorder[ConnectEnableWorklet] ? '但已' : '可') + '设置' + RecTxt + '.' + ConnectEnableWorklet + '=true尝试启用' + audioWorklet + oldIsBest, 3);
      var process = stream._p = oldFn.call(ctx, bufferSize, 1, 1); //单声道，省的数据处理复杂

      media.connect(process);
      process.connect(ctx.destination);
      process.onaudioprocess = function (e) {
        exec(e);
      };
    };

    //尝试开启AudioWorklet处理
    var isWorklet = stream.isWorklet = !oldFn || Recorder[ConnectEnableWorklet];
    var AwNode = window.AudioWorkletNode;
    if (!(isWorklet && ctx[audioWorklet] && AwNode)) {
      oldScript(); //被禁用 或 不支持，直接使用老的
      return;
    }
    var clazzUrl = function clazzUrl() {
      var xf = function xf(f) {
        return f.toString().replace(/^function|DEL_/g, '').replace(/\$RA/g, recAudioWorklet);
      };
      var clazz = 'class ' + RecProc + ' extends AudioWorkletProcessor{';
      clazz += 'constructor ' + xf(function (option) {
        DEL_super(option);
        var This = this,
          bufferSize = option.processorOptions.bufferSize;
        This.bufferSize = bufferSize;
        This.buffer = new Float32Array(bufferSize * 2); //乱给size搞乱缓冲区不管
        This.pos = 0;
        This.port.onmessage = function (e) {
          if (e.data.kill) {
            This.kill = true;
            console.log('$RA kill call');
          }
        };
        console.log('$RA .ctor call', option);
      });

      //https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/process 每次回调128个采样数据，1秒375次回调，高频导致移动端性能问题，结果就是回调次数缺斤少两，进而导致丢失数据，PC端似乎没有性能问题
      clazz += 'process ' + xf(function (input, b, c) {
        //需要等到ctx激活后才会有回调
        var This = this,
          bufferSize = This.bufferSize;
        var buffer = This.buffer,
          pos = This.pos;
        input = (input[0] || [])[0] || [];
        if (input.length) {
          buffer.set(input, pos);
          pos += input.length;
          var len = ~~(pos / bufferSize) * bufferSize;
          if (len) {
            this.port.postMessage({
              val: buffer.slice(0, len)
            });
            var more = buffer.subarray(len, pos);
            buffer = new Float32Array(bufferSize * 2);
            buffer.set(more);
            pos = more.length;
            This.buffer = buffer;
          }
          This.pos = pos;
        }
        return !This.kill;
      });
      clazz += '}' + 'try{' + 'registerProcessor("' + RecProc + '", ' + RecProc + ')' + '}catch(e){' + 'console.error("' + recAudioWorklet + '注册失败",e)' + '}';
      //URL.createObjectURL 本地有些浏览器会报 Not allowed to load local resource，直接用dataurl
      return 'data:text/javascript;base64,' + btoa(unescape(encodeURIComponent(clazz)));
    };
    var awNext = function awNext() {
      //可以继续，没有调用断开
      return isWorklet && stream._na;
    };
    var badInt;
    var nodeAlive = stream._na = function () {
      //start时会调用，只要没有收到数据就断定AudioWorklet有问题，恢复用老的
      if (badInt !== '') {
        //没有回调过数据
        clearTimeout(badInt);
        badInt = setTimeout(function () {
          badInt = 0;
          CLog(audioWorklet + '未返回任何音频，恢复使用' + scriptProcessor, 3);
          awNext() && oldFn && oldScript(); //未来没有老的，可能是误判
        }, 500);
      }
    };
    var createNode = function createNode() {
      if (!awNext()) return;
      var node = stream._n = new AwNode(ctx, RecProc, {
        processorOptions: {
          bufferSize: bufferSize
        }
      });
      media.connect(node);
      node.connect(ctx.destination); //老版本浏览器必须连接
      node.port.onmessage = function (e) {
        if (badInt) {
          clearTimeout(badInt);
          badInt = '';
        }
        exec(0, e.data.val);
      };
      CLog('Connect采用' + audioWorklet + '方式，设置' + RecTxt + '.' + ConnectEnableWorklet + '=false可恢复老式' + scriptProcessor + oldIsBest, 3);
    };

    //如果start时的resume和下面的构造node同时进行，将会导致部分浏览器崩溃，源码assets中 ztest_chrome_bug_AudioWorkletNode.html 可测试。所以，将所有代码套到resume里面（不管catch），避免出现这个问题
    ctx.resume()[calls && 'finally'](function () {
      //注释掉这行 观摩浏览器崩溃 STATUS_ACCESS_VIOLATION
      if (!awNext()) return;
      if (ctx[RecProc]) {
        createNode();
        return;
      }
      var url = clazzUrl();
      ctx[audioWorklet].addModule(url).then(function (e) {
        if (!awNext()) return;
        ctx[RecProc] = 1;
        createNode();
        if (badInt) {
          //重新计时
          nodeAlive();
        }
      })[calls && 'catch'](function (e) {
        //fix 关键字，保证catch压缩时保持字符串形式
        CLog(audioWorklet + '.addModule失败', 1, e);
        awNext() && oldScript();
      });
    });
  };
  var ConnAlive = function ConnAlive(streamStore) {
    var stream = (streamStore || Recorder).Stream;
    if (stream._na) {
      //检查AudioWorklet连接是否有效，无效就回滚到老的ScriptProcessor
      stream._na();
    }
  };
  var _Disconn_n = function _Disconn_n(stream) {
    stream._na = null;
    if (stream._n) {
      stream._n.port.postMessage({
        kill: true
      });
      stream._n.disconnect();
      stream._n = null;
    }
  };
  var Disconnect = function Disconnect(streamStore) {
    streamStore = streamStore || Recorder;
    var isGlobal = streamStore == Recorder;
    var stream = streamStore.Stream;
    if (stream) {
      if (stream._m) {
        stream._m.disconnect();
        stream._m = null;
      }
      if (stream._p) {
        stream._p.disconnect();
        stream._p.onaudioprocess = stream._p = null;
      }
      _Disconn_n(stream);
      if (isGlobal) {
        //全局的时候，要把流关掉（麦克风），直接提供的流不处理
        var tracks = stream.getTracks && stream.getTracks() || stream.audioTracks || [];
        for (var i = 0; i < tracks.length; i++) {
          var track = tracks[i];
          track.stop && track.stop();
        }
        stream.stop && stream.stop();
      }
    }
    streamStore.Stream = 0;
  };

  /*对pcm数据的采样率进行转换
  pcmDatas: [[Int16,...]] pcm片段列表
  pcmSampleRate:48000 pcm数据的采样率
  newSampleRate:16000 需要转换成的采样率，newSampleRate>=pcmSampleRate时不会进行任何处理，小于时会进行重新采样
  prevChunkInfo:{} 可选，上次调用时的返回值，用于连续转换，本次调用将从上次结束位置开始进行处理。或可自行定义一个ChunkInfo从pcmDatas指定的位置开始进行转换
  option:{ 可选，配置项
      frameSize:123456 帧大小，每帧的PCM Int16的数量，采样率转换后的pcm长度为frameSize的整数倍，用于连续转换。目前仅在mp3格式时才有用，frameSize取值为1152，这样编码出来的mp3时长和pcm的时长完全一致，否则会因为mp3最后一帧录音不够填满时添加填充数据导致mp3的时长变长。
      frameType:"" 帧类型，一般为rec.set.type，提供此参数时无需提供frameSize，会自动使用最佳的值给frameSize赋值，目前仅支持mp3=1152(MPEG1 Layer3的每帧采采样数)，其他类型=1。
        以上两个参数用于连续转换时使用，最多使用一个，不提供时不进行帧的特殊处理，提供时必须同时提供prevChunkInfo才有作用。最后一段数据处理时无需提供帧大小以便输出最后一丁点残留数据。
    }

  返回ChunkInfo:{
    //可定义，从指定位置开始转换到结尾
    index:0 pcmDatas已处理到的索引
    offset:0.0 已处理到的index对应的pcm中的偏移的下一个位置
  	
    //仅作为返回值
    frameNext:null||[Int16,...] 下一帧的部分数据，frameSize设置了的时候才可能会有
    sampleRate:16000 结果的采样率，<=newSampleRate
    data:[Int16,...] 转换后的PCM结果；如果是连续转换，并且pcmDatas中并没有新数据时，data的长度可能为0
  }
  */
  Recorder.SampleData = function (pcmDatas, pcmSampleRate, newSampleRate, prevChunkInfo, option) {
    prevChunkInfo || (prevChunkInfo = {});
    var index = prevChunkInfo.index || 0;
    var offset = prevChunkInfo.offset || 0;
    var frameNext = prevChunkInfo.frameNext || [];
    option || (option = {});
    var frameSize = option.frameSize || 1;
    if (option.frameType) {
      frameSize = option.frameType == 'mp3' ? 1152 : 1;
    }
    var nLen = pcmDatas.length;
    if (index > nLen + 1) {
      CLog('SampleData似乎传入了未重置chunk ' + index + '>' + nLen, 3);
    }
    var size = 0;
    for (var i = index; i < nLen; i++) {
      size += pcmDatas[i].length;
    }
    size = Math.max(0, size - Math.floor(offset));

    //采样 https://www.cnblogs.com/blqw/p/3782420.html
    var step = pcmSampleRate / newSampleRate;
    if (step > 1) {
      //新采样低于录音采样，进行抽样
      size = Math.floor(size / step);
    } else {
      //新采样高于录音采样不处理，省去了插值处理
      step = 1;
      newSampleRate = pcmSampleRate;
    }
    size += frameNext.length;
    var res = new Int16Array(size);
    var idx = 0;
    //添加上一次不够一帧的剩余数据
    for (var i = 0; i < frameNext.length; i++) {
      res[idx] = frameNext[i];
      idx++;
    }
    //处理数据
    for (; index < nLen; index++) {
      var o = pcmDatas[index];
      var i = offset,
        il = o.length;
      while (i < il) {
        //res[idx]=o[Math.round(i)]; 直接简单抽样

        //https://www.cnblogs.com/xiaoqi/p/6993912.html
        //当前点=当前点+到后面一个点之间的增量，音质比直接简单抽样好些
        var before = Math.floor(i);
        var after = Math.ceil(i);
        var atPoint = i - before;
        var beforeVal = o[before];
        var afterVal = after < il ? o[after] :
        //后个点越界了，查找下一个数组
        (pcmDatas[index + 1] || [beforeVal])[0] || 0;
        res[idx] = beforeVal + (afterVal - beforeVal) * atPoint;
        idx++;
        i += step; //抽样
      }

      offset = i - il;
    }
    //帧处理
    frameNext = null;
    var frameNextSize = res.length % frameSize;
    if (frameNextSize > 0) {
      var u8Pos = (res.length - frameNextSize) * 2;
      frameNext = new Int16Array(res.buffer.slice(u8Pos));
      res = new Int16Array(res.buffer.slice(0, u8Pos));
    }
    return {
      index: index,
      offset: offset,
      frameNext: frameNext,
      sampleRate: newSampleRate,
      data: res
    };
  };

  /*计算音量百分比的一个方法
  pcmAbsSum: pcm Int16所有采样的绝对值的和
  pcmLength: pcm长度
  返回值：0-100，主要当做百分比用
  注意：这个不是分贝，因此没用volume当做名称*/
  Recorder.PowerLevel = function (pcmAbsSum, pcmLength) {
    /*计算音量 https://blog.csdn.net/jody1989/article/details/73480259
    更高灵敏度算法:
      限定最大感应值10000
        线性曲线：低音量不友好
          power/10000*100 
        对数曲线：低音量友好，但需限定最低感应值
          (1+Math.log10(power/10000))*100
    */
    var power = pcmAbsSum / pcmLength || 0; //NaN
    var level;
    if (power < 1251) {
      //1250的结果10%，更小的音量采用线性取值
      level = Math.round(power / 1250 * 10);
    } else {
      level = Math.round(Math.min(100, Math.max(0, (1 + Math.log(power / 10000) / Math.log(10)) * 100)));
    }
    return level;
  };

  //带时间的日志输出，CLog(msg,errOrLogMsg, logMsg...) err为数字时代表日志类型1:error 2:log默认 3:warn，否则当做内容输出，第一个参数不能是对象因为要拼接时间，后面可以接无数个输出参数
  var CLog = function CLog(msg, err) {
    var now = new Date();
    var t = ('0' + now.getMinutes()).substr(-2) + ':' + ('0' + now.getSeconds()).substr(-2) + '.' + ('00' + now.getMilliseconds()).substr(-3);
    var recID = this && this.envIn && this.envCheck && this.id;
    var arr = ['[' + t + ' ' + RecTxt + (recID ? ':' + recID : '') + ']' + msg];
    var a = arguments,
      console = window.console || {};
    var i = 2,
      fn = console.log;
    if (typeof err === 'number') {
      fn = err == 1 ? console.error : err == 3 ? console.warn : fn;
    } else {
      i = 1;
    }
    for (; i < a.length; i++) {
      arr.push(a[i]);
    }
    if (IsLoser) {
      //古董浏览器，仅保证基本的可执行不代码异常
      fn && fn('[IsLoser]' + arr[0], arr.length > 1 ? arr : '');
    } else {
      fn.apply(console, arr);
    }
  };
  var IsLoser = true;
  try {
    IsLoser = !console.log.apply;
  } catch (e) {}
  Recorder.CLog = CLog;
  var ID = 0;
  function initFn(set) {
    this.id = ++ID;

    //如果开启了流量统计，这里将发送一个图片请求
    Traffic();
    var o = {
      type: 'mp3' //输出类型：mp3,wav，wav输出文件尺寸超大不推荐使用，但mp3编码支持会导致js文件超大，如果不需支持mp3可以使js文件大幅减小
      ,
      bitRate: 16 //比特率 wav:16或8位，MP3：8kbps 1k/s，8kbps 2k/s 录音文件很小
      ,

      sampleRate: 16000 //采样率，wav格式大小=sampleRate*时间；mp3此项对低比特率有影响，高比特率几乎无影响。
      //wav任意值，mp3取值范围：48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000
      //采样率参考https://www.cnblogs.com/devin87/p/mp3-recorder.html
      ,

      onProcess: NOOP //fn(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd) buffers=[[Int16,...],...]：缓冲的PCM数据，为从开始录音到现在的所有pcm片段；powerLevel：当前缓冲的音量级别0-100，bufferDuration：已缓冲时长，bufferSampleRate：缓冲使用的采样率（当type支持边录边转码(Worker)时，此采样率和设置的采样率相同，否则不一定相同）；newBufferIdx:本次回调新增的buffer起始索引；asyncEnd:fn() 如果onProcess是异步的(返回值为true时)，处理完成时需要调用此回调，如果不是异步的请忽略此参数，此方法回调时必须是真异步（不能真异步时需用setTimeout包裹）。onProcess返回值：如果返回true代表开启异步模式，在某些大量运算的场合异步是必须的，必须在异步处理完成时调用asyncEnd(不能真异步时需用setTimeout包裹)，在onProcess执行后新增的buffer会全部替换成空数组，因此本回调开头应立即将newBufferIdx到本次回调结尾位置的buffer全部保存到另外一个数组内，处理完成后写回buffers中本次回调的结尾位置。

      //*******高级设置******
      //,sourceStream:MediaStream Object
      //可选直接提供一个媒体流，从这个流中录制、实时处理音频数据（当前Recorder实例独享此流）；不提供时为普通的麦克风录音，由getUserMedia提供音频流（所有Recorder实例共享同一个流）
      //比如：audio、video标签dom节点的captureStream方法（实验特性，不同浏览器支持程度不高）返回的流；WebRTC中的remote流；自己创建的流等
      //注意：流内必须至少存在一条音轨(Audio Track)，比如audio标签必须等待到可以开始播放后才会有音轨，否则open会失败

      //,audioTrackSet:{ deviceId:"",groupId:"", autoGainControl:true, echoCancellation:true, noiseSuppression:true }
      //普通麦克风录音时getUserMedia方法的audio配置参数，比如指定设备id，回声消除、降噪开关；注意：提供的任何配置值都不一定会生效
      //由于麦克风是全局共享的，所以新配置后需要close掉以前的再重新open
      //更多参考: https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints

      //,disableEnvInFix:false 内部参数，禁用设备卡顿时音频输入丢失补偿功能

      //,takeoffEncodeChunk:NOOP //fn(chunkBytes) chunkBytes=[Uint8,...]：实时编码环境下接管编码器输出，当编码器实时编码出一块有效的二进制音频数据时实时回调此方法；参数为二进制的Uint8Array，就是编码出来的音频数据片段，所有的chunkBytes拼接在一起即为完整音频。本实现的想法最初由QQ2543775048提出
      //当提供此回调方法时，将接管编码器的数据输出，编码器内部将放弃存储生成的音频数据；环境要求比较苛刻：如果当前环境不支持实时编码处理，将在open时直接走fail逻辑
      //因此提供此回调后调用stop方法将无法获得有效的音频数据，因为编码器内没有音频数据，因此stop时返回的blob将是一个字节长度为0的blob
      //目前只有mp3格式实现了实时编码，在支持实时处理的环境中将会实时的将编码出来的mp3片段通过此方法回调，所有的chunkBytes拼接到一起即为完整的mp3，此种拼接的结果比mock方法实时生成的音质更加，因为天然避免了首尾的静默
      //目前除mp3外其他格式不可以提供此回调，提供了将在open时直接走fail逻辑
    };

    for (var k in set) {
      o[k] = set[k];
    }
    this.set = o;
    this._S = 9; //stop同步锁，stop可以阻止open过程中还未运行的start
    this.Sync = {
      O: 9,
      C: 9
    }; //和Recorder.Sync一致，只不过这个是非全局的，仅用来简化代码逻辑，无实际作用
  }
  //同步锁，控制对Stream的竞争；用于close时中断异步的open；一个对象open如果变化了都要阻止close，Stream的控制权交个新的对象
  Recorder.Sync = {
    /*open*/O: 9,
    /*close*/C: 9
  };
  Recorder.prototype = initFn.prototype = {
    CLog: CLog

    //流相关的数据存储在哪个对象里面；如果提供了sourceStream，数据直接存储在当前对象中，否则存储在全局
    ,
    _streamStore: function _streamStore() {
      if (this.set.sourceStream) {
        return this;
      } else {
        return Recorder;
      }
    }

    //打开录音资源True(),False(msg,isUserNotAllow)，需要调用close。注意：此方法是异步的；一般使用时打开，用完立即关闭；可重复调用，可用来测试是否能录音
    ,
    open: function open(True, False) {
      var This = this,
        streamStore = This._streamStore();
      True = True || NOOP;
      var failCall = function failCall(errMsg, isUserNotAllow) {
        isUserNotAllow = !!isUserNotAllow;
        This.CLog('录音open失败：' + errMsg + ',isUserNotAllow:' + isUserNotAllow, 1);
        False && False(errMsg, isUserNotAllow);
      };
      var ok = function ok() {
        This.CLog('open ok id:' + This.id);
        True();
        This._SO = 0; //解除stop对open中的start调用的阻止
      };

      //同步锁
      var Lock = streamStore.Sync;
      var lockOpen = ++Lock.O,
        lockClose = Lock.C;
      This._O = This._O_ = lockOpen; //记住当前的open，如果变化了要阻止close，这里假定了新对象已取代当前对象并且不再使用
      This._SO = This._S; //记住open过程中的stop，中途任何stop调用后都不能继续open中的start
      var lockFail = function lockFail() {
        //允许多次open，但不允许任何一次close，或者自身已经调用了关闭
        if (lockClose != Lock.C || !This._O) {
          var err = 'open被取消';
          if (lockOpen == Lock.O) {
            //无新的open，已经调用了close进行取消，此处应让上次的close明确生效
            This.close();
          } else {
            err = 'open被中断';
          }
          failCall(err);
          return true;
        }
      };

      //环境配置检查
      var checkMsg = This.envCheck({
        envName: 'H5',
        canProcess: true
      });
      if (checkMsg) {
        failCall('不能录音：' + checkMsg);
        return;
      }

      //***********已直接提供了音频流************
      if (This.set.sourceStream) {
        if (!Recorder.Support()) {
          failCall('不支持此浏览器从流中获取录音');
          return;
        }
        Disconnect(streamStore); //可能已open过，直接先尝试断开
        This.Stream = This.set.sourceStream;
        This.Stream._call = {};
        try {
          Connect(streamStore);
        } catch (e) {
          failCall('从流中打开录音失败：' + e.message);
          return;
        }
        ok();
        return;
      }

      //***********打开麦克风得到全局的音频流************
      var codeFail = function codeFail(code, msg) {
        try {
          //跨域的优先检测一下
          window.top.a;
        } catch (e) {
          failCall('无权录音(跨域，请尝试给iframe添加麦克风访问策略，如allow="camera;microphone")');
          return;
        }
        if (/Permission|Allow/i.test(code)) {
          failCall('用户拒绝了录音权限', true);
        } else if (window.isSecureContext === false) {
          failCall('浏览器禁止不安全页面录音，可开启https解决');
        } else if (/Found/i.test(code)) {
          //可能是非安全环境导致的没有设备
          failCall(msg + '，无可用麦克风');
        } else {
          failCall(msg);
        }
      };

      //如果已打开并且有效就不要再打开了
      if (Recorder.IsOpen()) {
        ok();
        return;
      }
      if (!Recorder.Support()) {
        codeFail('', '此浏览器不支持录音');
        return;
      }

      //请求权限，如果从未授权，一般浏览器会弹出权限请求弹框
      var f1 = function f1(stream) {
        Recorder.Stream = stream;
        stream._call = {}; //此时is open，但并未connect，是允许绑定接收数据的
        if (lockFail()) return;

        //https://github.com/xiangyuecn/Recorder/issues/14 获取到的track.readyState!="live"，刚刚回调时可能是正常的，但过一下可能就被关掉了，原因不明。延迟一下保证真异步。对正常浏览器不影响
        setTimeout(function () {
          if (lockFail()) return;
          if (Recorder.IsOpen()) {
            Connect();
            ok();
          } else {
            failCall('录音功能无效：无音频流');
          }
        }, 100);
      };
      var f2 = function f2(e) {
        var code = e.name || e.message || e.code + ':' + e;
        This.CLog('请求录音权限错误', 1, e);
        codeFail(code, '无法录音：' + code);
      };
      var pro = Recorder.Scope.getUserMedia({
        audio: This.set.audioTrackSet || true
      }, f1, f2);
      if (pro && pro.then) {
        pro.then(f1)[True && 'catch'](f2); //fix 关键字，保证catch压缩时保持字符串形式
      }
    }
    //关闭释放录音资源
    ,
    close: function close(call) {
      call = call || NOOP;
      var This = this,
        streamStore = This._streamStore();
      This._stop();
      var Lock = streamStore.Sync;
      This._O = 0;
      if (This._O_ != Lock.O) {
        //唯一资源Stream的控制权已交给新对象，这里不能关闭。此处在每次都弹权限的浏览器内可能存在泄漏，新对象被拒绝权限可能不会调用close，忽略这种不处理
        This.CLog('close被忽略（因为同时open了多个rec，只有最后一个会真正close）', 3);
        call();
        return;
      }
      Lock.C++; //获得控制权

      Disconnect(streamStore);
      This.CLog('close');
      call();
    }

    /*模拟一段录音数据，后面可以调用stop进行编码，需提供pcm数据[1,2,3...]，pcm的采样率*/,
    mock: function mock(pcmData, pcmSampleRate) {
      var This = this;
      This._stop(); //清理掉已有的资源

      This.isMock = 1;
      This.mockEnvInfo = null;
      This.buffers = [pcmData];
      This.recSize = pcmData.length;
      This.srcSampleRate = pcmSampleRate;
      return This;
    },
    envCheck: function envCheck(envInfo) {
      //平台环境下的可用性检查，任何时候都可以调用检查，返回errMsg:""正常，"失败原因"
      //envInfo={envName:"H5",canProcess:true}
      var errMsg,
        This = this,
        set = This.set;

      //检测CPU的数字字节序，TypedArray字节序是个迷，直接拒绝罕见的大端模式，因为找不到这种CPU进行测试
      var tag = 'CPU_BE';
      if (!errMsg && !Recorder[tag] && !new Int8Array(new Int32Array([1]).buffer)[0]) {
        Traffic(tag); //如果开启了流量统计，这里将发送一个图片请求
        errMsg = '不支持' + tag + '架构';
      }

      //编码器检查环境下配置是否可用
      if (!errMsg) {
        var type = set.type;
        if (This[type + '_envCheck']) {
          //编码器已实现环境检查
          errMsg = This[type + '_envCheck'](envInfo, set);
        } else {
          //未实现检查的手动检查配置是否有效
          if (set.takeoffEncodeChunk) {
            errMsg = type + '类型' + (This[type] ? '' : '(未加载编码器)') + '不支持设置takeoffEncodeChunk';
          }
        }
      }
      return errMsg || '';
    },
    envStart: function envStart(mockEnvInfo, sampleRate) {
      //平台环境相关的start调用
      var This = this,
        set = This.set;
      This.isMock = mockEnvInfo ? 1 : 0; //非H5环境需要启用mock，并提供envCheck需要的环境信息
      This.mockEnvInfo = mockEnvInfo;
      This.buffers = []; //数据缓冲
      This.recSize = 0; //数据大小

      This.envInLast = 0; //envIn接收到最后录音内容的时间
      This.envInFirst = 0; //envIn接收到的首个录音内容的录制时间
      This.envInFix = 0; //补偿的总时间
      This.envInFixTs = []; //补偿计数列表

      set.sampleRate = Math.min(sampleRate, set.sampleRate); //engineCtx需要提前确定最终的采样率
      This.srcSampleRate = sampleRate;
      This.engineCtx = 0;
      //此类型有边录边转码(Worker)支持
      if (This[set.type + '_start']) {
        var engineCtx = This.engineCtx = This[set.type + '_start'](set);
        if (engineCtx) {
          engineCtx.pcmDatas = [];
          engineCtx.pcmSize = 0;
        }
      }
    },
    envResume: function envResume() {
      //和平台环境无关的恢复录音
      //重新开始计数
      this.envInFixTs = [];
    },
    envIn: function envIn(pcm, sum) {
      //和平台环境无关的pcm[Int16]输入
      var This = this,
        set = This.set,
        engineCtx = This.engineCtx;
      var bufferSampleRate = This.srcSampleRate;
      var size = pcm.length;
      var powerLevel = Recorder.PowerLevel(sum, size);
      var buffers = This.buffers;
      var bufferFirstIdx = buffers.length; //之前的buffer都是经过onProcess处理好的，不允许再修改
      buffers.push(pcm);

      //有engineCtx时会被覆盖，这里保存一份
      var buffersThis = buffers;
      var bufferFirstIdxThis = bufferFirstIdx;

      //卡顿丢失补偿：因为设备很卡的时候导致H5接收到的数据量不够造成播放时候变速，结果比实际的时长要短，此处保证了不会变短，但不能修复丢失的音频数据造成音质变差。当前算法采用输入时间侦测下一帧是否需要添加补偿帧，需要(6次输入||超过1秒)以上才会开始侦测，如果滑动窗口内丢失超过1/3就会进行补偿
      var now = Date.now();
      var pcmTime = Math.round(size / bufferSampleRate * 1000);
      This.envInLast = now;
      if (This.buffers.length == 1) {
        //记下首个录音数据的录制时间
        This.envInFirst = now - pcmTime;
      }
      var envInFixTs = This.envInFixTs;
      envInFixTs.splice(0, 0, {
        t: now,
        d: pcmTime
      });
      //保留3秒的计数滑动窗口，另外超过3秒的停顿不补偿
      var tsInStart = now,
        tsPcm = 0;
      for (var i = 0; i < envInFixTs.length; i++) {
        var o = envInFixTs[i];
        if (now - o.t > 3000) {
          envInFixTs.length = i;
          break;
        }
        tsInStart = o.t;
        tsPcm += o.d;
      }
      //达到需要的数据量，开始侦测是否需要补偿
      var tsInPrev = envInFixTs[1];
      var tsIn = now - tsInStart;
      var lost = tsIn - tsPcm;
      if (lost > tsIn / 3 && (tsInPrev && tsIn > 1000 || envInFixTs.length >= 6)) {
        //丢失过多，开始执行补偿
        var addTime = now - tsInPrev.t - pcmTime; //距离上次输入丢失这么多ms
        if (addTime > pcmTime / 5) {
          //丢失超过本帧的1/5
          var fixOpen = !set.disableEnvInFix;
          This.CLog('[' + now + ']' + (fixOpen ? '' : '未') + '补偿' + addTime + 'ms', 3);
          This.envInFix += addTime;

          //用静默进行补偿
          if (fixOpen) {
            var addPcm = new Int16Array(addTime * bufferSampleRate / 1000);
            size += addPcm.length;
            buffers.push(addPcm);
          }
        }
      }
      var sizeOld = This.recSize,
        addSize = size;
      var bufferSize = sizeOld + addSize;
      This.recSize = bufferSize; //此值在onProcess后需要修正，可能新数据被修改

      //此类型有边录边转码(Worker)支持，开启实时转码
      if (engineCtx) {
        //转换成set的采样率
        var chunkInfo = Recorder.SampleData(buffers, bufferSampleRate, set.sampleRate, engineCtx.chunkInfo);
        engineCtx.chunkInfo = chunkInfo;
        sizeOld = engineCtx.pcmSize;
        addSize = chunkInfo.data.length;
        bufferSize = sizeOld + addSize;
        engineCtx.pcmSize = bufferSize; //此值在onProcess后需要修正，可能新数据被修改

        buffers = engineCtx.pcmDatas;
        bufferFirstIdx = buffers.length;
        buffers.push(chunkInfo.data);
        bufferSampleRate = chunkInfo.sampleRate;
      }
      var duration = Math.round(bufferSize / bufferSampleRate * 1000);
      var bufferNextIdx = buffers.length;
      var bufferNextIdxThis = buffersThis.length;

      //允许异步处理buffer数据
      var asyncEnd = function asyncEnd() {
        //重新计算size，异步的早已减去添加的，同步的需去掉本次添加的然后重新计算
        var num = asyncBegin ? 0 : -addSize;
        var hasClear = buffers[0] == null;
        for (var i = bufferFirstIdx; i < bufferNextIdx; i++) {
          var buffer = buffers[i];
          if (buffer == null) {
            //已被主动释放内存，比如长时间实时传输录音时
            hasClear = 1;
          } else {
            num += buffer.length;

            //推入后台边录边转码
            if (engineCtx && buffer.length) {
              This[set.type + '_encode'](engineCtx, buffer);
            }
          }
        }

        //同步清理This.buffers，不管buffers到底清了多少个，buffersThis是使用不到的进行全清
        if (hasClear && engineCtx) {
          var i = bufferFirstIdxThis;
          if (buffersThis[0]) {
            i = 0;
          }
          for (; i < bufferNextIdxThis; i++) {
            buffersThis[i] = null;
          }
        }

        //统计修改后的size，如果异步发生clear要原样加回来，同步的无需操作
        if (hasClear) {
          num = asyncBegin ? addSize : 0;
          buffers[0] = null; //彻底被清理
        }

        if (engineCtx) {
          engineCtx.pcmSize += num;
        } else {
          This.recSize += num;
        }
      };
      //实时回调处理数据，允许修改或替换上次回调以来新增的数据 ，但是不允许修改已处理过的，不允许增删第一维数组 ，允许将第二维数组任意修改替换成空数组也可以
      var asyncBegin = 0,
        procTxt = 'rec.set.onProcess';
      try {
        asyncBegin = set.onProcess(buffers, powerLevel, duration, bufferSampleRate, bufferFirstIdx, asyncEnd);
      } catch (e) {
        //此错误显示不要用CLog，这样控制台内相同内容不会重复打印
        console.error(procTxt + '回调出错是不允许的，需保证不会抛异常', e);
      }
      var slowT = Date.now() - now;
      if (slowT > 30) {
        This.CLog(procTxt + '低性能，耗时' + slowT + 'ms', 3);
      }
      if (asyncBegin === true) {
        //开启了异步模式，onProcess已接管buffers新数据，立即清空，避免出现未处理的数据
        var hasClear = 0;
        for (var i = bufferFirstIdx; i < bufferNextIdx; i++) {
          if (buffers[i] == null) {
            //已被主动释放内存，比如长时间实时传输录音时 ，但又要开启异步模式，此种情况是非法的
            hasClear = 1;
          } else {
            buffers[i] = new Int16Array(0);
          }
        }
        if (hasClear) {
          This.CLog('未进入异步前不能清除buffers', 3);
        } else {
          //还原size，异步结束后再统计仅修改后的size，如果发生clear要原样加回来
          if (engineCtx) {
            engineCtx.pcmSize -= addSize;
          } else {
            This.recSize -= addSize;
          }
        }
      } else {
        asyncEnd();
      }
    }

    //开始录音，需先调用open；只要open成功时，调用此方法是安全的，如果未open强行调用导致的内部错误将不会有任何提示，stop时自然能得到错误
    ,
    start: function start() {
      var This = this,
        ctx = Recorder.Ctx;
      var isOpen = 1;
      if (This.set.sourceStream) {
        //直接提供了流，仅判断是否调用了open
        if (!This.Stream) {
          isOpen = 0;
        }
      } else if (!Recorder.IsOpen()) {
        //监测全局麦克风是否打开并且有效
        isOpen = 0;
      }
      if (!isOpen) {
        This.CLog('未open', 1);
        return;
      }
      This.CLog('开始录音');
      This._stop();
      This.state = 0; //0未录音 1录音中 2暂停 3等待ctx激活
      This.envStart(null, ctx.sampleRate);

      //检查open过程中stop是否已经调用过
      if (This._SO && This._SO + 1 != This._S) {
        //上面调用过一次 _stop
        //open未完成就调用了stop，此种情况终止start。也应尽量避免出现此情况
        This.CLog('start被中断', 3);
        return;
      }
      This._SO = 0;
      var end = function end() {
        This.state = 1;
        This.resume();
      };
      if (ctx.state == 'suspended') {
        This.CLog('wait ctx resume...');
        This.state = 3; //此状态下 不管其他切换动作对state的改变
        ctx.resume().then(function () {
          This.CLog('ctx resume');
          if (This.state == 3) {
            end();
          }
        });
      } else {
        end();
      }
    }
    /*暂停录音*/,
    pause: function pause() {
      var This = this;
      if (This.state) {
        This.state = 2;
        This.CLog('pause');
        delete This._streamStore().Stream._call[This.id];
      }
    }
    /*恢复录音*/,
    resume: function resume() {
      var This = this;
      if (This.state) {
        This.state = 1;
        This.CLog('resume');
        This.envResume();
        var store = This._streamStore();
        store.Stream._call[This.id] = function (pcm, sum) {
          if (This.state == 1) {
            This.envIn(pcm, sum);
          }
        };
        ConnAlive(store); //AudioWorklet只会在ctx激活后运行
      }
    },

    _stop: function _stop(keepEngine) {
      var This = this,
        set = This.set;
      if (!This.isMock) {
        This._S++;
      }
      if (This.state) {
        This.pause();
        This.state = 0;
      }
      if (!keepEngine && This[set.type + '_stop']) {
        This[set.type + '_stop'](This.engineCtx);
        This.engineCtx = 0;
      }
    }
    /*
    结束录音并返回录音数据blob对象
      True(blob,duration) blob：录音数据audio/mp3|wav格式
                duration：录音时长，单位毫秒
      False(msg)
      autoClose:false 可选，是否自动调用close，默认为false
    */,
    stop: function stop(True, False, autoClose) {
      var This = this,
        set = This.set,
        t1;
      This.CLog('stop ' + (This.envInLast ? This.envInLast - This.envInFirst + 'ms 补' + This.envInFix + 'ms' : '-'));
      var end = function end() {
        This._stop(); //彻底关掉engineCtx
        if (autoClose) {
          This.close();
        }
      };
      var err = function err(msg) {
        This.CLog('结束录音失败：' + msg, 1);
        False && False(msg);
        end();
      };
      var ok = function ok(blob, duration) {
        This.CLog('结束录音 编码' + (Date.now() - t1) + 'ms 音频' + duration + 'ms/' + blob.size + 'b');
        if (set.takeoffEncodeChunk) {
          //接管了输出，此时blob长度为0
          This.CLog('启用takeoffEncodeChunk后stop返回的blob长度为0不提供音频数据', 3);
        } else if (blob.size < Math.max(100, duration / 2)) {
          //1秒小于0.5k？
          err('生成的' + set.type + '无效');
          return;
        }
        True && True(blob, duration);
        end();
      };
      if (!This.isMock) {
        var isCtxWait = This.state == 3;
        if (!This.state || isCtxWait) {
          err('未开始录音' + (isCtxWait ? '，开始录音前无用户交互导致AudioContext未运行' : ''));
          return;
        }
        This._stop(true);
      }
      var size = This.recSize;
      if (!size) {
        err('未采集到录音');
        return;
      }
      if (!This.buffers[0]) {
        err('音频buffers被释放');
        return;
      }
      // if (!This[set.type]) {
      //   err('未加载' + set.type + '编码器')
      //   return
      // }

      //环境配置检查，此处仅针对mock调用，因为open已经检查过了
      if (This.isMock) {
        var checkMsg = This.envCheck(This.mockEnvInfo || {
          envName: 'mock',
          canProcess: false
        }); //没有提供环境信息的mock时没有onProcess回调
        if (checkMsg) {
          err('录音错误：' + checkMsg);
          return;
        }
      }

      //此类型有边录边转码(Worker)支持
      var engineCtx = This.engineCtx;
      if (This[set.type + '_complete'] && engineCtx) {
        var duration = Math.round(engineCtx.pcmSize / set.sampleRate * 1000); //采用后的数据长度和buffers的长度可能微小的不一致，是采样率连续转换的精度问题

        t1 = Date.now();
        This[set.type + '_complete'](engineCtx, function (blob) {
          ok(blob, duration);
        }, err);
        return;
      }

      //标准UI线程转码，调整采样率
      t1 = Date.now();
      var chunk = Recorder.SampleData(This.buffers, This.srcSampleRate, set.sampleRate);
      set.sampleRate = chunk.sampleRate;
      var res = chunk.data;
      var duration = Math.round(res.length / set.sampleRate * 1000);
      This.CLog('采样' + size + '->' + res.length + ' 花:' + (Date.now() - t1) + 'ms');
      setTimeout(function () {
        t1 = Date.now();
        // This[set.type](res, function (blob) {
        //   ok(blob, duration, res)
        // }, function (msg) {
        //   err(msg)
        // })
        ok(res);
      });
    }
  };
  if (window[RecTxt]) {
    CLog('重复引入' + RecTxt, 3);
    window[RecTxt].Destroy();
  }
  window[RecTxt] = Recorder;

  //流量统计用1像素图片地址，设置为空将不参与统计
  Recorder.TrafficImgUrl = '//ia.51.la/go1?id=20469973&pvFlag=1';
  var Traffic = Recorder.Traffic = function (report) {
    report = report ? '/' + RecTxt + '/Report/' + report : '';
    var imgUrl = Recorder.TrafficImgUrl;
    if (imgUrl) {
      var data = Recorder.Traffic;
      var m = /^(https?:..[^\/#]*\/?)[^#]*/i.exec(location.href) || [];
      var host = m[1] || 'http://file/';
      var idf = (m[0] || host) + report;
      if (imgUrl.indexOf('//') == 0) {
        //给url加上http前缀，如果是file协议下，不加前缀没法用
        if (/^https:/i.test(idf)) {
          imgUrl = 'https:' + imgUrl;
        } else {
          imgUrl = 'http:' + imgUrl;
        }
      }
      if (report) {
        imgUrl = imgUrl + '&cu=' + encodeURIComponent(host + report);
      }
      if (!data[idf]) {
        data[idf] = 1;
        var img = new Image();
        img.src = imgUrl;
        CLog('Traffic Analysis Image: ' + (report || RecTxt + '.TrafficImgUrl=' + Recorder.TrafficImgUrl));
      }
    }
  };

  var mqtt_min = {exports: {}};

  (function (module, exports) {
    !function (e) {
      module.exports = e();
    }(function () {
      return function () {
        return function e(t, r, n) {
          function i(s, a) {
            if (!r[s]) {
              if (!t[s]) {
                var l = "function" == typeof commonjsRequire && commonjsRequire;
                if (!a && l) return l(s, !0);
                if (o) return o(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u;
              }
              var c = r[s] = {
                exports: {}
              };
              t[s][0].call(c.exports, function (e) {
                return i(t[s][1][e] || e);
              }, c, c.exports, e, t, r, n);
            }
            return r[s].exports;
          }
          for (var o = "function" == typeof commonjsRequire && commonjsRequire, s = 0; s < n.length; s++) i(n[s]);
          return i;
        };
      }()({
        1: [function (e, t, r) {
          (function (r, n) {
            (function () {

              const i = e("events").EventEmitter,
                o = e("./store"),
                s = e("./topic-alias-recv"),
                a = e("./topic-alias-send"),
                l = e("mqtt-packet"),
                u = e("./default-message-id-provider"),
                c = e("readable-stream").Writable,
                h = e("inherits"),
                f = e("reinterval"),
                p = e("rfdc/default"),
                d = e("./validations"),
                g = e("xtend"),
                y = e("debug")("mqttjs:client"),
                b = r ? r.nextTick : function (e) {
                  setTimeout(e, 0);
                },
                m = n.setImmediate || function (e) {
                  b(e);
                },
                v = {
                  keepalive: 60,
                  reschedulePings: !0,
                  protocolId: "MQTT",
                  protocolVersion: 4,
                  reconnectPeriod: 1e3,
                  connectTimeout: 3e4,
                  clean: !0,
                  resubscribe: !0
                },
                w = ["ECONNREFUSED", "EADDRINUSE", "ECONNRESET", "ENOTFOUND"],
                _ = {
                  0: "",
                  1: "Unacceptable protocol version",
                  2: "Identifier rejected",
                  3: "Server unavailable",
                  4: "Bad username or password",
                  5: "Not authorized",
                  16: "No matching subscribers",
                  17: "No subscription existed",
                  128: "Unspecified error",
                  129: "Malformed Packet",
                  130: "Protocol Error",
                  131: "Implementation specific error",
                  132: "Unsupported Protocol Version",
                  133: "Client Identifier not valid",
                  134: "Bad User Name or Password",
                  135: "Not authorized",
                  136: "Server unavailable",
                  137: "Server busy",
                  138: "Banned",
                  139: "Server shutting down",
                  140: "Bad authentication method",
                  141: "Keep Alive timeout",
                  142: "Session taken over",
                  143: "Topic Filter invalid",
                  144: "Topic Name invalid",
                  145: "Packet identifier in use",
                  146: "Packet Identifier not found",
                  147: "Receive Maximum exceeded",
                  148: "Topic Alias invalid",
                  149: "Packet too large",
                  150: "Message rate too high",
                  151: "Quota exceeded",
                  152: "Administrative action",
                  153: "Payload format invalid",
                  154: "Retain not supported",
                  155: "QoS not supported",
                  156: "Use another server",
                  157: "Server moved",
                  158: "Shared Subscriptions not supported",
                  159: "Connection rate exceeded",
                  160: "Maximum connect time",
                  161: "Subscription Identifiers not supported",
                  162: "Wildcard Subscriptions not supported"
                };
              function k(e, t) {
                let r;
                t.properties && (r = t.properties.topicAlias);
                let n = t.topic.toString();
                if (0 === n.length) {
                  if (void 0 === r) return new Error("Unregistered Topic Alias");
                  if (void 0 === (n = e.topicAliasSend.getTopicByAlias(r))) return new Error("Unregistered Topic Alias");
                  t.topic = n;
                }
                r && delete t.properties.topicAlias;
              }
              function S(e, t, r) {
                y("sendPacket :: packet: %O", t), y("sendPacket :: emitting `packetsend`"), e.emit("packetsend", t), y("sendPacket :: writing to stream");
                const n = l.writeToStream(t, e.stream, e.options);
                y("sendPacket :: writeToStream result %s", n), !n && r && r !== C ? (y("sendPacket :: handle events on `drain` once through callback."), e.stream.once("drain", r)) : r && (y("sendPacket :: invoking cb"), r());
              }
              function E(e, t, r, n) {
                y("storeAndSend :: store packet with cmd %s to outgoingStore", t.cmd);
                let i,
                  o = t;
                if ("publish" === o.cmd && (o = p(t), i = k(e, o))) return r && r(i);
                e.outgoingStore.put(o, function (i) {
                  if (i) return r && r(i);
                  n(), S(e, t, r);
                });
              }
              function C(e) {
                y("nop ::", e);
              }
              function T(e, t) {
                let r;
                const n = this;
                if (!(this instanceof T)) return new T(e, t);
                for (r in this.options = t || {}, v) void 0 === this.options[r] ? this.options[r] = v[r] : this.options[r] = t[r];
                y("MqttClient :: options.protocol", t.protocol), y("MqttClient :: options.protocolVersion", t.protocolVersion), y("MqttClient :: options.username", t.username), y("MqttClient :: options.keepalive", t.keepalive), y("MqttClient :: options.reconnectPeriod", t.reconnectPeriod), y("MqttClient :: options.rejectUnauthorized", t.rejectUnauthorized), y("MqttClient :: options.topicAliasMaximum", t.topicAliasMaximum), this.options.clientId = "string" == typeof t.clientId ? t.clientId : "mqttjs_" + Math.random().toString(16).substr(2, 8), y("MqttClient :: clientId", this.options.clientId), this.options.customHandleAcks = 5 === t.protocolVersion && t.customHandleAcks ? t.customHandleAcks : function () {
                  arguments[3](0);
                }, this.streamBuilder = e, this.messageIdProvider = void 0 === this.options.messageIdProvider ? new u() : this.options.messageIdProvider, this.outgoingStore = t.outgoingStore || new o(), this.incomingStore = t.incomingStore || new o(), this.queueQoSZero = void 0 === t.queueQoSZero || t.queueQoSZero, this._resubscribeTopics = {}, this.messageIdToTopic = {}, this.pingTimer = null, this.connected = !1, this.disconnecting = !1, this.queue = [], this.connackTimer = null, this.reconnectTimer = null, this._storeProcessing = !1, this._packetIdsDuringStoreProcessing = {}, this._storeProcessingQueue = [], this.outgoing = {}, this._firstConnection = !0, t.topicAliasMaximum > 0 && (t.topicAliasMaximum > 65535 ? y("MqttClient :: options.topicAliasMaximum is out of range") : this.topicAliasRecv = new s(t.topicAliasMaximum)), this.on("connect", function () {
                  const e = this.queue;
                  y("connect :: sending queued packets"), function t() {
                    const r = e.shift();
                    y("deliver :: entry %o", r);
                    let i = null;
                    if (!r) return void n._resubscribe();
                    i = r.packet, y("deliver :: call _sendPacket for %o", i);
                    let o = !0;
                    i.messageId && 0 !== i.messageId && (n.messageIdProvider.register(i.messageId) || (o = !1)), o ? n._sendPacket(i, function (e) {
                      r.cb && r.cb(e), t();
                    }) : (y("messageId: %d has already used. The message is skipped and removed.", i.messageId), t());
                  }();
                }), this.on("close", function () {
                  y("close :: connected set to `false`"), this.connected = !1, y("close :: clearing connackTimer"), clearTimeout(this.connackTimer), y("close :: clearing ping timer"), null !== n.pingTimer && (n.pingTimer.clear(), n.pingTimer = null), this.topicAliasRecv && this.topicAliasRecv.clear(), y("close :: calling _setupReconnect"), this._setupReconnect();
                }), i.call(this), y("MqttClient :: setting up stream"), this._setupStream();
              }
              h(T, i), T.prototype._setupStream = function () {
                const e = this,
                  t = new c(),
                  r = l.parser(this.options);
                let n = null;
                const i = [];
                function o() {
                  if (i.length) b(s);else {
                    const e = n;
                    n = null, e();
                  }
                }
                function s() {
                  y("work :: getting next packet in queue");
                  const t = i.shift();
                  if (t) y("work :: packet pulled from queue"), e._handlePacket(t, o);else {
                    y("work :: no packets in queue");
                    const e = n;
                    n = null, y("work :: done flag is %s", !!e), e && e();
                  }
                }
                y("_setupStream :: calling method to clear reconnect"), this._clearReconnect(), y("_setupStream :: using streamBuilder provided to client to create stream"), this.stream = this.streamBuilder(this), r.on("packet", function (e) {
                  y("parser :: on packet push to packets array."), i.push(e);
                }), t._write = function (e, t, i) {
                  n = i, y("writable stream :: parsing buffer"), r.parse(e), s();
                }, y("_setupStream :: pipe stream to writable stream"), this.stream.pipe(t), this.stream.on("error", function (t) {
                  y("streamErrorHandler :: error", t.message), w.includes(t.code) ? (y("streamErrorHandler :: emitting error"), e.emit("error", t)) : C(t);
                }), this.stream.on("close", function () {
                  var t;
                  y("(%s)stream :: on close", e.options.clientId), (t = e.outgoing) && (y("flushVolatile :: deleting volatile messages from the queue and setting their callbacks as error function"), Object.keys(t).forEach(function (e) {
                    t[e].volatile && "function" == typeof t[e].cb && (t[e].cb(new Error("Connection closed")), delete t[e]);
                  })), y("stream: emit close to MqttClient"), e.emit("close");
                }), y("_setupStream: sending packet `connect`");
                const a = Object.create(this.options);
                if (a.cmd = "connect", this.topicAliasRecv && (a.properties || (a.properties = {}), this.topicAliasRecv && (a.properties.topicAliasMaximum = this.topicAliasRecv.max)), S(this, a), r.on("error", this.emit.bind(this, "error")), this.options.properties) {
                  if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData) return e.end(() => this.emit("error", new Error("Packet has no Authentication Method"))), this;
                  if (this.options.properties.authenticationMethod && this.options.authPacket && "object" == typeof this.options.authPacket) {
                    S(this, g({
                      cmd: "auth",
                      reasonCode: 0
                    }, this.options.authPacket));
                  }
                }
                this.stream.setMaxListeners(1e3), clearTimeout(this.connackTimer), this.connackTimer = setTimeout(function () {
                  y("!!connectTimeout hit!! Calling _cleanUp with force `true`"), e._cleanUp(!0);
                }, this.options.connectTimeout);
              }, T.prototype._handlePacket = function (e, t) {
                const r = this.options;
                if (5 === r.protocolVersion && r.properties && r.properties.maximumPacketSize && r.properties.maximumPacketSize < e.length) return this.emit("error", new Error("exceeding packets size " + e.cmd)), this.end({
                  reasonCode: 149,
                  properties: {
                    reasonString: "Maximum packet size was exceeded"
                  }
                }), this;
                switch (y("_handlePacket :: emitting packetreceive"), this.emit("packetreceive", e), e.cmd) {
                  case "publish":
                    this._handlePublish(e, t);
                    break;
                  case "puback":
                  case "pubrec":
                  case "pubcomp":
                  case "suback":
                  case "unsuback":
                    this._handleAck(e), t();
                    break;
                  case "pubrel":
                    this._handlePubrel(e, t);
                    break;
                  case "connack":
                    this._handleConnack(e), t();
                    break;
                  case "auth":
                    this._handleAuth(e), t();
                    break;
                  case "pingresp":
                    this._handlePingresp(e), t();
                    break;
                  case "disconnect":
                    this._handleDisconnect(e), t();
                }
              }, T.prototype._checkDisconnecting = function (e) {
                return this.disconnecting && (e && e !== C ? e(new Error("client disconnecting")) : this.emit("error", new Error("client disconnecting"))), this.disconnecting;
              }, T.prototype.publish = function (e, t, r, n) {
                y("publish :: message `%s` to topic `%s`", t, e);
                const i = this.options;
                "function" == typeof r && (n = r, r = null);
                if (r = g({
                  qos: 0,
                  retain: !1,
                  dup: !1
                }, r), this._checkDisconnecting(n)) return this;
                const o = this,
                  s = function () {
                    let s = 0;
                    if ((1 === r.qos || 2 === r.qos) && null === (s = o._nextId())) return y("No messageId left"), !1;
                    const a = {
                      cmd: "publish",
                      topic: e,
                      payload: t,
                      qos: r.qos,
                      retain: r.retain,
                      messageId: s,
                      dup: r.dup
                    };
                    switch (5 === i.protocolVersion && (a.properties = r.properties), y("publish :: qos", r.qos), r.qos) {
                      case 1:
                      case 2:
                        o.outgoing[a.messageId] = {
                          volatile: !1,
                          cb: n || C
                        }, y("MqttClient:publish: packet cmd: %s", a.cmd), o._sendPacket(a, void 0, r.cbStorePut);
                        break;
                      default:
                        y("MqttClient:publish: packet cmd: %s", a.cmd), o._sendPacket(a, n, r.cbStorePut);
                    }
                    return !0;
                  };
                return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !s()) && this._storeProcessingQueue.push({
                  invoke: s,
                  cbStorePut: r.cbStorePut,
                  callback: n
                }), this;
              }, T.prototype.subscribe = function () {
                const e = this,
                  t = new Array(arguments.length);
                for (let e = 0; e < arguments.length; e++) t[e] = arguments[e];
                const r = [];
                let n = t.shift();
                const i = n.resubscribe;
                let o = t.pop() || C,
                  s = t.pop();
                const a = this.options.protocolVersion;
                delete n.resubscribe, "string" == typeof n && (n = [n]), "function" != typeof o && (s = o, o = C);
                const l = d.validateTopics(n);
                if (null !== l) return m(o, new Error("Invalid topic " + l)), this;
                if (this._checkDisconnecting(o)) return y("subscribe: discconecting true"), this;
                const u = {
                  qos: 0
                };
                if (5 === a && (u.nl = !1, u.rap = !1, u.rh = 0), s = g(u, s), Array.isArray(n) ? n.forEach(function (t) {
                  if (y("subscribe: array topic %s", t), !Object.prototype.hasOwnProperty.call(e._resubscribeTopics, t) || e._resubscribeTopics[t].qos < s.qos || i) {
                    const e = {
                      topic: t,
                      qos: s.qos
                    };
                    5 === a && (e.nl = s.nl, e.rap = s.rap, e.rh = s.rh, e.properties = s.properties), y("subscribe: pushing topic `%s` and qos `%s` to subs list", e.topic, e.qos), r.push(e);
                  }
                }) : Object.keys(n).forEach(function (t) {
                  if (y("subscribe: object topic %s", t), !Object.prototype.hasOwnProperty.call(e._resubscribeTopics, t) || e._resubscribeTopics[t].qos < n[t].qos || i) {
                    const e = {
                      topic: t,
                      qos: n[t].qos
                    };
                    5 === a && (e.nl = n[t].nl, e.rap = n[t].rap, e.rh = n[t].rh, e.properties = s.properties), y("subscribe: pushing `%s` to subs list", e), r.push(e);
                  }
                }), !r.length) return o(null, []), this;
                const c = function () {
                  const t = e._nextId();
                  if (null === t) return y("No messageId left"), !1;
                  const n = {
                    cmd: "subscribe",
                    subscriptions: r,
                    qos: 1,
                    retain: !1,
                    dup: !1,
                    messageId: t
                  };
                  if (s.properties && (n.properties = s.properties), e.options.resubscribe) {
                    y("subscribe :: resubscribe true");
                    const t = [];
                    r.forEach(function (r) {
                      if (e.options.reconnectPeriod > 0) {
                        const n = {
                          qos: r.qos
                        };
                        5 === a && (n.nl = r.nl || !1, n.rap = r.rap || !1, n.rh = r.rh || 0, n.properties = r.properties), e._resubscribeTopics[r.topic] = n, t.push(r.topic);
                      }
                    }), e.messageIdToTopic[n.messageId] = t;
                  }
                  return e.outgoing[n.messageId] = {
                    volatile: !0,
                    cb: function (e, t) {
                      if (!e) {
                        const e = t.granted;
                        for (let t = 0; t < e.length; t += 1) r[t].qos = e[t];
                      }
                      o(e, r);
                    }
                  }, y("subscribe :: call _sendPacket"), e._sendPacket(n), !0;
                };
                return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !c()) && this._storeProcessingQueue.push({
                  invoke: c,
                  callback: o
                }), this;
              }, T.prototype.unsubscribe = function () {
                const e = this,
                  t = new Array(arguments.length);
                for (let e = 0; e < arguments.length; e++) t[e] = arguments[e];
                let r = t.shift(),
                  n = t.pop() || C,
                  i = t.pop();
                "string" == typeof r && (r = [r]), "function" != typeof n && (i = n, n = C);
                const o = d.validateTopics(r);
                if (null !== o) return m(n, new Error("Invalid topic " + o)), this;
                if (e._checkDisconnecting(n)) return this;
                const s = function () {
                  const t = e._nextId();
                  if (null === t) return y("No messageId left"), !1;
                  const o = {
                    cmd: "unsubscribe",
                    qos: 1,
                    messageId: t
                  };
                  return "string" == typeof r ? o.unsubscriptions = [r] : Array.isArray(r) && (o.unsubscriptions = r), e.options.resubscribe && o.unsubscriptions.forEach(function (t) {
                    delete e._resubscribeTopics[t];
                  }), "object" == typeof i && i.properties && (o.properties = i.properties), e.outgoing[o.messageId] = {
                    volatile: !0,
                    cb: n
                  }, y("unsubscribe: call _sendPacket"), e._sendPacket(o), !0;
                };
                return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !s()) && this._storeProcessingQueue.push({
                  invoke: s,
                  callback: n
                }), this;
              }, T.prototype.end = function (e, t, r) {
                const n = this;
                function i() {
                  y("end :: (%s) :: finish :: calling _cleanUp with force %s", n.options.clientId, e), n._cleanUp(e, () => {
                    y("end :: finish :: calling process.nextTick on closeStores"), b(function () {
                      y("end :: closeStores: closing incoming and outgoing stores"), n.disconnected = !0, n.incomingStore.close(function (e) {
                        n.outgoingStore.close(function (t) {
                          if (y("end :: closeStores: emitting end"), n.emit("end"), r) {
                            const n = e || t;
                            y("end :: closeStores: invoking callback with args"), r(n);
                          }
                        });
                      }), n._deferredReconnect && n._deferredReconnect();
                    }.bind(n));
                  }, t);
                }
                return y("end :: (%s)", this.options.clientId), null != e && "boolean" == typeof e || (r = t || C, t = e, e = !1, "object" != typeof t && (r = t, t = null, "function" != typeof r && (r = C))), "object" != typeof t && (r = t, t = null), y("end :: cb? %s", !!r), r = r || C, this.disconnecting ? (r(), this) : (this._clearReconnect(), this.disconnecting = !0, !e && Object.keys(this.outgoing).length > 0 ? (y("end :: (%s) :: calling finish in 10ms once outgoing is empty", n.options.clientId), this.once("outgoingEmpty", setTimeout.bind(null, i, 10))) : (y("end :: (%s) :: immediately calling finish", n.options.clientId), i()), this);
              }, T.prototype.removeOutgoingMessage = function (e) {
                const t = this.outgoing[e] ? this.outgoing[e].cb : null;
                return delete this.outgoing[e], this.outgoingStore.del({
                  messageId: e
                }, function () {
                  t(new Error("Message removed"));
                }), this;
              }, T.prototype.reconnect = function (e) {
                y("client reconnect");
                const t = this,
                  r = function () {
                    e ? (t.options.incomingStore = e.incomingStore, t.options.outgoingStore = e.outgoingStore) : (t.options.incomingStore = null, t.options.outgoingStore = null), t.incomingStore = t.options.incomingStore || new o(), t.outgoingStore = t.options.outgoingStore || new o(), t.disconnecting = !1, t.disconnected = !1, t._deferredReconnect = null, t._reconnect();
                  };
                return this.disconnecting && !this.disconnected ? this._deferredReconnect = r : r(), this;
              }, T.prototype._reconnect = function () {
                y("_reconnect: emitting reconnect to client"), this.emit("reconnect"), this.connected ? (this.end(() => {
                  this._setupStream();
                }), y("client already connected. disconnecting first.")) : (y("_reconnect: calling _setupStream"), this._setupStream());
              }, T.prototype._setupReconnect = function () {
                const e = this;
                !e.disconnecting && !e.reconnectTimer && e.options.reconnectPeriod > 0 ? (this.reconnecting || (y("_setupReconnect :: emit `offline` state"), this.emit("offline"), y("_setupReconnect :: set `reconnecting` to `true`"), this.reconnecting = !0), y("_setupReconnect :: setting reconnectTimer for %d ms", e.options.reconnectPeriod), e.reconnectTimer = setInterval(function () {
                  y("reconnectTimer :: reconnect triggered!"), e._reconnect();
                }, e.options.reconnectPeriod)) : y("_setupReconnect :: doing nothing...");
              }, T.prototype._clearReconnect = function () {
                y("_clearReconnect : clearing reconnect timer"), this.reconnectTimer && (clearInterval(this.reconnectTimer), this.reconnectTimer = null);
              }, T.prototype._cleanUp = function (e, t) {
                const r = arguments[2];
                if (t && (y("_cleanUp :: done callback provided for on stream close"), this.stream.on("close", t)), y("_cleanUp :: forced? %s", e), e) 0 === this.options.reconnectPeriod && this.options.clean && (n = this.outgoing) && (y("flush: queue exists? %b", !!n), Object.keys(n).forEach(function (e) {
                  "function" == typeof n[e].cb && (n[e].cb(new Error("Connection closed")), delete n[e]);
                })), y("_cleanUp :: (%s) :: destroying stream", this.options.clientId), this.stream.destroy();else {
                  const e = g({
                    cmd: "disconnect"
                  }, r);
                  y("_cleanUp :: (%s) :: call _sendPacket with disconnect packet", this.options.clientId), this._sendPacket(e, m.bind(null, this.stream.end.bind(this.stream)));
                }
                var n;
                this.disconnecting || (y("_cleanUp :: client not disconnecting. Clearing and resetting reconnect."), this._clearReconnect(), this._setupReconnect()), null !== this.pingTimer && (y("_cleanUp :: clearing pingTimer"), this.pingTimer.clear(), this.pingTimer = null), t && !this.connected && (y("_cleanUp :: (%s) :: removing stream `done` callback `close` listener", this.options.clientId), this.stream.removeListener("close", t), t());
              }, T.prototype._sendPacket = function (e, t, r) {
                y("_sendPacket :: (%s) ::  start", this.options.clientId), r = r || C, t = t || C;
                const n = function (e, t) {
                  if (5 === e.options.protocolVersion && "publish" === t.cmd) {
                    let r;
                    t.properties && (r = t.properties.topicAlias);
                    const n = t.topic.toString();
                    if (e.topicAliasSend) {
                      if (r) {
                        if (0 !== n.length && (y("applyTopicAlias :: register topic: %s - alias: %d", n, r), !e.topicAliasSend.put(n, r))) return y("applyTopicAlias :: error out of range. topic: %s - alias: %d", n, r), new Error("Sending Topic Alias out of range");
                      } else 0 !== n.length && (e.options.autoAssignTopicAlias ? (r = e.topicAliasSend.getAliasByTopic(n)) ? (t.topic = "", t.properties = {
                        ...t.properties,
                        topicAlias: r
                      }, y("applyTopicAlias :: auto assign(use) topic: %s - alias: %d", n, r)) : (r = e.topicAliasSend.getLruAlias(), e.topicAliasSend.put(n, r), t.properties = {
                        ...t.properties,
                        topicAlias: r
                      }, y("applyTopicAlias :: auto assign topic: %s - alias: %d", n, r)) : e.options.autoUseTopicAlias && (r = e.topicAliasSend.getAliasByTopic(n)) && (t.topic = "", t.properties = {
                        ...t.properties,
                        topicAlias: r
                      }, y("applyTopicAlias :: auto use topic: %s - alias: %d", n, r)));
                    } else if (r) return y("applyTopicAlias :: error out of range. topic: %s - alias: %d", n, r), new Error("Sending Topic Alias out of range");
                  }
                }(this, e);
                if (n) t(n);else {
                  if (!this.connected) return "auth" === e.cmd ? (this._shiftPingInterval(), void S(this, e, t)) : (y("_sendPacket :: client not connected. Storing packet offline."), void this._storePacket(e, t, r));
                  switch (this._shiftPingInterval(), e.cmd) {
                    case "publish":
                      break;
                    case "pubrel":
                      return void E(this, e, t, r);
                    default:
                      return void S(this, e, t);
                  }
                  switch (e.qos) {
                    case 2:
                    case 1:
                      E(this, e, t, r);
                      break;
                    case 0:
                    default:
                      S(this, e, t);
                  }
                  y("_sendPacket :: (%s) ::  end", this.options.clientId);
                }
              }, T.prototype._storePacket = function (e, t, r) {
                y("_storePacket :: packet: %o", e), y("_storePacket :: cb? %s", !!t), r = r || C;
                let n = e;
                if ("publish" === n.cmd) {
                  const r = k(this, n = p(e));
                  if (r) return t && t(r);
                }
                0 === (n.qos || 0) && this.queueQoSZero || "publish" !== n.cmd ? this.queue.push({
                  packet: n,
                  cb: t
                }) : n.qos > 0 ? (t = this.outgoing[n.messageId] ? this.outgoing[n.messageId].cb : null, this.outgoingStore.put(n, function (e) {
                  if (e) return t && t(e);
                  r();
                })) : t && t(new Error("No connection to broker"));
              }, T.prototype._setupPingTimer = function () {
                y("_setupPingTimer :: keepalive %d (seconds)", this.options.keepalive);
                const e = this;
                !this.pingTimer && this.options.keepalive && (this.pingResp = !0, this.pingTimer = f(function () {
                  e._checkPing();
                }, 1e3 * this.options.keepalive));
              }, T.prototype._shiftPingInterval = function () {
                this.pingTimer && this.options.keepalive && this.options.reschedulePings && this.pingTimer.reschedule(1e3 * this.options.keepalive);
              }, T.prototype._checkPing = function () {
                y("_checkPing :: checking ping..."), this.pingResp ? (y("_checkPing :: ping response received. Clearing flag and sending `pingreq`"), this.pingResp = !1, this._sendPacket({
                  cmd: "pingreq"
                })) : (y("_checkPing :: calling _cleanUp with force true"), this._cleanUp(!0));
              }, T.prototype._handlePingresp = function () {
                this.pingResp = !0;
              }, T.prototype._handleConnack = function (e) {
                y("_handleConnack");
                const t = this.options,
                  r = 5 === t.protocolVersion ? e.reasonCode : e.returnCode;
                if (clearTimeout(this.connackTimer), delete this.topicAliasSend, e.properties) {
                  if (e.properties.topicAliasMaximum) {
                    if (e.properties.topicAliasMaximum > 65535) return void this.emit("error", new Error("topicAliasMaximum from broker is out of range"));
                    e.properties.topicAliasMaximum > 0 && (this.topicAliasSend = new a(e.properties.topicAliasMaximum));
                  }
                  e.properties.serverKeepAlive && t.keepalive && (t.keepalive = e.properties.serverKeepAlive, this._shiftPingInterval()), e.properties.maximumPacketSize && (t.properties || (t.properties = {}), t.properties.maximumPacketSize = e.properties.maximumPacketSize);
                }
                if (0 === r) this.reconnecting = !1, this._onConnect(e);else if (r > 0) {
                  const e = new Error("Connection refused: " + _[r]);
                  e.code = r, this.emit("error", e);
                }
              }, T.prototype._handleAuth = function (e) {
                const t = this.options.protocolVersion,
                  r = 5 === t ? e.reasonCode : e.returnCode;
                if (5 !== t) {
                  const e = new Error("Protocol error: Auth packets are only supported in MQTT 5. Your version:" + t);
                  return e.code = r, void this.emit("error", e);
                }
                const n = this;
                this.handleAuth(e, function (e, t) {
                  if (e) n.emit("error", e);else if (24 === r) n.reconnecting = !1, n._sendPacket(t);else {
                    const t = new Error("Connection refused: " + _[r]);
                    e.code = r, n.emit("error", t);
                  }
                });
              }, T.prototype.handleAuth = function (e, t) {
                t();
              }, T.prototype._handlePublish = function (e, t) {
                y("_handlePublish: packet %o", e), t = void 0 !== t ? t : C;
                let r = e.topic.toString();
                const n = e.payload,
                  i = e.qos,
                  o = e.messageId,
                  s = this,
                  a = this.options,
                  l = [0, 16, 128, 131, 135, 144, 145, 151, 153];
                if (5 === this.options.protocolVersion) {
                  let t;
                  if (e.properties && (t = e.properties.topicAlias), void 0 !== t) if (0 === r.length) {
                    if (!(t > 0 && t <= 65535)) return y("_handlePublish :: topic alias out of range. alias: %d", t), void this.emit("error", new Error("Received Topic Alias is out of range"));
                    {
                      const e = this.topicAliasRecv.getTopicByAlias(t);
                      if (!e) return y("_handlePublish :: unregistered topic alias. alias: %d", t), void this.emit("error", new Error("Received unregistered Topic Alias"));
                      y("_handlePublish :: topic complemented by alias. topic: %s - alias: %d", r = e, t);
                    }
                  } else {
                    if (!this.topicAliasRecv.put(r, t)) return y("_handlePublish :: topic alias out of range. alias: %d", t), void this.emit("error", new Error("Received Topic Alias is out of range"));
                    y("_handlePublish :: registered topic: %s - alias: %d", r, t);
                  }
                }
                switch (y("_handlePublish: qos %d", i), i) {
                  case 2:
                    a.customHandleAcks(r, n, e, function (r, n) {
                      return r instanceof Error || (n = r, r = null), r ? s.emit("error", r) : -1 === l.indexOf(n) ? s.emit("error", new Error("Wrong reason code for pubrec")) : void (n ? s._sendPacket({
                        cmd: "pubrec",
                        messageId: o,
                        reasonCode: n
                      }, t) : s.incomingStore.put(e, function () {
                        s._sendPacket({
                          cmd: "pubrec",
                          messageId: o
                        }, t);
                      }));
                    });
                    break;
                  case 1:
                    a.customHandleAcks(r, n, e, function (i, a) {
                      return i instanceof Error || (a = i, i = null), i ? s.emit("error", i) : -1 === l.indexOf(a) ? s.emit("error", new Error("Wrong reason code for puback")) : (a || s.emit("message", r, n, e), void s.handleMessage(e, function (e) {
                        if (e) return t && t(e);
                        s._sendPacket({
                          cmd: "puback",
                          messageId: o,
                          reasonCode: a
                        }, t);
                      }));
                    });
                    break;
                  case 0:
                    this.emit("message", r, n, e), this.handleMessage(e, t);
                    break;
                  default:
                    y("_handlePublish: unknown QoS. Doing nothing.");
                }
              }, T.prototype.handleMessage = function (e, t) {
                t();
              }, T.prototype._handleAck = function (e) {
                const t = e.messageId,
                  r = e.cmd;
                let n = null;
                const i = this.outgoing[t] ? this.outgoing[t].cb : null,
                  o = this;
                let s;
                if (i) {
                  switch (y("_handleAck :: packet type", r), r) {
                    case "pubcomp":
                    case "puback":
                      {
                        const r = e.reasonCode;
                        r && r > 0 && 16 !== r && ((s = new Error("Publish error: " + _[r])).code = r, i(s, e)), delete this.outgoing[t], this.outgoingStore.del(e, i), this.messageIdProvider.deallocate(t), this._invokeStoreProcessingQueue();
                        break;
                      }
                    case "pubrec":
                      {
                        n = {
                          cmd: "pubrel",
                          qos: 2,
                          messageId: t
                        };
                        const r = e.reasonCode;
                        r && r > 0 && 16 !== r ? ((s = new Error("Publish error: " + _[r])).code = r, i(s, e)) : this._sendPacket(n);
                        break;
                      }
                    case "suback":
                      delete this.outgoing[t], this.messageIdProvider.deallocate(t);
                      for (let r = 0; r < e.granted.length; r++) if (0 != (128 & e.granted[r])) {
                        const e = this.messageIdToTopic[t];
                        e && e.forEach(function (e) {
                          delete o._resubscribeTopics[e];
                        });
                      }
                      this._invokeStoreProcessingQueue(), i(null, e);
                      break;
                    case "unsuback":
                      delete this.outgoing[t], this.messageIdProvider.deallocate(t), this._invokeStoreProcessingQueue(), i(null);
                      break;
                    default:
                      o.emit("error", new Error("unrecognized packet type"));
                  }
                  this.disconnecting && 0 === Object.keys(this.outgoing).length && this.emit("outgoingEmpty");
                } else y("_handleAck :: Server sent an ack in error. Ignoring.");
              }, T.prototype._handlePubrel = function (e, t) {
                y("handling pubrel packet"), t = void 0 !== t ? t : C;
                const r = this,
                  n = {
                    cmd: "pubcomp",
                    messageId: e.messageId
                  };
                r.incomingStore.get(e, function (e, i) {
                  e ? r._sendPacket(n, t) : (r.emit("message", i.topic, i.payload, i), r.handleMessage(i, function (e) {
                    if (e) return t(e);
                    r.incomingStore.del(i, C), r._sendPacket(n, t);
                  }));
                });
              }, T.prototype._handleDisconnect = function (e) {
                this.emit("disconnect", e);
              }, T.prototype._nextId = function () {
                return this.messageIdProvider.allocate();
              }, T.prototype.getLastMessageId = function () {
                return this.messageIdProvider.getLastAllocated();
              }, T.prototype._resubscribe = function () {
                y("_resubscribe");
                const e = Object.keys(this._resubscribeTopics);
                if (!this._firstConnection && (this.options.clean || 5 === this.options.protocolVersion && !this.connackPacket.sessionPresent) && e.length > 0) if (this.options.resubscribe) {
                  if (5 === this.options.protocolVersion) {
                    y("_resubscribe: protocolVersion 5");
                    for (let t = 0; t < e.length; t++) {
                      const r = {};
                      r[e[t]] = this._resubscribeTopics[e[t]], r.resubscribe = !0, this.subscribe(r, {
                        properties: r[e[t]].properties
                      });
                    }
                  } else this._resubscribeTopics.resubscribe = !0, this.subscribe(this._resubscribeTopics);
                } else this._resubscribeTopics = {};
                this._firstConnection = !1;
              }, T.prototype._onConnect = function (e) {
                if (this.disconnected) return void this.emit("connect", e);
                const t = this;
                this.connackPacket = e, this.messageIdProvider.clear(), this._setupPingTimer(), this.connected = !0, function r() {
                  let n = t.outgoingStore.createStream();
                  function i() {
                    t._storeProcessing = !1, t._packetIdsDuringStoreProcessing = {};
                  }
                  function o() {
                    n.destroy(), n = null, t._flushStoreProcessingQueue(), i();
                  }
                  t.once("close", o), n.on("error", function (e) {
                    i(), t._flushStoreProcessingQueue(), t.removeListener("close", o), t.emit("error", e);
                  }), n.on("end", function () {
                    let n = !0;
                    for (const e in t._packetIdsDuringStoreProcessing) if (!t._packetIdsDuringStoreProcessing[e]) {
                      n = !1;
                      break;
                    }
                    n ? (i(), t.removeListener("close", o), t._invokeAllStoreProcessingQueue(), t.emit("connect", e)) : r();
                  }), function e() {
                    if (!n) return;
                    t._storeProcessing = !0;
                    const r = n.read(1);
                    let i;
                    r ? t._packetIdsDuringStoreProcessing[r.messageId] ? e() : t.disconnecting || t.reconnectTimer ? n.destroy && n.destroy() : (i = t.outgoing[r.messageId] ? t.outgoing[r.messageId].cb : null, t.outgoing[r.messageId] = {
                      volatile: !1,
                      cb: function (t, r) {
                        i && i(t, r), e();
                      }
                    }, t._packetIdsDuringStoreProcessing[r.messageId] = !0, t.messageIdProvider.register(r.messageId) ? t._sendPacket(r) : y("messageId: %d has already used.", r.messageId)) : n.once("readable", e);
                  }();
                }();
              }, T.prototype._invokeStoreProcessingQueue = function () {
                if (this._storeProcessingQueue.length > 0) {
                  const e = this._storeProcessingQueue[0];
                  if (e && e.invoke()) return this._storeProcessingQueue.shift(), !0;
                }
                return !1;
              }, T.prototype._invokeAllStoreProcessingQueue = function () {
                for (; this._invokeStoreProcessingQueue(););
              }, T.prototype._flushStoreProcessingQueue = function () {
                for (const e of this._storeProcessingQueue) e.cbStorePut && e.cbStorePut(new Error("Connection closed")), e.callback && e.callback(new Error("Connection closed"));
                this._storeProcessingQueue.splice(0);
              }, t.exports = T;
            }).call(this);
          }).call(this, e("_process"), "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
          "./default-message-id-provider": 7,
          "./store": 8,
          "./topic-alias-recv": 9,
          "./topic-alias-send": 10,
          "./validations": 11,
          _process: 50,
          debug: 18,
          events: 22,
          inherits: 24,
          "mqtt-packet": 40,
          "readable-stream": 69,
          reinterval: 70,
          "rfdc/default": 71,
          xtend: 81
        }],
        2: [function (e, t, r) {

          const {
              Buffer: n
            } = e("buffer"),
            i = e("readable-stream").Transform,
            o = e("duplexify");
          let s,
            a,
            l,
            u = !1;
          t.exports = function (e, t) {
            if (t.hostname = t.hostname || t.host, !t.hostname) throw new Error("Could not determine host. Specify host manually.");
            const r = "MQIsdp" === t.protocolId && 3 === t.protocolVersion ? "mqttv3.1" : "mqtt";
            !function (e) {
              e.hostname || (e.hostname = "localhost"), e.path || (e.path = "/"), e.wsOptions || (e.wsOptions = {});
            }(t);
            const c = function (e, t) {
              const r = "alis" === e.protocol ? "wss" : "ws";
              let n = r + "://" + e.hostname + e.path;
              return e.port && 80 !== e.port && 443 !== e.port && (n = r + "://" + e.hostname + ":" + e.port + e.path), "function" == typeof e.transformWsUrl && (n = e.transformWsUrl(n, e, t)), n;
            }(t, e);
            return (s = t.my).connectSocket({
              url: c,
              protocols: r
            }), a = function () {
              const e = new i();
              return e._write = function (e, t, r) {
                s.sendSocketMessage({
                  data: e.buffer,
                  success: function () {
                    r();
                  },
                  fail: function () {
                    r(new Error());
                  }
                });
              }, e._flush = function (e) {
                s.closeSocket({
                  success: function () {
                    e();
                  }
                });
              }, e;
            }(), l = o.obj(), u || (u = !0, s.onSocketOpen(function () {
              l.setReadable(a), l.setWritable(a), l.emit("connect");
            }), s.onSocketMessage(function (e) {
              if ("string" == typeof e.data) {
                const t = n.from(e.data, "base64");
                a.push(t);
              } else {
                const t = new FileReader();
                t.addEventListener("load", function () {
                  let e = t.result;
                  e = e instanceof ArrayBuffer ? n.from(e) : n.from(e, "utf8"), a.push(e);
                }), t.readAsArrayBuffer(e.data);
              }
            }), s.onSocketClose(function () {
              l.end(), l.destroy();
            }), s.onSocketError(function (e) {
              l.destroy(e);
            })), l;
          };
        }, {
          buffer: 17,
          duplexify: 20,
          "readable-stream": 69
        }],
        3: [function (e, t, r) {

          const n = e("net"),
            i = e("debug")("mqttjs:tcp");
          t.exports = function (e, t) {
            t.port = t.port || 1883, t.hostname = t.hostname || t.host || "localhost";
            const r = t.port,
              o = t.hostname;
            return i("port %d and host %s", r, o), n.createConnection(r, o);
          };
        }, {
          debug: 18,
          net: 16
        }],
        4: [function (e, t, r) {

          const n = e("tls"),
            i = e("net"),
            o = e("debug")("mqttjs:tls");
          t.exports = function (e, t) {
            t.port = t.port || 8883, t.host = t.hostname || t.host || "localhost", 0 === i.isIP(t.host) && (t.servername = t.host), t.rejectUnauthorized = !1 !== t.rejectUnauthorized, delete t.path, o("port %d host %s rejectUnauthorized %b", t.port, t.host, t.rejectUnauthorized);
            const r = n.connect(t);
            function s(n) {
              t.rejectUnauthorized && e.emit("error", n), r.end();
            }
            return r.on("secureConnect", function () {
              t.rejectUnauthorized && !r.authorized ? r.emit("error", new Error("TLS not authorized")) : r.removeListener("error", s);
            }), r.on("error", s), r;
          };
        }, {
          debug: 18,
          net: 16,
          tls: 16
        }],
        5: [function (e, t, r) {
          (function (r) {
            (function () {

              const {
                  Buffer: n
                } = e("buffer"),
                i = e("ws"),
                o = e("debug")("mqttjs:ws"),
                s = e("duplexify"),
                a = e("readable-stream").Transform,
                l = ["rejectUnauthorized", "ca", "cert", "key", "pfx", "passphrase"],
                u = void 0 !== r && "browser" === r.title || "function" == typeof __webpack_require__;
              function c(e, t) {
                let r = e.protocol + "://" + e.hostname + ":" + e.port + e.path;
                return "function" == typeof e.transformWsUrl && (r = e.transformWsUrl(r, e, t)), r;
              }
              function h(e) {
                const t = e;
                return e.hostname || (t.hostname = "localhost"), e.port || ("wss" === e.protocol ? t.port = 443 : t.port = 80), e.path || (t.path = "/"), e.wsOptions || (t.wsOptions = {}), u || "wss" !== e.protocol || l.forEach(function (r) {
                  Object.prototype.hasOwnProperty.call(e, r) && !Object.prototype.hasOwnProperty.call(e.wsOptions, r) && (t.wsOptions[r] = e[r]);
                }), t;
              }
              t.exports = u ? function (e, t) {
                let r;
                o("browserStreamBuilder");
                const i = function (e) {
                    const t = h(e);
                    if (t.hostname || (t.hostname = t.host), !t.hostname) {
                      if ("undefined" == typeof document) throw new Error("Could not determine host. Specify host manually.");
                      const e = new URL(document.URL);
                      t.hostname = e.hostname, t.port || (t.port = e.port);
                    }
                    return void 0 === t.objectMode && (t.objectMode = !(!0 === t.binary || void 0 === t.binary)), t;
                  }(t).browserBufferSize || 524288,
                  l = t.browserBufferTimeout || 1e3,
                  u = !t.objectMode,
                  f = function (e, t) {
                    const r = "MQIsdp" === t.protocolId && 3 === t.protocolVersion ? "mqttv3.1" : "mqtt",
                      n = c(t, e),
                      i = new WebSocket(n, [r]);
                    return i.binaryType = "arraybuffer", i;
                  }(e, t),
                  p = function (e, t, r) {
                    const n = new a({
                      objectModeMode: e.objectMode
                    });
                    return n._write = t, n._flush = r, n;
                  }(t, function e(t, r, o) {
                    f.bufferedAmount > i && setTimeout(e, l, t, r, o), u && "string" == typeof t && (t = n.from(t, "utf8"));
                    try {
                      f.send(t);
                    } catch (e) {
                      return o(e);
                    }
                    o();
                  }, function (e) {
                    f.close(), e();
                  });
                t.objectMode || (p._writev = v), p.on("close", () => {
                  f.close();
                });
                const d = void 0 !== f.addEventListener;
                function g() {
                  r.setReadable(p), r.setWritable(p), r.emit("connect");
                }
                function y() {
                  r.end(), r.destroy();
                }
                function b(e) {
                  r.destroy(e);
                }
                function m(e) {
                  let t = e.data;
                  t = t instanceof ArrayBuffer ? n.from(t) : n.from(t, "utf8"), p.push(t);
                }
                function v(e, t) {
                  const r = new Array(e.length);
                  for (let t = 0; t < e.length; t++) "string" == typeof e[t].chunk ? r[t] = n.from(e[t], "utf8") : r[t] = e[t].chunk;
                  this._write(n.concat(r), "binary", t);
                }
                return f.readyState === f.OPEN ? r = p : (r = r = s(void 0, void 0, t), t.objectMode || (r._writev = v), d ? f.addEventListener("open", g) : f.onopen = g), r.socket = f, d ? (f.addEventListener("close", y), f.addEventListener("error", b), f.addEventListener("message", m)) : (f.onclose = y, f.onerror = b, f.onmessage = m), r;
              } : function (e, t) {
                o("streamBuilder");
                const r = h(t),
                  n = c(r, e),
                  s = function (e, t, r) {
                    o("createWebSocket"), o("protocol: " + r.protocolId + " " + r.protocolVersion);
                    const n = "MQIsdp" === r.protocolId && 3 === r.protocolVersion ? "mqttv3.1" : "mqtt";
                    return o("creating new Websocket for url: " + t + " and protocol: " + n), new i(t, [n], r.wsOptions);
                  }(0, n, r),
                  a = i.createWebSocketStream(s, r.wsOptions);
                return a.url = n, s.on("close", () => {
                  a.destroy();
                }), a;
              };
            }).call(this);
          }).call(this, e("_process"));
        }, {
          _process: 50,
          buffer: 17,
          debug: 18,
          duplexify: 20,
          "readable-stream": 69,
          ws: 80
        }],
        6: [function (e, t, r) {

          const {
              Buffer: n
            } = e("buffer"),
            i = e("readable-stream").Transform,
            o = e("duplexify");
          let s, a, l;
          t.exports = function (e, t) {
            if (t.hostname = t.hostname || t.host, !t.hostname) throw new Error("Could not determine host. Specify host manually.");
            const r = "MQIsdp" === t.protocolId && 3 === t.protocolVersion ? "mqttv3.1" : "mqtt";
            !function (e) {
              e.hostname || (e.hostname = "localhost"), e.path || (e.path = "/"), e.wsOptions || (e.wsOptions = {});
            }(t);
            const u = function (e, t) {
              const r = "wxs" === e.protocol ? "wss" : "ws";
              let n = r + "://" + e.hostname + e.path;
              return e.port && 80 !== e.port && 443 !== e.port && (n = r + "://" + e.hostname + ":" + e.port + e.path), "function" == typeof e.transformWsUrl && (n = e.transformWsUrl(n, e, t)), n;
            }(t, e);
            s = wx.connectSocket({
              url: u,
              protocols: [r]
            }), a = function () {
              const e = new i();
              return e._write = function (e, t, r) {
                s.send({
                  data: e.buffer,
                  success: function () {
                    r();
                  },
                  fail: function (e) {
                    r(new Error(e));
                  }
                });
              }, e._flush = function (e) {
                s.close({
                  success: function () {
                    e();
                  }
                });
              }, e;
            }(), (l = o.obj())._destroy = function (e, t) {
              s.close({
                success: function () {
                  t && t(e);
                }
              });
            };
            const c = l.destroy;
            return l.destroy = function () {
              l.destroy = c;
              const e = this;
              setTimeout(function () {
                s.close({
                  fail: function () {
                    e._destroy(new Error());
                  }
                });
              }, 0);
            }.bind(l), s.onOpen(function () {
              l.setReadable(a), l.setWritable(a), l.emit("connect");
            }), s.onMessage(function (e) {
              let t = e.data;
              t = t instanceof ArrayBuffer ? n.from(t) : n.from(t, "utf8"), a.push(t);
            }), s.onClose(function () {
              l.end(), l.destroy();
            }), s.onError(function (e) {
              l.destroy(new Error(e.errMsg));
            }), l;
          };
        }, {
          buffer: 17,
          duplexify: 20,
          "readable-stream": 69
        }],
        7: [function (e, t, r) {

          function n() {
            if (!(this instanceof n)) return new n();
            this.nextId = Math.max(1, Math.floor(65535 * Math.random()));
          }
          n.prototype.allocate = function () {
            const e = this.nextId++;
            return 65536 === this.nextId && (this.nextId = 1), e;
          }, n.prototype.getLastAllocated = function () {
            return 1 === this.nextId ? 65535 : this.nextId - 1;
          }, n.prototype.register = function (e) {
            return !0;
          }, n.prototype.deallocate = function (e) {}, n.prototype.clear = function () {}, t.exports = n;
        }, {}],
        8: [function (e, t, r) {

          const n = e("xtend"),
            i = e("readable-stream").Readable,
            o = {
              objectMode: !0
            },
            s = {
              clean: !0
            };
          function a(e) {
            if (!(this instanceof a)) return new a(e);
            this.options = e || {}, this.options = n(s, e), this._inflights = new Map();
          }
          a.prototype.put = function (e, t) {
            return this._inflights.set(e.messageId, e), t && t(), this;
          }, a.prototype.createStream = function () {
            const e = new i(o),
              t = [];
            let r = !1,
              n = 0;
            return this._inflights.forEach(function (e, r) {
              t.push(e);
            }), e._read = function () {
              !r && n < t.length ? this.push(t[n++]) : this.push(null);
            }, e.destroy = function () {
              if (r) return;
              const e = this;
              r = !0, setTimeout(function () {
                e.emit("close");
              }, 0);
            }, e;
          }, a.prototype.del = function (e, t) {
            return (e = this._inflights.get(e.messageId)) ? (this._inflights.delete(e.messageId), t(null, e)) : t && t(new Error("missing packet")), this;
          }, a.prototype.get = function (e, t) {
            return (e = this._inflights.get(e.messageId)) ? t(null, e) : t && t(new Error("missing packet")), this;
          }, a.prototype.close = function (e) {
            this.options.clean && (this._inflights = null), e && e();
          }, t.exports = a;
        }, {
          "readable-stream": 69,
          xtend: 81
        }],
        9: [function (e, t, r) {

          function n(e) {
            if (!(this instanceof n)) return new n(e);
            this.aliasToTopic = {}, this.max = e;
          }
          n.prototype.put = function (e, t) {
            return !(0 === t || t > this.max) && (this.aliasToTopic[t] = e, this.length = Object.keys(this.aliasToTopic).length, !0);
          }, n.prototype.getTopicByAlias = function (e) {
            return this.aliasToTopic[e];
          }, n.prototype.clear = function () {
            this.aliasToTopic = {};
          }, t.exports = n;
        }, {}],
        10: [function (e, t, r) {

          const n = e("lru-cache"),
            i = e("number-allocator").NumberAllocator;
          function o(e) {
            if (!(this instanceof o)) return new o(e);
            e > 0 && (this.aliasToTopic = new n({
              max: e
            }), this.topicToAlias = {}, this.numberAllocator = new i(1, e), this.max = e, this.length = 0);
          }
          o.prototype.put = function (e, t) {
            if (0 === t || t > this.max) return !1;
            const r = this.aliasToTopic.get(t);
            return r && delete this.topicToAlias[r], this.aliasToTopic.set(t, e), this.topicToAlias[e] = t, this.numberAllocator.use(t), this.length = this.aliasToTopic.length, !0;
          }, o.prototype.getTopicByAlias = function (e) {
            return this.aliasToTopic.get(e);
          }, o.prototype.getAliasByTopic = function (e) {
            const t = this.topicToAlias[e];
            return void 0 !== t && this.aliasToTopic.get(t), t;
          }, o.prototype.clear = function () {
            this.aliasToTopic.reset(), this.topicToAlias = {}, this.numberAllocator.clear(), this.length = 0;
          }, o.prototype.getLruAlias = function () {
            const e = this.numberAllocator.firstVacant();
            return e || this.aliasToTopic.keys()[this.aliasToTopic.length - 1];
          }, t.exports = o;
        }, {
          "lru-cache": 37,
          "number-allocator": 46
        }],
        11: [function (e, t, r) {

          function n(e) {
            const t = e.split("/");
            for (let e = 0; e < t.length; e++) if ("+" !== t[e]) {
              if ("#" === t[e]) return e === t.length - 1;
              if (-1 !== t[e].indexOf("+") || -1 !== t[e].indexOf("#")) return !1;
            }
            return !0;
          }
          t.exports = {
            validateTopics: function (e) {
              if (0 === e.length) return "empty_topic_list";
              for (let t = 0; t < e.length; t++) if (!n(e[t])) return e[t];
              return null;
            }
          };
        }, {}],
        12: [function (e, t, r) {
          (function (r) {
            (function () {

              const n = e("../client"),
                i = e("../store"),
                o = e("url"),
                s = e("xtend"),
                a = e("debug")("mqttjs"),
                l = {};
              function u(e, t) {
                if (a("connecting to an MQTT broker..."), "object" != typeof e || t || (t = e, e = null), t = t || {}, e) {
                  const r = o.parse(e, !0);
                  if (null != r.port && (r.port = Number(r.port)), null === (t = s(r, t)).protocol) throw new Error("Missing protocol");
                  t.protocol = t.protocol.replace(/:$/, "");
                }
                if (function (e) {
                  let t;
                  e.auth && ((t = e.auth.match(/^(.+):(.+)$/)) ? (e.username = t[1], e.password = t[2]) : e.username = e.auth);
                }(t), t.query && "string" == typeof t.query.clientId && (t.clientId = t.query.clientId), t.cert && t.key) {
                  if (!t.protocol) throw new Error("Missing secure protocol key");
                  if (-1 === ["mqtts", "wss", "wxs", "alis"].indexOf(t.protocol)) switch (t.protocol) {
                    case "mqtt":
                      t.protocol = "mqtts";
                      break;
                    case "ws":
                      t.protocol = "wss";
                      break;
                    case "wx":
                      t.protocol = "wxs";
                      break;
                    case "ali":
                      t.protocol = "alis";
                      break;
                    default:
                      throw new Error('Unknown protocol for secure connection: "' + t.protocol + '"!');
                  }
                }
                if (!l[t.protocol]) {
                  const e = -1 !== ["mqtts", "wss"].indexOf(t.protocol);
                  t.protocol = ["mqtt", "mqtts", "ws", "wss", "wx", "wxs", "ali", "alis"].filter(function (t, r) {
                    return (!e || r % 2 != 0) && "function" == typeof l[t];
                  })[0];
                }
                if (!1 === t.clean && !t.clientId) throw new Error("Missing clientId for unclean clients");
                t.protocol && (t.defaultProtocol = t.protocol);
                const r = new n(function (e) {
                  return t.servers && (e._reconnectCount && e._reconnectCount !== t.servers.length || (e._reconnectCount = 0), t.host = t.servers[e._reconnectCount].host, t.port = t.servers[e._reconnectCount].port, t.protocol = t.servers[e._reconnectCount].protocol ? t.servers[e._reconnectCount].protocol : t.defaultProtocol, t.hostname = t.host, e._reconnectCount++), a("calling streambuilder for", t.protocol), l[t.protocol](e, t);
                }, t);
                return r.on("error", function () {}), r;
              }
              void 0 !== r && "browser" !== r.title || "function" != typeof __webpack_require__ ? (l.mqtt = e("./tcp"), l.tcp = e("./tcp"), l.ssl = e("./tls"), l.tls = e("./tls"), l.mqtts = e("./tls")) : (l.wx = e("./wx"), l.wxs = e("./wx"), l.ali = e("./ali"), l.alis = e("./ali")), l.ws = e("./ws"), l.wss = e("./ws"), t.exports = u, t.exports.connect = u, t.exports.MqttClient = n, t.exports.Store = i;
            }).call(this);
          }).call(this, e("_process"));
        }, {
          "../client": 1,
          "../store": 8,
          "./ali": 2,
          "./tcp": 3,
          "./tls": 4,
          "./ws": 5,
          "./wx": 6,
          _process: 50,
          debug: 18,
          url: 76,
          xtend: 81
        }],
        13: [function (e, t, r) {

          r.byteLength = function (e) {
            var t = u(e),
              r = t[0],
              n = t[1];
            return 3 * (r + n) / 4 - n;
          }, r.toByteArray = function (e) {
            var t,
              r,
              n = u(e),
              s = n[0],
              a = n[1],
              l = new o(function (e, t, r) {
                return 3 * (t + r) / 4 - r;
              }(0, s, a)),
              c = 0,
              h = a > 0 ? s - 4 : s;
            for (r = 0; r < h; r += 4) t = i[e.charCodeAt(r)] << 18 | i[e.charCodeAt(r + 1)] << 12 | i[e.charCodeAt(r + 2)] << 6 | i[e.charCodeAt(r + 3)], l[c++] = t >> 16 & 255, l[c++] = t >> 8 & 255, l[c++] = 255 & t;
            2 === a && (t = i[e.charCodeAt(r)] << 2 | i[e.charCodeAt(r + 1)] >> 4, l[c++] = 255 & t);
            1 === a && (t = i[e.charCodeAt(r)] << 10 | i[e.charCodeAt(r + 1)] << 4 | i[e.charCodeAt(r + 2)] >> 2, l[c++] = t >> 8 & 255, l[c++] = 255 & t);
            return l;
          }, r.fromByteArray = function (e) {
            for (var t, r = e.length, i = r % 3, o = [], s = 0, a = r - i; s < a; s += 16383) o.push(c(e, s, s + 16383 > a ? a : s + 16383));
            1 === i ? (t = e[r - 1], o.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === i && (t = (e[r - 2] << 8) + e[r - 1], o.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
            return o.join("");
          };
          for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, l = s.length; a < l; ++a) n[a] = s[a], i[s.charCodeAt(a)] = a;
          function u(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var r = e.indexOf("=");
            return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4];
          }
          function c(e, t, r) {
            for (var i, o, s = [], a = t; a < r; a += 3) i = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), s.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
            return s.join("");
          }
          i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
        }, {}],
        14: [function (e, t, r) {

          const {
              Buffer: n
            } = e("buffer"),
            i = Symbol.for("BufferList");
          function o(e) {
            if (!(this instanceof o)) return new o(e);
            o._init.call(this, e);
          }
          o._init = function (e) {
            Object.defineProperty(this, i, {
              value: !0
            }), this._bufs = [], this.length = 0, e && this.append(e);
          }, o.prototype._new = function (e) {
            return new o(e);
          }, o.prototype._offset = function (e) {
            if (0 === e) return [0, 0];
            let t = 0;
            for (let r = 0; r < this._bufs.length; r++) {
              const n = t + this._bufs[r].length;
              if (e < n || r === this._bufs.length - 1) return [r, e - t];
              t = n;
            }
          }, o.prototype._reverseOffset = function (e) {
            const t = e[0];
            let r = e[1];
            for (let e = 0; e < t; e++) r += this._bufs[e].length;
            return r;
          }, o.prototype.get = function (e) {
            if (e > this.length || e < 0) return;
            const t = this._offset(e);
            return this._bufs[t[0]][t[1]];
          }, o.prototype.slice = function (e, t) {
            return "number" == typeof e && e < 0 && (e += this.length), "number" == typeof t && t < 0 && (t += this.length), this.copy(null, 0, e, t);
          }, o.prototype.copy = function (e, t, r, i) {
            if (("number" != typeof r || r < 0) && (r = 0), ("number" != typeof i || i > this.length) && (i = this.length), r >= this.length) return e || n.alloc(0);
            if (i <= 0) return e || n.alloc(0);
            const o = !!e,
              s = this._offset(r),
              a = i - r;
            let l = a,
              u = o && t || 0,
              c = s[1];
            if (0 === r && i === this.length) {
              if (!o) return 1 === this._bufs.length ? this._bufs[0] : n.concat(this._bufs, this.length);
              for (let t = 0; t < this._bufs.length; t++) this._bufs[t].copy(e, u), u += this._bufs[t].length;
              return e;
            }
            if (l <= this._bufs[s[0]].length - c) return o ? this._bufs[s[0]].copy(e, t, c, c + l) : this._bufs[s[0]].slice(c, c + l);
            o || (e = n.allocUnsafe(a));
            for (let t = s[0]; t < this._bufs.length; t++) {
              const r = this._bufs[t].length - c;
              if (!(l > r)) {
                this._bufs[t].copy(e, u, c, c + l), u += r;
                break;
              }
              this._bufs[t].copy(e, u, c), u += r, l -= r, c && (c = 0);
            }
            return e.length > u ? e.slice(0, u) : e;
          }, o.prototype.shallowSlice = function (e, t) {
            if (e = e || 0, t = "number" != typeof t ? this.length : t, e < 0 && (e += this.length), t < 0 && (t += this.length), e === t) return this._new();
            const r = this._offset(e),
              n = this._offset(t),
              i = this._bufs.slice(r[0], n[0] + 1);
            return 0 === n[1] ? i.pop() : i[i.length - 1] = i[i.length - 1].slice(0, n[1]), 0 !== r[1] && (i[0] = i[0].slice(r[1])), this._new(i);
          }, o.prototype.toString = function (e, t, r) {
            return this.slice(t, r).toString(e);
          }, o.prototype.consume = function (e) {
            if (e = Math.trunc(e), Number.isNaN(e) || e <= 0) return this;
            for (; this._bufs.length;) {
              if (!(e >= this._bufs[0].length)) {
                this._bufs[0] = this._bufs[0].slice(e), this.length -= e;
                break;
              }
              e -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift();
            }
            return this;
          }, o.prototype.duplicate = function () {
            const e = this._new();
            for (let t = 0; t < this._bufs.length; t++) e.append(this._bufs[t]);
            return e;
          }, o.prototype.append = function (e) {
            if (null == e) return this;
            if (e.buffer) this._appendBuffer(n.from(e.buffer, e.byteOffset, e.byteLength));else if (Array.isArray(e)) for (let t = 0; t < e.length; t++) this.append(e[t]);else if (this._isBufferList(e)) for (let t = 0; t < e._bufs.length; t++) this.append(e._bufs[t]);else "number" == typeof e && (e = e.toString()), this._appendBuffer(n.from(e));
            return this;
          }, o.prototype._appendBuffer = function (e) {
            this._bufs.push(e), this.length += e.length;
          }, o.prototype.indexOf = function (e, t, r) {
            if (void 0 === r && "string" == typeof t && (r = t, t = void 0), "function" == typeof e || Array.isArray(e)) throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
            if ("number" == typeof e ? e = n.from([e]) : "string" == typeof e ? e = n.from(e, r) : this._isBufferList(e) ? e = e.slice() : Array.isArray(e.buffer) ? e = n.from(e.buffer, e.byteOffset, e.byteLength) : n.isBuffer(e) || (e = n.from(e)), t = Number(t || 0), isNaN(t) && (t = 0), t < 0 && (t = this.length + t), t < 0 && (t = 0), 0 === e.length) return t > this.length ? this.length : t;
            const i = this._offset(t);
            let o = i[0],
              s = i[1];
            for (; o < this._bufs.length; o++) {
              const t = this._bufs[o];
              for (; s < t.length;) {
                if (t.length - s >= e.length) {
                  const r = t.indexOf(e, s);
                  if (-1 !== r) return this._reverseOffset([o, r]);
                  s = t.length - e.length + 1;
                } else {
                  const t = this._reverseOffset([o, s]);
                  if (this._match(t, e)) return t;
                  s++;
                }
              }
              s = 0;
            }
            return -1;
          }, o.prototype._match = function (e, t) {
            if (this.length - e < t.length) return !1;
            for (let r = 0; r < t.length; r++) if (this.get(e + r) !== t[r]) return !1;
            return !0;
          }, function () {
            const e = {
              readDoubleBE: 8,
              readDoubleLE: 8,
              readFloatBE: 4,
              readFloatLE: 4,
              readInt32BE: 4,
              readInt32LE: 4,
              readUInt32BE: 4,
              readUInt32LE: 4,
              readInt16BE: 2,
              readInt16LE: 2,
              readUInt16BE: 2,
              readUInt16LE: 2,
              readInt8: 1,
              readUInt8: 1,
              readIntBE: null,
              readIntLE: null,
              readUIntBE: null,
              readUIntLE: null
            };
            for (const t in e) !function (t) {
              o.prototype[t] = null === e[t] ? function (e, r) {
                return this.slice(e, e + r)[t](0, r);
              } : function (r = 0) {
                return this.slice(r, r + e[t])[t](0);
              };
            }(t);
          }(), o.prototype._isBufferList = function (e) {
            return e instanceof o || o.isBufferList(e);
          }, o.isBufferList = function (e) {
            return null != e && e[i];
          }, t.exports = o;
        }, {
          buffer: 17
        }],
        15: [function (e, t, r) {

          const n = e("readable-stream").Duplex,
            i = e("inherits"),
            o = e("./BufferList");
          function s(e) {
            if (!(this instanceof s)) return new s(e);
            if ("function" == typeof e) {
              this._callback = e;
              const t = function (e) {
                this._callback && (this._callback(e), this._callback = null);
              }.bind(this);
              this.on("pipe", function (e) {
                e.on("error", t);
              }), this.on("unpipe", function (e) {
                e.removeListener("error", t);
              }), e = null;
            }
            o._init.call(this, e), n.call(this);
          }
          i(s, n), Object.assign(s.prototype, o.prototype), s.prototype._new = function (e) {
            return new s(e);
          }, s.prototype._write = function (e, t, r) {
            this._appendBuffer(e), "function" == typeof r && r();
          }, s.prototype._read = function (e) {
            if (!this.length) return this.push(null);
            e = Math.min(e, this.length), this.push(this.slice(0, e)), this.consume(e);
          }, s.prototype.end = function (e) {
            n.prototype.end.call(this, e), this._callback && (this._callback(null, this.slice()), this._callback = null);
          }, s.prototype._destroy = function (e, t) {
            this._bufs.length = 0, this.length = 0, t(e);
          }, s.prototype._isBufferList = function (e) {
            return e instanceof s || e instanceof o || s.isBufferList(e);
          }, s.isBufferList = o.isBufferList, t.exports = s, t.exports.BufferListStream = s, t.exports.BufferList = o;
        }, {
          "./BufferList": 14,
          inherits: 24,
          "readable-stream": 69
        }],
        16: [function (e, t, r) {}, {}],
        17: [function (e, t, r) {
          (function (t) {
            (function () {

              var t = e("base64-js"),
                n = e("ieee754");
              r.Buffer = s, r.SlowBuffer = function (e) {
                +e != e && (e = 0);
                return s.alloc(+e);
              }, r.INSPECT_MAX_BYTES = 50;
              var i = 2147483647;
              function o(e) {
                if (e > i) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                var t = new Uint8Array(e);
                return t.__proto__ = s.prototype, t;
              }
              function s(e, t, r) {
                if ("number" == typeof e) {
                  if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                  return u(e);
                }
                return a(e, t, r);
              }
              function a(e, t, r) {
                if ("string" == typeof e) return function (e, t) {
                  "string" == typeof t && "" !== t || (t = "utf8");
                  if (!s.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                  var r = 0 | f(e, t),
                    n = o(r),
                    i = n.write(e, t);
                  i !== r && (n = n.slice(0, i));
                  return n;
                }(e, t);
                if (ArrayBuffer.isView(e)) return c(e);
                if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                if (q(e, ArrayBuffer) || e && q(e.buffer, ArrayBuffer)) return function (e, t, r) {
                  if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
                  if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                  var n;
                  n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r);
                  return n.__proto__ = s.prototype, n;
                }(e, t, r);
                if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                var n = e.valueOf && e.valueOf();
                if (null != n && n !== e) return s.from(n, t, r);
                var i = function (e) {
                  if (s.isBuffer(e)) {
                    var t = 0 | h(e.length),
                      r = o(t);
                    return 0 === r.length ? r : (e.copy(r, 0, 0, t), r);
                  }
                  if (void 0 !== e.length) return "number" != typeof e.length || D(e.length) ? o(0) : c(e);
                  if ("Buffer" === e.type && Array.isArray(e.data)) return c(e.data);
                }(e);
                if (i) return i;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return s.from(e[Symbol.toPrimitive]("string"), t, r);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
              }
              function l(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"');
              }
              function u(e) {
                return l(e), o(e < 0 ? 0 : 0 | h(e));
              }
              function c(e) {
                for (var t = e.length < 0 ? 0 : 0 | h(e.length), r = o(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
                return r;
              }
              function h(e) {
                if (e >= i) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
                return 0 | e;
              }
              function f(e, t) {
                if (s.isBuffer(e)) return e.length;
                if (ArrayBuffer.isView(e) || q(e, ArrayBuffer)) return e.byteLength;
                if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                var r = e.length,
                  n = arguments.length > 2 && !0 === arguments[2];
                if (!n && 0 === r) return 0;
                for (var i = !1;;) switch (t) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return r;
                  case "utf8":
                  case "utf-8":
                    return L(e).length;
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * r;
                  case "hex":
                    return r >>> 1;
                  case "base64":
                    return j(e).length;
                  default:
                    if (i) return n ? -1 : L(e).length;
                    t = ("" + t).toLowerCase(), i = !0;
                }
              }
              function p(e, t, r) {
                var n = e[t];
                e[t] = e[r], e[r] = n;
              }
              function d(e, t, r, n, i) {
                if (0 === e.length) return -1;
                if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), D(r = +r) && (r = i ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                  if (i) return -1;
                  r = e.length - 1;
                } else if (r < 0) {
                  if (!i) return -1;
                  r = 0;
                }
                if ("string" == typeof t && (t = s.from(t, n)), s.isBuffer(t)) return 0 === t.length ? -1 : g(e, t, r, n, i);
                if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : g(e, [t], r, n, i);
                throw new TypeError("val must be string, number or Buffer");
              }
              function g(e, t, r, n, i) {
                var o,
                  s = 1,
                  a = e.length,
                  l = t.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                  if (e.length < 2 || t.length < 2) return -1;
                  s = 2, a /= 2, l /= 2, r /= 2;
                }
                function u(e, t) {
                  return 1 === s ? e[t] : e.readUInt16BE(t * s);
                }
                if (i) {
                  var c = -1;
                  for (o = r; o < a; o++) if (u(e, o) === u(t, -1 === c ? 0 : o - c)) {
                    if (-1 === c && (c = o), o - c + 1 === l) return c * s;
                  } else -1 !== c && (o -= o - c), c = -1;
                } else for (r + l > a && (r = a - l), o = r; o >= 0; o--) {
                  for (var h = !0, f = 0; f < l; f++) if (u(e, o + f) !== u(t, f)) {
                    h = !1;
                    break;
                  }
                  if (h) return o;
                }
                return -1;
              }
              function y(e, t, r, n) {
                r = Number(r) || 0;
                var i = e.length - r;
                n ? (n = Number(n)) > i && (n = i) : n = i;
                var o = t.length;
                n > o / 2 && (n = o / 2);
                for (var s = 0; s < n; ++s) {
                  var a = parseInt(t.substr(2 * s, 2), 16);
                  if (D(a)) return s;
                  e[r + s] = a;
                }
                return s;
              }
              function b(e, t, r, n) {
                return U(L(t, e.length - r), e, r, n);
              }
              function m(e, t, r, n) {
                return U(function (e) {
                  for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                  return t;
                }(t), e, r, n);
              }
              function v(e, t, r, n) {
                return m(e, t, r, n);
              }
              function w(e, t, r, n) {
                return U(j(t), e, r, n);
              }
              function _(e, t, r, n) {
                return U(function (e, t) {
                  for (var r, n, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) r = e.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
                  return o;
                }(t, e.length - r), e, r, n);
              }
              function k(e, r, n) {
                return 0 === r && n === e.length ? t.fromByteArray(e) : t.fromByteArray(e.slice(r, n));
              }
              function S(e, t, r) {
                r = Math.min(e.length, r);
                for (var n = [], i = t; i < r;) {
                  var o,
                    s,
                    a,
                    l,
                    u = e[i],
                    c = null,
                    h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                  if (i + h <= r) switch (h) {
                    case 1:
                      u < 128 && (c = u);
                      break;
                    case 2:
                      128 == (192 & (o = e[i + 1])) && (l = (31 & u) << 6 | 63 & o) > 127 && (c = l);
                      break;
                    case 3:
                      o = e[i + 1], s = e[i + 2], 128 == (192 & o) && 128 == (192 & s) && (l = (15 & u) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (l < 55296 || l > 57343) && (c = l);
                      break;
                    case 4:
                      o = e[i + 1], s = e[i + 2], a = e[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (l = (15 & u) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && l < 1114112 && (c = l);
                  }
                  null === c ? (c = 65533, h = 1) : c > 65535 && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), i += h;
                }
                return function (e) {
                  var t = e.length;
                  if (t <= E) return String.fromCharCode.apply(String, e);
                  var r = "",
                    n = 0;
                  for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += E));
                  return r;
                }(n);
              }
              r.kMaxLength = i, s.TYPED_ARRAY_SUPPORT = function () {
                try {
                  var e = new Uint8Array(1);
                  return e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function () {
                      return 42;
                    }
                  }, 42 === e.foo();
                } catch (e) {
                  return !1;
                }
              }(), s.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(s.prototype, "parent", {
                enumerable: !0,
                get: function () {
                  if (s.isBuffer(this)) return this.buffer;
                }
              }), Object.defineProperty(s.prototype, "offset", {
                enumerable: !0,
                get: function () {
                  if (s.isBuffer(this)) return this.byteOffset;
                }
              }), "undefined" != typeof Symbol && null != Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
              }), s.poolSize = 8192, s.from = function (e, t, r) {
                return a(e, t, r);
              }, s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array, s.alloc = function (e, t, r) {
                return function (e, t, r) {
                  return l(e), e <= 0 ? o(e) : void 0 !== t ? "string" == typeof r ? o(e).fill(t, r) : o(e).fill(t) : o(e);
                }(e, t, r);
              }, s.allocUnsafe = function (e) {
                return u(e);
              }, s.allocUnsafeSlow = function (e) {
                return u(e);
              }, s.isBuffer = function (e) {
                return null != e && !0 === e._isBuffer && e !== s.prototype;
              }, s.compare = function (e, t) {
                if (q(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)), q(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)), !s.isBuffer(e) || !s.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (e === t) return 0;
                for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o; ++i) if (e[i] !== t[i]) {
                  r = e[i], n = t[i];
                  break;
                }
                return r < n ? -1 : n < r ? 1 : 0;
              }, s.isEncoding = function (e) {
                switch (String(e).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return !0;
                  default:
                    return !1;
                }
              }, s.concat = function (e, t) {
                if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return s.alloc(0);
                var r;
                if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
                var n = s.allocUnsafe(t),
                  i = 0;
                for (r = 0; r < e.length; ++r) {
                  var o = e[r];
                  if (q(o, Uint8Array) && (o = s.from(o)), !s.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                  o.copy(n, i), i += o.length;
                }
                return n;
              }, s.byteLength = f, s.prototype._isBuffer = !0, s.prototype.swap16 = function () {
                var e = this.length;
                if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) p(this, t, t + 1);
                return this;
              }, s.prototype.swap32 = function () {
                var e = this.length;
                if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) p(this, t, t + 3), p(this, t + 1, t + 2);
                return this;
              }, s.prototype.swap64 = function () {
                var e = this.length;
                if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) p(this, t, t + 7), p(this, t + 1, t + 6), p(this, t + 2, t + 5), p(this, t + 3, t + 4);
                return this;
              }, s.prototype.toString = function () {
                var e = this.length;
                return 0 === e ? "" : 0 === arguments.length ? S(this, 0, e) : function (e, t, r) {
                  var n = !1;
                  if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                  if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                  if ((r >>>= 0) <= (t >>>= 0)) return "";
                  for (e || (e = "utf8");;) switch (e) {
                    case "hex":
                      return x(this, t, r);
                    case "utf8":
                    case "utf-8":
                      return S(this, t, r);
                    case "ascii":
                      return C(this, t, r);
                    case "latin1":
                    case "binary":
                      return T(this, t, r);
                    case "base64":
                      return k(this, t, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return A(this, t, r);
                    default:
                      if (n) throw new TypeError("Unknown encoding: " + e);
                      e = (e + "").toLowerCase(), n = !0;
                  }
                }.apply(this, arguments);
              }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function (e) {
                if (!s.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === s.compare(this, e);
              }, s.prototype.inspect = function () {
                var e = "",
                  t = r.INSPECT_MAX_BYTES;
                return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
              }, s.prototype.compare = function (e, t, r, n, i) {
                if (q(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)), !s.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), t < 0 || r > e.length || n < 0 || i > this.length) throw new RangeError("out of range index");
                if (n >= i && t >= r) return 0;
                if (n >= i) return -1;
                if (t >= r) return 1;
                if (t >>>= 0, r >>>= 0, n >>>= 0, i >>>= 0, this === e) return 0;
                for (var o = i - n, a = r - t, l = Math.min(o, a), u = this.slice(n, i), c = e.slice(t, r), h = 0; h < l; ++h) if (u[h] !== c[h]) {
                  o = u[h], a = c[h];
                  break;
                }
                return o < a ? -1 : a < o ? 1 : 0;
              }, s.prototype.includes = function (e, t, r) {
                return -1 !== this.indexOf(e, t, r);
              }, s.prototype.indexOf = function (e, t, r) {
                return d(this, e, t, r, !0);
              }, s.prototype.lastIndexOf = function (e, t, r) {
                return d(this, e, t, r, !1);
              }, s.prototype.write = function (e, t, r, n) {
                if (void 0 === t) n = "utf8", r = this.length, t = 0;else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;else {
                  if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                  t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
                }
                var i = this.length - t;
                if ((void 0 === r || r > i) && (r = i), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var o = !1;;) switch (n) {
                  case "hex":
                    return y(this, e, t, r);
                  case "utf8":
                  case "utf-8":
                    return b(this, e, t, r);
                  case "ascii":
                    return m(this, e, t, r);
                  case "latin1":
                  case "binary":
                    return v(this, e, t, r);
                  case "base64":
                    return w(this, e, t, r);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return _(this, e, t, r);
                  default:
                    if (o) throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(), o = !0;
                }
              }, s.prototype.toJSON = function () {
                return {
                  type: "Buffer",
                  data: Array.prototype.slice.call(this._arr || this, 0)
                };
              };
              var E = 4096;
              function C(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
                return n;
              }
              function T(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
                return n;
              }
              function x(e, t, r) {
                var n = e.length;
                (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                for (var i = "", o = t; o < r; ++o) i += N(e[o]);
                return i;
              }
              function A(e, t, r) {
                for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                return i;
              }
              function I(e, t, r) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
              }
              function P(e, t, r, n, i, o) {
                if (!s.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > i || t < o) throw new RangeError('"value" argument is out of bounds');
                if (r + n > e.length) throw new RangeError("Index out of range");
              }
              function O(e, t, r, n, i, o) {
                if (r + n > e.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range");
              }
              function B(e, t, r, i, o) {
                return t = +t, r >>>= 0, o || O(e, 0, r, 4), n.write(e, t, r, i, 23, 4), r + 4;
              }
              function R(e, t, r, i, o) {
                return t = +t, r >>>= 0, o || O(e, 0, r, 8), n.write(e, t, r, i, 52, 8), r + 8;
              }
              s.prototype.slice = function (e, t) {
                var r = this.length;
                e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
                var n = this.subarray(e, t);
                return n.__proto__ = s.prototype, n;
              }, s.prototype.readUIntLE = function (e, t, r) {
                e >>>= 0, t >>>= 0, r || I(e, t, this.length);
                for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                return n;
              }, s.prototype.readUIntBE = function (e, t, r) {
                e >>>= 0, t >>>= 0, r || I(e, t, this.length);
                for (var n = this[e + --t], i = 1; t > 0 && (i *= 256);) n += this[e + --t] * i;
                return n;
              }, s.prototype.readUInt8 = function (e, t) {
                return e >>>= 0, t || I(e, 1, this.length), this[e];
              }, s.prototype.readUInt16LE = function (e, t) {
                return e >>>= 0, t || I(e, 2, this.length), this[e] | this[e + 1] << 8;
              }, s.prototype.readUInt16BE = function (e, t) {
                return e >>>= 0, t || I(e, 2, this.length), this[e] << 8 | this[e + 1];
              }, s.prototype.readUInt32LE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
              }, s.prototype.readUInt32BE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
              }, s.prototype.readIntLE = function (e, t, r) {
                e >>>= 0, t >>>= 0, r || I(e, t, this.length);
                for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n;
              }, s.prototype.readIntBE = function (e, t, r) {
                e >>>= 0, t >>>= 0, r || I(e, t, this.length);
                for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256);) o += this[e + --n] * i;
                return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o;
              }, s.prototype.readInt8 = function (e, t) {
                return e >>>= 0, t || I(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
              }, s.prototype.readInt16LE = function (e, t) {
                e >>>= 0, t || I(e, 2, this.length);
                var r = this[e] | this[e + 1] << 8;
                return 32768 & r ? 4294901760 | r : r;
              }, s.prototype.readInt16BE = function (e, t) {
                e >>>= 0, t || I(e, 2, this.length);
                var r = this[e + 1] | this[e] << 8;
                return 32768 & r ? 4294901760 | r : r;
              }, s.prototype.readInt32LE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
              }, s.prototype.readInt32BE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
              }, s.prototype.readFloatLE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), n.read(this, e, !0, 23, 4);
              }, s.prototype.readFloatBE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), n.read(this, e, !1, 23, 4);
              }, s.prototype.readDoubleLE = function (e, t) {
                return e >>>= 0, t || I(e, 8, this.length), n.read(this, e, !0, 52, 8);
              }, s.prototype.readDoubleBE = function (e, t) {
                return e >>>= 0, t || I(e, 8, this.length), n.read(this, e, !1, 52, 8);
              }, s.prototype.writeUIntLE = function (e, t, r, n) {
                (e = +e, t >>>= 0, r >>>= 0, n) || P(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var i = 1,
                  o = 0;
                for (this[t] = 255 & e; ++o < r && (i *= 256);) this[t + o] = e / i & 255;
                return t + r;
              }, s.prototype.writeUIntBE = function (e, t, r, n) {
                (e = +e, t >>>= 0, r >>>= 0, n) || P(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var i = r - 1,
                  o = 1;
                for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) this[t + i] = e / o & 255;
                return t + r;
              }, s.prototype.writeUInt8 = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1;
              }, s.prototype.writeUInt16LE = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2;
              }, s.prototype.writeUInt16BE = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2;
              }, s.prototype.writeUInt32LE = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4;
              }, s.prototype.writeUInt32BE = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4;
              }, s.prototype.writeIntLE = function (e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                  var i = Math.pow(2, 8 * r - 1);
                  P(this, e, t, r, i - 1, -i);
                }
                var o = 0,
                  s = 1,
                  a = 0;
                for (this[t] = 255 & e; ++o < r && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
                return t + r;
              }, s.prototype.writeIntBE = function (e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                  var i = Math.pow(2, 8 * r - 1);
                  P(this, e, t, r, i - 1, -i);
                }
                var o = r - 1,
                  s = 1,
                  a = 0;
                for (this[t + o] = 255 & e; --o >= 0 && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
                return t + r;
              }, s.prototype.writeInt8 = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
              }, s.prototype.writeInt16LE = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2;
              }, s.prototype.writeInt16BE = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2;
              }, s.prototype.writeInt32LE = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
              }, s.prototype.writeInt32BE = function (e, t, r) {
                return e = +e, t >>>= 0, r || P(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4;
              }, s.prototype.writeFloatLE = function (e, t, r) {
                return B(this, e, t, !0, r);
              }, s.prototype.writeFloatBE = function (e, t, r) {
                return B(this, e, t, !1, r);
              }, s.prototype.writeDoubleLE = function (e, t, r) {
                return R(this, e, t, !0, r);
              }, s.prototype.writeDoubleBE = function (e, t, r) {
                return R(this, e, t, !1, r);
              }, s.prototype.copy = function (e, t, r, n) {
                if (!s.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                var i = n - r;
                if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, r, n);else if (this === e && r < t && t < n) for (var o = i - 1; o >= 0; --o) e[o + t] = this[o + r];else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
                return i;
              }, s.prototype.fill = function (e, t, r, n) {
                if ("string" == typeof e) {
                  if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                  if ("string" == typeof n && !s.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                  if (1 === e.length) {
                    var i = e.charCodeAt(0);
                    ("utf8" === n && i < 128 || "latin1" === n) && (e = i);
                  }
                } else "number" == typeof e && (e &= 255);
                if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                if (r <= t) return this;
                var o;
                if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e) for (o = t; o < r; ++o) this[o] = e;else {
                  var a = s.isBuffer(e) ? e : s.from(e, n),
                    l = a.length;
                  if (0 === l) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                  for (o = 0; o < r - t; ++o) this[o + t] = a[o % l];
                }
                return this;
              };
              var M = /[^+/0-9A-Za-z-_]/g;
              function N(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16);
              }
              function L(e, t) {
                var r;
                t = t || 1 / 0;
                for (var n = e.length, i = null, o = [], s = 0; s < n; ++s) {
                  if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
                    if (!i) {
                      if (r > 56319) {
                        (t -= 3) > -1 && o.push(239, 191, 189);
                        continue;
                      }
                      if (s + 1 === n) {
                        (t -= 3) > -1 && o.push(239, 191, 189);
                        continue;
                      }
                      i = r;
                      continue;
                    }
                    if (r < 56320) {
                      (t -= 3) > -1 && o.push(239, 191, 189), i = r;
                      continue;
                    }
                    r = 65536 + (i - 55296 << 10 | r - 56320);
                  } else i && (t -= 3) > -1 && o.push(239, 191, 189);
                  if (i = null, r < 128) {
                    if ((t -= 1) < 0) break;
                    o.push(r);
                  } else if (r < 2048) {
                    if ((t -= 2) < 0) break;
                    o.push(r >> 6 | 192, 63 & r | 128);
                  } else if (r < 65536) {
                    if ((t -= 3) < 0) break;
                    o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
                  } else {
                    if (!(r < 1114112)) throw new Error("Invalid code point");
                    if ((t -= 4) < 0) break;
                    o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
                  }
                }
                return o;
              }
              function j(e) {
                return t.toByteArray(function (e) {
                  if ((e = (e = e.split("=")[0]).trim().replace(M, "")).length < 2) return "";
                  for (; e.length % 4 != 0;) e += "=";
                  return e;
                }(e));
              }
              function U(e, t, r, n) {
                for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
                return i;
              }
              function q(e, t) {
                return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name;
              }
              function D(e) {
                return e != e;
              }
            }).call(this);
          }).call(this, e("buffer").Buffer);
        }, {
          "base64-js": 13,
          buffer: 17,
          ieee754: 23
        }],
        18: [function (e, t, r) {
          (function (n) {
            (function () {
              r.formatArgs = function (e) {
                if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
                const r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                let n = 0,
                  i = 0;
                e[0].replace(/%[a-zA-Z%]/g, e => {
                  "%%" !== e && "%c" === e && (i = ++n);
                }), e.splice(i, 0, r);
              }, r.save = function (e) {
                try {
                  e ? r.storage.setItem("debug", e) : r.storage.removeItem("debug");
                } catch (e) {}
              }, r.load = function () {
                let e;
                try {
                  e = r.storage.getItem("debug");
                } catch (e) {}
                !e && void 0 !== n && "env" in n && (e = n.env.DEBUG);
                return e;
              }, r.useColors = function () {
                if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
                if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
                return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
              }, r.storage = function () {
                try {
                  return localStorage;
                } catch (e) {}
              }(), r.destroy = (() => {
                let e = !1;
                return () => {
                  e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
                };
              })(), r.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], r.log = console.debug || console.log || (() => {}), t.exports = e("./common")(r);
              const {
                formatters: i
              } = t.exports;
              i.j = function (e) {
                try {
                  return JSON.stringify(e);
                } catch (e) {
                  return "[UnexpectedJSONParseError]: " + e.message;
                }
              };
            }).call(this);
          }).call(this, e("_process"));
        }, {
          "./common": 19,
          _process: 50
        }],
        19: [function (e, t, r) {
          t.exports = function (t) {
            function r(e) {
              let t,
                i,
                o,
                s = null;
              function a(...e) {
                if (!a.enabled) return;
                const n = a,
                  i = Number(new Date()),
                  o = i - (t || i);
                n.diff = o, n.prev = t, n.curr = i, t = i, e[0] = r.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
                let s = 0;
                e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, i) => {
                  if ("%%" === t) return "%";
                  s++;
                  const o = r.formatters[i];
                  if ("function" == typeof o) {
                    const r = e[s];
                    t = o.call(n, r), e.splice(s, 1), s--;
                  }
                  return t;
                }), r.formatArgs.call(n, e), (n.log || r.log).apply(n, e);
              }
              return a.namespace = e, a.useColors = r.useColors(), a.color = r.selectColor(e), a.extend = n, a.destroy = r.destroy, Object.defineProperty(a, "enabled", {
                enumerable: !0,
                configurable: !1,
                get: () => null !== s ? s : (i !== r.namespaces && (i = r.namespaces, o = r.enabled(e)), o),
                set: e => {
                  s = e;
                }
              }), "function" == typeof r.init && r.init(a), a;
            }
            function n(e, t) {
              const n = r(this.namespace + (void 0 === t ? ":" : t) + e);
              return n.log = this.log, n;
            }
            function i(e) {
              return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*");
            }
            return r.debug = r, r.default = r, r.coerce = function (e) {
              return e instanceof Error ? e.stack || e.message : e;
            }, r.disable = function () {
              const e = [...r.names.map(i), ...r.skips.map(i).map(e => "-" + e)].join(",");
              return r.enable(""), e;
            }, r.enable = function (e) {
              let t;
              r.save(e), r.namespaces = e, r.names = [], r.skips = [];
              const n = ("string" == typeof e ? e : "").split(/[\s,]+/),
                i = n.length;
              for (t = 0; t < i; t++) n[t] && ("-" === (e = n[t].replace(/\*/g, ".*?"))[0] ? r.skips.push(new RegExp("^" + e.substr(1) + "$")) : r.names.push(new RegExp("^" + e + "$")));
            }, r.enabled = function (e) {
              if ("*" === e[e.length - 1]) return !0;
              let t, n;
              for (t = 0, n = r.skips.length; t < n; t++) if (r.skips[t].test(e)) return !1;
              for (t = 0, n = r.names.length; t < n; t++) if (r.names[t].test(e)) return !0;
              return !1;
            }, r.humanize = e("ms"), r.destroy = function () {
              console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
            }, Object.keys(t).forEach(e => {
              r[e] = t[e];
            }), r.names = [], r.skips = [], r.formatters = {}, r.selectColor = function (e) {
              let t = 0;
              for (let r = 0; r < e.length; r++) t = (t << 5) - t + e.charCodeAt(r), t |= 0;
              return r.colors[Math.abs(t) % r.colors.length];
            }, r.enable(r.load()), r;
          };
        }, {
          ms: 45
        }],
        20: [function (e, t, r) {
          (function (r, n) {
            (function () {
              var i = e("readable-stream"),
                o = e("end-of-stream"),
                s = e("inherits"),
                a = e("stream-shift"),
                l = n.from && n.from !== Uint8Array.from ? n.from([0]) : new n([0]),
                u = function (e, t) {
                  e._corked ? e.once("uncork", t) : t();
                },
                c = function (e, t) {
                  return function (r) {
                    r ? function (e, t) {
                      e._autoDestroy && e.destroy(t);
                    }(e, "premature close" === r.message ? null : r) : t && !e._ended && e.end();
                  };
                },
                h = function () {},
                f = function (e, t, r) {
                  if (!(this instanceof f)) return new f(e, t, r);
                  i.Duplex.call(this, r), this._writable = null, this._readable = null, this._readable2 = null, this._autoDestroy = !r || !1 !== r.autoDestroy, this._forwardDestroy = !r || !1 !== r.destroy, this._forwardEnd = !r || !1 !== r.end, this._corked = 1, this._ondrain = null, this._drained = !1, this._forwarding = !1, this._unwrite = null, this._unread = null, this._ended = !1, this.destroyed = !1, e && this.setWritable(e), t && this.setReadable(t);
                };
              s(f, i.Duplex), f.obj = function (e, t, r) {
                return r || (r = {}), r.objectMode = !0, r.highWaterMark = 16, new f(e, t, r);
              }, f.prototype.cork = function () {
                1 == ++this._corked && this.emit("cork");
              }, f.prototype.uncork = function () {
                this._corked && 0 == --this._corked && this.emit("uncork");
              }, f.prototype.setWritable = function (e) {
                if (this._unwrite && this._unwrite(), this.destroyed) e && e.destroy && e.destroy();else if (null !== e && !1 !== e) {
                  var t = this,
                    n = o(e, {
                      writable: !0,
                      readable: !1
                    }, c(this, this._forwardEnd)),
                    i = function () {
                      var e = t._ondrain;
                      t._ondrain = null, e && e();
                    };
                  this._unwrite && r.nextTick(i), this._writable = e, this._writable.on("drain", i), this._unwrite = function () {
                    t._writable.removeListener("drain", i), n();
                  }, this.uncork();
                } else this.end();
              }, f.prototype.setReadable = function (e) {
                if (this._unread && this._unread(), this.destroyed) e && e.destroy && e.destroy();else {
                  if (null === e || !1 === e) return this.push(null), void this.resume();
                  var t,
                    r = this,
                    n = o(e, {
                      writable: !1,
                      readable: !0
                    }, c(this)),
                    s = function () {
                      r._forward();
                    },
                    a = function () {
                      r.push(null);
                    };
                  this._drained = !0, this._readable = e, this._readable2 = e._readableState ? e : (t = e, new i.Readable({
                    objectMode: !0,
                    highWaterMark: 16
                  }).wrap(t)), this._readable2.on("readable", s), this._readable2.on("end", a), this._unread = function () {
                    r._readable2.removeListener("readable", s), r._readable2.removeListener("end", a), n();
                  }, this._forward();
                }
              }, f.prototype._read = function () {
                this._drained = !0, this._forward();
              }, f.prototype._forward = function () {
                if (!this._forwarding && this._readable2 && this._drained) {
                  var e;
                  for (this._forwarding = !0; this._drained && null !== (e = a(this._readable2));) this.destroyed || (this._drained = this.push(e));
                  this._forwarding = !1;
                }
              }, f.prototype.destroy = function (e, t) {
                if (t || (t = h), this.destroyed) return t(null);
                this.destroyed = !0;
                var n = this;
                r.nextTick(function () {
                  n._destroy(e), t(null);
                });
              }, f.prototype._destroy = function (e) {
                if (e) {
                  var t = this._ondrain;
                  this._ondrain = null, t ? t(e) : this.emit("error", e);
                }
                this._forwardDestroy && (this._readable && this._readable.destroy && this._readable.destroy(), this._writable && this._writable.destroy && this._writable.destroy()), this.emit("close");
              }, f.prototype._write = function (e, t, r) {
                if (!this.destroyed) return this._corked ? u(this, this._write.bind(this, e, t, r)) : e === l ? this._finish(r) : this._writable ? void (!1 === this._writable.write(e) ? this._ondrain = r : this.destroyed || r()) : r();
              }, f.prototype._finish = function (e) {
                var t = this;
                this.emit("preend"), u(this, function () {
                  var r, n;
                  r = t._forwardEnd && t._writable, n = function () {
                    !1 === t._writableState.prefinished && (t._writableState.prefinished = !0), t.emit("prefinish"), u(t, e);
                  }, r ? r._writableState && r._writableState.finished ? n() : r._writableState ? r.end(n) : (r.end(), n()) : n();
                });
              }, f.prototype.end = function (e, t, r) {
                return "function" == typeof e ? this.end(null, null, e) : "function" == typeof t ? this.end(e, null, t) : (this._ended = !0, e && this.write(e), this._writableState.ending || this._writableState.destroyed || this.write(l), i.Writable.prototype.end.call(this, r));
              }, t.exports = f;
            }).call(this);
          }).call(this, e("_process"), e("buffer").Buffer);
        }, {
          _process: 50,
          buffer: 17,
          "end-of-stream": 21,
          inherits: 24,
          "readable-stream": 69,
          "stream-shift": 74
        }],
        21: [function (e, t, r) {
          (function (r) {
            (function () {
              var n = e("once"),
                i = function () {},
                o = function (e, t, s) {
                  if ("function" == typeof t) return o(e, null, t);
                  t || (t = {}), s = n(s || i);
                  var a = e._writableState,
                    l = e._readableState,
                    u = t.readable || !1 !== t.readable && e.readable,
                    c = t.writable || !1 !== t.writable && e.writable,
                    h = !1,
                    f = function () {
                      e.writable || p();
                    },
                    p = function () {
                      c = !1, u || s.call(e);
                    },
                    d = function () {
                      u = !1, c || s.call(e);
                    },
                    g = function (t) {
                      s.call(e, t ? new Error("exited with error code: " + t) : null);
                    },
                    y = function (t) {
                      s.call(e, t);
                    },
                    b = function () {
                      r.nextTick(m);
                    },
                    m = function () {
                      if (!h) return (!u || l && l.ended && !l.destroyed) && (!c || a && a.ended && !a.destroyed) ? void 0 : s.call(e, new Error("premature close"));
                    },
                    v = function () {
                      e.req.on("finish", p);
                    };
                  return !function (e) {
                    return e.setHeader && "function" == typeof e.abort;
                  }(e) ? c && !a && (e.on("end", f), e.on("close", f)) : (e.on("complete", p), e.on("abort", b), e.req ? v() : e.on("request", v)), function (e) {
                    return e.stdio && Array.isArray(e.stdio) && 3 === e.stdio.length;
                  }(e) && e.on("exit", g), e.on("end", d), e.on("finish", p), !1 !== t.error && e.on("error", y), e.on("close", b), function () {
                    h = !0, e.removeListener("complete", p), e.removeListener("abort", b), e.removeListener("request", v), e.req && e.req.removeListener("finish", p), e.removeListener("end", f), e.removeListener("close", f), e.removeListener("finish", p), e.removeListener("exit", g), e.removeListener("end", d), e.removeListener("error", y), e.removeListener("close", b);
                  };
                };
              t.exports = o;
            }).call(this);
          }).call(this, e("_process"));
        }, {
          _process: 50,
          once: 48
        }],
        22: [function (e, t, r) {
          var n = Object.create || function (e) {
              var t = function () {};
              return t.prototype = e, new t();
            },
            i = Object.keys || function (e) {
              var t = [];
              for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
              return r;
            },
            o = Function.prototype.bind || function (e) {
              var t = this;
              return function () {
                return t.apply(e, arguments);
              };
            };
          function s() {
            this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = n(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
          }
          t.exports = s, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._maxListeners = void 0;
          var a,
            l = 10;
          try {
            var u = {};
            Object.defineProperty && Object.defineProperty(u, "x", {
              value: 0
            }), a = 0 === u.x;
          } catch (e) {
            a = !1;
          }
          function c(e) {
            return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners;
          }
          function h(e, t, r, i) {
            var o, s, a;
            if ("function" != typeof r) throw new TypeError('"listener" argument must be a function');
            if ((s = e._events) ? (s.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), s = e._events), a = s[t]) : (s = e._events = n(null), e._eventsCount = 0), a) {
              if ("function" == typeof a ? a = s[t] = i ? [r, a] : [a, r] : i ? a.unshift(r) : a.push(r), !a.warned && (o = c(e)) && o > 0 && a.length > o) {
                a.warned = !0;
                var l = new Error("Possible EventEmitter memory leak detected. " + a.length + ' "' + String(t) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
                l.name = "MaxListenersExceededWarning", l.emitter = e, l.type = t, l.count = a.length, "object" == typeof console && console.warn && console.warn("%s: %s", l.name, l.message);
              }
            } else a = s[t] = r, ++e._eventsCount;
            return e;
          }
          function f() {
            if (!this.fired) switch (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length) {
              case 0:
                return this.listener.call(this.target);
              case 1:
                return this.listener.call(this.target, arguments[0]);
              case 2:
                return this.listener.call(this.target, arguments[0], arguments[1]);
              case 3:
                return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
              default:
                for (var e = new Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];
                this.listener.apply(this.target, e);
            }
          }
          function p(e, t, r) {
            var n = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: r
              },
              i = o.call(f, n);
            return i.listener = r, n.wrapFn = i, i;
          }
          function d(e, t, r) {
            var n = e._events;
            if (!n) return [];
            var i = n[t];
            return i ? "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function (e) {
              for (var t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];
              return t;
            }(i) : y(i, i.length) : [];
          }
          function g(e) {
            var t = this._events;
            if (t) {
              var r = t[e];
              if ("function" == typeof r) return 1;
              if (r) return r.length;
            }
            return 0;
          }
          function y(e, t) {
            for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
            return r;
          }
          a ? Object.defineProperty(s, "defaultMaxListeners", {
            enumerable: !0,
            get: function () {
              return l;
            },
            set: function (e) {
              if ("number" != typeof e || e < 0 || e != e) throw new TypeError('"defaultMaxListeners" must be a positive number');
              l = e;
            }
          }) : s.defaultMaxListeners = l, s.prototype.setMaxListeners = function (e) {
            if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
            return this._maxListeners = e, this;
          }, s.prototype.getMaxListeners = function () {
            return c(this);
          }, s.prototype.emit = function (e) {
            var t,
              r,
              n,
              i,
              o,
              s,
              a = "error" === e;
            if (s = this._events) a = a && null == s.error;else if (!a) return !1;
            if (a) {
              if (arguments.length > 1 && (t = arguments[1]), t instanceof Error) throw t;
              var l = new Error('Unhandled "error" event. (' + t + ")");
              throw l.context = t, l;
            }
            if (!(r = s[e])) return !1;
            var u = "function" == typeof r;
            switch (n = arguments.length) {
              case 1:
                !function (e, t, r) {
                  if (t) e.call(r);else for (var n = e.length, i = y(e, n), o = 0; o < n; ++o) i[o].call(r);
                }(r, u, this);
                break;
              case 2:
                !function (e, t, r, n) {
                  if (t) e.call(r, n);else for (var i = e.length, o = y(e, i), s = 0; s < i; ++s) o[s].call(r, n);
                }(r, u, this, arguments[1]);
                break;
              case 3:
                !function (e, t, r, n, i) {
                  if (t) e.call(r, n, i);else for (var o = e.length, s = y(e, o), a = 0; a < o; ++a) s[a].call(r, n, i);
                }(r, u, this, arguments[1], arguments[2]);
                break;
              case 4:
                !function (e, t, r, n, i, o) {
                  if (t) e.call(r, n, i, o);else for (var s = e.length, a = y(e, s), l = 0; l < s; ++l) a[l].call(r, n, i, o);
                }(r, u, this, arguments[1], arguments[2], arguments[3]);
                break;
              default:
                for (i = new Array(n - 1), o = 1; o < n; o++) i[o - 1] = arguments[o];
                !function (e, t, r, n) {
                  if (t) e.apply(r, n);else for (var i = e.length, o = y(e, i), s = 0; s < i; ++s) o[s].apply(r, n);
                }(r, u, this, i);
            }
            return !0;
          }, s.prototype.addListener = function (e, t) {
            return h(this, e, t, !1);
          }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function (e, t) {
            return h(this, e, t, !0);
          }, s.prototype.once = function (e, t) {
            if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
            return this.on(e, p(this, e, t)), this;
          }, s.prototype.prependOnceListener = function (e, t) {
            if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
            return this.prependListener(e, p(this, e, t)), this;
          }, s.prototype.removeListener = function (e, t) {
            var r, i, o, s, a;
            if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
            if (!(i = this._events)) return this;
            if (!(r = i[e])) return this;
            if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = n(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, r.listener || t));else if ("function" != typeof r) {
              for (o = -1, s = r.length - 1; s >= 0; s--) if (r[s] === t || r[s].listener === t) {
                a = r[s].listener, o = s;
                break;
              }
              if (o < 0) return this;
              0 === o ? r.shift() : function (e, t) {
                for (var r = t, n = r + 1, i = e.length; n < i; r += 1, n += 1) e[r] = e[n];
                e.pop();
              }(r, o), 1 === r.length && (i[e] = r[0]), i.removeListener && this.emit("removeListener", e, a || t);
            }
            return this;
          }, s.prototype.removeAllListeners = function (e) {
            var t, r, o;
            if (!(r = this._events)) return this;
            if (!r.removeListener) return 0 === arguments.length ? (this._events = n(null), this._eventsCount = 0) : r[e] && (0 == --this._eventsCount ? this._events = n(null) : delete r[e]), this;
            if (0 === arguments.length) {
              var s,
                a = i(r);
              for (o = 0; o < a.length; ++o) "removeListener" !== (s = a[o]) && this.removeAllListeners(s);
              return this.removeAllListeners("removeListener"), this._events = n(null), this._eventsCount = 0, this;
            }
            if ("function" == typeof (t = r[e])) this.removeListener(e, t);else if (t) for (o = t.length - 1; o >= 0; o--) this.removeListener(e, t[o]);
            return this;
          }, s.prototype.listeners = function (e) {
            return d(this, e, !0);
          }, s.prototype.rawListeners = function (e) {
            return d(this, e, !1);
          }, s.listenerCount = function (e, t) {
            return "function" == typeof e.listenerCount ? e.listenerCount(t) : g.call(e, t);
          }, s.prototype.listenerCount = g, s.prototype.eventNames = function () {
            return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
          };
        }, {}],
        23: [function (e, t, r) {
          r.read = function (e, t, r, n, i) {
            var o,
              s,
              a = 8 * i - n - 1,
              l = (1 << a) - 1,
              u = l >> 1,
              c = -7,
              h = r ? i - 1 : 0,
              f = r ? -1 : 1,
              p = e[t + h];
            for (h += f, o = p & (1 << -c) - 1, p >>= -c, c += a; c > 0; o = 256 * o + e[t + h], h += f, c -= 8);
            for (s = o & (1 << -c) - 1, o >>= -c, c += n; c > 0; s = 256 * s + e[t + h], h += f, c -= 8);
            if (0 === o) o = 1 - u;else {
              if (o === l) return s ? NaN : 1 / 0 * (p ? -1 : 1);
              s += Math.pow(2, n), o -= u;
            }
            return (p ? -1 : 1) * s * Math.pow(2, o - n);
          }, r.write = function (e, t, r, n, i, o) {
            var s,
              a,
              l,
              u = 8 * o - i - 1,
              c = (1 << u) - 1,
              h = c >> 1,
              f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              p = n ? 0 : o - 1,
              d = n ? 1 : -1,
              g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), (t += s + h >= 1 ? f / l : f * Math.pow(2, 1 - h)) * l >= 2 && (s++, l /= 2), s + h >= c ? (a = 0, s = c) : s + h >= 1 ? (a = (t * l - 1) * Math.pow(2, i), s += h) : (a = t * Math.pow(2, h - 1) * Math.pow(2, i), s = 0)); i >= 8; e[r + p] = 255 & a, p += d, a /= 256, i -= 8);
            for (s = s << i | a, u += i; u > 0; e[r + p] = 255 & s, p += d, s /= 256, u -= 8);
            e[r + p - d] |= 128 * g;
          };
        }, {}],
        24: [function (e, t, r) {
          "function" == typeof Object.create ? t.exports = function (e, t) {
            t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            }));
          } : t.exports = function (e, t) {
            if (t) {
              e.super_ = t;
              var r = function () {};
              r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
            }
          };
        }, {}],
        25: [function (e, t, r) {

          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var n = function () {
            function e(e, t) {
              this.color = !0, this.key = void 0, this.value = void 0, this.parent = void 0, this.brother = void 0, this.leftChild = void 0, this.rightChild = void 0, this.key = e, this.value = t;
            }
            return e.prototype.rotateLeft = function () {
              var e = this.parent,
                t = this.brother,
                r = this.leftChild,
                n = this.rightChild;
              if (!n) throw new Error("unknown error");
              var i = n.leftChild,
                o = n.rightChild;
              return e && (e.leftChild === this ? e.leftChild = n : e.rightChild === this && (e.rightChild = n)), n.parent = e, n.brother = t, n.leftChild = this, n.rightChild = o, t && (t.brother = n), this.parent = n, this.brother = o, this.leftChild = r, this.rightChild = i, o && (o.parent = n, o.brother = this), r && (r.parent = this, r.brother = i), i && (i.parent = this, i.brother = r), n;
            }, e.prototype.rotateRight = function () {
              var e = this.parent,
                t = this.brother,
                r = this.leftChild;
              if (!r) throw new Error("unknown error");
              var n = this.rightChild,
                i = r.leftChild,
                o = r.rightChild;
              return e && (e.leftChild === this ? e.leftChild = r : e.rightChild === this && (e.rightChild = r)), r.parent = e, r.brother = t, r.leftChild = i, r.rightChild = this, t && (t.brother = r), i && (i.parent = r, i.brother = this), this.parent = r, this.brother = i, this.leftChild = o, this.rightChild = n, o && (o.parent = this, o.brother = n), n && (n.parent = this, n.brother = o), r;
            }, e.prototype.remove = function () {
              if (this.leftChild || this.rightChild) throw new Error("can only remove leaf node");
              this.parent && (this === this.parent.leftChild ? this.parent.leftChild = void 0 : this === this.parent.rightChild && (this.parent.rightChild = void 0)), this.brother && (this.brother.brother = void 0), this.key = void 0, this.value = void 0, this.parent = void 0, this.brother = void 0;
            }, e.TreeNodeColorType = {
              red: !0,
              black: !1
            }, e;
          }();
          Object.freeze(n), r.default = n;
        }, {}],
        26: [function (e, t, r) {

          var n = this && this.__generator || function (e, t) {
            var r,
              n,
              i,
              o,
              s = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return o = {
              next: a(0),
              throw: a(1),
              return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
              return this;
            }), o;
            function a(o) {
              return function (a) {
                return function (o) {
                  if (r) throw new TypeError("Generator is already executing.");
                  for (; s;) try {
                    if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                    switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, {
                          value: o[1],
                          done: !1
                        };
                      case 5:
                        s.label++, n = o[1], o = [0];
                        continue;
                      case 7:
                        o = s.ops.pop(), s.trys.pop();
                        continue;
                      default:
                        if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                          s = 0;
                          continue;
                        }
                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          s.label = i[1], i = o;
                          break;
                        }
                        if (i && s.label < i[2]) {
                          s.label = i[2], s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    o = [6, e], n = 0;
                  } finally {
                    r = i = 0;
                  }
                  if (5 & o[0]) throw o[1];
                  return {
                    value: o[0] ? o[1] : void 0,
                    done: !0
                  };
                }([o, a]);
              };
            }
          };
          function i(e) {
            var t = this;
            void 0 === e && (e = []);
            var r = [],
              o = 0,
              s = 0,
              a = 0,
              l = 0,
              u = 0,
              c = 0;
            this.size = function () {
              return c;
            }, this.empty = function () {
              return 0 === c;
            }, this.clear = function () {
              o = a = s = l = u = c = 0, f.call(this, i.bucketSize), c = 0;
            }, this.front = function () {
              return r[o][s];
            }, this.back = function () {
              return r[a][l];
            }, this.forEach = function (e) {
              if (!this.empty()) {
                var t = 0;
                if (o !== a) {
                  for (u = s; u < i.bucketSize; ++u) e(r[o][u], t++);
                  for (u = o + 1; u < a; ++u) for (var n = 0; n < i.bucketSize; ++n) e(r[u][n], t++);
                  for (u = 0; u <= l; ++u) e(r[a][u], t++);
                } else for (var u = s; u <= l; ++u) e(r[o][u], t++);
              }
            };
            var h = function (e) {
              var t = o * i.bucketSize + s,
                r = t + e,
                n = a * i.bucketSize + l;
              if (r < t || r > n) throw new Error("pos should more than 0 and less than queue's size");
              return {
                curNodeBucketIndex: Math.floor(r / i.bucketSize),
                curNodePointerIndex: r % i.bucketSize
              };
            };
            this.getElementByPos = function (e) {
              var t = h(e),
                n = t.curNodeBucketIndex,
                i = t.curNodePointerIndex;
              return r[n][i];
            }, this.eraseElementByPos = function (e) {
              var t = this;
              if (e < 0 || e > c) throw new Error("pos should more than 0 and less than queue's size");
              if (0 === e) this.popFront();else if (e === this.size()) this.popBack();else {
                for (var r = [], n = e + 1; n < c; ++n) r.push(this.getElementByPos(n));
                this.cut(e), this.popBack(), r.forEach(function (e) {
                  return t.pushBack(e);
                });
              }
            }, this.eraseElementByValue = function (e) {
              if (!this.empty()) {
                var t = [];
                this.forEach(function (r) {
                  r !== e && t.push(r);
                });
                for (var r = t.length, n = 0; n < r; ++n) this.setElementByPos(n, t[n]);
                this.cut(r - 1);
              }
            };
            var f = function (e) {
              for (var t = [], n = e * i.sigma, h = Math.max(Math.ceil(n / i.bucketSize), 2), f = 0; f < h; ++f) t.push(new Array(i.bucketSize));
              var p = Math.ceil(e / i.bucketSize),
                d = Math.floor(h / 2) - Math.floor(p / 2),
                g = d,
                y = 0;
              if (this.size()) for (f = 0; f < p; ++f) {
                for (var b = 0; b < i.bucketSize; ++b) if (t[d + f][b] = this.front(), this.popFront(), this.empty()) {
                  g = d + f, y = b;
                  break;
                }
                if (this.empty()) break;
              }
              r = t, o = d, s = 0, a = g, l = y, u = h, c = e;
            };
            this.pushBack = function (e) {
              this.empty() || (a === u - 1 && l === i.bucketSize - 1 && f.call(this, this.size()), l < i.bucketSize - 1 ? ++l : a < u - 1 && (++a, l = 0)), ++c, r[a][l] = e;
            }, this.popBack = function () {
              this.empty() || (1 !== this.size() && (l > 0 ? --l : o < a && (--a, l = i.bucketSize - 1)), c > 0 && --c);
            }, this.setElementByPos = function (e, t) {
              var n = h(e),
                i = n.curNodeBucketIndex,
                o = n.curNodePointerIndex;
              r[i][o] = t;
            }, this.insert = function (e, t, r) {
              var n = this;
              if (void 0 === r && (r = 1), 0 === e) for (; r--;) this.pushFront(t);else if (e === this.size()) for (; r--;) this.pushBack(t);else {
                for (var i = [], o = e; o < c; ++o) i.push(this.getElementByPos(o));
                this.cut(e - 1);
                for (o = 0; o < r; ++o) this.pushBack(t);
                i.forEach(function (e) {
                  return n.pushBack(e);
                });
              }
            }, this.find = function (e) {
              if (o === a) {
                for (var t = s; t <= l; ++t) if (r[o][t] === e) return !0;
                return !1;
              }
              for (t = s; t < i.bucketSize; ++t) if (r[o][t] === e) return !0;
              for (t = o + 1; t < a; ++t) for (var n = 0; n < i.bucketSize; ++n) if (r[t][n] === e) return !0;
              for (t = 0; t <= l; ++t) if (r[a][t] === e) return !0;
              return !1;
            }, this.reverse = function () {
              for (var e = 0, t = c - 1; e < t;) {
                var r = this.getElementByPos(e);
                this.setElementByPos(e, this.getElementByPos(t)), this.setElementByPos(t, r), ++e, --t;
              }
            }, this.unique = function () {
              if (!this.empty()) {
                var e = [],
                  t = this.front();
                this.forEach(function (r, n) {
                  0 !== n && r === t || (e.push(r), t = r);
                });
                for (var r = 0; r < c; ++r) this.setElementByPos(r, e[r]);
                this.cut(e.length - 1);
              }
            }, this.sort = function (e) {
              var t = [];
              this.forEach(function (e) {
                t.push(e);
              }), t.sort(e);
              for (var r = 0; r < c; ++r) this.setElementByPos(r, t[r]);
            }, this.pushFront = function (e) {
              this.empty() || (0 === o && 0 === s && f.call(this, this.size()), s > 0 ? --s : o > 0 && (--o, s = i.bucketSize - 1)), ++c, r[o][s] = e;
            }, this.popFront = function () {
              this.empty() || (1 !== this.size() && (s < i.bucketSize - 1 ? ++s : o < a && (++o, s = 0)), c > 0 && --c);
            }, this.shrinkToFit = function () {
              var e = this,
                t = [];
              this.forEach(function (e) {
                t.push(e);
              });
              var n = t.length;
              r = [];
              for (var o = Math.ceil(n / i.bucketSize), s = 0; s < o; ++s) r.push(new Array(i.bucketSize));
              this.clear(), t.forEach(function (t) {
                return e.pushBack(t);
              });
            }, this.cut = function (e) {
              if (e < 0) this.clear();else {
                var t = h(e),
                  r = t.curNodeBucketIndex,
                  n = t.curNodePointerIndex;
                a = r, l = n, c = e + 1;
              }
            }, this[Symbol.iterator] = function () {
              return function () {
                var e, t;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      if (0 === c) return [2];
                      if (o !== a) return [3, 5];
                      t = s, n.label = 1;
                    case 1:
                      return t <= l ? [4, r[o][t]] : [3, 4];
                    case 2:
                      n.sent(), n.label = 3;
                    case 3:
                      return ++t, [3, 1];
                    case 4:
                      return [2];
                    case 5:
                      t = s, n.label = 6;
                    case 6:
                      return t < i.bucketSize ? [4, r[o][t]] : [3, 9];
                    case 7:
                      n.sent(), n.label = 8;
                    case 8:
                      return ++t, [3, 6];
                    case 9:
                      t = o + 1, n.label = 10;
                    case 10:
                      if (!(t < a)) return [3, 15];
                      e = 0, n.label = 11;
                    case 11:
                      return e < i.bucketSize ? [4, r[t][e]] : [3, 14];
                    case 12:
                      n.sent(), n.label = 13;
                    case 13:
                      return ++e, [3, 11];
                    case 14:
                      return ++t, [3, 10];
                    case 15:
                      t = 0, n.label = 16;
                    case 16:
                      return t <= l ? [4, r[a][t]] : [3, 19];
                    case 17:
                      n.sent(), n.label = 18;
                    case 18:
                      return ++t, [3, 16];
                    case 19:
                      return [2];
                  }
                });
              }();
            }, function () {
              var n = i.bucketSize;
              e.size ? n = e.size() : e.length && (n = e.length);
              var s = n * i.sigma;
              u = Math.ceil(s / i.bucketSize), u = Math.max(u, 3);
              for (var l = 0; l < u; ++l) r.push(new Array(i.bucketSize));
              var c = Math.ceil(n / i.bucketSize);
              o = Math.floor(u / 2) - Math.floor(c / 2), a = o, e.forEach(function (e) {
                return t.pushBack(e);
              });
            }(), Object.freeze(this);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), i.sigma = 3, i.bucketSize = 5e3, Object.freeze(i), r.default = i;
        }, {}],
        27: [function (e, t, r) {

          var n = this && this.__generator || function (e, t) {
              var r,
                n,
                i,
                o,
                s = {
                  label: 0,
                  sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1];
                  },
                  trys: [],
                  ops: []
                };
              return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
              }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this;
              }), o;
              function a(o) {
                return function (a) {
                  return function (o) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                      if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                      switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return s.label++, {
                            value: o[1],
                            done: !1
                          };
                        case 5:
                          s.label++, n = o[1], o = [0];
                          continue;
                        case 7:
                          o = s.ops.pop(), s.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            s = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                            s.label = o[1];
                            break;
                          }
                          if (6 === o[0] && s.label < i[1]) {
                            s.label = i[1], i = o;
                            break;
                          }
                          if (i && s.label < i[2]) {
                            s.label = i[2], s.ops.push(o);
                            break;
                          }
                          i[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      o = t.call(e, s);
                    } catch (e) {
                      o = [6, e], n = 0;
                    } finally {
                      r = i = 0;
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                      value: o[0] ? o[1] : void 0,
                      done: !0
                    };
                  }([o, a]);
                };
              }
            },
            i = this && this.__values || function (e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                r = t && e[t],
                n = 0;
              if (r) return r.call(e);
              if (e && "number" == typeof e.length) return {
                next: function () {
                  return e && n >= e.length && (e = void 0), {
                    value: e && e[n++],
                    done: !e
                  };
                }
              };
              throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var o = e("../LinkList/LinkList"),
            s = e("../Map/Map");
          function a(e, t, r) {
            var l = this;
            if (void 0 === e && (e = []), void 0 === t && (t = a.initSize), r = r || function (e) {
              var t,
                r,
                n = 0,
                o = "";
              if ("number" == typeof e) n = ((n = Math.floor(e)) << 5) - n, n &= n;else {
                o = "string" != typeof e ? JSON.stringify(e) : e;
                try {
                  for (var s = i(o), a = s.next(); !a.done; a = s.next()) {
                    n = (n << 5) - n + a.value.charCodeAt(0), n &= n;
                  }
                } catch (e) {
                  t = {
                    error: e
                  };
                } finally {
                  try {
                    a && !a.done && (r = s.return) && r.call(s);
                  } finally {
                    if (t) throw t.error;
                  }
                }
              }
              return n ^= n >>> 16;
            }, 0 != (t & t - 1)) throw new Error("initBucketNum must be 2 to the power of n");
            var u = 0,
              c = [],
              h = Math.max(a.initSize, Math.min(a.maxSize, t));
            this.size = function () {
              return u;
            }, this.empty = function () {
              return 0 === u;
            }, this.clear = function () {
              u = 0, h = t, c = [];
            }, this.forEach = function (e) {
              var t = 0;
              c.forEach(function (r) {
                r.forEach(function (r) {
                  e(r, t++);
                });
              });
            };
            this.setElement = function (e, t) {
              var n, l;
              if (null === e || void 0 === e) throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
              if (null !== t && void 0 !== t) {
                var f = r(e) & h - 1;
                if (c[f]) {
                  var p = c[f].size();
                  if (c[f] instanceof o.default) {
                    try {
                      for (var d = i(c[f]), g = d.next(); !g.done; g = d.next()) {
                        var y = g.value;
                        if (y.key === e) return void (y.value = t);
                      }
                    } catch (e) {
                      n = {
                        error: e
                      };
                    } finally {
                      try {
                        g && !g.done && (l = d.return) && l.call(d);
                      } finally {
                        if (n) throw n.error;
                      }
                    }
                    c[f].pushBack({
                      key: e,
                      value: t
                    }), c[f].size() >= a.treeifyThreshold && (c[f] = new s.default(c[f]));
                  } else c[f].setElement(e, t);
                  var b = c[f].size();
                  u += b - p;
                } else ++u, c[f] = new o.default([{
                  key: e,
                  value: t
                }]);
                u > h * a.sigma && function (e) {
                  if (!(e >= a.maxSize)) {
                    h = 2 * e;
                    var t = [];
                    c.forEach(function (n, i) {
                      if (!n.empty()) {
                        if (n instanceof o.default && 1 === n.size()) {
                          var l = n.front(),
                            u = l.key,
                            f = l.value;
                          t[r(u) & h - 1] = new o.default([{
                            key: u,
                            value: f
                          }]);
                        } else if (n instanceof s.default) {
                          var p = new o.default(),
                            d = new o.default();
                          n.forEach(function (t) {
                            0 == (r(t.key) & e) ? p.pushBack(t) : d.pushBack(t);
                          }), p.size() > a.untreeifyThreshold ? t[i] = new s.default(p) : p.size() && (t[i] = p), d.size() > a.untreeifyThreshold ? t[i + e] = new s.default(d) : d.size() && (t[i + e] = d);
                        } else {
                          var g = new o.default(),
                            y = new o.default();
                          n.forEach(function (t) {
                            0 == (r(t.key) & e) ? g.pushBack(t) : y.pushBack(t);
                          }), g.size() && (t[i] = g), y.size() && (t[i + e] = y);
                        }
                        c[i].clear();
                      }
                    }), c = t;
                  }
                }.call(this, h);
              } else this.eraseElementByKey(e);
            }, this.getElementByKey = function (e) {
              var t,
                n,
                o = r(e) & h - 1;
              if (c[o]) {
                if (c[o] instanceof s.default) return c[o].getElementByKey(e);
                try {
                  for (var a = i(c[o]), l = a.next(); !l.done; l = a.next()) {
                    var u = l.value;
                    if (u.key === e) return u.value;
                  }
                } catch (e) {
                  t = {
                    error: e
                  };
                } finally {
                  try {
                    l && !l.done && (n = a.return) && n.call(a);
                  } finally {
                    if (t) throw t.error;
                  }
                }
              }
            }, this.eraseElementByKey = function (e) {
              var t,
                n,
                l = r(e) & h - 1;
              if (c[l]) {
                var f = c[l].size();
                if (c[l] instanceof s.default) c[l].eraseElementByKey(e), c[l].size() <= a.untreeifyThreshold && (c[l] = new o.default(c[l]));else {
                  var p = -1;
                  try {
                    for (var d = i(c[l]), g = d.next(); !g.done; g = d.next()) {
                      if (++p, g.value.key === e) {
                        c[l].eraseElementByPos(p);
                        break;
                      }
                    }
                  } catch (e) {
                    t = {
                      error: e
                    };
                  } finally {
                    try {
                      g && !g.done && (n = d.return) && n.call(d);
                    } finally {
                      if (t) throw t.error;
                    }
                  }
                }
                var y = c[l].size();
                u += y - f;
              }
            }, this.find = function (e) {
              var t,
                n,
                o = r(e) & h - 1;
              if (!c[o]) return !1;
              if (c[o] instanceof s.default) return c[o].find(e);
              try {
                for (var a = i(c[o]), l = a.next(); !l.done; l = a.next()) {
                  if (l.value.key === e) return !0;
                }
              } catch (e) {
                t = {
                  error: e
                };
              } finally {
                try {
                  l && !l.done && (n = a.return) && n.call(a);
                } finally {
                  if (t) throw t.error;
                }
              }
              return !1;
            }, this[Symbol.iterator] = function () {
              return function () {
                var e, t, r, o, s, a;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      e = 0, n.label = 1;
                    case 1:
                      if (!(e < h)) return [3, 10];
                      for (; e < h && !c[e];) ++e;
                      if (e >= h) return [3, 10];
                      n.label = 2;
                    case 2:
                      n.trys.push([2, 7, 8, 9]), s = void 0, t = i(c[e]), r = t.next(), n.label = 3;
                    case 3:
                      return r.done ? [3, 6] : [4, r.value];
                    case 4:
                      n.sent(), n.label = 5;
                    case 5:
                      return r = t.next(), [3, 3];
                    case 6:
                      return [3, 9];
                    case 7:
                      return o = n.sent(), s = {
                        error: o
                      }, [3, 9];
                    case 8:
                      try {
                        r && !r.done && (a = t.return) && a.call(t);
                      } finally {
                        if (s) throw s.error;
                      }
                      return [7];
                    case 9:
                      return ++e, [3, 1];
                    case 10:
                      return [2];
                  }
                });
              }();
            }, e.forEach(function (e) {
              var t = e.key,
                r = e.value;
              return l.setElement(t, r);
            }), Object.freeze(this);
          }
          a.initSize = 16, a.maxSize = 1 << 30, a.sigma = .75, a.treeifyThreshold = 8, a.untreeifyThreshold = 6, a.minTreeifySize = 64, Object.freeze(a), r.default = a;
        }, {
          "../LinkList/LinkList": 29,
          "../Map/Map": 30
        }],
        28: [function (e, t, r) {

          var n = this && this.__generator || function (e, t) {
              var r,
                n,
                i,
                o,
                s = {
                  label: 0,
                  sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1];
                  },
                  trys: [],
                  ops: []
                };
              return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
              }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this;
              }), o;
              function a(o) {
                return function (a) {
                  return function (o) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                      if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                      switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return s.label++, {
                            value: o[1],
                            done: !1
                          };
                        case 5:
                          s.label++, n = o[1], o = [0];
                          continue;
                        case 7:
                          o = s.ops.pop(), s.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            s = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                            s.label = o[1];
                            break;
                          }
                          if (6 === o[0] && s.label < i[1]) {
                            s.label = i[1], i = o;
                            break;
                          }
                          if (i && s.label < i[2]) {
                            s.label = i[2], s.ops.push(o);
                            break;
                          }
                          i[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      o = t.call(e, s);
                    } catch (e) {
                      o = [6, e], n = 0;
                    } finally {
                      r = i = 0;
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                      value: o[0] ? o[1] : void 0,
                      done: !0
                    };
                  }([o, a]);
                };
              }
            },
            i = this && this.__values || function (e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                r = t && e[t],
                n = 0;
              if (r) return r.call(e);
              if (e && "number" == typeof e.length) return {
                next: function () {
                  return e && n >= e.length && (e = void 0), {
                    value: e && e[n++],
                    done: !e
                  };
                }
              };
              throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var o = e("../Set/Set"),
            s = e("../LinkList/LinkList");
          function a(e, t, r) {
            var l = this;
            if (void 0 === e && (e = []), void 0 === t && (t = a.initSize), r = r || function (e) {
              var t = 0,
                r = "";
              if ("number" == typeof e) t = ((t = Math.floor(e)) << 5) - t, t &= t;else {
                r = "string" != typeof e ? JSON.stringify(e) : e;
                for (var n = 0; n < r.length; n++) {
                  t = (t << 5) - t + r.charCodeAt(n), t &= t;
                }
              }
              return t ^= t >>> 16;
            }, 0 != (t & t - 1)) throw new Error("initBucketNum must be 2 to the power of n");
            var u = 0,
              c = [],
              h = Math.max(a.initSize, Math.min(a.maxSize, t));
            this.size = function () {
              return u;
            }, this.empty = function () {
              return 0 === u;
            }, this.clear = function () {
              u = 0, h = t, c = [];
            }, this.forEach = function (e) {
              var t = 0;
              c.forEach(function (r) {
                r.forEach(function (r) {
                  e(r, t++);
                });
              });
            };
            this.insert = function (e) {
              if (null === e || void 0 === e) throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
              var t = r(e) & h - 1;
              if (c[t]) {
                var n = c[t].size();
                if (c[t] instanceof s.default) {
                  if (c[t].find(e)) return;
                  c[t].pushBack(e), c[t].size() >= a.treeifyThreshold && (c[t] = new o.default(c[t]));
                } else c[t].insert(e);
                var i = c[t].size();
                u += i - n;
              } else c[t] = new s.default([e]), ++u;
              u > h * a.sigma && function (e) {
                if (!(e >= a.maxSize)) {
                  h = 2 * e;
                  var t = [];
                  c.forEach(function (n, i) {
                    if (!n.empty()) {
                      if (n instanceof s.default && 1 === n.size()) {
                        var l = n.front();
                        if (void 0 === l) throw new Error("unknown error");
                        t[r(l) & h - 1] = new s.default([l]);
                      } else if (n instanceof o.default) {
                        var u = new s.default(),
                          f = new s.default();
                        n.forEach(function (t) {
                          0 == (r(t) & e) ? u.pushBack(t) : f.pushBack(t);
                        }), u.size() > a.untreeifyThreshold ? t[i] = new o.default(u) : u.size() && (t[i] = u), f.size() > a.untreeifyThreshold ? t[i + e] = new o.default(f) : f.size() && (t[i + e] = f);
                      } else {
                        var p = new s.default(),
                          d = new s.default();
                        n.forEach(function (t) {
                          0 == (r(t) & e) ? p.pushBack(t) : d.pushBack(t);
                        }), p.size() && (t[i] = p), d.size() && (t[i + e] = d);
                      }
                      c[i].clear();
                    }
                  }), c = t;
                }
              }.call(this, h);
            }, this.eraseElementByValue = function (e) {
              var t = r(e) & h - 1;
              if (c[t]) {
                var n = c[t].size();
                c[t].eraseElementByValue(e), c[t] instanceof o.default && c[t].size() <= a.untreeifyThreshold && (c[t] = new s.default(c[t]));
                var i = c[t].size();
                u += i - n;
              }
            }, this.find = function (e) {
              var t = r(e) & h - 1;
              return !!c[t] && c[t].find(e);
            }, this[Symbol.iterator] = function () {
              return function () {
                var e, t, r, o, s, a;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      e = 0, n.label = 1;
                    case 1:
                      if (!(e < h)) return [3, 10];
                      for (; e < h && !c[e];) ++e;
                      if (e >= h) return [3, 10];
                      n.label = 2;
                    case 2:
                      n.trys.push([2, 7, 8, 9]), s = void 0, t = i(c[e]), r = t.next(), n.label = 3;
                    case 3:
                      return r.done ? [3, 6] : [4, r.value];
                    case 4:
                      n.sent(), n.label = 5;
                    case 5:
                      return r = t.next(), [3, 3];
                    case 6:
                      return [3, 9];
                    case 7:
                      return o = n.sent(), s = {
                        error: o
                      }, [3, 9];
                    case 8:
                      try {
                        r && !r.done && (a = t.return) && a.call(t);
                      } finally {
                        if (s) throw s.error;
                      }
                      return [7];
                    case 9:
                      return ++e, [3, 1];
                    case 10:
                      return [2];
                  }
                });
              }();
            }, e.forEach(function (e) {
              return l.insert(e);
            }), Object.freeze(this);
          }
          a.initSize = 16, a.maxSize = 1 << 30, a.sigma = .75, a.treeifyThreshold = 8, a.untreeifyThreshold = 6, a.minTreeifySize = 64, Object.freeze(a), r.default = a;
        }, {
          "../LinkList/LinkList": 29,
          "../Set/Set": 33
        }],
        29: [function (e, t, r) {

          var n = this && this.__generator || function (e, t) {
            var r,
              n,
              i,
              o,
              s = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return o = {
              next: a(0),
              throw: a(1),
              return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
              return this;
            }), o;
            function a(o) {
              return function (a) {
                return function (o) {
                  if (r) throw new TypeError("Generator is already executing.");
                  for (; s;) try {
                    if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                    switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, {
                          value: o[1],
                          done: !1
                        };
                      case 5:
                        s.label++, n = o[1], o = [0];
                        continue;
                      case 7:
                        o = s.ops.pop(), s.trys.pop();
                        continue;
                      default:
                        if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                          s = 0;
                          continue;
                        }
                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          s.label = i[1], i = o;
                          break;
                        }
                        if (i && s.label < i[2]) {
                          s.label = i[2], s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = t.call(e, s);
                  } catch (e) {
                    o = [6, e], n = 0;
                  } finally {
                    r = i = 0;
                  }
                  if (5 & o[0]) throw o[1];
                  return {
                    value: o[0] ? o[1] : void 0,
                    done: !0
                  };
                }([o, a]);
              };
            }
          };
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var i = function () {
            return function (e) {
              this.value = void 0, this.pre = void 0, this.next = void 0, this.value = e;
            };
          }();
          function o(e) {
            var t = this;
            void 0 === e && (e = []);
            var r = 0,
              o = void 0,
              s = void 0;
            this.size = function () {
              return r;
            }, this.empty = function () {
              return 0 === r;
            }, this.clear = function () {
              o = s = void 0, r = 0;
            }, this.front = function () {
              return null === o || void 0 === o ? void 0 : o.value;
            }, this.back = function () {
              return null === s || void 0 === s ? void 0 : s.value;
            }, this.forEach = function (e) {
              for (var t = o, r = 0; t;) {
                if (void 0 === t.value) throw new Error("unknown error");
                e(t.value, r++), t = t.next;
              }
            }, this.getElementByPos = function (e) {
              if (e < 0 || e >= r) throw new Error("pos must more then 0 and less then the list length");
              for (var t = o; e-- && t;) t = t.next;
              if (!t || void 0 === t.value) throw new Error("unknown error");
              return t.value;
            }, this.eraseElementByPos = function (e) {
              if (e < 0 || e >= r) throw new Error("erase pos must more then 0 and less then the list length");
              if (0 === e) this.popFront();else if (e === r - 1) this.popBack();else {
                for (var t = o; e--;) {
                  if (!(null === t || void 0 === t ? void 0 : t.next)) throw new Error("unknown error");
                  t = t.next;
                }
                if (!t || !t.pre || !t.next) throw new Error("unknown error");
                var n = t.pre,
                  i = t.next;
                i.pre = n, n.next = i, r > 0 && --r;
              }
            }, this.eraseElementByValue = function (e) {
              for (; o && o.value === e;) this.popFront();
              for (; s && s.value === e;) this.popBack();
              if (o) for (var t = o; t;) {
                if (t.value === e) {
                  var n = t.pre,
                    i = t.next;
                  i && (i.pre = n), n && (n.next = i), r > 0 && --r;
                }
                t = t.next;
              }
            }, this.pushBack = function (e) {
              if (null === e || void 0 === e) throw new Error("you can't push null or undefined here");
              ++r;
              var t = new i(e);
              s ? (s.next = t, t.pre = s, s = t) : o = s = t;
            }, this.popBack = function () {
              s && (r > 0 && --r, s && (o === s ? o = s = void 0 : (s = s.pre) && (s.next = void 0)));
            }, this.setElementByPos = function (e, t) {
              if (null === t || void 0 === t) throw new Error("you can't set null or undefined here");
              if (e < 0 || e >= r) throw new Error("pos must more then 0 and less then the list length");
              for (var n = o; e--;) {
                if (!n) throw new Error("unknown error");
                n = n.next;
              }
              n && (n.value = t);
            }, this.insert = function (e, t, n) {
              if (void 0 === n && (n = 1), null === t || void 0 === t) throw new Error("you can't insert null or undefined here");
              if (e < 0 || e > r) throw new Error("insert pos must more then 0 and less then or equal to the list length");
              if (n < 0) throw new Error("insert size must more than 0");
              if (0 === e) for (; n--;) this.pushFront(t);else if (e === r) for (; n--;) this.pushBack(t);else {
                for (var s = o, a = 1; a < e; ++a) {
                  if (!(null === s || void 0 === s ? void 0 : s.next)) throw new Error("unknown error");
                  s = null === s || void 0 === s ? void 0 : s.next;
                }
                if (!s) throw new Error("unknown error");
                var l = s.next;
                for (r += n; n--;) s.next = new i(t), s.next.pre = s, s = s.next;
                s.next = l, l && (l.pre = s);
              }
            }, this.find = function (e) {
              for (var t = o; t;) {
                if (t.value === e) return !0;
                t = t.next;
              }
              return !1;
            }, this.reverse = function () {
              for (var e = o, t = s, n = 0; e && t && 2 * n < r;) {
                var i = e.value;
                e.value = t.value, t.value = i, e = e.next, t = t.pre, ++n;
              }
            }, this.unique = function () {
              for (var e = o; e;) {
                for (var t = e; t && t.next && t.value === t.next.value;) t = t.next, r > 0 && --r;
                e.next = t.next, e.next && (e.next.pre = e), e = e.next;
              }
            }, this.sort = function (e) {
              var t = [];
              this.forEach(function (e) {
                t.push(e);
              }), t.sort(e);
              var r = o;
              t.forEach(function (e) {
                r && (r.value = e, r = r.next);
              });
            }, this.pushFront = function (e) {
              if (null === e || void 0 === e) throw new Error("you can't push null or undefined here");
              ++r;
              var t = new i(e);
              o ? (t.next = o, o.pre = t, o = t) : o = s = t;
            }, this.popFront = function () {
              o && (r > 0 && --r, o && (o === s ? o = s = void 0 : (o = o.next) && (o.pre = void 0)));
            }, this.merge = function (e) {
              var t = this,
                n = o;
              e.forEach(function (e) {
                for (; n && void 0 !== n.value && n.value <= e;) n = n.next;
                if (void 0 === n) t.pushBack(e), n = s;else if (n === o) t.pushFront(e), n = o;else {
                  ++r;
                  var a = n.pre;
                  a && (a.next = new i(e), a.next.pre = a, a.next.next = n, n && (n.pre = a.next));
                }
              });
            }, this[Symbol.iterator] = function () {
              return function () {
                var e;
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      e = o, t.label = 1;
                    case 1:
                      if (void 0 === e) return [3, 3];
                      if (!e.value) throw new Error("unknown error");
                      return [4, e.value];
                    case 2:
                      return t.sent(), e = e.next, [3, 1];
                    case 3:
                      return [2];
                  }
                });
              }();
            }, e.forEach(function (e) {
              return t.pushBack(e);
            }), Object.freeze(this);
          }
          Object.freeze(o), r.default = o;
        }, {}],
        30: [function (e, t, r) {

          var n = this && this.__generator || function (e, t) {
              var r,
                n,
                i,
                o,
                s = {
                  label: 0,
                  sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1];
                  },
                  trys: [],
                  ops: []
                };
              return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
              }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this;
              }), o;
              function a(o) {
                return function (a) {
                  return function (o) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                      if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                      switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return s.label++, {
                            value: o[1],
                            done: !1
                          };
                        case 5:
                          s.label++, n = o[1], o = [0];
                          continue;
                        case 7:
                          o = s.ops.pop(), s.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            s = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                            s.label = o[1];
                            break;
                          }
                          if (6 === o[0] && s.label < i[1]) {
                            s.label = i[1], i = o;
                            break;
                          }
                          if (i && s.label < i[2]) {
                            s.label = i[2], s.ops.push(o);
                            break;
                          }
                          i[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      o = t.call(e, s);
                    } catch (e) {
                      o = [6, e], n = 0;
                    } finally {
                      r = i = 0;
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                      value: o[0] ? o[1] : void 0,
                      done: !0
                    };
                  }([o, a]);
                };
              }
            },
            i = this && this.__values || function (e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                r = t && e[t],
                n = 0;
              if (r) return r.call(e);
              if (e && "number" == typeof e.length) return {
                next: function () {
                  return e && n >= e.length && (e = void 0), {
                    value: e && e[n++],
                    done: !e
                  };
                }
              };
              throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var o = e("../Base/TreeNode");
          function s(e, t) {
            var r = this;
            void 0 === e && (e = []), t = t || function (e, t) {
              return e < t ? -1 : e > t ? 1 : 0;
            };
            var s = 0,
              a = new o.default();
            a.color = o.default.TreeNodeColorType.black, this.size = function () {
              return s;
            }, this.empty = function () {
              return 0 === s;
            }, this.clear = function () {
              s = 0, a.key = a.value = void 0, a.leftChild = a.rightChild = a.brother = void 0;
            };
            var l = function (e) {
                if (!e || void 0 === e.key) throw new Error("unknown error");
                return e.leftChild ? l(e.leftChild) : e;
              },
              u = function (e) {
                if (!e || void 0 === e.key) throw new Error("unknown error");
                return e.rightChild ? u(e.rightChild) : e;
              };
            this.front = function () {
              if (!this.empty()) {
                var e = l(a);
                if (void 0 === e.key || void 0 === e.value) throw new Error("unknown error");
                return {
                  key: e.key,
                  value: e.value
                };
              }
            }, this.back = function () {
              if (!this.empty()) {
                var e = u(a);
                if (void 0 === e.key || void 0 === e.value) throw new Error("unknown error");
                return {
                  key: e.key,
                  value: e.value
                };
              }
            }, this.forEach = function (e) {
              var t,
                r,
                n = 0;
              try {
                for (var o = i(this), s = o.next(); !s.done; s = o.next()) {
                  e(s.value, n++);
                }
              } catch (e) {
                t = {
                  error: e
                };
              } finally {
                try {
                  s && !s.done && (r = o.return) && r.call(o);
                } finally {
                  if (t) throw t.error;
                }
              }
            }, this.getElementByPos = function (e) {
              var t, r;
              if (e < 0 || e >= this.size()) throw new Error("pos must more than 0 and less than set's size");
              var n = 0;
              try {
                for (var o = i(this), s = o.next(); !s.done; s = o.next()) {
                  var a = s.value;
                  if (n === e) return a;
                  ++n;
                }
              } catch (e) {
                t = {
                  error: e
                };
              } finally {
                try {
                  s && !s.done && (r = o.return) && r.call(o);
                } finally {
                  if (t) throw t.error;
                }
              }
              throw new Error("unknown Error");
            };
            var c = function (e, r) {
              if (e && void 0 !== e.key && void 0 !== e.value) {
                var n = t(e.key, r);
                return 0 === n ? {
                  key: e.key,
                  value: e.value
                } : n < 0 ? c(e.rightChild, r) : c(e.leftChild, r) || {
                  key: e.key,
                  value: e.value
                };
              }
            };
            this.lowerBound = function (e) {
              return c(a, e);
            };
            var h = function (e, r) {
              if (e && void 0 !== e.key && void 0 !== e.value) return t(e.key, r) <= 0 ? h(e.rightChild, r) : h(e.leftChild, r) || {
                key: e.key,
                value: e.value
              };
            };
            this.upperBound = function (e) {
              return h(a, e);
            };
            var f = function (e, r) {
              if (e && void 0 !== e.key && void 0 !== e.value) {
                var n = t(e.key, r);
                return 0 === n ? {
                  key: e.key,
                  value: e.value
                } : n > 0 ? f(e.leftChild, r) : f(e.rightChild, r) || {
                  key: e.key,
                  value: e.value
                };
              }
            };
            this.reverseLowerBound = function (e) {
              return f(a, e);
            };
            var p = function (e, r) {
              if (e && void 0 !== e.key && void 0 !== e.value) return t(e.key, r) >= 0 ? p(e.leftChild, r) : p(e.rightChild, r) || {
                key: e.key,
                value: e.value
              };
            };
            this.reverseUpperBound = function (e) {
              return p(a, e);
            };
            var d = function (e) {
                var t = e.parent;
                if (!t) {
                  if (e === a) return;
                  throw new Error("unknown error");
                }
                if (e.color !== o.default.TreeNodeColorType.red) {
                  var r = e.brother;
                  if (!r) throw new Error("unknown error");
                  if (e === t.leftChild) {
                    if (r.color === o.default.TreeNodeColorType.red) {
                      r.color = o.default.TreeNodeColorType.black, t.color = o.default.TreeNodeColorType.red;
                      var n = t.rotateLeft();
                      a === t && (a = n), d(e);
                    } else if (r.color === o.default.TreeNodeColorType.black) if (r.rightChild && r.rightChild.color === o.default.TreeNodeColorType.red) {
                      r.color = t.color, t.color = o.default.TreeNodeColorType.black, r.rightChild && (r.rightChild.color = o.default.TreeNodeColorType.black);
                      n = t.rotateLeft();
                      a === t && (a = n), e.color = o.default.TreeNodeColorType.black;
                    } else if (r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || !r.leftChild || r.leftChild.color !== o.default.TreeNodeColorType.red) r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || (r.color = o.default.TreeNodeColorType.red, d(t));else {
                      r.color = o.default.TreeNodeColorType.red, r.leftChild && (r.leftChild.color = o.default.TreeNodeColorType.black);
                      n = r.rotateRight();
                      a === r && (a = n), d(e);
                    }
                  } else if (e === t.rightChild) if (r.color === o.default.TreeNodeColorType.red) {
                    r.color = o.default.TreeNodeColorType.black, t.color = o.default.TreeNodeColorType.red;
                    n = t.rotateRight();
                    a === t && (a = n), d(e);
                  } else if (r.color === o.default.TreeNodeColorType.black) if (r.leftChild && r.leftChild.color === o.default.TreeNodeColorType.red) {
                    r.color = t.color, t.color = o.default.TreeNodeColorType.black, r.leftChild && (r.leftChild.color = o.default.TreeNodeColorType.black);
                    n = t.rotateRight();
                    a === t && (a = n), e.color = o.default.TreeNodeColorType.black;
                  } else if (r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || !r.rightChild || r.rightChild.color !== o.default.TreeNodeColorType.red) r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || (r.color = o.default.TreeNodeColorType.red, d(t));else {
                    r.color = o.default.TreeNodeColorType.red, r.rightChild && (r.rightChild.color = o.default.TreeNodeColorType.black);
                    n = r.rotateLeft();
                    a === r && (a = n), d(e);
                  }
                } else e.color = o.default.TreeNodeColorType.black;
              },
              g = function (e) {
                for (var t = e; t.leftChild || t.rightChild;) {
                  if (t.rightChild) {
                    t = l(t.rightChild);
                    var r = e.key;
                    e.key = t.key, t.key = r;
                    var n = e.value;
                    e.value = t.value, t.value = n, e = t;
                  }
                  if (t.leftChild) {
                    t = u(t.leftChild);
                    r = e.key;
                    e.key = t.key, t.key = r;
                    n = e.value;
                    e.value = t.value, t.value = n, e = t;
                  }
                }
                d(t), t && t.remove(), --s, a.color = o.default.TreeNodeColorType.black;
              },
              y = function (e, t) {
                return !(!e || void 0 === e.key) && (!!y(e.leftChild, t) || !!t(e) || y(e.rightChild, t));
              };
            this.eraseElementByPos = function (e) {
              if (e < 0 || e >= s) throw new Error("pos must more than 0 and less than set's size");
              var t = 0;
              y(a, function (r) {
                return e === t ? (g(r), !0) : (++t, !1);
              });
            }, this.eraseElementByKey = function (e) {
              if (!this.empty()) {
                var r = v(a, e);
                void 0 !== r && void 0 !== r.key && 0 === t(r.key, e) && g(r);
              }
            };
            var b = function (e, r) {
                if (!e || void 0 === e.key) throw new Error("unknown error");
                var n = t(r, e.key);
                return n < 0 ? e.leftChild ? b(e.leftChild, r) : (e.leftChild = new o.default(), e.leftChild.parent = e, e.leftChild.brother = e.rightChild, e.rightChild && (e.rightChild.brother = e.leftChild), e.leftChild) : n > 0 ? e.rightChild ? b(e.rightChild, r) : (e.rightChild = new o.default(), e.rightChild.parent = e, e.rightChild.brother = e.leftChild, e.leftChild && (e.leftChild.brother = e.rightChild), e.rightChild) : e;
              },
              m = function (e) {
                var t = e.parent;
                if (!t) {
                  if (e === a) return;
                  throw new Error("unknown error");
                }
                if (t.color !== o.default.TreeNodeColorType.black && t.color === o.default.TreeNodeColorType.red) {
                  var r = t.brother,
                    n = t.parent;
                  if (!n) throw new Error("unknown error");
                  if (r && r.color === o.default.TreeNodeColorType.red) r.color = t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red, m(n);else if (!r || r.color === o.default.TreeNodeColorType.black) if (t === n.leftChild) {
                    if (e === t.leftChild) {
                      t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red;
                      var i = n.rotateRight();
                      n === a && (a = i);
                    } else if (e === t.rightChild) {
                      i = t.rotateLeft();
                      n === a && (a = i), m(t);
                    }
                  } else if (t === n.rightChild) if (e === t.leftChild) {
                    i = t.rotateRight();
                    n === a && (a = i), m(t);
                  } else if (e === t.rightChild) {
                    t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red;
                    i = n.rotateLeft();
                    n === a && (a = i);
                  }
                }
              };
            this.setElement = function (e, r) {
              if (null === e || void 0 === e) throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
              if (null !== r && void 0 !== r) {
                if (this.empty()) return ++s, a.key = e, a.value = r, void (a.color = o.default.TreeNodeColorType.black);
                var n = b(a, e);
                void 0 === n.key || 0 !== t(n.key, e) ? (++s, n.key = e, n.value = r, m(n), a.color = o.default.TreeNodeColorType.black) : n.value = r;
              } else this.eraseElementByKey(e);
            };
            var v = function (e, r) {
              if (e && void 0 !== e.key) {
                var n = t(r, e.key);
                return n < 0 ? v(e.leftChild, r) : n > 0 ? v(e.rightChild, r) : e;
              }
            };
            this.find = function (e) {
              return !!v(a, e);
            }, this.getElementByKey = function (e) {
              var t = v(a, e);
              if (void 0 === (null === t || void 0 === t ? void 0 : t.key) || void 0 === (null === t || void 0 === t ? void 0 : t.value)) throw new Error("unknown error");
              return t.value;
            }, this.union = function (e) {
              var t = this;
              e.forEach(function (e) {
                var r = e.key,
                  n = e.value;
                return t.setElement(r, n);
              });
            }, this.getHeight = function () {
              if (this.empty()) return 0;
              var e = function (t) {
                return t ? Math.max(e(t.leftChild), e(t.rightChild)) + 1 : 1;
              };
              return e(a);
            };
            var w = function (e) {
              return n(this, function (t) {
                switch (t.label) {
                  case 0:
                    return e && void 0 !== e.key && void 0 !== e.value ? [5, i(w(e.leftChild))] : [2];
                  case 1:
                    return t.sent(), [4, {
                      key: e.key,
                      value: e.value
                    }];
                  case 2:
                    return t.sent(), [5, i(w(e.rightChild))];
                  case 3:
                    return t.sent(), [2];
                }
              });
            };
            this[Symbol.iterator] = function () {
              return w(a);
            }, e.forEach(function (e) {
              var t = e.key,
                n = e.value;
              return r.setElement(t, n);
            }), Object.freeze(this);
          }
          Object.freeze(s), r.default = s;
        }, {
          "../Base/TreeNode": 25
        }],
        31: [function (e, t, r) {

          function n(e, t) {
            void 0 === e && (e = []), t = t || function (e, t) {
              return e > t ? -1 : e < t ? 1 : 0;
            };
            var r = [];
            e.forEach(function (e) {
              return r.push(e);
            });
            var n = r.length,
              i = function (e, t) {
                if (e < 0 || e >= n) throw new Error("unknown error");
                if (t < 0 || t >= n) throw new Error("unknown error");
                var i = r[e];
                r[e] = r[t], r[t] = i;
              },
              o = function (e) {
                if (e < 0 || e >= n) throw new Error("unknown error");
                var o = 2 * e + 1,
                  s = 2 * e + 2;
                o < n && t(r[e], r[o]) > 0 && i(e, o), s < n && t(r[e], r[s]) > 0 && i(e, s);
              };
            !function () {
              for (var e = Math.floor((n - 1) / 2); e >= 0; --e) for (var o = e, s = 2 * o + 1; s < n;) {
                var a = s + 1,
                  l = s;
                if (a < n && t(r[s], r[a]) > 0 && (l = a), t(r[o], r[l]) <= 0) break;
                i(o, l), s = 2 * (o = l) + 1;
              }
            }(), this.size = function () {
              return n;
            }, this.empty = function () {
              return 0 === n;
            }, this.clear = function () {
              n = 0, r.length = 0;
            }, this.push = function (e) {
              if (r.push(e), 1 !== ++n) for (var i = n - 1; i > 0;) {
                var s = Math.floor((i - 1) / 2);
                if (t(r[s], e) <= 0) break;
                o(s), i = s;
              }
            }, this.pop = function () {
              if (!this.empty()) if (1 !== this.size()) {
                var e = r[n - 1];
                --n;
                for (var i = 0; i < this.size();) {
                  var o = 2 * i + 1,
                    s = 2 * i + 2;
                  if (o >= this.size()) break;
                  var a = o;
                  if (s < this.size() && t(r[o], r[s]) > 0 && (a = s), t(r[a], e) >= 0) break;
                  r[i] = r[a], i = a;
                }
                r[i] = e;
              } else --n;
            }, this.top = function () {
              return r[0];
            }, Object.freeze(this);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), Object.freeze(n), r.default = n;
        }, {}],
        32: [function (e, t, r) {

          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var n = e("../LinkList/LinkList");
          function i(e) {
            void 0 === e && (e = []);
            var t = new n.default(e);
            this.size = function () {
              return t.size();
            }, this.empty = function () {
              return t.empty();
            }, this.clear = function () {
              t.clear();
            }, this.push = function (e) {
              t.pushBack(e);
            }, this.pop = function () {
              t.popFront();
            }, this.front = function () {
              return t.front();
            }, Object.freeze(this);
          }
          Object.freeze(i), r.default = i;
        }, {
          "../LinkList/LinkList": 29
        }],
        33: [function (e, t, r) {

          var n = this && this.__generator || function (e, t) {
              var r,
                n,
                i,
                o,
                s = {
                  label: 0,
                  sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1];
                  },
                  trys: [],
                  ops: []
                };
              return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
              }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this;
              }), o;
              function a(o) {
                return function (a) {
                  return function (o) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                      if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                      switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return s.label++, {
                            value: o[1],
                            done: !1
                          };
                        case 5:
                          s.label++, n = o[1], o = [0];
                          continue;
                        case 7:
                          o = s.ops.pop(), s.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            s = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                            s.label = o[1];
                            break;
                          }
                          if (6 === o[0] && s.label < i[1]) {
                            s.label = i[1], i = o;
                            break;
                          }
                          if (i && s.label < i[2]) {
                            s.label = i[2], s.ops.push(o);
                            break;
                          }
                          i[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      o = t.call(e, s);
                    } catch (e) {
                      o = [6, e], n = 0;
                    } finally {
                      r = i = 0;
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                      value: o[0] ? o[1] : void 0,
                      done: !0
                    };
                  }([o, a]);
                };
              }
            },
            i = this && this.__values || function (e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                r = t && e[t],
                n = 0;
              if (r) return r.call(e);
              if (e && "number" == typeof e.length) return {
                next: function () {
                  return e && n >= e.length && (e = void 0), {
                    value: e && e[n++],
                    done: !e
                  };
                }
              };
              throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var o = e("../Base/TreeNode");
          function s(e, t) {
            var r = this;
            void 0 === e && (e = []), t = t || function (e, t) {
              return e < t ? -1 : e > t ? 1 : 0;
            };
            var s = 0,
              a = new o.default();
            a.color = o.default.TreeNodeColorType.black, this.size = function () {
              return s;
            }, this.empty = function () {
              return 0 === s;
            }, this.clear = function () {
              s = 0, a.key = void 0, a.leftChild = a.rightChild = a.brother = a.parent = void 0, a.color = o.default.TreeNodeColorType.black;
            };
            var l = function (e) {
                if (!e || void 0 === e.key) throw new Error("unknown error");
                return e.leftChild ? l(e.leftChild) : e;
              },
              u = function (e) {
                if (!e || void 0 === e.key) throw new Error("unknown error");
                return e.rightChild ? u(e.rightChild) : e;
              };
            this.front = function () {
              if (!this.empty()) return l(a).key;
            }, this.back = function () {
              if (!this.empty()) return u(a).key;
            }, this.forEach = function (e) {
              var t,
                r,
                n = 0;
              try {
                for (var o = i(this), s = o.next(); !s.done; s = o.next()) {
                  e(s.value, n++);
                }
              } catch (e) {
                t = {
                  error: e
                };
              } finally {
                try {
                  s && !s.done && (r = o.return) && r.call(o);
                } finally {
                  if (t) throw t.error;
                }
              }
            }, this.getElementByPos = function (e) {
              var t, r;
              if (e < 0 || e >= this.size()) throw new Error("pos must more than 0 and less than set's size");
              var n = 0;
              try {
                for (var o = i(this), s = o.next(); !s.done; s = o.next()) {
                  var a = s.value;
                  if (n === e) return a;
                  ++n;
                }
              } catch (e) {
                t = {
                  error: e
                };
              } finally {
                try {
                  s && !s.done && (r = o.return) && r.call(o);
                } finally {
                  if (t) throw t.error;
                }
              }
              throw new Error("unknown error");
            };
            var c = function (e) {
                var t = e.parent;
                if (!t) {
                  if (e === a) return;
                  throw new Error("unknown error");
                }
                if (e.color !== o.default.TreeNodeColorType.red) {
                  var r = e.brother;
                  if (!r) throw new Error("unknown error");
                  if (e === t.leftChild) {
                    if (r.color === o.default.TreeNodeColorType.red) {
                      r.color = o.default.TreeNodeColorType.black, t.color = o.default.TreeNodeColorType.red;
                      var n = t.rotateLeft();
                      a === t && (a = n), c(e);
                    } else if (r.color === o.default.TreeNodeColorType.black) if (r.rightChild && r.rightChild.color === o.default.TreeNodeColorType.red) {
                      r.color = t.color, t.color = o.default.TreeNodeColorType.black, r.rightChild && (r.rightChild.color = o.default.TreeNodeColorType.black);
                      n = t.rotateLeft();
                      a === t && (a = n), e.color = o.default.TreeNodeColorType.black;
                    } else if (r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || !r.leftChild || r.leftChild.color !== o.default.TreeNodeColorType.red) r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || (r.color = o.default.TreeNodeColorType.red, c(t));else {
                      r.color = o.default.TreeNodeColorType.red, r.leftChild && (r.leftChild.color = o.default.TreeNodeColorType.black);
                      n = r.rotateRight();
                      a === r && (a = n), c(e);
                    }
                  } else if (e === t.rightChild) if (r.color === o.default.TreeNodeColorType.red) {
                    r.color = o.default.TreeNodeColorType.black, t.color = o.default.TreeNodeColorType.red;
                    n = t.rotateRight();
                    a === t && (a = n), c(e);
                  } else if (r.color === o.default.TreeNodeColorType.black) if (r.leftChild && r.leftChild.color === o.default.TreeNodeColorType.red) {
                    r.color = t.color, t.color = o.default.TreeNodeColorType.black, r.leftChild && (r.leftChild.color = o.default.TreeNodeColorType.black);
                    n = t.rotateRight();
                    a === t && (a = n), e.color = o.default.TreeNodeColorType.black;
                  } else if (r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || !r.rightChild || r.rightChild.color !== o.default.TreeNodeColorType.red) r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || (r.color = o.default.TreeNodeColorType.red, c(t));else {
                    r.color = o.default.TreeNodeColorType.red, r.rightChild && (r.rightChild.color = o.default.TreeNodeColorType.black);
                    n = r.rotateLeft();
                    a === r && (a = n), c(e);
                  }
                } else e.color = o.default.TreeNodeColorType.black;
              },
              h = function (e) {
                for (var t = e; t.leftChild || t.rightChild;) {
                  if (t.rightChild) {
                    t = l(t.rightChild);
                    var r = e.key;
                    e.key = t.key, t.key = r, e = t;
                  }
                  if (t.leftChild) {
                    t = u(t.leftChild);
                    r = e.key;
                    e.key = t.key, t.key = r, e = t;
                  }
                }
                c(t), t && t.remove(), --s, a.color = o.default.TreeNodeColorType.black;
              },
              f = function (e, t) {
                return !(!e || void 0 === e.key) && (!!f(e.leftChild, t) || !!t(e) || f(e.rightChild, t));
              };
            this.eraseElementByPos = function (e) {
              if (e < 0 || e >= s) throw new Error("pos must more than 0 and less than set's size");
              var t = 0;
              f(a, function (r) {
                return e === t ? (h(r), !0) : (++t, !1);
              });
            }, this.eraseElementByValue = function (e) {
              if (!this.empty()) {
                var r = g(a, e);
                void 0 !== r && void 0 !== r.key && 0 === t(r.key, e) && h(r);
              }
            };
            var p = function (e, r) {
                if (!e || void 0 === e.key) throw new Error("unknown error");
                var n = t(r, e.key);
                return n < 0 ? e.leftChild ? p(e.leftChild, r) : (e.leftChild = new o.default(), e.leftChild.parent = e, e.leftChild.brother = e.rightChild, e.rightChild && (e.rightChild.brother = e.leftChild), e.leftChild) : n > 0 ? e.rightChild ? p(e.rightChild, r) : (e.rightChild = new o.default(), e.rightChild.parent = e, e.rightChild.brother = e.leftChild, e.leftChild && (e.leftChild.brother = e.rightChild), e.rightChild) : e;
              },
              d = function (e) {
                var t = e.parent;
                if (!t) {
                  if (e === a) return;
                  throw new Error("unknown error");
                }
                if (t.color !== o.default.TreeNodeColorType.black && t.color === o.default.TreeNodeColorType.red) {
                  var r = t.brother,
                    n = t.parent;
                  if (!n) throw new Error("unknown error");
                  if (r && r.color === o.default.TreeNodeColorType.red) r.color = t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red, d(n);else if (!r || r.color === o.default.TreeNodeColorType.black) if (t === n.leftChild) {
                    if (e === t.leftChild) {
                      t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red;
                      var i = n.rotateRight();
                      n === a && (a = i);
                    } else if (e === t.rightChild) {
                      i = t.rotateLeft();
                      n === a && (a = i), d(t);
                    }
                  } else if (t === n.rightChild) if (e === t.leftChild) {
                    i = t.rotateRight();
                    n === a && (a = i), d(t);
                  } else if (e === t.rightChild) {
                    t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red;
                    i = n.rotateLeft();
                    n === a && (a = i);
                  }
                }
              };
            this.insert = function (e) {
              if (null === e || void 0 === e) throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
              if (this.empty()) return ++s, a.key = e, void (a.color = o.default.TreeNodeColorType.black);
              var r = p(a, e);
              void 0 !== r.key && 0 === t(r.key, e) || (++s, r.key = e, d(r), a.color = o.default.TreeNodeColorType.black);
            };
            var g = function (e, r) {
              if (e && void 0 !== e.key) {
                var n = t(r, e.key);
                return n < 0 ? g(e.leftChild, r) : n > 0 ? g(e.rightChild, r) : e;
              }
            };
            this.find = function (e) {
              var r = g(a, e);
              return void 0 !== r && void 0 !== r.key && 0 === t(r.key, e);
            };
            var y = function (e, r) {
              if (e && void 0 !== e.key) {
                var n = t(e.key, r);
                if (0 === n) return e.key;
                if (n < 0) return y(e.rightChild, r);
                var i = y(e.leftChild, r);
                return void 0 !== i ? i : e.key;
              }
            };
            this.lowerBound = function (e) {
              return y(a, e);
            };
            var b = function (e, r) {
              if (e && void 0 !== e.key) {
                if (t(e.key, r) <= 0) return b(e.rightChild, r);
                var n = b(e.leftChild, r);
                return void 0 !== n ? n : e.key;
              }
            };
            this.upperBound = function (e) {
              return b(a, e);
            };
            var m = function (e, r) {
              if (e && void 0 !== e.key) {
                var n = t(e.key, r);
                if (0 === n) return e.key;
                if (n > 0) return m(e.leftChild, r);
                var i = m(e.rightChild, r);
                return void 0 !== i ? i : e.key;
              }
            };
            this.reverseLowerBound = function (e) {
              return m(a, e);
            };
            var v = function (e, r) {
              if (e && void 0 !== e.key) {
                if (t(e.key, r) >= 0) return v(e.leftChild, r);
                var n = v(e.rightChild, r);
                return void 0 !== n ? n : e.key;
              }
            };
            this.reverseUpperBound = function (e) {
              return v(a, e);
            }, this.union = function (e) {
              var t = this;
              e.forEach(function (e) {
                return t.insert(e);
              });
            }, this.getHeight = function () {
              if (this.empty()) return 0;
              var e = function (t) {
                return t ? Math.max(e(t.leftChild), e(t.rightChild)) + 1 : 1;
              };
              return e(a);
            };
            var w = function (e) {
              return n(this, function (t) {
                switch (t.label) {
                  case 0:
                    return e && void 0 !== e.key ? [5, i(w(e.leftChild))] : [2];
                  case 1:
                    return t.sent(), [4, e.key];
                  case 2:
                    return t.sent(), [5, i(w(e.rightChild))];
                  case 3:
                    return t.sent(), [2];
                }
              });
            };
            this[Symbol.iterator] = function () {
              return w(a);
            }, e.forEach(function (e) {
              return r.insert(e);
            }), Object.freeze(this);
          }
          Object.freeze(s), r.default = s;
        }, {
          "../Base/TreeNode": 25
        }],
        34: [function (e, t, r) {

          function n(e) {
            var t = this;
            void 0 === e && (e = []);
            var r = 0,
              n = [];
            this.size = function () {
              return r;
            }, this.empty = function () {
              return 0 === r;
            }, this.clear = function () {
              r = 0, n.length = 0;
            }, this.push = function (e) {
              n.push(e), ++r;
            }, this.pop = function () {
              n.pop(), r > 0 && --r;
            }, this.top = function () {
              return n[r - 1];
            }, e.forEach(function (e) {
              return t.push(e);
            }), Object.freeze(this);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), Object.freeze(n), r.default = n;
        }, {}],
        35: [function (e, t, r) {

          var n = this && this.__generator || function (e, t) {
              var r,
                n,
                i,
                o,
                s = {
                  label: 0,
                  sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1];
                  },
                  trys: [],
                  ops: []
                };
              return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
              }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this;
              }), o;
              function a(o) {
                return function (a) {
                  return function (o) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                      if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                      switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return s.label++, {
                            value: o[1],
                            done: !1
                          };
                        case 5:
                          s.label++, n = o[1], o = [0];
                          continue;
                        case 7:
                          o = s.ops.pop(), s.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            s = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                            s.label = o[1];
                            break;
                          }
                          if (6 === o[0] && s.label < i[1]) {
                            s.label = i[1], i = o;
                            break;
                          }
                          if (i && s.label < i[2]) {
                            s.label = i[2], s.ops.push(o);
                            break;
                          }
                          i[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      o = t.call(e, s);
                    } catch (e) {
                      o = [6, e], n = 0;
                    } finally {
                      r = i = 0;
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                      value: o[0] ? o[1] : void 0,
                      done: !0
                    };
                  }([o, a]);
                };
              }
            },
            i = this && this.__read || function (e, t) {
              var r = "function" == typeof Symbol && e[Symbol.iterator];
              if (!r) return e;
              var n,
                i,
                o = r.call(e),
                s = [];
              try {
                for (; (void 0 === t || t-- > 0) && !(n = o.next()).done;) s.push(n.value);
              } catch (e) {
                i = {
                  error: e
                };
              } finally {
                try {
                  n && !n.done && (r = o.return) && r.call(o);
                } finally {
                  if (i) throw i.error;
                }
              }
              return s;
            },
            o = this && this.__spreadArray || function (e, t, r) {
              if (r || 2 === arguments.length) for (var n, i = 0, o = t.length; i < o; i++) !n && i in t || (n || (n = Array.prototype.slice.call(t, 0, i)), n[i] = t[i]);
              return e.concat(n || Array.prototype.slice.call(t));
            },
            s = this && this.__values || function (e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                r = t && e[t],
                n = 0;
              if (r) return r.call(e);
              if (e && "number" == typeof e.length) return {
                next: function () {
                  return e && n >= e.length && (e = void 0), {
                    value: e && e[n++],
                    done: !e
                  };
                }
              };
              throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
          function a(e) {
            var t = this;
            void 0 === e && (e = []);
            var r = 0,
              a = [];
            this.size = function () {
              return r;
            }, this.empty = function () {
              return 0 === r;
            }, this.clear = function () {
              r = 0, a.length = 0;
            }, this.front = function () {
              if (!this.empty()) return a[0];
            }, this.back = function () {
              if (!this.empty()) return a[r - 1];
            }, this.forEach = function (e) {
              a.forEach(e);
            }, this.getElementByPos = function (e) {
              if (e < 0 || e >= r) throw new Error("pos must more than 0 and less than vector's size");
              return a[e];
            }, this.eraseElementByPos = function (e) {
              if (e < 0 || e >= r) throw new Error("pos must more than 0 and less than vector's size");
              for (var t = e; t < r - 1; ++t) a[t] = a[t + 1];
              this.popBack();
            }, this.eraseElementByValue = function (e) {
              var t = [];
              this.forEach(function (r) {
                r !== e && t.push(r);
              }), t.forEach(function (e, t) {
                a[t] = e;
              });
              for (var n = t.length; r > n;) this.popBack();
            }, this.pushBack = function (e) {
              a.push(e), ++r;
            }, this.popBack = function () {
              a.pop(), r > 0 && --r;
            }, this.setElementByPos = function (e, t) {
              if (e < 0 || e >= r) throw new Error("pos must more than 0 and less than vector's size");
              a[e] = t;
            }, this.insert = function (e, t, n) {
              if (void 0 === n && (n = 1), e < 0 || e > r) throw new Error("pos must more than 0 and less than or equal to vector's size");
              a.splice.apply(a, o([e, 0], i(new Array(n).fill(t)), !1)), r += n;
            }, this.find = function (e) {
              return a.includes(e);
            }, this.reverse = function () {
              a.reverse();
            }, this.unique = function () {
              var e,
                t = [];
              this.forEach(function (r, n) {
                0 !== n && r === e || (t.push(r), e = r);
              }), t.forEach(function (e, t) {
                a[t] = e;
              });
              for (var n = t.length; r > n;) this.popBack();
            }, this.sort = function (e) {
              a.sort(e);
            }, this[Symbol.iterator] = function () {
              return function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [5, s(a)];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              }();
            }, e.forEach(function (e) {
              return t.pushBack(e);
            }), Object.freeze(this);
          }
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), Object.freeze(a), r.default = a;
        }, {}],
        36: [function (e, t, r) {

          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.HashMap = r.HashSet = r.Map = r.Set = r.PriorityQueue = r.Deque = r.LinkList = r.Queue = r.Stack = r.Vector = void 0;
          var n = e("./Vector/Vector");
          r.Vector = n.default;
          var i = e("./Stack/Stack");
          r.Stack = i.default;
          var o = e("./Queue/Queue");
          r.Queue = o.default;
          var s = e("./LinkList/LinkList");
          r.LinkList = s.default;
          var a = e("./Deque/Deque");
          r.Deque = a.default;
          var l = e("./PriorityQueue/PriorityQueue");
          r.PriorityQueue = l.default;
          var u = e("./Set/Set");
          r.Set = u.default;
          var c = e("./Map/Map");
          r.Map = c.default;
          var h = e("./HashSet/HashSet");
          r.HashSet = h.default;
          var f = e("./HashMap/HashMap");
          r.HashMap = f.default;
        }, {
          "./Deque/Deque": 26,
          "./HashMap/HashMap": 27,
          "./HashSet/HashSet": 28,
          "./LinkList/LinkList": 29,
          "./Map/Map": 30,
          "./PriorityQueue/PriorityQueue": 31,
          "./Queue/Queue": 32,
          "./Set/Set": 33,
          "./Stack/Stack": 34,
          "./Vector/Vector": 35
        }],
        37: [function (e, t, r) {

          const n = e("yallist"),
            i = Symbol("max"),
            o = Symbol("length"),
            s = Symbol("lengthCalculator"),
            a = Symbol("allowStale"),
            l = Symbol("maxAge"),
            u = Symbol("dispose"),
            c = Symbol("noDisposeOnSet"),
            h = Symbol("lruList"),
            f = Symbol("cache"),
            p = Symbol("updateAgeOnGet"),
            d = () => 1;
          const g = (e, t, r) => {
              const n = e[f].get(t);
              if (n) {
                const t = n.value;
                if (y(e, t)) {
                  if (m(e, n), !e[a]) return;
                } else r && (e[p] && (n.value.now = Date.now()), e[h].unshiftNode(n));
                return t.value;
              }
            },
            y = (e, t) => {
              if (!t || !t.maxAge && !e[l]) return !1;
              const r = Date.now() - t.now;
              return t.maxAge ? r > t.maxAge : e[l] && r > e[l];
            },
            b = e => {
              if (e[o] > e[i]) for (let t = e[h].tail; e[o] > e[i] && null !== t;) {
                const r = t.prev;
                m(e, t), t = r;
              }
            },
            m = (e, t) => {
              if (t) {
                const r = t.value;
                e[u] && e[u](r.key, r.value), e[o] -= r.length, e[f].delete(r.key), e[h].removeNode(t);
              }
            };
          class v {
            constructor(e, t, r, n, i) {
              this.key = e, this.value = t, this.length = r, this.now = n, this.maxAge = i || 0;
            }
          }
          const w = (e, t, r, n) => {
            let i = r.value;
            y(e, i) && (m(e, r), e[a] || (i = void 0)), i && t.call(n, i.value, i.key, e);
          };
          t.exports = class {
            constructor(e) {
              if ("number" == typeof e && (e = {
                max: e
              }), e || (e = {}), e.max && ("number" != typeof e.max || e.max < 0)) throw new TypeError("max must be a non-negative number");
              this[i] = e.max || 1 / 0;
              const t = e.length || d;
              if (this[s] = "function" != typeof t ? d : t, this[a] = e.stale || !1, e.maxAge && "number" != typeof e.maxAge) throw new TypeError("maxAge must be a number");
              this[l] = e.maxAge || 0, this[u] = e.dispose, this[c] = e.noDisposeOnSet || !1, this[p] = e.updateAgeOnGet || !1, this.reset();
            }
            set max(e) {
              if ("number" != typeof e || e < 0) throw new TypeError("max must be a non-negative number");
              this[i] = e || 1 / 0, b(this);
            }
            get max() {
              return this[i];
            }
            set allowStale(e) {
              this[a] = !!e;
            }
            get allowStale() {
              return this[a];
            }
            set maxAge(e) {
              if ("number" != typeof e) throw new TypeError("maxAge must be a non-negative number");
              this[l] = e, b(this);
            }
            get maxAge() {
              return this[l];
            }
            set lengthCalculator(e) {
              "function" != typeof e && (e = d), e !== this[s] && (this[s] = e, this[o] = 0, this[h].forEach(e => {
                e.length = this[s](e.value, e.key), this[o] += e.length;
              })), b(this);
            }
            get lengthCalculator() {
              return this[s];
            }
            get length() {
              return this[o];
            }
            get itemCount() {
              return this[h].length;
            }
            rforEach(e, t) {
              t = t || this;
              for (let r = this[h].tail; null !== r;) {
                const n = r.prev;
                w(this, e, r, t), r = n;
              }
            }
            forEach(e, t) {
              t = t || this;
              for (let r = this[h].head; null !== r;) {
                const n = r.next;
                w(this, e, r, t), r = n;
              }
            }
            keys() {
              return this[h].toArray().map(e => e.key);
            }
            values() {
              return this[h].toArray().map(e => e.value);
            }
            reset() {
              this[u] && this[h] && this[h].length && this[h].forEach(e => this[u](e.key, e.value)), this[f] = new Map(), this[h] = new n(), this[o] = 0;
            }
            dump() {
              return this[h].map(e => !y(this, e) && {
                k: e.key,
                v: e.value,
                e: e.now + (e.maxAge || 0)
              }).toArray().filter(e => e);
            }
            dumpLru() {
              return this[h];
            }
            set(e, t, r) {
              if ((r = r || this[l]) && "number" != typeof r) throw new TypeError("maxAge must be a number");
              const n = r ? Date.now() : 0,
                a = this[s](t, e);
              if (this[f].has(e)) {
                if (a > this[i]) return m(this, this[f].get(e)), !1;
                const s = this[f].get(e).value;
                return this[u] && (this[c] || this[u](e, s.value)), s.now = n, s.maxAge = r, s.value = t, this[o] += a - s.length, s.length = a, this.get(e), b(this), !0;
              }
              const p = new v(e, t, a, n, r);
              return p.length > this[i] ? (this[u] && this[u](e, t), !1) : (this[o] += p.length, this[h].unshift(p), this[f].set(e, this[h].head), b(this), !0);
            }
            has(e) {
              if (!this[f].has(e)) return !1;
              const t = this[f].get(e).value;
              return !y(this, t);
            }
            get(e) {
              return g(this, e, !0);
            }
            peek(e) {
              return g(this, e, !1);
            }
            pop() {
              const e = this[h].tail;
              return e ? (m(this, e), e.value) : null;
            }
            del(e) {
              m(this, this[f].get(e));
            }
            load(e) {
              this.reset();
              const t = Date.now();
              for (let r = e.length - 1; r >= 0; r--) {
                const n = e[r],
                  i = n.e || 0;
                if (0 === i) this.set(n.k, n.v);else {
                  const e = i - t;
                  e > 0 && this.set(n.k, n.v, e);
                }
              }
            }
            prune() {
              this[f].forEach((e, t) => g(this, t, !1));
            }
          };
        }, {
          yallist: 83
        }],
        38: [function (e, t, r) {
          (function (e) {
            (function () {
              const r = t.exports;
              r.types = {
                0: "reserved",
                1: "connect",
                2: "connack",
                3: "publish",
                4: "puback",
                5: "pubrec",
                6: "pubrel",
                7: "pubcomp",
                8: "subscribe",
                9: "suback",
                10: "unsubscribe",
                11: "unsuback",
                12: "pingreq",
                13: "pingresp",
                14: "disconnect",
                15: "auth"
              }, r.codes = {};
              for (const e in r.types) {
                const t = r.types[e];
                r.codes[t] = e;
              }
              r.CMD_SHIFT = 4, r.CMD_MASK = 240, r.DUP_MASK = 8, r.QOS_MASK = 3, r.QOS_SHIFT = 1, r.RETAIN_MASK = 1, r.VARBYTEINT_MASK = 127, r.VARBYTEINT_FIN_MASK = 128, r.VARBYTEINT_MAX = 268435455, r.SESSIONPRESENT_MASK = 1, r.SESSIONPRESENT_HEADER = e.from([r.SESSIONPRESENT_MASK]), r.CONNACK_HEADER = e.from([r.codes.connack << r.CMD_SHIFT]), r.USERNAME_MASK = 128, r.PASSWORD_MASK = 64, r.WILL_RETAIN_MASK = 32, r.WILL_QOS_MASK = 24, r.WILL_QOS_SHIFT = 3, r.WILL_FLAG_MASK = 4, r.CLEAN_SESSION_MASK = 2, r.CONNECT_HEADER = e.from([r.codes.connect << r.CMD_SHIFT]), r.properties = {
                sessionExpiryInterval: 17,
                willDelayInterval: 24,
                receiveMaximum: 33,
                maximumPacketSize: 39,
                topicAliasMaximum: 34,
                requestResponseInformation: 25,
                requestProblemInformation: 23,
                userProperties: 38,
                authenticationMethod: 21,
                authenticationData: 22,
                payloadFormatIndicator: 1,
                messageExpiryInterval: 2,
                contentType: 3,
                responseTopic: 8,
                correlationData: 9,
                maximumQoS: 36,
                retainAvailable: 37,
                assignedClientIdentifier: 18,
                reasonString: 31,
                wildcardSubscriptionAvailable: 40,
                subscriptionIdentifiersAvailable: 41,
                sharedSubscriptionAvailable: 42,
                serverKeepAlive: 19,
                responseInformation: 26,
                serverReference: 28,
                topicAlias: 35,
                subscriptionIdentifier: 11
              }, r.propertiesCodes = {};
              for (const e in r.properties) {
                const t = r.properties[e];
                r.propertiesCodes[t] = e;
              }
              function n(t) {
                return [0, 1, 2].map(n => [0, 1].map(i => [0, 1].map(o => {
                  const s = e.alloc(1);
                  return s.writeUInt8(r.codes[t] << r.CMD_SHIFT | (i ? r.DUP_MASK : 0) | n << r.QOS_SHIFT | o, 0, !0), s;
                })));
              }
              r.propertiesTypes = {
                sessionExpiryInterval: "int32",
                willDelayInterval: "int32",
                receiveMaximum: "int16",
                maximumPacketSize: "int32",
                topicAliasMaximum: "int16",
                requestResponseInformation: "byte",
                requestProblemInformation: "byte",
                userProperties: "pair",
                authenticationMethod: "string",
                authenticationData: "binary",
                payloadFormatIndicator: "byte",
                messageExpiryInterval: "int32",
                contentType: "string",
                responseTopic: "string",
                correlationData: "binary",
                maximumQoS: "int8",
                retainAvailable: "byte",
                assignedClientIdentifier: "string",
                reasonString: "string",
                wildcardSubscriptionAvailable: "byte",
                subscriptionIdentifiersAvailable: "byte",
                sharedSubscriptionAvailable: "byte",
                serverKeepAlive: "int16",
                responseInformation: "string",
                serverReference: "string",
                topicAlias: "int16",
                subscriptionIdentifier: "var"
              }, r.PUBLISH_HEADER = n("publish"), r.SUBSCRIBE_HEADER = n("subscribe"), r.SUBSCRIBE_OPTIONS_QOS_MASK = 3, r.SUBSCRIBE_OPTIONS_NL_MASK = 1, r.SUBSCRIBE_OPTIONS_NL_SHIFT = 2, r.SUBSCRIBE_OPTIONS_RAP_MASK = 1, r.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3, r.SUBSCRIBE_OPTIONS_RH_MASK = 3, r.SUBSCRIBE_OPTIONS_RH_SHIFT = 4, r.SUBSCRIBE_OPTIONS_RH = [0, 16, 32], r.SUBSCRIBE_OPTIONS_NL = 4, r.SUBSCRIBE_OPTIONS_RAP = 8, r.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2], r.UNSUBSCRIBE_HEADER = n("unsubscribe"), r.ACKS = {
                unsuback: n("unsuback"),
                puback: n("puback"),
                pubcomp: n("pubcomp"),
                pubrel: n("pubrel"),
                pubrec: n("pubrec")
              }, r.SUBACK_HEADER = e.from([r.codes.suback << r.CMD_SHIFT]), r.VERSION3 = e.from([3]), r.VERSION4 = e.from([4]), r.VERSION5 = e.from([5]), r.VERSION131 = e.from([131]), r.VERSION132 = e.from([132]), r.QOS = [0, 1, 2].map(t => e.from([t])), r.EMPTY = {
                pingreq: e.from([r.codes.pingreq << 4, 0]),
                pingresp: e.from([r.codes.pingresp << 4, 0]),
                disconnect: e.from([r.codes.disconnect << 4, 0])
              };
            }).call(this);
          }).call(this, e("buffer").Buffer);
        }, {
          buffer: 17
        }],
        39: [function (e, t, r) {
          (function (r) {
            (function () {
              const n = e("./writeToStream"),
                i = e("events");
              class o extends i {
                constructor() {
                  super(), this._array = new Array(20), this._i = 0;
                }
                write(e) {
                  return this._array[this._i++] = e, !0;
                }
                concat() {
                  let e = 0;
                  const t = new Array(this._array.length),
                    n = this._array;
                  let i,
                    o = 0;
                  for (i = 0; i < n.length && void 0 !== n[i]; i++) "string" != typeof n[i] ? t[i] = n[i].length : t[i] = r.byteLength(n[i]), e += t[i];
                  const s = r.allocUnsafe(e);
                  for (i = 0; i < n.length && void 0 !== n[i]; i++) "string" != typeof n[i] ? (n[i].copy(s, o), o += t[i]) : (s.write(n[i], o), o += t[i]);
                  return s;
                }
              }
              t.exports = function (e, t) {
                const r = new o();
                return n(e, r, t), r.concat();
              };
            }).call(this);
          }).call(this, e("buffer").Buffer);
        }, {
          "./writeToStream": 44,
          buffer: 17,
          events: 22
        }],
        40: [function (e, t, r) {
          r.parser = e("./parser").parser, r.generate = e("./generate"), r.writeToStream = e("./writeToStream");
        }, {
          "./generate": 39,
          "./parser": 43,
          "./writeToStream": 44
        }],
        41: [function (e, t, r) {
          (function (e) {
            (function () {
              const r = 65536,
                n = {},
                i = e.isBuffer(e.from([1, 2]).subarray(0, 1));
              function o(t) {
                const r = e.allocUnsafe(2);
                return r.writeUInt8(t >> 8, 0), r.writeUInt8(255 & t, 1), r;
              }
              t.exports = {
                cache: n,
                generateCache: function () {
                  for (let e = 0; e < r; e++) n[e] = o(e);
                },
                generateNumber: o,
                genBufVariableByteInt: function (t) {
                  let r = 0,
                    n = 0;
                  const o = e.allocUnsafe(4);
                  do {
                    r = t % 128 | 0, (t = t / 128 | 0) > 0 && (r |= 128), o.writeUInt8(r, n++);
                  } while (t > 0 && n < 4);
                  return t > 0 && (n = 0), i ? o.subarray(0, n) : o.slice(0, n);
                },
                generate4ByteBuffer: function (t) {
                  const r = e.allocUnsafe(4);
                  return r.writeUInt32BE(t, 0), r;
                }
              };
            }).call(this);
          }).call(this, e("buffer").Buffer);
        }, {
          buffer: 17
        }],
        42: [function (e, t, r) {
          t.exports = class {
            constructor() {
              this.cmd = null, this.retain = !1, this.qos = 0, this.dup = !1, this.length = -1, this.topic = null, this.payload = null;
            }
          };
        }, {}],
        43: [function (e, t, r) {
          const n = e("bl"),
            i = e("events"),
            o = e("./packet"),
            s = e("./constants"),
            a = e("debug")("mqtt-packet:parser");
          class l extends i {
            constructor() {
              super(), this.parser = this.constructor.parser;
            }
            static parser(e) {
              return this instanceof l ? (this.settings = e || {}, this._states = ["_parseHeader", "_parseLength", "_parsePayload", "_newPacket"], this._resetState(), this) : new l().parser(e);
            }
            _resetState() {
              a("_resetState: resetting packet, error, _list, and _stateCounter"), this.packet = new o(), this.error = null, this._list = n(), this._stateCounter = 0;
            }
            parse(e) {
              for (this.error && this._resetState(), this._list.append(e), a("parse: current state: %s", this._states[this._stateCounter]); (-1 !== this.packet.length || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error;) this._stateCounter++, a("parse: state complete. _stateCounter is now: %d", this._stateCounter), a("parse: packet.length: %d, buffer list length: %d", this.packet.length, this._list.length), this._stateCounter >= this._states.length && (this._stateCounter = 0);
              return a("parse: exited while loop. packet: %d, buffer list length: %d", this.packet.length, this._list.length), this._list.length;
            }
            _parseHeader() {
              const e = this._list.readUInt8(0);
              return this.packet.cmd = s.types[e >> s.CMD_SHIFT], this.packet.retain = 0 != (e & s.RETAIN_MASK), this.packet.qos = e >> s.QOS_SHIFT & s.QOS_MASK, this.packet.dup = 0 != (e & s.DUP_MASK), a("_parseHeader: packet: %o", this.packet), this._list.consume(1), !0;
            }
            _parseLength() {
              const e = this._parseVarByteNum(!0);
              return e && (this.packet.length = e.value, this._list.consume(e.bytes)), a("_parseLength %d", e.value), !!e;
            }
            _parsePayload() {
              a("_parsePayload: payload %O", this._list);
              let e = !1;
              if (0 === this.packet.length || this._list.length >= this.packet.length) {
                switch (this._pos = 0, this.packet.cmd) {
                  case "connect":
                    this._parseConnect();
                    break;
                  case "connack":
                    this._parseConnack();
                    break;
                  case "publish":
                    this._parsePublish();
                    break;
                  case "puback":
                  case "pubrec":
                  case "pubrel":
                  case "pubcomp":
                    this._parseConfirmation();
                    break;
                  case "subscribe":
                    this._parseSubscribe();
                    break;
                  case "suback":
                    this._parseSuback();
                    break;
                  case "unsubscribe":
                    this._parseUnsubscribe();
                    break;
                  case "unsuback":
                    this._parseUnsuback();
                    break;
                  case "pingreq":
                  case "pingresp":
                    break;
                  case "disconnect":
                    this._parseDisconnect();
                    break;
                  case "auth":
                    this._parseAuth();
                    break;
                  default:
                    this._emitError(new Error("Not supported"));
                }
                e = !0;
              }
              return a("_parsePayload complete result: %s", e), e;
            }
            _parseConnect() {
              let e, t, r, n;
              a("_parseConnect");
              const i = {},
                o = this.packet,
                l = this._parseString();
              if (null === l) return this._emitError(new Error("Cannot parse protocolId"));
              if ("MQTT" !== l && "MQIsdp" !== l) return this._emitError(new Error("Invalid protocolId"));
              if (o.protocolId = l, this._pos >= this._list.length) return this._emitError(new Error("Packet too short"));
              if (o.protocolVersion = this._list.readUInt8(this._pos), o.protocolVersion >= 128 && (o.bridgeMode = !0, o.protocolVersion = o.protocolVersion - 128), 3 !== o.protocolVersion && 4 !== o.protocolVersion && 5 !== o.protocolVersion) return this._emitError(new Error("Invalid protocol version"));
              if (this._pos++, this._pos >= this._list.length) return this._emitError(new Error("Packet too short"));
              if (i.username = this._list.readUInt8(this._pos) & s.USERNAME_MASK, i.password = this._list.readUInt8(this._pos) & s.PASSWORD_MASK, i.will = this._list.readUInt8(this._pos) & s.WILL_FLAG_MASK, i.will && (o.will = {}, o.will.retain = 0 != (this._list.readUInt8(this._pos) & s.WILL_RETAIN_MASK), o.will.qos = (this._list.readUInt8(this._pos) & s.WILL_QOS_MASK) >> s.WILL_QOS_SHIFT), o.clean = 0 != (this._list.readUInt8(this._pos) & s.CLEAN_SESSION_MASK), this._pos++, o.keepalive = this._parseNum(), -1 === o.keepalive) return this._emitError(new Error("Packet too short"));
              if (5 === o.protocolVersion) {
                const e = this._parseProperties();
                Object.getOwnPropertyNames(e).length && (o.properties = e);
              }
              const u = this._parseString();
              if (null === u) return this._emitError(new Error("Packet too short"));
              if (o.clientId = u, a("_parseConnect: packet.clientId: %s", o.clientId), i.will) {
                if (5 === o.protocolVersion) {
                  const e = this._parseProperties();
                  Object.getOwnPropertyNames(e).length && (o.will.properties = e);
                }
                if (null === (e = this._parseString())) return this._emitError(new Error("Cannot parse will topic"));
                if (o.will.topic = e, a("_parseConnect: packet.will.topic: %s", o.will.topic), null === (t = this._parseBuffer())) return this._emitError(new Error("Cannot parse will payload"));
                o.will.payload = t, a("_parseConnect: packet.will.paylaod: %s", o.will.payload);
              }
              if (i.username) {
                if (null === (n = this._parseString())) return this._emitError(new Error("Cannot parse username"));
                o.username = n, a("_parseConnect: packet.username: %s", o.username);
              }
              if (i.password) {
                if (null === (r = this._parseBuffer())) return this._emitError(new Error("Cannot parse password"));
                o.password = r;
              }
              return this.settings = o, a("_parseConnect: complete"), o;
            }
            _parseConnack() {
              a("_parseConnack");
              const e = this.packet;
              if (this._list.length < 1) return null;
              if (e.sessionPresent = !!(this._list.readUInt8(this._pos++) & s.SESSIONPRESENT_MASK), 5 === this.settings.protocolVersion) this._list.length >= 2 ? e.reasonCode = this._list.readUInt8(this._pos++) : e.reasonCode = 0;else {
                if (this._list.length < 2) return null;
                e.returnCode = this._list.readUInt8(this._pos++);
              }
              if (-1 === e.returnCode || -1 === e.reasonCode) return this._emitError(new Error("Cannot parse return code"));
              if (5 === this.settings.protocolVersion) {
                const t = this._parseProperties();
                Object.getOwnPropertyNames(t).length && (e.properties = t);
              }
              a("_parseConnack: complete");
            }
            _parsePublish() {
              a("_parsePublish");
              const e = this.packet;
              if (e.topic = this._parseString(), null === e.topic) return this._emitError(new Error("Cannot parse topic"));
              if (!(e.qos > 0) || this._parseMessageId()) {
                if (5 === this.settings.protocolVersion) {
                  const t = this._parseProperties();
                  Object.getOwnPropertyNames(t).length && (e.properties = t);
                }
                e.payload = this._list.slice(this._pos, e.length), a("_parsePublish: payload from buffer list: %o", e.payload);
              }
            }
            _parseSubscribe() {
              a("_parseSubscribe");
              const e = this.packet;
              let t, r, n, i, o, l, u;
              if (1 !== e.qos) return this._emitError(new Error("Wrong subscribe header"));
              if (e.subscriptions = [], this._parseMessageId()) {
                if (5 === this.settings.protocolVersion) {
                  const t = this._parseProperties();
                  Object.getOwnPropertyNames(t).length && (e.properties = t);
                }
                for (; this._pos < e.length;) {
                  if (null === (t = this._parseString())) return this._emitError(new Error("Cannot parse topic"));
                  if (this._pos >= e.length) return this._emitError(new Error("Malformed Subscribe Payload"));
                  n = (r = this._parseByte()) & s.SUBSCRIBE_OPTIONS_QOS_MASK, l = 0 != (r >> s.SUBSCRIBE_OPTIONS_NL_SHIFT & s.SUBSCRIBE_OPTIONS_NL_MASK), o = 0 != (r >> s.SUBSCRIBE_OPTIONS_RAP_SHIFT & s.SUBSCRIBE_OPTIONS_RAP_MASK), i = r >> s.SUBSCRIBE_OPTIONS_RH_SHIFT & s.SUBSCRIBE_OPTIONS_RH_MASK, u = {
                    topic: t,
                    qos: n
                  }, 5 === this.settings.protocolVersion ? (u.nl = l, u.rap = o, u.rh = i) : this.settings.bridgeMode && (u.rh = 0, u.rap = !0, u.nl = !0), a("_parseSubscribe: push subscription `%s` to subscription", u), e.subscriptions.push(u);
                }
              }
            }
            _parseSuback() {
              a("_parseSuback");
              const e = this.packet;
              if (this.packet.granted = [], this._parseMessageId()) {
                if (5 === this.settings.protocolVersion) {
                  const t = this._parseProperties();
                  Object.getOwnPropertyNames(t).length && (e.properties = t);
                }
                for (; this._pos < this.packet.length;) this.packet.granted.push(this._list.readUInt8(this._pos++));
              }
            }
            _parseUnsubscribe() {
              a("_parseUnsubscribe");
              const e = this.packet;
              if (e.unsubscriptions = [], this._parseMessageId()) {
                if (5 === this.settings.protocolVersion) {
                  const t = this._parseProperties();
                  Object.getOwnPropertyNames(t).length && (e.properties = t);
                }
                for (; this._pos < e.length;) {
                  const t = this._parseString();
                  if (null === t) return this._emitError(new Error("Cannot parse topic"));
                  a("_parseUnsubscribe: push topic `%s` to unsubscriptions", t), e.unsubscriptions.push(t);
                }
              }
            }
            _parseUnsuback() {
              a("_parseUnsuback");
              const e = this.packet;
              if (!this._parseMessageId()) return this._emitError(new Error("Cannot parse messageId"));
              if (5 === this.settings.protocolVersion) {
                const t = this._parseProperties();
                for (Object.getOwnPropertyNames(t).length && (e.properties = t), e.granted = []; this._pos < this.packet.length;) this.packet.granted.push(this._list.readUInt8(this._pos++));
              }
            }
            _parseConfirmation() {
              a("_parseConfirmation: packet.cmd: `%s`", this.packet.cmd);
              const e = this.packet;
              if (this._parseMessageId(), 5 === this.settings.protocolVersion && (e.length > 2 ? (e.reasonCode = this._parseByte(), a("_parseConfirmation: packet.reasonCode `%d`", e.reasonCode)) : e.reasonCode = 0, e.length > 3)) {
                const t = this._parseProperties();
                Object.getOwnPropertyNames(t).length && (e.properties = t);
              }
              return !0;
            }
            _parseDisconnect() {
              const e = this.packet;
              if (a("_parseDisconnect"), 5 === this.settings.protocolVersion) {
                this._list.length > 0 ? e.reasonCode = this._parseByte() : e.reasonCode = 0;
                const t = this._parseProperties();
                Object.getOwnPropertyNames(t).length && (e.properties = t);
              }
              return a("_parseDisconnect result: true"), !0;
            }
            _parseAuth() {
              a("_parseAuth");
              const e = this.packet;
              if (5 !== this.settings.protocolVersion) return this._emitError(new Error("Not supported auth packet for this version MQTT"));
              e.reasonCode = this._parseByte();
              const t = this._parseProperties();
              return Object.getOwnPropertyNames(t).length && (e.properties = t), a("_parseAuth: result: true"), !0;
            }
            _parseMessageId() {
              const e = this.packet;
              return e.messageId = this._parseNum(), null === e.messageId ? (this._emitError(new Error("Cannot parse messageId")), !1) : (a("_parseMessageId: packet.messageId %d", e.messageId), !0);
            }
            _parseString(e) {
              const t = this._parseNum(),
                r = t + this._pos;
              if (-1 === t || r > this._list.length || r > this.packet.length) return null;
              const n = this._list.toString("utf8", this._pos, r);
              return this._pos += t, a("_parseString: result: %s", n), n;
            }
            _parseStringPair() {
              return a("_parseStringPair"), {
                name: this._parseString(),
                value: this._parseString()
              };
            }
            _parseBuffer() {
              const e = this._parseNum(),
                t = e + this._pos;
              if (-1 === e || t > this._list.length || t > this.packet.length) return null;
              const r = this._list.slice(this._pos, t);
              return this._pos += e, a("_parseBuffer: result: %o", r), r;
            }
            _parseNum() {
              if (this._list.length - this._pos < 2) return -1;
              const e = this._list.readUInt16BE(this._pos);
              return this._pos += 2, a("_parseNum: result: %s", e), e;
            }
            _parse4ByteNum() {
              if (this._list.length - this._pos < 4) return -1;
              const e = this._list.readUInt32BE(this._pos);
              return this._pos += 4, a("_parse4ByteNum: result: %s", e), e;
            }
            _parseVarByteNum(e) {
              a("_parseVarByteNum");
              let t,
                r = 0,
                n = 1,
                i = 0,
                o = !1;
              const l = this._pos ? this._pos : 0;
              for (; r < 4 && l + r < this._list.length;) {
                if (i += n * ((t = this._list.readUInt8(l + r++)) & s.VARBYTEINT_MASK), n *= 128, 0 == (t & s.VARBYTEINT_FIN_MASK)) {
                  o = !0;
                  break;
                }
                if (this._list.length <= r) break;
              }
              return !o && 4 === r && this._list.length >= r && this._emitError(new Error("Invalid variable byte integer")), l && (this._pos += r), a("_parseVarByteNum: result: %o", o = !!o && (e ? {
                bytes: r,
                value: i
              } : i)), o;
            }
            _parseByte() {
              let e;
              return this._pos < this._list.length && (e = this._list.readUInt8(this._pos), this._pos++), a("_parseByte: result: %o", e), e;
            }
            _parseByType(e) {
              switch (a("_parseByType: type: %s", e), e) {
                case "byte":
                  return 0 !== this._parseByte();
                case "int8":
                  return this._parseByte();
                case "int16":
                  return this._parseNum();
                case "int32":
                  return this._parse4ByteNum();
                case "var":
                  return this._parseVarByteNum();
                case "string":
                  return this._parseString();
                case "pair":
                  return this._parseStringPair();
                case "binary":
                  return this._parseBuffer();
              }
            }
            _parseProperties() {
              a("_parseProperties");
              const e = this._parseVarByteNum(),
                t = this._pos + e,
                r = {};
              for (; this._pos < t;) {
                const e = this._parseByte();
                if (!e) return this._emitError(new Error("Cannot parse property code type")), !1;
                const t = s.propertiesCodes[e];
                if (!t) return this._emitError(new Error("Unknown property")), !1;
                if ("userProperties" !== t) r[t] ? Array.isArray(r[t]) ? r[t].push(this._parseByType(s.propertiesTypes[t])) : (r[t] = [r[t]], r[t].push(this._parseByType(s.propertiesTypes[t]))) : r[t] = this._parseByType(s.propertiesTypes[t]);else {
                  r[t] || (r[t] = Object.create(null));
                  const e = this._parseByType(s.propertiesTypes[t]);
                  if (r[t][e.name]) {
                    if (Array.isArray(r[t][e.name])) r[t][e.name].push(e.value);else {
                      const n = r[t][e.name];
                      r[t][e.name] = [n], r[t][e.name].push(e.value);
                    }
                  } else r[t][e.name] = e.value;
                }
              }
              return r;
            }
            _newPacket() {
              return a("_newPacket"), this.packet && (this._list.consume(this.packet.length), a("_newPacket: parser emit packet: packet.cmd: %s, packet.payload: %s, packet.length: %d", this.packet.cmd, this.packet.payload, this.packet.length), this.emit("packet", this.packet)), a("_newPacket: new packet"), this.packet = new o(), this._pos = 0, !0;
            }
            _emitError(e) {
              a("_emitError"), this.error = e, this.emit("error", e);
            }
          }
          t.exports = l;
        }, {
          "./constants": 38,
          "./packet": 42,
          bl: 15,
          debug: 18,
          events: 22
        }],
        44: [function (e, t, r) {
          (function (r) {
            (function () {
              const n = e("./constants"),
                i = r.allocUnsafe(0),
                o = r.from([0]),
                s = e("./numbers"),
                a = e("process-nextick-args").nextTick,
                l = e("debug")("mqtt-packet:writeToStream"),
                u = s.cache,
                c = s.generateNumber,
                h = s.generateCache,
                f = s.genBufVariableByteInt,
                p = s.generate4ByteBuffer;
              let d = k,
                g = !0;
              function y(e, t, s) {
                switch (l("generate called"), t.cork && (t.cork(), a(b, t)), g && (g = !1, h()), l("generate: packet.cmd: %s", e.cmd), e.cmd) {
                  case "connect":
                    return function (e, t, i) {
                      const o = e || {},
                        s = o.protocolId || "MQTT";
                      let a = o.protocolVersion || 4;
                      const l = o.will;
                      let u = o.clean;
                      const c = o.keepalive || 0,
                        h = o.clientId || "",
                        f = o.username,
                        p = o.password,
                        g = o.properties;
                      void 0 === u && (u = !0);
                      let y = 0;
                      if (!s || "string" != typeof s && !r.isBuffer(s)) return t.emit("error", new Error("Invalid protocolId")), !1;
                      y += s.length + 2;
                      if (3 !== a && 4 !== a && 5 !== a) return t.emit("error", new Error("Invalid protocol version")), !1;
                      y += 1;
                      if (("string" == typeof h || r.isBuffer(h)) && (h || a >= 4) && (h || u)) y += r.byteLength(h) + 2;else {
                        if (a < 4) return t.emit("error", new Error("clientId must be supplied before 3.1.1")), !1;
                        if (1 * u == 0) return t.emit("error", new Error("clientId must be given if cleanSession set to 0")), !1;
                      }
                      if ("number" != typeof c || c < 0 || c > 65535 || c % 1 != 0) return t.emit("error", new Error("Invalid keepalive")), !1;
                      y += 2;
                      if (y += 1, 5 === a) {
                        var b = C(t, g);
                        if (!b) return !1;
                        y += b.length;
                      }
                      if (l) {
                        if ("object" != typeof l) return t.emit("error", new Error("Invalid will")), !1;
                        if (!l.topic || "string" != typeof l.topic) return t.emit("error", new Error("Invalid will topic")), !1;
                        if (y += r.byteLength(l.topic) + 2, y += 2, l.payload) {
                          if (!(l.payload.length >= 0)) return t.emit("error", new Error("Invalid will payload")), !1;
                          "string" == typeof l.payload ? y += r.byteLength(l.payload) : y += l.payload.length;
                        }
                        var m = {};
                        if (5 === a) {
                          if (!(m = C(t, l.properties))) return !1;
                          y += m.length;
                        }
                      }
                      let _ = !1;
                      if (null != f) {
                        if (!P(f)) return t.emit("error", new Error("Invalid username")), !1;
                        _ = !0, y += r.byteLength(f) + 2;
                      }
                      if (null != p) {
                        if (!_) return t.emit("error", new Error("Username is required to use password")), !1;
                        if (!P(p)) return t.emit("error", new Error("Invalid password")), !1;
                        y += I(p) + 2;
                      }
                      t.write(n.CONNECT_HEADER), v(t, y), E(t, s), o.bridgeMode && (a += 128);
                      t.write(131 === a ? n.VERSION131 : 132 === a ? n.VERSION132 : 4 === a ? n.VERSION4 : 5 === a ? n.VERSION5 : n.VERSION3);
                      let k = 0;
                      k |= null != f ? n.USERNAME_MASK : 0, k |= null != p ? n.PASSWORD_MASK : 0, k |= l && l.retain ? n.WILL_RETAIN_MASK : 0, k |= l && l.qos ? l.qos << n.WILL_QOS_SHIFT : 0, k |= l ? n.WILL_FLAG_MASK : 0, k |= u ? n.CLEAN_SESSION_MASK : 0, t.write(r.from([k])), d(t, c), 5 === a && b.write();
                      E(t, h), l && (5 === a && m.write(), w(t, l.topic), E(t, l.payload));
                      null != f && E(t, f);
                      null != p && E(t, p);
                      return !0;
                    }(e, t);
                  case "connack":
                    return function (e, t, i) {
                      const s = i ? i.protocolVersion : 4,
                        a = e || {},
                        l = 5 === s ? a.reasonCode : a.returnCode,
                        u = a.properties;
                      let c = 2;
                      if ("number" != typeof l) return t.emit("error", new Error("Invalid return code")), !1;
                      let h = null;
                      if (5 === s) {
                        if (!(h = C(t, u))) return !1;
                        c += h.length;
                      }
                      t.write(n.CONNACK_HEADER), v(t, c), t.write(a.sessionPresent ? n.SESSIONPRESENT_HEADER : o), t.write(r.from([l])), null != h && h.write();
                      return !0;
                    }(e, t, s);
                  case "publish":
                    return function (e, t, o) {
                      l("publish: packet: %o", e);
                      const s = o ? o.protocolVersion : 4,
                        a = e || {},
                        u = a.qos || 0,
                        c = a.retain ? n.RETAIN_MASK : 0,
                        h = a.topic,
                        f = a.payload || i,
                        p = a.messageId,
                        g = a.properties;
                      let y = 0;
                      if ("string" == typeof h) y += r.byteLength(h) + 2;else {
                        if (!r.isBuffer(h)) return t.emit("error", new Error("Invalid topic")), !1;
                        y += h.length + 2;
                      }
                      r.isBuffer(f) ? y += f.length : y += r.byteLength(f);
                      if (u && "number" != typeof p) return t.emit("error", new Error("Invalid messageId")), !1;
                      u && (y += 2);
                      let b = null;
                      if (5 === s) {
                        if (!(b = C(t, g))) return !1;
                        y += b.length;
                      }
                      t.write(n.PUBLISH_HEADER[u][a.dup ? 1 : 0][c ? 1 : 0]), v(t, y), d(t, I(h)), t.write(h), u > 0 && d(t, p);
                      null != b && b.write();
                      return l("publish: payload: %o", f), t.write(f);
                    }(e, t, s);
                  case "puback":
                  case "pubrec":
                  case "pubrel":
                  case "pubcomp":
                    return function (e, t, i) {
                      const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.cmd || "puback",
                        l = s.messageId,
                        u = s.dup && "pubrel" === a ? n.DUP_MASK : 0;
                      let c = 0;
                      const h = s.reasonCode,
                        f = s.properties;
                      let p = 5 === o ? 3 : 2;
                      "pubrel" === a && (c = 1);
                      if ("number" != typeof l) return t.emit("error", new Error("Invalid messageId")), !1;
                      let g = null;
                      if (5 === o && "object" == typeof f) {
                        if (!(g = T(t, f, i, p))) return !1;
                        p += g.length;
                      }
                      t.write(n.ACKS[a][c][u][0]), v(t, p), d(t, l), 5 === o && t.write(r.from([h]));
                      null !== g && g.write();
                      return !0;
                    }(e, t, s);
                  case "subscribe":
                    return function (e, t, i) {
                      l("subscribe: packet: ");
                      const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.dup ? n.DUP_MASK : 0,
                        u = s.messageId,
                        c = s.subscriptions,
                        h = s.properties;
                      let f = 0;
                      if ("number" != typeof u) return t.emit("error", new Error("Invalid messageId")), !1;
                      f += 2;
                      let p = null;
                      if (5 === o) {
                        if (!(p = C(t, h))) return !1;
                        f += p.length;
                      }
                      if ("object" != typeof c || !c.length) return t.emit("error", new Error("Invalid subscriptions")), !1;
                      for (let e = 0; e < c.length; e += 1) {
                        const n = c[e].topic,
                          i = c[e].qos;
                        if ("string" != typeof n) return t.emit("error", new Error("Invalid subscriptions - invalid topic")), !1;
                        if ("number" != typeof i) return t.emit("error", new Error("Invalid subscriptions - invalid qos")), !1;
                        if (5 === o) {
                          const r = c[e].nl || !1;
                          if ("boolean" != typeof r) return t.emit("error", new Error("Invalid subscriptions - invalid No Local")), !1;
                          const n = c[e].rap || !1;
                          if ("boolean" != typeof n) return t.emit("error", new Error("Invalid subscriptions - invalid Retain as Published")), !1;
                          const i = c[e].rh || 0;
                          if ("number" != typeof i || i > 2) return t.emit("error", new Error("Invalid subscriptions - invalid Retain Handling")), !1;
                        }
                        f += r.byteLength(n) + 2 + 1;
                      }
                      l("subscribe: writing to stream: %o", n.SUBSCRIBE_HEADER), t.write(n.SUBSCRIBE_HEADER[1][a ? 1 : 0][0]), v(t, f), d(t, u), null !== p && p.write();
                      let g = !0;
                      for (const e of c) {
                        const i = e.topic,
                          s = e.qos,
                          a = +e.nl,
                          l = +e.rap,
                          u = e.rh;
                        let c;
                        w(t, i), c = n.SUBSCRIBE_OPTIONS_QOS[s], 5 === o && (c |= a ? n.SUBSCRIBE_OPTIONS_NL : 0, c |= l ? n.SUBSCRIBE_OPTIONS_RAP : 0, c |= u ? n.SUBSCRIBE_OPTIONS_RH[u] : 0), g = t.write(r.from([c]));
                      }
                      return g;
                    }(e, t, s);
                  case "suback":
                    return function (e, t, i) {
                      const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.messageId,
                        l = s.granted,
                        u = s.properties;
                      let c = 0;
                      if ("number" != typeof a) return t.emit("error", new Error("Invalid messageId")), !1;
                      c += 2;
                      if ("object" != typeof l || !l.length) return t.emit("error", new Error("Invalid qos vector")), !1;
                      for (let e = 0; e < l.length; e += 1) {
                        if ("number" != typeof l[e]) return t.emit("error", new Error("Invalid qos vector")), !1;
                        c += 1;
                      }
                      let h = null;
                      if (5 === o) {
                        if (!(h = T(t, u, i, c))) return !1;
                        c += h.length;
                      }
                      t.write(n.SUBACK_HEADER), v(t, c), d(t, a), null !== h && h.write();
                      return t.write(r.from(l));
                    }(e, t, s);
                  case "unsubscribe":
                    return function (e, t, i) {
                      const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.messageId,
                        l = s.dup ? n.DUP_MASK : 0,
                        u = s.unsubscriptions,
                        c = s.properties;
                      let h = 0;
                      if ("number" != typeof a) return t.emit("error", new Error("Invalid messageId")), !1;
                      h += 2;
                      if ("object" != typeof u || !u.length) return t.emit("error", new Error("Invalid unsubscriptions")), !1;
                      for (let e = 0; e < u.length; e += 1) {
                        if ("string" != typeof u[e]) return t.emit("error", new Error("Invalid unsubscriptions")), !1;
                        h += r.byteLength(u[e]) + 2;
                      }
                      let f = null;
                      if (5 === o) {
                        if (!(f = C(t, c))) return !1;
                        h += f.length;
                      }
                      t.write(n.UNSUBSCRIBE_HEADER[1][l ? 1 : 0][0]), v(t, h), d(t, a), null !== f && f.write();
                      let p = !0;
                      for (let e = 0; e < u.length; e++) p = w(t, u[e]);
                      return p;
                    }(e, t, s);
                  case "unsuback":
                    return function (e, t, i) {
                      const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.messageId,
                        l = s.dup ? n.DUP_MASK : 0,
                        u = s.granted,
                        c = s.properties,
                        h = s.cmd;
                      let f = 2;
                      if ("number" != typeof a) return t.emit("error", new Error("Invalid messageId")), !1;
                      if (5 === o) {
                        if ("object" != typeof u || !u.length) return t.emit("error", new Error("Invalid qos vector")), !1;
                        for (let e = 0; e < u.length; e += 1) {
                          if ("number" != typeof u[e]) return t.emit("error", new Error("Invalid qos vector")), !1;
                          f += 1;
                        }
                      }
                      let p = null;
                      if (5 === o) {
                        if (!(p = T(t, c, i, f))) return !1;
                        f += p.length;
                      }
                      t.write(n.ACKS[h][0][l][0]), v(t, f), d(t, a), null !== p && p.write();
                      5 === o && t.write(r.from(u));
                      return !0;
                    }(e, t, s);
                  case "pingreq":
                  case "pingresp":
                    return function (e, t, r) {
                      return t.write(n.EMPTY[e.cmd]);
                    }(e, t);
                  case "disconnect":
                    return function (e, t, i) {
                      const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.reasonCode,
                        l = s.properties;
                      let u = 5 === o ? 1 : 0,
                        c = null;
                      if (5 === o) {
                        if (!(c = T(t, l, i, u))) return !1;
                        u += c.length;
                      }
                      t.write(r.from([n.codes.disconnect << 4])), v(t, u), 5 === o && t.write(r.from([a]));
                      null !== c && c.write();
                      return !0;
                    }(e, t, s);
                  case "auth":
                    return function (e, t, i) {
                      const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.reasonCode,
                        l = s.properties;
                      let u = 5 === o ? 1 : 0;
                      5 !== o && t.emit("error", new Error("Invalid mqtt version for auth packet"));
                      const c = T(t, l, i, u);
                      if (!c) return !1;
                      u += c.length, t.write(r.from([n.codes.auth << 4])), v(t, u), t.write(r.from([a])), null !== c && c.write();
                      return !0;
                    }(e, t, s);
                  default:
                    return t.emit("error", new Error("Unknown command")), !1;
                }
              }
              function b(e) {
                e.uncork();
              }
              Object.defineProperty(y, "cacheNumbers", {
                get: () => d === k,
                set(e) {
                  e ? (u && 0 !== Object.keys(u).length || (g = !0), d = k) : (g = !1, d = S);
                }
              });
              const m = {};
              function v(e, t) {
                if (t > n.VARBYTEINT_MAX) return e.emit("error", new Error(`Invalid variable byte integer: ${t}`)), !1;
                let r = m[t];
                return r || (r = f(t), t < 16384 && (m[t] = r)), l("writeVarByteInt: writing to stream: %o", r), e.write(r);
              }
              function w(e, t) {
                const n = r.byteLength(t);
                return d(e, n), l("writeString: %s", t), e.write(t, "utf8");
              }
              function _(e, t, r) {
                w(e, t), w(e, r);
              }
              function k(e, t) {
                return l("writeNumberCached: number: %d", t), l("writeNumberCached: %o", u[t]), e.write(u[t]);
              }
              function S(e, t) {
                const r = c(t);
                return l("writeNumberGenerated: %o", r), e.write(r);
              }
              function E(e, t) {
                "string" == typeof t ? w(e, t) : t ? (d(e, t.length), e.write(t)) : d(e, 0);
              }
              function C(e, t) {
                if ("object" != typeof t || null != t.length) return {
                  length: 1,
                  write() {
                    A(e, {}, 0);
                  }
                };
                let i = 0;
                function o(t, i) {
                  let o = 0;
                  switch (n.propertiesTypes[t]) {
                    case "byte":
                      if ("boolean" != typeof i) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                      o += 2;
                      break;
                    case "int8":
                      if ("number" != typeof i || i < 0 || i > 255) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                      o += 2;
                      break;
                    case "binary":
                      if (i && null === i) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                      o += 1 + r.byteLength(i) + 2;
                      break;
                    case "int16":
                      if ("number" != typeof i || i < 0 || i > 65535) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                      o += 3;
                      break;
                    case "int32":
                      if ("number" != typeof i || i < 0 || i > 4294967295) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                      o += 5;
                      break;
                    case "var":
                      if ("number" != typeof i || i < 0 || i > 268435455) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                      o += 1 + r.byteLength(f(i));
                      break;
                    case "string":
                      if ("string" != typeof i) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                      o += 3 + r.byteLength(i.toString());
                      break;
                    case "pair":
                      if ("object" != typeof i) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                      o += Object.getOwnPropertyNames(i).reduce((e, t) => {
                        const n = i[t];
                        return Array.isArray(n) ? e += n.reduce((e, n) => e += 3 + r.byteLength(t.toString()) + 2 + r.byteLength(n.toString()), 0) : e += 3 + r.byteLength(t.toString()) + 2 + r.byteLength(i[t].toString()), e;
                      }, 0);
                      break;
                    default:
                      return e.emit("error", new Error(`Invalid property ${t}: ${i}`)), !1;
                  }
                  return o;
                }
                if (t) for (const e in t) {
                  let r = 0,
                    n = 0;
                  const s = t[e];
                  if (Array.isArray(s)) for (let t = 0; t < s.length; t++) {
                    if (!(n = o(e, s[t]))) return !1;
                    r += n;
                  } else {
                    if (!(n = o(e, s))) return !1;
                    r = n;
                  }
                  if (!r) return !1;
                  i += r;
                }
                return {
                  length: r.byteLength(f(i)) + i,
                  write() {
                    A(e, t, i);
                  }
                };
              }
              function T(e, t, r, n) {
                const i = ["reasonString", "userProperties"],
                  o = r && r.properties && r.properties.maximumPacketSize ? r.properties.maximumPacketSize : 0;
                let s = C(e, t);
                if (o) for (; n + s.length > o;) {
                  const r = i.shift();
                  if (!r || !t[r]) return !1;
                  delete t[r], s = C(e, t);
                }
                return s;
              }
              function x(e, t, i) {
                switch (n.propertiesTypes[t]) {
                  case "byte":
                    e.write(r.from([n.properties[t]])), e.write(r.from([+i]));
                    break;
                  case "int8":
                    e.write(r.from([n.properties[t]])), e.write(r.from([i]));
                    break;
                  case "binary":
                    e.write(r.from([n.properties[t]])), E(e, i);
                    break;
                  case "int16":
                    e.write(r.from([n.properties[t]])), d(e, i);
                    break;
                  case "int32":
                    e.write(r.from([n.properties[t]])), function (e, t) {
                      const r = p(t);
                      l("write4ByteNumber: %o", r), e.write(r);
                    }(e, i);
                    break;
                  case "var":
                    e.write(r.from([n.properties[t]])), v(e, i);
                    break;
                  case "string":
                    e.write(r.from([n.properties[t]])), w(e, i);
                    break;
                  case "pair":
                    Object.getOwnPropertyNames(i).forEach(o => {
                      const s = i[o];
                      Array.isArray(s) ? s.forEach(i => {
                        e.write(r.from([n.properties[t]])), _(e, o.toString(), i.toString());
                      }) : (e.write(r.from([n.properties[t]])), _(e, o.toString(), s.toString()));
                    });
                    break;
                  default:
                    return e.emit("error", new Error(`Invalid property ${t} value: ${i}`)), !1;
                }
              }
              function A(e, t, r) {
                v(e, r);
                for (const r in t) if (Object.prototype.hasOwnProperty.call(t, r) && null !== t[r]) {
                  const n = t[r];
                  if (Array.isArray(n)) for (let t = 0; t < n.length; t++) x(e, r, n[t]);else x(e, r, n);
                }
              }
              function I(e) {
                return e ? e instanceof r ? e.length : r.byteLength(e) : 0;
              }
              function P(e) {
                return "string" == typeof e || e instanceof r;
              }
              t.exports = y;
            }).call(this);
          }).call(this, e("buffer").Buffer);
        }, {
          "./constants": 38,
          "./numbers": 41,
          buffer: 17,
          debug: 18,
          "process-nextick-args": 49
        }],
        45: [function (e, t, r) {
          var n = 1e3,
            i = 60 * n,
            o = 60 * i,
            s = 24 * o,
            a = 7 * s,
            l = 365.25 * s;
          function u(e, t, r, n) {
            var i = t >= 1.5 * r;
            return Math.round(e / r) + " " + n + (i ? "s" : "");
          }
          t.exports = function (e, t) {
            t = t || {};
            var r = typeof e;
            if ("string" === r && e.length > 0) return function (e) {
              if ((e = String(e)).length > 100) return;
              var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
              if (!t) return;
              var r = parseFloat(t[1]);
              switch ((t[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                  return r * l;
                case "weeks":
                case "week":
                case "w":
                  return r * a;
                case "days":
                case "day":
                case "d":
                  return r * s;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                  return r * o;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                  return r * i;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                  return r * n;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                  return r;
                default:
                  return;
              }
            }(e);
            if ("number" === r && isFinite(e)) return t.long ? function (e) {
              var t = Math.abs(e);
              if (t >= s) return u(e, t, s, "day");
              if (t >= o) return u(e, t, o, "hour");
              if (t >= i) return u(e, t, i, "minute");
              if (t >= n) return u(e, t, n, "second");
              return e + " ms";
            }(e) : function (e) {
              var t = Math.abs(e);
              if (t >= s) return Math.round(e / s) + "d";
              if (t >= o) return Math.round(e / o) + "h";
              if (t >= i) return Math.round(e / i) + "m";
              if (t >= n) return Math.round(e / n) + "s";
              return e + "ms";
            }(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
          };
        }, {}],
        46: [function (e, t, r) {
          const n = e("./lib/number-allocator.js");
          t.exports.NumberAllocator = n;
        }, {
          "./lib/number-allocator.js": 47
        }],
        47: [function (e, t, r) {

          const n = e("js-sdsl").Set,
            i = e("debug")("number-allocator:trace"),
            o = e("debug")("number-allocator:error");
          function s(e, t) {
            this.low = e, this.high = t;
          }
          function a(e, t) {
            if (!(this instanceof a)) return new a(e, t);
            this.min = e, this.max = t, this.ss = new n([], (e, t) => e.compare(t)), i("Create"), this.clear();
          }
          s.prototype.equals = function (e) {
            return this.low === e.low && this.high === e.high;
          }, s.prototype.compare = function (e) {
            return this.low < e.low && this.high < e.low ? -1 : e.low < this.low && e.high < this.low ? 1 : 0;
          }, a.prototype.firstVacant = function () {
            return 0 === this.ss.size() ? null : this.ss.front().low;
          }, a.prototype.alloc = function () {
            if (0 === this.ss.size()) return i("alloc():empty"), null;
            const e = this.ss.front(),
              t = e.low;
            return t + 1 <= e.high ? ++e.low : this.ss.eraseElementByPos(0), i("alloc():" + t), t;
          }, a.prototype.use = function (e) {
            const t = new s(e, e),
              r = this.ss.lowerBound(t);
            if (r) {
              if (r.equals(t)) return this.ss.eraseElementByValue(r), i("use():" + e), !0;
              if (r.low > e) return !1;
              if (r.low === e) return ++r.low, i("use():" + e), !0;
              if (r.high === e) return --r.high, i("use():" + e), !0;
              const n = r.low;
              return r.low = e + 1, this.ss.insert(new s(n, e - 1)), i("use():" + e), !0;
            }
            return i("use():failed"), !1;
          }, a.prototype.free = function (e) {
            if (e < this.min || e > this.max) return void o("free():" + e + " is out of range");
            const t = new s(e, e),
              r = this.ss.lowerBound(t);
            if (r) {
              if (r.low <= e && e <= r.high) return void o("free():" + e + " has already been vacant");
              if (r === this.ss.front()) e + 1 === r.low ? --r.low : this.ss.insert(t);else {
                const n = this.ss.reverseLowerBound(t);
                n.high + 1 === e ? e + 1 === r.low ? (this.ss.eraseElementByValue(n), r.low = n.low) : n.high = e : e + 1 === r.low ? r.low = e : this.ss.insert(t);
              }
            } else {
              if (r === this.ss.front()) return void this.ss.insert(t);
              const n = this.ss.reverseLowerBound(t);
              n.high + 1 === e ? n.high = e : this.ss.insert(t);
            }
            i("free():" + e);
          }, a.prototype.clear = function () {
            i("clear()"), this.ss.clear(), this.ss.insert(new s(this.min, this.max));
          }, a.prototype.intervalCount = function () {
            return this.ss.size();
          }, a.prototype.dump = function () {
            console.log("length:" + this.ss.size());
            for (const e of this.ss) console.log(e);
          }, t.exports = a;
        }, {
          debug: 18,
          "js-sdsl": 36
        }],
        48: [function (e, t, r) {
          var n = e("wrappy");
          function i(e) {
            var t = function () {
              return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
            };
            return t.called = !1, t;
          }
          function o(e) {
            var t = function () {
                if (t.called) throw new Error(t.onceError);
                return t.called = !0, t.value = e.apply(this, arguments);
              },
              r = e.name || "Function wrapped with `once`";
            return t.onceError = r + " shouldn't be called more than once", t.called = !1, t;
          }
          t.exports = n(i), t.exports.strict = n(o), i.proto = i(function () {
            Object.defineProperty(Function.prototype, "once", {
              value: function () {
                return i(this);
              },
              configurable: !0
            }), Object.defineProperty(Function.prototype, "onceStrict", {
              value: function () {
                return o(this);
              },
              configurable: !0
            });
          });
        }, {
          wrappy: 79
        }],
        49: [function (e, t, r) {
          (function (e) {
            (function () {

              void 0 === e || !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
                nextTick: function (t, r, n, i) {
                  if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
                  var o,
                    s,
                    a = arguments.length;
                  switch (a) {
                    case 0:
                    case 1:
                      return e.nextTick(t);
                    case 2:
                      return e.nextTick(function () {
                        t.call(null, r);
                      });
                    case 3:
                      return e.nextTick(function () {
                        t.call(null, r, n);
                      });
                    case 4:
                      return e.nextTick(function () {
                        t.call(null, r, n, i);
                      });
                    default:
                      for (o = new Array(a - 1), s = 0; s < o.length;) o[s++] = arguments[s];
                      return e.nextTick(function () {
                        t.apply(null, o);
                      });
                  }
                }
              } : t.exports = e;
            }).call(this);
          }).call(this, e("_process"));
        }, {
          _process: 50
        }],
        50: [function (e, t, r) {
          var n,
            i,
            o = t.exports = {};
          function s() {
            throw new Error("setTimeout has not been defined");
          }
          function a() {
            throw new Error("clearTimeout has not been defined");
          }
          function l(e) {
            if (n === setTimeout) return setTimeout(e, 0);
            if ((n === s || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
            try {
              return n(e, 0);
            } catch (t) {
              try {
                return n.call(null, e, 0);
              } catch (t) {
                return n.call(this, e, 0);
              }
            }
          }
          !function () {
            try {
              n = "function" == typeof setTimeout ? setTimeout : s;
            } catch (e) {
              n = s;
            }
            try {
              i = "function" == typeof clearTimeout ? clearTimeout : a;
            } catch (e) {
              i = a;
            }
          }();
          var u,
            c = [],
            h = !1,
            f = -1;
          function p() {
            h && u && (h = !1, u.length ? c = u.concat(c) : f = -1, c.length && d());
          }
          function d() {
            if (!h) {
              var e = l(p);
              h = !0;
              for (var t = c.length; t;) {
                for (u = c, c = []; ++f < t;) u && u[f].run();
                f = -1, t = c.length;
              }
              u = null, h = !1, function (e) {
                if (i === clearTimeout) return clearTimeout(e);
                if ((i === a || !i) && clearTimeout) return i = clearTimeout, clearTimeout(e);
                try {
                  i(e);
                } catch (t) {
                  try {
                    return i.call(null, e);
                  } catch (t) {
                    return i.call(this, e);
                  }
                }
              }(e);
            }
          }
          function g(e, t) {
            this.fun = e, this.array = t;
          }
          function y() {}
          o.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            c.push(new g(e, t)), 1 !== c.length || h || l(d);
          }, g.prototype.run = function () {
            this.fun.apply(null, this.array);
          }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function (e) {
            return [];
          }, o.binding = function (e) {
            throw new Error("process.binding is not supported");
          }, o.cwd = function () {
            return "/";
          }, o.chdir = function (e) {
            throw new Error("process.chdir is not supported");
          }, o.umask = function () {
            return 0;
          };
        }, {}],
        51: [function (e, t, r) {
          (function (e) {
            (function () {
              !function (n) {
                var i = "object" == typeof r && r && !r.nodeType && r,
                  o = "object" == typeof t && t && !t.nodeType && t,
                  s = "object" == typeof e && e;
                s.global !== s && s.window !== s && s.self !== s || (n = s);
                var a,
                  l,
                  u = 2147483647,
                  c = 36,
                  h = 1,
                  f = 26,
                  p = 38,
                  d = 700,
                  g = 72,
                  y = 128,
                  b = "-",
                  m = /^xn--/,
                  v = /[^\x20-\x7E]/,
                  w = /[\x2E\u3002\uFF0E\uFF61]/g,
                  _ = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                  },
                  k = c - h,
                  S = Math.floor,
                  E = String.fromCharCode;
                function C(e) {
                  throw new RangeError(_[e]);
                }
                function T(e, t) {
                  for (var r = e.length, n = []; r--;) n[r] = t(e[r]);
                  return n;
                }
                function x(e, t) {
                  var r = e.split("@"),
                    n = "";
                  return r.length > 1 && (n = r[0] + "@", e = r[1]), n + T((e = e.replace(w, ".")).split("."), t).join(".");
                }
                function A(e) {
                  for (var t, r, n = [], i = 0, o = e.length; i < o;) (t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < o ? 56320 == (64512 & (r = e.charCodeAt(i++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), i--) : n.push(t);
                  return n;
                }
                function I(e) {
                  return T(e, function (e) {
                    var t = "";
                    return e > 65535 && (t += E((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += E(e);
                  }).join("");
                }
                function P(e, t) {
                  return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
                }
                function O(e, t, r) {
                  var n = 0;
                  for (e = r ? S(e / d) : e >> 1, e += S(e / t); e > k * f >> 1; n += c) e = S(e / k);
                  return S(n + (k + 1) * e / (e + p));
                }
                function B(e) {
                  var t,
                    r,
                    n,
                    i,
                    o,
                    s,
                    a,
                    l,
                    p,
                    d,
                    m,
                    v = [],
                    w = e.length,
                    _ = 0,
                    k = y,
                    E = g;
                  for ((r = e.lastIndexOf(b)) < 0 && (r = 0), n = 0; n < r; ++n) e.charCodeAt(n) >= 128 && C("not-basic"), v.push(e.charCodeAt(n));
                  for (i = r > 0 ? r + 1 : 0; i < w;) {
                    for (o = _, s = 1, a = c; i >= w && C("invalid-input"), ((l = (m = e.charCodeAt(i++)) - 48 < 10 ? m - 22 : m - 65 < 26 ? m - 65 : m - 97 < 26 ? m - 97 : c) >= c || l > S((u - _) / s)) && C("overflow"), _ += l * s, !(l < (p = a <= E ? h : a >= E + f ? f : a - E)); a += c) s > S(u / (d = c - p)) && C("overflow"), s *= d;
                    E = O(_ - o, t = v.length + 1, 0 == o), S(_ / t) > u - k && C("overflow"), k += S(_ / t), _ %= t, v.splice(_++, 0, k);
                  }
                  return I(v);
                }
                function R(e) {
                  var t,
                    r,
                    n,
                    i,
                    o,
                    s,
                    a,
                    l,
                    p,
                    d,
                    m,
                    v,
                    w,
                    _,
                    k,
                    T = [];
                  for (v = (e = A(e)).length, t = y, r = 0, o = g, s = 0; s < v; ++s) (m = e[s]) < 128 && T.push(E(m));
                  for (n = i = T.length, i && T.push(b); n < v;) {
                    for (a = u, s = 0; s < v; ++s) (m = e[s]) >= t && m < a && (a = m);
                    for (a - t > S((u - r) / (w = n + 1)) && C("overflow"), r += (a - t) * w, t = a, s = 0; s < v; ++s) if ((m = e[s]) < t && ++r > u && C("overflow"), m == t) {
                      for (l = r, p = c; !(l < (d = p <= o ? h : p >= o + f ? f : p - o)); p += c) k = l - d, _ = c - d, T.push(E(P(d + k % _, 0))), l = S(k / _);
                      T.push(E(P(l, 0))), o = O(r, w, n == i), r = 0, ++n;
                    }
                    ++r, ++t;
                  }
                  return T.join("");
                }
                if (a = {
                  version: "1.4.1",
                  ucs2: {
                    decode: A,
                    encode: I
                  },
                  decode: B,
                  encode: R,
                  toASCII: function (e) {
                    return x(e, function (e) {
                      return v.test(e) ? "xn--" + R(e) : e;
                    });
                  },
                  toUnicode: function (e) {
                    return x(e, function (e) {
                      return m.test(e) ? B(e.slice(4).toLowerCase()) : e;
                    });
                  }
                }, i && o) {
                  if (t.exports == i) o.exports = a;else for (l in a) a.hasOwnProperty(l) && (i[l] = a[l]);
                } else n.punycode = a;
              }(this);
            }).call(this);
          }).call(this, "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}],
        52: [function (e, t, r) {

          function n(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }
          t.exports = function (e, t, r, o) {
            t = t || "&", r = r || "=";
            var s = {};
            if ("string" != typeof e || 0 === e.length) return s;
            var a = /\+/g;
            e = e.split(t);
            var l = 1e3;
            o && "number" == typeof o.maxKeys && (l = o.maxKeys);
            var u = e.length;
            l > 0 && u > l && (u = l);
            for (var c = 0; c < u; ++c) {
              var h,
                f,
                p,
                d,
                g = e[c].replace(a, "%20"),
                y = g.indexOf(r);
              y >= 0 ? (h = g.substr(0, y), f = g.substr(y + 1)) : (h = g, f = ""), p = decodeURIComponent(h), d = decodeURIComponent(f), n(s, p) ? i(s[p]) ? s[p].push(d) : s[p] = [s[p], d] : s[p] = d;
            }
            return s;
          };
          var i = Array.isArray || function (e) {
            return "[object Array]" === Object.prototype.toString.call(e);
          };
        }, {}],
        53: [function (e, t, r) {

          var n = function (e) {
            switch (typeof e) {
              case "string":
                return e;
              case "boolean":
                return e ? "true" : "false";
              case "number":
                return isFinite(e) ? e : "";
              default:
                return "";
            }
          };
          t.exports = function (e, t, r, a) {
            return t = t || "&", r = r || "=", null === e && (e = void 0), "object" == typeof e ? o(s(e), function (s) {
              var a = encodeURIComponent(n(s)) + r;
              return i(e[s]) ? o(e[s], function (e) {
                return a + encodeURIComponent(n(e));
              }).join(t) : a + encodeURIComponent(n(e[s]));
            }).join(t) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(e)) : "";
          };
          var i = Array.isArray || function (e) {
            return "[object Array]" === Object.prototype.toString.call(e);
          };
          function o(e, t) {
            if (e.map) return e.map(t);
            for (var r = [], n = 0; n < e.length; n++) r.push(t(e[n], n));
            return r;
          }
          var s = Object.keys || function (e) {
            var t = [];
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
            return t;
          };
        }, {}],
        54: [function (e, t, r) {

          r.decode = r.parse = e("./decode"), r.encode = r.stringify = e("./encode");
        }, {
          "./decode": 52,
          "./encode": 53
        }],
        55: [function (e, t, r) {

          var n = {};
          function i(e, t, r) {
            r || (r = Error);
            var i = function (e) {
              var r, n;
              function i(r, n, i) {
                return e.call(this, function (e, r, n) {
                  return "string" == typeof t ? t : t(e, r, n);
                }(r, n, i)) || this;
              }
              return n = e, (r = i).prototype = Object.create(n.prototype), r.prototype.constructor = r, r.__proto__ = n, i;
            }(r);
            i.prototype.name = r.name, i.prototype.code = e, n[e] = i;
          }
          function o(e, t) {
            if (Array.isArray(e)) {
              var r = e.length;
              return e = e.map(function (e) {
                return String(e);
              }), r > 2 ? "one of ".concat(t, " ").concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1] : 2 === r ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0]);
            }
            return "of ".concat(t, " ").concat(String(e));
          }
          i("ERR_INVALID_OPT_VALUE", function (e, t) {
            return 'The value "' + t + '" is invalid for option "' + e + '"';
          }, TypeError), i("ERR_INVALID_ARG_TYPE", function (e, t, r) {
            var n, i, a;
            if ("string" == typeof t && (i = "not ", t.substr(0 , i.length) === i) ? (n = "must not be", t = t.replace(/^not /, "")) : n = "must be", function (e, t, r) {
              return (void 0 === r || r > e.length) && (r = e.length), e.substring(r - t.length, r) === t;
            }(e, " argument")) a = "The ".concat(e, " ").concat(n, " ").concat(o(t, "type"));else {
              var l = function (e, t, r) {
                return "number" != typeof r && (r = 0), !(r + t.length > e.length) && -1 !== e.indexOf(t, r);
              }(e, ".") ? "property" : "argument";
              a = 'The "'.concat(e, '" ').concat(l, " ").concat(n, " ").concat(o(t, "type"));
            }
            return a += ". Received type ".concat(typeof r);
          }, TypeError), i("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), i("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
            return "The " + e + " method is not implemented";
          }), i("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), i("ERR_STREAM_DESTROYED", function (e) {
            return "Cannot call " + e + " after a stream was destroyed";
          }), i("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), i("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), i("ERR_STREAM_WRITE_AFTER_END", "write after end"), i("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), i("ERR_UNKNOWN_ENCODING", function (e) {
            return "Unknown encoding: " + e;
          }, TypeError), i("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = n;
        }, {}],
        56: [function (e, t, r) {
          (function (r) {
            (function () {

              var n = Object.keys || function (e) {
                var t = [];
                for (var r in e) t.push(r);
                return t;
              };
              t.exports = u;
              var i = e("./_stream_readable"),
                o = e("./_stream_writable");
              e("inherits")(u, i);
              for (var s = n(o.prototype), a = 0; a < s.length; a++) {
                var l = s[a];
                u.prototype[l] || (u.prototype[l] = o.prototype[l]);
              }
              function u(e) {
                if (!(this instanceof u)) return new u(e);
                i.call(this, e), o.call(this, e), this.allowHalfOpen = !0, e && (!1 === e.readable && (this.readable = !1), !1 === e.writable && (this.writable = !1), !1 === e.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", c)));
              }
              function c() {
                this._writableState.ended || r.nextTick(h, this);
              }
              function h(e) {
                e.end();
              }
              Object.defineProperty(u.prototype, "writableHighWaterMark", {
                enumerable: !1,
                get: function () {
                  return this._writableState.highWaterMark;
                }
              }), Object.defineProperty(u.prototype, "writableBuffer", {
                enumerable: !1,
                get: function () {
                  return this._writableState && this._writableState.getBuffer();
                }
              }), Object.defineProperty(u.prototype, "writableLength", {
                enumerable: !1,
                get: function () {
                  return this._writableState.length;
                }
              }), Object.defineProperty(u.prototype, "destroyed", {
                enumerable: !1,
                get: function () {
                  return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
                },
                set: function (e) {
                  void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
                }
              });
            }).call(this);
          }).call(this, e("_process"));
        }, {
          "./_stream_readable": 58,
          "./_stream_writable": 60,
          _process: 50,
          inherits: 24
        }],
        57: [function (e, t, r) {

          t.exports = i;
          var n = e("./_stream_transform");
          function i(e) {
            if (!(this instanceof i)) return new i(e);
            n.call(this, e);
          }
          e("inherits")(i, n), i.prototype._transform = function (e, t, r) {
            r(null, e);
          };
        }, {
          "./_stream_transform": 59,
          inherits: 24
        }],
        58: [function (e, t, r) {
          (function (r, n) {
            (function () {

              var i;
              t.exports = C, C.ReadableState = E;
              e("events").EventEmitter;
              var o = function (e, t) {
                  return e.listeners(t).length;
                },
                s = e("./internal/streams/stream"),
                a = e("buffer").Buffer,
                l = n.Uint8Array || function () {};
              var u,
                c = e("util");
              u = c && c.debuglog ? c.debuglog("stream") : function () {};
              var h,
                f,
                p,
                d = e("./internal/streams/buffer_list"),
                g = e("./internal/streams/destroy"),
                y = e("./internal/streams/state").getHighWaterMark,
                b = e("../errors").codes,
                m = b.ERR_INVALID_ARG_TYPE,
                v = b.ERR_STREAM_PUSH_AFTER_EOF,
                w = b.ERR_METHOD_NOT_IMPLEMENTED,
                _ = b.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
              e("inherits")(C, s);
              var k = g.errorOrDestroy,
                S = ["error", "close", "destroy", "pause", "resume"];
              function E(t, r, n) {
                i = i || e("./_stream_duplex"), t = t || {}, "boolean" != typeof n && (n = r instanceof i), this.objectMode = !!t.objectMode, n && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.highWaterMark = y(this, t, "readableHighWaterMark", n), this.buffer = new d(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = !1 !== t.emitClose, this.autoDestroy = !!t.autoDestroy, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (h || (h = e("string_decoder/").StringDecoder), this.decoder = new h(t.encoding), this.encoding = t.encoding);
              }
              function C(t) {
                if (i = i || e("./_stream_duplex"), !(this instanceof C)) return new C(t);
                var r = this instanceof i;
                this._readableState = new E(t, this, r), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), s.call(this);
              }
              function T(e, t, r, n, i) {
                u("readableAddChunk", t);
                var o,
                  s = e._readableState;
                if (null === t) s.reading = !1, function (e, t) {
                  if (u("onEofChunk"), t.ended) return;
                  if (t.decoder) {
                    var r = t.decoder.end();
                    r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length);
                  }
                  t.ended = !0, t.sync ? P(e) : (t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, O(e)));
                }(e, s);else if (i || (o = function (e, t) {
                  var r;
                  n = t, a.isBuffer(n) || n instanceof l || "string" == typeof t || void 0 === t || e.objectMode || (r = new m("chunk", ["string", "Buffer", "Uint8Array"], t));
                  var n;
                  return r;
                }(s, t)), o) k(e, o);else if (s.objectMode || t && t.length > 0) {
                  if ("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === a.prototype || (t = function (e) {
                    return a.from(e);
                  }(t)), n) s.endEmitted ? k(e, new _()) : x(e, s, t, !0);else if (s.ended) k(e, new v());else {
                    if (s.destroyed) return !1;
                    s.reading = !1, s.decoder && !r ? (t = s.decoder.write(t), s.objectMode || 0 !== t.length ? x(e, s, t, !1) : B(e, s)) : x(e, s, t, !1);
                  }
                } else n || (s.reading = !1, B(e, s));
                return !s.ended && (s.length < s.highWaterMark || 0 === s.length);
              }
              function x(e, t, r, n) {
                t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0, e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && P(e)), B(e, t);
              }
              Object.defineProperty(C.prototype, "destroyed", {
                enumerable: !1,
                get: function () {
                  return void 0 !== this._readableState && this._readableState.destroyed;
                },
                set: function (e) {
                  this._readableState && (this._readableState.destroyed = e);
                }
              }), C.prototype.destroy = g.destroy, C.prototype._undestroy = g.undestroy, C.prototype._destroy = function (e, t) {
                t(e);
              }, C.prototype.push = function (e, t) {
                var r,
                  n = this._readableState;
                return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = a.from(e, t), t = ""), r = !0), T(this, e, t, !1, r);
              }, C.prototype.unshift = function (e) {
                return T(this, e, null, !0, !1);
              }, C.prototype.isPaused = function () {
                return !1 === this._readableState.flowing;
              }, C.prototype.setEncoding = function (t) {
                h || (h = e("string_decoder/").StringDecoder);
                var r = new h(t);
                this._readableState.decoder = r, this._readableState.encoding = this._readableState.decoder.encoding;
                for (var n = this._readableState.buffer.head, i = ""; null !== n;) i += r.write(n.data), n = n.next;
                return this._readableState.buffer.clear(), "" !== i && this._readableState.buffer.push(i), this._readableState.length = i.length, this;
              };
              var A = 1073741824;
              function I(e, t) {
                return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function (e) {
                  return e >= A ? e = A : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e;
                }(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0));
              }
              function P(e) {
                var t = e._readableState;
                u("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (u("emitReadable", t.flowing), t.emittedReadable = !0, r.nextTick(O, e));
              }
              function O(e) {
                var t = e._readableState;
                u("emitReadable_", t.destroyed, t.length, t.ended), t.destroyed || !t.length && !t.ended || (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, j(e);
              }
              function B(e, t) {
                t.readingMore || (t.readingMore = !0, r.nextTick(R, e, t));
              }
              function R(e, t) {
                for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length);) {
                  var r = t.length;
                  if (u("maybeReadMore read 0"), e.read(0), r === t.length) break;
                }
                t.readingMore = !1;
              }
              function M(e) {
                var t = e._readableState;
                t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume();
              }
              function N(e) {
                u("readable nexttick read 0"), e.read(0);
              }
              function L(e, t) {
                u("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), j(e), t.flowing && !t.reading && e.read(0);
              }
              function j(e) {
                var t = e._readableState;
                for (u("flow", t.flowing); t.flowing && null !== e.read(););
              }
              function U(e, t) {
                return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : r = t.buffer.consume(e, t.decoder), r);
                var r;
              }
              function q(e) {
                var t = e._readableState;
                u("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, r.nextTick(D, t, e));
              }
              function D(e, t) {
                if (u("endReadableNT", e.endEmitted, e.length), !e.endEmitted && 0 === e.length && (e.endEmitted = !0, t.readable = !1, t.emit("end"), e.autoDestroy)) {
                  var r = t._writableState;
                  (!r || r.autoDestroy && r.finished) && t.destroy();
                }
              }
              function z(e, t) {
                for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
                return -1;
              }
              C.prototype.read = function (e) {
                u("read", e), e = parseInt(e, 10);
                var t = this._readableState,
                  r = e;
                if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) return u("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? q(this) : P(this), null;
                if (0 === (e = I(e, t)) && t.ended) return 0 === t.length && q(this), null;
                var n,
                  i = t.needReadable;
                return u("need readable", i), (0 === t.length || t.length - e < t.highWaterMark) && u("length less than watermark", i = !0), t.ended || t.reading ? u("reading or ended", i = !1) : i && (u("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = I(r, t))), null === (n = e > 0 ? U(e, t) : null) ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.awaitDrain = 0), 0 === t.length && (t.ended || (t.needReadable = !0), r !== e && t.ended && q(this)), null !== n && this.emit("data", n), n;
              }, C.prototype._read = function (e) {
                k(this, new w("_read()"));
              }, C.prototype.pipe = function (e, t) {
                var n = this,
                  i = this._readableState;
                switch (i.pipesCount) {
                  case 0:
                    i.pipes = e;
                    break;
                  case 1:
                    i.pipes = [i.pipes, e];
                    break;
                  default:
                    i.pipes.push(e);
                }
                i.pipesCount += 1, u("pipe count=%d opts=%j", i.pipesCount, t);
                var s = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? l : y;
                function a(t, r) {
                  u("onunpipe"), t === n && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0, u("cleanup"), e.removeListener("close", d), e.removeListener("finish", g), e.removeListener("drain", c), e.removeListener("error", p), e.removeListener("unpipe", a), n.removeListener("end", l), n.removeListener("end", y), n.removeListener("data", f), h = !0, !i.awaitDrain || e._writableState && !e._writableState.needDrain || c());
                }
                function l() {
                  u("onend"), e.end();
                }
                i.endEmitted ? r.nextTick(s) : n.once("end", s), e.on("unpipe", a);
                var c = function (e) {
                  return function () {
                    var t = e._readableState;
                    u("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && o(e, "data") && (t.flowing = !0, j(e));
                  };
                }(n);
                e.on("drain", c);
                var h = !1;
                function f(t) {
                  u("ondata");
                  var r = e.write(t);
                  u("dest.write", r), !1 === r && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== z(i.pipes, e)) && !h && (u("false write response, pause", i.awaitDrain), i.awaitDrain++), n.pause());
                }
                function p(t) {
                  u("onerror", t), y(), e.removeListener("error", p), 0 === o(e, "error") && k(e, t);
                }
                function d() {
                  e.removeListener("finish", g), y();
                }
                function g() {
                  u("onfinish"), e.removeListener("close", d), y();
                }
                function y() {
                  u("unpipe"), n.unpipe(e);
                }
                return n.on("data", f), function (e, t, r) {
                  if ("function" == typeof e.prependListener) return e.prependListener(t, r);
                  e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r);
                }(e, "error", p), e.once("close", d), e.once("finish", g), e.emit("pipe", n), i.flowing || (u("pipe resume"), n.resume()), e;
              }, C.prototype.unpipe = function (e) {
                var t = this._readableState,
                  r = {
                    hasUnpiped: !1
                  };
                if (0 === t.pipesCount) return this;
                if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r), this);
                if (!e) {
                  var n = t.pipes,
                    i = t.pipesCount;
                  t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                  for (var o = 0; o < i; o++) n[o].emit("unpipe", this, {
                    hasUnpiped: !1
                  });
                  return this;
                }
                var s = z(t.pipes, e);
                return -1 === s ? this : (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r), this);
              }, C.prototype.on = function (e, t) {
                var n = s.prototype.on.call(this, e, t),
                  i = this._readableState;
                return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0, !1 !== i.flowing && this.resume()) : "readable" === e && (i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, u("on readable", i.length, i.reading), i.length ? P(this) : i.reading || r.nextTick(N, this))), n;
              }, C.prototype.addListener = C.prototype.on, C.prototype.removeListener = function (e, t) {
                var n = s.prototype.removeListener.call(this, e, t);
                return "readable" === e && r.nextTick(M, this), n;
              }, C.prototype.removeAllListeners = function (e) {
                var t = s.prototype.removeAllListeners.apply(this, arguments);
                return "readable" !== e && void 0 !== e || r.nextTick(M, this), t;
              }, C.prototype.resume = function () {
                var e = this._readableState;
                return e.flowing || (u("resume"), e.flowing = !e.readableListening, function (e, t) {
                  t.resumeScheduled || (t.resumeScheduled = !0, r.nextTick(L, e, t));
                }(this, e)), e.paused = !1, this;
              }, C.prototype.pause = function () {
                return u("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (u("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
              }, C.prototype.wrap = function (e) {
                var t = this,
                  r = this._readableState,
                  n = !1;
                for (var i in e.on("end", function () {
                  if (u("wrapped end"), r.decoder && !r.ended) {
                    var e = r.decoder.end();
                    e && e.length && t.push(e);
                  }
                  t.push(null);
                }), e.on("data", function (i) {
                  (u("wrapped data"), r.decoder && (i = r.decoder.write(i)), !r.objectMode || null !== i && void 0 !== i) && (r.objectMode || i && i.length) && (t.push(i) || (n = !0, e.pause()));
                }), e) void 0 === this[i] && "function" == typeof e[i] && (this[i] = function (t) {
                  return function () {
                    return e[t].apply(e, arguments);
                  };
                }(i));
                for (var o = 0; o < S.length; o++) e.on(S[o], this.emit.bind(this, S[o]));
                return this._read = function (t) {
                  u("wrapped _read", t), n && (n = !1, e.resume());
                }, this;
              }, "function" == typeof Symbol && (C.prototype[Symbol.asyncIterator] = function () {
                return void 0 === f && (f = e("./internal/streams/async_iterator")), f(this);
              }), Object.defineProperty(C.prototype, "readableHighWaterMark", {
                enumerable: !1,
                get: function () {
                  return this._readableState.highWaterMark;
                }
              }), Object.defineProperty(C.prototype, "readableBuffer", {
                enumerable: !1,
                get: function () {
                  return this._readableState && this._readableState.buffer;
                }
              }), Object.defineProperty(C.prototype, "readableFlowing", {
                enumerable: !1,
                get: function () {
                  return this._readableState.flowing;
                },
                set: function (e) {
                  this._readableState && (this._readableState.flowing = e);
                }
              }), C._fromList = U, Object.defineProperty(C.prototype, "readableLength", {
                enumerable: !1,
                get: function () {
                  return this._readableState.length;
                }
              }), "function" == typeof Symbol && (C.from = function (t, r) {
                return void 0 === p && (p = e("./internal/streams/from")), p(C, t, r);
              });
            }).call(this);
          }).call(this, e("_process"), "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
          "../errors": 55,
          "./_stream_duplex": 56,
          "./internal/streams/async_iterator": 61,
          "./internal/streams/buffer_list": 62,
          "./internal/streams/destroy": 63,
          "./internal/streams/from": 65,
          "./internal/streams/state": 67,
          "./internal/streams/stream": 68,
          _process: 50,
          buffer: 17,
          events: 22,
          inherits: 24,
          "string_decoder/": 75,
          util: 16
        }],
        59: [function (e, t, r) {

          t.exports = u;
          var n = e("../errors").codes,
            i = n.ERR_METHOD_NOT_IMPLEMENTED,
            o = n.ERR_MULTIPLE_CALLBACK,
            s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
            a = n.ERR_TRANSFORM_WITH_LENGTH_0,
            l = e("./_stream_duplex");
          function u(e) {
            if (!(this instanceof u)) return new u(e);
            l.call(this, e), this._transformState = {
              afterTransform: function (e, t) {
                var r = this._transformState;
                r.transforming = !1;
                var n = r.writecb;
                if (null === n) return this.emit("error", new o());
                r.writechunk = null, r.writecb = null, null != t && this.push(t), n(e);
                var i = this._readableState;
                i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
              }.bind(this),
              needTransform: !1,
              transforming: !1,
              writecb: null,
              writechunk: null,
              writeencoding: null
            }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", c);
          }
          function c() {
            var e = this;
            "function" != typeof this._flush || this._readableState.destroyed ? h(this, null, null) : this._flush(function (t, r) {
              h(e, t, r);
            });
          }
          function h(e, t, r) {
            if (t) return e.emit("error", t);
            if (null != r && e.push(r), e._writableState.length) throw new a();
            if (e._transformState.transforming) throw new s();
            return e.push(null);
          }
          e("inherits")(u, l), u.prototype.push = function (e, t) {
            return this._transformState.needTransform = !1, l.prototype.push.call(this, e, t);
          }, u.prototype._transform = function (e, t, r) {
            r(new i("_transform()"));
          }, u.prototype._write = function (e, t, r) {
            var n = this._transformState;
            if (n.writecb = r, n.writechunk = e, n.writeencoding = t, !n.transforming) {
              var i = this._readableState;
              (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
            }
          }, u.prototype._read = function (e) {
            var t = this._transformState;
            null === t.writechunk || t.transforming ? t.needTransform = !0 : (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform));
          }, u.prototype._destroy = function (e, t) {
            l.prototype._destroy.call(this, e, function (e) {
              t(e);
            });
          };
        }, {
          "../errors": 55,
          "./_stream_duplex": 56,
          inherits: 24
        }],
        60: [function (e, t, r) {
          (function (r, n) {
            (function () {

              function i(e) {
                var t = this;
                this.next = null, this.entry = null, this.finish = function () {
                  !function (e, t, r) {
                    var n = e.entry;
                    e.entry = null;
                    for (; n;) {
                      var i = n.callback;
                      t.pendingcb--, i(r), n = n.next;
                    }
                    t.corkedRequestsFree.next = e;
                  }(t, e);
                };
              }
              var o;
              t.exports = C, C.WritableState = E;
              var s = {
                  deprecate: e("util-deprecate")
                },
                a = e("./internal/streams/stream"),
                l = e("buffer").Buffer,
                u = n.Uint8Array || function () {};
              var c,
                h = e("./internal/streams/destroy"),
                f = e("./internal/streams/state").getHighWaterMark,
                p = e("../errors").codes,
                d = p.ERR_INVALID_ARG_TYPE,
                g = p.ERR_METHOD_NOT_IMPLEMENTED,
                y = p.ERR_MULTIPLE_CALLBACK,
                b = p.ERR_STREAM_CANNOT_PIPE,
                m = p.ERR_STREAM_DESTROYED,
                v = p.ERR_STREAM_NULL_VALUES,
                w = p.ERR_STREAM_WRITE_AFTER_END,
                _ = p.ERR_UNKNOWN_ENCODING,
                k = h.errorOrDestroy;
              function S() {}
              function E(t, n, s) {
                o = o || e("./_stream_duplex"), t = t || {}, "boolean" != typeof s && (s = n instanceof o), this.objectMode = !!t.objectMode, s && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = f(this, t, "writableHighWaterMark", s), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                var a = !1 === t.decodeStrings;
                this.decodeStrings = !a, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
                  !function (e, t) {
                    var n = e._writableState,
                      i = n.sync,
                      o = n.writecb;
                    if ("function" != typeof o) throw new y();
                    if (function (e) {
                      e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0;
                    }(n), t) !function (e, t, n, i, o) {
                      --t.pendingcb, n ? (r.nextTick(o, i), r.nextTick(O, e, t), e._writableState.errorEmitted = !0, k(e, i)) : (o(i), e._writableState.errorEmitted = !0, k(e, i), O(e, t));
                    }(e, n, i, t, o);else {
                      var s = I(n) || e.destroyed;
                      s || n.corked || n.bufferProcessing || !n.bufferedRequest || A(e, n), i ? r.nextTick(x, e, n, s, o) : x(e, n, s, o);
                    }
                  }(n, e);
                }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== t.emitClose, this.autoDestroy = !!t.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new i(this);
              }
              function C(t) {
                var r = this instanceof (o = o || e("./_stream_duplex"));
                if (!r && !c.call(C, this)) return new C(t);
                this._writableState = new E(t, this, r), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), a.call(this);
              }
              function T(e, t, r, n, i, o, s) {
                t.writelen = n, t.writecb = s, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new m("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = !1;
              }
              function x(e, t, r, n) {
                r || function (e, t) {
                  0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"));
                }(e, t), t.pendingcb--, n(), O(e, t);
              }
              function A(e, t) {
                t.bufferProcessing = !0;
                var r = t.bufferedRequest;
                if (e._writev && r && r.next) {
                  var n = t.bufferedRequestCount,
                    o = new Array(n),
                    s = t.corkedRequestsFree;
                  s.entry = r;
                  for (var a = 0, l = !0; r;) o[a] = r, r.isBuf || (l = !1), r = r.next, a += 1;
                  o.allBuffers = l, T(e, t, !0, t.length, o, "", s.finish), t.pendingcb++, t.lastBufferedRequest = null, s.next ? (t.corkedRequestsFree = s.next, s.next = null) : t.corkedRequestsFree = new i(t), t.bufferedRequestCount = 0;
                } else {
                  for (; r;) {
                    var u = r.chunk,
                      c = r.encoding,
                      h = r.callback;
                    if (T(e, t, !1, t.objectMode ? 1 : u.length, u, c, h), r = r.next, t.bufferedRequestCount--, t.writing) break;
                  }
                  null === r && (t.lastBufferedRequest = null);
                }
                t.bufferedRequest = r, t.bufferProcessing = !1;
              }
              function I(e) {
                return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
              }
              function P(e, t) {
                e._final(function (r) {
                  t.pendingcb--, r && k(e, r), t.prefinished = !0, e.emit("prefinish"), O(e, t);
                });
              }
              function O(e, t) {
                var n = I(t);
                if (n && (function (e, t) {
                  t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.pendingcb++, t.finalCalled = !0, r.nextTick(P, e, t)));
                }(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"), t.autoDestroy))) {
                  var i = e._readableState;
                  (!i || i.autoDestroy && i.endEmitted) && e.destroy();
                }
                return n;
              }
              e("inherits")(C, a), E.prototype.getBuffer = function () {
                for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                return t;
              }, function () {
                try {
                  Object.defineProperty(E.prototype, "buffer", {
                    get: s.deprecate(function () {
                      return this.getBuffer();
                    }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                  });
                } catch (e) {}
              }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (c = Function.prototype[Symbol.hasInstance], Object.defineProperty(C, Symbol.hasInstance, {
                value: function (e) {
                  return !!c.call(this, e) || this === C && e && e._writableState instanceof E;
                }
              })) : c = function (e) {
                return e instanceof this;
              }, C.prototype.pipe = function () {
                k(this, new b());
              }, C.prototype.write = function (e, t, n) {
                var i,
                  o = this._writableState,
                  s = !1,
                  a = !o.objectMode && (i = e, l.isBuffer(i) || i instanceof u);
                return a && !l.isBuffer(e) && (e = function (e) {
                  return l.from(e);
                }(e)), "function" == typeof t && (n = t, t = null), a ? t = "buffer" : t || (t = o.defaultEncoding), "function" != typeof n && (n = S), o.ending ? function (e, t) {
                  var n = new w();
                  k(e, n), r.nextTick(t, n);
                }(this, n) : (a || function (e, t, n, i) {
                  var o;
                  return null === n ? o = new v() : "string" == typeof n || t.objectMode || (o = new d("chunk", ["string", "Buffer"], n)), !o || (k(e, o), r.nextTick(i, o), !1);
                }(this, o, e, n)) && (o.pendingcb++, s = function (e, t, r, n, i, o) {
                  if (!r) {
                    var s = function (e, t, r) {
                      e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = l.from(t, r));
                      return t;
                    }(t, n, i);
                    n !== s && (r = !0, i = "buffer", n = s);
                  }
                  var a = t.objectMode ? 1 : n.length;
                  t.length += a;
                  var u = t.length < t.highWaterMark;
                  u || (t.needDrain = !0);
                  if (t.writing || t.corked) {
                    var c = t.lastBufferedRequest;
                    t.lastBufferedRequest = {
                      chunk: n,
                      encoding: i,
                      isBuf: r,
                      callback: o,
                      next: null
                    }, c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1;
                  } else T(e, t, !1, a, n, i, o);
                  return u;
                }(this, o, a, e, t, n)), s;
              }, C.prototype.cork = function () {
                this._writableState.corked++;
              }, C.prototype.uncork = function () {
                var e = this._writableState;
                e.corked && (e.corked--, e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || A(this, e));
              }, C.prototype.setDefaultEncoding = function (e) {
                if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new _(e);
                return this._writableState.defaultEncoding = e, this;
              }, Object.defineProperty(C.prototype, "writableBuffer", {
                enumerable: !1,
                get: function () {
                  return this._writableState && this._writableState.getBuffer();
                }
              }), Object.defineProperty(C.prototype, "writableHighWaterMark", {
                enumerable: !1,
                get: function () {
                  return this._writableState.highWaterMark;
                }
              }), C.prototype._write = function (e, t, r) {
                r(new g("_write()"));
              }, C.prototype._writev = null, C.prototype.end = function (e, t, n) {
                var i = this._writableState;
                return "function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null !== e && void 0 !== e && this.write(e, t), i.corked && (i.corked = 1, this.uncork()), i.ending || function (e, t, n) {
                  t.ending = !0, O(e, t), n && (t.finished ? r.nextTick(n) : e.once("finish", n));
                  t.ended = !0, e.writable = !1;
                }(this, i, n), this;
              }, Object.defineProperty(C.prototype, "writableLength", {
                enumerable: !1,
                get: function () {
                  return this._writableState.length;
                }
              }), Object.defineProperty(C.prototype, "destroyed", {
                enumerable: !1,
                get: function () {
                  return void 0 !== this._writableState && this._writableState.destroyed;
                },
                set: function (e) {
                  this._writableState && (this._writableState.destroyed = e);
                }
              }), C.prototype.destroy = h.destroy, C.prototype._undestroy = h.undestroy, C.prototype._destroy = function (e, t) {
                t(e);
              };
            }).call(this);
          }).call(this, e("_process"), "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
          "../errors": 55,
          "./_stream_duplex": 56,
          "./internal/streams/destroy": 63,
          "./internal/streams/state": 67,
          "./internal/streams/stream": 68,
          _process: 50,
          buffer: 17,
          inherits: 24,
          "util-deprecate": 78
        }],
        61: [function (e, t, r) {
          (function (r) {
            (function () {

              var n;
              function i(e, t, r) {
                return t in e ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                }) : e[t] = r, e;
              }
              var o = e("./end-of-stream"),
                s = Symbol("lastResolve"),
                a = Symbol("lastReject"),
                l = Symbol("error"),
                u = Symbol("ended"),
                c = Symbol("lastPromise"),
                h = Symbol("handlePromise"),
                f = Symbol("stream");
              function p(e, t) {
                return {
                  value: e,
                  done: t
                };
              }
              function d(e) {
                var t = e[s];
                if (null !== t) {
                  var r = e[f].read();
                  null !== r && (e[c] = null, e[s] = null, e[a] = null, t(p(r, !1)));
                }
              }
              var g = Object.getPrototypeOf(function () {}),
                y = Object.setPrototypeOf((i(n = {
                  get stream() {
                    return this[f];
                  },
                  next: function () {
                    var e = this,
                      t = this[l];
                    if (null !== t) return Promise.reject(t);
                    if (this[u]) return Promise.resolve(p(void 0, !0));
                    if (this[f].destroyed) return new Promise(function (t, n) {
                      r.nextTick(function () {
                        e[l] ? n(e[l]) : t(p(void 0, !0));
                      });
                    });
                    var n,
                      i = this[c];
                    if (i) n = new Promise(function (e, t) {
                      return function (r, n) {
                        e.then(function () {
                          t[u] ? r(p(void 0, !0)) : t[h](r, n);
                        }, n);
                      };
                    }(i, this));else {
                      var o = this[f].read();
                      if (null !== o) return Promise.resolve(p(o, !1));
                      n = new Promise(this[h]);
                    }
                    return this[c] = n, n;
                  }
                }, Symbol.asyncIterator, function () {
                  return this;
                }), i(n, "return", function () {
                  var e = this;
                  return new Promise(function (t, r) {
                    e[f].destroy(null, function (e) {
                      e ? r(e) : t(p(void 0, !0));
                    });
                  });
                }), n), g);
              t.exports = function (e) {
                var t,
                  n = Object.create(y, (i(t = {}, f, {
                    value: e,
                    writable: !0
                  }), i(t, s, {
                    value: null,
                    writable: !0
                  }), i(t, a, {
                    value: null,
                    writable: !0
                  }), i(t, l, {
                    value: null,
                    writable: !0
                  }), i(t, u, {
                    value: e._readableState.endEmitted,
                    writable: !0
                  }), i(t, h, {
                    value: function (e, t) {
                      var r = n[f].read();
                      r ? (n[c] = null, n[s] = null, n[a] = null, e(p(r, !1))) : (n[s] = e, n[a] = t);
                    },
                    writable: !0
                  }), t));
                return n[c] = null, o(e, function (e) {
                  if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                    var t = n[a];
                    return null !== t && (n[c] = null, n[s] = null, n[a] = null, t(e)), void (n[l] = e);
                  }
                  var r = n[s];
                  null !== r && (n[c] = null, n[s] = null, n[a] = null, r(p(void 0, !0))), n[u] = !0;
                }), e.on("readable", function (e) {
                  r.nextTick(d, e);
                }.bind(null, n)), n;
              };
            }).call(this);
          }).call(this, e("_process"));
        }, {
          "./end-of-stream": 64,
          _process: 50
        }],
        62: [function (e, t, r) {

          function n(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var n = Object.getOwnPropertySymbols(e);
              t && (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })), r.push.apply(r, n);
            }
            return r;
          }
          function i(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }) : e[t] = r, e;
          }
          function o(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
            }
          }
          var s = e("buffer").Buffer,
            a = e("util").inspect,
            l = a && a.custom || "inspect";
          t.exports = function () {
            function e() {
              !function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
              }(this, e), this.head = null, this.tail = null, this.length = 0;
            }
            var t, r;
            return t = e, (r = [{
              key: "push",
              value: function (e) {
                var t = {
                  data: e,
                  next: null
                };
                this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
              }
            }, {
              key: "unshift",
              value: function (e) {
                var t = {
                  data: e,
                  next: this.head
                };
                0 === this.length && (this.tail = t), this.head = t, ++this.length;
              }
            }, {
              key: "shift",
              value: function () {
                if (0 !== this.length) {
                  var e = this.head.data;
                  return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
                }
              }
            }, {
              key: "clear",
              value: function () {
                this.head = this.tail = null, this.length = 0;
              }
            }, {
              key: "join",
              value: function (e) {
                if (0 === this.length) return "";
                for (var t = this.head, r = "" + t.data; t = t.next;) r += e + t.data;
                return r;
              }
            }, {
              key: "concat",
              value: function (e) {
                if (0 === this.length) return s.alloc(0);
                for (var t, r, n, i = s.allocUnsafe(e >>> 0), o = this.head, a = 0; o;) t = o.data, r = i, n = a, s.prototype.copy.call(t, r, n), a += o.data.length, o = o.next;
                return i;
              }
            }, {
              key: "consume",
              value: function (e, t) {
                var r;
                return e < this.head.data.length ? (r = this.head.data.slice(0, e), this.head.data = this.head.data.slice(e)) : r = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e), r;
              }
            }, {
              key: "first",
              value: function () {
                return this.head.data;
              }
            }, {
              key: "_getString",
              value: function (e) {
                var t = this.head,
                  r = 1,
                  n = t.data;
                for (e -= n.length; t = t.next;) {
                  var i = t.data,
                    o = e > i.length ? i.length : e;
                  if (o === i.length ? n += i : n += i.slice(0, e), 0 === (e -= o)) {
                    o === i.length ? (++r, t.next ? this.head = t.next : this.head = this.tail = null) : (this.head = t, t.data = i.slice(o));
                    break;
                  }
                  ++r;
                }
                return this.length -= r, n;
              }
            }, {
              key: "_getBuffer",
              value: function (e) {
                var t = s.allocUnsafe(e),
                  r = this.head,
                  n = 1;
                for (r.data.copy(t), e -= r.data.length; r = r.next;) {
                  var i = r.data,
                    o = e > i.length ? i.length : e;
                  if (i.copy(t, t.length - e, 0, o), 0 === (e -= o)) {
                    o === i.length ? (++n, r.next ? this.head = r.next : this.head = this.tail = null) : (this.head = r, r.data = i.slice(o));
                    break;
                  }
                  ++n;
                }
                return this.length -= n, t;
              }
            }, {
              key: l,
              value: function (e, t) {
                return a(this, function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? n(Object(r), !0).forEach(function (t) {
                      i(e, t, r[t]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function (t) {
                      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                    });
                  }
                  return e;
                }({}, t, {
                  depth: 0,
                  customInspect: !1
                }));
              }
            }]) && o(t.prototype, r), e;
          }();
        }, {
          buffer: 17,
          util: 16
        }],
        63: [function (e, t, r) {
          (function (e) {
            (function () {

              function r(e, t) {
                i(e, t), n(e);
              }
              function n(e) {
                e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close");
              }
              function i(e, t) {
                e.emit("error", t);
              }
              t.exports = {
                destroy: function (t, o) {
                  var s = this,
                    a = this._readableState && this._readableState.destroyed,
                    l = this._writableState && this._writableState.destroyed;
                  return a || l ? (o ? o(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, e.nextTick(i, this, t)) : e.nextTick(i, this, t)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function (t) {
                    !o && t ? s._writableState ? s._writableState.errorEmitted ? e.nextTick(n, s) : (s._writableState.errorEmitted = !0, e.nextTick(r, s, t)) : e.nextTick(r, s, t) : o ? (e.nextTick(n, s), o(t)) : e.nextTick(n, s);
                  }), this);
                },
                undestroy: function () {
                  this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
                },
                errorOrDestroy: function (e, t) {
                  var r = e._readableState,
                    n = e._writableState;
                  r && r.autoDestroy || n && n.autoDestroy ? e.destroy(t) : e.emit("error", t);
                }
              };
            }).call(this);
          }).call(this, e("_process"));
        }, {
          _process: 50
        }],
        64: [function (e, t, r) {

          var n = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
          function i() {}
          t.exports = function e(t, r, o) {
            if ("function" == typeof r) return e(t, null, r);
            r || (r = {}), o = function (e) {
              var t = !1;
              return function () {
                if (!t) {
                  t = !0;
                  for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];
                  e.apply(this, n);
                }
              };
            }(o || i);
            var s = r.readable || !1 !== r.readable && t.readable,
              a = r.writable || !1 !== r.writable && t.writable,
              l = function () {
                t.writable || c();
              },
              u = t._writableState && t._writableState.finished,
              c = function () {
                a = !1, u = !0, s || o.call(t);
              },
              h = t._readableState && t._readableState.endEmitted,
              f = function () {
                s = !1, h = !0, a || o.call(t);
              },
              p = function (e) {
                o.call(t, e);
              },
              d = function () {
                var e;
                return s && !h ? (t._readableState && t._readableState.ended || (e = new n()), o.call(t, e)) : a && !u ? (t._writableState && t._writableState.ended || (e = new n()), o.call(t, e)) : void 0;
              },
              g = function () {
                t.req.on("finish", c);
              };
            return function (e) {
              return e.setHeader && "function" == typeof e.abort;
            }(t) ? (t.on("complete", c), t.on("abort", d), t.req ? g() : t.on("request", g)) : a && !t._writableState && (t.on("end", l), t.on("close", l)), t.on("end", f), t.on("finish", c), !1 !== r.error && t.on("error", p), t.on("close", d), function () {
              t.removeListener("complete", c), t.removeListener("abort", d), t.removeListener("request", g), t.req && t.req.removeListener("finish", c), t.removeListener("end", l), t.removeListener("close", l), t.removeListener("finish", c), t.removeListener("end", f), t.removeListener("error", p), t.removeListener("close", d);
            };
          };
        }, {
          "../../../errors": 55
        }],
        65: [function (e, t, r) {
          t.exports = function () {
            throw new Error("Readable.from is not available in the browser");
          };
        }, {}],
        66: [function (e, t, r) {

          var n;
          var i = e("../../../errors").codes,
            o = i.ERR_MISSING_ARGS,
            s = i.ERR_STREAM_DESTROYED;
          function a(e) {
            if (e) throw e;
          }
          function l(e) {
            e();
          }
          function u(e, t) {
            return e.pipe(t);
          }
          t.exports = function () {
            for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
            var c,
              h = function (e) {
                return e.length ? "function" != typeof e[e.length - 1] ? a : e.pop() : a;
              }(r);
            if (Array.isArray(r[0]) && (r = r[0]), r.length < 2) throw new o("streams");
            var f = r.map(function (t, i) {
              var o = i < r.length - 1;
              return function (t, r, i, o) {
                o = function (e) {
                  var t = !1;
                  return function () {
                    t || (t = !0, e.apply(void 0, arguments));
                  };
                }(o);
                var a = !1;
                t.on("close", function () {
                  a = !0;
                }), void 0 === n && (n = e("./end-of-stream")), n(t, {
                  readable: r,
                  writable: i
                }, function (e) {
                  if (e) return o(e);
                  a = !0, o();
                });
                var l = !1;
                return function (e) {
                  if (!a && !l) return l = !0, function (e) {
                    return e.setHeader && "function" == typeof e.abort;
                  }(t) ? t.abort() : "function" == typeof t.destroy ? t.destroy() : void o(e || new s("pipe"));
                };
              }(t, o, i > 0, function (e) {
                c || (c = e), e && f.forEach(l), o || (f.forEach(l), h(c));
              });
            });
            return r.reduce(u);
          };
        }, {
          "../../../errors": 55,
          "./end-of-stream": 64
        }],
        67: [function (e, t, r) {

          var n = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
          t.exports = {
            getHighWaterMark: function (e, t, r, i) {
              var o = function (e, t, r) {
                return null != e.highWaterMark ? e.highWaterMark : t ? e[r] : null;
              }(t, i, r);
              if (null != o) {
                if (!isFinite(o) || Math.floor(o) !== o || o < 0) throw new n(i ? r : "highWaterMark", o);
                return Math.floor(o);
              }
              return e.objectMode ? 16 : 16384;
            }
          };
        }, {
          "../../../errors": 55
        }],
        68: [function (e, t, r) {
          t.exports = e("events").EventEmitter;
        }, {
          events: 22
        }],
        69: [function (e, t, r) {
          (r = t.exports = e("./lib/_stream_readable.js")).Stream = r, r.Readable = r, r.Writable = e("./lib/_stream_writable.js"), r.Duplex = e("./lib/_stream_duplex.js"), r.Transform = e("./lib/_stream_transform.js"), r.PassThrough = e("./lib/_stream_passthrough.js"), r.finished = e("./lib/internal/streams/end-of-stream.js"), r.pipeline = e("./lib/internal/streams/pipeline.js");
        }, {
          "./lib/_stream_duplex.js": 56,
          "./lib/_stream_passthrough.js": 57,
          "./lib/_stream_readable.js": 58,
          "./lib/_stream_transform.js": 59,
          "./lib/_stream_writable.js": 60,
          "./lib/internal/streams/end-of-stream.js": 64,
          "./lib/internal/streams/pipeline.js": 66
        }],
        70: [function (e, t, r) {

          t.exports = function () {
            if ("function" != typeof arguments[0]) throw new Error("callback needed");
            if ("number" != typeof arguments[1]) throw new Error("interval needed");
            var e;
            if (arguments.length > 0) {
              e = new Array(arguments.length - 2);
              for (var t = 0; t < e.length; t++) e[t] = arguments[t + 2];
            }
            return new function (e, t, r) {
              var n = this;
              this._callback = e, this._args = r, this._interval = setInterval(e, t, this._args), this.reschedule = function (e) {
                e || (e = n._interval), n._interval && clearInterval(n._interval), n._interval = setInterval(n._callback, e, n._args);
              }, this.clear = function () {
                n._interval && (clearInterval(n._interval), n._interval = void 0);
              }, this.destroy = function () {
                n._interval && clearInterval(n._interval), n._callback = void 0, n._interval = void 0, n._args = void 0;
              };
            }(arguments[0], arguments[1], e);
          };
        }, {}],
        71: [function (e, t, r) {

          t.exports = e("./index.js")();
        }, {
          "./index.js": 72
        }],
        72: [function (e, t, r) {
          (function (e) {
            (function () {

              function r(t) {
                return t instanceof e ? e.from(t) : new t.constructor(t.buffer.slice(), t.byteOffset, t.length);
              }
              t.exports = function (e) {
                return (e = e || {}).circles ? function (e) {
                  var t = [],
                    n = [];
                  return e.proto ? function e(o) {
                    if ("object" != typeof o || null === o) return o;
                    if (o instanceof Date) return new Date(o);
                    if (Array.isArray(o)) return i(o, e);
                    if (o instanceof Map) return new Map(i(Array.from(o), e));
                    if (o instanceof Set) return new Set(i(Array.from(o), e));
                    var s = {};
                    for (var a in t.push(o), n.push(s), o) {
                      var l = o[a];
                      if ("object" != typeof l || null === l) s[a] = l;else if (l instanceof Date) s[a] = new Date(l);else if (l instanceof Map) s[a] = new Map(i(Array.from(l), e));else if (l instanceof Set) s[a] = new Set(i(Array.from(l), e));else if (ArrayBuffer.isView(l)) s[a] = r(l);else {
                        var u = t.indexOf(l);
                        s[a] = -1 !== u ? n[u] : e(l);
                      }
                    }
                    return t.pop(), n.pop(), s;
                  } : function e(o) {
                    if ("object" != typeof o || null === o) return o;
                    if (o instanceof Date) return new Date(o);
                    if (Array.isArray(o)) return i(o, e);
                    if (o instanceof Map) return new Map(i(Array.from(o), e));
                    if (o instanceof Set) return new Set(i(Array.from(o), e));
                    var s = {};
                    for (var a in t.push(o), n.push(s), o) if (!1 !== Object.hasOwnProperty.call(o, a)) {
                      var l = o[a];
                      if ("object" != typeof l || null === l) s[a] = l;else if (l instanceof Date) s[a] = new Date(l);else if (l instanceof Map) s[a] = new Map(i(Array.from(l), e));else if (l instanceof Set) s[a] = new Set(i(Array.from(l), e));else if (ArrayBuffer.isView(l)) s[a] = r(l);else {
                        var u = t.indexOf(l);
                        s[a] = -1 !== u ? n[u] : e(l);
                      }
                    }
                    return t.pop(), n.pop(), s;
                  };
                  function i(e, i) {
                    for (var o = Object.keys(e), s = new Array(o.length), a = 0; a < o.length; a++) {
                      var l = o[a],
                        u = e[l];
                      if ("object" != typeof u || null === u) s[l] = u;else if (u instanceof Date) s[l] = new Date(u);else if (ArrayBuffer.isView(u)) s[l] = r(u);else {
                        var c = t.indexOf(u);
                        s[l] = -1 !== c ? n[c] : i(u);
                      }
                    }
                    return s;
                  }
                }(e) : e.proto ? function e(n) {
                  if ("object" != typeof n || null === n) return n;
                  if (n instanceof Date) return new Date(n);
                  if (Array.isArray(n)) return t(n, e);
                  if (n instanceof Map) return new Map(t(Array.from(n), e));
                  if (n instanceof Set) return new Set(t(Array.from(n), e));
                  var i = {};
                  for (var o in n) {
                    var s = n[o];
                    "object" != typeof s || null === s ? i[o] = s : s instanceof Date ? i[o] = new Date(s) : s instanceof Map ? i[o] = new Map(t(Array.from(s), e)) : s instanceof Set ? i[o] = new Set(t(Array.from(s), e)) : ArrayBuffer.isView(s) ? i[o] = r(s) : i[o] = e(s);
                  }
                  return i;
                } : function e(n) {
                  if ("object" != typeof n || null === n) return n;
                  if (n instanceof Date) return new Date(n);
                  if (Array.isArray(n)) return t(n, e);
                  if (n instanceof Map) return new Map(t(Array.from(n), e));
                  if (n instanceof Set) return new Set(t(Array.from(n), e));
                  var i = {};
                  for (var o in n) if (!1 !== Object.hasOwnProperty.call(n, o)) {
                    var s = n[o];
                    "object" != typeof s || null === s ? i[o] = s : s instanceof Date ? i[o] = new Date(s) : s instanceof Map ? i[o] = new Map(t(Array.from(s), e)) : s instanceof Set ? i[o] = new Set(t(Array.from(s), e)) : ArrayBuffer.isView(s) ? i[o] = r(s) : i[o] = e(s);
                  }
                  return i;
                };
                function t(e, t) {
                  for (var n = Object.keys(e), i = new Array(n.length), o = 0; o < n.length; o++) {
                    var s = n[o],
                      a = e[s];
                    "object" != typeof a || null === a ? i[s] = a : a instanceof Date ? i[s] = new Date(a) : ArrayBuffer.isView(a) ? i[s] = r(a) : i[s] = t(a);
                  }
                  return i;
                }
              };
            }).call(this);
          }).call(this, e("buffer").Buffer);
        }, {
          buffer: 17
        }],
        73: [function (e, t, r) {
          var n = e("buffer"),
            i = n.Buffer;
          function o(e, t) {
            for (var r in e) t[r] = e[r];
          }
          function s(e, t, r) {
            return i(e, t, r);
          }
          i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = n : (o(n, r), r.Buffer = s), s.prototype = Object.create(i.prototype), o(i, s), s.from = function (e, t, r) {
            if ("number" == typeof e) throw new TypeError("Argument must not be a number");
            return i(e, t, r);
          }, s.alloc = function (e, t, r) {
            if ("number" != typeof e) throw new TypeError("Argument must be a number");
            var n = i(e);
            return void 0 !== t ? "string" == typeof r ? n.fill(t, r) : n.fill(t) : n.fill(0), n;
          }, s.allocUnsafe = function (e) {
            if ("number" != typeof e) throw new TypeError("Argument must be a number");
            return i(e);
          }, s.allocUnsafeSlow = function (e) {
            if ("number" != typeof e) throw new TypeError("Argument must be a number");
            return n.SlowBuffer(e);
          };
        }, {
          buffer: 17
        }],
        74: [function (e, t, r) {
          t.exports = function (e) {
            var t = e._readableState;
            return t ? t.objectMode || "number" == typeof e._duplexState ? e.read() : e.read((r = t, r.buffer.length ? r.buffer.head ? r.buffer.head.data.length : r.buffer[0].length : r.length)) : null;
            var r;
          };
        }, {}],
        75: [function (e, t, r) {

          var n = e("safe-buffer").Buffer,
            i = n.isEncoding || function (e) {
              switch ((e = "" + e) && e.toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                case "raw":
                  return !0;
                default:
                  return !1;
              }
            };
          function o(e) {
            var t;
            switch (this.encoding = function (e) {
              var t = function (e) {
                if (!e) return "utf8";
                for (var t;;) switch (e) {
                  case "utf8":
                  case "utf-8":
                    return "utf8";
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return "utf16le";
                  case "latin1":
                  case "binary":
                    return "latin1";
                  case "base64":
                  case "ascii":
                  case "hex":
                    return e;
                  default:
                    if (t) return;
                    e = ("" + e).toLowerCase(), t = !0;
                }
              }(e);
              if ("string" != typeof t && (n.isEncoding === i || !i(e))) throw new Error("Unknown encoding: " + e);
              return t || e;
            }(e), this.encoding) {
              case "utf16le":
                this.text = l, this.end = u, t = 4;
                break;
              case "utf8":
                this.fillLast = a, t = 4;
                break;
              case "base64":
                this.text = c, this.end = h, t = 3;
                break;
              default:
                return this.write = f, void (this.end = p);
            }
            this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(t);
          }
          function s(e) {
            return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2;
          }
          function a(e) {
            var t = this.lastTotal - this.lastNeed,
              r = function (e, t, r) {
                if (128 != (192 & t[0])) return e.lastNeed = 0, "�";
                if (e.lastNeed > 1 && t.length > 1) {
                  if (128 != (192 & t[1])) return e.lastNeed = 1, "�";
                  if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2])) return e.lastNeed = 2, "�";
                }
              }(this, e);
            return void 0 !== r ? r : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length), void (this.lastNeed -= e.length));
          }
          function l(e, t) {
            if ((e.length - t) % 2 == 0) {
              var r = e.toString("utf16le", t);
              if (r) {
                var n = r.charCodeAt(r.length - 1);
                if (n >= 55296 && n <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], r.slice(0, -1);
              }
              return r;
            }
            return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
          }
          function u(e) {
            var t = e && e.length ? this.write(e) : "";
            if (this.lastNeed) {
              var r = this.lastTotal - this.lastNeed;
              return t + this.lastChar.toString("utf16le", 0, r);
            }
            return t;
          }
          function c(e, t) {
            var r = (e.length - t) % 3;
            return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r));
          }
          function h(e) {
            var t = e && e.length ? this.write(e) : "";
            return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
          }
          function f(e) {
            return e.toString(this.encoding);
          }
          function p(e) {
            return e && e.length ? this.write(e) : "";
          }
          r.StringDecoder = o, o.prototype.write = function (e) {
            if (0 === e.length) return "";
            var t, r;
            if (this.lastNeed) {
              if (void 0 === (t = this.fillLast(e))) return "";
              r = this.lastNeed, this.lastNeed = 0;
            } else r = 0;
            return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || "";
          }, o.prototype.end = function (e) {
            var t = e && e.length ? this.write(e) : "";
            return this.lastNeed ? t + "�" : t;
          }, o.prototype.text = function (e, t) {
            var r = function (e, t, r) {
              var n = t.length - 1;
              if (n < r) return 0;
              var i = s(t[n]);
              if (i >= 0) return i > 0 && (e.lastNeed = i - 1), i;
              if (--n < r || -2 === i) return 0;
              if ((i = s(t[n])) >= 0) return i > 0 && (e.lastNeed = i - 2), i;
              if (--n < r || -2 === i) return 0;
              if ((i = s(t[n])) >= 0) return i > 0 && (2 === i ? i = 0 : e.lastNeed = i - 3), i;
              return 0;
            }(this, e, t);
            if (!this.lastNeed) return e.toString("utf8", t);
            this.lastTotal = r;
            var n = e.length - (r - this.lastNeed);
            return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n);
          }, o.prototype.fillLast = function (e) {
            if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
            e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length;
          };
        }, {
          "safe-buffer": 73
        }],
        76: [function (e, t, r) {

          var n = e("punycode"),
            i = e("./util");
          function o() {
            this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
          }
          r.parse = v, r.resolve = function (e, t) {
            return v(e, !1, !0).resolve(t);
          }, r.resolveObject = function (e, t) {
            return e ? v(e, !1, !0).resolveObject(t) : t;
          }, r.format = function (e) {
            i.isString(e) && (e = v(e));
            return e instanceof o ? e.format() : o.prototype.format.call(e);
          }, r.Url = o;
          var s = /^([a-z0-9.+-]+:)/i,
            a = /:[0-9]*$/,
            l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
            u = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
            c = ["'"].concat(u),
            h = ["%", "/", "?", ";", "#"].concat(c),
            f = ["/", "?", "#"],
            p = /^[+a-z0-9A-Z_-]{0,63}$/,
            d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            g = {
              javascript: !0,
              "javascript:": !0
            },
            y = {
              javascript: !0,
              "javascript:": !0
            },
            b = {
              http: !0,
              https: !0,
              ftp: !0,
              gopher: !0,
              file: !0,
              "http:": !0,
              "https:": !0,
              "ftp:": !0,
              "gopher:": !0,
              "file:": !0
            },
            m = e("querystring");
          function v(e, t, r) {
            if (e && i.isObject(e) && e instanceof o) return e;
            var n = new o();
            return n.parse(e, t, r), n;
          }
          o.prototype.parse = function (e, t, r) {
            if (!i.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
            var o = e.indexOf("?"),
              a = -1 !== o && o < e.indexOf("#") ? "?" : "#",
              u = e.split(a);
            u[0] = u[0].replace(/\\/g, "/");
            var v = e = u.join(a);
            if (v = v.trim(), !r && 1 === e.split("#").length) {
              var w = l.exec(v);
              if (w) return this.path = v, this.href = v, this.pathname = w[1], w[2] ? (this.search = w[2], this.query = t ? m.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
            }
            var _ = s.exec(v);
            if (_) {
              var k = (_ = _[0]).toLowerCase();
              this.protocol = k, v = v.substr(_.length);
            }
            if (r || _ || v.match(/^\/\/[^@\/]+@[^@\/]+/)) {
              var S = "//" === v.substr(0, 2);
              !S || _ && y[_] || (v = v.substr(2), this.slashes = !0);
            }
            if (!y[_] && (S || _ && !b[_])) {
              for (var E, C, T = -1, x = 0; x < f.length; x++) {
                -1 !== (A = v.indexOf(f[x])) && (-1 === T || A < T) && (T = A);
              }
              -1 !== (C = -1 === T ? v.lastIndexOf("@") : v.lastIndexOf("@", T)) && (E = v.slice(0, C), v = v.slice(C + 1), this.auth = decodeURIComponent(E)), T = -1;
              for (x = 0; x < h.length; x++) {
                var A;
                -1 !== (A = v.indexOf(h[x])) && (-1 === T || A < T) && (T = A);
              }
              -1 === T && (T = v.length), this.host = v.slice(0, T), v = v.slice(T), this.parseHost(), this.hostname = this.hostname || "";
              var I = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
              if (!I) for (var P = this.hostname.split(/\./), O = (x = 0, P.length); x < O; x++) {
                var B = P[x];
                if (B && !B.match(p)) {
                  for (var R = "", M = 0, N = B.length; M < N; M++) B.charCodeAt(M) > 127 ? R += "x" : R += B[M];
                  if (!R.match(p)) {
                    var L = P.slice(0, x),
                      j = P.slice(x + 1),
                      U = B.match(d);
                    U && (L.push(U[1]), j.unshift(U[2])), j.length && (v = "/" + j.join(".") + v), this.hostname = L.join(".");
                    break;
                  }
                }
              }
              this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), I || (this.hostname = n.toASCII(this.hostname));
              var q = this.port ? ":" + this.port : "",
                D = this.hostname || "";
              this.host = D + q, this.href += this.host, I && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== v[0] && (v = "/" + v));
            }
            if (!g[k]) for (x = 0, O = c.length; x < O; x++) {
              var z = c[x];
              if (-1 !== v.indexOf(z)) {
                var F = encodeURIComponent(z);
                F === z && (F = escape(z)), v = v.split(z).join(F);
              }
            }
            var V = v.indexOf("#");
            -1 !== V && (this.hash = v.substr(V), v = v.slice(0, V));
            var H = v.indexOf("?");
            if (-1 !== H ? (this.search = v.substr(H), this.query = v.substr(H + 1), t && (this.query = m.parse(this.query)), v = v.slice(0, H)) : t && (this.search = "", this.query = {}), v && (this.pathname = v), b[k] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
              q = this.pathname || "";
              var W = this.search || "";
              this.path = q + W;
            }
            return this.href = this.format(), this;
          }, o.prototype.format = function () {
            var e = this.auth || "";
            e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");
            var t = this.protocol || "",
              r = this.pathname || "",
              n = this.hash || "",
              o = !1,
              s = "";
            this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && i.isObject(this.query) && Object.keys(this.query).length && (s = m.stringify(this.query));
            var a = this.search || s && "?" + s || "";
            return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || b[t]) && !1 !== o ? (o = "//" + (o || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : o || (o = ""), n && "#" !== n.charAt(0) && (n = "#" + n), a && "?" !== a.charAt(0) && (a = "?" + a), t + o + (r = r.replace(/[?#]/g, function (e) {
              return encodeURIComponent(e);
            })) + (a = a.replace("#", "%23")) + n;
          }, o.prototype.resolve = function (e) {
            return this.resolveObject(v(e, !1, !0)).format();
          }, o.prototype.resolveObject = function (e) {
            if (i.isString(e)) {
              var t = new o();
              t.parse(e, !1, !0), e = t;
            }
            for (var r = new o(), n = Object.keys(this), s = 0; s < n.length; s++) {
              var a = n[s];
              r[a] = this[a];
            }
            if (r.hash = e.hash, "" === e.href) return r.href = r.format(), r;
            if (e.slashes && !e.protocol) {
              for (var l = Object.keys(e), u = 0; u < l.length; u++) {
                var c = l[u];
                "protocol" !== c && (r[c] = e[c]);
              }
              return b[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
            }
            if (e.protocol && e.protocol !== r.protocol) {
              if (!b[e.protocol]) {
                for (var h = Object.keys(e), f = 0; f < h.length; f++) {
                  var p = h[f];
                  r[p] = e[p];
                }
                return r.href = r.format(), r;
              }
              if (r.protocol = e.protocol, e.host || y[e.protocol]) r.pathname = e.pathname;else {
                for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift()););
                e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), r.pathname = d.join("/");
              }
              if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
                var g = r.pathname || "",
                  m = r.search || "";
                r.path = g + m;
              }
              return r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
            }
            var v = r.pathname && "/" === r.pathname.charAt(0),
              w = e.host || e.pathname && "/" === e.pathname.charAt(0),
              _ = w || v || r.host && e.pathname,
              k = _,
              S = r.pathname && r.pathname.split("/") || [],
              E = (d = e.pathname && e.pathname.split("/") || [], r.protocol && !b[r.protocol]);
            if (E && (r.hostname = "", r.port = null, r.host && ("" === S[0] ? S[0] = r.host : S.unshift(r.host)), r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)), e.host = null), _ = _ && ("" === d[0] || "" === S[0])), w) r.host = e.host || "" === e.host ? e.host : r.host, r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, r.query = e.query, S = d;else if (d.length) S || (S = []), S.pop(), S = S.concat(d), r.search = e.search, r.query = e.query;else if (!i.isNullOrUndefined(e.search)) {
              if (E) r.hostname = r.host = S.shift(), (I = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = I.shift(), r.host = r.hostname = I.shift());
              return r.search = e.search, r.query = e.query, i.isNull(r.pathname) && i.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
            }
            if (!S.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
            for (var C = S.slice(-1)[0], T = (r.host || e.host || S.length > 1) && ("." === C || ".." === C) || "" === C, x = 0, A = S.length; A >= 0; A--) "." === (C = S[A]) ? S.splice(A, 1) : ".." === C ? (S.splice(A, 1), x++) : x && (S.splice(A, 1), x--);
            if (!_ && !k) for (; x--; x) S.unshift("..");
            !_ || "" === S[0] || S[0] && "/" === S[0].charAt(0) || S.unshift(""), T && "/" !== S.join("/").substr(-1) && S.push("");
            var I,
              P = "" === S[0] || S[0] && "/" === S[0].charAt(0);
            E && (r.hostname = r.host = P ? "" : S.length ? S.shift() : "", (I = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = I.shift(), r.host = r.hostname = I.shift()));
            return (_ = _ || r.host && S.length) && !P && S.unshift(""), S.length ? r.pathname = S.join("/") : (r.pathname = null, r.path = null), i.isNull(r.pathname) && i.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
          }, o.prototype.parseHost = function () {
            var e = this.host,
              t = a.exec(e);
            t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
          };
        }, {
          "./util": 77,
          punycode: 51,
          querystring: 54
        }],
        77: [function (e, t, r) {

          t.exports = {
            isString: function (e) {
              return "string" == typeof e;
            },
            isObject: function (e) {
              return "object" == typeof e && null !== e;
            },
            isNull: function (e) {
              return null === e;
            },
            isNullOrUndefined: function (e) {
              return null == e;
            }
          };
        }, {}],
        78: [function (e, t, r) {
          (function (e) {
            (function () {
              function r(t) {
                try {
                  if (!e.localStorage) return !1;
                } catch (e) {
                  return !1;
                }
                var r = e.localStorage[t];
                return null != r && "true" === String(r).toLowerCase();
              }
              t.exports = function (e, t) {
                if (r("noDeprecation")) return e;
                var n = !1;
                return function () {
                  if (!n) {
                    if (r("throwDeprecation")) throw new Error(t);
                    r("traceDeprecation") ? console.trace(t) : console.warn(t), n = !0;
                  }
                  return e.apply(this, arguments);
                };
              };
            }).call(this);
          }).call(this, "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}],
        79: [function (e, t, r) {
          t.exports = function e(t, r) {
            if (t && r) return e(t)(r);
            if ("function" != typeof t) throw new TypeError("need wrapper function");
            Object.keys(t).forEach(function (e) {
              n[e] = t[e];
            });
            return n;
            function n() {
              for (var e = new Array(arguments.length), r = 0; r < e.length; r++) e[r] = arguments[r];
              var n = t.apply(this, e),
                i = e[e.length - 1];
              return "function" == typeof n && n !== i && Object.keys(i).forEach(function (e) {
                n[e] = i[e];
              }), n;
            }
          };
        }, {}],
        80: [function (e, t, r) {

          t.exports = function () {
            throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
          };
        }, {}],
        81: [function (e, t, r) {
          t.exports = function () {
            for (var e = {}, t = 0; t < arguments.length; t++) {
              var r = arguments[t];
              for (var i in r) n.call(r, i) && (e[i] = r[i]);
            }
            return e;
          };
          var n = Object.prototype.hasOwnProperty;
        }, {}],
        82: [function (e, t, r) {

          t.exports = function (e) {
            e.prototype[Symbol.iterator] = function* () {
              for (let e = this.head; e; e = e.next) yield e.value;
            };
          };
        }, {}],
        83: [function (e, t, r) {

          function n(e) {
            var t = this;
            if (t instanceof n || (t = new n()), t.tail = null, t.head = null, t.length = 0, e && "function" == typeof e.forEach) e.forEach(function (e) {
              t.push(e);
            });else if (arguments.length > 0) for (var r = 0, i = arguments.length; r < i; r++) t.push(arguments[r]);
            return t;
          }
          function i(e, t, r) {
            var n = t === e.head ? new a(r, null, t, e) : new a(r, t, t.next, e);
            return null === n.next && (e.tail = n), null === n.prev && (e.head = n), e.length++, n;
          }
          function o(e, t) {
            e.tail = new a(t, e.tail, null, e), e.head || (e.head = e.tail), e.length++;
          }
          function s(e, t) {
            e.head = new a(t, null, e.head, e), e.tail || (e.tail = e.head), e.length++;
          }
          function a(e, t, r, n) {
            if (!(this instanceof a)) return new a(e, t, r, n);
            this.list = n, this.value = e, t ? (t.next = this, this.prev = t) : this.prev = null, r ? (r.prev = this, this.next = r) : this.next = null;
          }
          t.exports = n, n.Node = a, n.create = n, n.prototype.removeNode = function (e) {
            if (e.list !== this) throw new Error("removing node which does not belong to this list");
            var t = e.next,
              r = e.prev;
            return t && (t.prev = r), r && (r.next = t), e === this.head && (this.head = t), e === this.tail && (this.tail = r), e.list.length--, e.next = null, e.prev = null, e.list = null, t;
          }, n.prototype.unshiftNode = function (e) {
            if (e !== this.head) {
              e.list && e.list.removeNode(e);
              var t = this.head;
              e.list = this, e.next = t, t && (t.prev = e), this.head = e, this.tail || (this.tail = e), this.length++;
            }
          }, n.prototype.pushNode = function (e) {
            if (e !== this.tail) {
              e.list && e.list.removeNode(e);
              var t = this.tail;
              e.list = this, e.prev = t, t && (t.next = e), this.tail = e, this.head || (this.head = e), this.length++;
            }
          }, n.prototype.push = function () {
            for (var e = 0, t = arguments.length; e < t; e++) o(this, arguments[e]);
            return this.length;
          }, n.prototype.unshift = function () {
            for (var e = 0, t = arguments.length; e < t; e++) s(this, arguments[e]);
            return this.length;
          }, n.prototype.pop = function () {
            if (this.tail) {
              var e = this.tail.value;
              return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, this.length--, e;
            }
          }, n.prototype.shift = function () {
            if (this.head) {
              var e = this.head.value;
              return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, this.length--, e;
            }
          }, n.prototype.forEach = function (e, t) {
            t = t || this;
            for (var r = this.head, n = 0; null !== r; n++) e.call(t, r.value, n, this), r = r.next;
          }, n.prototype.forEachReverse = function (e, t) {
            t = t || this;
            for (var r = this.tail, n = this.length - 1; null !== r; n--) e.call(t, r.value, n, this), r = r.prev;
          }, n.prototype.get = function (e) {
            for (var t = 0, r = this.head; null !== r && t < e; t++) r = r.next;
            if (t === e && null !== r) return r.value;
          }, n.prototype.getReverse = function (e) {
            for (var t = 0, r = this.tail; null !== r && t < e; t++) r = r.prev;
            if (t === e && null !== r) return r.value;
          }, n.prototype.map = function (e, t) {
            t = t || this;
            for (var r = new n(), i = this.head; null !== i;) r.push(e.call(t, i.value, this)), i = i.next;
            return r;
          }, n.prototype.mapReverse = function (e, t) {
            t = t || this;
            for (var r = new n(), i = this.tail; null !== i;) r.push(e.call(t, i.value, this)), i = i.prev;
            return r;
          }, n.prototype.reduce = function (e, t) {
            var r,
              n = this.head;
            if (arguments.length > 1) r = t;else {
              if (!this.head) throw new TypeError("Reduce of empty list with no initial value");
              n = this.head.next, r = this.head.value;
            }
            for (var i = 0; null !== n; i++) r = e(r, n.value, i), n = n.next;
            return r;
          }, n.prototype.reduceReverse = function (e, t) {
            var r,
              n = this.tail;
            if (arguments.length > 1) r = t;else {
              if (!this.tail) throw new TypeError("Reduce of empty list with no initial value");
              n = this.tail.prev, r = this.tail.value;
            }
            for (var i = this.length - 1; null !== n; i--) r = e(r, n.value, i), n = n.prev;
            return r;
          }, n.prototype.toArray = function () {
            for (var e = new Array(this.length), t = 0, r = this.head; null !== r; t++) e[t] = r.value, r = r.next;
            return e;
          }, n.prototype.toArrayReverse = function () {
            for (var e = new Array(this.length), t = 0, r = this.tail; null !== r; t++) e[t] = r.value, r = r.prev;
            return e;
          }, n.prototype.slice = function (e, t) {
            (t = t || this.length) < 0 && (t += this.length), (e = e || 0) < 0 && (e += this.length);
            var r = new n();
            if (t < e || t < 0) return r;
            e < 0 && (e = 0), t > this.length && (t = this.length);
            for (var i = 0, o = this.head; null !== o && i < e; i++) o = o.next;
            for (; null !== o && i < t; i++, o = o.next) r.push(o.value);
            return r;
          }, n.prototype.sliceReverse = function (e, t) {
            (t = t || this.length) < 0 && (t += this.length), (e = e || 0) < 0 && (e += this.length);
            var r = new n();
            if (t < e || t < 0) return r;
            e < 0 && (e = 0), t > this.length && (t = this.length);
            for (var i = this.length, o = this.tail; null !== o && i > t; i--) o = o.prev;
            for (; null !== o && i > e; i--, o = o.prev) r.push(o.value);
            return r;
          }, n.prototype.splice = function (e, t, ...r) {
            e > this.length && (e = this.length - 1), e < 0 && (e = this.length + e);
            for (var n = 0, o = this.head; null !== o && n < e; n++) o = o.next;
            var s = [];
            for (n = 0; o && n < t; n++) s.push(o.value), o = this.removeNode(o);
            null === o && (o = this.tail), o !== this.head && o !== this.tail && (o = o.prev);
            for (n = 0; n < r.length; n++) o = i(this, o, r[n]);
            return s;
          }, n.prototype.reverse = function () {
            for (var e = this.head, t = this.tail, r = e; null !== r; r = r.prev) {
              var n = r.prev;
              r.prev = r.next, r.next = n;
            }
            return this.head = t, this.tail = e, this;
          };
          try {
            e("./iterator.js")(n);
          } catch (e) {}
        }, {
          "./iterator.js": 82
        }]
      }, {}, [12])(12);
    });
  })(mqtt_min);
  var mqtt_minExports = mqtt_min.exports;

  var logger$3 = new Logger('mqtt');
  var DEBUG = '__duix-debug';
  window.DUIXDEBUG = function (flag) {
    if (flag === false) {
      sessionStorage.removeItem(DEBUG);
    } else {
      sessionStorage.setItem(DEBUG, true);
    }
  };
  var MqttClient = /*#__PURE__*/function (_Event) {
    _inherits(MqttClient, _Event);
    var _super = _createSuper(MqttClient);
    function MqttClient() {
      var _this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, MqttClient);
      _this = _super.call(this);
      _this.connected = false;
      _this.url = options.url;
      _this.username = options.username;
      _this.password = options.password;
      _this.reconnectPeriod = 1000; // 1s自动重连
      if (!_this.url || !_this.username || !_this.password) {
        throw new Error('Signalling service initialization failed.');
      }
      _this.client = null;
      // 未发送的消息
      _this.unsent = [];
      return _this;
    }
    _createClass(MqttClient, [{
      key: "open",
      value: function open() {
        var _this2 = this;
        this.unsent = [];
        var url = this.url,
          username = this.username,
          password = this.password,
          reconnectPeriod = this.reconnectPeriod;
        var client = this.client = mqtt_minExports.connect(url, {
          username: username,
          password: password,
          reconnectPeriod: reconnectPeriod,
          clientId: 'duixmqttjs_' + Math.random().toString(16).slice(2, 8),
          properties: {
            sessionExpiryInterval: 10 * 1000
          }
        });
        client.on('connect', function () {
          logger$3.info('Mqtt client connect');
          _this2.connected = true;
          _this2.emit('connect');
          if (_this2.unsent.length > 0) {
            _this2.unsent.forEach(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                topic = _ref2[0],
                message = _ref2[1];
              _this2.publish(topic, message);
            });
            _this2.unsent = [];
          }
        });
        client.on('message', function (topic, message) {
          if (sessionStorage.getItem(DEBUG)) {
            logger$3.info('Receive message', topic, message.toString());
          }
          _this2.emit('message', topic, message.toString());
        });
        client.on('reconnect', function () {
          logger$3.info('Client reconnect');
        });
        client.on('close', function () {
          logger$3.info('Client close');
          _this2.connected = false;
        });
        client.on('disconnect', function () {
          logger$3.info('Client disconnect');
          _this2.connected = false;
        });
        client.on('offline', function () {
          logger$3.info('Client offline');
          _this2.connected = false;
        });
        client.on('error', function () {
          logger$3.info('Client error');
          _this2.connected = false;
        });
        client.on('end', function () {
          logger$3.info('Client end');
          _this2.connected = false;
        });
      }
    }, {
      key: "close",
      value: function close() {
        var _this$client;
        (_this$client = this.client) === null || _this$client === void 0 ? void 0 : _this$client.end();
        this.unsent = [];
      }

      // 订阅topic
    }, {
      key: "subscribe",
      value: function subscribe(topic) {
        var _this3 = this;
        return new Promise(function (resolve) {
          if (!_this3.isConnected()) {
            resolve(false);
          }
          _this3.client.subscribe(topic, {
            qos: 2
          }, function (error) {
            if (error) {
              logger$3.error("Subscribe ".concat(topic, " error"));
              resolve(false);
              return;
            }
            logger$3.info("Subscribe ".concat(topic, " success"));
            resolve(true);
          });
        });
      }

      // 取消订阅
    }, {
      key: "unsubscribe",
      value: function unsubscribe(topic) {
        var _this4 = this;
        return new Promise(function (resolve) {
          var _this4$client;
          (_this4$client = _this4.client) === null || _this4$client === void 0 ? void 0 : _this4$client.unsubscribe(topic, {
            qos: 2
          }, function (error) {
            if (error) {
              logger$3.warn("Unsubscribe ".concat(topic, " error"));
              resolve(false);
              return;
            }
            logger$3.info("Unsubscribe ".concat(topic, " success"));
            resolve(true);
          });
        });
      }

      // 发布消息
    }, {
      key: "publish",
      value: function publish(topic, message) {
        if (this.isInit() && !this.isConnected()) {
          this.unsent.push([topic, message]);
          return;
        }
        if (sessionStorage.getItem(DEBUG)) {
          logger$3.info('publish message', topic, message.toString());
        }
        this.client.publish(topic, message, {
          qos: 2
        });
      }
    }, {
      key: "isInit",
      value: function isInit() {
        return !!this.client;
      }
    }, {
      key: "isConnected",
      value: function isConnected() {
        return this.isInit() && this.connected;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.close();
        this.connected = false;
        this.url = '';
        this.username = '';
        this.password = '';
        this.client = null;
        this.unsent = [];
        _get(_getPrototypeOf(MqttClient.prototype), "destroy", this).call(this);
      }
    }]);
    return MqttClient;
  }(Event$1);

  var responseMap = {};
  function response(id, complete) {
    responseMap[id] = complete;
  }

  // 对服务端返回的消息进行处理，抛出业务层需要的数据，简化结构
  function process(message) {
    var messageObj = JSON.parse(message);
    var id = messageObj.id,
      method = messageObj.method,
      params = messageObj.params;
    var responseFn = responseMap[id];
    if (responseFn) {
      responseFn({
        id: id,
        result: messageObj.result,
        error: messageObj.error
      });
      delete responseMap[id];
      return null;
    }
    if (method === 'HeartBeat') {
      return {
        event: method,
        id: messageObj.id
      };
    }
    if (method === 'SessionSdp') {
      return {
        event: method,
        sdp: params.sdp
      };
    }
    if (method === 'SessionCandidate') {
      return {
        event: method,
        candidate: params.candidate
      };
    }
    if (method === 'SessionState') {
      var state = params.state;
      if (state === 'Loading') {
        var _params$detail;
        return {
          event: 'Loading',
          progress: params === null || params === void 0 || (_params$detail = params.detail) === null || _params$detail === void 0 ? void 0 : _params$detail.progress
        };
      }
      if (state === 'Show') {
        return {
          event: 'Show'
        };
      }
      if (state === 'Destroy') {
        return {
          event: 'Destroy',
          cause: params === null || params === void 0 ? void 0 : params.cause
        };
      }
      if (state === 'AiFaceError') {
        return {
          event: 'AiFaceError',
          code: params.code,
          cause: params.cause
        };
      }
      if (state === 'playStart') {
        if (params.type === 'dthuman') {
          return {
            event: 'SpeakStart',
            audio: params === null || params === void 0 ? void 0 : params.wav,
            content: params === null || params === void 0 ? void 0 : params.content
          };
        }
      }
      if (state === 'playStop') {
        if (params.type === 'dthuman') {
          return {
            event: 'SpeakStop',
            audio: params === null || params === void 0 ? void 0 : params.wav,
            content: params === null || params === void 0 ? void 0 : params.content
          };
        }
      }
      if (state === 'playException') {
        if (params.type === 'dthuman') {
          return {
            event: 'SpeakError',
            cause: params === null || params === void 0 ? void 0 : params.cause,
            audio: params === null || params === void 0 ? void 0 : params.wav,
            content: params === null || params === void 0 ? void 0 : params.content
          };
        }
      }
      if (state === 'AsrClose') {
        return {
          event: state
        };
      }
      if (state === 'AsrOpen') {
        return {
          event: state
        };
      }
    }
    if (method === 'SessionASR') {
      if (params.asr) {
        var _params$asr;
        return {
          event: 'AsrResult',
          txt: (_params$asr = params.asr) === null || _params$asr === void 0 ? void 0 : _params$asr.txt
        };
      }
    }
    return null;
  }
  var MessageFactory = {
    process: process,
    response: response
  };

  var RESOURCE = {
    rtmp: {
      resOptions: {
        name: 'rtmp',
        type: 'rtmp'
      },
      type: 'center'
    },
    rtc: {
      resOptions: {
        enableTrickleIce: true,
        timeToConnected: 10000,
        timeToReconnected: 25000,
        // rtc重连时间（25秒未重连上，触发destroy)
        vpxMaxBitrate: 3000,
        //最大码率
        vpxMinBitrate: 500,
        // 最小码率
        type: 'rtc'
      },
      type: 'center'
    },
    background: function background(_background, video) {
      // 背景资源
      var url = _background === null || _background === void 0 ? void 0 : _background.url;
      var isImage = /\.(jpeg|jpg|gif|png)$/i.test(url);
      return {
        resOptions: {
          type: isImage ? 'image' : 'video',
          url: url
        },
        drawOptions: {
          // TODO 如果背景图片比例不一致，是否需要缩放
          height: video.height,
          width: video.width,
          x: 0,
          y: 0
        },
        type: 'back'
      };
    },
    human: function human(options) {
      // 数字人资源
      var width = options.width,
        height = options.height,
        x = options.x,
        y = options.y,
        sequence = options.sequence,
        udCode = options.udCode,
        matting = options.matting;
      return {
        resOptions: {
          audioDriven: {
            mode: 'interactstream',
            quarter: 0,
            templates: [{
              matting: matting,
              sequence: sequence,
              udCode: udCode
            }]
          },
          type: 'dthuman',
          name: 'dthuman'
        },
        drawOptions: {
          width: width,
          height: height,
          x: x,
          y: y
        },
        type: 'center'
      };
    }
  };
  function newSession(_ref) {
    var transparent = _ref.transparent,
      enableRec = _ref.enableRec,
      human = _ref.human,
      background = _ref.background,
      video = _ref.video;
    var resList = [RESOURCE.rtc, RESOURCE.human(human)];
    if (background !== null && background !== void 0 && background.url) {
      resList.push(RESOURCE.background(background, video));
    }
    return {
      rule: 'DTHumanInteract',
      // 混屏模式 greenmatting绿幕图  maskmatting掩码图 normal正常，该值可选，默认是normal
      mixMode: transparent ? 'maskmatting' : 'normal',
      videoSize: {
        width: video.width,
        height: video.height
      },
      // 是否开启录屏
      enableRec: !!enableRec,
      recMode: {
        type: 'A1V2A2',
        uplinkSize: {
          width: video.width,
          height: video.height
        }
      },
      recRule: 'RecAiFaceInteract',
      // 资源list
      resList: resList
    };
  }
  var ResourceFactory = {
    newSession: newSession
  };

  var logger$2 = new Logger('playmanage');
  var PlayManage = /*#__PURE__*/function () {
    function PlayManage() {
      _classCallCheck(this, PlayManage);
      this.playList = [];
    }
    _createClass(PlayManage, [{
      key: "clean",
      value: function clean() {
        this.playList.forEach(function (item) {
          if (item.controller) {
            logger$2.info('clean abort');
            item.controller.abort();
            item.controller = null;
          }
        });
        this.playList = [];
      }
    }, {
      key: "findAudio",
      value: function findAudio(play, audio) {
        var _this = this;
        var index = play.list.findIndex(function (item) {
          return _this.isSame(item.url, audio);
        });
        return {
          index: index,
          item: play.list[index]
        };
      }
    }, {
      key: "isSame",
      value: function isSame(url, audio) {
        if (url === audio) return true;
        if (url.indexOf('{tts_url}') >= 0 && getUrlParamsString(audio).indexOf(getUrlParamsString(url)) >= 0) {
          return true;
        }
        return false;
      }
    }, {
      key: "setStart",
      value: function setStart(audio, start) {
        var params = getUrlParams(audio);
        var _this$getPlayById = this.getPlayById(params.id),
          play = _this$getPlayById.play;
        if (!play) return;
        var item = this.findAudio(play, audio).item;
        if (item) item.start = start;
      }
    }, {
      key: "setSend",
      value: function setSend(audio, send) {
        var params = getUrlParams(audio);
        var _this$getPlayById2 = this.getPlayById(params.id),
          play = _this$getPlayById2.play;
        if (!play) return;
        var item = this.findAudio(play, audio).item;
        if (item) item.send = send;
      }

      // 获取一个播放的音频
    }, {
      key: "getNext",
      value: function getNext(audio) {
        var nextAudio = null,
          nextPlay = null;
        if (audio) {
          var _getUrlParams, _nextAudio;
          var _this$getPlayById3 = this.getPlayById((_getUrlParams = getUrlParams(audio)) === null || _getUrlParams === void 0 ? void 0 : _getUrlParams.id),
            index = _this$getPlayById3.index,
            play = _this$getPlayById3.play;
          if (!play) return null;
          nextAudio = play.list[this.findAudio(play, audio).index + 1];
          if ((_nextAudio = nextAudio) !== null && _nextAudio !== void 0 && _nextAudio.send) {
            // 已经发送
            return null;
          }
          if (nextAudio) return nextAudio;
          if (!play.complete) {
            // 未完成，需要等待下一条
            return null;
          }
          nextPlay = this.playList[index + 1];
          if (!nextPlay) {
            return null;
          }
          var nextFirst = nextPlay.list[0];
          if (nextFirst !== null && nextFirst !== void 0 && nextFirst.send) {
            // 防止业务端在speakStart回调中执行speak，导致重复发送
            return null;
          }
          return nextFirst;
        } else {
          nextPlay = this.playList[0];
          return nextPlay ? nextPlay.list[0] : null;
        }
      }
    }, {
      key: "getPlayById",
      value: function getPlayById(id) {
        var index = this.playList.findIndex(function (item) {
          return item.id == id;
        });
        var play = index >= 0 ? this.playList[index] : null;
        return {
          index: index,
          play: play
        };
      }
    }, {
      key: "newPlay",
      value: function newPlay(_ref) {
        var id = _ref.id,
          controller = _ref.controller;
        this.playList.push({
          id: id,
          list: [],
          complete: false,
          controller: controller
        });
      }
    }, {
      key: "append",
      value: function append(_ref2) {
        var id = _ref2.id,
          audio = _ref2.audio,
          content = _ref2.content,
          isEnd = _ref2.isEnd,
          interrupt = _ref2.interrupt;
        var _this$getPlayById4 = this.getPlayById(id),
          play = _this$getPlayById4.play,
          index = _this$getPlayById4.index;
        if (index == -1) return {};
        var last = !!isEnd ? 1 : 0;
        var first = play.list.length == 0 ? 1 : 0;
        var url = urlAppendParam(audio, {
          id: id,
          first: first,
          last: last,
          t: new Date().getTime()
        });
        play.complete = last;
        var data = {
          url: url,
          content: content,
          start: false,
          send: false,
          interrupt: first ? interrupt : false
        };
        play.list.push(data);
        return _objectSpread2({
          index: index,
          last: last,
          first: first
        }, data);
      }
    }, {
      key: "remove",
      value: function remove(audio) {
        var params = getUrlParams(audio);
        if (!params.id) return;
        var _this$getPlayById5 = this.getPlayById(params.id),
          index = _this$getPlayById5.index;
        if (index >= 0) {
          var item = this.playList[index];
          if (item.controller) {
            logger$2.info('remove abort');
            item.controller.abort();
          }
          this.playList.splice(index, 1);
          return index;
        }
        return -1;
      }
    }, {
      key: "removeById",
      value: function removeById(id) {
        var _this$getPlayById6 = this.getPlayById(id),
          index = _this$getPlayById6.index;
        if (index >= 0) {
          var item = this.playList[index];
          if (item.controller) {
            logger$2.info('removeById abort');
            item.controller.abort();
          }
          this.playList.splice(index, 1);
          return index;
        }
        return -1;
      }
    }, {
      key: "isLast",
      value: function isLast(audio) {
        var _list;
        var params = getUrlParams(audio);
        var last = Number(params.last);
        if (!!last) return true;
        var _this$getPlayById7 = this.getPlayById(params.id),
          play = _this$getPlayById7.play;
        if (!play) return true;
        var complete = play.complete,
          list = play.list;
        if (complete && this.isSame((_list = list[list.length - 1]) === null || _list === void 0 ? void 0 : _list.url, audio)) {
          return true;
        }
        return false;
      }
    }, {
      key: "isFirst",
      value: function isFirst(audio) {
        var _getUrlParams2;
        return !!Number((_getUrlParams2 = getUrlParams(audio)) === null || _getUrlParams2 === void 0 ? void 0 : _getUrlParams2.first);
      }

      // 之前的是否全部已开始
    }, {
      key: "beforeIsAllStart",
      value: function beforeIsAllStart(audio) {
        var _getUrlParams3,
          _this2 = this;
        var _this$getPlayById8 = this.getPlayById((_getUrlParams3 = getUrlParams(audio)) === null || _getUrlParams3 === void 0 ? void 0 : _getUrlParams3.id),
          index = _this$getPlayById8.index;
        if (index == -1) {
          return true;
        }
        for (var i = 0; i <= index; i++) {
          var p = this.playList[i];
          if (i < index && !p.complete) {
            return false;
          }
          if (p.list.find(function (item) {
            return !item.start && !_this2.isSame(item.url, audio);
          })) {
            return false;
          }
        }
        return true;
      }
    }]);
    return PlayManage;
  }();

  async function getBytes(stream, onChunk) {
    const reader = stream.getReader();
    let result;
    while (!(result = await reader.read()).done) {
      onChunk(result.value);
    }
  }
  function getLines(onLine) {
    let buffer;
    let position;
    let fieldLength;
    let discardTrailingNewline = false;
    return function onChunk(arr) {
      if (buffer === undefined) {
        buffer = arr;
        position = 0;
        fieldLength = -1;
      } else {
        buffer = concat(buffer, arr);
      }
      const bufLength = buffer.length;
      let lineStart = 0;
      while (position < bufLength) {
        if (discardTrailingNewline) {
          if (buffer[position] === 10) {
            lineStart = ++position;
          }
          discardTrailingNewline = false;
        }
        let lineEnd = -1;
        for (; position < bufLength && lineEnd === -1; ++position) {
          switch (buffer[position]) {
            case 58:
              if (fieldLength === -1) {
                fieldLength = position - lineStart;
              }
              break;
            case 13:
              discardTrailingNewline = true;
            case 10:
              lineEnd = position;
              break;
          }
        }
        if (lineEnd === -1) {
          break;
        }
        onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
        lineStart = position;
        fieldLength = -1;
      }
      if (lineStart === bufLength) {
        buffer = undefined;
      } else if (lineStart !== 0) {
        buffer = buffer.subarray(lineStart);
        position -= lineStart;
      }
    };
  }
  function getMessages(onId, onRetry, onMessage) {
    let message = newMessage();
    const decoder = new TextDecoder();
    return function onLine(line, fieldLength) {
      if (line.length === 0) {
        onMessage === null || onMessage === void 0 ? void 0 : onMessage(message);
        message = newMessage();
      } else if (fieldLength > 0) {
        const field = decoder.decode(line.subarray(0, fieldLength));
        const valueOffset = fieldLength + (line[fieldLength + 1] === 32 ? 2 : 1);
        const value = decoder.decode(line.subarray(valueOffset));
        switch (field) {
          case 'data':
            message.data = message.data ? message.data + '\n' + value : value;
            break;
          case 'event':
            message.event = value;
            break;
          case 'id':
            onId(message.id = value);
            break;
          case 'retry':
            const retry = parseInt(value, 10);
            if (!isNaN(retry)) {
              onRetry(message.retry = retry);
            }
            break;
        }
      }
    };
  }
  function concat(a, b) {
    const res = new Uint8Array(a.length + b.length);
    res.set(a);
    res.set(b, a.length);
    return res;
  }
  function newMessage() {
    return {
      data: '',
      event: '',
      id: '',
      retry: undefined
    };
  }

  var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };
  const EventStreamContentType = 'text/event-stream';
  const DefaultRetryInterval = 1000;
  const LastEventId = 'last-event-id';
  function fetchEventSource(input, _a) {
    var {
        signal: inputSignal,
        headers: inputHeaders,
        onopen: inputOnOpen,
        onmessage,
        onclose,
        onerror,
        openWhenHidden,
        fetch: inputFetch
      } = _a,
      rest = __rest(_a, ["signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch"]);
    return new Promise((resolve, reject) => {
      const headers = Object.assign({}, inputHeaders);
      if (!headers.accept) {
        headers.accept = EventStreamContentType;
      }
      let curRequestController;
      function onVisibilityChange() {
        curRequestController.abort();
        if (!document.hidden) {
          create();
        }
      }
      if (!openWhenHidden) {
        document.addEventListener('visibilitychange', onVisibilityChange);
      }
      let retryInterval = DefaultRetryInterval;
      let retryTimer = 0;
      function dispose() {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.clearTimeout(retryTimer);
        curRequestController.abort();
      }
      inputSignal === null || inputSignal === void 0 ? void 0 : inputSignal.addEventListener('abort', () => {
        dispose();
        resolve();
      });
      const fetch = inputFetch !== null && inputFetch !== void 0 ? inputFetch : window.fetch;
      const onopen = inputOnOpen !== null && inputOnOpen !== void 0 ? inputOnOpen : defaultOnOpen;
      async function create() {
        var _a;
        curRequestController = new AbortController();
        try {
          const response = await fetch(input, Object.assign(Object.assign({}, rest), {
            headers,
            signal: curRequestController.signal
          }));
          await onopen(response);
          await getBytes(response.body, getLines(getMessages(id => {
            if (id) {
              headers[LastEventId] = id;
            } else {
              delete headers[LastEventId];
            }
          }, retry => {
            retryInterval = retry;
          }, onmessage)));
          onclose === null || onclose === void 0 ? void 0 : onclose();
          dispose();
          resolve();
        } catch (err) {
          if (!curRequestController.signal.aborted) {
            try {
              const interval = (_a = onerror === null || onerror === void 0 ? void 0 : onerror(err)) !== null && _a !== void 0 ? _a : retryInterval;
              window.clearTimeout(retryTimer);
              retryTimer = window.setTimeout(create, interval);
            } catch (innerErr) {
              dispose();
              reject(innerErr);
            }
          }
        }
      }
      create();
    });
  }
  function defaultOnOpen(response) {
    const contentType = response.headers.get('content-type');
    if (!(contentType === null || contentType === void 0 ? void 0 : contentType.startsWith(EventStreamContentType))) {
      throw new Error(`Expected content-type to be ${EventStreamContentType}, Actual: ${contentType}`);
    }
  }

  var logger$1 = new Logger('openap');

  // 
  function checkSign(_x, _x2) {
    return _checkSign.apply(this, arguments);
  }
  function _checkSign() {
    _checkSign = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(sign, domain) {
      var res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return http.get("".concat(API.checkSig.replace('{DOMAIN}', domain)).concat(sign));
          case 2:
            res = _context.sent;
            if (!res.success) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return", res.data);
          case 5:
            return _context.abrupt("return", null);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _checkSign.apply(this, arguments);
  }
  function createSession(_x3, _x4) {
    return _createSession.apply(this, arguments);
  }

  // 查询会话信息
  function _createSession() {
    _createSession = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sig, domain) {
      var res;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return http.get(API.createSession.replace('{DOMAIN}', domain), {
              sig: sig
            });
          case 2:
            res = _context2.sent;
            if (!res.success) {
              _context2.next = 5;
              break;
            }
            return _context2.abrupt("return", res.data);
          case 5:
            return _context2.abrupt("return", null);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _createSession.apply(this, arguments);
  }
  function queryConversationMaterialById(_x5, _x6) {
    return _queryConversationMaterialById.apply(this, arguments);
  }

  // 查询答案
  function _queryConversationMaterialById() {
    _queryConversationMaterialById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id, domain) {
      var _res$data, _res$data2, _res$data3, _res$data4, _res$data5, _res$data6, _res$data7, _res$data8, url, res, humanConfig, human, background, video, language, asr, asrService;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            domain = domain || DefaultConfig.domain;
            url = API.queryConversationMaterialById.replace('{DOMAIN}', domain);
            _context3.next = 5;
            return http.get(url, {
              id: id
            });
          case 5:
            res = _context3.sent;
            humanConfig = res === null || res === void 0 || (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.humanConfig;
            if (humanConfig) {
              _context3.next = 9;
              break;
            }
            return _context3.abrupt("return", null);
          case 9:
            human = {
              x: humanConfig === null || humanConfig === void 0 ? void 0 : humanConfig.human_x,
              y: humanConfig === null || humanConfig === void 0 ? void 0 : humanConfig.human_y,
              width: humanConfig === null || humanConfig === void 0 ? void 0 : humanConfig.human_width,
              height: humanConfig === null || humanConfig === void 0 ? void 0 : humanConfig.human_height,
              sequence: (res === null || res === void 0 || (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.templateVideoList) || [],
              udCode: res === null || res === void 0 || (_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.modelSceneId,
              matting: res !== null && res !== void 0 && (_res$data4 = res.data) !== null && _res$data4 !== void 0 && _res$data4.sceneType ? 0 : 1
            };
            background = {
              url: res === null || res === void 0 || (_res$data5 = res.data) === null || _res$data5 === void 0 ? void 0 : _res$data5.backgroundUrl
            };
            video = {
              width: humanConfig === null || humanConfig === void 0 ? void 0 : humanConfig.video_width,
              height: humanConfig === null || humanConfig === void 0 ? void 0 : humanConfig.video_height
            };
            language = (res === null || res === void 0 || (_res$data6 = res.data) === null || _res$data6 === void 0 ? void 0 : _res$data6.language) || 'zh';
            asr = res === null || res === void 0 || (_res$data7 = res.data) === null || _res$data7 === void 0 ? void 0 : _res$data7.asr;
            asrService = res === null || res === void 0 || (_res$data8 = res.data) === null || _res$data8 === void 0 ? void 0 : _res$data8.asrService;
            return _context3.abrupt("return", {
              human: human,
              background: background,
              video: video,
              language: language,
              asr: asr,
              asrService: asrService
            });
          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", null);
          case 21:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 18]]);
    }));
    return _queryConversationMaterialById.apply(this, arguments);
  }
  function getByQuestion(_x7, _x8) {
    return _getByQuestion.apply(this, arguments);
  }

  // 获取答案流式接口
  function _getByQuestion() {
    _getByQuestion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(param, domain) {
      var _res$data9, _res$data10, _res$data11, url, res;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            domain = domain || DefaultConfig.domain;
            url = API.getByQuestion.replace('{DOMAIN}', domain);
            _context4.next = 5;
            return http.post(url, param);
          case 5:
            res = _context4.sent;
            if (!(!res.success || !(res !== null && res !== void 0 && (_res$data9 = res.data) !== null && _res$data9 !== void 0 && _res$data9.answer))) {
              _context4.next = 8;
              break;
            }
            return _context4.abrupt("return", null);
          case 8:
            return _context4.abrupt("return", {
              answer: res === null || res === void 0 || (_res$data10 = res.data) === null || _res$data10 === void 0 ? void 0 : _res$data10.answer,
              audio: res === null || res === void 0 || (_res$data11 = res.data) === null || _res$data11 === void 0 ? void 0 : _res$data11.filePath
            });
          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", null);
          case 14:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 11]]);
    }));
    return _getByQuestion.apply(this, arguments);
  }
  function getAnswerStream() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var data = {
      conversationId: param.conversationId,
      question: param.question,
      sessionId: param.sessionId,
      isHistory: !!param.isHistory,
      // 是否开启历史记录
      isVector: !!param.isVector,
      // 决策是否带入之前的相似回答
      userId: param.userId || param.appId
    };
    var url = API.getAnswerStream.replace('{DOMAIN}', param.domain || DefaultConfig.domain);
    var isFirst = true;
    try {
      return new Promise(function (resove) {
        fetchEventSource(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          signal: param.signal,
          openWhenHidden: true,
          onopen: function onopen(response) {
            if (response.ok && response.headers.get('content-type').indexOf('text/event-stream') >= 0) {
              logger$1.info('getAnswerStream opened');
            } else {
              throw "Service ".concat(response.status);
            }
          },
          onclose: function onclose() {
            logger$1.info('getAnswerStream closed');
            param.onclose && param.onclose();
          },
          onmessage: function onmessage(event) {
            var res = JSON.parse(event.data);
            var _ref = (res === null || res === void 0 ? void 0 : res.data) || {},
              answer = _ref.answer,
              audio = _ref.filePath,
              isEnd = _ref.isEnd;
            if (isFirst) {
              isFirst = false;
              if (!audio) throw 'Audio is null.';
              resove(true);
            }
            param.onmessage && param.onmessage({
              answer: answer,
              audio: audio,
              isEnd: isEnd
            });
          },
          onerror: function onerror(err) {
            resove(false);
            logger$1.info('getAnswerStream error', err);
            param.onclose && param.onclose();
            throw err;
          }
        });
      });
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  var logger = new Logger('index');
  var _reconnectRTC = /*#__PURE__*/new WeakSet();
  var DUIX = /*#__PURE__*/function (_Event) {
    _inherits(DUIX, _Event);
    var _super = _createSuper(DUIX);
    function DUIX() {
      var _this;
      _classCallCheck(this, DUIX);
      _this = _super.call(this);
      _classPrivateMethodInitSpec(_assertThisInitialized(_this), _reconnectRTC);
      _this.sign = '';
      _this.domain = DefaultConfig.domain;
      _this.containerLable = '';
      _this.conversationId = '';
      _this.sessionId = '';
      _this.token = '';
      _this.appId = '';
      _this.rtcConfig = null;
      _this.mqttConfig = null;
      _this.mqttTopic = null;
      //
      _this.asrService = '';
      _this.asr = {};
      _this.language = 'zh'; // 当前会话语言

      _this.vpxMaxBitrate = 0; // 最大码率
      _this.initOpenAsr = false; // 

      _this.terminal = 'app';
      _this.mediaMode = 'web_rtc';
      _this.interactMode = 'live';
      _this.timer = null;
      _this.recorder = null;
      _this.id = 1;
      _this.username = '';

      // 信令服务
      _this.socket = null;
      _this.recordState = RecordState.CLOSED;
      _this.asrState = AsrState.CLOSED;
      _this.sessionState = SessionState.CLOSED;
      _this.speakState = SpeakState.SLIENT;
      _this.stopTimeout = null;
      _this.isInit = false;

      // rtc重连
      _this.isRestartICE = false;
      _this.restartICETimer = null;

      // 播放列表管理
      _this.playManage = new PlayManage();
      logger.info("Version ".concat("2.1.1", ". ", navigator.userAgent));
      return _this;
    }
    _createClass(DUIX, [{
      key: "init",
      value: function () {
        var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var _window,
            _this2 = this;
          var options,
            sign,
            containerLable,
            domain,
            data,
            _args = arguments;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                sign = options.sign, containerLable = options.containerLable, domain = options.domain;
                if (sign) {
                  _context.next = 4;
                  break;
                }
                throw new Error('Missing required parameters \'sign\'.');
              case 4:
                if (containerLable) {
                  _context.next = 6;
                  break;
                }
                throw new Error('Missing required parameters \'containerLable\'.');
              case 6:
                if (!this.isInit) {
                  _context.next = 8;
                  break;
                }
                return _context.abrupt("return", {
                  err: 'Duix is already init'
                });
              case 8:
                this.sign = sign;
                this.domain = domain || DefaultConfig.domain;
                this.containerLable = containerLable;
                _context.next = 13;
                return checkSign(this.sign, this.domain);
              case 13:
                data = _context.sent;
                if (data) {
                  _context.next = 18;
                  break;
                }
                this.triggerError('4005');
                logger.error('Duix.init failed. CheckSign failed');
                return _context.abrupt("return", {
                  err: 'Signature verification failed'
                });
              case 18:
                logger.info('Duix.init succeeded.', data.appId);
                this.token = data.token;
                this.appId = data.appId;
                this.sessionId = data.sessionId;
                sessionStorage.setItem('_duix_token', this.token);
                sessionStorage.setItem('_duix_appid', this.appId);
                sessionStorage.setItem('_duix_sign', this.sign);
                this.asrService = data.asrService;
                this.asr = data.asr;
                this.rtcConfig = data.rtcConfig;
                this.mqttConfig = data.mqttConfig;
                this.initSocket();
                this.webRtcInit();
                (_window = window) === null || _window === void 0 ? void 0 : _window.addEventListener('beforeunload', function () {
                  logger.info('window.beforeunload');
                  _this2.stop();
                });
                this.isInit = true;
                Logger.start({
                  domain: this.domain,
                  interval: 15000
                });
                return _context.abrupt("return", {});
              case 35:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function init() {
          return _init.apply(this, arguments);
        }
        return init;
      }()
    }, {
      key: "destroy",
      value: function destroy() {
        logger.info('Duix.destroy');
        this.isInit = false;
        this.stop();
        if (this.socket) {
          this.socket.destroy();
        }
        _get(_getPrototypeOf(DUIX.prototype), "destroy", this).call(this);
      }
    }, {
      key: "getLocalStream",
      value: function getLocalStream() {
        logger.info('Duix.getLocalStream');
        return this.webRtc.localStream;
      }
    }, {
      key: "getRemoteStream",
      value: function getRemoteStream() {
        logger.info('Duix.getRemoteStream');
        return this.webRtc.remoteStream;
      }
    }, {
      key: "initSocket",
      value: function initSocket() {
        var _this$mqttConfig,
          _this$mqttConfig2,
          _this$mqttConfig3,
          _this3 = this;
        this.socket = new MqttClient({
          url: (_this$mqttConfig = this.mqttConfig) === null || _this$mqttConfig === void 0 ? void 0 : _this$mqttConfig.broker,
          username: (_this$mqttConfig2 = this.mqttConfig) === null || _this$mqttConfig2 === void 0 ? void 0 : _this$mqttConfig2.userName,
          password: (_this$mqttConfig3 = this.mqttConfig) === null || _this$mqttConfig3 === void 0 ? void 0 : _this$mqttConfig3.password
        });
        var err = null;
        this.socket.on('message', function (topic, message) {
          var _this3$webRtc, _getUrlParams, _getUrlParams2;
          var data = MessageFactory.process(message);
          if (!data) return;
          if (_this3.sessionState === SessionState.CLOSED) {
            logger.warn('Session is closed.');
            return;
          }
          switch (data.event) {
            case 'AiFaceError':
              err = data;
              break;
            case 'Destroy':
              clearTimeout(_this3.stopTimeout);
              if (_this3.sessionState !== SessionState.CLOSING) {
                var _err, _err2;
                _this3.triggerError('4007', {
                  code: (_err = err) === null || _err === void 0 ? void 0 : _err.code,
                  cause: ((_err2 = err) === null || _err2 === void 0 ? void 0 : _err2.cause) || (data === null || data === void 0 ? void 0 : data.cause)
                });
              }
              _this3.destroySession();
              err = null;
              break;
            case 'SessionSdp':
              _this3.webRtc.setRemoteDescription(data.sdp, _this3.isRestartICE);
              break;
            case 'SessionCandidate':
              _this3.webRtc.addIceCandidate(data.candidate);
              break;
            case 'Loading':
              logger.info('Trigger progress');
              _this3.emit('progress', data.progress);
              break;
            case 'Show':
              logger.info('Aiface show');
              if (_this3.initOpenAsr) {
                logger.info('Auto OpenSessionASR');
                _this3.openSessionAsr();
              }
              (_this3$webRtc = _this3.webRtc) === null || _this3$webRtc === void 0 ? void 0 : _this3$webRtc.playRemoteStream();
              break;
            case 'AsrResult':
              logger.info('Trigger asrResult', data.txt);
              _this3.emit('asrResult', data.txt || '');
              break;
            case 'SpeakStart':
              _this3.speakState = SpeakState.SPEAKING;
              data.id = (_getUrlParams = getUrlParams(data.audio)) === null || _getUrlParams === void 0 ? void 0 : _getUrlParams.id;
              _this3.playManage.setStart(data.audio, true);
              // 是第一条
              if (_this3.playManage.isFirst(data.audio)) {
                logger.info('Trigger speakStart', data);
                _this3.emit('speakStart', data);
              }
              logger.info('Trigger speakSection', Object.assign({}, data, {
                event: 'speakSection'
              }));
              _this3.emit('speakSection', Object.assign({}, data, {
                event: 'speakSection'
              }));
              // 预发送下一条
              _this3.resumePlay(data.audio);
              break;
            case 'SpeakStop':
              _this3.speakState = SpeakState.SLIENT;
              data.id = (_getUrlParams2 = getUrlParams(data.audio)) === null || _getUrlParams2 === void 0 ? void 0 : _getUrlParams2.id;
              if (_this3.playManage.isLast(data.audio)) {
                _this3.playManage.remove(data.audio);
                logger.info('Trigger speakEnd', data);
                _this3.emit('speakEnd', data);
              }
              break;
            case 'SpeakError':
              logger.warn('Trigger speakError', data);
              _this3.emit('speakError', data);
              break;
            case 'AsrClose':
              logger.info('Trigger asrClose');
              var oldAsrState = _this3.asrState;
              _this3.asrState = AsrState.CLOSED;
              _this3.emit('asrClose');
              if (_this3.sessionState < 2 && oldAsrState < 2) {
                logger.warn('Reopen asr');
                _this3.openSessionAsr();
              }
              break;
            case 'AsrOpen':
              logger.info('Trigger openAsrSuccess');
              _this3.asrState = AsrState.OPENED;
              _this3.emit('openAsrSuccess');
              break;
          }
        });
        this.socket.once('connect', function () {
          _this3.emit('intialSucccess');
        });
        this.socket.open();
      }
    }, {
      key: "webRtcInit",
      value: function webRtcInit() {
        var _this4 = this;
        this.webRtc = new WebRtc({
          containerLable: this.containerLable
        });
        // 以RTC的show事件为准，作为数字人显示的时机
        this.webRtc.on(WebRtc.EventType.SHOW, function () {
          if (_this4.sessionState !== SessionState.CLOSED) {
            logger.info('Trigger show');
            _this4.sessionState = SessionState.CONNECTED;
            _this4.emit('show');
          }
        });
        // 报告网络信息/画面质量等
        this.webRtc.on(WebRtc.EventType.REPORT, function (info) {
          _this4.emit('report', info);
        });
        //发送本地SDP
        this.webRtc.on(WebRtc.EventType.SENDSDP, function (sdp) {
          logger.info('Webrtc send sdp');
          _this4.publishMessage('AnswerSession', {
            sdp: sdp
          });
        });
        //发送candidate
        this.webRtc.on(WebRtc.EventType.SENDCANDIDATE, function (candidate) {
          if (candidate.candidate) {
            logger.info('Webrtc send candidate', candidate);
            _this4.publishMessage('AddSessionCandidate', {
              candidate: candidate
            });
          }
        });
        //webRtc连接状态
        this.webRtc.on(WebRtc.EventType.STATUS, function (params) {
          var step = params.step,
            success = params.success,
            connectionState = params.connectionState;
          logger.info('Webrtc status', params);
          if (step === 'connectionstate') {
            if (success === true) {
              clearTimeout(_this4.restartICETimer);
              _this4.restartICETimer = null;
            } else if (connectionState === 'failed') {
              if (_this4.sessionState === SessionState.CONNECTED) {
                _classPrivateMethodGet(_this4, _reconnectRTC, _reconnectRTC2).call(_this4);
              } else {
                _this4.stop();
              }
            }
          } else if (step === 'getUserMedia') {
            if (success === false) {
              _this4.triggerError('4008', params);
            }
          }
        });
      }
    }, {
      key: "start",
      value: // 开启会话
      function () {
        var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var _options$vpxMaxBitrat,
            _this$mqttTopic,
            _this5 = this,
            _options$enhanceOpus;
          var options,
            data,
            res,
            ret,
            _this$mqttTopic2,
            message,
            _args2 = arguments;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                if (this.isInit) {
                  _context2.next = 3;
                  break;
                }
                throw new Error('Duix not init');
              case 3:
                if (options.conversationId) {
                  _context2.next = 5;
                  break;
                }
                throw new Error('Missing required parameters \'conversationId\'.');
              case 5:
                logger.info('Duix.start', options);
                if (!(this.sessionState !== SessionState.CLOSED)) {
                  _context2.next = 9;
                  break;
                }
                logger.warn('Duix.start failed');
                return _context2.abrupt("return", {
                  err: 'Session state is not closed.'
                });
              case 9:
                this.sessionState = SessionState.CONNECTING;
                this.conversationId = options.conversationId;
                this.transparent = options.transparent = options.wipeGreen ? false : options.transparent; // 打开扣绿幕时，自动关闭掩码模式
                this.wipeGreen = options.wipeGreen || false;
                this.vpxMaxBitrate = (_options$vpxMaxBitrat = options.vpxMaxBitrate) !== null && _options$vpxMaxBitrat !== void 0 ? _options$vpxMaxBitrat : this.rtcConfig.vpxMaxBitrate;
                this.initOpenAsr = options.openAsr;
                _context2.next = 17;
                return queryConversationMaterialById(this.conversationId, this.domain);
              case 17:
                data = _context2.sent;
                if (data) {
                  _context2.next = 22;
                  break;
                }
                this.sessionState = SessionState.CLOSED;
                logger.error('Duix.start failed. Query conversation error.');
                return _context2.abrupt("return", {
                  err: 'Query conversation info fail'
                });
              case 22:
                if (!(data !== null && data !== void 0 && data.asr)) {
                  logger.warn('Duix.start. Asr in empty');
                }
                if (!data.asrService) {
                  logger.warn('Duix.start. asrService in empty');
                }
                this.asrService = data === null || data === void 0 ? void 0 : data.asrService;
                this.asr = data === null || data === void 0 ? void 0 : data.asr;
                _context2.next = 28;
                return createSession(this.sign, this.domain);
              case 28:
                res = _context2.sent;
                if (res) {
                  _context2.next = 31;
                  break;
                }
                return _context2.abrupt("return", {
                  err: 'Create session fail'
                });
              case 31:
                this.sessionId = res.sessionId;
                this.mqttTopic = res.mqttTopic;
                _context2.next = 35;
                return this.socket.subscribe((_this$mqttTopic = this.mqttTopic) === null || _this$mqttTopic === void 0 ? void 0 : _this$mqttTopic.topicSub);
              case 35:
                ret = _context2.sent;
                if (ret) {
                  _context2.next = 39;
                  break;
                }
                logger.error('Duix.start failed. Subsribe error.', (_this$mqttTopic2 = this.mqttTopic) === null || _this$mqttTopic2 === void 0 ? void 0 : _this$mqttTopic2.topicSub);
                return _context2.abrupt("return", {
                  err: 'Subsribe topic failed'
                });
              case 39:
                sessionStorage.setItem('_duix_sessionId', this.sessionId);
                logger.info("Duix.start with session uuid ".concat(this.sessionId));

                // 发送开始会话消息
                message = ResourceFactory.newSession(_objectSpread2(_objectSpread2({}, data), {}, {
                  transparent: this.transparent,
                  enableRec: options.enableRec || false
                }));
                this.publishMessage('MakeNewSession', message, function (data) {
                  if (data.error) {
                    logger.error('Duix.start failed', data.error);
                    _this5.sessionState = SessionState.CLOSED;
                    _this5.triggerError('4001', data.error);
                  } else {
                    logger.info('Duix.start succeeded');
                  }
                });
                this.webRtc.open({
                  sessionType: this.rtcConfig.sessionType,
                  peeConfig: this.rtcConfig.peeConfig,
                  muted: options.muted,
                  transparent: options.transparent,
                  // 是否掩码模式扣背景
                  wipeGreen: options.wipeGreen,
                  // 是否抠绿幕
                  enhanceOpus: (_options$enhanceOpus = options.enhanceOpus) !== null && _options$enhanceOpus !== void 0 ? _options$enhanceOpus : false,
                  vpxMaxBitrate: this.vpxMaxBitrate,
                  openAsr: options.openAsr
                });
                return _context2.abrupt("return", {
                  data: this.sessionId
                });
              case 45:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function start() {
          return _start.apply(this, arguments);
        }
        return start;
      }()
      /**
       * 关闭会话
       */
    }, {
      key: "stop",
      value: function stop() {
        var _this6 = this,
          _this$webRtc;
        logger.info('Duix.stop');
        if (this.sessionState <= 1) {
          this.sessionState = SessionState.CLOSING;
          this.publishMessage('DestroySession', {
            cause: 'client stop'
          });
          //延迟处理，兼并stop消息丢失，会话未能正常开启，或服务端下发bye消息丢失等异常情况
          this.stopTimeout = setTimeout(function () {
            _this6.destroySession();
          }, 1500);
        } else {
          this.sessionState = SessionState.CLOSED;
        }
        (_this$webRtc = this.webRtc) === null || _this$webRtc === void 0 ? void 0 : _this$webRtc.hideDHVideo();
      }

      /**
       * 销毁会话，释放资源
       */
    }, {
      key: "destroySession",
      value: function destroySession() {
        var _this$socket, _this$mqttTopic3;
        this.stopRecord();
        this.closeAsr();
        this.webRtc.close();
        this.sessionState = SessionState.CLOSED;
        this.emit('bye');
        clearTimeout(this.timer);
        (_this$socket = this.socket) === null || _this$socket === void 0 ? void 0 : _this$socket.unsubscribe((_this$mqttTopic3 = this.mqttTopic) === null || _this$mqttTopic3 === void 0 ? void 0 : _this$mqttTopic3.topicSub);
      }

      /**
       * 销毁录音插件，释放资源
       */
    }, {
      key: "destroyRecorder",
      value: function destroyRecorder() {
        if (this.recorder) {
          Recorder.Destroy();
          this.recorder = null;
        }
      }

      /**
       * 获取当前会话状态
       */
    }, {
      key: "getSessionState",
      value: function getSessionState() {
        return this.sessionState;
      }
    }, {
      key: "playAudio",
      value: function playAudio(_ref) {
        var audio = _ref.audio,
          content = _ref.content,
          interrupt = _ref.interrupt;
        logger.info('playAudio', content, audio, interrupt);
        var wavPath = audio.indexOf('{tts_url}') >= 0 ? '' : audio;
        this.playManage.setSend(audio, true);
        this.publishMessage('ExecSessionResList', {
          executeList: [{
            name: 'dthuman',
            options: {
              method: 'playAudio',
              args: {
                wav_path: wavPath,
                content: content,
                useStreamTts: 1,
                interrupt: !!interrupt,
                // 是否中断之前的话
                urlParams: wavPath ? '' : getUrlParamsString(audio)
              }
            }
          }]
        });
      }
    }, {
      key: "resumePlay",
      value: function resumePlay(audio) {
        var next = this.playManage.getNext(audio);
        if (next) {
          this.playAudio({
            content: next.content,
            audio: next.url,
            interrupt: next.interrupt
          });
        }
      }

      // 回答问题
    }, {
      key: "answer",
      value: function () {
        var _answer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var _this7 = this;
          var options,
            question,
            interrupt,
            conversationId,
            sessionId,
            domain,
            id,
            controller,
            ret,
            _args3 = arguments;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                question = options.question, interrupt = options.interrupt;
                if (question) {
                  _context3.next = 4;
                  break;
                }
                throw new Error('Parameters \'question\' option cannot be empty.');
              case 4:
                conversationId = this.conversationId, sessionId = this.sessionId, domain = this.domain;
                logger.info('Duix.answer', JSON.stringify({
                  question: question,
                  interrupt: interrupt
                }));
                if (interrupt) {
                  this.playManage.clean();
                }
                id = uuid();
                controller = new AbortController();
                this.playManage.newPlay({
                  id: id,
                  controller: controller
                });
                _context3.next = 12;
                return getAnswerStream({
                  conversationId: conversationId,
                  question: question,
                  sessionId: sessionId,
                  domain: domain,
                  isHistory: !!options.isHistory,
                  isVector: !!options.isVector,
                  appId: this.appId,
                  userId: options.userId,
                  signal: controller.signal,
                  onmessage: function onmessage(data) {
                    logger.info('Answer stream', JSON.stringify(data));
                    var audio = data.audio,
                      content = data.answer,
                      isEnd = data.isEnd;
                    if (!audio) {
                      return;
                    }
                    var item = _this7.playManage.append({
                      id: id,
                      audio: audio,
                      content: content,
                      isEnd: isEnd,
                      interrupt: interrupt
                    });
                    if (item !== null && item !== void 0 && item.url && _this7.playManage.beforeIsAllStart(item === null || item === void 0 ? void 0 : item.url)) {
                      _this7.playAudio({
                        audio: item.url,
                        content: content,
                        interrupt: item.interrupt
                      });
                    }
                  },
                  onclose: function onclose() {
                    var _this7$playManage$get = _this7.playManage.getPlayById(id),
                      play = _this7$playManage$get.play;
                    if (play) {
                      play.complete = true;
                      // 请求异常，没有获取到数据
                      if (play.list.length == 0 && _this7.playManage.removeById(id) == 0) {
                        _this7.resumePlay();
                      }
                    }
                  }
                });
              case 12:
                ret = _context3.sent;
                if (ret) {
                  _context3.next = 15;
                  break;
                }
                return _context3.abrupt("return", {
                  err: 'Answer error. Get answer stream exception.'
                });
              case 15:
                return _context3.abrupt("return", {
                  id: id
                });
              case 16:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this);
        }));
        function answer() {
          return _answer.apply(this, arguments);
        }
        return answer;
      }() // 获取问题答案
    }, {
      key: "getAnswer",
      value: function () {
        var _getAnswer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(options) {
          var question, data;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                question = options.question;
                if (question) {
                  _context4.next = 3;
                  break;
                }
                throw new Error('Parameters \'question\' option cannot be empty.');
              case 3:
                logger.info('Duix.getAnswer');
                if (!(this.sessionState !== SessionState.CONNECTED)) {
                  _context4.next = 7;
                  break;
                }
                logger.error('Duix.getAnswer failed. Session is not connected');
                return _context4.abrupt("return", {
                  err: 'Session is not connected'
                });
              case 7:
                _context4.next = 9;
                return getByQuestion({
                  extContext: options.extContext || '',
                  question: question,
                  conversationId: this.conversationId,
                  sessionId: this.sessionId,
                  userId: options.userId
                }, this.domain);
              case 9:
                data = _context4.sent;
                if (data) {
                  _context4.next = 13;
                  break;
                }
                logger.error('Duix.getAnswer failed. Get answer error');
                return _context4.abrupt("return", {
                  err: 'Get answer error'
                });
              case 13:
                return _context4.abrupt("return", {
                  data: data
                });
              case 14:
              case "end":
                return _context4.stop();
            }
          }, _callee4, this);
        }));
        function getAnswer(_x) {
          return _getAnswer.apply(this, arguments);
        }
        return getAnswer;
      }() // 驱动数字人说话
    }, {
      key: "speak",
      value: function speak() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var content = options.content,
          audio = options.audio,
          interrupt = options.interrupt;
        if (!content) throw new Error('Missing required parameters \'content\'.');
        logger.info('Duix.speak', JSON.stringify({
          content: content,
          audio: audio,
          interrupt: interrupt
        }));
        if (this.sessionState !== SessionState.CONNECTED) {
          logger.error('Duix.speak failed. Session is not connected');
          return Promise.resolve({
            err: 'Session is not connected'
          });
        }
        if (interrupt) {
          this.playManage.clean();
        }
        var id = uuid();
        this.playManage.newPlay({
          id: id
        });
        var item = this.playManage.append({
          id: id,
          audio: audio || 'http://{tts_url}',
          content: content,
          isEnd: true,
          interrupt: interrupt
        });
        if (item !== null && item !== void 0 && item.url && this.playManage.beforeIsAllStart(item === null || item === void 0 ? void 0 : item.url)) {
          this.playAudio({
            audio: item.url,
            content: content,
            interrupt: item.interrupt
          });
        }
        return Promise.resolve({});
      }

      // 打断数字人说话
    }, {
      key: "break",
      value: function _break() {
        logger.info('Duix.break');
        this.playManage.clean();
        this.publishMessage('ExecSessionResList', {
          executeList: [{
            name: 'dthuman',
            options: {
              method: 'break',
              args: {}
            }
          }]
        });
      }

      /**
       * 开启ASR实时识别
       */
    }, {
      key: "openAsr",
      value: function () {
        var _openAsr = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var connectFlag;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.recordState <= 1)) {
                  _context5.next = 3;
                  break;
                }
                logger.debug('Please turn off the recording before turning on ASR.');
                return _context5.abrupt("return", {
                  err: 'ASR and recording cannot be turned on at the same time'
                });
              case 3:
                if (!(this.asrState !== AsrState.CLOSED)) {
                  _context5.next = 6;
                  break;
                }
                logger.debug('ASR real-time identification in progress.');
                return _context5.abrupt("return", {
                  err: 'ASR is running'
                });
              case 6:
                logger.info('Duix.openAsr');
                this.asrState = AsrState.OPENING;
                _context5.next = 10;
                return this.webRtc.mediaStreamReconnect();
              case 10:
                connectFlag = _context5.sent;
                if (!connectFlag) {
                  _context5.next = 16;
                  break;
                }
                this.openSessionAsr();
                return _context5.abrupt("return", {});
              case 16:
                this.asrState = AsrState.CLOSED;
                logger.info('Duix.openAsr failed. Open session asr connect stream error.');
                return _context5.abrupt("return", {
                  err: 'Connect stream fail'
                });
              case 19:
              case "end":
                return _context5.stop();
            }
          }, _callee5, this);
        }));
        function openAsr() {
          return _openAsr.apply(this, arguments);
        }
        return openAsr;
      }()
      /**
       * 关闭ASR实时识别
       */
    }, {
      key: "closeAsr",
      value: function () {
        var _closeAsr = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.asrState >= 2)) {
                  _context6.next = 3;
                  break;
                }
                logger.debug('ASR real-time recognition is not Unopened.');
                return _context6.abrupt("return", {
                  err: 'ASR is closed'
                });
              case 3:
                logger.info('Duix.closeAsr');
                this.asrState = AsrState.CLOSING;
                this.publishMessage('CloseSessionASR', {});
                this.webRtc.mediaStreamDisconnect();
                return _context6.abrupt("return", {});
              case 8:
              case "end":
                return _context6.stop();
            }
          }, _callee6, this);
        }));
        function closeAsr() {
          return _closeAsr.apply(this, arguments);
        }
        return closeAsr;
      }()
      /**
       * 开启录音功能
       */
    }, {
      key: "startRecord",
      value: function () {
        var _startRecord = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          var _this8 = this;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                if (!(this.asrState <= 1)) {
                  _context7.next = 3;
                  break;
                }
                logger.debug('Please turn off ASR before starting recording.');
                return _context7.abrupt("return", {
                  err: 'Please turn off ASR before starting recording.'
                });
              case 3:
                if (!(this.recordState !== RecordState.CLOSED)) {
                  _context7.next = 6;
                  break;
                }
                logger.debug('Recording is in progress or is already on.');
                return _context7.abrupt("return", {
                  err: 'Recording is in progress or is already on.'
                });
              case 6:
                logger.info('Duix.startRecord');
                this.recordState = RecordState.OPENING;
                return _context7.abrupt("return", new Promise(function (resolve) {
                  _this8.initRecorder().then(function () {
                    _this8.recordState = RecordState.OPENED;
                    resolve({});
                    logger.info('Duix.startRecord succeeded');
                  })["catch"](function (msg, isUserNotAllow) {
                    _this8.recordState = RecordState.CLOSED;
                    resolve({
                      err: msg
                    });
                    logger.info('Duix.startRecord failed.', msg, isUserNotAllow);
                  });
                }));
              case 9:
              case "end":
                return _context7.stop();
            }
          }, _callee7, this);
        }));
        function startRecord() {
          return _startRecord.apply(this, arguments);
        }
        return startRecord;
      }()
      /**
       * 结束录音功能
       * @param {*} param0 success: 识别结果回调
       * @returns
       */
    }, {
      key: "stopRecord",
      value: function stopRecord() {
        var _this9 = this;
        if (this.recordState >= 2) {
          logger.debug('Recording is not turned on.');
          return {
            err: 'Recording is not turned on.'
          };
        }
        logger.info('Duix.stopRecord');
        this.recordState = RecordState.CLOSING;
        return new Promise(function (resolve) {
          _this9.recorder.stop(function (buffers) {
            _this9.recordState = RecordState.CLOSED;
            _this9.sendBuffersFn(buffers, _this9.asrService).then(function (res) {
              resolve({
                data: res
              });
            }, function () {
              logger.error('Duix.stopRecord failed. Asr send buffer error');
              resolve({
                err: 'Asr inner error'
              });
            });
            _this9.destroyRecorder();
          }, function (error) {
            _this9.recordState = RecordState.CLOSED;
            _this9.destroyRecorder();
            resolve({
              err: error
            });
            logger.error('Duix.stopRecord failed.', error);
          });
        });
      }

      /**
       * 录音识别
       * @param {ArrayBuffer} buffers PCM数据
       * @param {String} url 请求识别接口地址
       */
    }, {
      key: "sendBuffersFn",
      value: function sendBuffersFn(buffers, url) {
        return http.stream(url, buffers).then(function (res) {
          logger.info('Asr record', res);
          return res;
        })["catch"](function (error) {
          logger.error('Asr excepiton', error);
        });
      }

      /**
       * 初始化录音插件
       * @returns
       */
    }, {
      key: "initRecorder",
      value: function initRecorder() {
        var _this10 = this;
        this.recorder = Recorder({
          sampleRate: 16000,
          bitRate: 16
        });
        return new Promise(function (resolve, reject) {
          _this10.recorder.open(function () {
            _this10.recorder.start();
            resolve();
          }, function (msg, isUserNotAllow) {
            reject(msg, isUserNotAllow);
          });
        });
      }
    }, {
      key: "triggerError",
      value: function triggerError(code) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        logger.warn('Trigger error', code, data);
        this.emit('error', {
          code: code,
          message: ErrorMessage[code],
          data: data
        });
      }

      /**
       * 设置远端媒体流静音状态
       * @param {Boolean} muted true: 静音, false: 取消静音
       */
    }, {
      key: "setVideoMuted",
      value: function setVideoMuted(muted) {
        var _this$webRtc2;
        logger.info('Duix.setVideoMuted', muted);
        (_this$webRtc2 = this.webRtc) === null || _this$webRtc2 === void 0 ? void 0 : _this$webRtc2.setVideoMuted(muted);
      }

      /**
       * 移除视频标签
       */
    }, {
      key: "removeVideo",
      value: function removeVideo() {
        var _this$webRtc3;
        logger.info('Duix.removeVideo');
        (_this$webRtc3 = this.webRtc) === null || _this$webRtc3 === void 0 ? void 0 : _this$webRtc3.removeVideoLabel();
      }
    }, {
      key: "publishMessage",
      value: function publishMessage(method) {
        var _this$mqttTopic4;
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var complete = arguments.length > 2 ? arguments[2] : undefined;
        if (this.sessionState === SessionState.CLOSED) {
          logger.warn("Publish ".concat(method, " failed. Session is closed."));
          return;
        }
        logger.info('Publish method', method);
        var message = {
          id: this.id++,
          method: method,
          sender: clientUuid(),
          token: this.sign,
          appId: this.appId,
          conversationId: this.conversationId,
          params: _objectSpread2({
            sessionId: this.sessionId
          }, params),
          variable: {
            client_version: "2.1.1",
            client_type: 2 // 0 ios 1 安卓 2 web 
          }
        };

        this.socket.publish((_this$mqttTopic4 = this.mqttTopic) === null || _this$mqttTopic4 === void 0 ? void 0 : _this$mqttTopic4.topicPub, JSON.stringify(message));
        if (complete) {
          MessageFactory.response(message.id, complete);
        }
      }
    }, {
      key: "openSessionAsr",
      value: function openSessionAsr() {
        var _this$asr, _this$asr2;
        this.publishMessage('OpenSessionASR', {
          asr_engine: "asr:".concat(((_this$asr = this.asr) === null || _this$asr === void 0 ? void 0 : _this$asr.endpoint) || 300),
          url: (_this$asr2 = this.asr) === null || _this$asr2 === void 0 ? void 0 : _this$asr2.url
        });
      }
    }]);
    return DUIX;
  }(Event$1);
  function _reconnectRTC2() {
    var _this11 = this;
    logger.warn('Webrtc RestartICE');
    this.isRestartICE = true;
    this.publishMessage('RestartICE');
    // 20秒未连接上，结束会话
    this.restartICETimer = setTimeout(function () {
      logger.error('RestartICE failed');
      _this11.triggerError('3001', {
        cause: 'RTC failed.'
      });
      _this11.stop();
    }, 20 * 1000);
  }

  return DUIX;

}));
