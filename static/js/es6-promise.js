!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ES6Promise = e();
}(this, function () {
  "use strict";

  function t(t) {
    var e = typeof t;
    return null !== t && ("object" === e || "function" === e);
  }

  function e(t) {
    return "function" == typeof t;
  }

  function n(t) {
    G = t;
  }

  function r(t) {
    H = t;
  }

  function o() {
    return function () {
      return process.nextTick(a);
    };
  }

  function i() {
    return "undefined" != typeof B ? function () {
      B(a);
    } : c();
  }

  function s() {
    var t = 0,
        e = new Q(a),
        n = document.createTextNode("");
    return e.observe(n, {
      characterData: !0
    }), function () {
      n.data = t = ++t % 2;
    };
  }

  function u() {
    var t = new MessageChannel();
    return t.port1.onmessage = a, function () {
      return t.port2.postMessage(0);
    };
  }

  function c() {
    var t = setTimeout;
    return function () {
      return t(a, 1);
    };
  }

  function a() {
    for (var t = 0; t < z; t += 2) {
      var e = X[t],
          n = X[t + 1];
      e(n), X[t] = void 0, X[t + 1] = void 0;
    }

    z = 0;
  }

  function f() {
    try {
      var t = require,
          e = t("vertx");
      return B = e.runOnLoop || e.runOnContext, i();
    } catch (n) {
      return c();
    }
  }

  function l(t, e) {
    var n = this,
        r = new this.constructor(p);
    void 0 === r[$] && k(r);
    var o = n._state;

    if (o) {
      var i = arguments[o - 1];
      H(function () {
        return x(o, r, i, n._result);
      });
    } else E(n, r, t, e);

    return r;
  }

  function h(t) {
    var e = this;
    if (t && "object" == typeof t && t.constructor === e) return t;
    var n = new e(p);
    return g(n, t), n;
  }

  function p() {}

  function v() {
    return new TypeError("You cannot resolve a promise with itself");
  }

  function d() {
    return new TypeError("A promises callback cannot return that same promise.");
  }

  function _(t) {
    try {
      return t.then;
    } catch (e) {
      return rt.error = e, rt;
    }
  }

  function y(t, e, n, r) {
    try {
      t.call(e, n, r);
    } catch (o) {
      return o;
    }
  }

  function m(t, e, n) {
    H(function (t) {
      var r = !1,
          o = y(n, e, function (n) {
        r || (r = !0, e !== n ? g(t, n) : S(t, n));
      }, function (e) {
        r || (r = !0, j(t, e));
      }, "Settle: " + (t._label || " unknown promise"));
      !r && o && (r = !0, j(t, o));
    }, t);
  }

  function b(t, e) {
    e._state === et ? S(t, e._result) : e._state === nt ? j(t, e._result) : E(e, void 0, function (e) {
      return g(t, e);
    }, function (e) {
      return j(t, e);
    });
  }

  function w(t, n, r) {
    n.constructor === t.constructor && r === l && n.constructor.resolve === h ? b(t, n) : r === rt ? (j(t, rt.error), rt.error = null) : void 0 === r ? S(t, n) : e(r) ? m(t, n, r) : S(t, n);
  }

  function g(e, n) {
    e === n ? j(e, v()) : t(n) ? w(e, n, _(n)) : S(e, n);
  }

  function A(t) {
    t._onerror && t._onerror(t._result), M(t);
  }

  function S(t, e) {
    t._state === tt && (t._result = e, t._state = et, 0 !== t._subscribers.length && H(M, t));
  }

  function j(t, e) {
    t._state === tt && (t._state = nt, t._result = e, H(A, t));
  }

  function E(t, e, n, r) {
    var o = t._subscribers,
        i = o.length;
    t._onerror = null, o[i] = e, o[i + et] = n, o[i + nt] = r, 0 === i && t._state && H(M, t);
  }

  function M(t) {
    var e = t._subscribers,
        n = t._state;

    if (0 !== e.length) {
      for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3) r = e[s], o = e[s + n], r ? x(n, r, o, i) : o(i);

      t._subscribers.length = 0;
    }
  }

  function T() {
    this.error = null;
  }

  function P(t, e) {
    try {
      return t(e);
    } catch (n) {
      return ot.error = n, ot;
    }
  }

  function x(t, n, r, o) {
    var i = e(r),
        s = void 0,
        u = void 0,
        c = void 0,
        a = void 0;

    if (i) {
      if (s = P(r, o), s === ot ? (a = !0, u = s.error, s.error = null) : c = !0, n === s) return void j(n, d());
    } else s = o, c = !0;

    n._state !== tt || (i && c ? g(n, s) : a ? j(n, u) : t === et ? S(n, s) : t === nt && j(n, s));
  }

  function C(t, e) {
    try {
      e(function (e) {
        g(t, e);
      }, function (e) {
        j(t, e);
      });
    } catch (n) {
      j(t, n);
    }
  }

  function O() {
    return it++;
  }

  function k(t) {
    t[$] = it++, t._state = void 0, t._result = void 0, t._subscribers = [];
  }

  function Y() {
    return new Error("Array Methods must be provided an Array");
  }

  function Y() {
    return new Error("Array Methods must be provided an Array");
  }

  function q(t) {
    return new st(this, t).promise;
  }

  function F(t) {
    var e = this;
    return new e(W(t) ? function (n, r) {
      for (var o = t.length, i = 0; i < o; i++) e.resolve(t[i]).then(n, r);
    } : function (t, e) {
      return e(new TypeError("You must pass an array to race."));
    });
  }

  function D(t) {
    var e = this,
        n = new e(p);
    return j(n, t), n;
  }

  function K() {
    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
  }

  function L() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }

  function N() {
    var t = void 0;
    if ("undefined" != typeof global) t = global;else if ("undefined" != typeof self) t = self;else try {
      t = Function("return this")();
    } catch (e) {
      throw new Error("polyfill failed because global object is unavailable in this environment");
    }
    var n = t.Promise;

    if (n) {
      var r = null;

      try {
        r = Object.prototype.toString.call(n.resolve());
      } catch (e) {}

      if ("[object Promise]" === r && !n.cast) return;
    }

    t.Promise = ut;
  }

  var U = void 0;
  U = Array.isArray ? Array.isArray : function (t) {
    return "[object Array]" === Object.prototype.toString.call(t);
  };

  var W = U,
      z = 0,
      B = void 0,
      G = void 0,
      H = function (t, e) {
    X[z] = t, X[z + 1] = e, z += 2, 2 === z && (G ? G(a) : Z());
  },
      I = "undefined" != typeof window ? window : void 0,
      J = I || {},
      Q = J.MutationObserver || J.WebKitMutationObserver,
      R = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
      V = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
      X = new Array(1e3),
      Z = void 0;

  Z = R ? o() : Q ? s() : V ? u() : void 0 === I && "function" == typeof require ? f() : c();

  var $ = Math.random().toString(36).substring(16),
      tt = void 0,
      et = 1,
      nt = 2,
      rt = new T(),
      ot = new T(),
      it = 0,
      st = function () {
    function t(t, e) {
      this._instanceConstructor = t, this.promise = new t(p), this.promise[$] || k(this.promise), W(e) ? (this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? S(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && S(this.promise, this._result))) : j(this.promise, Y());
    }

    return t.prototype._enumerate = function (t) {
      for (var e = 0; this._state === tt && e < t.length; e++) this._eachEntry(t[e], e);
    }, t.prototype._eachEntry = function (t, e) {
      var n = this._instanceConstructor,
          r = n.resolve;

      if (r === h) {
        var o = _(t);

        if (o === l && t._state !== tt) this._settledAt(t._state, e, t._result);else if ("function" != typeof o) this._remaining--, this._result[e] = t;else if (n === ut) {
          var i = new n(p);
          w(i, t, o), this._willSettleAt(i, e);
        } else this._willSettleAt(new n(function (e) {
          return e(t);
        }), e);
      } else this._willSettleAt(r(t), e);
    }, t.prototype._settledAt = function (t, e, n) {
      var r = this.promise;
      r._state === tt && (this._remaining--, t === nt ? j(r, n) : this._result[e] = n), 0 === this._remaining && S(r, this._result);
    }, t.prototype._willSettleAt = function (t, e) {
      var n = this;
      E(t, void 0, function (t) {
        return n._settledAt(et, e, t);
      }, function (t) {
        return n._settledAt(nt, e, t);
      });
    }, t;
  }(),
      ut = function () {
    function t(e) {
      this[$] = O(), this._result = this._state = void 0, this._subscribers = [], p !== e && ("function" != typeof e && K(), this instanceof t ? C(this, e) : L());
    }

    return t.prototype["catch"] = function (t) {
      return this.then(null, t);
    }, t.prototype["finally"] = function (t) {
      var e = this,
          n = e.constructor;
      return e.then(function (e) {
        return n.resolve(t()).then(function () {
          return e;
        });
      }, function (e) {
        return n.resolve(t()).then(function () {
          throw e;
        });
      });
    }, t;
  }();

  return ut.prototype.then = l, ut.all = q, ut.race = F, ut.resolve = h, ut.reject = D, ut._setScheduler = n, ut._setAsap = r, ut._asap = H, ut.polyfill = N, ut.Promise = ut, ut;
});