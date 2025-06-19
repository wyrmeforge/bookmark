import { SortDirection, SortName } from '@/enums/sort';

export interface ISortModel {
  label: string;
  value: SortName;
  direction: SortDirection;
}

export interface IPaginationModel {
  loadMore: (items: number) => void;
  isEndOfPages: boolean;
}
