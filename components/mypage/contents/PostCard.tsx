import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useUpdateLikes } from '@/Hooks/useUpdateLikes';
import activeLikes from '../../../public/images/userReaction/activeLikes.png';
import inactiveLikes from '../../../public/images/userReaction/inactiveLikes.png';
import styled from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi';
import { deleteDoc, doc } from 'firebase/firestore';
import { dbService } from '@/shared/firebase';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import DeleteModal from './DeleteModal';
import { useMediaQuery } from 'react-responsive';

type Props = {};

const PostCard = ({ post, currentUserId }: any) => {
  const queryClient = useQueryClient();
  // 좋아요
  const { isLikesClicked, myPostMutate: updateLikes } = useUpdateLikes(
    currentUserId,
    post,
  );

  // 글삭제 모달
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);

  const deleteButtonHandler = async () => {
    setIsDeleteModalOn(true);
  };

  // 반응응형 사이즈
  const [isMobile, setIsMobile] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<number>(0);
  const isMobileSize = useMediaQuery({ maxWidth: 1000 });
  const isDesktopSize = useMediaQuery({ minWidth: 1001 });

  //서버사이드렌더링
  useEffect(() => {
    setIsMobile(isMobileSize);
    setIsDesktop(isDesktopSize);
  }, [isMobileSize, isDesktopSize]);

  useEffect(() => {
    return setIsDeleteModalOn(false);
  }, []);

  return (
    <>
      {isDesktopSize && (
        <StyledContainer key={post.id}>
          {/* 글삭제모달 */}
          {isDeleteModalOn && (
            <DeleteModal
              isDeleteModalOn={isDeleteModalOn}
              setIsDeleteModalOn={setIsDeleteModalOn}
              post={post}
            />
          )}
          <StyledLeftDiv>
            {post.postImage1 ? (
              <Image
                src={post.postImage1}
                alt="postImage1"
                width={282}
                height={197}
                style={{ cursor: 'pointer' }}
                className="img"
              />
            ) : (
              <Image
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
              <Image src="" alt="" />
            </div>

            <div className="secondLine">
              <p className="Text">{post.postText.replace(/<[^>]*>?/g, '')}</p>
            </div>
            <div className="thirdLine">
              <div className="LikesDiv" onClick={() => updateLikes(post.id)}>
                <Image
                  src={isLikesClicked ? activeLikes : inactiveLikes}
                  alt="likes-icon"
                  width={24}
                />
                <p className={isLikesClicked ? 'active' : 'inactive'}>
                  {post.likesCount}
                </p>
              </div>
              <HiOutlineTrash
                className="deleteButton"
                onClick={deleteButtonHandler}
              />
            </div>
          </StyledRightDiv>
        </StyledContainer>
      )}{' '}
      {isMobileSize && (
        <MobileStyledContainer key={post.id}>
          {/* 글삭제모달 */}
          {isDeleteModalOn && (
            <DeleteModal
              isDeleteModalOn={isDeleteModalOn}
              setIsDeleteModalOn={setIsDeleteModalOn}
              post={post}
            />
          )}
          <div className="leftDiv">
            {post.postImage1 ? (
              <Image
                src={post.postImage1}
                alt="postImage1"
                width={140}
                height={124}
                style={{ cursor: 'pointer' }}
                className="img"
              />
            ) : (
              <Image
                src="/images/noImage.png"
                alt="postImage1"
                width={140}
                height={124}
                style={{ cursor: 'pointer' }}
                className="img"
              />
            )}
          </div>
          <div className="rightDiv">
            <div className="firstLine">
              <p className="Title">{post.postTitle}</p>
            </div>
            <div className="secondLine">
              <p className="Text">{post.postText.replace(/<[^>]*>?/g, '')}</p>
            </div>
            <div className="thirdLine">
              <div className="LikesDiv" onClick={() => updateLikes(post.id)}>
                <Image
                  src={isLikesClicked ? activeLikes : inactiveLikes}
                  alt="likes-icon"
                  width={24}
                />
                <p className={isLikesClicked ? 'active' : 'inactive'}>
                  {post.likesCount}
                </p>
              </div>
              <HiOutlineTrash
                className="deleteButton"
                onClick={deleteButtonHandler}
              />
            </div>
          </div>
        </MobileStyledContainer>
      )}
    </>
  );
};

export default PostCard;

//모바일
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

      .LikesDiv {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;
        /* identical to box height, or 120% */
        gap: 0.5rem;
        display: flex;
        align-items: center;

        /* Gray 05 */

        color: #868e96;
        cursor: pointer;
      }
      .deleteButton {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
`;

const StyledContainer = styled.div`
  display: flex;
  width: 894px;
  height: 197px;
  background: #ffffff;
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

  .firstLine {
    width: 450px;
    height: 30px;
    margin-bottom: 20px;

    .Title {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: #17171c;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .secondLine {
    width: 572px;
    height: 58.12px;

    .Text {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
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
    margin-top: 20px;

    .LikesDiv {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #868e96;
      gap: 0.625rem;
      cursor: pointer;
    }
  }
  .deleteButton {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
