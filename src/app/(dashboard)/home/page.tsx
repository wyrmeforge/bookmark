import { DashboardContent } from '@/widgets/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Головна | YOOKOSO',
  description: 'Головна сторінка | YOOKOSO',
};

const HomePage = () => {
  return <DashboardContent />;
};

export default HomePage;
