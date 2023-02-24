import React from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
type Props = {};

export default function DetailViewProducts({ detail }) {
  const { products } = detail;
  return (
    <DetailViewProductsLayout>
      <h3 className="title">사용한 제품</h3>
      <p className="description">{products?.length}개의 제품이 사용됐어요.</p>

      <div className="product-wrap">
        {products?.map((product) => (
          <div className="product-list" key={product.title}>
            <img
              className="product-img"
              src={product.images}
              alt={product.title}
            />
            <p className="product-title">{ReactHtmlParser(product.title)}</p>
            <p className="product-hasTag">#{product.hashTag}</p>
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
  }

  .description {
    font-size: 0.75rem;
    color: #868e96;
  }
  .product-wrap {
    max-height: 66.875rem;
    min-height: 66.875rem;
    overflow-y: auto;
    padding: 0 0.625rem 0 0;
  }

  .product-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.625rem;
    margin: 0.625rem 0 1rem;
    border: 0.0625rem solid #868e96;
    border-radius: 0.625rem;
    background: #fff;
    text-align: center;

    .product-img {
      height: 105px;
      object-fit: cover;
    }

    .product-title {
      margin: 0.625rem 0 0.125rem;
      font-weight: 700;
    }
  }
`;
