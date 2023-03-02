import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { dbService } from '../shared/firebase';
import { useQuery } from 'react-query';

type JobCategoryProps = { [key: string]: string };
type PostFiltersProps = { [key: string]: any };

// READ post-list
const getPost = async (currentQuery: RouterQuery) => {
  // 직업별 필터 내 카테고리
  const jobCategory: JobCategoryProps = {
    developer: '개발자',
    designer: '디자이너',
    student: '학생',
    gamer: '게이머',
  };

  const select = jobCategory[currentQuery.select];

  // 전체 필터 - 최신순
  const defaultFilter = query(
    collection(dbService, 'postData'),
    orderBy('createdAt', 'desc'),
  );

  // 트렌드 필터 - 좋아요순 + 최신순
  const trendFilter = query(
    collection(dbService, 'postData'),
    orderBy('likesCount', 'desc'),
    orderBy('createdAt', 'desc'),
  );

  // 직업별 필터 - 직업별 + 최신순
  const jobFilter = query(
    collection(dbService, 'postData'),
    where('jobCategory', '==', `${select}`),
    orderBy('createdAt', 'desc'),
  );

  // 포스트리스트 필터정보 확인
  const postFilters: PostFiltersProps = {
    popular: trendFilter,
    category: jobFilter,
  };

  const filter = postFilters[currentQuery.order] ?? defaultFilter;

  const querySnapshot = await getDocs(filter);
  const dataArr: PostType[] = [];
  querySnapshot.forEach((doc) => {
    dataArr.push({ ...doc.data(), id: doc.id });
  });

  return dataArr;
};

export const useFilter = (currentQuery: RouterQuery) => {
  return useQuery(['post-list', currentQuery], () => getPost(currentQuery), {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
export default useFilter;
