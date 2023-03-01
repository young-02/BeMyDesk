import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import DetailWriteSearch from './DetailWriteSearch';
import DetailWriteProductCard from './DetailWriteProductCard';
import axios from 'axios';
import QuillEditor from './DetailWriteFormEditor';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { dbService, auth, storage } from '../../shared/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import CustomButton from '../ui/CustomButton';

import Image from 'next/image';
axios.defaults.withCredentials = true;

// 글쓰기 페이지 폼 함수입니다
const DetailWriteForm = ({ initialValues, mode }: any) => {
  const router = useRouter();

  // 모달 관리 State
  const [isModalShow, setIsModalShow] = useState(false);
  const [title, setTitle] = useState(initialValues?.title);

  // 검색어 state
  const [searchWord, setSearchWord] = useState('');

  // 네이버 데이터 state
  const [data, setData] = useState<any[]>([]);

  // 검색해서 선택한 제품 state
  const [list, setList] = useState<any[]>(initialValues?.list);

  // 검색해서 선택한 제품들을 넣는 state
  const [selectList, setSelectList] = useState<any[]>(
    initialValues?.selectList,
  );
  console.log(selectList, 'selectList');

  // 직업 선택 state
  const [selectJob, setSelectJob] = useState(initialValues?.selectJob);

  // 에디터 내의 content 관리 state
  const [content, setContent] = useState(initialValues?.content);

  // 이미지 프리뷰 state
  const [attachment, setAttachment] = useState(initialValues?.attachment);

  // 직접입력 state
  const [enterYourself, setEnterYourself] = useState([]);

  // 에디터 텍스트 onchange함수
  const changeEditorText = (value: string) => {
    setContent(value);
  };

  const jobRef = useRef<any>();
  const titleRef = useRef<any>();

  /**
   * 인풋창에 작성할 때 딜레이가 안 되게끔 하는 함수
   */

  const inputSearchWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // console.log('검색 인풋');
      setSearchWord(e.target.value);
    },
    [],
  );

  /**
   * pages/api/datas api로 우회해서 네이버 오픈API 데이터 get해오는 함수
   */
  const getNaverData = async () => {
    const response = await axios
      .get('http://localhost:3000/api/naverData', {
        params: {
          query: searchWord,
        },
      })
      .then((response) => setData(response.data))
      .catch((Error) => console.log(Error));
  };

  // 모달창에서 검색한 제품 선택하기
  const selectProduct = (item: any) => {
    const newList = [...list, item];
    setList(newList);
    // console.log('list', list);
  };

  // 모달창에서 선택한 제품 삭제하기
  const deleteProduct = (item: any) => {
    const deletedList = list;
    setList(deletedList.filter((i) => i.productId !== item.productId));
  };

  // 모달 보이게 하기
  const showSearchModal = (event: any) => {
    setIsModalShow(true);
  };

  // 모달 숨기기
  const hideSearchModal = () => {
    setIsModalShow(!isModalShow);
  };

  // 모달에서 등록을 누르면 선택한 제품들이 선택되면서 모달이 닫히게 하는 함수
  const selectedProducts = (e: any) => {
    setSelectList(list);
    hideSearchModal();
    console.log(list, 'list');
  };

  // 글쓰기 폼 제목 입력
  const inputTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTitle(e.target.value);
    },
    [], //title
  );

  // 직업선택 onChange 함수
  const getJob = (e: any) => {
    setSelectJob(e.target.value);
  };

  // const enterYourselfInput = (e: any) => {
  //   setEnterYourself(e.target.value);
  // };

  // const fileUpload = (event: any) => {
  //   const imageUpload = event.target.files;
  //   const imageUrlList: string[] | any = [...imageFile];

  //   for (let i = 0; i < imageUpload.length; i++) {
  //     const currentImageUrl = URL.createObjectURL(imageUpload[i]);
  //     const reader = new FileReader();
  //     reader.readAsDataURL(currentImageUrl as any);
  //     console.log(imageUpload, 'imageUpload');
  //     reader.onloadend = () => {
  //       const base64Data = reader.result;
  //       console.log(base64Data);
  //     };
  //     imageUrlList.push(currentImageUrl);
  //   }

  //   if (imageUrlList.length > 2) {
  //     return alert('이미지 갯수 초과');
  //   }

  //   setImageFile(imageUrlList);
  // };

  // const deleteImage = (image: any) => {
  //   const imageUrlList = [...imageFile];
  //   setImageFile(imageUrlList.filter((i) => i !== image));
  // };

  const onFileChange = (e: any) => {
    const files = e.target.files;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      }: any = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 글쓰기 폼에서 최종적으로 등록하기 버튼을 누를 때 파이어베이스에 addDoc 되는 놈
  const submitPostForm = async (e: any) => {
    e.preventDefault();

    // 유효성 검사
    if (!selectJob || selectJob === '선택해주세요') {
      alert('누구의 책상인지 골라주세요!');
      return jobRef.current.focus();
    }

    if (!title) {
      alert('제목을 입력해주세요');
      titleRef.current.focus();
    }

    if (!attachment) {
      alert('데스크테리어 사진을 선택해주세요');
    }

    const products = list.map((item) => {
      return {
        productId: item.productId,
        images: item.image,
        title: item.title,
        url: item.link,
        hashTag: item.category2,
      };
    });

    const fileRef = await ref(
      storage,
      `images/${auth.currentUser?.uid}/${v4()}`,
    );
    const uploadFile = await uploadString(fileRef, attachment, 'data_url');
    const fileURL = await getDownloadURL(uploadFile.ref);

    const docRef = await addDoc(collection(dbService, 'postData'), {
      createdAt: Date.now(),
      userId: auth.currentUser?.uid,
      jobCategory: selectJob,
      postTitle: title,
      postText: content,
      postImage1: fileURL,
      postImage2: null,
      likes: [],
      likesCount: 0,
      products: products,
      userNickname: auth.currentUser?.displayName,
      userProfile: auth.currentUser?.photoURL,
    });
    alert('글이 저장되었습니다');
    router.push('/post-list');
  };

  // 수정 페이지에서 등록하기를 누르면 파이어베이스에 updateDoc 되는 놈
  const updatePost = async (selectList: any) => {
    console.log('selectListttt', selectList);
    const updateRef = doc(dbService, 'postData', router.query.id);
    const updateProducts =
      // selectList.map((item: any) => {
      // console.log('item', item);
      // return
      {
        productId: selectList?.productId,
        images: selectList?.image,
        title: selectList.title,
        url: selectList?.link,
        hashTag: selectList?.category2,
      };
    // });
    console.log('updateProducts', updateProducts);
    // const arr = [...selectList, updateProducts];
    // console.log(arr, 'arr');
    await updateDoc(updateRef, {
      postTitle: title,
      postText: content,
      jobCategory: selectJob,
      postImage1: attachment,
      products: selectList,
    });

    alert('글이 수정되었습니다');
    router.push('/post-list');
  };

  return (
    <>
      {isModalShow && (
        <DetailWriteSearch
          onClose={hideSearchModal}
          list={list}
          setList={setList}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          data={data}
          setData={setData}
          inputSearchWord={inputSearchWord}
          getNaverData={getNaverData}
          selectProduct={selectProduct}
          deleteProduct={deleteProduct}
          // value={enterYourself}
          setEnterYourself={setEnterYourself}
          // onChange={enterYourselfInput}
          onClick={selectedProducts}
        />
      )}
      <DetailWriteLayout>
        <JobSelectBox>
          <select
            className="job_select"
            onChange={getJob}
            value={selectJob}
            ref={jobRef}
          >
            <option className="optionOne">선택해주세요</option>
            <option value="개발자">개발자</option>
            <option value="디자이너">디자이너</option>
            <option value="학생">학생</option>
            <option value="게이머">게이머</option>
          </select>
          <p className="job_span"> 의 책상</p>
        </JobSelectBox>
        <TitleInput
          type="text"
          placeholder="제목을 입력해주세요"
          maxLength={30}
          value={title}
          onChange={inputTitle}
          ref={titleRef}
        />
        <QuillEditor onChange={changeEditorText} value={content} />
        <DetailWriteBox>
          <span className="title_span">테스크테리어 사진을 추가해주세요</span>
          <DeskPhotoBox>
            {attachment && (
              <Image
                src={attachment}
                width={150}
                height={150}
                alt="attachmentImg"
              />
            )}

            <label className="deskImgLabel" htmlFor="deskImg">
              {/* <Image src={chooseImage.src} /> */}
              <span>이미지를 추가해주세요</span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              id="deskImg"
              name="deskImg"
              onChange={onFileChange}
            />
          </DeskPhotoBox>
        </DetailWriteBox>
        <DetailWriteBox>
          <div>
            <span className="title_span">사용하신 제품을 선택해주세요</span>
            <CustomButton
              onClick={showSearchModal}
              backgroundColor="#206efb"
              border="1"
              paddingColumns="1"
              paddingRow="1"
              fontColor="#fff"
              borderRadius="1.25"
              fontWeight="700"
              // fontSize="1"
            >
              기기검색
            </CustomButton>
          </div>

          <DetailWriteProductCardBox>
            <DetailWriteProductCard key={selectList} selectList={selectList} />
          </DetailWriteProductCardBox>
        </DetailWriteBox>
        <DetailWriteButtonBox>
          <CustomButton
            backgroundColor="#206efb"
            fontColor="#fff"
            borderRadius="1.25"
            width="10"
            margin="0 1.5"
            fontWeight="700"
            fontSize="1.25"
            onClick={
              mode === 'update'
                ? () => router.push(`/detail/${router.query.id}`)
                : () => router.push('/post-list')
            }
          >
            취소
          </CustomButton>
          <CustomButton
            backgroundColor="#206efb"
            fontColor="#fff"
            borderRadius="1.25"
            width="10"
            fontWeight="700"
            fontSize="1.25"
            onClick={
              mode === 'update' ? () => updatePost(selectList) : submitPostForm
            }
          >
            완료
          </CustomButton>
        </DetailWriteButtonBox>
      </DetailWriteLayout>
    </>
  );
};

