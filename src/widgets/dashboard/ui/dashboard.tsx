import { SidebarLeft } from './components/sidebar-left';
import { SidebarRight } from './components/sidebar-right';
import { MediaContent } from './components/media-content';
import { MediaToolbar } from '@/widgets/media-toolbar.tsx';

const DashboardContent = () => {
  return (
    <div className='flex h-full flex-row'>
      <SidebarLeft />
      <div className='mx-auto flex h-full w-full  flex-col'>
        <MediaToolbar />
        <MediaContent />
      </div>
      <SidebarRight />
    </div>
  );
};

export { DashboardContent };
