import React, { useEffect } from 'react';
import DetailWriteForm from '@/components/detail-write/DetailWriteForm';
import useCheckUser from '@/Hooks/useCheckUser';
import { useRouter } from 'next/router';

type Props = {};

export default function DetailWrite({}: Props) {
  const router = useRouter();
  useEffect(() => {
    const userExist = sessionStorage.getItem('userExist');
    if (userExist == 'false') {
      alert('유저 정보를 설정하세요');
      router.push('/auth/sns-nickname');
    }
  }, []);
  return (
    <>
      <DetailWriteForm
        initialValues={{
          title: '',
          content: '',
          selectJob: '',
          attachment: [],
          url: [],
          postImage: [],
          list: [],
          selectList: [],
        }}
        mode={'create'}
      />
    </>
  );
}
