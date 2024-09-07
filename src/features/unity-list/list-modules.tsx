import React, { useContext } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Module } from '@/enums/modules';
import { UnityStateContext } from '@/components/providers/unity-state-provider';

export const ListModules = () => {
  const { setCurrentModule } = useContext(UnityStateContext);

  const modules = [
    { name: Module.Anime, label: 'Аніме' },
    { name: Module.Movie, label: 'Фільми' },
    { name: Module.Cartoon, label: 'Мульти' },
  ];

  return (
    <Tabs className='h-full' defaultValue={Module.Anime}>
      <TabsList className='h-9'>
        {modules?.map((module) => (
          <TabsTrigger
            onClick={() => setCurrentModule(module.name)}
            key={module.name}
            className='px-3 py-1 text-sm'
            value={module.name}
          >
            {module.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
