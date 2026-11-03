import { useParams } from "react-router-dom";
import { useEvents } from "../context/use-events";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");

  return event ? <EventDetail event={event} /> : <NotFoundPage />;
}

export default EventDetailPage;
