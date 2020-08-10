!(function (e, t) {
  typeof exports == 'object' && typeof module == 'object'
    ? (module.exports = t())
    : typeof define == 'function' && define.amd
    ? define([], t)
    : typeof exports == 'object'
    ? (exports['react-native-webview-messaging'] = t())
    : (e['react-native-webview-messaging'] = t());
})(this, function () {
  return (function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = { i: r, l: !1, exports: {} });
      return e[r].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
    }
    var n = {};
    return (
      (t.m = e),
      (t.c = n),
      (t.i = function (e) {
        return e;
      }),
      (t.d = function (e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ''),
      t((t.s = 2))
    );
  })([
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.RN_MESSAGES_CHANNEL_PREFIX = 'f251c210-e7c9-42fa-bae3-b9352ec3722a';
    },
    function (e, t, n) {
      'use strict';
      function r() {
        (this._events = this._events || {}), (this._maxListeners = this._maxListeners || void 0);
      }
      function i(e) {
        return typeof e == 'function';
      }
      function s(e) {
        return typeof e == 'number';
      }
      function o(e) {
        return (void 0 === e ? 'undefined' : f(e)) === 'object' && e !== null;
      }
      function u(e) {
        return void 0 === e;
      }
      var f =
        typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e && typeof Symbol == 'function' && e.constructor === Symbol && e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            };
      (e.exports = r),
        (r.EventEmitter = r),
        (r.prototype._events = void 0),
        (r.prototype._maxListeners = void 0),
        (r.defaultMaxListeners = 10),
        (r.prototype.setMaxListeners = function (e) {
          if (!s(e) || e < 0 || isNaN(e)) throw TypeError('n must be a positive number');
          return (this._maxListeners = e), this;
        }),
        (r.prototype.emit = function (e) {
          var t, n, r, s, f, l;
          if (
            (this._events || (this._events = {}),
            e === 'error' && (!this._events.error || (o(this._events.error) && !this._events.error.length)))
          ) {
            if ((t = arguments[1]) instanceof Error) throw t;
            var a = new Error('Uncaught, unspecified "error" event. (' + t + ')');
            throw ((a.context = t), a);
          }
          if (((n = this._events[e]), u(n))) return !1;
          if (i(n))
            switch (arguments.length) {
              case 1:
                n.call(this);
                break;
              case 2:
                n.call(this, arguments[1]);
                break;
              case 3:
                n.call(this, arguments[1], arguments[2]);
                break;
              default:
                (s = Array.prototype.slice.call(arguments, 1)), n.apply(this, s);
            }
          else if (o(n))
            for (s = Array.prototype.slice.call(arguments, 1), l = n.slice(), r = l.length, f = 0; f < r; f++)
              l[f].apply(this, s);
          return !0;
        }),
        (r.prototype.addListener = function (e, t) {
          var n;
          if (!i(t)) throw TypeError('listener must be a function');
          return (
            this._events || (this._events = {}),
            this._events.newListener && this.emit('newListener', e, i(t.listener) ? t.listener : t),
            this._events[e]
              ? o(this._events[e])
                ? this._events[e].push(t)
                : (this._events[e] = [this._events[e], t])
              : (this._events[e] = t),
            o(this._events[e]) &&
              !this._events[e].warned &&
              (n = u(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) &&
              n > 0 &&
              this._events[e].length > n &&
              ((this._events[e].warned = !0),
              console.error(
                '(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',
                this._events[e].length
              ),
              typeof console.trace == 'function' && console.trace()),
            this
          );
        }),
        (r.prototype.on = r.prototype.addListener),
        (r.prototype.once = function (e, t) {
          function n() {
            this.removeListener(e, n), r || ((r = !0), t.apply(this, arguments));
          }
          if (!i(t)) throw TypeError('listener must be a function');
          var r = !1;
          return (n.listener = t), this.on(e, n), this;
        }),
        (r.prototype.removeListener = function (e, t) {
          var n, r, s, u;
          if (!i(t)) throw TypeError('listener must be a function');
          if (!this._events || !this._events[e]) return this;
          if (((n = this._events[e]), (s = n.length), (r = -1), n === t || (i(n.listener) && n.listener === t)))
            delete this._events[e], this._events.removeListener && this.emit('removeListener', e, t);
          else if (o(n)) {
            for (u = s; u-- > 0; )
              if (n[u] === t || (n[u].listener && n[u].listener === t)) {
                r = u;
                break;
              }
            if (r < 0) return this;
            n.length === 1 ? ((n.length = 0), delete this._events[e]) : n.splice(r, 1),
              this._events.removeListener && this.emit('removeListener', e, t);
          }
          return this;
        }),
        (r.prototype.removeAllListeners = function (e) {
          var t, n;
          if (!this._events) return this;
          if (!this._events.removeListener)
            return arguments.length === 0 ? (this._events = {}) : this._events[e] && delete this._events[e], this;
          if (arguments.length === 0) {
            for (t in this._events) t !== 'removeListener' && this.removeAllListeners(t);
            return this.removeAllListeners('removeListener'), (this._events = {}), this;
          }
          if (((n = this._events[e]), i(n))) this.removeListener(e, n);
          else if (n) for (; n.length; ) this.removeListener(e, n[n.length - 1]);
          return delete this._events[e], this;
        }),
        (r.prototype.listeners = function (e) {
          return this._events && this._events[e]
            ? i(this._events[e])
              ? [this._events[e]]
              : this._events[e].slice()
            : [];
        }),
        (r.prototype.listenerCount = function (e) {
          if (this._events) {
            var t = this._events[e];
            if (i(t)) return 1;
            if (t) return t.length;
          }
          return 0;
        }),
        (r.listenerCount = function (e, t) {
          return e.listenerCount(t);
        });
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      }
      function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || (typeof t != 'object' && typeof t != 'function') ? e : t;
      }
      function s(e, t) {
        if (typeof t != 'function' && t !== null)
          throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
        })),
          t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
      }
      function o(e, t) {
        return JSON.stringify({ type: e, payload: t });
      }
      var u = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        f = function e(t, n, r) {
          t === null && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
            var s = Object.getPrototypeOf(t);
            return s === null ? void 0 : e(s, n, r);
          }
          if ('value' in i) return i.value;
          var o = i.get;
          if (void 0 !== o) return o.call(r);
        },
        l = n(1),
        a = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        c = n(0),
        p = (function (e) {
          function t() {
            return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
          }
          return (
            s(t, e),
            u(t, [
              {
                key: 'sendJSON',
                value(e) {
                  window.postMessage(c.RN_MESSAGES_CHANNEL_PREFIX + o('json', e));
                },
              },
              {
                key: 'send',
                value(e) {
                  window.postMessage(c.RN_MESSAGES_CHANNEL_PREFIX + o('text', e));
                },
              },
              {
                key: 'emit',
                value(e, n, r) {
                  f(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), 'emit', this).call(this, e, n),
                    r ||
                      window.postMessage(
                        c.RN_MESSAGES_CHANNEL_PREFIX +
                          JSON.stringify({ type: 'event', meta: { eventName: e }, payload: n })
                      );
                },
              },
            ]),
            t
          );
        })(a.default);
      (window.RNMessagesChannel = new p()), (e.exports = window.RNMessagesChannel);
    },
  ]);
});
