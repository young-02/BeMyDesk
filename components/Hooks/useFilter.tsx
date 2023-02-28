import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { dbService } from '../../shared/firebase';

type JobCategoryProps = { [key: string]: string };
type PostFiltersProps = { [key: string]: any };

const useFilter = (currentQuery: RouterQuery) => {
  const [postList, setPostList] = useState<PostType[]>();

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

  // READ post-list
  useEffect(() => {
    onSnapshot(filter, (snapshot: any) => {
      const postData: any = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('snapshot', snapshot);
      setPostList(postData);
    });
  }, [currentQuery]);

  return [postList];
};

export default useFilter;
