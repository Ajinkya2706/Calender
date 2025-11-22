import { describe, it, expect } from 'vitest';
import { createEvent, validateEvent, getEventStats, getEventColors } from '../event.utils';

describe('event.utils', () => {
  describe('createEvent', () => {
    it('creates event with all fields', () => {
      const event = createEvent(
        'Test Event',
        new Date(2024, 0, 15, 9, 0),
        new Date(2024, 0, 15, 10, 0),
        '#1a73e8',
        'Description',
        'Meeting'
      );
      expect(event.title).toBe('Test Event');
      expect(event.id).toBeDefined();
    });
  });

  describe('validateEvent', () => {
    it('validates correct event', () => {
      const event = {
        title: 'Test',
        startDate: new Date(2024, 0, 15, 9, 0),
        endDate: new Date(2024, 0, 15, 10, 0),
      };
      expect(validateEvent(event)).toHaveLength(0);
    });

    it('rejects missing title', () => {
      const event = {
        startDate: new Date(2024, 0, 15, 9, 0),
        endDate: new Date(2024, 0, 15, 10, 0),
      };
      const errors = validateEvent(event);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.includes('Title'))).toBe(true);
    });

    it('rejects end date before start date', () => {
      const event = {
        title: 'Test',
        startDate: new Date(2024, 0, 15, 10, 0),
        endDate: new Date(2024, 0, 15, 9, 0),
      };
      const errors = validateEvent(event);
      expect(errors.some(e => e.includes('after start'))).toBe(true);
    });
  });

  describe('getEventStats', () => {
    it('calculates statistics correctly', () => {
      const events = [
        createEvent('Meeting 1', new Date(), new Date(), '#1a73e8', '', 'Meeting'),
        createEvent('Work 1', new Date(), new Date(), '#1a73e8', '', 'Work'),
        createEvent('Meeting 2', new Date(), new Date(), '#1a73e8', '', 'Meeting'),
      ];
      const stats = getEventStats(events);
      expect(stats.total).toBe(3);
      expect(stats.meetings).toBe(2);
      expect(stats.workItems).toBe(1);
    });
  });

  describe('getEventColors', () => {
    it('returns array of colors', () => {
      const colors = getEventColors();
      expect(colors).toBeInstanceOf(Array);
      expect(colors.length).toBeGreaterThan(0);
    });
  });
});

