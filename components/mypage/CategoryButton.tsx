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
      >
        게시물 {postCount}
      </button>
      <button
        onClick={() => {
          setCategory('myScrap');
        }}
      >
        스크랩 {scrapCount}
      </button>
      <button
        onClick={() => {
          setCategory('myFollow');
        }}
      >
        팔로우 {followCount}
      </button>
    </StyledButtonContainer>
  );
}
const StyledButtonContainer = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: center;
  button {
    height: 54px;
    width: 180px;
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
  }
`;

export default CategoryButton;
