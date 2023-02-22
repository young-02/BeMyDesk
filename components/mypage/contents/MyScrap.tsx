import React from 'react';

function MyScrap({ myScrap }: any) {
  return (
    <div>
      {myScrap.map((post) => (
        <div style={{ border: '1px solid black' }}>
          <p style={{ fontWeight: '700' }}>{post.postTitle}</p>
          <p>{post.postText}</p>
        </div>
      ))}
    </div>
  );
}

export default MyScrap;
