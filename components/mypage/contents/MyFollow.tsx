import React from 'react';

function MyFollow({ myFollow }: any) {
  return (
    <div>
      {myFollow.map((profile) => (
        <div key={profile.documentName} style={{ border: '1px solid black' }}>
          <div>
            <img
              src={profile.profileImage}
              alt="Image"
              width={202}
              height={202}
            />
          </div>
          <p>{profile.nickname}</p>
          <p style={{ fontWeight: '700' }}>{profile.introduction}</p>
          <p>{profile.userId}</p>
        </div>
      ))}
    </div>
  );
}

export default MyFollow;
