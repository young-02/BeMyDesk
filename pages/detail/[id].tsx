import Comment from '@/components/post-list/Comment/Comment';
import React from 'react';
import { useRouter } from 'next/router';
import DetailView from '@/components/detail/DetailView';

export default function PostList({}) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <DetailView />
    </>
  );
}
