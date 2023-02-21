import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const DetaillWriteImageInput = () => {
  // 데스크테리어 이미지 관리 state
  const [imageFile, setImageFile] = useState([]);

  const fileUpload = (event: any) => {
    const imageUpload = event.target.files;
    const imageUrlList: string[] | any = [...imageFile];

    for (let i = 0; i < imageUpload.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageUpload[i]);
      imageUrlList.push(currentImageUrl);
    }

    if (imageUrlList.length > 2) {
      return alert('이미지 갯수 초과');
    }

    setImageFile(imageUrlList);
  };

  const deleteImage = (image: any) => {
    const imageUrlList = [...imageFile];
    setImageFile(imageUrlList.filter((i) => i !== image));
  };

  return (
    <DetaillWriteImageCardLayout>
      <label htmlFor="images">
        <p>파일을 선택해주세요 {`${imageFile.length}`}/2</p>
      </label>
      <input
        id="images"
        type="file"
        multiple
        accept="image/*"
        onChange={fileUpload}
      />
      {imageFile.map((image) => (
        <div
          key={image}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        >
          <img
            src={image}
            alt={`${image}`}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <div onClick={() => deleteImage(image)} style={{ cursor: 'pointer' }}>
            x
          </div>
        </div>
      ))}
    </DetaillWriteImageCardLayout>
  );
};

const DetaillWriteImageCardLayout = styled.section`
  display: flex;
  width: 400px;
  height: 12.5rem;
  background-color: yellow;
  align-items: center;
  justify-content: center;

  > label {
    display: flex;
    width: 20.625rem;
    height: 12.5rem;
    background-color: red;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
  }

  > input {
    display: none;
  }
`;

export default DetaillWriteImageInput;
