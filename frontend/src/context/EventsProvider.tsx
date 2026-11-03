import { useState, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";
import { EventsContext } from "./events-context";

function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
  };
}

function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    setEvents([...events, toEvent(`event-${Date.now()}`, data)]);
  }

  function updateEvent(id: string, data: EventFormData) {
    // Afiş formda yok; güncellemede eskisini koru
    setEvents(events.map((e) => (e.id === id ? { ...toEvent(id, data), image: e.image } : e)));
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export default EventsProvider;
