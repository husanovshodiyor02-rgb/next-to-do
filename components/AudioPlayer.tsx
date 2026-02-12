"use client";
import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };


  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} loop>
        <source
          src="/frodo.m4a"
          type="audio/mpeg"
        />
      </audio>

      <button
        onClick={togglePlay}
        className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-black font-serif font-bold py-3 px-6 rounded-full border-2 border-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.6)] transition-all transform hover:scale-105"
      >
        {isPlaying ? (
          <>
            <span className="animate-pulse">🔊</span> Pause Music
          </>
        ) : (
          <>
            <span>🔇</span> Play Ambient
          </>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
