
import React from "react";
import { Star, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Track } from "@/context/SessionTypes";

interface TrackCardProps {
  track: Track;
  toggleFavorite: (trackId: string) => void;
  showSelectButton?: boolean;
}

const TrackCard = ({ track, toggleFavorite, showSelectButton = true }: TrackCardProps) => {
  const navigate = useNavigate();
  
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(track.id);
  };

  const handleTrackClick = () => {
    navigate(`/session-select?track=${track.id}`);
  };

  return (
    <div 
      className="track-card cursor-pointer"
      onClick={handleTrackClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="bg-accent text-accent-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
          {track.frequency}
        </div>
        <button 
          className={`${track.isFavorite ? 'text-amber-400' : 'text-gray-300'}`}
          onClick={handleStarClick}
        >
          <Star className={`w-5 h-5 ${track.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      <h3 className="text-lg font-medium mb-1">{track.name}</h3>
      <p className="text-muted-foreground text-sm mb-3">{track.description}</p>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {track.category} &gt; {track.subCategory}
        </div>
        {showSelectButton && (
          <button className="btn-primary text-sm py-1.5">
            <Play className="w-4 h-4 mr-1 inline-block" /> 
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackCard;
