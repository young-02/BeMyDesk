import Image from 'next/image';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import PostCard from './PostCard';

function MyPost({ myPost, postCount, currentUserId }: any) {
  if (postCount == '0') {
    return (
      <StyledErrorDiv>
        <Image
          className="errorIcon"
          src="/images/QuestionMark.png"
          alt="QuestionMark"
          width={1000}
          height={1000}
        />
        <p className="errorFirstLine">작성한 게시물이 없어요</p>
        <p className="errorSecondLine">첫 게시물을 작성해주세요!</p>
      </StyledErrorDiv>
    );
  } else {
    return (
      <>
        {myPost?.map((post: any) => (
          <PostCard key={post.id} post={post} currentUserId={currentUserId} />
        ))}
      </>
    );
  }
}

export default MyPost;

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
