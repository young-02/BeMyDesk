import React from 'react';
import Link from 'next/link';
type Props = {};

export default function PostListItem({ post }) {
  return (
    <div style={{ border: '1px solid red' }}>
      <Link href={`/post-list/${post.id}`}>
        <img src={post.postImage1} />
        <p>{post.postId}</p>
        <div>{post.jobCategory}</div>
        <p>{post.postTitle}</p>
        <p>{post.postText}</p>
      </Link>
    </div>
  );
}
