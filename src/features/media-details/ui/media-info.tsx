import { ListMedia, Media, MediaFormat } from '@/entities/media';
import { ChevronRightIcon } from 'lucide-react';
import { getFormatTranslation, getStatusTranslation } from '../model';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/uk';
import { getTranslatedGenre } from '@/shared/lib';
import Link from 'next/link';

dayjs.extend(updateLocale);

dayjs.updateLocale('uk', {
  months: [
    'Січня',
    'Лютого',
    'Березня',
    'Квітня',
    'Травня',
    'Червня',
    'Липня',
    'Серпня',
    'Вересня',
    'Жовтня',
    'Листопада',
    'Грудня',
  ],
});

type MediaInfoProps = Pick<
  Media,
  | 'startDate'
  | 'status'
  | 'episodes'
  | 'duration'
  | 'format'
  | 'title'
  | 'genres'
  | 'studios'
  | 'title'
> &
  Pick<ListMedia, 'name'>;

const MediaInfo = ({
  startDate,
  status,
  episodes,
  duration,
  format,
  title,
  name,
  genres,
  studios,
  website,
}: MediaInfoProps) => {
  const isMovieFormat = format === MediaFormat.MOVIE;

  const formattedStartDateValue = dayjs()
    .set('year', startDate.year)
    .set('month', startDate.month - 1)
    .set('date', startDate.day)
    .locale('uk')
    .format('D MMMM YYYY');

  const translatedStatus = getStatusTranslation(status);
  const translatedFormat = getFormatTranslation(format);

  const episodesLabel = isMovieFormat ? 'Тривалість' : 'Серій';
  const episodesValue = isMovieFormat
    ? `${duration} хв.`
    : `${episodes} (${duration}) хв`;

  const infoOptions = [
    {
      label: 'Дата виходу',
      value: formattedStartDateValue,
    },
    {
      label: 'Статус',
      value: translatedStatus,
    },
    {
      label: episodesLabel,
      value: episodesValue,
    },
    {
      label: 'Формат',
      value: translatedFormat,
    },
    {
      label: 'Студія',
      value: studios?.edges
        ?.filter((s) => s.isMain)
        .map((s) => s.node.name)
        .join(', '),
      last: true,
    },
  ];

  return (
    <div className='pt-4'>
      <div className='flex flex-row items-end gap-4'>
        <h2 className='text-2xl font-semibold uppercase tracking-wider sm:text-3xl'>
          {name || title?.english}
        </h2>
        <div>({title?.userPreferred})</div>
      </div>

      <div className='flex w-full items-center justify-between'>
        <div className='flex flex-wrap gap-2'>
          {genres?.map((item, idx) => (
            <div className='font-light' key={item}>
              {getTranslatedGenre(item)} {idx !== genres.length - 1 && '|'}
            </div>
          ))}
          <Link
            href={website}
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors duration-200 hover:underline'
          >
            Перейти на сайт для перегляду
          </Link>
        </div>
        <div className='flex items-center gap-6'>
          {infoOptions?.map(({ label, value, last }) => (
            <div className='flex items-center gap-1' key={label}>
              <div className='pr-2'>
                <div className='text-[12px] font-bold uppercase'>{label}</div>
                <div className='text-md font-light uppercase text-muted-foreground'>
                  {value}
                </div>
              </div>
              {!last && <ChevronRightIcon />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { MediaInfo };
