import { auth, dbService } from '@/shared/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../../../components/ui/CustomButton';
type Props = {};

export default function SignUp({}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwVerfy, setPwVerfy] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwVerfyValid, setPwVerfyValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [selected, setSelected] = useState({
    selectBox: false,
    currentValue: '선택해주세요',
  });
  const [WriteValue, setWriteValue] = useState('');
  console.log(WriteValue);
  const { selectBox, currentValue } = selected;

  const selectTarget = (e) => {
    const { innerText } = e.target;

    setSelected((selected) => ({
      ...selected,
      currentValue: innerText,
    }));

    // const regex =
    //   /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (currentValue) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

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

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  const handleEmail = function (event: any) {
    setEmail(event.target.value);
  };
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

  const handleVerfyPw = function (event: any) {
    setPwVerfy(event.target.value);
    if (pw === event.target.value) {
      setPwVerfyValid(true);
    } else {
      setPwVerfyValid(false);
    }
  };

  const handleNickname = function (event: any) {
    setNickname(event.target.value);
    const regex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/;
    if (regex.test(event.target.value)) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };
  const emailValue =
    currentValue === '직접입력하기'
      ? `${email}@${WriteValue}`
      : `${email}@${currentValue}`;
  console.log(emailValue);
  const onClickConfirmButton = async () => {
    try {
      const data = await createUserWithEmailAndPassword(auth, emailValue, pw);
      const remainInfo = {
        email: emailValue,
        displayName: nickname,
        photoURL: '/images/defaultProfile.png',
      };

      await updateProfile(data.user, remainInfo);

      const collectionRef = doc(dbService, `userInfo/${auth.currentUser?.uid}`);
      const payload = {
        profileImage: '/images/defaultProfile.png',
        nickname: auth.currentUser?.displayName,
        userId: auth.currentUser?.uid,
        scraps: [],
        following: [],
        introduction: '안녕하세요!',
      };

      await setDoc(collectionRef, payload).then(router.push('/post-list'));

      alert('회원가입 성공');
    } catch (error) {
      console.error(error);
    }
  };

  // const onClickConfirmButton = async () => {
  //   await createUserWithEmailAndPassword(auth, email, pw).then((data: any) => {
  //     const remainInfo = {
  //       email: email,
  //       displayName: nickname,
  //       photoURL: '/images/defaultProfile.png',
  //     };

  //     updateProfile(data.user, remainInfo);
  //   });
  //   const collectionRef = doc(dbService, `userInfo/${auth.currentUser.uid}`);
  // const payload = {
  //     userId: auth.currentUser.uid,
  //     scraps: [],
  //     following: [],
  //     introduction: '안녕하세요!',
  //   };

  //   setDoc(collectionRef, payload).catch((error) => {
  //     console.error(error);
  //   });

  //   alert('회원가입 성공');
  //   // router("/");
  // };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);

  useEffect(() => {
    if (
      emailValid &&
      pwValid &&
      nicknameValid &&
      pwVerfyValid &&
      ageCheck &&
      useCheck
    ) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, pwValid, nicknameValid, pwVerfyValid, ageCheck, useCheck]);

  return (
    <StyledBackground>
      <SignUpLayout>
        <div className="title">회원가입</div>
        <div className="contentWrap">
          <div>
            <div className="inputTitleWrap">
              <p className="title">닉네임</p>
              <p className="description">닉네임 8글자 이내</p>
            </div>
            <div className="inputWrap">
              <input
                type="text"
                className={
                  !nicknameValid && nickname.length > 0
                    ? 'input error'
                    : 'input'
                }
                placeholder="닉네임을 작성해주세요."
                value={nickname}
                onChange={handleNickname}
              />
            </div>
            <div className="error-text">
              {!nicknameValid && nickname.length > 0 && (
                <div className="errorMessageWrap">
                  닉네임은 특수문자를 포함할수 없고 2글자 이상 8자
                  이하이어야합니다.
                </div>
              )}
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
                  !emailValid && email.length > 0 ? 'inpu error' : 'input'
                }
                placeholder="test"
                value={email}
                autocomplete="off"
                onChange={handleEmail}
              />
              @
              <SelectBox
                onClick={() =>
                  setSelected((selected) => ({
                    ...selected,
                    selectBox: !selected.selectBox,
                  }))
                }
                className={
                  !emailValid && email.length > 0 ? 'input error' : 'input'
                }
              >
                <p
                  className={
                    currentValue === '선택해주세요' && email.length > 0
                      ? 'selectedText error'
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
                    <li onClick={selectTarget}>nate.com</li>
                    <li onClick={selectTarget}>직접입력하기</li>
                  </ul>
                )}
              </SelectBox>
            </div>
            {currentValue === '직접입력하기' && (
              <div className="inputWrap">
                <input
                  className="direct"
                  placeholder={currentValue}
                  onChange={(e) => {
                    setWriteValue(e.target.value);
                  }}
                />
              </div>
            )}
            <div className="error-text">
              {currentValue === '선택해주세요' && email.length > 0 && (
                <div className="errorMessageWrap">필수 입력 항목입니다.</div>
              )}
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
                autocomplete="off"
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
              <span>(필수)</span>
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
              개인정보 수집/이용에 동의합니다. <span>(필수)</span>
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
              개인정보 제3자 제공에 동의합니다.
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
            </label>
          </div>
        </SignUpAgreeDiv>

        <div className="buttonWrap">
          <CustomButton
            backgoundColor="#206EFB"
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
  max-width: 36.75rem;
  width: 100%;
  padding: 2.375rem 2.5rem;
  border-radius: 1.25rem;
  background: #fff;
  margin-top: 40px;

  .title {
    text-align: center;
    font-size: 2.125rem;
    font-weight: 700;
  }

  .contentWrap {
    display: flex;
    flex-direction: column;
    gap: 26px;

    .inputTitleWrap {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.875rem;

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

        &.direct {
          margin-top: 1rem;
        }

        &.error {
          border: 1px solid red;
        }
      }
    }
  }

  .buttonWrap {
    display: flex;
    margin-top: 2.5rem;

    > button {
      width: 100%;
    }
  }
  .error-text {
    color: #f83e4b;
    font-size: 0.75rem;
    margin-top: 0.5rem;
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
  margin-top: 1.75rem;

  .agree-input-wrap {
    margin-bottom: 0.625rem;

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
      margin-bottom: 1.0625rem;
    }
  }
`;
