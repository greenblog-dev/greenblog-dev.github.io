---
layout: page
title: Kegiatan
permalink: /kegiatan/
description: Daftar kegiatan dan agenda Karang Taruna Desa Sejahtera.
---

## 📅 Agenda Mendatang

<div class="agenda-list">
  <article class="agenda-card md3-surface-1">
    <div class="agenda-date">
      <span class="day">15</span>
      <span class="month">Jul</span>
    </div>
    <div class="agenda-content">
      <h3>Kerja Bakti Lingkungan</h3>
      <p><span class="material-symbols-rounded">schedule</span> 07:00 – 11:00 WIB</p>
      <p><span class="material-symbols-rounded">location_on</span> Balai Desa</p>
    </div>
  </article>

  <article class="agenda-card md3-surface-1">
    <div class="agenda-date">
      <span class="day">22</span>
      <span class="month">Jul</span>
    </div>
    <div class="agenda-content">
      <h3>Pelatihan Digital Marketing</h3>
      <p><span class="material-symbols-rounded">schedule</span> 09:00 – 15:00 WIB</p>
      <p><span class="material-symbols-rounded">location_on</span> Aula Karang Taruna</p>
    </div>
  </article>
</div>

## 📰 Kegiatan Terbaru

<div class="articles-grid">
{% assign kegiatan = site.categories.kegiatan | slice: 0, 6 %}
{% for post in kegiatan %}
  {% include article-card.html post=post %}
{% endfor %}
</div>
