import React, { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { dbService } from '@/shared/firebase';
import { useRouter } from 'next/router';

export default function useSearch() {
  const router = useRouter();
  const { term } = router.query;

  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [searchWord, setSearchWord] = useState(term);

  const changeWord = (e: any) => {
    setSearch(e.target.value);
  };

  const deskSearch = (e: any) => {
    e.preventDefault();
    router.push(`/post-list/search?term=${search}`);
    setSearchWord(term);
    setSearch('');
  };

  // const defaultFilter = query(
  //   collection(dbService, 'postData'),
  //   orderBy('createdAt', 'desc'),
  // );

  // useEffect(() => {
  //   // 필터 적용한 포스트 리스트 READ
  //   onSnapshot(defaultFilter, (snapshot) => {
  //     const postData: any = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     console.log('postData', postData);
  //     console.log('searchWord', searchWord);

  //     const filteredList: any[] = [];
  //     postData.map((post: PostType) => {
  //       if (post.postTitle.includes(searchWord)) {
  //         filteredList.push(post);
  //       } else if (post.postText.includes(searchWord)) {
  //         filteredList.push(post);
  //       } else {
  //         return;
  //       }
  //     });
  //     console.log('filteredList', filteredList);

  //     setSearchList(filteredList);
  //   });
  // }, [searchWord]);

  return {
    search,
    setSearch,
    isActive,
    searchList,
    searchWord,
    changeWord,
    deskSearch,
    setIsActive,
  };
}
