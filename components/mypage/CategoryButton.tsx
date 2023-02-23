import React from 'react';
import styled from 'styled-components';

function CategoryButton({
  category,
  setCategory,
  postCount,
  scrapCount,
  followCount,
}: any) {
  return (
    <StyledButtonContainer>
      <button
        onClick={() => {
          setCategory('myPost');
        }}
        style={{
          color: category === 'myPost' ? '#17171C' : '#ced4da',
          borderBottomColor: category === 'myPost' ? '#206EFB' : '#CED4DA',
        }}
      >
        게시물 <span className="countNumber">{postCount}</span>
      </button>
      <button
        onClick={() => {
          setCategory('myScrap');
        }}
        style={{
          color: category === 'myScrap' ? '#17171C' : '#ced4da',
          borderBottomColor: category === 'myScrap' ? '#206EFB' : '#CED4DA',
        }}
      >
        스크랩 <span className="countNumber">{scrapCount}</span>
      </button>
      <button
        onClick={() => {
          setCategory('myFollow');
        }}
        style={{
          color: category === 'myFollow' ? '#17171C' : '#ced4da',
          borderBottomColor: category === 'myFollow' ? '#206EFB' : '#CED4DA',
        }}
      >
        팔로우 <span className="countNumber">{followCount}</span>
      </button>
    </StyledButtonContainer>
  );
}
const StyledButtonContainer = styled.div`
  button {
    margin: 0 12px;

    height: 54px;
    width: 150px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    /* identical to box height, or 133% */

    text-align: center;

    /* Gray 03 */

    color: #ced4da;
    border-bottom: 2px solid #ced4da;
    .countNumber {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      margin-left: 3px;
    }
  }
`;

export default CategoryButton;
