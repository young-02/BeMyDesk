import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Search from './Search';
import { auth } from '@/shared/firebase';
import useCheckLogin from '../Hooks/useCheckLogin';
import { useMediaQuery } from 'react-responsive';
import useSearch from '@/Hooks/useSearch';
import MobileMenu from './main/MobileMenu';

function GlobalNavigationBar() {
  const router = useRouter();
  const { pathname } = router;
  const { isLogin, logOut } = useCheckLogin();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const userProfilImg =
    auth.currentUser?.photoURL ?? '/images/defaultProfile.png';

  // 반응응형 사이즈
  const [isMobile, setIsMobile] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<number>(0);
  const isMobileSize = useMediaQuery({ maxWidth: 690 });
  const isDesktopSize = useMediaQuery({ minWidth: 691 });

  //모바일 서브메뉴
  const [isOpen, setIsOpen] = useState(false);

  //서버사이드렌더링
  useEffect(() => {
    setIsMobile(isMobileSize);
    setIsDesktop(isDesktopSize);
  }, [isMobileSize, isDesktopSize]);

  return (
    <GNBLayout theme={pathname === '/main' ? 'dark' : 'light'}>
      {isMobile && (
        <div>
          <span
            onClick={() => setIsOpen(!isOpen)}
            className={
              pathname === '/main' ? 'mobile-icon dark' : 'mobile-icon light'
            }
          />
          <Link href="/main">BE MY DESK</Link>
          <Search pathname={pathname} />
          {isOpen && <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
      )}
      {isDesktop && (
        <>
          <div className="button-wrapper">
            <Link href="/main" className="logo">
              {pathname === '/main' ? (
                <Image
                  src="/images/logo_white.png"
                  layout="fill"
                  object-fit="contain"
                  alt="logo"
                />
              ) : (
                <Image
                  src="/images/logo_black.png"
                  layout="fill"
                  object-fit="contain"
                  alt="logo"
                />
              )}
            </Link>
            <Link href="/post-list" className="button">
              포스트
            </Link>
            {isLogin ? (
              <Link href="/detail/write" className="button">
                글쓰기
              </Link>
            ) : (
              <Link href="/auth/sign-in" className="button">
                글쓰기
              </Link>
            )}
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
        </>
      )}
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
  /* background-color: ${(props) =>
    props.theme === 'light' ? 'white' : 'none'}; */
  font-family: 'Pretendard Variable';
  color: ${(props) => (props.theme === 'light' ? '#17171C' : 'white')};
  z-index: 999;
  transition: all 0.2s ease;

  @media (max-width: 1100px) {
    padding: 0px 1.25rem;
  }

  > div {
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2.5rem;

    @media (max-width: 1100px) {
      gap: 1rem;
    }

    .logo {
      position: relative;
      min-width: 11.25rem;
      width: 100%;
      height: 1.5rem;
      flex: 1;
      cursor: pointer;

      &.active {
        opacity: 0;
      }
    }

    .button-wrapper {
      display: flex;
      flex-direction: row;
      gap: 1.875rem;
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

    .mobile-icon {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      background: url('/images/mobile_icon.jpg') no-repeat;

      &.dark {
        background-position: 0 0;
      }

      &.light {
        background-position: -28px 0;
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
      box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 6px;
      width: 6.875rem;
      border-radius: 0.625rem;
      padding: 0.625rem 0;

      .sub-menu {
        display: block;
        padding: 0.625rem 1.25rem;
        color: #17171c;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;

        :hover {
          color: #206efb;
          background: #f1f3f5;
        }
      }
    }
  }
`;

const LogOutGNBDiv = styled.div`
  display: flex;
  gap: 40px;
`;
