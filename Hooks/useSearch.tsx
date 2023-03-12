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
