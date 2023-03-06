import { dbService } from '@/shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import FollowingCard from './FollowingCard';

function MyFollow({ myFollow, followCount }: any) {
  return (
    <>
      {followCount == '0' && (
        <StyledErrorDiv>
          <Image
            className="errorIcon"
            src="/images/QuestionMark.png"
            alt="QuestionMark"
            width={48}
            height={48}
          />
          <p className="errorFirstLine">팔로우 리스트가 없어요</p>
          <p className="errorSecondLine">
            다른 사람의 공간은 어떤지 찾아볼까요?
          </p>
        </StyledErrorDiv>
      )}
      {myFollow?.map((userId: any) => (
        <FollowingCard key={userId} userId={userId} />
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

export default MyFollow;
