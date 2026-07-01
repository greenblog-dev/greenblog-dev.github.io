---
layout: page
title: Kategori
permalink: /kategori/
description: Jelajahi artikel berdasarkan kategori.
---

<div id="kategori-view">
  <!-- View 1: Index semua kategori (default) -->
  <div id="kategori-index">
    <div class="kategori-grid">
     {% assign cats = site.categories | sort %}
{% for cat in cats %}
  {% assign name = cat | first %}
  {% assign posts = cat | last %}
  {% assign name_slug = name | slugify %}
  <a href="{{ '/kategori/?c=' | append: name_slug | relative_url }}" class="kategori-card md3-surface-1" data-category="{{ name_slug }}">
    <span class="material-symbols-rounded">folder</span>
    <h3>{{ name }}</h3>
    <span class="count">{{ posts.size }} artikel</span>
  </a>
{% endfor %}
    </div>
  </div>

  <!-- View 2: Posts dalam kategori tertentu (ditampilkan via JS) -->
  <div id="kategori-detail" hidden>
    <div class="category-header">
      <a href="{{ '/kategori/' | relative_url }}" class="md3-button text back-btn">
        <span class="material-symbols-rounded">arrow_back</span> Semua Kategori
      </a>
      <h2 id="category-title" class="category-title">
        <span class="material-symbols-rounded">folder</span>
        <span id="category-name"></span>
      </h2>
      <p id="category-count" class="category-count"></p>
    </div>
    <div id="category-posts" class="articles-grid"></div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const categorySlug = params.get('c');
  
  if (!categorySlug) return; // Tampilkan index
  
  // Sembunyikan index, tampilkan detail
  document.getElementById('kategori-index').hidden = true;
  document.getElementById('kategori-detail').hidden = false;
  
  // Cari nama kategori asli dari slug
  const categories = {{ site.categories | map: 'first' | jsonify }};
  const categoryName = categories.find(c => {
    return c.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === categorySlug;
  }) || categorySlug;
  
  document.getElementById('category-name').textContent = categoryName;
  
  // Load posts dari search.json
  fetch('{{ "/search.json" | relative_url }}')
    .then(r => r.json())
    .then(posts => {
      const filtered = posts.filter(p => 
        (p.categories || []).some(c => 
          c.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === categorySlug
        )
      );
      
      document.getElementById('category-count').textContent = `${filtered.length} artikel ditemukan`;
      
      if (filtered.length === 0) {
        document.getElementById('category-posts').innerHTML = 
          '<p class="no-posts">Belum ada artikel dalam kategori ini.</p>';
        return;
      }
      
      document.getElementById('category-posts').innerHTML = filtered.map(p => {
        const date = new Date(p.date).toLocaleDateString('id-ID', { 
          day: '2-digit', month: 'short', year: 'numeric' 
        });
        const excerpt = (p.content || '').replace(/<[^>]+>/g, '').slice(0, 140);
        const words = (p.content || '').replace(/<[^>]+>/g, '').split(/\s+/).length;
        const readTime = Math.max(1, Math.floor(words / 200));
        const media = p.image 
          ? `<img src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy">`
          : `<div class="card-placeholder"><span class="material-symbols-rounded">article</span></div>`;
        
        return `
          <article class="article-card md3-surface-1">
            <a href="${p.url}" class="card-media" aria-hidden="true" tabindex="-1">${media}</a>
            <div class="card-body">
              <div class="card-chips">
                <span class="md3-chip small">${escapeHtml(categoryName)}</span>
              </div>
              <h3 class="card-title"><a href="${p.url}">${escapeHtml(p.title)}</a></h3>
              <p class="card-excerpt">${escapeHtml(excerpt)}...</p>
              <div class="card-meta">
                <time>${date}</time>
                <span>·</span>
                <span>${readTime} menit baca</span>
              </div>
            </div>
          </article>
        `;
      }).join('');
    })
    .catch(err => {
      console.error('Error loading posts:', err);
      document.getElementById('category-posts').innerHTML = 
        '<p class="error">Gagal memuat artikel.</p>';
    });
});

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
</script>
