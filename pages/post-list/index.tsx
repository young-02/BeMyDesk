import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { dbService } from '../../shared/firebase';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import PostListFilterBar from '../../components/PostListFilterBar';
import PostListCard from '../../components/PostListCard';

export default function PostList() {
  const [postList, setPostList] = useState<PostType[]>();

  // 현재 로그인한 유저 정보 가져오기
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;
  console.log('currentUserId', currentUserId);

  // 🔖 현재 페이지의 query 값을 가져옵니다.
  const router = useRouter();
  const { query: currentQuery } = router;
  const order = currentQuery.order;
  const select =
    currentQuery.select === 'developer'
      ? '개발자'
      : currentQuery.select === 'designer'
      ? '디자이너'
      : currentQuery.select === 'student'
      ? '학생'
      : '게이머';

  // 전체 필터 - 최신순
  const defaultFilter = query(
    collection(dbService, 'postData'),
    orderBy('createdAt', 'desc'),
  );
  // 트렌드 필터 - 좋아요순 + 최신순
  const trendFilter = query(
    collection(dbService, 'postData'),
    orderBy('likesCount', 'desc'),
    orderBy('createdAt', 'desc'),
  );
  // 직업별 필터 - 직업별 + 최신순
  const jobFilter = query(
    collection(dbService, 'postData'),
    where('jobCategory', '==', `${select}`),
    orderBy('createdAt', 'desc'),
  );

  // READ post-list
  useEffect(() => {
    // 포스트리스트 필터정보 확인
    const filter =
      order == 'popular'
        ? trendFilter
        : order == 'category'
        ? jobFilter
        : defaultFilter;

    // 필터 적용한 포스트 리스트 READ
    onSnapshot(filter, (snapshot) => {
      const postData: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostList(postData);
    });
  }, [currentQuery]);

  return (
    <PostListLayout>
      <Header>
        <PostListFilterBar />
      </Header>
      <PostListBox>
        {postList?.map((post) => (
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
  width: 100vw;
  margin-top: 8rem;
  overflow-x: hidden;
`;

const Header = styled.div`
  position: fixed;
  top: 0rem;
  z-index: 1;
`;

const PostListBox = styled.div`
  display: flex;
  margin-top: 1.25rem;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75rem;
  height: fit-content; //
  padding-bottom: 2rem;
  gap: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
