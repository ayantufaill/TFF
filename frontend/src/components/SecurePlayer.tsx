import React, { useRef, useEffect } from 'react';
import { Plyr, APITypes } from 'plyr-react';
import "plyr/dist/plyr.css";

// Force Vite Refresh - Secure Player Implementation

interface SecurePlayerProps {
  videoId: string;
  onEnded?: () => void;
}

const SecurePlayer: React.FC<SecurePlayerProps> = ({ videoId, onEnded }) => {
  const ref = useRef<APITypes>(null);
  const onEndedRef = useRef(onEnded);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    hasCompletedRef.current = false;
  }, [videoId]);

  useEffect(() => {
    let bound = false;
    let intervalId: NodeJS.Timeout;

    const tryBind = () => {
      const player = ref.current?.plyr;
      if (player && player.on && !bound) {
        const handleEnded = () => {
          if (hasCompletedRef.current) return;
          hasCompletedRef.current = true;
          if (onEndedRef.current) onEndedRef.current();
        };

        const handleTimeUpdate = () => {
          if (hasCompletedRef.current) return;
          if (player.duration > 0 && player.currentTime >= player.duration - 1) {
            handleEnded();
          }
        };

        player.on('ended', handleEnded);
        player.on('timeupdate', handleTimeUpdate);
        bound = true;

        if (intervalId) clearInterval(intervalId);
      }
    };

    tryBind();

    if (!bound) {
      intervalId = setInterval(tryBind, 200);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const plyrSource: any = {
    type: 'video',
    sources: [
      {
        src: videoId,
        provider: 'youtube',
      },
    ],
  };

  const plyrOptions = {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'settings',
      'pip',
      'fullscreen'
    ],
    youtube: {
      noCookie: true,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    },
    // Prevent the YouTube logo from being clickable by overlaying our own UI
    hideControls: false,
    displayDuration: true,
  };

  return (
    <div className="secure-player-wrapper w-full rounded-[2rem] overflow-visible bg-black shadow-2xl relative">
      <Plyr ref={ref} source={plyrSource} options={plyrOptions} />

      {/* Additional Click-Shield for the YouTube Logo area inside the player */}
      <div className="absolute bottom-4 right-12 w-16 h-8 z-10 bg-transparent cursor-default"></div>
    </div>
  );
};

export default SecurePlayer;
