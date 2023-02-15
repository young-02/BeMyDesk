import { app, auth } from '@/shared/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiFillLock, AiOutlineMail, IconName } from 'react-icons/ai';

type Props = {};

export default function SignIn({}: Props) {
  // const emailRef = useRef<HTMLInputElement>(null);
  // const pwRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [emailRegexError, setEmailRegexError] = useState(false);
  const [pwRegexError, setPwRegexError] = useState(false);

  const [emailEmptyError, setEmailEmptyError] = useState(false);
  const [pwEmptyError, setPwEmptyError] = useState(false);

  const handleEmail = function (event: any) {
    setEmail(event.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(event.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePw = function (event: any) {
    setPw(event.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regex.test(event.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  function handleEmailInputClick() {
    setEmailEmptyError(false);
    setEmailRegexError(false);
  }

  function handlePwInputClick() {
    setPwEmptyError(false);
    setPwRegexError(false);
  }

  const onClickLoginButton = () => {
    if (emailValid && pwValid) {
      signInWithEmailAndPassword(auth, email, pw)
        .then(() => {
          alert('로그인 성공');
          console.log('login sucess', auth.currentUser);
        })
        .catch((error) => {
          console.log('error message: ', error.message);

          // 회원이 아니거나, 비밀번호가 틀린 경우
          if (error.message.includes('user-not-found')) {
            alert('일치하는 회원 정보가 없습니다');
          }
          if (error.message.includes('wrong-password')) {
            alert('비밀번호가 틀렸습니다.');
          }
        });
    } else {
      if (emailValid === false) {
        {
          email.length === 0
            ? setEmailEmptyError(true)
            : setEmailRegexError(true);
          // emailRef.current?.focus();
        }
      } else if (pwValid === false) {
        {
          pw.length === 0 ? setPwEmptyError(true) : setPwRegexError(true);
          // pwRef.current?.focus();
        }
      }
    }
  };

  const kakaoLogin = function () {
    window.Kakao?.Auth.login({
      scope: 'profile_nickname, account_email, gender',
      success: function (authObj: any) {
        console.log('authObj', authObj);
        window.Kakao.API.request({
          // 현재 로그인한 사용자 정보
          url: '/v2/user/me',
          success: (res: any) => {
            const kakao_account = res.kakao_account;
            console.log('kakao.account', kakao_account);
          },
        });
      },
    });
  };

  return (
    <StyledBackground>
      <StyledDiv>
        <div className="titleWrap">로그인</div>

        <div className="inputDiv">
          <div
            id="loginInput"
            className={`inputWrap ${
              emailEmptyError || emailRegexError ? 'inputWrap-error' : ''
            }`}
            onClick={handleEmailInputClick}
          >
            <span className="iconSpan">
              <AiOutlineMail className="inputIcon" />
            </span>
            <input
              // ref={emailRef}
              type="text"
              placeholder="이메일 주소를 입력해주세요"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div>
            {emailEmptyError && (
              <div className="errorMessageWrap">필수 입력 항목입니다.</div>
            )}
            {emailRegexError && (
              <div className="errorMessageWrap">
                이메일 형식이 잘못됐습니다.
              </div>
            )}
          </div>
        </div>

        <div className="inputDiv">
          <div
            id="pwInput"
            className={`inputWrap ${
              pwEmptyError || pwRegexError ? 'inputWrap-error' : ''
            }`}
            onClick={handlePwInputClick}
          >
            <span className="iconSpan">
              <AiFillLock className="inputIcon" />
            </span>
            <input
              // ref={pwRef}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={pw}
              onChange={handlePw}
            />
          </div>

          <div>
            {pwEmptyError && (
              <div className="errorMessageWrap">필수 입력 항목입니다.</div>
            )}
            {pwRegexError && (
              <div className="errorMessageWrap">
                비밀번호는 8~16자리 / 영문 대소문자, 숫자, 특수문자 포함이어야
                합니다.
              </div>
            )}
          </div>
        </div>
        <div className="LoginButtonWrap">
          <button onClick={onClickLoginButton} className="LoginButton">
            로그인
          </button>
        </div>

        <div className="buttonBottomWrap">
          <label className="stayLogin">
            <input type="radio" />
            <p>로그인 유지</p>
          </label>
          <Link href="./find-password" className="findPassword">
            비밀번호 찾기
          </Link>
        </div>
        <div className="SNSWrap">
          <p> SNS로 시작하기</p>
          <div className="SNSLoginContainer">
            <div onClick={kakaoLogin}>🟡카카오</div>
            <div>⚪️구글</div>
            <div>🟢네이버</div>
            <div>🔵페북</div>
          </div>
        </div>
        <div>
          <Link href="./sign-up">아이디가 없으신가요?</Link>
        </div>
      </StyledDiv>
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

  /* div {
    border: .0625rem solid black;
  } */
`;

const StyledDiv = styled.div`
  width: 36.75rem;
  height: 44.75rem;
  left: 41.625rem;
  top: 11.375rem;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.29);
  border-radius: 20px;

  .titleWrap {
    padding-top: 2.5rem;
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 48px;
    text-align: center;
    justify-content: center;
  }

  .inputWrap {
    width: 480px;
    height: 48px;
    margin: 30px 54px;
    display: flex;
    align-items: center;
    padding: 2.4px 8px 2.4px 8px;
    border-bottom: 2px solid #adb5bd;

    .iconSpan {
      margin-right: 1.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .inputIcon {
        width: 24px;
        height: 20px;
      }
    }
  }

  .inputTitle {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
  }

  .inputWrap:focus-within {
    border-bottom: 2px solid #206efb;
    .inputIcon {
      color: #206efb;
    }
  }

  input {
    width: 100%;
    outline: none;
    border: none;
    height: 48px;
    font-size: 0.875rem;
    font-weight: 400;
  }

  .inputWrap-error {
    border: 0.0625rem solid red;
  }

  .errorMessageWrap {
    margin: 30px 54px;
    color: #ef0000;
    font-size: 12px;
    height: 1.25rem;
    overflow: hidden;
  }

  /* .inputWrap:focus-within .input-error {
    display: none;
  }

  .inputWrap:focus-within + .errorMessageWrap {
    display: none;
  } */

  .LoginButtonWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3.75rem;
  }
  .LoginButton {
    width: 480px;
    height: 48px;
    border: none;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.25rem;
    background: #206efb;
    border-radius: 10px;
    color: white;
    margin-bottom: 16px;
    cursor: pointer;
  }

  .buttonBottomWrap {
    justify-content: space-between;
    align-items: center;
    margin: 0px 54px;

    input {
      height: 16px;
    }

    p {
      font-size: 16px;
    }
  }
  .SNSWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .SNSLoginContainer {
      display: flex;
      div {
        font-size: 30px;
        padding: 10px;
      }
    }
  }
`;
