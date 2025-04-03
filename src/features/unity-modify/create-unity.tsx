import { z as u } from 'zod';

import { FormSchema, FormVariant } from './form-config';
import UnityModifyForm from './components/unity-modify-form';
import { useCreateUnity } from './hooks/use-create-unity';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CreateUnity = ({ children }) => {
  const createNewUnity = useCreateUnity();

  const onSubmit = (data: u.infer<typeof FormSchema>) => {
    createNewUnity(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className='hidden'>Create Anime</DialogTitle>
        <DialogDescription className='hidden'>Create</DialogDescription>
        <UnityModifyForm variant={FormVariant.Create} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUnity;
