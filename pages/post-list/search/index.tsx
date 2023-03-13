import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { dbService } from '../../../shared/firebase';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import PostListCard from '../../../components/post-list/PostListCard';
import PostListFilterBar from '../../../components/PostListFilterBar';
import CustomError from '@/components/ui/error/CustomError';

export default function PostList() {
  const router = useRouter();
  const { term } = router.query;
  const [searchList, setSearchList] = useState([]);

  // 현재 로그인한 유저 정보 가져오기
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    // 전체필터 적용한 포스트 리스트 READ
    const defaultFilter = query(
      collection(dbService, 'postData'),
      orderBy('createdAt', 'desc'),
    );
    onSnapshot(defaultFilter, (snapshot) => {
      const postData: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // 검색으로 거르기 (제목, 글)
      const filteredList: any[] = [];
      postData.map((post: PostType) => {
        if (post.postTitle.includes(term)) {
          filteredList.push(post);
        } else if (post.postText.includes(term)) {
          filteredList.push(post);
        } else {
          return;
        }
      });

      setSearchList(filteredList);
    });
  }, [term]);

  return (
    <PostListLayout>
      <Header>
        <PostListFilterBar />
      </Header>
      <PostListBox>
        {searchList.length === 0 && (
          <CustomError title="검색 결과가 없어요" errorMessage={`" ${term} "`}>
            <div>
              <p>필터를 삭제하거나</p> <p>다른 검색어를 입력해 주세요</p>
            </div>
          </CustomError>
        )}
        {searchList?.map((post) => (
          <PostListCard
            key={post.id}
            post={post}
            currentUserId={currentUserId}
          />
        ))}
      </PostListBox>
    </PostListLayout>
  );
}

const PostListLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 75vh;
  margin-top: 8rem;
  overflow-x: hidden;
`;

const Header = styled.div`
  position: fixed;
  top: 0rem;
  left: 50%;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
`;

const PostListBox = styled.div`
  display: flex;
  margin-top: 1.25rem;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75rem;
  padding-bottom: 2rem;
  gap: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
