import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import scrap from '../public/images/scrapIcon.png';
import main1 from '../public/images/mainSlide/main1.png';
import main2 from '../public/images/mainSlide/main2.png';
import main3 from '../public/images/mainSlide/main3.png';
import main4 from '../public/images/mainSlide/main4.png';
import main5 from '../public/images/mainSlide/main5.png';
import designer from '../public/images/category/designer.jpg';
import developer from '../public/images/category/developer.jpg';
import student from '../public/images/category/student.jpg';
import gamer from '../public/images/category/gamer.jpg';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  return (
    <MainPageLayout>
      <Slide>
        <SlideContentTop>
          <MotionText variants={text} initial="inactive" whileInView="active">
            <div className="text-top">
              <h3>
                당신의<div className="text-point">크리에이티비티가</div>
              </h3>
              <p>
                BE MY DESK에서 당신의 창의성을 빛내줄 공간을 찾아보세요. 공간을
                통해 우리의 삶이 달라집니다.
              </p>
            </div>
            <div className="text-bottom">
              <div className="icon-row">
                <Image
                  src={scrap}
                  alt="scrap-icon"
                  width={24}
                  style={{ marginRight: '40px' }}
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
              style={{ borderRadius: '20px' }}
            />
            <Image
              src={main2}
              alt="main-image"
              width={312}
              style={{ borderRadius: '20px' }}
            />
            <Image
              src={main1}
              alt="main-image"
              width={312}
              style={{ borderRadius: '20px' }}
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
              style={{ borderRadius: '20px' }}
            />
            <Image
              src={main4}
              alt="main-image"
              width={210}
              style={{ borderRadius: '20px' }}
            />
            <Image
              src={main3}
              alt="main-image"
              width={210}
              style={{ borderRadius: '20px' }}
            />
          </MotionImage>
        </SlideContentTop>
      </Slide>
      <Slide>
        <SlideContentTop>
          <MotionText variants={text} initial="inactive" whileInView="active">
            <div className="text-top">
              <h3>
                <div className="text-point">당신다움</div>으로
              </h3>
              <p>당신만의 공간을 찾아 당신다움을 빛내보세요.</p>
              <button
                onClick={() => {
                  router.push('/post-list');
                }}
              >
                시작하기
              </button>
            </div>
            <div className="text-bottom">
              <div className="icon-row">
                <Image
                  src={scrap}
                  alt="scrap-icon"
                  width={24}
                  style={{ marginRight: '40px' }}
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
              style={{ borderRadius: '20px' }}
            />
          </MotionImage>
        </SlideContentTop>
      </Slide>
      <Slide>
        <SlideContentMiddle>
          <CategoryCardBox
            onClick={() => {
              router.push('/post-list?order=category&select=designer');
            }}
          >
            <div className="gradient" />
            <h3>디자이너</h3>
            <p>디자이너의 공간을 보러 가볼까요?</p>
            <CardImage
              src={designer}
              alt="designer"
              width={800}
              style={{ borderRadius: '20px' }}
            />
          </CategoryCardBox>
          <CategoryCardBox
            onClick={() => {
              router.push('/post-list?order=category&select=developer');
            }}
          >
            <div className="gradient" />
            <h3>개발자</h3>
            <p>개발자의 공간을 보러 가볼까요?</p>
            <CardImage
              src={developer}
              alt="designer"
              width={800}
              style={{ borderRadius: '20px' }}
            />
          </CategoryCardBox>
          <CategoryCardBox
            onClick={() => {
              router.push('/post-list?order=category&select=student');
            }}
          >
            <div className="gradient" />
            <h3>학생</h3>
            <p>학생의 공간을 보러 가볼까요?</p>
            <CardImage
              src={student}
              alt="designer"
              width={1200}
              style={{ borderRadius: '20px' }}
            />
          </CategoryCardBox>
          <CategoryCardBox
            onClick={() => {
              router.push('/post-list?order=category&select=gamer');
            }}
          >
            <div className="gradient" />
            <h3>게이머</h3>
            <p>게이머의 공간을 보러 가볼까요?</p>
            <CardImage
              src={gamer}
              alt="designer"
              width={1200}
              style={{ borderRadius: '20px' }}
            />
          </CategoryCardBox>
        </SlideContentMiddle>
        <div className="background" />
      </Slide>
      <Slide>
        <SlideContentBottom>
          <div>
            <h3>BE MY DESK</h3>
            <p>나다운 공간에서 나다움을 만들다</p>
          </div>
          <div className="slide"></div>
        </SlideContentBottom>
        <FooterBox>
          <FooterInfo>
            <div>
              <h4>BE MY DESK</h4>
              <div>
                <p>BE MY DESK에서 당신의 창의성을 빛내줄 공간을 찾아보세요.</p>
                <p>공간을 통해 우리의 삶이 달라집니다.</p>
              </div>
            </div>
            <div>
              <h4>Be my desk</h4>
              <p>상단 페이지</p>
              <p>소개 페이지</p>
              <p>직업별 페이지</p>
            </div>
            <div>
              <h4>Be my desk</h4>
              <p>프로필 설정</p>
              <p>나의 게시글</p>
            </div>
          </FooterInfo>
        </FooterBox>
        <div className="background" />
      </Slide>
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
  font-size: 320px;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: center;
  background-color: none;

  .background {
    z-index: -2;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #17171c;
  }
`;

const SlideContentTop = styled.div`
  width: 1200px;
  height: 480px;
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const MotionImage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
    width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    > h3 {
      display: flex;
      flex-wrap: wrap;
      font-size: 48px;
      font-weight: 200;
      line-height: 64px;

      .text-point {
        font-weight: 600;
      }
    }

    > p {
      width: 100%;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      margin-bottom: 2.5rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }

    > button {
      width: 8rem;
      height: 2.5rem;
      border-radius: 20rem;
      border: 1px solid white;
      color: white;
      background-color: none;
    }
  }

  .text-bottom {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    .icon-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      > p {
        font-size: 16px;
        font-weight: 400;
        margin-right: 24px;
      }

      > hr {
        width: 100%;
        border-top: 1px solid white;
        margin: 0;
      }
    }

    > p {
      width: 256px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
`;

const SlideContentMiddle = styled.div`
  width: 1200px;
  height: 800px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  transition: all 0.6s ease-in-out;

  :hover {
    width: 1360px;
    transition: all 0.8s ease-in-out;
  }
`;

const CategoryCardBox = styled.div`
  flex: 1;
  width: 282px;
  height: 100%;
  position: relative;
  gap: 10px;
  padding: 32px;
  border-radius: 10px;
  font-family: 'Pretendard Variable';
  overflow: hidden;
  transition: all 0.8s ease-in-out;
  cursor: pointer;

  .gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    bottom: 0px;
    z-index: 1;
    mix-blend-mode: multiply;
    background: linear-gradient(
      rgba(217, 217, 217, 0),
      86%,
      rgba(154, 154, 154, 1)
    );
  }

  > h3 {
    position: absolute;
    z-index: 1;
    font-size: 34px;
    font-weight: 400;
    transform: rotate(-90deg);
    transform-origin: 0% 100%;
    left: 64px;
    bottom: 32px;
  }

  > p {
    position: absolute;
    z-index: 1;
    font-size: 16px;
    font-weight: 400;
    display: none;
    white-space: nowrap;
    left: 32px;
    bottom: 32px;
  }

  :hover {
    flex: 5;
    transition: all 0.8s ease-in-out;

    > p {
      display: block;
    }

    > h3 {
      transform: rotate(0deg);
      left: 32px;
      bottom: 64px;
    }
  }
