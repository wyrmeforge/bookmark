import { z as u } from 'zod';

import { FormSchema, FormVariant } from './form-config';
import UnityModifyForm from './components/unity-modify-form';
import { useCreateUnity } from './hooks/use-create-unity';

const CreateUnity = () => {
  const createNewUnity = useCreateUnity();

  const onSubmit = (data: u.infer<typeof FormSchema>) => {
    createNewUnity(data);
  };

  return <UnityModifyForm variant={FormVariant.Create} onSubmit={onSubmit} />;
};

export default CreateUnity;
