---
layout: page
title: Tag
permalink: /tags/
description: Jelajahi artikel berdasarkan tag.
---

<div id="tags-view">
  <!-- View 1: Index semua tags (default) -->
  <div id="tags-index">
    <div class="tags-cloud">
      {% assign tags = site.tags | sort %}
      {% for tag in tags %}
        {% assign name = tag | first %}
        {% assign posts = tag | last %}
        <a href="{{ '/tags/?t=' | append: name | slugify | relative_url }}" class="md3-chip" data-tag="{{ name | slugify }}">
          #{{ name }} <span class="count">({{ posts.size }})</span>
        </a>
      {% endfor %}
    </div>
  </div>

  <!-- View 2: Posts dengan tag tertentu (ditampilkan via JS) -->
  <div id="tags-detail" hidden>
    <div class="category-header">
      <a href="{{ '/tags/' | relative_url }}" class="md3-button text back-btn">
        <span class="material-symbols-rounded">arrow_back</span> Semua Tag
      </a>
      <h2 id="tag-title" class="category-title">
        <span class="material-symbols-rounded">sell</span>
        <span id="tag-name"></span>
      </h2>
      <p id="tag-count" class="category-count"></p>
    </div>
    <div id="tag-posts" class="articles-grid"></div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const tagSlug = params.get('t');
  
  if (!tagSlug) return;
  
  document.getElementById('tags-index').hidden = true;
  document.getElementById('tags-detail').hidden = false;
  
  const tags = {{ site.tags | map: 'first' | jsonify }};
  const tagName = tags.find(t => 
    t.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === tagSlug
  ) || tagSlug;
  
  document.getElementById('tag-name').textContent = '#' + tagName;
  
  fetch('{{ "/search.json" | relative_url }}')
    .then(r => r.json())
    .then(posts => {
      const filtered = posts.filter(p => 
        (p.tags || []).some(t => 
          t.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === tagSlug
        )
      );
      
      document.getElementById('tag-count').textContent = `${filtered.length} artikel ditemukan`;
      
      if (filtered.length === 0) {
        document.getElementById('tag-posts').innerHTML = 
          '<p class="no-posts">Belum ada artikel dengan tag ini.</p>';
        return;
      }
      
      document.getElementById('tag-posts').innerHTML = filtered.map(p => {
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
                <span class="md3-chip small">#${escapeHtml(tagName)}</span>
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
      document.getElementById('tag-posts').innerHTML = 
        '<p class="error">Gagal memuat artikel.</p>';
    });
});

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
</script>
