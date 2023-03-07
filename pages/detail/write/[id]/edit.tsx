import DetailWriteForm from '@/components/detail-write/DetailWriteForm';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { dbService, auth } from '../../../../shared/firebase';

type Props = {};

const Edit = (props: Props) => {
  const [initialValues, setInitialValues] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getDoc(doc(dbService, 'postData', router.query.id)).then((doc) => {
        const data = doc.data();

        setInitialValues(data as any);
      });
    }
  }, [id, router.query.id]);

  const initialArray = [];
  initialArray.push(initialValues?.postImage1);
  initialArray.push(initialValues?.postImage2);
  return (
    <>
      {initialValues && (
        <DetailWriteForm
          initialValues={{
            title: initialValues?.postTitle,
            content: initialValues?.postText,
            selectJob: initialValues?.jobCategory,
            attachment: initialArray,
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
