import styled from 'styled-components';
import { useRouter } from 'next/router';
import PostListFilterBar from '../../components/PostListFilterBar';
import PostListCard from '../../components/post-list/PostListCard';
import useFilter from '../../Hooks/useFilter';
import SignUpModal from '@/components/post-list/SignUpModal';
import { useEffect, useState } from 'react';
import HeadSeo from '@/components/ui/HeadSeo';
import CustomError from '@/components/ui/error/CustomError';
import SkeletonPostCard from '@/components/ui/skeleton/SkeletonPostCard';
import Skeleton from '@/components/ui/skeleton/Skeleton';

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
      <HeadSeo title="포스트 | 내가 꾸민 데스크테리어 자랑 커뮤니티" />
      <SignUpModal isModalOn={isModalOn} setIsModalOn={setIsModalOn} />
      <Header>
        <PostListFilterBar />
      </Header>
      {isLoading && (
        <Skeleton>
          {new Array(8).fill('').map((_, i) => (
            <SkeletonPostCard />
          ))}
        </Skeleton>
      )}
      {isError && <div>Error: {error.message}</div>}
      <PostListBox>
        {postList?.map((post) => (
          <PostListCard key={post.id} post={post} />
        ))}
        {postList?.length === 0 && (
          <CustomError title="필터 결과가 없어요!">
            <p>필터를 삭제하거나</p> <p>다른 검색어를 입력해 주세요</p>
          </CustomError>
        )}
      </PostListBox>
    </PostListLayout>
  );
}

const PostListLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  margin-top: 8rem;
  margin-bottom: 4em;
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
  @media (max-width: 1200px) {
    padding: 0 1.25rem;
  }
`;

const SkeletonWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1200px;
  width: 100%;
`;
