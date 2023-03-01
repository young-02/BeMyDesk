import DetailWriteForm from '@/components/detail-write/DetailWriteForm';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { dbService, auth } from '../../../../shared/firebase';

type Props = {};

const Edit = (props: Props) => {
  const [initialValues, setInitialValues] = useState();
  const router = useRouter();
  // const { id } = router.query;

  useEffect(() => {
    if (router.query) {
      getDoc(doc(dbService, 'postData', router.query.id)).then((doc) => {
        const data = doc.data();
        // console.log(data, 'data');
        setInitialValues(data as any);
      });
    }
  }, []);

  console.log(initialValues, 'initialValues');
  return (
    <>
      {initialValues && (
        <DetailWriteForm
          initialValues={{
            title: initialValues?.postTitle,
            content: initialValues?.postText,
            selectJob: initialValues?.jobCategory,
            attachment: initialValues?.postImage1,
            list: initialValues?.products,
            selectList: initialValues?.products,
          }}
          mode={'update'}
        />
      )}
      <h1>게시글 수정</h1>
    </>
  );
};

export default Edit;
