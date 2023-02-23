import dynamic from 'next/dynamic';
import React, { useMemo, memo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const Editor = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>loading</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
];

export default function DetailWriteFormEditor({
  value,
  onChange,
  onLoad,
}: any) {
  return (
    <div>
      <EditorStyle
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="내용을 입력해주세요"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const EditorStyle = styled(Editor)`
  width: 77rem;
  height: 37.5rem;
  box-sizing: border-box;
  padding: 1rem;
  margin-bottom: 1.875rem;

  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    border: 0.125rem solid #868e96;
    border-radius: 0.625rem;
  }

  .ql-toolbar.ql-snow {
    border-radius: 0.625rem;
    border: 0.125rem solid #868e96;
  }
`;
