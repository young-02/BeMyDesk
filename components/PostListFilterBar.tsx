import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PostListFilterBar = () => {
  const router = useRouter();
  const { pathname } = router;
  // console.log('router', router);

  // filter 상태관리
  const [filter, setFilter] = useState('');

  return (
    <PostListFilterBarLayout>
      <FilterButton href="/post-list">전체</FilterButton>
      <FilterButton href="/post-list?order=popular">트렌드</FilterButton>
      <FilterButton href="/post-list?order=category">직업별</FilterButton>
    </PostListFilterBarLayout>
  );
};

export default PostListFilterBar;

const PostListFilterBarLayout = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  gap: 1.875rem;
  padding-left: 21rem;
  margin-bottom: 0.625rem;
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-weight: 500;
  background-color: white;
  color: black;
`;

const FilterButton = styled(Link)`
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  :hover {
    font-weight: 700;
  }
`;
