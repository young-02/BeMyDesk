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
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { AiOutlineSetting } from 'react-icons/ai';

type Props = {};

export default function MyPage({}: Props) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [category, setCategory] = useState('myPost');
  const [myPost, setMyPost] = useState([]);
  const [myScrap, setMyScrap] = useState([]);
  const [myFollow, setMyFollow] = useState([]);
  const [profileEditModalOpen, setProfileEditModalOpen] = useState(false);
  const postCount = myPost.length;
  const scrapCount = myScrap.length;
  const followCount = myFollow.length;

  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      return;
    }
    // 유저정보 문서 가져오기
    const fetchUserDataHandler = async () => {
      const docRef = doc(dbService, 'userInfo', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedProfile = docSnap.data();
        setProfileData(docSnap.data());
        // 마이 포스트 불러오기 (getdocs로 리팩토링 추천)
        onSnapshot(
          query(collection(dbService, 'postData'), where('userId', '==', uid)),
          (snapshot) => {
            const fetchedMyPostData = snapshot.docs.map((doc) => ({
              ...doc.data(),
            }));
            setMyPost(fetchedMyPostData);
            console.log('마이포스트 데이터 불러오기 완료');
          },
        );
        // 스크랩한 글 가져오기 (getdocs로 리팩토링 추천)
        if (fetchedProfile.scraps && fetchedProfile.scraps.length > 0) {
          onSnapshot(
            query(
              collection(dbService, 'postData'),
              where('__name__', 'in', fetchedProfile.scraps),
            ),
            (snapshot) => {
              const fetchedScrapData = snapshot.docs.map((doc) => ({
                ...doc.data(),
              }));
              setMyScrap(fetchedScrapData);
              console.log('스크랩 데이터 불러오기 완료');
            },
          );
        }
        // 팔로우 유저 가져오기 (getdocs로 리팩토링 추천)
        if (fetchedProfile.following && fetchedProfile.following.length > 0) {
          onSnapshot(
            query(
              collection(dbService, 'userInfo'),
              where('__name__', 'in', fetchedProfile.following),
            ),
            (snapshot) => {
              const fetchedFollowingData = snapshot.docs.map((doc) => ({
                ...doc.data(),
              }));
              setMyFollow(fetchedFollowingData);
              console.log('팔로우 유저 데이터 불러오기 완료');
            },
          );
        }
      } else {
        console.log('No such document!');
      }
    };

    fetchUserDataHandler();
  }, [auth.currentUser]);

  if (loading) {
    return <div>로딩중입니다...</div>;
  }

  if (error) {
    return <div>에러메세지: {error.message}</div>;
  }

  if (user) {
    return (
      <StyledContainer>
        {/* <div>
          {' '}
          <button onClick={() => auth.signOut()}>로그아웃</button>
          <button onClick={() => console.log('유저정보', user)}>
            유저정보 보기
          </button>
        </div> */}
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
              <img
                className="profileImage"
                src={user.photoURL}
                alt="ProfileImage"
                width={202}
                height={202}
              />
            </div>
            <div className="firstLine">
              <p className="userName">{user.displayName}</p>
              <p className="nim">님</p>
            </div>
            <div className="secondLine">
              <p className="introduction">{profileData.introduction}</p>
            </div>
            <div className="thirdLine">
              <div className="followerDiv">
                <p className="followerLetter">팔로워</p>
                <p className="followerCount">3</p>
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
                  profileData={profileData}
                />
              )}
            </div>
          </StyledDivProfile>

          <StyledDivContents>
            {category === 'myPost' && (
              <MyPost myPost={myPost} postCount={postCount} />
            )}
            {category === 'myScrap' && (
              <MyScrap myScrap={myScrap} scrapCount={scrapCount} />
            )}
            {category === 'myFollow' && (
              <MyFollow myFollow={myFollow} followCount={followCount} />
            )}
          </StyledDivContents>
        </StyledDivMain>
      </StyledContainer>
    );
  } else {
    alert('로그인이 필요한 서비스입니다.');
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
        margin-left: 10px;
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
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
`;

const StyledDivContents = styled.div`
  width: 894px;
  min-height: 900px;
  flex-direction: column;
`;
