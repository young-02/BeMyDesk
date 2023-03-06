import useCheckUser from '@/Hooks/useCheckUser';
import { auth, dbService } from '@/shared/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../../../components/ui/CustomButton';
type Props = {};

export default function SignUp({}: Props) {
  // 유저 상태 체크
  useCheckUser();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwVerfy, setPwVerfy] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwVerfyValid, setPwVerfyValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [errorNicknameDuplication, setErrorNicknameDuplication] =
    useState(false);
  const [errorEmailDuplication, setErrorEmailDuplication] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  // 동의 버튼
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  // 이메일Regex
  const FullEmailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const engNumRegex = /^[a-zA-Z0-9]+$/;

  // useState 초기값으로 배열이 들어가있음.
  const [selected, setSelected] = useState({
    // selectBox가 열려있는지 닫혀있는지 확인
    selectBox: false,
    // 현재 선택값
    currentValue: '선택해주세요',
  });
  // 직접 입력하기 입력값
  const [WriteValue, setWriteValue] = useState('');

  // 구조분해 할당으로 프로퍼티를 추출한것임
  // const selectBox = selected.selectBox;
  // const currentValue = selected.currentValue;
  // 와 같은 의미
  const { selectBox, currentValue } = selected;

  // selectBox 하나를 셀렉트 했을때 실행되는것
  const selectTarget = (e: any) => {
    // innerText를 하면 HTML 엘레먼트를 text컨텐츠로 바꿔줌
    // if you have an HTML element <p>Hello, <span>world</span>!</p>,
    // then the innerText of the <p> element would be the string
    // "Hello, world!".
    // It is equivalent to
    // const innerText = e.target.innerText.
    const { innerText } = e.target;
    // selected in this context is an object destructured from the selected state variable using the destructuring assignment syntax of ES6.
    // It contains two properties: selectBox and currentValue.
    setSelected((selected) => ({
      ...selected,
      currentValue: innerText,
    }));
  };

  // 이메일 유효성검사 (직접입력x)
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    if (engNumRegex.test(value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  // 이메일 입력
  const emailValue =
    currentValue === '직접입력하기'
      ? `${email}@${WriteValue}`
      : `${email}@${currentValue}`;
  console.log(emailValue);

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

  // 닉네임 유효성검사
  const handleNickname = function (event: any) {
    setNickname(event.target.value);
    const regex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
    if (regex.test(event.target.value)) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };

  //패스워드 유효성검사
  const handlePw = function (event: any) {
    setPw(event.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(event.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  //패스워드 확인 유효성검사
  const handleVerfyPw = function (event: any) {
    setPwVerfy(event.target.value);
    if (pw === event.target.value) {
      setPwVerfyValid(true);
    } else {
      setPwVerfyValid(false);
    }
  };

  // 회원가입 버튼
  const onClickConfirmButton = async () => {
    const userInfoRef = collection(dbService, 'userInfo');
    // 닉네임 중복검사
    const nicknameQuery = query(userInfoRef, where('nickname', '==', nickname));
    const nicknameDocs = await getDocs(nicknameQuery);
    // 이메일 중복검사
    const emailQuery = query(userInfoRef, where('email', '==', emailValue));
    const emailDocs = await getDocs(emailQuery);

    if (!nicknameDocs.empty) {
      setErrorNicknameDuplication(true);
    } else if (!emailDocs.empty) {
      setErrorEmailDuplication(true);
    } else {
      try {
        const data = await createUserWithEmailAndPassword(auth, emailValue, pw);
        const remainInfo = {
          email: emailValue,
          displayName: nickname,
          photoURL: '/images/defaultProfile.png',
        };

        await updateProfile(data.user, remainInfo);

        const collectionRef = doc(
          dbService,
          `userInfo/${auth.currentUser?.uid}`,
        );
        const payload = {
          profileImage: '/images/defaultProfile.png',
          nickname: nickname,
          email: emailValue,
          isSocial: false,
          userId: auth.currentUser?.uid,
          scraps: [],
          following: [],
          introduction: '안녕하세요!',
        };

        await setDoc(collectionRef, payload).then(router.push('/post-list'));

        alert('회원가입 성공');
      } catch (error: any) {
        console.error(error);
        if (error.message.includes('auth/invalid-email')) {
          alert('이메일을 확인해주세요');
        }
      }
    }
  };
  // 동의 체크박스 확인 useEffect
  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);
  // 실시간 유효성검사 useEffect
  useEffect(() => {
    if (emailValid && pwValid && nicknameValid && pwVerfyValid && allCheck) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, pwValid, nicknameValid, pwVerfyValid, allCheck]);

  return (
    <StyledBackground>
      <SignUpLayout>
        <div className="title">회원가입</div>
        <div className="contentWrap">
          <div>
            <div className="inputTitleWrap">
              <p className="title">닉네임</p>
              <p className="description">2~8자리 / 특수문자 불가</p>
            </div>
            <div className="inputWrap">
              <input
                type="text"
                className={
                  (!nicknameValid && nickname.length > 0) ||
                  errorNicknameDuplication
                    ? 'input error'
                    : 'input'
                }
                placeholder="닉네임을 작성해주세요."
                value={nickname}
                onChange={handleNickname}
                onFocus={() => setErrorNicknameDuplication(false)}
              />
            </div>
            <div className="error-text">
              {!nicknameValid && nickname.length > 1 && (
                <div className="errorMessageWrap">
                  닉네임은 특수문자를 포함할수 없고 2글자 이상 8자
                  이하이어야합니다.
                </div>
              )}
              {errorNicknameDuplication ? (
                <div className="errorMessageWrap">중복된 닉네임 입니다.</div>
              ) : null}
            </div>
          </div>

          <div>
            <div className="inputTitleWrap">
              <p className="title">이메일</p>
            </div>
            <div className="inputWrap error">
              <input
                type="text"
                className={
                  (!emailValid && email.length > 0) || errorEmailDuplication
                    ? 'input error'
                    : 'input'
                }
                placeholder="이메일을 입력해주세요"
                value={email}
                // autoComplete 어트리뷰트는 브라우저 자동완성 작동여부
                autoComplete="off"
                onChange={handleEmail}
                onFocus={() => setErrorEmailDuplication(false)}
              />
              @{/* @ 뒷쪽 */}
              <SelectBox
                onClick={() =>
                  setSelected((selected) => ({
                    ...selected,
                    selectBox: !selected.selectBox,
                  }))
                }
                // className={
                //   (!emailValid && email.length > 0) || errorEmailDuplication
                //     ? 'input error'
                //     : 'input'
                // }
              >
                <p
                  className={
                    currentValue === '선택해주세요' && email.length > 0
                      ? 'selectedText'
                      : selectBox
                      ? 'selectedText active'
                      : 'selectedText'
                  }
                >
                  {currentValue}
                  <span className="arrow" />
                </p>
                {selectBox && (
                  <ul className="select-list">
                    <li onClick={selectTarget}>naver.com</li>
                    <li onClick={selectTarget}>google.com</li>
                    <li onClick={selectTarget}>hanmail.net</li>
                    <li onClick={selectTarget}>daum.net</li>
                    <li onClick={selectTarget}>kakao.com</li>
                    <li onClick={selectTarget}>nate.com</li>
                    {/* <li onClick={selectTarget}>직접입력하기</li> */}
                  </ul>
                )}
              </SelectBox>
            </div>

            <div className="error-text">
              {!emailValid && email.length > 0 && (
                <div className="errorMessageWrap">
                  이메일 양식을 확인해주세요.
                </div>
              )}
              {errorEmailDuplication ? (
                <div className="errorMessageWrap">
                  해당 이메일 계정이 이미 존재합니다.
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <div className="inputTitleWrap">
              <p className="title">비밀번호</p>
              <p className="description">
                8~16 자리 / 영문 대소문자, 숫자, 특수문자 포함
              </p>
            </div>
            <div className="inputWrap">
              <input
                type="password"
                className={!pwValid && pw.length > 0 ? 'input error' : 'input'}
                placeholder="비밀번호를 입력해주세요"
                value={pw}
                onChange={handlePw}
              />
            </div>
            <div className="error-text">
              {!pwValid && pw.length > 0 && (
                <div className="errorMessageWrap">
                  영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="inputTitleWrap">
              <p className="title">비밀번호 확인</p>
            </div>
            <div className="inputWrap">
              <input
                type="password"
                className={
                  !pwVerfyValid && pwVerfy.length > 0 ? 'input error' : 'input'
                }
                placeholder="비밀번호를 입력해주세요"
                onChange={handleVerfyPw}
              />
            </div>
            <div className="error-text">
              {!pwVerfyValid && pwVerfy.length > 0 && (
                <div className="errorMessageWrap">비밀번호가 다릅니다.</div>
              )}
            </div>
          </div>
        </div>

        <SignUpAgreeDiv>
          <div className="agree-input-wrap">
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

        <div className="buttonWrap">
          <CustomButton
            backgroundColor="#206EFB"
            fontColor="#fff"
            paddingColumns="0.875"
            paddingRow="0.875"
            fontSize="1.25"
            onClick={onClickConfirmButton}
            disabled={notAllow}
          >
            회원가입
          </CustomButton>
        </div>
      </SignUpLayout>
    </StyledBackground>
  );
}

const StyledBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(https://images.pexels.com/photos/251225/pexels-photo-251225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)
    no-repeat center;
  background-size: cover;
`;

const SignUpLayout = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  width: 36.75rem;
  height: 45.5rem;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.29);
  border-radius: 20px;
  padding: 2.375rem 2.5rem;

  /* max-width: 36.75rem;
  width: 100%;

  padding: 2.375rem 2.5rem;
  border-radius: 1.25rem;
  background: #fff;
  margin-top: 40px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.29); */

  // 개별항목 헤딩 + 맨위 '회원가입'
  .title {
    text-align: center;
    font-size: 2.125rem;
    font-weight: 700;
    margin-left: 10px;
  }
  // 인풋창 전체 묶기
  .contentWrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px;
    // 개별항목 헤딩 Div
    .inputTitleWrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      > .title {
        font-size: 1.25rem;
        font-weight: 700;
      }

      > .description {
        font-size: 0.75rem;
        font-weight: 500;
        color: #adb5bd;
      }
    }
    // 인풋창
    .inputWrap {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      color: #adb5bd;

      > input {
        flex: 1;
        border-radius: 0.625rem;
        padding: 0.8125rem 1.25rem;
        border: 0.0625rem solid #adb5bd;

        &.error {
          border: 1px solid red;
        }
        &:focus-within {
          border: 1px solid #17171c;
        }
      }
    }
  }

  .buttonWrap {
    display: flex;
    margin-top: 2.5rem;

    > button {
      width: 100%;
      :hover {
        opacity: 90%;
      }
      &:disabled {
        background-color: #adb5bd;
      }
    }
  }

  .error-text {
    min-height: 12px;
    color: #f83e4b;
    font-size: 0.75rem;
    margin-top: 0.5rem;
    margin-left: 5px;
    font-weight: 500;
  }
`;
const SelectBox = styled.div`
  flex: 1;
  position: relative;

  .selectedText {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    padding: 13px 20px;
    border: 1px solid #adb5bd;

    &.active {
      border: 0.0625rem solid #206efb;
      color: #206efb;

      .arrow {
        display: inline-block;
        margin-left: 1rem;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 0;
        border-bottom: 6px solid #206efb;
      }
    }
    &.error {
      border-color: red;
    }
    .arrow {
      display: inline-block;

      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #adb5bd;
    }
  }

  .select-list {
    position: absolute;
    top: 120%;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #adb5bd;
    background: #fff;
    box-shadow: 0px 4px 6px 0px #00000040;
    overflow: hidden;

    > li {
      padding: 20px;

      :hover {
        background: #f1f3f5;
        color: #206efb;
      }
    }
  }
`;
const SignUpAgreeDiv = styled.div`
  margin-top: 1rem;

  .agree-input-wrap {
    margin-bottom: 0.5rem;

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
      margin-bottom: 0.6rem;
    }
  }

  .check-custorm-right {
    margin-left: 2.5px;
  }
`;
