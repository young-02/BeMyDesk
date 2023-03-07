import { auth } from '@/shared/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { userLoginState, userState } from '../shared/atom';

type Props = {};

export default function useCheckLogin() {
  const router = useRouter();
  //리코일 로그아웃 상태변경
  const userInfo = useResetRecoilState(userState);
  const isLogout = useResetRecoilState(userLoginState);

  const logOut = async () => {
    await signOut(auth);
    userInfo();
    isLogout();
    window.location.reload();
  };

  return { logOut };
}
