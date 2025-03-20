
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Track } from "../../context/SessionTypes";

interface SessionHeaderProps {
  track: Track;
  onEndSession: () => void;
}

const SessionHeader: React.FC<SessionHeaderProps> = ({ track, onEndSession }) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
      <div className="text-sm font-medium">
        {track.category} &gt; {track.subCategory}
      </div>
      <Button 
        onClick={onEndSession}
        variant="outline"
        size="icon"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm hover:bg-white transition-all"
        aria-label="End session"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SessionHeader;
