import React from 'react';
import styled from 'styled-components';

type Props = {};

export default function DetailViewProducts({ detail }: Props) {
  const { products } = detail;
  return (
    <DetailViewProductsLayout>
      <h3>사용한 제품</h3>
      <p>{products?.length}개의 제품이 사용됐어요.</p>

      {products?.map((product) => (
        <div className="product-list" key={product.title}>
          <img className="product-img" src={product.img} alt={product.title} />
          <p className="product-title">{product.title}</p>
          <p className="product-hasTag">{product.hashTag}</p>
        </div>
      ))}
    </DetailViewProductsLayout>
  );
}

const DetailViewProductsLayout = styled.div`
  .product-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 10px 0 1rem;
    border: 1px solid #868e96;
    border-radius: 10px;
    text-align: center;

    .product-img {
      height: 105px;
      object-fit: cover;
    }

    .product-title {
      margin: 10px 0 2px;
      font-weight: 700;
    }
  }
`;
