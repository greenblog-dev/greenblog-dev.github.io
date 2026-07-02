---
layout: page
title: Agenda Kegiatan
permalink: /agenda/
description: Jadwal kegiatan dan acara Karang Taruna Desa Sejahtera.
---

{% comment %} 🔥 Case-insensitive agenda {% endcomment %}
{% assign agenda_posts = site.posts | where_exp: "post", "post.categories contains 'Agenda' or post.categories contains 'agenda' or post.categories contains 'AGENDA'" %}

{% if agenda_posts and agenda_posts.size > 0 %}
  {% assign agendas = agenda_posts | sort: 'date' | reverse %}
  {% assign today = 'now' | date: "%Y-%m-%d" %}

  {% assign upcoming = "" | split: "" %}
  {% assign past = "" | split: "" %}

  {% for agenda in agendas %}
    {% assign ed = agenda.event_date | default: agenda.date | date: "%Y-%m-%d" %}
    {% if ed >= today %}
      {% assign upcoming = upcoming | push: agenda %}
    {% else %}
      {% assign past = past | push: agenda %}
    {% endif %}
  {% endfor %}

  {% if upcoming.size > 0 %}
  <section class="agenda-section">
    <h2 class="section-title"><span class="material-symbols-rounded">event_upcoming</span> Akan Datang</h2>
    <div class="agenda-grid">
      {% for item in upcoming %}
        <article class="agenda-card md3-surface-1">
          <div class="agenda-date">
            <span class="day">{{ item.event_date | default: item.date | date: "%d" }}</span>
            <span class="month">{{ item.event_date | default: item.date | date: "%b" }}</span>
          </div>
          <div class="agenda-details">
            <h3><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h3>
            <p><span class="material-symbols-rounded">schedule</span> {{ item.event_time | default: "Seharian" }}</p>
            <p><span class="material-symbols-rounded">location_on</span> {{ item.event_location | default: "Akan diumumkan" }}</p>
            {% if item.event_status %}
              <span class="status-badge {{ item.event_status | downcase | replace: ' ', '-' }}">{{ item.event_status }}</span>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </section>
  {% endif %}

  {% if past.size > 0 %}
  <section class="agenda-section past">
    <h2 class="section-title"><span class="material-symbols-rounded">event_available</span> Selesai</h2>
    <div class="agenda-list-compact">
      {% for item in past %}
        <a href="{{ item.url | relative_url }}" class="agenda-item-compact">
          <time>{{ item.event_date | default: item.date | date: "%d %b %Y" }}</time>
          <span>{{ item.title }}</span>
        </a>
      {% endfor %}
    </div>
  </section>
  {% endif %}

  {% if upcoming.size == 0 and past.size == 0 %}
    <p class="empty-state"><span class="material-symbols-rounded">calendar_today</span> Belum ada jadwal kegiatan.</p>
  {% endif %}

{% else %}
  <p class="empty-state">
    <span class="material-symbols-rounded">calendar_today</span>
    Belum ada jadwal kegiatan yang dijadwalkan.
  </p>
{% endif %}
