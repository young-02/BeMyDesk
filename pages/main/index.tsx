import React from 'react';
import styled from 'styled-components';
import mobileGradient from '../../public/images/mobileGradient.jpg';
import desktopGradient from '../../public/images/desktopGradient.jpg';
import Image from 'next/image';
import MainSlide from '../../components/main/MainSlide';
import HeadSeo from '@/components/ui/HeadSeo';
import useResponsive from '@/Hooks/useResponsive';

export default function MainPage() {
  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 500,
    minWidth: 501,
  });
  return (
    <MainPageLayout>
      <HeadSeo title={`be-my-desk`} />
      <MainSlide />
      <Background>
        {isMobile && (
          <Image
            className="gradient"
            src={mobileGradient}
            alt="gradient-image"
          />
        )}
        {isDesktop && (
          <Image
            className="gradient"
            src={desktopGradient}
            alt="gradient-image"
          />
        )}
      </Background>
    </MainPageLayout>
  );
}

const MainPageLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Background = styled.div`
  z-index: -999;
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #17171c;

  .gradient {
    object-fit: cover;
  }
`;
