import { Metadata } from 'next';
import { SidebarLeft } from './components/sidebar-left';
import { MediaToolbar } from '@/widgets/media-toolbar';
import { SidebarRight } from './components/sidebar-right';
import { MediaList } from '@/features/media-list';
import MinimalNav from './components/menu';

export const metadata: Metadata = {
  title: 'Головна | YOOKOSO',
  description: 'Головна сторінка | YOOKOSO',
};

const HomePage = () => {
  return (
    <div className='flex h-full flex-row'>
      <SidebarLeft />
      <div className='mx-auto flex h-full w-full flex-col'>
        <MediaToolbar />
        <MediaList />
      </div>
      <SidebarRight />
      <MinimalNav />
    </div>
  );
};

export default HomePage;