export default DetailWriteForm;

const DetailWriteLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 9rem;
  margin-bottom: 4rem;
  width: 75%;
  border: 1px solid black;
  border-radius: 1.875rem;
  padding: 5rem 6.25rem;
  box-sizing: border-box;
`;

const JobSelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 75rem;
  height: 3.25rem;

  .job_select {
    width: 7.375rem;
    height: 40px;
    border: 0.0625rem solid #868e96;
    border-radius: 0.625rem;
    padding: 0.25rem 0.5rem;

    &:hover {
      border-color: #206efb;
    }
  }

  .job_span {
    font-size: 1.125rem;
    line-height: 1.25rem;
  }
`;

const TitleInput = styled.input`
  display: flex;
  width: 75rem;
  height: 3.25rem;
  box-sizing: border-box;
  border: 0.125rem solid #868e96;
  border-radius: 0.625rem;
  padding: 0.875rem 1.25rem;
  font-size: 1.25rem;
`;

const DetailWriteButtonBox = styled.div`
  display: flex;
  justify-content: end;
  width: 75rem;
  height: 3.25rem;
  margin-top: 7rem;

  .btn {
    background-color: #206efb;
    border: none;
    border-radius: 0.625rem;
    color: white;
    font-size: 1.25rem;
    line-height: 1.25rem;
    width: 9.375rem;
    height: 3.25rem;
    margin: 0 0.8rem;
    padding: 1rem 2.5rem;

    &:hover {
      color: #206efb;
      background-color: #fff;
    }
  }
`;

const DetailWriteBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 75rem;
  height: 18.75rem;
  margin: 1rem;

  .title_span {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    margin-right: 1rem;
  }
`;

const DeskPhotoBox = styled.div`
  .deskterior_label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    border: 1px solid #868e96;
    border-radius: 0.625rem;

    &:hover {
      background-color: #206efb;
      color: #fff;
    }
  }

  input {
    display: none;
  }

  span {
    font-weight: lighter;
    font-size: 1rem;
  }
`;
const DetailWriteProductCardBox = styled.div`
  display: flex;
  justify-content: center;
`;
