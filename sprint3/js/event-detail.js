import { events } from "./data.js";

const container = document.querySelector("#detay");

// Afişi olan etkinlikler (diğerlerinde afiş alanı gösterilmez)
const afisler = {
  "event-1": {
    src: "img/kariyer-gunleri.jpg",
    alt: "Kariyer Günleri afişi: 'Gelecek Şimdi' sloganı ve katılan şirketlerin logoları",
  },
  "event-2": {
    src: "img/robotik.jpg",
    alt: "Robotik atölyesi afişi",
  },
};

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  container.innerHTML = `<div class="hata-kutusu" role="alert">
    <p>Etkinlik bulunamadı. Adresteki etkinlik numarası geçersiz veya eksik.</p>
    <a href="etkinlikler.html">← Listeye dön</a>
  </div>`;
} else {
  const [gun, ay, yil] = event.date.split("-").map(Number);
  const tarih = new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const iso = `${yil}-${String(ay).padStart(2, "0")}-${String(gun).padStart(2, "0")}`;
  const afis = afisler[event.id];

  document.title = event.title;
  document.querySelector("header h1").textContent = event.title;

  const figure = afis
    ? `<figure>
        <img src="${afis.src}" alt="${afis.alt}">
        <figcaption>Şekil 1: etkinlik afişi</figcaption>
      </figure>`
    : "";
  const kontenjan = event.capacity
    ? `<dt>Kontenjan</dt>
        <dd>${event.capacity}</dd>`
    : "";

  container.innerHTML = `<article class="detay${afis ? "" : " afissiz"}">
      ${figure}
      <dl>
        <dt>Tarih</dt>
        <dd><time datetime="${iso}T${event.time}">${tarih}, ${event.time}</time></dd>

        <dt>Yer</dt>
        <dd>${event.location}</dd>

        <dt>Kategori</dt>
        <dd>${event.category}</dd>

        ${kontenjan}
      </dl>

      <p>${event.description}</p>

      <a href="etkinlikler.html">← Listeye dön</a>
    </article>`;
}
