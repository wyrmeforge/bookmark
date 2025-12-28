import { FormStepperInput } from '@/shared/ui/form-number-input';

interface IMediaStatsSectionProps {
  animeEpisodes?: number;
}

export const FormStatsSection = ({
  animeEpisodes,
}: IMediaStatsSectionProps) => (
  <div className='space-y-3 rounded-lg bg-muted/30 p-4'>
    <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
      <FormStepperInput
        label='Разів переглянуто'
        min={0}
        max={100}
        hideMaxValue
        name='viewedCount'
      />
      <FormStepperInput min={0} max={10} label='Оцінка' name='rate' />
      <FormStepperInput label='Серій' max={animeEpisodes} name='episode' />
    </div>
  </div>
);
