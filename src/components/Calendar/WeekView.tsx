import React, { useMemo } from 'react';
import { getWeekDays, getEventsForWeekDay, formatTime } from '@/utils/date.utils';
import type { CalendarEvent } from './CalendarView.types';
import clsx from 'clsx';
import { isToday } from '@/utils/date.utils';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => i);

export const WeekView = React.memo<WeekViewProps>(({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);
  
  const getEventPosition = (event: CalendarEvent): { top: number; height: number } => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const startHour = start.getHours() + start.getMinutes() / 60;
    const endHour = end.getHours() + end.getMinutes() / 60;
    const duration = endHour - startHour;
    
    return {
      top: (startHour / 24) * 100,
      height: (duration / 24) * 100,
    };
  };
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-8 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <div className="bg-neutral-100 dark:bg-neutral-900 p-2">
            <div className="h-12" />
          </div>
          {weekDays.map((date, dayIndex) => {
            const isTodayCheck = isToday(date);
            const dayEvents = getEventsForWeekDay(events, date);
            
            return (
              <div key={dayIndex} className="bg-white dark:bg-neutral-900">
                <div
                  className={clsx(
                    'p-2 text-center border-b border-neutral-200 dark:border-neutral-800',
                    isTodayCheck && 'bg-primary-50 dark:bg-primary-900/20'
                  )}
                >
                  <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={clsx(
                    'text-lg font-semibold mt-1',
                    isTodayCheck ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-900 dark:text-neutral-100'
                  )}>
                    {date.getDate()}
                  </div>
                </div>
                <div className="relative bg-white dark:bg-neutral-950" style={{ height: '1440px' }}>
                  {TIME_SLOTS.map((hour) => (
                    <div
                      key={hour}
                      className="border-b border-neutral-100 dark:border-neutral-800"
                      style={{ height: '60px' }}
                    />
                  ))}
                  {dayEvents.map(event => {
                    const { top, height } = getEventPosition(event);
                    return (
                      <div
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className="absolute left-1 right-1 rounded px-2 py-1 text-xs cursor-pointer hover:opacity-80 transition-opacity focus-visible-ring"
                        style={{
                          top: `${top}%`,
                          height: `${Math.max(height, 2)}%`,
                          backgroundColor: event.color || '#1a73e8',
                          color: '#ffffff',
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onEventClick(event);
                          }
                        }}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-xs opacity-90">
                          {formatTime(new Date(event.startDate))} - {formatTime(new Date(event.endDate))}
                        </div>
                      </div>
                    );
                  })}
                  <div
                    onClick={() => onDateClick(date)}
                    className="absolute inset-0 cursor-pointer focus-visible-ring"
                    role="button"
                    tabIndex={0}
                    aria-label={`Add event on ${date.toLocaleDateString()}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

WeekView.displayName = 'WeekView';

