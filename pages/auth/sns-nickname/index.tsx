import CustomButton from '@/components/ui/CustomButton';
import useCheckUser from '@/Hooks/useCheckUser';
import { auth, dbService } from '@/shared/firebase';
import { updateProfile } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';

function SnsNickname() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  // 닉네임 요류쳐리
  const [errorNicknameEmpty, setErrorNicknameEmpty] = useState(false);
  const [errorNicknameRegex, setErrorNicknameRegex] = useState(false);
  const [errorNicknameduDlication, setErrorNicknameDuplication] =
    useState(false);
  // 닉네임 중복검사
  const [errorEmailDuplication, setErrorEmailDuplication] = useState(false);

  // 약관동의 오류처리
  const [errorAllCheck, setErrorAllCheck] = useState(false);
  // 동의 버튼
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  // 닉네임 입력
  const [nickname, setNickname] = useState('');

  // 전체동의 버튼
  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  // 만 14세 이상입니다 버튼
  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };
  // 개인정보 수집/이용에 동의합니다 버튼
  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };
  //서비스 이용약관에 동의합니다. 버튼
  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  //닉네임 포커스
  const nicknameInputFocus = () => {
    setErrorNicknameEmpty(false);
    setErrorNicknameRegex(false);
    setErrorNicknameDuplication(false);
    setErrorEmailDuplication(false);
  };

  // 동의 체크박스 확인 useEffect
  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
      setErrorAllCheck(false);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);

  if (loading) {
    return (
      <StyledBackground>
        <StyledDiv></StyledDiv>
      </StyledBackground>
    );
  }
  if (error) {
    console.log(error);
    alert('잘못된 접근 입니다');
    router.push('/post-list');
    return null;
  }

  if (user) {
    const nicknameSet = async () => {
      try {
        //해당 문서 경로
        const collectionRef = doc(
          dbService,
          `userInfo/${auth.currentUser?.uid}`,
        );

        // 닉네임 중복검사
        const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
        const userInfoRef = collection(dbService, 'userInfo');
        const nicknameQuery = query(
          userInfoRef,
          where('nickname', '==', nickname),
        );
        const nicknameDocs = await getDocs(nicknameQuery);
        // 이메일 중복검사
        const emailQuery = query(
          userInfoRef,
          where('email', '==', user?.email),
        );
        const emailDocs = await getDocs(emailQuery);

        if (nickname == '') {
          setErrorNicknameEmpty(true);
          return;
        } else if (!nicknameRegex.test(nickname)) {
          setErrorNicknameRegex(true);
          return;
        } else if (!nicknameDocs.empty) {
          setErrorNicknameDuplication(true);
          return;
        } else if (!allCheck) {
          setErrorAllCheck(true);
          return;
        } else if (!emailDocs.empty) {
          setErrorEmailDuplication(true);
        } else {
          await updateProfile(user, {
            displayName: nickname,
            photoURL: '/images/defaultProfile.png',
          });
          const payload = {
            profileImage: '/images/defaultProfile.png',
            nickname: nickname,
            userId: auth.currentUser?.uid,
            scraps: [],
            following: [],
            introduction: '안녕하세요!',
            email: user?.email,
            isSocial: true,
          };
          await setDoc(collectionRef, payload);
          router.push('/post-list');
        }
      } catch (error) {
        console.error(error);
        alert('잘못된 접근 입니다');
        router.push('/post-list');
      }
    };

    return (
      <StyledBackground>
        <StyledDiv>
          <div className="headingDiv">
            <p>추가 정보 입력</p>
          </div>
          <div className="emailDiv">
            <p className="subheadingText">이메일</p>
            <input type="text" placeholder={user?.email} disabled />
            <div className="errorMessageDiv"></div>
          </div>
          <div className="nicknameDiv">
            <div className="nicknameDivFirstLine">
              <p className="subheadingText">닉네임</p>
              <p className="description">닉네임 8글자 이내</p>
            </div>
            <div className="nicknameDivSecondLine">
              <input
                type="text"
                placeholder="닉네임을 입력해주세요."
                onChange={(event) => {
                  setNickname(event.target.value);
                }}
                className={
                  errorNicknameEmpty ||
                  errorNicknameRegex ||
                  errorNicknameduDlication ||
                  errorEmailDuplication
                    ? 'error'
                    : null
                }
                onFocus={nicknameInputFocus}
              />
            </div>
            <div className="errorMessageDiv">
              {errorNicknameEmpty ? (
                <p className="errorMessageText">필수 입력 항목입니다.</p>
              ) : null}

              {errorNicknameRegex ? (
                <p className="errorMessageText">닉네임 양식을 확인해주세요.</p>
              ) : null}
              {errorNicknameduDlication ? (
                <p className="errorMessageText">중복된 닉네임 입니다.</p>
              ) : null}
              {errorEmailDuplication ? (
                <p className="errorMessageText">
                  해당 이메일 계정이 이미 존재합니다.
                </p>
              ) : null}
            </div>
          </div>
          <SignUpAgreeDiv>
            <div className="agree-input-wrap">
              <div className="allCheckLine">
                <label htmlFor="all-check" className="agree-title">
                  <input
                    type="checkbox"
                    id="all-check"
                    checked={allCheck}
                    onChange={allBtnEvent}
                  />
                  <span className="check-custorm" />
                  전체동의
                </label>

                <div className="errorMessageDiv">
                  {errorAllCheck ? (
                    <p className="errorMessageText">약관에 동의해주세요</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="agree-input-wrap">
              <label htmlFor="check1">
                <input
                  type="checkbox"
                  id="check1"
                  checked={ageCheck}
                  onChange={ageBtnEvent}
                />
                <span className="check-custorm" />만 14세 이상입니다
                <span className="check-custorm-right">(필수)</span>
              </label>
            </div>
            <div className="agree-input-wrap">
              <label htmlFor="check2">
                <input
                  type="checkbox"
                  id="check2"
                  checked={useCheck}
                  onChange={useBtnEvent}
                />
                <span className="check-custorm" />
                개인정보 수집/이용에 동의합니다.{' '}
                <span className="check-custorm-right">(필수)</span>
              </label>
            </div>

            <div className="agree-input-wrap">
              <label htmlFor="check3">
                <input
                  type="checkbox"
                  id="check3"
                  checked={marketingCheck}
                  onChange={marketingBtnEvent}
                />
                <span className="check-custorm" />
                서비스 이용약관에 동의합니다.
                <span className="check-custorm-right">(필수)</span>
              </label>
            </div>
          </SignUpAgreeDiv>
          <div className="ButtonDiv">
            <CustomButton
              backgroundColor="#206EFB"
              fontColor="#fff"
              paddingColumns="0.875"
              paddingRow="0.875"
              fontSize="1.25"
              onClick={nicknameSet}
            >
              회원가입
            </CustomButton>
          </div>
        </StyledDiv>
      </StyledBackground>
    );
  }
}

const StyledBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  background: url(https://images.pexels.com/photos/251225/pexels-photo-251225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)
    no-repeat center;
  background-size: cover;

  /* div {
    border: 0.0625rem solid black;
  } */
`;

const StyledDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  width: 466px;
  height: 518px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.29);
  border-radius: 20px;
  padding: 20px 40px;

  .headingDiv {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    justify-content: center;
  }

  .emailDiv {
    display: flex;
    flex-direction: column;
    margin-top: 45px;
  }

  .nicknameDiv {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    .nicknameDivFirstLine {
      display: flex;
      justify-content: space-between;

      .description {
        font-size: 0.75rem;
        font-weight: 500;
        color: #adb5bd;
      }
    }
    .nicknameDivFirstLine {
    }
  }

  //이용동의 Div는 아래에 SignUpAgreeDiv

  .ButtonDiv {
    display: flex;
    margin-top: 2rem;

    > button {
      width: 100%;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      :hover {
        opacity: 90%;
      }
    }
  }

  //서브헤딩 텍스트
  .subheadingText {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 10px 5px;
  }

  //에러메세지
  .errorMessageDiv {
    margin-left: 5px;
    margin-top: 5px;
    min-height: 20px;
    .errorMessageText {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */
      /* Point Red */

      color: #f83e4b;
    }
  }

  //인풋창
  input {
    border-radius: 0.625rem;
    padding: 0.8125rem 1.25rem;
    border: 0.0625rem solid #adb5bd;
    width: 90%;
    font-weight: 500;
    font-size: 14px;

    &.error {
      border: 1px solid red;
    }
    &:focus-within {
      border: 1px solid #17171c;
    }
  }
`;

const SignUpAgreeDiv = styled.div`
  margin-top: 5px;
  .agree-input-wrap {
    margin-bottom: 0.625rem;

    .allCheckLine {
      display: flex;
      .errorMessageDiv {
        margin-left: 0px;
        margin-top: 0px;
        min-height: 0px;
        margin-left: 10px;
        .errorMessageText {
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          /* identical to box height, or 133% */
          /* Point Red */
          color: #f83e4b;
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    label {
      display: flex;
      align-items: center;
      font-size: 0.75rem;
      cursor: pointer;

      input[type='checkbox'] {
        display: none;
      }
      .check-custorm {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.625rem;
        border-radius: 100%;
        border: 0.0625rem solid #adb5bd;
      }
      input[type='checkbox']:checked + .check-custorm {
        display: flex;
        justify-content: center;
        align-items: center;

        :after {
          content: '';
          width: 8px;
          height: 8px;
          background: #206efb;
          border-radius: 100%;
        }
      }
    }
    .agree-title {
      font-size: 0.875rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
    }
  }

  .check-custorm-right {
    margin-left: 2.5px;
  }
`;

export default SnsNickname;
