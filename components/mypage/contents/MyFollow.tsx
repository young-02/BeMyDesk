import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

function MyFollow({ myFollow, followCount }: any) {
  if (followCount == '0') {
    return (
      <div>
        <Image
          src="/images/QuestionMark.png"
          alt="QuestionMark"
          width={48}
          height={48}
        />
        <p> 팔로우한 유저가 없어요</p>
        <p> 마음에 드는 유저를 팔로우 해보세요 </p>
      </div>
    );
  } else {
    return (
      <>
        {myFollow.map((profile) => (
          <div key={profile.id} style={{ border: '1px solid black' }}>
            <div>
              <img
                src={profile.profileImage}
                alt="Image"
                width={202}
                height={202}
              />
            </div>
            <p style={{ fontWeight: '700' }}>{profile.nickname}</p>
            <p>{profile.introduction}</p>
            <p>{profile.userId}</p>
          </div>
        ))}
      </>
    );
  }
}

const StyledContainer = styled.div`
  display: flex;
  width: 894px;
  height: 197px;
`;

export default MyFollow;
