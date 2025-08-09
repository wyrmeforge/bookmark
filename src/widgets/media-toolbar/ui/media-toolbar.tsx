import { FiltersToggleGroup } from './filters-toggle-group';

export const MediaToolbar = () => (
  <div className='flex items-center justify-between py-2 md:py-4'>
    <div className='w-full md:w-[80%] md:overflow-hidden'>
      <FiltersToggleGroup />
    </div>
  </div>
);
