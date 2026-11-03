**Canlı adres:** https://kampus-etkinlik-sprint1.vercel.app

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

## Sprint 3 · JavaScript ve DOM

`sprint2/` klasörü `sprint3/` olarak kopyalandı; sayfalar artık tek bir veri dosyasından üretiliyor.
Modüller `type="module"` olduğu için yerelde Live Server ile açılmalı (`file://` çalışmaz).
Yasak olanlar kullanılmadı: `localStorage`, framework, jQuery.

- `sprint3/js/data.js` — 6 etkinlik (`id`, `title`, `category`, `date`, `time`, `location`, `description`, isteğe bağlı `capacity`)
- `sprint3/js/event-list.js` — kart üretimi; ana sayfada `data-limit="2"` ile yaklaşan 2 etkinlik; liste sayfasında arama + kategori filtresi
- `sprint3/js/event-detail.js` — `?id=` ile detay; geçersiz/eksik id'de hata kutusu ve "Listeye dön"
- `sprint3/js/event-form.js` — ekle/güncelle formu: `novalidate`, kendi hata ve başarı mesajı, `FormData` ile nesne; `data-mode="guncelle"` ile id'ye göre dolu form
- Menüde Ana Sayfa, Etkinlikler, Ekle; güncelleme sayfasına sadece detaydaki "Bu etkinliği güncelle" bağlantısıyla gelinir
- Deneme: `/etkinlik-detay.html?id=event-3` (Siber Güvenlik)

**Canlı adres:** https://kampus-etkinlik-sprint1.vercel.app (Vercel Root Directory: `sprint3`)

## Sprint 4 · Vite, TypeScript ve React

Aynı site `frontend/` klasöründe Vite + React + TypeScript ile yeniden yazıldı. `sprint1/`–`sprint3/` olduğu gibi duruyor.
Sayfayı artık Vite açar: `cd frontend && npm install && npm run dev` → http://localhost:5173 (Live Server gerekmez).
React Router yok: hangi sayfanın açık olduğu `useState` ile tutulur (Sprint 6'da router gelecek).

Oluşan yapı:

- `frontend/package.json` — proje adı, komutlar (`dev`, `build`, `preview`) ve paket listesi.
- `frontend/package-lock.json` — yüklenen paketlerin tam sürümleri.
- `frontend/node_modules/` — indirilen paketler; GitHub'a gitmez.
- `frontend/tsconfig*.json` — TypeScript ayarları.
- `frontend/vite.config.ts` — Vite ayarları ve React eklentisi.
- `frontend/index.html` — tek HTML sayfası; içinde React'in çizileceği boş `div#root` var.
- `frontend/src/main.tsx` — React'i başlatır, `App`'i `root`'a çizer.
- `frontend/src/App.tsx` — uygulamanın ana bileşeni; 5 sayfanın hepsi burada (ana sayfa, etkinlikler, detay, ekle, güncelle).
- `frontend/src/App.css` — uygulamanın stilleri; Sprint 3'teki `2211012057.css` buraya taşındı.
- `frontend/src/index.css` — tüm sayfaya genel stil; bu sprintte boş.
- `frontend/src/types/campus-event.ts` — `Category` (4 değerli union) ve `CampusEvent` tipleri.
- `frontend/src/data/events.ts` — tipli (`CampusEvent[]`) 6 etkinlik kaydı.
- `frontend/src/utils/filter-events.ts` — saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`.
- `frontend/public/` — olduğu gibi kopyalanan dosyalar (`afis.svg`).

**Canlı adres:** https://kampus-etkinlik-sprint1.vercel.app (Vercel Root Directory: `frontend`, Framework Preset: `Vite`)

## Sprint 5 · React Bileşenleri

Tek büyük `App.tsx` (~270 satır) parçalara bölündü: her parça kendi dosyasında bir bileşen, veriyi props ile alıyor, olayları callback ile App'e bildiriyor. State (`page`, `selectedId`, `searchText`, `category`) App'te kalıyor (lifting state). `App.tsx` ~100 satıra indi; ekran Sprint 4 ile aynı.

Yeni dosyalar:

- `frontend/src/components/layout/Header.tsx` — `title`, isteğe bağlı `text`
- `frontend/src/components/layout/Navigation.tsx` — `current`, `onNavigate`; menü dizisi burada
- `frontend/src/components/layout/Footer.tsx` — props yok
- `frontend/src/components/events/EventCard.tsx` — `event`, `onShowDetail`
- `frontend/src/components/events/EventList.tsx` — `events`, `onShowDetail`, isteğe bağlı `emptyText`; `key={event.id}` burada
- `frontend/src/components/events/EventFilter.tsx` — `searchText`, `category`, `categories`, `onSearchChange`, `onCategoryChange`
- `frontend/src/components/events/EventDetail.tsx` — `event`, `onBack`, `onEdit`
- `frontend/src/components/forms/EventForm.tsx` — `onSubmit` (kaydetme Sprint 6'da)
- `frontend/src/types/page.ts` — `PageName` tipi
- `frontend/src/utils/format-date.ts` — `formatDate`

**Canlı adres:** https://kampus-etkinlik-sprint1.vercel.app (Vercel ayarı değişmedi: Root Directory `frontend`, Preset `Vite`)
