import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

function GlobalNavigationBar({ theme }: ThemeProp) {
  // 🔖 dark 와 light 를 theme prop 으로 내려받습니다.

  return (
    <GNBLayout theme={theme}>
      <div>
        <h1>BE MY DESK</h1>
        <p>포스트</p>
        <p>글쓰기</p>
      </div>
      <div>
        <Image
          alt="likes-icon"
          src={`/images/${theme}ThemeSearch.png`}
          width={20}
          height={20}
          style={{ cursor: 'pointer' }}
        />
        <p>로그인</p>
        <p>회원가입</p>
      </div>
    </GNBLayout>
  );
}

export default GlobalNavigationBar;

const GNBLayout = styled.div`
  width: calc(100vw - 12.5rem);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 6.25rem 0px;
  background-color: ${(props) => (props.theme === 'light' ? 'white' : 'black')};
  font-family: 'Pretendard Variable';
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};

  > div {
    height: 6.75rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2.5rem;

    > h1 {
      font-size: 2.125rem;
      font-weight: 700;
      cursor: pointer;
    }

    > p {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      :hover {
        font-weight: 700;
        color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
      }
    }
  }
`;
