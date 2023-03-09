import React from 'react';
import styled from 'styled-components';

declare interface CustomErrorMessageProps {
  children?: React.ReactNode;
}

function CustomErrorMessage({ children }: CustomErrorMessageProps) {
  return (
    <ErrorMessageDiv>
      <p className="errorMessageText">{children}</p>
    </ErrorMessageDiv>
  );
}

const ErrorMessageDiv = styled.div`
  margin-left: 5px;
  min-height: 16px;
  .errorMessageText {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #f83e4b;
  }
`;

export default CustomErrorMessage;
