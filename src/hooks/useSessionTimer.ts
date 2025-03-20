
import { useState, useEffect, useCallback } from 'react';
import { toast } from "sonner";

interface UseSessionTimerProps {
  initialDuration: number;
  isPaused: boolean;
  onComplete: () => void;
}

export function useSessionTimer({ 
  initialDuration, 
  isPaused, 
  onComplete 
}: UseSessionTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);

  // Reset timer if initialDuration changes
  useEffect(() => {
    setTimeRemaining(initialDuration);
  }, [initialDuration]);

  // Timer logic using setInterval for better accuracy
  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      // Using setInterval for better timer accuracy
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          // Notify user when time is running low
          if (newTime === 60) { // 1 minute remaining
            toast.info("1 minute remaining in your session");
          }
          return newTime;
        });
      }, 1000);
      
      // Clean up interval
      return () => clearInterval(interval);
    } else if (timeRemaining === 0) {
      // Session completed
      toast.success("Session completed successfully!");
      onComplete();
    }
  }, [timeRemaining, isPaused, onComplete]);

  // Calculate progress (0 to 1)
  const progress = 1 - (timeRemaining / initialDuration);

  return {
    timeRemaining,
    progress,
    setTimeRemaining
  };
}
