import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// "12-10-2026" (GG-AA-YYYY) -> Date nesnesi
function parseDate(text) {
  const [gun, ay, yil] = text.split("-").map(Number);
  return new Date(yil, ay - 1, gun);
}

function createCard(event) {
  const tarih = parseDate(event.date);
  const iso = `${event.date.split("-").reverse().join("-")}`;
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

render(events);
