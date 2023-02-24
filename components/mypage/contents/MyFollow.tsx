import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

function MyFollow({ myFollow, followCount }: any) {
  if (followCount == '0') {
    return (
      <StyledErrorDiv>
        <Image
          className="errorIcon"
          src="/images/QuestionMark.png"
          alt="QuestionMark"
          width={48}
          height={48}
        />
        <p className="errorFirstLine">팔로우 리스트가 없어요</p>
        <p className="errorSecondLine">다른 사람의 공간은 어떤지 찾아볼까요?</p>
      </StyledErrorDiv>
    );
  } else {
    return (
      <>
        {myFollow.map((profile) => (
          <StyledContainer
            key={profile.id}
            style={{ border: '1px solid black' }}
          >
            <StyledDivLeft>
              {profile.profileImage ? (
                <img
                  className="profileImage"
                  src={profile.profileImage}
                  alt="Image"
                  width={202}
                  height={202}
                />
              ) : (
                <img
                  className="profileImage"
                  src="/images/defaultProfile.png"
                  alt="Image"
                  width={202}
                  height={202}
                />
              )}
            </StyledDivLeft>
            <StyledDivRight>
              <div className="firstLine">
                <button className="followingButton">
                  <span className="followingButtonText">팔로잉</span>
                </button>
              </div>
              <div className="secondLine">
                <p className="nickname">{profile.nickname}</p>
              </div>
              <div className="thirdLine">
                <p className="inroduction">{profile.introduction}</p>
              </div>
            </StyledDivRight>
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
  height: 120px;
  /* White */

  background: #ffffff;
  /* Primary 01 */

  border: 1px solid #868e96;
  border-radius: 10px;
  margin-bottom: 28px;
`;

const StyledDivLeft = styled.div`
  width: 160px;

  .profileImage {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin: 20px 40px;
  }
`;

const StyledDivRight = styled.div`
  padding: 10px;
  .firstLine {
    display: flex;
    justify-content: flex-end;
    width: 700px;
    .followingButton {
      background: #e9ecef;
      border-radius: 10px;
      /* Pretendard Medium 14 */

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 143% */

      display: flex;
      align-items: center;
      text-align: center;

      /* Gray 06 */

      color: #495057;
      padding: 5px 22px;
      .followingButtonText {
        /* Pretendard Medium 14 */

        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height, or 143% */

        display: flex;
        align-items: center;
        text-align: center;

        /* Gray 06 */

        color: #495057;
      }
    }
  }
  .secondLine {
    .nickname {
      /* Pretendard Bold 20 */

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 20px;
      /* identical to box height, or 100% */

      display: flex;
      align-items: center;

      /* Gray 09 */

      color: #17171c;
    }
  }

  .thirdLine {
    margin-top: 10px;
    .introduction {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      /* identical to box height, or 125% */

      /* Gray 09 */

      color: #17171c;
    }
  }
`;

export default MyFollow;
