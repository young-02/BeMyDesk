import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import usePost from '@/Hooks/usePost';
import { useUpdateScrap } from '@/Hooks/useUpdateScrap';
import activeScrap from '../../../public/images/userReaction/activeScrap.png';
import inactiveScrap from '../../../public/images/userReaction/inactiveScrap.png';
import { useQueryClient } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import useResponsive from '@/Hooks/useResponsive';

const ScrapCard = ({ postId, userInfo, currentUserId }: any) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data: post } = usePost(postId);
  const { postMutate: updateScrap } = useUpdateScrap(userInfo, postId);

  const handleScrap = async () => {
    updateScrap(userInfo);
    queryClient.removeQueries(['post', postId]);
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
      )}
      {isMobile && (
        <MobileStyledContainer>
          <div className="leftDiv">
            <Image
              src={post?.postImage1}
              alt="postImage1"
              width={140}
              height={124}
              style={{ cursor: 'pointer' }}
              className="img"
            />
          </div>
          <div className="rightDiv">
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
                    width={24}
                    height={24}
                  />
                </div>
                <p className="ProfileNickname">{post?.userNickname}</p>
              </div>
              <div onClick={handleScrap} style={{ cursor: 'pointer' }}>
                <Image
                  src={activeScrap}
                  alt="scrap-icon"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </MobileStyledContainer>
      )}
    </>
  );
};

export default ScrapCard;

const MobileStyledContainer = styled.div`
  margin-bottom: 15px;

  display: flex;
  width: 100%;
  height: 124px;
  background: #ffffff;
  border: 1px solid #868e96;
  border-radius: 10px;
  overflow: hidden;

  .leftDiv {
    .img {
    }
  }
  .rightDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    .firstLine {
      height: 25px;

      width: 90%;

      .Title {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #17171c;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .secondLine {
      min-height: 55%;
      margin-top: 5px;
      .Text {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #17171c;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }

    .thirdLine {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .ProfileDiv {
        display: flex;
        justify-content: center;
        align-items: center;

        .profileImage {
          position: relative;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          overflow: hidden;
          margin-bottom: 3px;
        }

        .ProfileNickname {
          margin-left: 13px;
          /* Pretendard Bold 12 */

          font-family: 'Pretendard';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 12px;
          /* identical to box height, or 133% */

          /* Gray 09 */

          color: #17171c;
        }
      }
    }
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
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
