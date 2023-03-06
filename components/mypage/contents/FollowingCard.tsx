import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import useUserInfo from '@/Hooks/useUserInfo';

type Props = {};

const FollowingCard = (userId: any) => {
  console.log('userId', userId);
  const {
    isLoading,
    isError,
    error,
    data: userInfo,
  } = useUserInfo(userId.userId);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      <StyledContainer key={userInfo?.id} style={{ border: '1px solid black' }}>
        <StyledDivLeft>
          {userInfo?.profileImage ? (
            <Image
              className="profileImage"
              src={userInfo?.profileImage}
              alt="Image"
              width={202}
              height={202}
            />
          ) : (
            <Image
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
            <p className="nickname">{userInfo?.nickname}</p>
          </div>
          <div className="thirdLine">
            <p className="inroduction">{userInfo?.introduction}</p>
          </div>
        </StyledDivRight>
      </StyledContainer>
    </>
  );
};

export default FollowingCard;

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
