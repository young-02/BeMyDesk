import { app, auth, dbService, storage } from '@/shared/firebase';
import { updatePassword, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ChangePassword from './editProfile/ChangePassword';
import ChangeProfile from './editProfile/ChangeProfile';
import { BiCamera } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import DeleteAccount from './editProfile/DeleteAccount';
import { useQueryClient } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import useResponsive from '@/Hooks/useResponsive';

export function ProfileEditModal({
  setProfileEditModalOpen,
  user,
  profileData,
}: any) {
  const [toggleEditMenu, setToggleEditMenu] = useState({
    profileEditToggle: true,
    changePasswordToggle: false,
    deleteAccountToggle: false,
  });
  // 프사 변경시 캐쉬 다시 불러오기 위한 쿼리 클라이언트
  const queryClient = useQueryClient();

  // 구조분해 할당
  const { profileEditToggle, changePasswordToggle, deleteAccountToggle } =
    toggleEditMenu;

  //프로필사진
  const [profileImageUrl, setProfileImageUrl] = useState(
    profileData.profileImage,
  );

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
    queryClient.removeQueries('userInfo');
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
    queryClient.removeQueries('userInfo');
  };
  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 1000,
    minWidth: 1001,
  });

  return (
    <>
      {isDesktop && (
        <StyledEditProfileModalContainer>
          <div
            className="modal-overlay"
            onClick={() => setProfileEditModalOpen(false)}
          />
          <div className="modal-content">
            <div className="modalLeftContiner">
              <div className="modalFirstLine">
                <div
                  onClick={handleImageClick}
                  className="modalProfileImageContainer"
                >
                  <Image
                    src={profileImageUrl}
                    alt="ProfileImage"
                    // onClick={handleImageClick}
                    className="modalProfileImage"
                    width={202}
                    height={202}
                  />

                  <div className="modalProfileImageOverlay">
                    <BiCamera className="modalProfileImageOverlayIcon" />
                    <p className="modalProfileImageOverlayText">
                      프로필 사진 변경
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="modalSecondLine">
                <button
                  className="modalSecondLineButton"
                  onClick={removeProfileImage}
                >
                  기본 이미지 변경하기
                </button>
              </div>
              <div className="modalThirdLine">
                <button
                  className={
                    profileEditToggle
                      ? 'editModalbuttonActive'
                      : 'editModalbuttoninActive'
                  }
                  onClick={() =>
                    setToggleEditMenu({
                      profileEditToggle: true,
                      changePasswordToggle: false,
                      deleteAccountToggle: false,
                    })
                  }
                >
                  프로필 정보 설정
                </button>
                <button
                  className={
                    changePasswordToggle
                      ? 'editModalbuttonActive'
                      : 'editModalbuttoninActive'
                  }
                  onClick={() =>
                    setToggleEditMenu({
                      profileEditToggle: false,
                      changePasswordToggle: true,
                      deleteAccountToggle: false,
                    })
                  }
                  disabled={user.providerData[0].providerId !== 'password'}
                >
                  비밀번호 변경
                </button>
                <p className="modalThirdLineButton2Warning">
                  {user.providerData[0].providerId !== 'password'
                    ? 'SNS 로그인 유저는 비밀번호를 변경할수 없습니다.'
                    : null}{' '}
                </p>
              </div>
              <div className="modalFourthLine">
                <button
                  className="deleteAccountText"
                  onClick={() =>
                    setToggleEditMenu({
                      profileEditToggle: false,
                      changePasswordToggle: false,
                      deleteAccountToggle: true,
                    })
                  }
                >
                  회원탈퇴
                </button>
              </div>
            </div>
            <div className="modalRightContiner">
              <div className="RightModalFirstLine">
                <p className="RightModalTitle">
                  {profileEditToggle && '프로필 정보 설정'}
                  {changePasswordToggle && '비밀번호 변경'}
                  {deleteAccountToggle && '회원 탈퇴'}
                </p>
                <button
                  className="modal-close"
                  onClick={() => setProfileEditModalOpen(false)}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <div>
                {profileEditToggle && (
                  <ChangeProfile
                    user={user}
                    profileData={profileData}
                    setProfileEditModalOpen={setProfileEditModalOpen}
                  />
                )}
                {changePasswordToggle && <ChangePassword user={user} />}
                {deleteAccountToggle && <DeleteAccount />}
              </div>
            </div>
          </div>
        </StyledEditProfileModalContainer>
      )}
      {/* 여기부터 모바일 */}

      {isMobile && (
        <MobileStyledEditProfileModalContainer>
          <div
            className="modal-overlay"
            onClick={() => setProfileEditModalOpen(false)}
          />
          <div className="modal-content">
            {/* 버튼 DIV */}
            <div className="modal-buttonDiv">
              <div>
                <button
                  className={
                    profileEditToggle
                      ? 'editModalbuttonActive'
                      : 'editModalbuttoninActive'
                  }
                  onClick={() =>
                    setToggleEditMenu({
                      profileEditToggle: true,
                      changePasswordToggle: false,
                      deleteAccountToggle: false,
                    })
                  }
                >
                  프로필 정보 설정
                </button>
                <button
                  className={
                    changePasswordToggle
                      ? 'editModalbuttonActive'
                      : 'editModalbuttoninActive'
                  }
                  onClick={() =>
                    setToggleEditMenu({
                      profileEditToggle: false,
                      changePasswordToggle: true,
                      deleteAccountToggle: false,
                    })
                  }
                  disabled={user.providerData[0].providerId !== 'password'}
                >
                  비밀번호 변경
                </button>
              </div>
              <div className="deleteAccountDiv">
                <button
                  className="deleteAccountText"
                  onClick={() =>
                    setToggleEditMenu({
                      profileEditToggle: false,
                      changePasswordToggle: false,
                      deleteAccountToggle: true,
                    })
                  }
                >
                  회원탈퇴
                </button>
              </div>
            </div>
            <div className="buttonBottomDiv">
              <p className="buttonBottomDivText">
                {user.providerData[0].providerId !== 'password'
                  ? 'SNS 로그인 유저는 비밀번호를 변경할수 없습니다.'
                  : null}{' '}
              </p>
            </div>
            {/* // 프사DIV */}
            {profileEditToggle ? (
              <div className="modalProfileDiv">
                <div
                  onClick={handleImageClick}
                  className="modalProfileImageContainer"
                >
                  <Image
                    src={profileImageUrl}
                    alt="ProfileImage"
                    // onClick={handleImageClick}
                    className="modalProfileImage"
                    width={164}
                    height={164}
                  />

                  <div className="modalProfileImageOverlay">
                    <BiCamera className="modalProfileImageOverlayIcon" />
                    <p className="modalProfileImageOverlayText">
                      프로필 사진 변경
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="defultImageButton"
                    onClick={removeProfileImage}
                  >
                    프로필 사진 삭제
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mainDiv">
              {profileEditToggle && (
                <ChangeProfile
                  user={user}
                  profileData={profileData}
                  setProfileEditModalOpen={setProfileEditModalOpen}
                />
              )}
              {changePasswordToggle && (
                <ChangePassword
                  user={user}
                  setProfileEditModalOpen={setProfileEditModalOpen}
                />
              )}
              {deleteAccountToggle && (
                <DeleteAccount
                  setProfileEditModalOpen={setProfileEditModalOpen}
                />
              )}
            </div>
          </div>
        </MobileStyledEditProfileModalContainer>
      )}
    </>
  );
}

const MobileStyledEditProfileModalContainer = styled.div`
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
    background-color: #fff;
  }

  .modal-content {
    margin-top: 10rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 101;
    background-color: #fff;

    .modal-buttonDiv {
      display: flex;
      justify-content: space-between;
      width: 100%;

      padding: 0 13px;
      .editModalbuttonActive {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        /* identical to box height, or 125% */

        /* Primary 01 */

        color: #206efb;
        justify-self: start;
      }
      .editModalbuttoninActive {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        :hover {
          opacity: 60%;
        }

        /* identical to box height, or 125% */

        /* Gray 05 */

        color: #868e96;
      }
      .deleteAccountDiv {
        display: flex;

        align-items: flex-start;
        .deleteAccountText {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          /* identical to box height, or 125% */

          /* Point Red */

          color: #f83e4b;
        }
        .modal-close {
          margin-left: 10px;
        }
      }
    }
    .buttonBottomDiv {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */

      display: flex;
      justify-content: left;
      margin-left: 50px;
      align-items: flex-start;
      /* Gray 04 */

      color: #adb5bd;
      min-height: 20px;
    }

    .modalProfileDiv {
      margin: 0 20px;
      margin-top: 15px;

      display: flex;
      align-items: flex-start;
      .modalProfileImageContainer {
        position: relative;
        display: inline-block;
        :hover {
          opacity: 90%;
        }
      }

      .modalProfileImage {
        border-radius: 10px;
      }
      .modalProfileImageOverlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 98.2%;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        padding-top: 60px;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
        .modalProfileImageOverlayIcon {
          width: 20px;
          height: 20px;
        }
        .modalProfileImageOverlayText {
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          /* identical to box height, or 133% */

          /* Gray 00 */

          color: #f1f3f5;
        }
      }

      .defultImageButton {
        margin-top: 140px;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        /* identical to box height, or 125% */

        /* Primary 01 */

        color: black;
        :hover {
          opacity: 50%;
        }
      }
    }

    .mainDiv {
    }
    .modal-close {
      font-size: 24px;
      line-height: 1;
      background: #17171c;
      background-color: transparent;
      border: none;
      cursor: pointer;
      :hover {
        opacity: 50%;
      }
    }
  }
`;
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

    .modalLeftContiner {
      width: 282px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #f1f3f5;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      .modalFirstLine {
        :hover {
          opacity: 90%;
        }
        margin-top: 40px;
        .modalProfileImage {
          border-radius: 10px;
        }
        .modalProfileImageOverlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 98.2%;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 73px;
          border-radius: 10px;
          cursor: pointer;
          text-align: center;
          .modalProfileImageOverlayIcon {
            width: 20px;
            height: 20px;
          }
          .modalProfileImageOverlayText {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 16px;
            /* identical to box height, or 133% */

            text-align: center;

            /* Gray 00 */

            color: #f1f3f5;
          }
        }

        .modalProfileImageContainer {
          position: relative;
          display: inline-block;
        }
      }
      .modalSecondLine {
        .modalSecondLineButton {
          :hover {
            opacity: 70%;
          }
          /* Pretendard Bold 12 */

          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          line-height: 16px;
          /* identical to box height, or 133% */

          /* Gray 05 */

          color: #868e96;
          padding-right: 100px;
        }
      }
      .modalThirdLine {
        margin-top: 20px;

        .editModalbuttonActive {
          width: 282px;
          height: 40px;
          background: #ffffff;
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          /* identical to box height, or 125% */

          /* Primary 01 */

          color: #206efb;
          justify-self: start;
        }
        .editModalbuttoninActive {
          width: 282px;
          height: 40px;

          background: #f1f3f5;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          :hover {
            opacity: 80%;
          }

          /* identical to box height, or 125% */

          /* Gray 05 */

          color: #868e96;
        }
      }
      .modalFourthLine {
        margin-top: 200px;
        margin-right: 160px;
        :hover {
          opacity: 45%;
        }
        .deleteAccountText {
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          /* identical to box height, or 125% */

          /* Point Red */

          color: #f83e4b;
        }
      }
    }
  }

  .modalRightContiner {
    width: 510px;
    display: flex;
    flex-direction: column;
    margin: 30px;

    .RightModalFirstLine {
      display: flex;
      justify-content: space-between;
      margin-bottom: 60px;
      .RightModalTitle {
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        /* identical to box height, or 133% */

        /* Gray 09 */

        color: #17171c;
      }
    }
    .modal-close {
      font-size: 24px;
      line-height: 1;
      background: #17171c;
      background-color: transparent;
      border: none;
      cursor: pointer;
      :hover {
        opacity: 50%;
      }
    }
  }

  .modalThirdLineButton2Warning {
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height, or 133% */

    display: flex;
    justify-content: center;
    /* Gray 04 */

    color: #adb5bd;
    min-height: 20px;
  }
`;
export default ProfileEditModal;
