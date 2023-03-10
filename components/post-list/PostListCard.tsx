import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import activeLikes from '../../public/images/userReaction/activeLikes.png';
import inactiveLikes from '../../public/images/userReaction/inactiveLikes.png';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from '../../shared/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { transDate } from '../../utils/transDate';
import { auth } from '@/shared/firebase';
import { useUpdateLikes } from '../../Hooks/useUpdateLikes';
import useCheckUser from '@/Hooks/useCheckUser';


const PostListCard = ({ post }: { post: PostType }) => {
  const router = useRouter();
  const { userExist } = useCheckUser();

  const {
    id,
    userNickname,
    createdAt,
    postTitle,
    postText,
    jobCategory,
    likesCount,
    postImage1,
    userProfile,
  } = post;

  // 현재 로그인한 유저 정보 가져오기
  const currentUserId: any = auth.currentUser?.uid;

  const { isLikesClicked, postListMutate: updateLikes } = useUpdateLikes(
    currentUserId,
    post,
  );

  const handleUpdateLikes = async () => {
    if (currentUserId === undefined) {
      router.push('auth/sign-in');
    } else if (userExist == false) {
      alert('유저 정보를 설정하세요');
      router.push('/auth/sns-nickname');
    } else {
      updateLikes(id);
    }
  };

  // 글쓴이 프로필 사진 or 기본값
  const userProfileImg = userProfile ?? `images/defaultProfile.png`;
  // 시간 변환로직
  const nowDate = transDate(createdAt);

  return (
    <PostListCardLayout key={id}>
      <div className="post">
        <Link href={`/detail/${id}`}>
          <div className="profile-image-wrap">
            <div
              className="post-image"
              style={{
                backgroundImage: `url(${postImage1})`,
              }}
            />
          </div>
        </Link>
        <CardContentBox>
          <div
            className="profile-image"
            style={{
              backgroundImage: `url(${userProfileImg} )`,
            }}
          />

          <div className="top">
            <h4>{userNickname ?? '닉네임'}</h4>
            <p>{nowDate}</p>
          </div>
          <Link href={`/detail/${id}`}>
            <div className="middle">
              <h3>{postTitle}</h3>
              <p>{postText?.replace(/(<([^>]+)>)/gi, '')}</p>
            </div>
          </Link>
          <div className="bottom">
            <p>{jobCategory}의 책상</p>
            <div onClick={handleUpdateLikes}>
              <Image
                src={isLikesClicked ? activeLikes : inactiveLikes}
                alt="likes-icon"
                width={24}
              />
              <p className={isLikesClicked ? 'active' : 'inactive'}>
                {likesCount}
              </p>
            </div>
          </div>
        </CardContentBox>
      </div>
    </PostListCardLayout>
  );
};

export default PostListCard;

const PostListCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
  border-radius: 0.625rem;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
  overflow: hidden;

  @media (max-width: 1300px) {
    width: calc(100% / 3 - 11px);
  }

  @media (max-width: 927px) {
    width: calc(100% / 2 - 8px);
  }

  @media (max-width: 520px) {
    width: 100%;
  }

  .profile-image-wrap {
    width: 100%;
    height: 16rem;
    border-radius: 0.625rem 0.625rem 0rem 0rem;
    overflow: hidden;

    .post-image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      transition: all 0.2s;
    }

    :hover {
      .post-image {
        transform: scale(1.1);
      }
    }
  }
`;

const CardContentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  padding: 1.25rem 1.25rem 1.25rem;

  .profile-image {
    position: absolute;
    top: 0%;
    left: 1.25rem;
    max-width: 2.125rem;
    width: 100%;
    transform: translate(0%, -60%);
    height: 2.125rem;
    border-radius: 100%;
    background-size: 2.125rem;
    background-position: center center;
  }

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.625rem;
    margin-bottom: 0.625rem;

    > h4 {
      font-size: 0.75rem;
      font-weight: 700;
    }
  }

  .middle {
    display: flex;
    flex-direction: column;

    > h3 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    > p {
      height: 1rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: #868e96;
      margin-bottom: 1rem;
      line-height: 1rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    :hover {
      opacity: 50%;
      transition: all 0.1s;
    }
  }

  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 500;
    color: #4880e5;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.625rem;

      .active {
        color: #f83e4b;
      }

      .inactive {
        color: #868e96;
      }
    }
  }
`;
