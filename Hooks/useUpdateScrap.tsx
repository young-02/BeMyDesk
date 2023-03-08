import { QueryCache, useMutation, useQueryClient } from 'react-query';
import { auth, dbService } from '@/shared/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

interface UpdateLikesProps {
  userInfo: UserInfoType;
  newScrap: any;
}

const updateScrap = async ({ userInfo, newScrap }: UpdateLikesProps) => {
  return updateDoc(doc(dbService, 'userInfo', userInfo.userId), newScrap);
};

export const useUpdateScrap = (userInfo: any, postId: string) => {
  // 스크랩 상태값을 관리합니다.
  const initialState = userInfo?.scraps.includes(postId) ? true : false;
  const [isScrapClicked, setIsScrapClicked] = useState(initialState);
  const queryClient = useQueryClient();

  let newScrap = {};
  // 스크랩 추가
  if (userInfo) {
    // 스크랩 상태값에 따라 업데이트 할 스크랩 객체를 선택합니다.
    if (isScrapClicked === false) {
      newScrap = {
        scraps: [...userInfo.scraps, postId],
      };
    }
    // 스크랩 해제
    if (isScrapClicked === true) {
      newScrap = {
        scraps: userInfo.scraps.filter((id) => id !== postId),
      };
    }
  }

  // 디데일뷰 페이지 스크랩 업데이트
  const { mutate: postMutate } = useMutation(
    () => updateScrap({ userInfo, newScrap }),
    {
      onMutate: async () => {
        // 스크랩 체크 상태값을 변경합니다.
        setIsScrapClicked(!isScrapClicked);
      },
      onSettled: () => {
        // DetailView 에서 좋아요 값이 변하면, post 캐쉬를 모두 제거합니다.
        queryClient.invalidateQueries('userInfo');
        queryClient.removeQueries('my-page');
      },
    },
  );

  return { isScrapClicked, postMutate };
};
