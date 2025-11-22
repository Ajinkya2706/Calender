import { useState, useCallback } from 'react';
import type { CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { validateEvent } from '@/utils/event.utils';

interface UseEventManagerProps {
  events: CalendarEvent[];
  onEventAdd: (event: CalendarEvent) => void;
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete: (id: string) => void;
}

interface UseEventManagerReturn {
  isModalOpen: boolean;
  editingEvent: CalendarEvent | null;
  openCreateModal: (date?: Date) => void;
  openEditModal: (event: CalendarEvent) => void;
  closeModal: () => void;
  handleSave: (eventData: Partial<CalendarEvent>) => void;
  handleDelete: () => void;
}

/**
 * Custom hook managing event CRUD operations and modal state.
 * Handles validation, error handling, and event data transformations.
 * Memoizes callbacks to prevent unnecessary re-renders.
 */

export const useEventManager = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}: UseEventManagerProps): UseEventManagerReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [defaultDate, setDefaultDate] = useState<Date | undefined>();
  
  const openCreateModal = useCallback((date?: Date) => {
    setDefaultDate(date);
    setEditingEvent(null);
    setIsModalOpen(true);
  }, []);
  
  const openEditModal = useCallback((event: CalendarEvent) => {
    setEditingEvent(event);
    setDefaultDate(undefined);
    setIsModalOpen(true);
  }, []);
  
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setDefaultDate(undefined);
  }, []);
  
  const handleSave = useCallback((eventData: Partial<CalendarEvent>) => {
    const errors = validateEvent(eventData);
    if (errors.length > 0) {
      return;
    }
    
    if (editingEvent) {
      onEventUpdate(editingEvent.id, eventData);
    } else {
      const newEvent: CalendarEvent = {
        id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: eventData.title!,
        description: eventData.description,
        startDate: eventData.startDate!,
        endDate: eventData.endDate!,
        color: eventData.color || '#1a73e8',
        category: eventData.category,
      };
      onEventAdd(newEvent);
    }
    
    closeModal();
  }, [editingEvent, onEventAdd, onEventUpdate, closeModal]);
  
  const handleDelete = useCallback(() => {
    if (editingEvent) {
      onEventDelete(editingEvent.id);
      closeModal();
    }
  }, [editingEvent, onEventDelete, closeModal]);
  
  return {
    isModalOpen,
    editingEvent: editingEvent || (defaultDate ? { 
      id: '',
      title: '',
      startDate: defaultDate,
      endDate: new Date(defaultDate.getTime() + 60 * 60 * 1000),
      color: '#1a73e8'
    } as CalendarEvent : null),
    openCreateModal,
    openEditModal,
    closeModal,
    handleSave,
    handleDelete,
  };
};

