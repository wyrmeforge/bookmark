import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { TMediaModifyFormValues } from '../helpers';

interface IUseAutoFillCountsProps {
  setValue: UseFormSetValue<TMediaModifyFormValues>;
  isCompleted: boolean;
  selectedAnime: TMediaModifyFormValues['unity_info'];
}

export const useAutoFillCounts = ({
  setValue,
  isCompleted,
  selectedAnime,
}: IUseAutoFillCountsProps) => {
  useEffect(() => {
    const viewedCount = isCompleted ? 1 : 0;
    const episodesCount = selectedAnime?.episodes ? selectedAnime.episodes : 0;

    setValue('viewedCount', viewedCount);
    setValue('episode', episodesCount);
  }, [isCompleted, selectedAnime, setValue]);
};
