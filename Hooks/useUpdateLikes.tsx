import { QueryCache, useMutation, useQueryClient } from 'react-query';
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

  // url path로 좋아요 업데이트가 어떤 페이지에서 일어났는지 파악합니다.
  const router = useRouter();
  const { query: currentQuery }: any = router;

  // 좋아요 상태값에 따라 업데이트 할 좋아요 객체를 선택합니다.
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

  // 💛포스트 리스트 페이지 좋아요 업데이트
  const { mutate: postListMutate } = useMutation(
    () => updateLikes({ post, newLikes }),
    {
      onMutate: async (postId: string) => {
        // 진행되는 모든 리패치들을 취소합니다.
        await queryClient.cancelQueries({
          queryKey: ['post-list', currentQuery],
        });

        // 기존 데이터를 snapshot 찍습니다.
        const prevDefaultPost = queryClient.getQueryData(['post-list', {}]);
        const prevTrendPost = queryClient.getQueryData([
          'post-list',
          { order: 'popular' },
        ]);
        const prevDesignerPost = queryClient.getQueryData([
          'post-list',
          { order: 'category', select: 'designer' },
        ]);
        const prevDeveloperPost = queryClient.getQueryData([
          'post-list',
          { order: 'category', select: 'developer' },
        ]);
        const prevStudentPost = queryClient.getQueryData([
          'post-list',
          { order: 'category', select: 'student' },
        ]);
        const prevGamerPost = queryClient.getQueryData([
          'post-list',
          { order: 'category', select: 'gamer' },
        ]);

        // 기존 데이터를 변경하는 updatedPost 함수
        const updatedPost = (data: any) => {
          const newData = data.map((doc: PostType) => {
            if (doc.id === postId) {
              return {
                ...doc,
                ...newLikes,
              };
            }
            return doc;
          });
          return newData;
        };

        // 성공을 가정하고 새로운 값으로 UI를 업데이트합니다.
        prevDefaultPost &&
          queryClient.setQueryData(
            ['post-list', {}],
            updatedPost(prevDefaultPost),
          );
        prevTrendPost &&
          queryClient.setQueryData(
            ['post-list', { order: 'popular' }],
            updatedPost(prevTrendPost),
          );
        prevDesignerPost &&
          queryClient.setQueryData(
            ['post-list', { order: 'category', select: 'designer' }],
            updatedPost(prevDesignerPost),
          );
        prevDeveloperPost &&
          queryClient.setQueryData(
            ['post-list', { order: 'category', select: 'developer' }],
            updatedPost(prevDeveloperPost),
          );
        prevStudentPost &&
          queryClient.setQueryData(
            ['post-list', { order: 'category', select: 'student' }],
            updatedPost(prevStudentPost),
          );
        prevGamerPost &&
          queryClient.setQueryData(
            ['post-list', { order: 'category', select: 'gamer' }],
            updatedPost(prevGamerPost),
          );

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

      // 실패, 성공 여하와 상관없이 데이터를 refetching 하지 않습니다.
      onSettled: () => {},
    },
  );

  // 💙디데일뷰 페이지 좋아요 업데이트
  const { mutate: postMutate } = useMutation(
    () => updateLikes({ post, newLikes }),
    {
      onMutate: async (postId: string) => {
        // 진행되는 모든 리패치들을 취소합니다.
        await queryClient.cancelQueries({
          queryKey: ['post', postId],
        });

        // 기존 데이터를 snapshot 찍습니다.
        const prevPost = queryClient.getQueryData(['post', postId]);

        // 성공을 가정하고 새로운 값으로 UI를 업데이트합니다.
        queryClient.setQueryData(['post', postId], (old: any) => {
          return {
            ...old,
            ...newLikes,
          };
        });

        // 좋아요 체크 상태값을 변경합니다.
        setIsLikesClicked(!isLikesClicked);

        return { prevPost };
      },

      onError: (err, newTodo, context) => {
        // 에러시 기존 데이터를 반환합니다.
        queryClient.setQueryData(['post', postId], context.prevPost);
      },

      onSettled: () => {
        // DetailView 에서 좋아요 값이 변하면, post-list 캐쉬를 모두 제거합니다.
        queryClient.removeQueries('post-list');
      },
    },
  );

  return { isLikesClicked, postListMutate, postMutate };
};
