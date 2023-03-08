import { dbService } from '@/shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';

export const useUserInfo = (userId: any) => {
  return useQuery(['userInfo', userId], () => getUserData(userId), {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};

export default useUserInfo;

const getUserData = async (userId: any) => {
  const docRef = doc(dbService, `userInfo/${userId}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
