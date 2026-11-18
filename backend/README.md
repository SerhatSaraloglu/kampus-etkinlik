# Kampüs Etkinlikleri · Backend

Kampüs etkinliklerini JSON olarak veren REST API (Node + Express + MongoDB/Mongoose).
Sprint 8'den itibaren etkinlikler MongoDB'de duruyor; sunucu kapanıp açılınca POST ile eklenenler kaybolmaz.

Serhat Saraloğlu · 2211012057

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env     # MONGODB_URI'yi kendi veritabanı adresinle değiştir
npm run seed             # 6 örnek etkinliği veritabanına yazar
npm run dev
```

- `npm run dev` → `node --watch src/server.js` (dosya değişince sunucu yeniden başlar)
- `npm start` → `node src/server.js`
- `npm run seed` → `node src/seed.js` (önce `events` koleksiyonunu boşaltır, sonra 6 kayıt ekler; kaç kez çalışırsa çalışsın 6 kayıt)
- Adres: http://localhost:3000 · kontrol: http://localhost:3000/health

Sunucu önce veritabanına bağlanır, sonra portu dinler. Terminalde
`MongoDB bağlandı (yerel): 127.0.0.1/kampus` ya da `MongoDB bağlandı (Atlas): ac-...mongodb.net/kampus` görünür.
Bağlanamazsa `Bağlanılamadı: ...` yazar ve kapanır.

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinlediği port. Yoksa 3000. |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | Veritabanı adresi. Atlas için `mongodb+srv://...mongodb.net/kampus`. |

`.env` GitHub'a gönderilmez (`.gitignore`). `.env.example` sadece yer tutucu içerir; gerçek Atlas adresi ve şifre hiçbir dosyada yazılmaz.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/events` | Listeyi getir | 200 | — | Sprint 8 (MongoDB) |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Sprint 8 (MongoDB) |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Sprint 8 (MongoDB) |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Ek olarak `GET /health` → 200, `{ "status": "ok", "time": "...", "student": "2211012057" }`.

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### Ayrıntılar

- `GET /events?category=Atölye` → sadece o kategorideki etkinlikler, tarihe göre sıralı
- Her kayıtta MongoDB'nin verdiği `_id`, `createdAt` ve `updatedAt` var (`"event-2"` gibi id'ler artık yok)
- `GET /events/:id` → `_id` biçimi yanlışsa (`/events/yok`) ya da kayıt yoksa 404, `"Event not found"`
- `POST /events` → gövde JSON. Kuralları `Event` schema'sı tutar; uymazsa 400 ve Mongoose'un mesajı:
  - `title` zorunlu, 3–100 karakter, baş/son boşluk silinir
  - `category` zorunlu, sadece `Seminer`, `Atölye`, `Söyleşi`, `Yarışma`
  - `date` zorunlu · `capacity` 0 veya üstü (varsayılan 0) · `description` en fazla 500 karakter
- Tanımsız adresler → 404, `"Route not found"`
- Beklenmeyen hata → 500, `"Server error"` (ayrıntı sadece terminale yazılır, sunucu çalışmaya devam eder)

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
    app.js                           Express uygulaması, route'lar, 404 ve hata middleware'i
    server.js                        .env'i okur, veritabanına bağlanır, portu dinler
    config/database.js               MONGODB_URI ile Mongoose bağlantısı
    models/event-model.js            Event schema'sı ve modeli (collection: events)
    routes/event-routes.js           hangi adres hangi fonksiyona gider
    controllers/event-controller.js  Event.find / findById / create
    data/seed-events.js              seed için 6 etkinlik (id alanı yok)
    seed.js                          npm run seed
  requests/kampus-api.json           Postman koleksiyonu (6 istek)
  .env.example  .gitignore  package.json
```

## Test

Postman → Import → `requests/kampus-api.json` → "Kampüs API" koleksiyonu. `npm run seed` ve `npm run dev` sonrası:

| # | İstek | Beklenen |
|---|---|---|
| 1 | GET /health | 200 · ok + student |
| 2 | GET /events | 200 · 6 kayıt (seed sonrası) |
| 3 | GET /events/{{eventId}} | 200 · listedeki ilk etkinlik |
| 4 | GET /events/yok | 404 · error |
| 5 | POST /events (tam body) | 201 · `_id` + `createdAt` |
| 6 | POST /events (sadece title) | 400 · date ve category zorunlu |

`{{eventId}}`: 2. istek listedeki ilk kaydın `_id`'sini bu değişkene yazar; seed her çalıştığında id'ler değiştiği için 3. istek hep güncel bir `_id` kullanır.

Komut satırından: `npx newman run requests/kampus-api.json`

**Kalıcılık testi:** `npm run seed` → `npm run dev` → POST /events (201) → Ctrl+C → tekrar `npm run dev` → GET /events 7 kayıt, yenisi listede.
