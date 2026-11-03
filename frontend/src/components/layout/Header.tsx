import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

const SITE_NAME = "Kampüs Etkinlikleri";
const NOT_FOUND = "Sayfa bulunamadı";

// Sekme adı açık sayfanın h2 başlığıyla aynı
const pageTitles: Record<string, string> = {
  "/": SITE_NAME,
  "/events": "Tüm Etkinlikler",
  "/admin": "Etkinlik Yönetimi",
  "/admin/new": "Etkinlik Ekle",
  "/login": "Giriş Yap",
  "/register": "Kayıt Ol",
  "/forgot-password": "Şifremi Unuttum",
};

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const detail = matchPath("/events/:id", pathname);
  const edit = matchPath("/admin/:id/edit", pathname);

  // Router "/events/" adresini de "/events" sayar
  let title = pageTitles[pathname.replace(/\/+$/, "") || "/"] ?? NOT_FOUND;
  if (detail) title = findEventById(events, detail.params.id ?? "")?.title ?? NOT_FOUND;
  if (edit) title = findEventById(events, edit.params.id ?? "") ? "Etkinlik Güncelle" : NOT_FOUND;

  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${title} — ${SITE_NAME}`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>Kampüs Etkinlikleri</h1>
      <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
    </header>
  );
}

export default Header;
