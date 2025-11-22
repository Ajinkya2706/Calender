import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CalendarView } from '../CalendarView';
import { createEvent } from '@/utils/event.utils';

const mockEvents = [
  createEvent('Test Event', new Date(), new Date(Date.now() + 3600000), '#1a73e8'),
];

describe('CalendarView', () => {
  const mockHandlers = {
    onEventAdd: vi.fn(),
    onEventUpdate: vi.fn(),
    onEventDelete: vi.fn(),
  };

  it('renders calendar header', () => {
    render(<CalendarView events={[]} {...mockHandlers} />);
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  it('displays event statistics', () => {
    render(<CalendarView events={mockEvents} {...mockHandlers} />);
    expect(screen.getByText('Total Events')).toBeInTheDocument();
  });

  it('renders month view by default', () => {
    render(<CalendarView events={[]} {...mockHandlers} />);
    expect(screen.getByText('Month')).toBeInTheDocument();
  });
});

