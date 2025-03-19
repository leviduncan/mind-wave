
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { X, Pause, Play } from "lucide-react";

const SessionInProgress = () => {
  const navigate = useNavigate();
  const { currentSession, endSession } = useApp();
  const [timeRemaining, setTimeRemaining] = useState(currentSession.duration);
  const [isPaused, setIsPaused] = useState(false);
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  // Redirect if no session is active
  useEffect(() => {
    if (!currentSession.isActive || !currentSession.track) {
      navigate("/");
    }
  }, [currentSession.isActive, currentSession.track, navigate]);
  
  // Timer logic
  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      // Session completed
      endSession();
      navigate("/");
    }
  }, [timeRemaining, isPaused, endSession, navigate]);
  
  const handleEndSession = () => {
    endSession();
    navigate("/");
  };
  
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  if (!currentSession.track) return null;
  
  const { track } = currentSession;
  const progress = 1 - (timeRemaining / currentSession.duration);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-accent/50 to-background animate-fade-in overflow-hidden">
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <div className="text-sm font-medium">
          {track.category} &gt; {track.subCategory}
        </div>
        <button 
          onClick={handleEndSession}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm hover:bg-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-2 mb-12">
          <div className="text-sm font-medium text-muted-foreground">Now Playing</div>
          <h1 className="text-2xl font-bold tracking-tight">{track.name}</h1>
          <div className="text-primary font-medium">{track.frequency}</div>
        </div>
        
        <div className="w-full max-w-xs aspect-square relative flex items-center justify-center mb-12">
          {/* Progress ring */}
          <svg className="w-full h-full -rotate-90 animate-pulse-subtle" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={2 * Math.PI * 40 * (1 - progress)}
              className="text-primary transition-all duration-1000"
            />
          </svg>
          
          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold">{formatTime(timeRemaining)}</div>
            <div className="text-sm text-muted-foreground mt-2">remaining</div>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={togglePause}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
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
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </div>
  );
};

export default SessionInProgress;
