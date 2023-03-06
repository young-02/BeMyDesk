import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Search from './Search';
import useCheckLogin from '../Hooks/useCheckLogin';
import { userLoginState, userState } from '@/shared/atom';
import { useRecoilValue, useRecoilState } from 'recoil';

function GlobalNavigationBar() {
  const router = useRouter();
  const { pathname } = router;
  const { isLogin,logOut } = useCheckLogin();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  //리코일 불러오기
  const userInfo = useRecoilValue(userState);
  const userProfilImg = userInfo?.photoURL ?? '/images/Padeeffillortu.png';

  return (
    <GNBLayout theme={pathname === '/main' ? 'dark' : 'light'}>
      <div>
        <Link href="/main" className="logo">
          BE MY DESK
        </Link>
        <Link href="/post-list" className="button">
          포스트
        </Link>
        <>
          {isLogin ? (
            <Link href="/detail/write" className="button">
              글쓰기
            </Link>
          ) : (
            <Link href="/auth/sign-in" className="button">
              글쓰기
            </Link>
          )}
        </>
      </div>
      <div>
        <Search pathname={pathname} />

        {isLogin ? (
          <LoginGNBDiv>
            <div className="profile-img">
              <Image
                src={userProfilImg}
                alt="profilImg"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div
              className="login-menu"
              onClick={() => setIsOpenMenu((prev) => !prev)}
            >
              {pathname === '/main' ? (
                <Image
                  src="/images/mainLoginGNB.png"
                  alt="loginGNB"
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <Image
                  src="/images/loginGNB.png"
                  alt="loginGNB"
                  layout="fill"
                  objectFit="contain"
                />
              )}
              {isOpenMenu && (
                <div className="login-sub-menu">
                  <Link className="sub-menu" href="/mypage">
                    마이페이지
                  </Link>
                  <p className="sub-menu" onClick={logOut}>
                    로그아웃
                  </p>
                </div>
              )}
            </div>
          </LoginGNBDiv>
        ) : (
          <LogOutGNBDiv>
            <Link href="/auth/sign-in" className="button">
              로그인
            </Link>
            <Link href="/auth/sign-up" className="button">
              회원가입
            </Link>
          </LogOutGNBDiv>
        )}
      </div>
    </GNBLayout>
  );
}

export default React.memo(GlobalNavigationBar);

const GNBLayout = styled.div`
  width: 100%;
  display: flex;
  position: fixed;
  top: 0rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 6.25rem 0px;
  background-color: ${(props) => (props.theme === 'light' ? 'white' : 'none')};
  font-family: 'Pretendard Variable';
  color: ${(props) => (props.theme === 'light' ? '#17171C' : 'white')};
  z-index: 999;
  transition: all 0.2s ease;

  > div {
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2.5rem;

    .logo {
      font-size: 2.125rem;
      font-weight: 700;
      cursor: pointer;
    }

    .button {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      :hover {
        font-weight: 700;
        color: ${(props) => (props.theme === 'light' ? '#17171C' : 'white')};
      }
    }
  }
`;

const LoginGNBDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;

  .profile-img {
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 100%;
    overflow: hidden;
  }
  .login-menu {
    position: relative;
    cursor: pointer;
    width: 1rem;
    height: 1rem;

    .login-sub-menu {
      position: absolute;
      top: 200%;
      right: 0;
      background: #fff;
      box-shadow: 0px 0.25rem 0.375rem 0px #00000040;
      min-width: 7.375rem;
      border-radius: 0.625rem;
      padding: 0.625rem 0;

      .sub-menu {
        display: block;
        padding: 0.625rem 1.25rem;
        color: #868e96;
        font-size: 1.125rem;
        cursor: pointer;

        :hover {
          color: #206efb;
          background: #f1f3f5;
          font-weight: 700;
        }
      }
    }
  }
`;

const LogOutGNBDiv = styled.div`
  display: flex;
  gap: 40px;
`;
