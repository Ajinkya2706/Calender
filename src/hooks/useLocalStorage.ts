import { useState, useCallback } from 'react';
import type { CalendarEvent } from '@/components/Calendar/CalendarView.types';

const serializeEvents = (events: CalendarEvent[]): string => {
  return JSON.stringify(events.map(e => ({
    ...e,
    startDate: e.startDate.toISOString(),
    endDate: e.endDate.toISOString(),
  })));
};

const deserializeEvents = (json: string): CalendarEvent[] => {
  const parsed = JSON.parse(json);
  return parsed.map((e: Omit<CalendarEvent, 'startDate' | 'endDate'> & { startDate: string; endDate: string }) => ({
    ...e,
    startDate: new Date(e.startDate),
    endDate: new Date(e.endDate),
  }));
};

export const useLocalStorage = (key: string, initialValue: CalendarEvent[]) => {
  const [storedValue, setStoredValue] = useState<CalendarEvent[]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      return deserializeEvents(item);
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: CalendarEvent[] | ((val: CalendarEvent[]) => CalendarEvent[])) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, serializeEvents(valueToStore));
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

