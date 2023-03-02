import CustomButton from '@/components/ui/CustomButton';
import { auth, dbService } from '@/shared/firebase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function SnsNickname() {
  // 동의 버튼
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

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
  // 동의 체크박스 확인 useEffect
  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);
  return (
    <StyledBackground>
      <StyledDiv>
        <div className="headingDiv">
          <p>추가 정보 입력</p>
        </div>
        <div className="emailDiv">
          <p className="subheadingText">이메일</p>
          <input type="text" placeholder={auth.currentUser?.email} disabled />
          <div className="errorMessageDiv"></div>
        </div>
        <div className="nicknameDiv">
          <p className="subheadingText">닉네임</p>
          <input type="text" />
          <div className="errorMessageDiv">
            <p className="errorMessageText">errorMessage</p>
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
        <div className="ButtonDiv">
          <CustomButton
            backgroundColor="#206EFB"
            fontColor="#fff"
            paddingColumns="0.875"
            paddingRow="0.875"
            fontSize="1.25"
            // onClick={onClickConfirmButton}
            // disabled={notAllow}
          >
            회원가입
          </CustomButton>
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
    border: 0.0625rem solid black;
  } */
`;

const StyledDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  width: 36.75rem;
  height: 36rem;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.29);
  border-radius: 20px;
  padding: 40px 60px;

  .headingDiv {
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 48px;
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
  }

  //이용동의 Div는 아래에 SignUpAgreeDiv

  .ButtonDiv {
    display: flex;
    margin-top: 2.5rem;
    > button {
      width: 100%;
    }
  }

  //서브헤딩 텍스트
  .subheadingText {
    font-size: 1.25rem;
    font-weight: 700;
  }

  //에러메세지
  .errorMessageDiv {
    margin-left: 5px;
    min-height: 20px;
    .errorMessageText {
      font-family: 'Pretendard';
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

  .check-custorm-right {
    margin-left: 2.5px;
  }
`;

export default SnsNickname;
