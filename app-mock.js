/* =========================================================
   Weflux app mockups - renders the product previews on the
   marketing site so they match the live dashboard.
   - [data-wfa-sidebar]  the always-dark sidebar (rail or full)
   - .wfa-hero           animated inbox in the home hero
   - #wfaTour            the clickable product tour
   All names, numbers and messages are sample data.
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LOGO = '/assets/weflux-logo.webp';
  var REGISTER = 'https://app.weflux.in/register';

  /* ---------- Icons (lucide, the set the app uses) ---------- */
  var IC = {
    dash: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
    inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    kanban: '<path d="M6 5v11"/><path d="M12 5v6"/><path d="M18 5v14"/>',
    calcheck: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>',
    calclock: '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/>',
    blocks: '<rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/>',
    swap: '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    userplus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    clip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checks: '<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    done: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    back: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    tpl: '<rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    link: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
    reply: '<polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>'
  };
  function ic(name, cls) {
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (IC[name] || '') + '</svg>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, reduced ? Math.min(ms, 120) : ms); }); }
  function inr(n) { return Math.round(n).toLocaleString('en-IN'); }

  // The app's avatar palette: darker Material hues so white initials pass AA.
  var AVATAR = ['#C2185B', '#9C27B0', '#3F51B5', '#1976D2', '#00796B', '#D03E1A', '#795548', '#546E7A', '#AD4A00', '#1565C0'];
  function avColor(name) { return AVATAR[(name || '').charCodeAt(0) % 10]; }
  function initials(name) {
    var p = name.trim().split(/\s+/);
    return ((p[0] || '')[0] + ((p[1] || '')[0] || '')).toUpperCase();
  }
  function avatar(name, cls) {
    return '<span class="wfa-av' + (cls ? ' ' + cls : '') + '" style="background:' + avColor(name) + '">' + esc(initials(name)) + '</span>';
  }

  var STAGE = {
    new: ['New Lead', 'lc-new'],
    contacted: ['Contacted', 'lc-contacted'],
    qualified: ['Qualified', 'lc-qualified'],
    opportunity: ['Opportunity', 'lc-opportunity'],
    customer: ['Customer', 'lc-customer']
  };

  /* ---------- Sidebar ---------- */
  var NAV = {
    overview: ['Dashboard', 'dash'],
    inbox: ['Inbox', 'inbox'],
    messenger: ['Messenger', 'facebook'],
    instagram: ['Instagram', 'instagram'],
    calls: ['Calls', 'phone'],
    contacts: ['Contacts', 'users'],
    campaigns: ['Campaigns', 'megaphone'],
    templates: ['Templates', 'file'],
    automation: ['Automation', 'zap'],
    analytics: ['Analytics', 'chart'],
    crm: ['CRM', 'kanban'],
    tasks: ['Tasks', 'calcheck'],
    invoices: ['Invoices', 'receipt'],
    appointments: ['Appointments', 'calclock'],
    integration: ['Integration', 'blocks'],
    migrate: ['Migrate', 'swap'],
    settings: ['Settings', 'settings']
  };
  var GROUPS = [
    ['Engage', ['inbox', 'messenger', 'instagram', 'calls']],
    ['Grow', ['contacts', 'campaigns', 'templates', 'automation', 'analytics']],
    ['Manage', ['crm', 'tasks', 'invoices', 'appointments', 'integration', 'migrate']]
  ];
  var BADGE = { inbox: 7, messenger: 2 };
  var AMBER = { tasks: 3 };
  var TAGS = { appointments: 'new', integration: 'beta' };

  function buildSidebar(el) {
    var active = el.getAttribute('data-active') || 'inbox';
    var live = el.hasAttribute('data-interactive');
    var tag = live ? 'button' : 'span';
    function item(key) {
      var n = NAV[key];
      var extra = '';
      if (BADGE[key]) extra = '<span class="wfa-badge" data-badge="' + key + '">' + BADGE[key] + '</span>';
      else if (AMBER[key]) extra = '<span class="wfa-badge amber">' + AMBER[key] + '</span>';
      else if (TAGS[key]) extra = '<span class="wfa-tag ' + TAGS[key] + '">' + (TAGS[key] === 'new' ? 'New' : 'Beta') + '</span>';
      return '<' + tag + ' class="wfa-item' + (key === active ? ' on' : '') + '" data-go="' + key + '"' +
        (live ? ' type="button" aria-label="' + n[0] + '"' + (key === active ? ' aria-current="page"' : '') : '') + '>' +
        ic(n[1]) + '<span class="lbl">' + n[0] + '</span>' + extra + '</' + tag + '>';
    }
    var html =
      '<div class="wfa-sb-logo"><span class="wfa-mark"><img src="' + LOGO + '" alt="" width="30" height="30" loading="lazy"></span>' +
      '<span class="wfa-brand">Weflux</span><span class="wfa-plan">Pro</span></div>' +
      '<div class="wfa-acct"><span class="wfa-acct-btn"><span class="wfa-acct-av">AS</span>' +
      '<span class="wfa-acct-t"><p>Anand Store</p><p>Demo number</p></span>' + ic('chevron') + '</span></div>' +
      '<div class="wfa-org">Anand Home Furnishings · Demo</div>' +
      '<nav class="wfa-nav" aria-label="Sample workspace">' + item('overview');
    GROUPS.forEach(function (g) {
      html += '<div class="wfa-grp"><div class="wfa-grp-h"><span>' + g[0] + '</span>' + ic('chevron') + '</div>';
      g[1].forEach(function (k) { html += item(k); });
      html += '</div>';
    });
    html += '</nav><div class="wfa-pin">' + item('settings') + '</div>' +
      '<div class="wfa-user"><span class="wfa-user-av">MS</span><span class="wfa-user-t"><p>Meera Shah</p><p>Admin</p></span>' +
      '<span class="ib">' + ic('bell') + '</span><span class="ib">' + ic('logout') + '</span></div>';
    el.innerHTML = html;
  }

  /* ---------- Shared list row ---------- */
  function rowHTML(c, selected, tagName) {
    var t = tagName || 'div';
    var lc = STAGE[c.stage];
    var chips = '<span class="wfa-ch ' + lc[1] + '">' + lc[0] + '</span>';
    if (c.agent) chips += '<span class="wfa-ch agent">' + ic('user') + esc(c.agent.split(' ')[0]) + '</span>';
    (c.labels || []).forEach(function (l) {
      chips += '<span class="wfa-ch" style="background:' + l[1] + '20;color:color-mix(in srgb,' + l[1] + ' 65%,#0F172A)">' + esc(l[0]) + '</span>';
    });
    if (c.wait) chips += '<span class="wfa-ch ' + c.wait[0] + '">Waiting ' + c.wait[1] + '</span>';
    var pv = c.preview;
    var pvIcon = pv.icon ? ic(pv.icon) : '';
    return '<' + t + ' class="wfa-row' + (c.unread ? ' unread' : '') + (selected ? ' on' : '') + '" data-conv="' + c.id + '"' +
      (t === 'button' ? ' type="button"' + (selected ? ' aria-current="true"' : '') : '') + '>' +
      avatar(c.name) +
      '<span class="wfa-rb"><span class="wfa-l1"><span class="wfa-nm">' + esc(c.name) + '</span>' +
      (c.fromBroadcast ? '<span style="color:#128C7E;display:inline-flex" title="Replied to a broadcast">' + ic('megaphone').replace('class="ic"', 'class="ic" style="width:11px;height:11px"') + '</span>' : '') +
      '<span style="flex:1"></span><span class="wfa-tm">' + esc(c.time) + '</span></span>' +
      '<span class="wfa-l2">' + pvIcon + '<span class="wfa-pv">' + esc(pv.text) + '</span>' +
      (c.unread ? '<span class="wfa-dot">' + (c.unreadCount || '') + '</span>' : '') + '</span>' +
      '<span class="wfa-l3">' + chips + '</span></span></' + t + '>';
  }

  function tick(state) {
    if (state === 'read') return ic('checks', 'rd');
    if (state === 'dl') return ic('checks', 'dl');
    if (state === 'sent') return ic('check', 'dl');
    return ic('clock', 'dl');
  }
  function bubble(m, animate) {
    var cls = 'wfa-msg ' + (m.d === 'out' ? 'out' : 'in') + (m.tpl ? ' wfa-tpl' : '') + (animate ? ' anim' : '');
    var meta = '<span class="wfa-meta"><span>' + esc(m.at) + '</span>' + (m.d === 'out' ? '<span class="st">' + tick(m.st || 'read') + '</span>' : '') + '</span>';
    if (m.tpl) {
      return '<div class="' + cls + '">' +
        '<div class="hdr">' + ic('image') + '</div>' +
        '<div class="bd"><span class="wfa-tpl-name">' + esc(m.tpl) + '</span>' + esc(m.t) + meta + '</div>' +
        '<div class="btns"><span>' + ic('link') + 'Track order</span><span>' + ic('reply') + 'Talk to us</span></div></div>';
    }
    return '<div class="' + cls + '">' + esc(m.t) + meta + '</div>';
  }
  function setTick(el, state) {
    var st = el && el.querySelector('.st');
    if (st) st.innerHTML = tick(state);
  }
  function nowTime() {
    var d = new Date();
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(/\s?(am|pm)/i, function (x) { return ' ' + x.trim().toLowerCase(); });
  }

  /* =========================================================
     HERO - rail sidebar, inbox list, a live thread
     ========================================================= */
  var HERO_ROWS = [
    { id: 'priya', name: 'Priya Sharma', time: '10:43 am', unread: false, stage: 'customer', agent: 'Meera Shah', labels: [['VIP', '#16A34A']], preview: { text: 'Perfect, thank you 🙏' } },
    { id: 'arjun', name: 'Arjun Mehta', time: '10:31 am', unread: true, unreadCount: 2, stage: 'qualified', preview: { text: 'Is the 3-seater available in grey?' }, wait: ['nudge', '42m'] },
    { id: 'sneha', name: 'Sneha Reddy', time: '9:12 am', unread: true, unreadCount: 1, stage: 'opportunity', agent: 'Rahul Verma', preview: { icon: 'file', text: 'PO-4490.pdf' }, wait: ['warn', '6h'] },
    { id: 'kavya', name: 'Kavya Iyer', time: 'Yesterday', unread: false, fromBroadcast: true, stage: 'new', preview: { text: 'Yes, I want the Diwali offer' } },
    { id: 'rohit', name: 'Rohit Nair', time: 'Mon', unread: false, stage: 'contacted', agent: 'Meera Shah', preview: { text: 'Refund status?' }, wait: ['late', '2d'] }
  ];
  var HERO_SCRIPT = [
    { d: 'in', t: 'Hi, I ordered the linen bedsheet set yesterday. Can I still change the colour?', at: '10:41 am' },
    { d: 'out', t: 'Hi Priya, yes. Order #WF-12847 has not been packed yet. Which colour would you like?', at: '10:42 am' },
    { d: 'in', t: 'Sage green please, same size.', at: '10:42 am' },
    { d: 'out', t: 'Done. Updated to Sage Green, Queen size. It ships today and reaches you by Thursday.', at: '10:43 am' },
    { d: 'in', t: 'Perfect, thank you 🙏', at: '10:43 am' }
  ];

  function initHero(root) {
    var list = root.querySelector('[data-wfa-rows]');
    var stream = root.querySelector('[data-wfa-stream]');
    var input = root.querySelector('[data-wfa-input]');
    if (!list || !stream) return;
    list.innerHTML = HERO_ROWS.map(function (c, i) { return rowHTML(c, i === 0, 'li'); }).join('');
    var priyaPv = list.querySelector('[data-conv="priya"] .wfa-pv');
    var priyaTm = list.querySelector('[data-conv="priya"] .wfa-tm');
    var placeholder = input ? input.textContent : '';

    if (reduced) {
      stream.innerHTML = '<div class="wfa-date">Today</div>' + HERO_SCRIPT.map(function (m) { return bubble(m, false); }).join('');
      return;
    }

    var visible = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.1 }).observe(root);
    } else visible = true;
    function whenVisible() {
      return new Promise(function (r) {
        (function check() { if (visible && !document.hidden) r(); else setTimeout(check, 400); })();
      });
    }

    function typeInto(text) {
      return new Promise(function (resolve) {
        if (!input) return resolve();
        input.style.color = '#111B21';
        var i = 0;
        (function step() {
          i += 2;
          input.textContent = text.slice(0, i);
          if (i < text.length) setTimeout(step, 24);
          else setTimeout(resolve, 260);
        })();
      });
    }
    function clearInput() { if (input) { input.textContent = placeholder; input.style.color = ''; } }

    (async function loop() {
      for (;;) {
        await whenVisible();
        stream.innerHTML = '<div class="wfa-date">Today</div>';
        for (var i = 0; i < HERO_SCRIPT.length; i++) {
          var m = HERO_SCRIPT[i];
          await whenVisible();
          if (m.d === 'in') {
            var typing = document.createElement('div');
            typing.className = 'wfa-typing';
            typing.innerHTML = '<span></span><span></span><span></span>';
            stream.appendChild(typing);
            await wait(1000);
            typing.remove();
            stream.insertAdjacentHTML('beforeend', bubble(m, true));
            if (priyaPv) { priyaPv.textContent = m.t; priyaTm.textContent = m.at; }
            await wait(1300);
          } else {
            await typeInto(m.t);
            clearInput();
            stream.insertAdjacentHTML('beforeend', bubble({ d: 'out', t: m.t, at: m.at, st: 'sent' }, true));
            var el = stream.lastElementChild;
            if (priyaPv) { priyaPv.textContent = 'You: ' + m.t; priyaTm.textContent = m.at; }
            await wait(500); setTick(el, 'dl');
            await wait(700); setTick(el, 'read');
            await wait(900);
          }
        }
        await wait(3200);
      }
    })();
  }

  /* =========================================================
     TOUR - a clickable copy of the dashboard
     ========================================================= */
  var ME = 'Meera Shah';
  var CONVS = [
    {
      id: 'priya', name: 'Priya Sharma', phone: 'Demo contact', time: '10:44 am', stage: 'customer', agent: 'Meera Shah',
      labels: [['VIP', '#16A34A']], windowLeft: '23h 16m', city: 'Jaipur', orders: 4, ltv: 18400, source: 'Instagram ad',
      msgs: [
        { d: 'in', t: 'Hi, I ordered the linen bedsheet set yesterday. Can I still change the colour?', at: '10:41 am' },
        { d: 'out', t: 'Hi Priya, yes. Order #WF-12847 has not been packed yet. Which colour would you like?', at: '10:42 am' },
        { d: 'in', t: 'Sage green please, same size.', at: '10:42 am' },
        { d: 'out', t: 'Done. Updated to Sage Green, Queen size. It ships today and reaches you by Thursday.', at: '10:43 am' },
        { d: 'in', t: 'Perfect, thank you 🙏', at: '10:43 am' },
        { d: 'out', t: 'You are welcome, Priya. The tracking link will come here once it ships.', at: '10:44 am' }
      ],
      auto: ['Great, will keep an eye out for the tracking link.', 'Thanks again 😊']
    },
    {
      id: 'arjun', name: 'Arjun Mehta', phone: 'Demo contact', time: '10:31 am', unread: true, unreadCount: 2, stage: 'qualified',
      wait: ['nudge', '42m'], windowLeft: '23h 29m', city: 'Jaipur', orders: 0, ltv: 0, source: 'Website chat button',
      msgs: [
        { d: 'in', t: 'Hello, saw the Oslo sofa on your website.', at: '10:30 am' },
        { d: 'in', t: 'Is the 3-seater available in grey? And do you deliver to Vaishali Nagar?', at: '10:31 am' }
      ],
      auto: ['Nice. How long does delivery take?', 'Okay, please share the payment link.']
    },
    {
      id: 'sneha', name: 'Sneha Reddy', phone: 'Demo contact', time: '9:12 am', unread: true, unreadCount: 1, stage: 'opportunity', agent: 'Rahul Verma',
      labels: [['B2B', '#7C3AED']], wait: ['warn', '6h'], windowLeft: '17h 48m', city: 'Jaipur', orders: 2, ltv: 142000, source: 'Referral',
      preview: { icon: 'file', text: 'PO-4490.pdf' },
      msgs: [
        { d: 'in', t: 'Hi, we need 40 cushion covers for our new office. Sharing our purchase order.', at: '9:10 am' },
        { d: 'in', t: '📄 PO-4490.pdf', at: '9:12 am' }
      ],
      auto: ['Thanks. Can you also send a GST invoice with the quote?']
    },
    {
      id: 'kavya', name: 'Kavya Iyer', phone: 'Demo contact', time: 'Yesterday', fromBroadcast: true, stage: 'new',
      windowLeft: '4h 05m', city: 'Jaipur', orders: 0, ltv: 0, source: 'Diwali broadcast',
      msgs: [
        { d: 'out', tpl: 'diwali_early_access', t: 'Hi Kavya, our Diwali collection opens early for you. Get 15% off till Sunday with code DIYA15.', at: 'Yesterday' },
        { d: 'in', t: 'Yes, I want the Diwali offer. Does it work on lamps too?', at: 'Yesterday' }
      ],
      auto: ['Great, ordering the brass lamp now.']
    },
    {
      id: 'rohit', name: 'Rohit Nair', phone: 'Demo contact', time: 'Mon', stage: 'contacted', agent: 'Meera Shah',
      wait: ['late', '2d'], windowLeft: null, city: 'Jaipur', orders: 1, ltv: 3200, source: 'Organic',
      msgs: [
        { d: 'in', t: 'I returned the table runner last week. Refund status?', at: 'Mon' }
      ],
      auto: ['Got it, thanks for the update.']
    },
    {
      id: 'farhan', name: 'Farhan Qureshi', phone: 'Demo contact', time: 'Sun', stage: 'customer', agent: 'Rahul Verma',
      windowLeft: null, city: 'Jaipur', orders: 6, ltv: 26750, source: 'Google search',
      msgs: [
        { d: 'out', t: 'Hi Farhan, your order #WF-12790 was delivered today. Hope you love it.', at: 'Sun' },
        { d: 'in', t: 'Received, thanks ✅', at: 'Sun' },
        { d: 'out', t: 'Glad it reached you safely, Farhan. Enjoy the new cushions.', at: 'Sun' }
      ],
      auto: ['👍']
    }
  ];
  CONVS.forEach(function (c) {
    if (!c.preview) {
      var last = c.msgs[c.msgs.length - 1];
      c.preview = { text: (last.d === 'out' ? 'You: ' : '') + last.t };
    }
  });

  var SHORTCUTS = [
    ['/thanks', 'Thank you for shopping with Anand. Anything else I can help with?'],
    ['/track', 'Your order WF-12847 ships today. We will share tracking here.'],
    ['/hours', 'We are available 9 am to 9 pm, Monday to Saturday.']
  ];

  var CAMPAIGNS = [
    { id: 'c1', name: 'Diwali early access', status: 'running', cat: 'MARKETING', tpl: 'diwali_early_access', aud: 'VIP + Repeat buyers', total: 2400, sent: 1488, dl: 1471, rd: 1120, rp: 214, fl: 17 },
    { id: 'c2', name: 'Order shipped - September', status: 'completed', cat: 'UTILITY', tpl: 'order_shipped_v3', aud: 'Google Sheets: Orders', auto: true, total: 8150, sent: 8074, dl: 7998, rd: 7102, rp: 388, fl: 76 },
    { id: 'c3', name: 'Weekend cart reminder', status: 'scheduled', cat: 'MARKETING', tpl: 'cart_reminder', aud: 'Cart abandoned (7d)', when: 'Sat, 4 Oct · 10:00 am', total: 640, sent: 0, dl: 0, rd: 0, rp: 0, fl: 0 },
    { id: 'c4', name: 'Review request - day 7', status: 'completed', cat: 'UTILITY', tpl: 'review_request_d7', aud: 'Delivered 7 days ago', total: 1920, sent: 1897, dl: 1880, rd: 1544, rp: 301, fl: 23 }
  ];
  var CSTATUS = {
    running: ['Running', 'sp-running', 'play'],
    completed: ['Completed', 'sp-completed', 'done'],
    scheduled: ['Scheduled', 'sp-scheduled', 'clock'],
    draft: ['Draft', 'sp-draft', 'clock']
  };

  var RANGE = {
    '7d': { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], sent: [1620, 1840, 1710, 2230, 1980, 1560, 1540], read: [1310, 1520, 1400, 1860, 1670, 1290, 1262], rep: [290, 360, 330, 470, 430, 300, 260], contacts: 126 },
    '30d': { labels: ['1', '5', '9', '13', '17', '21', '25', '29'], sent: [5200, 6100, 5800, 7400, 6900, 8200, 7600, 9100], read: [4300, 5100, 4800, 6200, 5800, 6900, 6300, 7700], rep: [900, 1100, 1040, 1420, 1330, 1600, 1500, 1820], contacts: 538 },
    '90d': { labels: ['Jul', '', 'Aug', '', 'Sep', ''], sent: [14200, 16800, 18100, 21400, 24900, 27300], read: [11600, 13900, 15000, 17900, 20800, 23100], rep: [2500, 3100, 3300, 4100, 4800, 5300], contacts: 1462 }
  };

  function initTour(root) {
    var views = {};
    root.querySelectorAll('[data-view]').forEach(function (v) { views[v.getAttribute('data-view')] = v; });
    var pathEl = root.querySelector('[data-wfa-path]');
    var toast = root.querySelector('.wfa-toast');
    var current = null;
    var toastTimer = null;

    function showToast(label) {
      if (!toast) return;
      toast.innerHTML = esc(label) + ' is part of the full workspace. <a href="' + REGISTER + '">Start free →</a>';
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3200);
    }

    function go(key) {
      if (!views[key]) { showToast(NAV[key] ? NAV[key][0] : 'This'); return; }
      if (key === current) return;
      current = key;
      Object.keys(views).forEach(function (k) { views[k].classList.toggle('show', k === key); });
      root.querySelectorAll('[data-go]').forEach(function (b) {
        var on = b.getAttribute('data-go') === key;
        b.classList.toggle('on', on);
        if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
      });
      if (pathEl) pathEl.textContent = key === 'overview' ? '' : '/' + key;
      if (RENDER[key]) RENDER[key]();
    }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]');
      if (b && root.contains(b)) { e.preventDefault(); go(b.getAttribute('data-go')); }
    });

    /* ----- Inbox ----- */
    var inbox = views.inbox;
    var state = { sel: 'priya', tab: 'all', q: '' };
    var rowsEl = inbox.querySelector('[data-wfa-rows]');
    var headEl = inbox.querySelector('[data-wfa-head]');
    var sessEl = inbox.querySelector('[data-wfa-sess]');
    var chatEl = inbox.querySelector('[data-wfa-stream]');
    var compEl = inbox.querySelector('[data-wfa-comp]');
    var ctxEl = inbox.querySelector('[data-wfa-ctx]');
    var pillsEl = inbox.querySelector('[data-wfa-pills]');
    var searchEl = inbox.querySelector('[data-wfa-search]');
    var countEl = inbox.querySelector('[data-wfa-open]');

    function conv(id) { return CONVS.filter(function (c) { return c.id === id; })[0]; }
    function lastIn(c) { return c.msgs[c.msgs.length - 1].d === 'in'; }
    var FILTER = {
      all: function (c) { return c.windowLeft !== null; },
      unreplied: function (c) { return c.windowLeft !== null && lastIn(c); },
      mine: function (c) { return c.agent === ME; },
      history: function (c) { return c.windowLeft === null; }
    };

    function renderPills() {
      var labels = { all: 'All', unreplied: 'Unreplied', mine: 'Mine', history: 'History' };
      pillsEl.innerHTML = Object.keys(labels).map(function (k) {
        var n = CONVS.filter(FILTER[k]).length;
        return '<button type="button" class="wfa-pill' + (state.tab === k ? ' on' : '') + '" data-tab="' + k + '" aria-pressed="' + (state.tab === k) + '">' +
          labels[k] + (n && k !== 'history' ? '<b>' + n + '</b>' : '') + '</button>';
      }).join('');
      if (countEl) countEl.textContent = CONVS.filter(function (c) { return c.windowLeft !== null; }).length + ' open';
      var unread = CONVS.filter(function (c) { return c.unread; }).length;
      root.querySelectorAll('[data-badge="inbox"]').forEach(function (b) { b.textContent = unread; b.style.display = unread ? '' : 'none'; });
    }
    function renderRows() {
      var q = state.q.toLowerCase();
      var list = CONVS.filter(FILTER[state.tab]).filter(function (c) {
        return !q || c.name.toLowerCase().indexOf(q) > -1 || c.phone.replace(/\s/g, '').indexOf(q.replace(/\s/g, '')) > -1;
      });
      rowsEl.innerHTML = list.length
        ? list.map(function (c) { return '<li>' + rowHTML(c, c.id === state.sel, 'button') + '</li>'; }).join('')
        : '<li style="padding:28px 16px;text-align:center;font-size:12px;color:#64748B">' +
          (q ? 'No conversation matches “' + esc(state.q) + '”.' : 'Nothing here. Everyone has a reply.') + '</li>';
    }
    function renderHead(c) {
      var lc = STAGE[c.stage];
      var assign = c.agent
        ? '<button type="button" class="wfa-hbtn wfa-hide-sm" data-act="assign"><span class="mini" style="background:' + avColor(c.agent) + '">' + initials(c.agent) + '</span><span class="t">' + esc(c.agent.split(' ')[0]) + '</span>' + ic('chevron') + '</button>'
        : '<button type="button" class="wfa-hbtn solid" data-act="claim">' + ic('userplus') + '<span class="t">Assign to me</span></button>';
      headEl.innerHTML =
        '<button type="button" class="wfa-ibtn wfa-back" data-act="back" aria-label="Back to conversations">' + ic('back') + '</button>' +
        avatar(c.name) +
        '<div class="wfa-th-id"><div class="wfa-th-n"><b>' + esc(c.name) + '</b><span class="wfa-stage ' + lc[1] + '">' + lc[0] + '</span></div>' +
        '<div class="wfa-th-s">' + esc(c.phone) + ' · <span class="open">OPEN</span>' + (c.agent ? ' · Assigned: ' + esc(c.agent) : '') + '</div></div>' +
        '<div class="wfa-th-acts"><button type="button" class="wfa-hbtn wfa-hide-sm" data-act="template">' + ic('file') + '<span class="t">Template</span></button>' + assign + '</div>';
    }
    function renderSess(c) {
      if (c.windowLeft) {
        sessEl.className = 'wfa-sess';
        sessEl.innerHTML = '<i></i><span><b>Session open</b> - reply freely for another <b>' + c.windowLeft + '</b></span>';
      } else {
        sessEl.className = 'wfa-sess closed';
        sessEl.innerHTML = ic('alert').replace('class="ic"', 'class="ic" style="width:13px;height:13px"') +
          '<span style="flex:1"><b>24h window closed</b> - use a template to re-engage.</span>';
      }
    }
    function renderChat(c) {
      chatEl.innerHTML = '<div class="wfa-date">' + (c.msgs[0].at.indexOf('m') > -1 ? 'Today' : 'Earlier') + '</div>' +
        c.msgs.map(function (m, i) {
          var next = c.msgs[i + 1];
          var h = bubble(m, false);
          return next && next.d === m.d ? h.replace('class="wfa-msg ', 'class="wfa-msg run ') : h;
        }).join('');
      chatEl.scrollTop = chatEl.scrollHeight;
    }
    function renderComp(c) {
      if (c.windowLeft) {
        compEl.innerHTML =
          '<div class="wfa-shortcuts" data-wfa-sc hidden></div>' +
          '<span class="ico">' + ic('smile') + '</span><span class="ico">' + ic('clip') + '</span>' +
          '<input class="wfa-input" data-wfa-in type="text" autocomplete="off" aria-label="Message" placeholder="Type a message or / for shortcuts…">' +
          '<button type="button" class="wfa-send" data-act="send" aria-label="Send">' + ic('send') + '</button>';
      } else {
        compEl.innerHTML =
          '<span style="flex:1;font-size:11.5px;color:#92400E;line-height:1.35">The 24-hour window has closed. Only an approved template can reach them now.</span>' +
          '<button type="button" class="wfa-btn" data-act="template">' + ic('file') + 'Send template</button>';
      }
    }
    function renderCtx(c) {
      if (!ctxEl) return;
      var lc = STAGE[c.stage];
      ctxEl.innerHTML =
        '<div class="who">' + avatar(c.name) + '<b>' + esc(c.name) + '</b><small>' + esc(c.phone) + ' · ' + esc(c.city) + '</small></div>' +
        '<h6>Stage</h6><span class="wfa-stage ' + lc[1] + '">' + lc[0] + '</span>' +
        '<h6>Labels</h6><div class="wfa-labels">' +
        ((c.labels || []).map(function (l) { return '<span class="wfa-ch" style="background:' + l[1] + '20;color:color-mix(in srgb,' + l[1] + ' 65%,#0F172A)">' + esc(l[0]) + '</span>'; }).join('') || '<span style="font-size:11px;color:#94A3B8">None yet</span>') +
        '</div><h6>Details</h6>' +
        '<div class="wfa-kv"><span>Orders</span><b>' + c.orders + '</b></div>' +
        '<div class="wfa-kv"><span>Lifetime value</span><b>₹' + inr(c.ltv) + '</b></div>' +
        '<div class="wfa-kv"><span>Source</span><b>' + esc(c.source) + '</b></div>' +
        '<div class="wfa-kv"><span>Opted in</span><b style="color:#047857">Yes</b></div>' +
        '<h6>Assigned</h6><div class="wfa-kv"><span>Agent</span><b>' + esc(c.agent || 'Unassigned') + '</b></div>';
    }
    function select(id, open) {
      var c = conv(id);
      if (!c) return;
      state.sel = id;
      if (c.unread) { c.unread = false; c.unreadCount = 0; }
      renderPills(); renderRows(); renderHead(c); renderSess(c); renderChat(c); renderComp(c); renderCtx(c);
      if (open) inbox.classList.add('reading');
    }

    function afterSend(c, el) {
      setTimeout(function () { setTick(el, 'sent'); }, 350);
      setTimeout(function () { setTick(el, 'dl'); }, 1000);
      setTimeout(function () {
        setTick(el, 'read');
        var m = c.msgs.filter(function (x) { return x.el === el; })[0];
        if (m) m.st = 'read';
      }, 1900);
      if (!c.auto || !c.auto.length) return;
      var reply = c.auto.shift();
      setTimeout(function () {
        if (state.sel !== c.id) { receive(c, reply); return; }
        var t = document.createElement('div');
        t.className = 'wfa-typing';
        t.innerHTML = '<span></span><span></span><span></span>';
        chatEl.appendChild(t);
        chatEl.scrollTop = chatEl.scrollHeight;
        setTimeout(function () { t.remove(); receive(c, reply); }, 1300);
      }, 2400);
    }
    function receive(c, text) {
      var m = { d: 'in', t: text, at: nowTime() };
      c.msgs.push(m);
      c.preview = { text: text };
      c.time = m.at;
      c.wait = null;
      if (!c.windowLeft) { c.windowLeft = '23h 59m'; }
      if (state.sel === c.id) {
        chatEl.insertAdjacentHTML('beforeend', bubble(m, true));
        chatEl.scrollTop = chatEl.scrollHeight;
        renderSess(c); renderComp(c);
      } else { c.unread = true; c.unreadCount = 1; }
      renderPills(); renderRows();
    }
    function send(text, tpl) {
      var c = conv(state.sel);
      var m = tpl
        ? { d: 'out', tpl: 'order_update', t: 'Hi ' + c.name.split(' ')[0] + ', an update on your Anand order is ready. Tap below to see it.', at: nowTime(), st: 'pending' }
        : { d: 'out', t: text, at: nowTime(), st: 'pending' };
      c.msgs.push(m);
      c.preview = { text: 'You: ' + (tpl ? 'Template: order_update' : text) };
      c.time = m.at;
      c.wait = null;
      chatEl.insertAdjacentHTML('beforeend', bubble(m, true));
      m.el = chatEl.lastElementChild;
      chatEl.scrollTop = chatEl.scrollHeight;
      renderPills(); renderRows();
      afterSend(c, m.el);
    }

    inbox.addEventListener('click', function (e) {
      var row = e.target.closest('[data-conv]');
      if (row) { select(row.getAttribute('data-conv'), true); return; }
      var pill = e.target.closest('[data-tab]');
      if (pill) { state.tab = pill.getAttribute('data-tab'); renderPills(); renderRows(); return; }
      var sc = e.target.closest('[data-sc]');
      if (sc) {
        var inp = compEl.querySelector('[data-wfa-in]');
        inp.value = SHORTCUTS[+sc.getAttribute('data-sc')][1];
        compEl.querySelector('[data-wfa-sc]').hidden = true;
        inp.focus();
        return;
      }
      var act = e.target.closest('[data-act]');
      if (!act) return;
      var a = act.getAttribute('data-act');
      var c = conv(state.sel);
      if (a === 'back') inbox.classList.remove('reading');
      else if (a === 'claim') { c.agent = ME; renderHead(c); renderCtx(c); renderPills(); renderRows(); }
      else if (a === 'assign') { c.agent = c.agent === ME ? 'Rahul Verma' : ME; renderHead(c); renderCtx(c); renderPills(); renderRows(); }
      else if (a === 'template') send('', true);
      else if (a === 'send') {
        var input = compEl.querySelector('[data-wfa-in]');
        var v = input && input.value.trim();
        if (v) { input.value = ''; send(v); input.focus(); }
      }
    });
    inbox.addEventListener('keydown', function (e) {
      if (e.target.matches('[data-wfa-in]') && e.key === 'Enter') {
        e.preventDefault();
        var v = e.target.value.trim();
        var box = compEl.querySelector('[data-wfa-sc]');
        if (v.charAt(0) === '/' && box && !box.hidden) {
          var first = box.querySelector('[data-sc]');
          if (first) first.click();
          return;
        }
        if (v) { e.target.value = ''; send(v); }
      }
      if (e.key === 'Escape') {
        var bx = compEl.querySelector('[data-wfa-sc]');
        if (bx) bx.hidden = true;
      }
    });
    inbox.addEventListener('input', function (e) {
      if (e.target === searchEl) { state.q = searchEl.value; renderRows(); return; }
      if (e.target.matches('[data-wfa-in]')) {
        var v = e.target.value;
        var box = compEl.querySelector('[data-wfa-sc]');
        if (v.charAt(0) === '/') {
          var hits = SHORTCUTS.map(function (s, i) { return [s, i]; }).filter(function (x) { return x[0][0].indexOf(v.toLowerCase()) === 0; });
          box.innerHTML = hits.length
            ? hits.map(function (x) { return '<button type="button" data-sc="' + x[1] + '"><b>' + x[0][0] + '</b><span>' + esc(x[0][1]) + '</span></button>'; }).join('')
            : '<div style="padding:8px 10px;font-size:11.5px;color:#64748B">No shortcut starts with “' + esc(v) + '”</div>';
          box.hidden = false;
        } else if (box) box.hidden = true;
      }
    });

    /* ----- Dashboard ----- */
    function countUp(el, to, dec, suf) {
      if (reduced) { el.textContent = to.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + (suf || ''); return; }
      var t0 = performance.now();
      (function step(now) {
        var p = Math.min(1, (now - t0) / 700);
        var v = to * (1 - Math.pow(2, -10 * p));
        if (p === 1) v = to;
        el.textContent = v.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + (suf || '');
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }
    function runCounts(scope) {
      scope.querySelectorAll('[data-to]').forEach(function (el) {
        countUp(el, parseFloat(el.getAttribute('data-to')), parseInt(el.getAttribute('data-dec') || '0', 10), el.getAttribute('data-suf') || '');
      });
      scope.querySelectorAll('[data-w]').forEach(function (el) {
        el.style.width = '0';
        requestAnimationFrame(function () { requestAnimationFrame(function () { el.style.width = el.getAttribute('data-w') + '%'; }); });
      });
    }
    function greeting() {
      var h = new Date().getHours();
      return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    }
    function stat(title, to, note, tone) {
      return '<div class="wfa-card wfa-stat"><p class="wfa-label">' + title + '</p><p class="v' + (tone ? ' ' + tone : '') + '" data-to="' + to + '">0</p><p class="n">' + note + '</p></div>';
    }
    function rate(label, v, note, mid) {
      return '<div class="wfa-card wfa-rate"><div class="top"><span class="wfa-label">' + label + '</span><b data-to="' + v + '" data-dec="1" data-suf="%">0%</b></div>' +
        '<div class="trk"><i class="' + (mid ? 'mid' : '') + '" data-w="' + v + '"></i></div><small>' + note + '</small></div>';
    }
    var RENDER = {};
    RENDER.overview = function () {
      var v = views.overview;
      var recent = CONVS.slice(0, 4).map(function (c) {
        return '<button type="button" class="wfa-mini" data-go="inbox" data-open="' + c.id + '" style="width:100%;text-align:left">' + avatar(c.name) +
          '<span class="t"><b>' + esc(c.name) + '</b><span>' + esc(c.preview.text) + '</span></span><span class="r">' + esc(c.time) + '</span></button>';
      }).join('');
      var dots = { running: '#F59E0B', completed: '#10B981', scheduled: '#0EA5E9' };
      var camps = CAMPAIGNS.slice(0, 3).map(function (c) {
        var pct = c.sent ? Math.round(c.rd / c.dl * 100) : 0;
        return '<div class="wfa-mini"><span class="t"><b>' + esc(c.name) + '</b><span>' + inr(c.total) + ' contacts · ' + esc(c.tpl) + '</span></span>' +
          '<span class="r"><span class="wfa-st" style="--dot:' + dots[c.status] + '">' + CSTATUS[c.status][0] + '</span><br>' + (c.sent ? pct + '% read' : esc(c.when)) + '</span></div>';
      }).join('');
      v.innerHTML = '<div class="wfa-page">' +
        '<div class="wfa-pagehd"><div><h3 class="wfa-title">' + greeting() + ', Meera</h3><p class="wfa-sub">Here\'s what\'s happening across your WhatsApp channels.</p></div>' +
        '<span class="wfa-chip" style="align-self:flex-start;margin-top:4px">Last 7 days</span></div>' +
        '<div class="wfa-stats">' +
        stat('Total contacts', 3284, '+126 this week') +
        stat('Open conversations', 18, '1,942 in total') +
        stat('Messages sent', 12480, '+18% vs last week') +
        stat('Delivered', 12236, 'of 12,480 sent') +
        stat('Read', 10312, 'of 12,236 delivered') +
        stat('Failed', 43, 'See why below', 'bad') +
        '</div><div class="wfa-rates">' +
        rate('Delivery rate', 98.0, 'Healthy · last 7 days') +
        rate('Read rate', 84.3, 'Healthy · last 7 days') +
        rate('Reply rate', 21.6, 'Last 7 days', true) +
        '</div><div class="wfa-grid2">' +
        '<div class="wfa-card wfa-panel"><div class="wfa-panel-hd"><div><h4>Recent conversations</h4></div><button type="button" class="wfa-link" data-go="inbox">Open inbox ' + ic('arrow') + '</button></div>' + recent + '</div>' +
        '<div class="wfa-card wfa-panel"><div class="wfa-panel-hd"><div><h4>Recent campaigns</h4></div><button type="button" class="wfa-link" data-go="campaigns">View all ' + ic('arrow') + '</button></div>' + camps + '</div>' +
        '</div><div class="wfa-card wfa-panel" style="margin-top:10px"><div class="wfa-panel-hd"><div><h4>WhatsApp health</h4><p>How your numbers stand with Meta, and what to do next.</p></div>' +
        '<span class="wfa-sp sp-completed">LIVE</span></div><div class="wfa-health">' +
        '<div><span class="wfa-label">Connection</span><b class="g">Active</b><span style="font-size:10.5px;color:#64748B">Connected through Meta</span></div>' +
        '<div><span class="wfa-label">Quality rating</span><b class="g">High</b><span style="font-size:10.5px;color:#64748B">1 number monitored</span></div>' +
        '<div><span class="wfa-label">Automations</span><b>6</b><span style="font-size:10.5px;color:#64748B">flows built in this workspace</span></div>' +
        '</div></div></div>';
      runCounts(v);
    };
    views.overview && views.overview.addEventListener('click', function (e) {
      var r = e.target.closest('[data-open]');
      if (r) setTimeout(function () { select(r.getAttribute('data-open'), true); }, 0);
    });

    /* ----- Campaigns ----- */
    var cTab = 'all';
    var launched = false;
    function campCard(c) {
      var st = CSTATUS[c.status];
      var prog = c.total ? Math.round((c.sent + c.fl) / c.total * 100) : 0;
      var pct = function (a, b) { return b ? Math.round(a / b * 1000) / 10 + '%' : ''; };
      return '<div class="wfa-card wfa-camp" data-camp="' + c.id + '">' +
        '<div class="wfa-camp-hd"><h5>' + esc(c.name) + '</h5><span class="wfa-sp ' + st[1] + '">' + ic(st[2]) + st[0] + '</span>' +
        '<span class="wfa-sp ' + (c.cat === 'UTILITY' ? 'sp-util' : 'sp-mkt') + '">' + c.cat + '</span></div>' +
        '<p class="wfa-camp-meta">' + (c.auto ? '<b style="color:#128C7E">' + esc(c.aud) + ' · ongoing</b> · ' : '') + 'Template: <b>' + esc(c.tpl) + '</b> · Anand Store' +
        (c.auto ? '' : ' · ' + esc(c.aud)) + (c.when ? ' · Starts ' + esc(c.when) : '') + '</p>' +
        (c.status === 'scheduled' ? '' :
          '<div class="wfa-prog"><div class="trk"><i style="width:' + prog + '%"></i></div><span>' + prog + '%</span></div>' +
          '<div class="wfa-funnel">' +
          '<div><small>Total</small><b>' + inr(c.total) + '</b></div>' +
          '<div><small>Sent</small><b>' + inr(c.sent) + '</b></div>' +
          '<div><small>Delivered</small><b style="color:#059669">' + inr(c.dl) + '<em>' + pct(c.dl, c.sent) + '</em></b></div>' +
          '<div><small>Read</small><b style="color:#2563EB">' + inr(c.rd) + '<em>' + pct(c.rd, c.dl) + '</em></b></div>' +
          '<div><small>Replied</small><b style="color:#7C3AED">' + inr(c.rp) + '<em>' + pct(c.rp, c.rd) + '</em></b></div>' +
          '<div><small>Failed</small><b style="color:#DC2626">' + inr(c.fl) + '</b></div></div>') +
        '</div>';
    }
    RENDER.campaigns = function () {
      var v = views.campaigns;
      var tabs = ['all', 'running', 'completed', 'scheduled'];
      var list = CAMPAIGNS.filter(function (c) { return cTab === 'all' || c.status === cTab; });
      v.innerHTML = '<div class="wfa-page">' +
        '<div class="wfa-pagehd"><div><h3 class="wfa-title">Campaigns</h3><p class="wfa-sub">Manage and monitor your WhatsApp broadcast campaigns</p></div>' +
        '<button type="button" class="wfa-btn" data-act="launch"' + (launched ? ' disabled' : '') + '>' + ic('plus') + (launched ? 'Simulation running' : 'Simulate campaign') + '</button></div>' +
        (launched ? '<div class="wfa-ok">' + ic('done') + '<span><b>Restock alert - linen</b> simulation running on sample data. No messages are sent.</span></div>' : '') +
        '<div class="wfa-tabs">' + tabs.map(function (t) {
          return '<button type="button" class="wfa-pill' + (cTab === t ? ' on' : '') + '" data-ctab="' + t + '">' + (t === 'all' ? 'All' : CSTATUS[t][0]) + '</button>';
        }).join('') + '<span class="wfa-search wfa-hide-sm">' + ic('search') + 'Search campaigns…</span></div>' +
        list.map(campCard).join('') + '</div>';
    };
    views.campaigns && views.campaigns.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ctab]');
      if (t) { cTab = t.getAttribute('data-ctab'); RENDER.campaigns(); return; }
      var a = e.target.closest('[data-act="launch"]');
      if (!a || launched) return;
      launched = true;
      var c = { id: 'c0', name: 'Restock alert - linen', status: 'running', cat: 'MARKETING', tpl: 'restock_linen', aud: 'Viewed linen (30d)', total: 1250, sent: 0, dl: 0, rd: 0, rp: 0, fl: 0 };
      CAMPAIGNS.unshift(c);
      cTab = 'all';
      RENDER.campaigns();
      var ticks = 0;
      var iv = setInterval(function () {
        ticks++;
        c.sent = Math.min(c.total - 9, c.sent + 85 + Math.round(Math.random() * 30));
        c.dl = Math.round(c.sent * 0.985);
        c.rd = Math.round(c.dl * Math.min(0.78, ticks * 0.06));
        c.rp = Math.round(c.rd * Math.min(0.19, ticks * 0.015));
        c.fl = Math.min(9, Math.round(ticks * 0.7));
        if (c.sent + c.fl >= c.total) { c.sent = c.total - c.fl; c.status = 'completed'; clearInterval(iv); }
        var el = views.campaigns.querySelector('[data-camp="c0"]');
        if (el) el.outerHTML = campCard(c);
      }, reduced ? 50 : 650);
    });

    /* ----- Analytics ----- */
    var range = '7d';
    function sum(a) { return a.reduce(function (x, y) { return x + y; }, 0); }
    function chartSVG(d) {
      var W = 600, H = 170, P = 6;
      var max = Math.max.apply(null, d.sent) * 1.12;
      var n = d.sent.length;
      function x(i) { return P + i * (W - 2 * P) / (n - 1); }
      function y(v) { return H - (v / max) * (H - 14); }
      function path(arr) { return arr.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ',' + y(v).toFixed(1); }).join(' '); }
      var grid = [0.25, 0.5, 0.75].map(function (f) { return '<line x1="0" x2="' + W + '" y1="' + (H - f * (H - 14)) + '" y2="' + (H - f * (H - 14)) + '" stroke="#E2E8F0" stroke-dasharray="3 5"/>'; }).join('');
      var cols = d.sent.map(function (v, i) {
        return '<g class="wfa-col"><rect x="' + (x(i) - (W / n) / 2) + '" y="0" width="' + (W / n) + '" height="' + H + '" fill="transparent"><title>' +
          (d.labels[i] || '') + ' · Sent ' + inr(v) + ' · Read ' + inr(d.read[i]) + ' · Replied ' + inr(d.rep[i]) + '</title></rect></g>';
      }).join('');
      return '<svg viewBox="0 0 ' + W + ' ' + (H + 18) + '" preserveAspectRatio="none" role="img" aria-label="Message volume chart, sample data">' +
        '<defs><linearGradient id="wfaG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#25D366" stop-opacity=".28"/><stop offset="1" stop-color="#25D366" stop-opacity="0"/></linearGradient></defs>' +
        grid +
        '<path d="' + path(d.sent) + ' L' + x(n - 1) + ',' + H + ' L' + x(0) + ',' + H + ' Z" fill="url(#wfaG)"/>' +
        '<path d="' + path(d.sent) + '" fill="none" stroke="#128C7E" stroke-width="2.2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
        '<path d="' + path(d.read) + '" fill="none" stroke="#53BDEB" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
        '<path d="' + path(d.rep) + '" fill="none" stroke="#7C3AED" stroke-width="1.8" stroke-dasharray="4 4" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
        d.labels.map(function (l, i) { return '<text x="' + x(i) + '" y="' + (H + 15) + '" font-size="10" fill="#94A3B8" text-anchor="' + (i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle') + '">' + l + '</text>'; }).join('') +
        cols + '</svg>';
    }
    RENDER.analytics = function () {
      var v = views.analytics;
      var d = RANGE[range];
      var s = sum(d.sent), r = sum(d.read), p = sum(d.rep);
      var dl = Math.round(s * 0.9804), fl = Math.round(s * 0.00345);
      v.innerHTML = '<div class="wfa-page">' +
        '<div class="wfa-pagehd"><div><h3 class="wfa-title">Analytics</h3><p class="wfa-sub">Performance insights across all WhatsApp channels</p></div>' +
        '<div class="wfa-seg" role="group" aria-label="Range">' + ['7d', '30d', '90d'].map(function (k) {
          return '<button type="button" data-range="' + k + '" class="' + (k === range ? 'on' : '') + '" aria-pressed="' + (k === range) + '">' + k + '</button>';
        }).join('') + '</div></div>' +
        '<div class="wfa-stats">' +
        stat('Messages sent', s, 'All channels') +
        stat('Delivered', dl, (Math.round(dl / s * 1000) / 10) + '% of sent', 'good') +
        stat('Read', r, (Math.round(r / dl * 1000) / 10) + '% of delivered') +
        stat('Replied', p, (Math.round(p / r * 1000) / 10) + '% of read') +
        stat('Failed', fl, 'Mostly invalid numbers', 'bad') +
        stat('New contacts', d.contacts, 'Opted in this period') +
        '</div>' +
        '<div class="wfa-card wfa-chartbox"><div class="wfa-panel-hd" style="margin-bottom:0"><div><h4 class="wfa-h" style="margin:0;font-size:13.5px">Message volume</h4></div>' +
        '<div class="wfa-legend"><span><i style="background:#128C7E"></i>Sent</span><span><i style="background:#53BDEB"></i>Read</span><span><i style="background:#7C3AED"></i>Replied</span></div></div>' +
        '<div class="wfa-chart">' + chartSVG(d) + '</div></div>' +
        '<div class="wfa-card wfa-panel" style="margin-top:10px"><div class="wfa-panel-hd"><div><h4>Team</h4><p>Who is answering, and how fast.</p></div></div>' +
        '<table class="wfa-table"><thead><tr><th>Agent</th><th class="r">Assigned now</th><th class="r">Replied</th><th class="r wfa-hide-sm">First reply</th><th class="r">Read rate</th></tr></thead><tbody>' +
        [['Meera Shah', 7, 412, '3m 10s', 88.2], ['Rahul Verma', 6, 356, '4m 45s', 85.9], ['Ananya Das', 5, 298, '2m 55s', 87.1]].map(function (a) {
          return '<tr><td><span class="wfa-agent"><i style="background:' + avColor(a[0]) + '">' + initials(a[0]) + '</i>' + a[0] + '</span></td><td class="r">' + a[1] + '</td><td class="r">' + inr(a[2] * (range === '7d' ? 1 : range === '30d' ? 4.2 : 12.6)) + '</td><td class="r wfa-hide-sm">' + a[3] + '</td><td class="r" style="font-weight:700;color:#047857">' + a[4] + '%</td></tr>';
        }).join('') + '</tbody></table></div></div>';
      runCounts(v);
    };
    views.analytics && views.analytics.addEventListener('click', function (e) {
      var b = e.target.closest('[data-range]');
      if (b) { range = b.getAttribute('data-range'); RENDER.analytics(); }
    });

    /* ----- Automation (a browser-only walkthrough of one sample flow) ----- */
    var FLOW = [
      ['zap', '#F59E0B', 'Trigger', 'Message received · contains “catalogue”', 'A catalogue enquiry starts the flow.'],
      ['msg', '#22C55E', 'Send Message', 'Share the latest collection', 'The customer gets the collection with two quick-reply buttons.'],
      ['reply', '#0EA5E9', 'Receive Message', 'Continue when the customer replies', 'The flow waits for the customer to answer.'],
      ['tag', '#6366F1', 'Add Tag', 'Interested · Living room', 'An interest tag adds context to the contact.'],
      ['bell', '#F43F5E', 'Notify Agent', 'Assign to the sales team', 'The sales team is notified to pick up the conversation.']
    ];
    var flowStep = -1;
    function node(n, i) {
      return '<div class="wfa-node' + (i === flowStep ? ' cur' : '') + '" style="--c:' + n[1] + '"><div class="nt"><span class="ni">' + ic(n[0]) + '</span>' + n[2] + '</div><p>' + n[3] + '</p></div>';
    }
    RENDER.automation = function () {
      var v = views.automation;
      v.innerHTML = '<div class="wfa-page">' +
        '<div class="wfa-pagehd"><div><h3 class="wfa-title">Automation</h3><p class="wfa-sub">Visual flow-based automations</p></div>' +
        '<button type="button" class="wfa-btn ghost" data-act="new-flow">' + ic('plus') + 'New flow</button></div>' +
        '<div class="wfa-card" style="overflow:hidden"><div class="wfa-flow-hd"><div><h4 class="wfa-h">Catalogue enquiry</h4>' +
        '<p><span class="wfa-sp sp-completed">Active</span> Sample flow · 412 runs this month</p></div>' +
        '<button type="button" class="wfa-btn" data-act="walk">' + (flowStep < 0 ? 'Walk through this flow' : flowStep === FLOW.length - 1 ? 'Restart walkthrough' : 'Next step') + ic('arrow') + '</button></div>' +
        '<div class="wfa-flow">' + node(FLOW[0], 0) + '<i class="wfa-edge"></i>' + node(FLOW[1], 1) + '<i class="wfa-edge"></i>' + node(FLOW[2], 2) +
        '<div class="wfa-fork">' + node(FLOW[3], 3) + node(FLOW[4], 4) + '</div></div>' +
        '<p class="wfa-flow-st" role="status">' + (flowStep < 0 ? 'Select “Walk through this flow” to follow the five steps.' : 'Step ' + (flowStep + 1) + ' of ' + FLOW.length + ': ' + FLOW[flowStep][4]) + '</p>' +
        '</div></div>';
    };
    views.automation && views.automation.addEventListener('click', function (e) {
      if (e.target.closest('[data-act="walk"]')) {
        flowStep = (flowStep + 1) % FLOW.length;
        RENDER.automation();
        var b = views.automation.querySelector('[data-act="walk"]');
        if (b) b.focus();
      } else if (e.target.closest('[data-act="new-flow"]')) showToast('Building your own flows');
    });

    /* ----- Boot ----- */
    select('priya', false);
    current = 'inbox';
    renderPills();
  }

  /* ---------- Boot ---------- */
  function boot() {
    document.querySelectorAll('[data-wfa-sidebar]').forEach(buildSidebar);
    document.querySelectorAll('[data-ic]').forEach(function (el) { el.outerHTML = ic(el.getAttribute('data-ic'), el.getAttribute('data-ic-class')); });
    document.querySelectorAll('.wfa-hero').forEach(initHero);
    document.querySelectorAll('[data-wfa-rows-static]').forEach(function (el) {
      el.innerHTML = HERO_ROWS.slice(0, 4).map(function (c, i) { return rowHTML(c, i === 0, 'li'); }).join('');
    });
    var tour = document.getElementById('wfaTour');
    if (tour) initTour(tour);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
