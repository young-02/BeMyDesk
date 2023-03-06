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

type Props = {};

export default function DetailView({}) {
  const router = useRouter();
  const postId = router.query.id;
  const queryClient = useQueryClient();

  const { isLoading, isError, data: post, error } = usePost(postId);

  const deletePost = async () => {
    alert('삭제?');
    await deleteDoc(doc(dbService, `postData/${postId}`));
    queryClient.removeQueries('post-list');
    router.push('/post-list');
  };

  const updatePost = async () => {
    alert('수정?');
    router.push(`/detail/write/${postId}/edit`);
  };

  return (
    <>
      {isLoading && <DetailViewLayout>Loading...</DetailViewLayout>}
      {isError && <DetailViewLayout>Error: {error.message}</DetailViewLayout>}
      {post && (
        <DetailViewLayout>
          <div className="detail-header">
            {auth.currentUser?.uid === post?.userId && (
              <>
                <button onClick={deletePost}>삭제</button>
                <button onClick={updatePost}>수정</button>
              </>
            )}

            <DetailViewUserInfor post={post} />
          </div>
          <DetailViewDiv>
            <div className="detail-view">
              <DetailViewSlide post={post} />
              <DetailViewText post={post} />
              <Comment path={`postData/${postId}/comments`} />
            </div>
            <div className="detail-product">
              <DetailViewProducts post={post} />
            </div>
          </DetailViewDiv>
        </DetailViewLayout>
      )}
    </>
  );
}

const DetailViewLayout = styled.div`
  max-width: 75rem;
  width: 100%;
  margin: 9.25rem auto;

  .detail-header {
    width: 100%;
    max-width: 55.875rem;
  }
`;

const DetailViewDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;

  .detail-view {
    width: 100%;
    max-width: 55.875rem;
  }

  .detail-product {
    width: calc(100% - 55.875rem);
    background-color: #f1f3f5;
    padding: 1.25rem;
    border-radius: 0.625rem;
  }
`;
