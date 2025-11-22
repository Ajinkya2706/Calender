import { useState, useCallback, useMemo } from 'react';
import { addMonths, subMonths, startOfMonth, format } from 'date-fns';
import type { CalendarView } from '@/components/Calendar/CalendarView.types';

interface UseCalendarReturn {
  currentDate: Date;
  view: CalendarView;
  setView: (view: CalendarView) => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
  goToToday: () => void;
  goToDate: (date: Date) => void;
  monthDisplay: string;
}

/**
 * Custom hook managing calendar navigation and view state.
 * Handles month/week switching and date navigation.
 * Memoizes month display string for performance.
 */

export const useCalendar = (initialDate?: Date, initialView: CalendarView = 'month'): UseCalendarReturn => {
  const [currentDate, setCurrentDate] = useState<Date>(() => 
    initialDate ? startOfMonth(initialDate) : startOfMonth(new Date())
  );
  const [view, setView] = useState<CalendarView>(initialView);
  
  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => startOfMonth(addMonths(prev, 1)));
  }, []);
  
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prev => startOfMonth(subMonths(prev, 1)));
  }, []);
  
  const goToToday = useCallback(() => {
    setCurrentDate(startOfMonth(new Date()));
  }, []);
  
  const goToDate = useCallback((date: Date) => {
    setCurrentDate(startOfMonth(date));
  }, []);
  
  const monthDisplay = useMemo(() => {
    return format(currentDate, 'MMMM yyyy');
  }, [currentDate]);
  
  return {
    currentDate,
    view,
    setView,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    goToDate,
    monthDisplay,
  };
};

