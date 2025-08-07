import { MediaDetails } from '@/widgets/media-details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Головна | YOOKOSO',
  description: 'Головна сторінка | YOOKOSO',
};

const MediaDetailsPage = async ({ params }) => {
  const { mediaId } = await params;

  return <MediaDetails id={mediaId} />;
};

export default MediaDetailsPage;
