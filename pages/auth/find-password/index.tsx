import CustomButton from '@/components/ui/CustomButton';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMail } from 'react-icons/ai';
import { useRouter } from 'next/router';

function FindPassword() {
  const router = useRouter();
  // 이메일 인풋
  const [email, setEmail] = useState('');

  // 이메일 에러처리
  const [errorEmailEmpty, setErrorEmailEmpty] = useState(false);
  const [errorEmailInvalid, setErrorEmailInvalid] = useState(false);
  const [errorEmailSnsUser, setErrorEmailSnsUser] = useState(false);
  //완료 메세지
  const [sendDone, setSendDone] = useState(false);

  // 이메일 온포커스
  const emailOnfocus = () => {
    setErrorEmailEmpty(false);
    setErrorEmailInvalid(false);
  };

  // 버튼 클릭
  const ButtonClickHandler = () => {
    if (email == '') {
      setErrorEmailEmpty(true);
    }
  };

  return (
    <StyledBackground>
      <StyledDiv>
        <div className="headingDiv">
          <p>비밀번호 찾기</p>
        </div>
        <div className="guideMessageDiv">
          <p>가입 시 등록했던 이메일로</p>
          <p>임시 비밀번호를 보내드릴게요.</p>
        </div>
        <div className="emailDiv">
          <label
            id="loginInput"
            className={
              errorEmailEmpty || errorEmailInvalid || errorEmailSnsUser
                ? 'inputWrap error'
                : 'inputWrap'
            }
          >
            <span className="iconSpan">
              <AiOutlineMail className="inputIcon" />
            </span>
            <input
              type="text"
              placeholder="이메일 주소를 입력해주세요"
              onChange={(event) => {
                setEmail(event?.target.value);
              }}
              onFocus={emailOnfocus}
            />
          </label>
          <div className="errorMessageDiv">
            {errorEmailEmpty ? (
              <p className="errorMessageText">필수 입력 항목입니다.</p>
            ) : null}

            {errorEmailInvalid ? (
              <p className="errorMessageText">등록되지 않은 이메일입니다.</p>
            ) : null}

            {errorEmailSnsUser ? (
              <p className="errorMessageText">
                비밀번호 찾기는 '이메일 가입하기'로 가입한 경우에만 가능합니다.
              </p>
            ) : null}

            {sendDone ? (
              <p className="sendDoneMessageText">이메일이 발송되었습니다</p>
            ) : null}
          </div>
        </div>
        <div className="ButtonDiv">
          <CustomButton
            backgroundColor="#206EFB"
            fontColor="#fff"
            paddingColumns="0.875"
            paddingRow="0.875"
            fontSize="1.25"
            onClick={ButtonClickHandler}
          >
            전송하기
          </CustomButton>
        </div>
        <div
          className="buttonBottomDiv"
          onClick={() => {
            router.push('/auth/sign-in');
          }}
        >
          <p>로그인 페이지로 돌아가기</p>
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
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  width: 36.75rem;
  height: 25.75rem;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.29);
  border-radius: 20px;

  .headingDiv {
    margin-top: 40px;
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 48px;
    text-align: center;
    justify-content: center;
  }
  .guideMessageDiv {
    margin-top: 35px;

    p {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      /* or 125% */

      text-align: center;

      /* Gray 05 */

      color: #868e96;
    }
  }
  .emailDiv {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 0px 60px 0 60px;
  }

  .ButtonDiv {
    margin-top: 5px;
    padding: 0px 60px 0 60px;
    > button {
      width: 100%;
    }
  }

  .buttonBottomDiv {
    display: flex;
    justify-content: center;
    padding-top: 17px;
    cursor: pointer;

    p {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      /* or 133% */

      align-items: center;

      /* Gray 05 */

      color: #868e96;
      border-bottom: 1.5px solid #868e96;
      padding-bottom: 2px;
      :hover {
        font-weight: 700;
        border-bottom: 1.8px solid #868e96;
      }
    }
  }

  //에러메세지
  .errorMessageDiv {
    margin-left: 5px;
    margin-top: 5px;
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

    .sendDoneMessageText {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */
      /* Point Red */

      color: #17171c;
    }
  }
  //인풋창
  .inputWrap {
    display: flex;
    padding: 15px 8px 0 8px;
    border-bottom: 2px solid #adb5bd;
    min-height: 60px;

    &.error {
      border-color: red;
    }

    input {
      width: 100%;
      outline: none;
      border: none;
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      /* identical to box height, or 111% */

      /* Gray 09 */
      color: #17171c;
    }
    .iconSpan {
      margin-right: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .inputIcon {
        width: 24px;
        height: 20px;
      }
    }
    :focus-within {
      border-bottom: 2px solid #206efb;
      .inputIcon {
        color: #206efb;
      }
    }
  }
`;

export default FindPassword;
