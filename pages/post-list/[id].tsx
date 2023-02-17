import Comment from '@/components/post-list/Comment/Comment';
import { uuidv4 } from '@firebase/util';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useGetPosts from '../../components/Hooks/useGetPosts';
import Link from 'next/link';
import PostListItem from '@/components/post-list/PostListItem';

export default function PostList({}) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div> post:{id}</div>
      <Comment path={`postData/${id}/comments`} />
    </>
  );
}
