import React, { useState, useEffect } from 'react';
import DetailViewSlide from './DetailViewSlide';
import DetailViewText from './DetailViewText';
import DetailViewUserInfor from './DetailViewUserInfor';
import useGetPosts from '../Hooks/useGetPosts';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Comment from '../post-list/Comment/Comment';
import DetailViewProducts from './DetailViewProducts';
import { doc, deleteDoc } from 'firebase/firestore';
import { dbService, auth } from '../../shared/firebase';

type Props = {};

export default function DetailView({}) {
  const { posts } = useGetPosts();
  const router = useRouter();
  const { id } = router.query;

  const deletePost = async () => {
    alert('삭제?');
    await deleteDoc(doc(dbService, 'postData', router.query.id));
    router.push('/');
  };

  return (
    <>
      {posts?.map(
        (detail: PostType) =>
          id == detail.id && (
            <DetailViewLayout key={detail.id}>
              <div className="detail-header">
                {auth.currentUser?.uid === detail.userId && (
                  <>
                    <button onClick={deletePost}>삭제</button>
                    <button>수정</button>
                  </>
                )}

                <DetailViewUserInfor detail={detail} />
              </div>
              <DetailViewDiv>
                <div className="detail-view">
                  <DetailViewSlide detail={detail} />
                  <DetailViewText detail={detail} />
                  <Comment path={`postData/${id}/comments`} />
                </div>
                <div className="detail-product">
                  <DetailViewProducts detail={detail} />
                </div>
              </DetailViewDiv>
            </DetailViewLayout>
          ),
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
