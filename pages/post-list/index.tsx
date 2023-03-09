import styled from 'styled-components';
import { useRouter } from 'next/router';
import PostListFilterBar from '../../components/PostListFilterBar';
import PostListCard from '../../components/PostListCard';
import useFilter from '../../Hooks/useFilter';

import SignUpModal from '@/components/post-list/SignUpModal';
import { useEffect, useState } from 'react';

export default function PostList() {
  // 현재 페이지의 query 값을 가져옵니다.
  const router = useRouter();

  const { query: currentQuery }: any = router;
  const { isLoading, isError, data: postList, error } = useFilter(currentQuery);

  const [isModalOn, setIsModalOn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isSignUpRoute')) {
      setIsModalOn(true);
    }

    return () => {
      setIsModalOn(false);
      localStorage.clear();
    };
  }, []);

  return (
    <PostListLayout>
      <SignUpModal isModalOn={isModalOn} setIsModalOn={setIsModalOn} />
      <Header>
        <PostListFilterBar />
      </Header>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      <PostListBox>
        {postList?.map((post) => (
          <PostListCard key={post.id} post={post} />
        ))}
      </PostListBox>
    </PostListLayout>
  );
}

const PostListLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100vw; */
  height: 100vh;
  margin-top: 8rem;
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

const PostListBox = styled.div`
  display: flex;
  margin-top: 1.25rem;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 75rem;
  width: 100%;
  height: fit-content;
  padding-bottom: 2rem;
  gap: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
