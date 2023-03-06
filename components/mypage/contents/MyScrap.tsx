import usePost from '@/Hooks/usePost';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import ScrapCard from './ScrapCard';

function MyScrap({ myScrap, scrapCount }: any) {
  return (
    <>
      {scrapCount == '0' && (
        <StyledErrorDiv>
          <Image
            className="errorIcon"
            src="/images/QuestionMark.png"
            alt="QuestionMark"
            width={48}
            height={48}
          />
          <p className="errorFirstLine">저장한 스크랩이 없어요</p>
          <p className="errorSecondLine">마음에 드시는 공간을 저장해 볼까요?</p>
        </StyledErrorDiv>
      )}
      {myScrap?.map((postId: any) => (
        <ScrapCard key={postId} postId={postId} />
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
  .errorIcon {
    width: 164px;
    height: 164px;
  }
  .errorFirstLine {
    font-family: 'Pretendard';
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
  }
  .errorSecondLine {
    font-family: 'Pretendard';
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
  }
`;

export default MyScrap;
