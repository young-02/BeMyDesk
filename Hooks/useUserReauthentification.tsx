import { auth } from '@/shared/firebase';
import { reauthenticateWithCredential } from 'firebase/auth';
import React from 'react';

function useUserReauthentification() {
  const UserReauthentification = async () => {
    const user = auth.currentUser;
    const credential = promptForCredentials();
    await reauthenticateWithCredential(user, credential);
  };

  return <div>useUserReauthentification</div>;
}

export default useUserReauthentification;
