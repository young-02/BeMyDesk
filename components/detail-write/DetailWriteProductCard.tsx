import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const parse = require('html-react-parser');

// 모달창에서 선택한 제품이 들어가는 카드
const DetailWriteProductCard = ({
  selectList,
  setSelectList,
  list,
  setList,
}: any) => {
  const deleteCard = (i: any) => {
    const deletedSelectList = selectList;
    const deleteList = list;
    setSelectList(
      deletedSelectList.filter((item: any) => item.productId !== i.productId),
    );
    setList(deleteList.filter((item: any) => item.productId !== i.productId));
  };

  return (
    <DetailWriteCardLayout>
      {/* {selectList.length < 3 ? (
        selectList.map((i: any) => (
          <DetailWriteCardBox key={i.productId}>
            <CardBox>
              <div className="close_box">
                <Image
                  className="close"
                  src={'/images/close.png'}
                  alt="closeBtn"
                  width={24}
                  height={24}
                  onClick={() => deleteCard(i)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="card">
                <Image
                  src={i.image}
                  width={150}
                  height={150}
                  alt="selectListImg"
                  className="selectListImg"
                />
                <div className="card">
                  <p className="product_title">{parse(i.title)}</p>
                  <p className="product_hashTag">#{i.category2}</p>
                </div>
              </div>
            </CardBox>
          </DetailWriteCardBox>
        ))
      ) : ( */}
      <Swiper
        slidesPerView={4}
        // centeredSlides={true}
        spaceBetween={20}
        pagination={{
          type: 'fraction',
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          520: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        className="mySwiper"
      >
        {selectList?.map((i: any) => (
          <SwiperSlide key={i.productId}>
            {
              <DetailWriteCardBox key={i.productId}>
                <CardBox>
                  <div className="close_box">
                    <Image
                      className="close"
                      src={'/images/close.png'}
                      alt="closeBtn"
                      width={16}
                      height={16}
                      onClick={() => deleteCard(i)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <div className="card-image">
                    <Image
                      src={i.image}
                      layout="fill"
                      object-fit="cover"
                      alt="selectListImg"
                    />
                  </div>
                  <div className="card">
                    <p className="product_title">{parse(i.title)}</p>
                    <p className="product_hashTag">#{i.category2}</p>
                  </div>
                </CardBox>
              </DetailWriteCardBox>
            }
          </SwiperSlide>
        ))}
      </Swiper>
      {/* )} */}
    </DetailWriteCardLayout>
  );
};

const DetailWriteCardLayout = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;

  .swiper {
    width: 100%;
    height: 100%;
    padding-bottom: 2em;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-pagination-fraction {
    bottom: 16px;
  }
`;

const DetailWriteCardBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6rem;

  .close {
    display: flex;
    justify-content: end;
    @media (min-width: 1px) and (max-width: 375px) {
      width: 10%;
      height: 10%;
    }
  }
`;

const CardBox = styled.div`
  width: 17.625rem;
  height: 170px;
  border: 0.0625rem solid #868e96;
  border-radius: 0.625rem;

  padding: 1rem;
  overflow: hidden;
  /* margin: 0 auto; */

  .close_box {
    display: flex;
    justify-content: end;
  }

  .card {
    position: absolute;
    bottom: 1.4rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .card-image {
    width: 100px;
    height: 130px;
    position: absolute;
    top: 6%;
    left: 50%;
    transform: translateX(-50%);

    > img {
      object-fit: contain;
    }
  }

  .selectListImg {
    width: 35%;
    height: 35%;
  }

  .product_title {
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
    width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
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
