import { auth, dbService } from '@/shared/firebase';
import { doc, setDoc, updateDoc, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useCheckLogin from '../Hooks/useCheckLogin';
import useGetReaction from '../Hooks/useGetReaction';
import CustomButton from '../ui/CustomButton';
import { useRouter } from 'next/router';

export default function DetailViewUserInfor({ detail }) {
  const router = useRouter();
  const { userProfile, userId, jobCategory, likesCount, id, likes, scrap } =
    detail;
  const { isLogin, isUserObj, logOut } = useCheckLogin();
  const like = likes.includes(isUserObj) ? true : false;
  const { userInfor } = useGetReaction();
  const [followings, setFollowings] = useState();
  const [scraps, setScraps] = useState();
  const follow = !!followings?.includes(userId) ? true : false;
  const scraping = !!scraps?.includes(id) ? true : false;

  useEffect(() => {
    userInfor?.map(
      (item) =>
        (auth.currentUser?.uid === item.id && setFollowings(item.followings)) ||
        (auth.currentUser?.uid === item.id && setScraps(item.scraps)),
    );
  }, [userInfor]);

  const onclickScrap = async (num) => {
    if (isLogin) {
      if (!!scraps.includes(id)) {
        scraps.pop(id);
      } else {
        scraps.push(id);
      }

      const docRef = doc(dbService, 'userInfo', num);
      const payload = { scraps };
      await updateDoc(docRef, payload);
    } else {
      router.push('/auth/sign-in');
    }
  };

  const onclickLove = async (num: any) => {
    if (isLogin) {
      if (likes.includes(isUserObj)) {
        likes.pop(isUserObj);
      } else {
        likes.push(isUserObj);
      }
    } else {
      router.push('/auth/sign-in');
    }

    const isLike = like;
    const likesCount = likes.length;
    const docRef = doc(dbService, 'postData', num);
    const payload = { likesCount, likes, isLike };
    await updateDoc(docRef, payload);
  };

  const onclickFollow = async (num: any) => {
    if (isLogin) {
      if (!!followings.includes(userId)) {
        followings.pop(userId);
      } else {
        followings.push(userId);
      }

      const docRef = doc(dbService, 'userInfo', num);
      const payload = { followings };
      await updateDoc(docRef, payload);
    } else {
      router.push('/auth/sign-in');
    }
  };

  return (
    <DetailViewUserInforLayout>
      <UserProfile>
        <img className="user-profile" src={userProfile} alt="userProfileImg" />
        <div className="user-information">
          <p className="user-id">{userId}</p>
          <p className="user-job">{jobCategory}</p>
        </div>
      </UserProfile>
      <button onClick={logOut}>로그아웃</button>
      <div className="user-expression">
        <button onClick={() => onclickScrap(auth.currentUser?.uid)}>
          {scraping ? (
            <span className="follow active">스크립</span>
          ) : (
            <span className="follow ">스크립</span>
          )}
        </button>
        <>
          <button onClick={() => onclickLove(id)}>
            {like ? (
              <span className="love active">스크립</span>
            ) : (
              <span className="love  ">스크립</span>
            )}
          </button>
          {likesCount}
        </>
        <div>
          {!follow ? (
            <CustomButton
              backgoundColor="#206EFB"
              fontColor="#fff"
              paddingColumns="0.5"
              paddingRow="1"
              onClick={() => onclickFollow(auth.currentUser?.uid)}
            >
              팔로우
            </CustomButton>
          ) : (
            <CustomButton
              borderColor="#206EFB"
              fontColor="#206EFB"
              paddingColumns="0.5"
              paddingRow="1"
              onClick={() => onclickFollow(auth.currentUser?.uid)}
            >
              팔로잉
            </CustomButton>
          )}
        </div>
      </div>
    </DetailViewUserInforLayout>
  );
}

const DetailViewUserInforLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding: 1px;

  .user-expression {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    .follow {
      display: block;
      width: 24px;
      height: 24px;
      background: url(/images/sprite_icon.png) no-repeat center;
      background-position: -97px -37px;
      text-indent: -99999%;

      &.active {
        background-position: -65px -37px;
      }
    }

    .love {
      display: block;
      width: 24px;
      height: 24px;
      background: url(/images/sprite_icon.png) no-repeat center;
      background-position: -32px -37px;

      text-indent: -99999%;

      &.active {
        background-position: -1px -37px;
      }
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;

  .user-profile {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    object-fit: cover;
  }
  .user-information {
    margin-left: 2.5rem;

    .user-id {
      margin-bottom: 0.5rem;
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 2rem;
    }
    .user-job {
      font-weight: 500;
      font-size: 1.25rem;
      color: #868e96;
    }
  }
`;