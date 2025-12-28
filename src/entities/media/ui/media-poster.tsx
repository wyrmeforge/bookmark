import Image from "next/image";

type MediaPosterProps = {
  alt: string;
  src: string;
  priority: boolean;
};

export const MediaPoster = ({ alt, src, priority }: MediaPosterProps) => (
  <div className="absolute h-full w-full">
    <Image
      alt={alt}
      className="h-full rounded-none object-cover"
      height={500}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      src={src}
      width={640}
    />
  </div>
);
