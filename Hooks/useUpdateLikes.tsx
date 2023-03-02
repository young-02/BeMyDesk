import { useMutation, useQueryClient } from 'react-query';
import { dbService } from '@/shared/firebase';
import { doc, updateDoc } from 'firebase/firestore';

type UpdateLikesProp = { postId: string; newLikes: any };

const updateLikes = ({ postId, newLikes }: UpdateLikesProp) => {
  return updateDoc(doc(dbService, 'postData', postId), newLikes);
};

export const useUpdateLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLikes,
    onMutate: async ({ postId, newLikes }) => {
      // 진행되는 모든 리패치들을 취소합니다.
      await queryClient.cancelQueries({
        queryKey: ['post-list', postId],
      });

      // 기존 데이터를 snapshot 찍습니다.
      const previousPost = queryClient.getQueryData(['post-list', postId]);

      // console.log('연결은됨');

      // // 성공을 가정하고 새로운 값으로 업데이트합니다.
      // queryClient.setQueryData(['post-list'], newLikes);

      // 기존값과 새로 업데이트 된 값을 context 내부 값으로 반환합니다.
      return { previousPost, newLikes };
    },

    // onError: () => {},

    onSettled: (postId) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['post-list', postId],
      // });

      queryClient.invalidateQueries('post-list');
    },
  });
};
