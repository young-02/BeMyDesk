import React from 'react';
import DetailWriteForm from '@/components/detail-write/DetailWriteForm';

type Props = {};

export default function DetailWrite({}: Props) {
  return (
    <>
      <DetailWriteForm
        initialValues={{
          title: '',
          content: '',
          selectJob: '',
          attachment: '',
          list: [],
          selectList: [],
        }}
        mode={'create'}
      />
    </>
  );
}
