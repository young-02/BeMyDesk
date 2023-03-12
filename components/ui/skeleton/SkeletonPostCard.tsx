import React from 'react';
import styled from 'styled-components';

import { ImgLayout, Layout35, Layout50, Layout80 } from './Skeleton';

const SkeletonPostCard = ({ post }: { post: PostType }) => {
  return (
    <PostListCardLayout>
      <div className="post">
        <div className="profile-image-wrap">
          <ImgLayout className="post-image skeleton animate-pulse" />
        </div>
        <CardContentBox>
          <ImgLayout className="profile-image skeleton animate-pulse" />

          <div className="top">
            <Layout35 className="skeleton animate-pulse" />
            <Layout50 />
          </div>

          <div className="middle">
            <Layout50 className="skeleton animate-pulse" />
            <Layout80 className="skeleton animate-pulse" />
          </div>

          <div className="bottom">
            <Layout35 className="skeleton animate-pulse" />
            <div>
              <div className="post-image skeleton animate-pulse" />
            </div>
          </div>
        </CardContentBox>
      </div>
    </PostListCardLayout>
  );
};

export default SkeletonPostCard;

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
    margin-bottom: 0.625rem;
  }

  .middle {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
  }
`;
