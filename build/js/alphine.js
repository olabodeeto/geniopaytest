(() => {
  var He = !1,
    qe = !1,
    K = [];
  function Mt(e) {
    en(e);
  }
  function en(e) {
    K.includes(e) || K.push(e), tn();
  }
  function he(e) {
    let t = K.indexOf(e);
    t !== -1 && K.splice(t, 1);
  }
  function tn() {
    !qe && !He && ((He = !0), queueMicrotask(rn));
  }
  function rn() {
    (He = !1), (qe = !0);
    for (let e = 0; e < K.length; e++) K[e]();
    (K.length = 0), (qe = !1);
  }
  var O,
    I,
    Y,
    Ue,
    We = !0;
  function Nt(e) {
    (We = !1), e(), (We = !0);
  }
  function kt(e) {
    (O = e.reactive),
      (Y = e.release),
      (I = (t) =>
        e.effect(t, {
          scheduler: (r) => {
            We ? Mt(r) : r();
          },
        })),
      (Ue = e.raw);
  }
  function Ge(e) {
    I = e;
  }
  function It(e) {
    let t = () => {};
    return [
      (n) => {
        let i = I(n);
        e._x_effects ||
          ((e._x_effects = new Set()),
          (e._x_runEffects = () => {
            e._x_effects.forEach((o) => o());
          })),
          e._x_effects.add(i),
          (t = () => {
            i !== void 0 && (e._x_effects.delete(i), Y(i));
          });
      },
      () => {
        t();
      },
    ];
  }
  var Pt = [],
    Dt = [],
    $t = [];
  function Lt(e) {
    $t.push(e);
  }
  function jt(e) {
    Dt.push(e);
  }
  function Ft(e) {
    Pt.push(e);
  }
  function Kt(e, t, r) {
    e._x_attributeCleanups || (e._x_attributeCleanups = {}),
      e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
      e._x_attributeCleanups[t].push(r);
  }
  function Ye(e, t) {
    !e._x_attributeCleanups ||
      Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
        (t === void 0 || t.includes(r)) &&
          (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
      });
  }
  var Ze = new MutationObserver(Je),
    Qe = !1;
  function Xe() {
    Ze.observe(document, {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeOldValue: !0,
    }),
      (Qe = !0);
  }
  function on() {
    nn(), Ze.disconnect(), (Qe = !1);
  }
  var te = [],
    et = !1;
  function nn() {
    (te = te.concat(Ze.takeRecords())),
      te.length &&
        !et &&
        ((et = !0),
        queueMicrotask(() => {
          sn(), (et = !1);
        }));
  }
  function sn() {
    Je(te), (te.length = 0);
  }
  function m(e) {
    if (!Qe) return e();
    on();
    let t = e();
    return Xe(), t;
  }
  var tt = !1,
    _e = [];
  function zt() {
    tt = !0;
  }
  function Bt() {
    (tt = !1), Je(_e), (_e = []);
  }
  function Je(e) {
    if (tt) {
      _e = _e.concat(e);
      return;
    }
    let t = [],
      r = [],
      n = new Map(),
      i = new Map();
    for (let o = 0; o < e.length; o++)
      if (
        !e[o].target._x_ignoreMutationObserver &&
        (e[o].type === "childList" &&
          (e[o].addedNodes.forEach((s) => s.nodeType === 1 && t.push(s)),
          e[o].removedNodes.forEach((s) => s.nodeType === 1 && r.push(s))),
        e[o].type === "attributes")
      ) {
        let s = e[o].target,
          a = e[o].attributeName,
          c = e[o].oldValue,
          l = () => {
            n.has(s) || n.set(s, []),
              n.get(s).push({ name: a, value: s.getAttribute(a) });
          },
          u = () => {
            i.has(s) || i.set(s, []), i.get(s).push(a);
          };
        s.hasAttribute(a) && c === null
          ? l()
          : s.hasAttribute(a)
          ? (u(), l())
          : u();
      }
    i.forEach((o, s) => {
      Ye(s, o);
    }),
      n.forEach((o, s) => {
        Pt.forEach((a) => a(s, o));
      });
    for (let o of r) t.includes(o) || Dt.forEach((s) => s(o));
    t.forEach((o) => {
      (o._x_ignoreSelf = !0), (o._x_ignore = !0);
    });
    for (let o of t)
      r.includes(o) ||
        !o.isConnected ||
        (delete o._x_ignoreSelf,
        delete o._x_ignore,
        $t.forEach((s) => s(o)),
        (o._x_ignore = !0),
        (o._x_ignoreSelf = !0));
    t.forEach((o) => {
      delete o._x_ignoreSelf, delete o._x_ignore;
    }),
      (t = null),
      (r = null),
      (n = null),
      (i = null);
  }
  function ge(e) {
    return D(P(e));
  }
  function C(e, t, r) {
    return (
      (e._x_dataStack = [t, ...P(r || e)]),
      () => {
        e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
      }
    );
  }
  function rt(e, t) {
    let r = e._x_dataStack[0];
    Object.entries(t).forEach(([n, i]) => {
      r[n] = i;
    });
  }
  function P(e) {
    return e._x_dataStack
      ? e._x_dataStack
      : typeof ShadowRoot == "function" && e instanceof ShadowRoot
      ? P(e.host)
      : e.parentNode
      ? P(e.parentNode)
      : [];
  }
  function D(e) {
    let t = new Proxy(
      {},
      {
        ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
        has: (r, n) => e.some((i) => i.hasOwnProperty(n)),
        get: (r, n) =>
          (e.find((i) => {
            if (i.hasOwnProperty(n)) {
              let o = Object.getOwnPropertyDescriptor(i, n);
              if (
                (o.get && o.get._x_alreadyBound) ||
                (o.set && o.set._x_alreadyBound)
              )
                return !0;
              if ((o.get || o.set) && o.enumerable) {
                let s = o.get,
                  a = o.set,
                  c = o;
                (s = s && s.bind(t)),
                  (a = a && a.bind(t)),
                  s && (s._x_alreadyBound = !0),
                  a && (a._x_alreadyBound = !0),
                  Object.defineProperty(i, n, { ...c, get: s, set: a });
              }
              return !0;
            }
            return !1;
          }) || {})[n],
        set: (r, n, i) => {
          let o = e.find((s) => s.hasOwnProperty(n));
          return o ? (o[n] = i) : (e[e.length - 1][n] = i), !0;
        },
      }
    );
    return t;
  }
  function xe(e) {
    let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null,
      r = (n, i = "") => {
        Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
          ([o, { value: s, enumerable: a }]) => {
            if (a === !1 || s === void 0) return;
            let c = i === "" ? o : `${i}.${o}`;
            typeof s == "object" && s !== null && s._x_interceptor
              ? (n[o] = s.initialize(e, c, o))
              : t(s) && s !== n && !(s instanceof Element) && r(s, c);
          }
        );
      };
    return r(e);
  }
  function ye(e, t = () => {}) {
    let r = {
      initialValue: void 0,
      _x_interceptor: !0,
      initialize(n, i, o) {
        return e(
          this.initialValue,
          () => an(n, i),
          (s) => nt(n, i, s),
          i,
          o
        );
      },
    };
    return (
      t(r),
      (n) => {
        if (typeof n == "object" && n !== null && n._x_interceptor) {
          let i = r.initialize.bind(r);
          r.initialize = (o, s, a) => {
            let c = n.initialize(o, s, a);
            return (r.initialValue = c), i(o, s, a);
          };
        } else r.initialValue = n;
        return r;
      }
    );
  }
  function an(e, t) {
    return t.split(".").reduce((r, n) => r[n], e);
  }
  function nt(e, t, r) {
    if ((typeof t == "string" && (t = t.split(".")), t.length === 1))
      e[t[0]] = r;
    else {
      if (t.length === 0) throw error;
      return e[t[0]] || (e[t[0]] = {}), nt(e[t[0]], t.slice(1), r);
    }
  }
  var Vt = {};
  function y(e, t) {
    Vt[e] = t;
  }
  function re(e, t) {
    return (
      Object.entries(Vt).forEach(([r, n]) => {
        Object.defineProperty(e, `$${r}`, {
          get() {
            return n(t, { Alpine: R, interceptor: ye });
          },
          enumerable: !1,
        });
      }),
      e
    );
  }
  function Ht(e, t, r, ...n) {
    try {
      return r(...n);
    } catch (i) {
      J(i, e, t);
    }
  }
  function J(e, t, r = void 0) {
    Object.assign(e, { el: t, expression: r }),
      console.warn(
        `Alpine Expression Error: ${e.message}

${
  r
    ? 'Expression: "' +
      r +
      `"

`
    : ""
}`,
        t
      ),
      setTimeout(() => {
        throw e;
      }, 0);
  }
  function w(e, t, r = {}) {
    let n;
    return h(e, t)((i) => (n = i), r), n;
  }
  function h(...e) {
    return qt(...e);
  }
  var qt = it;
  function Ut(e) {
    qt = e;
  }
  function it(e, t) {
    let r = {};
    re(r, e);
    let n = [r, ...P(e)];
    if (typeof t == "function") return cn(n, t);
    let i = ln(n, t, e);
    return Ht.bind(null, e, t, i);
  }
  function cn(e, t) {
    return (r = () => {}, { scope: n = {}, params: i = [] } = {}) => {
      let o = t.apply(D([n, ...e]), i);
      be(r, o);
    };
  }
  var ot = {};
  function un(e, t) {
    if (ot[e]) return ot[e];
    let r = Object.getPrototypeOf(async function () {}).constructor,
      n =
        /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
          ? `(() => { ${e} })()`
          : e,
      o = (() => {
        try {
          return new r(
            ["__self", "scope"],
            `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`
          );
        } catch (s) {
          return J(s, t, e), Promise.resolve();
        }
      })();
    return (ot[e] = o), o;
  }
  function ln(e, t, r) {
    let n = un(t, r);
    return (i = () => {}, { scope: o = {}, params: s = [] } = {}) => {
      (n.result = void 0), (n.finished = !1);
      let a = D([o, ...e]);
      if (typeof n == "function") {
        let c = n(n, a).catch((l) => J(l, r, t));
        n.finished
          ? (be(i, n.result, a, s, r), (n.result = void 0))
          : c
              .then((l) => {
                be(i, l, a, s, r);
              })
              .catch((l) => J(l, r, t))
              .finally(() => (n.result = void 0));
      }
    };
  }
  function be(e, t, r, n, i) {
    if (typeof t == "function") {
      let o = t.apply(r, n);
      o instanceof Promise
        ? o.then((s) => be(e, s, r, n)).catch((s) => J(s, i, t))
        : e(o);
    } else e(t);
  }
  var st = "x-";
  function E(e = "") {
    return st + e;
  }
  function Wt(e) {
    st = e;
  }
  var Gt = {};
  function p(e, t) {
    Gt[e] = t;
  }
  function ne(e, t, r) {
    let n = {};
    return Array.from(t)
      .map(Yt((o, s) => (n[o] = s)))
      .filter(Jt)
      .map(dn(n, r))
      .sort(pn)
      .map((o) => fn(e, o));
  }
  function Zt(e) {
    return Array.from(e)
      .map(Yt())
      .filter((t) => !Jt(t));
  }
  var at = !1,
    ie = new Map(),
    Qt = Symbol();
  function Xt(e) {
    at = !0;
    let t = Symbol();
    (Qt = t), ie.set(t, []);
    let r = () => {
        for (; ie.get(t).length; ) ie.get(t).shift()();
        ie.delete(t);
      },
      n = () => {
        (at = !1), r();
      };
    e(r), n();
  }
  function fn(e, t) {
    let r = () => {},
      n = Gt[t.type] || r,
      i = [],
      o = (d) => i.push(d),
      [s, a] = It(e);
    i.push(a);
    let c = {
        Alpine: R,
        effect: s,
        cleanup: o,
        evaluateLater: h.bind(h, e),
        evaluate: w.bind(w, e),
      },
      l = () => i.forEach((d) => d());
    Kt(e, t.original, l);
    let u = () => {
      e._x_ignore ||
        e._x_ignoreSelf ||
        (n.inline && n.inline(e, t, c),
        (n = n.bind(n, e, t, c)),
        at ? ie.get(Qt).push(n) : n());
    };
    return (u.runCleanups = l), u;
  }
  var ve =
      (e, t) =>
      ({ name: r, value: n }) => (
        r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }
      ),
    we = (e) => e;
  function Yt(e = () => {}) {
    return ({ name: t, value: r }) => {
      let { name: n, value: i } = er.reduce((o, s) => s(o), {
        name: t,
        value: r,
      });
      return n !== t && e(n, t), { name: n, value: i };
    };
  }
  var er = [];
  function Z(e) {
    er.push(e);
  }
  function Jt({ name: e }) {
    return tr().test(e);
  }
  var tr = () => new RegExp(`^${st}([^:^.]+)\\b`);
  function dn(e, t) {
    return ({ name: r, value: n }) => {
      let i = r.match(tr()),
        o = r.match(/:([a-zA-Z0-9\-:]+)/),
        s = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
        a = t || e[r] || r;
      return {
        type: i ? i[1] : null,
        value: o ? o[1] : null,
        modifiers: s.map((c) => c.replace(".", "")),
        expression: n,
        original: a,
      };
    };
  }
  var ct = "DEFAULT",
    Ee = [
      "ignore",
      "ref",
      "data",
      "id",
      "bind",
      "init",
      "for",
      "model",
      "modelable",
      "transition",
      "show",
      "if",
      ct,
      "teleport",
      "element",
    ];
  function pn(e, t) {
    let r = Ee.indexOf(e.type) === -1 ? ct : e.type,
      n = Ee.indexOf(t.type) === -1 ? ct : t.type;
    return Ee.indexOf(r) - Ee.indexOf(n);
  }
  function z(e, t, r = {}) {
    e.dispatchEvent(
      new CustomEvent(t, {
        detail: r,
        bubbles: !0,
        composed: !0,
        cancelable: !0,
      })
    );
  }
  var lt = [],
    ut = !1;
  function Ae(e) {
    lt.push(e),
      queueMicrotask(() => {
        ut ||
          setTimeout(() => {
            Se();
          });
      });
  }
  function Se() {
    for (ut = !1; lt.length; ) lt.shift()();
  }
  function rr() {
    ut = !0;
  }
  function M(e, t) {
    if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
      Array.from(e.children).forEach((i) => M(i, t));
      return;
    }
    let r = !1;
    if ((t(e, () => (r = !0)), r)) return;
    let n = e.firstElementChild;
    for (; n; ) M(n, t, !1), (n = n.nextElementSibling);
  }
  function B(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t);
  }
  function ir() {
    document.body ||
      B(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
      ),
      z(document, "alpine:init"),
      z(document, "alpine:initializing"),
      Xe(),
      Lt((t) => S(t, M)),
      jt((t) => mn(t)),
      Ft((t, r) => {
        ne(t, r).forEach((n) => n());
      });
    let e = (t) => !V(t.parentElement, !0);
    Array.from(document.querySelectorAll(nr()))
      .filter(e)
      .forEach((t) => {
        S(t);
      }),
      z(document, "alpine:initialized");
  }
  var ft = [],
    or = [];
  function sr() {
    return ft.map((e) => e());
  }
  function nr() {
    return ft.concat(or).map((e) => e());
  }
  function Oe(e) {
    ft.push(e);
  }
  function Te(e) {
    or.push(e);
  }
  function V(e, t = !1) {
    return Q(e, (r) => {
      if ((t ? nr() : sr()).some((i) => r.matches(i))) return !0;
    });
  }
  function Q(e, t) {
    if (!!e) {
      if (t(e)) return e;
      if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
        return Q(e.parentElement, t);
    }
  }
  function ar(e) {
    return sr().some((t) => e.matches(t));
  }
  function S(e, t = M) {
    Xt(() => {
      t(e, (r, n) => {
        ne(r, r.attributes).forEach((i) => i()), r._x_ignore && n();
      });
    });
  }
  function mn(e) {
    M(e, (t) => Ye(t));
  }
  function oe(e, t) {
    return Array.isArray(t)
      ? cr(e, t.join(" "))
      : typeof t == "object" && t !== null
      ? hn(e, t)
      : typeof t == "function"
      ? oe(e, t())
      : cr(e, t);
  }
  function cr(e, t) {
    let r = (o) => o.split(" ").filter(Boolean),
      n = (o) =>
        o
          .split(" ")
          .filter((s) => !e.classList.contains(s))
          .filter(Boolean),
      i = (o) => (
        e.classList.add(...o),
        () => {
          e.classList.remove(...o);
        }
      );
    return (t = t === !0 ? (t = "") : t || ""), i(n(t));
  }
  function hn(e, t) {
    let r = (a) => a.split(" ").filter(Boolean),
      n = Object.entries(t)
        .flatMap(([a, c]) => (c ? r(a) : !1))
        .filter(Boolean),
      i = Object.entries(t)
        .flatMap(([a, c]) => (c ? !1 : r(a)))
        .filter(Boolean),
      o = [],
      s = [];
    return (
      i.forEach((a) => {
        e.classList.contains(a) && (e.classList.remove(a), s.push(a));
      }),
      n.forEach((a) => {
        e.classList.contains(a) || (e.classList.add(a), o.push(a));
      }),
      () => {
        s.forEach((a) => e.classList.add(a)),
          o.forEach((a) => e.classList.remove(a));
      }
    );
  }
  function H(e, t) {
    return typeof t == "object" && t !== null ? _n(e, t) : gn(e, t);
  }
  function _n(e, t) {
    let r = {};
    return (
      Object.entries(t).forEach(([n, i]) => {
        (r[n] = e.style[n]),
          n.startsWith("--") || (n = xn(n)),
          e.style.setProperty(n, i);
      }),
      setTimeout(() => {
        e.style.length === 0 && e.removeAttribute("style");
      }),
      () => {
        H(e, r);
      }
    );
  }
  function gn(e, t) {
    let r = e.getAttribute("style", t);
    return (
      e.setAttribute("style", t),
      () => {
        e.setAttribute("style", r || "");
      }
    );
  }
  function xn(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function se(e, t = () => {}) {
    let r = !1;
    return function () {
      r ? t.apply(this, arguments) : ((r = !0), e.apply(this, arguments));
    };
  }
  p(
    "transition",
    (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
      typeof n == "function" && (n = i(n)), n ? yn(e, n, t) : bn(e, r, t);
    }
  );
  function yn(e, t, r) {
    lr(e, oe, ""),
      {
        enter: (i) => {
          e._x_transition.enter.during = i;
        },
        "enter-start": (i) => {
          e._x_transition.enter.start = i;
        },
        "enter-end": (i) => {
          e._x_transition.enter.end = i;
        },
        leave: (i) => {
          e._x_transition.leave.during = i;
        },
        "leave-start": (i) => {
          e._x_transition.leave.start = i;
        },
        "leave-end": (i) => {
          e._x_transition.leave.end = i;
        },
      }[r](t);
  }
  function bn(e, t, r) {
    lr(e, H);
    let n = !t.includes("in") && !t.includes("out") && !r,
      i = n || t.includes("in") || ["enter"].includes(r),
      o = n || t.includes("out") || ["leave"].includes(r);
    t.includes("in") && !n && (t = t.filter((_, b) => b < t.indexOf("out"))),
      t.includes("out") && !n && (t = t.filter((_, b) => b > t.indexOf("out")));
    let s = !t.includes("opacity") && !t.includes("scale"),
      a = s || t.includes("opacity"),
      c = s || t.includes("scale"),
      l = a ? 0 : 1,
      u = c ? ae(t, "scale", 95) / 100 : 1,
      d = ae(t, "delay", 0),
      x = ae(t, "origin", "center"),
      k = "opacity, transform",
      W = ae(t, "duration", 150) / 1e3,
      pe = ae(t, "duration", 75) / 1e3,
      f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    i &&
      ((e._x_transition.enter.during = {
        transformOrigin: x,
        transitionDelay: d,
        transitionProperty: k,
        transitionDuration: `${W}s`,
        transitionTimingFunction: f,
      }),
      (e._x_transition.enter.start = { opacity: l, transform: `scale(${u})` }),
      (e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
      o &&
        ((e._x_transition.leave.during = {
          transformOrigin: x,
          transitionDelay: d,
          transitionProperty: k,
          transitionDuration: `${pe}s`,
          transitionTimingFunction: f,
        }),
        (e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }),
        (e._x_transition.leave.end = { opacity: l, transform: `scale(${u})` }));
  }
  function lr(e, t, r = {}) {
    e._x_transition ||
      (e._x_transition = {
        enter: { during: r, start: r, end: r },
        leave: { during: r, start: r, end: r },
        in(n = () => {}, i = () => {}) {
          Ce(
            e,
            t,
            {
              during: this.enter.during,
              start: this.enter.start,
              end: this.enter.end,
            },
            n,
            i
          );
        },
        out(n = () => {}, i = () => {}) {
          Ce(
            e,
            t,
            {
              during: this.leave.during,
              start: this.leave.start,
              end: this.leave.end,
            },
            n,
            i
          );
        },
      });
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
    e,
    t,
    r,
    n
  ) {
    let i = () => {
      document.visibilityState === "visible"
        ? requestAnimationFrame(r)
        : setTimeout(r);
    };
    if (t) {
      e._x_transition && (e._x_transition.enter || e._x_transition.leave)
        ? e._x_transition.enter &&
          (Object.entries(e._x_transition.enter.during).length ||
            Object.entries(e._x_transition.enter.start).length ||
            Object.entries(e._x_transition.enter.end).length)
          ? e._x_transition.in(r)
          : i()
        : e._x_transition
        ? e._x_transition.in(r)
        : i();
      return;
    }
    (e._x_hidePromise = e._x_transition
      ? new Promise((o, s) => {
          e._x_transition.out(
            () => {},
            () => o(n)
          ),
            e._x_transitioning.beforeCancel(() =>
              s({ isFromCancelledTransition: !0 })
            );
        })
      : Promise.resolve(n)),
      queueMicrotask(() => {
        let o = ur(e);
        o
          ? (o._x_hideChildren || (o._x_hideChildren = []),
            o._x_hideChildren.push(e))
          : queueMicrotask(() => {
              let s = (a) => {
                let c = Promise.all([
                  a._x_hidePromise,
                  ...(a._x_hideChildren || []).map(s),
                ]).then(([l]) => l());
                return delete a._x_hidePromise, delete a._x_hideChildren, c;
              };
              s(e).catch((a) => {
                if (!a.isFromCancelledTransition) throw a;
              });
            });
      });
  };
  function ur(e) {
    let t = e.parentNode;
    if (!!t) return t._x_hidePromise ? t : ur(t);
  }
  function Ce(
    e,
    t,
    { during: r, start: n, end: i } = {},
    o = () => {},
    s = () => {}
  ) {
    if (
      (e._x_transitioning && e._x_transitioning.cancel(),
      Object.keys(r).length === 0 &&
        Object.keys(n).length === 0 &&
        Object.keys(i).length === 0)
    ) {
      o(), s();
      return;
    }
    let a, c, l;
    vn(e, {
      start() {
        a = t(e, n);
      },
      during() {
        c = t(e, r);
      },
      before: o,
      end() {
        a(), (l = t(e, i));
      },
      after: s,
      cleanup() {
        c(), l();
      },
    });
  }
  function vn(e, t) {
    let r,
      n,
      i,
      o = se(() => {
        m(() => {
          (r = !0),
            n || t.before(),
            i || (t.end(), Se()),
            t.after(),
            e.isConnected && t.cleanup(),
            delete e._x_transitioning;
        });
      });
    (e._x_transitioning = {
      beforeCancels: [],
      beforeCancel(s) {
        this.beforeCancels.push(s);
      },
      cancel: se(function () {
        for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
        o();
      }),
      finish: o,
    }),
      m(() => {
        t.start(), t.during();
      }),
      rr(),
      requestAnimationFrame(() => {
        if (r) return;
        let s =
            Number(
              getComputedStyle(e)
                .transitionDuration.replace(/,.*/, "")
                .replace("s", "")
            ) * 1e3,
          a =
            Number(
              getComputedStyle(e)
                .transitionDelay.replace(/,.*/, "")
                .replace("s", "")
            ) * 1e3;
        s === 0 &&
          (s =
            Number(getComputedStyle(e).animationDuration.replace("s", "")) *
            1e3),
          m(() => {
            t.before();
          }),
          (n = !0),
          requestAnimationFrame(() => {
            r ||
              (m(() => {
                t.end();
              }),
              Se(),
              setTimeout(e._x_transitioning.finish, s + a),
              (i = !0));
          });
      });
  }
  function ae(e, t, r) {
    if (e.indexOf(t) === -1) return r;
    let n = e[e.indexOf(t) + 1];
    if (!n || (t === "scale" && isNaN(n))) return r;
    if (t === "duration") {
      let i = n.match(/([0-9]+)ms/);
      if (i) return i[1];
    }
    return t === "origin" &&
      ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2])
      ? [n, e[e.indexOf(t) + 2]].join(" ")
      : n;
  }
  var dt = !1;
  function $(e, t = () => {}) {
    return (...r) => (dt ? t(...r) : e(...r));
  }
  function fr(e, t) {
    t._x_dataStack || (t._x_dataStack = e._x_dataStack),
      (dt = !0),
      En(() => {
        wn(t);
      }),
      (dt = !1);
  }
  function wn(e) {
    let t = !1;
    S(e, (n, i) => {
      M(n, (o, s) => {
        if (t && ar(o)) return s();
        (t = !0), i(o, s);
      });
    });
  }
  function En(e) {
    let t = I;
    Ge((r, n) => {
      let i = t(r);
      return Y(i), () => {};
    }),
      e(),
      Ge(t);
  }
  function ce(e, t, r, n = []) {
    switch (
      (e._x_bindings || (e._x_bindings = O({})),
      (e._x_bindings[t] = r),
      (t = n.includes("camel") ? Cn(t) : t),
      t)
    ) {
      case "value":
        Sn(e, r);
        break;
      case "style":
        On(e, r);
        break;
      case "class":
        An(e, r);
        break;
      default:
        Tn(e, t, r);
        break;
    }
  }
  function Sn(e, t) {
    if (e.type === "radio")
      e.attributes.value === void 0 && (e.value = t),
        window.fromModel && (e.checked = dr(e.value, t));
    else if (e.type === "checkbox")
      Number.isInteger(t)
        ? (e.value = t)
        : !Number.isInteger(t) &&
          !Array.isArray(t) &&
          typeof t != "boolean" &&
          ![null, void 0].includes(t)
        ? (e.value = String(t))
        : Array.isArray(t)
        ? (e.checked = t.some((r) => dr(r, e.value)))
        : (e.checked = !!t);
    else if (e.tagName === "SELECT") Rn(e, t);
    else {
      if (e.value === t) return;
      e.value = t;
    }
  }
  function An(e, t) {
    e._x_undoAddedClasses && e._x_undoAddedClasses(),
      (e._x_undoAddedClasses = oe(e, t));
  }
  function On(e, t) {
    e._x_undoAddedStyles && e._x_undoAddedStyles(),
      (e._x_undoAddedStyles = H(e, t));
  }
  function Tn(e, t, r) {
    [null, void 0, !1].includes(r) && Nn(t)
      ? e.removeAttribute(t)
      : (pr(t) && (r = t), Mn(e, t, r));
  }
  function Mn(e, t, r) {
    e.getAttribute(t) != r && e.setAttribute(t, r);
  }
  function Rn(e, t) {
    let r = [].concat(t).map((n) => n + "");
    Array.from(e.options).forEach((n) => {
      n.selected = r.includes(n.value);
    });
  }
  function Cn(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
  }
  function dr(e, t) {
    return e == t;
  }
  function pr(e) {
    return [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule",
    ].includes(e);
  }
  function Nn(e) {
    return ![
      "aria-pressed",
      "aria-checked",
      "aria-expanded",
      "aria-selected",
    ].includes(e);
  }
  function mr(e, t, r) {
    if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
    let n = e.getAttribute(t);
    return n === null
      ? typeof r == "function"
        ? r()
        : r
      : pr(t)
      ? !![t, "true"].includes(n)
      : n === ""
      ? !0
      : n;
  }
  function Re(e, t) {
    var r;
    return function () {
      var n = this,
        i = arguments,
        o = function () {
          (r = null), e.apply(n, i);
        };
      clearTimeout(r), (r = setTimeout(o, t));
    };
  }
  function Me(e, t) {
    let r;
    return function () {
      let n = this,
        i = arguments;
      r || (e.apply(n, i), (r = !0), setTimeout(() => (r = !1), t));
    };
  }
  function hr(e) {
    e(R);
  }
  var q = {},
    _r = !1;
  function gr(e, t) {
    if ((_r || ((q = O(q)), (_r = !0)), t === void 0)) return q[e];
    (q[e] = t),
      typeof t == "object" &&
        t !== null &&
        t.hasOwnProperty("init") &&
        typeof t.init == "function" &&
        q[e].init(),
      xe(q[e]);
  }
  function xr() {
    return q;
  }
  var yr = {};
  function br(e, t) {
    yr[e] = typeof t != "function" ? () => t : t;
  }
  function vr(e) {
    return (
      Object.entries(yr).forEach(([t, r]) => {
        Object.defineProperty(e, t, {
          get() {
            return (...n) => r(...n);
          },
        });
      }),
      e
    );
  }
  var wr = {};
  function Er(e, t) {
    wr[e] = t;
  }
  function Sr(e, t) {
    return (
      Object.entries(wr).forEach(([r, n]) => {
        Object.defineProperty(e, r, {
          get() {
            return (...i) => n.bind(t)(...i);
          },
          enumerable: !1,
        });
      }),
      e
    );
  }
  var kn = {
      get reactive() {
        return O;
      },
      get release() {
        return Y;
      },
      get effect() {
        return I;
      },
      get raw() {
        return Ue;
      },
      version: "3.9.0",
      flushAndStopDeferringMutations: Bt,
      disableEffectScheduling: Nt,
      setReactivityEngine: kt,
      closestDataStack: P,
      skipDuringClone: $,
      addRootSelector: Oe,
      addInitSelector: Te,
      addScopeToNode: C,
      deferMutations: zt,
      mapAttributes: Z,
      evaluateLater: h,
      setEvaluator: Ut,
      mergeProxies: D,
      findClosest: Q,
      closestRoot: V,
      interceptor: ye,
      transition: Ce,
      setStyles: H,
      mutateDom: m,
      directive: p,
      throttle: Me,
      debounce: Re,
      evaluate: w,
      initTree: S,
      nextTick: Ae,
      prefixed: E,
      prefix: Wt,
      plugin: hr,
      magic: y,
      store: gr,
      start: ir,
      clone: fr,
      bound: mr,
      $data: ge,
      data: Er,
      bind: br,
    },
    R = kn;
  function pt(e, t) {
    let r = Object.create(null),
      n = e.split(",");
    for (let i = 0; i < n.length; i++) r[n[i]] = !0;
    return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
  }
  var Go = {
      [1]: "TEXT",
      [2]: "CLASS",
      [4]: "STYLE",
      [8]: "PROPS",
      [16]: "FULL_PROPS",
      [32]: "HYDRATE_EVENTS",
      [64]: "STABLE_FRAGMENT",
      [128]: "KEYED_FRAGMENT",
      [256]: "UNKEYED_FRAGMENT",
      [512]: "NEED_PATCH",
      [1024]: "DYNAMIC_SLOTS",
      [2048]: "DEV_ROOT_FRAGMENT",
      [-1]: "HOISTED",
      [-2]: "BAIL",
    },
    Yo = { [1]: "STABLE", [2]: "DYNAMIC", [3]: "FORWARDED" };
  var In =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var Jo = pt(
    In +
      ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
  );
  var Ar = Object.freeze({}),
    Zo = Object.freeze([]);
  var mt = Object.assign;
  var Pn = Object.prototype.hasOwnProperty,
    le = (e, t) => Pn.call(e, t),
    L = Array.isArray,
    X = (e) => Or(e) === "[object Map]";
  var Dn = (e) => typeof e == "string",
    Ne = (e) => typeof e == "symbol",
    ue = (e) => e !== null && typeof e == "object";
  var $n = Object.prototype.toString,
    Or = (e) => $n.call(e),
    ht = (e) => Or(e).slice(8, -1);
  var ke = (e) =>
    Dn(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
  var Ie = (e) => {
      let t = Object.create(null);
      return (r) => t[r] || (t[r] = e(r));
    },
    Ln = /-(\w)/g,
    Qo = Ie((e) => e.replace(Ln, (t, r) => (r ? r.toUpperCase() : ""))),
    jn = /\B([A-Z])/g,
    Xo = Ie((e) => e.replace(jn, "-$1").toLowerCase()),
    _t = Ie((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    es = Ie((e) => (e ? `on${_t(e)}` : "")),
    gt = (e, t) => e !== t && (e === e || t === t);
  var xt = new WeakMap(),
    fe = [],
    N,
    U = Symbol("iterate"),
    yt = Symbol("Map key iterate");
  function Fn(e) {
    return e && e._isEffect === !0;
  }
  function Tr(e, t = Ar) {
    Fn(e) && (e = e.raw);
    let r = Kn(e, t);
    return t.lazy || r(), r;
  }
  function Rr(e) {
    e.active &&
      (Cr(e), e.options.onStop && e.options.onStop(), (e.active = !1));
  }
  var zn = 0;
  function Kn(e, t) {
    let r = function () {
      if (!r.active) return e();
      if (!fe.includes(r)) {
        Cr(r);
        try {
          return Bn(), fe.push(r), (N = r), e();
        } finally {
          fe.pop(), Mr(), (N = fe[fe.length - 1]);
        }
      }
    };
    return (
      (r.id = zn++),
      (r.allowRecurse = !!t.allowRecurse),
      (r._isEffect = !0),
      (r.active = !0),
      (r.raw = e),
      (r.deps = []),
      (r.options = t),
      r
    );
  }
  function Cr(e) {
    let { deps: t } = e;
    if (t.length) {
      for (let r = 0; r < t.length; r++) t[r].delete(e);
      t.length = 0;
    }
  }
  var ee = !0,
    bt = [];
  function Vn() {
    bt.push(ee), (ee = !1);
  }
  function Bn() {
    bt.push(ee), (ee = !0);
  }
  function Mr() {
    let e = bt.pop();
    ee = e === void 0 ? !0 : e;
  }
  function T(e, t, r) {
    if (!ee || N === void 0) return;
    let n = xt.get(e);
    n || xt.set(e, (n = new Map()));
    let i = n.get(r);
    i || n.set(r, (i = new Set())),
      i.has(N) ||
        (i.add(N),
        N.deps.push(i),
        N.options.onTrack &&
          N.options.onTrack({ effect: N, target: e, type: t, key: r }));
  }
  function j(e, t, r, n, i, o) {
    let s = xt.get(e);
    if (!s) return;
    let a = new Set(),
      c = (u) => {
        u &&
          u.forEach((d) => {
            (d !== N || d.allowRecurse) && a.add(d);
          });
      };
    if (t === "clear") s.forEach(c);
    else if (r === "length" && L(e))
      s.forEach((u, d) => {
        (d === "length" || d >= n) && c(u);
      });
    else
      switch ((r !== void 0 && c(s.get(r)), t)) {
        case "add":
          L(e)
            ? ke(r) && c(s.get("length"))
            : (c(s.get(U)), X(e) && c(s.get(yt)));
          break;
        case "delete":
          L(e) || (c(s.get(U)), X(e) && c(s.get(yt)));
          break;
        case "set":
          X(e) && c(s.get(U));
          break;
      }
    let l = (u) => {
      u.options.onTrigger &&
        u.options.onTrigger({
          effect: u,
          target: e,
          key: r,
          type: t,
          newValue: n,
          oldValue: i,
          oldTarget: o,
        }),
        u.options.scheduler ? u.options.scheduler(u) : u();
    };
    a.forEach(l);
  }
  var Hn = pt("__proto__,__v_isRef,__isVue"),
    Nr = new Set(
      Object.getOwnPropertyNames(Symbol)
        .map((e) => Symbol[e])
        .filter(Ne)
    ),
    qn = Pe(),
    Un = Pe(!1, !0),
    Wn = Pe(!0),
    Gn = Pe(!0, !0),
    De = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    let t = Array.prototype[e];
    De[e] = function (...r) {
      let n = g(this);
      for (let o = 0, s = this.length; o < s; o++) T(n, "get", o + "");
      let i = t.apply(n, r);
      return i === -1 || i === !1 ? t.apply(n, r.map(g)) : i;
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    let t = Array.prototype[e];
    De[e] = function (...r) {
      Vn();
      let n = t.apply(this, r);
      return Mr(), n;
    };
  });
  function Pe(e = !1, t = !1) {
    return function (n, i, o) {
      if (i === "__v_isReactive") return !e;
      if (i === "__v_isReadonly") return e;
      if (i === "__v_raw" && o === (e ? (t ? Jn : Ir) : t ? Yn : kr).get(n))
        return n;
      let s = L(n);
      if (!e && s && le(De, i)) return Reflect.get(De, i, o);
      let a = Reflect.get(n, i, o);
      return (Ne(i) ? Nr.has(i) : Hn(i)) || (e || T(n, "get", i), t)
        ? a
        : vt(a)
        ? !s || !ke(i)
          ? a.value
          : a
        : ue(a)
        ? e
          ? Pr(a)
          : $e(a)
        : a;
    };
  }
  var Zn = Dr(),
    Qn = Dr(!0);
  function Dr(e = !1) {
    return function (r, n, i, o) {
      let s = r[n];
      if (!e && ((i = g(i)), (s = g(s)), !L(r) && vt(s) && !vt(i)))
        return (s.value = i), !0;
      let a = L(r) && ke(n) ? Number(n) < r.length : le(r, n),
        c = Reflect.set(r, n, i, o);
      return (
        r === g(o) &&
          (a ? gt(i, s) && j(r, "set", n, i, s) : j(r, "add", n, i)),
        c
      );
    };
  }
  function Xn(e, t) {
    let r = le(e, t),
      n = e[t],
      i = Reflect.deleteProperty(e, t);
    return i && r && j(e, "delete", t, void 0, n), i;
  }
  function ei(e, t) {
    let r = Reflect.has(e, t);
    return (!Ne(t) || !Nr.has(t)) && T(e, "has", t), r;
  }
  function ti(e) {
    return T(e, "iterate", L(e) ? "length" : U), Reflect.ownKeys(e);
  }
  var $r = { get: qn, set: Zn, deleteProperty: Xn, has: ei, ownKeys: ti },
    Lr = {
      get: Wn,
      set(e, t) {
        return (
          console.warn(
            `Set operation on key "${String(t)}" failed: target is readonly.`,
            e
          ),
          !0
        );
      },
      deleteProperty(e, t) {
        return (
          console.warn(
            `Delete operation on key "${String(
              t
            )}" failed: target is readonly.`,
            e
          ),
          !0
        );
      },
    },
    ss = mt({}, $r, { get: Un, set: Qn }),
    as = mt({}, Lr, { get: Gn }),
    wt = (e) => (ue(e) ? $e(e) : e),
    Et = (e) => (ue(e) ? Pr(e) : e),
    St = (e) => e,
    Le = (e) => Reflect.getPrototypeOf(e);
  function je(e, t, r = !1, n = !1) {
    e = e.__v_raw;
    let i = g(e),
      o = g(t);
    t !== o && !r && T(i, "get", t), !r && T(i, "get", o);
    let { has: s } = Le(i),
      a = n ? St : r ? Et : wt;
    if (s.call(i, t)) return a(e.get(t));
    if (s.call(i, o)) return a(e.get(o));
    e !== i && e.get(t);
  }
  function Fe(e, t = !1) {
    let r = this.__v_raw,
      n = g(r),
      i = g(e);
    return (
      e !== i && !t && T(n, "has", e),
      !t && T(n, "has", i),
      e === i ? r.has(e) : r.has(e) || r.has(i)
    );
  }
  function Ke(e, t = !1) {
    return (
      (e = e.__v_raw), !t && T(g(e), "iterate", U), Reflect.get(e, "size", e)
    );
  }
  function jr(e) {
    e = g(e);
    let t = g(this);
    return Le(t).has.call(t, e) || (t.add(e), j(t, "add", e, e)), this;
  }
  function Kr(e, t) {
    t = g(t);
    let r = g(this),
      { has: n, get: i } = Le(r),
      o = n.call(r, e);
    o ? Fr(r, n, e) : ((e = g(e)), (o = n.call(r, e)));
    let s = i.call(r, e);
    return (
      r.set(e, t),
      o ? gt(t, s) && j(r, "set", e, t, s) : j(r, "add", e, t),
      this
    );
  }
  function zr(e) {
    let t = g(this),
      { has: r, get: n } = Le(t),
      i = r.call(t, e);
    i ? Fr(t, r, e) : ((e = g(e)), (i = r.call(t, e)));
    let o = n ? n.call(t, e) : void 0,
      s = t.delete(e);
    return i && j(t, "delete", e, void 0, o), s;
  }
  function Br() {
    let e = g(this),
      t = e.size !== 0,
      r = X(e) ? new Map(e) : new Set(e),
      n = e.clear();
    return t && j(e, "clear", void 0, void 0, r), n;
  }
  function ze(e, t) {
    return function (n, i) {
      let o = this,
        s = o.__v_raw,
        a = g(s),
        c = t ? St : e ? Et : wt;
      return (
        !e && T(a, "iterate", U), s.forEach((l, u) => n.call(i, c(l), c(u), o))
      );
    };
  }
  function Be(e, t, r) {
    return function (...n) {
      let i = this.__v_raw,
        o = g(i),
        s = X(o),
        a = e === "entries" || (e === Symbol.iterator && s),
        c = e === "keys" && s,
        l = i[e](...n),
        u = r ? St : t ? Et : wt;
      return (
        !t && T(o, "iterate", c ? yt : U),
        {
          next() {
            let { value: d, done: x } = l.next();
            return x
              ? { value: d, done: x }
              : { value: a ? [u(d[0]), u(d[1])] : u(d), done: x };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function F(e) {
    return function (...t) {
      {
        let r = t[0] ? `on key "${t[0]}" ` : "";
        console.warn(
          `${_t(e)} operation ${r}failed: target is readonly.`,
          g(this)
        );
      }
      return e === "delete" ? !1 : this;
    };
  }
  var Vr = {
      get(e) {
        return je(this, e);
      },
      get size() {
        return Ke(this);
      },
      has: Fe,
      add: jr,
      set: Kr,
      delete: zr,
      clear: Br,
      forEach: ze(!1, !1),
    },
    Hr = {
      get(e) {
        return je(this, e, !1, !0);
      },
      get size() {
        return Ke(this);
      },
      has: Fe,
      add: jr,
      set: Kr,
      delete: zr,
      clear: Br,
      forEach: ze(!1, !0),
    },
    qr = {
      get(e) {
        return je(this, e, !0);
      },
      get size() {
        return Ke(this, !0);
      },
      has(e) {
        return Fe.call(this, e, !0);
      },
      add: F("add"),
      set: F("set"),
      delete: F("delete"),
      clear: F("clear"),
      forEach: ze(!0, !1),
    },
    Ur = {
      get(e) {
        return je(this, e, !0, !0);
      },
      get size() {
        return Ke(this, !0);
      },
      has(e) {
        return Fe.call(this, e, !0);
      },
      add: F("add"),
      set: F("set"),
      delete: F("delete"),
      clear: F("clear"),
      forEach: ze(!0, !0),
    },
    ri = ["keys", "values", "entries", Symbol.iterator];
  ri.forEach((e) => {
    (Vr[e] = Be(e, !1, !1)),
      (qr[e] = Be(e, !0, !1)),
      (Hr[e] = Be(e, !1, !0)),
      (Ur[e] = Be(e, !0, !0));
  });
  function Ve(e, t) {
    let r = t ? (e ? Ur : Hr) : e ? qr : Vr;
    return (n, i, o) =>
      i === "__v_isReactive"
        ? !e
        : i === "__v_isReadonly"
        ? e
        : i === "__v_raw"
        ? n
        : Reflect.get(le(r, i) && i in n ? r : n, i, o);
  }
  var ni = { get: Ve(!1, !1) },
    cs = { get: Ve(!1, !0) },
    ii = { get: Ve(!0, !1) },
    ls = { get: Ve(!0, !0) };
  function Fr(e, t, r) {
    let n = g(r);
    if (n !== r && t.call(e, n)) {
      let i = ht(e);
      console.warn(
        `Reactive ${i} contains both the raw and reactive versions of the same object${
          i === "Map" ? " as keys" : ""
        }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
      );
    }
  }
  var kr = new WeakMap(),
    Yn = new WeakMap(),
    Ir = new WeakMap(),
    Jn = new WeakMap();
  function oi(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function si(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(ht(e));
  }
  function $e(e) {
    return e && e.__v_isReadonly ? e : Wr(e, !1, $r, ni, kr);
  }
  function Pr(e) {
    return Wr(e, !0, Lr, ii, Ir);
  }
  function Wr(e, t, r, n, i) {
    if (!ue(e))
      return console.warn(`value cannot be made reactive: ${String(e)}`), e;
    if (e.__v_raw && !(t && e.__v_isReactive)) return e;
    let o = i.get(e);
    if (o) return o;
    let s = si(e);
    if (s === 0) return e;
    let a = new Proxy(e, s === 2 ? n : r);
    return i.set(e, a), a;
  }
  function g(e) {
    return (e && g(e.__v_raw)) || e;
  }
  function vt(e) {
    return Boolean(e && e.__v_isRef === !0);
  }
  y("nextTick", () => Ae);
  y("dispatch", (e) => z.bind(z, e));
  y("watch", (e) => (t, r) => {
    let n = h(e, t),
      i = !0,
      o;
    I(() =>
      n((s) => {
        JSON.stringify(s),
          i
            ? (o = s)
            : queueMicrotask(() => {
                r(s, o), (o = s);
              }),
          (i = !1);
      })
    );
  });
  y("store", xr);
  y("data", (e) => ge(e));
  y("root", (e) => V(e));
  y(
    "refs",
    (e) => (e._x_refs_proxy || (e._x_refs_proxy = D(ai(e))), e._x_refs_proxy)
  );
  function ai(e) {
    let t = [],
      r = e;
    for (; r; ) r._x_refs && t.push(r._x_refs), (r = r.parentNode);
    return t;
  }
  var At = {};
  function Ot(e) {
    return At[e] || (At[e] = 0), ++At[e];
  }
  function Gr(e, t) {
    return Q(e, (r) => {
      if (r._x_ids && r._x_ids[t]) return !0;
    });
  }
  function Yr(e, t) {
    e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Ot(t));
  }
  y("id", (e) => (t, r = null) => {
    let n = Gr(e, t),
      i = n ? n._x_ids[t] : Ot(t);
    return r ? `${t}-${i}-${r}` : `${t}-${i}`;
  });
  y("el", (e) => e);
  p(
    "modelable",
    (e, { expression: t }, { effect: r, evaluate: n, evaluateLater: i }) => {
      let o = i(t),
        s = () => {
          let u;
          return o((d) => (u = d)), u;
        },
        a = i(`${t} = __placeholder`),
        c = (u) => a(() => {}, { scope: { __placeholder: u } }),
        l = s();
      e._x_modelable_hook && (l = e._x_modelable_hook(l)),
        c(l),
        queueMicrotask(() => {
          if (!e._x_model) return;
          let u = e._x_model.get,
            d = e._x_model.set;
          r(() => c(u())), r(() => d(s()));
        });
    }
  );
  p("teleport", (e, { expression: t }, { cleanup: r }) => {
    e.tagName.toLowerCase() !== "template" &&
      B("x-teleport can only be used on a <template> tag", e);
    let n = document.querySelector(t);
    n || B(`Cannot find x-teleport element for selector: "${t}"`);
    let i = e.content.cloneNode(!0).firstElementChild;
    (e._x_teleport = i),
      (i._x_teleportBack = e),
      e._x_forwardEvents &&
        e._x_forwardEvents.forEach((o) => {
          i.addEventListener(o, (s) => {
            s.stopPropagation(), e.dispatchEvent(new s.constructor(s.type, s));
          });
        }),
      C(i, {}, e),
      m(() => {
        n.appendChild(i), S(i), (i._x_ignore = !0);
      }),
      r(() => i.remove());
  });
  var Jr = () => {};
  Jr.inline = (e, { modifiers: t }, { cleanup: r }) => {
    t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
      r(() => {
        t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
      });
  };
  p("ignore", Jr);
  p("effect", (e, { expression: t }, { effect: r }) => r(h(e, t)));
  function de(e, t, r, n) {
    let i = e,
      o = (c) => n(c),
      s = {},
      a = (c, l) => (u) => l(c, u);
    if (
      (r.includes("dot") && (t = ci(t)),
      r.includes("camel") && (t = li(t)),
      r.includes("passive") && (s.passive = !0),
      r.includes("capture") && (s.capture = !0),
      r.includes("window") && (i = window),
      r.includes("document") && (i = document),
      r.includes("prevent") &&
        (o = a(o, (c, l) => {
          l.preventDefault(), c(l);
        })),
      r.includes("stop") &&
        (o = a(o, (c, l) => {
          l.stopPropagation(), c(l);
        })),
      r.includes("self") &&
        (o = a(o, (c, l) => {
          l.target === e && c(l);
        })),
      (r.includes("away") || r.includes("outside")) &&
        ((i = document),
        (o = a(o, (c, l) => {
          e.contains(l.target) ||
            (e.offsetWidth < 1 && e.offsetHeight < 1) ||
            (e._x_isShown !== !1 && c(l));
        }))),
      (o = a(o, (c, l) => {
        (ui(t) && fi(l, r)) || c(l);
      })),
      r.includes("debounce"))
    ) {
      let c = r[r.indexOf("debounce") + 1] || "invalid-wait",
        l = Tt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
      o = Re(o, l);
    }
    if (r.includes("throttle")) {
      let c = r[r.indexOf("throttle") + 1] || "invalid-wait",
        l = Tt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
      o = Me(o, l);
    }
    return (
      r.includes("once") &&
        (o = a(o, (c, l) => {
          c(l), i.removeEventListener(t, o, s);
        })),
      i.addEventListener(t, o, s),
      () => {
        i.removeEventListener(t, o, s);
      }
    );
  }
  function ci(e) {
    return e.replace(/-/g, ".");
  }
  function li(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
  }
  function Tt(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  function di(e) {
    return e
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[_\s]/, "-")
      .toLowerCase();
  }
  function ui(e) {
    return ["keydown", "keyup"].includes(e);
  }
  function fi(e, t) {
    let r = t.filter(
      (o) => !["window", "document", "prevent", "stop", "once"].includes(o)
    );
    if (r.includes("debounce")) {
      let o = r.indexOf("debounce");
      r.splice(o, Tt((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (r.length === 0 || (r.length === 1 && Zr(e.key).includes(r[0])))
      return !1;
    let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) =>
      r.includes(o)
    );
    return (
      (r = r.filter((o) => !i.includes(o))),
      !(
        i.length > 0 &&
        i.filter(
          (s) => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])
        ).length === i.length &&
        Zr(e.key).includes(r[0])
      )
    );
  }
  function Zr(e) {
    if (!e) return [];
    e = di(e);
    let t = {
      ctrl: "control",
      slash: "/",
      space: "-",
      spacebar: "-",
      cmd: "meta",
      esc: "escape",
      up: "arrow-up",
      down: "arrow-down",
      left: "arrow-left",
      right: "arrow-right",
      period: ".",
      equal: "=",
    };
    return (
      (t[e] = e),
      Object.keys(t)
        .map((r) => {
          if (t[r] === e) return r;
        })
        .filter((r) => r)
    );
  }
  p(
    "model",
    (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
      let o = h(e, r),
        s = `${r} = rightSideOfExpression($event, ${r})`,
        a = h(e, s);
      var c =
        e.tagName.toLowerCase() === "select" ||
        ["checkbox", "radio"].includes(e.type) ||
        t.includes("lazy")
          ? "change"
          : "input";
      let l = pi(e, t, r),
        u = de(e, c, t, (x) => {
          a(() => {}, { scope: { $event: x, rightSideOfExpression: l } });
        });
      i(() => u());
      let d = h(e, `${r} = __placeholder`);
      (e._x_model = {
        get() {
          let x;
          return o((k) => (x = k)), x;
        },
        set(x) {
          d(() => {}, { scope: { __placeholder: x } });
        },
      }),
        (e._x_forceModelUpdate = () => {
          o((x) => {
            x === void 0 && r.match(/\./) && (x = ""),
              (window.fromModel = !0),
              m(() => ce(e, "value", x)),
              delete window.fromModel;
          });
        }),
        n(() => {
          (t.includes("unintrusive") && document.activeElement.isSameNode(e)) ||
            e._x_forceModelUpdate();
        });
    }
  );
  function pi(e, t, r) {
    return (
      e.type === "radio" &&
        m(() => {
          e.hasAttribute("name") || e.setAttribute("name", r);
        }),
      (n, i) =>
        m(() => {
          if (n instanceof CustomEvent && n.detail !== void 0)
            return n.detail || n.target.value;
          if (e.type === "checkbox")
            if (Array.isArray(i)) {
              let o = t.includes("number")
                ? Ct(n.target.value)
                : n.target.value;
              return n.target.checked
                ? i.concat([o])
                : i.filter((s) => !mi(s, o));
            } else return n.target.checked;
          else {
            if (e.tagName.toLowerCase() === "select" && e.multiple)
              return t.includes("number")
                ? Array.from(n.target.selectedOptions).map((o) => {
                    let s = o.value || o.text;
                    return Ct(s);
                  })
                : Array.from(n.target.selectedOptions).map(
                    (o) => o.value || o.text
                  );
            {
              let o = n.target.value;
              return t.includes("number")
                ? Ct(o)
                : t.includes("trim")
                ? o.trim()
                : o;
            }
          }
        })
    );
  }
  function Ct(e) {
    let t = e ? parseFloat(e) : null;
    return hi(t) ? t : e;
  }
  function mi(e, t) {
    return e == t;
  }
  function hi(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  p("cloak", (e) =>
    queueMicrotask(() => m(() => e.removeAttribute(E("cloak"))))
  );
  Te(() => `[${E("init")}]`);
  p(
    "init",
    $((e, { expression: t }) =>
      typeof t == "string" ? !!t.trim() && w(e, t, {}, !1) : w(e, t, {}, !1)
    )
  );
  p("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let i = n(t);
    r(() => {
      i((o) => {
        m(() => {
          e.textContent = o;
        });
      });
    });
  });
  p("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let i = n(t);
    r(() => {
      i((o) => {
        e.innerHTML = o;
      });
    });
  });
  Z(ve(":", we(E("bind:"))));
  p(
    "bind",
    (
      e,
      { value: t, modifiers: r, expression: n, original: i },
      { effect: o }
    ) => {
      if (!t) return _i(e, n, i, o);
      if (t === "key") return gi(e, n);
      let s = h(e, n);
      o(() =>
        s((a) => {
          a === void 0 && n.match(/\./) && (a = ""), m(() => ce(e, t, a, r));
        })
      );
    }
  );
  function _i(e, t, r, n) {
    let i = {};
    vr(i);
    let o = h(e, t),
      s = [];
    for (; s.length; ) s.pop()();
    o(
      (a) => {
        let c = Object.entries(a).map(([u, d]) => ({ name: u, value: d })),
          l = Zt(c);
        (c = c.map((u) =>
          l.find((d) => d.name === u.name)
            ? { name: `x-bind:${u.name}`, value: `"${u.value}"` }
            : u
        )),
          ne(e, c, r).map((u) => {
            s.push(u.runCleanups), u();
          });
      },
      { scope: i }
    );
  }
  function gi(e, t) {
    e._x_keyExpression = t;
  }
  Oe(() => `[${E("data")}]`);
  p(
    "data",
    $((e, { expression: t }, { cleanup: r }) => {
      t = t === "" ? "{}" : t;
      let n = {};
      re(n, e);
      let i = {};
      Sr(i, n);
      let o = w(e, t, { scope: i });
      o === void 0 && (o = {}), re(o, e);
      let s = O(o);
      xe(s);
      let a = C(e, s);
      s.init && w(e, s.init),
        r(() => {
          a(), s.destroy && w(e, s.destroy);
        });
    })
  );
  p("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
    let i = h(e, r),
      o = () =>
        m(() => {
          (e.style.display = "none"), (e._x_isShown = !1);
        }),
      s = () =>
        m(() => {
          e.style.length === 1 && e.style.display === "none"
            ? e.removeAttribute("style")
            : e.style.removeProperty("display"),
            (e._x_isShown = !0);
        }),
      a = () => setTimeout(s),
      c = se(
        (d) => (d ? s() : o()),
        (d) => {
          typeof e._x_toggleAndCascadeWithTransitions == "function"
            ? e._x_toggleAndCascadeWithTransitions(e, d, s, o)
            : d
            ? a()
            : o();
        }
      ),
      l,
      u = !0;
    n(() =>
      i((d) => {
        (!u && d === l) ||
          (t.includes("immediate") && (d ? a() : o()), c(d), (l = d), (u = !1));
      })
    );
  });
  p("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
    let i = yi(t),
      o = h(e, i.items),
      s = h(e, e._x_keyExpression || "index");
    (e._x_prevKeys = []),
      (e._x_lookup = {}),
      r(() => xi(e, i, o, s)),
      n(() => {
        Object.values(e._x_lookup).forEach((a) => a.remove()),
          delete e._x_prevKeys,
          delete e._x_lookup;
      });
  });
  function xi(e, t, r, n) {
    let i = (s) => typeof s == "object" && !Array.isArray(s),
      o = e;
    r((s) => {
      bi(s) && s >= 0 && (s = Array.from(Array(s).keys(), (f) => f + 1)),
        s === void 0 && (s = []);
      let a = e._x_lookup,
        c = e._x_prevKeys,
        l = [],
        u = [];
      if (i(s))
        s = Object.entries(s).map(([f, _]) => {
          let b = Qr(t, _, f, s);
          n((v) => u.push(v), { scope: { index: f, ...b } }), l.push(b);
        });
      else
        for (let f = 0; f < s.length; f++) {
          let _ = Qr(t, s[f], f, s);
          n((b) => u.push(b), { scope: { index: f, ..._ } }), l.push(_);
        }
      let d = [],
        x = [],
        k = [],
        W = [];
      for (let f = 0; f < c.length; f++) {
        let _ = c[f];
        u.indexOf(_) === -1 && k.push(_);
      }
      c = c.filter((f) => !k.includes(f));
      let pe = "template";
      for (let f = 0; f < u.length; f++) {
        let _ = u[f],
          b = c.indexOf(_);
        if (b === -1) c.splice(f, 0, _), d.push([pe, f]);
        else if (b !== f) {
          let v = c.splice(f, 1)[0],
            A = c.splice(b - 1, 1)[0];
          c.splice(f, 0, A), c.splice(b, 0, v), x.push([v, A]);
        } else W.push(_);
        pe = _;
      }
      for (let f = 0; f < k.length; f++) {
        let _ = k[f];
        a[_]._x_effects && a[_]._x_effects.forEach(he),
          a[_].remove(),
          (a[_] = null),
          delete a[_];
      }
      for (let f = 0; f < x.length; f++) {
        let [_, b] = x[f],
          v = a[_],
          A = a[b],
          G = document.createElement("div");
        m(() => {
          A.after(G),
            v.after(A),
            A._x_currentIfEl && A.after(A._x_currentIfEl),
            G.before(v),
            v._x_currentIfEl && v.after(v._x_currentIfEl),
            G.remove();
        }),
          rt(A, l[u.indexOf(b)]);
      }
      for (let f = 0; f < d.length; f++) {
        let [_, b] = d[f],
          v = _ === "template" ? o : a[_];
        v._x_currentIfEl && (v = v._x_currentIfEl);
        let A = l[b],
          G = u[b],
          me = document.importNode(o.content, !0).firstElementChild;
        C(me, O(A), o),
          m(() => {
            v.after(me), S(me);
          }),
          typeof G == "object" &&
            B(
              "x-for key cannot be an object, it must be a string or an integer",
              o
            ),
          (a[G] = me);
      }
      for (let f = 0; f < W.length; f++) rt(a[W[f]], l[u.indexOf(W[f])]);
      o._x_prevKeys = u;
    });
  }
  function yi(e) {
    let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
      r = /^\s*\(|\)\s*$/g,
      n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
      i = e.match(n);
    if (!i) return;
    let o = {};
    o.items = i[2].trim();
    let s = i[1].replace(r, "").trim(),
      a = s.match(t);
    return (
      a
        ? ((o.item = s.replace(t, "").trim()),
          (o.index = a[1].trim()),
          a[2] && (o.collection = a[2].trim()))
        : (o.item = s),
      o
    );
  }
  function Qr(e, t, r, n) {
    let i = {};
    return (
      /^\[.*\]$/.test(e.item) && Array.isArray(t)
        ? e.item
            .replace("[", "")
            .replace("]", "")
            .split(",")
            .map((s) => s.trim())
            .forEach((s, a) => {
              i[s] = t[a];
            })
        : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object"
        ? e.item
            .replace("{", "")
            .replace("}", "")
            .split(",")
            .map((s) => s.trim())
            .forEach((s) => {
              i[s] = t[s];
            })
        : (i[e.item] = t),
      e.index && (i[e.index] = r),
      e.collection && (i[e.collection] = n),
      i
    );
  }
  function bi(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  function Xr() {}
  Xr.inline = (e, { expression: t }, { cleanup: r }) => {
    let n = V(e);
    n._x_refs || (n._x_refs = {}),
      (n._x_refs[t] = e),
      r(() => delete n._x_refs[t]);
  };
  p("ref", Xr);
  p("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
    let i = h(e, t),
      o = () => {
        if (e._x_currentIfEl) return e._x_currentIfEl;
        let a = e.content.cloneNode(!0).firstElementChild;
        return (
          C(a, {}, e),
          m(() => {
            e.after(a), S(a);
          }),
          (e._x_currentIfEl = a),
          (e._x_undoIf = () => {
            M(a, (c) => {
              c._x_effects && c._x_effects.forEach(he);
            }),
              a.remove(),
              delete e._x_currentIfEl;
          }),
          a
        );
      },
      s = () => {
        !e._x_undoIf || (e._x_undoIf(), delete e._x_undoIf);
      };
    r(() =>
      i((a) => {
        a ? o() : s();
      })
    ),
      n(() => e._x_undoIf && e._x_undoIf());
  });
  p("id", (e, { expression: t }, { evaluate: r }) => {
    r(t).forEach((i) => Yr(e, i));
  });
  Z(ve("@", we(E("on:"))));
  p(
    "on",
    $((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
      let o = n ? h(e, n) : () => {};
      e.tagName.toLowerCase() === "template" &&
        (e._x_forwardEvents || (e._x_forwardEvents = []),
        e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
      let s = de(e, t, r, (a) => {
        o(() => {}, { scope: { $event: a }, params: [a] });
      });
      i(() => s());
    })
  );
  R.setEvaluator(it);
  R.setReactivityEngine({ reactive: $e, effect: Tr, release: Rr, raw: g });
  var Rt = R;
  window.Alpine = Rt;
  queueMicrotask(() => {
    Rt.start();
  });
})();
