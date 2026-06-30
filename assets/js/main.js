/* =========================================================
   KARANG TARUNA — Main JavaScript
   Features: Theme, Menu, Search, Infinite Scroll, Back to Top,
             Reading Progress, Copy Link, Lazy Load
   ========================================================= */

(() => {
  'use strict';

  // ---------- THEME ----------
  const THEME_KEY = 'kt-theme';
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');

  const applyTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    if (themeIcon) themeIcon.textContent = t === 'dark' ? 'light_mode' : 'dark_mode';
    localStorage.setItem(THEME_KEY, t);
  };

  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ---------- MOBILE MENU ----------
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  menuToggle?.addEventListener('click', () => {
    const expanded = primaryNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', expanded);
  });
  document.addEventListener('click', (e) => {
    if (!primaryNav?.contains(e.target) && !menuToggle?.contains(e.target)) {
      primaryNav?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  // ---------- BACK TO TOP ----------
  const btt = document.getElementById('back-to-top');
  const onScroll = () => {
    if (window.scrollY > 400) btt?.classList.add('visible');
    else btt?.classList.remove('visible');
    updateProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---------- READING PROGRESS ----------
  const progress = document.getElementById('reading-progress');
  const updateProgress = () => {
    if (!progress) return;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    progress.style.width = pct + '%';
  };

  // ---------- SEARCH ----------
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchToggle = document.getElementById('search-toggle');
  let searchIndex = null;

  const openSearch = () => {
    searchModal?.removeAttribute('hidden');
    setTimeout(() => searchInput?.focus(), 50);
    loadSearchIndex();
  };
  const closeSearch = () => {
    searchModal?.setAttribute('hidden', '');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  };

  searchToggle?.addEventListener('click', openSearch);
  searchModal?.addEventListener('click', (e) => { if (e.target === searchModal) closeSearch(); });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
  });

  const loadSearchIndex = async () => {
    if (searchIndex) return;
    try {
      const res = await fetch('/search.json');
      searchIndex = await res.json();
    } catch (err) {
      console.warn('Search index not found', err);
    }
  };

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!searchIndex || q.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    const results = searchIndex.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.content || '').toLowerCase().includes(q) ||
      (p.categories || []).some(c => c.toLowerCase().includes(q)) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q))
    ).slice(0, 10);

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="no-results">Tidak ada hasil untuk <strong>' + escapeHtml(q) + '</strong></div>';
      return;
    }
    searchResults.innerHTML = results.map(p => `
      <a class="search-item" href="${p.url}" role="option">
        <h4>${highlight(p.title, q)}</h4>
        <p>${highlight((p.content || '').slice(0, 120), q)}...</p>
      </a>
    `).join('');
  });

  const escapeHtml = (s) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const highlight = (text, q) => {
    if (!q) return escapeHtml(text);
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return escapeHtml(text).replace(re, '<mark>$1</mark>');
  };

  // ---------- INFINITE SCROLL (Beranda) ----------
  const grid = document.getElementById('articles-grid');
  const sentinel = document.getElementById('infinite-sentinel');
  const loadStatus = document.getElementById('load-status');

  if (grid && sentinel && window.location.pathname === '/') {
    // Load posts from JSON
    const BATCH = 6;
    let allPosts = [];
    let currentPage = 0;
    let loading = false;

    const renderCard = (p) => {
      const cats = (p.categories || []).slice(0, 2).map(c =>
        `<a href="/kategori/${slugify(c)}/" class="md3-chip small">${c}</a>`).join('');
      const excerpt = (p.content || '').replace(/<[^>]+>/g, '').slice(0, 140);
      const words = (p.content || '').replace(/<[^>]+>/g, '').split(/\s+/).length;
      const readTime = Math.max(1, Math.floor(words / 200));
      const date = new Date(p.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
      const media = p.image
        ? `<img src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy" decoding="async">`
        : `<div class="card-placeholder"><span class="material-symbols-rounded">article</span></div>`;

      return `
        <article class="article-card md3-surface-1">
          <a href="${p.url}" class="card-media" aria-hidden="true" tabindex="-1">${media}</a>
          <div class="card-body">
            ${cats ? `<div class="card-chips">${cats}</div>` : ''}
            <h3 class="card-title"><a href="${p.url}">${escapeHtml(p.title)}</a></h3>
            <p class="card-excerpt">${escapeHtml(excerpt)}...</p>
            <div class="card-meta"><time>${date}</time><span>·</span><span>${readTime} menit baca</span></div>
          </div>
        </article>`;
    };

    const slugify = (s) => s.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    const loadBatch = () => {
      if (loading || currentPage * BATCH >= allPosts.length) return;
      loading = true;
      loadStatus?.removeAttribute('hidden');

      setTimeout(() => {
        const batch = allPosts.slice(currentPage * BATCH, (currentPage + 1) * BATCH);
        batch.forEach(p => grid.insertAdjacentHTML('beforeend', renderCard(p)));
        currentPage++;
        loading = false;
        loadStatus?.setAttribute('hidden', '');
        if (currentPage * BATCH >= allPosts.length) observer.disconnect();
      }, 300);
    };

    fetch('/search.json').then(r => r.json()).then(posts => {
      allPosts = posts;
      grid.innerHTML = ''; // remove skeleton
      loadBatch();

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) loadBatch();
      }, { rootMargin: '200px' });
      observer.observe(sentinel);
    }).catch(() => {
      grid.innerHTML = '<p>Belum ada artikel.</p>';
    });
  }

  // ---------- COPY LINK ----------
  document.getElementById('copy-link')?.addEventListener('click', async (e) => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const icon = e.currentTarget.querySelector('.material-symbols-rounded');
      const original = icon.textContent;
      icon.textContent = 'check';
      setTimeout(() => icon.textContent = original, 1500);
    } catch {}
  });

  // ---------- LAZY LOAD IMAGES ----------
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img.dataset.src) { img.src = img.dataset.src; }
    });
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset.src) img.src = img.dataset.src;
          io.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => io.observe(img));
  }

  // ---------- SMOOTH ANCHOR ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

})();
