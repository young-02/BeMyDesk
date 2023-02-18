import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const PostListFilterBar = ({ theme }: ThemeProp) => {
  // 🔖 dark 와 light 를 theme prop 으로 내려받습니다.

  // filter 상태관리
  const [filter, setFilter] = useState('');

  return (
    <PostListFilterBarLayout theme={theme}>
      <FilterButton>
        <input
          id="all"
          value="전체"
          type="radio"
          checked={filter === '전체'}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label htmlFor="all">전체</label>
      </FilterButton>
      <FilterButton>
        <input
          id="trend"
          value="트렌드"
          type="radio"
          checked={filter === '트렌드'}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label htmlFor="trend">트렌드</label>
      </FilterButton>
      <FilterButton>
        <input
          id="job"
          value="직업별"
          type="radio"
          checked={filter === '직업별'}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label htmlFor="job">직업별</label>

        <Image
          alt="likes-icon"
          src={`/images/${theme}ThemeDropdown.png`}
          style={{ marginLeft: '0.625rem' }}
          width={12}
          height={12}
        />
      </FilterButton>
    </PostListFilterBarLayout>
  );
};

export default PostListFilterBar;

const PostListFilterBarLayout = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  gap: 1.875rem;
  padding-left: 42rem;
  margin-bottom: 0.625rem;
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-weight: 500;
  background-color: ${(props) => (props.theme === 'light' ? 'white' : 'black')};
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;

const FilterButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  :hover {
    font-weight: 700;
  }

  > input {
    display: none;
  }

  > input[type='radio']:checked + label {
    font-weight: 700;
  }

  > label {
    height: 2.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
