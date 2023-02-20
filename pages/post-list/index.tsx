import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  doc,
  where,
} from 'firebase/firestore';
import { dbService } from '../../shared/firebase';
import styled from 'styled-components';
import PostListCard from '@/components/PostListCard';
import GlobalNavigationBar from '../../components/GlobalNavigationBar';
import PostListFilterBar from '../../components/PostListFilterBar';
import ProductsList from '../../components/ProductsList';
import PostListItem from '@/components/post-list/PostListItem';

export default function PostList() {
  // 🔖 로그인 기능과 합쳐지면, userId 초기값을 UID 로 변경합니다.
  const [postList, setPostList] = useState<PostType[]>();
  const [userId, setUserId] = useState('좋아요봇');

  // 🔖 임시 구현한 검색창 검색어를 상태관리합니다.
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  // READ post-list
  useEffect(() => {
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
      where('jobCategory', '==', '디자이너'),
      orderBy('createdAt', 'desc'),
    );
    onSnapshot(jobFilter, (snapshot) => {
      const postData: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostList(postData);
    });
  }, []);

  return (
    <PostListLayout>
      <Header>
        <PostListFilterBar />
      </Header>
      <PostListBox>
        {postList?.map((post) => (
          <PostListCard key={post.id} post={post} currentUserId={userId} />
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
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Header = styled.div`
  position: sticky;
  top: 0rem;
  z-index: 1;
`;

const PostListBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75rem;
  padding-bottom: 2rem;
  gap: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
