import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import type { PageName } from "./types/page";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const SITE_NAME = "Kampüs Etkinlikleri";

const categories = [...new Set(events.map((e) => e.category))];

const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

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
  const text =
    page === "home" ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." : undefined;

  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${SITE_NAME} — ${title}`;
  }, [title]);

  return (
    <>
      <Header title={title} text={text} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section className="etkinlik-listesi">
            <h2>Yaklaşan 2 etkinlik</h2>
            <div className="kartlar iki">
              <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
              Tüm etkinlikleri gör →
            </a>
          </section>
        )}

        {page === "events" && (
          <section className="etkinlik-listesi">
            <EventFilter searchText={searchText} category={category} categories={categories}
              onSearchChange={setSearchText} onCategoryChange={setCategory} />
            {filtered.length > 0 && <p>{filtered.length} etkinlik listeleniyor.</p>}
            <div className="kartlar">
              <EventList events={filtered} onShowDetail={(id) => go("detail", id)}
                emptyText="Aradığınız etkinlik bulunamadı." />
            </div>
          </section>
        )}

        {page === "detail" &&
          (selected ? (
            <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
          ) : (
            <div className="hata-kutusu" role="alert">
              <p>Etkinlik bulunamadı. Seçili etkinlik numarası geçersiz veya eksik.</p>
              <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
                ← Listeye dön
              </a>
            </div>
          ))}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
