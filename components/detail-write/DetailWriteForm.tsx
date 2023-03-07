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
import { relative } from 'path';
axios.defaults.withCredentials = true;

// 글쓰기 페이지 폼 함수입니다
const DetailWriteForm = ({ initialValues, mode }: any) => {
  const router = useRouter();

  // 모달 관리 State
  const [isModalShow, setIsModalShow] = useState(false);

  // 제목 관리 state
  const [title, setTitle] = useState(initialValues?.title);

  // 검색어 state
  const [searchWord, setSearchWord] = useState('');

  // 네이버 데이터 state
  const [data, setData] = useState<any[]>([]);

  // 검색해서 선택한 제품 state
  const [list, setList] = useState<any[]>(initialValues?.list);
  // console.log(list, 'list');
  // 검색해서 선택한 제품들을 넣는 state
  const [selectList, setSelectList] = useState<any[]>(
    initialValues?.selectList,
  );

  // 직업 선택 state
  const [selectJob, setSelectJob] = useState(initialValues?.selectJob);

  // 에디터 내의 content 관리 state
  const [content, setContent] = useState(initialValues?.content);

  // 이미지 프리뷰 state
  const [attachment, setAttachment] = useState(initialValues?.attachment);

  // 직접입력 토글버튼 state
  const [isNotData, setIsNotData] = useState(false);

  const [enter, setEnter] = useState(false);

  const [saveSearchWord, setSaveSearchWord] = useState('');

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
      .get('https://be-my-desk-git-dev-young-02.vercel.app/api/naverData', {
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
    // console.log(list, 'list');
  };

  // 글쓰기 폼 제목 입력
  const inputTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  }, []);

  // 직업선택 onChange 함수
  const getJob = (e: any) => {
    setSelectJob(e.target.value);
  };

  const leftToggle = () => {
    setIsNotData(false);
  };

  const rightToggle = () => {
    setIsNotData(true);
  };

  const selectPreview = (event: any) => {
    if (event.currentTarget.files) {
      let fileArr = event.currentTarget.files;
      // console.log(fileArr, 'fileArr');

      let fileUrl: any[] = [];
      let file = File;

      for (let i = 0; i < fileArr.length; i++) {
        if (fileArr.length > 2) {
          alert('이미지는 2개까지 업로드 할 수 있습니다');
          return;
        }
        let fileReader = new FileReader();
        file = fileArr[i];
        fileReader.onload = () => {
          fileUrl[i] = fileReader.result;
          setAttachment((prev: any) => [...fileUrl]);
        };
        fileReader.readAsDataURL(file as any);
      }
    }
  };

  const deleteImage = (image: any) => {
    const imageUrlList = [...attachment];
    setAttachment(imageUrlList.filter((i) => i !== image));
  };

  // 글쓰기 폼에서 최종적으로 등록하기 버튼을 누를 때 파이어베이스에 addDoc 되는 놈
  const submitPostForm = async () => {
    // 유효성 검사
    if (!selectJob || selectJob === '선택해주세요') {
      alert('누구의 책상인지 골라주세요!');
      return jobRef.current.focus();
    }

    if (!title) {
      alert('제목을 입력해주세요');
      return titleRef.current.focus();
    }

    if (!attachment) {
      alert('데스크테리어 사진을 선택해주세요');
      return;
    }

    if (attachment.length < 2) {
      alert('데스크테리어 사진을 선택해주세요');
      return;
    }

    const products = list.map((item) => {
      return {
        productId: item.productId,
        image: item.image,
        title: item.title,
        link: item.link,
        category2: item.category2,
      };
    });

    const docRef = await addDoc(collection(dbService, 'postData'), {
      createdAt: Date.now(),
      userId: auth.currentUser?.uid,
      jobCategory: selectJob,
      postTitle: title,
      postText: content,
      likes: [],
      likesCount: 0,
      products: products,
      userNickname: auth.currentUser?.displayName,
      userProfile: auth.currentUser?.photoURL,
    });
    const imageArray: string[] = [];
    await attachment.map((image: any) => {
      const imageRef = ref(storage, `images/${auth.currentUser?.uid}/${v4()}`);

      uploadString(imageRef, image, 'data_url').then(async (snapshot: any) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageArray.push(downloadURL);
        setAttachment(imageArray);
        await updateDoc(doc(dbService, 'postData', docRef.id), {
          postImage1: attachment[0] || null,
          postImage2: attachment[1] || null,
        });
      });
    });

    alert('글이 저장되었습니다');
    router.push('/post-list');
  };

  // 수정 페이지에서 등록하기를 누르면 파이어베이스에 updateDoc 되는 함수
  const updatePost = async (selectList: any) => {
    // console.log('selectListttt', selectList);
    const updateRef = doc(dbService, 'postData', router.query.id);
    const updateProducts = selectList.map((item: any) => {
      return {
        productId: item.productId,
        image: item.image,
        title: item.title,
        link: item.link,
        category2: item.category2,
      };
    });

    await updateDoc(updateRef, {
      postTitle: title,
      postText: content,
      jobCategory: selectJob,
      postImage1: attachment[0],
      postImage2: attachment[1],
      products: updateProducts,
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
          isNotData={isNotData}
          leftToggle={leftToggle}
          rightToggle={rightToggle}
          setIsNotData={setIsNotData}
          // enterSearchWord={enterSearchWord}
          enter={enter}
          setEnter={setEnter}
          saveSearchWord={saveSearchWord}
          setSaveSearchWord={setSaveSearchWord}
          // enterYourselfInput={enterYourselfInput}
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
          <div className="title_span_a">데스크테리어 이미지를 추가해주세요</div>
          <div className="preview_image_wrap">
            {attachment.length === 0 && (
              <div className="image-container">
                <div className="no-preview-box">
                  <Image
                    src={'/images/preViewImg.png'}
                    alt="preview"
                    width={64}
                    height={64}
                  />
                </div>
              </div>
            )}

            {attachment.length > 0 &&
              attachment?.map((image: any) => (
                <div className="image-container" key={image}>
                  <Image
                    className="preview_image"
                    src={image}
                    alt="preview"
                    width={200}
                    height={200}
                  />

                  <Image
                    className="closeBtnImage"
                    src={'/images/close.png'}
                    width={15}
                    height={15}
                    alt="closeBtnImage"
                    onClick={() => deleteImage(image)}
                  />
                </div>
              ))}
          </div>

          <DeskPhotoBox>
            <div className="photo_wrap">
              <label className="desk_label" htmlFor="deskImage">
                이미지를 업로드해주세요 {attachment.length}/2
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="deskImage"
                  name="deskImage"
                  onChange={selectPreview}
                />
              </label>
            </div>
          </DeskPhotoBox>
        </DetailWriteBox>
        <DetailWriteBox>
          <div className="title_span_box">
            <div className="title_span_b">사용하신 제품을 선택해주세요</div>
            <CustomButton
              onClick={showSearchModal}
              color="#206efb"
              border="1"
              paddingColumns="1"
              paddingRow="1"
              fontColor="#fff"
              fontSize="1"
              borderRadius="1.25"
              fontWeight="700"
              // fontSize="1"
            >
              기기검색
            </CustomButton>
          </div>
          {selectList.length === 0 && (
            <NoPreviewImageBox>
              <div className="laptop_box">
                <Image
                  src={'/images/laptop.png'}
                  alt="isYourProduct"
                  width={600}
                  height={600}
                  className="laptop"
                />
                <div className="check_text">등록하신 제품이 없어요</div>
              </div>
            </NoPreviewImageBox>
          )}

          <DetailWriteProductCardBox>
            <DetailWriteProductCard
              key={selectList}
              selectList={selectList}
              setSelectList={setSelectList}
              list={list}
              setList={setList}
            />
          </DetailWriteProductCardBox>
        </DetailWriteBox>
        <DetailWriteButtonBox>
          <CustomButton
            fontColor="#000"
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
  padding: 2.5rem;
  box-sizing: border-box;
`;

const JobSelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
    margin: 0 0.5rem;
  }
`;

const TitleInput = styled.input`
  display: flex;
  width: 100%;
  height: 3.25rem;
  box-sizing: border-box;
  border: 1px solid #0000;
  border-bottom: 1px solid #868e96;
  font-size: 1.25rem;
`;

const DetailWriteButtonBox = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 3.25rem;
  margin-top: 3rem;

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
  width: 100%;

  .image-container {
    position: relative;
    width: 35%;
    height: 15rem;
    border: 1px solid #868e96;
    border-radius: 1.25rem;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-right: 1rem;
  }

  .no-preview-box {
    position: relative;
    left: 42%;
    top: 36%;

    > img {
      width: 4rem;
      height: 4rem;
    }
  }

  .preview_image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .closeBtnImage {
    position: absolute;
    top: 10%;
    right: 5%;
    cursor: pointer;
  }

  .preview_image_wrap {
    display: flex;
    flex-direction: row;
  }

  .test_image {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .title_span_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 0.5rem;
  }

  .title_span_a {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.5rem;
    color: #17171c;
    line-height: 2rem;
    margin-right: 1rem;
    margin-top: 3rem;
    align-content: center;
  }

  .title_span_b {
    font-weight: 700;
    font-size: 1.5rem;
    color: #17171c;
    line-height: 2rem;
    align-content: center;
  }
`;

const DeskPhotoBox = styled.div`
  position: relative;
  width: 100%;
  height: 5rem;
  flex-direction: column;

  .photo_wrap {
    position: relative;
    width: 100%;
    height: 3.25rem;
    flex-direction: column;
    margin-top: 1rem;

    .desk_label {
      display: flex;
      width: 100%;
      height: 100%;
      border: 1px solid #868e96;
      border-radius: 1.25rem;
      font-size: 1.25rem;
      justify-content: center;
      align-items: center;

      > input {
        display: none;
      }
    }
  }
`;
const DetailWriteProductCardBox = styled.div`
  display: flex;
  justify-content: center;
`;

const NoPreviewImageBox = styled.div`
  display: flex;
  width: 100%;

  .laptop_box {
    position: relative;
    width: 35%;
    height: 15rem;
    border: 1px solid #868e96;
    border-radius: 1.25rem;

    &:hover {
      border: 1px solid #206efb;
    }
  }

  .laptop {
    position: absolute;
    top: 15%;
    left: 15%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    vertical-align: middle;
    opacity: 0.2;
    transform: rotate(14.85deg);
    padding-left: 3rem;
  }

  .check_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 3rem;
    color: #868e96;

    &:hover {
      color: #206efb;
    }
  }
`;

const DeskPhotoWrap = styled.div`
  position: relative;
  width: 35%;
  height: 15rem;
  border: 1px solid #868e96;
  border-radius: 0.625rem;
  overflow: hidden;

  .deskImgLabel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
    padding: 1rem;
  }

  .preview-div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    > img {
      object-fit: cover;
    }
  }
`;
