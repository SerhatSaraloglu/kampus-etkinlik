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
