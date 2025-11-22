import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import type { CalendarEvent } from './CalendarView.types';
import { isToday, isCurrentMonth, formatDayNumber } from '@/utils/date.utils';

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  currentMonth: Date;
  isSelected: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

/**
 * Individual calendar cell component displaying a single day.
 * Handles date display, event rendering (max 3 visible), and interactions.
 * Includes accessibility attributes and keyboard navigation support.
 */
export const CalendarCell = React.memo<CalendarCellProps>(({
  date,
  events,
  currentMonth,
  isSelected,
  onClick,
  onEventClick,
}) => {
  // Format day number for display
  const dayNumber = formatDayNumber(date);
  
  // Check if this cell represents today
  const isTodayCheck = isToday(date);
  
  // Check if cell is in current month (for gray-out styling)
  const isCurrentMonthCheck = isCurrentMonth(date, currentMonth);
  
  // Show maximum 3 events, rest are hidden with "+N more" indicator
  const visibleEvents = useMemo(() => events.slice(0, 3), [events]);
  const hasMoreEvents = events.length > 3;
  const moreCount = events.length - 3;
  
  /**
   * Handles date cell click to create new event.
   * Propagates to parent component.
   */
  const handleClick = useCallback(() => {
    onClick(date);
  }, [date, onClick]);
  
  /**
   * Handles event click with event propagation prevention.
   * Prevents date cell click from firing when clicking event.
   */
  const handleEventClick = useCallback((e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    onEventClick(event);
  }, [onEventClick]);
  
  /**
   * Keyboard navigation handler for date cell.
   * Supports Enter and Space keys for accessibility.
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);
  
  /**
   * Filters events for current day (ignoring time).
   * Memoized to prevent unnecessary recalculations.
   */
  const dayEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  }, [events, date]);
  
  // Generate accessible label for screen readers
  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const ariaLabel = `${monthName} ${dayNumber}, ${year}. ${dayEvents.length} event${dayEvents.length !== 1 ? 's' : ''}.`;
  
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        'border border-neutral-200 dark:border-neutral-800 h-32 p-2 transition-colors cursor-pointer focus-visible-ring',
        isCurrentMonthCheck ? 'bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800' : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-400',
        isSelected && 'ring-2 ring-primary-500 ring-offset-1'
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <span className={clsx(
          'text-sm font-medium',
          isTodayCheck && isCurrentMonthCheck && 'w-6 h-6 bg-primary-500 rounded-full text-white flex items-center justify-center',
          !isTodayCheck && 'text-neutral-900 dark:text-neutral-100'
        )}>
          {dayNumber}
        </span>
      </div>
      <div className="space-y-1 overflow-hidden">
        {visibleEvents.map(event => (
          <div
            key={event.id}
            onClick={(e) => handleEventClick(e, event)}
            className="text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: event.color || '#1a73e8', color: '#ffffff' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onEventClick(event);
              }
            }}
          >
            {event.title}
          </div>
        ))}
        {hasMoreEvents && (
          <button
            className="text-xs text-primary-600 hover:underline focus-visible-ring rounded px-1"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            +{moreCount} more
          </button>
        )}
      </div>
    </div>
  );
});

CalendarCell.displayName = 'CalendarCell';

