export const SEARCH_MEDIA_QUERY = `
  query SearchAnime($search: String) {
    Page(perPage: 10) {
      media(search: $search, type: ANIME) {
        id
        title {
          english
          native
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;
