import { Routes } from '@/shared/enums';
import { CardHeader, CardTitle } from '@/shared/ui/card';
import Link from 'next/link';

interface IFormHeaderProps {
  title: string;
  question: string;
  ctaLabel: string;
  ctaHref: Routes;
}

const FormHeader = ({
  title,
  question,
  ctaLabel,
  ctaHref,
}: IFormHeaderProps) => (
  <CardHeader className='px-0 text-center'>
    <CardTitle className='text-2xl'>{title}</CardTitle>
    <div className='flex flex-row items-center justify-center gap-2'>
      <div className='text-grey text-center text-sm'>{question}</div>
      <Link
        className='text-orange-400 underline-offset-4 hover:underline'
        href={ctaHref}
      >
        {ctaLabel}
      </Link>
    </div>
  </CardHeader>
);

export { FormHeader };
