import { CreateMedia } from '@/features/media/modify';
// import { ClapperboardIcon, OrigamiIcon, TvIcon } from 'lucide-react';

const SidebarRight = () => {
  //ToDo: add movie, serial
  return (
    <>
      {/* <div className='fixed bottom-1/2 right-10 flex translate-y-1/2 flex-col gap-4'>
        <OrigamiIcon />
        <TvIcon color='grey' />
        <ClapperboardIcon color='grey' />
      </div> */}
      <div className='fixed bottom-10 right-10 flex flex-col gap-4'>
        <CreateMedia />
      </div>
    </>
  );
};

export { SidebarRight };
