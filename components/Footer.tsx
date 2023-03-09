import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

type Props = {};

function Footer({}: Props) {
  // 푸터 없앨 페이지 지정
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (
      pathname === '/main' ||
      pathname === '/auth/sign-in' ||
      pathname === '/auth/sign-up'
    ) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [pathname]);

  return (
    <>
      {isActive && (
        <FooterLayout>
          <FooterInfo>
            <div>
              <h4>BE MY DESK</h4>
              <div>
                <p>BE MY DESK에서 당신의 창의성을 빛내줄 공간을 찾아보세요.</p>
                <p>공간을 통해 우리의 삶이 달라집니다.</p>
              </div>
            </div>
            <div>
              <h4>Be my desk</h4>
              <p>상단 페이지</p>
              <p>소개 페이지</p>
              <p>직업별 페이지</p>
            </div>
            <div>
              <h4>My page</h4>
              <p>프로필 설정</p>
              <p>나의 게시글</p>
            </div>
          </FooterInfo>
        </FooterLayout>
      )}
    </>
  );
}

export default Footer;

const FooterLayout = styled.div`
  // 🔥position 위치 가려지는 오류 수정해야 함!
  position: static;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.0625rem solid #868e96;
  background: #17171c;

  @media (max-width: 900px) {
    height: fit-content;
  }
`;

const FooterInfo = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  gap: 120px;
  margin: 1.25rem;

  @media (max-width: 900px) {
    gap: 1.25rem;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }

  > div {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 900px) {
      gap: 0.75rem;
    }

    > h4 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ced4da;

      @media (max-width: 900px) {
        font-size: 0.875rem;
      }
    }

    > p {
      font-size: 16px;
      font-weight: 400;
      color: #868e96;

      @media (max-width: 900px) {
        font-size: 0.75rem;
      }
    }

    > div {
      height: fit-content;
      display: flex;
      flex-direction: column;
      gap: 8px;

      > p {
        font-size: 16px;
        font-weight: 400;
        color: #868e96;

        @media (max-width: 900px) {
          font-size: 0.75rem;
        }
      }
    }
  }
`;
