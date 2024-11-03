import { AppStateContext } from '@/components/providers/app-state-provider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LayoutGridIcon, ListIcon } from 'lucide-react';
import { useContext } from 'react';

enum LayoutViews {
  Grid = 'grid',
  Table = 'table',
}

export const LayoutViewButton = () => {
  const { toggleLayoutView, layoutView } = useContext(AppStateContext);

  const buttonContent = {
    [LayoutViews.Grid]: {
      icon: <LayoutGridIcon />,
      title: 'Список',
    },
    [LayoutViews.Table]: {
      icon: <ListIcon />,
      title: 'Таблиця',
    },
  };

  return (
    <Tooltip>
      <TooltipTrigger className='hidden sm:block' onClick={toggleLayoutView}>
        {buttonContent[layoutView].icon}
      </TooltipTrigger>
      <TooltipContent>{buttonContent[layoutView].title}</TooltipContent>
    </Tooltip>
  );
};
