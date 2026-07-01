---
layout: page
title: Pengumuman
permalink: /pengumuman/
---
<div class="articles-grid">

{% if site.categories.nama and site.categories.nama.size > 0 %}
  {% assign items = site.categories.pengumuman | sort: 'date' %}
  {% for item in items %} ... {% endfor %}
{% else %}
  <p>Belum ada data.</p>
{% endif %}
