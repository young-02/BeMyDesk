import { app, auth, dbService, storage } from '@/shared/firebase';
import { updatePassword, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ChangePassword from './editProfile/ChangePassword';
import ChangeProfile from './editProfile/ChangeProfile';

export function ProfileEditModal({
  setProfileEditModalOpen,
  user,
  profileData,
}: any) {
  const [toggleEditMenu, setToggleEditMenu] = useState(true);
  //프로필사진
  const [profileImageUrl, setProfileImageUrl] = useState(user.photoURL);

  const fileInputRef = useRef<HTMLInputElement>(null);

  //프로필사진 클릭시 input실행
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  // 프로필 사진 변경
  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `profile/${user.uid}/profile-image`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    // auth에 올리기
    await updateProfile(user, {
      photoURL: downloadURL,
    });
    setProfileImageUrl(downloadURL);
    // userInfo에 올리기
    const collectionRef = doc(dbService, `userInfo/${user.uid}`);
    const payload = {
      profileImage: downloadURL,
    };
    updateDoc(collectionRef, payload);
  };

  //프사삭제
  const removeProfileImage = function () {
    const default_Image = '/images/defaultProfile.png';
    updateProfile(user, {
      photoURL: default_Image,
    });
    setProfileImageUrl(default_Image);
    // auth에 올리기
    // userInfo에 올리기
    const collectionRef = doc(dbService, `userInfo/${user.uid}`);
    const payload = {
      profileImage: default_Image,
    };
    updateDoc(collectionRef, payload);
  };

  return (
    <StyledEditProfileModalContainer>
      <div
        className="modal-overlay"
        onClick={() => setProfileEditModalOpen(false)}
      />
      <div className="modal-content">
        <div className="left-continer">
          <div>
            <img
              src={profileImageUrl}
              alt="ProfileImage"
              width={202}
              height={202}
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button onClick={removeProfileImage}>기본 이미지 변경하기</button>
          </div>

          <div>
            <button onClick={() => setToggleEditMenu(true)}>
              프로필 정보 설정
            </button>
            <button
              onClick={() => setToggleEditMenu(false)}
              disabled={user.providerData[0].providerId !== 'password'}
            >
              비밀번호 변경
            </button>
            <p>
              {user.providerData[0].providerId !== 'password'
                ? 'SNS 로그인 유저는 비밀번호를 변경할수 없습니다.'
                : null}{' '}
            </p>
          </div>
        </div>
        <div className="right-continer">
          <div>
            <p>{toggleEditMenu ? '프로필 정보 설정' : '비밀번호 변경'}</p>
            <button
              className="modal-close"
              onClick={() => setProfileEditModalOpen(false)}
            >
              X
            </button>
          </div>

          {toggleEditMenu ? (
            <ChangeProfile user={user} profileData={profileData} />
          ) : (
            <ChangePassword user={user} />
          )}
        </div>
      </div>
    </StyledEditProfileModalContainer>
  );
}

const StyledEditProfileModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    display: flex;
    justify-content: space-between;
    z-index: 101;
    width: 792px;
    height: 640px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    div {
      border: 1px solid black;
    }
  }

  .modal-close {
    font-size: 24px;
    line-height: 1;
    background: #17171c;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
export default ProfileEditModal;
