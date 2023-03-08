import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import usePost from '@/Hooks/usePost';
import { useUpdateScrap } from '@/Hooks/useUpdateScrap';
import activeScrap from '../../../public/images/userReaction/activeScrap.png';
import inactiveScrap from '../../../public/images/userReaction/inactiveScrap.png';
import { useQueryClient } from 'react-query';

const ScrapCard = ({ postId, userInfo, currentUserId }: any) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data: post } = usePost(postId);
  const { postMutate: updateScrap } = useUpdateScrap(userInfo, postId);

  const handleScrap = async () => {
    updateScrap(userInfo);
    queryClient.removeQueries(['post', postId]);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      <StyledContainer>
        <StyledLeftDiv>
          <Image
            src={post?.postImage1}
            alt="postImage1"
            width={282}
            height={197}
            style={{ cursor: 'pointer' }}
            className="img"
          />
        </StyledLeftDiv>
        <StyledRightDiv>
          <div className="firstLine">
            <p className="Title">{post?.postTitle}</p>
          </div>
          <div className="secondLine">
            <p className="Text">{post?.postText.replace(/<[^>]*>?/g, '')}</p>
          </div>
          <div className="thirdLine">
            <div className="ProfileDiv">
              <div className="profileImage">
                <Image
                  src="/images/defaultProfile.png"
                  alt="profileImage"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="ProfileNickname">{post?.userNickname}</p>
            </div>
            <div onClick={handleScrap} style={{ cursor: 'pointer' }}>
              <Image src={activeScrap} alt="scrap-icon" width={24} />
            </div>
          </div>
        </StyledRightDiv>
      </StyledContainer>
    </>
  );
};

export default ScrapCard;

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

    .ProfileDiv {
      display: flex;
      justify-content: center;
      align-items: center;

      .profileImage {
        position: relative;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        overflow: hidden;
        margin-bottom: 3px;
      }

      .ProfileNickname {
        margin-left: 13px;
        /* Pretendard Bold 12 */

        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 16px;
        /* identical to box height, or 133% */

        /* Gray 09 */

        color: #17171c;
      }
    }
  }
`;
