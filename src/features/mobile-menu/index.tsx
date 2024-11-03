import clsx from 'clsx';
import { useMenu } from '../sidebar-menu/use-menu';
import { Button } from '@/components/ui/button';

const MobileMenu = () => {
  const { menu, updateFilter, currentFilter } = useMenu();

  return (
    <div className='fixed bottom-0 z-50 flex w-full justify-between bg-black px-4 py-3 shadow-lg sm:hidden'>
      {menu.map((item) => (
        <Button
          className='w-auto p-3'
          variant={currentFilter === item.key ? 'outline' : 'ghost'}
          onClick={() => updateFilter(item.key)}
          key={item.key}
        >
          {item.icon}
        </Button>
      ))}
    </div>
  );
};

export default MobileMenu;
