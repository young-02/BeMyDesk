import { auth } from '@/shared/firebase';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

type Props = {};

export default function useCheckLogin() {
  const [isLogin, setisLogin] = useState(false);
  const [isUserObj, setIsUserObj] = useState<string>('');
  const userNickName = auth.currentUser?.displayName ?? 'nick-name';

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setisLogin(true);
        setIsUserObj(userNickName);
      } else {
        setisLogin(false);
      }
    });
  }, []);

  return { isLogin, isUserObj, logOut };
}
