---
layout: archive
title: Tag
permalink: /tags/
layout_type: tags
---

<div class="tags-cloud">
{% assign tags = site.tags | sort %}
{% for tag in tags %}
  {% assign name = tag | first %}
  {% assign posts = tag | last %}
  <a href="{{ '/tags/' | append: name | slugify | append: '/' | relative_url }}" class="md3-chip">
    #{{ name }} <span class="count">({{ posts.size }})</span>
  </a>
{% endfor %}
</div>
