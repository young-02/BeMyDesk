import React from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import Image from 'next/image';
type Props = {};

export default function DetailViewProducts({ post }) {
  const { products } = post;

  return (
    <DetailViewProductsLayout>
      <h3 className="title">사용한 제품</h3>
      <p className="description">{products?.length}개의 제품이 사용됐어요.</p>

      <div className="product-wrap">
        {products?.map((product) => (
          <div className="product-list" key={product.title}>
            <div className="product-img">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className="product-title">{ReactHtmlParser(product.title)}</p>
            <p className="product-hasTag">#{product.category2}</p>
          </div>
        ))}
      </div>
    </DetailViewProductsLayout>
  );
}

const DetailViewProductsLayout = styled.div`
  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;

    @media (max-width: 820px) {
      font-size: 1rem;
    }
  }

  .description {
    font-size: 0.75rem;
    color: #868e96;
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
      font-weight: 700;

      @media (max-width: 820px) {
        font-size: 0.75rem;
      }
    }
    .product-hasTag {
      margin-top: 4px;

      @media (max-width: 820px) {
        font-size: 12px;
      }
    }
  }
`;
