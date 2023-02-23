import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi';
function MyScrap({ myScrap, scrapCount }: any) {
  if (scrapCount == '0') {
    return (
      <div>
        <Image
          src="/images/QuestionMark.png"
          alt="QuestionMark"
          width={48}
          height={48}
        />
        <p> 저장한 스크랩이 없어요</p>
        <p> 마음에 드시는 공간을 저장해볼까요? </p>
      </div>
    );
  } else {
    return (
      <>
        {myScrap.map((post) => (
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
              ) : null}
            </StyledLeftDiv>
            <StyledRightDiv>
              <div className="firstLine">
                <p className="Title">{post.postTitle}</p>
              </div>
              <div className="secondLine">
                <p className="Text">{post.postText}</p>
              </div>
              <div className="thirdLine">
                <div className="ProfileDiv">
                  <p className="ProfileLogo" />
                  <p className="ProfileNickname">24</p>
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
    width: 572px;
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
    margin-top: 30px;
    .LikesDiv {
      display: flex;
      justify-content: center;
      align-items: center;

      .likeButton {
        width: 20px;
        height: 20px;
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

export default MyScrap;
