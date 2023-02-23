import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gradient from '../../public/images/gradient.png';
import Image from 'next/image';
import MainSlide from '../../components/MainSlide';

const item = {
  inactive: { opacity: 0, translateY: 120 },
  active: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 1, delay: 0.6, ease: 'easeInOut' },
  },
};

export default function MainPage() {
  return (
    <MainPageLayout>
      <MainSlide />
      <Background>
        <BackgroundGradient
          className="gradient"
          src={gradient}
          alt="gradient-image"
          width={2000}
        />
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
  width: 100vw;
  height: 100vh;
  background-color: #17171c;
`;

const BackgroundGradient = styled(Image)`
  z-index: -99;
  position: fixed;
  top: -10rem;
  left: -14.5rem;
`;
