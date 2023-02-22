import Image from 'next/image';
import useSearch from './Hooks/useSearch';
import PostListItem from './post-list/PostListItem';
// import useSearch from '../hook/useSearch'
import styled from 'styled-components';

export default function Search({ pathname }: { pathname: string }) {
  const { isActive, deskSearch, search, setSearch, changeWord, setIsActive } =
    useSearch();

  return (
    <>
      <SearchLayout
        onSubmit={deskSearch}
        theme={pathname === '/main' ? 'dark' : 'light'}
      >
        {/* <div className={isActive ? 'active' : 'inactive'} /> */}
        <input
          type="text"
          value={search}
          placeholder="검색어를 작성해 주세요"
          onChange={changeWord}
          className={isActive ? 'active' : 'inactive'}
        />
        <Image
          alt="likes-icon"
          src={`/images/${
            pathname === '/main' ? 'dark' : 'light'
          }ThemeSearch.png`}
          width={20}
          height={20}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setIsActive(!isActive);
          }}
        />
      </SearchLayout>
    </>
  );
}

const SearchLayout = styled.form<{ theme: string }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
  font-family: 'Pretendard Variable';
  font-size: 1.125rem;
  font-weight: 500;

  /* > div {
    position: absolute;
    right: 1.25rem;
    width: 2.625rem;
    height: 100%;

    &.inactive {
      opacity: 0;
      transition: all 0.2s ease;
      transition-delay: 0.2s;
      background-color: ${(props) =>
    props.theme === 'light' ? 'white' : '#17171C'};
    }

    &.inactive {
      opacity: 1;
      transition: all 0.2s ease;
      transition-delay: 0.2s;
      background-color: ${(props) =>
    props.theme === 'light' ? 'white' : '#17171C'};
    }
  } */

  > input {
    border: 0.0625rem solid
      ${(props) => (props.theme === 'light' ? '#17171C' : 'white')};
    border-radius: 0.625rem;
    background-color: ${(props) =>
      props.theme === 'light' ? 'white' : '#17171C'};
    color: ${(props) => (props.theme === 'light' ? '#17171C' : 'white')};

    &.inactive {
      width: 0rem;
      padding: 0.625rem 0rem;
      opacity: 0;
      transition: all 0.5s ease;
    }

    &.active {
      width: 21.75rem;
      padding: 0.625rem 1.25rem;
      opacity: 1;
      transition: all 0.5s ease;
    }

    ::placeholder {
      color: #adb5bd;
    }

    :focus {
      border: 0.0625rem solid #206efb;
    }
  }
`;
