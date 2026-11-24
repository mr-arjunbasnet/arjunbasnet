/* Sagarmatha College session — shared helpers for every page.
   - SAG.api(): calls /api/sagarmatha/* (same origin on the live site)
   - SAG.me: the student's name/email/roll, remembered on this phone
   - Fill-in fields: any <span class="ph">[TOPIC]</span> inside a .prompt
     becomes tappable and typeable; Copy copies the filled-in prompt. */
(function () {
  var LIVE = 'https://arjun-basnet.com.np';
  var base = location.protocol === 'file:' ? LIVE : '';
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || 'null'); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }

  var SAG = {
    url: function (p) { return base + '/api/sagarmatha/' + p; },
    api: function (p, body) {
      var opt = body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {};
      return fetch(SAG.url(p), opt).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (d) { d._status = r.status; return d; });
      }).catch(function () { return { error: 'offline', _status: 0 }; });
    },
    get me() { return store('sag-me') || {}; },
    set me(v) { store('sag-me', v); },
    store: store,
    esc: function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); },
    errorText: function (e) {
      return ({
        name_required: 'Please enter your name.',
        email_invalid: 'That email doesn’t look right.',
        already_played: 'This email has already played. One game per person.',
        already_started: 'This email already started a game on another phone or browser. Ask the trainer.',
        storage_not_configured: 'Saving isn’t switched on yet. Tell the trainer.',
        offline: 'No connection. Check your Wi-Fi or mobile data and try again.',
        slow_down: 'Too many tries. Wait a minute and try again.',
        pool_empty: 'The game isn’t ready yet. Tell the trainer.'
      })[e] || 'Something went wrong. Try again.';
    }
  };

  /* ---------- fill-in fields inside prompts ---------- */
  function setupPlaceholders(root) {
    (root || document).querySelectorAll('.prompt .ph').forEach(function (ph, i) {
      if (ph.dataset.ready) return;
      ph.dataset.ready = '1';
      var label = ph.textContent;
      var key = 'sag-ph:' + (ph.dataset.key || label);
      ph.dataset.placeholder = label;
      ph.setAttribute('contenteditable', 'plaintext-only');
      if (ph.contentEditable !== 'plaintext-only') ph.setAttribute('contenteditable', 'true');
      ph.setAttribute('role', 'textbox');
      ph.setAttribute('aria-label', label.replace(/[\[\]]/g, ''));
      ph.spellcheck = false;
      var saved = ph.dataset.nosave ? null : store(key);
      if (saved) { ph.textContent = saved; ph.classList.add('filled'); }
      ph.addEventListener('focus', function () {
        if (!ph.classList.contains('filled')) {
          var r = document.createRange(); r.selectNodeContents(ph);
          var s = getSelection(); s.removeAllRanges(); s.addRange(r);
        }
      });
      ph.addEventListener('keydown', function (e) {
        e.stopPropagation();
        if (e.key === 'Enter') { e.preventDefault(); ph.blur(); }
      });
      ph.addEventListener('input', function () { ph.classList.toggle('filled', ph.textContent.trim() !== '' && ph.textContent !== label); });
      ph.addEventListener('blur', function () {
        var t = ph.textContent.replace(/\s+/g, ' ').trim();
        if (!t || t === label) { ph.textContent = label; ph.classList.remove('filled'); if (!ph.dataset.nosave) store(key, ''); }
        else { ph.textContent = t; ph.classList.add('filled'); if (!ph.dataset.nosave) store(key, t); }
      });
      ph.addEventListener('paste', function (e) {
        e.preventDefault();
        var t = (e.clipboardData || window.clipboardData).getData('text').replace(/\s+/g, ' ');
        document.execCommand('insertText', false, t);
      });
    });
  }

  /* ---------- copy buttons ---------- */
  function promptText(box) {
    var c = box.cloneNode(true);
    c.querySelectorAll('.copy,.label').forEach(function (x) { x.remove(); });
    return c.textContent.replace(/ /g, ' ').trim();
  }
  function copyText(txt, btn) {
    function done() { var o = btn.textContent; btn.textContent = 'Copied ✓'; btn.classList.add('done'); setTimeout(function () { btn.textContent = o === 'Copied ✓' ? 'Copy' : o; btn.classList.remove('done'); }, 1600); }
    function fallback() { var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) {} ta.remove(); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
  }
  function setupCopy(root) {
    (root || document).querySelectorAll('.prompt .copy').forEach(function (b) {
      if (b.dataset.ready) return; b.dataset.ready = '1';
      b.addEventListener('click', function (e) { e.stopPropagation(); copyText(promptText(b.closest('.prompt')), b); });
    });
  }
  SAG.copyText = copyText;

  /* ---------- top bar: a way back to the session page from every page ----------
     A page can set SAG.leaveGuard = function(){ return 'message' } to ask
     before leaving (the game does this while a photo is on screen). */
  SAG.leaveGuard = null;
  function topbar() {
    if (document.querySelector('.sbar')) return;
    var nav = document.createElement('nav');
    nav.className = 'sbar';
    nav.setAttribute('aria-label', 'Session');
    nav.innerHTML = '<div class="in"><a class="back" href="/ai-training/sagarmatha-college">\u2190 Session page</a><span class="name">Getting started with Git and AI</span></div>';
    nav.querySelector('.back').addEventListener('click', function (e) {
      var msg = typeof SAG.leaveGuard === 'function' ? SAG.leaveGuard() : '';
      if (msg && !window.confirm(msg)) e.preventDefault();
    });
    document.body.insertBefore(nav, document.body.firstChild);
  }
  SAG.setup = function (root) { setupPlaceholders(root); setupCopy(root); };
  window.SAG = SAG;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { topbar(); SAG.setup(); }); else { topbar(); SAG.setup(); }
})();
