import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import sample from '../../public/images/2.png';
import gradient from '../../public/images/gradient.png';
import desk from '../../public/images/desk.png';
import person from '../../public/images/person.png';
import shape1 from '../../public/images/shape1.png';
import shape2 from '../../public/images/shape2.png';
import shape3 from '../../public/images/shape3.png';

const item = {
  inactive: { opacity: 0, translateY: 120 },
  active: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 1, delay: 0.4, ease: 'easeInOut' },
  },
};

export default function MainPage() {
  const [position, setPosition] = useState(0);

  const onScroll = () => {
    setPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [1600, 4600], ['200vw', '-200vw']);

  const cardOpacity = useTransform(scrollY, [3900, 4300], [1, 0]);

  return (
    <MainPageLayout>
      <HorizontalSlide>
        <motion.div className="slider" style={{ x, opacity: cardOpacity }}>
          <div className="slide">
            <div>
              <MotionBox
                variants={item}
                initial="inactive"
                whileInView="active"
              >
                <div className="box" />
                <div className="text-box">
                  <h2>당신만의 공간</h2>
                  <div>
                    <p>무한한 상상의 공간에서 당신다운 일을.</p>
                    <p>내 앞의 작은 출발점, 책상</p>
                  </div>
                </div>
                <Image
                  className="shape"
                  src={shape1}
                  alt="shape-image"
                  width={480}
                />
              </MotionBox>
            </div>
          </div>
          <div className="slide">
            <div>
              <MotionBox
                variants={item}
                initial="inactive"
                whileInView="active"
              >
                <div className="box" />
                <div className="text-box">
                  <h2>당신만의 공간</h2>
                  <div>
                    <p>무한한 상상의 공간에서 당신다운 일을.</p>
                    <p>내 앞의 작은 출발점, 책상</p>
                  </div>
                </div>
                <Image
                  className="shape"
                  src={shape2}
                  alt="shape-image"
                  width={480}
                />
              </MotionBox>
            </div>
          </div>
          <div className="slide">
            <div>
              <MotionBox
                variants={item}
                initial="inactive"
                whileInView="active"
              >
                <div className="box" />
                <div className="text-box">
                  <h2>당신만의 공간</h2>
                  <div>
                    <p>무한한 상상의 공간에서 당신다운 일을.</p>
                    <p>내 앞의 작은 출발점, 책상</p>
                  </div>
                </div>
                <Image
                  className="shape"
                  src={shape3}
                  alt="shape-image"
                  width={480}
                />
              </MotionBox>
            </div>
          </div>
        </motion.div>
      </HorizontalSlide>
      <VerticalSlide>
        <div className="container">
          <div className="flex-1">
            <MotionBox variants={item} initial="inactive" whileInView="active">
              <Image
                className="gradient"
                src={gradient}
                alt="gradient-image"
                width={600}
              />
              <Image
                className="person"
                src={person}
                alt="desk-image"
                width={760}
              />
              <h2>당신의</h2>
              <h2>크리에이티비티가</h2>
              <div>
                <p>무한한 상상의 공간에서 당신다운 일을.</p>
                <p>내 앞의 작은 출발점, 책상</p>
              </div>
            </MotionBox>
          </div>
          <div className="flex-1">
            <MotionBox variants={item} initial="inactive" whileInView="active">
              <Image
                className="gradient"
                src={gradient}
                alt="gradient-image"
                width={600}
              />
              <Image className="desk" src={desk} alt="desk-image" width={560} />
              <h2>당신다움으로</h2>
              <div>
                <p>무한한 상상의 공간에서 당신다운 일을.</p>
                <p>내 앞의 작은 출발점, 책상</p>
              </div>
            </MotionBox>
          </div>
          <div className="flex-3" />
          <div className="flex-1">
            <MotionBox variants={item} initial="inactive" whileInView="active">
              <Image
                className="image"
                src={sample}
                alt="sample-image"
                width={768}
              />
              <h2>당신만의</h2>
              <h2>공간을 찾아보세요</h2>
              <div>
                <p>무한한 상상의 공간에서 당신다운 일을.</p>
                <p>내 앞의 작은 출발점, 책상</p>
              </div>
            </MotionBox>
          </div>
        </div>
      </VerticalSlide>
      <Background>
        <p>나다운 공간에서 나다움을 만들다</p>
      </Background>
    </MainPageLayout>
  );
}

const MainPageLayout = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: #212529;
`;

const HorizontalSlide = styled.div`
  width: 300vw;
  z-index: 3;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .slider {
    display: flex;
    flex-direction: row;
    .slide {
      width: 100vw;
      height: 1000px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 5rem;
      > div {
        width: 50vw;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background-color: tomato; */
      }
      .box {
        position: absolute;
        bottom: 10%;
        width: 50vw;
        height: 370px;
        background-color: #b9b7bc;
      }
      .text-box {
        position: absolute;
        top: 8%;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        /* background-color: yellow; */
        > h2 {
          z-index: 4;
          font-size: 3.5rem;
        }
        > div {
          z-index: 5;
          /* background-color: yellow; */
          > p {
            font-size: 0.75rem;
            margin-bottom: 0.6rem;
          }
        }
      }
    }
  }
`;

const VerticalSlide = styled.div`
  z-index: 2;
  width: 100vw;
  height: fit-content;
  overflow: hidden;
  .container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    .flex-1 {
      width: 100vw;
      height: 1000px;
      background-color: #212529;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0rem 0rem 4rem 6rem #212529;
    }
    .flex-3 {
      width: 100vw;
      height: 3000px;
    }
  }
`;

const Background = styled.div`
  z-index: 1;
  position: absolute;
  width: 100vw;
  > p {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    font-size: 4rem;
    text-align: center;

    color: #212529;
    text-shadow: -1px -1px 0 #adb5bd, 1px -1px 0 #adb5bd, -1px 1px 0 #adb5bd,
      1px 1px 0 #adb5bd;
  }
`;

const MotionBox = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 48rem;
  height: 600px;
  gap: 0.75rem;
  /* background-color: aqua; */
  > h2 {
    z-index: 4;
    font-size: 3.5rem;
  }
  > div {
    z-index: 5;
    /* background-color: yellow; */
    > p {
      font-size: 0.75rem;
      margin-bottom: 0.6rem;
    }
  }
  .image {
    position: absolute;
    left: 0%;
    bottom: 0%;
    margin: 0px;
    margin-bottom: 2rem;
  }
  .gradient {
    position: absolute;
    top: -40%;
    left: -20%;
    margin: 0px;
    margin-bottom: 2rem;
  }
  .desk {
    z-index: 5;
    position: absolute;
    right: -10%;
    bottom: -10%;
    margin: 0px;
  }
  .person {
    z-index: 5;
    position: absolute;
    right: -30%;
    bottom: -20%;
    margin: 0px;
  }
  .shape {
    z-index: 5;
    position: absolute;
    right: -26%;
    bottom: -20%;
    margin: 0px;
  }
`;
