import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

type Props = {};

const editor = (props: Props) => {
  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          [
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'code-block',
            'formula',
          ],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
          ['clean'], // toolbar 설정 초기화 설정
        ],
      },
    }),
    [],
  );

  const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'formula',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
  ];
  return (
    <EditorStyle
      theme="snow"
      modules={modules}
      formats={formats}
      placeholder="내용을 입력해주세요"
    />
  );
};

const EditorStyle = styled(ReactQuill)`
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

export default editor;
