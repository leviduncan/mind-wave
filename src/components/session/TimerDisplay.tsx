
import React, { memo } from "react";
import { formatTime } from "../../utils/format";

interface TimerDisplayProps {
  timeRemaining: number;
  label?: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = memo(({ 
  timeRemaining, 
  label = "remaining" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-5xl font-bold" aria-live="polite">
        {formatTime(timeRemaining)}
      </div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  );
});

TimerDisplay.displayName = "TimerDisplay";

export default TimerDisplay;
