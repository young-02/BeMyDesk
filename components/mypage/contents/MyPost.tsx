import { dbService } from '@/shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';

function MyPost({ myPost, postCount }: any) {
  if (postCount == '0') {
    return (
      <div>
        <p>포스트가 없습니다</p>
      </div>
    );
  } else {
    return (
      <div>
        {myPost.map((post) => (
          <div key={post.documentName} style={{ border: '1px solid black' }}>
            <div>
              {post.Image1 ? (
                <img
                  src={post.Image1}
                  alt="Image1"
                  width={202}
                  height={202}
                  style={{ cursor: 'pointer' }}
                />
              ) : null}
            </div>
            <div>
              {post.Image2 ? (
                <img
                  src={post.Image2}
                  alt="Image2"
                  width={202}
                  height={202}
                  style={{ cursor: 'pointer' }}
                />
              ) : null}
            </div>
            <p style={{ fontWeight: '700' }}>{post.postTitle}</p>
            <p>{post.postText}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default MyPost;
