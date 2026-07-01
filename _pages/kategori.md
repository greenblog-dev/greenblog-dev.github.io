---
layout: archive
title: Kategori
permalink: /kategori/
layout_type: kategori
---


{% assign postsByYear = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}

<div class="kategori-grid">
    <h2 class="year-title"><span class="material-symbols-rounded">calendar_month</span> {{ year.name }}</h2>
    <ul class="archive-list">
    {% for post in year.items %}
      <li class="archive-item">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b" }}</time>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {% if post.categories.size > 0 %}
          <span class="md3-chip small">{{ post.categories.first }}</span>
        {% endif %}
      </li>
    {% endfor %}
    </ul>
  </section>
{% endfor %}
</div>
