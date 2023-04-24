/**
 * Define types for JSON data returned from the soundTrack API.
 */

// Standard artist type
type Artist = {
  id: string;
  name: string;
  image: string;
};

// Standard album type
type Album = {
  id: string;
  name: string;
  artwork: string;
  releaseYear: number;
  trackNum: number;
  type: string;
  Artist: Artist;
};

// Standard track type
type Track = {
  id: string;
  name: string;
  duration: number;
  Album: Album;
};

// Users top streamed tracks
export type TopTrack = {
  id: string;
  artistName: string;
  trackName: string;
  artwork: string;
  count: number;
};

// Users top streamed albums
export type TopAlbum = {
  id: string;
  artistName: string;
  albumName: string;
  artwork: string;
  count: number;
};

// Users top streamed artists
export type TopArtist = {
  id: string;
  artistName: string;
  artwork: string;
  count: number;
};

// Users recently played tracks
export type RecentlyPlayedTrack = {
  id: number;
  Track: Track;
  playedAt: string;
};

// View types for the top items (trakcs, albums and artists)
export enum TopItemView {
  LIST = 'list',
  GRID = 'grid',
  CHART = 'chart'
}

// Timeframes for the top items (trakcs, albums and artists)
export enum TopItemTimeframe {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  ALL = 'all'
}
