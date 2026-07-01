---
layout: page
title: Kategori
permalink: /kategori/
description: Jelajahi artikel berdasarkan kategori.
---

<div id="kategori-view">
  <!-- View 1: Index kategori (default) -->
  <div id="kategori-index">
    <div class="kategori-grid">
      {% assign cats = site.categories | sort %}
      {% for cat in cats %}
        {% assign name = cat | first %}
        {% assign posts = cat | last %}
        <a href="#kategori-{{ name | slugify }}" class="kategori-card md3-surface-1" data-category="{{ name | slugify }}">
          <span class="material-symbols-rounded">folder</span>
          <h3>{{ name }}</h3>
          <span class="count">{{ posts.size }} artikel</span>
        </a>
      {% endfor %}
    </div>
  </div>

  <!-- View 2: Detail kategori (ditampilkan via JS) -->
  <div id="kategori-detail" hidden>
    <div class="category-header">
      <button class="md3-button text back-btn" onclick="showKategoriIndex()">
        <span class="material-symbols-rounded">arrow_back</span> Semua Kategori
      </button>
      <h2 class="category-title">
        <span class="material-symbols-rounded">folder</span>
        <span id="category-name"></span>
      </h2>
      <p id="category-count" class="category-count"></p>
    </div>
    <div id="category-posts" class="articles-grid">
      <p class="loading-text">Memuat artikel...</p>
    </div>
  </div>
</div>

<script>
// Data dari Jekyll (fallback jika fetch gagal)
const siteCategories = {{ site.categories | jsonify }};
const sitePosts = [
  {% for post in site.posts %}
  {
    "title": {{ post.title | jsonify }},
    "url": {{ post.url | relative_url | jsonify }},
    "date": {{ post.date | date_to_xmlschema | jsonify }},
    "categories": {{ post.categories | jsonify }},
    "image": {{ post.image | default: '' | relative_url | jsonify }},
    "excerpt": {{ post.excerpt | strip_html | normalize_whitespace | truncate: 160 | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function escapeHtml(s) {
  if (!s) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

function renderPostCard(post, categoryName) {
  const media = post.image 
    ? `<img src="${post.image}" alt="${escapeHtml(post.title)}" loading="lazy">`
    : `<div class="card-placeholder"><span class="material-symbols-rounded">article</span></div>`;
  
  const excerpt = post.excerpt || '';
  
  return `
    <article class="article-card md3-surface-1">
      <a href="${post.url}" class="card-media" aria-hidden="true" tabindex="-1">${media}</a>
      <div class="card-body">
        <div class="card-chips">
          <span class="md3-chip small">${escapeHtml(categoryName)}</span>
        </div>
        <h3 class="card-title"><a href="${post.url}">${escapeHtml(post.title)}</a></h3>
        <p class="card-excerpt">${escapeHtml(excerpt)}</p>
        <div class="card-meta">
          <time>${formatDate(post.date)}</time>
        </div>
      </div>
    </article>
  `;
}

function showKategoriDetail(slug) {
  // Cari nama kategori asli
  let categoryName = slug;
  let posts = [];
  
  // Cari dari data Jekyll
  for (const [name, catPosts] of Object.entries(siteCategories)) {
    if (slugify(name) === slug) {
      categoryName = name;
      posts = catPosts;
      break;
    }
  }
  
  document.getElementById('kategori-index').hidden = true;
  document.getElementById('kategori-detail').hidden = false;
  document.getElementById('category-name').textContent = categoryName;
  document.getElementById('category-count').textContent = `${posts.length} artikel ditemukan`;
  
  if (posts.length === 0) {
    document.getElementById('category-posts').innerHTML = 
      '<p class="no-posts">Belum ada artikel dalam kategori ini.</p>';
    return;
  }
  
  // Render posts dari data Jekyll (lebih reliable)
  const postsData = posts.map(p => ({
    title: p.title,
    url: p.url,
    date: p.date,
    image: p.image || '',
    excerpt: p.excerpt || ''
  }));
  
  document.getElementById('category-posts').innerHTML = 
    postsData.map(p => renderPostCard(p, categoryName)).join('');
  
  // Update URL tanpa reload
  const newUrl = `${window.location.pathname}?c=${slug}`;
  history.pushState({view: 'detail', slug: slug}, '', newUrl);
}

function showKategoriIndex() {
  document.getElementById('kategori-index').hidden = false;
  document.getElementById('kategori-detail').hidden = true;
  history.pushState({view: 'index'}, '', window.location.pathname);
}

// Handle back/forward browser
window.addEventListener('popstate', (e) => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('c');
  if (slug) showKategoriDetail(slug);
  else showKategoriIndex();
});

// Init saat load
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('c');
  
  if (slug) {
    showKategoriDetail(slug);
  }
  
  // Attach click handler ke semua kategori card
  document.querySelectorAll('.kategori-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = card.dataset.category;
      showKategoriDetail(slug);
    });
  });
});
</script>
