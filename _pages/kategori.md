---
layout: archive
title: Kategori
permalink: /kategori/
layout_type: kategori
---

<div class="kategori-grid">
{% assign cats = site.categories | sort %}
{% for cat in cats %}
  {% assign name = cat | first %}
  {% assign posts = cat | last %}
  <a href="{{ '/kategori/' | append: name | slugify | append: '/' | relative_url }}" class="kategori-card md3-surface-1">
    <span class="material-symbols-rounded">folder</span>
    <h3>{{ name }}</h3>
    <span class="count">{{ posts.size }} artikel</span>
  </a>
{% endfor %}
</div>
