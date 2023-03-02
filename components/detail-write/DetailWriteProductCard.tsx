import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const parse = require('html-react-parser');

// 모달창에서 선택한 제품이 들어가는 카드
const DetailWriteProductCard = ({ selectList }: any) => {
  return (
    <DetailWriteCardLayout>
      {selectList.length < 3 ? (
        selectList.map((i: any) => (
          <DetailWriteCardBox key={i.productId}>
            <CardBox>
              <div className="card">
                <Image
                  src={i.image}
                  width={150}
                  height={150}
                  alt="selectListImg"
                />
                <div className="card">
                  <p className="product_title">{parse(i.title)}</p>
                  <p className="product_hashTag">#{i.category2}</p>
                </div>
              </div>
            </CardBox>
          </DetailWriteCardBox>
        ))
      ) : (
        <Swiper
          slidesPerView={2}
          centeredSlides={true}
          spaceBetween={-65}
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {selectList?.map((i: any) => (
            <SwiperSlide key={i.productId}>
              {
                <DetailWriteCardBox>
                  <CardBox>
                    <div className="card">
                      <Image
                        src={i.image}
                        width={150}
                        height={150}
                        alt="selectListImg"
                      />
                      <div className="card">
                        <p className="product_title">{parse(i.title)}</p>
                        <p className="product_hashTag">#{i.category2}</p>
                      </div>
                    </div>
                  </CardBox>
                </DetailWriteCardBox>
              }
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </DetailWriteCardLayout>
  );
};
//pr위한 주석...

const DetailWriteCardLayout = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const DetailWriteCardBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardBox = styled.div`
  width: 31.25rem;
  border: 0.0625rem solid #868e96;
  border-radius: 0.625rem;
  margin: 1.5rem;
  padding: 1rem;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .product_title {
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
    width: 30rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .product_hashTag {
    color: #868e96;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 500;
    margin-top: 0.125rem;
  }
`;

export default DetailWriteProductCard;
