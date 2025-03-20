
import { toast } from "sonner";

export interface AudioContextRef {
  context: AudioContext;
  oscillator: OscillatorNode;
  gainNode: GainNode;
  isPaused: boolean;
}

export const DEFAULT_FREQUENCY = 40; // Default fallback frequency
export const DEFAULT_VOLUME = 0.2;

// Scale volume inversely with frequency to prevent lower frequencies from being too quiet
export function getScaledVolume(frequency: number): number {
  // Base volume amplification for lower frequencies
  // Higher frequencies (like 40Hz Gamma) are audible at DEFAULT_VOLUME
  // Lower frequencies need a boost to be equally perceptible
  if (frequency >= 40) {
    return DEFAULT_VOLUME;
  } else if (frequency >= 20) {
    return DEFAULT_VOLUME * 1.5; // 50% louder for Beta range (20Hz)
  } else if (frequency >= 10) {
    return DEFAULT_VOLUME * 2.0; // 100% louder for Alpha range (10Hz)
  } else if (frequency >= 5) {
    return DEFAULT_VOLUME * 2.5; // 150% louder for Theta range (5Hz)
  } else {
    return DEFAULT_VOLUME * 3.0; // 200% louder for Delta range (2Hz)
  }
}

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
    oscillator.frequency.value = frequency; // Direct assignment instead of setValueAtTime
    
    // Scale volume based on frequency
    const scaledVolume = getScaledVolume(frequency);
    
    // Set volume to a scaled level based on frequency
    gainNode.gain.value = scaledVolume;
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start oscillator
    oscillator.start();
    
    // Add debug logging
    console.log(`Audio created: frequency=${frequency}Hz, volume=${scaledVolume}`);
    
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
    console.log("Audio cleaned up successfully");
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
        audioRef.gainNode.gain.value = 0;
      });
      audioRef.isPaused = true;
      console.log("Audio paused");
    } else if (!isPaused && audioRef.isPaused) {
      // Modern approach - resume the audio context
      audioRef.context.resume().catch(err => {
        console.error("Failed to resume audio context:", err);
        // Fallback to the gain approach
        const frequency = audioRef.oscillator.frequency.value;
        audioRef.gainNode.gain.value = getScaledVolume(frequency);
      });
      audioRef.isPaused = false;
      console.log("Audio resumed");
    }
  } catch (err) {
    console.error("Error toggling audio pause state:", err);
    toast.error("Failed to pause/resume audio.");
  }
}
