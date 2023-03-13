import { auth, dbService } from '@/shared/firebase';
import { doc, setDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
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
import CustomModal from '../ui/CustomModal';
import { useQueryClient } from 'react-query';
import useCheckUser from '@/Hooks/useCheckUser';

export default function DetailViewUserInfor({ post }) {
  const router = useRouter();
  const { userExist } = useCheckUser();
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
  const [isModify, setIsModify] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const postId = router.query.id;
  const queryClient = useQueryClient();

  const currentUserId = auth.currentUser?.uid;
  const { data: userInfo } = useUserInfo(currentUserId);

  // 스크랩
  const { isScrapClicked, postMutate: updateScrap } = useUpdateScrap(
    userInfo,
    post.id,
  );

  const handleUpdateScrap = async () => {
    if (currentUserId === undefined) {
      router.push('/auth/sign-in');
    } else if (userExist == false) {
      alert('유저 정보를 설정하세요');
      router.push('/auth/sns-nickname');
    } else {
      userExist && updateScrap(id);
    }
  };

  // 좋아요
  const { isLikesClicked, postMutate: updateLikes } = useUpdateLikes(
    currentUserId,
    post,
  );

  const handleUpdateLikes = async () => {
    if (currentUserId === undefined) {
      router.push('/auth/sign-in');
    } else if (userExist == false) {
      alert('유저 정보를 설정하세요');
      router.push('/auth/sns-nickname');
    } else {
      updateLikes(id);
    }
  };

  // 팔로우
  const { isFollowingClicked, postMutate: updateFollowing } =
    useUpdateFollowing(userInfo, post.userId);

  const handleUpdateFollowing = async () => {
    if (currentUserId === undefined) {
      router.push('/auth/sign-in');
    } else if (userExist == false) {
      alert('유저 정보를 설정하세요');
      router.push('/auth/sns-nickname');
    } else {
      updateFollowing(id);
    }
  };

  const deletePost = async () => {
    await deleteDoc(doc(dbService, `postData/${postId}`));
    queryClient.removeQueries('post-list');
    router.push('/post-list');
  };

  const updatePost = async () => {
    router.push(`/detail/write/${postId}/edit`);
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
        <div onClick={handleUpdateLikes} className="likes">
          <Image
            src={isLikesClicked ? activeLikes : inactiveLikes}
            alt="likes-icon"
            width={24}
          />
          <p>{likesCount}</p>
        </div>
        {isFollowingClicked ? (
          <CustomButton
            border=".0625rem solid #206EFB"
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

        {auth.currentUser?.uid === post?.userId && (
          <ModifyWrap>
            <div
              className="modify-icon"
              onClick={() => setIsModify((prev) => !prev)}
            >
              <Image src="/images/modify_icon.svg" layout="fill" alt="modify" />
            </div>

            {isModify && (
              <div className="modify-wraper">
                <>
                  <span onClick={() => setIsEdit((prev) => !prev)}>
                    수정하기
                  </span>
                  <span
                    className="delete"
                    onClick={() => setIsDelete((prev) => !prev)}
                  >
                    삭제하기
                  </span>
                </>

                {isEdit && (
                  <CustomModal title="글을 수정하시겠습니까?">
                    <div className="buttonWrap">
                      <CustomButton
                        paddingRow="0"
                        paddingColumns="0.5"
                        backgroundColor="#F83E4B"
                        fontColor="#fff"
                        onClick={updatePost}
                      >
                        수정
                      </CustomButton>
                      <CustomButton
                        paddingRow="0"
                        paddingColumns="0.5"
                        backgroundColor="#fff"
                        fontColor="#868E96"
                        onClick={() => setIsEdit((prev) => !prev)}
                      >
                        취소
                      </CustomButton>
                    </div>
                  </CustomModal>
                )}
                {isDelete && (
                  <CustomModal title="정말 삭제하시겠습니까?">
                    <div className="buttonWrap">
                      <CustomButton
                        paddingRow="0"
                        paddingColumns="0.5"
                        backgroundColor="#F83E4B"
                        fontColor="#fff"
                        onClick={deletePost}
                      >
                        삭제
                      </CustomButton>
                      <CustomButton
                        paddingRow="0"
                        paddingColumns="0.5"
                        backgroundColor="#fff"
                        fontColor="#868E96"
                        onClick={() => setIsDelete((prev) => !prev)}
                      >
                        취소
                      </CustomButton>
                    </div>
                  </CustomModal>
                )}
              </div>
            )}
          </ModifyWrap>
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
  padding: 0.0625rem;

  .user-expression {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    @media (max-width: 520px) {
      gap: 0.5rem;
    }

    > div {
      cursor: pointer;
    }

    .likes {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #868e96;
      gap: 0.125rem;
      margin: 0px 4px;

      > p {
        font-size: 0.875rem;
      }
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;

  .user-profile {
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    overflow: hidden;

    @media (max-width: 51.25rem) {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
  .user-information {
    margin-left: 20px;

    @media (max-width: 51.25rem) {
      margin-left: 0.875rem;
    }

    .user-id {
      font-weight: 700;
      font-size: 1.125rem;
      line-height: 2rem;

      @media (max-width: 51.25rem) {
        margin-bottom: 0.125rem;
        font-size: 0.875rem;
      }
    }
    .user-job {
      font-weight: 500;
      font-size: 1rem;
      color: #868e96;

      @media (max-width: 51.25rem) {
        font-size: 0.75rem;
      }
    }
  }
`;

const ModifyWrap = styled.div`
  position: relative;

  .modify-icon {
    position: relative;
    width: 24px;
    height: 24px;
  }
  .modify-wraper {
    position: absolute;
    right: -0.625rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    width: 100px;
    text-align: center;
    z-index: 99;
    top: 2rem;
    border-radius: 10px;
    box-shadow: 3px 0.25rem 0.375rem rgba(0, 0, 0, 0.3);
    overflow: hidden;

    .delete {
      color: #f83e4b;
    }

    > span {
      display: block;
      padding: 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;

      :hover {
        background: #f1f3f5;
      }
    }
  }
`;
