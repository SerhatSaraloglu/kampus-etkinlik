const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

// Doğrulanan alanlar (form name'leri)
const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

// "2026-10-12" (input type="date") -> "12-10-2026" (data.js biçimi)
function tarihBicimle(deger) {
  return deger ? deger.split("-").reverse().join("-") : "";
}

function dogrula(data) {
  const errors = {};

  if (data.title.length < 3) errors.ad = "En az 3 karakter olmalı.";
  if (data.category === "") errors.kategori = "Bir kategori seçin.";
  if (data.date === "") errors.tarih = "Tarih seçin.";
  if (data.time === "") errors.saat = "Saat seçin.";
  if (data.location === "") errors.yer = "Yer boş olamaz.";
  if (
    data.capacity !== null &&
    (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
  ) {
    errors.kontenjan = "1 ile 1000 arasında bir sayı girin.";
  }

  return errors;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(form);
  const data = {
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: tarihBicimle(fd.get("tarih")),
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    description: fd.get("aciklama").trim(),
    capacity: fd.get("kontenjan") === "" ? null : Number(fd.get("kontenjan")),
  };

  const errors = dogrula(data);

  // Her alan için: hata varsa yaz ve kırmızı yap, düzelmişse temizle
  alanlar.forEach((ad) => {
    const alan = form.elements[ad];
    const hataYeri = document.querySelector(`#${ad}-hata`);
    if (errors[ad]) {
      hataYeri.textContent = errors[ad];
      alan.setAttribute("aria-invalid", "true");
    } else {
      hataYeri.textContent = "";
      alan.removeAttribute("aria-invalid");
    }
  });

  mesaj.replaceChildren();

  if (Object.keys(errors).length > 0) {
    mesaj.className = "mesaj hata-mesaji";
    mesaj.setAttribute("role", "alert");
    mesaj.textContent = "Formda hatalı alanlar var.";
    return;
  }

  // Başarı: yeşil kutu + oluşan nesne (kaydedilmez, localStorage yok)
  const baslik = document.createElement("strong");
  baslik.textContent = "Etkinlik bilgileri geçerli. Oluşan nesne:";
  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(data, null, 2);
  mesaj.className = "mesaj basari";
  mesaj.setAttribute("role", "status");
  mesaj.append(baslik, pre);
});
