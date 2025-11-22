import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CalendarCell } from '../CalendarCell';
import { createEvent } from '@/utils/event.utils';

describe('CalendarCell', () => {
  const mockDate = new Date(2024, 0, 15);
  const mockEvents = [createEvent('Test', mockDate, new Date(mockDate.getTime() + 3600000))];
  const mockHandlers = {
    onClick: vi.fn(),
    onEventClick: vi.fn(),
  };

  it('renders date number', () => {
    render(
      <CalendarCell
        date={mockDate}
        events={[]}
        currentMonth={mockDate}
        isSelected={false}
        {...mockHandlers}
      />
    );
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('displays events', () => {
    render(
      <CalendarCell
        date={mockDate}
        events={mockEvents}
        currentMonth={mockDate}
        isSelected={false}
        {...mockHandlers}
      />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

