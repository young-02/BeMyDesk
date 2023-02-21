import { auth, dbService } from '@/shared/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function useGetReaction() {
  const [userInfor, setUserInfor] = useState([]);

  useEffect(() => {
    const collectionRef = collection(dbService, 'userInfo');

    onSnapshot(collectionRef, (snapshot: any) =>
      setUserInfor(
        snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })),
      ),
    );
  }, [userInfor]);

  return { userInfor };
}
