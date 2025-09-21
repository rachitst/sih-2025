import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Heart, Clock, Shuffle, Repeat } from 'lucide-react';
import toast from 'react-hot-toast';

interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
  color: string;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  imageUrl: string;
}

const moodPlaylists: Playlist[] = [
  {
    id: 'calm',
    name: 'Calm & Focus',
    description: 'Peaceful tracks to help you relax and concentrate',
    imageUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=300&auto=format&fit=crop',
    color: 'from-blue-500 to-indigo-700',
    tracks: [
      { id: '1', title: 'Weightless', artist: 'Marconi Union', duration: '5:14', imageUrl: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=60&auto=format&fit=crop' },
      { id: '2', title: 'Electra', artist: 'Airstream', duration: '6:02', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=60&auto=format&fit=crop' },
      { id: '3', title: 'Watermark', artist: 'Enya', duration: '4:38', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=60&auto=format&fit=crop' },
      { id: '4', title: 'Ambient 1', artist: 'Brian Eno', duration: '7:12', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=60&auto=format&fit=crop' },
      { id: '5', title: 'Gymnopédie No.1', artist: 'Erik Satie', duration: '3:05', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=60&auto=format&fit=crop' },
      { id: '6', title: 'Horizon Variations', artist: 'Max Richter', duration: '6:18', imageUrl: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?q=80&w=60&auto=format&fit=crop' },
    ]
  },
  {
    id: 'energize',
    name: 'Energize & Motivate',
    description: 'Upbeat tracks to boost your mood and energy',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop',
    color: 'from-red-500 to-orange-600',
    tracks: [
      { id: '1', title: 'Don\'t Stop Me Now', artist: 'Queen', duration: '3:29', imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=60&auto=format&fit=crop' },
      { id: '2', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', duration: '4:30', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=60&auto=format&fit=crop' },
      { id: '3', title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake', duration: '3:56', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=60&auto=format&fit=crop' },
      { id: '4', title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=60&auto=format&fit=crop' },
      { id: '5', title: 'Walking on Sunshine', artist: 'Katrina & The Waves', duration: '3:58', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=60&auto=format&fit=crop' },
    ]
  },
  {
    id: 'melancholy',
    name: 'Melancholy & Reflection',
    description: 'Thoughtful tracks for introspection and emotional processing',
    imageUrl: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?q=80&w=300&auto=format&fit=crop',
    color: 'from-purple-500 to-indigo-800',
    tracks: [
      { id: '1', title: 'Someone Like You', artist: 'Adele', duration: '4:45', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=60&auto=format&fit=crop' },
      { id: '2', title: 'Fix You', artist: 'Coldplay', duration: '4:55', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=60&auto=format&fit=crop' },
      { id: '3', title: 'Hurt', artist: 'Johnny Cash', duration: '3:38', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=60&auto=format&fit=crop' },
      { id: '4', title: 'Skinny Love', artist: 'Bon Iver', duration: '3:58', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=60&auto=format&fit=crop' },
      { id: '5', title: 'Hallelujah', artist: 'Jeff Buckley', duration: '6:53', imageUrl: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?q=80&w=60&auto=format&fit=crop' },
    ]
  },
  {
    id: 'sleep',
    name: 'Sleep & Relaxation',
    description: 'Gentle tracks to help you unwind and fall asleep',
    imageUrl: 'https://images.unsplash.com/photo-1455642305367-68834a9d4712?q=80&w=300&auto=format&fit=crop',
    color: 'from-blue-400 to-cyan-600',
    tracks: [
      { id: '1', title: 'Dream 3', artist: 'Max Richter', duration: '6:42', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=60&auto=format&fit=crop' },
      { id: '2', title: 'Sleeping Lotus', artist: 'Joep Beving', duration: '3:36', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=60&auto=format&fit=crop' },
      { id: '3', title: 'Nuvole Bianche', artist: 'Ludovico Einaudi', duration: '5:57', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=60&auto=format&fit=crop' },
      { id: '4', title: 'Sleepwalking', artist: 'Ólafur Arnalds', duration: '4:23', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=60&auto=format&fit=crop' },
      { id: '5', title: 'Weightless', artist: 'Marconi Union', duration: '8:05', imageUrl: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?q=80&w=60&auto=format&fit=crop' },
    ]
  },
];

const SpotifyView = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentMood, setCurrentMood] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [likedTracks, setLikedTracks] = useState<string[]>([]);

  useEffect(() => {
    // Set default playlist
    setSelectedPlaylist(moodPlaylists[0]);
    setCurrentMood('calm');
    
    // Simulate progress bar movement when playing
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrackId) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrackId]);

  const handlePlaylistSelect = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentMood(playlist.id);
    setCurrentTrackId(playlist.tracks[0].id);
    setProgress(0);
    setIsPlaying(true);
    toast.success(`Playing ${playlist.name} playlist`);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!currentTrackId && selectedPlaylist) {
      setCurrentTrackId(selectedPlaylist.tracks[0].id);
    }
  };

  const handleTrackSelect = (trackId: string) => {
    setCurrentTrackId(trackId);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleLikeTrack = (trackId: string) => {
    setLikedTracks(prev => {
      if (prev.includes(trackId)) {
        return prev.filter(id => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  };

  const getCurrentTrack = () => {
    if (!selectedPlaylist || !currentTrackId) return null;
    return selectedPlaylist.tracks.find(track => track.id === currentTrackId);
  };

  const currentTrack = getCurrentTrack();

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark mb-2 flex items-center gap-2">
          <Music className="h-6 w-6 text-green-500" />
          Your Mood-Based Playlists
        </h1>
        <p className="text-neutral-medium">
          Music curated based on your mood to help you relax, focus, or energize.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playlist Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
            <h2 className="text-lg font-bold text-neutral-dark mb-4">Select Your Mood</h2>
            <div className="space-y-3">
              {moodPlaylists.map((playlist) => (
                <motion.div
                  key={playlist.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlaylistSelect(playlist)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${currentMood === playlist.id ? 'bg-green-50 border border-green-200' : 'bg-neutral-light hover:bg-neutral-200'}`}
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={playlist.imageUrl} 
                      alt={playlist.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/48?text=${playlist.name.charAt(0)}`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-dark">{playlist.name}</h3>
                    <p className="text-xs text-neutral-medium">{playlist.tracks.length} tracks</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Player and Tracks */}
        <div className="lg:col-span-2">
          {selectedPlaylist && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Playlist Header */}
              <div className={`bg-gradient-to-r ${selectedPlaylist.color} p-6 text-white`}>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={selectedPlaylist.imageUrl} 
                      alt={selectedPlaylist.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/128?text=${selectedPlaylist.name.charAt(0)}`;
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedPlaylist.name}</h2>
                    <p className="text-white/80 mb-4">{selectedPlaylist.description}</p>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePlayPause}
                        className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </motion.button>
                      <span className="text-sm font-medium">{selectedPlaylist.tracks.length} songs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Track List */}
              <div className="p-6">
                <div className="flex items-center text-xs text-neutral-medium border-b border-gray-100 pb-2 mb-2">
                  <div className="w-8 text-center">#</div>
                  <div className="flex-1">TITLE</div>
                  <div className="w-32 text-right flex items-center justify-end gap-2">
                    <Clock className="h-3 w-3" />
                  </div>
                </div>

                <div className="space-y-2">
                  {selectedPlaylist.tracks.map((track, index) => (
                    <motion.div 
                      key={track.id}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      onClick={() => handleTrackSelect(track.id)}
                      className={`flex items-center py-2 px-2 rounded-md cursor-pointer ${currentTrackId === track.id ? 'bg-green-50' : ''}`}
                    >
                      <div className="w-8 text-center text-neutral-medium">{index + 1}</div>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="w-10 h-10 rounded overflow-hidden bg-neutral-light flex-shrink-0">
                          <img 
                            src={track.imageUrl} 
                            alt={track.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://via.placeholder.com/40?text=${track.title.charAt(0)}`;
                            }}
                          />
                        </div>
                        <div>
                          <p className={`font-medium ${currentTrackId === track.id ? 'text-green-600' : 'text-neutral-dark'}`}>{track.title}</p>
                          <p className="text-xs text-neutral-medium">{track.artist}</p>
                        </div>
                      </div>
                      <div className="w-32 flex items-center justify-end gap-3">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeTrack(track.id);
                          }}
                          className={`text-neutral-medium hover:text-red-500 ${likedTracks.includes(track.id) ? 'text-red-500' : ''}`}
                        >
                          <Heart className="h-4 w-4" fill={likedTracks.includes(track.id) ? 'currentColor' : 'none'} />
                        </motion.button>
                        <span className="text-sm text-neutral-medium">{track.duration}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Player Controls */}
              <div className="border-t border-gray-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4 w-1/3">
                    {currentTrack && (
                      <>
                        <div className="w-12 h-12 rounded overflow-hidden bg-neutral-light">
                          <img 
                            src={currentTrack.imageUrl} 
                            alt={currentTrack.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://via.placeholder.com/48?text=${currentTrack.title.charAt(0)}`;
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-neutral-dark">{currentTrack.title}</p>
                          <p className="text-xs text-neutral-medium">{currentTrack.artist}</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-center w-1/3">
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-neutral-medium hover:text-neutral-dark"
                      >
                        <Shuffle className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-neutral-medium hover:text-neutral-dark"
                      >
                        <SkipBack className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePlayPause}
                        className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-neutral-medium hover:text-neutral-dark"
                      >
                        <SkipForward className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-neutral-medium hover:text-neutral-dark"
                      >
                        <Repeat className="h-4 w-4" />
                      </motion.button>
                    </div>
                    
                    <div className="w-full mt-2 flex items-center gap-2">
                      <span className="text-xs text-neutral-medium">
                        {Math.floor((progress / 100) * (currentTrack ? parseFloat(currentTrack.duration.split(':')[0]) * 60 + parseFloat(currentTrack.duration.split(':')[1]) : 0) / 60)}:
                        {Math.floor((progress / 100) * (currentTrack ? parseFloat(currentTrack.duration.split(':')[0]) * 60 + parseFloat(currentTrack.duration.split(':')[1]) : 0) % 60).toString().padStart(2, '0')}
                      </span>
                      <div className="flex-1 bg-neutral-light rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-green-500 h-full rounded-full" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-neutral-medium">{currentTrack?.duration || '0:00'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 w-1/3 justify-end">
                    <Volume2 className="h-4 w-4 text-neutral-medium" />
                    <div className="w-24 bg-neutral-light rounded-full h-1 overflow-hidden">
                      <div 
                        className="bg-green-500 h-full rounded-full" 
                        style={{ width: `${volume}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyView;