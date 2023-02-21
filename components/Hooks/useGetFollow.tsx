import { auth, dbService } from '@/shared/firebase';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function useGetFollow() {
  const [userInfor, setUserInfor] = useState([]);

  useEffect(() => {
    const collectionRef = collection(dbService, 'userInfo');

    // const q = query(
    //   collectionRef,
    //   where('userId', '==', `${auth.currentUser?.uid}`),
    // );

    onSnapshot(collectionRef, (snapshot: any) =>
      setUserInfor(
        snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })),
      ),
    );
  }, []);

  return { userInfor };
}
