import React from 'react';
import styled from 'styled-components';

function CategoryButton({ category, setCategory }: any) {
  return (
    <StyledButtonContainer>
      <button
        onClick={() => {
          setCategory('myPost');
        }}
      >
        게시물
      </button>
      <button
        onClick={() => {
          setCategory('myScrap');
        }}
      >
        스크랩
      </button>
      <button
        onClick={() => {
          setCategory('myFollow');
        }}
      >
        팔로우
      </button>
    </StyledButtonContainer>
  );
}
const StyledButtonContainer = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: center;
  button {
    border: 1px solid black;
  }
`;

export default CategoryButton;
