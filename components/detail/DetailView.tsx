import React, { useState, useEffect } from 'react';
import DetailViewSlide from './DetailViewSlide';
import DetailViewText from './DetailViewText';
import DetailViewUserInfor from './DetailViewUserInfor';
import useGetPosts from '../Hooks/useGetPosts';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Comment from '../post-list/Comment/Comment';
import DetailViewProducts from './DetailViewProducts';

type Props = {};

export default function DetailView({}) {
  const { posts } = useGetPosts();
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {posts.map(
        (detail) =>
          id == detail.id && (
            <DetailViewLayout key={detail.id}>
              <div className="detail-view">
                <DetailViewUserInfor detail={detail} />
                <DetailViewSlide detail={detail} />
                <DetailViewText detail={detail} />
                <Comment path={`postData/${id}/comments`} />
              </div>
              <div className="detail-product">
                <DetailViewProducts detail={detail} />
              </div>
            </DetailViewLayout>
          ),
      )}
    </>
  );
}

const DetailViewLayout = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;

  .detail-view {
    width: 100%;
    max-width: 55.875rem;
  }
  .detail-product {
    width: calc(100% - 55.875rem);
  }
`;
