
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { toast } from "sonner";

import { AudioContextRef, createBinauralBeat, cleanupAudio, toggleAudioPause, extractFrequency } from "../utils/audio";

// Components
import SessionHeader from "../components/session/SessionHeader";
import SessionInfo from "../components/session/SessionInfo";
import ProgressRing from "../components/session/ProgressRing";
import TimerDisplay from "../components/session/TimerDisplay";
import AudioControls from "../components/session/AudioControls";
import { useSessionTimer } from "../hooks/useSessionTimer";

const SessionInProgress = () => {
  const navigate = useNavigate();
  const { currentSession, endSession } = useApp();
  const [isPaused, setIsPaused] = React.useState(false);
  const audioRef = useRef<AudioContextRef | null>(null);
  
  // Redirect if no session is active
  useEffect(() => {
    if (!currentSession.isActive || !currentSession.track) {
      navigate("/");
    }
  }, [currentSession.isActive, currentSession.track, navigate]);
  
  // Initialize and manage the session timer
  const { timeRemaining, progress } = useSessionTimer({
    initialDuration: currentSession.duration,
    isPaused,
    onComplete: () => {
      endSession();
      navigate("/");
    }
  });
  
  // Setup and cleanup audio
  useEffect(() => {
    if (!currentSession.track) return;
    
    // Clean up any existing audio
    if (audioRef.current) {
      cleanupAudio(audioRef.current);
    }
    
    try {
      // Extract frequency value from the track string
      const frequencyValue = extractFrequency(currentSession.track.frequency);
      
      // Create and configure audio
      const audio = createBinauralBeat(frequencyValue);
      if (audio) {
        audioRef.current = audio;
        
        // Show toast notification
        toast.success(`Playing ${currentSession.track.frequency} binaural beat`);
      }
      
      // Cleanup function
      return () => {
        if (audioRef.current) {
          cleanupAudio(audioRef.current);
          audioRef.current = null;
        }
      };
    } catch (err) {
      console.error("Error setting up audio:", err);
      toast.error("Failed to play audio. Please try again.");
    }
  }, [currentSession.track]);
  
  // Handle pause/play for audio
  useEffect(() => {
    if (!audioRef.current) return;
    toggleAudioPause(audioRef.current, isPaused);
  }, [isPaused]);
  
  const handleEndSession = () => {
    toast.info("Session ended by user");
    endSession();
    navigate("/");
  };
  
  const togglePause = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);
    
    // Show toast based on state
    if (newPausedState) {
      toast.info("Session paused");
    } else {
      toast.info("Session resumed");
    }
  };
  
  if (!currentSession.track) return null;
  
  const { track } = currentSession;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-accent/50 to-background animate-fade-in overflow-hidden">
      <SessionHeader track={track} onEndSession={handleEndSession} />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <SessionInfo track={track} />
        
        <div className="w-full max-w-xs aspect-square relative flex items-center justify-center mb-12">
          {/* Progress ring component */}
          <ProgressRing progress={progress} />
          
          {/* Timer display component */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <TimerDisplay timeRemaining={timeRemaining} />
          </div>
        </div>
        
        {/* Audio controls component */}
        <AudioControls isPaused={isPaused} onTogglePause={togglePause} />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </div>
  );
};

export default SessionInProgress;
