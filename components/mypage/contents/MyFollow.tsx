import React from 'react';

function MyFollow({ myFollow }: any) {
  return (
    <div>
      {myFollow.map((profile) => (
        <div key={profile.documentName} style={{ border: '1px solid black' }}>
          <p style={{ fontWeight: '700' }}>{profile.introduction}</p>
          <p>{profile.userId}</p>
        </div>
      ))}
    </div>
  );
}

export default MyFollow;
