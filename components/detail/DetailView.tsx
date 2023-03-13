import React, { useState, useEffect } from 'react';
import DetailViewSlide from './DetailViewSlide';
import DetailViewText from './DetailViewText';
import DetailViewUserInfor from './DetailViewUserInfor';
import useGetPosts from '../../Hooks/useGetPosts';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Comment from '../post-list/Comment/Comment';
import DetailViewProducts from './DetailViewProducts';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { dbService, auth } from '../../shared/firebase';
import { usePost } from '../../Hooks/usePost';
import { QueryClient, useQueryClient } from 'react-query';
import CustomModal from '../ui/CustomModal';
import CustomButton from '../ui/CustomButton';
import useResponsive from '@/Hooks/useResponsive';
import { logEvent } from '@/amplitude/amplitude';
import Image from 'next/image';
import Skeleton from '../ui/skeleton/Skeleton';
import SkeletonPostCard from '../ui/skeleton/SkeletonPostCard';
import SkeletonDetail from '../ui/skeleton/SkeletonDetail';
import PostListFilterBar from '../PostListFilterBar';

export default function DetailView({}) {
  const router = useRouter();
  const postId = router.query.id;
  // const queryClient = useQueryClient();

  const { isLoading, isError, data: post, error } = usePost(postId);

  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 820,
    minWidth: 821,
  });

  return (
    <>
      {isLoading && (
        <Skeleton>
          <SkeletonDetail />
        </Skeleton>
      )}
      {isError && <DetailViewLayout>Error: {error.message}</DetailViewLayout>}
      {post && (
        <DetailViewLayout>
          {isMobile && (
            <Header>
              <PostListFilterBar />
            </Header>
          )}
          <div className="detail-header">
            <DetailViewUserInfor post={post} />
          </div>
          <DetailViewDiv>
            <div className="detail-view">
              <DetailViewSlide post={post} />
              <DetailViewText post={post} />
              {isMobile && (
                <div className="detail-product">
                  <DetailViewProducts post={post} />
                </div>
              )}
              <Comment path={`postData/${postId}/comments`} />
            </div>
            {isDesktop && (
              <div className="detail-product">
                <DetailViewProducts post={post} />
              </div>
            )}
          </DetailViewDiv>
        </DetailViewLayout>
      )}
    </>
  );
}

const DetailViewLayout = styled.div`
  max-width: 75rem;
  width: 100%;
  margin: 8rem auto;

  .detail-header {
    width: 70%;
    max-width: 55.875rem;

    @media (max-width: 820px) {
      width: 100%;
    }

    .modify {
      position: relative;
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 1200px) {
    padding: 0 1.25rem;
  }
`;

const DetailViewDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 820px) {
    flex-direction: column;
  }

  .detail-view {
    width: 70%;
    max-width: 55.875rem;

    @media (max-width: 820px) {
      width: 100%;
    }
  }

  .detail-product {
    max-width: 20.125rem;
    width: 40%;
    background-color: #f1f3f5;
    padding: 1.25rem;
    border-radius: 0.625rem;

    @media (max-width: 820px) {
      width: 100%;
      min-width: 100%;
      background-color: #fff;
      padding: 0;
    }
  }
`;
const Header = styled.div`
  position: fixed;
  top: 0rem;
  left: 50%;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  transform: translateX(-50%);
`;
