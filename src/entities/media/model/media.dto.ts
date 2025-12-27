import { MediaStatus } from '@/shared/enums';
import { Doc, Id } from '@convex/dataModel';

// ==========================================================
// This file contains two distinct sets of types:
//
// 1. AniList API types (e.g., Media, MediaDetailsDto, etc.)
//    - These are used to map the structure of data fetched from the AniList GraphQL API.
//    - They represent rich metadata about anime/manga (title, format, relations, etc.)
//
// 2. Convex backend types (e.g., ListMedia, ListMediaStatus, etc.)
//    - These are derived from the Convex schema and represent user-specific data
//      stored in our backend (e.g., user's media list with status, notes, etc.)
//
// Purpose:
// - AniList types are used for fetching and displaying public data.
// - Convex types are used for storing/managing user state related to that media.
//
// Example:
// - `Media` is detailed info from AniList.
// - `ListMedia` is the user’s entry (like "Watching", "Completed") stored in Convex.
//
// ==========================================================

export interface MediaDetailsDto {
  Media: Media;
}

export enum MediaFormat {
  TV = 'TV',
  TV_SHORT = 'TV_SHORT',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  OVA = 'OVA',
  ONA = 'ONA',
  MUSIC = 'MUSIC',
  MANGA = 'MANGA',
  NOVEL = 'NOVEL',
  ONE_SHOT = 'ONE_SHOT',
}

export enum MediaGenre {
  Action = 'Action',
  Adventure = 'Adventure',
  Comedy = 'Comedy',
  Drama = 'Drama',
  Ecchi = 'Ecchi',
  Fantasy = 'Fantasy',
  Horror = 'Horror',
  'Mahou Shoujo' = 'Mahou Shoujo',
  Mecha = 'Mecha',
  Music = 'Music',
  Mystery = 'Mystery',
  Psychological = 'Psychological',
  Romance = 'Romance',
  'Sci-Fi' = 'Sci-Fi',
  'Slice of Life' = 'Slice of Life',
  Sports = 'Sports',
  Supernatural = 'Supernatural',
}

export interface Media {
  id: number;
  idMal: number;
  title: Title;
  synonyms: string[];
  format: MediaFormat;
  type: string;
  status: string;
  description: string;
  startDate: FuzzyDate;
  endDate: FuzzyDate;
  season: string;
  episodes: number;
  duration: number;
  chapters: number | null;
  volumes: number | null;
  source: string;
  trailer: Trailer | null;
  coverImage: MediaCoverImage;
  bannerImage: string | null;
  genres: MediaGenre[];
  relations: {
    edges: RelationEdge[];
  };
  studios: {
    edges: StudioEdge[];
  };
  characters: {
    edges: CharacterEdge[];
  };
  recommendations: {
    edges: RecommendationEdge[];
  };
}

export interface StudioEdge {
  isMain: boolean;
  node: {
    id: number;
    name: string;
  };
}

export interface Title {
  romaji: string;
  english: string | null;
  native: string;
  userPreferred: string;
}

export interface FuzzyDate {
  year: number;
  month: number;
  day: number;
}

export interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}

export interface MediaCoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string | null;
}

export interface RelationEdge {
  relationType: string;
  node: {
    id: number;
    title: {
      romaji: string;
    };
  };
}

export interface CharacterEdge {
  role: string;
  node: {
    id: number;
    name: {
      full: string;
    };
    image: {
      large: string;
    };
  };
}

export interface RecommendationEdge {
  node: {
    id: number;
    rating: number;
    mediaRecommendation: {
      id: number;
      coverImage: MediaCoverImage;
      title: {
        english: string | null;
      };
    };
  };
}

export interface MediaStats {
  mediaId: number;
  users: number;
  totalRate: {
    _1: number;
    _2: number;
    _3: number;
    _4: number;
    _5: number;
    _6: number;
    _7: number;
    _8: number;
    _9: number;
    _10: number;
  };
  totalStatuses: {
    [MediaStatus.All]: number;
    [MediaStatus.Abandoned]: number;
    [MediaStatus.Completed]: number;
    [MediaStatus.Postponed]: number;
    [MediaStatus.Scheduled]: number;
    [MediaStatus.Watching]: number;
    [MediaStatus.Favorite]: number;
  };
}

export type ListMedia = Doc<'lists'>;

export type OmittedListMedia = Omit<
  ListMedia,
  '_id' | '_creationTime' | 'user'
>;

export type ListMediaId = Id<'lists'>;

export type ListMediaStatus = ListMedia['status'];
