'use client';

import { useCreateMediaShortcut, useStoreUser } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader';
import { PropsWithChildren } from 'react';
import MinimalNav from './home/components/menu';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { isLoading, isAuthenticated } = useStoreUser();
  useCreateMediaShortcut();

  if (isLoading || !isAuthenticated) return <Loader />;

  return (
    <div className='relative flex h-dvh flex-col overflow-x-hidden'>
      <ShaderGradientCanvas
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -10,
          pointerEvents: 'none',
        }}
      >
        <ShaderGradient
          animate='off'
          brightness={2.2}
          cAzimuthAngle={160}
          cDistance={2}
          cPolarAngle={95}
          cameraZoom={0.5}
          color1='#1a1a1a'
          color2='#1F1A1E'
          color3='#352525'
          grain='on'
          lightType='3d'
          positionX={0}
          positionY={-2.1}
          positionZ={0}
          range='disabled'
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={0}
          rotationZ={125}
          shader='defaults'
          type='waterPlane'
          uAmplitude={0}
          uDensity={1.8}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={3}
          uTime={0.2}
          wireframe={false}
        />
      </ShaderGradientCanvas>
      <MinimalNav />
      <main className='w-full flex-1 px-2 md:px-20'>{children}</main>
    </div>
  );
};

export default DashboardLayout;
