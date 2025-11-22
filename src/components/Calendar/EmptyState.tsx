import React from 'react';
import { Button } from '../primitives/Button';

interface EmptyStateProps {
  onAddEvent: () => void;
}

export const EmptyState = React.memo<EmptyStateProps>(({ onAddEvent }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
        No events scheduled
      </h3>
      <p className="text-sm text-neutral-600 mb-6 text-center max-w-sm">
        Click on any date to create your first event and start managing your schedule.
      </p>
      <Button onClick={onAddEvent} variant="primary">
        Create Event
      </Button>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

