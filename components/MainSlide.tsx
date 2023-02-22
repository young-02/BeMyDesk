import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import scrap from '../public/images/scrapIcon.png';
import main1 from '../public/images/main1.png';
import main2 from '../public/images/main2.png';
import main3 from '../public/images/main3.png';
import main4 from '../public/images/main4.png';
import main5 from '../public/images/main5.png';

const text = {
  inactive: { opacity: 0, translateY: 120 },
  active: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 0.8, delay: 0.8, ease: 'easeInOut' },
  },
};

const image1 = {
  inactive: { opacity: 0, translateY: -600 },
  active: {
    opacity: 1,
    translateY: -320,
    transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' },
  },
};

const image2 = {
  inactive: { opacity: 0, translateY: 500 },
  active: {
    opacity: 1,
    translateY: -30,
    transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' },
  },
};

const image3 = {
  inactive: { opacity: 0, translateY: 120 },
  active: {
    opacity: 1,
    translateY: -100,
    transition: { duration: 1, delay: 0.8, ease: 'easeInOut' },
  },
};

const MainSlide = () => {
  return (
    <MainPageLayout>
      <MainPageSlide>
        <SlideContent>
          <MotionText variants={text} initial="inactive" whileInView="active">
            <div className="text-top">
              <h3>
                당신의<div className="text-point">크리에이티비티가</div>
              </h3>
              <p>
                보내는 아니더면, 우리는 그들을 부패뿐이다. 인생의 그들의 같은
                있으랴? 끝에 하는 우리의 아니다.
              </p>
            </div>
            <div className="text-bottom">
              <div className="icon-row">
                <Image
                  className="desk"
                  src={scrap}
                  alt="scrap-icon"
                  width={24}
                  style={{ marginRight: '2.5rem' }}
                />
                <p>10K+</p>
                <hr />
              </div>
              <p>
                10,000개의 포스팅된 글을 만나보세요! 당신의 공간의 새로운 경험을
                제공합니다.
              </p>
            </div>
          </MotionText>
          <MotionImage
            variants={image1}
            initial="inactive"
            animate="active"
            exit="active"
          >
            <Image
              src={main1}
              alt="main-image"
              width={312}
              style={{ borderRadius: '1.25rem' }}
            />
            <Image
              src={main2}
              alt="main-image"
              width={312}
              style={{ borderRadius: '1.25rem' }}
            />
            <Image
              src={main1}
              alt="main-image"
              width={312}
              style={{ borderRadius: '1.25rem' }}
            />
          </MotionImage>
          <MotionImage
            variants={image2}
            initial="inactive"
            whileInView="active"
            exit="active"
          >
            <Image
              src={main3}
              alt="main-image"
              width={210}
              style={{ borderRadius: '1.25rem' }}
            />
            <Image
              src={main4}
              alt="main-image"
              width={210}
              style={{ borderRadius: '1.25rem' }}
            />
            <Image
              src={main3}
              alt="main-image"
              width={210}
              style={{ borderRadius: '1.25rem' }}
            />
          </MotionImage>
        </SlideContent>
      </MainPageSlide>
      <MainPageSlide>
        <SlideContent>
          <MotionText variants={text} initial="inactive" whileInView="active">
            <div className="text-top">
              <h3>
                <div className="text-point">당신다움</div>으로
              </h3>
              <p>
                보내는 아니더면, 우리는 그들을 부패뿐이다. 인생의 그들의 같은
                있으랴? 끝에 하는 우리의 아니다.
              </p>
            </div>
            <div className="text-bottom">
              <div className="icon-row">
                <Image
                  className="desk"
                  src={scrap}
                  alt="scrap-icon"
                  width={24}
                  style={{ marginRight: '2.5rem' }}
                />
                <p>10K+</p>
                <hr />
              </div>
              <p>
                10,000개의 포스팅된 글을 만나보세요! 당신의 공간의 새로운 경험을
                제공합니다.
              </p>
            </div>
          </MotionText>
          <MotionImage
            variants={image3}
            initial="inactive"
            whileInView="active"
            exit="active"
          >
            <Image
              src={main5}
              alt="main-image"
              width={546}
              style={{ borderRadius: '1.25rem' }}
            />
          </MotionImage>
        </SlideContent>
      </MainPageSlide>
      <MainPageSlide>
        <SlideContent>3</SlideContent>
      </MainPageSlide>
      <MainPageSlide>
        <SlideContent>4</SlideContent>
      </MainPageSlide>
    </MainPageLayout>
  );
};

export default MainSlide;

const MainPageLayout = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  color: white;
  background-color: none;
  /* background-color: #17171c; */
  font-size: 20rem;
`;

const MainPageSlide = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: center;
  background-color: none;
`;

const SlideContent = styled.div`
  width: 75rem;
  height: 30rem;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  /* position: relative; */
  /* background-color: black; */
`;

const MotionImage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MotionText = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'Pretendard Variable';

  .text-top {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    /* background-color: red; */

    > h3 {
      display: flex;
      flex-wrap: wrap;
      font-size: 3rem;
      font-weight: 200;
      line-height: 4rem;

      .text-point {
        font-weight: 600;
      }
    }

    > p {
      width: 100%;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }

  .text-bottom {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;

    .icon-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      > p {
        font-size: 1rem;
        font-weight: 400;
        margin-right: 1.5rem;
      }

      > hr {
        width: 100%;
        border-top: 0.0625rem solid white;
        margin: 0;
      }
    }

    > p {
      width: 16rem;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.25rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
`;
