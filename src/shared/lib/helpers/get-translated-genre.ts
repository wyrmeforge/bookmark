import { MediaGenre } from "@/entities/media";

export const getTranslatedGenre = (genre: MediaGenre): string => {
  const genreTranslations: Record<MediaGenre, string> = {
    [MediaGenre.Action]: "Екшн",
    [MediaGenre.Adventure]: "Пригоди",
    [MediaGenre.Comedy]: "Комедія",
    [MediaGenre.Drama]: "Драма",
    [MediaGenre.Ecchi]: "Етті",
    [MediaGenre.Fantasy]: "Фентезі",
    [MediaGenre.Horror]: "Жахи",
    [MediaGenre["Mahou Shoujo"]]: "Махо Шьоджьо",
    [MediaGenre.Mecha]: "Меха",
    [MediaGenre.Music]: "Музика",
    [MediaGenre.Mystery]: "Містика",
    [MediaGenre.Psychological]: "Психологія",
    [MediaGenre.Romance]: "Романтика",
    [MediaGenre["Sci-Fi"]]: "Наукова фантастика",
    [MediaGenre["Slice of Life"]]: "Буденність",
    [MediaGenre.Sports]: "Спорт",
    [MediaGenre.Supernatural]: "Надприродне",
  };

  return genreTranslations[genre] ?? genre;
};
