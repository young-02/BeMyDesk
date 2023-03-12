import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import useUserInfo from '@/Hooks/useUserInfo';
import { useUpdateFollowing } from '@/Hooks/useUpdateFollowing';
import { useQueryClient } from 'react-query';
import CustomButton from '@/components/ui/CustomButton';
import { useMediaQuery } from 'react-responsive';
import useResponsive from '@/Hooks/useResponsive';

type Props = {};

const FollowingCard = ({ postUserId, userInfo }: any) => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: postUserInfo,
  } = useUserInfo(postUserId);

  // 팔로우
  const { postMutate: updateFollowing } = useUpdateFollowing(
    userInfo,
    postUserId,
  );

  const handleUpdateFollowing = async () => {
    updateFollowing(userInfo);
    queryClient.removeQueries(['userInfo', postUserId]);
  };

  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 1000,
    minWidth: 1001,
  });
  return (
    <>
      {isLoading && <div></div>}
      {isError && <div></div>}
      {isDesktop && (
        <StyledContainer
          key={postUserInfo?.id}
          style={{ border: '1px solid black' }}
        >
          <StyledDivLeft>
            {postUserInfo?.profileImage ? (
              <Image
                className="profileImage"
                src={postUserInfo?.profileImage}
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
              <CustomButton
                border="1px solid #206EFB"
                fontColor="#206EFB"
                paddingColumns="0.5"
                paddingRow="1"
                onClick={handleUpdateFollowing}
              >
                팔로잉 취소
              </CustomButton>
            </div>
            <div className="secondLine">
              <p className="nickname">{postUserInfo?.nickname}</p>
            </div>
            <div className="thirdLine">
              <p className="inroduction">{postUserInfo?.introduction}</p>
            </div>
          </StyledDivRight>
        </StyledContainer>
      )}{' '}
      {isMobile && (
        <MobileStyledContainer key={postUserInfo?.id}>
          <div className="leftDiv">
            {postUserInfo?.profileImage ? (
              <Image
                className="profileImage"
                src={postUserInfo?.profileImage}
                alt="Image"
                width={52}
                height={52}
              />
            ) : (
              <Image
                className="profileImage"
                src="/images/defaultProfile.png"
                alt="Image"
                width={52}
                height={52}
              />
            )}
          </div>
          <div className="rightDiv">
            <div className="firstLine">
              <p className="nickname">{postUserInfo?.nickname}</p>
              <CustomButton
                border="1px solid #206EFB"
                fontColor="#206EFB"
                paddingColumns="0.2"
                paddingRow="0.5"
                onClick={handleUpdateFollowing}
              >
                팔로잉 취소
              </CustomButton>
            </div>
            <div className="secondLine">
              <p className="introduction">{postUserInfo?.introduction}</p>
            </div>
          </div>
        </MobileStyledContainer>
      )}
    </>
  );
};

export default FollowingCard;

const MobileStyledContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  width: 100%;
  height: 84px;
  background: #ffffff;
  border: 1px solid #868e96;
  border-radius: 10px;
  overflow: hidden;
  .leftDiv {
    padding: 16px 10px;
    .profileImage {
      border-radius: 50%;
      width: 52px;
      height: 52px;
      object-fit: cover;
    }
  }
  .rightDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    margin-top: 4px;

    .firstLine {
      display: flex;
      justify-content: space-between;
      .nickname {
        /* Pretendard Bold 20 */
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height, or 100% */
        display: flex;
        align-items: center;

        /* Gray 09 */

        color: #17171c;
      }
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
      margin-top: 4px;
      .introduction {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        /* or 133% */

        /* Gray 09 */

        color: #17171c;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
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
