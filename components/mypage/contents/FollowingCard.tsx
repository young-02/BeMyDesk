import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import useUserInfo from '@/Hooks/useUserInfo';
import { useUpdateFollowing } from '@/Hooks/useUpdateFollowing';
import { useQueryClient } from 'react-query';
import CustomButton from '@/components/ui/CustomButton';

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

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
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
