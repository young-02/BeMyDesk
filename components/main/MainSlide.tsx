import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import scrap from '../../public/images/scrapIcon.png';
import main1 from '../../public/images/mainSlide/main1.png';
import main2 from '../../public/images/mainSlide/main2.png';
import main3 from '../../public/images/mainSlide/main3.png';
import main4 from '../../public/images/mainSlide/main4.png';
import main5 from '../../public/images/mainSlide/main5.png';
import designer from '../../public/images/category/designer.jpg';
import developer from '../../public/images/category/developer.jpg';
import student from '../../public/images/category/student.jpg';
import gamer from '../../public/images/category/gamer.jpg';
import { useRouter } from 'next/router';
import useResponsive from '../../Hooks/useResponsive';

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
    translateY: -280,
    transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' },
  },
};

const image2 = {
  inactive: { opacity: 0, translateY: 100 },
  active: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' },
  },
};

const image3 = {
  inactive: { opacity: 0, translateY: 120 },
  active: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 1, delay: 0.8, ease: 'easeInOut' },
  },
};

const firstImageGroup = [main2, main1, main1];
const secondImageGroup = [main3, main4, main3];

const MainSlide = () => {
  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 896,
    minWidth: 897,
  });

  const router = useRouter();
  return (
    <MainPageLayout>
      <Slide>
        <SlideContentsWrapper>
          <SlideContentTop>
            <MotionText variants={text} initial="inactive" whileInView="active">
              <div className="text-top">
                <div>
                  <h3>
                    당신의
                    <div className="text-point">크리에이티비티가</div>
                  </h3>
                  <p>
                    BE MY DESK에서 당신의 창의성을 빛내줄 공간을 찾아보세요.
                    공간을 통해 우리의 삶이 달라집니다.
                  </p>
                </div>
              </div>
              <div className="text-bottom-first">
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
                  10,000개의 포스팅된 글을 만나보세요! 당신의 공간의 새로운
                  경험을 제공합니다.
                </p>
              </div>
            </MotionText>
            <div className="first-motion-image-wrapper">
              <MotionImage
                variants={image1}
                initial="inactive"
                animate="active"
                exit="active"
                className="first-image-group"
              >
                {firstImageGroup.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      src={item}
                      alt="main-image"
                      className="first-image-group-item"
                    />
                  );
                })}
              </MotionImage>
              <MotionImage
                variants={image2}
                initial="inactive"
                whileInView="active"
                exit="active"
                className="second-image-group"
              >
                {secondImageGroup.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      src={item}
                      alt="main-image"
                      className="second-image-group-item"
                    />
                  );
                })}
              </MotionImage>
            </div>
          </SlideContentTop>
        </SlideContentsWrapper>
      </Slide>
      <Slide>
        <SlideContentsWrapper>
          {isDesktop && (
            <SlideContentTop>
              <MotionText
                variants={text}
                initial="inactive"
                whileInView="active"
              >
                <div className="text-top desktop">
                  <div>
                    <h3>
                      <span className="text-point">당신다움</span>으로
                    </h3>
                    <p>당신만의 공간을 찾아 당신다움을 빛내보세요.</p>
                  </div>
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
                    10,000개의 포스팅된 글을 만나보세요! 당신의 공간의 새로운
                    경험을 제공합니다.
                  </p>
                </div>
              </MotionText>
              <MotionImage
                variants={image3}
                initial="inactive"
                whileInView="active"
                exit="active"
                className="third-image-group"
              >
                <Image
                  src={main5}
                  alt="main-image"
                  className="third-image-item"
                />
              </MotionImage>
            </SlideContentTop>
          )}
          {isMobile && (
            <SlideContentTop>
              <MotionText
                variants={text}
                initial="inactive"
                whileInView="active"
                className="mobile"
              >
                <div className="text-top mobile">
                  <div>
                    <h3>
                      <span className="text-point">당신다움</span>으로
                    </h3>
                    <p>당신만의 공간을 찾아 당신다움을 빛내보세요.</p>
                  </div>
                  <button
                    onClick={() => {
                      router.push('/post-list');
                    }}
                  >
                    시작하기
                  </button>
                </div>
                <MotionImage
                  variants={image3}
                  initial="inactive"
                  whileInView="active"
                  exit="active"
                >
                  <Image
                    src={main5}
                    alt="main-image"
                    className="third-image-item"
                  />
                </MotionImage>
                <div className="text-bottom-second">
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
                    10,000개의 포스팅된 글을 만나보세요! 당신의 공간의 새로운
                    경험을 제공합니다.
                  </p>
                </div>
              </MotionText>
            </SlideContentTop>
          )}
        </SlideContentsWrapper>
      </Slide>
      <Slide>
        <SlideContentsWrapper>
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
        </SlideContentsWrapper>
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
              <h4>My page</h4>
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

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

const SlideContentsWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem 1.25rem;
  /* background-color: yellow; */

  @media (max-width: 1200px) {
    padding: 0rem 10vw;
  }

  @media (max-width: 1120px) {
    padding: 0rem calc(22vw - 3rem);
  }

  @media (max-width: 414px) {
    padding: 0rem 1.25rem;
  }
`;

const SlideContentTop = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 1rem;
  min-width: 20.9375rem;
  /* background-color: red; */

  @media (min-width: 1200px) {
    width: 75rem;
    gap: 1.5rem;
  }

  @media (max-width: 1120px) {
    position: relative;
  }

  .first-motion-image-wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    /* background-color: yellow; */

    @media (min-width: 1200px) {
      gap: 1.5rem;
    }

    @media (max-width: 1120px) {
      position: absolute;
      right: 0;
      flex-direction: row-reverse;
    }

    @media (max-width: 446px) {
      gap: 0.625rem;
    }
  }
`;

const MotionImage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
  /* background-color: green; */

  @media (min-width: 1200px) {
    gap: 1.5rem;
  }

  @media (max-width: 1120px) {
    &.first-image-group {
      margin-top: 4rem;
    }

    &.second-image-group {
      margin-top: 16rem;
    }

    &.third-image-group {
      height: 100%;
    }
  }

  @media (max-width: 800px) {
    &.first-image-group {
      margin-top: 26vh;
    }

    &.second-image-group {
      margin-top: 13.625rem;
    }
  }

  @media (max-width: 446px) {
    gap: 0.625rem;
  }

  .first-image-group-item {
    border-radius: 0.625rem;
    width: 15rem;
    height: auto;

    @media (min-width: 1200px) {
      width: 19.5rem;
      border-radius: 1.25rem;
    }

    @media (max-width: 800px) {
      width: 30vw;
    }

    @media (max-width: 446px) {
      width: 8.25rem;
    }
  }

  .second-image-group-item {
    border-radius: 0.625rem;
    width: 13rem;
    height: auto;

    @media (min-width: 1200px) {
      width: 13.125rem;
      border-radius: 1.25rem;
    }

    @media (max-width: 700px) {
      width: 30vw;
    }

    @media (max-width: 446px) {
      width: 8.25rem;
    }
  }

  .third-image-item {
    object-fit: cover;
    border-radius: 0.625rem;
    height: 60vh;
    width: calc(40vw - 2rem);

    @media (min-width: 1200px) {
      width: 34rem;
      height: auto;
      border-radius: 1.25rem;
      margin-top: -11vh;
    }

    @media (max-width: 896px) {
      width: 100%;
      height: 30vh;
      border-radius: 1.25rem;
    }
  }
`;

const MotionText = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  /* background-color: aqua; */

  .text-top {
    width: calc(34vw - 1rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    /* background-color: tomato; */

    &.mobile {
      @media (max-width: 896px) {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }
    }

    @media (max-width: 700px) {
      width: 14rem;
    }

    &.desktop {
      @media (max-width: 600px) {
        position: absolute;
      }
    }

    @media (max-width: 546px) {
      width: 11.625rem;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      > h3 {
        display: flex;
        flex-wrap: wrap;
        font-size: calc(6vw - 1rem);
        line-height: 1.3;
        font-weight: 200;

        .text-point {
          font-weight: 600;
        }

        @media (min-width: 1024px) {
          font-size: 3rem;
        }

        @media (max-width: 948px) {
          font-weight: 600;
        }

        @media (max-width: 800px) {
          font-size: 2rem;
        }

        @media (max-width: 546px) {
          font-size: 1.625rem;
        }
      }

      > p {
        width: 100%;
        font-size: 1rem;
        line-height: 1.5;
        font-weight: 400;
        margin-bottom: 2.5rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;

        @media (max-width: 546px) {
          font-size: 1rem;
        }
      }
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

  .text-bottom-first {
    @media (max-width: 1120px) {
      display: none;
    }
  }

  .text-bottom-second {
    @media (max-width: 896px) {
      margin-top: 1.5rem;
    }
  }

  > div {
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
        border-top: 1px solid white;
        margin: 0;
      }
    }

    > p {
      width: 14rem;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.25rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
`;

