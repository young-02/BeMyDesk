import { updateProfile } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { app, auth, dbService } from '@/shared/firebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import useResponsive from '@/Hooks/useResponsive';

function ChangeProfile({ user, profileData, setProfileEditModalOpen }: any) {
  // 프사 변경시 캐쉬 다시 불러오기 위한 쿼리 클라이언트
  const queryClient = useQueryClient();

  //자기소개
  const [countCharacters, setCountCharacters] = useState(
    profileData?.introduction.length,
  );
  const [Characters, setCharacters] = useState(profileData?.introduction);
  //닉네임
  const [nickNameEdit, setNickNameEdit] = useState('');
  const [nicknameInputEnable, setNicknameInputEnable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  //적용완료
  const [profileChangeDone, setProfileChangeDone] = useState(false);
  //오류처리
  const [errorNickNameEmpty, setErrorNickNameEmpty] = useState(false);
  const [errorNickNameRegex, setErrorNickNameRegex] = useState(false);
  const [errorNicknameduDlication, setErrorNicknameDuplication] =
    useState(false);
  const [errorIntroductionEmpty, setErrorIntroductionEmpty] = useState(false);
  //자기소개 글자수 세기

  const countOnChangeHandler = function (event: any) {
    const inputText = event.target.value;
    const inputLength = inputText.length;
    if (countCharacters < 50) {
      setCharacters(inputText);
      setCountCharacters(inputLength);
    } else {
      alert('자기소개는 50자를 초과할 수 없습니다.');
      const truncated = inputText.substring(0, inputLength - 3);
      setCharacters(truncated);
      setCountCharacters(truncated.length);
    }
  };
  // 닉네임 onChange
  const nickNameEditonChangeHandler = function (
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const inputText = event.target.value;
    setNickNameEdit(inputText);
  };

  // disable 상태인 닉네임 첫클릭
  const handleDivClick = () => {
    setNicknameInputEnable(true);
  };
  // 닉네임 인풋 포커스
  const handleNicknameInputFocus = () => {
    setErrorNickNameEmpty(false);
    setErrorNickNameRegex(false);
    setProfileChangeDone(false);
    setErrorNicknameDuplication(false);
  };
  // 자기소개 인풋 포커스

  const handleIntroductionInputFocus = () => {
    setErrorIntroductionEmpty(false);
    setProfileChangeDone(false);
  };
  // 적용 버튼
  const profileChangeConfirmButtonHandler = async () => {
    const regex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
    const collectionRef = doc(dbService, `userInfo/${user.uid}`);

    // 1. 닉네임 활성화 여부
    // 2. 닉네임 유효성검사
    // 3. 자기소개 입력여부

    // 닉네임 활성화 여부 - 활성화
    if (nicknameInputEnable) {
      //2. 닉네임 유효성검사 - 정상입력
      // 3. 자기소개 입력여부 - 입력완료
      if (regex.test(nickNameEdit) && Characters !== '') {
        //닉네임 중복검사
        const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
        const nicknameRef = collection(dbService, 'userInfo');
        const nicknameQuery = query(
          nicknameRef,
          where('nickname', '==', nickNameEdit),
          where('userId', '!=', auth.currentUser?.uid),
        );
        const nicknameDocs = await getDocs(nicknameQuery);

        if (!nicknameDocs.empty) {
          setErrorNicknameDuplication(true);
        }
        //닉네임 중복검사 통과
        else {
          updateProfile(auth.currentUser as any, {
            displayName: nickNameEdit,
          });
          const payload = {
            nickname: nickNameEdit,
            introduction: Characters,
          };
          updateDoc(collectionRef, payload)
            .then(() => {
              setProfileChangeDone(true);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        // 3. 자기소개 입력여부 - 비어있음
        if (Characters == '') {
          setErrorIntroductionEmpty(true);
          // 2. 닉네임 유효성검사 regex 오류
          // 2. 닉네임 유효성검사 비어있음
          nickNameEdit === ''
            ? setErrorNickNameEmpty(true)
            : setErrorNickNameRegex(true);
        } else {
          // 2. 닉네임 유효성검사 regex 오류
          // 2. 닉네임 유효성검사 비어있음
          nickNameEdit === ''
            ? setErrorNickNameEmpty(true)
            : setErrorNickNameRegex(true);
        }
      }
    }
    // 닉네임 활성화 여부 - 비활성화
    else {
      // 3. 자기소개 입력여부 - 비어있음
      if (Characters !== '') {
        const payload = {
          introduction: Characters,
        };
        updateDoc(collectionRef, payload)
          .then(() => {
            setProfileChangeDone(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      //2.자기소개 비어있음
      else {
        //3. 오류처리
        setErrorIntroductionEmpty(true);
      }
    }
    queryClient.invalidateQueries('userInfo');
    // setProfileEditModalOpen(false);
  };
  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 1000,
    minWidth: 1001,
  });

  // input창 enable시 자동 focus
  useEffect(() => {
    if (nicknameInputEnable && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [nicknameInputEnable, inputRef]);

  return (
    <>
      {isDesktop && (
        <ProfileEdit>
          <div className="ProfileEditFirstLine">
            <p className="ProfileEditHeadTitle">닉네임</p>
            <div onClick={handleDivClick}>
              <input
                className={`inputNickname ${
                  errorNickNameRegex ||
                  errorNickNameEmpty ||
                  errorNicknameduDlication
                    ? 'error'
                    : ''
                }`}
                type="text"
                placeholder={
                  !nicknameInputEnable
                    ? profileData.nickname
                    : '닉네임을 입력하세요'
                }
                disabled={!nicknameInputEnable}
                onChange={nickNameEditonChangeHandler}
                ref={inputRef}
                onFocus={handleNicknameInputFocus}
              />
              <div className="errorDiv">
                <p className="errorMessage">
                  {errorNickNameRegex
                    ? '닉네임은 특수문자를 포함할수 없고 2글자 이상 8자이하이어야합니다.'
                    : null}
                </p>

                <p className="errorMessage">
                  {errorNickNameEmpty ? '필수 입력사항입니다' : null}
                </p>
                <p className="errorMessage">
                  {errorNicknameduDlication ? '중복된 닉네임 입니다.' : null}
                </p>
              </div>
            </div>
          </div>

          <div className="ProfileEditSecondLine">
            <p className="ProfileEditHeadTitle">프로필소개</p>
            <textarea
              className={`ProfileEditIntroductionInput ${
                errorIntroductionEmpty ? 'error' : ''
              }`}
              onChange={countOnChangeHandler}
              value={Characters}
              onFocus={handleIntroductionInputFocus}
            />
            <div className="bottomProfileDiv">
              <p className="errorMessage">
                {errorIntroductionEmpty ? '필수 입력사항입니다.' : null}
              </p>
              <p className="ProfileEditIntroductionCount">
                {countCharacters}/50
              </p>
            </div>
          </div>

          <div className="ProfileEditThirdLine">
            <div className="profileChangeDoneMessageDiv">
              <p className="profileChangeDoneMessage">
                {profileChangeDone
                  ? '프로필 정보를 성공적으로 변경하였습니다.'
                  : null}
              </p>
            </div>
            <div className="ProfileEditThirdLineApplyButtonDiv">
              <button
                className="ProfileEditThirdLineApplyButton"
                onClick={profileChangeConfirmButtonHandler}
              >
                변경하기
              </button>
            </div>
          </div>
        </ProfileEdit>
      )}{' '}
      {isMobile && (
        <MobileProfileEdit>
          <div className="ProfileEditFirstLine">
            <p className="ProfileEditHeadTitle">닉네임</p>
            <div onClick={handleDivClick}>
              <input
                className={`inputNickname ${
                  errorNickNameRegex ||
                  errorNickNameEmpty ||
                  errorNicknameduDlication
                    ? 'error'
                    : ''
                }`}
                type="text"
                placeholder={
                  !nicknameInputEnable
                    ? profileData.nickname
                    : '닉네임을 입력하세요'
                }
                disabled={!nicknameInputEnable}
                onChange={nickNameEditonChangeHandler}
                ref={inputRef}
                onFocus={handleNicknameInputFocus}
              />
              <div className="errorDiv">
                <p className="errorMessage">
                  {errorNickNameRegex
                    ? '닉네임은 특수문자를 포함할수 없고 2글자 이상 8자이하이어야합니다.'
                    : null}
                </p>

                <p className="errorMessage">
                  {errorNickNameEmpty ? '필수 입력사항입니다' : null}
                </p>
                <p className="errorMessage">
                  {errorNicknameduDlication ? '중복된 닉네임 입니다.' : null}
                </p>
              </div>
            </div>
          </div>

          <div className="ProfileEditSecondLine">
            <p className="ProfileEditHeadTitle">프로필소개</p>
            <textarea
              className={`ProfileEditIntroductionInput ${
                errorIntroductionEmpty ? 'error' : ''
              }`}
              onChange={countOnChangeHandler}
              value={Characters}
              onFocus={handleIntroductionInputFocus}
            />
            <div className="bottomProfileDiv">
              <p className="errorMessage">
                {errorIntroductionEmpty ? '필수 입력사항입니다.' : null}
              </p>
              <p className="ProfileEditIntroductionCount">
                {countCharacters}/50
              </p>
            </div>
          </div>

          <div className="ProfileEditThirdLine">
            <div className="profileChangeDoneMessageDiv">
              <p className="profileChangeDoneMessage">
                {profileChangeDone
                  ? '프로필 정보를 성공적으로 변경하였습니다.'
                  : null}
              </p>
            </div>
            <div className="ProfileEditThirdLineApplyButtonDiv">
              <button
                className="ProfileEditThirdLineApplyButton"
                onClick={profileChangeConfirmButtonHandler}
              >
                변경하기
              </button>
            </div>
          </div>
        </MobileProfileEdit>
      )}
    </>
  );
}

const MobileProfileEdit = styled.div`
  padding: 20px;

  textarea {
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  .ProfileEditHeadTitle {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;

    color: #17171c;
    margin-bottom: 10px;
  }

  .ProfileEditFirstLine {
    .inputNickname {
      width: 87%;
      height: 42px;

      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;

      color: #17171c;
      border-radius: 0.625rem;
      border: 0.0625rem solid #adb5bd;
      padding: 0 20px;
    }
    .inputNickname:focus-within {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: #17171c;
      border: 1px solid #17171c;
      border-radius: 10px;
    }
    .errorDiv {
      min-height: 25px;
    }
  }

  .ProfileEditSecondLine {
    .ProfileEditIntroductionInput {
      width: 89%;
      height: 50px;

      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;

      color: #17171c;
      border-radius: 0.625rem;
      border: 0.0625rem solid #adb5bd;
      padding: 20px;
    }
    .ProfileEditIntroductionInput:focus-within {
      color: #17171c;
      border: 1px solid #17171c;
    }

    .bottomProfileDiv {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      min-height: 25px;
      width: 100%;
    }
    .ProfileEditIntroductionCount {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 12px;

      text-align: right;
      padding-right: 10px;
      padding-top: 5px;

      color: #206efb;
    }
  }
  .ProfileEditThirdLine {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    min-height: 80px;

    .profileChangeDoneMessageDiv {
      .profileChangeDoneMessage {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #206efb;
        margin-right: 5px;
        height: 12px;
      }
    }
    .ProfileEditThirdLineApplyButtonDiv {
      margin-bottom: 30px;

      :hover {
        opacity: 90%;
      }
      .ProfileEditThirdLineApplyButton {
        width: 132px;
        height: 48px;
        background: #206efb;
        border-radius: 10px;

        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        color: #ffffff;
        margin-top: 5px;
      }
    }
  }

  .errorMessage {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    display: flex;
    align-items: center;

    color: #f83e4b;
    margin-left: 5px;
    margin-top: 3px;
  }

  .inputNickname.error,
  .ProfileEditIntroductionInput.error {
    border-color: #f83e4b;
  }
`;
const ProfileEdit = styled.div`
  textarea {
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;
  }

  display: flex;
  flex-direction: column;
  .ProfileEditHeadTitle {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;

    color: #17171c;
    margin-bottom: 10px;
  }

  .ProfileEditFirstLine {
    .inputNickname {
      width: 87%;
      height: 42px;

      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      color: #17171c;
      border-radius: 0.625rem;
      border: 0.0625rem solid #adb5bd;
      padding: 0 20px;
    }
    .inputNickname:focus-within {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: #17171c;
      border: 1px solid #17171c;
      border-radius: 10px;
    }
    .errorDiv {
      min-height: 35px;
    }
  }

  .ProfileEditSecondLine {
    .ProfileEditIntroductionInput {
      width: 87%;
      height: 60px;

      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;

      color: #17171c;
      border-radius: 0.625rem;
      border: 0.0625rem solid #adb5bd;
      padding: 20px;
    }
    .ProfileEditIntroductionInput:focus-within {
      color: #17171c;
      border: 1px solid #17171c;
    }

    .bottomProfileDiv {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      min-height: 35px;
    }
    .ProfileEditIntroductionCount {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 12px;
      text-align: right;
      padding-right: 35px;
      padding-top: 5px;
      color: #206efb;
    }
  }
  .ProfileEditThirdLine {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    min-height: 80px;
    margin: 120px 0 0 0;

    .profileChangeDoneMessageDiv {
      .profileChangeDoneMessage {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #206efb;
        margin-right: 5px;
      }
    }
    .ProfileEditThirdLineApplyButtonDiv {
      :hover {
        opacity: 90%;
      }
      .ProfileEditThirdLineApplyButton {
        width: 132px;
        height: 48px;
        background: #206efb;
        border-radius: 10px;

        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        color: #ffffff;
        margin-top: 5px;
        margin-right: 10px;
      }
    }
  }

  .errorMessage {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #f83e4b;
    margin-left: 5px;
    margin-top: 3px;
  }

  .inputNickname.error,
  .ProfileEditIntroductionInput.error {
    border-color: #f83e4b;
  }
`;

export default ChangeProfile;
