---
layout: page
title: Program Kerja
permalink: /program-kerja/
description: Program kerja Karang Taruna berdasarkan bidang kepengurusan.
---

<div class="program-container">
{% for bidang in site.data.program_kerja.bidang %}
  <section class="program-bidang md3-surface-1">
    <header class="program-header">
      <span class="material-symbols-rounded program-icon">{{ bidang.icon }}</span>
      <h2>{{ bidang.nama }}</h2>
    </header>
    <ul class="program-list">
    {% for prog in bidang.program %}
      <li class="program-item">
        <span class="material-symbols-rounded">check_circle</span>
        <div>
          <h4>{{ prog.nama }}</h4>
          <p>{{ prog.deskripsi }}</p>
        </div>
      </li>
    {% endfor %}
    </ul>
  </section>
{% endfor %}
</div>
