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
    // 유저정보 문서만 가져오기
    const uid = auth.currentUser?.uid;
    if (!uid) {
      return;
    }

    const fetch = async () => {
      const docRef = doc(dbService, 'userInfo', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetch();

    if (
      profileData &&
      Array.isArray(profileData.scraps) &&
      profileData.scraps.length > 0
    ) {
      onSnapshot(
        query(
          collection(dbService, 'postData'),
          where('__name__', 'in', profileData.scraps),
        ),
        (snapshot) => {
          const fetchedScrapData = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setMyScrap(fetchedScrapData);
        },
      );
      console.log('스크랩 데이터 불러오기 완료');
    } else {
      console.log(' 스크랩 데이터가 없습니다');
    }

    // 마이 포스트 불러오기
    onSnapshot(
      query(collection(dbService, 'postData'), where('userId', '==', uid)),
      (snapshot) => {
        const fetchedMyPostData = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setMyPost(fetchedMyPostData);
      },
    );
  }, [auth.currentUser]);

  useEffect(() => {
    console.log(myScrap);
  }, [myScrap, category]);

  if (loading) {
    return <div>로딩중입니다...</div>;
  }

  if (error) {
    return <div>에러메세지: {error.message}</div>;
  }

  if (user) {
    return (
      <StyledDivOne>
        <div>
          <img
            src={user.photoURL}
            alt="ProfileImage"
            width={202}
            height={202}
          />
        </div>
        <p>닉네임 {user.displayName} 님</p>
        <p>{profileData.introduction}</p>
        <p>UID: {auth.currentUser?.uid}</p>
        <p>이메일: {user.email}</p>
        <p>팔로워 100명</p>
        <button onClick={() => auth.signOut()}>로그아웃</button>
        <button onClick={() => console.log('유저정보', user)}>
          유저정보 보기
        </button>
        <button
          onClick={() => {
            setProfileEditModalOpen(true);
          }}
        >
          프로필수정 열기
        </button>
        <div>
          {profileEditModalOpen && (
            <ProfileEditModal
              setProfileEditModalOpen={setProfileEditModalOpen}
              user={user}
            />
          )}
        </div>
        <StyledDivTwo>
          <CategoryButton category={category} setCategory={setCategory} />
        </StyledDivTwo>
        <div>
          {category === 'myPost' && <MyPost myPost={myPost} />}
          {category === 'myScrap' && <MyScrap myScrap={myScrap} />}
          {category === 'myFollow' && <MyFollow />}
        </div>
      </StyledDivOne>
    );
  } else {
    alert('로그인이 필요한 서비스입니다.');
    router.push('/auth/sign-in');
    return null;
  }
}
const StyledDivOne = styled.div`
  margin-top: 9.25rem;
`;
const StyledDivTwo = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;

  button:nth-child(1) {
    margin-left: 10px;
    width: 110px;
    height: 40px;
    font-size: 15px;
    background: #e37b58;
    border-radius: 30px;
    padding: 10px 30px;
    border: none;
    font-family: 'GmarketSans';
    cursor: pointer;
    &:hover {
      color: white;
      transition: 0.5s;
    }
  }

  button:nth-child(2) {
    margin-left: 10px;
    width: 110px;
    height: 40px;
    background: #ffffff;
    border-radius: 30px;
    padding: 10px 30px;
    border: none;
    font-size: 16px;
    font-family: 'GmarketSans';
    cursor: pointer;
    &:hover {
      color: white;
      transition: 0.5s;
    }
  }

  button:nth-child(3) {
    margin-left: 10px;
    width: 110px;
    height: 40px;
    background: #ffffff;
    border-radius: 30px;
    padding: 10px 30px;
    border: none;
    font-size: 16px;
    font-family: 'GmarketSans';
    cursor: pointer;
    &:hover {
      color: white;
      transition: 0.5s;
    }
  }
`;
