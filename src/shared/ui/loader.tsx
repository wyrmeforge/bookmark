import clsx from 'clsx';
import Image from 'next/image';

const Loader = ({ variant = 'fixed' }) => {
  const isFixedVariant = variant === 'fixed';

  return (
    <div
      className={clsx({
        'fixed left-0 top-0 z-50 h-screen w-screen bg-stone-950/80':
          isFixedVariant,
      })}
    >
      <Image
        role='status'
        priority
        className={clsx(
          'left-1/2 top-1/2 inline-block h-40 w-40  -translate-x-1/2 -translate-y-1/2',
          {
            '!fixed ': isFixedVariant,
            absolute: !isFixedVariant,
          }
        )}
        width={150}
        height={70}
        alt='Cat Running in Circle :D'
        src='https://i.gifer.com/2iFb.gif'
      />
    </div>
  );
};

export { Loader };
