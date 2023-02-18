import useSearch from '../Hooks/useSearch';
import PostListItem from '../post-list/PostListItem';
// import useSearch from '../hook/useSearch'

export default function Top({}) {
  const { isActive, deskSearch, search, changeWord, setIsActive, searchList } = useSearch();

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
        }}
      >
        <div>logo</div>
        <ul style={{ display: 'flex' }}>
          <li>포스트</li>
          <li>글쓰기</li>
        </ul>

        {isActive ? (
          <>
            <form onSubmit={deskSearch}>
              <input
                type="text"
                value={search}
                placeholder="검색어를 작성해 주세요"
                onChange={changeWord}
              />
              <button>erer</button>
            </form>
            <span onClick={() => setIsActive(false)}>X</span>
          </>
        ) : (
          <button onClick={() => setIsActive(true)}>search</button>
        )}
      </div>
      {searchList.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
    </>
  );
}
