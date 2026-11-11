# Kampüs Etkinlikleri · Backend

Kampüs etkinliklerini JSON olarak veren REST API (Node + Express).
Sprint 7'de veri bellekte tutuluyor; sunucu yeniden başlayınca POST ile eklenenler kaybolur (Sprint 8'de MongoDB).

Serhat Saraloğlu · 2211012057

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

- `npm run dev` → `node --watch src/server.js` (dosya değişince sunucu yeniden başlar)
- `npm start` → `node src/server.js`
- Adres: http://localhost:3000 · kontrol: http://localhost:3000/health

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinlediği port. `.env` dosyasından okunur, yoksa 3000. |

`.env` GitHub'a gönderilmez (`.gitignore`); hangi değişkenlerin gerektiği `.env.example` dosyasında.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/events` | Listeyi getir | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Ek olarak `GET /health` → 200, `{ "status": "ok", "time": "...", "student": "2211012057" }`.

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### Ayrıntılar

- `GET /events?category=Atölye` → sadece o kategorideki etkinlikler
- `GET /events/:id` → id yoksa 404, `"Event not found"`
- `POST /events` → gövde JSON (`Content-Type: application/json`). `title`, `category`, `date` zorunlu;
  eksikse 400, `"title, category and date are required"`. Başarılıysa 201 ve `event-<zaman damgası>` id'li yeni kayıt.
- Tanımsız adresler → 404, `"Route not found"`

Örnek POST gövdesi:

```json
{
  "title": "Linux Komut Satırı Atölyesi",
  "category": "Atölye",
  "capacity": 30,
  "date": "2026-12-03",
  "time": "15:00",
  "location": "Bilgisayar Laboratuvarı 2",
  "description": "Terminalde dosya, izin ve süreç yönetiminin temelleri."
}
```

## Klasör yapısı

```
backend/
  src/
    app.js                         Express uygulaması, middleware, route'ları bağlar
    server.js                      .env'i okur, portu dinler
    routes/event-routes.js         hangi adres hangi fonksiyona gider
    controllers/event-controller.js  isteği işler, yanıtı döndürür
    data/events.js                 bellek içi 6 etkinlik
  requests/kampus-api.json         Postman koleksiyonu (6 istek)
  .env.example  .gitignore  package.json
```

## Test

Postman → Import → `requests/kampus-api.json` → "Kampüs API" koleksiyonu. Sunucu açıkken 6 istek:

| # | İstek | Beklenen |
|---|---|---|
| 1 | GET /health | 200 · ok + student |
| 2 | GET /events | 200 · 6 kayıt |
| 3 | GET /events/event-2 | 200 · event-2 |
| 4 | GET /events/yok | 404 · error |
| 5 | POST /events (tam body) | 201 · yeni id |
| 6 | POST /events (sadece title) | 400 · error |

Komut satırından: `npx newman run requests/kampus-api.json`
