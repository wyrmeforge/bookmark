import { Button } from '@/shared/ui/button';
import { DialogClose, DialogFooter } from '@/shared/ui/dialog';

interface IFormFooterProps {
  isCreateForm: boolean;
}

export const FormFooter = ({ isCreateForm }: IFormFooterProps) => (
  <DialogFooter className='sticky bottom-0 flex flex-row gap-2 border-t border-muted bg-background p-4'>
    <DialogClose
      type='button'
      className='w-full rounded-md border border-muted px-4 py-2 text-sm font-medium transition-colors  hover:text-red-800'
    >
      Скасувати
    </DialogClose>
    <Button className='w-full' type='submit'>
      {isCreateForm ? 'Додати' : 'Змінити'}
    </Button>
  </DialogFooter>
);
