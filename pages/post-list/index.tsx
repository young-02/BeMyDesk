import { getAuth } from 'firebase/auth';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import PostListFilterBar from '../../components/PostListFilterBar';
import PostListCard from '../../components/PostListCard';
import useFilter from '../../Hooks/useFilter';

export default function PostList() {
  // 현재 로그인한 유저 정보 가져오기
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;

  // 현재 페이지의 query 값을 가져옵니다.
  const router = useRouter();
  const { query: currentQuery }: any = router;
  const { isLoading, isError, data: postList, error } = useFilter(currentQuery);

  return (
    <PostListLayout>
      <Header>
        <PostListFilterBar />
      </Header>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
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
  height: fit-content;
  padding-bottom: 2rem;
  gap: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
