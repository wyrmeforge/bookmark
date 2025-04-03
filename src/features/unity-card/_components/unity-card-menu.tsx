import {
  CheckCheck,
  Divide,
  Eye,
  Filter,
  Goal,
  Heart,
  HeartCrack,
  LoaderCircle,
  MenuIcon,
  Pen,
  Trash,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useMutation } from 'convex/react';
import { Filters } from '@/enums/filters';
import { Badge } from '../../../components/ui/badge';
import { api } from '../../../../convex/_generated/api';
import { cn } from '@/lib/utils';
import EditUnity from '@/features/unity-modify/edit-unity';
import DeleteUnity from '@/features/unity-modify/delete-unity';
import { IListItem } from '@/types/list';

const UnityCardMenu = ({ unityData }: { unityData: IListItem }) => {
  const { name, _id: id, is_favorite, status } = unityData;
  const updateItem = useMutation(api.lists.updateListItem);

  const statuses = [
    {
      label: 'Буду дивитись',
      value: Filters.InFuture,
      icon: <Goal size={16} />,
    },
    {
      label: 'Дивлюсь',
      value: Filters.InProgress,
      icon: <Eye size={16} />,
    },
    {
      label: 'Закинуто',
      value: Filters.Abandoned,
      icon: <LoaderCircle size={16} />,
    },
    {
      label: 'Переглянуті',
      value: Filters.Completed,
      icon: <CheckCheck size={16} />,
    },
  ];

  const handleChangeFavorite = () => {
    updateItem({ id, newData: { is_favorite: !is_favorite } });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='h-5'>
        <Badge variant='secondary' className='border border-muted-foreground'>
          <MenuIcon size={16} />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-64 rounded-lg'>
        <DropdownMenuLabel className='truncate'>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditUnity listItem={unityData}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className='cursor-pointer'
          >
            <Pen className='mr-2 h-4 w-4' />
            <span>Редагувати</span>
          </DropdownMenuItem>
        </EditUnity>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={handleChangeFavorite}
        >
          {is_favorite ? (
            <HeartCrack className='hover:animate-jump-out mr-2 h-4 w-4' />
          ) : (
            <Heart className='animate-jump-out mr-2 h-4 w-4' />
          )}
          <span>{is_favorite ? 'Видалити з' : 'Додати до'} улюблених</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Filter className='mr-2 h-4 w-4' />
            <span>Змінити статус на</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {statuses?.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  className={cn('flex gap-2', {
                    'bg-gray-700': item.value == status,
                  })}
                  onClick={() =>
                    updateItem({ id, newData: { status: item.value } })
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DeleteUnity id={id}>
          <DropdownMenuItem
            className='cursor-pointer'
            onSelect={(e) => e.preventDefault()}
          >
            <Trash className='mr-2 h-4 w-4 stroke-red-500' />
            <span className='text-red-500'>Видалити</span>
          </DropdownMenuItem>
        </DeleteUnity>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UnityCardMenu;
