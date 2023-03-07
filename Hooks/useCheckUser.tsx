import { auth, dbService } from '@/shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function useCheckUser() {
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      if (auth.currentUser?.uid) {
        const uid = auth.currentUser.uid;
        const docRef = doc(dbService, 'userInfo', uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          alert('유저 정보를 설정하세요');
          router.push('/auth/sns-nickname');
        }
      } else {
        // alert('잘못된 접근입니다.');
        // router.push('/main');
      }
    };
    checkUser();
  }, []);
}

export default useCheckUser;
