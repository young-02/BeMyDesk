import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import editor from './detail-write/DetailWriteFormEditor';

const PostListFilterBar = () => {
  const router = useRouter();
  const { query: currentQuery } = router;
  const currentSelect =
    currentQuery.select === 'developer'
      ? '개발자'
      : currentQuery.select === 'designer'
      ? '디자이너'
      : currentQuery.select === 'student'
      ? '학생'
      : currentQuery.select === 'gamer'
      ? '게이머'
      : '직업별';

  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = (e: any) => {
    setIsOpen(!isOpen);
  };

  return (
    <PostListFilterBarLayout>
      <FilterLink
        href="/post-list"
        className={currentQuery.order == undefined ? 'selected' : 'unselected'}
      >
        전체
      </FilterLink>
      <FilterLink
        href="/post-list?order=popular"
        className={currentQuery.order == 'popular' ? 'selected' : 'unselected'}
      >
        트렌드
      </FilterLink>
      <div>
        <DropdownBox
          className={
            currentQuery.order == 'category' ? 'selected' : 'unselected'
          }
        >
          <div className="selector" onClick={handleDropdown}>
            <div>{currentSelect}</div>
            <div
              className={isOpen ? 'dropdown-toggle-rotate' : 'dropdown-toggle'}
            >
              <Image
                alt="dropdown-icon"
                src={`/images/LightThemeDropdown.png`}
                width={12}
                height={12}
              />
            </div>
          </div>
          {isOpen && (
            <div className="dropdown-wrapper">
              <DropdownFilterLink
                href="/post-list?order=category&select=designer"
                style={{ borderRadius: '10px 10px 0px 0px' }}
                onClick={handleDropdown}
                selected={currentSelect}
              >
                디자이너
              </DropdownFilterLink>
              <DropdownFilterLink
                href="/post-list?order=category&select=developer"
                onClick={handleDropdown}
                selected={currentSelect}
              >
                개발자
              </DropdownFilterLink>
              <DropdownFilterLink
                href="/post-list?order=category&select=student"
                onClick={handleDropdown}
                selected={currentSelect}
              >
                학생
              </DropdownFilterLink>
              <DropdownFilterLink
                href="/post-list?order=category&select=gamer"
                style={{ borderRadius: '0px 0px 10px 10px ' }}
                onClick={handleDropdown}
                selected={currentSelect}
              >
                게이머
              </DropdownFilterLink>
            </div>
          )}
        </DropdownBox>
      </div>
    </PostListFilterBarLayout>
  );
};

export default PostListFilterBar;

const PostListFilterBarLayout = styled.div`
  width: 100vw;
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.875rem;
  padding-left: 21rem;
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-weight: 500;
  background-color: white;
  color: black;
`;

const FilterLink = styled(Link)`
  width: 2.9375rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* background-color: rebeccapurple; */
  :hover {
    font-weight: 700;
  }
  &.selected {
    font-weight: 700;
  }
`;

const DropdownBox = styled.div`
  height: fit-content;
  position: absolute;
  top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.selected {
    font-weight: 700;
  }

  .selector {
    width: 6rem;
    height: 2.5rem;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.625rem 1.25rem 0.625rem;
    cursor: pointer;

    :hover {
      font-weight: 700;
    }

    .dropdown-toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0rem;
      transform: rotate(0deg);
      transition: all 0.3s;
    }
    .dropdown-toggle-rotate {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0rem;
      transform: rotate(180deg);
      transition: all 0.3s;
    }
  }

  .dropdown-wrapper {
    background-color: white;
    border-radius: 0.625rem;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 6px;
    /* background-color: red; */
  }
`;

const DropdownFilterLink = styled(Link)`
  width: 6rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.625rem 1.25rem 0.625rem;
  cursor: pointer;
  font-weight: 500;
  color: ${(props) =>
    props.selected === props.children ? '#206EFB' : 'black'};

  :hover {
    font-weight: 700;
    background-color: #f1f3f5;
  }
`;
