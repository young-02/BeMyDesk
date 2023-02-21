import useGetPosts from '@/components/Hooks/useGetPosts';
import PostListCard from '@/components/PostListCard';
import React from 'react';
import styled from 'styled-components';

type Props = {};

export default function index({}: Props) {
  const { posts } = useGetPosts();

  return (
    <PostListWrapper>
      {posts.map((post) => (
        <PostListCard key={post.id} post={post} currentUserId={post.userId} />
      ))}
    </PostListWrapper>
  );
}

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
