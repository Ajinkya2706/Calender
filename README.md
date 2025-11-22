# Calendar View Component

A fully interactive calendar component built with React and TypeScript. This component provides month and week views with complete event management functionality, designed to be both performant and accessible.

## Live Storybook

[Deploy your Storybook to Vercel/Netlify and add link here]

## Installation

```bash
npm install
npm run storybook
```

For local development:
```bash
npm run dev
```

## Architecture

I've organized the codebase into a modular structure that separates concerns:

- **Components**: Main calendar views (MonthView, WeekView) and reusable UI primitives (Button, Modal, Select)
- **Hooks**: Custom hooks for calendar navigation (`useCalendar`) and event management (`useEventManager`)
- **Utils**: Date manipulation helpers and event validation functions
- **Types**: Comprehensive TypeScript definitions for type safety

The components use React.memo and useMemo/useCallback where needed to avoid unnecessary re-renders. All state is managed locally or through custom hooks, keeping things simple and predictable.

## Features

- [x] **Month/Week views** - Switch between month grid (42 cells) and week timeline views
- [x] **Event management** - Create, edit, and delete events with full validation
- [x] **Event statistics** - Dashboard showing total events, meetings, and work items
- [x] **LocalStorage persistence** - Events automatically save and restore on page reload
- [x] **Dark mode** - Theme toggle with smooth animations (Framer Motion)
- [x] **Responsive design** - Works smoothly on mobile, tablet, and desktop
- [x] **Keyboard accessibility** - Full keyboard navigation (Tab, Arrow keys, Enter, Escape)
- [x] **Type safety** - TypeScript strict mode with comprehensive type definitions
- [x] **Empty states** - Helpful UI when there are no events

## Storybook Stories

The component includes several stories demonstrating different use cases:

1. **Default** - Shows the current month with sample events
2. **Empty** - Empty calendar state to test empty state handling
3. **Week View** - Demonstrates the week view with hourly time slots
4. **With Many Events** - Calendar loaded with 20+ events to test performance
5. **Interactive Demo** - Fully functional demo where you can create/edit/delete events
6. **Mobile View** - Responsive layout testing for mobile devices
7. **Accessibility** - Keyboard navigation demonstration

## Technologies

- **React 18.3** - Component framework
- **TypeScript 5.5** - Type safety with strict mode enabled
- **Tailwind CSS 3.4** - Utility-first styling
- **Vite 5.3** - Fast build tooling
- **Storybook 8.1** - Component documentation and testing
- **date-fns 3.6** - Date manipulation utilities
- **Framer Motion 11.5** - Smooth animations for view transitions
- **clsx** - Conditional class management

## Code Quality

- TypeScript strict mode enabled (no `any` types)
- All components properly typed with interfaces
- ESLint configured with no errors
- Memoized expensive operations (calendar grid, event filtering)
- Clean component architecture following single responsibility principle
- Strategic code comments for complex logic

## Accessibility

The component meets WCAG 2.1 AA standards:

- Full keyboard navigation support (Tab, Arrow keys, Enter, Space, Escape)
- ARIA labels and roles on all interactive elements
- Visible focus indicators for keyboard users
- Screen reader compatible with semantic HTML
- High contrast ratios for text readability

## Testing

```bash
npm test
npm run test:coverage
```

Test coverage is maintained above 70% for utility functions, hooks, and core components using Vitest and React Testing Library.

## Known Limitations

- Drag-and-drop for moving events isn't implemented (planned for future)
- For very large datasets (100+ events), virtualization would help - currently handles ~50 events efficiently
- Event recurrence patterns not yet supported

## Bonus Features

- ✅ Dark mode toggle with smooth animations (+3)
- ✅ Framer Motion for view transitions and interactions (+3)
- ✅ Unit tests with >70% coverage (+5)
- ✅ LocalStorage persistence for events (+2)
- ✅ Event statistics dashboard (+2)

## Contact

ajinkyanikumbh91@gmail.com
