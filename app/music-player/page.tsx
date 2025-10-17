"use client";

import React, { useState, useEffect } from 'react';

// This component displays a Spotify artist and their top tracks using the Web API
const SpotifyArtistDisplay: React.FC = () => {
  const [artist, setArtist] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<any>(null);

  // Configuration - This is an ARTIST ID, not a playlist ID
  const ARTIST_ID = '3cj3R4pDpYQHaWx0MM2vFV'; // Your artist ID
  
  // You need these from Spotify Developer Dashboard (free account works!)
  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || '';

  // Get access token using Client Credentials Flow
  const getAccessToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
      });
      
      const data = await response.json();
      setToken(data.access_token);
      return data.access_token;
    } catch (error) {
      console.error('Error getting token:', error);
      setLoading(false);
      return null;
    }
  };

  // Fetch artist data
  const fetchArtistData = async (accessToken: string) => {
    try {
      // Get artist details
      const artistResponse = await fetch(
        `https://api.spotify.com/v1/artists/${ARTIST_ID}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      
      if (!artistResponse.ok) {
        throw new Error(`Artist fetch failed: ${artistResponse.status}`);
      }
      
      const artistData = await artistResponse.json();
      setArtist(artistData);
      
      // Get artist's top tracks (for US market - you can change this)
      const topTracksResponse = await fetch(
        `https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=US`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      
      const topTracksData = await topTracksResponse.json();
      setTopTracks(topTracksData.tracks || []);
      
      // Get artist's albums
      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=album,single&limit=20`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      
      const albumsData = await albumsResponse.json();
      setAlbums(albumsData.items || []);
      
    } catch (error) {
      console.error('Error fetching artist data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get track audio features
  const getTrackDetails = async (track: any) => {
    let accessToken = token;
    
    if (!accessToken) {
      accessToken = await getAccessToken() || '';
    }

    try {
      const featuresResponse = await fetch(
        `https://api.spotify.com/v1/audio-features/${track.id}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      
      const featuresData = await featuresResponse.json();
      
      setSelectedTrack({
        ...track,
        audioFeatures: featuresData
      });
    } catch (error) {
      console.error('Error getting track details:', error);
      setSelectedTrack(track);
    }
  };

  // Initialize on component mount
  useEffect(() => {
    const init = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        await fetchArtistData(accessToken);
      }
    };
    init();
  }, []);

  // Format duration from milliseconds
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5e2c15]"></div>
          <p className="mt-4 text-gray-600">Loading artist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Artist Header */}
      {artist && (
        <div style={{ background: 'linear-gradient(to bottom, #481801, #5e2c15)' }} className="rounded-lg p-8 mb-6 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {artist.images?.[0] && (
              <img 
                src={artist.images[0].url} 
                alt={artist.name}
                className="w-48 h-48 rounded-full shadow-xl object-cover"
              />
            )}
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-wider opacity-90">Artist</p>
              <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <span>{formatNumber(artist.followers?.total || 0)} followers</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {artist.genres?.map((genre: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              <a 
                href={artist.external_urls?.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 bg-white text-[#481801] rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Open in Spotify
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Tracks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-4 border-b bg-[#5e2c15]">
              <h2 className="text-xl font-semibold text-white">Top Tracks</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {topTracks.map((track, index) => (
                <div 
                  key={track.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3"
                  onClick={() => getTrackDetails(track)}
                >
                  <span className="text-gray-400 w-6 text-right">{index + 1}</span>
                  <div className="w-10 h-10 rounded overflow-hidden bg-[#5e2c15] flex-shrink-0">
                    {track.album?.images?.[2] ? (
                      <img 
                        src={track.album.images[2].url} 
                        alt={track.album.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.name}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {track.album?.name}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDuration(track.duration_ms)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Albums */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b bg-[#5e2c15]">
              <h2 className="text-xl font-semibold text-white">Albums & Singles</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 max-h-[850px] overflow-y-auto">
              {albums.map((album) => (
                <a
                  key={album.id}
                  href={album.external_urls?.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="aspect-square mb-2 overflow-hidden rounded-lg bg-[#5e2c15]">
                    {album.images?.[0] ? (
                      <img 
                        src={album.images[0].url} 
                        alt={album.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full"></div>
                    )}
                  </div>
                  <p className="font-medium text-sm truncate">{album.name}</p>
                  <p className="text-xs text-gray-600">
                    {album.album_type === 'single' ? 'Single' : 'Album'} • {album.release_date?.substring(0, 4)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Track Details Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            {selectedTrack ? (
              <>
                <h3 className="text-lg font-semibold mb-4 text-[#481801]">Track Details</h3>
                
                {/* Embedded player for preview - moved to top */}
                <div className="mb-4">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${selectedTrack.id}?utm_source=generator`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2 text-sm border-t pt-4">
                  <p className="text-gray-700"><strong className="text-gray-900">Title:</strong> {selectedTrack.name}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Album:</strong> {selectedTrack.album?.name}</p>
                  <p className="text-gray-700"><strong className="text-gray-900">Release:</strong> {selectedTrack.album?.release_date}</p>
                  
                  <a 
                    href={selectedTrack.external_urls?.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-[#481801] text-white rounded-lg hover:bg-[#481801] transition-colors text-center w-full"
                  >
                    Open Full Track in Spotify
                  </a>
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-center py-8">
                <p className="mb-2">Click on a track to see details</p>
                <p className="text-sm">View audio features and more</p>
              </div>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default SpotifyArtistDisplay;