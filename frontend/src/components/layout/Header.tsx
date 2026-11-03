import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { useEvents } from "../../context/use-events";
import { findEventById } from "../../utils/filter-events";

const SITE_NAME = "Kampüs Etkinlikleri";

// Başlık ve alt metin adres çubuğundaki yola göre seçilir
const pageTitles = [
  { path: "/", title: SITE_NAME, text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  { path: "/events", title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
  { path: "/admin", title: "Etkinlik Yönetimi" },
  { path: "/admin/new", title: "Etkinlik Ekle" },
  { path: "/login", title: "Giriş Yap" },
  { path: "/register", title: "Kayıt Ol" },
  { path: "/forgot-password", title: "Şifremi Unuttum" },
];

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const eventMatch = matchPath("/events/:id", pathname) ?? matchPath("/admin/:id/edit", pathname);
  const event = eventMatch ? findEventById(events, eventMatch.params.id ?? "") : undefined;
  const page = pageTitles.find((p) => matchPath(p.path, pathname));

  const title = event ? event.title : page ? page.title : "Sayfa Bulunamadı";
  const text = event ? `${event.category} · ${event.location}` : page?.text;

  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${title} — ${SITE_NAME}`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
