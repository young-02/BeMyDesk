import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '@/shared/firebase';
import Image from 'next/image';
import useCheckLogin from '@/Hooks/useCheckLogin';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {};

export default function MobileMenu({ isOpen, setIsOpen }) {
  const profileImg = auth.currentUser?.photoURL ?? '/images/defaultProfile.png';
  const { isLogin } = useCheckLogin();
  const [active, setActive] = useState('');
  const router = useRouter();

  return (
    <MobileMenuLayout>
      <MobileMenuWrap>
        <Link href="/main" className="logo">
          <Image
            src="/images/logo_white.png"
            layout="fill"
            object-fit="cover"
            alt="logo"
          />
        </Link>

        <div className="user-info">
          <Image
            className="profile-img"
            src={profileImg}
            width={48}
            height={48}
            alt="profileImg"
          />
          <div className="profile-infor">
            {isLogin ? (
              <>
                <div>{auth.currentUser?.displayName}</div>
                <div>
                  <Image
                    src="/images/setting-icon.png"
                    width={20}
                    height={20}
                    alt="setting-icon"
                    onClick={() => router.push('/mypage')}
                  />
                </div>
              </>
            ) : (
              <Link href="/auth/sign-in">로그인</Link>
            )}
          </div>
        </div>
        <ul className="sub-menu">
          <li>
            <Link
              href="/post-list?order=category&select=designer"
              onClick={() => setActive('직업별')}
              className={active === '직업별' ? 'active' : ''}
            >
              직업별 리스트
            </Link>
          </li>
          <li>
            <Link
              href="/post-list"
              onClick={() => setActive('포스트')}
              className={active === '포스트' ? 'active' : ''}
            >
              포스트 리스트
            </Link>
          </li>
          <li>
            <Link
              href="/post-list"
              onClick={() => setActive('글쓰기')}
              className={active === '글쓰기' ? 'active' : ''}
            >
              글쓰기
            </Link>
          </li>
        </ul>

        {isLogin && <p className="log-out">로그아웃</p>}
      </MobileMenuWrap>

      <ModalBackground onClick={() => setIsOpen(!isOpen)} />
    </MobileMenuLayout>
  );
}
const MobileMenuLayout = styled.div`
  transition: display 0.5s ease-in-out;
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const MobileMenuWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80vw;
  height: 100vh;
  padding: 2.5rem 1.25rem;
  background: #212529;
  z-index: 999;
  color: #fff;

  .logo {
    position: relative;
    display: block;
    max-width: 11.25rem;
    width: 90%;
    height: 24px;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    margin: 1.25rem 0;

    .profile-img {
      border-radius: 100%;
      margin-right: 1.25rem;
    }
  }
  .profile-infor {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sub-menu {
    margin: 0 -1.25rem;

    > li {
      > a {
        display: block;
        padding: 0.875rem 1.25rem;
        border-radius: 0.625rem;

        &.active {
          background: #343a40;
        }
      }
    }
  }

  .log-out {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: #f83e4b;
  }
`;
