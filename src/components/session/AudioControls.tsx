
import React from "react";
import { Play, Pause } from "lucide-react";

interface AudioControlsProps {
  isPaused: boolean;
  onTogglePause: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({ isPaused, onTogglePause }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={onTogglePause}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
        aria-label={isPaused ? "Resume session" : "Pause session"}
        title={isPaused ? "Resume" : "Pause"}
      >
        {isPaused ? (
          <Play className="w-8 h-8" />
        ) : (
          <Pause className="w-8 h-8" />
        )}
      </button>
      <div className="text-sm font-medium">
        {isPaused ? "Resume" : "Pause"}
      </div>
    </div>
  );
};

export default AudioControls;
