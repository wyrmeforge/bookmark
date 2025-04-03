import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContext } from 'react';
import clsx from 'clsx';
import { useMenu } from './use-menu';
import { AppStateContext } from '@/components/providers/app-state-provider';

const SidebarMenu = () => {
  const { isFilterPanelOpen } = useContext(AppStateContext);
  const { menu, updateFilter, currentFilter } = useMenu();

  return (
    <Collapsible
      className='hidden h-full flex-col items-start gap-2 sm:flex'
      open={isFilterPanelOpen}
    >
      {menu?.map((filter) => (
        <Button
          key={filter.key}
          onClick={() => updateFilter(filter.key)}
          variant='ghost'
          className={clsx(
            'flex items-center gap-4 rounded-l-none rounded-r-2xl px-4 py-2 transition-all ease-in-out',
            {
              'border-l-4 border-slate-400 bg-slate-100/20':
                currentFilter === filter.key,
            }
          )}
        >
          {filter.icon}
          <CollapsibleContent className='flex items-center gap-4'>
            {filter.title}
            <Badge>{filter.value}</Badge>
          </CollapsibleContent>
        </Button>
      ))}
    </Collapsible>
  );
};

export default SidebarMenu;
