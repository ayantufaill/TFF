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
    let bindIntervalId: ReturnType<typeof setInterval>;
    let pollIntervalId: ReturnType<typeof setInterval>;

    const handleEnded = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      clearInterval(pollIntervalId);
      if (onEndedRef.current) onEndedRef.current();
    };

    const checkProgress = () => {
      if (hasCompletedRef.current) return;
      const player = ref.current?.plyr;
      if (player && player.duration > 0 && player.currentTime >= player.duration - 3) {
        handleEnded();
      }
    };

    const tryBind = () => {
      const player = ref.current?.plyr;
      if (player && player.on && !bound) {
        player.on('ended', handleEnded);
        player.on('timeupdate', checkProgress);
        player.on('seeked', checkProgress);
        bound = true;

        // Polling fallback every 1s in case YouTube events don't fire
        pollIntervalId = setInterval(checkProgress, 1000);

        if (bindIntervalId) clearInterval(bindIntervalId);
      }
    };

    tryBind();

    if (!bound) {
      bindIntervalId = setInterval(tryBind, 200);
    }

    return () => {
      clearInterval(bindIntervalId);
      clearInterval(pollIntervalId);
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
      origin: window.location.origin
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
