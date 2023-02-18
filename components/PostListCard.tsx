import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import activeLikes from '../public/images/activeLikes.png';
import inactiveLikes from '../public/images/inactiveLikes.png';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from '../shared/firebase';

type PostListCardProps = { post: PostType; currentUserId: string };

const PostListCard = ({ post, currentUserId }: PostListCardProps) => {
  // currentUser 가 해당 포스트가 좋아요 눌렀는지 여부 확인
  const initialState = post.likes.includes(currentUserId) ? true : false;
  const [isLikesClicked, setIsLikesClicked] = useState(initialState);

  // 좋아요 버튼을 클릭했을 때, firebase 의 likes & likesCount 수정 로직
  // 🔖 로그인 안된 undefined 상태일 때 로그인 페이지로 이동하는 기능 추가 예정입니다.
  const updateLikes = async () => {
    const postRef = doc(dbService, 'postData', post.id);
    if (isLikesClicked === false) {
      await updateDoc(postRef, {
        likes: [...post.likes, currentUserId],
        likesCount: post.likes.length + 1,
      });
      setIsLikesClicked(true);
    } else {
      await updateDoc(postRef, {
        likes: post.likes.filter((id) => id !== currentUserId),
        likesCount: post.likes.length - 1,
      });
      setIsLikesClicked(false);
    }
  };

  return (
    <PostListCardLayout key={post.id}>
      <div
        className="post-image"
        style={{
          backgroundImage: `url(https://i.pinimg.com/564x/39/43/6c/39436c3a2f88447e3f87bb702368cf7a.jpg)`,
        }}
      />
      <CardContentBox>
        <div
          className="profile-image"
          style={{
            backgroundImage: `url(https://i.pinimg.com/564x/78/c5/4d/78c54def60d50449183cb8161ff78983.jpg)`,
          }}
        />
        <div className="top">
          <h4>{post.userId}</h4>
          <p>1분전</p>
          {/* 🔖 타임스탬프 ~분전 변환 적용 예정입니다. */}
          {/* <p>{post.createdAt}</p> */}
        </div>
        <div className="middle">
          <h3>{post.postTitle}</h3>
          <p>{post.postText}</p>
        </div>
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
      font-size: 0.75rem;
      font-weight: 500;
      color: #868e96;
      margin-bottom: 1.25rem;
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
