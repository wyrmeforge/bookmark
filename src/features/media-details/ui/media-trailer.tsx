import { Media } from '@/entities/media';

type MediaTrailerProps = Pick<Media, 'trailer'>;

const MediaTrailer = ({ trailer }: MediaTrailerProps) => {
  const isYoutube = trailer?.site === 'youtube';

  if (!isYoutube) return null;

  return (
    <div className='aspect-video w-full overflow-hidden rounded-xl'>
      <iframe
        src={`https://www.youtube.com/embed/${trailer.id}`}
        title='YouTube trailer'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className='h-full w-full rounded-xl'
      />
    </div>
  );
};

export { MediaTrailer };