`;

const CardImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SlideContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard Variable';
  overflow: hidden;

  > div {
    width: 1200px;
    height: 100%;
    > h3 {
      font-size: 204.8px;
      font-weight: 700;
    }

    > p {
      font-size: 18px;
      margin-left: 16px;
      margin-bottom: 40px;
    }
  }

  .slide {
    background-image: url('/images/mainSlide/footer.png');
    width: 151.5rem;
    height: 10.75rem;
    animation: slider 30s linear infinite;
  }

  @keyframes slider {
    0% {
      background-position: 0 center;
    }
    100% {
      background-position: -151.5rem center;
    }
  }
`;

const FooterBox = styled.div`
  z-index: -1;
  width: 100%;
  height: 200px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0%;
  font-family: 'Pretendard Variable';
  border-top: 0.0625rem solid #868e96;
`;

const FooterInfo = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  gap: 120px;

  > div {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 20px;

    > h4 {
      font-size: 20px;
      font-weight: 600;
      color: #ced4da;
    }

    > p {
      font-size: 16px;
      font-weight: 400;
      color: #868e96;
    }

    > div {
      height: fit-content;
      display: flex;
      flex-direction: column;
      gap: 8px;

      > p {
        font-size: 16px;
        font-weight: 400;
        color: #868e96;
      }
    }
  }
`;
