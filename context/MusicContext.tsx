"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import axios from "axios";

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover?: string;
  duration: number;
  youtubeUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  ownerId: string;
  conversationId?: string;
}

interface MusicContextType {
  currentSong: Song | null;
  playlist: Playlist | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  // Playback controls
  play: (song?: Song) => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  // Playlist management
  setPlaylist: (playlist: Playlist) => void;
  addSongToPlaylist: (song: Song) => void;
  removeSongFromPlaylist: (songId: string) => void;
  reorderPlaylist: (songIds: string[]) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylistState] = useState<Playlist | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        height: '0',
        width: '0',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0
        },
        events: {
          onReady: () => {
            console.log('YouTube player ready');
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === (window as any).YT.PlayerState.ENDED) {
              next();
            }
          }
        }
      });
    };

    // Update progress every second
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setProgress(playerRef.current.getCurrentTime());
      }
    }, 1000);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const play = async (song?: Song) => {
    try {
      if (song) {
        setCurrentSong(song);
        if (playerRef.current) {
          // Extract video ID from YouTube URL
          const videoId = song.youtubeUrl.includes('watch?v=') 
            ? song.youtubeUrl.split('watch?v=')[1].split('&')[0]
            : song.youtubeUrl.split('youtu.be/')[1].split('?')[0];
          
          // Load and play the video
          playerRef.current.loadVideoById(videoId);
          playerRef.current.setVolume(volume * 100);
          playerRef.current.playVideo();
        }
      } else if (currentSong && playerRef.current) {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };
  
  const pause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
    setIsPlaying(false);
  };
  
  const next = async () => {
    if (!playlist || !currentSong) return;
    
    const currentIndex = playlist.songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.songs.length;
    const nextSong = playlist.songs[nextIndex];
    await play(nextSong);
  };
  
  const previous = async () => {
    if (!playlist || !currentSong) return;
    
    const currentIndex = playlist.songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.songs.length) % playlist.songs.length;
    const prevSong = playlist.songs[prevIndex];
    await play(prevSong);
  };
  
  const seek = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time);
      setProgress(time);
    }
  };
  
  const setVolume = (newVolume: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume * 100);
    }
    setVolumeState(newVolume);
  };
  
  const setPlaylist = (newPlaylist: Playlist) => {
    setPlaylistState(newPlaylist);
  };
  
  const addSongToPlaylist = (song: Song) => {
    if (!playlist) return;
    
    // Update the database through API
    axios.patch(`/api/playlists/${playlist.id}`, {
      songIds: [...playlist.songs.map(s => s.id), song.id]
    })
    .then(response => {
      // Update local state with the API response
      setPlaylistState(response.data);
    })
    .catch(error => {
      console.error("Failed to update playlist:", error);
    });
  };
  
  const removeSongFromPlaylist = (songId: string) => {
    if (!playlist) return;
    setPlaylistState({
      ...playlist,
      songs: playlist.songs.filter(s => s.id !== songId)
    });
  };
  
  const reorderPlaylist = (songIds: string[]) => {
    if (!playlist) return;
    const reorderedSongs = songIds
      .map(id => playlist.songs.find(s => s.id === id))
      .filter((song): song is Song => song !== undefined);
    
    setPlaylistState({
      ...playlist,
      songs: reorderedSongs
    });
  };

  return (
    <>
      <div id="youtube-player" style={{ display: 'none' }} />
      <MusicContext.Provider
        value={{
          currentSong,
          playlist,
          isPlaying,
          progress,
          volume,
          play,
          pause,
          next,
          previous,
          seek,
          setVolume,
          setPlaylist,
          addSongToPlaylist,
          removeSongFromPlaylist,
          reorderPlaylist
        }}
      >
        {children}
      </MusicContext.Provider>
    </>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}; 