import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';
import { Select } from '../primitives/Select';
import type { CalendarEvent } from './CalendarView.types';
import { getEventColors, validateEvent } from '@/utils/event.utils';
import { format } from 'date-fns';

interface EventModalProps {
  isOpen: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onSave: (eventData: Partial<CalendarEvent>) => void;
  onDelete?: () => void;
}

export const EventModal = React.memo<EventModalProps>(({
  isOpen,
  event,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState('#1a73e8');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const colors = getEventColors();
  const isEditing = !!event?.id;
  
  useEffect(() => {
    if (isOpen && event) {
      if (event.id) {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        
        setTitle(event.title || '');
        setDescription(event.description || '');
        setStartDate(format(start, 'yyyy-MM-dd'));
        setStartTime(format(start, 'HH:mm'));
        setEndDate(format(end, 'yyyy-MM-dd'));
        setEndTime(format(end, 'HH:mm'));
        setColor(event.color || '#1a73e8');
        setCategory(event.category || '');
        setErrors({});
      } else if (event.startDate) {
        const start = new Date(event.startDate);
        const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 60 * 60 * 1000);
        
        setTitle('');
        setDescription('');
        setStartDate(format(start, 'yyyy-MM-dd'));
        setStartTime(format(start, 'HH:mm'));
        setEndDate(format(end, 'yyyy-MM-dd'));
        setEndTime(format(end, 'HH:mm'));
        setColor(event.color || '#1a73e8');
        setCategory('');
        setErrors({});
      }
    } else if (isOpen && !event) {
      const now = new Date();
      const defaultEnd = new Date(now.getTime() + 60 * 60 * 1000);
      setTitle('');
      setDescription('');
      setStartDate(format(now, 'yyyy-MM-dd'));
      setStartTime(format(now, 'HH:mm'));
      setEndDate(format(defaultEnd, 'yyyy-MM-dd'));
      setEndTime(format(defaultEnd, 'HH:mm'));
      setColor('#1a73e8');
      setCategory('');
      setErrors({});
    } else {
      setErrors({});
    }
  }, [event, isOpen]);
  
  /**
   * Handles form submission with comprehensive validation.
   * Validates all required fields, date logic, and format constraints.
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required date/time fields
    if (!startDate || !startTime || !endDate || !endTime) {
      setErrors({ datetime: 'All date and time fields are required' });
      return;
    }
    
    // Parse dates and handle invalid dates
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    
    // Validate parsed dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setErrors({ datetime: 'Invalid date or time format' });
      return;
    }
    
    // Trim and validate title length
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrors({ title: 'Title is required' });
      return;
    }
    
    const eventData: Partial<CalendarEvent> = {
      title: trimmedTitle,
      description: description.trim() || undefined,
      startDate: start,
      endDate: end,
      color,
      category: category || undefined,
    };
    
    // Validate event data using utility function
    const validationErrors = validateEvent(eventData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(err => {
        if (err.includes('Title')) errorMap.title = err;
        if (err.includes('Description')) errorMap.description = err;
        if (err.includes('Start')) errorMap.startDate = err;
        if (err.includes('End')) errorMap.endDate = err;
      });
      setErrors(errorMap);
      return;
    }
    
    // Clear errors and save
    setErrors({});
    onSave(eventData);
  }, [title, description, startDate, startTime, endDate, endTime, color, category, onSave]);
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Event' : 'Create Event'}
      description={isEditing ? 'Update event details below' : 'Fill in the details to create a new event'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block  text-sm font-medium text-neutral-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className=" bg-black text-white w-full px-3 py-2 border border-neutral-300 rounded-lg focus-visible-ring"
            placeholder="Event title"
            required
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
            className=" bg-black text-white w-full px-3 py-2 border border-neutral-300 rounded-lg focus-visible-ring resize-none"
            placeholder="Event description (optional)"
          />
          <p className="mt-1 text-xs text-neutral-500">{description.length}/500</p>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className=" block text-sm font-medium text-neutral-700 mb-1.5">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className=" bg-black text-white w-full px-3 py-2 border border-neutral-300 rounded-lg focus-visible-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className=" bg-black text-white w-full px-3 py-2 border border-neutral-300 rounded-lg focus-visible-ring"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className=" block text-sm font-medium text-neutral-700 mb-1.5">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className=" bg-black text-white w-full px-3 py-2 border border-neutral-300 rounded-lg focus-visible-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className=" bg-black text-white w-full px-3 py-2 border border-neutral-300 rounded-lg focus-visible-ring"
              required
            />
          </div>
        </div>
        {errors.endDate && <p className="text-sm text-red-600">{errors.endDate}</p>}
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {colors.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={c === color ? 'ring-2 ring-offset-2 ring-primary-500 rounded' : 'rounded'}
                style={{ backgroundColor: c, width: '32px', height: '32px' }}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>
        
        <div>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">None</option>
            <option value="Meeting">Meeting</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Holiday">Holiday</option>
          </Select>
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-neutral-200">
          {isEditing && onDelete && (
            <Button
              type="button"
              variant="ghost"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          )}
          <div className="flex-1" />
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Modal>
  );
});

EventModal.displayName = 'EventModal';

