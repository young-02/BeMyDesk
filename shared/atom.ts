import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
export const userLoginState = atom({
  key: 'userLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
