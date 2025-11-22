import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, format } from 'date-fns';

export const isSameDayCheck = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

/**
 * Generates a 42-cell calendar grid (6 weeks × 7 days) for month view.
 * Ensures complete weeks are displayed, including adjacent month dates.
 * Always returns exactly 42 cells regardless of month length.
 */
export const getCalendarGrid = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  
  const grid: Date[] = [];
  let currentDate = new Date(calendarStart);
  const targetCells = 42; // 6 weeks × 7 days = 42 cells
  
  // Generate exactly 42 cells for consistent grid layout
  for (let i = 0; i < targetCells; i++) {
    grid.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return grid;
};

export const getWeekDays = (date: Date): Date[] => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(weekStart, i));
  }
  return days;
};

export const formatDateDisplay = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

export const formatDayNumber = (date: Date): string => {
  return format(date, 'd');
};

export const isToday = (date: Date): boolean => {
  return isSameDayCheck(date, new Date());
};

export const isCurrentMonth = (date: Date, currentMonth: Date): boolean => {
  return date.getMonth() === currentMonth.getMonth() &&
         date.getFullYear() === currentMonth.getFullYear();
};

export const getEventsForDay = (events: Array<{ startDate: Date; endDate: Date }>, date: Date): Array<{ startDate: Date; endDate: Date }> => {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);
  
  return events.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    return (eventStart <= dayEnd && eventEnd >= dayStart);
  });
};

export const getEventsForWeekDay = (events: Array<{ startDate: Date; endDate: Date }>, date: Date): Array<{ startDate: Date; endDate: Date }> => {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);
  
  return events.filter(event => {
    const eventStart = new Date(event.startDate);
    return eventStart >= dayStart && eventStart <= dayEnd;
  });
};

