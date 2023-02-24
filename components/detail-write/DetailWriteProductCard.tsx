import React from 'react';
import styled from 'styled-components';
import { DetailWriteSearchProps } from './DetailWriteForm';

const parse = require('html-react-parser');

type Props = {
  item?: string;
  list?: any[];
};

// 모달창에서 선택한 제품이 들어가는 카드
const DetailWriteProductCard = ({ selectList }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      {selectList?.map((i: any) => (
        <CardLayout key={i.productId}>
          <CardBox>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={i.image}
                style={{
                  width: '150px',
                  height: '150px',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <p>{parse(i.title)}</p>
                <p>{i.category2}</p>
              </div>
            </div>
          </CardBox>
        </CardLayout>
      ))}
    </div>
  );
};

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardBox = styled.div`
  width: 31.25rem;
  height: 31.25rem;
  border: 0.0625rem solid #868e96;
  border-radius: 0.625rem;
  margin: 0.5rem;
`;
export default DetailWriteProductCard;
