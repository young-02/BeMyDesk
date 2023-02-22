import React from 'react';
import styled from 'styled-components';
import { StringLiteral } from 'typescript';

interface CustomButtonProps {
  children?: React.ReactNode;
  backgoundColor?: string;
  fontSize?: string;
  paddingRow?: string;
  paddingColumns?: string;
  fontColor?: string;
  onClick?: any;
  border?: string;
}

export default function CustomButton({
  children,
  backgoundColor,
  fontSize,
  paddingRow,
  paddingColumns,
  fontColor,
  onClick,
  border,
}: CustomButtonProps) {
  return (
    <Button
      backgoundColor={backgoundColor}
      paddingRow={paddingRow}
      paddingColumns={paddingColumns}
      fontSize={fontSize}
      onClick={onClick}
      fontColor={fontColor}
      border={border}
    >
      {children}
    </Button>
  );
}

const Button = styled.button<CustomButtonProps>`
  padding: ${(props) => props.paddingColumns}rem
    ${(props) => props.paddingRow}rem;
  color: ${(props) => props.fontColor};
  background: ${(props) => props.backgoundColor};
  border-radius: 0.625rem;
  cursor: pointer;
  border: ${(props) => props.border};
`;
