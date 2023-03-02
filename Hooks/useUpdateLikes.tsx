import { useMutation, useQueryClient } from 'react-query';
import { auth, dbService } from '@/shared/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/router';

type UpdateLikesProps = {
  isLikesClicked: boolean;
  post: PostType;
  currentUserId?: any;
};

const updateLikes = async ({
  isLikesClicked,
  post,
  currentUserId,
}: UpdateLikesProps) => {
  // 좋아요 +1
  if (isLikesClicked === false) {
    return updateDoc(doc(dbService, 'postData', post.id), {
      likes: [...post.likes, currentUserId],
      likesCount: post.likesCount + 1,
    });
  }
  // 좋아요 -1
  if (isLikesClicked === true) {
    return updateDoc(doc(dbService, 'postData', post.id), {
      likes: post.likes.filter((id) => id !== currentUserId),
      likesCount: post.likesCount - 1,
    });
  }
};

export const useUpdateLikes = (currentUserId: any, post: PostType) => {
  const initialState = post.likes.includes(currentUserId) ? true : false;
  const [isLikesClicked, setIsLikesClicked] = useState(initialState);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { query: currentQuery }: any = router;

  const { mutate: postListMutate } = useMutation(
    () => updateLikes({ isLikesClicked, post, currentUserId }),
    {
      onMutate: async () => {
        // 진행되는 모든 리패치들을 취소합니다.
        await queryClient.cancelQueries({
          queryKey: ['post-list', currentQuery],
        });

        // 기존 데이터를 snapshot 찍습니다.
        const previousPost = queryClient.getQueryData([
          'post-list',
          currentQuery,
        ]);
        console.log('previousPost', previousPost);

        // // 성공을 가정하고 새로운 값으로 업데이트합니다.
        // queryClient.setQueryData(['post-list'], newLikes);

        // 기존값과 새로 업데이트 된 값을 context 내부 값으로 반환합니다.
        // return { previousPost };
      },

      onError: () => {},

      onSettled: () => {
        // 좋아요 상태값을 변경하고, post-list를 refetching 합니다.
        setIsLikesClicked(!isLikesClicked);
        queryClient.invalidateQueries('post-list');
      },
    },
  );

  return { isLikesClicked, postListMutate };
};
