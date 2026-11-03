import { Link } from "react-router-dom";
import { useEvents } from "../context/use-events";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  return (
    <section className="etkinlik-listesi">
      <h2>Yaklaşan 2 Etkinlik</h2>
      <div className="kartlar iki">
        <EventList events={upcoming} />
      </div>
      <Link className="buton" to="/events">Tüm etkinlikleri gör</Link>
    </section>
  );
}

export default HomePage;
