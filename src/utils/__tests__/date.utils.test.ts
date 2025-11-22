import { describe, it, expect } from 'vitest';
import { getCalendarGrid, isToday, isCurrentMonth, getEventsForDay, formatDateDisplay } from '../date.utils';

describe('date.utils', () => {
  describe('getCalendarGrid', () => {
    it('returns exactly 42 cells', () => {
      const grid = getCalendarGrid(new Date(2024, 0, 15));
      expect(grid).toHaveLength(42);
    });

    it('includes dates from adjacent months', () => {
      const grid = getCalendarGrid(new Date(2024, 0, 15));
      const firstDay = grid[0];
      const lastDay = grid[41];
      expect(firstDay.getMonth()).toBeLessThanOrEqual(0);
      expect(lastDay.getMonth()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('isToday', () => {
    it('returns true for today', () => {
      expect(isToday(new Date())).toBe(true);
    });

    it('returns false for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('isCurrentMonth', () => {
    it('returns true for same month', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 20);
      expect(isCurrentMonth(date1, date2)).toBe(true);
    });

    it('returns false for different month', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 1, 15);
      expect(isCurrentMonth(date1, date2)).toBe(false);
    });
  });

  describe('getEventsForDay', () => {
    it('filters events for specific day', () => {
      const date = new Date(2024, 0, 15);
      const events = [
        { id: '1', title: 'Event 1', startDate: new Date(2024, 0, 15, 9, 0), endDate: new Date(2024, 0, 15, 10, 0) },
        { id: '2', title: 'Event 2', startDate: new Date(2024, 0, 16, 9, 0), endDate: new Date(2024, 0, 16, 10, 0) },
      ];
      const result = getEventsForDay(events, date);
      expect(result).toHaveLength(1);
    });
  });

  describe('formatDateDisplay', () => {
    it('formats date correctly', () => {
      const date = new Date(2024, 0, 15);
      const result = formatDateDisplay(date);
      expect(result).toContain('2024');
    });
  });
});

