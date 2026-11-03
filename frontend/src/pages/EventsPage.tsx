import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
      <EventFilter searchText={searchText} category={category} categories={categories}
        onSearchChange={setSearchText} onCategoryChange={setCategory} />
      {filtered.length > 0 && <p>{filtered.length} etkinlik listeleniyor.</p>}
      <div className="kartlar">
        <EventList events={filtered} emptyText="Aradığınız etkinlik bulunamadı." />
      </div>
    </>
  );
}

export default EventsPage;
