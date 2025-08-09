import useSWR from 'swr';
import { fetcher } from '../../api/graphql-client';

export const useMediaDetails = (id: string | null) => {
  var query = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    idMal
    title {
      romaji
      english
      native
      userPreferred
    }
    synonyms
    format
    type
    status
    description
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    season
    episodes
    duration
    chapters
    volumes
    source
    trailer {
      id
      site
      thumbnail
    }
    studios {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    genres
    relations {
  edges {
    relationType
    node {
      id
      title {
        romaji
        english
        native
      }
      status
      coverImage {
        large
        color
      }
    }
  }
}

    characters {
      edges {
        role
        node {
          id
          name {
            full
          }
          image {
            large
          }
        }
      }
    }
    recommendations {
      edges {
        node {
          id
          rating
          mediaRecommendation {
            id
             coverImage {
      extraLarge
      large
      medium
      color
    }
            title {
              english
            }
          }
        }
      }
    }
  }
}

`;

  const { data: anime, isLoading } = useSWR([query, { id }], fetcher, {
    revalidateOnFocus: false,
  });

  return {
    mediaDetails: anime?.Media,
    isMediaItemLoading: isLoading,
  };
};
