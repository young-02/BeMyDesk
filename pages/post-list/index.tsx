import React from 'react';
import useGetPosts from '../../components/Hooks/useGetPosts';

import PostListItem from '@/components/post-list/PostListItem';

export default function index({}) {
  const { posts } = useGetPosts();
  
  return (
    <div style={{ display: 'flex', gap: 20, padding: 20, flexWrap: 'wrap' }}>
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
    </div>
  );
}
