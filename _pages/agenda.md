---
layout: page
title: Agenda
permalink: /agenda/
---
<div class="articles-grid">
{% assign items = site.categories.agenda | default: '' | split: '' %}
{% if items.size > 0 %}
  {% assign items = items | sort: 'date' %}
  ...
{% endif %}
