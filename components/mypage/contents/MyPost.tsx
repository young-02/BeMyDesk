import { dbService } from '@/shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';

function MyPost({ myPost }: any) {
  return (
    <div>
      {myPost.map((post) => (
        <div style={{ border: '1px solid black' }}>
          <p style={{ fontWeight: '700' }}>{post.postTitle}</p>
          <p>{post.postText}</p>
        </div>
      ))}
    </div>
  );
}

export default MyPost;
