# Kampüs Etkinlikleri · frontend

**Canlı adres:** https://serhatsaraloglu-frontend.vercel.app

Vite + React + TypeScript; sayfalar React Router ile, etkinlik listesi `EventsContext` ile yönetilir.
Sprint geçmişi ve ayrıntılar için repo kökündeki [README](../README.md).

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:5173 açılır. Yayın için `npm run build` (çıktı `dist/`).

## Route listesi

| Adres | Sayfa |
| --- | --- |
| `/` | HomePage |
| `/events` | EventsPage |
| `/events/:id` | EventDetailPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |
