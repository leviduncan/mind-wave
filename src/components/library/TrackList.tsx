
import React from "react";
import { Track } from "@/context/SessionTypes";
import TrackCard from "./TrackCard";

interface TrackListProps {
  tracks: Track[];
  toggleFavorite: (trackId: string) => void;
  searchTerm?: string;
}

const TrackList = ({ tracks, toggleFavorite, searchTerm }: TrackListProps) => {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          {searchTerm 
            ? `No results found for "${searchTerm}"` 
            : "No tracks available in this category"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tracks.map(track => (
        <TrackCard 
          key={track.id} 
          track={track} 
          toggleFavorite={toggleFavorite} 
        />
      ))}
    </div>
  );
};

export default TrackList;
