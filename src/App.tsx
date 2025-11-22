import { useCallback } from 'react';
import { CalendarView } from './components/Calendar/CalendarView';
import type { CalendarEvent } from './components/Calendar/CalendarView.types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { createEvent } from './utils/event.utils';

const getInitialEvents = (): CalendarEvent[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return [
    createEvent(
      'Team Standup',
      new Date(currentYear, currentMonth, 15, 9, 0),
      new Date(currentYear, currentMonth, 15, 9, 30),
      '#1a73e8',
      'Daily sync with the team',
      'Meeting'
    ),
    createEvent(
      'Design Review',
      new Date(currentYear, currentMonth, 15, 14, 0),
      new Date(currentYear, currentMonth, 15, 15, 30),
      '#34a853',
      'Review new component designs',
      'Design'
    ),
    createEvent(
      'Client Presentation',
      new Date(currentYear, currentMonth, 16, 10, 0),
      new Date(currentYear, currentMonth, 16, 11, 30),
      '#fbbc04',
      undefined,
      'Meeting'
    ),
  ];
};

function App() {
  const [events, setEvents] = useLocalStorage('calendar-events', getInitialEvents());
  
  const handleEventAdd = useCallback((event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  }, [setEvents]);
  
  const handleEventUpdate = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id) {
        const updated = { ...e, ...updates };
        if (updates.startDate) updated.startDate = new Date(updates.startDate);
        if (updates.endDate) updated.endDate = new Date(updates.endDate);
        return updated;
      }
      return e;
    }));
  }, [setEvents]);
  
  const handleEventDelete = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, [setEvents]);
  
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <CalendarView
        events={events}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
      />
    </div>
  );
}

export default App;

