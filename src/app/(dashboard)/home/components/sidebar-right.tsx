import { CreateMedia } from '@/widgets/media/create/create-media';

const SidebarRight = () => {
  return (
    <div className='fixed right-5 top-5 z-20 hidden flex-col gap-4 rounded-lg bg-black p-1 md:bottom-10 md:right-10 md:flex md:bg-transparent md:p-0'>
      <div className='mt-auto'>
        <CreateMedia />
      </div>
    </div>
  );
};

export { SidebarRight };
