import { auth, dbService } from '@/shared/firebase';
import { deleteUser } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function DeleteAccount() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [check, setCheck] = useState(false);

  const [emailCheck, setEmailCheck] = useState(false);

  const [allDone, setAllDone] = useState(false);

  const [errorEmailValid, setErrorEmailValid] = useState(false);
  // 이메일Regex
  const FullEmailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  // 동의합니다 버튼
  const btnEvent = () => {
    if (check === false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  // 이메일 유효성검사
  const handleEmail = (event: any) => {
    setEmail(event.target.value);
    if (FullEmailRegex.test(event.target.value)) {
      setEmailCheck(true);
    }
  };

  // 탈퇴 버튼클릭
  const DeleteButton = async () => {
    const user = auth.currentUser;
    if (user?.email !== email) {
      setErrorEmailValid(true);
    } else {
      await deleteDoc(doc(dbService, 'userInfo', 'user'));

      deleteUser(user)
        .then(() => {
          alert('계정 삭제가 완료되었습니다');
          router.push('/');
        })
        .catch((error) => {
          console.log('error', error);
          alert('잘못된 접근입니다.');
        });
    }
  };

  // 실시간 유효성 검사
  useEffect(() => {
    if (emailCheck && check) {
      setAllDone(true);
    } else {
      setAllDone(false);
    }
  }, [emailCheck, check]);
  return (
    <DeleteAccountContainer>
      <div className="emailDiv">
        <p className="subheadingText">이메일</p>
        <input
          type="text"
          placeholder="가입하신 이메일을 적어주세요."
          onChange={handleEmail}
        />
        <div className="errorMessageDiv">
          {errorEmailValid ? (
            <p className="errorMessageText">이메일을 확인해 주세요.</p>
          ) : null}
        </div>
      </div>
      <div className="cautionDiv">
        <ul>
          <li>현재 사용중인 계정 정보는 회원 탈퇴후 복구가 불가합니다.</li>
          <li>주의사항 내용 1</li>
          <li>주의사항 내용 2</li>
          <li>주의사항 내용 3</li>
          <li>주의사항 내용 4</li>
          <li>주의사항 내용 5</li>
          <li>주의사항 내용 6</li>
          <li>주의사항 내용 7</li>
          <li>주의사항 내용 8</li>
        </ul>
      </div>
      <div className="buttonDiv">
        <div className="agree-input-wrap">
          <label htmlFor="check1">
            <input
              type="checkbox"
              id="check1"
              checked={check}
              onChange={btnEvent}
            />
            <span className="check-custorm" />
            주의사항을 확인했습니다.
          </label>
        </div>
        <div className="buttonWrap">
          <button disabled={!allDone} onClick={DeleteButton}>
            회원탈퇴
          </button>
        </div>
      </div>
    </DeleteAccountContainer>
  );
}

const DeleteAccountContainer = styled.div`
  .emailDiv {
  }

  .cautionDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 430px;
    height: 226px;
    left: 886px;
    top: 440px;

    /* Gray 00 */

    background: #f1f3f5;
    border-radius: 10px;
    > ul {
      /* Pretendard Medium 14 */

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */

      /* Gray 06 */

      color: #495057;
    }
  }
  .buttonDiv {
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 0.625rem;

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
  }

  //버튼
  .buttonWrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    > button {
      width: 132px;
      height: 48px;
      background: #ffffff;
      /* Gray 03 */

      border: 1px solid #ced4da;
      border-radius: 10px;
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 20px;
      /* identical to box height, or 100% */

      text-align: center;

      /* Gray 09 */

      color: #17171c;
      margin-top: 5px;
      margin-right: 10px;
      &:disabled {
        background: #ced4da;
        color: #868e96;
      }
    }
  }

  /* 여기부터 공통속성 */
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
  }

  //서브헤딩 텍스트
  .subheadingText {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 10px 5px;
  }
  //인풋창
  input {
    border-radius: 0.625rem;
    padding: 0.8125rem 1.25rem;
    border: 0.0625rem solid #adb5bd;
    width: 90%;
    font-size: 18px;
    &.error {
      border: 1px solid red;
    }
    &:focus-within {
      border: 1px solid #17171c;
    }
  }
`;
export default DeleteAccount;