const SlideContentMiddle = styled.div`
  width: 85vw;
  height: 76vh;
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  margin-top: 5vh;
  transition: all 0.6s ease-in-out;
  /* background-color: cyan; */

  :hover {
    width: 95vw;
    transition: all 0.8s ease-in-out;
  }

  @media (min-width: 1300px) {
    width: 75rem;
    height: 48rem;

    :hover {
      width: 1360px;
    }
  }

  @media (max-width: 1000px) {
    width: 100%;
    height: 80vh;
    flex-direction: column;

    :hover {
      width: 95vw;
    }
  }
`;

const CategoryCardBox = styled.div`
  flex: 1;
  width: 17.625rem;
  height: 100%;
  position: relative;
  gap: 0.625rem;
  padding: 2rem;
  border-radius: 0.625rem;
  overflow: hidden;
  transition: all 0.8s ease-in-out;
  cursor: pointer;

  .gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0rem;
    bottom: 0rem;
    z-index: 1;
    mix-blend-mode: multiply;
    background: linear-gradient(
      rgba(217, 217, 217, 0),
      86%,
      rgba(154, 154, 154, 1)
    );
  }

  @media (max-width: 1000px) {
    width: 100%;
    height: 100%;
    flex-direction: column;

    :hover {
      width: 100%;
      height: 100%;
    }
  }

  > h3 {
    position: absolute;
    z-index: 1;
    font-size: 2.125rem;
    font-weight: 400;
    transform: rotate(-90deg);
    transform-origin: 0% 100%;
    left: 4rem;
    bottom: 2rem;

    @media (max-width: 1000px) {
      font-size: 1.5rem;
      left: 2.5rem;
      bottom: 1rem;
    }
  }

  > p {
    position: absolute;
    z-index: 1;
    font-size: 1rem;
    font-weight: 400;
    display: none;
    white-space: nowrap;
    left: 2rem;
    bottom: 2rem;
  }

  :hover {
    flex: 5;
    transition: all 0.8s ease-in-out;

    > h3 {
      transform: rotate(0deg);
      left: 2rem;
      bottom: 4rem;

      @media (max-width: 1000px) {
        left: 1rem;
        bottom: 2.25rem;
      }
    }

    > p {
      display: block;

      @media (max-width: 1000px) {
        left: 1rem;
        bottom: 0.75rem;
      }
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
  overflow: hidden;

  @media (max-width: 900px) {
    margin-bottom: 7rem;
  }

  > div {
    width: 75rem;
    height: fit-content;
    margin: 0rem 20rem;

    @media (max-width: 1200px) {
      width: calc(100vw - 2.5rem);
    }

    > h3 {
      font-size: calc(19vw - 2.5rem);
      font-weight: 700;
      margin-left: -0.7vw;

      @media (min-width: 1201px) {
        font-size: 12.5rem;
      }
      @media (max-width: 468px) {
        font-size: 3rem;
      }
    }

    > p {
      font-size: 1.5vw;
      margin-bottom: 40px;
      margin-top: 0.125rem;

      @media (min-width: 1201px) {
        font-size: 1.125rem;
        margin-top: 0rem;
      }

      @media (max-width: 800px) {
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }
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
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12.5rem;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.0625rem solid #868e96;
  background: #17171c;

  @media (max-width: 900px) {
    height: fit-content;
  }
`;

const FooterInfo = styled.div`
  max-width: 75rem;
  width: 100%;
  display: flex;
  gap: 7.5rem;
  margin: 1.25rem;

  @media (max-width: 900px) {
    gap: 1.25rem;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }

  > div {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    @media (max-width: 900px) {
      gap: 0.75rem;
    }

    > h4 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ced4da;

      @media (max-width: 900px) {
        font-size: 0.875rem;
      }
    }

    > p {
      font-size: 1rem;
      font-weight: 400;
      color: #868e96;

      @media (max-width: 900px) {
        font-size: 0.75rem;
      }
    }

    > div {
      height: fit-content;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      > p {
        font-size: 1rem;
        font-weight: 400;
        color: #868e96;

        @media (max-width: 900px) {
          font-size: 0.75rem;
        }
      }
    }
  }
`;
