import React from 'react';
import styled from 'styled-components';

type Props = {};

// 모달창에서 선택한 제품이 들어가는 카드
const DetailWriteProductCard = (props: Props) => {
  return (
    <CardLayout>
      <CardBox>
        <div></div>
        <h3>제목입니다</h3>
      </CardBox>
    </CardLayout>
  );
};

const CardLayout = styled.div`
  display: flex;
  align-items: center;
`;

const CardBox = styled.div`
  width: 17.625rem;
  height: 10.625rem;
  border: 0.0625rem solid #868e96;
  border-radius: 0.625rem;
`;
export default DetailWriteProductCard;
