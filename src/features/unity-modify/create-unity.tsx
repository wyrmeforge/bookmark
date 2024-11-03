import { z as u } from 'zod';

import { FormSchema, FormVariant } from './form-config';
import UnityModifyForm from './components/unity-modify-form';
import { useCreateUnity } from './hooks/use-create-unity';
import {
  Dialog,
  DialogContent,
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
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        aria-description='Anime Create'
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <UnityModifyForm variant={FormVariant.Create} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUnity;
