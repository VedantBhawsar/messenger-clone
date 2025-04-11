# Song Playback Functionality Documentation

## Overview

The song playback functionality is implemented using a React Context API (`MusicContext`) that manages the state and controls for playing songs from YouTube. The system includes features for playlist management, song playback controls, and a user interface for interacting with the music player.

## Core Components

### 1. MusicContext

The central state management system that handles:

- Current song playback
- Playlist management
- Playback controls (play, pause, next, previous)
- Volume control
- Progress tracking

### 2. MusicPlayerCard

A UI component that displays:

- Current song information (title, artist)
- Album cover
- Playback controls
- Progress bar
- Volume control

### 3. MusicPlaylist

A UI component that shows:

- List of songs in the current playlist
- Song details (title, artist, duration)
- Play/pause controls for individual songs
- Add song functionality

### 4. AddSongModal

A modal component for adding new songs to playlists:

- YouTube URL input
- Song metadata extraction
- Playlist association

## Features

### Playback Controls

- Play/Pause
- Next/Previous song navigation
- Seek functionality
- Volume control
- Progress tracking

### Playlist Management

- Create new playlists
- Add songs to playlists
- Remove songs from playlists
- Reorder songs within playlists
- Playlist selection

### Song Management

- Add songs via YouTube URLs
- Automatic metadata extraction (title, artist, duration)
- Album cover generation from YouTube thumbnails

## Technical Implementation

### YouTube Integration

- Uses YouTube IFrame API for playback
- Handles video loading and state management
- Extracts video IDs from various YouTube URL formats

### State Management

- React Context for global state
- Real-time progress updates
- Playback state synchronization

### Database Integration

- Prisma ORM for data persistence
- Song and playlist models
- User-specific playlist management

## API Endpoints

### Songs

- `GET /api/songs` - List all songs
- `POST /api/songs` - Add a new song

### Playlists

- `GET /api/playlists` - List user's playlists
- `GET /api/playlists/[playlistId]` - Get specific playlist
- `PATCH /api/playlists/[playlistId]` - Update playlist
- `PATCH /api/playlists/[playlistId]/reorder` - Reorder playlist songs

## Security

- User authentication required for playlist operations
- Ownership verification for playlist modifications
- YouTube URL validation

## Error Handling

- Graceful error handling for API failures
- User feedback via toast notifications
- Fallback UI states for empty playlists
