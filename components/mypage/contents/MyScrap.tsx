import usePost from '@/Hooks/usePost';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import ScrapCard from './ScrapCard';

function MyScrap({ userInfo, scrapCount, currentUserId }: any) {
  return (
    <>
      {scrapCount == '0' && (
        <StyledErrorDiv>
          <Image
            className="errorIcon"
            src="/images/QuestionMark.png"
            alt="QuestionMark"
            width={1000}
            height={1000}
          />
          <p className="errorFirstLine">저장한 스크랩이 없어요</p>
          <p className="errorSecondLine">마음에 드시는 공간을 저장해 볼까요?</p>
        </StyledErrorDiv>
      )}
      {userInfo?.scraps?.map((postId: any) => (
        <ScrapCard
          key={postId}
          postId={postId}
          userInfo={userInfo}
          currentUserId={currentUserId}
        />
      ))}
    </>
  );
}

const StyledErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 190px;
  align-items: center;
  @media (max-width: 1000px) {
    margin-top: 90px;
  }
  .errorIcon {
    width: 164px;
    height: 164px;
    @media (max-width: 1000px) {
      width: 124px;
      height: 124px;
    }
  }
  .errorFirstLine {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 48px;
    /* or 150% */

    display: flex;
    align-items: center;
    text-align: center;

    /* Gray 06 */

    color: #495057;
    @media (max-width: 1000px) {
      font-weight: 700;
      font-size: 24px;
      line-height: 20px;
    }
  }
  .errorSecondLine {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height, or 125% */

    display: flex;
    align-items: center;
    text-align: center;

    /* Gray 05 */

    color: #868e96;
    @media (max-width: 1000px) {
      margin-top: 7px;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
    }
  }
`;

export default MyScrap;
