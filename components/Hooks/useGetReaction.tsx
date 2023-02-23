import { auth, dbService } from '@/shared/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function useGetReaction() {
  const [userInfor, setUserInfor] = useState([]);
  const [follow, setFollow] = useState();
  const [scrap, setScrap] = useState();

  useEffect(() => {
    const collectionRef = collection(dbService, 'userInfo');

    onSnapshot(collectionRef, (snapshot: any) =>
      setUserInfor(
        snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })),
      ),
    );

    userInfor?.map(
      (item) => auth.currentUser?.uid == item.id && setFollow(item.following)|| auth.currentUser?.uid == item.id && setScrap(item.scraps),
    );
  }, [auth.currentUser?.uid, follow,scrap]);
  // userInfor.map((item) =>  setGetUser(item));
  // console.log('getUser',getUser)
  return { userInfor, follow ,scrap};
}
