/* =========================================================
   Weflux - shared shell (nav + footer + mobile menu)
   All pages live at root level - no /pages/ prefix needed.
   ========================================================= */
(function () {
  'use strict';

  // ---- CONSENT ----
  // Nothing that sets tracking cookies loads until the visitor chooses.
  //   Analytics: GA4 and GTM (Microsoft Clarity is served through GTM)
  //   Marketing: Meta Pixel
  // The choice is kept for 180 days in localStorage and a first-party cookie,
  // and can be changed any time from "Cookie settings" in the footer.
  var CONSENT_KEY = 'wf_consent';
  function readConsent() {
    var raw = null;
    try { raw = localStorage.getItem(CONSENT_KEY); } catch (e) { /* storage blocked */ }
    if (!raw) {
      var m = document.cookie.match(/(?:^|; )wf_consent=([^;]+)/);
      if (m) raw = decodeURIComponent(m[1]);
    }
    try { var c = raw && JSON.parse(raw); return c && typeof c === 'object' ? c : null; } catch (e) { return null; }
  }
  function saveConsent(c) {
    c = { a: c.a ? 1 : 0, m: c.m ? 1 : 0, t: Date.now() };
    var raw = JSON.stringify(c);
    try { localStorage.setItem(CONSENT_KEY, raw); } catch (e) { /* storage blocked */ }
    document.cookie = 'wf_consent=' + encodeURIComponent(raw) + '; max-age=' + (180 * 86400) + '; path=/; SameSite=Lax';
    return c;
  }

  // Google Consent Mode signals, so any GTM tag that checks consent sees the choice.
  window.dataLayer = window.dataLayer || [];
  // gtag() pushes the arguments object itself; Google's tags ignore plain arrays.
  function gtagConsent() { window.dataLayer.push(arguments); }
  function consentSignal(c, type) {
    gtagConsent('consent', type, {
      analytics_storage: c && c.a ? 'granted' : 'denied',
      ad_storage: c && c.m ? 'granted' : 'denied',
      ad_user_data: c && c.m ? 'granted' : 'denied',
      ad_personalization: c && c.m ? 'granted' : 'denied'
    });
  }

  var analyticsLoaded = false;
  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    // ---- GOOGLE ANALYTICS 4 (injected once from shell so new pages auto-track) ----
    if (!document.querySelector('script[src*="G-EGHHC5WBPN"]')) {
      var ga = document.createElement('script');
      ga.async = true;
      ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-EGHHC5WBPN';
      document.head.appendChild(ga);
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-EGHHC5WBPN');
    }

    // ---- GOOGLE TAG MANAGER (injected once from shell so new pages auto-track) ----
    if (!window.dataLayer || !window.dataLayer.some(function(e){ return e['gtm.start']; })) {
      // Head script
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-55CH5SQK');
      // Noscript fallback
      var ns = document.createElement('noscript');
      ns.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-55CH5SQK" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
      document.body.insertBefore(ns, document.body.firstChild);
    }
  }

  var marketingLoaded = false;
  function loadMarketing() {
    if (marketingLoaded) return;
    marketingLoaded = true;
    // ---- META PIXEL (injected once from shell so all pages auto-track) ----
    if (!window.fbq) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2167003997195249');
      fbq('track', 'PageView');

      var nsPixel = document.createElement('noscript');
      nsPixel.innerHTML = '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2167003997195249&ev=PageView&noscript=1" />';
      if (document.body) {
        document.body.appendChild(nsPixel);
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          if (document.body) document.body.appendChild(nsPixel);
        });
      }
    }

    // ---- META PIXEL AUTOMATIC EVENT TRACKING ----
    try {
      if (window.fbq) {
        var path = location.pathname.toLowerCase();
        var pageName = document.title || path;
        if (path.indexOf('pricing') !== -1 || path.indexOf('features') !== -1 || path.indexOf('use-cases') !== -1 || path.indexOf('comparison') !== -1 || path.indexOf('platform') !== -1) {
          fbq('track', 'ViewContent', { content_name: pageName, content_category: 'Product Page', page_path: path });
        }

        document.addEventListener('click', function(e) {
          var target = e.target.closest ? e.target.closest('a, button') : null;
          if (!target) return;
          var href = (target.getAttribute('href') || '').toLowerCase();
          var text = (target.textContent || '').trim().toLowerCase();

          // Start Free / Register CTAs
          if (href.indexOf('weflux.in/register') !== -1 || href.indexOf('register.html') !== -1 || href.indexOf('signup.html') !== -1 || text.indexOf('start free') !== -1 || text.indexOf('start 14-day free trial') !== -1 || text.indexOf('sign up') !== -1) {
            fbq('track', 'CompleteRegistration', { content_name: text || 'Start Free CTA', link_url: href });
          }
          // Contact actions (WhatsApp, Phone, Email)
          else if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1 || href.indexOf('whatsapp.com') !== -1) {
            fbq('track', 'Contact', { content_name: 'WhatsApp Link Click', link_url: href });
          } else if (href.indexOf('tel:') !== -1) {
            fbq('track', 'Contact', { content_name: 'Phone Call Click', link_url: href });
          } else if (href.indexOf('mailto:') !== -1) {
            fbq('track', 'Contact', { content_name: 'Email Link Click', link_url: href });
          }
        }, true);
      }
    } catch (err) {
      console.error('Meta Pixel auto-tracking error:', err);
    }
  }

  function applyConsent(c) {
    if (c.a) loadAnalytics();
    if (c.m) loadMarketing();
  }

  // ---- CONSENT BANNER ----
  var CC_CSS = '.wf-cc{position:fixed;left:16px;bottom:16px;z-index:120;width:min(440px,calc(100vw - 32px));background:#fff;color:#0A0A0A;border:1px solid #E7E4DA;border-radius:16px;box-shadow:0 24px 60px -20px rgba(15,23,42,.35),0 8px 20px -8px rgba(15,23,42,.12);padding:18px;font:14px/1.5 "Geist",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.wf-cc h2{font-size:15px;font-weight:600;margin:0 0 4px;letter-spacing:0}.wf-cc p{margin:0;color:#4B5563;font-size:13.5px}.wf-cc p a{color:#0F8A53;text-decoration:underline}' +
    '.wf-cc-panel{margin-top:12px;border-top:1px solid #E7E4DA;padding-top:4px}.wf-cc-panel[hidden]{display:none}' +
    '.wf-cc-row{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid #F1EFE8;cursor:pointer}.wf-cc-row:last-child{border-bottom:0}' +
    '.wf-cc-row input{width:18px;height:18px;margin-top:2px;accent-color:#128C7E;flex:0 0 auto}.wf-cc-row b{display:block;font-size:13.5px;font-weight:600}.wf-cc-row span{display:block;font-size:12.5px;color:#4B5563}' +
    '.wf-cc-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.wf-cc-actions button{flex:1 1 auto;min-height:44px;padding:0 14px;border-radius:10px;font:600 13.5px/1 inherit;cursor:pointer;border:1px solid #E7E4DA;background:#fff;color:#0A0A0A}' +
    '.wf-cc-actions button:hover{background:#F4F2EC}.wf-cc-actions .wf-cc-accept{background:#128C7E;border-color:#128C7E;color:#fff}.wf-cc-actions .wf-cc-accept:hover{background:#0F766E}' +
    '.wf-cc-actions button:focus-visible,.wf-cc-row input:focus-visible{outline:2px solid #16A34A;outline-offset:2px}' +
    '@media (max-width:640px){.wf-cc{left:8px;right:8px;bottom:8px;width:auto;padding:16px}}';

  var ccEl = null;
  function openConsent(showPanel) {
    var current = readConsent() || { a: 0, m: 0 };
    if (!document.getElementById('wf-cc-css')) {
      var st = document.createElement('style');
      st.id = 'wf-cc-css';
      st.textContent = CC_CSS;
      document.head.appendChild(st);
    }
    if (ccEl) ccEl.remove();
    ccEl = document.createElement('section');
    ccEl.className = 'wf-cc';
    ccEl.setAttribute('role', 'region');
    ccEl.setAttribute('aria-label', 'Cookie choices');
    ccEl.innerHTML =
      '<h2>Cookies on weflux.in</h2>' +
      '<p>We would like to use analytics cookies (Google Analytics, Microsoft Clarity) to see how the site is used, and marketing cookies (Meta Pixel) to measure our ads. None of them load until you choose. <a href="/cookies">Cookie policy</a></p>' +
      '<div class="wf-cc-panel"' + (showPanel ? '' : ' hidden') + '>' +
        '<label class="wf-cc-row"><input type="checkbox" checked disabled><span><b>Strictly necessary</b><span>Always on. Keeps the site working and remembers this choice.</span></span></label>' +
        '<label class="wf-cc-row"><input type="checkbox" data-cc="a"' + (current.a ? ' checked' : '') + '><span><b>Analytics</b><span>Google Analytics and Microsoft Clarity, including session recordings of this site.</span></span></label>' +
        '<label class="wf-cc-row"><input type="checkbox" data-cc="m"' + (current.m ? ' checked' : '') + '><span><b>Marketing</b><span>Meta Pixel, to measure which Facebook and Instagram ads bring visitors.</span></span></label>' +
      '</div>' +
      '<div class="wf-cc-actions">' +
        (showPanel
          ? '<button type="button" data-cc-act="reject">Reject all</button><button type="button" class="wf-cc-accept" data-cc-act="save">Save choices</button>'
          : '<button type="button" data-cc-act="customise">Customise</button><button type="button" data-cc-act="reject">Reject all</button><button type="button" class="wf-cc-accept" data-cc-act="accept">Accept all</button>') +
      '</div>';
    ccEl.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cc-act]');
      if (!btn) return;
      var act = btn.getAttribute('data-cc-act');
      if (act === 'customise') { openConsent(true); return; }
      var c = act === 'accept' ? { a: 1, m: 1 }
        : act === 'reject' ? { a: 0, m: 0 }
        : { a: ccEl.querySelector('[data-cc="a"]').checked, m: ccEl.querySelector('[data-cc="m"]').checked };
      var prev = readConsent();
      c = saveConsent(c);
      consentSignal(c, 'update');
      ccEl.remove();
      ccEl = null;
      // Scripts already running cannot be unloaded; a reload applies a withdrawal cleanly.
      if (prev && ((prev.a && !c.a) || (prev.m && !c.m))) { location.reload(); return; }
      applyConsent(c);
    });
    (document.body || document.documentElement).appendChild(ccEl);
    var first = ccEl.querySelector(showPanel ? '[data-cc="a"]' : '.wf-cc-accept');
    if (showPanel && first) first.focus();
  }
  window.wfConsent = { open: function () { openConsent(true); }, get: readConsent };
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!link) return;
    e.preventDefault();
    openConsent(true);
  });

  var consent = readConsent();
  consentSignal(consent, 'default');
  if (consent) applyConsent(consent);
  else if (document.body) openConsent(false);
  else document.addEventListener('DOMContentLoaded', function () { if (!readConsent()) openConsent(false); });

  // ---- LEAD CAPTURE POPUP (injected once from shell so configured pages get it) ----
  if (!document.querySelector('link[href*="lead-capture"]')) {
    var lcCss = document.createElement('link');
    lcCss.rel = 'stylesheet';
    lcCss.href = '/lead-capture.css';
    document.head.appendChild(lcCss);

    var lcJs = document.createElement('script');
    lcJs.defer = true;
    lcJs.src = '/lead-capture.js';
    document.head.appendChild(lcJs);

    var dbJs = document.createElement('script');
    dbJs.defer = true;
    dbJs.src = '/demo-booking.js';
    document.head.appendChild(dbJs);
  }
  // Nav + footer markup is rendered into the page at build time by
  // lib/shell.js, so crawlers see real links. This file only wires up
  // behaviour on markup that is already in the DOM.


  // ---- NAV ----
  const navHost = document.getElementById('wc-nav');
  if (navHost) {

    const nav = document.getElementById('wc-nav-el');
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const burger = document.getElementById('wc-burger');
    const mobile = document.getElementById('wc-mobile');
    function setMenu(open) {
      mobile.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
      // inert keeps the menu's links out of the tab order + a11y tree while closed
      if (open) mobile.removeAttribute('inert');
      else mobile.setAttribute('inert', '');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', () => setMenu(!mobile.classList.contains('open')));
    mobile.addEventListener('click', (e) => { if (e.target.tagName === 'A') setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 1024) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }


  // ---- WEFLUX REDIRECT INTERSTITIAL ----
  // Any in-page link to weflux.in shows a short "Taking you to Weflux…"
  // loading screen, then auto-continues. Injected once from the shell so
  // every page (current and future) gets it for free.
  (function () {
    const WEFLUX_RE = /^https?:\/\/(www\.)?weflux\.in(\/|$|\?|#)/i;
    const DELAY = 1500; // 1.5s - within the "1–2 sec" brief

    const overlay = document.createElement('div');
    overlay.className = 'weflux-redirect';
    overlay.id = 'wc-weflux-redirect';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="wfr-card">
        <div class="wfr-spinner" aria-hidden="true"></div>
        <p class="wfr-title">Taking you to Weflux…</p>
        <p class="wfr-sub">WhatsApp Automation &amp; Customer Communication Platform</p>
        <div class="wfr-bar" aria-hidden="true"></div>
      </div>
    `;

    let armed = false;
    function ensureMounted() {
      if (!overlay.isConnected) document.body.appendChild(overlay);
    }
    function go(href) {
      ensureMounted();
      // force reflow so the transition runs even if just appended
      overlay.offsetHeight; // eslint-disable-line no-unused-expressions
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
      window.setTimeout(function () { window.location.href = href; }, DELAY);
    }

    document.addEventListener('click', function (e) {
      if (armed) { e.preventDefault(); return; }
      // respect modifier keys / non-left clicks (open-in-new-tab, etc.)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      if (a.target && a.target !== '' && a.target !== '_self') return; // new-tab links pass through
      const href = a.getAttribute('href') || '';
      if (!WEFLUX_RE.test(href)) return;
      e.preventDefault();
      armed = true;
      go(href);
    }, true);

    // If the page is restored from bfcache, clear the overlay state.
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) {
        armed = false;
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
  })();
})();
