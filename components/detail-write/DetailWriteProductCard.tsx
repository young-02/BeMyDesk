import React from 'react';
import styled from 'styled-components';
import { DetailWriteSearchProps } from './DetailWriteForm';

type Props = {
  item?: string;
  list?: any[];
};

// 모달창에서 선택한 제품이 들어가는 카드
const DetailWriteProductCard = ({ selectList }: any) => {
  return (
    <>
      {/* <CardBox> */}

      {selectList?.map((i: any) => (
        <CardLayout key={i.productId}>
          <CardBox>
            <img src={i.image} style={{ width: '200px', height: '200px' }} />
          </CardBox>
        </CardLayout>
      ))}
      {/* </CardBox> */}
    </>
  );
};

const CardLayout = styled.div`
  display: flex;
  justify-items: flex-start;
  flex-direction: row;
  align-items: center;
`;

const CardBox = styled.div`
  width: 17.625rem;
  height: 10.625rem;
  border: 0.0625rem solid #868e96;
  border-radius: 0.625rem;
`;
export default DetailWriteProductCard;
