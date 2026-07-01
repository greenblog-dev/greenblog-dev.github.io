---
layout: page
title: Tag
permalink: /tags/
description: Jelajahi artikel berdasarkan tag.
---

<div id="tags-view">
  <!-- View 1: Index tags (default) -->
  <div id="tags-index">
    <div class="tags-cloud">
      {% assign tags = site.tags | sort %}
      {% for tag in tags %}
        {% assign name = tag | first %}
        {% assign posts = tag | last %}
        <a href="#tag-{{ name | slugify }}" class="md3-chip" data-tag="{{ name | slugify }}">
          #{{ name }} <span class="count">({{ posts.size }})</span>
        </a>
      {% endfor %}
    </div>
  </div>

  <!-- View 2: Detail tag (ditampilkan via JS) -->
  <div id="tags-detail" hidden>
    <div class="category-header">
      <button class="md3-button text back-btn" onclick="showTagsIndex()">
        <span class="material-symbols-rounded">arrow_back</span> Semua Tag
      </button>
      <h2 class="category-title">
        <span class="material-symbols-rounded">sell</span>
        <span id="tag-name"></span>
      </h2>
      <p id="tag-count" class="category-count"></p>
    </div>
    <div id="tag-posts" class="articles-grid">
      <p class="loading-text">Memuat artikel...</p>
    </div>
  </div>
</div>

<script>
// Data dari Jekyll (fallback)
const siteTags = {{ site.tags | jsonify }};

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

function renderPostCard(post, tagName) {
  const media = post.image 
    ? `<img src="${post.image}" alt="${escapeHtml(post.title)}" loading="lazy">`
    : `<div class="card-placeholder"><span class="material-symbols-rounded">article</span></div>`;
  
  const excerpt = post.excerpt || '';
  
  return `
    <article class="article-card md3-surface-1">
      <a href="${post.url}" class="card-media" aria-hidden="true" tabindex="-1">${media}</a>
      <div class="card-body">
        <div class="card-chips">
          <span class="md3-chip small">#${escapeHtml(tagName)}</span>
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

function showTagDetail(slug) {
  let tagName = slug;
  let posts = [];
  
  for (const [name, tagPosts] of Object.entries(siteTags)) {
    if (slugify(name) === slug) {
      tagName = name;
      posts = tagPosts;
      break;
    }
  }
  
  document.getElementById('tags-index').hidden = true;
  document.getElementById('tags-detail').hidden = false;
  document.getElementById('tag-name').textContent = '#' + tagName;
  document.getElementById('tag-count').textContent = `${posts.length} artikel ditemukan`;
  
  if (posts.length === 0) {
    document.getElementById('tag-posts').innerHTML = 
      '<p class="no-posts">Belum ada artikel dengan tag ini.</p>';
    return;
  }
  
  const postsData = posts.map(p => ({
    title: p.title,
    url: p.url,
    date: p.date,
    image: p.image || '',
    excerpt: p.excerpt || ''
  }));
  
  document.getElementById('tag-posts').innerHTML = 
    postsData.map(p => renderPostCard(p, tagName)).join('');
  
  const newUrl = `${window.location.pathname}?t=${slug}`;
  history.pushState({view: 'detail', slug: slug}, '', newUrl);
}

function showTagsIndex() {
  document.getElementById('tags-index').hidden = false;
  document.getElementById('tags-detail').hidden = true;
  history.pushState({view: 'index'}, '', window.location.pathname);
}

window.addEventListener('popstate', (e) => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('t');
  if (slug) showTagDetail(slug);
  else showTagsIndex();
});

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('t');
  
  if (slug) {
    showTagDetail(slug);
  }
  
  document.querySelectorAll('.md3-chip[data-tag]').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = chip.dataset.tag;
      showTagDetail(slug);
    });
  });
});
</script>
