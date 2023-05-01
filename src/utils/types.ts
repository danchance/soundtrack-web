/**
 * Define types for JSON data returned from the soundTrack API.
 */

// Standard artist type
type Artist = {
  id: string;
  name: string;
  image: string;
  slug: string;
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
  slug: string;
};

// Standard track type
type Track = {
  id: string;
  name: string;
  duration: number;
  Album: Album;
  slug: string;
};

// Users top streamed tracks
export type TopTrack = {
  id: string;
  artistName: string;
  artistSlug: string;
  trackName: string;
  trackSlug: string;
  albumSlug: string;
  artwork: string;
  count: number;
};

// Users top streamed albums
export type TopAlbum = {
  id: string;
  artistName: string;
  artistSlug: string;
  albumName: string;
  albumSlug: string;
  artwork: string;
  count: number;
};

// Users top streamed artists
export type TopArtist = {
  id: string;
  artistName: string;
  artistSlug: string;
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
