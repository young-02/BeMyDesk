import { auth, dbService } from '@/shared/firebase';
import { doc, setDoc, updateDoc, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useCheckLogin from '../../Hooks/useCheckLogin';
import useGetReaction from '../../Hooks/useGetReaction';
import CustomButton from '../ui/CustomButton';
import { useRouter } from 'next/router';
import Image from 'next/image';
import activeLikes from '../../public/images/userReaction/activeLikes.png';
import inactiveLikes from '../../public/images/userReaction/inactiveLikes.png';
import { useUpdateLikes } from '@/Hooks/useUpdateLikes';
import activeScrap from '../../public/images/userReaction/activeScrap.png';
import inactiveScrap from '../../public/images/userReaction/inactiveScrap.png';
import useUserInfo from '@/Hooks/useUserInfo';
import { useUpdateScrap } from '@/Hooks/useUpdateScrap';
import { useUpdateFollowing } from '../../Hooks/useUpdateFollowing';

export default function DetailViewUserInfor({ post }) {
  const router = useRouter();
  const { userProfile, userId, jobCategory, likesCount, id, userNickname } =
    post;

  // 현재 로그인한 유저 정보 가져오기
  // const currentUserId: any = auth.currentUser?.uid;

  const { isLogin, isUserObj, logOut } = useCheckLogin();
  const { userInfor } = useGetReaction();
  const [following, setFollowing] = useState<[] | undefined>();
  const [scraps, setScraps] = useState<[] | undefined>();
  const scraper = scraps?.includes(id) ? true : false;
  const follower = following?.includes(userId) ? true : false;
  const userProfileImg = userProfile ?? '/images/defaultProfile.png';

  // 테스트용
  let currentUserId = 'fA5D0FfF8GM1kd4bBVcmC7Ri4IA3';

  const { data: userInfo } = useUserInfo(currentUserId);

  // 스크랩
  const { isScrapClicked, postMutate: updateScrap } = useUpdateScrap(
    userInfo,
    post.id,
  );

  const handleUpdateScrap = async () => {
    if (currentUserId === undefined) {
      router.push('auth/sign-in');
    } else {
      updateScrap(id);
    }
  };

  // 좋아요
  const { isLikesClicked, postMutate: updateLikes } = useUpdateLikes(
    currentUserId,
    post,
  );

  const handleUpdateLikes = async () => {
    if (currentUserId === undefined) {
      router.push('auth/sign-in');
    } else {
      updateLikes(id);
    }
  };

  // 팔로우
  const { isFollowingClicked, postMutate: updateFollowing } =
    useUpdateFollowing(userInfo, post.userId);

  const handleUpdateFollowing = async () => {
    if (currentUserId === undefined) {
      router.push('auth/sign-in');
    } else {
      updateFollowing(id);
    }
  };

  return (
    <DetailViewUserInforLayout>
      <UserProfile>
        <div className="user-profile">
          <Image
            src={userProfileImg}
            alt="userProfileImg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="user-information">
          <p className="user-id">{userNickname ?? '닉네임'}</p>
          <p className="user-job">{jobCategory}</p>
        </div>
      </UserProfile>
      <div className="user-expression">
        <div onClick={handleUpdateScrap}>
          <Image
            src={isScrapClicked ? activeScrap : inactiveScrap}
            alt="scrap-icon"
            width={24}
          />
        </div>
        <div onClick={handleUpdateLikes}>
          <Image
            src={isLikesClicked ? activeLikes : inactiveLikes}
            alt="likes-icon"
            width={24}
          />
          <p className={isLikesClicked ? 'active' : 'inactive'}>{likesCount}</p>
        </div>
        {isFollowingClicked ? (
          <CustomButton
            border="1px solid #206EFB"
            fontColor="#206EFB"
            paddingColumns="0.5"
            paddingRow="1"
            onClick={handleUpdateFollowing}
          >
            팔로잉 취소
          </CustomButton>
        ) : (
          <CustomButton
            backgroundColor="#206EFB"
            fontColor="#fff"
            paddingColumns="0.5"
            paddingRow="1"
            onClick={handleUpdateFollowing}
          >
            팔로우
          </CustomButton>
        )}
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
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    overflow: hidden;
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
