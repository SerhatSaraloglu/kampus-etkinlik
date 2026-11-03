import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p>
        {event.category} · <time dateTime={event.date}>{formatDate(event.date)}</time>
      </p>
      <p>{event.location}</p>
      <p>Kontenjan: {event.capacity}</p>
      <Link to={`/events/${event.id}`}>Detayları gör →</Link>
    </article>
  );
}

export default EventCard;
