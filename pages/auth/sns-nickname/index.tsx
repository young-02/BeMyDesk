import CustomAuthUI from '@/components/ui/authUi/CustomAuthUI';
import CustomInput from '@/components/ui/authUi/CustomInput';
import CustomButton from '@/components/ui/CustomButton';
import HeadSeo from '@/components/ui/HeadSeo';

import { auth, dbService } from '@/shared/firebase';
import { updateProfile } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
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
    return <CustomAuthUI height="32rem" />;
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
          // 세션스토리지에 userExist == true 로 저장
          sessionStorage.setItem('userExist', 'true');
          localStorage.setItem('isSignUpRoute', 'true');
          router.push({
            pathname: '/post-list',
            // asPath: '/post-list',
            // query: { isSignUpRoute: true },
          });
        }
      } catch (error) {
        console.error(error);
        alert('잘못된 접근 입니다');
      }
    };

    return (
      <>
        <HeadSeo title="닉네임설정 | be-my-desk" />
        <CustomAuthUI headingTitle="추가 정보 입력" height="32rem">
          <CustomInput
            subHeadingText="이메일"
            placeholder={user?.email}
            disabled={true}
          />

          <CustomInput
            type="text"
            placeholder="닉네임을 입력해주세요."
            subHeadingText="닉네임"
            descriptionText="닉네임 8글자 이내, 특수문자 불가"
            onChange={(event: any) => {
              setNickname(event.target.value);
            }}
            className={
              errorNicknameEmpty ||
              errorNicknameRegex ||
              errorNicknameduDlication ||
              errorEmailDuplication
                ? 'error'
                : undefined
            }
            onFocus={nicknameInputFocus}
            errorMessageText={
              errorNicknameEmpty
                ? '필수 입력 항목입니다.'
                : errorNicknameRegex
                ? '닉네임 양식을 확인해주세요.'
                : errorNicknameduDlication
                ? '중복된 닉네임 입니다.'
                : errorEmailDuplication
                ? '해당 이메일 계정이 이미 존재합니다.'
                : undefined
            }
          />

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
          <ButtonDiv>
            <CustomButton
              backgroundColor="#206EFB"
              fontColor="#fff"
              paddingColumns="0.875"
              paddingRow="0.875"
              fontSize="1"
              onClick={nicknameSet}
              hover="90"
              active="70"
            >
              회원가입
            </CustomButton>
          </ButtonDiv>
        </CustomAuthUI>
      </>
    );
  }
}

const SignUpAgreeDiv = styled.div`
  margin-top: 1rem;
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

const ButtonDiv = styled.div`
  display: flex;
  margin-top: 2rem;

  > button {
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
`;

export default SnsNickname;
