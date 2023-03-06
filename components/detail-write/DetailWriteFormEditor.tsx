import dynamic from 'next/dynamic';
import React from 'react';
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
    ['italic', 'underline', 'strike', 'blockquote'],
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

export default function DetailWriteFormEditor({ value, onChange }: any) {
  return (
    <EditorStyle
      theme="snow"
      modules={modules}
      formats={formats}
      placeholder="내용을 입력해주세요"
      value={value}
      onChange={onChange}
    />
  );
}

const EditorStyle = styled(Editor)`
  width: 100%;
  height: 37.5rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  margin-top: 2.5rem;
  border: 0.0625rem solid #868e96;
  border-radius: 0.9375rem;
  overflow: hidden;

  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    border: none;
    border-top: 0.0625rem solid #868e96;
  }

  .ql-toolbar.ql-snow {
    border: none;
    background-color: #efefef;
    padding: 0.8rem;
  }
`;
