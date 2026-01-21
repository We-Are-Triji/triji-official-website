/**
 * Rate Limiting Hook
 * 
 * Provides client-side rate limiting for form submissions.
 * Note: Always implement server-side rate limiting as well.
 */

import { useState, useCallback } from 'react';

interface UseRateLimitOptions {
  /** Time in milliseconds between allowed submissions */
  limitMs?: number;
  /** Storage key for persisting rate limit across page refreshes */
  storageKey?: string;
}

interface UseRateLimitResult {
  /** Check if submission is allowed */
  canSubmit: () => boolean;
  /** Record a submission (call after successful submit) */
  recordSubmit: () => void;
  /** Get remaining seconds until next allowed submission */
  timeRemaining: () => number;
  /** Check if currently rate limited */
  isRateLimited: boolean;
}

/**
 * Hook for client-side rate limiting
 * 
 * @param options Configuration options
 * @returns Rate limiting utilities
 * 
 * @example
 * const { canSubmit, recordSubmit, timeRemaining, isRateLimited } = useRateLimit({
 *   limitMs: 60000, // 1 minute
 *   storageKey: 'inquiry_rate_limit'
 * });
 * 
 * const handleSubmit = async () => {
 *   if (!canSubmit()) {
 *     alert(`Please wait ${timeRemaining()} seconds`);
 *     return;
 *   }
 *   await submitForm();
 *   recordSubmit();
 * };
 */
export function useRateLimit(options: UseRateLimitOptions = {}): UseRateLimitResult {
  const { 
    limitMs = 60000, // Default: 1 minute
    storageKey = 'form_rate_limit' 
  } = options;

  // Try to get last submit time from sessionStorage
  const getStoredTimestamp = (): number => {
    if (typeof window === 'undefined') return 0;
    try {
      const stored = sessionStorage.getItem(storageKey);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  };

  const [lastSubmit, setLastSubmit] = useState<number>(getStoredTimestamp);

  const canSubmit = useCallback((): boolean => {
    const now = Date.now();
    return now - lastSubmit > limitMs;
  }, [lastSubmit, limitMs]);

  const recordSubmit = useCallback((): void => {
    const now = Date.now();
    setLastSubmit(now);
    
    // Persist to sessionStorage
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(storageKey, now.toString());
      } catch {
        // Ignore storage errors
      }
    }
  }, [storageKey]);

  const timeRemaining = useCallback((): number => {
    const now = Date.now();
    const elapsed = now - lastSubmit;
    const remaining = limitMs - elapsed;
    return Math.max(0, Math.ceil(remaining / 1000));
  }, [lastSubmit, limitMs]);

  const isRateLimited = !canSubmit();

  return {
    canSubmit,
    recordSubmit,
    timeRemaining,
    isRateLimited,
  };
}

export default useRateLimit;
