---
layout: page
title: Struktur Pengurus
permalink: /struktur/
description: Susunan pengurus Karang Taruna Desa Sejahtera periode 2025–2028.
---

<div class="pengurus-grid">
{% for p in site.data.pengurus %}
  <div class="pengurus-card md3-surface-1">
    <div class="pengurus-photo">
      <img src="{{ p.foto | relative_url }}" alt="{{ p.nama }}" loading="lazy" decoding="async"
           onerror="this.onerror=null;this.src='https://api.dicebear.com/7.x/initials/svg?seed={{ p.nama | url_encode }}&backgroundColor=2E7D32';">
    </div>
    <div class="pengurus-info">
      <h3>{{ p.nama }}</h3>
      <p class="jabatan">{{ p.jabatan }}</p>
      <span class="md3-chip small">{{ p.bidang }}</span>
    </div>
  </div>
{% endfor %}
</div>
