import Image from 'next/image';
import React from 'react';

type MediaPosterProps = {
  alt: string;
  src: string;
  priority: boolean;
};

export const MediaPoster = ({ alt, src, priority }: MediaPosterProps) => (
  <div className='absolute h-full w-full'>
    <Image
      alt={alt}
      src={src}
      priority={priority}
      width={640}
      height={500}
      className='h-full rounded-none object-cover'
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    />
  </div>
);
