import { dbService } from '@/shared/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';

export const getPostList = async (userId: any) => {
  console.log('userId', userId);
  const myPostFilter = query(
    collection(dbService, 'postData'),
    where('userId', '==', userId),
  );

  const querySnapshot = await getDocs(myPostFilter);
  const dataArr: PostType[] = [];
  querySnapshot.forEach((doc: any) => {
    dataArr.push({ ...doc.data(), id: doc.id });
  });

  return dataArr;
};

const useUserPostList = (userId: any) => {
  return useQuery(['my-page', 'myPost'], () => getPostList(userId), {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export default useUserPostList;
