import React, { useMemo } from 'react';
import type { CalendarEvent } from './CalendarView.types';
import { getCalendarGrid, getEventsForDay } from '@/utils/date.utils';
import { CalendarCell } from './CalendarCell';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate: Date | null;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

/**
 * MonthView displays a 42-cell grid (6 weeks × 7 days) representing a calendar month.
 * Handles date selection, event display, and navigation between months.
 */
export const MonthView = React.memo<MonthViewProps>(({
  currentDate,
  events,
  selectedDate,
  onDateClick,
  onEventClick,
}) => {
  // Generate 42-cell grid ensuring complete weeks are displayed
  const grid = useMemo(() => getCalendarGrid(currentDate), [currentDate]);
  
  // Week day headers - using uppercase for consistency
  const weekDays = useMemo(() => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'], []);
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
        {weekDays.map(day => (
          <div
            key={day}
            className="bg-neutral-100 dark:bg-neutral-900 px-2 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 text-center"
            role="columnheader"
            aria-label={`${day} column`}
          >
            {day}
          </div>
        ))}
        {grid.map((date, index) => {
          // Filter events for current day
          const dayEvents = getEventsForDay(events, date);
          const isSelected = selectedDate ? date.toDateString() === selectedDate.toDateString() : false;
          
          return (
            <CalendarCell
              key={`${date.getTime()}-${index}`}
              date={date}
              events={dayEvents}
              currentMonth={currentDate}
              isSelected={isSelected}
              onClick={onDateClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
});

MonthView.displayName = 'MonthView';

