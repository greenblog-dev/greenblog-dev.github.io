---
layout: page
title: Agenda
permalink: /kategory/c=agenda/
---
<div class="articles-grid">
{% for post in site.categories.agenda limit: 10 %}
  {% include article-card.html post=post %}
{% endfor %}
</div>
