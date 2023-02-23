import React from 'react';

function MyFollow({ myFollow, followCount }: any) {
  if (followCount == '0') {
    return (
      <div>
        <p>포스트가 없습니다</p>
      </div>
    );
  } else {
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
}
export default MyFollow;
