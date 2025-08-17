import { Metadata } from 'next';
import { SidebarLeft } from './components/sidebar-left';
import { MediaToolbar } from '@/widgets/media-toolbar';
import { SidebarRight } from './components/sidebar-right';
import { MediaList } from '@/features/media-list';
import MinimalNav from './components/menu';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@convex/api';
import { MediaStatus } from '@/shared/enums';
import { getAuthToken } from '@/shared/lib/helpers/get-auth-token';
export const metadata: Metadata = {
  title: 'Головна | YOOKOSO',
  description: 'Головна сторінка | YOOKOSO',
};

const HomePage = async () => {
  const token = await getAuthToken();
  const preloadedList = await fetchQuery(
    api.lists.getListNoPagination,
    {
      filter: MediaStatus.All,
      searchValue: '',
    },
    {
      token,
    }
  );

  return (
    <div className='flex h-full flex-row'>
      {/* <SidebarLeft /> */}
      <div className='mx-auto flex h-full w-full flex-col'>
        <MediaToolbar />
        <MediaList preloadedList={preloadedList} />
      </div>
      {/* <SidebarRight /> */}
    </div>
  );
};

export default HomePage;
