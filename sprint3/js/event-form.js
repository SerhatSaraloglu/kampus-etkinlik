const form = document.querySelector("#etkinlik-formu");

// "2026-10-12" (input type="date") -> "12-10-2026" (data.js biçimi)
function tarihBicimle(deger) {
  return deger ? deger.split("-").reverse().join("-") : "";
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

  console.log(data);
});
