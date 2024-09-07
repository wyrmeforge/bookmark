import {
  CheckCheck,
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

import { useMutation, useQuery } from 'convex/react';
import { Filters } from '@/enums/filters';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '../../../components/ui/badge';
import { api } from '../../../../convex/_generated/api';
import { cn } from '@/lib/utils';
import DeleteUnity from '@/features/unity-modify/delete-unity';
import EditUnity from '@/features/unity-modify/edit-unity';

const UnityCardMenu = ({ name, id, isFavorite }) => {
  const updateItem = useMutation(api.lists.updateListItem);

  const listItem = useQuery(
    api.lists.getListItem,
    id
      ? {
          id,
        }
      : 'skip'
  );

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

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className='absolute right-3 top-[15px] z-20'>
          <Badge className='border border-muted-foreground'>
            <MenuIcon size={16} />
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-64 rounded-lg'>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger className='w-full'>
            <DropdownMenuItem>
              <Pen className='mr-2 h-4 w-4' />
              <span>Редагувати</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={() =>
              updateItem({ id, newData: { is_favorite: !isFavorite } })
            }
          >
            {isFavorite ? (
              <HeartCrack className='hover:animate-jump-out mr-2 h-4 w-4' />
            ) : (
              <Heart className='animate-jump-out mr-2 h-4 w-4' />
            )}
            <span>{isFavorite ? 'Видалити з' : 'Додати до'} улюблених</span>
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
                      'bg-gray-700': item.value == listItem?.status,
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
            <DropdownMenuItem>
              <Trash className='mr-2 h-4 w-4 stroke-red-500' />
              <span className='text-red-500'>Видалити</span>
            </DropdownMenuItem>
          </DeleteUnity>
        </DropdownMenuContent>
        <DialogContent>
          <EditUnity unityId={id} listItem={listItem} />
        </DialogContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default UnityCardMenu;
