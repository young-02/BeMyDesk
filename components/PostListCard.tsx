import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import activeLikes from '../public/images/activeLikes.png';
import inactiveLikes from '../public/images/inactiveLikes.png';
import { doc, updateDoc, query } from 'firebase/firestore';
import { dbService } from '../shared/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';

type PostListCardProps = { post: PostType; currentUserId: string };

const PostListCard = ({ post, currentUserId }: PostListCardProps) => {
  const router = useRouter();

  // currentUser 가 해당 포스트가 좋아요 눌렀는지 여부 확인
  const initialState = post.likes.includes(currentUserId) ? true : false;
  const [isLikesClicked, setIsLikesClicked] = useState(initialState);
  const userProfileImg = post.userProfile ?? `images/defaultProfile.png`;

  // 좋아요 버튼을 클릭했을 때, firebase 의 likes & likesCount 수정 로직
  const updateLikes = async () => {
    const postRef = doc(dbService, 'postData', post.id);
    // 🔖 로그인 안된 undefined 상태일 때 로그인 페이지로 이동
    if (currentUserId === undefined) {
      router.push('auth/sign-in');
    } else if (isLikesClicked === false) {
      const updateLikes = post.likesCount + 1;
      console.log('updateLikes +', updateLikes);
      await updateDoc(postRef, {
        likes: [...post.likes, currentUserId],
        likesCount: post.likesCount + 1,
      });
      setIsLikesClicked(true);
    } else {
      const updateLikes = post.likesCount == 0 ? 0 : post.likesCount - 1;
      console.log('updateLikes -', updateLikes);
      await updateDoc(postRef, {
        likes: post.likes.filter((id) => id !== currentUserId),
        likesCount: updateLikes,
      });
      setIsLikesClicked(false);
    }
  };

  //시간경과
  const detailDate = (time: any) => {
    const milliSeconds = new Date() - time;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  const nowDate = detailDate(post.createdAt);

  return (
    <PostListCardLayout key={post.id}>
      <Link href={`/detail/${post.id}`}>
        <div
          className="post-image"
          style={{
            backgroundImage: `url(${post.postImage1})`,
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
          <h4>{post.userNickname ?? '닉네임'}</h4>
          <p>{nowDate}</p>
        </div>
        <Link href={`/detail/${post.id}`}>
          <div className="middle">
            <h3>{post.postTitle}</h3>
            <p>{post.postText?.replace(/(<([^>]+)>)/gi, '')}</p>
          </div>
        </Link>
        <div className="bottom">
          <p>{post.jobCategory}의 책상</p>
          <div onClick={updateLikes}>
            <p>{post.likesCount}</p>
            <Image
              src={isLikesClicked ? activeLikes : inactiveLikes}
              alt="likes-icon"
              width={10}
            />
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
      height: 2rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: #868e96;
      margin-bottom: 1.25rem;
      line-height: 1rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
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
    font-size: 0.625rem;
    font-weight: 500;
    color: #4880e5;

    > div {
      display: flex;
      flex-direction: row;
      gap: 0.625rem;
      color: #f83e4b;
    }
  }
`;
