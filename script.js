(() => {
  'use strict';

  document.documentElement.classList.add('js');

  /* =========================================================
     HELPERS
  ========================================================= */
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const store = {
    get(key, fallback = null) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : v; }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch {}
    }
  };

  const LANGS = ['id', 'en'];
  const THEMES = ['brutalism', 'simple', 'darkglass', 'terminal'];
  const DEFAULT_ACCENT = '#FF7EB6';

  /* =========================================================
     I18N
  ========================================================= */
  const I18N = {
    id: {
      'meta.title': 'nsn. — developer / programmer / modder',
      'skip': 'Lewati ke konten',
      'nav.about': 'about', 'nav.projects': 'projects', 'nav.music': 'music', 'nav.favorite': 'favorite',
      'settings.open': 'Buka pengaturan', 'settings.kicker': 'PENGATURAN',
      'settings.title': 'Atur tampilan.', 'settings.close': 'Tutup pengaturan',
      'settings.language': 'Bahasa', 'settings.theme': 'Tema',
      'settings.accent': 'Warna Aksen', 'settings.custom': 'Custom',
      'theme.brutalism': 'Brutalism', 'theme.simple': 'Simple',
      'theme.darkglass': 'Dark Glass', 'theme.terminal': 'Terminal',
      'hero.kicker': 'hai, aku',
      'hero.name1': 'anos,', 'hero.name2': 'nosan,', 'hero.name3': 'nsn.',
      'hero.desc': 'aku hanya seorang developer / programmer / modder yang suka coding, editing, minecraft redstone, dan command block.',
      'hero.github': 'GitHub', 'hero.projects': 'Lihat Projects',
      'tag.coding': 'Coding', 'tag.editing': 'Editing',
      'tag.redstone': 'Redstone', 'tag.command': 'Command Block', 'tag.modder': 'Modder',
      'projects.title': 'Projects', 'projects.sub': 'Semua ada di GitHub-ku',
      'group.bots': 'Bots & Automation', 'group.minecraft': 'Minecraft', 'group.other': 'Lainnya',
      'proj.discord.title': 'Discord Bot',
      'proj.discord.desc': 'Bot Discord multifungsi: moderasi, utilitas, dan fitur custom.',
      'proj.selfbot.title': 'Discord Self-Bot / Automation',
      'proj.selfbot.desc': 'Automasi akun sendiri untuk keperluan personal & eksperimen.',
      'proj.telegram.title': 'Telegram Bot',
      'proj.telegram.desc': 'Bot Telegram dengan berbagai command dan fitur custom.',
      'proj.facebook.title': 'Facebook Bot',
      'proj.facebook.desc': 'Automasi & bot untuk Facebook Messenger / Page.',
      'proj.server.title': 'MC Server',
      'proj.server.desc': 'Server minecraft yang sudah aku setup dan konfigurasi.',
      'proj.redstone.title': 'Redstone',
      'proj.redstone.desc': 'Build redstone sederhana di minecraft.',
      'proj.termux.title': 'Termux Theme',
      'proj.termux.desc': 'Tema custom untuk Termux, tampilan dan warna sesuai selera.',
      'proj.axml.title': 'AXML Audio',
      'proj.axml.desc': 'Eksperimen bikin musik lewat coding XML (AXML).',
      'proj.website.title': 'Website',
      'proj.website.desc': 'Beberapa website static yang sudah aku buat.',
      'proj.app.title': 'Aplikasi',
      'proj.app.desc': 'Aplikasi sederhana yang aku buat untuk belajar.',
      'proj.exe.title': 'EXE',
      'proj.exe.desc': 'Program executable yang sudah aku compile sendiri.',
      'proj.samp.title': 'SAMP Lua',
      'proj.samp.desc': 'Script lua untuk SA-MP server.',
      'proj.scripts.title': 'Script Lainnya',
      'proj.scripts.desc': 'Berbagai script lainnya, lihat di GitHub ku.',
      'music.kicker': 'Music', 'music.title': 'Lagu favorit',
      'music.track': 'TRACK 01 / FAVORITE',
      'music.song': 'i love you so i can never let you go',
      'music.hint': 'tekan play untuk dengar lagu favorit ku.',
      'music.error': 'audio tidak bisa dimuat. pastikan lagu.mp3 ada di folder yang sama.',
      'music.retry': 'Coba lagi',
      'music.play': 'Putar lagu', 'music.pause': 'Jeda lagu',
      'music.src': 'Audio src: lagu.mp3', 'music.seek': 'Geser posisi lagu',
      'music.fallback': 'browser mu tidak support audio.',
      'favorite.kicker': 'Characters', 'favorite.title': 'Favorite',
      'fav.oguri.meta': '01 / MAIN FAVORITE',
      'fav.oguri.title': 'Oguri Cap',
      'fav.oguri.desc': 'aku menyukai karakter anime yang memiliki sedikit ekspresi seperti oguri cap.',
      'fav.ryo.meta': '02 / RYO',
      'fav.ryo.title': 'Ryo Yamada',
      'fav.ryo.desc': 'gitaris Kessoku Band. ekspresinya datar, tapi itu yang bikin dia menarik.',
      'fav.natsu.meta': '03 / NATSU',
      'fav.natsu.title': 'Yutori Natsu',
      'fav.natsu.desc': 'karakter dari Blue Archive. senyum kecil, tatapan tenang.',
      'assets.summary': 'ASSET INFO',
      'footer.github': 'GitHub', 'footer.copy': '© 2026 nsn.'
    },
    en: {
      'meta.title': 'nsn. — developer / programmer / modder',
      'skip': 'Skip to content',
      'nav.about': 'about', 'nav.projects': 'projects', 'nav.music': 'music', 'nav.favorite': 'favorite',
      'settings.open': 'Open settings', 'settings.kicker': 'SETTINGS',
      'settings.title': 'Make it yours.', 'settings.close': 'Close settings',
      'settings.language': 'Language', 'settings.theme': 'Theme',
      'settings.accent': 'Accent Color', 'settings.custom': 'Custom',
      'theme.brutalism': 'Brutalism', 'theme.simple': 'Simple',
      'theme.darkglass': 'Dark Glass', 'theme.terminal': 'Terminal',
      'hero.kicker': "hi, i'm",
      'hero.name1': 'anos,', 'hero.name2': 'nosan,', 'hero.name3': 'nsn.',
      'hero.desc': 'just a developer / programmer / modder who enjoys coding, editing, minecraft redstone, and command blocks.',
      'hero.github': 'GitHub', 'hero.projects': 'View Projects',  
      'tag.coding': 'Coding', 'tag.editing': 'Editing',
      'tag.redstone': 'Redstone', 'tag.command': 'Command Block', 'tag.modder': 'Modder',
      'projects.title': 'Projects', 'projects.sub': 'All on my GitHub',
      'group.bots': 'Bots & Automation', 'group.minecraft': 'Minecraft', 'group.other': 'Others',
      'proj.discord.title': 'Discord Bot',
      'proj.discord.desc': 'Multi-purpose Discord bot: moderation, utilities, and custom features.',
      'proj.selfbot.title': 'Discord Self-Bot / Automation',
      'proj.selfbot.desc': 'Personal account automation for experiments and personal use.',
      'proj.telegram.title': 'Telegram Bot',
      'proj.telegram.desc': 'Telegram bot with various commands and custom features.',
      'proj.facebook.title': 'Facebook Bot',
      'proj.facebook.desc': 'Automation & bot for Facebook Messenger / Page.',
      'proj.server.title': 'MC Server',
      'proj.server.desc': 'Minecraft server I set up and configured myself.',
      'proj.redstone.title': 'Redstone',
      'proj.redstone.desc': 'Simple redstone builds in minecraft.',
      'proj.termux.title': 'Termux Theme',
      'proj.termux.desc': 'Custom Termux theme, styled to taste.',
      'proj.axml.title': 'AXML Audio',
      'proj.axml.desc': 'Experimenting with making music through XML coding (AXML).',
      'proj.website.title': 'Website',
      'proj.website.desc': 'A few static websites I have built.',
      'proj.app.title': 'App',
      'proj.app.desc': 'Simple apps I built for learning purposes.',
      'proj.exe.title': 'EXE',
      'proj.exe.desc': 'Executable programs I compiled myself.',
      'proj.samp.title': 'SAMP Lua',
      'proj.samp.desc': 'Lua scripts for SA-MP servers.',
      'proj.scripts.title': 'Other Scripts',
      'proj.scripts.desc': 'Various other scripts, check my GitHub.',
      'music.kicker': 'Music', 'music.title': 'Favorite song',
      'music.track': 'TRACK 01 / FAVORITE',
      'music.song': 'i love you so i can never let you go',
      'music.hint': 'press play to hear my favorite song.',
      'music.error': 'could not load audio. make sure lagu.mp3 exists in the same folder.',
      'music.retry': 'Retry',
      'music.play': 'Play song', 'music.pause': 'Pause song',
      'music.src': 'Audio src: lagu.mp3', 'music.seek': 'Seek track',
      'music.fallback': 'Your browser does not support audio.',
      'favorite.kicker': 'Characters', 'favorite.title': 'Favorite',
      'fav.oguri.meta': '01 / MAIN FAVORITE',
      'fav.oguri.title': 'Oguri Cap',
      'fav.oguri.desc': 'I like anime characters with a subtle, understated expression like Oguri Cap.',
      'fav.ryo.meta': '02 / RYO',
      'fav.ryo.title': 'Ryo Yamada',
      'fav.ryo.desc': 'Kessoku Band guitarist. flat expression, but that is what makes her charming.',
      'fav.natsu.meta': '03 / NATSU',
      'fav.natsu.title': 'Yutori Natsu',
      'fav.natsu.desc': 'A Blue Archive character. small smile, calm gaze.',
      'assets.summary': 'ASSET INFO',
      'footer.github': 'GitHub', 'footer.copy': '© 2026 nsn.'
    }
  };

  /* =========================================================
     STATE
  ========================================================= */
  let lang = LANGS.includes(store.get('nsn.lang'))
    ? store.get('nsn.lang')
    : (navigator.language || 'id').toLowerCase().startsWith('id') ? 'id' : 'en';

  let currentTheme = THEMES.includes(store.get('nsn.theme')) ? store.get('nsn.theme') : 'brutalism';
  let currentAccent = normalizeHex(store.get('nsn.accent')) || DEFAULT_ACCENT;

  function translate(key) {
    return I18N[lang]?.[key] ?? I18N.id[key] ?? key;
  }

  /* =========================================================
     COLOR UTILS
  ========================================================= */
  function normalizeHex(value) {
    if (typeof value !== 'string') return null;
    let hex = value.trim();
    if (/^#[0-9a-f]{3}$/i.test(hex)) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    return /^#[0-9a-f]{6}$/i.test(hex) ? hex.toUpperCase() : null;
  }

  function luminance(hex) {
    const c = hex.slice(1);
    const channels = [0, 2, 4]
      .map(i => parseInt(c.slice(i, i + 2), 16) / 255)
      .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }

  function readableInk(hex) {
    return luminance(hex) > 0.179 ? '#0A0A0A' : '#FFFFFF';
  }

  function displayAccent(hex, theme) {
    if (theme !== 'terminal') return hex;
    if (luminance(hex) >= 0.18) return hex;
    const rgb = [0, 2, 4].map(i => parseInt(hex.slice(1).slice(i, i + 2), 16));
    const mixed = rgb.map(v => Math.round(v + (255 - v) * 0.55));
    return '#' + mixed.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  /* =========================================================
     THEME / ACCENT / LANGUAGE
  ========================================================= */
  function updatePressedStates() {
    $$('[data-set-theme]').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.setTheme === currentTheme));
    });
    $$('[data-lang]').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    $$('[data-accent]').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.accent.toUpperCase() === currentAccent));
    });
    const custom = $('#accent-custom');
    if (custom) custom.value = currentAccent.toLowerCase();
  }

  function applyTheme(theme, persist = true) {
    currentTheme = THEMES.includes(theme) ? theme : 'brutalism';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.style.setProperty('--accent-display', displayAccent(currentAccent, currentTheme));
    updatePressedStates();
    if (persist) store.set('nsn.theme', currentTheme);
  }

  function applyAccent(hex, persist = true) {
    const safe = normalizeHex(hex);
    if (!safe) return;
    currentAccent = safe;
    const root = document.documentElement;
    root.style.setProperty('--accent', safe);
    root.style.setProperty('--accent-ink', readableInk(safe));
    root.style.setProperty('--accent-display', displayAccent(safe, currentTheme));
    updatePressedStates();
    if (persist) store.set('nsn.accent', safe);
  }

  function splitText(el) {
    if (el.dataset.splitDone === '1') {
      el.textContent = el.dataset.original || '';
    }
    el.dataset.original = el.textContent;
    const text = el.textContent;
    if (!text.trim()) { el.dataset.splitDone = '1'; return; }

    el.textContent = '';
    const frag = document.createDocumentFragment();
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.setProperty('--i', i);
      span.textContent = char === ' ' ? '\u00A0' : char;
      frag.appendChild(span);
    });
    el.appendChild(frag);
    el.classList.add('split');
    el.dataset.splitDone = '1';
  }

  function setLanguage(next, persist = true) {
    lang = LANGS.includes(next) ? next : 'id';
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    $$('[data-split][data-split-done="1"]').forEach(el => {
      el.classList.remove('split', 'is-in');
      el.textContent = el.dataset.original || el.textContent;
      delete el.dataset.splitDone;
    });

    $$('[data-i18n]').forEach(el => {
      const val = translate(el.dataset.i18n);
      if (val != null) el.textContent = val;
    });
    $$('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', translate(el.dataset.i18nAria));
    });

    $$('[data-split]').forEach(el => {
      splitText(el);
      if (el.closest('.hero')) {
        requestAnimationFrame(() => el.classList.add('is-in'));
      } else if (revealObserver) {
        revealObserver.observe(el);
      } else {
        el.classList.add('is-in');
      }
    });

    updatePressedStates();
    updatePlayButtonLabel();
    document.title = translate('meta.title');
    if (persist) store.set('nsn.lang', lang);
  }

  /* =========================================================
     DIALOG
  ========================================================= */
  const dialog = $('#settings-dialog');
  const openSettings = $('#open-settings');
  const closeSettings = $('#close-settings');

  function openDialog() {
    if (!dialog) return;
    dialog.showModal();
    document.body.classList.add('is-locked');
  }
  function closeDialog() { if (dialog?.open) dialog.close(); }

  openSettings?.addEventListener('click', openDialog);
  closeSettings?.addEventListener('click', closeDialog);
  dialog?.addEventListener('close', () => document.body.classList.remove('is-locked'));
  dialog?.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });

  /* =========================================================
     THEME / LANG / ACCENT SWITCH — direct listeners
  ========================================================= */
  $$('[data-set-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      try { applyTheme(btn.dataset.setTheme); }
      catch (err) { console.warn('theme switch failed', err); }
    });
  });

  $$('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      try { setLanguage(btn.dataset.lang); }
      catch (err) { console.warn('lang switch failed', err); }
    });
  });

  $$('[data-accent]').forEach(btn => {
    btn.addEventListener('click', () => applyAccent(btn.dataset.accent));
  });

  $('#accent-custom')?.addEventListener('input', e => applyAccent(e.target.value));

  /* =========================================================
     NAV ACTIVE
  ========================================================= */
  const navLinks = $$('.site-nav a');
  const sectionIds = ['about', 'projects', 'music', 'favorite'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  let revealObserver = null;

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => navObserver.observe(s));
  }

  /* =========================================================
     REVEAL OBSERVER
  ========================================================= */
  if ('IntersectionObserver' in window && !reducedMotion) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (entry.target.dataset.splitDone === '1') {
          entry.target.classList.add('is-in');
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }

  function setupReveals() {
    $$('[data-reveal]').forEach(el => {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add('is-visible');
    });
    $$('[data-split]').forEach(el => {
      if (el.closest('.hero')) return;
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add('is-in');
    });
  }

  /* =========================================================
     SCROLL PROGRESS + HEADER
  ========================================================= */
  const header = $('.site-header');
  const scrollBar = $('#scroll-bar');
  let rafPending = false;

  function onScroll() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const scrolled = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      if (scrollBar) scrollBar.style.transform = `scaleX(${scrolled})`;
      header?.classList.toggle('is-scrolled', doc.scrollTop > 12);
      rafPending = false;
    });
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* =========================================================
     MAGNETIC BUTTONS
  ========================================================= */
  if (finePointer && !reducedMotion) {
    $$('.btn--magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        btn.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* =========================================================
     3D TILT (cards)
  ========================================================= */
  if (finePointer && !reducedMotion) {
    $$('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* =========================================================
     HERO 3D — Apple-style floating glass card
     - Base angle (resting)
     - Mouse parallax
     - Scroll-driven rotation
     - Smooth interpolation
  ========================================================= */
  const hero3d = $('#hero-3d');
  const hero3dStage = $('#hero-3d-stage');
  const heroEl = $('.hero');

  if (hero3d) {
    const BASE_RY = -14;
    const BASE_RX = 6;

    // start more rotated for entrance reveal
    let smoothRY = -40;
    let smoothRX = 20;

    let mouseRY = 0, mouseRX = 0;
    let scrollRY = 0, scrollRX = 0;

    if (finePointer && !reducedMotion && heroEl) {
      heroEl.addEventListener('pointermove', e => {
        const rect = heroEl.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        mouseRY = nx * 22;
        mouseRX = -ny * 16;
      }, { passive: true });

      heroEl.addEventListener('pointerleave', () => {
        mouseRY = 0;
        mouseRX = 0;
      });
    }

    function updateScrollRotation() {
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 = hero top at viewport top; 1 = hero fully scrolled past 70% of its height
      const p = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.7)));
      scrollRY = p * 26;
      scrollRX = p * -16;
    }
    updateScrollRotation();
    window.addEventListener('scroll', updateScrollRotation, { passive: true });

    function animateHero3d() {
      const targetRY = BASE_RY + mouseRY + scrollRY;
      const targetRX = BASE_RX + mouseRX + scrollRX;

      smoothRY += (targetRY - smoothRY) * 0.08;
      smoothRX += (targetRX - smoothRX) * 0.08;

      hero3d.style.setProperty('--ry', `${smoothRY.toFixed(2)}deg`);
      hero3d.style.setProperty('--rx', `${smoothRX.toFixed(2)}deg`);

      requestAnimationFrame(animateHero3d);
    }

    if (!reducedMotion) animateHero3d();
    else {
      hero3d.style.setProperty('--ry', `${BASE_RY}deg`);
      hero3d.style.setProperty('--rx', `${BASE_RX}deg`);
    }

    // Start floating animation after a small delay
    setTimeout(() => {
      hero3dStage?.classList.add('is-ready');
    }, reducedMotion ? 0 : 900);
  }

  /* =========================================================
     AUDIO PLAYER
  ========================================================= */
  const audio = $('#audio');
  const player = $('#player');
  const playBtn = $('#play-btn');
  const seek = $('#seek');
  const currentTimeEl = $('#current-time');
  const durationEl = $('#duration');
  const playerHint = $('#player-hint');
  const waveform = $('#waveform');
  const playerError = $('#player-error');
  const playerErrorText = $('#player-error-text');
  const retryBtn = $('#audio-retry');

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updatePlayButtonLabel() {
    if (!audio || !playBtn) return;
    const isPlaying = !audio.paused && !audio.ended;
    playBtn.setAttribute('aria-label', translate(isPlaying ? 'music.pause' : 'music.play'));
    const playIcon = playBtn.querySelector('.icon-play');
    const pauseIcon = playBtn.querySelector('.icon-pause');
    if (playIcon && pauseIcon) {
      playIcon.hidden = isPlaying;
      pauseIcon.hidden = !isPlaying;
    }
  }

  function buildWaveform() {
    if (!waveform || waveform.dataset.built === '1') return;
    waveform.dataset.built = '1';
    const BAR_COUNT = 64;
    const makeLayer = (cls) => {
      const layer = document.createElement('div');
      layer.className = `wave-layer ${cls}`;
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = document.createElement('span');
        const h = 14 + Math.abs(Math.sin(i * 1.73 + 0.4)) * 70 + (i % 4) * 3;
        bar.style.height = `${Math.min(100, h)}%`;
        layer.appendChild(bar);
      }
      return layer;
    };
    waveform.append(makeLayer('wave-muted'), makeLayer('wave-accent'));
  }

  function showAudioError(show) {
    if (!playerError) return;
    playerError.hidden = !show;
    if (playerErrorText) playerErrorText.textContent = translate('music.error');
  }

  function syncPlayerUI() {
    const dur = audio.duration;
    const progress = Number.isFinite(dur) && dur > 0 ? (audio.currentTime / dur) * 100 : 0;
    if (seek) seek.value = String(Math.round(progress * 10));
    if (waveform) waveform.style.setProperty('--progress', `${progress}%`);
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    if (durationEl) durationEl.textContent = formatTime(dur);
  }

  function setPlaying(playing) {
    player?.classList.toggle('is-playing', playing);
    updatePlayButtonLabel();
  }

  buildWaveform();

  if (audio && playBtn) {
    playBtn.addEventListener('click', async () => {
      try {
        if (audio.paused) {
          if (audio.error) audio.load();
          await audio.play();
          showAudioError(false);
        } else {
          audio.pause();
        }
      } catch (err) {
        showAudioError(true);
        setPlaying(false);
      }
    });

    retryBtn?.addEventListener('click', async () => {
      try {
        showAudioError(false);
        audio.load();
        await audio.play();
      } catch {
        showAudioError(true);
        setPlaying(false);
      }
    });

    audio.addEventListener('loadedmetadata', () => { syncPlayerUI(); showAudioError(false); });
    audio.addEventListener('durationchange', syncPlayerUI);
    audio.addEventListener('timeupdate', syncPlayerUI);
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('ended', () => {
      setPlaying(false);
      audio.currentTime = 0;
      syncPlayerUI();
    });
    audio.addEventListener('error', () => {
      setPlaying(false);
      showAudioError(true);
    });

    seek?.addEventListener('input', () => {
      const dur = audio.duration;
      if (Number.isFinite(dur) && dur > 0) {
        audio.currentTime = (Number(seek.value) / 1000) * dur;
        syncPlayerUI();
      }
    });

    syncPlayerUI();
  }

  /* =========================================================
     IMAGE FALLBACKS
  ========================================================= */
  $$('.fav-media img').forEach(img => {
    const wrap = img.closest('.fav-media');
    const markError = () => wrap?.classList.add('has-error');
    img.addEventListener('error', markError);
    if (img.complete && img.naturalWidth === 0) markError();
  });

  /* =========================================================
     HERO TITLE LINE INDEX
  ========================================================= */
  $$('.hero .display .line').forEach((line, i) => {
    line.style.setProperty('--li', i);
  });

  /* =========================================================
     INIT
  ========================================================= */
  function init() {
    applyTheme(currentTheme, false);
    applyAccent(currentAccent, false);
    setLanguage(lang, false);
    setupReveals();

    setTimeout(() => {
      const loader = $('#loader');
      loader?.classList.add('is-done');
      setTimeout(() => loader?.remove(), 700);
      $$('.hero [data-split]').forEach(el => el.classList.add('is-in'));
    }, reducedMotion ? 0 : 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();