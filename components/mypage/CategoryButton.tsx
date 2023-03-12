import useResponsive from '@/Hooks/useResponsive';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

function CategoryButton({
  category,
  setCategory,
  postCount,
  scrapCount,
  followCount,
}: any) {
  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 1000,
    minWidth: 1001,
  });

  return (
    <>
      {isDesktop && (
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
              borderBottomColor:
                category === 'myFollow' ? '#206EFB' : '#CED4DA',
            }}
          >
            팔로우 <span className="countNumber">{followCount}</span>
          </button>
        </StyledButtonContainer>
      )}
      {isMobile && (
        <MobileStyledButtonContainer>
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
              borderBottomColor:
                category === 'myFollow' ? '#206EFB' : '#CED4DA',
            }}
          >
            팔로우 <span className="countNumber">{followCount}</span>
          </button>
        </MobileStyledButtonContainer>
      )}
    </>
  );
}

//모바일
const MobileStyledButtonContainer = styled.div`
  margin-bottom: 15px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  button {
    margin: 0 12px;

    height: 32px;
    width: 96px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 133% */

    text-align: center;

    /* Gray 03 */

    color: #ced4da;
    border-bottom: 2px solid #ced4da;
    .countNumber {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      margin-left: 3px;
    }

    :hover {
      opacity: 60%;
    }
  }
`;
const StyledButtonContainer = styled.div`
  button {
    margin: 0 12px;

    height: 54px;
    width: 150px;
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
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      margin-left: 3px;
    }

    :hover {
      opacity: 60%;
    }
  }
`;

export default CategoryButton;
