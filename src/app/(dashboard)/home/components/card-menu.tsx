import {
  Archive,
  CheckCheck,
  Cloud,
  CreditCard,
  Eye,
  Filter,
  Github,
  Goal,
  Heart,
  HeartCrack,
  Keyboard,
  LifeBuoy,
  LoaderCircle,
  LogOut,
  Mail,
  MessageSquare,
  Pen,
  Plus,
  PlusCircle,
  Settings,
  Trash,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Filters } from '@/enums/filters';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import EditUnity from '@/components/features/edit-unity';

export function CardMenu({ name, id, isFavorite }) {
  const deleteItem = useMutation(api.lists.deleteListItem);
  const updateItem = useMutation(api.lists.updateList);

  const listItem = useQuery(api.lists.getListItem, {
    id,
  });

  return (
    <AlertDialog>
      <Dialog>
        <DropdownMenuContent className='w-64 rounded-lg'>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Pen className='mr-2 h-4 w-4' />
            <DialogTrigger>
              <span>Редагувати</span>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='animate'
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
                <DropdownMenuItem
                  onClick={() =>
                    updateItem({ id, newData: { status: Filters.InFuture } })
                  }
                >
                  <Goal className='mr-2 h-4 w-4' />
                  <span>Буду дивитись</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    updateItem({ id, newData: { status: Filters.Completed } })
                  }
                >
                  <CheckCheck className='mr-2 h-4 w-4' />
                  <span>Переглянуто</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className='mr-2 h-4 w-4' />
                  <span>Дивлюсь</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LoaderCircle className='mr-2 h-4 w-4' />
                  <span>Закинуто</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <Trash className='mr-2 h-4 w-4 stroke-red-500' />
              <span className='text-red-500'>Видалити</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
            <AlertDialogDescription>
              Цю дію неможливо скасувати. Це призведе до остаточного видалення.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Відмінити</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteItem({ id })}>
              Видалити
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        <DialogContent>
          <EditUnity unityId={id} listItem={listItem} />
        </DialogContent>
      </Dialog>
    </AlertDialog>
  );
}
