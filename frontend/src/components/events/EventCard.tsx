import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
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
          onShowDetail(event.id);
        }}
      >
        Detayları gör →
      </a>
    </article>
  );
}

export default EventCard;
