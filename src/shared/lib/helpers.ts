import { Filters } from '@/enums/filters';

export const getFilterTranslation = (currentFilter: Filters): string => {
  switch (currentFilter) {
    case Filters.All: {
      return 'Усі';
    }
    case Filters.InFuture: {
      return 'Буду дивитись';
    }
    case Filters.Abandoned: {
      return 'Закинуто';
    }
    case Filters.InProgress: {
      return 'Дивлюсь';
    }
    case Filters.Favorite: {
      return 'Улюблені';
    }
    case Filters.Completed: {
      return 'Переглянуто';
    }
    default: {
      return '';
    }
  }
};
