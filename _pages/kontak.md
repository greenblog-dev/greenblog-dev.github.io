---
layout: page
title: Kontak
permalink: /kontak/
description: Hubungi kami untuk informasi, kerja sama, atau pertanyaan.
---

<div class="contact-grid">
  <div class="contact-info md3-surface-1">
    <h2>Mari Terhubung</h2>
    <p>Kami terbuka untuk diskusi, kerja sama, maupun pertanyaan seputar kegiatan Karang Taruna.</p>

    <ul class="contact-list">
      <li><span class="material-symbols-rounded">location_on</span><div><strong>Alamat</strong><br>Dsn. Wonolobo Kel. Pandean, Kec. Ngablal, Kab. Magelang</div></li>
      <li><span class="material-symbols-rounded">mail</span><div><strong>Email</strong><br><a href="mailto:{{ site.email }}">{{ site.email }}</a></div></li>
      <li><span class="material-symbols-rounded">call</span><div><strong>Telepon</strong><br>+62 858 7555 6123</div></li>
      <li><span class="material-symbols-rounded">schedule</span><div><strong>Jam Operasional</strong><br>Senin – Sabtu, 09:00 – 17:00 WIB</div></li>
    </ul>
  </div>

  <form class="contact-form md3-surface-1" action="https://formspree.io/f/your_form_id" method="POST">
    <h2>Kirim Pesan</h2>
    <div class="form-field">
      <label for="nama">Nama Lengkap</label>
      <input type="text" id="nama" name="nama" required>
    </div>
    <div class="form-field">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div class="form-field">
      <label for="subjek">Subjek</label>
      <input type="text" id="subjek" name="subjek" required>
    </div>
    <div class="form-field">
      <label for="pesan">Pesan</label>
      <textarea id="pesan" name="pesan" rows="5" required></textarea>
    </div>
    <button type="submit" class="md3-button filled">
      <span class="material-symbols-rounded">send</span> Kirim Pesan
    </button>
  </form>
</div>

<div class="map-container md3-surface-1">
  <iframe width="425" height="350" src="https://www.openstreetmap.org/export/embed.html?bbox=110.40048480033875%2C-7.393939991733655%2C110.40362298488618%2C-7.390907688648073&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?#map=18/-7.392424/110.402054">Lihat peta lebih besar</a></small>
</div>
