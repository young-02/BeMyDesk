import { dbService } from '@/shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';

export const usePost = (postId: any) => {
  return useQuery(['post', postId], () => getPost(postId), {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
export default usePost;

const getPost = async (postId: any) => {
  const docRef = doc(dbService, `postData/${postId}`);
  const docData = await getDoc(docRef);
  const postData = { ...docData.data(), id: docData.id };
  return postData;
};
