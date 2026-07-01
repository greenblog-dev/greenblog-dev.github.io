---
layout: page
title: Pengumuman
permalink: /pengumuman/
description: Informasi resmi dan pengumuman terbaru dari Karang Taruna.
---

{% comment %}
  🔥 Cari semua post yang punya kategori "Pengumuman" (case-insensitive)
  Menggunakan where_exp untuk fleksibilitas maksimal
{% endcomment %}

{% assign pengumuman_posts = site.posts | where_exp: "post", 
  "post.categories contains 'Pengumuman' or 
   post.categories contains 'pengumuman' or 
   post.categories contains 'PENGUMUMAN'" %}

{% if pengumuman_posts and pengumuman_posts.size > 0 %}
  {% assign posts = pengumuman_posts | sort: 'date' | reverse %}
  
  <div class="announcements-container">
    {% for post in posts %}
      <article class="announcement-card md3-surface-1">
        <div class="announcement-badge">
          <span class="material-symbols-rounded">campaign</span>
          <span class="badge-text">PENGUMUMAN</span>
        </div>
        <div class="announcement-content">
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %B %Y" }}</time>
          <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
          <a href="{{ post.url | relative_url }}" class="md3-button text">Baca Selengkapnya →</a>
        </div>
      </article>
    {% endfor %}
  </div>

{% else %}
  <p class="empty-state">
    <span class="material-symbols-rounded">notifications_off</span>
    Belum ada pengumuman.
  </p>
{% endif %}
