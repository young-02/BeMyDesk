import React, { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { dbService } from '@/shared/firebase';
type Props = {};

export default function useSearch() {
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const changeWord = (e: any) => {
    setSearch(e.target.value);
  };

  const deskSearch = (e: any) => {
    e.preventDefault();
    setIsActive(true);
    setSearchWord(search);
  };

  useEffect(() => {
    const collectionRef = collection(dbService, 'postData');
    const q = query(
      collectionRef,
      where('jobCategory', '==', searchWord),
      //   where('postId', '==', searchWord),
    );
    // const a = query(collectionRef);

    onSnapshot(q, (snapshot: any) =>
      setSearchList(
        snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })),
      ),
    );
    // console.log(a);
    console.log(q);
  }, [searchWord]);

  return {
    search,
    isActive,
    searchList,
    searchWord,
    changeWord,
    deskSearch,
    setIsActive,
  };
}
