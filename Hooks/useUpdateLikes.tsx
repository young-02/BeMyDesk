import { useMutation, useQueryClient } from 'react-query';
import { auth, dbService } from '@/shared/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/router';
interface UpdateLikesProps {
  post: PostType;
  newLikes: any;
}

const updateLikes = async ({ post, newLikes }: UpdateLikesProps) => {
  return updateDoc(doc(dbService, 'postData', post.id), newLikes);
};

export const useUpdateLikes = (currentUserId: any, post: PostType) => {
  const queryClient = useQueryClient();
  // 좋아요 상태값을 관리합니다.
  const initialState = post.likes.includes(currentUserId) ? true : false;
  const [isLikesClicked, setIsLikesClicked] = useState(initialState);
  const [postLikesCount, setPostLikesCount] = useState(post.likesCount);
  // url path로 좋아요 업데이트가 어떤 페이지에서 일어났는지 파악합니다.
  const router = useRouter();
  const { query: currentQuery }: any = router;

  // 업데이트 할 좋아요 객체
  let newLikes = {};
  // 좋아요 +1
  if (isLikesClicked === false) {
    newLikes = {
      likes: [...post.likes, currentUserId],
      likesCount: post.likesCount + 1,
    };
  }
  // 좋아요 -1
  if (isLikesClicked === true) {
    newLikes = {
      likes: post.likes.filter((id) => id !== currentUserId),
      likesCount: post.likesCount - 1,
    };
  }

  // Optimistic Updates 함수
  const { mutate: postListMutate } = useMutation(
    () => updateLikes({ post, newLikes }),
    {
      onMutate: async (postId: string) => {
        // 진행되는 모든 리패치들을 취소합니다.
        await queryClient.cancelQueries({
          queryKey: ['post-list', currentQuery],
        });

        // 좋아요 갯수값을 변경합니다.
        if (isLikesClicked === false) {
          setPostLikesCount(postLikesCount + 1);
        }
        if (isLikesClicked === true) {
          setPostLikesCount(postLikesCount - 1);
        }

        // 좋아요 체크 상태값을 변경합니다.
        setIsLikesClicked(!isLikesClicked);
      },

      onError: (err, newTodo, context) => {
        // 에러시 기존 데이터를 반환합니다.
        queryClient.setQueryData(
          ['post-list', currentQuery],
          context.previousPost,
        );
      },

      onSettled: () => {
        // 좋아요 상태값을 변경합니다.
        // setIsLikesClicked(!isLikesClicked);
        // queryClient.invalidateQueries('post-list');
      },
    },
  );

  return { postLikesCount, isLikesClicked, postListMutate };
};
