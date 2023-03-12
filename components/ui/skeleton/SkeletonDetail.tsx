import DetailViewUserInfor from '@/components/detail/DetailViewUserInfor';
import React from 'react';
import styled from 'styled-components';
import { ImgLayout, Layout35, Layout50, Layout80 } from './Skeleton';
import DetailViewText from '../../detail/DetailViewText';

type Props = {};

export default function SkeletonDetail({}: Props) {
  return (
    <SkeletonDetailLayout>
      <div className="wrap">
        <DetailViewDiv>
          <div className="detail-view ">
            <UserProfile>
              <div className="user-profile">
                <ImgLayout className="skeleton animate-pulse" />
              </div>
              <div className="user-information">
                <Layout35 className="skeleton animate-pulse user-id" />
                <Layout50 className="skeleton animate-pulse" />
              </div>
            </UserProfile>
            <DetailViewSlideLayout>
              <ImgLayout className="swiper-wrapper skeleton animate-pulse" />
            </DetailViewSlideLayout>
            <DetailViewTextLayout>
              <Layout35 className="skeleton animate-pulse" />
              <div className="detail-view-text">
                <Layout50 className="skeleton animate-pulse" />
              </div>

              <Layout35 className="detail-view-text skeleton animate-pulse" />
              <Layout50 className="detail-view-text skeleton animate-pulse" />
              <Layout50 className="detail-view-text skeleton animate-pulse" />
            </DetailViewTextLayout>
          </div>
          <div className="detail-product">
            <DetailViewProductsLayout>
              <Layout50 className="title skeleton animate-pulse" />
              <Layout35 className=" skeleton animate-pulse" />

              <div className="product-wrap">
                {new Array(2).fill('').map((_, i) => (
                  <div className="product-list" key={i}>
                    <div className="product-img">
                      <ImgLayout className=" skeleton animate-pulse" />
                    </div>
                    <Layout50 className="product-title skeleton animate-pulse" />
                    <Layout35 className=" skeleton animate-pulse" />
                  </div>
                ))}
              </div>
            </DetailViewProductsLayout>
          </div>
        </DetailViewDiv>
      </div>
    </SkeletonDetailLayout>
  );
}

const SkeletonDetailLayout = styled.div`
  max-width: 75rem;
  width: 100%;
  margin: 7rem auto;
  display: flex;
  justify-content: space-between;

  .wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1200px) {
      padding: 0 1.25rem;
    }

    > div {
      flex: 3;
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .user-profile {
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    overflow: hidden;

    @media (max-width: 51.25rem) {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  .user-information {
    margin-left: 20px;
    width: 35%;

    @media (max-width: 51.25rem) {
      margin-left: 0.875rem;
    }

    .user-id {
      margin-bottom: 0.125rem;
    }
  }
`;

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
`;

const DetailViewTextLayout = styled.div`
  margin-top: 1.25rem;

  .detail-view-text {
    margin: 1.25rem 0;

    @media (max-width: 820px) {
      margin: 1rem 0;
    }
  }
`;

const DetailViewProductsLayout = styled.div`
  .title {
    margin-bottom: 0.25rem;
  }
  .product-wrap {
    max-height: 66.875rem;
    min-height: 66.875rem;
    overflow-y: auto;
    padding: 0;

    @media (max-width: 820px) {
      flex-direction: row;
      min-height: auto;
      display: flex;
      gap: 1rem;
      overflow-x: scroll;

      ::-webkit-scrollbar {
        background-color: #fff;
        height: 0.5rem;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #ced4da;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-track {
        background-color: #fff;
      }
    }
  }

  .product-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.625rem;
    margin: 0.625rem 0 1rem;
    /* border: 0.0625rem solid #868e96; */
    border-radius: 0.625rem;
    background: #fff;
    text-align: center;

    @media (max-width: 820px) {
      min-width: 180px;
      width: 180px;
      border: 0.0625rem solid #e9ecef;
    }

    .product-img {
      position: relative;
      width: 100%;
      height: 105px;
    }

    .product-title {
      margin: 0.625rem 0 0.125rem;
    }
    .product-hasTag {
      margin-top: 4px;
    }
  }
`;

const DetailViewDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 820px) {
    flex-direction: column;
  }

  .detail-view {
    width: 70%;
    max-width: 55.875rem;

    @media (max-width: 820px) {
      width: 100%;
    }
  }

  .detail-product {
    max-width: 20.125rem;
    width: 40%;
    background-color: #f1f3f5;
    padding: 1.25rem;
    border-radius: 0.625rem;

    @media (max-width: 820px) {
      width: 100%;
      min-width: 100%;
      background-color: #fff;
      padding: 0;
    }
  }
`;
