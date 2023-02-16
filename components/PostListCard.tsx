import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import likesIcon from '../public/images/likesIcon.png';

type Props = {};

const PostListCard = ({ post }) => {
  const likes = post.likes;
  return (
    <PostListCardLayout key={post.id}>
      <div
        className="post-image"
        style={{
          backgroundImage: `url(https://i.pinimg.com/564x/39/43/6c/39436c3a2f88447e3f87bb702368cf7a.jpg)`,
        }}
      />
      <CardContentArea>
        <div
          className="profile-image"
          style={{
            backgroundImage: `url(https://i.pinimg.com/564x/78/c5/4d/78c54def60d50449183cb8161ff78983.jpg)`,
          }}
        />
        <div className="top">
          <h4>{post.userId}</h4>
          <p>1분전</p>
          {/* <p>{post.createdAt}</p> */}
        </div>
        <div className="middle">
          <h3>{post.postTitle}</h3>
          <p>{post.postText}</p>
        </div>
        <div className="bottom">
          <p>학생의 책상</p>
          <div>
            <Image src={likesIcon} alt="likes-icon" width={10} />
            <p>{likes.length}</p>
          </div>
        </div>
      </CardContentArea>
    </PostListCardLayout>
  );
};

export default PostListCard;

const PostListCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
  height: 24.6rem;
  gap: 0.5rem;
  border-radius: 0.625rem;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .post-image {
    width: 100%;
    height: 16rem;
    background-size: 18rem;
    background-position: center center;
    border-radius: 0.625rem 0.625rem 0rem 0rem;
  }
`;

const CardContentArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  padding: 1.25rem;
  font-family: 'Pretendard Variable';

  .profile-image {
    position: absolute;
    top: -20%;
    left: 10%;
    width: 2.125rem;
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
