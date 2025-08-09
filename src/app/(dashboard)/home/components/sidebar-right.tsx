import { CreateMedia } from '@/features/media-modify';

const SidebarRight = () => {
  return (
    <div className='fixed bottom-5 right-5 z-20 hidden flex-col gap-4 rounded-lg bg-black p-1 md:bottom-10 md:right-10 md:flex md:bg-transparent md:p-0'>
      <CreateMedia />
    </div>
  );
};

export { SidebarRight };
