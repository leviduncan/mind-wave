
import { toast } from "sonner";

export interface AudioContextRef {
  context: AudioContext;
  oscillator: OscillatorNode;
  gainNode: GainNode;
  isPaused: boolean;
}

export const DEFAULT_FREQUENCY = 40; // Default fallback frequency
export const DEFAULT_VOLUME = 0.2;

export function extractFrequency(frequencyText: string): number {
  // More robust frequency extraction that handles different formats
  const frequencyMatch = frequencyText.match(/(\d+)/);
  let frequencyValue = DEFAULT_FREQUENCY; // Default fallback
  
  if (frequencyMatch && frequencyMatch[0]) {
    frequencyValue = parseInt(frequencyMatch[0], 10);
  }
  
  console.log(`Playing frequency: ${frequencyValue} Hz from "${frequencyText}"`);
  return frequencyValue;
}

export function createBinauralBeat(frequency: number): AudioContextRef | null {
  try {
    // Create audio context and oscillator
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configure oscillator
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    // Set volume to a reasonable level
    gainNode.gain.setValueAtTime(DEFAULT_VOLUME, audioContext.currentTime);
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start oscillator
    oscillator.start();
    
    return { 
      context: audioContext, 
      oscillator, 
      gainNode, 
      isPaused: false 
    };
  } catch (err) {
    console.error("Error creating audio:", err);
    toast.error("Failed to play audio. Please try again.");
    return null;
  }
}

export function cleanupAudio(audioRef: AudioContextRef | null): void {
  if (!audioRef) return;
  
  try {
    if (audioRef.oscillator) {
      audioRef.oscillator.stop();
    }
    if (audioRef.context) {
      audioRef.context.close();
    }
  } catch (err) {
    console.error("Error during audio cleanup:", err);
  }
}

export function toggleAudioPause(audioRef: AudioContextRef | null, isPaused: boolean): void {
  if (!audioRef) return;
  
  try {
    if (isPaused && !audioRef.isPaused) {
      // Modern approach - suspend the audio context
      audioRef.context.suspend().catch(err => {
        console.error("Failed to suspend audio context:", err);
        // Fallback to the gain approach
        audioRef.gainNode.gain.setValueAtTime(0, audioRef.context.currentTime);
      });
      audioRef.isPaused = true;
    } else if (!isPaused && audioRef.isPaused) {
      // Modern approach - resume the audio context
      audioRef.context.resume().catch(err => {
        console.error("Failed to resume audio context:", err);
        // Fallback to the gain approach
        audioRef.gainNode.gain.setValueAtTime(DEFAULT_VOLUME, audioRef.context.currentTime);
      });
      audioRef.isPaused = false;
    }
  } catch (err) {
    console.error("Error toggling audio pause state:", err);
    toast.error("Failed to pause/resume audio.");
  }
}
