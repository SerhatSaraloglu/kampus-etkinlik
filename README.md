# Kampüs Etkinlikleri

Web Teknolojileri ve Programlama dersi dönem projesi. Kampüs etkinliklerinin
listelendiği, detaylarının görüntülendiği ve yeni etkinlik ekleme/güncelleme
formlarının bulunduğu bir uygulama.

## Sprint 1 · HTML, Git ve Yayına Alma

Sadece HTML ile kurulmuş statik iskelet. CSS yok, JavaScript yok.

- `sprint1/index.html` — etkinlik listesi
- `sprint1/etkinlik-detay.html` — etkinlik detayı
- `sprint1/etkinlik-ekle.html` — yeni etkinlik ekleme formu
- `sprint1/etkinlik-guncelle.html` — etkinlik güncelleme formu

**Canlı adres:** https://kampus-etkinlik-sprint1.vercel.app

## Sprint 2 · CSS ve Responsive Tasarım

Sprint 1'in HTML'i `sprint2/` klasörüne kopyalanıp CSS ile giydirildi.
Öncelik telefon görünümü: yatay taşma yok, kartlar tek sütun, butonlar parmakla basılabilir.

- `sprint2/css/2211012057.css` — öğrenci numarasından türetilen tema
  (`--no: 2211012057` → ton 57, son hane 7 → `"Palatino Linotype"`)
- `sprint2/index.html` — tanıtım + yaklaşan 2 etkinlik kartı
- `sprint2/etkinlikler.html` — tüm etkinlikler, `section > article` kart grid
- `sprint2/etkinlik-detay.html` — Kariyer Günleri detayı; afiş solda, künye (`dl`) sağda; telefonda alt alta
- `sprint2/etkinlik-detay-robotik-atolyesi.html` — Robotik Atölyesi detayı
- `sprint2/etkinlik-detay-siber-guvenlik.html` — Siber Güvenlik detayı
- `sprint2/img/` — etkinlik afiş görselleri
- `sprint2/etkinlik-ekle.html` — label üstte, boş gönderilen alan kırmızı
- `sprint2/etkinlik-guncelle.html` — aynı form, alanlar dolu

**Canlı adres:** https://kampus-etkinlik-sprint1.vercel.app (Vercel Root Directory: `sprint2`)
