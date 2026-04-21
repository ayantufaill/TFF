import React from 'react';
import { Plyr } from 'plyr-react';
import "plyr/dist/plyr.css";

// Force Vite Refresh - Secure Player Implementation

interface SecurePlayerProps {
  videoId: string;
}

const SecurePlayer: React.FC<SecurePlayerProps> = ({ videoId }) => {
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
    <div className="secure-player-wrapper w-full rounded-[2rem] overflow-hidden bg-black shadow-2xl relative">
      <Plyr source={plyrSource} options={plyrOptions} />

      {/* Additional Click-Shield for the YouTube Logo area inside the player */}
      <div className="absolute bottom-0 right-0 w-24 h-12 z-50 bg-transparent cursor-default"></div>
    </div>
  );
};

export default SecurePlayer;
