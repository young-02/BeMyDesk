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
  console.log(user);
  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(dbService, 'userInfo', `${user?.uid}`);
      const docSnap = await getDoc(docRef);
      console.log('docSnap', docSnap);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setProfileData(docSnap.data());
        console.log('aa', profileData);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };
    fetch();
  }, [user?.uid]);

  if (loading) {
    return <div>로딩중입니다...</div>;
  }

  if (error) {
    return <div>에러메세지: {error.message}</div>;
  }

  if (user) {
    return (
      <>
        <div>
          <div>
            <img
              src={user.photoURL}
              alt="ProfileImage"
              width={202}
              height={202}
            />
          </div>
          <p>닉네임 {user.displayName} 님</p>
          <p>
            별들을 프랑시스 이제 가을로 거외다. 노루, 가득 것은 다 많은 슬퍼하는
            듯합니다
          </p>
          <p>{profileData.introduction}</p>
          <p>이메일: {user.email}</p>
          <p>팔로워 100명</p>
          <p>디자이너</p>
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
        </div>

        <StyledDivTwo>
          <CategoryButton category={category} setCategory={setCategory} />
        </StyledDivTwo>
        <div>
          {category === 'myPost' && <MyPost />}
          {category === 'myScrap' && <MyScrap />}
          {category === 'myFollow' && <MyFollow />}
        </div>
      </>
    );
  } else {
    alert('로그인이 필요한 서비스입니다.');
    router.push('/auth/sign-in');
    return null;
  }
}

const StyledDivTwo = styled.div`
  margin-top: 30px;
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
