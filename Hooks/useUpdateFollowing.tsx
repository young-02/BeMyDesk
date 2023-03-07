import { QueryCache, useMutation, useQueryClient } from 'react-query';
import { auth, dbService } from '@/shared/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

interface UpdateLikesProps {
  userInfo: UserInfoType;
  newFollowing: any;
}

const updateFollowing = async ({
  userInfo,
  newFollowing,
}: UpdateLikesProps) => {
  return updateDoc(doc(dbService, 'userInfo', userInfo.userId), newFollowing);
};

export const useUpdateFollowing = (userInfo: any, postUserId: string) => {
  // 팔로잉 상태값을 관리합니다.
  const initialState = userInfo?.following.includes(postUserId) ? true : false;
  const [isFollowingClicked, setIsFollowingClicked] = useState(initialState);
  const queryClient = useQueryClient();

  let newFollowing = {};
  // 팔로우
  if (userInfo) {
    // 팔로잉 상태값에 따라 업데이트 할 팔로잉 객체를 선택합니다.
    if (isFollowingClicked === false) {
      newFollowing = {
        following: [...userInfo.following, postUserId],
      };
    }
    // 팔로우 취소
    if (isFollowingClicked === true) {
      newFollowing = {
        following: userInfo.following.filter((id) => id !== postUserId),
      };
    }
  }

  // 디데일뷰 페이지 팔로잉 업데이트
  const { mutate: postMutate } = useMutation(
    () => updateFollowing({ userInfo, newFollowing }),
    {
      onMutate: async () => {
        // 팔로잉 체크 상태값을 변경합니다.
        setIsFollowingClicked(!isFollowingClicked);
      },
      onSettled: () => {
        // DetailView 에서 좋아요 값이 변하면, userInfo 캐쉬를 모두 제거합니다.
        queryClient.invalidateQueries('userInfo');
      },
    },
  );

  return { isFollowingClicked, postMutate };
};
