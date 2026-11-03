import { createContext } from "react";
import type { CampusEvent, EventFormData } from "../types/campus-event";

export interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

export const EventsContext = createContext<EventsContextValue | null>(null);
