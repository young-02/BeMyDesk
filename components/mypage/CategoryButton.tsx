import React from 'react';

function CategoryButton({ category, setCategory }: any) {
  return (
    <>
      {' '}
      <button
        onClick={() => {
          setCategory('myPost');
        }}
        style={{
          backgroundColor: category === 'myPost' ? 'blue' : 'lightgrey',
          width: '110px',
        }}
      >
        게시물
      </button>
      <button
        onClick={() => {
          setCategory('myScrap');
        }}
        style={{
          backgroundColor: category === 'myScrap' ? 'blue' : 'lightgrey',
          width: '110px',
        }}
      >
        스크랩
      </button>
      <button
        onClick={() => {
          setCategory('myFollow');
        }}
        style={{
          backgroundColor: category === 'myFollow' ? 'blue' : 'lightgrey',
          width: '110px',
        }}
      >
        팔로우
      </button>
    </>
  );
}

export default CategoryButton;
