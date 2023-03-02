import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import activeLikes from '../public/images/activeLikes.png';
import inactiveLikes from '../public/images/inactiveLikes.png';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from '../shared/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { transDate } from '../utils/transDate';
import { auth } from '@/shared/firebase';
import { useUpdateLikes } from '../Hooks/useUpdateLikes';
import { useQueryClient } from 'react-query';

const PostListCard = ({ post }: { post: PostType }) => {
  const router = useRouter();
  const {
    id,
    userNickname,
    createdAt,
    postTitle,
    postText,
    jobCategory,
    likes,
    likesCount,
    postImage1,
    userProfile,
  } = post;

  // 현재 로그인한 유저 정보 가져오기
  const currentUserId: any = auth.currentUser?.uid;

  // currentUser 가 해당 포스트가 좋아요 눌렀는지 여부 확인
  const initialState = likes.includes(currentUserId) ? true : false;
  const [isLikesClicked, setIsLikesClicked] = useState(initialState);

  const { mutate: updateLikes } = useUpdateLikes();

  // 수정된 좋아요
  let newLikes = {};
  if (isLikesClicked === false) {
    newLikes = {
      ...post,
      likes: [...likes, currentUserId],
      likesCount: likesCount + 1,
    };
  }
  if (isLikesClicked === true) {
    newLikes = {
      ...post,
      likes: likes.filter((id) => id !== currentUserId),
      likesCount: likesCount - 1,
    };
  }

  // 좋아요 버튼을 클릭했을 때, firebase 의 likes & likesCount 수정 로직
  const handleUpdateLikes = async () => {
    if (currentUserId === undefined) {
      router.push('auth/sign-in');
    } else {
      updateLikes({ postId: id, newLikes });
      setIsLikesClicked(!isLikesClicked);
    }
  };

  // 글쓴이 프로필 사진 or 기본값
  const userProfileImg = userProfile ?? `images/defaultProfile.png`;
  // 시간 변환로직
  const nowDate = transDate(createdAt);

  return (
    <PostListCardLayout key={id}>
      <Link href={`/detail/${id}`}>
        <div
          className="post-image"
          style={{
            backgroundImage: `url(${postImage1})`,
          }}
        />
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

  .post-image {
    width: 100%;
    height: 16rem;
    background-size: 18rem;
    background-position: center center;
    border-radius: 0.625rem 0.625rem 0rem 0rem;
    :hover {
      background-size: 19rem;
      transition: all 0.2s;
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
  font-family: 'Pretendard Variable';

  .profile-image {
    position: absolute;
    top: 0%;
    left: 1.25rem;
    width: 2.125rem;
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
