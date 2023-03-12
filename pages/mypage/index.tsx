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

import { AiOutlineSetting } from 'react-icons/ai';

import { useUserInfo } from '../../Hooks/useUserInfo';
import useUserPostList from '../../Hooks/useUserPostList';
import useCheckUser from '@/Hooks/useCheckUser';
import HeadSeo from '@/components/ui/HeadSeo';

import { useMediaQuery } from 'react-responsive';
import useResponsive from '@/Hooks/useResponsive';

type Props = {};

export default function MyPage({}: Props) {
  useCheckUser();
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

  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 1000,
    minWidth: 1001,
  });
  if (loading) {
    return <StyledContainer></StyledContainer>;
  }

  if (error) {
    return (
      <StyledContainer>
        <div>에러메세지: {error.message}</div>
      </StyledContainer>
    );
  }

  if (user) {
    return (
      <>
        {isDesktop && (
          <StyledContainer>
            <HeadSeo title={'마이페이지 | be-my-desk'} />
            {isLoading && <div></div>}
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
                    <p className="followerCount">
                      {userInfo?.follower?.length
                        ? userInfo.follower.length
                        : '0'}
                    </p>
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
                  <MyPost
                    myPost={myPost}
                    postCount={postCount}
                    currentUserId={currentUserId}
                  />
                )}
                {category === 'myScrap' && (
                  <MyScrap
                    userInfo={userInfo}
                    scrapCount={scrapCount}
                    currentUserId={currentUserId}
                  />
                )}
                {category === 'myFollow' && (
                  <MyFollow userInfo={userInfo} followCount={followCount} />
                )}
              </StyledDivContents>
            </StyledDivMain>
          </StyledContainer>
        )}

        {/* //모바일 */}
        {isMobile && (
          <MobileStyledContainer>
            <div className="profileDiv">
              <div className="profileLeft">
                <div>
                  <Image
                    className="profileImage"
                    src={userInfo?.profileImage}
                    alt="ProfileImage"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="followerDiv">
                  <p className="followerLetter">팔로워</p>
                  <p className="followerCount">
                    {userInfo?.follower?.length
                      ? userInfo.follower.length
                      : '0'}
                  </p>
                </div>
              </div>
              <div className="profileRight">
                <div className="firstLine">
                  <p className="userName">{userInfo?.nickname}</p>
                  <p className="nim">님</p>
                  <div className="settingIcon">
                    <AiOutlineSetting
                      onClick={() => {
                        setProfileEditModalOpen(true);
                      }}
                      size={24}
                    />
                  </div>
                </div>
                <div className="secondLine">
                  <p className="introduction">{userInfo?.introduction}</p>
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
              </div>
            </div>
            <CategoryButton
              category={category}
              setCategory={setCategory}
              postCount={postCount}
              scrapCount={scrapCount}
              followCount={followCount}
            />
            <div className="contentsDiv">
              {category === 'myPost' && (
                <MyPost
                  myPost={myPost}
                  postCount={postCount}
                  currentUserId={currentUserId}
                />
              )}
              {category === 'myScrap' && (
                <MyScrap
                  userInfo={userInfo}
                  scrapCount={scrapCount}
                  currentUserId={currentUserId}
                />
              )}
              {category === 'myFollow' && (
                <MyFollow userInfo={userInfo} followCount={followCount} />
              )}
            </div>
          </MobileStyledContainer>
        )}
      </>
    );
  } else {
    router.push('/auth/sign-in');
    return null;
  }
}

const MobileStyledContainer = styled.div`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .profileDiv {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 0 20px;
    margin: 0 24px;
    .profileImage {
      border-radius: 10px;
      margin-bottom: 7px;
    }
    .profileLeft {
      .followerDiv {
        display: flex;
        align-items: center;
        .followerLetter {
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

          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          /* identical to box height, or 125% */

          color: #000000;
        }
      }
    }
    .profileRight {
      margin-left: 20px;
    }

    .firstLine {
      margin-top: 5px;
      display: flex;
      align-items: center;

      .userName {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 20px;
        /* identical to box height, or 100% */

        /* Gray 09 */

        color: #17171c;
      }
      .nim {
        margin-left: 5px;
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height, or 125% */

        text-align: center;

        /* Gray 09 */

        color: #17171c;
      }
      .settingIcon {
        /* margin-left: 7px; */
        padding-left: 0.5rem;
        padding-top: 3px;
        cursor: pointer;
        :hover {
          opacity: 50%;
        }
      }
    }

    .secondLine {
      margin-top: 8px;
      height: 40px;
      width: 230px;

      .introduction {
        /* Pretendard Medium 12 */
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        /* or 133% */

        /* Gray 09 */

        color: #17171c;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; /* for WebKit browsers */
        -webkit-line-clamp: 2; /* show only two lines */
        -webkit-box-orient: vertical; /* for WebKit browsers */
        white-space: normal; /* allow line breaks */
      }
    }
  }
  .contentsDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    min-height: 600px;
  }
`;

// 모바일끝

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

      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      /* identical to box height, or 133% */

      /* Gray 09 */

      color: #17171c;
    }
    .nim {
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
      height: 80px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
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
      :hover {
        opacity: 50%;
      }
    }
  }
`;

const StyledDivContents = styled.div`
  width: 894px;
  min-height: 900px;
  flex-direction: column;
`;
