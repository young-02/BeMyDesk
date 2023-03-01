import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
type Props = {};

export default function PostListItem({ post }) {
  return (
    <div style={{ border: '1px solid red' }}>
      <Link href={`/post-list/${post.id}`}>
        <Image src={post.postImage1} alt="post.postTitle" />
        <p>{post.postId}</p>
        <div>{post.jobCategory}</div>
        <p>{post.postTitle}</p>
        <p>{post.postText}</p>
      </Link>
    </div>
  );
}
