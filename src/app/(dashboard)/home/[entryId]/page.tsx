'use client';

import { fetcher } from '@/shared/lib/utils';
import { ArrowLeftCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';

const EntryProfile = () => {
  const router = useRouter();
  const { entryId } = useParams();

  const { data: entryData, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_ANIME_URL}/${entryId}`,
    fetcher
  );

  const attributes = entryData?.data?.attributes;

  console.log(attributes);
  return (
    <div className='z-40 pt-4'>
      <ArrowLeftCircleIcon size={36} onClick={() => router.back()} />
      <div className='flex flex-row gap-4'>
        <Image
          width={390}
          height={554}
          src={attributes?.posterImage?.medium}
          alt={attributes?.titles?.en}
        />
        <div>
          <div>{attributes?.titles?.en}</div>
          <div>Опис</div>
          <div>{attributes?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default EntryProfile;
