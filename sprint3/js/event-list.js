import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// "12-10-2026" (GG-AA-YYYY) -> Date nesnesi
function parseDate(text) {
  const [gun, ay, yil] = text.split("-").map(Number);
  return new Date(yil, ay - 1, gun);
}

function createCard(event) {
  const tarih = parseDate(event.date);
  const iso = sortKey(event.date);
  const tarihYazi = tarih.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `<article class="kart">
    <h3>${event.title}</h3>
    <p>${event.category} · <time datetime="${iso}">${tarihYazi}</time></p>
    <p>${event.location}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

// GG-AA-YYYY -> YYYY-AA-GG: localeCompare ile doğru tarih sırası için
function sortKey(text) {
  return text.split("-").reverse().join("-");
}

const form = document.querySelector("#filtre-formu");

if (form) {
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategorileri veriden üret, her biri bir kez
  [...new Set(events.map((e) => e.category))].forEach((kategori) => {
    kategoriSecimi.add(new Option(kategori, kategori));
  });

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metinUyuyor = `${e.title} ${e.description} ${e.category}`
        .toLocaleLowerCase("tr-TR")
        .includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    sonucSatiri.textContent =
      sonuc.length === 0
        ? "Aradığınız etkinlik bulunamadı."
        : `${sonuc.length} etkinlik listeleniyor.`;
  }

  form.addEventListener("submit", (e) => e.preventDefault());
  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  filtrele();
} else if (list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) => sortKey(a.date).localeCompare(sortKey(b.date)))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}
