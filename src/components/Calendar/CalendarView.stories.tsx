import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import type { CalendarEvent } from './CalendarView.types';
import { createEvent } from '@/utils/event.utils';
import { useState, useCallback } from 'react';

const meta: Meta<typeof CalendarView> = {
  title: 'Components/CalendarView',
  component: CalendarView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

const generateEvents = (count: number, month: number = new Date().getMonth()): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const colors = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9c27b0', '#00acc1', '#ff9800'];
  
  for (let i = 0; i < count; i++) {
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 12) + 9;
    const duration = [30, 60, 90, 120][Math.floor(Math.random() * 4)];
    const start = new Date(2024, month, day, hour, 0);
    const end = new Date(start.getTime() + duration * 60 * 1000);
    
    events.push(createEvent(
      `Event ${i + 1}`,
      start,
      end,
      colors[Math.floor(Math.random() * colors.length)],
      `Description for event ${i + 1}`,
      ['Meeting', 'Work', 'Personal', 'Holiday'][Math.floor(Math.random() * 4)]
    ));
  }
  
  return events;
};

const CalendarWrapper = ({ initialEvents }: { initialEvents: CalendarEvent[] }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  
  const handleEventAdd = useCallback((event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  }, []);
  
  const handleEventUpdate = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);
  
  const handleEventDelete = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);
  
  return (
    <CalendarView
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  );
};

export const Default: Story = {
  render: () => {
    const sampleEvents: CalendarEvent[] = [
      createEvent(
        'Team Standup',
        new Date(2024, new Date().getMonth(), 15, 9, 0),
        new Date(2024, new Date().getMonth(), 15, 9, 30),
        '#1a73e8',
        'Daily sync with the team',
        'Meeting'
      ),
      createEvent(
        'Design Review',
        new Date(2024, new Date().getMonth(), 15, 14, 0),
        new Date(2024, new Date().getMonth(), 15, 15, 30),
        '#34a853',
        'Review new component designs',
        'Design'
      ),
      createEvent(
        'Client Presentation',
        new Date(2024, new Date().getMonth(), 16, 10, 0),
        new Date(2024, new Date().getMonth(), 16, 11, 30),
        '#fbbc04',
        undefined,
        'Meeting'
      ),
      createEvent(
        'Development Sprint',
        new Date(2024, new Date().getMonth(), 17, 9, 0),
        new Date(2024, new Date().getMonth(), 17, 17, 0),
        '#9c27b0',
        'Sprint planning and task assignment',
        'Work'
      ),
    ];
    
    return <CalendarWrapper initialEvents={sampleEvents} />;
  },
};

export const Empty: Story = {
  render: () => <CalendarWrapper initialEvents={[]} />,
};

export const WeekView: Story = {
  render: () => {
    const sampleEvents: CalendarEvent[] = [
      createEvent(
        'Morning Meeting',
        new Date(2024, new Date().getMonth(), 15, 9, 0),
        new Date(2024, new Date().getMonth(), 15, 10, 0),
        '#1a73e8'
      ),
      createEvent(
        'Lunch Break',
        new Date(2024, new Date().getMonth(), 15, 12, 0),
        new Date(2024, new Date().getMonth(), 15, 13, 0),
        '#34a853'
      ),
      createEvent(
        'Afternoon Review',
        new Date(2024, new Date().getMonth(), 15, 14, 0),
        new Date(2024, new Date().getMonth(), 15, 15, 30),
        '#fbbc04'
      ),
    ];
    
    return (
      <CalendarView
        events={sampleEvents}
        initialView="week"
        onEventAdd={() => {}}
        onEventUpdate={() => {}}
        onEventDelete={() => {}}
      />
    );
  },
};

export const WithManyEvents: Story = {
  render: () => {
    const manyEvents = generateEvents(25, new Date().getMonth());
    return <CalendarWrapper initialEvents={manyEvents} />;
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    
    const handleEventAdd = useCallback((event: CalendarEvent) => {
      setEvents(prev => [...prev, event]);
    }, []);
    
    const handleEventUpdate = useCallback((id: string, updates: Partial<CalendarEvent>) => {
      setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    }, []);
    
    const handleEventDelete = useCallback((id: string) => {
      setEvents(prev => prev.filter(e => e.id !== id));
    }, []);
    
    return (
      <CalendarView
        events={events}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
      />
    );
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => {
    const sampleEvents: CalendarEvent[] = [
      createEvent(
        'Team Standup',
        new Date(2024, new Date().getMonth(), 15, 9, 0),
        new Date(2024, new Date().getMonth(), 15, 9, 30),
        '#1a73e8'
      ),
    ];
    
    return <CalendarWrapper initialEvents={sampleEvents} />;
  },
};

export const Accessibility: Story = {
  render: () => {
    const sampleEvents: CalendarEvent[] = [
      createEvent(
        'Accessible Event',
        new Date(2024, new Date().getMonth(), 15, 9, 0),
        new Date(2024, new Date().getMonth(), 15, 9, 30),
        '#1a73e8',
        'This event demonstrates keyboard navigation and ARIA attributes',
        'Meeting'
      ),
    ];
    
    return <CalendarWrapper initialEvents={sampleEvents} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigate using arrow keys, Tab, Enter, and Escape. All interactive elements have proper ARIA labels.',
      },
    },
  },
};

