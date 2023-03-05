import { dbService } from '@/shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export const usePost = (postId:any) => {
  // const router = useRouter();
  // const postId = router.query.id;
  return useQuery(['post', postId], () => getPost(postId), {
    staleTime: Infinity,
    cacheTime: 5000,
    refetchOnWindowFocus: false,
  });
};
export default usePost;

const getPost = async (postId: any) => {
  const docRef = doc(dbService, `postData/${postId}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
