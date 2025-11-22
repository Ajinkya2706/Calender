import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalendar } from '../useCalendar';

describe('useCalendar', () => {
  it('initializes with current month', () => {
    const { result } = renderHook(() => useCalendar());
    expect(result.current.currentDate).toBeInstanceOf(Date);
  });

  it('navigates to next month', () => {
    const { result } = renderHook(() => useCalendar());
    const initialMonth = result.current.currentDate.getMonth();
    
    act(() => {
      result.current.goToNextMonth();
    });
    
    expect(result.current.currentDate.getMonth()).toBe((initialMonth + 1) % 12);
  });

  it('navigates to previous month', () => {
    const { result } = renderHook(() => useCalendar());
    const initialMonth = result.current.currentDate.getMonth();
    
    act(() => {
      result.current.goToPreviousMonth();
    });
    
    const expectedMonth = initialMonth === 0 ? 11 : initialMonth - 1;
    expect(result.current.currentDate.getMonth()).toBe(expectedMonth);
  });

  it('switches view', () => {
    const { result } = renderHook(() => useCalendar());
    
    act(() => {
      result.current.setView('week');
    });
    
    expect(result.current.view).toBe('week');
  });

  it('goes to today', () => {
    const { result } = renderHook(() => useCalendar());
    const today = new Date();
    
    act(() => {
      result.current.goToToday();
    });
    
    expect(result.current.currentDate.getMonth()).toBe(today.getMonth());
    expect(result.current.currentDate.getFullYear()).toBe(today.getFullYear());
  });
});

