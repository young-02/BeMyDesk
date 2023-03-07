import React, { useEffect, useState } from 'react';
import { app, auth, dbService } from '@/shared/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';

import MyPost from '@/components/mypage/contents/MyPost';
import MyScrap from '@/components/mypage/contents/MyScrap';
import MyFollow from '@/components/mypage/contents/MyFollow';
import CategoryButton from '@/components/mypage/CategoryButton';
import ProfileEditModal from '@/components/mypage/ProfileEditModal';
import { getAuth } from 'firebase/auth';
import { AiOutlineSetting } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { useUserInfo } from '../../Hooks/useUserInfo';
import useUserPostList from '../../Hooks/useUserPostList';

type Props = {};

export default function MyPage({}: Props) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [category, setCategory] = useState('myPost');
  const [profileEditModalOpen, setProfileEditModalOpen] = useState(false);
  const currentUserId = auth.currentUser?.uid;

  const {
    isLoading,
    isError,
    error: userInfoError,
    data: userInfo,
  } = useUserInfo(currentUserId);

  const { data: myPost } = useUserPostList(currentUserId);

  const postCount = myPost?.length;
  const scrapCount = userInfo?.scraps?.length;
  const followCount = userInfo?.following.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error!</div>;
  }

  if (user) {
    return (
      <StyledContainer>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {userInfoError.message}</div>}
        <StyledDivButton>
          <CategoryButton
            category={category}
            setCategory={setCategory}
            postCount={postCount}
            scrapCount={scrapCount}
            followCount={followCount}
          />
        </StyledDivButton>
        <StyledDivMain>
          <StyledDivProfile>
            <div>
              <Image
                className="profileImage"
                src={userInfo?.profileImage}
                alt="ProfileImage"
                width={202}
                height={202}
              />
            </div>
            <div className="firstLine">
              <p className="userName">{userInfo?.nickname}</p>
              <p className="nim">님</p>
            </div>
            <div className="secondLine">
              <p className="introduction">{userInfo?.introduction}</p>
            </div>
            <div className="thirdLine">
              <div className="followerDiv">
                <p className="followerLetter">팔로워</p>
                <p className="followerCount">{userInfo?.follower?.length}</p>
              </div>
              <div className="settingIcon">
                <AiOutlineSetting
                  onClick={() => {
                    setProfileEditModalOpen(true);
                  }}
                  size={24}
                />
              </div>
            </div>

            <div>
              {profileEditModalOpen && (
                <ProfileEditModal
                  setProfileEditModalOpen={setProfileEditModalOpen}
                  user={user}
                  profileData={userInfo}
                />
              )}
            </div>
          </StyledDivProfile>

          <StyledDivContents>
            {category === 'myPost' && (
              <MyPost myPost={myPost} postCount={postCount} />
            )}
            {category === 'myScrap' && (
              <MyScrap myScrap={userInfo?.scraps} scrapCount={scrapCount} />
            )}
            {category === 'myFollow' && (
              <MyFollow
                myFollow={userInfo?.following}
                followCount={followCount}
              />
            )}
          </StyledDivContents>
        </StyledDivMain>
      </StyledContainer>
    );
  } else {
    router.push('/auth/sign-in');
    return null;
  }
}

const StyledContainer = styled.div`
  display: flex;
  margin: 108px 360px 0 360px;
  flex-direction: column;
  align-items: center;
`;

const StyledDivButton = styled.div`
  margin: 20px 0px;
  width: 571px;
  height: 54px;
`;

const StyledDivMain = styled.div`
  display: flex;
`;

const StyledDivProfile = styled.div`
  width: 282px;
  height: 424px;
  padding: 40px 40px 0px 40px;
  margin-right: 24px;
  border: 1px solid #868e96;
  border-radius: 10px;

  .profileImage {
    border-radius: 10px;
    margin-bottom: 18px;
  }
  .firstLine {
    display: flex;
    align-items: center;

    .userName {
      /* Pretendard Bold 24 */
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      /* identical to box height, or 133% */

      /* Gray 09 */

      color: #17171c;
    }
    .nim {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      margin-left: 4px;
    }
  }

  .secondLine {
    height: 80px;
    .introduction {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
    margin-bottom: 10px;
  }

  .thirdLine {
    display: flex;
    justify-content: space-between;

    .followerDiv {
      display: flex;
      align-items: center;
      .followerLetter {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height, or 125% */

        /* Gray 05 */

        color: #868e96;
      }
      .followerCount {
        margin-left: 8px;
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height, or 125% */

        color: #000000;
      }
    }

    .settingIcon {
      cursor: pointer;
    }
  }
`;

const StyledDivContents = styled.div`
  width: 894px;
  min-height: 900px;
  flex-direction: column;
`;
