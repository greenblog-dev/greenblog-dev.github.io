---
layout: page
title: Pengumuman
permalink: /pengumuman/
---
<div class="articles-grid">
{% for post in site.categories.pengumuman limit: 10 %}
  {% include article-card.html post=post %}
{% endfor %}
</div>
