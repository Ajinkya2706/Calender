import { CalendarEvent } from '@/components/Calendar/CalendarView.types';

export const createEvent = (
  title: string,
  startDate: Date,
  endDate: Date,
  color: string = '#1a73e8',
  description?: string,
  category?: string
): CalendarEvent => {
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    description,
    startDate,
    endDate,
    color,
    category,
  };
};

/**
 * Validates event data with comprehensive checks.
 * Returns array of error messages for invalid fields.
 * Handles edge cases: missing fields, date logic, length constraints.
 */
export const validateEvent = (event: Partial<CalendarEvent>): string[] => {
  const errors: string[] = [];
  
  // Title validation: required and length check
  if (!event.title || event.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (event.title.length > 100) {
    errors.push('Title must be 100 characters or less');
  }
  
  // Description validation: optional but must respect max length
  if (event.description && event.description.length > 500) {
    errors.push('Description must be 500 characters or less');
  }
  
  // Start date validation: required and must be valid Date object
  if (!event.startDate) {
    errors.push('Start date is required');
  } else if (!(event.startDate instanceof Date) || isNaN(event.startDate.getTime())) {
    errors.push('Start date must be a valid date');
  }
  
  // End date validation: required and must be valid Date object
  if (!event.endDate) {
    errors.push('End date is required');
  } else if (!(event.endDate instanceof Date) || isNaN(event.endDate.getTime())) {
    errors.push('End date must be a valid date');
  }
  
  // Date logic validation: end must be after start
  if (event.startDate && event.endDate && 
      event.startDate instanceof Date && event.endDate instanceof Date &&
      !isNaN(event.startDate.getTime()) && !isNaN(event.endDate.getTime())) {
    if (event.endDate <= event.startDate) {
      errors.push('End date must be after start date');
    }
  }
  
  return errors;
};

export const getEventColors = (): string[] => {
  return [
    '#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9c27b0',
    '#00acc1', '#ff9800', '#795548'
  ];
};

export const getEventStats = (events: CalendarEvent[]) => {
  const total = events.length;
  const meetings = events.filter(e => e.category === 'Meeting').length;
  const workItems = events.filter(e => e.category === 'Work' || e.category === 'Personal').length;
  
  return { total, meetings, workItems };
};
