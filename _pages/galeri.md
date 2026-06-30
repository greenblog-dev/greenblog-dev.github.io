---
layout: page
title: Galeri
permalink: /galeri/
description: Dokumentasi kegiatan Karang Taruna Desa Sejahtera.
---

<div class="gallery-grid">
  {% for i in (1..12) %}
    <figure class="gallery-item md3-surface-1">
      <img src="https://picsum.photos/seed/kt{{ i }}/600/400" alt="Dokumentasi kegiatan {{ i }}" loading="lazy" decoding="async">
      <figcaption>Kegiatan #{{ i }}</figcaption>
    </figure>
  {% endfor %}
</div>
