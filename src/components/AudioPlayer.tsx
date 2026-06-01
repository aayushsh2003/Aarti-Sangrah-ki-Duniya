import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Gauge, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  title: string;
  audioUrl?: string;
  onTimeUpdate?: (time: number) => void;
}

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

const AudioPlayer = ({ title, audioUrl, onTimeUpdate }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const t = audioRef.current.currentTime;
      setCurrentTime(t);
      onTimeUpdate?.(t);
    }
  }, [onTimeUpdate]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const cycleSpeed = () => {
    const idx = speeds.indexOf(speed);
    const next = speeds[(idx + 1) % speeds.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const hasAudio = !!audioUrl;

  return (
    <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          loop={isLooping}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      <p className="text-sm text-muted-foreground mb-3 font-medium">{title}</p>

      {/* Progress bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
          disabled={!hasAudio}
        />
        <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant={isLooping ? "default" : "outline"}
            className="h-9 w-9 rounded-full"
            onClick={() => {
              setIsLooping(!isLooping);
              if (audioRef.current) audioRef.current.loop = !isLooping;
            }}
            disabled={!hasAudio}
            aria-label={isLooping ? "Disable repeat" : "Enable repeat"}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            className="h-12 w-12 rounded-full gradient-devotional text-primary-foreground hover:opacity-90"
            onClick={togglePlay}
            disabled={!hasAudio}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>

          {/* Speed control */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-full px-3 text-xs font-semibold gap-1"
            onClick={cycleSpeed}
            disabled={!hasAudio}
          >
            <Gauge className="h-3.5 w-3.5" />
            {speed}x
          </Button>
        </div>

        <div className="flex items-center gap-2 w-32">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => setIsMuted(!isMuted)}
            disabled={!hasAudio}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={(v) => { setVolume(v[0]); setIsMuted(false); }}
            className="cursor-pointer"
            disabled={!hasAudio}
          />
        </div>
      </div>

      {!hasAudio && (
        <p className="text-xs text-muted-foreground text-center mt-3 italic">
          🎵 Audio coming soon — read along with the lyrics below
        </p>
      )}
    </div>
  );
};

export default AudioPlayer;
