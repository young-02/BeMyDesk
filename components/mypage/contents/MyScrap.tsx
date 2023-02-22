import React from 'react';

function MyScrap({ myScrap }: any) {
  return (
    <div>
      {myScrap.map((post) => (
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

export default MyScrap;
