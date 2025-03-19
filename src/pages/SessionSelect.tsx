
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Play, ChevronLeft, Clock, Zap, Brain } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";

const SessionSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tracks, startSession } = useApp();
  
  // Get track ID from URL
  const queryParams = new URLSearchParams(location.search);
  const trackId = queryParams.get("track");
  
  // Find the selected track
  const selectedTrack = tracks.find(track => track.id === trackId);
  
  // Session durations
  const sessionOptions = [
    { id: "quick", label: "Focus blast", duration: 10, icon: Zap, description: "Quick 10-second focus boost" },
    { id: "pomodoro", label: "Pomodoro session", duration: 25 * 60, icon: Clock, description: "Classic 25-minute focused work session" },
    { id: "deep", label: "Deep work", duration: 60 * 60, icon: Brain, description: "Full 60-minute deep work session" }
  ];
  
  const [selectedDuration, setSelectedDuration] = useState(sessionOptions[0].id);
  
  // Redirect if no track is selected
  useEffect(() => {
    if (!selectedTrack) {
      navigate("/library");
    }
  }, [selectedTrack, navigate]);
  
  if (!selectedTrack) return null;
  
  const handleStartSession = () => {
    const duration = sessionOptions.find(option => option.id === selectedDuration)?.duration || 0;
    startSession(selectedTrack, duration);
    navigate("/session-in-progress");
  };

  return (
    <MainLayout>
      <div className="page-transition max-w-2xl mx-auto space-y-8">
        <header>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary hover:underline mb-4"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Select Session Duration</h1>
          <p className="text-muted-foreground">
            Choose how long you want to listen to <span className="font-medium">{selectedTrack.name}</span>
          </p>
        </header>
        
        <div className="track-card">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-accent text-accent-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
              {selectedTrack.frequency}
            </div>
          </div>
          <h3 className="text-lg font-medium mb-1">{selectedTrack.name}</h3>
          <p className="text-muted-foreground text-sm mb-3">{selectedTrack.description}</p>
          <div className="text-xs text-muted-foreground">
            {selectedTrack.category} &gt; {selectedTrack.subCategory}
          </div>
        </div>
        
        <div className="space-y-5">
          <h2 className="text-xl font-semibold">Choose Duration</h2>
          <div className="space-y-3">
            {sessionOptions.map(option => (
              <div
                key={option.id}
                className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                  selectedDuration === option.id 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border hover:border-primary/30"
                }`}
                onClick={() => setSelectedDuration(option.id)}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    selectedDuration === option.id 
                      ? "bg-primary text-white" 
                      : "bg-accent text-accent-foreground"
                  }`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center ml-2 transition-all duration-200 ease-in-out 
                    ${selectedDuration === option.id ? "border-primary" : "border-muted"}">
                    {selectedDuration === option.id && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <button
            onClick={handleStartSession}
            className="w-full btn-primary py-3 text-center flex items-center justify-center text-base font-medium"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Session
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default SessionSelect;
