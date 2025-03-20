
import React from "react";
import { Track } from "../../context/SessionTypes";

interface SessionInfoProps {
  track: Track;
}

const SessionInfo: React.FC<SessionInfoProps> = ({ track }) => {
  return (
    <div className="text-center space-y-2 mb-12">
      <div className="text-sm font-medium text-muted-foreground">Now Playing</div>
      <h1 className="text-2xl font-bold tracking-tight">{track.name}</h1>
      <div className="text-primary font-medium">{track.frequency}</div>
    </div>
  );
};

export default SessionInfo;
