import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const SITE_NAME = "Kampüs Etkinlikleri";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// "2026-10-12" -> "12 Ekim 2026"
const formatDate = (date: string) =>
  new Date(`${date}T00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

const categories = [...new Set(events.map((e) => e.category))];

const upcoming = [...events]
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 2);

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let title = SITE_NAME;
  if (page === "events") title = "Tüm Etkinlikler";
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";

  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${SITE_NAME} — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>
          {event.category} · <time dateTime={event.date}>{formatDate(event.date)}</time>
        </p>
        <p>{event.location}</p>
        <p>Kontenjan: {event.capacity}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör →
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        <nav className="menu">
          {menuItems.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={
                page === item.page || (page === "detail" && item.page === "events")
                  ? "page"
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <section className="etkinlik-listesi">
              <h2>Yaklaşan 2 etkinlik</h2>
              <div className="kartlar iki">{upcoming.map(renderCard)}</div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör →
              </a>
            </section>
          </>
        )}

        {page === "events" && (
          <section className="etkinlik-listesi">
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="arama">Etkinlik ara</label>
              <input
                type="search"
                id="arama"
                placeholder="atölye, kariyer..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <label htmlFor="kategori-filtre">Kategori</label>
              <select
                id="kategori-filtre"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </form>
            <p>
              {filtered.length === 0
                ? "Aradığınız etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <div className="kartlar">{filtered.map(renderCard)}</div>
          </section>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu" role="alert">
            <p>Etkinlik bulunamadı. Seçili etkinlik numarası geçersiz veya eksik.</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </div>
        )}

        {page === "detail" && selected && (
          <article className={selected.image ? "detay" : "detay afissiz"}>
            {selected.image && (
              <figure>
                <img src={selected.image} alt={`${selected.title} afişi`} />
                <figcaption>Şekil 1: etkinlik afişi</figcaption>
              </figure>
            )}
            <dl>
              <dt>Tarih</dt>
              <dd>
                <time dateTime={`${selected.date}T${selected.time}`}>
                  {formatDate(selected.date)}, {selected.time}
                </time>
              </dd>
              <dt>Yer</dt>
              <dd>{selected.location}</dd>
              <dt>Kategori</dt>
              <dd>{selected.category}</dd>
              <dt>Kontenjan</dt>
              <dd>{selected.capacity}</dd>
            </dl>
            <p>{selected.description}</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("update", selected.id);
              }}
            >
              Bu etkinliği güncelle
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
            <p>
              <label htmlFor="ad">Etkinlik adı</label>
              <input type="text" id="ad" name="ad" maxLength={80} />
            </p>
            <p>
              <label htmlFor="kategori">Kategori</label>
              <select id="kategori" name="kategori">
                <option value="">Seçiniz</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <label htmlFor="tarih">Tarih</label>
              <input type="date" id="tarih" name="tarih" />
            </p>
            <p>
              <label htmlFor="saat">Saat</label>
              <input type="time" id="saat" name="saat" />
            </p>
            <p>
              <label htmlFor="yer">Yer</label>
              <input type="text" id="yer" name="yer" />
            </p>
            <p>
              <label htmlFor="kontenjan">Kontenjan (isteğe bağlı)</label>
              <input type="number" id="kontenjan" name="kontenjan" min={1} />
            </p>
            <p>
              <label htmlFor="aciklama">Açıklama</label>
              <textarea id="aciklama" name="aciklama" rows={5} />
            </p>
            <p>
              <button type="submit">Kaydet</button>
            </p>
          </form>
        )}
      </main>

      <footer>
        <p>Serhat Saraloğlu · 2026</p>
      </footer>
    </>
  );
}

export default App;
