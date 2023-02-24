import { dbService } from '@/shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi';
import { FcLike } from 'react-icons/fc';

function MyPost({ myPost, postCount }: any) {
  if (postCount == '0') {
    return (
      <StyledErrorDiv>
        <Image
          className="errorIcon"
          src="/images/QuestionMark.png"
          alt="QuestionMark"
          width={48}
          height={48}
        />
        <p className="errorFirstLine">작성한 게시물이 없어요</p>
        <p className="errorSecondLine">첫 게시물을 작성해주세요!</p>
      </StyledErrorDiv>
    );
  } else {
    return (
      <>
        {myPost.map((post: any) => (
          <StyledContainer key={post.id}>
            <StyledLeftDiv>
              {post.postImage1 ? (
                <img
                  src={post.postImage1}
                  alt="postImage1"
                  width={282}
                  height={197}
                  style={{ cursor: 'pointer' }}
                  className="img"
                />
              ) : (
                <img
                  src="/images/noImage.png"
                  alt="postImage1"
                  width={282}
                  height={197}
                  style={{ cursor: 'pointer' }}
                  className="img"
                />
              )}
            </StyledLeftDiv>
            <StyledRightDiv>
              <div className="firstLine">
                <p className="Title">{post.postTitle}</p>
                <img src="" alt="" />
              </div>

              <div className="secondLine">
                <p className="Text">{post.postText}</p>
              </div>
              <div className="thirdLine">
                <div className="LikesDiv">
                  <FcLike className="likeButton" />
                  <p className="likeCount">{post.likesCount}</p>
                </div>
                <HiOutlineTrash className="deleteButton" />
              </div>
            </StyledRightDiv>
          </StyledContainer>
        ))}
      </>
    );
  }
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
const StyledContainer = styled.div`
  display: flex;
  width: 894px;
  height: 197px;
  /* White */

  background: #ffffff;
  /* Primary 01 */

  border: 1px solid #868e96;
  border-radius: 10px;
  margin-bottom: 28px;
`;

const StyledLeftDiv = styled.div`
  .img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;
const StyledRightDiv = styled.div`
  padding: 20px;
  div {
  }
  .firstLine {
    width: 500px;
    height: 30px;
    margin-bottom: 20px;
    overflow: hidden;

    .Title {
      /* Pretendard Bold 24 */

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      /* identical to box height, or 133% */

      /* Gray 09 */

      color: #17171c;
    }
  }
  .secondLine {
    width: 572px;
    height: 58.12px;
    overflow: hidden;
    .Text {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      /* or 125% */

      /* Gray 09 */

      color: #17171c;
    }
  }
  .thirdLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .LikesDiv {
      display: flex;
      justify-content: center;
      align-items: center;

      .likeButton {
        width: 30px;
        height: 30px;
        padding-bottom: 5px;
      }
      .likeCount {
        margin-left: 13px;
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 16px;
        /* identical to box height, or 133% */

        text-align: center;

        /* Gray 05 */

        color: #868e96;
      }
    }
    .deleteButton {
      width: 20px;
      height: 20px;
    }
  }
`;
export default MyPost;
