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

export default function DetailView({}) {
  const router = useRouter();
  const postId = router.query.id;
  const queryClient = useQueryClient();

  const { isLoading, isError, data: post, error } = usePost(postId);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const deletePost = async () => {
    await deleteDoc(doc(dbService, `postData/${postId}`));
    queryClient.removeQueries('post-list');
    router.push('/post-list');
  };

  const updatePost = async () => {
    router.push(`/detail/write/${postId}/edit`);
  };

  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 820,
    minWidth: 821,
  });

  return (
    <>
      {isLoading && <DetailViewLayout>Loading...</DetailViewLayout>}
      {isError && <DetailViewLayout>Error: {error.message}</DetailViewLayout>}
      {post && (
        <DetailViewLayout>
          <div className="detail-header">
            {auth.currentUser?.uid === post?.userId && (
              <>
                <button onClick={() => setIsDelete((prev) => !prev)}>
                  삭제
                </button>
                <button onClick={() => setIsEdit((prev) => !prev)}>수정</button>
              </>
            )}
            {isEdit && (
              <CustomModal title="Edit" description="글을 수정하시겠습니까?">
                <div className="buttonWrap">
                  <CustomButton
                    paddingRow="0"
                    paddingColumns="0.5"
                    backgroundColor="#F83E4B"
                    fontColor="#fff"
                    onClick={updatePost}
                  >
                    수정
                  </CustomButton>
                  <CustomButton
                    paddingRow="0"
                    paddingColumns="0.5"
                    backgroundColor="#fff"
                    fontColor="#868E96"
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    취소
                  </CustomButton>
                </div>
              </CustomModal>
            )}

            {isDelete && (
              <CustomModal title="Delete" description="정말 삭제하시겠습니까?">
                <div className="buttonWrap">
                  <CustomButton
                    paddingRow="0"
                    paddingColumns="0.5"
                    backgroundColor="#F83E4B"
                    fontColor="#fff"
                    onClick={deletePost}
                  >
                    삭제
                  </CustomButton>
                  <CustomButton
                    paddingRow="0"
                    paddingColumns="0.5"
                    backgroundColor="#fff"
                    fontColor="#868E96"
                    onClick={() => setIsDelete((prev) => !prev)}
                  >
                    취소
                  </CustomButton>
                </div>
              </CustomModal>
            )}
            {isEdit && (
              <CustomModal title="Edit" description="글을 수정하시겠습니까?">
                <div className="buttonWrap">
                  <CustomButton
                    paddingRow="0"
                    paddingColumns="0.5"
                    backgroundColor="#F83E4B"
                    fontColor="#fff"
                    onClick={updatePost}
                  >
                    수정
                  </CustomButton>
                  <CustomButton
                    paddingRow="0"
                    paddingColumns="0.5"
                    backgroundColor="#fff"
                    fontColor="#868E96"
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    취소
                  </CustomButton>
                </div>
              </CustomModal>
            )}

            {isDelete && (
              <CustomModal title="Delete" description="정말 삭제하시겠습니까?">
                <div className="buttonWrap">
                  <CustomButton
                    paddingRow="0"
                    paddingColumns="0.5"
                    backgroundColor="#F83E4B"
                    fontColor="#fff"
                    onClick={deletePost}
                  >
                    삭제
                  </CustomButton>
                  <CustomButton
                    paddingRow="0"
                    paddingColumns="0.5"
                    backgroundColor="#fff"
                    fontColor="#868E96"
                    onClick={() => setIsDelete((prev) => !prev)}
                  >
                    취소
                  </CustomButton>
                </div>
              </CustomModal>
            )}

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
      padding: 0 1rem;
    }
  }
`;
