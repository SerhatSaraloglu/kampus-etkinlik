import { useContext } from "react";
import { EventsContext } from "./events-context";

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === null) throw new Error("useEvents, EventsProvider içinde kullanılmalı.");
  return context;
}
