import { useState } from "react";
import { useEvents } from "../context/use-events";
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
    <section className="etkinlik-listesi">
      <EventFilter searchText={searchText} category={category} categories={categories}
        onSearchChange={setSearchText} onCategoryChange={setCategory} />
      {filtered.length > 0 && <p className="sonuc-sayisi">{filtered.length} etkinlik listeleniyor.</p>}
      <div className="kartlar">
        <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
      </div>
    </section>
  );
}

export default EventsPage;
