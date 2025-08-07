import { Media, MediaFormat } from '@/entities/media';

export const getStatusTranslation = (status: Media['status']) => {
  switch (status) {
    case 'FINISHED': {
      return 'Завершено';
    }
    case 'RELEASING': {
      return 'Онгоїнг';
    }
    case 'NOT_YET_RELEASED': {
      return 'Ще не вийшов';
    }
    case 'CANCELLED': {
      return 'Відмінили';
    }
    default: {
      return 'ХЗ';
    }
  }
};

export const getFormatTranslation = (format: Media['format']) => {
  switch (format) {
    case MediaFormat.MOVIE: {
      return 'Фільм';
    }
    case MediaFormat.TV: {
      return 'Телесеріал';
    }
    case MediaFormat.SPECIAL: {
      return 'Спешл';
    }
    case MediaFormat.OVA: {
      return 'OVA';
    }
    case MediaFormat.TV_SHORT: {
      return 'Короткий серіал';
    }
    default: {
      return 'Без поняття';
    }
  }
};
