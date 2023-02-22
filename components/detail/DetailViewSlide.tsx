import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

type Props = {};

export default function DetailViewSlide({ detail }) {
  return (
    <DetailViewSlideLayout>
      <Swiper
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="post-img" src={detail.postImage1} alt="postImage1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="post-img" src={detail.postImage2} alt="postImage1" />
        </SwiperSlide>
      </Swiper>
    </DetailViewSlideLayout>
  );
}

const DetailViewSlideLayout = styled.div`
  border-radius: 0.625rem;
  overflow: hidden;

  .post-img {
    display: block;
    width: 100%;
    max-height: 37.25rem;
    object-fit: cover;
  }

  .swiper-pagination {
    .swiper-pagination-bullet {
      width: 8px !important;
      height: 8px !important;
      opacity: 1;
      background: #d9d9d9 !important;

      &.swiper-pagination-bullet-active {
        width: 22px !important;
        height: 8px !important;
        border-radius: 10px;
      }
    }
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 24px;
  }
`;
