import { auth, dbService } from '@/shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function useCheckUser() {
  const [userExist, setUserExist] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      if (auth.currentUser?.uid) {
        const uid = auth.currentUser.uid;
        console.log('uid', uid);
        const docRef = doc(dbService, 'userInfo', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserExist(true);
        }
      } else {
        setUserExist(false);
      }
    };
    checkUser();
  }, []);
  return { userExist };
}

export default useCheckUser;
