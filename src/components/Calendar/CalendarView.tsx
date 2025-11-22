import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendar } from '@/hooks/useCalendar';
import { useEventManager } from '@/hooks/useEventManager';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { Button } from '../primitives/Button';
import { ThemeToggle } from '../primitives/ThemeToggle';
import type { CalendarViewProps } from './CalendarView.types';
import { getEventStats } from '@/utils/event.utils';
import clsx from 'clsx';

/**
 * Main Calendar View component providing month/week views with event management.
 * Handles date navigation, event CRUD operations, and view switching.
 */
export const CalendarView = React.memo<CalendarViewProps>(({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate,
}) => {
  // Calendar navigation and state management
  const {
    currentDate,
    view,
    setView,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    monthDisplay,
  } = useCalendar(initialDate, initialView);
  
  // Track selected date for highlighting
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Event management (create, update, delete) with modal control
  const eventManager = useEventManager({
    events,
    onEventAdd,
    onEventUpdate,
    onEventDelete,
  });
  
  // Calculate event statistics for header display
  const stats = useMemo(() => getEventStats(events), [events]);
  
  /**
   * Handles date cell click to create new event.
   * Pre-fills modal with selected date.
   */
  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
    eventManager.openCreateModal(date);
  }, [eventManager]);
  
  /**
   * Handles event click to edit existing event.
   * Opens modal with event data pre-filled.
   */
  const handleEventClick = useCallback((event: typeof events[0]) => {
    eventManager.openEditModal(event);
  }, [eventManager]);
  
  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-6">
      <motion.div 
        className="bg-white dark:bg-neutral-900 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-neutral-900 dark:bg-neutral-950 px-6 py-8 border-b border-neutral-800 dark:border-neutral-700">
          <div className="flex items-start justify-between mb-6">
            <div>
              <motion.h1 
                className="text-3xl font-semibold text-white mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Calendar
              </motion.h1>
              <p className="text-neutral-400 text-sm">Manage your schedule and events</p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {stats.total > 0 && (
                <motion.div 
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span className="text-white text-sm font-medium">{stats.total} events</span>
                </motion.div>
              )}
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="bg-neutral-800 dark:bg-neutral-900 rounded-lg p-4"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
              <div className="text-neutral-400 text-sm">Total Events</div>
            </motion.div>
            <motion.div 
              className="bg-neutral-800 dark:bg-neutral-900 rounded-lg p-4"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-white mb-1">{stats.meetings}</div>
              <div className="text-neutral-400 text-sm">Meetings</div>
            </motion.div>
            <motion.div 
              className="bg-neutral-800 dark:bg-neutral-900 rounded-lg p-4"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-white mb-1">{stats.workItems}</div>
              <div className="text-neutral-400 text-sm">Work Items</div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousMonth}
                aria-label="Previous month"
                className="dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                ← Prev
              </Button>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white px-4">
                {monthDisplay}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                  className="dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  Next →
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToToday}
                  className="ml-2 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  Today
                </Button>
              </div>
            </div>
            
            <div className="flex rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden">
              <motion.button
                onClick={() => setView('month')}
                className={clsx(
                  'px-4 py-1.5 text-sm font-medium transition-colors focus-visible-ring',
                  view === 'month'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                )}
                aria-pressed={view === 'month'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Month
              </motion.button>
              <motion.button
                onClick={() => setView('week')}
                className={clsx(
                  'px-4 py-1.5 text-sm font-medium transition-colors focus-visible-ring',
                  view === 'week'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                )}
                aria-pressed={view === 'week'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Week
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="p-4 lg:p-6 bg-neutral-50 dark:bg-neutral-950">
          <AnimatePresence mode="wait">
            {view === 'month' ? (
              <motion.div
                key="month"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <MonthView
                  currentDate={currentDate}
                  events={events}
                  selectedDate={selectedDate}
                  onDateClick={handleDateClick}
                  onEventClick={handleEventClick}
                />
              </motion.div>
            ) : (
              <motion.div
                key="week"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <WeekView
                  currentDate={currentDate}
                  events={events}
                  onDateClick={handleDateClick}
                  onEventClick={handleEventClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <EventModal
        isOpen={eventManager.isModalOpen}
        event={eventManager.editingEvent}
        onClose={eventManager.closeModal}
        onSave={eventManager.handleSave}
        onDelete={eventManager.handleDelete}
      />
    </div>
  );
});

CalendarView.displayName = 'CalendarView';

