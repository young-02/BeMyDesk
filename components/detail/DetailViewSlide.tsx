import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import Image from 'next/image';

type Props = {};

export default function DetailViewSlide({ post }) {
  if (!post.postImage1 || !post.postImage2)
    return (
      <div
        style={{
          width: '100%',
          height: '25rem',
          backgroundColor: '#f1f3f5',
          borderRadius: 24,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 700,
        }}
      >
        이미지가 없습니다.
      </div>
    );
  return (
    <DetailViewSlideLayout>
      <Swiper
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={post.postImage1}
            alt="postImage1"
            layout="fill"
            objectFit="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="post-img"
            src={post.postImage2}
            alt="postImage1"
            layout="fill"
            objectFit="cover"
          />
        </SwiperSlide>
      </Swiper>
    </DetailViewSlideLayout>
  );
}

const DetailViewSlideLayout = styled.div`
  border-radius: 0.625rem;
  overflow: hidden;

  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 37.25rem;

    @media (max-width: 820px) {
      height: 26.25rem;
    }

    @media (max-width: 520px) {
      height: 19.5rem;
    }
  }

  .swiper-pagination {
    .swiper-pagination-bullet {
      width: 8px !important;
      height: 8px !important;
      opacity: 1;
      background: #d9d9d9 !important;
      transition: all.3s ease-in;

      &.swiper-pagination-bullet-active {
        width: 22px !important;
        height: 8px !important;
        border-radius: 10px;
      }
    }
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.5rem;
  }
`;
